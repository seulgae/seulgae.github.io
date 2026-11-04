var e=`---
title: 4인 백엔드 팀의 제각각이던 selectList 코드 — 예제 코드와 PDF 가이드로 개발 기준 맞추기
date: 2024-12-12
tags: Java, Spring, MyBatis, Architecture
summary: 4명이 서로 다른 방식으로 작성하던 조회 코드를 Request/Response DTO·Model·Builder 구조로 정리하고, 예제 코드와 PDF 가이드를 공유해 팀의 개발 기준을 맞춘 기록
---

클라우드 빌링 플랫폼 고도화 프로젝트에서는 **백엔드 개발자 4명**이 가입, 청구, 상품, 공통 조회 등의 도메인을 나누어 동시에 REST API를 개발하고 있었다.

당시 팀은 프로젝트에 참여한 외부 개발자와 기존 시스템의 운영 경험을 쌓아온 동료 등 **서로 다른 경험을 가진 백엔드 개발자 4명**으로 구성되어 있었다. 나는 프로젝트 종료 후에도 코드를 운영·유지보수할 내부 개발자로 참여했다. **팀장님은 PM 업무도 함께 맡고 있어** 일정 조율과 대외 업무를 병행하고 있었다.

프로젝트 이후의 유지보수를 고려해 **백엔드 코드 구조와 작성 규칙의 초안을 정리하는 역할**을 맡았다. 같은 \`selectList\` 조회 API도 개발자마다 작성 방식이 달라, 공통 패턴을 제안하고 **PDF 가이드로 정리해 팀 회의에서 공유·조율했던 과정**을 기록해 둔다.

## 배경 — 서로 다른 배경의 4명, 네 가지 모양의 \`selectList\` 코드

당시 프로젝트는 Spring Boot 3.x와 MyBatis 기반이었다. 각자 익숙한 개발 방식이 달랐고, 팀에서 합의한 패키지 규칙이나 객체 작성 표준은 아직 없었다. 같은 MyBatis \`selectList\` 결과를 \`List<자료형>\`으로 받아 프론트엔드(React)에 내려주는 기능도 작성자마다 구조가 달랐다.

| 구분 | 현장에서 섞여 있던 작성 방식들 | 겪었던 문제 |
| --- | --- | --- |
| **계층 호출 및 패키지** | \`Controller\`에서 곧바로 \`DAO.selectList()\` 호출·가공 vs \`Service\` 인터페이스 경유 vs 구체 클래스 단독 사용, 도메인별 패키지 위치 불일치 | 비즈니스 로직과 트랜잭션이 걸리는 위치를 예측할 수 없고 파일 탐색이 어려움 |
| **\`List<T>\` 자료형 설계** | 요청 조건·DB 컬럼·응답 필드를 **단일 만능 VO 클래스 하나에 모두 몰아넣어** \`List<VO>\`로 공용 사용 vs 화면마다 비슷한 클래스(\`ProductVO\`, \`ProductData\` 등) 중복 생성 | 요청에 불필요한 응답·DB 필드까지 Swagger 입력창에 그대로 노출되고 변경 영향 범위 파악이 어려움 |
| **객체 생성·조립** | 기본 생성자(\`new\`) 후 \`setter\` 수십 줄 나열로 \`List\` 원소 복사·가공 | 불필요한 가변 상태 노출, 메서드마다 똑같은 \`setter\` 조립 코드가 반복되며 가독성 저하 |
| **입력값 검증 및 명명** | 컨트롤러 \`if (vo.get...() == null)\` 수동 분기 vs MyBatis XML \`<if>\`에만 의존, 메서드명(\`get/select/find\`) 혼용 | 필수 파라미터 누락 시 에러 응답 형태와 메서드 규칙이 API마다 달라짐 |

각자 맡은 기능 개발을 진행하는 동안 코드 작성 방식의 차이가 쌓이고 있었다. 프로젝트 종료 후에도 코드를 함께 수정하고 유지보수하려면 공통 기준을 정리할 필요가 있다고 느꼈다.

## AS-IS — 표준 없는 단일 \`selectList\`가 만들던 비용

기존 코드에서 흔히 보이던 형태는 요청 파라미터부터 MyBatis \`selectList\` 결과, 최종 API 응답까지 **하나의 범용 데이터 클래스(\`VO\`/\`DTO\`)로 돌려쓰면서 컨트롤러나 서비스 곳곳에서 \`setter\`로 값을 덧씌우는 패턴**이었다.

\`\`\`java
// AS-IS — 요청·DB 조회·응답을 단일 VO로 겸용하고 setter를 나열해 가공하던 패턴
@GetMapping("/products")
public ResponseEntity<List<ProductVO>> getProductList(ProductVO searchParam) {
    if (searchParam.getCategoryCd() == null || searchParam.getCategoryCd().isEmpty()) {
        throw new IllegalArgumentException("카테고리 코드는 필수입니다.");
    }

    // DAO에서 List<ProductVO> 형태로 조회한 뒤 동일한 클래스를 그대로 응답까지 재사용
    List<ProductVO> rawList = productDAO.selectProductList(searchParam);
    List<ProductVO> result = new ArrayList<>();

    for (ProductVO item : rawList) {
        ProductVO view = new ProductVO();
        view.setProductId(item.getProductId());
        view.setProductName(item.getProductName());
        view.setCategoryCd(item.getCategoryCd());
        view.setStatusName("Y".equals(item.getUseYn()) ? "사용중" : "중지");
        // ... 화면 표시용 필드를 채우기 위해 setter 호출이 수십 줄씩 반복됨
        result.add(view);
    }
    return ResponseEntity.ok(result);
}
\`\`\`

단건 API 하나만 놓고 보면 단순해 보이지만, 4명이 각기 다른 네이밍과 패키지 구조로 수십 개의 API를 만들자 세 가지 비용이 빠르게 불어났다.

1. **하나의 클래스가 비대해지고 API 계약이 흐려진다.**  
   검색 조건용 필드, DB 테이블 컬럼, 화면 전용 파생 필드가 \`ProductVO\` 하나에 계속 추가되다 보니, 프론트엔드가 보는 Swagger 문서에서는 조회 요청인데도 수십 개의 응답·내부 컬럼이 입력 파라미터처럼 함께 노출되었다.
2. **타인의 코드를 이어받아 수정하는 비용이 커진다.**  
   패키지 구조와 계층 역할이 개발자마다 달라 API 하나를 고치려면 컨트롤러에 가공 로직이 있는지, 어떤 \`List<자료형>\` 클래스가 실제 매퍼 XML과 연결되어 있는지부터 매번 추적해야 했다.
3. **객체 생성 코드 중복과 가독성 저하.**  
   조회한 \`List\`를 가공하거나 등록·수정 객체를 만들 때마다 \`new\` 생성 후 \`setter\`를 스무 줄씩 나열하는 보일러플레이트 코드가 도메인 전역에 복제되면서, 실제 중요한 비즈니스 조건이 필드 복사 코드 사이에 파묻혀 잘 읽히지 않았다.

## 먼저 코드로 증명하기 — 패키지 재정립과 Request/Response · Model · Builder 패턴화

익숙한 작성 방식을 바꾸자고 제안하려면 구두 설명만으로는 부족했다. 동료들이 변경 이유를 이해하고 바로 적용할 수 있도록 **명확한 기준과 실제 동작하는 예제 코드**가 필요했다.

그래서 가이드를 만들기 전에 **내가 맡고 있던 가입·상품·공통 조회 API에 먼저 표준 구조를 적용해 동작하는 레퍼런스 코드부터 완성**했다. 핵심 기준은 세 가지였다.

### 1. 패키지 구조와 계층별 책임 고정

도메인마다 달랐던 디렉터리 구성을 재정립하고, 모든 모듈이 동일한 호출 흐름을 타도록 책임을 일원화했다.

\`\`\`text
controller   : HTTP 요청 매핑, @Valid 입력 검증, 공통 응답 반환 (DAO 직접 호출 금지)
service      : 도메인 유스케이스 인터페이스 정의
service.impl : 비즈니스 규칙 처리, @Transactional 경계, List<Model> → List<ResponseDTO> 변환
dao          : 순수 MyBatis SQL(selectList, selectOne, insert, update) 실행
dto          : 외부 API 계약 전용 객체 (Request / Response 분리)
model        : DB 테이블 및 MyBatis 매퍼 결과와 1:1 대응하는 영속 계층 자료형
\`\`\`

### 2. 만능 VO 지양 — \`Request\` · \`Response\` DTO와 \`Model\` 분리

데이터 객체를 하나의 공용 클래스로 통일해 돌려쓰지 않고, **모든 기능마다 요청(\`Request\`)과 응답(\`Response\`) DTO를 분리하고 MyBatis \`selectList\`가 반환하는 DB 매핑용 \`Model\`(\`List<ProductModel>\`)까지 별도로 두는 원칙**을 세웠다. 입력 검증(\`@NotBlank\`, \`@NotNull\`)이 필요한 요청 스펙과 화면 노출용 필드가 담기는 응답 스펙, 그리고 DB 컬럼 구조가 서로 영향을 주지 않게 하기 위해서였다.

### 3. 무분별한 \`@Setter\` 대신 \`@Builder\` 패턴 도입

빈 객체를 만들고 \`setter\`를 줄줄이 호출하던 방식을 걷어내고, **\`@Builder\` 패턴**으로 객체 생성과 리스트 원소 변환 방식을 통일했다. 이때 DB가 자동 생성하는 PK나 감사(Audit) 컬럼처럼 외부에서 임의로 덮어쓰면 안 되는 필드는 빌더 대상에서 제외해 오용 가능성을 줄였다.

\`\`\`java
// TO-BE — 요청(Request), DB 조회 결과(Model), 응답(Response) 자료형을 명확히 분리
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProductSearchRequestDTO {
    @NotBlank(message = "카테고리 코드는 필수입니다.")
    private String categoryCd;
    private String keyword;
}

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProductResponseDTO {
    private Long productId;
    private String productName;
    private String categoryCd;
    private String statusName;

    @Builder
    public ProductResponseDTO(Long productId, String productName,
                              String categoryCd, String statusName) {
        this.productId = productId;
        this.productName = productName;
        this.categoryCd = categoryCd;
        this.statusName = statusName;
    }

    public static ProductResponseDTO from(ProductModel model) {
        return ProductResponseDTO.builder()
                .productId(model.getProductId())
                .productName(model.getProductName())
                .categoryCd(model.getCategoryCd())
                .statusName("Y".equals(model.getUseYn()) ? "사용중" : "중지")
                .build();
    }
}
\`\`\`

\`\`\`java
// ServiceImpl — List<ProductModel>을 조회해 List<ProductResponseDTO>로 변환하는 단일 지점
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProductServiceImpl implements ProductService {

    private final ProductDAO productDAO;

    @Override
    public List<ProductResponseDTO> getProductList(ProductSearchRequestDTO request) {
        List<ProductModel> models = productDAO.selectProductList(request);
        return models.stream()
                .map(ProductResponseDTO::from)
                .collect(Collectors.toList());
    }
}
\`\`\`

이렇게 정리하자 컨트롤러는 서너 줄로 얇아졌고, Swagger 문서에는 해당 API에 실제로 필요한 요청 파라미터와 응답 필드만 깔끔하게 분리되어 나타났다.

## PDF 가이드 제작과 팀 회의 공유 — 예제를 바탕으로 개발 기준 합의하기

레퍼런스 리팩토링을 마친 뒤, 동료들이 내 소스를 일일이 찾아보지 않고도 참고할 수 있도록 **핵심 규칙과 예제를 담은 PDF 컨벤션 가이드**를 직접 제작했다.

추상적인 원칙 나열 대신 실무에서 바로 복사해 참고할 수 있는 구성으로 채웠다.

- **표준 패키지 트리 및 클래스 네이밍 규칙** (\`controller\`, \`service\`, \`service.impl\`, \`dao\`, \`dto\`, \`model\` 위치와 \`Request\`/\`Response\` 명명 기준)
- **단일 \`selectList\` / 단건 조회 / 등록·수정 Before → After 비교 코드** (단일 VO + \`setter\` 나열 구조를 \`List<Model>\` → \`List<ResponseDTO>\` + \`@Builder\`로 전환하는 실전 템플릿)
- **검증·예외·어노테이션 기준** (\`@Valid\` 적용 위치, 무분별한 \`@Setter\` 지양 이유, 생성자 레벨 \`@Builder\` 권장 패턴)

팀 회의에서 발표 시간을 요청해 준비한 PDF 가이드를 백엔드 개발자 전원에게 공유했다. 내가 정리한 초안을 바탕으로 각자의 경험과 의견을 듣고, 함께 적용할 기준을 맞추고자 했다.

그래서 발표의 초점을 **"누구의 방식이 맞고 틀리다"가 아니라 "배경이 다른 우리가 서로의 코드를 5분 안에 읽고 교차 수정할 수 있도록 틀을 맞추자"**에 두었다. 말로만 규칙을 요구한 것이 아니라 실제 동작하는 템플릿 코드와 한눈에 들어오는 PDF 가이드를 함께 제시해 전환 허들을 낮추자, 동료분들 모두 열린 마음으로 제안을 받아들여 주셨다.

**초안에서 놓친 부분은 경험이 풍부한 동료들의 조언으로 보완했다.** 내가 패키지 구조와 컨벤션 초안을 정리하면, 동료들은 예외 처리나 복잡한 쿼리·트랜잭션 경계에서 주의할 점을 짚어주었다. 제안을 구체화하고 서로의 경험을 더하는 과정에서 팀이 함께 사용할 기준을 다듬을 수 있었다.

## 결과

- **4인 백엔드 코드 구조와 작성 기준 통일**: 이후 작성되는 단일 \`selectList\` 조회부터 신규 도메인 API까지 모두 동일한 패키지 계층과 \`Request/Response DTO · Model · @Builder\` 구조를 따르게 되었다. 팀원들이 PDF 템플릿을 참고해 같은 구조로 API를 작성하고, 다른 도메인의 코드를 수정할 때도 공통 기준을 참고할 수 있게 됐다. 온보딩 시간의 전후 측정 기록은 남기지 않아 시간 단축을 정량 성과로 제시하지 않는다.
- **객체 생성 중복 제거 및 프론트엔드 협업 효율 향상**: 메서드마다 길게 늘어지던 \`setter\` 나열 코드가 \`@Builder\`와 정적 변환 메서드로 일원화되어 객체 생성·조립 위치와 방식을 파악하기 쉬워졌다. 또한 만능 VO 대신 요청과 응답 DTO가 분리되면서 Swagger에서 요청과 응답 필드를 구분해 확인할 수 있었다. 협업 비용 감소는 정성적으로 관찰한 변화이며 별도 측정한 수치는 없다.
- **후속 성능 개선의 발판 마련**: 화면별로 흩어져 있던 조회·조립 코드를 \`ServiceImpl\`과 명확한 \`List<Model>\` / \`List<DTO>\` 구조로 정돈해 둔 덕분에, 뒤이어 터진 [100만 건 대용량 조회 성능 병목 개선 작업](/blog/mybatis-builder-parallel-refactoring)에서도 컨트롤러 곳곳을 헤매지 않고 서비스 계층에서 신속하게 병렬 처리를 적용할 수 있었다.

## 한계 회고 — 지금 다시 한다면

당시 실무 기준을 세우며 직접 부딪혔던 고민과 지금 시점에서 돌아보는 개선점도 분명히 남아 있다.

1. **모든 기능마다 예외 없이 \`Request\`와 \`Response\`를 분리했던 선택에 대하여**  
   기존처럼 만능 VO 하나로 통일해 돌려쓰는 문제를 막고자, 당시에는 검색 조건이 한두 개뿐인 단순 \`selectList\`부터 등록·수정까지 모든 기능마다 \`Request\`와 \`Response\` 클래스를 전부 별도로 분리해 개발했다. 작업을 하면서도 *"필드가 비슷한 단순 API까지 클래스를 매번 따로 만드는 게 과연 맞는 걸까, 파일 수만 너무 늘어나는 건 아닐까?"* 하는 고민이 계속 따라다녔다.  
   지금 돌아보면 **요청과 응답을 하나로 통일하지 않고 분리한 방향 자체는 옳았다.** 초기에는 같아 보이던 스펙도 요구사항이 붙기 시작하면 요청 쪽에는 검색 조건·검증 규칙(\`@Valid\`)이, 응답 쪽에는 상태명·마스킹 같은 파생 필드가 각각 다르게 추가되기 때문이다. 다만 모든 DTO를 개별 최상위 \`.java\` 파일로 만들다 보니 패키지 내 파일 개수가 급증했던 점은 아쉬움으로 남는다. 지금 다시 설계한다면 분리 원칙은 지키되, 도메인 단위 클래스 내부에 \`static\` 중첩 클래스나 Java \`record\`(\`ProductDto.SearchRequest\`, \`ProductDto.Response\`)로 묶어 파일 파편화를 줄이고, 가공이 전혀 없는 순수 조회에 한해서는 MyBatis 매퍼가 조회 전용 \`Response\` DTO로 바로 매핑되게 해 불필요한 변환 보일러플레이트를 덜어냈을 것이다.
2. **정량적 품질 좌표 기록과 CI 파이프라인 자동 검증의 부재**  
   당시에는 일정 안에서 팀 전체의 코드 모양을 맞추고 가독성·유지보수성을 끌어올리는 데 집중하느라, 리팩토링 전후의 코드 중복률이나 복잡도를 SonarQube 같은 정적 분석 지표로 정량 측정해 기준 좌표로 남겨두지 못했다. 또한 PDF 가이드는 초기 합의에는 큰 힘을 발휘했지만 바쁜 일정 속에서는 사람이 눈으로 지키는 규칙이 다시 느슨해질 여지가 있었다. 지금 다시 한다면 전환 전후의 정적 분석 수치를 먼저 기록해 개선 폭을 객관적으로 증명하고, 합의된 규칙을 \`ArchUnit\` 테스트(*"Controller는 DAO를 직접 호출하지 않는다"*, *"Controller는 영속 계층의 Model을 외부로 직접 반환하지 않는다"*)나 Checkstyle로 코드화해 GitLab·Jenkins 빌드 단계에서 자동 검증되게 구성했을 것이다.

## 배운 점

- **유지보수를 맡을 개발자의 관점에서 필요한 기준을 먼저 제안할 수 있다.**
  프로젝트 이후에도 코드를 관리해야 했기에 작성 방식의 차이를 그대로 두기 어려웠다. 직접 예제와 가이드 초안을 준비해 논의를 시작했고, 이후 팀이 서로의 코드를 수정할 때 참고할 기준을 마련했다.
- **표준화는 초안을 제안하고 동료의 경험으로 보완하는 과정이다.**
  PDF 예제는 공통 구조를 적용하는 데 도움을 주었고, 내가 놓친 기술적 고려사항은 동료들의 조언으로 보완했다. 문서를 작성하는 것만큼 함께 검토하고 적용할 수 있는 기준으로 만드는 과정이 중요했다.
`,t=`---
title: csql과 nohup — 운영 중인 DB에 수백만 건 패치를 조용히 밀어 넣는 법
date: 2026-07-08
tags: DB, Linux, Security, Operations
summary: 개인정보 컬럼 대량 암호화 패치를 서비스 중단 없이 처리한 기록 — nohup 백그라운드 실행, 분할 커밋, 로그 기반 모니터링까지 대량 DML 작업의 절차 정리
---

한 OTT 서비스의 본인확인 값(CI) 유출 사고가 보도된 적이 있다. 남의 일이 아니었다.
우리 시스템에도 가입·인증 과정에서 수집한 개인정보 컬럼이 **평문으로** 저장된
테이블이 있었다. 유출 사고는 터진 뒤에 막을 수 없다 — 보도를 본 그 주에
해당 컬럼들을 DB 암·복호화 솔루션(Damo) 함수로 **선제 암호화하는 패치**를 하기로 했다.

문제는 규모와 조건이었다. 대상은 **행안부 연계 본인확인 CI값 약 14만 건과
개인정보 이력 로그 약 370만 건을 합쳐 총 384만 건** 규모였고, **서비스는 멈출 수 없다.**

## 왜 애플리케이션이 아니라 DB에서 직접 했나

애플리케이션에 배치 기능을 만들어 처리할 수도 있었다. 하지만 이건 일회성
패치다. 한 번 쓰고 버릴 코드를 애플리케이션에 넣어 배포하는 것보다,
**DB 서버에서 SQL 스크립트로 직접 실행**하는 편이 영향 범위도 작고 빠르다.
DB의 CLI 도구(csql)로 스크립트 파일을 실행하는 방식을 택했다.

\`\`\`bash
csql -u <계정> <DB명> -i encrypt_patch.sql
\`\`\`

여기서 첫 번째 함정을 만난다. 이렇게 포그라운드로 실행하면 **내 SSH 세션이
프로세스의 생명줄**이 된다. 수백만 건 UPDATE가 도는 중에 VPN이 끊기거나
노트북이 절전 모드로 들어가면, 세션 종료와 함께 SIGHUP이 날아가 작업이
중간에 죽는다. 대량 DML이 중간에 죽으면 "어디까지 반영됐는지"부터 다시
조사해야 하는 최악의 상황이 된다.

## nohup — 세션과 프로세스의 생명줄을 끊어두기

그래서 실행 명령을 이렇게 바꿨다.

\`\`\`bash
nohup csql -u <계정> <DB명> -i encrypt_patch.sql > encrypt_patch.log 2>&1 &
\`\`\`

한 줄이지만 네 가지 장치가 들어 있다.

| 조각 | 역할 |
|---|---|
| \`nohup\` | 터미널이 끊겨도(SIGHUP) 프로세스를 죽이지 않음 |
| \`> encrypt_patch.log\` | 표준 출력을 로그 파일로 — 진행 내역이 파일에 남는다 |
| \`2>&1\` | 표준 에러도 같은 파일로 — 오류가 화면과 함께 증발하지 않는다 |
| \`&\` | 백그라운드 실행 — 터미널을 점유하지 않고 즉시 프롬프트 반환 |

실행 직후 프로세스 ID를 확인해 두고, 진행 상황은 로그를 따라가며 본다.

\`\`\`bash
jobs -l                      # 방금 띄운 백그라운드 작업과 PID 확인
tail -f encrypt_patch.log    # 실시간 진행 모니터링
ps -ef | grep csql           # 세션을 새로 열었을 때 생존 확인
\`\`\`

이제 SSH가 끊겨도 패치는 서버에서 계속 돈다. 다시 접속해서 \`tail\`로 로그만
이어 보면 된다. 원격 작업의 불안 요소(네트워크, 세션 타임아웃)와 DB 작업의
안정성이 분리된 것이다.

## 무중단의 핵심 — 트랜잭션을 잘게 쪼개기

nohup은 SIGHUP을 무시하도록 할 뿐이다. 서버 재시작·프로세스 강제 종료·DB 오류를 복구하거나 자동 재시작해 주지는 않는다.
운영 중 대량 UPDATE의 진짜 위험은 **락과 긴 트랜잭션**이다. 대상 테이블 두 곳은
성격도 달랐다 — **14만 건 규모의 본인확인(CI) 테이블**은 실시간 로그인·인증 트랜잭션이
수시로 읽고 쓰는 마스터성 테이블이라 락 대기가 곧장 사용자 장애로 이어지고,
**370만 건 규모의 개인정보 이력 로그 테이블**은 한 트랜잭션으로 묶는 순간 긴 락과
로그 폭증으로 DB 전체에 부담을 준다. 롤백이라도 나면 그 시간 동안 DB가 후폭풍을
감당해야 한다.

그래서 두 테이블 모두 스크립트를 **범위 분할 + 분할 커밋** 구조로 짰다.

\`\`\`sql
-- encrypt_patch.sql (개념 구조)
-- 키 범위로 잘라서, 블록마다 커밋
UPDATE member_auth
SET    ci_val = ENC_FN(ci_val),         -- 실제 함수·스키마가 아닌 설명용 예시
       enc_yn = 'Y'                    -- 값과 처리 표시를 같은 UPDATE로 변경
WHERE  member_id BETWEEN 1 AND 10000
AND    enc_yn = 'N';                     -- 재실행 대비: 미처리 건만
COMMIT;

UPDATE member_auth
SET    ci_val = ENC_FN(ci_val),
       enc_yn = 'Y'
WHERE  member_id BETWEEN 10001 AND 20000
AND    enc_yn = 'N';
COMMIT;
-- ... 반복
\`\`\`

- **블록 단위 커밋**: 락 보유 시간이 블록 하나 처리 시간으로 줄어든다.
  다른 요청의 락 대기를 줄일 여지가 생긴다. 다만 잠금 범위·격리 수준·동시 쓰기에 따라 경합이 남으므로 무지연을 보장하지 않는다.
- **처리 플래그(미처리 조건)**: 중간에 죽어도 같은 스크립트를 다시 돌리면
  안 된 것만 이어서 처리된다 — 재실행 가능(idempotent)하게 만드는 것이
  대량 작업의 보험이다.
- **저부하 시간대 실행**: 그래도 부하는 부하라서, 트래픽이 가장 적은
  시간대에 실행을 걸었다.

위 코드는 **재실행 안전성을 설명하기 위해 보완한 예시**다. 실제 운영 스크립트의 플래그 사용 여부, csql 자동 커밋 설정과 오류 시 중단 방식은 확인이 필요하다. 범위당 1만 개의 ID가 실제 1만 행이라는 뜻도 아니다. 서비스 중단 없이 완료했다는 경험을 응답 지연·락 대기 0건이라는 측정 결과로 확대하지 않는다.

## 실행 전후 — 대사(對査)로 마무리

실행보다 중요한 게 앞뒤 절차였다.

1. **사전**: 대상 테이블 백업, 대상 건수 확정(\`COUNT\`), 샘플 row로
   암·복호화 왕복 테스트 — 함수를 잘못 걸면 데이터가 복구 불가로 깨진다.
2. **실행 중**: \`tail -f\`로 로그 확인 + 운영 화면에서 해당 기능 응답 속도
   체감 확인 — 서비스 지장 여부를 패치 도는 동안 계속 본다.
3. **사후**: 처리 건수와 대상 건수 대사, 암호화 컬럼 샘플 복호화 검증,
   애플리케이션 조회 화면 정상 동작 확인.

총 **384만 건(CI 14만 건 + 이력 로그 370만 건)** 패치는 서비스 중단 없이 완료됐고,
사용자 쪽에서는 아무 일도 없던 하루였다. 아무 일도 없던 것처럼 보이는 게 이 작업의
성공 조건이었다.

이후 이 절차(nohup 백그라운드 + 분할 커밋 + 로그 모니터링 + 전후 대사)는
연계 데이터 정합성 복구 같은 **다른 대량 DB 작업에도 그대로 재사용하는
표준 절차**가 됐다.

## 배운 점

- **nohup 한 줄이 아니라 절차가 무중단을 만든다.** 백그라운드 실행은
  시작일 뿐이고, 분할 커밋·재실행 가능 설계·전후 대사가 합쳐져야 "운영 중
  대량 작업"이 성립한다.
- **대량 DML은 '다시 돌려도 되는가'부터 설계한다.** 중간에 죽는 상황을
  전제로 미처리 조건을 걸어두면, 장애가 나도 조사가 아니라 재실행으로
  이어갈 수 있다. 다만 처리 표시와 암호화가 원자적으로 반영되어야 하며, 커밋 결과가 불명확하면 재조회·대사부터 해야 한다.
- **보안 조치의 타이밍은 사고가 아니라 보도다.** 남의 사고를 보고 우리
  데이터를 점검하는 것 — 선제 조치는 거창한 게 아니라 뉴스를 자기 시스템에
  대입해 보는 습관에서 시작했다.
`,n=`---
title: 53초짜리 목록 조회 — CUBRID 쿼리 플랜의 빨간 구간을 지우는 인덱스 설계
date: 2026-03-04
tags: SQL, CUBRID, Performance
summary: 7만 건 목록 조회가 53초 걸리던 운영 화면 — CUBRID 매니저의 쿼리 플랜에서 풀 스캔(sscan) 구간을 찾아 WHERE 조건과 ORDER BY까지 함께 타는 복합 인덱스로 재설계한 기록
---

운영 행정망 화면 중에 접수 목록을 조회하는 화면이 있었다. 대상 데이터는
약 **7만 건** — 요즘 기준으로 큰 데이터가 아니다. 그런데 조회 버튼을 누르면
**53초**가 걸렸다. 운영자는 화면이 죽은 줄 알고 새로고침을 눌렀고, 그러면
같은 쿼리가 한 번 더 돌았다.

7만 건에 53초라면 데이터 양의 문제가 아니라 **데이터를 읽는 방법**의
문제다. DB는 CUBRID였고, 진단은 큐브리드 매니저(CUBRID Manager)의 쿼리
플랜에서 시작했다.

## 진단 — 플랜의 빨간 구간부터

문제의 쿼리는 전형적인 목록 조회였다.

\`\`\`sql
SELECT rcpt_no, rcpt_status, apply_nm, area_cd, reg_dt
  FROM rcpt_list
 WHERE del_yn = 'N'
   AND area_cd = ?
   AND rcpt_status = ?
   AND reg_dt BETWEEN ? AND ?
 ORDER BY reg_dt DESC, rcpt_no DESC
\`\`\`

큐브리드 매니저에서 실행 계획을 열면 비용이 큰 노드가 **빨간색으로
강조**된다. 이 쿼리의 플랜은 두 군데가 빨갰다.

\`\`\`text
Query plan:
  temp(order by)                  ← 정렬을 위한 temp 생성 (빨강)
    sscan                         ← rcpt_list 순차 풀 스캔 (빨강)
      class: rcpt_list
      filter: del_yn='N' and area_cd=? and rcpt_status=? and reg_dt between ...
\`\`\`

CUBRID 플랜에서 \`sscan\`은 테이블을 처음부터 끝까지 읽는 순차 스캔이고,
\`iscan\`이 인덱스 스캔이다. 이 쿼리는 **WHERE에 걸린 컬럼 어디에도 쓸 만한
인덱스가 없어서** 7만 건 전체를 읽은 뒤 필터링하고, 걸러진 결과를 다시
\`temp\` 공간에서 정렬하고 있었다. 읽기도 풀 스캔, 정렬도 별도 작업 — 53초의
정체였다.

## 인덱스 설계 — 컬럼을 어떤 순서로 태울 것인가

"인덱스를 건다"는 결정보다 **어떤 컬럼을 어떤 순서로 거는가**가 본론이다.
후보 컬럼은 WHERE의 4개(del_yn, area_cd, rcpt_status, reg_dt)와 ORDER BY의
2개(reg_dt, rcpt_no)였고, 하나씩 따져봤다.

**1) 등치(=) 조건을 앞에, 범위 조건을 뒤에.**
복합 인덱스는 선두 컬럼부터 순서대로 좁혀 들어간다. \`area_cd = ?\`,
\`rcpt_status = ?\` 같은 등치 조건은 인덱스 앞쪽에 있어야 탐색 범위를 점으로
좁히고, \`reg_dt BETWEEN\`은 연속 구간을 읽게 한다. 뒤 컬럼은 탐색 구간 축소에 제약이 있지만 인덱스 키 필터나 정렬 등에 활용될 수 있다. 그래서 이 조회에서는 reg_dt를 등치 조건들 뒤로 보냈다.

**2) 값의 종류 수와 조건을 만족하는 행의 비율을 구분한다.**
\`del_yn\`은 'Y'/'N' 두 값뿐이고 운영 데이터의 대부분이 'N'이다. 이런 컬럼을
단독 선두 조건으로 조회하면 많은 행을 읽을 수 있다. 다만 복합 인덱스는 뒤의 등치 조건까지 함께 활용하므로 저카디널리티 선두가 항상 나쁜 것은 아니다. del_yn은 인덱스에서
빼고 필터로 남기는 것과, 맨 뒤에 포함하는 것을 비교해 본 뒤 뒤쪽에
포함하는 것으로 정리했다 — 인덱스 키에서 필터링하는 효과를 기대한 선택이었다. 예제 SELECT에는 인덱스에 없는 \`apply_nm\`이 있으므로 전체 쿼리를 커버링 인덱스로 처리했다고 부를 수 없다.

**3) ORDER BY까지 인덱스로 해결할 수 있는지 본다.**
정렬 컬럼(reg_dt DESC, rcpt_no DESC)이 인덱스 순서와 이어지면 DB는 정렬
작업 없이 **인덱스를 읽는 순서 그대로** 결과를 내놓는다. 플랜의
\`temp(order by)\` 노드를 지우는 방법이다. 등치 조건 뒤에 reg_dt를 두고,
그 뒤에 rcpt_no를 붙이면 WHERE와 ORDER BY가 한 인덱스에서 끝난다.
정렬 방향도 함께 본다. 아래 예제는 DESC 키로 정의했으므로 그 순서대로 읽을 수 있다. ASC 키를 역순으로 읽는 방식과는 구분해야 한다. 실제 스캔 방향은 계획에서 확인한다.

정리된 인덱스는 이렇다.

\`\`\`sql
CREATE INDEX ix_rcpt_list_01
    ON rcpt_list (area_cd, rcpt_status, reg_dt DESC, rcpt_no DESC, del_yn);
\`\`\`

\`\`\`text
등치(area_cd, rcpt_status) → 범위+정렬(reg_dt) → 정렬 보조(rcpt_no) → 필터(del_yn)
\`\`\`

## 함께 잡은 것 — 인덱스를 무력화하는 조건절

인덱스를 만들어도 조건절이 인덱스를 못 쓰게 막는 패턴이 화면 곳곳에
있었다. 같은 화면의 다른 조회에서 발견한 두 가지다.

\`\`\`sql
-- (1) 컬럼을 함수로 가공 — 인덱스의 정렬 기준이 깨져서 못 탄다
WHERE TO_CHAR(reg_dt, 'YYYYMMDD') = ?

-- 컬럼은 그대로 두고 파라미터 쪽을 범위로 가공한다
WHERE reg_dt >= ? AND reg_dt < ?   -- 해당 일자 00:00 ~ 다음날 00:00
\`\`\`

\`\`\`sql
-- (2) 선행 와일드카드 — 시작점을 알 수 없어 풀 스캔
WHERE apply_nm LIKE '%' || ? || '%'

-- 업무 협의로 전방 일치 검색으로 변경 (이름 검색은 앞자리 입력이 자연스러움)
WHERE apply_nm LIKE ? || '%'
\`\`\`

마지막으로 \`UPDATE STATISTICS ON rcpt_list;\`로 통계 정보를 갱신했다.
인덱스가 있어도 통계가 낡으면 옵티마이저가 엉뚱한 판단을 한다.

일반 원리와 기능 범위는 [CUBRID 인덱스·실행계획 문서](https://www.cubrid.org/manual/en/10.1/sql/tuning.html)를 참고했다. 운영 CUBRID 버전, 원본 플랜과 실행 통계는 저장소에 없어 재확인 대상이다. 함수 기반 인덱스나 최적화 예외도 있으므로 아래 조건절 패턴이 모든 환경에서 인덱스를 완전히 무력화한다고 일반화하지 않는다.

## 결과

같은 조건으로 다시 실행한 플랜은 이렇게 바뀌었다.

\`\`\`text
Query plan:
  iscan                           ← 인덱스 스캔, 빨간 구간 없음
    class: rcpt_list
    index: ix_rcpt_list_01
\`\`\`

\`sscan\`이 \`iscan\`으로 바뀌었고, 정렬 \`temp\` 노드는 사라졌다. 조회 시간은
**53초 → 1초 미만**. 이후 월간 운영 점검에서 이 화면의 Slow Query
특이사항은 0건으로 유지됐다.

## 배운 점

- **튜닝은 플랜을 여는 데서 시작한다.** "느리다"는 증상만으로 인덱스를
  추측해서 걸면 안 걸리는 인덱스만 늘어난다. 빨간 구간(고비용 노드)이
  어디인지 — 읽기인지 정렬인지 — 를 먼저 확인하면 고칠 곳은 한 군데로
  좁혀진다.
- **인덱스 설계는 컬럼 나열이 아니라 순서 결정이다.** 등치 → 범위 → 정렬의
  배치, 선택도, 정렬 방향까지 맞아야 WHERE와 ORDER BY가 인덱스 하나로
  끝난다. 순서가 틀린 복합 인덱스는 없는 것과 비슷하다.
- **인덱스는 공짜가 아니다.** INSERT/UPDATE마다 인덱스도 갱신된다. 접수
  테이블은 조회가 압도적이라 남는 장사였지만, 쓰기 위주 테이블이었다면
  같은 결정을 하지 않았을 것이다.
- **조건절 습관이 인덱스를 살리고 죽인다.** 컬럼 가공과 선행 와일드카드는
  일반 인덱스의 효율적인 범위 탐색을 방해할 수 있다. 인덱스 설계와 쿼리 작성 규칙은 세트로
  다녀야 한다.
`,r=`---
title: CWE-209 오류 메시지 정보노출 — 예외 로깅이 보안 결함이 되는 순간
date: 2026-08-12
tags: Security, Java, SAST
summary: e.getMessage() 문자열 조립, printStackTrace 등 예외 정보가 새어 나가던 25여 건을 "고정 문구 + throwable 전달" 원칙으로 통일한 기록
---

정적분석 도구 코드레이(CodeRay)가 검출한 결함 중 반복적으로 나타난 유형이
**CWE-209(민감한 정보가 포함된 오류 메시지 생성)** 였다. 레거시 Java 코드 곳곳에서
예외의 내부 정보가 로그 문자열, 사용자 응답, 심지어 DB 이력 테이블까지 새어 나가고 있었다.

## 무엇이 문제인가

예외 메시지에는 생각보다 많은 것이 담긴다. 파일 경로, DB 접속 정보 조각, 클래스 구조,
호스트/포트 — 공격자에게는 시스템 내부를 추측할 단서가 된다. 문제 코드는 형태가 다양했지만
본질은 같았다. **예외 객체의 내부 문자열을 직접 조립해서 내보내는 것.**

\`\`\`java
// 유형 1 — 예외 원문을 문자열로 조립해 로깅
LOGGER.error("[" + e.getClass() + "] : " + e.getMessage());

// 유형 2 — 스택트레이스를 표준출력으로
e.printStackTrace();

// 유형 3 — 예외 원문을 DB 이력에 저장
saveHistory(String.format("실패 [에러: %s]", ex.getMessage()));

// 유형 4 — 예외 원문을 새 예외 메시지에 담아 전파
throw new SQLException(ie.getMessage());
\`\`\`

## 조치 원칙 — 하나로 통일

25여 건을 개별로 고민하지 않고 원칙 하나를 정해 전부 같은 방식으로 조치했다.

> **사람에게 보이는 메시지는 고정 문구, 예외 상세는 throwable 인자로만.**

\`\`\`java
// After — 고정 문구 + throwable 전달
LOGGER.error("데이터 처리 중 오류가 발생했습니다.", e);

// DB 이력도 고정 메시지만
saveHistory("작업 실행 오류");

// 예외 전파 시에는 원인을 cause 체인으로
throw new SQLException("데이터 읽기 중 오류가 발생했습니다.", ie);
\`\`\`

throwable 인자는 원인과 스택트레이스를 보존하기 위한 것이다. **예외 메시지 안의 민감정보까지 자동으로 지워주지는 않는다.** 실제 출력 위치는 로깅 설정에 달려 있으므로 사용자 응답과 내부 진단 로그를 분리하고 접근 권한·보관 기간·마스킹도 확인해야 한다. 고정 문구로 바꿨다는 사실만으로 로그 유출 위험이 없어졌다고 볼 수 없다.

함정 하나 — \`LOGGER.error("오류: {}", e.getMessage(), e)\` 처럼 getMessage를
플레이스홀더에 넣는 코드도 있었다. throwable을 넘기고 있으니 괜찮아 보이지만,
메시지 원문이 로그 한 줄에 그대로 박히는 건 동일해서 함께 정리했다.

## 배운 점

- 예외 처리 코드는 "에러 났을 때만 도는 코드"라서 리뷰에서 가장 관대해지기 쉬운 곳이고,
  그래서 결함이 가장 많이 쌓여 있었다.
- 유형이 4가지여도 조치 원칙이 하나면 25건이 한 방향으로 정리된다. 원칙을 먼저 문서로
  합의하고 시작한 것이 일관성을 만들었다.
`,i=`---\r
title: CWE-330·489·497 — 결함의 절반은 쓰지 않는 코드에 있었다\r
date: 2026-08-12\r
tags: Security, Java, SAST\r
summary: 부적절한 난수, 디버그 코드, 시스템 정보 노출 검출을 추적해 보니 대부분 미사용 벤더 모듈과 테스트 화면 — 진입점 역추적 후 삭제로 종결한 기록\r
---\r
\r
시큐어코딩 점검에서 흥미로운 통계가 하나 나왔다. **CWE-330(부적절한 난수),\r
CWE-489(활성 디버그 코드), CWE-497(시스템 정보 노출)** 검출을 추적해 보니,\r
대부분이 실서비스 코드가 아니라 **아무도 쓰지 않는 코드**에서 나온 것이다.\r
\r
## 발견된 것들\r
\r
- **벤더 인증 모듈 잔재** — 과거에 쓰다 중단한 인증서 로그인 모듈이 통째로 남아\r
  있었다. 그 안의 \`Math.random()\` 기반 세션 ID 생성, 난독화 번들 속 취약 난수가\r
  CWE-330으로 줄줄이 검출됐다.\r
- **진단/샘플 페이지** — 서버의 시스템 프로퍼티 전체를 화면에 덤프하는 벤더 진단용\r
  JSP(CWE-497), 본인확인 연동 샘플, 컴포넌트 테스트 화면(CWE-489).\r
- **테스트 컨트롤러** — 개발 중 연계 테스트용으로 만든 컨트롤러가 배포 대상에\r
  포함되어 있었다.\r
- **미사용 연동 기능** — 쿠키 값으로 사용자를 식별하는 소셜 로그인 연동 코드\r
  (CWE-807, 신뢰할 수 없는 입력 기반 보안 결정). 화면 진입점도, 인터셉터 등록도\r
  없는 죽은 기능이었다.\r
\r
## 조치 — 고치지 않고 지우기 위한 확인 절차\r
\r
이런 코드는 escape를 씌우고 난수를 SecureRandom으로 바꾸는 "수리"가 답이 아니다.\r
**쓰지 않음을 증명하고 지우는 것**이 답이다. 다만 증명 없이 지우면 사고가 나므로,\r
파일마다 같은 절차를 밟았다.\r
\r
1. **진입점 역추적** — 컨트롤러 매핑, 화면 흐름, include/script 로드 관계를 따라\r
   이 파일에 도달하는 경로가 있는지 확인\r
2. **참조 전수검색** — 활성 화면에서의 참조가 0건인지 소스 전체 검색으로 확인\r
3. **실사용 대체재 확인** — 예를 들어 실서비스 인증코드 생성은 \`SecureRandom\`을\r
   쓰고 있음을 확인해서, 삭제 대상이 실기능과 무관함을 기록\r
4. **삭제 + 사유 기록** — 조치 내역에 "미사용 근거"를 남겨 감리에 대응\r
\r
이 절차로 벤더 모듈 디렉터리, 테스트 화면, 테스트 컨트롤러, 미사용 연동 기능을\r
삭제해 수십 건을 종결했다. 파일 하나 지우면 그 안의 검출 여러 건이 함께 사라지므로,\r
건수 대비 효율이 가장 높은 조치이기도 했다.\r
\r
## 덤 — 미사용 유틸의 TOCTOU (CWE-367)\r
\r
파일 목록을 나열한 뒤 각 파일의 상태를 읽는 사이에 파일이 바뀔 수 있다는\r
경쟁조건 검출도 있었다. 확인해 보니 어디서도 인스턴스화되지 않는 파일 감시 유틸.\r
같은 원칙(미사용 확인 → 해당 구간 제거)으로 정리했다.\r
\r
## 배운 점\r
\r
- 취약점의 상당수는 "잘못 짠 코드"가 아니라 **"지웠어야 할 코드"** 에서 나온다.\r
  벤더 샘플, 테스트 화면, 중단된 연동 — 배포 산출물에 실리는 순간 전부 공격 표면이다.\r
- 삭제는 가장 강력한 보안 조치지만, 근거 없는 삭제는 장애의 지름길이다.\r
  "진입점 역추적 → 참조 검색 → 사유 기록"의 절차화가 삭제를 안전한 조치로 만들었다.\r
`,a=`---
title: CWE-404·496 — 자원 해제와 방어적 복사, 객체를 안전하게 다루는 두 가지
date: 2026-08-12
tags: Security, Java, SAST
summary: 수동 close를 try-with-resources로 전환하고(CWE-404), setter의 배열 참조 저장을 방어적 복사로 바꾼(CWE-496) 조치 기록
---

건수는 적지만 Java의 기본기를 묻는 두 유형을 함께 정리한다.
**CWE-404(부적절한 리소스 종료/해제)** 와 **CWE-496(Private 배열에 Public 데이터 할당)**.

## CWE-404 — 예외가 나면 close는 실행되지 않는다

레거시 코드의 스트림 처리는 대부분 이런 모양이었다.

\`\`\`java
// Before — 중간에 예외가 나면 close에 도달하지 못한다
OutputStream os = con.getOutputStream();
BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(os, "UTF-8"));
writer.write(param);
writer.flush();
writer.close();
\`\`\`

닫는 코드가 있긴 하다. 문제는 **정상 경로에만 있다**는 것. \`write()\`에서 예외가 나면
close는 실행되지 않고 커넥션/스트림이 누수된다. 트래픽이 몰리는 날 서버가 서서히
느려지는 종류의 버그다.

\`\`\`java
// After — try-with-resources: 정상이든 예외든 자동 close
try (OutputStream os = con.getOutputStream();
     BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(os, "UTF-8"))) {
    writer.write(param);
    writer.flush();
}
\`\`\`

Java 7의 try-with-resources로 전환하면 선언 역순으로 자동 해제된다.
예외별로 중복돼 있던 수동 close 로직도 함께 제거되어 코드가 오히려 짧아졌다.
try-with-resources를 못 쓰는 구조(조건부 생성)는 try/finally로 해제를 보장했다.

## CWE-496 — setter가 배열 참조를 그대로 저장하면

\`\`\`java
// Before — 외부 배열의 "참조"를 그대로 보관
public void setLocations(Resource[] locations) {
    this.locations = locations;
}
\`\`\`

이 코드의 문제는 미묘하다. 호출자가 넘긴 배열을 나중에 수정하면, 이 객체의
내부 상태가 **객체 바깥에서 바뀐다.** private 필드라는 캡슐화가 사실상 무력화되는 것.

\`\`\`java
// After — 방어적 복사: 내 상태는 내 것만 가리키게
public void setLocations(Resource[] locations) {
    this.locations = (locations == null) ? null : locations.clone();
}
\`\`\`

배열 clone은 배열 컨테이너의 얕은 복사다. 호출자가 배열 원소를 바꾸는 영향은 막지만, 가변 Resource 객체 자체는 공유될 수 있다. getter로 배열을 내줄 때도
같은 원리(복사본 반환)가 적용된다.

## 배운 점

- 이 두 유형은 "보안 결함"이라기보다 **견고함의 문제**다. 하지만 자원 누수는 가용성
  공격의 통로가 되고, 참조 노출은 검증 우회의 통로가 된다 — 견고하지 않은 코드가
  곧 공격 표면이라는 걸 정적분석 룰이 상기시켜 준다.
- try-with-resources 전환은 기계적으로 가능한 몇 안 되는 조치라, 이런 유형부터
  빠르게 끝내고 판단이 필요한 유형에 시간을 쓰는 순서가 효율적이었다.
`,o=`---
title: CWE-476 Null Pointer 역참조 — 검출 15건을 한 곳에서 잡은 이야기
date: 2026-08-12
tags: Security, Java, SAST
summary: NPE 검출 20여 건을 라인 단위가 아니라 근원 단위로 추적해, 공통 유틸 한 곳 수정으로 15건을 일괄 해소한 기록
---

**CWE-476(NULL 포인터 역참조)** 은 검출 건수만 보면 20건이 넘었다.
그런데 검출 위치를 하나씩 열어 보니, 상당수가 **같은 메서드를 가리키고 있었다.**

## 검출 15건의 근원은 한 곳이었다

여러 화면의 입력 정제 코드가 공통 유틸의 문자열 치환 메서드를 호출하고 있었고,
정적분석은 호출 지점마다 결함을 하나씩 찍었다. 진짜 문제는 치환 메서드 내부에 있었다.

\`\`\`java
// Before — target/from/to가 null이면 indexOf/substring/length에서 NPE
private static String replace(String target, String from, String to) {
    int idx = 0;
    while ((idx = target.indexOf(from, idx)) != -1) {
        target = target.substring(0, idx) + to + target.substring(idx + from.length());
        idx += to.length();
    }
    return target;
}

// After — 역참조 대상을 메서드 입구에서 직접 가드
private static String replace(String target, String from, String to) {
    if (target == null || from == null || to == null) {
        return target;
    }
    ...
}
\`\`\`

호출부 15곳을 각각 고치는 대신 **근원 메서드 한 곳에 null 가드**를 넣어
검출 15건을 일괄 해소했다. 라인 단위로 따라갔다면 같은 방어 코드가 15곳에
복제됐을 것이다.

이 예제는 당시 null 조치 범위만 보여준다. 빈 \`from\`은 반복이 끝나지 않을 수 있으므로 빈 문자열 정책도 별도 검증해야 한다. 해당 검증이 당시 적용됐는지는 확인 필요다.

## 나머지 케이스 — "null을 반환할 수 있는 API"들

남은 검출은 대부분 표준 API의 null 반환 가능성을 잊은 코드였다.

\`\`\`java
// System.getProperty는 null을 반환할 수 있다
output.write(System.getProperty("line.separator").getBytes());
// → non-null이 보장되는 System.lineSeparator()로 교체

// getCodeSource(), getLocation()도 null 반환 가능한 체인
clazz.getProtectionDomain().getCodeSource().getLocation().getPath()
// → 단계별 null 가드 + 디버그 로그는 isDebugEnabled 선평가로 감쌈
\`\`\`

가장 재미있었던 건은 **API의 계약 자체를 바꾼 케이스**다. 허용되지 않은 호출자면
null을 반환하던 내부 메서드가 있었는데, 호출부 4곳이 전부 반환값을 검사 없이
사용해서 검출 4건이 나왔다. null 반환을 **예외 throw로 변경**하니 호출부를
한 줄도 고치지 않고 4건이 사라졌다 — 실패를 null로 알리는 API는 호출부 수만큼
NPE 위험을 복제한다.

## 배운 점

- 정적분석의 검출 단위는 "라인"이지만 결함의 단위는 "설계"다. 검출 목록을 근원별로
  다시 묶는 작업이 조치의 절반이었다.
- null 가드를 추가하는 것과 null이 나올 수 없게 만드는 것(non-null API 교체,
  예외 계약으로 변경) 중 후자가 가능하면 항상 후자가 낫다. 가드는 잊혀지지만
  계약을 명확히 하면 호출부가 실패를 다루기 쉬워진다. 다만 Java에서 null 불가나 unchecked 예외 처리가 자동으로 컴파일 강제되는 것은 아니다.
`,s=`---
title: CWE-615 주석 속 민감정보 — 주석 처리했다고 사라지는 게 아니다
date: 2026-08-12
tags: Security, Java, SAST
summary: 주석에 남은 인증 관련 정보 제거 기록 — 소스·형상관리와 HTML/JS 산출물의 노출 경로를 구분하고, 이력에 남은 비밀정보는 별도 조치해야 한다
---

**CWE-615(소스 코드 주석에 민감한 정보 포함)** 로 검출된 건들은 코드를 한 줄도
실행하지 않는 "죽은 텍스트"였다. 그런데 조치 우선순위는 높음이었다. 왜일까.

## 발견된 것들

\`\`\`java
// 케이스 1 — 주석 처리된 옛 로그인 코드에 인증 엔드포인트와 파라미터 구성이 통째로
//response.sendRedirect(ctx + "/auth_check?username=" + user.getId() + "&password=" + user.getKey());

// 케이스 2 — 주석 블록 안의 테스트 main()에 하드코딩 password/salt
/*
public static void main(String[] args) {
    String password = "abc";
    String salt = "def";
    ...
}
*/

// 케이스 3 — 쓰지 않게 된 password 파라미터 참조가 주석으로 잔존
//String password = request.getParameter("password");
\`\`\`

공통점은 전부 **"나중에 쓸지 몰라서" 주석 처리해 둔 코드**라는 것.
기능을 끄면서 지우지 않고 주석으로 남긴 흔적들이다.

## 주석이 왜 위험한가

- 일반 Java 주석은 컴파일된 class에 그대로 포함되지 않는다. 반면 HTML/JS 주석이나 소스를 포함한 패키지·백업·형상관리는 노출 경로가 될 수 있으므로 실제 산출물별로 확인해야 한다.
  소스가 유출되는 순간(저장소 오설정, 백업 유출, 협력사 반출) 주석 속 인증 URL과
  파라미터 구성은 실행 코드와 똑같은 가치의 정보가 된다.
- 특히 인증 관련 주석 코드는 "이 시스템이 과거에 어떻게 인증했는지, 어떤 파라미터를
  받는지"를 알려주는 공격 설계도 역할을 한다.

## 조치 — 삭제, 그리고 걱정 내려놓기

조치는 전부 **해당 라인 삭제**다. 간단하지만 심리적 저항이 있는 조치이기도 하다.
"나중에 필요하면?" — 필요 없다. **형상관리(Git) 이력에 전부 남아 있다.**
다만 실제 비밀번호·키가 노출됐다면 현재 파일 삭제만으로 끝나지 않는다. 해당 비밀정보 폐기·교체와 접근 기록 확인이 필요하며, Git 이력에 남은 값도 노출 범위에 포함된다. 이 글의 예시는 일반화한 값이다. 일반 참고 주석의 보존 여부와 민감정보 조치는 구분한다.

## 배운 점

- 주석 처리된 코드는 기능적으로는 죽어 있지만 정보로서는 살아 있다.
  "주석이니까 괜찮다"는 실행 관점의 판단이고, 보안은 노출 관점으로 판단해야 한다.
- 이런 결함이 쌓이는 걸 막는 건 결국 코드 리뷰 문화다 — "주석 처리 말고 삭제하세요,
  이력은 Git에 있습니다" 한 마디면 예방되는 유형이다.
`,c=`---
title: CWE-676 위험한 API 사용 — eval을 지우기 전에 해야 하는 일
date: 2026-08-12
tags: Security, JavaScript, Java, SAST
summary: 레거시 JS의 eval 호출부를 조사해 문자열 평가를 제거하고 deprecated API를 정리한 기록 — 동적 콜백 허용 범위는 추가 확인 과제로 구분
---

**CWE-676(잠재적으로 위험한 함수 사용)** 검출의 주인공은 예상대로 JavaScript의
\`eval\`이었다. 그런데 이 유형의 조치에서 정작 오래 걸린 건 코드를 고치는 일이 아니라,
**고쳐도 되는지 확인하는 일**이었다.

## 케이스 1 — 문자열 조립 eval은 문법으로 대체된다

\`\`\`js
// Before — 폼/필드 이름을 문자열로 조립해 eval
var fields = eval("document.forms." + formName + "." + fieldName);

// After — 대괄호 표기법: 동작 동일, 인젝션 불가
var fields = document.forms[formName][fieldName];
\`\`\`

동적으로 프로퍼티에 접근하고 싶어서 eval을 쓴 전형적인 케이스.
JavaScript의 대괄호 표기법이 정확히 이 용도라서, 코드 인젝션 가능성만 제거하고
동작은 그대로 유지된다. 90년대 스타일 레거시 JS에서 아주 흔한 패턴이다.

## 케이스 2 — 콜백 eval, 지우기 전에 전수조사

\`\`\`js
// Before — 콜백이 문자열이면 eval로 실행
if (typeof callback === "function") {
    callback();
} else if (callback) {
    eval(callback);
}
\`\`\`

공통 확인창 유틸의 콜백 처리다. 여기서 eval을 그냥 지우면 문자열 콜백을 넘기는
화면이 조용히 깨진다. 그래서 먼저 **호출부 22곳을 전수조사**했다.
결과: 전부 함수 참조를 넘기고 있었고, 문자열 분기는 실행된 적 없는 dead path였다.

확인이 끝났으니 안전하게 대체할 수 있었다.

\`\`\`js
// 당시 변경 — 문자열 코드 평가 대신 전역 함수 이름으로 조회
} else if (typeof window[callback] === "function") {
    window[callback]();
}
\`\`\`

이 변경은 문자열을 코드로 평가하는 \`eval\`을 제거하지만, 공격자가 이름을 고르면 의도하지 않은 전역 함수를 호출할 수 있다. 함수 참조만 받거나 허용한 콜백 맵으로 제한하는 것이 추가 개선안이다. 당시 허용 목록 검증 여부는 확인 필요다.

## 케이스 3 — deprecated API의 조용한 위험

\`\`\`java
// Before — 플랫폼 기본 charset에 의존 (deprecated)
String enc = URLEncoder.encode(text);

// After — charset 명시
String enc = URLEncoder.encode(text, "UTF-8");
\`\`\`

서버 OS 설정에 따라 인코딩 결과가 달라질 수 있는 API. 보안 결함이라기보다
이식성 결함에 가깝지만, 인코딩 불일치는 필터 우회의 재료가 되기도 해서 함께 정리했다.

## 조치불가 판정 — 서드파티 라이브러리 속 eval

오픈소스 JSON 폴리필과 벤더 암호화 번들 안에도 eval 검출이 있었다.
난독화·압축된 서드파티 산출물을 직접 수정하는 건 라이선스와 유지보수 양쪽에서
부적합하다고 판단해 **"조치불가 + 사유 기록"** 으로 종결했다.
모든 검출을 억지로 고치는 것보다, 못 고치는 이유를 남기는 것이 감리 관점에서 정직하다.

## 배운 점

- eval 제거의 핵심은 대체 문법이 아니라 **영향 범위 확인**이다. 호출부 전수조사 없이
  고쳤다면 "보안 조치가 기능을 깨뜨린" 사례가 됐을 것이다.
- 정적분석 도구는 서드파티 코드도 가리지 않고 찍는다. 수정/제외/조치불가를 판정하고
  사유를 기록하는 것까지가 조치 프로세스다.
`,l=`---
title: CWE-754 부적절한 예외 처리 — catch(Exception)을 걷어내며
date: 2026-08-12
tags: Security, Java, SAST
summary: 광범위한 catch, 무의미한 재던지기, 예외 삼키기, null 미검사 — 네 가지 안티패턴을 걷어낸 예외 처리 정비 기록
---

**CWE-754(비정상적이거나 예외적인 조건에 대한 부적절한 검사)** 로 검출된 15여 건을
정리했다. 하나의 CWE지만 실제 코드에서는 네 가지 안티패턴으로 나타났고,
각각 조치 방법이 달랐다.

## 안티패턴 1 — 광범위한 catch(Exception)

\`\`\`java
// Before — 모든 예외를 한 덩어리로
try {
    executeRemoteCall(config);
} catch (Exception e) { ... }

// After — try 블록이 실제로 던지는 예외로 좁힘
try {
    executeRemoteCall(config);
} catch (IOException e) { ... }
\`\`\`

\`catch(Exception)\`은 의도하지 않은 예외(버그로 인한 NPE 등)까지 삼켜서
문제를 숨긴다. try 블록이 실제로 던질 수 있는 예외를 확인하고 그것만 잡도록 좁혔다.
DB 접근과 일반 로직이 섞인 블록은 \`DataAccessException\` catch를 앞에 추가하는
2단 구성으로 갔다.

## 안티패턴 2 — 잡아서 그대로 다시 던지기

\`\`\`java
// Before — catch가 하는 일이 없다
try {
    return doProceed();
} catch (Throwable e) {
    throw e;          // 무의미
} finally {
    stopWatch.stop();
}

// After — try/finally만 남김 (동작 동일)
try {
    return doProceed();
} finally {
    stopWatch.stop();
}
\`\`\`

메서드가 이미 \`throws Throwable\`이고 finally는 어차피 실행되므로,
catch 블록은 존재 이유가 없었다. 같은 클래스 안에 복사-붙여넣기로 4곳 반복되어 있었다.

## 안티패턴 3 — 예외 삼키기

\`\`\`java
// Before — 프린트만 하고 아무 일도 없었던 것처럼 진행
} catch (Exception e) {
    e.printStackTrace();
}

// After — 로깅하고, 호출자에게 실패를 알림
} catch (IOException e) {
    LOGGER.error("파일 다운로드 처리 중 오류가 발생했습니다.", e);
    throw new IOException("파일 다운로드 처리 중 오류가 발생했습니다.", e);
}
\`\`\`

위 예제는 원인 예외를 보존하도록 보완했다. catch 범위 자체보다 실패를 숨기는지가 중요하며, 최상위 오류 응답 경계에서 광범위한 예외를 처리하는 것은 별도 판단이다.

삼켜진 예외는 "다운로드가 조용히 안 되는" 유령 버그가 된다. AJAX 응답을 반환하는
컨트롤러는 예외를 다시 던지는 대신 \`result=false\`로 정상적인 실패 JSON을
반환하도록 바꿨다 — 전파와 응답 중 무엇이 맞는지는 호출자가 누구냐에 따라 갈린다.

## 안티패턴 4 — 실패 조건 미검사

연결 생성 함수가 실패 시 null을 반환하는데 호출부가 검사 없이 바로 사용하는 코드.
null 체크를 추가하는 것으로 조치했지만, 근본적으로는 "실패를 null로 알리는 API"
자체가 문제라는 걸 다음 편(CWE-476)에서 다시 만나게 된다.

## 배운 점

- 같은 CWE 번호라도 코드 현실은 여러 갈래다. 검출 결과를 안티패턴 단위로 다시
  분류해야 조치 방법이 명확해진다.
- 예외 처리의 기준은 "잡을 수 있는 것만 잡고, 잡았으면 책임진다(로깅+전파 또는
  명시적 실패 응답)"로 요약된다. 이 기준에 안 맞는 catch는 대부분 지우는 게 답이었다.
`,u=`---
title: CWE-79 크로스 사이트 스크립팅 — 레거시 JSP 200여 건 조치 기록
date: 2026-08-12
tags: Security, JSP, XSS, SAST
summary: 코드레이 정적분석에서 검출된 CWE-79 결함 200여 건을 패턴별로 분류하고, 레거시 JSP 출력 구조를 개편해 조치한 과정 정리
---

공공기관 웹 시스템의 웹 취약점 점검 과제를 수행하면서, 정적분석 도구 **코드레이(CodeRay)** 가
검출한 **CWE-79(크로스 사이트 스크립팅)** 결함 200여 건을 조치했다.
대상은 eGovFrame + Spring MVC + JSP 기반의 레거시 시스템이었다.

건수는 많았지만 원인은 몇 가지 패턴으로 수렴했다. 그래서 결함을 하나씩 고치기 전에
**전체를 유형별로 분류하는 작업부터** 했고, 유형마다 표준 조치 방식을 정한 뒤 일괄 적용했다.
이 글은 그 분류와 조치 기준의 기록이다. (예시 코드는 전부 일반화한 것이다.)

## 전제 — 이 시스템의 방어 구조

이 시스템은 서블릿 필터가 요청 파라미터의 특수문자(\`<\` \`>\` \`"\` \`'\` 등)를
HTML 엔티티로 인코딩해서 DB에 저장하는, **입력 측 방어**가 이미 있는 구조였다.

문제는 출력 측이었다. JSP에서 EL(\`\${...}\`)을 그대로 출력하는 코드가 화면 곳곳에 있었고,
필터를 거치지 않는 값(예외 메시지, 내부 조회 값, 외부 연동 리턴값)은 입력 방어의 보호도 받지 못했다.
**방어는 출력 컨텍스트에서 완성된다**는 원칙으로 출력부 전체를 손봤다.

## 패턴 1 — HTML 본문의 raw EL 출력 (가장 많음)

목록과 상세 화면의 \`<td>\`, \`<div>\` 안에 EL을 그대로 찍는 코드. 전형적인 XSS 출력점이다.

\`\`\`jsp
<%-- Before --%>
<td><div class="txt">\${item.userName}</div></td>

<%-- After --%>
<td><div class="txt"><c:out value="\${item.userName}"/></div></td>
\`\`\`

JSTL \`c:out\`은 기본값으로 escapeXml이 켜져 있어 \`<\` \`>\` 등을 엔티티로 치환해 준다.
단순해 보이지만 전체 검출의 절반 이상이 이 패턴이었다.

### 함정 — "마스킹했으니 안전하다"는 착각

이름·전화번호 마스킹 함수를 거친 출력은 안전해 보이지만, 마스킹은 **개인정보 보호**이지
**escape가 아니다**. 마스킹 후에도 남는 문자열에 스크립트 조각이 살아 있을 수 있다.
그래서 마스킹 함수 출력부도 예외 없이 \`c:out\`으로 감쌌다.

\`\`\`jsp
<%-- 마스킹 함수도 escape 대상이다 --%>
<c:out value="\${custom:nameMasking(item.userName)}"/>
\`\`\`

## 패턴 2 — 인코딩 저장값의 이중 처리 (디코딩 + 재이스케이프)

입력 필터가 인코딩한 값을 그대로 출력하면 화면에 \`&lt;\` \`&#40;\` 같은 깨진 문자가 보인다.
그렇다고 raw로 출력하면 XSS다. 답은 **디코딩해서 원문으로 되돌린 뒤, 출력 시점에 다시 escape**
하는 것이다.

\`\`\`jsp
<%-- Before: 인코딩된 값이 그대로 노출되거나, raw 출력으로 XSS 위험 --%>
\${item.address}

<%-- After: 커스텀 EL 함수로 디코딩 → c:out으로 재이스케이프 --%>
<c:out value="\${custom:decode(item.address)}"/>
\`\`\`

"입력에서 한 번 막았으니 출력은 자유"가 아니라, 입력 인코딩과 출력 escape는
**각자 자기 계층의 계약을 지켜야** 전체가 안전해진다. 주소류 필드처럼 사용자가
직접 타이핑하는 값에 이 패턴을 집중 적용했다.

## 패턴 3 — HTML을 반환하는 서버 함수 출력

셀렉트박스 옵션을 서버 측 공통코드 함수가 \`<option>...</option>\` HTML 문자열로
만들어 주는 레거시 구조가 있었다. 이걸 \`c:out\`으로 감싸면 태그가 문자 그대로
화면에 노출되어 UI가 깨진다.

\`\`\`jsp
<%-- Before: 함수가 만든 HTML을 raw EL로 출력 --%>
<select>\${custom:codeOptions('CODE_GROUP')}</select>

<%-- After: 통제된 raw 출력 전용 커스텀 태그로 이관 --%>
<select><egovc:rawHtml value="\${custom:codeOptions('CODE_GROUP')}"/></select>
\`\`\`

당시 조치는 **raw 출력 지점을 한 곳으로 모으는 것**이었다. 이것만으로 XSS가 해결된 것은 아니다. 옵션 값·표시명에도 외부 데이터가 섞일 수 있고, rawHtml 태그가 위험한 HTML을 제거하는지도 따로 확인해야 한다.
전용 커스텀 태그를 만들어 두면 ① raw 출력 지점이 코드 검색 한 번에 전부 드러나고
② "이 태그에는 사용자 입력을 넣지 않는다"는 규칙을 리뷰에서 강제할 수 있다.
\`fn:replace\`로 강조 태그(\`<span>\`)를 만들어 raw 출력하던 케이스도 같은 방식으로 정리했다.

## 패턴 4 — 에러 페이지의 예외 메시지 출력

공통 에러 JSP들이 \`\${exception.message}\`, \`\${pageTitle}\` 같은 값을 그대로 출력하고 있었다.
예외 메시지에는 요청 파라미터가 섞여 들어오는 경우가 많아서 reflected XSS의 통로가 된다.

\`\`\`jsp
<%-- Before --%>
<p class="title">\${exception.message}</p>

<%-- After --%>
<p class="title"><c:out value="\${exception.message}"/></p>
\`\`\`

이 예제는 XSS 출력 인코딩 조치만 보여준다. 예외 원문 노출(CWE-209)은 별개이므로 사용자 응답은 고정 안내 문구로 바꾸고 상세 원인은 접근이 제한된 로그에 남겨야 한다. 실제 최종 에러 템플릿은 확인 필요다.

에러 페이지는 "화면"으로 잘 인식되지 않아 점검에서 누락되기 쉬운 사각지대였다.
이번 조치에서 에러 템플릿 전체를 한 번에 정리했다.

## 패턴 5 — 죽은 코드는 고치지 않고 삭제

검출 건수 2위는 의외의 곳에서 나왔다. 본인확인 연동 샘플, 인증서 벤더의 진단용 샘플,
컴포넌트 테스트 화면 같은 **미사용 JSP**들이 \`request.getParameter()\`를 스크립틀릿으로
그대로 출력하고 있었다.

\`\`\`jsp
<%-- 파라미터를 무방비로 출력하는 벤더 샘플 코드 --%>
<li>결과메세지 : <%=RESULT_MSG%></li>
\`\`\`

이런 파일은 escape를 씌워 "고치는" 것보다, 실제 진입 경로가 없음을 확인하고
**삭제해서 공격 표면 자체를 없애는 것**이 맞다고 판단했다. 컨트롤러 매핑과
화면 흐름을 역추적해 미사용을 확인한 뒤 40여 건을 파일 삭제로 종결했다.

## 패턴 6 — 에디터 본문처럼 escape할 수 없는 값

위지윅 에디터로 작성된 게시 본문은 HTML 태그를 보존해야 해서 escape가 불가능하다.
이 영역은 raw EL이 화면 여기저기 흩어져 있던 것을 패턴 3의 전용 태그로 모아,
**"raw 출력이 허용된 유일한 통로"** 로 단일화했다. 대신 이 값의 안전성은
에디터의 허용 태그 정책과 입력 필터에 맡겼다고 기록했다. 그러나 클라이언트 에디터 제한은 우회할 수 있고, 단순 HTML 인코딩 필터는 HTML 정화(sanitization)를 대신하지 않는다. 서버에서 허용 태그·속성·URL 프로토콜을 검사하는 정화 구현과 우회 테스트는 **확인 필요**다. rawHtml로 모았다는 이유만으로 안전 판정을 내리지 않는다. [OWASP XSS 방어 지침](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)

## 정리

| 패턴 | 조치 | 비고 |
| --- | --- | --- |
| HTML 본문 raw EL | c:out 래핑 | 마스킹 함수 출력 포함 |
| 인코딩 저장값 | 디코딩 + c:out 재이스케이프 | 입력 필터와 역할 분담 |
| HTML 반환 함수 | 전용 rawHtml 커스텀 태그 | 출력 통로 정리. 값 인코딩·정화 검증 별도 필요 |
| 에러 페이지 예외 메시지 | c:out 래핑 | 점검 사각지대 |
| 미사용 샘플/테스트 JSP | 파일 삭제 | 공격 표면 제거 |
| 에디터 HTML 본문 | rawHtml 태그로 통로 단일화 | 서버 정화 구현·우회 테스트 확인 필요 |

## 배운 점

- **결함 200건 ≠ 문제 200개.** 분류부터 하면 원인은 소수의 패턴으로 수렴하고,
  패턴별 표준 조치를 정하면 일관성 있게 빠르게 끝난다. 개별 건을 하나씩 고쳤다면
  같은 위치에 다른 방식의 코드가 섞였을 것이다.
- **escape는 컨텍스트가 결정한다.** HTML 본문, 태그를 보존해야 하는 본문,
  깨진 문자를 되돌려야 하는 인코딩 값 — 같은 XSS 지적이라도 답이 다르다.
- **삭제도 조치다.** 쓰지 않는 코드는 고치는 순간부터 다시 유지보수 대상이 된다.
  미사용이 확인되면 지우는 것이 가장 확실한 보안 조치였다.
- **정적분석 도구와 일하는 법.** 도구는 같은 라인을 중복 검출하기도 하고,
  위험하지 않은 출력을 지적하기도 한다. 검출 결과를 그대로 따라가는 게 아니라
  코드 맥락을 판단해 조치/제외를 구분하고 사유를 남기는 것까지가 조치다.
`,d=`---
title: MyBatis를 JPA처럼 쓰던 연계 로직 — 범용 동적 쿼리를 정적 쿼리로 되돌리기
date: 2026-06-17
tags: Java, MyBatis, SQL, Security
summary: 테이블명·컬럼명을 문자열 치환으로 조립하던 망간 데이터 동기화 로직을 테이블별 정적 쿼리로 재작성한 기록 — 그리고 대상 목록을 코드에서 뽑았다가 테이블 하나를 누락한 사고의 수습기
---

내부망과 외부망(인터넷망)에 각각 DB를 두고 게시물·첨부파일·심사 데이터를 양방향으로
동기화하는 연계 로직이 있었다. 국자원 웹 취약점 점검 대응 과정에서 검출된 **SQL Injection
오류 14건**의 핵심 원인이 바로 이 동적 연계 구조에 있었고, 본 정적분석(코드레이)을
돌리기 전에 **연계 대상 9개 테이블(총 97개 컬럼)** 전체를 정적 statement로 재설계해
SQL 삽입 검출 0건으로 마무리했다. 그 전환 과정과 중간에 겪은 누락 사고의 수습기를
기록해 둔다.

## 원래 구조 — MyBatis로 만든 "만능 저장소"

처음 이 매퍼를 열었을 때 감탄과 걱정이 동시에 들었다. 어떤 테이블이든
동기화할 수 있는 **범용 SELECT와 범용 MERGE가 단 두 개의 statement**로
구현되어 있었다.

\`\`\`xml
<!-- 어떤 테이블이든 조회 -->
<select id="selectSyncInfo" resultType="map">
    SELECT * FROM \${targetTable} WHERE ROW_ID = #{rowId}
</select>

<!-- 어떤 테이블이든 저장: 컬럼 목록을 Java에서 조립해서 전달 -->
<update id="updateSyncInfoReg">
    MERGE INTO \${targetTable} USING DUAL
    ON (ROW_ID = #{rowId})
    WHEN MATCHED THEN UPDATE SET
        <foreach collection="updateList" item="item" separator=",">
            \${item.columnName} = #{item.columnValue}
        </foreach>
    WHEN NOT MATCHED THEN INSERT (...동일한 foreach...)
</update>
\`\`\`

Java 쪽에서 대상 테이블명과 컬럼 목록(메타데이터)을 만들어 넘기면, 매퍼가
그걸 문자열로 끼워 넣어 SQL을 완성한다. 새 테이블을 연계 대상에 추가할 때
**SQL을 한 줄도 안 써도 되는** 구조 — MyBatis를 사실상 JPA의 범용
리포지토리처럼 쓰고 있었던 셈이다. 설계자의 의도는 이해가 갔다. 연계 대상
테이블이 계속 늘어나는 시스템에서 반복 작업을 없애고 싶었을 것이다.

## 무엇이 위험했나

MyBatis에서 \`#{}\`는 PreparedStatement 바인딩 변수가 되지만, **\`\${}\`는 단순
문자열 치환**이다. 위 구조에서 문자열로 치환되는 것은 세 가지 — 테이블명,
UPDATE 컬럼명들, INSERT 컬럼명들. 즉 **SQL의 뼈대 전체가 런타임에 문자열로
조립**되고 있었다.

- 당장은 테이블명·컬럼명이 내부 코드에서만 오지만, 이 DAO를 호출하는 경로가
  하나라도 외부 입력과 닿는 순간 그대로 SQL 삽입이 된다. "지금은 안전한
  \${}"는 리팩터링 한 번, 재사용 한 번에 무너지는 전제다.
- 실행될 SQL이 소스 어디에도 완성형으로 존재하지 않는다. 정적분석 도구도,
  코드 리뷰어도, 6개월 뒤의 나도 **이 코드가 실제로 무슨 SQL을 날리는지
  읽을 수 없다.**
- \`SELECT *\`와 동적 컬럼 목록은 스키마 변경에 조용히 휩쓸린다. 컬럼이
  추가되면 어느 날부터 의도치 않은 컬럼까지 동기화되고, 그걸 알아챌 지점이 없다.

## 개선 — 테이블을 아는 쿼리로 되돌리기

방향은 "범용 1개"를 버리고 **"테이블별 정적 statement"** 로 가는 것이었다.
최종 확정된 **연계 대상 9개 테이블(총 97개 컬럼)** 각각에 대해 \`#{}\` 바인딩 변수와
명시 컬럼만 사용하는 select와 merge statement를 작성해, 국자원 웹 취약점 점검에서
지적된 **SQL Injection 취약 지점 14건을 전량 해소**했다.

\`\`\`xml
<!-- 테이블별 정적 statement: 전부 바인딩 변수, 컬럼 명시 -->
<select id="select_TB_BOARD_A" resultType="map">
    SELECT POST_ID, TITLE, CONTENT, ATTACH_ID, USE_YN, ROW_ID, ...
    FROM   TB_BOARD_A
    WHERE  ROW_ID = #{rowId}
</select>

<update id="merge_TB_BOARD_A">
    MERGE INTO TB_BOARD_A USING DUAL
    ON (ROW_ID = #{rowId})
    WHEN MATCHED THEN UPDATE SET TITLE = #{title}, CONTENT = #{content}, ...
    WHEN NOT MATCHED THEN INSERT (...) VALUES (#{postId}, #{title}, ...)
</update>
\`\`\`

그리고 DAO는 테이블명으로 SQL을 조립하는 대신, **statement id를 선택**한다.

\`\`\`java
// 테이블명은 이제 SQL 조각이 아니라 "실행할 statement의 이름"일 뿐이다
public EgovMap selectSyncInfo(SyncVO syncInfo) {
    return selectOne("SyncDAO.select_" + syncInfo.getTargetTable().toUpperCase(), syncInfo);
}
public int mergeSyncInfo(SyncVO syncInfo, EgovMap targetInfo) {
    return update("SyncDAO.merge_" + syncInfo.getTargetTable().toUpperCase(), targetInfo);
}
\`\`\`

이 한 줄의 의미가 이번 개선의 핵심이다. 테이블명이 이상한 값이면 예전 구조에서는
**그 값이 SQL에 박혀 실행**됐지만, 지금은 **존재하지 않는 statement id라서
실행 자체가 거부**된다. 매퍼에 정의된 테이블만 동작하는, 사실상의 화이트리스트가
된 것이다. 인터페이스(Service, 스케줄러, 호출부)는 그대로 두고 DAO와 매퍼만
바꿨기 때문에 연계 흐름 전체를 재작성하지 않아도 됐다.

정리하면서 곁가지 버그도 하나 잡았다. 원본 조회 결과가 없을 때도 merge가
실행되어 **반대편 데이터가 전부 NULL로 덮일 수 있는** 경로가 있어서,
"원본이 있을 때만 merge, 없으면 skip + 로그" 가드를 넣었다.

## 사고 — 대상 목록을 코드에서 뽑은 대가

여기까지가 계획대로 된 부분이고, 사고는 그다음에 났다.

테이블별 정적 statement를 만들려면 먼저 "연계 대상 테이블 전체 목록"이
필요하다. 나는 이 목록을 **소스 코드에 하드코딩된 테이블 목록에서 뽑았다.**
코드에 열거된 테이블이 곧 연계 대상 전부라고 믿은 것이다.

그런데 이 시스템에는 **동기화 이력(hist) 테이블**이 있었다. 실제로 어떤
테이블의 어떤 row가 언제 연계됐는지가 전부 기록되는 곳 — 즉 "실제 연계 대상의
전수 목록"은 코드가 아니라 **운영 데이터에** 있었다. 이력 테이블을 기준으로
뽑았다면 나왔을 테이블 하나가 코드 목록에는 없었고, 그 테이블의 정적
statement는 만들어지지 않았다.

결과는 **조용한 연계 누락**이었다. 해당 테이블의 변경분만 반대편 DB로 넘어가지
않았고, 에러도 없었다 — 동기화 요청 자체가 발생하지 않으니 실패 로그조차 없는,
가장 발견하기 어려운 종류의 장애였다. 양쪽 데이터가 어긋난 걸 확인하고서야
누락을 알았다.

## 수습 — csql과 nohup으로 양쪽을 다시 맞추기

누락 statement를 추가하는 건 금방이었지만, 문제는 **누락 기간 동안 벌어진
양쪽 데이터의 차이**였다. 애플리케이션 연계 로직으로 밀린 데이터를 재전송하는
건 건수가 많아 부적합했고, DB 레벨에서 직접 맞추기로 했다.

- 양쪽 DB에서 대상 테이블을 조회해 **차이 나는 row를 식별하는 SQL**과, 그
  차이분을 원본 기준으로 맞추는 보정 SQL을 스크립트로 작성했다.
- 실행은 DB CLI(csql)로 서버에서 직접 돌리되, 건수가 많아 세션이 끊겨도
  중단되지 않도록 **\`nohup\`으로 백그라운드 실행**하고 로그 파일로 진행 상황을
  추적했다.

\`\`\`bash
nohup csql -u <user> <db> -i sync_recover.sql > sync_recover.log 2>&1 &
tail -f sync_recover.log   # 진행 상황 모니터링
\`\`\`

보정 후에는 양쪽 테이블의 건수·키 대사(對査) 쿼리로 정합성을 재확인하고,
동기화 이력 테이블 기준으로 **코드의 대상 목록과 실제 연계 이력이 일치하는지**
검증하는 것으로 마무리했다.

## 잘한 점, 아쉬운 점

**잘한 점.**

- 스캐너가 돌기 전에 구조적 위험을 스스로 찾아 조치했다. 정적분석은 \`\${}\`를
  잘 찍지만, "이 구조가 왜 만들어졌고 어떻게 바꿔야 호출부가 안 깨지는지"는
  사람이 판단해야 하는 영역이었다.
- SQL이 소스에 완성형으로 존재하게 됐다. 리뷰 가능하고, 스캔 가능하고,
  스키마가 바뀌면 매퍼 수정이 강제되므로 변경이 드러난다.
- 인터페이스를 유지한 채 내부만 교체해서 영향 범위를 DAO 계층으로 가뒀다.

**아쉬운 점 / 부족했던 점.**

- **전환 대상 목록을 코드에서 뽑은 것.** 이번 작업 최대의 실수다. "실제로
  무엇이 연계되는가"의 진실은 동기화 이력 테이블에 있었는데, 코드에 열거된
  목록을 전수라고 믿었다. 그 결과가 위의 누락 사고다.
- **누락을 감지할 장치를 함께 만들지 않은 것.** 연계 누락은 에러가 나지 않는
  장애라서, 양쪽 건수 대사 같은 정합성 점검이 있었다면 사고 기간이 훨씬
  짧았을 것이다. 수습하면서야 대사 쿼리를 만들었다.
- **범용성의 편의는 잃었다.** 이제 연계 테이블을 추가하려면 select와 merge
  statement 두 개를 손으로 작성해야 한다. 원래 구조가 없애려던 반복 작업이
  되살아난 것이고, 이건 명백한 트레이드오프다.
- statement id를 문자열 연결로 찾는 방식은 여전히 **런타임에야 오류를 안다.**
  등록 안 된 테이블명이 오면 실행은 안 되지만, 컴파일 타임에 잡히는 것도
  아니다. enum으로 대상 테이블을 정의해 타입 수준에서 강제하는 것까지 갔어야
  했는데, 일정상 거기까지는 못 갔다.
- \`SELECT *\`를 명시 컬럼으로 바꾸는 과정은 순수 수작업이었다. 9개 테이블·97개
  컬럼 목록을 하나씩 옮겨 적으며 오타 하나가 곧 동기화 누락이 되는 작업이라,
  양쪽 DB 실데이터로 왕복 동기화를 검증하는 데 시간이 많이 들었다.

## 배운 점

- **"어떤 테이블이든 되는 코드"는 "무슨 SQL이 나가는지 아무도 모르는 코드"의
  다른 이름이었다.** 추상화가 SQL 텍스트 자체를 숨기기 시작하면, 편의가
  보안·가시성 비용으로 전환된다. MyBatis를 쓰기로 한 프로젝트라면 SQL이
  보이는 것이 MyBatis의 존재 이유다.
- \`\${}\`와 \`#{}\`의 차이는 문법이 아니라 본질이다 — 하나는 SQL을 만들고,
  하나는 값을 바인딩한다. "지금은 내부값이라 안전하다"는 코드의 현재만 보는
  판단이고, 구조는 미래의 호출자까지 책임져야 한다.
- **전수 조사의 기준은 코드가 아니라 운영 데이터다.** 코드는 "이렇게 동작해야
  한다"의 기록이고, 이력 테이블은 "실제로 이렇게 동작했다"의 기록이다. 둘이
  다를 수 있다는 걸 사고로 배웠다. 마이그레이션·전환 작업의 대상 목록은
  반드시 실적 데이터에서 뽑고, 코드 목록과 교차 검증해야 한다.
- 조용한 장애가 가장 무섭다. 실패 로그가 남는 장애는 발견되지만, 요청 자체가
  발생하지 않는 누락은 정합성 대사 같은 **능동적 점검** 없이는 드러나지 않는다.
- 보안 조치에도 트레이드오프 명세가 필요하다. 이번 선택으로 무엇을 얻고
  무엇을 포기했는지(편의 ↔ 안전·가시성)를 기록해 둬야, 다음 사람이 "왜
  이렇게 번거롭게 해놨지"라며 범용 구조로 되돌리는 일을 막을 수 있다.
`,f=`---\r
title: 이 블로그에 글 쓰는 방법\r
date: 2026-08-11\r
tags: Guide\r
summary: DB 없이 마크다운 파일로 운영되는 이 블로그의 글 작성·수정·배포 방법 정리\r
---\r
\r
이 블로그는 별도의 서버나 DB 없이 동작합니다. 글 하나가 마크다운 파일 하나이고,\r
빌드할 때 Vite가 \`src/posts/\` 폴더를 읽어 목록과 상세 페이지를 자동으로 만듭니다.\r
\r
## 글 추가하기\r
\r
\`src/posts/\` 폴더에 \`.md\` 파일을 하나 만듭니다. 파일명이 곧 글 주소가 됩니다.\r
\r
\`\`\`\r
src/posts/redis-ttl.md   →   /blog/redis-ttl\r
\`\`\`\r
\r
파일 맨 위에 글 정보를 씁니다.\r
\r
\`\`\`markdown\r
---\r
title: Redis TTL과 토큰 만료 동기화\r
date: 2026-08-15\r
tags: Redis, Spring\r
summary: 목록 카드에 보여줄 한 줄 요약\r
---\r
\r
여기부터 본문입니다. 마크다운 문법을 그대로 쓰면 됩니다.\r
\`\`\`\r
\r
## 지원하는 문법\r
\r
제목(\`#\`, \`##\`), 목록, **굵게**, \`인라인 코드\`, 코드 블록, 인용문, 링크, 표까지\r
GitHub 마크다운(GFM) 문법을 지원합니다.\r
\r
| 항목 | 필수 | 설명 |\r
| --- | --- | --- |\r
| title | O | 글 제목 |\r
| date | O | YYYY-MM-DD — 목록 정렬 기준 |\r
| tags | X | 쉼표로 구분 |\r
| summary | X | 목록 카드에 표시되는 요약 |\r
\r
## 수정과 삭제\r
\r
- 수정: 해당 \`.md\` 파일을 고치면 됩니다.\r
- 삭제: 파일을 지우면 목록에서도 사라집니다.\r
\r
## 공개(배포)\r
\r
\`\`\`bash\r
npm run build\r
npm run deploy\r
\`\`\`\r
\r
로컬에서 \`npm run dev\`로 미리 확인한 뒤 배포하면 됩니다.\r
\r
> 참고: Claude Code에게 "오늘 공부한 ○○ 내용으로 블로그 글 초안 만들어줘"라고 하면\r
> 이 형식에 맞는 파일 생성까지 한 번에 처리할 수 있습니다.\r
`,p=`---
title: 면접 정리 2 — CloudXper의 병렬 조회·권한 캐시·코드 표준화
date: 2026-10-23
tags: Interview, Retrospective, Spring, MyBatis, Redis, Performance
summary: 실제 개선 경험과 기술 원리·후속 설계를 구분해 정리한 CloudXper 면접 자료 — 병렬 처리의 한계, 캐시 만료·무효화, DTO와 팀 표준화
---

## 프로젝트 개요와 설명 범위

[CloudXper 클라우드 빌링 플랫폼 고도화](/#project-cloudxper-billing)는 AWS·GCP·Azure·Kakao의 대여·청구 정보를 통합 관리하는 플랫폼이다. (주)애버커스 빌링시스템팀에서 2024.10~2025.02 플랫폼 백엔드 개발을 담당했다. 가입·청구·상품·공통 조회 API, 권한 조회 캐시, 조회·객체 조립 구조와 팀 컨벤션 개선이 설명할 범위다. 청구 업무에서는 산정 쿼리를 작성해 결과를 제공하는 도메인별 API 구현을 수행했다(2026-11-04 저자 확인). 이 경험은 조회 SQL과 API 구현 범위로 설명한다.

주요 기술은 Spring Boot 3.x, Java, REST API, MyBatis, MySQL, Redis, Gradle이다. React는 연동 화면의 기술이며 프런트엔드 전체를 개발했다고 주장하지 않는다. Jenkins·GitLab·SonarQube는 사용 기술 목록에 있으나 구체적인 CI 단계나 품질 개선율은 확인되지 않았다.

**근거의 수준:** 이 저장소에는 업무 시스템의 실제 Java/SQL 원본과 운영 로그가 없다. 아래 경험은 [병렬 조회 회고](/blog/mybatis-builder-parallel-refactoring), [권한 캐시 회고](/blog/redis-permission-cache-ttl), [팀 표준화 회고](/blog/backend-code-convention-standardization)를 교차 검토한 것이다. 설명용 예제와 일반 원리는 구현 증거가 아니다. 확인일은 2026-11-03이며 원래 게시일은 유지했다.

## 시스템 구조와 두 가지 조회 흐름

\`\`\`text
React 화면 --HTTP 요청/응답--> Controller · DTO
                                  |
                +-----------------+------------------+
                |                                    |
          권한 조회 서비스                      업무 ServiceImpl
                |                                    |
       Redis 조회 (키: 사용자·코드 그룹)         MyBatis DAO → MySQL
          | hit         | miss                       |
       캐시 반환      MyBatis → MySQL             연관 목록 조립
                        |                            |
                   Redis 저장 → 반환          DTO → Controller → 화면
\`\`\`

1. 화면이 API를 호출하고 Controller가 입력 검증과 응답 형태를 담당한다.
2. 권한 조회는 캐시가 있으면 재사용하고, 없으면 서비스가 DB를 조회한 후 캐시를 채운다. Redis가 DB를 직접 읽지는 않는다.
3. 업무 조회는 부모 목록과 연관 상세 데이터를 읽어 DTO로 조립한다. 당시 일부 반복 조회를 병렬화했다.
4. 두 경로는 책임을 나눈 논리도다. 모든 API가 같은 권한 서비스를 차례로 거친다는 의미는 아니다. 실제 인증 필터·OAuth 제공자 배치, 서버 인가 지점은 확인 필요다.

HTTP·DB·캐시 호출은 요청 결과를 기다리는 논리 흐름으로 표시했다. 병렬 스트림은 한 API 내부의 동시 작업이며 Kafka 같은 비동기 메시징은 이 프로젝트의 근거가 없다. Redis 장애 폴백, 공통 오류 응답 형식은 실제 구현을 확인해야 한다.

## 경험 1 — 반복 조회의 대기 시간을 병렬로 겹치기

1만 건 테스트에서는 두드러지지 않던 부모 목록 + 항목별 상세 조회가 100만 건 테스트 환경에서 약 10분 걸렸다고 기록했다. 조회·조립을 ServiceImpl에 모으고 \`parallelStream\`으로 상세 조회의 대기 시간을 겹쳤다. 당시 MySQL 실행계획에 익숙하지 않아 애플리케이션에서 먼저 대응했고, EXPLAIN도 함께 봤어야 했다는 회고를 보존한다.

**최종 성과는 저자가 2026-11-03 확인한 10분 → 30초 이내다.** 이전 1분 15초 기록으로 되돌리지 않는다. 원문에는 Swagger 반복 측정·100만 건 데이터가 있지만 반환 행 수, 동시 요청 수, 반복 횟수, 자원 설정과 원본 로그는 없다. 95%는 600초 대비 30초를 기준으로 한 표현이며 모든 API의 평균·p95 개선율은 아니다.

병렬화는 SQL 수를 줄이지 않았다. 공용 워커·DB 커넥션 경합이 생길 수 있고, Spring의 일반적인 스레드 기반 트랜잭션은 새 워커에 자동 전파되지 않는다. 읽기 전용 조회도 여러 시점의 데이터를 섞어 읽을 수 있다. 실제 풀 제품·크기·부하 테스트 결과를 임의로 덧붙이지 않는다.

**지금 다시 한다면:** 먼저 SQL 수와 실행계획을 측정하고 페이지 단위 부모 키로 상세를 집합 조회한다. 상세 종류가 하나이고 한 청크라면 1+N회가 2회가 되지만, 청크 C개면 1+C회다. 빈 키 목록, 중복 키, 결과 순서, 여러 상세 관계의 행 증폭, 메모리 사용을 검증한다. 이는 당시 적용 성과가 아닌 후속 설계안이다.

## 경험 2 — 권한 캐시의 수명과 변경 이벤트

사용자별 허용 코드 조회가 화면 이동마다 반복돼 Redis 캐시로 전환했다. 원문은 사용자·코드 그룹 키, 고정 TTL 예시, 로그아웃·관리자 권한 변경 시 무효화를 설명한다. 화면 전환 약 10초 → 0.10초 이내는 원문 경험 수치로 보존하되, 화면 전체인지 특정 API인지 측정 경계는 확인 필요다.

**고정 TTL 30분은 토큰 만료 시각과 자동 동기화되지 않는다.** 캐시가 저장된 때부터 시간이 흐르며, 세션 활동 연장·명시적 로그아웃·토큰 만료는 별도 사건이다. 원문의 \`@Cacheable\`은 캐시 미스 시 적재를 보여줄 뿐 로그인 직후 선적재를 증명하지 않는다.

권한 변경 시 삭제는 최신 조회를 유도하지만, 삭제 전 진행 중이던 조회가 이전 값을 다시 채우는 경합까지 막지는 못한다. 사용자별 여러 코드 그룹의 삭제 방식, 다중 세션·테넌트 키, 변경 커밋과 삭제 순서, 삭제 실패 대응은 확인 대상이다. Redis 장애 시 DB 폴백도 당시 구현했다고 말하지 않는다. 검토한다면 원본 권한을 확인할 수 없을 때 거부하고, DB 과부하와 캐시 타임아웃도 함께 제한해야 한다.

## 경험 3 — DTO·Model 분리와 4인 팀 표준화

작성자마다 다른 계층 호출과 만능 VO, setter 조립 코드를 담당 API에서 먼저 정리했다. Controller → Service/ServiceImpl → DAO 흐름, Request/Response DTO와 DB 매핑 Model 분리, Builder·변환 메서드 예시를 PDF로 공유하고 선임·외부 개발자의 피드백을 반영했다.

이는 표준 초안과 실무 조율 경험이지 공식 PL 직책이나 시스템 전체 단독 설계를 증명하는 자료는 아니다. 객체 생성 중복과 협업 비용이 줄었다는 정성 결과를 유지한다. SonarQube 전후 지표와 온보딩 단축 시간은 측정 기록이 없다. DTO가 늘어나는 비용, Builder 자체가 필수값·불변성을 보장하지 않는 점도 함께 설명한다. ArchUnit·record 도입은 이후 학습·개선안이다.

## 쉬운 개념에서 내부 원리까지

### 병렬 처리·N+1·트랜잭션

- **한 줄 정의:** 병렬 처리는 작업을 여러 실행 흐름에 나누는 것이고, N+1은 목록 1회 뒤 항목별 N회 조회하는 패턴이다.
- **쉬운 설명:** 직원 여러 명이 같은 서류 창구에 줄을 서면 한 사람의 대기는 줄어도 창구가 처리할 총 서류는 그대로다.
- **동작 원리:** 워커마다 DB 연결이 필요할 수 있다. 연결 수를 넘어가면 대기하고, 요청이 겹치면 다른 API까지 영향을 받는다. 일반 Spring 트랜잭션 자원은 호출 스레드에 묶인다.
- **경험 연결:** 당시 성과는 대기 중첩이며 N+1 제거 성과가 아니다.
- **주의:** readOnly는 모든 워커가 같은 스냅샷을 보게 만드는 기능이 아니다. 집합 조회도 무제한 ID·결과 적재를 허용하면 부담이 커진다.
- **면접 핵심:** SQL 수, 응답 시간, 처리량, 동시성, 자원 소모를 따로 설명한다.
- **확인 질문:** 응답이 빨라졌는데 DB 처리량이 나빠질 수 있는 이유는 무엇인가?

일반적인 스레드 기반 트랜잭션의 범위는 [Spring Transactional API](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/transaction/annotation/Transactional.html)를 참고한다. 현재 문서 버전을 당시 프로젝트 의존성 버전으로 간주하지 않는다.

### TTL·캐시 무효화·인가

- **한 줄 정의:** TTL은 캐시의 남은 보관 기간, 무효화는 더 이상 믿지 않을 값을 지우는 일이다. 인가는 요청한 작업을 허용할지 판단하는 일이다.
- **쉬운 설명:** 메모에 유통기한을 써 놓아도 담당자가 권한을 회수하면 기한 전 메모를 폐기해야 한다.
- **동작 원리:** 캐시 히트는 DB 조회를 생략하고 미스는 원본 조회 후 적재한다. 고정 TTL과 활동마다 갱신되는 TTI, 토큰 exp는 다른 개념이다.
- **경험 연결:** 권한별 코드 목록의 반복 조인을 줄였다. 화면에서 옵션을 감추는 것만으로 서버의 접근 통제를 대신할 수 없다.
- **주의:** 공유 Redis도 진행 중 요청·삭제 실패·재적재 경합을 자동 해결하지 않는다.
- **면접 핵심:** 키 범위, 원본, 적재 시점, 삭제 이벤트, 장애 시 거부 기준을 말한다.
- **확인 질문:** 로그인 10분 후 만든 30분 캐시는 로그인 후 언제 만료되는가?

TTL 동작의 일반 기준은 [Spring Data Redis 캐시 문서](https://docs.spring.io/spring-data/redis/reference/redis/redis-cache.html)에서 확인했다. 동적 TTL·TTI의 지원 버전 확인은 실제 적용 전 별도다.

### DTO·Model·Builder

- **정의와 비유:** DTO는 외부에 주고받을 양식, Model은 DB 조회 결과를 담는 내부 양식이다. Builder는 여러 필드를 이름으로 조립하는 생성 방식이다.
- **원리와 연결:** 입력 검증·응답 노출 필드와 DB 구조를 나눠 변경 영향을 줄였다. Builder는 생성 표현을 통일하는 데 썼다.
- **주의:** 클래스 수와 변환 코드가 늘어난다. setter를 안 쓴다고 가변 컬렉션까지 불변인 것은 아니며 필수값 검증도 따로 필요하다.
- **면접 핵심·확인 질문:** 분리 비용을 감수한 이유는 무엇이며, 단순 조회까지 모든 계층 변환이 필요한가?

## 수준별 예상 질문과 말로 답하는 연습

| 수준 | 질문 | 답변 예시 |
| --- | --- | --- |
| 기본 | 어떤 일을 맡았나요? | “가입·청구·상품 관련 백엔드 API와 권한 조회를 개발했고, 반복 조회의 성능과 코드 작성 기준을 개선했습니다. 프런트엔드 전체나 클라우드 수집 인프라를 제가 설계했다고 설명하지는 않습니다.” |
| 기술 | 왜 병렬화했고 N+1은 없어졌나요? | “당시 일정에서 서비스 계층의 순차 대기를 먼저 겹쳤습니다. 10분을 30초 이내로 줄였지만 SQL 수는 그대로라, N+1을 제거했다고 말할 수는 없습니다.” |
| 심화 | 동시 사용자가 늘어도 빨랐나요? | “동시 부하 수치는 지금 자료에 없습니다. 공용 워커와 DB 연결이 경합할 수 있어서, 재검증한다면 SQL 수·연결 대기·p95·DB 자원을 함께 보겠습니다.” |
| 꼬리 | 병렬 워커도 같은 트랜잭션인가요? | “일반 Spring 트랜잭션은 스레드에 묶이므로 자동 전파되지 않습니다. 조회여도 동일 시점 일관성은 따로 검토해야 합니다.” |
| 기술 | 캐시 TTL을 토큰과 어떻게 맞췄나요? | “세션 정책을 참고해 TTL을 정했다는 기록과 고정 TTL 예제가 있습니다. 토큰의 남은 유효 시간을 계산한 코드는 확인되지 않아 자동 동기화했다고 단정하지 않겠습니다.” |
| 심화 | 권한을 회수하면 즉시 안전한가요? | “대상 키 무효화가 필요하지만 진행 중인 조회가 오래된 값을 다시 저장할 수 있습니다. 당시 경합 방어 구현은 확인이 필요하고, 지금은 변경 버전이나 재적재 순서를 검증하겠습니다.” |
| 꼬리 | Redis 장애 폴백을 구현했나요? | “현재 경험 기록으로는 확인되지 않습니다. 학습 설계로 검토할 수 있지만 권한 확인 실패를 허용으로 처리하지 않고 DB 부하 상한을 함께 두겠습니다.” |
| 기술 | JSON 직렬화는 무엇을 주의하나요? | “사람이 읽기 쉽지만 타입 정보가 들어가면 클래스 변경과 호환성을 고려해야 합니다. 실제 serializer 설정과 캐시 교체 절차는 확인할 내용입니다.” |
| 기본 | 선임들과 표준을 어떻게 합의했나요? | “제가 맡은 API의 동작 예시와 PDF 초안을 먼저 공유했고, 예외 처리 같은 부족한 부분은 선임들의 피드백을 받아 다듬었습니다.” |

## 추가로 확인할 경험 근거

- 성능 측정 경계·반복 횟수·반환량·동시 요청·DB/서버 설정과 로그.
- 인증 제공자와 서버 인가 위치, 로그인 선적재, 실제 TTL·토큰 갱신 코드.
- 사용자·그룹 키 전체 삭제, 테넌트 및 다중 세션 구분, Redis 장애·경합 테스트.
- 의존성 버전, DTO 컨벤션 PDF와 적용 범위. 비공개 원본은 그대로 공개하지 않고 설명 가능한 범위만 확인한다.

## 기본기를 다지기 위한 사이드 프로젝트 아이디어 (아직 수행하지 않은 학습안)

### Idea 1. 반복 조회 vs 집합 조회(\`IN\` 절) 벤치마크 & HikariCP 커넥션 풀 프로파일러
- **목적**: 블로그 회고에서 남긴 *"지금 다시 한다면 집합 조회로 풀었을 것이다"*를 실제 코드와 부하 테스트 수치로 증명하기.
- **구현 내용**: 대용량 데이터 환경에서 ① 순차 \`selectList\` 반복 호출 ② \`parallelStream\` 병렬 호출 ③ 커스텀 \`ThreadPoolExecutor\` + \`CompletableFuture\` ④ \`WHERE billing_id IN (...)\` + \`Collectors.groupingBy\` 4가지를 구현하고, 동시 요청 50명일 때 \`parallelStream\`의 커넥션 풀 경합 현상과 \`IN\` 절 집합 조회의 안정성을 수치로 비교.

### Idea 2. 탄력적(Resilient) 2-Tier 권한 캐시 & Cache Fallback 모듈
- **목적**: 단순 \`@Cacheable\`을 넘어 **L1/L2 캐시 동기화와 Redis 장애 시 자동 DB 우회(Fallback)**까지 갖춘 권한 모듈 구현.
- **구현 내용**: Caffeine(L1) + Redis(L2) 구조에 권한 변경 시 Redis Pub/Sub으로 전 서버 L1 캐시 무효화를 시도하고 알림 유실·재적재 경합을 검증하며, \`CacheErrorHandler\`를 통해 Redis 컨테이너를 강제 중지(\`docker pause\`)했을 때 에러 없이 MySQL 원본 조회로 자동 전환되는지 통합 테스트로 검증.

### Idea 3. \`ArchUnit\` 기반 아키텍처 컨벤션 자동 검증 테스트
- **목적**: 팀에 PDF 문서로 공유했던 계층 분리와 \`Request/Response DTO · Model\` 분리 규칙을 **CI 빌드 테스트 코드로 자동 강제**하기.
- **구현 내용**: JUnit + \`ArchUnit\`으로 *"Controller는 DAO를 직접 참조할 수 없다"*, *"Controller의 public 메서드는 DB 영속 계층의 \`Model\`을 외부로 직접 반환할 수 없고 오직 \`DTO\`만 반환해야 한다"* 규칙을 코드화해 위반 시 테스트가 실패하도록 구성.

## 추가 학습이 필요한 기술 개념

이 목록은 이해도를 평가한 결과가 아니라 면접 준비 후보 목록이다. 직접 설명하고 작은 예제로 검증한 뒤 체크한다.

- [ ] **N+1·집합 조회 · 상** — 반복 selectList 병목. 핵심: SQL 횟수·청크·페이지·결과 크기. 꼬리 질문: IN 키가 매우 많거나 비어 있으면?

- [ ] **병렬 처리·커넥션 풀 · 상** — 대기 시간 중첩. 핵심: 공용 자원 경합·동시성 상한. 꼬리 질문: 단일 요청은 빨라도 여러 요청은 왜 느려지나?

- [ ] **트랜잭션·스냅샷 · 상** — 워커별 DB 조회. 핵심: 스레드 경계·격리 수준. 꼬리 질문: readOnly면 같은 데이터를 보나?

- [ ] **TTL·무효화·인가 · 상** — 권한 캐시. 핵심: 캐시 수명과 토큰 만료의 차이·키 범위. 꼬리 질문: 권한 회수와 재적재가 겹치면?

- [ ] **성능 측정 · 상** — 10분→30초·10초→0.10초. 핵심: 측정 경계·warm/cold·동시 요청·p95. 꼬리 질문: 평균만 빨라지면 성공인가?

- [ ] **Redis 장애·직렬화 · 중** — 권한 조회 의존성. 핵심: 원본 조회 비용·거부 정책·스키마 호환. 꼬리 질문: DB도 실패하면 허용할 것인가?

- [ ] **DTO·Builder·검증 · 중** — 팀 컨벤션. 핵심: API 계약·필수값·불변성. 꼬리 질문: Builder가 무엇을 보장하지 않는가?

- [ ] **ArchUnit·L1/L2 실험 · 하** — 후속 학습안. 핵심: 규칙 자동 검증·다중 캐시 정합성. 꼬리 질문: Pub/Sub 알림 유실 시 복구는?
`,m=`---
title: 면접 정리 1 — 전세사기 피해자 지원관리시스템의 보안·성능·운영 개선
date: 2026-10-24
tags: Interview, Retrospective, CUBRID, Security, Infra, Java
summary: 정적 SQL 전환의 누락 사고, CUBRID 튜닝, 대량 패치와 SSH 수집을 실제 경험·기술 원리·확인 항목으로 나눈 면접 준비 자료
---

## 프로젝트 개요와 담당 범위

[전세사기 피해자 지원관리시스템](/#project-jeonse-support-system)은 대민 접수와 내부 업무 처리를 지원하는 공공 시스템이다. (주)마이크로 서비스 SI 본부에서 2025.09~2026.08 운영·기능 개발, 오류 분석, 성능·보안 개선과 서버 점검 자동화를 수행했다. 시스템 전체 신규 구축이나 망 설계 전체를 담당했다는 의미는 아니다.

주요 기술은 eGovFrame 4.1.0, JSP/JSTL·jQuery, MyBatis, CUBRID, Jasypt, Apache MINA SSHD, Maven·SVN이다. Tomcat·JBoss·Linux는 프로젝트 기술 목록에 있다. 각 망의 제품 배치·서버 대수·접속 주소·암호화 키는 이 자료의 범위에서 제외한다.

**검토 기준(2026-11-03):** 이 저장소는 포트폴리오와 설명용 코드가 있는 기술 블로그다. 업무 원본 코드·DB·점검 보고서는 없다. 경험의 출처는 아래 원문이며 일반 기술 원리와 구분한다. 암호화 패치는 블로그에는 남아 있지만 현재 경력 카드에서는 의도적으로 주석 처리돼 있으므로 복원하지 않았다. AI 활용 30~40% 단축은 공개 근거가 부족하고 활성 성과에서도 제외되어 있어 확정 성과로 사용하지 않는다.

## 시스템 구조와 데이터 흐름

\`\`\`text
대민 사용자 → 인터넷망 WEB → WAS(eGovFrame/JSP) ↔ CUBRID
내부 사용자 → 업무망 WEB   → WAS(eGovFrame/JSP) ↔ CUBRID

동기화 요청 → Service/DAO → 원본 SELECT
                               ├─ 원본 있음 → 대상 MERGE → 이력·대사 확인
                               └─ 원본 없음 → skip + 로그
누락 발견 → 대상 statement 보완 → 차이 데이터 보정 → 건수·키 재대사
\`\`\`

1. 각 사용자의 요청을 해당 망의 웹·업무 계층이 처리하고 DB를 조회·갱신한다. 응답은 WAS·WEB을 거쳐 돌아간다.
2. 망간 연계는 원본을 읽어 대상에 반영하는 논리 흐름이다. 양방향 연계 경험을 표시하지만 DB가 물리적으로 직접 연결됐다는 뜻은 아니다.
3. 원본이 없는 경우 MERGE를 하지 않는 가드를 두었다. 삭제 전파 정책 전체를 이 가드로 설명할 수는 없다.
4. 정적 statement로 전환할 때 대상 목록을 누락한 사고가 있었고, 코드와 운영 이력을 비교해 보정 후 재대사했다.

업무 요청과 SQL은 호출 결과를 기다리는 흐름이다. 동기화의 실행 주체·주기·재시도·트랜잭션 경계는 원문에 충분히 없어 확인 필요다. Kafka·메시지 큐·분산 트랜잭션은 추가하지 않는다.

\`\`\`text
대표 WAS의 Quartz (4시간 주기)
  → SSH 클라이언트 → 대상 서버 명령 실행 → stdout/stderr 수신
  → 값 파싱 → CUBRID 이력 저장
관리자 화면 → Controller → 서버별 최신 이력 조회 → JSP 응답
\`\`\`

수집과 화면 조회는 별도 경로다. 화면 요청마다 SSH를 실행하는 것이 아니라 최근 수집 이력을 읽는다. 타임아웃을 두었지만 서버별 실패 후 계속 처리하는 범위와 실패 이력 표시 방식은 실제 코드 확인이 필요하다. 대표 1대 활성화는 중복 실행 방지이며 자동 장애 인계는 아니다.

## 경험 1 — 정적 SQL로 바꾸다가 놓친 테이블

[동적 쿼리 전환 원문](/blog/dynamic-to-static-sync-query)은 테이블·컬럼명을 문자열로 조립하던 연계를 9개 테이블·97개 컬럼의 명시적 SELECT/MERGE로 변경한 기록이다. 값은 바인딩하고 DAO에서 정의된 statement를 선택해 실행 SQL과 변경 범위를 드러냈다. SQL Injection 14건 조치라는 기록을 보존한다.

문제는 코드에 나열된 대상만 전수라고 믿었던 것이다. 실제 연계 이력에는 다른 테이블이 있었고 그 변경분이 누락됐다. statement를 보완하고 DB 차이분을 csql·nohup으로 보정한 뒤 건수·키를 대사했다. 면접 문서에만 있던 특정 MINUS 쿼리나 이력 PK 추출 방식은 실제 사용했다고 단정하지 않는다.

명시적 매퍼는 새 테이블·컬럼 추가 때 코드 수정 비용이 들지만 영향 범위를 검토하기 쉬웠다. 허용 목록·enum을 통한 컴파일 단계 검증은 후속 개선안이다. 요청 자체 누락과 존재하지 않는 statement 호출 예외는 다른 장애이므로 구분한다. 운영 이력도 보존 기간·누락 가능성이 있어 코드·스키마·업무 목록과 함께 비교해야 한다.

## 경험 2 — 53초 목록 조회와 복합 인덱스

[CUBRID 원문](/blog/cubrid-query-plan-index-tuning)은 약 7만 건 목록에서 sscan과 별도 정렬을 보고 등치 조건 → 날짜 범위 → 정렬 보조 키 순서로 인덱스를 검토한 경험이다. 함수로 감싼 날짜 조건과 선행 와일드카드도 검토하고, 통계를 갱신한 뒤 실행계획·동일 조건 응답을 비교했다. 기록된 결과는 53초 → 1초 미만이다.

카드에는 DBeaver, 원문에는 CUBRID Manager라고 되어 있어 도구명은 확인 대상으로 둔다. 수치의 측정 경계와 반복 횟수·원본 플랜도 없다. 면접에서는 “플랜의 접근 경로와 정렬을 확인했다”까지 설명하고 없는 I/O 로그나 부하 테스트를 만들지 않는다.

범위 조건 뒤 컬럼도 인덱스 키 필터·정렬 등에 사용될 수 있다. \`del_yn\`의 종류가 적다는 이유만으로 복합 인덱스 선두가 항상 나쁜 것도 아니다. 예제의 SELECT에는 인덱스에 없는 이름 컬럼이 있어 전체 커버링 인덱스로 처리했다고 설명하지 않는다. 함수 기반 인덱스와 DB 버전별 최적화도 구분한다.

## 경험 3 — 대량 암호화 패치와 재실행 안전성

[csql·nohup 원문](/blog/csql-nohup-mass-patch)은 CI 약 14만 건·개인정보 이력 약 370만 건, 합계 약 384만 건을 Damo 함수로 암호화한 경험이다. 백업·건수 확인·샘플 왕복 검증 → 분할 실행·로그 확인 → 반영 건수·복호화·화면 확인 순서였다.

nohup은 SIGHUP을 무시하게 할 뿐 DB 오류 복구나 서버 재시작 후 자동 재개를 보장하지 않는다. 분할 커밋은 락 보유 시간을 줄일 수 있지만 서비스 지연이 없다는 보장은 아니다. 원문의 “서비스 중단 없이 완료”를 계측된 지연 0건으로 확대하지 않는다.

설명용 SQL은 암호화와 \`enc_yn='Y'\`를 같은 UPDATE에서 처리하도록 보완했다. 완료 표시 없이 \`enc_yn='N'\`만 조건에 두면 재실행 시 같은 값을 다시 암호화할 수 있기 때문이다. 이는 예제 수정이며 실제 스크립트의 처리 표시·자동 커밋·오류 중단·동시 쓰기 보호는 확인 필요다. 구간별 커밋 후에는 전체를 한 번에 롤백할 수 없으므로 복구 계획도 구간 단위여야 한다.

## 경험 4 — SSH 점검 자동화와 취약점 조치

[SSH 원문](/blog/jsch-to-mina-sshd)은 JSch와 대상 서버의 알고리즘 협상 실패를 로그·설정으로 좁혀 MINA SSHD로 전환한 과정이다. 접속 정보는 DB에서 관리하고 결과를 파싱해 저장했다. 연결·인증·채널 열기·종료 대기의 제한 시간, stdout/stderr 분리, 원본 예외를 덮지 않는 자원 정리를 설명할 수 있어야 한다.

\`waitFor\`는 반환 이벤트·종료 코드를 확인해야 하며, 여러 단계의 10초 제한이 전체 10초 제한은 아니다. 예제의 top user CPU와 vmstat의 100-idle도 서로 다른 지표다. 호스트 키 검증과 운영 CPU 파서·실패 표시는 확인 필요다. 모든 sshd 정책에 호환된다거나 실시간 모니터링을 구축했다고 과장하지 않는다.

보안은 줄별 수정에 앞서 원인과 호출 경로를 분류했다. 공통 유틸의 null 처리, 오류 메시지 분리, 미사용 증명 후 제거를 수행했다. SAST 358→4건은 검출 수 기록이며 잔여 4건의 사유·재점검 범위가 없어 “보안 문제 완전 해결”로 해석하지 않는다.

| 원문 | 실제 조치의 중심 | 면접에서 구분할 한계 |
| --- | --- | --- |
| [CWE-79](/blog/cwe-79-xss-remediation) | 출력 컨텍스트 분류, c:out, raw 출력 통로 정리 | rawHtml 태그 자체는 정화기가 아님. 서버 HTML 정화 확인 필요 |
| [CWE-476](/blog/cwe-476-null-dereference) | 공통 유틸 수정으로 검출 15건 해소 | null 가드와 빈 문자열 등 계약 검증은 별개 |
| [CWE-330·489·497](/blog/cwe-330-489-dead-code-removal) | 진입점·참조를 확인한 미사용 코드 삭제 | 이 포트폴리오의 참고 주석 삭제 요청과는 무관 |
| [CWE-209](/blog/cwe-209-error-message-exposure) | 사용자 안내와 진단 예외 분리 | throwable 로그에도 민감정보가 남을 수 있음 |
| [CWE-404·496](/blog/cwe-404-496-resource-handling) | 자원 해제·배열 방어적 복사 | clone은 배열 원소까지 깊게 복사하지 않음 |
| [CWE-754](/blog/cwe-754-exception-handling) | 예외 삼키기 제거·실패 전달 | catch 범위보다 책임과 원인 보존이 중요 |
| [CWE-676](/blog/cwe-676-dangerous-api) | eval 호출 영향 조사·대체 | window 이름 호출도 허용 목록 검증 필요 |
| [CWE-615](/blog/cwe-615-sensitive-comments) | 민감한 주석 제거 | Java class와 HTML/JS 배포 형태 구분. 노출 비밀은 교체 필요 |

별도 웹 점검의 HIGH 6·MEDIUM 7·LOW 3(합계 16건), SQL Injection 14건, 4개 환경의 계정 설정 17건 Jasypt 암호화도 경력 데이터에 기록되어 있다. 서로 다른 검사·대상의 수치이므로 SAST 358건에 합산하지 않는다. 잔여 검출 사유, 검사 범위 중복, 30% 이하 용량 관리의 관찰 기간은 확인 필요다.

## 핵심 개념을 쉬운 설명부터 정리하기

### 바인딩·식별자·SQL Injection

- **정의:** 바인딩은 SQL 구조와 값을 분리해 전달하는 것이다.
- **비유:** 정해진 신청서의 빈칸에 값을 쓰는 것과 신청서 양식 자체를 바꾸는 것은 다르다.
- **원리:** MyBatis \`#{}\`는 PreparedStatement 파라미터로 값을 전달하고 \`\${}\`는 문자열을 치환한다. 테이블·컬럼 같은 식별자는 값 파라미터 자리에 넣을 수 없다.
- **경험 연결:** 정적 statement로 SQL 구조를 고정하고 값을 바인딩했다.
- **주의:** \`\${}\`의 존재가 모든 호출의 악용 가능성을 증명하지는 않지만, 신뢰 경계·허용 목록 검토가 필요하다. 바인딩이 실행계획 재사용까지 항상 보장하는 것은 아니다.
- **면접 핵심·확인 질문:** 테이블명을 바인딩할 수 없는 이유와 정적 전환의 관리 비용을 설명할 수 있는가?

[MyBatis 공식 매퍼 문서](https://mybatis.org/mybatis-3/sqlmap-xml.html)를 기준으로 일반 동작을 확인했다.

### 복합 인덱스·선택도·커버링

- **정의:** 복합 인덱스는 여러 컬럼 순서로 정렬된 탐색 구조다.
- **비유:** 지역 → 접수 상태 → 날짜 순의 색인에서 앞 조건을 고정하면 읽을 구간이 줄어든다.
- **원리:** 등치와 범위 조건·정렬 순서가 접근 비용을 좌우한다. 값 종류 수(카디널리티)와 특정 조건을 만족하는 행 비율은 구분한다.
- **경험 연결:** 전체 읽기와 정렬 비용을 줄이는 후보 인덱스를 비교했다.
- **주의:** 컬럼이 모두 포함되어야 전체 커버링을 논할 수 있다. 넓은 인덱스는 쓰기·저장 비용이 늘고 모든 검색 조합을 해결하지 않는다.
- **면접 핵심·확인 질문:** 화면 필터에서 지역 조건을 빼면 같은 인덱스가 어떻게 달라지는가?

[CUBRID 튜닝 문서](https://www.cubrid.org/manual/en/10.1/sql/tuning.html)는 원리 참고용이며 당시 운영 버전 확인을 대신하지 않는다.

### 트랜잭션·멱등성·대사

- **정의:** 트랜잭션은 함께 확정할 변경 단위, 멱등성은 재실행해도 효과가 중복되지 않는 성질, 대사는 원본과 결과를 비교하는 일이다.
- **비유:** 상자를 옮긴 뒤 목록에 완료 표시를 함께 해야 다음 작업자가 다시 옮기지 않는다.
- **원리:** 암호화 값과 처리 표시가 같은 원자적 변경에 포함되어야 한다. 커밋 응답을 못 받은 경우 DB 결과를 확인한 뒤 재실행한다.
- **경험 연결:** 대량 패치와 누락 복구에서 분할 실행·사후 대사를 사용했다.
- **주의:** 건수 일치만으로 값 일치가 증명되지는 않는다. 중복 실행·동시 변경·부분 커밋·복구 범위를 검증해야 한다.
- **면접 핵심·확인 질문:** 블록 3에서 실패했다면 블록 1·2는 어떻게 확인하고 복구할 것인가?

### SSH·타임아웃·주기 수집

- **정의:** SSH는 암호화된 원격 통신, 타임아웃은 기다림의 상한이다.
- **비유:** 서버에 주기적으로 전화해 상태를 묻되 연결 실패·통화 실패·결과 오류를 나누어 기록하는 방식이다.
- **원리:** 알고리즘 협상 → 서버 신원 검증 → 사용자 인증 → 명령 실행 → 종료 결과 확인 → 자원 정리로 나눠 본다.
- **경험 연결:** EXEC 채널로 명령 결과를 받아 이력을 쌓았다.
- **주의:** API가 Future를 반환해도 verify로 기다리면 호출 흐름은 대기한다. 대표 1대 활성화는 자동 failover가 아니다.
- **면접 핵심·확인 질문:** 서버 한 대가 응답하지 않으면 전체 수집 완료까지 최대 얼마나 기다리는가?

### XSS·SAST의 검증 범위

- **정의:** XSS는 데이터가 브라우저 코드로 실행되는 문제이며 SAST는 소스에서 위험 패턴을 찾는 정적 분석이다.
- **비유:** 일반 문장은 글자로 표시하고, 허용할 HTML은 반입 규칙에 따라 검사해야 한다.
- **원리:** HTML 본문 인코딩, JS·URL·속성 컨텍스트별 처리, HTML 정화는 역할이 다르다.
- **경험 연결:** 반복 검출을 공통 원인별로 조치했다.
- **주의:** 검출 수 감소는 실제 공격·회귀 테스트를 대신하지 않는다. 커스텀 raw 출력 통로만으로는 안전하지 않다.
- **면접 핵심·확인 질문:** c:out으로 에러 메시지를 감싸면 정보 노출까지 해결되는가?

### 설정 암호화와 개인정보 DB 암호화

- **정의·비유:** 암호화는 키가 있어야 원래 값으로 되돌릴 수 있는 잠금이다. 잠긴 보관함과 열쇠를 같은 곳에 두면 보호 효과가 줄어든다.
- **원리·경험 연결:** Jasypt는 계정 설정 값을 보호하는 공통 유틸에, Damo는 개인정보 DB 값의 암·복호화에 사용했다고 기록했다. 같은 제품이나 같은 암호화 경로가 아니다.
- **주의:** 알고리즘·키 보관·접근 권한·키 교체·복호화 실패 정책을 모르면 암호화했다는 사실만으로 보호 수준을 확정할 수 없다. 실제 설정은 공개 저장소에 없어 확인 필요다.
- **면접 핵심·확인 질문:** 설정 파일을 읽을 수 있는 공격자가 복호화 키까지 얻을 수 있는가? 암호화가 조회 권한 통제를 대신하는가?

## 수준별 면접 질문과 답변

| 수준 | 질문 | 답변 예시 |
| --- | --- | --- |
| 기본 | 담당 업무를 요약해 주세요. | “기존 공공 시스템의 기능 운영과 함께 느린 조회, 망간 동기화 보안, 수동 서버 점검을 개선했습니다. 전체 시스템 설계보다 운영 중 문제를 진단하고 바꾼 범위를 설명하겠습니다.” |
| 기술 | 정적 SQL을 선택한 이유는요? | “값 바인딩과 실행 SQL 가시성을 확보하려고 테이블별 statement를 만들었습니다. 새 스키마마다 매퍼를 수정하는 비용을 감수했습니다.” |
| 꼬리 | 가장 아쉬웠던 사고는요? | “코드 목록을 전수라고 믿어 한 테이블을 누락했습니다. 운영 이력과 비교하고 차이 데이터를 보정한 뒤 재대사했습니다. 처음부터 이 비교를 했어야 했습니다.” |
| 심화 | 인덱스를 추가하면 항상 빨라지나요? | “조회 조건과 분포에 따라 다릅니다. 당시에는 전체 스캔과 별도 정렬이 문제였고 계획과 응답을 비교했습니다. 쓰기 비용과 다른 검색 조건도 봐야 합니다.” |
| 기술 | nohup이 무중단을 보장하나요? | “아닙니다. 세션 종료 신호를 무시하는 역할입니다. 운영 영향은 분할 커밋·락 대기·로그와 전후 대사로 따로 확인해야 합니다.” |
| 심화 | 중복 암호화를 어떻게 막나요? | “예제에서는 암호화와 완료 플래그를 같은 UPDATE로 바꿨습니다. 실제 스크립트의 처리 조건은 재확인이 필요하며, 완료 여부가 불명확하면 재조회부터 해야 합니다.” |
| 기술 | 왜 JSch를 바꿨나요? | “당시 대상 서버와 알고리즘 협상이 맞지 않았습니다. 로그와 허용 목록을 비교하고 서버 정책을 낮추는 대신 호환 클라이언트로 교체했습니다.” |
| 꼬리 | 4시간 수집인데 실시간인가요? | “주기 수집 이력 조회입니다. 최신 성공 시각과 실패 상태를 구분해야 하고, 그 표시의 실제 구현은 확인할 부분입니다.” |
| 심화 | 358→4건이면 안전한가요? | “정적 검출이 감소한 결과입니다. 남은 사유와 실제 위험, raw HTML 정화와 회귀 테스트를 따로 확인해야 합니다.” |
| 꼬리 | 로그에 예외를 넘겨도 정보가 남지 않나요? | “남을 수 있습니다. 사용자 응답 분리와 로그 접근 통제·마스킹까지 봐야 하며 throwable 인자가 자동 정화 기능은 아닙니다.” |

## 기본기를 다지기 위한 사이드 프로젝트 아이디어 (아직 수행하지 않은 학습안)

### Idea 1. B-Tree 복합 인덱스 & 실행계획 벤치마크 샌드박스
- **목적**: "등치 → 범위 → 정렬"과 "카디널리티와 조건 선택도", "커버링 인덱스"가 실제 디스크 페이지 I/O와 실행 시간에 미치는 영향을 눈으로 증명하는 실습.
- **구현 내용**: 원 프로젝트와 같은 CUBRID 버전을 확인해 우선 재현하고, 비교 실습으로 MySQL에 100만 건 더미 데이터(지역 17종, 상태 5종, \`del_yn\` 99:1, 등록일시)를 적재하고 ① 인덱스 없음 ② \`del_yn\` 선두 인덱스 ③ \`reg_dt\` 선두 인덱스 ④ 최적 복합 인덱스 4가지 케이스의 \`EXPLAIN ANALYZE\` 결과와 k6 부하 테스트 TPS 차이를 리포트로 정리.

### Idea 2. 무중단 대량 마이그레이션 시뮬레이터 (Lock 경합 & Zero-Offset Paging)
- **목적**: \`csql + nohup\`으로 수행한 384만 건 분할 커밋 패치를 애플리케이션 레벨에서 재구현하며 **Lock 경합과 페이징 성능** 비교하기.
- **구현 내용**: 실사용자 조회/수정 트래픽(초당 50건)이 도는 상태에서 ① 단일 트랜잭션 일괄 UPDATE ② \`OFFSET\` 페이징 분할 업데이트 ③ 키셋 페이지 조회(\`WHERE id > :lastId LIMIT 5000\`) 기반 Zero-Offset 분할 커밋 3가지를 실행해 실사용자 API의 p99 지연(Lock Wait)과 실패 지점 자동 재개(Resume) 체크포인트를 검증.

### Idea 3. 경량 SSH 리소스 수집기 & 다중 서버 분산 스케줄러 (\`ShedLock\` 실습)
- **목적**: 대표 WAS 1대 고정 플래그로 풀었던 Quartz 스케줄러를 **다중 인스턴스 자동 Failover 구조**와 **전체 수집 제한 시간과 작업 자원 격리(Bulkhead)**로 고도화하기.
- **구현 내용**: 수집 서버 2대에 \`ShedLock\`을 적용해 1대 강제 종료 뒤 락 만료와 다음 실행 시점에 다른 1대가 인계하는지 검증하고, 대상 컨테이너 1대에 \`tc netem delay 15s\` 네트워크 지연을 걸어 \`verify(10s)\` 타임아웃으로 정상 서버 수집이 보호되는지 테스트.

## 추가 학습이 필요한 기술 개념

학습이 필요한 후보이며 현재 이해 여부는 가정하지 않는다. 상 항목을 먼저 말로 설명하고, 실제 수행과 후속 제안을 구분해 연습한다.

- [ ] **SQL 바인딩·허용 목록 · 상** — 망간 정적 SQL 전환. 핵심: 값과 식별자·신뢰 경계. 꼬리 질문: 등록되지 않은 statement와 요청 누락의 차이는?

- [ ] **복합 인덱스·실행계획 · 상** — 53초 조회 개선. 핵심: 탐색·필터·정렬·커버링·통계. 꼬리 질문: 범위 조건 뒤 컬럼도 쓰이는가?

- [ ] **트랜잭션·락·멱등성 · 상** — 대량 패치. 핵심: 처리 표시 원자성·부분 커밋·동시 쓰기. 꼬리 질문: 커밋 응답을 못 받았으면?

- [ ] **대사·복구 · 상** — 누락 테이블 사고. 핵심: 키·값·시점·대상 범위 검증. 꼬리 질문: 건수만 같으면 복구 완료인가?

- [ ] **출력 인코딩·HTML 정화 · 상** — XSS 조치. 핵심: 출력 컨텍스트와 정화의 차이. 꼬리 질문: rawHtml은 왜 방어 기능이 아닌가?

- [ ] **SAST·로그 보호 · 상** — 358→4건·오류 노출. 핵심: 검출과 위험의 차이·원인 보존·접근 통제. 꼬리 질문: 남은 4건은 무엇인가?

- [ ] **SSH·Future·타임아웃 · 상** — 서버 점검 자동화. 핵심: 호스트 키·인증·반환 이벤트·정리. 꼬리 질문: CLOSED면 명령 성공인가?

- [ ] **Linux CPU·메모리 지표 · 중** — 수집 값 해석. 핵심: user/idle·샘플 구간·단위. 꼬리 질문: top과 vmstat 값이 다른 이유는?

- [ ] **Quartz·단일 실행·장애 인계 · 중** — 대표 WAS 수집. 핵심: Job 생성·중복 방지·장애 복구의 차이. 꼬리 질문: 대표 서버가 멈추면 누가 수집하나?

- [ ] **분산 락 실험 · 하** — 후속 수집기 학습. 핵심: lease 만료·중복 실행·fencing. 꼬리 질문: 락 시간보다 작업이 길어지면?
`,h=`---
title: 면접 정리 3 — 빌링 GW의 키 매핑·데이터 정합성·Oracle 튜닝
date: 2026-10-22
tags: Interview, Retrospective, Kafka, Oracle, POI, Spring
summary: Kafka와 Redis의 역할, 메타데이터 연계, 대사·보정·재대사, Oracle 튜닝을 근거 중심으로 정리하고 POI 개발 경험과 학습 질문을 보완한 면접 자료
---

## 프로젝트 개요와 근거

[빌링 GW 개발·운영 유지보수](/#project-lgu-billing-gw)는 차세대 발행 시스템과 과금·청구·정산 구독 시스템 사이의 데이터 구조를 맞추는 업무였다. (주)애버커스 빌링시스템팀에서 2022.11~2025.05 연동 개발·운영, 정합성 대응, 요금·위약금 조회 API와 배치·리포팅 업무를 수행했다.

Spring Boot 2.x, Spring Batch 4.x, Kafka, Redis, MyBatis, Oracle·MySQL 연동 환경과 Maven, WhaTap 등을 사용했다고 기록돼 있다. MySQL은 연동 환경의 기술이며 파트별 실제 DB 제품 배치는 확인되지 않았다. APIM·TMS·JobPass는 사용 도구 목록에 있지만 정확한 연결 순서나 설정은 추정하지 않는다.

검토일은 2026-11-03이다. [GW 원문](/blog/kafka-gw-data-integrity), [Oracle 원문](/blog/oracle-hint-subquery-fullscan), [POI 원문](/blog/sxssf-vs-xssf-excel-download)을 대조했다. 업무 원본 소스와 Kafka 설정·운영 로그는 이 저장소에 없어, 아래는 **경험 기록을 정리한 논리 구조**다. 전체 아키텍처를 단독 설계했다고 확대하지 않는다.

## 시스템 구조와 이벤트 처리 흐름

\`\`\`text
차세대 발행 시스템 --이벤트 발행--> Kafka 토픽 --비동기 구독--> GW
                                                              |
                        +-------------------------------------+--------+
                        |                                     |        |
                  Redis 키 매핑 조회                  메타데이터 조회  |
                  UUID ↔ 기존 업무키                   컬럼·join 규칙  |
                        +-------------------------------------+--------+
                                                              |
                                               변환 → 대상 DB에 DML
키 없음 → 재처리 대상으로 보관 → 매핑 확보 후 GW 재처리
운영 확인 → 원천/구독 대사 → 불일치 보정 → 재대사
\`\`\`

1. 차세대 시스템은 분리된 원천 테이블·UUID 기반 이벤트를 발행한다. 발행 성공은 구독 DB 반영 완료와 다르다.
2. GW가 헤더와 payload 형상으로 경로를 나누고, 원천을 구독 측 구조로 변환한다. 단일 DTO와 리스트 DTO 처리, 1:1·1:N 변환 경로가 원문에 설명돼 있다.
3. 신규 생성 시 키 매핑을 Redis에 저장하고, 변경 이벤트에서는 기존 업무키를 찾아 대상 조건을 만든다. Redis는 Kafka의 대체 큐나 DB로 전달하는 중계기가 아니다.
4. GW가 작업 유형 INS/UPD/MER/DEL에 따라 DB를 반영한다. 그림의 키·규칙 조회와 DML은 처리 단계이며, 실제 비동기 클라이언트 여부는 기록에 없다.
5. 키를 아직 해석할 수 없는 이벤트는 매핑 확보 후 재처리했다. 대기 저장소·자동/수동 실행 주체·최대 재시도·DLQ 사용 여부는 확인 필요다.
6. 운영 대사로 결과를 비교하고 보정 후 다시 확인한다. offset 커밋과 DB 커밋의 순서·원자성은 별도 확인 대상이다.

**이 GW는 도메인 데이터 변환 계층이다.** HTTP 요청을 라우팅하는 API Gateway/APIM과 같은 역할로 설명하지 않는다. 사용 도구 목록에 APIM이 있다는 이유로 Kafka 이벤트가 APIM을 반드시 통과한다고 그리지 않는다.

## 경험 1 — 업무키와 메타데이터가 연동의 중심이었다

원천의 PK가 UUID로 바뀌었지만 구독 시스템은 기존 업무키로 조회·갱신했다. payload를 그대로 저장할 수 없어 매핑 규칙과 Redis 업무키 조회를 사용했다. 변환 규칙은 토픽/이벤트, 원천, 대상이라는 **세 묶음의 메타데이터**로 관리했다. 예시 SQL 세 개를 실제 테이블 세 개로 단정하지 않는다.

기존 표현 범위의 매핑 변경은 데이터 등록으로 대응할 수 있었지만, payload 필드가 늘어나면 공통 DTO 수정과 의존성 버전 갱신·배포도 필요했다. 모든 신규 토픽이 무배포라는 의미는 아니다. 당시 MAX+1 채번은 동시 등록 경합 위험이 있으므로 일반적인 안전 설계로 권하지 않는다.

순서 문제로 키 매핑이 없는 변경 이벤트는 재처리 대상으로 관리했다. “Kafka는 순서를 보장하지 않는다”라고 단순화하지 않는다. 파티션 내부 로그 순서와 여러 토픽·파티션·재시도 뒤의 업무 선후관계는 다르며 실제 partition key·생산 순서·소비 방식은 확인 필요다.

## 경험 2 — 대사·보정·재대사와 인코딩 대응

GW 모니터링의 same/mismatch/재연동 대기 상태와 WhaTap 지연·예외를 함께 확인했다. 원문에 기록된 주요 원인은 발행 누락, 이벤트 순서 역전, 인코딩 바이트 초과, 신규 컬럼·매핑 누락이다. 구문서의 “수기 변경”은 가능한 일반 원인이지만 실제 네 가지 분류의 근거로 확정하지 않는다.

불일치 키 추출 → 보정 DML 작성 → 같은 조건의 SELECT로 대상 검증 → 반영 → 재대사 순서를 유지했다. 일회성은 엑셀 수식, 반복 유형은 보정 스크립트로 정비했다. 엑셀 문자열 조립은 따옴표·NULL·날짜 변환·동시 수정에 취약하므로, 지금 다시 한다면 바인딩과 변경 전후 기록을 갖춘 도구로 보완한다. 당시 모든 건을 분할 반영했다거나 불일치가 항상 0건이었다는 증거는 없다.

문자 길이는 문자셋과 BYTE/CHAR 정의로 검증해야 한다. “Oracle 한글은 2바이트, MySQL은 3바이트” 같은 제품별 고정값은 틀리다. \`SUBSTRB\`는 Oracle 함수이며 Java에서 같은 이름의 표준 함수를 호출하는 것이 아니다. 원문은 Java 바이트 길이 변환·Subscriber 검증 공통화 경험을 설명하지만, 실제 문자셋·문자 경계 보존·잘림 허용 정책은 확인 필요다.

| 기록된 성과 | 해석할 범위 | 추가 확인 |
| --- | --- | --- |
| 주간 오류 약 70건 → 5건 미만, 약 93% 감소 | 모니터링·대응 표준화 이후의 경험 수치 | 전후 집계 주수·동일 처리량·중복 포함 여부 |
| 인코딩 오류 95% 감소 | 인코딩 오류 유형의 별도 지표 | 분모·전후 건수·관찰 기간 |
| 신규 연동 실패율 5% 미만 | 신규 연동에 대한 기록 | 토픽 수인지 메시지 수인지 분모 확인 |

세 값을 합쳐 전체 시스템 성공률로 만들지 않는다. 원본 로그 없이 장애 원인별 기여율이나 exactly-once 달성을 주장하지 않는다.

## 경험 3 — Oracle 묵시적 형변환 튜닝

청구 목록에 최근 납부일을 붙이는 조회가 느려 Trusted Orange 실행계획과 Predicate를 살폈다. NUMBER와 VARCHAR2의 비교에서 인덱스 컬럼 쪽 TO_NUMBER가 나타났고, 표기 규칙을 확인한 후 반대쪽 TO_CHAR 변환과 인덱스 접근을 검토했다. 대량 목록에서는 집계 인라인 뷰 + LEFT JOIN도 적용했다고 원문에 기록돼 있다.

**주의할 설명:** 함수가 있다고 모든 인덱스 경로가 불가능한 것은 아니다. 스칼라 서브쿼리의 실제 반복 횟수는 캐싱·변환과 실행 통계에 따라 달라진다. 힌트도 무시될 수 있어 계획을 영구 고정한다고 말하지 않는다. 선행 0·공백·NLS에 따라 형변환 후 결과가 달라질 수 있어 성능과 결과 동등성을 함께 확인한다.

원문 수치는 수십 초 → 1초 안팎이며 조건별 편차가 있었다. 기존 소스와 DBA 보고서에서 배우며 플랜을 대조한 과정과, PARALLEL의 병렬도 4를 당시 스스로 산정하지 못했다는 한계를 보존한다. 튜닝 전체를 독자적으로 설계한 경험으로 바꾸지 않는다.

## POI 다운로드 경험 — 핵심 성과와 구분한 일반 개발 경험

[XSSF/SXSSF 글](/blog/sxssf-vs-xssf-excel-download)은 빌링 업무 중 개발한 내용임을 저자가 2026-11-03 확인했다. 글 게시일은 개발일과 다르다. 저자는 핵심 성과로 제시할 항목이 아니라 의도적으로 숨겨두었다고 설명했으므로, 포트폴리오 성과 항목은 복원하지 않고 원문 기술 설명을 보완했다.

원문 경험은 수작업 대장을 다운로드 기능으로 바꾸고 건수·서식에 따라 XSSF/SXSSF를 구분한 것이다. SXSSF는 최근 행 window를 남기고 오래된 행을 임시파일로 내보낸다. 원본 dataList·스타일·공유 문자열은 별도로 남으므로 전체 힙이 항상 일정하지는 않다. 컬럼 폭 자동 조절은 미리 추적한 컬럼에서 가능하고, 임시파일 정리는 사용 POI 버전의 close/dispose 계약을 확인해야 한다. 기능화 경험은 보존하되 정량적인 핵심 성과로 확대하지 않는다.

## 핵심 개념을 쉬운 설명부터 정리하기

### Kafka·파티션·offset·멱등성

- **정의:** Kafka는 이벤트를 순서 있는 파티션 로그에 저장하고 소비자가 읽게 하는 시스템이다. offset은 파티션 안의 위치다.
- **비유:** 여러 장부의 페이지 번호가 offset이다. 한 장부의 순서는 있지만 다른 장부 사이의 전체 업무 순서는 따로 맞춰야 한다.
- **원리:** 소비자는 처리와 진행 위치 기록을 구분한다. DB 반영 뒤 offset 커밋 전에 죽으면 재수신할 수 있고, 먼저 커밋하면 미반영 손실 위험이 있다.
- **경험 연결:** 키 매핑이 선행되어야 변경 이벤트를 처리할 수 있어 재처리·대사가 필요했다.
- **주의:** Kafka의 트랜잭션이 외부 DB 반영을 자동으로 원자화하지 않는다. MERGE도 누적·이력·외부 부수 효과까지 멱등으로 만들지는 않는다.
- **면접 핵심:** 순서 보장 범위, 재수신 가능성, offset과 DB 커밋 관계를 설명한다. 실제 설정은 확인 필요다.
- **확인 질문:** DB 반영 직후 프로세스가 죽었을 때 같은 이벤트를 다시 받아도 안전한가?

[Apache Kafka 설계 문서](https://kafka.apache.org/41/design/design/)는 전달 의미의 원리 참고다. 이 프로젝트가 Kafka 4.1이나 특정 보장 설정을 사용했다는 뜻은 아니다.

### Redis 키 매핑과 캐시의 차이

- **정의:** 키 매핑은 서로 다른 식별자 사이의 대응 관계다.
- **비유:** 새 고객번호를 기존 청구번호로 찾는 주소록이다.
- **원리:** 생성 이벤트에서 대응 값을 저장하고 변경 이벤트에서 조회해 대상 행을 찾는다.
- **경험 연결:** CloudXper의 화면 권한 캐시와 달리 여기서는 업무키 해석이 목적이다.
- **주의:** TTL·축출·장애로 사라졌을 때 원본에서 재구축할 수 있는지 중요하다. 이 GW의 TTL·영속화·복구 구현은 기록에 없다.
- **면접 핵심·확인 질문:** Redis가 비워지면 어디서 어떤 순서로 매핑을 복구할 것인가?

### 대사·스키마 진화·인코딩

- **정의:** 대사는 같은 업무 대상을 두 데이터 집합에서 비교하는 일이다. 스키마 진화는 필드와 구조가 바뀌는 과정이다.
- **비유:** 두 장부에서 같은 계약번호의 금액·상태까지 맞는지 확인하고, 새 항목이 생기면 양쪽 양식도 맞추는 작업이다.
- **원리:** 비교 키·기준 시점·대상 범위를 맞추고 누락·값 불일치를 나눈다. DTO·매핑·DB 배포 순서가 호환성을 좌우한다.
- **경험 연결:** 매핑 등록과 공통 DTO·의존성 배포, 보정 후 재대사를 수행했다.
- **주의:** 실시간으로 변하는 두 DB를 다른 시각에 비교하면 가짜 불일치가 생길 수 있다. 문자 수와 인코딩 바이트 수는 다르다.
- **면접 핵심·확인 질문:** 건수는 같은데 값이 다른 경우와, 아직 반영 중인 경우를 어떻게 구분할 것인가?

### Oracle 접근 경로와 POI 스트리밍

- **정의:** 실행계획은 DB가 데이터를 읽고 결합하는 방법이고, 스트리밍 작성은 일부 행만 메모리에 두는 방식이다.
- **쉬운 설명:** 색인으로 필요한 기록을 찾는 일과, 완성한 종이를 책상에서 보관함으로 옮기는 일을 각각 떠올리면 된다.
- **원리·경험 연결:** 형변환 방향·집계 범위가 읽을 양을 바꾸고, POI window는 접근 가능한 행의 범위를 바꾼다.
- **주의:** 힌트 적용과 실제 반복 횟수는 실행 통계로, 전체 메모리는 원본 조회부터 파일 생성까지 확인한다.
- **면접 핵심·확인 질문:** 소량 조회에서 전체 집계 JOIN이 더 느릴 수 있는 이유는? SXSSF인데도 OOM이 나는 이유는?

## 수준별 예상 질문과 자연스러운 답변

| 수준 | 질문 | 답변 예시 |
| --- | --- | --- |
| 기본 | GW에서 무엇을 맡았나요? | “발행 측 구조가 바뀌어도 구독 측 업무키로 반영되도록 연동 로직과 매핑을 유지보수하고, 불일치를 대사·보정·재대사하는 운영을 맡았습니다.” |
| 기술 | Kafka와 Redis를 왜 같이 썼나요? | “Kafka는 이벤트 전달, Redis는 UUID와 기존 업무키의 대응 조회입니다. Redis가 구독 DB로 메시지를 전달하는 구조로 설명하면 잘못입니다.” |
| 심화 | 순서 역전이 Kafka의 결함인가요? | “파티션 순서와 업무 선후관계는 다릅니다. 실제 키·토픽·재시도 설정을 봐야 원인을 좁힐 수 있고, 당시 기록에서 확실한 것은 매핑 미확보 건을 재처리했다는 점입니다.” |
| 꼬리 | exactly-once를 구현했나요? | “그 설정과 DB 원자성 근거는 없습니다. 대사로 최종 일치를 확인한 경험을 exactly-once 구현으로 바꾸어 말하지 않겠습니다.” |
| 기술 | 메타데이터만 바꾸면 배포가 없나요? | “기존 필드의 매핑 범위에서는 데이터 변경으로 대응하지만 새 payload 필드면 DTO와 의존성 배포도 필요했습니다.” |
| 심화 | Redis 매핑이 없으면 어떻게 복구하나요? | “키 미확보 건을 재처리 대상으로 관리했습니다. 저장소 전체 유실의 재구축 절차와 TTL은 현재 자료에 없어 추가 확인하겠습니다.” |
| 꼬리 | 수동 보정 실수를 어떻게 줄였나요? | “불일치 키를 뽑아 DML을 만들고 같은 조건 SELECT로 대상을 확인한 뒤 재대사했습니다. 지금은 따옴표 처리와 동시 변경까지 통제하는 바인딩 도구로 보완하고 싶습니다.” |
| 기술 | 인코딩 문제를 DB 제품 차이라고 볼 수 있나요? | “정확히는 문자셋과 컬럼 길이 단위의 차이입니다. 멀티바이트 문자 경계와 잘라내도 되는 업무 값인지까지 확인해야 합니다.” |
| 심화 | 인덱스 힌트가 성능을 보장하나요? | “아닙니다. 당시 Predicate의 형변환을 먼저 확인했고 기존 소스·DBA 보고서에서 배웠습니다. 힌트 적용 여부와 데이터 분포 변화도 다시 봐야 합니다.” |
| 꼬리 | 왜 SXSSF에서 전체 메모리가 늘죠? | “행 window 외에 원본 List와 스타일·공유 문자열이 남을 수 있습니다. 빌링 업무 중 개발한 기능이며 별도 성과 수치를 측정한 경험으로 설명하지는 않겠습니다.” |

## 기본기를 다지기 위한 사이드 프로젝트 아이디어 (아직 수행하지 않은 학습안)

### Idea 1. Kafka 이벤트 순서 역전 방어 & Non-blocking Retry + DLQ 파이프라인
- **목적**: 실무 GW에서 겪었던 *"생성(\`INS\`)보다 변경(\`UPD\`) 이벤트가 먼저 도착하는 순서 역전"*을 Spring Kafka 표준 아키텍처로 직접 구현하기.
- **구현 내용**: 일부러 \`UPD(UUID-1)\`를 먼저 발행하고 3초 뒤 \`INS(UUID-1, 업무키-100)\`를 발행하는 시나리오에서, \`@RetryableTopic\`(지수 백오프 토픽 재시도)과 Dead Letter Topic(DLQ), 자동 대사 배치를 결합해 재시도·중복·DLQ 재투입 상황에서 최종 정합성과 미해결 건을 측정.

### Idea 2. 옵티마이저 함정 재현기 — 묵시적 형변환과 스칼라 서브쿼리 vs 해시 조인
- **목적**: DBA 보고서와 기존 소스를 보며 배웠던 내용을 **내가 직접 설계한 스키마와 실행계획 비교 실험**으로 체화하기.
- **구현 내용**: \`bill(bill_no INT)\` 10만 건과 \`payment(bill_no VARCHAR)\` 100만 건을 구성해 ① 타입 불일치로 인한 인덱스 무력화 재현 ② \`CAST\`/\`TO_CHAR\` 방향 교정 ③ 결과 건수(10건 vs 5만 건)에 따른 스칼라 서브쿼리의 실제 접근 경로와 인라인 뷰 Hash Join의 손익분기점 그래프 도출.

### Idea 3. \`-Xmx256m\` 환경 30만 건 엑셀 다운로드 OOM 재현 & Heap 프로파일링 실험실
- **목적**: \`XSSF\`와 \`SXSSF\`의 메모리 차이를 **JVM 힙 그래프(VisualVM / JFR)**로 직접 증명하기.
- **구현 내용**: 힙을 256MB로 제한한 서버에서 30만 건 다운로드 시 \`XSSF\`의 메모리 한계와, \`SXSSF(windowSize=500)\`가 원본 데이터 조회 방식별로 사용하는 힙과 완주 여부를 측정하고 \`wb.dispose()\` 호출 여부에 따른 임시 파일 삭제를 테스트 코드로 검증.

## 추가 학습이 필요한 기술 개념

실무 경험을 설명하기 위한 후보 목록이다. 학습 여부를 임의로 판단하지 않았으며, 운영 설정을 모르는 항목은 공부와 사실 확인을 따로 진행한다.

- [ ] **Kafka 파티션·키·순서 · 상** — 생성/변경 선후관계. 핵심: 파티션 로그 순서와 업무 순서. 꼬리 질문: 같은 키면 언제나 업무 순서가 맞나?

- [ ] **offset·재수신·멱등성 · 상** — 구독 DB 반영. 핵심: DB 커밋과 진행 위치의 간극. 꼬리 질문: 반영 후 커밋 전 죽으면?

- [ ] **Redis 키 매핑 복구 · 상** — UUID→업무키 해석. 핵심: TTL·축출·원본·재구축. 꼬리 질문: 매핑 저장소가 비면 어떻게 복구하나?

- [ ] **대사·보정 · 상** — 연동 운영 핵심. 핵심: 비교 시점·키·값·변경 전후 확인. 꼬리 질문: 진행 중 이벤트와 실제 누락을 구분하려면?

- [ ] **문자셋·바이트 길이 · 상** — 연동 길이 초과. 핵심: 문자 경계·BYTE/CHAR·손실 정책. 꼬리 질문: 이모지·조합 문자는 어떻게 검증하나?

- [ ] **DTO·스키마 진화 · 중** — 신규 필드 연계. 핵심: 하위 호환·배포 순서·기본값. 꼬리 질문: 새 필드를 구버전 소비자가 받으면?

- [ ] **Oracle 형변환·힌트 · 상** — 쿼리 튜닝 경험. 핵심: Predicate·실행 통계·결과 동등성. 꼬리 질문: TO_CHAR 후 선행 0은 어떻게 되나?

- [ ] **POI·전체 메모리 흐름 · 중** — 빌링 업무의 엑셀 개발 경험. 핵심: DB 조회부터 파일 정리까지. 꼬리 질문: SXSSF인데 OOM이 나는 이유는?

- [ ] **Retry/DLQ 실험 · 하** — 후속 학습안. 핵심: 지연 재시도·격리·재투입·순서 영향. 꼬리 질문: DLQ에 보내면 해결된 것인가?
`,g=`---
title: JSch가 WEB 서버 앞에서 멈춘 날 — Apache MINA SSHD로 서버 용량 모니터링 만들기
date: 2026-01-05
tags: Java, SSH, Infra, Spring
summary: 월말마다 수기로 정리하던 서버 메모리·디스크 현황을 SSH 기반 주기 수집 화면으로 자동화한 과정 — JSch의 암호화 협상 실패, MINA SSHD 교체, 그리고 함수 하나하나의 선택 이유
---

운영 업무 중에 매달 반복되는 일이 있었다. **월말이 되면 서버마다 접속해서
메모리와 디스크 사용량을 확인하고, 표로 정리해 보고하는 것.** 서버는 인터넷망과
업무망에 WEB/WAS가 각각 있어서, 사람이 일일이 터미널로 들어가 \`free\`와 \`df\`를
치고 결과를 옮겨 적는 구조였다. 이걸 관리자 화면에서 최근 수집 상태로 보이게 만들고,
월말 정리도 쌓인 데이터로 하자는 게 시작이었다.

## 설계 — WAS가 각 서버에 SSH로 물어본다

에이전트를 서버마다 설치하는 방식은 공공 인프라 특성상 승인 비용이 크다.
대신 **WAS 애플리케이션이 SSH 클라이언트가 되어 각 서버에 접속해 명령을 실행**하고,
결과를 파싱해 DB에 쌓는 구조로 갔다.

\`\`\`text
[관리자 화면] ← [Controller] ← [DB (수집 이력)]
                                   ↑
[Quartz 스케줄러(4시간 주기)] → [SSH 클라이언트] → 각 서버 (WEB/WAS × 인터넷망/업무망)
                                → free -h / top / df -h 실행 → 파싱 → 저장
\`\`\`

접속 정보(호스트/계정/비밀번호)는 properties 하드코딩 대신 **DB 테이블로
관리**하고 비밀번호 컬럼은 DB 암호화 솔루션으로 암호화했다. 운영 중 서버가
추가돼도 재배포 없이 row 하나만 넣으면 수집 대상에 포함된다.

## 첫 시도 — JSch, 그리고 암호화 협상 실패

Java에서 SSH라면 가장 먼저 나오는 라이브러리가 JSch라서 그걸로 시작했다.
로컬에서 개발 서버로는 잘 붙었다. 그런데 **운영 WAS에서 WEB 서버를 찌르는 순간
인증 단계도 못 가고 접속이 실패했다.**

원인은 코드가 아니라 **암호화 알고리즘 협상(negotiation)** 이었다. SSH는 접속
시점에 클라이언트와 서버가 지원하는 키 교환(kex)·호스트 키·암호화 알고리즘
목록을 교환해 공통분모를 고르는데, WEB 서버의 sshd는 보안 정책상 구형 알고리즘이
비활성화된 상태였고 JSch가 제시하는 목록과 **교집합이 없었다.** 최신 OpenSSH가
\`ssh-rsa\`(SHA-1 기반) 같은 구형 방식을 기본 비활성화하는 흐름과, 오래된 JSch가
최신 알고리즘을 모르는 상황이 정확히 충돌한 것이다.

이걸 파악하는 과정에서 코드 바깥을 봐야 했다. WEB 서버의 \`/etc/ssh/sshd_config\`
허용 알고리즘을 확인하고 \`ssh -vvv\` 협상 로그로 양쪽 목록을 비교했다.
**WAS에서 WEB으로 가는 길은 애플리케이션 코드가 아니라 인프라 설정이 결정한다.**
서버 설정을 낮춰(구형 알고리즘 허용) 맞출 수도 있었지만, 보안 점검을 받는
시스템에서 서버 보안 수준을 낮추는 건 답이 아니라고 판단해 클라이언트를 바꿨다.

## 교체 — Apache MINA SSHD 2.16.0

기준은 **대상 서버의 허용 알고리즘과 호환되는 클라이언트**였다. MINA SSHD로 대상 환경의 접속 문제를 해결했다. 모든 운영체제·sshd 정책과 항상 호환된다는 뜻은 아니다. 실제 JDK, 보안 Provider, 서버 정책의 조합을 확인해야 한다.

\`\`\`xml
<dependency>
    <groupId>org.apache.sshd</groupId>
    <artifactId>sshd-core</artifactId>
    <version>2.16.0</version>
</dependency>
\`\`\`

## 구현 디테일 — 함수 하나하나의 선택 이유

### 접속: 모든 비동기 단계에 verify(timeout)

\`\`\`java
SshClient client = SshClient.setUpDefaultClient();
client.start();

ClientSession session = client.connect(user, host, port)
        .verify(10, TimeUnit.SECONDS)      // 연결 완료를 10초까지만 기다림
        .getSession();
session.addPasswordIdentity(password);
session.auth().verify(10, TimeUnit.SECONDS); // 인증도 동일
\`\`\`

MINA SSHD의 API는 대부분 **비동기 Future를 반환**한다. \`connect()\`도 \`auth()\`도
즉시 리턴되고, \`verify(timeout)\`을 호출해야 완료를 대기한다. 모니터링 대상
서버 중 한 대가 죽어 있거나 방화벽에 막혀 있으면 그 지점에서 무한 대기가
발생하므로, **연결·인증·채널 오픈·명령 종료까지 모든 단계에 10초 타임아웃**을
걸었다. 한 대의 장애가 전체 수집을 멈추면 안 되는 게 모니터링 코드의 제1 요건이다.

### 명령 실행: 셸 채널이 아니라 EXEC 채널

\`\`\`java
ClientChannel channel = session.createChannel(ClientChannel.CHANNEL_EXEC, command);
channel.setOut(outputStream);   // 표준출력
channel.setErr(errorStream);    // 표준에러 — 반드시 분리
channel.open().verify(10, TimeUnit.SECONDS);
channel.waitFor(Collections.singletonList(ClientChannelEvent.CLOSED),
        TimeUnit.SECONDS.toMillis(10));
\`\`\`

- **\`CHANNEL_EXEC\`를 선택한 이유**: 셸 채널(\`CHANNEL_SHELL\`)은 대화형 세션이라
  프롬프트 파싱, 명령 종료 판별을 직접 해야 한다. EXEC 채널은 명령 하나를 던지면
  실행 후 채널이 닫히므로 "닫힘 이벤트 = 명령 종료"로 판별이 명확하다.
- **\`setOut\`/\`setErr\` 분리**: 처음엔 출력만 받았는데, 명령이 실패하면 "결과가
  비어 있다"는 것만 알 수 있었다. stderr를 분리 수집하니 "명령을 찾을 수 없음"
  같은 실패 원인이 로그에 남는다.
- **\`waitFor(CLOSED, timeout)\`**: 채널 종료를 기다리는 상한이다. 반환된 이벤트 집합에 \`TIMEOUT\`이 있는지와 exit status를 검사해야 성공과 실패를 구분한다. 위 생략 예제만으로 이 검사가 구현됐다고 확정할 수 없다. 연결·인증 등 각 10초가 전체 작업 10초를 뜻하지도 않는다. [MINA SSHD 클라이언트 문서](https://github.com/apache/mina-sshd/blob/master/docs/client-setup.md)

### 종료: finally에서 채널 → 세션 → 클라이언트 순서로

SSH 연결 정리도 비동기라서, 그냥 close만 호출하고 나가면 커넥션이 누수될 수
있다. finally 블록에서 **채널 → 세션 → 클라이언트 순으로 명시적으로 닫고**,
비동기 정리가 끝날 시간을 짧게 대기한 뒤 진행한다. 이때 한 가지 함정이 있는데 —
finally 안에서 close 예외를 그대로 던지면 **try에서 난 원본 예외가 덮여 사라진다.**
그래서 원본 예외를 변수에 보관하고, 원본이 있으면 close 예외는 로깅만 하도록 했다.

\`\`\`java
} catch (Exception e) {
    originalException = ...;  // 원본 보관
    throw originalException;
} finally {
    try { session.close(); ... }
    catch (Exception e) {
        LOGGER.warn("세션 종료 중 오류", e);
        if (originalException == null) {   // 원본이 없을 때만 던짐
            throw new RuntimeException("세션 종료 중 오류 발생", e);
        }
    }
}
\`\`\`

### 수집 명령과 파싱 — 왜 이 명령이었나

**메모리: \`free -h\`** — 사람이 읽는 단위(G/M)로 나와 파싱 후 화면에 그대로
쓸 수 있다. 단, \`-h\`는 \`Gi\`/\`Mi\`(binary 단위)로 출력하므로 보고서 표기에 맞게
정규식으로 접미사를 정리했다.

\`\`\`java
// "2Gi" → "2G", "512Mi" → "512M"
value.trim().replaceAll("(?i)(\\\\d+)([KMGT])i", "$1$2");
\`\`\`

**CPU: \`top\` 우선, \`vmstat\` 폴백** — 서버마다 설치된 도구와 출력 포맷이 미묘하게
달라서 단일 명령에 걸 수 없었다.

\`\`\`bash
# 1차: top 배치 모드 1회 실행에서 user CPU 추출
top -bn1 | grep 'Cpu(s)' | awk '{print $2}' | sed 's/%us,//'
# 1차가 빈 값이면 2차: vmstat의 idle(15번째 컬럼)을 100에서 빼서 사용률 계산
vmstat 1 2 | tail -1 | awk '{print 100-$15}'
\`\`\`

\`top -bn1\`의 \`-b\`(배치 모드)가 핵심이다 — 화면 제어 문자 없이 텍스트로만 출력돼
파싱이 가능해진다. \`vmstat 1 2\`에서 \`2\`인 이유는 첫 샘플이 부팅 이후 누적
평균이라 부정확하기 때문에 두 번째 샘플(직전 1초 실측)을 \`tail -1\`로 집는 것이다.
당시 예시의 \`top\`은 user CPU만, \`vmstat\`의 \`100-idle\`은 다른 CPU 시간도 포함해 같은 지표가 아니다. 90% 경고를 동일 기준으로 해석하려면 지표 정의·locale·열 파싱을 맞춰야 한다. 실제 운영 파서가 어떻게 처리했는지는 확인 필요다.

**디스크: \`df -h\`** — 전체 파일시스템이 아니라 **마운트 포인트 기준으로 필요한
볼륨만** 골라 담았다. 애플리케이션 볼륨은 전 서버 공통으로 수집하고, 공유
스토리지 볼륨은 WAS에만 마운트되어 있어 WEB 서버는 파싱에서 제외했다 —
서버 역할에 따라 봐야 할 디스크가 다르다는 인프라 지식이 파싱 조건으로
들어간 부분이다. 로컬 개발 환경에는 운영과 같은 마운트가 없어서, 같은 코드가
로컬에서는 다른 마운트 포인트를 대신 읽도록 분기해 파싱 로직 자체를 테스트할
수 있게 했다.

### 스케줄러: Quartz와 "Spring Bean이 아닌 클래스"의 함정

수집은 Quartz cron(\`0 0 */4 * * ?\`, 4시간 주기)으로 돈다. 여기서 두 가지
비자명한 문제를 만났다.

1. **당시 Quartz Job 생성 경로에서는 Spring 주입이 동작하지 않았다.** JobFactory 등 연동 방식에 따라 주입할 수 있으므로 Quartz 전체의 제약으로 일반화하지 않는다. 서비스는 \`JobDataMap\`을 통해 넘겨받고, 환경 값은 properties 유틸로
   직접 읽는 방식으로 우회했다.
2. **이중 수집 방지.** WAS가 2대라 스케줄러도 2곳에서 뜬다. 같은 데이터가 두 번
   쌓이지 않도록 properties의 스케줄 활성화 플래그로 **대표 1대만 수집**하게
   하고, local/dev 환경은 Spring profile(\`!dev\`)과 서버 타입 검사로 이중 차단했다
   — 개발 PC가 운영 서버에 SSH를 날리는 사고를 막는 안전장치다.

### 화면 조회: Collectors.toMap이 버그 검출기가 되도록

화면은 서버별 최신 1건만 보여주면 되므로, 쿼리가 서버별 최신 데이터만 내려주고
Controller는 이를 \`"WAS_1"\`, \`"WEB_2"\` 형태의 키로 Map에 담아 JSP에 넘긴다.

\`\`\`java
serverList.stream()
    .filter(vo -> vo != null && vo.getServerType() != null && vo.getServerNo() != null)
    .collect(Collectors.toMap(
        vo -> vo.getServerType() + "_" + vo.getServerNo(),
        vo -> vo
    ));
\`\`\`

\`Collectors.toMap\`은 **키가 중복되면 IllegalStateException을 던진다.** 보통은
merge 함수를 넣어 무마하지만 일부러 넣지 않았다 — 중복이 왔다는 건 "서버별
최신 1건" 쿼리가 깨졌다는 뜻이라, 조용히 덮는 것보다 크게 실패해서 로그에
드러나는 편이 낫다. 조회가 실패해도 화면은 떠야 하므로 model 속성 주입은
finally에서 빈 Map으로라도 보장했다.

## 결과

관리자 화면에서 메모리 탭 / 시스템(디스크) 탭으로 서버별 최신 수집 이력을 조회할
수 있게 됐고, 4시간마다 수집된 데이터가 DB에 쌓이면서 월말 용량 보고는
"서버 들어가서 적어 오기"에서 "쌓인 데이터 정리"로 바뀌었다.

## 배운 점

- **라이브러리 선택 기준은 인지도가 아니라 대상 환경과의 호환성이다.** JSch는
  훌륭하지만 접속할 서버의 보안 정책과 맞지 않으면 소용이 없다. "무엇에
  붙는가"를 먼저 확인해야 한다.
- **개발자도 자기 코드가 지나가는 인프라 구간은 읽을 줄 알아야 한다.**
  sshd_config, 알고리즘 협상 로그, 마운트 구성, 망 분리 — 이번 기능의 실패
  원인과 파싱 조건은 전부 애플리케이션 코드 바깥에 있었다.
- **모니터링 코드는 감시 대상보다 튼튼해야 한다.** 전 단계 타임아웃, 명령 폴백,
  한 대 실패 시 계속 진행, 원본 예외 보존 — 장애 상황에 동작해야 하는 코드라서
  정상 경로보다 실패 경로에 더 많은 코드를 썼다.
`,_=`---
title: 쪼개진 원천 테이블과 달라진 PK 사이 — Kafka 서비스 도메인 GW에서 데이터 정합성 지키기
date: 2025-02-10
tags: Kafka, Java, Spring, Operations
summary: 차세대 전환으로 원천 테이블이 쪼개지고 PK 체계가 바뀌면서 pub/sub 데이터가 어긋나기 시작했다 — 중간에서 형상을 맞춰주는 GW의 구조, 이벤트 토픽 등록 절차, 업무키 매핑, 그리고 엑셀로 DML을 만들어 불일치를 보정하던 운영 기록
---

서비스 도메인 연동 시스템을 운영하며 가장 오래 맡았던 업무 중 하나가 **GW(Gateway) 데이터
연동**이다. 한 문장으로 정리하면 이렇다 — *Kafka pub/sub으로 연동되는
데이터에서 불일치 건을 식별하고 조치해서, 구독 파트의 테이블에 데이터가
정상적으로 만들어지게 하는 일(DI, Data Integrity 업무)*.

## 배경 — 왜 중간에 GW가 필요했나

발행(Pub) 측 시스템이 차세대 전환을 하면서 **기존 원천 테이블들이 여러
테이블로 쪼개졌다.** 테이블만 쪼개진 게 아니라 PK 체계가 바뀌고 UUID가
도입되면서, 발행되는 데이터의 형상 자체가 달라졌다.

문제는 구독(Sub) 측이다. 과금·청구·정산 같은 구독 파트의 테이블은 기존
업무키 기준으로 설계되어 있는데, 발행 데이터는 새 형상으로 내려온다.
그대로 꽂으면 데이터가 안 맞는다. 그래서 **중간에서 형상을 맞춰 주는
GW를 개발**해, 발행 데이터를 구독 파트 테이블 구조로 변환한 뒤 적재하도록
했다.

\`\`\`text
발행 시스템 --비동기 이벤트--> Kafka 토픽 --구독--> GW --DML--> 구독 DB
                                                   ├─ 키 저장·조회 ↔ Redis
                                                   └─ 규칙 조회 ↔ 매핑 메타데이터
키 미확보 → 재처리 대상으로 보관 → 매핑 확보 후 GW 재처리
\`\`\`

용어를 정리하면 — **topic**은 메시지가 발행되고 소비되는 단위,
**payload**는 Producer가 토픽으로 보내는 메시지의 본문(body)이다. GW는
토픽을 구독해 payload를 받고, Redis에서 업무키를 해석한 뒤 GW가 구독 DB에 반영한다. Redis가 DB에 메시지를 전달하는 직렬 파이프라인은 아니다.

1. 발행 측이 이벤트를 Kafka에 적재한다. 발행 완료가 구독 DB 반영 완료를 뜻하지 않는다.
2. GW가 이벤트를 읽고 키와 매핑 규칙을 조회해 대상 행을 만든다.
3. 키가 없으면 재처리 대상으로 분리하고, 확보되면 다시 처리한다. 저장 매체·재시도 횟수는 기록에 없다.
4. 대상 DB 반영 후 운영 대사로 최종 일치를 확인한다. DB 커밋과 Kafka offset 커밋 순서는 확인 필요다.

## GW 소스 구조 — 변환 로직의 뼈대

변환을 담당하는 convert 패키지의 중심에는 추상 클래스가 하나 있다.

\`\`\`java
public abstract class AbstractGwService {

    /** payload가 단일 DTO인 경우 */
    public void process(GwPayload payload) { ... }

    /** payload가 계층 구조(레벨 2에 DTO 리스트)인 경우 */
    public void processWithList(GwPayload payload) { ... }

    protected abstract void stepInSrc(...);   // 원천 데이터 해석
    protected abstract void stepInTrgt(...);  // 대상 테이블 반영
}
\`\`\`

- payload의 **레벨 1에만 DTO가 있으면 \`process\`**, **레벨 2에 DTO 리스트가
  있으면 \`processWithList\`**를 탄다.
- 매핑 유형에 따라 구현체가 갈린다. 원천과 대상 테이블이 1:1이면
  \`OneToOneService\`, 원천 하나가 대상 여러 테이블로 갈라지면
  \`OneToManyService\` 계열 구현체가 \`stepInSrc\` / \`stepInTrgt\`를 구현한다.
- 이벤트의 작업 유형 코드(\`eventWorkCd\`)에 따라 **INS / UPD / MER / DEL**
  로 분기한다. MER(merge)은 join 조건 기준으로 있으면 UPDATE, 없으면
  INSERT다.

\`\`\`java     
switch (event.getEventWorkCd()) {
    case INS -> targetDao.insert(row);
    case UPD -> targetDao.update(row);        // joinT로 정의된 조건 컬럼 기준
    case MER -> targetDao.merge(row);
    case DEL -> targetDao.delete(row.getKeys());
}
\`\`\`

구독 진입점에서는 **Dispatcher**가 메시지 헤더를 읽어 사업 구분(MNO/MVNO)
을 판별해 처리 경로를 나누고, 도메인 이벤트는 \`domainEventHandler\`가 받는다.
payload에 필드가 추가되면 공통 DTO 모듈을 수정하고 **각 파트별 pom.xml의
의존성 버전을 올려**(사내 Nexus 배포) 배포하는 것까지가 한 세트다.

## 이벤트 토픽은 어떻게 만들었나 — 메타데이터 테이블

GW의 변환 규칙은 코드에 하드코딩되어 있지 않고 **메타데이터 테이블**로
관리된다. 구조는 크게 세 묶음이다.

\`\`\`text
① 토픽/이벤트         : 토픽 관리 기본, 토픽 이벤트(필드) 관리 기본
② 원천(Pub 쪽)        : 원천 테이블 관리, 원천 컬럼 관리, 이벤트-원천 매핑 상세
③ 대상(Sub 쪽)        : 대상 테이블 관리, 대상 컬럼 관리, 원천-대상 매핑 상세
\`\`\`

- **토픽 관리 테이블**: 토픽 정보를 담는다. ID 채번은 시퀀스 없이
  \`MAX + 1\` 방식을 썼고, 구독 파트에서 토픽을 요청할 때 ID를 함께 주면
  그대로 등록한다.
- **이벤트 관리 테이블**: 이벤트별 필드명 정보를 담는다. 이벤트는 두
  종류로 구분했다 — 이벤트명에 테이블 접두어(TB_)가 붙어 있으면 원천
  테이블 단위로 발행되는 **테이블(create) 토픽**, 붙어 있지 않으면 업무
  단위로 발행되는 **도메인 토픽**.
- **원천/대상 매핑 테이블**: 어떤 원천 컬럼이 어떤 대상 컬럼으로 가는지,
  UPDATE 시 어떤 컬럼을 조건으로 잡는지(join 대상 여부 플래그, 보통 PK)
  를 정의한다. 원천 테이블명은 명명 규칙에 따라 접미어를 붙여 GW용
  구조로 변환해 관리했다.

### 참조 예제 — 신규 이벤트 토픽 등록 절차

아래 이름은 설명용이며 세 SQL은 실제 테이블 개수나 내부 스키마 전체를 뜻하지 않는다. \`MAX + 1\`은 동시 등록 시 중복될 수 있는 당시 방식이다. 동시성 제어·유일 제약이 없다면 안전한 채번으로 일반화할 수 없다.

청구 파트가 "계약 변경 이벤트를 구독하고 싶다"고 요청했다고 하자.
실제 등록은 이런 순서로 진행했다.

\`\`\`sql
-- 1. 토픽 등록 (ID는 MAX+1 채번, 구독 파트가 지정해 준 ID가 있으면 그대로)
INSERT INTO gw_topic_mgmt (topic_id, topic_nm, event_type, use_yn, reg_id)
VALUES ((SELECT NVL(MAX(topic_id), 0) + 1 FROM gw_topic_mgmt),
        'SVC_CONTRACT_DOMAIN', 'DOMAIN', 'Y', 'GWADM');

-- 2. 이벤트 필드 등록 (payload의 레벨/필드 구조 정의)
INSERT INTO gw_event_mgmt (topic_id, event_id, field_nm, field_level, work_type_yn)
VALUES (:topicId, 'contractChanged', 'cntrUuid', 1, 'N');
-- ... 필드 수만큼 반복. 레벨 2에 리스트가 있으면 processWithList 대상

-- 3. 원천-대상 매핑 등록 (join 대상 컬럼은 플래그로 표시)
INSERT INTO gw_src_trgt_mapg (src_tbl, src_clmn, trgt_tbl, trgt_clmn, join_yn)
VALUES ('CONTRACT_I', 'CNTR_UUID', 'SVC_CONTRACT', 'CNTR_NO', 'Y');
\`\`\`

이 매핑 데이터는 화면이 따로 없어서 **엑셀에 정리한 뒤 INSERT 문으로
만들어 직접 반영**했다. 등록이 끝나면 payload DTO에 필드를 추가하고
파트별 pom 버전을 올려 배포하면 새 토픽이 흐르기 시작한다.

## 핵심 이슈 — 업무 중심키(PK)가 달라졌다

가장 까다로웠던 건 **발행 측과 구독 측의 중심키가 다르다**는 점이었다.

\`\`\`text
원천(차세대) : CNTR_UUID (신규 도입된 UUID) + 이력 시퀀스
구독(서비스 도메인) : CNTR_NO + SVC_NO (기존 업무키 조합)
\`\`\`

원천은 테이블이 쪼개지면서 UUID 기반으로 재설계됐는데, 구독 파트 테이블은
여전히 업무키로 조회·갱신된다. UUID만 담긴 이벤트가 오면 구독 테이블의
어느 행을 갱신해야 하는지 알 수 없다. GW에서 이렇게 맞췄다.

1. **키 매핑의 기준을 정한다** — 신규 생성(INS) 이벤트에는 UUID와 업무키가
   함께 내려온다. 이때 UUID ↔ 업무키 매핑을 만들어 둔다.
2. **매핑을 Redis에 올려 둔다** — 이후 변경(UPD/MER) 이벤트는 UUID만
   들고 오는 경우가 있어서, 적재해 둔 매핑으로 업무키를 해석한 뒤 대상
   테이블의 join 조건(업무키)으로 UPDATE를 친다. 연동 구조에서 Redis가
   낀 이유가 이것이다 — 단순 버퍼가 아니라 **키 해석용 중간 저장소**였다.
3. **join 조건은 메타데이터로 관리한다** — 어떤 컬럼 조합으로 UPDATE
   조건을 잡는지를 매핑 테이블의 join 플래그로 정의해서, 키가 다른
   테이블이 늘어나도 코드 수정 없이 매핑 등록으로 대응했다.

순서도 문제였다. 매핑이 만들어지기 전에 변경 이벤트가 먼저 도착하면 키
해석이 실패한다. 이런 건은 바로 버리지 않고 재처리 대상으로 쌓아 두었다가
매핑이 생긴 뒤 다시 흘렸다.

## 모니터링 — same, mismatch, 그리고 재연동 대기

발행 측과 구독 파트 사이의 데이터 차이는 **GW 모니터링 사이트**와 **WhaTap
히트맵**에서 상시 추적했다. 대사(비교) 결과는 상태로 나뉜다.

- **same** — 일치. 정상.
- **mismatch** — 불일치. 조치 대상.
- **재연동 대기** — 연동 쿼리가 돌지 않아 다시 실행해야 하는 상태.

초기에는 주간 평균 **70건 안팎**의 연동 오류가 올라왔다. WhaTap 히트맵의
지연·예외 패턴과 mismatch 로그를 교차 분석해 보니 원인은 크게 네 갈래로
수렴했다 — **① 발행 누락, ② 이벤트 순서 역전, ③ 이기종 DB 간 인코딩 바이트
초과, ④ 신규 컬럼·매핑 누락**이었다.

특히 까다로웠던 것이 **Oracle ↔ MySQL 간 캐릭터셋·바이트 길이 차이**였다.
글자 수 기준으로는 통과한 한글 문자열이 대상 DB의 바이트 단위 컬럼 정의에서
잘리거나 예외를 내며 Subscriber 소비가 멈추는 일이 반복됐다. 이를 막기 위해
Java 단에서 바이트 길이 기준으로 안전하게 자르는 변환 로직(Oracle \`SUBSTRB\`
대응)을 적용하고, 길이·필수키 검증을 **공통 모듈로 표준화**해 신규 토픽이
추가될 때도 자동으로 타게 만들었다. 그 결과 **인코딩 관련 오류는 95% 이상
감소**했고 신규 연동 실패율도 **5% 미만**으로 안정화됐다.

여기에 네 가지 오류 유형별 대응 시나리오와 보정 스크립트를 매뉴얼화해
장애 발생 시 누가 맡더라도 같은 절차로 즉시 조치할 수 있게 정비하면서,
**주간 70건 수준이던 Kafka 연동 오류를 5건 미만(약 93% 감소)**으로 줄일 수 있었다.

주간 70건 → 5건 미만, 인코딩 오류 95% 감소, 신규 연동 실패율 5% 미만은 저자의 경험 기록이다. 집계 기간·중복 오류 포함 여부·실패율 분모·메시지 처리량은 저장소에 없다. 서로 다른 지표를 단일 성공률로 합치지 않는다. 바이트 길이는 DB 제품 이름이 아니라 실제 문자셋과 컬럼 길이 단위에 따라 달라지므로, 잘라내기가 허용되는 업무 값인지와 멀티바이트 문자 경계 보존도 확인해야 한다.

## 불일치 보정 — 엑셀로 DML을 만들던 방법

건수가 적으면 건건이 고치면 되지만, 특정 기간의 이벤트가 통째로 누락되는
식의 **대량 불일치**가 생기면 이야기가 다르다. 이때 쓰던 방법이 엑셀
수작업 DML 생성이었다.

1. **대사 쿼리로 불일치 키 목록을 추출한다.** 원천 스냅샷과 구독 테이블을
   업무키로 비교해서 "구독 측에 없거나 값이 다른" 키와 올바른 값을 뽑는다.
2. **엑셀에 붙여넣고 수식으로 DML을 만든다.** 키와 값이 A, B, C열에
   있다면 마지막 열에 문자열 조합 수식을 건다.

\`\`\`text
="UPDATE svc_contract SET cntr_status = '" & B2 & "', chg_dt = SYSDATE" &
 " WHERE cntr_no = '" & A2 & "' AND svc_no = '" & C2 & "';"
\`\`\`

   아래로 드래그하면 몇천 건의 UPDATE 문이 행 수만큼 만들어진다.
   INSERT 누락 건은 같은 방식으로 INSERT 문을 만들었다. 이 수식은 당시 흐름을 단순화한 것으로, 작은따옴표·NULL·날짜·문자셋을 안전하게 처리하는 범용 도구가 아니다. 지금 다시 한다면 검증된 바인딩 스크립트와 반영 전후 기록을 사용한다.
3. **반영 전에 반드시 역검증한다.** 만들어진 DML의 WHERE 조건으로 먼저
   SELECT를 돌려 **대상 건수가 키 목록 건수와 일치하는지** 확인하고,
   반영 후에는 모니터링 대사를 다시 돌려 mismatch가 same으로 바뀌는지
   확인하는 것까지가 한 사이클이다.

원시적인 방법이라는 건 안다. 하지만 정형화되지 않은 일회성 대량 보정에는
"키 목록을 눈으로 확인하면서 DML을 만들 수 있다"는 점이 오히려 안전장치가
됐다. 그리고 같은 유형의 보정이 반복되기 시작하면 그때 스크립트로
정비했다 — 반복 여부가 자동화의 기준선이었다.

## 배운 점

- **pub/sub 연동의 실전은 토픽 설계가 아니라 키 설계다.** 발행 측과 구독
  측의 중심키가 다르면 그 사이의 해석 계층(GW)이 반드시 필요하고, 키
  매핑이 무너지면 연동 전체가 무너진다.
- **변환 규칙은 코드가 아니라 데이터로 관리할수록 오래간다.** 원천-대상
  매핑을 메타데이터 테이블로 뺀 덕에, 테이블이 늘어나도 매핑 등록만으로
  대응할 수 있었다.
- **정합성 업무의 핵심은 "고치는 것"이 아니라 "확인하는 것"이다.** 대사
  → 보정 → 재대사의 사이클에서 보정은 한 단계일 뿐이고, 앞뒤의 검증이
  없으면 보정이 새로운 불일치를 만든다.
- **수작업과 자동화 사이의 기준을 정해 두면 흔들리지 않는다.** 일회성은
  엑셀로, 반복되면 스크립트로 — 이 기준 덕에 급한 보정과 체계화가 서로를
  방해하지 않았다.
`,v=`---
title: 10분짜리 API를 30초 이내로 — 100만 건 대용량 조회 성능 개선과 병렬 스트림
date: 2024-11-27
tags: Java, Spring, MyBatis, Performance
summary: 1만 건에서는 드러나지 않던 청구·가입 목록 조회의 MyBatis selectList 반복 호출 지연이 100만 건 테스트 데이터에서 10분짜리 API가 된 사건 — 병렬 스트림 처리로 응답 시간을 30초 이내로 단축한 과정과 그 해결의 한계까지 돌아본 기록
---

클라우드 빌링 플랫폼 프로젝트에 참여했을 때 겪은 일이다.

> 수치 확인(2026-11-03): 저자가 최종 성과를 **10분 → 30초 이내**로 확인했다. 11월 2일 이전 문서의 1분 15초는 최신 확인값으로 대체한다. 원문에는 100만 건 테스트 데이터·Swagger 반복 측정으로 기록되어 있지만, 동시 요청 수·반복 횟수·서버 및 DB 자원·원본 측정 로그는 확인 필요다.
화면에서 고객의 **가입 목록이나 청구 목록**을 조회하면, 각 목록 항목에 딸린 상세 내역(예: 가입 건별 할인·옵션 상품, 청구 건별 세부 항목)을 함께 묶어 내려주는 조회성 API가 있었다.

개발 단계에서는 별다른 문제가 없었다. 개발 환경의 테스트 데이터는 **1만 건** 안팎이었기 때문에 화면 응답에 큰 지연이 없었다.
그러다 대용량 검증을 위해 실제 운영 규모에 준하는 **100만 건 규모의 테스트 데이터**를 적재했고, 같은 조회 API의 응답 시간이 **10분**까지 치솟았다.

화면이 단순히 느린 정도가 아니라 타임아웃과 싸워야 하는 수준이었다.

문제는 이 API 하나로 끝나지 않았다. MyBatis의 \`selectList\`로 부모 목록을 가져온 뒤 루프를 돌며 자식 상세 목록을 \`selectList\`로 건건이 반복 호출하는 패턴이 **청구 조회, 가입 조회, 정산 집계 등 여러 화면의 조회 로직에 걸쳐 반복**되고 있었다.

## 왜 당시에는 DB보다 애플리케이션을 먼저 손댔나

이전 프로젝트 운영 경험은 주로 Oracle 기반이었다. Oracle에서는 실행계획을 열고 인덱스 접근 경로와 힌트를 조정하며 쿼리를 튜닝한 경험이 있었다.

하지만 이 프로젝트의 DB는 **MySQL**이었다.

물론 MySQL에도 \`EXPLAIN\`, 인덱스 설계, 옵티마이저 힌트 등 쿼리 튜닝 수단이 있다. 다만 당시의 나는 MySQL의 실행계획 분석과 옵티마이저 동작 특성에 익숙하지 않았다.

낯선 DB 환경에서 섣불리 힌트를 남발하기보다는, **내가 로직 흐름과 동작을 완벽히 통제할 수 있는 애플리케이션 계층에서 먼저 대기 시간을 줄이자**고 판단했다.

지금 돌아보면 절반은 맞고 절반은 아쉬운 판단이었다.
애플리케이션 계층의 직렬 호출 구조를 손본 것은 당장의 10분 지연을 해소하는 데 유효했지만, 성능 문제라면 동시에 MySQL \`EXPLAIN\`으로 실제 쿼리의 테이블 풀 스캔 여부나 인덱스 상태를 함께 진단했어야 했다.

## AS-IS — MyBatis selectList 순차 반복 호출이 만든 10분 지연

기존 코드의 조회 흐름을 단순화하면 다음과 같았다. 목록을 \`selectList\`로 가져온 뒤, 루프를 돌며 각 항목의 상세 내역이나 집계 데이터를 다시 \`selectList\`로 건건이 호출하는 직렬 구조였다.

\`\`\`java
// AS-IS — 청구·가입 목록 조회 시 순차적으로 selectList를 반복 호출하던 패턴
public List<BillingDTO> getBillingList(Long customerId) {
    // 1. 청구(가입) 마스터 목록 조회 (selectList 1회)
    List<BillingModel> billings = billingDAO.selectBillingList(customerId);
    List<BillingDTO> result = new ArrayList<>();

    for (BillingModel billing : billings) {
        // 2. 루프를 돌며 각 청구 건의 상세 항목을 매번 순차 조회 (selectList 반복 실행)
        List<BillingItemModel> items =
                billingDAO.selectBillingItemList(billing.getBillingId());

        result.add(toBillingDTO(billing, items));
    }

    return result;
}
\`\`\`

이 로직의 치명적인 병목은 \`for\`문 자체의 연산 비용보다 **DB I/O 대기 시간의 직렬 누적**에 있었다.

\`\`\`text
청구 마스터 목록 조회 (selectList)           1회
  ↳ 청구 건 1의 상세 항목 조회 (selectList)      1회 (응답까지 대기)
  ↳ 청구 건 2의 상세 항목 조회 (selectList)      1회 (응답까지 대기)
  ↳ 청구 건 3의 상세 항목 조회 (selectList)      1회 (응답까지 대기)
  ...
  ↳ 청구 건 N의 상세 항목 조회 (selectList)      1회 (응답까지 대기)
\`\`\`

가져와야 할 데이터가 1만 건 이하일 때는 개별 네트워크 왕복 시간이 짧아 지연이 눈에 띄지 않았다. 하지만 **100만 건 규모의 대용량 데이터 환경**에서는 조회 대상과 하위 데이터 볼륨이 함께 커지면서, 앞선 쿼리가 끝나야만 다음 쿼리가 출발하는 직렬 대기 시간이 고스란히 합산되어 **약 10분**이라는 응답 지연을 만들어냈다.

*(참고로 당시 4명의 백엔드 개발자마다 제각각이던 \`List\` 자료형 기반 조회 코드를 \`ServiceImpl\`·\`Request/Response DTO\`·\`Model\`·\`Builder\` 구조로 표준화해 팀 전체에 공유한 과정은 별도 글인 [4인 백엔드 팀의 코드 리팩토링과 PDF 컨벤션 표준화 기록](/blog/backend-code-convention-standardization)에 따로 정리해 두었다.)*

## TO-BE — parallelStream을 통한 조회 대기 시간 중첩

계층 정비를 통해 \`ServiceImpl\`로 모인 조회·집계 로직에 내가 적용한 방법은, 순차 루프로 돌던 \`selectList\` 호출을 Java의 **\`parallelStream()\` 기반 병렬 처리 구조**로 전환하는 것이었다. 청구·가입 조회뿐 아니라 동일한 순차 병목을 겪던 소스 전역의 집계·목록 조립 구간에도 같은 병렬 스트림 구조를 적용했다.

\`\`\`java
@Override
@Transactional(readOnly = true)
public List<BillingDTO> getBillingList(Long customerId) {
    // 1. 청구 마스터 목록 조회
    List<BillingModel> billings = billingDAO.selectBillingList(customerId);

    // 2. 상세 항목 조회 및 조립을 병렬 스트림으로 동시 실행
    return billings.parallelStream()
            .map(billing -> {
                List<BillingItemDTO> items = billingDAO
                        .selectBillingItemList(billing.getBillingId())
                        .stream()
                        .map(BillingItemDTO::from)
                        .collect(Collectors.toList());

                return BillingDTO.of(billing, items);
            })
            .collect(Collectors.toList());
}
\`\`\`

기존의 순차 루프에서는 하나가 끝나야 다음 쿼리가 실행됐다.

\`\`\`text
상세 쿼리 1 실행 → 완료 대기
                            상세 쿼리 2 실행 → 완료 대기
                                                        상세 쿼리 3 실행 → 완료 대기
\`\`\`

이를 \`parallelStream()\`으로 전환하면서 여러 워커 스레드가 상세 조회 요청을 **동시에 병렬로 실행해 DB I/O 대기 시간을 서로 겹치게(Overlap)** 만들었다.

\`\`\`text
Thread 1 : 상세 쿼리 1 실행 → 완료 대기
Thread 2 : 상세 쿼리 2 실행 → 완료 대기
Thread 3 : 상세 쿼리 3 실행 → 완료 대기
\`\`\`

### 결과

동일한 100만 건 테스트 데이터 조건에서 Swagger를 통해 반복 측정한 결과는 다음과 같았다.

\`\`\`text
AS-IS (순차 직렬 selectList)   : 약 10분
TO-BE (병렬 스트림 selectList) : 30초 이내 (응답 시간 약 95% 단축)
\`\`\`

타임아웃에 걸리던 대용량 목록·집계 API를 **30초 이내**로 끌어내리며 당면했던 성능 병목을 해소했다.

## 이 방식의 분명한 한계와 교훈

하지만 작업을 마친 뒤 이 해결책을 다시 뜯어보며 냉정하게 짚어야 할 사실이 있었다.

**이 조치는 반복되는 SQL 실행 횟수 자체를 줄인 것이 아니다.**

마스터 건수가 많으면 상세 항목을 조회하는 \`selectList\` 쿼리도 여전히 그만큼 실행된다. 달라진 것은 수많은 쿼리를 한 줄로 서서 기다리던 것을 **여러 스레드가 병렬로 겹쳐서 기다린 것뿐**이다.

\`\`\`text
총 SQL 실행 횟수 감소 : X (여전히 건별 반복 쿼리 발생)
DB I/O 대기 시간 중첩 : O (병렬 처리로 전체 소요 시간 단축)
\`\`\`

이 방식은 실무 운영 환경에서 다음과 같은 **위험과 한계**를 안고 있다.

1. **공용 스레드 풀 및 DB 커넥션 풀 경합**:  
   일반적인 병렬 스트림 실행에서는 공용 \`ForkJoinPool.commonPool()\` 워커가 사용된다. 호출 스레드와 실행 컨텍스트도 고려해야 하며 별도 풀 설정 여부는 기록에 없다. 여러 사용자가 동시에 대용량 조회를 요청하면 순간적으로 워커 스레드들이 DB 커넥션을 한꺼번에 점유해, 다른 일반 API 요청까지 커넥션 대기 타임아웃에 빠뜨리거나 DB CPU 부하를 급증시킬 수 있다.
2. **트랜잭션 컨텍스트 전파 불가**:  
   Spring의 \`@Transactional\`은 \`ThreadLocal\` 기반이므로, \`parallelStream\`이 쪼갠 별도 워커 스레드에는 기존 트랜잭션 컨텍스트가 전파되지 않는다. \`readOnly=true\`도 워커 스레드 전체에 동일한 스냅샷이나 트랜잭션을 보장하지 않는다. 읽기만 해도 조회 시점 차이로 결과가 불일치할 수 있다. [Spring Transactional 문서](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/transaction/annotation/Transactional.html)

## 지금 다시 한다면 — IN 절을 활용한 '집합 단위 조회'

지금 같은 문제를 다시 마주한다면, \`parallelStream\`으로 호출을 병렬화하기 전에 **실행되는 SQL의 개수 자체를 줄이는 집합 단위 조회**로 설계할 것이다.

### 1단계: 마스터 목록 조회 및 키 추출 (쿼리 1회)
\`\`\`java
List<BillingModel> billings = billingDAO.selectBillingList(customerId);
List<Long> billingIds = billings.stream()
        .map(BillingModel::getBillingId)
        .collect(Collectors.toList());
\`\`\`

### 2단계: 하위 데이터를 IN 절로 한 번에 조회 (쿼리 1회)
\`\`\`sql
SELECT billing_id, item_id, item_name, amount
  FROM billing_item
 WHERE billing_id IN (1, 2, 3, ...)
\`\`\`

### 3단계: 애플리케이션 메모리에서 부모 키 기준으로 매핑
\`\`\`java
List<BillingItemModel> allItems = billingDAO.selectBillingItemsByBillingIds(billingIds);

// billingId를 키로 메모리 그룹핑
Map<Long, List<BillingItemDTO>> itemMap = allItems.stream()
        .collect(Collectors.groupingBy(
                BillingItemModel::getBillingId,
                Collectors.mapping(BillingItemDTO::from, Collectors.toList())
        ));

// 추가 DB 왕복 없이 메모리에서 조립
return billings.stream()
        .map(b -> BillingDTO.of(b, itemMap.getOrDefault(b.getBillingId(), Collections.emptyList())))
        .collect(Collectors.toList());
\`\`\`

이렇게 설계하면 대상 건수가 1,000건이더라도:
- **기존 반복 호출**: 마스터 1회 + 상세 1,000회 = **총 1,001회 쿼리**
- **집합 단위 조회**: 마스터 1회 + 상세 \`IN\` 조회 1회 = **단 2회 쿼리**

로 줄어든다. 이는 하위 컬렉션 한 종류를 한 청크로 조회하는 예시다. 빈 ID 목록은 조회를 생략하고, 대량 키는 페이지/청크로 나눠야 한다. 청크 크기 1,000은 보편적 한도가 아니며 DB·드라이버·SQL 길이·결과 크기로 결정한다. 청크가 C개라면 단순 모델의 SQL 수는 1+C회다. 결국 **"많은 쿼리를 동시에 빨리 날리는 것"보다 "애초에 날리는 쿼리 횟수를 줄이는 것"이 데이터베이스 성능 최적화의 정석**이다.

## 배운 점

- **1만 건에서 괜찮은 코드가 100만 건에서도 괜찮은 것은 아니다.**  
  개발 데이터의 볼륨이 작을 때는 직렬 \`selectList\` 반복 호출의 비효율이 가려져 있었다. 운영 규모에 준하는 데이터로 검증해야 비로소 잠복해 있던 I/O 병목이 드러난다.
- **병렬 스트림은 대기 시간을 겹치는 우회책이지 쿼리 자체를 줄이는 해법이 아니다.**  
  10분 걸리던 응답을 30초 이내로 줄인 것은 당시 일정 안에서 유효한 개선이었지만, DB I/O에 \`parallelStream\`을 적용할 때는 공용 스레드 풀과 커넥션 풀 경합 위험을 반드시 의식해야 한다.
- **대량 연관 데이터는 집합(\`IN\` 절)으로 한 번에 읽어 메모리에서 조립하자.**  
  루프 안에서 DAO를 반복 호출하는 대신, 키 목록을 모아 한 번에 조회하고 \`groupingBy\`로 매핑하는 방식이 애플리케이션과 DB 모두를 지키는 구조다.
- **과거의 해결을 솔직하게 복기하는 힘.**  
  당시의 병렬화 성과를 완벽한 정답으로 포장하기보다, "당시에는 대기 시간을 병렬로 중첩해 30초 이내로 단축했고, 지금 다시 한다면 쿼리 횟수를 줄이는 집합 조회로 풀 것"이라고 한계와 대안을 명확히 구분해 설명할 수 있는 것이 엔지니어로서의 성장이라고 생각한다.
`,y=`---
title: 인덱스가 있는데 왜 안 타지 — 실행계획으로 좁혀간 슬로우 쿼리 튜닝기
date: 2023-01-10
tags: SQL, Oracle, Performance
summary: 스칼라 서브쿼리가 행마다 TABLE ACCESS FULL을 반복하던 조회 쿼리 — Trusted Orange로 플랜을 열고, 묵시적 형변환이라는 원인을 찾고, 인덱스 접근과 쿼리 재작성으로 고쳐간 기록. 그리고 그 과정을 기존 소스와 DBA 보고서에서 배웠다는 이야기
---

시스템을 운영하면서 상담 화면의 청구 목록 조회가 느리다는 문의를 받았다.
특정 월의 청구 목록을 조회하는 쿼리였는데, 데이터가 몰린 고객사를 조회하면
응답이 수십 초까지 늘어졌다.

당시 사용하던 툴은 **Trusted Orange**(Orange for Oracle의 사내 보안
버전)였다. Orange의 Plan 도구에 쿼리를 올리면 실행 계획 트리를 바로 볼 수
있어서, 튜닝은 언제나 여기서 시작했다.

## 실행계획부터 열었다

문제의 쿼리는 청구 목록에 "최근 납부일"을 붙여 주는 형태였다.

\`\`\`sql
SELECT a.bill_no,
       a.cust_no,
       a.svc_cd,
       a.bill_amt,
       (SELECT MAX(p.pay_dt)
          FROM payment p
         WHERE p.bill_no = a.bill_no) AS last_pay_dt   -- 스칼라 서브쿼리
  FROM bill a
 WHERE a.bill_ym = '202212'
   AND a.svc_cd  = ?
\`\`\`

Orange의 플랜 트리는 이렇게 나왔다.

\`\`\`text
SELECT STATEMENT
  TABLE ACCESS (BY INDEX ROWID) OF BILL
    INDEX (RANGE SCAN) OF IX_BILL_YM_SVC        ← 본문은 인덱스를 잘 탄다
  SORT (AGGREGATE)
    TABLE ACCESS (FULL) OF PAYMENT              ← 문제 지점
\`\`\`

본문(bill)은 인덱스를 잘 타는데, **스칼라 서브쿼리 쪽 payment가
\`TABLE ACCESS (FULL)\`**이었다. 상관 스칼라 서브쿼리는 반복 평가 비용을 만들 수 있지만, 결과 캐싱이나 옵티마이저 변환도 가능하다. 청구 5천 행이라고 풀 스캔 5천 회를 확정할 수는 없다. 실제 반복 횟수는 실행 통계의 Starts와 읽은 블록 수 등으로 확인해야 한다. 이 글의 플랜은 원본 실행 통계가 아닌 설명용 재구성이다.
느린 이유는 쿼리 본문 어디에도 없고, 플랜에만 있었다.

## 원인 — 인덱스는 있는데 타지 않았다

payment 테이블에는 \`bill_no\` 인덱스가 이미 있었다. 그런데도 풀 스캔이
나오는 게 이상해서 컬럼 정의를 확인했다.

\`\`\`text
bill.bill_no     NUMBER
payment.bill_no  VARCHAR2(20)      ← 타입이 다르다
\`\`\`

Oracle은 VARCHAR2와 NUMBER를 비교하면 문자 쪽을 숫자로 변환한다. 추측이
아니라 플랜에 증거가 있었다 — Orange 플랜 하단의 Predicate 정보에
\`TO_NUMBER("P"."BILL_NO")=:B1\`이 찍혀 있었다. 내가 쓰지도 않은
\`TO_NUMBER\`를 옵티마이저가 인덱스 컬럼에 씌우고 있었던 것이다. 인덱스
컬럼에 함수가 걸리면 일반 인덱스를 해당 조건의 범위 탐색에 활용하기 어려울 수 있다. 함수 기반 인덱스나 다른 접근 경로까지 모두 불가능하다는 뜻은 아니다. **인덱스가 없어서가 아니라,
있어도 못 쓰는 조건**이었다.

지금 생각하면 아찔한 점이 하나 더 있다. \`TO_NUMBER(p.bill_no)\`는
payment에 숫자가 아닌 값이 한 건이라도 섞여 있으면 ORA-01722로 터진다.
느린 것보다 더 나쁜 사고가 잠복해 있던 셈이다.

## 개선 1 — 형변환을 정리하고, 힌트 적용 결과를 확인

가공이 인덱스 컬럼이 아닌 본문 쪽에 가도록 변환 방향을 명시했다. 그리고
원하는 접근 경로를 유도하기 위해 서브쿼리에 인덱스 힌트를 적용하고 플랜을 확인했다.

\`\`\`sql
(SELECT /*+ INDEX(p IX_PAYMENT_BILLNO) */
        MAX(p.pay_dt)
   FROM payment p
  WHERE p.bill_no = TO_CHAR(a.bill_no)) AS last_pay_dt
\`\`\`

플랜에서 \`TABLE ACCESS (FULL) OF PAYMENT\`가
\`INDEX (RANGE SCAN) OF IX_PAYMENT_BILLNO\`로 바뀌었다.

다만 \`TO_CHAR\`로 방향을 바꾸는 게 공짜는 아니다. 문자 쪽 컬럼에
\`'00123'\`처럼 선행 0이 붙은 값이 있으면 \`TO_CHAR(123)\`은 \`'123'\`이라
조인이 **오류 없이 조용히 빠진다.** 반영 전에 양쪽 값의 표기 규칙이
일치하는지 데이터로 확인하고 나서야 적용했다. 근본 해결은 두 컬럼의
타입을 맞추는 것이지만, 운영 중인 테이블이라 거기까지는 손대지 못했다.

힌트는 원하는 계획을 유도하지만 문법·별칭·쿼리 변환·상충 조건 등에 따라 적용되지 않을 수 있다. 통계나 분포가 바뀐 뒤에도 최적 성능을 보장하지 않는다. 형변환 수정과 힌트 적용을 구분해 비교하고 실제 계획을 확인해야 한다. [Oracle SQL Tuning Guide](https://docs.oracle.com/en/database/oracle/oracle-database/19/tgsql/index.html)를 참고하되 당시 운영 버전은 확인이 필요하다.

## 개선 2 — 행마다 실행되는 구조 자체를 손보기

인덱스를 태워도 "행 수만큼 실행"이라는 구조는 남는다. 목록이 커질수록
서브쿼리 실행 횟수가 같이 늘어나므로, 조회 건수가 많은 화면은 스칼라
서브쿼리를 조인 + 집계로 재작성했다.

\`\`\`sql
SELECT /*+ LEADING(a) USE_HASH(p) */
       a.bill_no,
       a.cust_no,
       a.svc_cd,
       a.bill_amt,
       p.last_pay_dt
  FROM bill a
  LEFT JOIN (SELECT bill_no, MAX(pay_dt) AS last_pay_dt
               FROM payment
              GROUP BY bill_no) p
    ON p.bill_no = TO_CHAR(a.bill_no)
 WHERE a.bill_ym = '202212'
   AND a.svc_cd  = ?
\`\`\`

payment를 한 번만 읽어 bill_no별로 집계해 두고 본문과 조인하는 구조다.
납부가 없는 청구 건은 스칼라 서브쿼리에서도 NULL, LEFT JOIN에서도
NULL이다. 다만 집계 키·형변환·중복 행까지 비교해야 결과 동등성을 확인할 수 있다. \`LEADING\`/\`USE_HASH\`의 실제 적용 여부도 계획으로 확인해야 하며, 인라인 뷰가 물리적으로 반드시 한 번만 실행된다고 SQL 문장만 보고 단정할 수 없다.

물론 이 방식도 공짜는 아니다. 인라인 뷰가 payment **전체**를 집계하기
때문에, 조회 결과가 몇 건 안 되는 화면에서는 필요한 것보다 훨씬 많이
읽는다. 그래서 화면을 나눴다 — 조회 건수가 적은 화면은 개선 1(인덱스 +
스칼라 서브쿼리)을 유지하고, 대량 조회 화면만 개선 2(조인 재작성)를
적용했다.

## 결과

- 플랜에서 반복 실행되던 \`TABLE ACCESS (FULL) OF PAYMENT\` 구간이 사라졌다.
  Orange에서 같은 조건으로 반복 실행하며 확인했고, 고객사와 조회 조건에
  따라 편차는 있었지만 **수십 초 걸리던 조회가 1초 안팎**까지 내려왔다.
- 같은 원인(묵시적 형변환)이 의심되는 조인 조건을 시스템 전체에서 찾아
  같은 방식으로 정리했다 — 타입이 다른 컬럼끼리의 조인은 이 사건 이후
  코드 리뷰 체크 항목이 됐다.

## 덧붙여 — 같은 시기에 배운 PARALLEL 힌트

이 슬로우 쿼리와는 별개의 이야기지만, 비슷한 시기에 배워서 함께 적어 둔다.
모든 풀 스캔이 죄는 아니다. 월 마감 집계처럼 어차피 테이블 전 구간을
읽어야 하는 배치 쿼리는 인덱스로 좁힐 대상이 없다. 이런 쿼리는 풀 스캔을
없애는 게 아니라, 풀 스캔을 여러 병렬 실행 서버로 나눠 읽게 했다.

\`\`\`sql
SELECT /*+ FULL(p) PARALLEL(p 4) */
       p.bill_ym,
       p.svc_cd,
       SUM(p.pay_amt) AS pay_amt
  FROM payment p
 WHERE p.pay_dt >= :from_dt
   AND p.pay_dt <  :to_dt
 GROUP BY p.bill_ym, p.svc_cd
\`\`\`

\`PARALLEL(p 4)\`는 병렬도 4를 요청하는 힌트다. 실제 프로세스 총수가 항상 4개라는 뜻은 아니며 실행 계획과 자원 정책에 따라 달라진다.
플랜에는 \`PX BLOCK ITERATOR\` 아래로 스캔이 갈라져 나타난다. 이상적으로는
병렬도에 비례해 시간이 줄지만, 실제로는 I/O 대역폭과 병렬 서버 가용량에
따라 그보다 덜 줄었다. 쓰면서 지킨 원칙이 있다.

- **인덱스로 좁힐 수 있는 쿼리에는 쓰지 않는다.** PARALLEL은 "읽을 게
  많은 걸 빨리 읽는" 장치지, "읽을 걸 줄이는" 장치가 아니다. 화면 조회를
  PARALLEL로 덮으면 진짜 원인(접근 경로)이 가려진다.
- **병렬도는 공짜가 아니다.** 병렬 서버는 DB 전체가 공유하는 자원이라,
  업무 시간대 온라인 쿼리에 걸면 다른 세션의 자원을 뺏는다. 그래서
  야간 배치와 마감 집계로 용도를 한정했다.

고백하자면 당시 병렬도 4라는 숫자는 내가 계산한 값이 아니었다. 기존
소스의 배치 쿼리들이 4를 쓰고 있어서 따라 쓴 것이고, 왜 4인지는 설명하지
못했다. CPU 코어 수와 동시에 도는 배치 개수를 따져 병렬도를 정해야
한다는 건 나중에 알았다.

## 어떻게 배웠나 — 기존 소스와 DBA의 튜닝 보고서

이 글의 힌트 사용법들은 책이나 매뉴얼에서 체계적으로 배운 게 아니라는
점도 남겨 둔다. 출처는 두 가지였다.

하나는 **이미 운영에서 돌고 있던 기존 소스**다. 선배 개발자들이 작성해 둔
쿼리에 \`INDEX\`, \`LEADING\`, \`PARALLEL\` 힌트가 주석 없이 박혀 있었고, 나는
플랜을 열어 그 힌트가 있을 때와 없을 때를 비교해 보며 "이 힌트가 이
플랜을 만드는구나"를 역으로 익혔다.

다른 하나는 **DBA에게 튜닝을 요청하면 돌아오는 상세 보고서**였다. 문제
쿼리를 접수하면 실행 계획 분석, 대기 이벤트, 인덱스 권고, 수정 쿼리안이
정리된 보고서가 왔는데, 내 쿼리가 어떻게 진단되는지를 보여 주는 가장
좋은 교재였다. 보고서의 수정안을 그대로 반영하는 데서 멈추지 않고,
"왜 이렇게 고쳤는지"를 플랜으로 재확인하는 것까지가 내 몫이었다.

이 방식이 정답이 아니라는 건 안다. 이미 사용되고 있는 소스의 패턴을
참고하는 학습은 **그 소스가 옳다는 보장이 없고**, 잘못된 관행까지 함께
복사할 위험이 있다. 다만 당시의 내 실력에서는 그것이 닿을 수 있는 가장
빠른 길이었고, 그 한계를 인정하는 것에서부터 다음 공부(플랜을 스스로
읽고 근거를 확인하는 습관)가 시작됐다.

## 배운 점

- **느린 쿼리의 답은 쿼리 본문이 아니라 플랜에 있다.** 본문만 보면 멀쩡한
  쿼리였다. 플랜을 열었을 때에야 서브쿼리 구간의 FULL SCAN 반복이 보였고,
  Predicate 정보에서 형변환의 증거를 찾을 수 있었다.
- **"인덱스가 있다"와 "인덱스를 탄다"는 다르다.** 묵시적 형변환, 컬럼 가공,
  타입 불일치는 인덱스를 조용히 무력화한다. 인덱스 존재 확인 다음에는 반드시
  접근 경로를 확인해야 한다.
- **고치는 방법에도 부작용이 있다.** TO_CHAR 방향 전환은 표기 규칙이 다르면
  조인 누락을 만들고, 조인 재작성은 소량 조회에서 오히려 손해다. 개선안을
  적용하기 전에 "이게 새로 만드는 문제는 없나"를 데이터로 확인하는 습관이
  이때 생겼다.
- **힌트는 진단 후 검증할 선택지다.** 적용 여부와 실제 성능을 확인하고 데이터 분포가 바뀌면 다시 평가해야 한다.
- **따라 쓴 것과 이해한 것을 구분해야 한다.** 기존 소스의 힌트 패턴과
  DBA 보고서는 훌륭한 출발점이었지만, "왜"를 설명하지 못한 채 따라 쓴
  부분(병렬도 같은)은 당시 실력의 한계였다. 한계를 인정하고 나서야
  플랜을 근거로 스스로 검증하는 습관이 생겼다.
`,b=`---
title: 포트폴리오·기술 블로그·면접 자료 정합성 검토 보고서
date: 2026-10-25
tags: Review, Retrospective, Portfolio, Interview
summary: 2026-11-03 기준 경력 프로젝트 3개·블로그 24편·활성 도식 5개를 재검토한 결과 — 완료 항목, 수정한 기술 설명, 구현 근거 확인 과제를 구분한 현행 보고서
---

## 검토 기준과 범위

검토일은 **2026-11-03**, 시작 기준은 로컬 HEAD **a4a8f4d**다. 최초 게시일과 파일 주소는 유지했다. 시작 시 작업 트리는 깨끗했다. 현재 저장소 파일과 Git 변경 이력을 기준으로 검토했으며 원격 최신 상태와 업무 운영 환경을 동일하다고 가정하지 않았다.

- 활성 경력 3개: 전세사기 피해자 지원관리, CloudXper, 빌링 GW.
- 자료: profile.js·projects.js·projectArchitecture.js·architectureDiagrams.js, BillingArchitecture.jsx, 홈·이력서·블로그 출력 구조, 게시글 24편, README·BLOG_REFERENCE.
- 활성 SVG 구성도 5개: GW 이벤트 1개, CloudXper 요청·성능 2개, 공공 시스템 망간 연계·SSH 수집 2개. 블로그의 text 흐름도와 SQL/Java 예제도 대조했다.
- public의 로고·교육·수상·자격 이미지는 시스템 구현 증거가 아니다. 저장소에 업무 시스템 원본 Java 프로젝트·DB 스키마·성능 원본 로그·운영 아키텍처 이미지가 없으므로 실제 구현과의 완전 일치는 인증하지 않는다.
- 교육·수상 영역의 fmBoot·Leesigukgram 외부 저장소/PDF/영상은 경력 3개와 다른 참조다. 이 저장소의 링크 위치는 조사했지만 외부 구현·문서 본문은 이번에 검증하지 않았다. src/old는 비활성 참고 자료로 보존했다.

**근거 구분:** 저자의 경험 기록, 설명용 코드, 일반 기술 원리, 확인 필요 사항을 구분했다. 일반 원리는 공식 문서로 점검했지만 최신 문서의 버전을 당시 운영 버전으로 대입하지 않았다. 웹에 공개되는 이 문서에는 실제 내부 주소·계정·키·서버 배치·원본 운영 데이터 추가를 하지 않았다. 문서의 예시 식별자가 실제 내부 명칭인지와 공개 허용 범위는 저자 확인이 필요하다.

## 이전 보고서의 모든 개선 항목 재평가

아래 표는 이전 Top 6, 상세 2-1~2-4, 마지막 작업 1~4를 중복 없이 묶은 처리 내역이다.

| 기존 항목 | 현재 판정 | 반영 또는 제외 이유 |
| --- | --- | --- |
| CloudXper 전역 parallelStream 표현 | 이번 수정 완료 | 반복 조회·조립 범위와 SQL 수 유지로 정밀화. 집합 조회는 후속안으로 분리 |
| GW Oracle/POI 성과를 카드·이력서에 추가 | 필수 개선 목록에서 제외 | 해당 성과는 의도적으로 주석 처리되어 있음. 복원하지 않음. POI는 빌링 업무 중 개발한 일반 기능임을 저자 확인 |
| SI/SM 전면 라벨 변경 | 기존 완료 | 현재 Backend Developer 및 Operations·Performance·Architecture 사용 |
| intro와 strengths 중복 | 기존 완료 | 소개와 성능·정합성·보안 강점이 분리됨. 신규 수치를 만들어 보강하지 않음 |
| Thymeleaf 제거·CUBRID/eGovFrame/SSHD 보강 | 기존 완료 | 현재 활성 기술 목록에 반영됨 |
| 구 티스토리 링크 통일 | 기존 완료 | 활성 블로그 링크가 현재 /blog로 연결됨. 참고 주석·옛 자료는 삭제하지 않음 |
| AI 유지보수 30~40% 설명 보강 | 필수 개선 목록에서 제외 | 활성 성과가 아니며 주석 보존. 면접에서도 확정 성과로 나열하지 않음 |
| csql 384만 건 상세 수치 추가 | 기존 완료 | 원문에 14만+370만 규모가 있음. 이번에는 예제 재실행 조건을 수정 |
| Redis 10초→0.10초와 분산 캐시 이유 추가 | 기존 반영·이번 정확성 수정 | 수치는 보존. 고정 TTL의 자동 동기화 및 즉시 일관성 보장 주장을 교정 |
| 정적 SQL 9개 테이블·97개 컬럼·14건 추가 | 기존 완료 | 원문에 있음. 전수 목록 누락 사고와 복구 맥락 보존 |
| Kafka 오류/인코딩 개선 수치 추가 | 기존 완료 | 원문에 있음. 집계 기준은 미확인으로 분리 |
| Oracle 중복 문단 삭제 | 기존 완료 | 현재 본문에 해당 중복 없음. 재삭제하지 않음 |
| 면접 글 숨김 또는 회고 제목 전환 | 구현 과제에서 제외 | 숨김·라우팅 변경은 이번 문서 수정 범위 밖. 공개 면접 자료로 현행화 |
| 구 /projects/:slug를 현재 상세 화면으로 설명 | 이번 수정 완료 | 현재 홈 앵커·모달 구조와 당시 리팩터링 기록을 구분 |

## 프로젝트별 반영 내용

### CloudXper

- [면접 자료](/blog/interview-cloudxper-billing): 역할·구조·경험 3개·쉬운 개념·수준별 질문·학습 후보를 재구성했다. HikariCP 제품이나 장애 폴백을 확인된 구현으로 쓰지 않았다.
- [병렬 조회](/blog/mybatis-builder-parallel-refactoring): 최종 **10분→30초 이내**를 저자가 이번 검토에서 확인했다. c98f950(2026-11-02)에서 이전 1분 15초가 변경된 이력도 확인했다. 수치를 임의로 되돌리지 않았고 미확인 측정 조건은 남겼다.
- [Redis](/blog/redis-permission-cache-ttl): 고정 TTL과 실제 세션/토큰 만료 시각, 선적재와 Cacheable 지연 적재, 사용자·코드 그룹 키 삭제, 경합을 구분했다.
- profile.js·projects.js·projectArchitecture.js의 자동 동기화 표현을 정정했다. 구성도에서 모든 업무 API가 권한 조회 서비스를 순차 통과하는 것으로 보이던 선을 책임별 분기로 바꿨다.

### 전세사기 피해자 지원관리

- [면접 자료](/blog/interview-jeonse-support-system): 누락 사고와 수습, 인덱스 튜닝, 대량 패치, SSH와 보안 조치를 원문 기준으로 보강했다. 원문에 없는 MINUS 사용·무지연 0건 같은 단정은 제거했다.
- [csql](/blog/csql-nohup-mass-patch): 설명용 UPDATE에서 암호화와 완료 플래그를 함께 갱신하도록 보완했다. 실제 운영 스크립트를 고친 것은 아니다.
- [CUBRID](/blog/cubrid-query-plan-index-tuning): 범위 뒤 컬럼·저카디널리티·키 필터와 전체 커버링·정렬 방향을 구분했다.
- [SSH](/blog/jsch-to-mina-sshd): 4시간 수집을 실시간으로 부르지 않고 waitFor 반환값·단계별 제한 시간·CPU 지표 차이·Quartz 생성 경로를 설명했다.
- CWE 문서: rawHtml 정리와 HTML 정화, 예외 응답과 로그, window 콜백과 허용 목록, 얕은 복사, 원인 예외 보존, Java 주석과 배포 형태의 차이를 보완했다. 미사용 코드 제거 경험은 보존했다.
- 망간 흐름도에 요청/응답과 누락 보정 절차를 명확히 하고, SSH 그림에 수집과 화면 조회의 차이·실패 표시 확인 사항을 반영했다.

### 빌링 GW

- [면접 자료](/blog/interview-lgu-billing-gw): Kafka·Redis 책임, 세 묶음 메타데이터, 대사·보정·재대사, 파티션 순서·offset·멱등성 질문을 보강했다.
- [GW 원문](/blog/kafka-gw-data-integrity): Redis를 거쳐 DB로 전달되는 직렬 도식을 키 조회 분기로 바로잡았다. 재처리 매체·offset 경계를 추정하지 않았다.
- [Oracle](/blog/oracle-hint-subquery-fullscan): 스칼라 서브쿼리 실행 횟수와 힌트 적용을 확정하지 않도록 수정했다. 기존 소스·DBA 보고서에서 배운 맥락과 병렬도 이해의 한계를 유지했다.
- [POI](/blog/sxssf-vs-xssf-excel-download): 행 window와 전체 메모리, autoSize 추적 지원, 버전별 자원 정리를 구분했다. 빌링 업무 중 개발한 기능임을 저자가 확인했으며 성과 카드 복원 없이 블로그 설명을 수정했다.
- BillingArchitecture.jsx의 오류 원인을 원문 네 분류와 맞추고 재처리 구현 미확인 범위를 표시했다. 동작 로직은 바꾸지 않았다.

## 남은 확인 항목

P0은 사실관계·보안, P1은 경험 설명·면접 근거, P2는 추가 학습·가독성이다. 아래는 문서 오류를 고치지 않고 방치한 목록이 아니라, **문구는 정정했지만 업무 구현 증거가 없는 항목**까지 구분한 것이다.

| ID·우선순위 | 프로젝트·대상 파일 | 현재 문제와 이유 | 권장 방향·적용 여부 | 추가 확인할 근거 |
| --- | --- | --- | --- | --- |
| U01 P0 | CloudXper / redis-permission-cache-ttl.md, projects.js, interview-cloudxper-billing.md | 고정 TTL 예제로 토큰 exp 동기화·즉시 권한 회수를 입증할 수 없음 | 자동 동기화 단정 수정 완료. 구현 검증 보류 | 로그인 적재·TTL 계산·모든 코드 그룹 삭제·변경 커밋 순서·경합·장애·인가 코드 |
| U02 P0 | 공공 / cwe-79-xss-remediation.md | rawHtml 단일화만으로 저장 XSS 방어를 입증하지 못함 | 출력 통로와 정화 구분 완료. 보안 판정 보류 | 서버 정화 정책·커스텀 태그·URL/속성/JS 문맥별 테스트·최종 에러 템플릿 |
| U03 P0 | 공공 / csql-nohup-mass-patch.md | 완료 플래그 없는 예제는 중복 암호화 가능. 운영 구현은 없음 | 예제 값·플래그 동시 수정 완료 | 실제 완료 판정·자동 커밋·중간 오류·동시 쓰기·복구 절차 |
| U04 P1 | GW / sxssf-vs-xssf-excel-download.md | 사용 POI 버전과 당시 자원 정리 구현이 없음 | 메모리·autoSize·close/dispose 설명 수정 완료. 빌링 업무 귀속은 저자 확인으로 해소 | 사용 POI 버전·임시파일 정리·동시 다운로드 측정 |
| U05 P1 | 3개 프로젝트 / profile.js, projects.js, interview-*.md | 성능·오류·SAST 수치는 원문 기록. 원본 측정/점검 근거 없음 | 수치 유지·측정 범위 명시 완료. 30초는 저자 확인 완료 | 응답 측정 구간·반복·동시 요청·처리량·오류 분모·잔여 4건 사유·웹/SQL 검출 중복 여부 |
| U06 P1 | GW / kafka-gw-data-integrity.md, architectureDiagrams.js | 재처리·offset·DB 커밋·Redis 유실 복구가 미상 | DLQ/exactly-once 등 미확인 기술 추가 안 함 | 파티션 키·소비/커밋·재시도 매체·보존·멱등키·매핑 복구 절차 |
| U07 P1 | 공공 / jsch-to-mina-sshd.md | top user CPU와 100-idle 비교, 종료 이벤트·실패 표시 검증 부족 | 지표 차이와 주기 수집·제한 시간 설명 수정 완료 | 실제 파서·locale·TIMEOUT/exit status·호스트 키 검증·대표 WAS 장애 처리 |
| U08 P1 | 공공 / cubrid-query-plan-index-tuning.md, projects.js | DBeaver와 CUBRID Manager 표현 차이, 원본 플랜 부재 | 카드에서 도구 특정 제거. 원문 경험 보존 | 사용 도구·CUBRID 버전·플랜·실행 시간/읽기 통계 |
| U09 P1 | 공공 / cwe-676-dangerous-api.md, cwe-209-error-message-exposure.md, cwe-476-null-dereference.md | 전역 콜백 허용·로그 민감정보·빈 치환 문자열 검증 범위 미상 | 일반론의 안전 단정 수정 완료 | 콜백 허용 목록·로그 접근/마스킹·빈 문자열 계약·예외 회귀 테스트 |
| U10 P1 | 전체 / src/posts 예시·public 증빙·외부 프로젝트 자료 | 설명용 명칭의 비식별화·공개 권한과 외부 PDF 내용 미검증 | 내부 접속 정보·원본 운영자료 추가 안 함. 기존 증빙 삭제 안 함 | 저자의 공개 가능 범위 확인, 외부 문서와 증빙의 민감정보 수동 점검 |
| U11 P2 | CloudXper / backend-code-convention-standardization.md | PDF·온보딩 측정·당시 버전 없으며 게시일 순서와 작업 순서가 다를 수 있음 | 정성 경험 유지, 공식 PL/정량 성과 확대 안 함 | 공유 자료의 비식별 예시·실제 역할·작업 순서 |
| U12 P2 | 3개 면접 문서 / 학습 후보 | 새로운 실습 제안은 아직 실무 성과가 아님 | 모든 실습을 후속 학습안으로 명시 완료 | 재현 후 측정 자료·자신의 설명·학습 체크 갱신 |

정보처리기사 날짜는 저자가 합격 상태와 합격자 발표일(2026.12.18)임을 확인했다. licenses.js에 발표일 기준 표시를 보완하고 미래 날짜 오류 의심을 미해결 목록에서 제외했다. 외부 증명서 검증을 수행했다는 뜻은 아니다.

## 권장 학습 순서

1. **사실부터 정리:** 각 프로젝트의 담당 역할·핵심 흐름을 1분씩 말하고 성과 수치의 측정 범위를 확인한다.
2. **SQL과 데이터:** N+1·집합 조회 → 복합 인덱스·실행계획 → 트랜잭션·부분 커밋·대사.
3. **캐시와 권한:** TTL/세션/토큰 차이 → 변경 무효화·경합 → 권한 확인 실패 정책.
4. **이벤트 연동:** Kafka 파티션·offset → 키 매핑·중복 처리 → 대사·재처리·복구.
5. **보안과 운영:** XSS 출력 문맥·정화 → SAST 한계·로그 보호 → SSH 타임아웃·측정 지표.
6. **심화 실습:** 제한된 병렬 조회 부하, 캐시 장애, 중복 이벤트, 엑셀 전체 메모리를 작은 재현 환경에서 측정한다. 실습 결과를 과거 운영 성과에 합치지 않는다.

## 검증 범위

문서의 메타데이터·코드 펜스·내부 글 링크·이미지 경로와 SVG 노드/연결을 점검한다. 현재 블로그 렌더러는 Mermaid를 렌더링하지 않으므로 새 의존성 없이 기존 text 흐름도와 SVG 데이터 도식을 사용했다. Mermaid를 실행 검증했다고 주장하지 않는다.

사이트 테스트·빌드는 문서 렌더링과 기존 화면의 회귀 확인이며 업무 시스템 Java/SQL의 실행 검증이 아니다. 구체적인 검증 결과와 파일 목록은 저장소 루트 DOCUMENTATION_REVIEW_20261103.md에 기록한다. 커밋·배포·업무 서버 접속·기존 참고 코드 삭제는 수행하지 않는다.
`,x=`---
title: 포트폴리오를 다시 읽으며 — 소개·핵심 역량·프로젝트·블로그 사이의 설명 맞추기
date: 2026-11-04
tags: Portfolio, Review, Retrospective, Career
summary: 소개·역량·프로젝트·이력서의 표현 차이를 점검하고 권한 캐시·조회 성과·자격 날짜·공유 설명을 보완했다. 도메인 API·청구 산정 SQL 구현 범위와 남은 확인 과제를 정리한 기록
---

포트폴리오의 첫 화면을 여러 번 고쳤다. 운영과 성능 개선의 성과를 나열하던 소개에서, 어떤 방식으로 문제를 해결하고 어떤 개발을 하고 싶은지 설명하는 소개로 바꿨다. 핵심 역량은 수행 업무와 사용 기술로 정리했고, 수치와 상세 글은 프로젝트 경험에서 확인하도록 했다.

하지만 첫 화면을 고쳤다고 모든 설명이 함께 정리되는 것은 아니었다. 같은 데이터를 쓰는 이력서도 출력하는 항목이 달랐고, 블로그 본문에서 조심스럽게 설명한 경험이 프로젝트 카드에서는 더 넓은 성과로 읽히는 부분이 남아 있었다.

**현재 가장 필요한 보완은 성과를 더 크게 표현하는 일이 아니라, 이미 한 일을 같은 범위와 근거로 설명하는 일이다.** 이 글은 2026년 11월 4일 로컬 작업본을 기준으로 확인한 결과다.

## 무엇을 기준으로 점검했나

- 홈 소개와 01 핵심 역량: \`profile.js\`, \`AboutPoster.jsx\`, \`SkillsPoster.jsx\`.
- 경력 프로젝트 3개와 구성도: \`projects.js\`, \`projectArchitecture.js\`, \`architectureDiagrams.js\`, \`BillingArchitecture.jsx\`.
- 출력용 이력서와 기본 정보: \`ResumePage.jsx\`, 학력·수상·자격 데이터.
- 검색·공유 설명: \`index.html\`의 description, Open Graph, Twitter 메타데이터.
- 기존 게시글 24편의 제목·요약·주제와 관련 수치·역할 표현. 주요 경험 글, 면접 자료 3편, 이전 검토 보고서를 대조했다.

검토는 **문서와 화면 출력 코드의 일관성 점검**이다. 회사 업무 원본 소스, 운영 로그, 실제 DB, 외부 증빙·PDF 본문을 새로 검증한 것은 아니다. 기술별 전체 실행 검증이나 모든 화면 크기의 시각 검증도 포함하지 않는다.

[이전 기술 검토 보고서](/blog/portfolio-blog-audit-report)는 11월 3일 기준의 기술 설명과 구현 확인 과제를 다룬다. 이번 글은 그 이후 소개·역량 카드·컨벤션 글을 수정한 상태에서, 채용 담당자와 개발자가 읽는 설명이 이어지는지 살핀 후속 기록이다. 이전 보고서의 검토일과 당시 게시글 수는 과거 시점의 기록으로 남긴다.

초기 검토의 발견 사항과 2026-11-04 반영 결과를 함께 기록했다. 표현·출력 수정은 아래 적용 내역에서 구분하고, 측정 원본과 실제 구현 확인이 필요한 항목은 후속 과제로 남겼다.

## 먼저, 서로 다르다고 볼 필요가 없는 부분

### 소개의 ‘고도화 프로젝트’와 상세의 정식 명칭

소개와 01번에서 쓰는 ‘시스템 고도화 프로젝트’는 익숙한 말로 요약한 표현이다. 상세의 [CloudXper 프로젝트](/#project-cloudxper-billing)는 해당 경험을 식별하는 정식 명칭이다. 모든 곳의 프로젝트 이름을 지울 필요는 없다.

다만 공공 시스템도 고도화 경험이므로, 상세로 넘어갈 때 어느 프로젝트의 이야기인지 연결되어야 한다. 소개는 넓게 쓰고, 프로젝트 카드와 블로그에서는 이름·기간·담당 업무를 분명히 쓰는 구성이 적절하다.

### 약 3년 7개월의 경력과 겹치는 프로젝트 기간

초기 검토 당시 소개에는 약 3년 7개월, 이력서에는 \`3년+\`가 표시됐다. 이번 보완에서 이력서도 ‘약 3년 7개월’로 맞췄다.

회사 기간은 2022.11~2025.05와 2025.09~2026.08이다. 시작·종료 월을 포함한 월 단위 계산으로는 31개월과 12개월, 총 43개월이다. 정확한 일 단위 경력은 입·퇴사일을 기준으로 계산해야 한다. 2024.10~2025.02 고도화 프로젝트는 첫 회사 재직 기간 안에 있으므로 경력에 별도로 더하지 않는다.

### 병렬 조회 성과와 후속 개선안

[병렬 조회 글](/blog/mybatis-builder-parallel-refactoring), 프로젝트 카드, 면접 자료의 최종 성과는 **10분 → 30초 이내**로 맞춰져 있다. 이전 1분 15초는 최신 사용자 확인으로 대체된 과거 기록이다. 병렬화 성과를 쿼리 호출 수 감소나 N+1 제거 성과로 바꾸지 않은 점도 유지해야 한다.

저장소의 \`AGENTS.md\`에 남았던 1분 15초 메모도 최종 확인값인 30초 이내로 갱신했다. 당시 성과는 병렬화이며 집합 조회는 후속안이라는 구분은 유지했다.

### 숨겨둔 성과와 공개 블로그

POI 엑셀 다운로드는 빌링 업무 중 개발한 일반 기능으로 확인된 경험이다. 블로그에 설명하면서 핵심 성과 카드에는 표시하지 않는 것은 의도된 선택이다. 대량 암호화나 다른 참고 항목의 주석도 복원·삭제 대상으로 간주하지 않았다.

01번의 블로그 블록을 제거한 것도 의도된 화면 구성이다. 그 자리에 링크나 수치를 다시 넣는 것을 개선 과제로 삼지 않는다. 상세 근거는 프로젝트 경험과 관련 글에서 제공하면 된다.

## 초기 검토에서 확인한 표현 차이

우선순위 ‘높음’은 읽는 사람이 사실 범위를 다르게 이해할 수 있는 항목, ‘중간’은 설명의 구체성과 연결을 보완할 항목이다. 운영 시스템의 장애 등급을 뜻하지 않는다.

| 우선순위 | 위치 | 현재 발견한 차이 | 권장 방향 |
| --- | --- | --- | --- |
| 높음 | \`projects.js\` Redis 업무·성과 제목 ↔ 권한 캐시 글·구성도 | 카드에는 ‘OAuth 사용자 인증 정보’, ‘인증 아키텍처 최적화’가 있으나 상세 근거의 중심은 사용자별 권한 조회 결과 캐시다 | 확인된 범위에 맞춰 ‘권한 조회 캐시 구현 및 응답 개선’으로 좁힌다. 인증 체계 전체를 설계한 인상을 피한다 |
| 높음 | \`licenses.js\` ↔ \`ResumePage.jsx\` | 데이터에는 ‘합격자 발표일 기준’이 있지만 이력서는 설명을 출력하지 않고 모든 날짜를 ‘취득일’ 열에 넣는다 | 이력서에도 날짜의 기준을 표시한다. 합격 상태에 대한 사용자 확인과 날짜 표시 문제를 구분한다 |
| 높음 | \`profile.strengths\` ↔ 현재 홈 소개 | 홈에서 제외한 ‘정합성을 끝까지 책임집니다’, ‘잠재 리스크를 구조적으로 제거합니다’가 이력서 핵심 요약에는 남아 있다 | 수행한 행동과 확인 범위로 표현을 좁힌다. 홈에서 보이지 않는다고 미사용 데이터로 삭제하면 안 된다 |
| 중간 | \`index.html\` ↔ 홈 인사말 | 검색·공유 설명은 운영 안정화·자동화 중심이고 홈은 요구사항 분석·설계·구현을 앞세운다 | 공유 설명도 개발과 고도화 방향을 포함하도록 정리한다 |
| 중간 | 공공 프로젝트의 쿼리 성과 ↔ CUBRID 글 | 카드는 ‘53초 소요 Slow Query 개선’까지만 적고, 글의 ‘1초 미만’ 결과는 빠져 있다 | 측정 결과를 쓰려면 전후를 함께 적는다. 서로 다른 수치가 아니라 요약에서 결과가 누락된 경우다 |
| 중간 | 같은 카드의 ‘월간 운영 점검 특이사항 0건’ ↔ CUBRID 글 | 글은 해당 화면의 Slow Query 특이사항을 말하지만 카드 문장은 전체 운영 점검 결과처럼 읽힐 수 있다 | ‘해당 화면의 Slow Query 관련 특이사항’으로 대상을 한정한다 |
| 중간 | SSH 프로젝트 성과 ↔ SSH 글 | 카드는 ‘사용률 30% 이하 관리’를 강조하고 글은 4시간 주기 수집·화면 조회·월말 보고 개선을 설명한다 | 기능 개발 결과와 운영 상태 지표를 분리한다. 수집 기능이 용량 감소의 원인인 것처럼 연결하지 않는다 |
| 중간 | 컨벤션 글 결과 ↔ 면접 자료 | 글에는 온보딩 시간이 ‘눈에 띄게 줄었다’고 적혀 있지만 면접 자료는 측정 기록이 없음을 명시한다 | 정성적으로 관찰한 변화임을 밝히고, 예제 재사용·코드 탐색 등 구체적인 작업 변화로 설명한다 |
| 중간 | 01 사용 기술 목록 ↔ 프로젝트별 담당 범위 | SQLD 자격이 DB 기술과 섞여 있고 React·Jenkins 등은 사용 깊이가 구분되지 않는다 | 자격과 기술의 분류를 구분하고, 개발·연동·도구 사용 범위를 상세 프로젝트에서 설명한다 |

정보처리기사의 합격 상태와 발표일이라는 의미는 사용자 확인을 받았다. 여기서 지적하는 것은 합격 여부가 아니라 **이력서에 날짜의 의미가 전달되지 않는 출력 차이**다. 외부 자격 증명을 검증했다는 뜻도 아니다.

## 반영한 내용과 실제 업무 범위

| 항목 | 반영 결과 |
| --- | --- |
| Redis | 주요 업무·성과 제목을 권한 조회 캐시 범위로 수정했다. 응답 수치에는 원문 기록과 측정 구간 확인 필요를 표시했다 |
| 자격 날짜 | 정보처리기사에 날짜 기준 필드를 두고 이력서의 ‘일자·기준’ 열에도 합격자 발표일을 출력했다 |
| 이력서 핵심 요약 | API·SQL 구현, 코드 표준화, 성능 개선, 대사·보정·재검증 등 수행 행동으로 정리했다 |
| 검색·공유 소개 | API 구현과 시스템 고도화 방향을 description·Open Graph·Twitter에 맞췄다 |
| 공공 조회 성과 | 53초 → 1초 미만을 함께 적고, 점검 특이사항 0건의 대상을 해당 화면의 Slow Query로 한정했다 |
| 서버 점검 | 사용률 자체 대신 4시간 주기 수집·화면 조회·월말 보고 개선을 성과로 설명했다 |
| 컨벤션 | 온보딩 단축을 정량 성과처럼 강조하던 표현을 예제·문서 공유와 공통 기준 마련으로 바꿨다 |
| 기술 분류 | SQLD는 자격 영역에서 제공하고 DB 기술 태그에서는 제외했다. 고도화 프로젝트의 React 연동 화면과 Jenkins·GitLab·SonarQube 사용 도구를 구분했다 |
| 참고·기술 글 | 과거 성능 메모를 갱신하고 CWE-676 요약을 eval 제거라는 실제 조치 범위로 좁혔다 |

### 도메인 API 구현은 어느 정도 설명하면 되는가

2026-11-04 저자 확인에 따르면 청구 업무는 **도메인에 맞는 산정 쿼리를 작성해 결과를 제공하는 API 구현**이었다. 이를 별도의 큰 설계 사례로 확장하거나 모든 요청·응답 필드를 공개 글에서 풀어 쓸 필요는 없다.

소개·역량·프로젝트·면접 자료에는 ‘도메인별 API·조회 SQL 구현’, ‘청구 산정 결과 조회 SQL 작성’으로 역할을 구체화했다. 구조와 규칙을 정리한 경험은 DTO·계층 분리·예제 코드·PDF 가이드에 연결했다.

추가 설명이 필요할 때는 실제 조회 조건과 산정 기준, 쿼리 선택 이유를 면접 질문에 맞춰 답하면 된다. 확인되지 않은 정책 설계·트랜잭션 경계·테스트 범위·배포 책임은 덧붙이지 않았다. 상세 기능 사례를 새 글로 작성하는 일은 이번 보완의 필수 과제에서 제외했다.

## 추상적인 표현은 행동과 범위로 좁히기

아래는 이번 보완에 사용한 표현 원칙이다. 개별 화면에는 주변 문맥에 맞춰 반영했다.

| 현재 표현 | 수정안 | 수정 이유 |
| --- | --- | --- |
| 운영 데이터 정합성을 끝까지 책임집니다 | 원천·대상 데이터를 대사하고 불일치를 보정한 뒤 결과를 다시 확인했습니다 | 책임의 범위를 행동으로 보여준다 |
| 레거시의 잠재 리스크를 구조적으로 제거합니다 | 보안 검출 유형별로 공통 원인을 수정하고, 망간 동기화와 서버 점검 절차를 개선했습니다 | 모든 위험을 제거한 것처럼 읽히지 않는다 |
| Redis 기반 인증 아키텍처 최적화 | Redis 권한 조회 캐시 구현 및 응답 개선 | 실제 근거가 있는 조회 범위에 맞춘다 |
| 메모리·시스템 용량 사용률 30% 이하 관리 | 서버 용량 정보를 주기 수집하고 화면에서 조회하도록 점검 업무를 개선했습니다 | 구현한 기능과 운영 상태 수치를 분리한다 |
| 온보딩 시간 단축 | 패키지·객체 작성 규칙과 예제 코드를 PDF로 공유해 공통 개발 기준을 마련했습니다 | 측정하지 않은 시간을 대신해 실제 산출물을 설명한다 |

소개 문장은 모든 구현을 담을 필요가 없다. ‘문제가 생기면 처리 흐름과 데이터를 따라 원인을 찾는다’는 소개 아래에 구체적인 프로젝트가 연결되면 충분하다. 반대로 상세 프로젝트까지 같은 추상 문장만 반복하면 근거가 약해진다.

## 성과 수치는 같아도 측정 범위는 더 필요하다

| 성과 | 현재 문서에서 확인한 상태 | 추가로 필요한 설명 |
| --- | --- | --- |
| 조회 10분 → 30초 이내 | 최종 수치는 사용자 확인 완료. 원문은 100만 건 테스트 데이터·Swagger 반복 측정을 기록 | 해당 API, 응답 측정 구간, 반복 횟수, 동시 요청, 서버·DB 조건 |
| 조회 53초 → 1초 미만 | CUBRID 글에 전후 수치가 있음 | 같은 조회 조건·데이터 범위인지, 반복 측정과 실행계획 원본 |
| 화면 전환 10초 → 0.10초 이내 | 권한 캐시 글·프로젝트에 기록 | 화면 전체인지 권한 API인지, 캐시 hit/miss 조건, 측정 시작·종료 지점 |
| 주간 연동 오류 약 70건 → 5건 미만 | GW 글·프로젝트에 같은 방향의 수치가 있음 | 비교한 주수, 처리량, 중복 오류 집계 기준 |
| 인코딩 오류 95% 감소·신규 연동 실패율 5% 미만 | GW 글과 프로젝트에 기록 | 각각의 분모·관찰 기간·전후 건수. 주간 오류 지표와 합쳐 계산하지 않기 |
| SAST 358건 → 4건 | 프로젝트와 면접 자료에 기록 | 동일 검사 범위인지, 잔여 4건의 사유와 조치 판단 |
| 웹 취약점 16건·SQL Injection 14건·계정 설정 17건 | 경력 데이터와 면접 자료에 기록 | 검사 간 중복 여부와 집계 대상. SAST 건수와 단순 합산하지 않기 |

숫자가 일치한다는 것은 문서끼리 맞는다는 뜻이다. 원본 측정 자료까지 확보했다는 뜻은 아니다. 기록이 없는 조건은 ‘당시 확인하지 못했다’고 남기는 편이 설명의 신뢰를 지킨다.

## 기술 글과 면접 자료에서 유지할 내용, 더 확인할 내용

### 유지할 내용

- [팀 컨벤션 글](/blog/backend-code-convention-standardization)은 직급보다 초안 작성·예제 적용·PDF 공유·동료 피드백을 중심으로 바뀌었다. 공식 리더 직책을 붙이지 않아도 협업 경험이 전달된다.
- [망간 동기화 글](/blog/dynamic-to-static-sync-query)은 대상 테이블을 누락한 사고와 대사·복구를 함께 남겼다. 실패를 감춘 요약으로 바꾸지 않는다.
- [Oracle 튜닝 글](/blog/oracle-hint-subquery-fullscan)은 기존 코드와 DBA 보고서를 통해 배운 과정, 당시 이해의 한계를 남긴다.
- [GW 글](/blog/kafka-gw-data-integrity)은 업무키 매핑과 대사·보정·재대사를 중심으로 설명한다. Redis를 권한 캐시로 쓰는 고도화 프로젝트와 용도를 섞지 않는다.
- [POI 글](/blog/sxssf-vs-xssf-excel-download)은 빌링 업무 중 개발한 기능과 나중에 작성한 게시일을 구분한다.
- 면접 자료의 후속 실습은 아직 수행하지 않은 학습안으로 표시되어 있다. 실무 성과와 합치지 않는다.

### 이전 검토에서 남은 확인 과제

기술적 쟁점은 이번에 새로 해결됐다고 판정하지 않았다. 자세한 근거와 U01~U12 목록은 [이전 보고서](/blog/portfolio-blog-audit-report)에 있다.

| 영역 | 남은 확인 과제 | 관련 글 |
| --- | --- | --- |
| 권한 캐시 | 실제 TTL 계산, 사용자별 코드 그룹 삭제 범위, 변경·조회 경합, 장애 시 권한 확인 | [Redis 권한 캐시](/blog/redis-permission-cache-ttl) |
| XSS | raw 출력 통로 정리 이후의 서버 정화 구현과 출력 문맥별 검증 | [CWE-79](/blog/cwe-79-xss-remediation) |
| 예외·콜백·공통 유틸 | 로그 민감정보 처리, 허용 콜백 범위, 빈 문자열 등 입력 계약 | [CWE-209](/blog/cwe-209-error-message-exposure), [CWE-676](/blog/cwe-676-dangerous-api), [CWE-476](/blog/cwe-476-null-dereference) |
| 대량 암호화 | 실제 완료 판정, 커밋과 재실행 조건, 중간 오류 복구 | [csql·nohup](/blog/csql-nohup-mass-patch) |
| 이벤트 연동 | offset과 DB 커밋, 키 매핑 복구, 재처리 저장소와 실행 방식 | [Kafka GW](/blog/kafka-gw-data-integrity) |
| 서버 점검 | CPU 지표 정의, 종료 상태 처리, 실패·마지막 성공 시각 표시 | [MINA SSHD](/blog/jsch-to-mina-sshd) |
| 엑셀 | 당시 POI 버전, 임시파일 정리, 동시 다운로드 측정 | [XSSF·SXSSF](/blog/sxssf-vs-xssf-excel-download) |

글의 첫 요약과 마지막 결론도 본문의 한계를 따라가야 한다. 예를 들어 CWE-676 요약의 ‘안전한 문법으로 대체’는 본문의 확인 과제보다 단정적으로 읽혔다. 이번에는 ‘eval 호출부를 조사해 문자열 평가를 제거한 기록’으로 바꿔 **완료한 조치 자체**를 요약하고, 콜백 허용 범위는 확인 과제로 표시했다.

## 화면 구성에서 남은 점검

01번은 ‘역량 → 주요 수행 업무 → 사용 기술’로 정리되어 있다. 블로그 블록을 제거한 현재 구성을 유지하면서, 프로젝트 경험에서 역할과 결과를 읽을 수 있게 하면 된다.

다만 출력용 이력서는 별도로 확인해야 한다. 홈 소개 전체를 출력하던 방식에서 별도의 짧은 이력서 소개로 바꿨다. 기존 A4 2장 안내와 고정 프로젝트 배분은 유지하고 있다. 소스에 두 개의 페이지 영역이 있다는 사실만으로 실제 인쇄가 2장에 들어간다고 단정할 수 없다. **최종 문구로 인쇄 미리보기와 페이지 넘침을 확인하는 작업이 남아 있다.**

학력·수상은 데이터와 출력 경로를 확인했지만 외부 증빙을 다시 검증하지 않았다. 교육 기술의 버전 표기와 수상 설명의 근거는 증빙 원문을 기준으로 별도 확인할 대상이다. 회사 홈페이지 링크만으로 수상 사유까지 입증된 것으로 보지는 않는다.

## 다음 수정의 우선순위

- [x] **표현 범위 통일:** 권한 캐시·해당 화면 점검·이력서 핵심 요약의 범위를 맞췄다.
- [x] **출력 누락 보완:** 이력서에 자격 날짜 기준을 표시하고 검색·공유 설명을 현재 소개와 맞췄다.
- [x] **개발 경험 구체화:** 저자 확인에 따라 도메인별 API·청구 산정 결과 조회 SQL 구현으로 정리했다. 상세 사례 글의 추가는 필수 과제에서 제외했다.
- [ ] **측정 근거 정리:** 이미 있는 수치의 대상·기간·측정 조건을 확인한다. 없는 로그나 수치를 만들어 채우지 않는다.
- [ ] **문서와 화면 최종 확인:** 본문뿐 아니라 제목·요약·이력서·공유 설명을 함께 읽고 A4 출력과 모바일 화면을 확인한다.

이번 보완에서는 포트폴리오 데이터·이력서·공유 메타데이터·관련 게시글과 참고 문서를 수정했다. 완료 표시가 없는 항목은 후속 과제다. 기존 참고 주석과 숨긴 성과는 보존했다.

## 배운 점

포트폴리오를 간결하게 만드는 일은 설명을 짧게 자르는 것만으로 끝나지 않았다. 소개는 일하는 방식과 방향을, 역량 카드는 맡을 수 있는 업무를, 프로젝트와 블로그는 실제 선택과 결과를 보여줘야 했다.

운영 경험을 줄여야 개발자로 보이는 것도 아니었다. 느린 조회를 진단하고 데이터 불일치를 복구한 경험은 설계와 구현에서 고려할 조건을 보여준다. 도메인별 조회 SQL과 API 구현, 코드 구조 정리라는 실제 역할을 그에 맞는 깊이로 설명하는 것이 중요했다.
`,S=`---
title: 포트폴리오 사이트 구조 리팩터링 기록
date: 2026-08-11
tags: React, Refactoring
summary: 콘텐츠와 화면을 분리하고, 페이지 파일 복제를 단일 라우트로 통합한 과정 정리
---

이 사이트를 만들고 1년 넘게 운영하면서 반복해서 겪은 문제가 있었다.
**경력 내용 하나를 고치려면 파일 여러 개를 같이 고쳐야 한다**는 점이다.

## 문제

- 프로젝트마다 \`Projects.jsx\`, \`Projects2.jsx\`, \`Projects3.jsx\`처럼 데이터 파일과
  페이지 파일을 복제해서 만들었다.
- 출력용 이력서(\`ResumePrint\`)에는 같은 경력 내용을 손으로 다시 타이핑해 두었다.
  그 결과 웹 화면과 이력서의 성과 문구가 서로 달라지는 일이 실제로 발생했다.
- 커밋 로그에 "경력기술서 현행화"가 반복해서 등장했다 — 같은 내용을 여러 곳에서
  맞추느라 생긴 비용이었다.

## 개선

핵심은 **단일 출처(single source of truth)** 원칙이었다.

1. 콘텐츠를 전부 \`src/data/\`로 분리했다. 프로젝트, 교육, 수상, 자격, 프로필이
   각각 파일 하나씩이다.
2. 프로젝트 페이지 3개를 \`/projects/:slug\` 라우트 하나로 통합했다.
   이제 프로젝트를 추가하면 상세 페이지, 메뉴, 이력서에 자동 반영된다.
3. 이력서 페이지는 데이터를 다시 쓰지 않고, 각 성과의 \`result\` 필드를 그대로
   가져다 쓴다. 웹과 이력서가 어긋날 수 없는 구조다.

\`\`\`text
변경 전: 콘텐츠 1건 수정 → 파일 6곳 편집
변경 후: 콘텐츠 1건 수정 → data/ 파일 1곳 편집
\`\`\`

## 현재 구조와 당시 기록의 차이

위 \`/projects/:slug\` 통합은 당시 리팩터링 과정의 기록이다. 2026-11-03 현재는 홈 프로젝트 카드와 아키텍처 모달을 사용하며, 기존 상세 주소는 홈 프로젝트 앵커로 연결된다. 프로필·경력·이력서는 공통 데이터를 쓰지만 블로그 본문과 다이어그램 설명은 별도 파일이므로 교차 검토가 필요하다.

## 배운 점

- 중복은 처음엔 빠르지만, 시간이 지날수록 "어느 쪽이 최신인지 모르는" 비용으로
  돌아온다. 운영 시스템에서 겪던 데이터 정합성 문제와 본질이 같았다.
- 구조를 고치기 전에 커밋 로그를 훑어보면 어디가 아픈지 보인다. 같은 종류의
  커밋 메시지가 반복되는 지점이 리팩터링 대상이었다.
`,C=`---
title: 화면마다 권한을 DB에 묻던 시스템 — Redis 캐시의 TTL과 무효화 정책
date: 2025-01-07
tags: Java, Spring, Redis, Performance
summary: 반복되는 권한 조회를 Redis 캐시로 바꾼 기록 — 고정 TTL과 세션 만료 시각의 차이, 로그아웃·권한 변경 시 무효화의 역할과 남은 검증 과제
---

권한 관리가 화면 단위로 촘촘한 시스템이 있었다. OAuth 기반으로 로그인한 사용자라도
권한에 따라 **같은 화면의 셀렉트 박스에 보이는 항목이 달랐다** — 일반 사용자는 자기 부서·테넌트
코드만, 관리자는 전체 코드가 보이는 식이다. 문제는 이걸 구현한 방식이었다.

## AS-IS — 렌더링할 때마다 권한 테이블로

화면이 열릴 때마다, 셀렉트 박스가 그려질 때마다 서버는 DB의 권한 테이블을
조회했다.

\`\`\`java
// 설명용 MVC 예시이며 CloudXper의 React/REST 실제 Controller 원본은 아니다.
// AS-IS — 화면 요청마다 반복되던 권한 조회 패턴
@GetMapping("/board/list")
public String boardList(Model model, Principal principal) {
    // 이 사용자가 볼 수 있는 코드 목록을 매번 DB에서
    List<CodeVO> deptCodes = permissionService.getAllowedCodes(principal.getName(), "DEPT");
    List<CodeVO> typeCodes = permissionService.getAllowedCodes(principal.getName(), "TYPE");
    model.addAttribute("deptCodes", deptCodes);
    model.addAttribute("typeCodes", typeCodes);
    ...
}
\`\`\`

권한 조회 쿼리는 사용자-역할-권한-코드를 잇는 다중 조인이라 가볍지 않았고,
셀렉트 박스와 필터가 대여섯 개인 관리 화면은 열릴 때마다 그 조인을 연달아 실행했다.
데이터가 쌓인 환경에서는 **메뉴 이동과 초기 렌더링에만 최대 10초 가까이 지연**이
발생했다. 사용자 입장에선 화면 하나 이동할 때마다 같은 질문을 DB에 반복하는
구조다. 자주 읽고 드물게 바뀌는 권한을 캐시할 여지가 있었다. 다만 로그인 중에도 관리자 변경으로 권한이 달라질 수 있으므로 무효화 정책이 필요했다.

## TO-BE — 권한 조회 결과를 Redis에 캐싱하기

권한 데이터의 성질을 먼저 정리했다.

- **읽기는 매우 잦다** — 모든 화면 이동과 렌더링이 읽는다.
- **변경은 매우 드물다** — 관리자가 권한을 바꾸는 이벤트는 하루에 몇 번도 안 된다.
- **사용자별로 다르며, 로그인 중에도 변경될 수 있다.** 변경 이벤트와 캐시 만료를 함께 다뤄야 한다.

읽기 압도적 + 변경 희소 + 세션 단위 일관성 — 캐시에 딱 맞는 프로필이다.
이때 인메모리 로컬 캐시(Caffeine, Ehcache) 대신 **Redis 분산 캐시**를 선택했다.
다중 인스턴스 환경에서 로컬 캐시를 쓰면 관리자가 특정 사용자의 권한을 회수하거나
사용자가 로그아웃했을 때 다른 서버 메모리에 예전 권한이 남을 수 있지만, Redis를
공유 저장소로 두면 인스턴스별 캐시를 각각 지울 필요가 줄기 때문이다. 다만 삭제 전에 읽은 요청과 진행 중인 DB 조회가 있어, 삭제 한 번만으로 모든 요청의 즉시 일관성이 보장되는 것은 아니다.

원문 경험에는 로그인 시 적재가 서술되어 있다. 아래 \`@Cacheable\` 예제 자체가 보여주는 것은 **첫 메서드 호출에서 캐시가 없으면 DB를 조회하는 지연 적재**다. 로그인 핸들러에서 이 메서드를 호출했는지는 실제 코드 확인이 필요하다.

\`\`\`java
// TO-BE — 권한 조회에 캐시를 씌운다
@Cacheable(value = "userPermissions", key = "#username + ':' + #codeGroup")
public List<CodeVO> getAllowedCodes(String username, String codeGroup) {
    return permissionDAO.selectAllowedCodes(username, codeGroup); // 캐시 미스일 때만 실행
}
\`\`\`

\`\`\`java
// 설명용 고정 TTL 설정 — 세션의 실제 만료 시각을 자동 추적하지 않는다
@Bean
public RedisCacheManager cacheManager(RedisConnectionFactory factory) {
    RedisCacheConfiguration config = RedisCacheConfiguration.defaultCacheConfig()
            .entryTtl(Duration.ofMinutes(30))   // 저장 시점부터 30분: 실제 운영 설정값 확인 필요
            .serializeValuesWith(SerializationPair.fromSerializer(
                    new GenericJackson2JsonRedisSerializer()));
    return RedisCacheManager.builder(factory)
            .withCacheConfiguration("userPermissions", config)
            .build();
}
\`\`\`

## 핵심 설계 — 같은 기간과 같은 만료 시각은 다르다

당시에는 세션 만료 정책을 참고해 캐시 수명을 정했다. 하지만 위 코드의 고정 TTL은 **캐시 저장 시점부터 30분**이다. 로그인 10분 후 캐시를 만들면 로그인 시점부터 40분에 만료될 수 있고, 활동으로 세션이 연장되어도 단순 캐시 조회가 TTL을 자동 연장하지 않는다.

따라서 이 예제로 토큰의 \`exp\`와 캐시 만료 시각이 자동 동기화됐다고 설명할 수 없다. 실제 동기화를 구현했다면 남은 유효 시간 계산과 갱신 처리가 별도로 있어야 한다. 해당 구현은 저장소에 없어 확인 필요로 남긴다. 고정 TTL은 오래된 캐시가 남는 시간을 제한할 뿐, 인증 유효성 검사나 권한 변경 즉시 반영을 대신하지 않는다. [Spring Data Redis의 TTL 설명](https://docs.spring.io/spring-data/redis/reference/redis/redis-cache.html)을 기준으로 표현을 바로잡았다.

경계 이벤트도 같은 원칙으로 처리했다.

- **로그아웃**: 세션 무효화와 함께 해당 사용자의 캐시 키를 즉시 삭제
  (\`@CacheEvict\` / 로그아웃 핸들러에서 키 삭제). TTL이 남아 있어도 세션이
  끝나면 캐시도 끝난다.
- **관리자가 권한을 변경**: 대상 사용자의 캐시 키를 evict. 그 사용자는
  다음 캐시 미스에서 최신 권한을 다시 조회하도록 의도했다. 삭제 실패·경합에 대한 검증 기록은 확인이 필요하다.

키는 \`userPermissions::{username}:{codeGroup}\` 형태로 잡아, 사용자 한 명의
권한을 코드 그룹별로 구분했다. 사용자명만 지정한 \`@CacheEvict\`는 이 복합 키 전체를 지워주지 않는다. 해당 사용자의 모든 코드 그룹 키를 삭제하는 실제 구현과 다중 세션·테넌트 구분은 확인 필요다. 전체 flush는 다른 사용자 캐시도 지우므로 별도 정책이 필요하다.

## 결과

- 화면 하나를 그릴 때 나가던 권한 조인 쿼리 여러 건이 **로그인 후 첫 조회
  이후 캐시 히트에서는 0건**이 됐다. 만료·삭제 후에는 DB 조회가 다시 발생한다. 권한 조회가 DB 다중 조인 왕복에서 Redis 메모리 조회로
  바뀌면서, 셀렉트 박스가 집중된 관리 화면 기준으로 **약 10초까지 지연되던 페이지
  전환·렌더링 응답 속도가 0.10초 이내**로 단축됐다고 기록했다. 측정 시작·종료 지점, 반복 횟수, 동시 사용자 수와 원본 로그는 저장소에 없어 확인이 필요하며 Redis 자체 명령 지연과 동일한 수치로 해석하지 않는다.
- DB 입장에서는 접속자 수 × 화면 이동 수만큼 반복되던 동일 조인이
  사라졌다 — 캐시는 응답 속도만이 아니라 **DB의 여유**를 만드는 장치였다.

## 배운 점

- **캐시 설계의 절반은 TTL과 무효화 정책이다.** "Redis를 붙였다"가 아니라
  "캐시 수명을 무엇에 정렬했고, 어떤 이벤트에 지우는가"가 설계의 실체였다.
  권한처럼 민감한 데이터일수록 TTL은 성능 파라미터가 아니라 정합성 규칙이다.
- **캐시하기 좋은 데이터부터 골라야 한다.** 읽기 빈도, 변경 빈도, 일관성
  요구 수준을 먼저 따져보면 권한/코드성 데이터가 1순위로 나온다. 반대로
  실시간성이 필요한 데이터에 같은 패턴을 쓰면 사고가 된다.
- **만료와 무효화는 다른 책임이다.** 고정 TTL, 명시적 로그아웃, 세션 자연 만료, 관리자 권한 변경을 나눠 검증해야 한다. 권한을 확인할 수 없는 장애 상황에서 허용으로 처리해서는 안 된다.
`,w=`---
title: XSSFWorkbook vs SXSSFWorkbook — 수작업 엑셀 업무를 기능으로 만들며 정리한 선택 기준
date: 2025-11-20
tags: Java, POI, Excel, Performance
summary: 운영자가 매번 DB를 조회해 손으로 만들던 추출 대장·통계 엑셀을 다운로드 기능으로 구현한 기록 — 건수에 따라 XSSF와 SXSSF를 가르는 기준과 스트리밍 방식의 함정들
---

운영 업무 중에 정기적으로 반복되는 일이 있었다. 담당자가 DB를 직접 조회해서
결과를 복사하고, 엑셀에 붙여 넣고, 서식을 정리해서 보고용 대장과 주간 통계를
만드는 것. 조회 조건이 매번 비슷하고 산출물 양식이 정해져 있는데도 사람 손을
거치니 시간이 들고, 복사 과정에서 실수도 났다. 이걸 **관리자 화면에서 조회
조건을 걸고 버튼 한 번으로 내려받는 엑셀 다운로드 기능**으로 만들었다.

구현 자체는 Apache POI로 하는 흔한 작업이다. 흔하지 않았던 건 데이터
규모였다 — 추출 대상이 **수만~수십만 행**이라, POI의 두 클래스
\`XSSFWorkbook\`과 \`SXSSFWorkbook\` 중 무엇을 쓰느냐가 기능의 생사를 갈랐다.

## XSSF vs SXSSF — 차이의 본질은 "어디에 들고 있느냐"

둘 다 .xlsx를 만든다. 차이는 **작성 중인 워크북을 어디에 유지하느냐**다.

| | XSSFWorkbook | SXSSFWorkbook |
|---|---|---|
| 데이터 위치 | 전체를 **힙 메모리**(DOM)에 유지 | 최근 N행만 메모리, 나머지는 **디스크 임시파일**로 flush |
| 메모리 사용 | 행·셀 수 등에 따라 증가 | 행 window는 제한됨. 원본 List·스타일·공유 문자열 등은 별도 |
| 이미 쓴 행 접근 | 자유 (수정, 재조회 가능) | flush된 행은 **접근 불가** |
| autoSizeColumn | 지원, 대량일 때 계산 비용 고려 | 필요한 컬럼을 먼저 추적 등록하면 지원 |
| 뒷정리 | close() | 사용 POI 버전의 close/dispose 계약과 임시파일 삭제 결과 확인 |
| 적합 규모 | 수천~1만 행 내외 | 수만 행 이상 |

XSSF는 셀 하나가 객체 하나다. 30개 컬럼 × 10만 행이면 셀 객체만 300만 개가
힙에 쌓인다. 스타일·문자열 캐시까지 더하면 수십만 행에서 힙이 수 GB로 치솟고,
운영 WAS처럼 힙이 제한된 환경에서는 **다운로드 버튼 하나가 OOM으로 서버를
쓰러뜨릴 수 있다.**

SXSSF는 생성자에 준 window 크기만큼의 행만 메모리에 유지하고, 그보다 오래된
행은 디스크 임시파일에 순차 기록한다. 다만 전체 메모리가 window만큼으로 일정하다는 뜻은 아니다. 병합 영역·주석·공유 문자열과 아래 예제의 \`dataList\`는 별도로 메모리를 사용한다. 대신 "이미 흘려보낸 행"으로는 돌아갈 수 없다 —
스트리밍이라는 이름 그대로다.

이 기능은 빌링 업무를 담당하던 시기에 개발했다(2026-11-03 저자 확인). 게시일 2025-11-20은 실제 개발일을 뜻하지 않는다. 일상 개발 경험을 정리한 글이며, 포트폴리오의 핵심 성과 항목으로 복원하지 않는다.

## 건수별 선택 기준

이 시스템에서는 다운로드를 두 종류로 이원화했다.

- **일반 다운로드 (수백~수천 건)** — \`XSSFWorkbook\`. 목록 화면의 검색 결과
  내려받기 수준이면 메모리 부담이 없고, \`autoSizeColumn\` 같은 편의 기능을
  자유롭게 쓸 수 있어 산출물 품질을 챙기기 좋다.
- **대용량 추출 (수만 건 이상)** — \`SXSSFWorkbook\`. 전 건 추출 대장처럼
  행 수 상한을 예측할 수 없는 기능은 처음부터 스트리밍으로 갔다.

기준을 한 줄로 줄이면 이렇다. **"최대 몇 행까지 커질 수 있는가"를 예측할 수
없다면 SXSSF다.** XSSF의 한계는 평균이 아니라 최악의 케이스에서 터지고,
운영 데이터는 언제나 예상보다 많아진다.

## 구현 — 스트리밍을 무력화하는 함정들

대용량 쪽 코드의 뼈대는 이렇다.

\`\`\`java
// window 크기만큼만 메모리에 유지, 초과분은 디스크로
SXSSFWorkbook workbook = new SXSSFWorkbook(1000);

try {
    SXSSFSheet sheet = workbook.createSheet(sheetName);

    // (1) 스타일은 루프 밖에서 1회만 생성
    CellStyle headerStyle = defaultCellStyle(workbook.createCellStyle(), true);
    CellStyle bodyStyle   = defaultCellStyle(workbook.createCellStyle(), false);

    // 헤더
    Row headerRow = sheet.createRow(rowNo++);
    for (int i = 0; i < headerFields.length; i++) {
        Cell cell = headerRow.createCell(i, CellType.STRING);
        cell.setCellValue(headerFields[i]);
        cell.setCellStyle(headerStyle);
    }

    // (2) autoSizeColumn 대신 고정 컬럼 너비
    for (int i = 0; i < headerFields.length; i++) {
        sheet.setColumnWidth(i, FIXED_COLUMN_WIDTH);
    }

    // 데이터 바인딩 — 행을 만들며 지나가면 window 밖 행은 디스크로 flush
    for (Map<String, String> rowData : dataList) {
        Row row = sheet.createRow(rowNo++);
        ...
    }

    workbook.write(response.getOutputStream());
} finally {
    workbook.dispose();   // (3) 디스크 임시파일 삭제 — 잊으면 서버에 쌓인다
    workbook.close();
}
\`\`\`

번호를 단 세 곳이 이번 구현에서 배운 함정들이다.

**(1) CellStyle을 루프 안에서 만들면 안 된다.** 스타일은 셀이 아니라 워크북
소속이고, 워크북당 개수 제한(6만여 개)이 있다. 행마다 \`createCellStyle()\`을
호출하는 코드는 소량에서는 멀쩡하다가 대량에서 스타일 한도 초과로 깨진다.
헤더용/본문용 스타일을 **루프 밖에서 한 번만 만들어 재사용**했다.

**(2) autoSizeColumn에는 추적 설정과 계산 비용이 있다.** POI 3.14 beta 1 이후에는 미리 \`trackColumnForAutoSizing\` 또는 전체 컬럼 추적을 등록하면 flush된 행을 포함해 폭을 계산할 수 있다. 모든 셀 객체를 보관해야 한다거나 스트리밍 이점이 반드시 사라진다는 설명은 부정확하다. 당시에는 정해진 양식과 계산 비용을 고려해 고정 너비를 택했다. [SXSSFSheet 공식 API](https://poi.apache.org/apidocs/dev/org/apache/poi/xssf/streaming/SXSSFSheet.html)

**(3) 임시파일 삭제 계약은 버전과 함께 확인한다.** 당시 예제는 \`dispose()\`와 \`close()\`를 모두 호출한다. 실제 사용한 POI 버전이 저장소에 없으므로 모든 버전에서 close만으로 삭제되지 않는다고 단정하지 않는다. \`dispose()\`의 삭제 성공 여부와 예외 발생 시 정리까지 확인해야 한다. [SXSSFWorkbook 공식 API](https://poi.apache.org/apidocs/dev/org/apache/poi/xssf/streaming/SXSSFWorkbook.html)

## 검증 — 힙 로그로 눈으로 확인하기

"메모리가 일정하다"를 믿음이 아니라 측정으로 확인하고 싶어서, 개발 단계에
1,000행 처리마다 힙 사용량을 찍는 로깅을 넣고 대량 데이터로 돌려봤다.

\`\`\`java
private void logHeap(String label) {
    Runtime rt = Runtime.getRuntime();
    long used = (rt.totalMemory() - rt.freeMemory()) / 1024 / 1024;
    logger.info("[HEAP] {} | used={}MB, max={}MB", label, used, rt.maxMemory() / 1024 / 1024);
}
\`\`\`

XSSF로 대량을 쓰면 행 수에 비례해 used가 우상향하는 그래프가 나오고, SXSSF는
해당 개발 테스트에서 상대적으로 제한된 증가를 보였다고 기록했다. 이 샘플 로그만으로 모든 데이터·동시 다운로드의 메모리 상한이 검증된 것은 아니다. 전체 List 조회를 사용하면 DB 결과가 먼저 힙을 채울 수 있어, 지금 다시 검증한다면 페이지/커서 조회와 임시 디스크·동시 요청도 함께 측정한다.

## 결과

- 담당자가 DB 조회 → 복사 → 엑셀 서식 정리로 처리하던 정기 산출물(추출 대장
  2종, 주간 통계)이 **화면에서 조건 선택 후 버튼 한 번**으로 바뀌었다.
  건당 수십 분씩 걸리고 실수 여지가 있던 작업이 다운로드 대기 시간으로
  줄었다.
- 산출물 양식이 코드로 고정되면서 "만드는 사람에 따라 달라지는 엑셀"이
  사라졌다 — 자동화는 시간만이 아니라 일관성도 산출물이다.

## 배운 점

- **라이브러리의 클래스 선택이 곧 용량 설계다.** XSSF/SXSSF는 기능이 아니라
  메모리 모델이 다른 클래스다. "몇 건까지 감당해야 하는 기능인가"라는 질문
  없이 예제 코드를 복사하면, 소량 테스트를 통과하고 운영에서 터진다.
- **스트리밍의 대가는 되돌아갈 수 없다는 것.** autoSizeColumn 포기, flush된
  행 접근 불가, dispose 책임 — 메모리를 아끼는 방식에는 항상 교환 조건이
  있고, 그걸 알고 선택하는 것과 모르고 겪는 것은 다르다.
- **성능 주장은 로그로 증명한다.** 힙 로깅 몇 줄이 "아마 괜찮을 것"을
  "측정해서 평평한 것"으로 바꿔줬다. 대용량 기능은 열기 전에 최악 케이스를
  눈으로 봐야 한다.
`,T=Object.assign({"../posts/backend-code-convention-standardization.md":e,"../posts/csql-nohup-mass-patch.md":t,"../posts/cubrid-query-plan-index-tuning.md":n,"../posts/cwe-209-error-message-exposure.md":r,"../posts/cwe-330-489-dead-code-removal.md":i,"../posts/cwe-404-496-resource-handling.md":a,"../posts/cwe-476-null-dereference.md":o,"../posts/cwe-615-sensitive-comments.md":s,"../posts/cwe-676-dangerous-api.md":c,"../posts/cwe-754-exception-handling.md":l,"../posts/cwe-79-xss-remediation.md":u,"../posts/dynamic-to-static-sync-query.md":d,"../posts/how-to-write-posts.md":f,"../posts/interview-cloudxper-billing.md":p,"../posts/interview-jeonse-support-system.md":m,"../posts/interview-lgu-billing-gw.md":h,"../posts/jsch-to-mina-sshd.md":g,"../posts/kafka-gw-data-integrity.md":_,"../posts/mybatis-builder-parallel-refactoring.md":v,"../posts/oracle-hint-subquery-fullscan.md":y,"../posts/portfolio-blog-audit-report.md":b,"../posts/portfolio-content-consistency-review.md":x,"../posts/portfolio-refactoring.md":S,"../posts/redis-permission-cache-ttl.md":C,"../posts/sxssf-vs-xssf-excel-download.md":w}),E=[{groupId:`backend`,groupLabel:`Backend & Architecture`,subs:[{id:`spring-mybatis`,label:`Spring · 아키텍처`},{id:`kafka-di`,label:`Kafka · 데이터 정합성`}]},{groupId:`database`,groupLabel:`Database & Performance`,subs:[{id:`sql-tuning`,label:`SQL · 실행계획 튜닝`},{id:`redis-cache`,label:`Redis · 캐시 설계`}]},{groupId:`security-infra`,groupLabel:`Security & Infra`,subs:[{id:`sast-cwe`,label:`SAST · 시큐어코딩 (CWE)`},{id:`linux-ops`,label:`Linux · 운영 자동화`}]},{groupId:`retrospective`,groupLabel:`Retrospective & Notes`,subs:[{id:`project-review`,label:`프로젝트 심층 회고`},{id:`dev-notes`,label:`개발 기록 · 가이드`}]}];function D(e,t,n){if(n){for(let e of E)for(let t of e.subs)if(n.includes(t.id)||n.includes(t.label))return{groupId:e.groupId,groupLabel:e.groupLabel,subId:t.id,subLabel:t.label}}let r=e.toLowerCase(),i=new Set(t.map(e=>e.toLowerCase()));return r.startsWith(`cwe-`)||i.has(`sast`)?{groupId:`security-infra`,groupLabel:`Security & Infra`,subId:`sast-cwe`,subLabel:`SAST · 시큐어코딩 (CWE)`}:r.startsWith(`interview-`)||i.has(`interview`)||i.has(`review`)?{groupId:`retrospective`,groupLabel:`Retrospective & Notes`,subId:`project-review`,subLabel:`프로젝트 심층 회고`}:i.has(`guide`)||i.has(`react`)||i.has(`refactoring`)?{groupId:`retrospective`,groupLabel:`Retrospective & Notes`,subId:`dev-notes`,subLabel:`개발 기록 · 가이드`}:i.has(`kafka`)?{groupId:`backend`,groupLabel:`Backend & Architecture`,subId:`kafka-di`,subLabel:`Kafka · 데이터 정합성`}:i.has(`redis`)?{groupId:`database`,groupLabel:`Database & Performance`,subId:`redis-cache`,subLabel:`Redis · 캐시 설계`}:i.has(`sql`)&&i.has(`performance`)||i.has(`cubrid`)||i.has(`oracle`)?{groupId:`database`,groupLabel:`Database & Performance`,subId:`sql-tuning`,subLabel:`SQL · 실행계획 튜닝`}:i.has(`ssh`)||i.has(`linux`)||i.has(`infra`)?{groupId:`security-infra`,groupLabel:`Security & Infra`,subId:`linux-ops`,subLabel:`Linux · 운영 자동화`}:{groupId:`backend`,groupLabel:`Backend & Architecture`,subId:`spring-mybatis`,subLabel:`Spring · 아키텍처`}}function O(e){let t=e.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);if(!t)return{meta:{},body:e};let n={};return t[1].split(/\r?\n/).forEach(e=>{let t=e.indexOf(`:`);if(t===-1)return;let r=e.slice(0,t).trim(),i=e.slice(t+1).trim();r&&(n[r]=i)}),{meta:n,body:e.slice(t[0].length)}}function k(e,t){let n=e.split(`/`).pop().replace(/\.md$/,``),{meta:r,body:i}=O(t),a=r.tags?r.tags.split(`,`).map(e=>e.trim()).filter(Boolean):[],o=D(n,a,r.category);return{slug:n,title:r.title||n,date:r.date||``,tags:a,summary:r.summary||``,category:o,body:i}}var A=Object.entries(T).map(([e,t])=>k(e,t)).sort((e,t)=>t.date.localeCompare(e.date));function j(){return A}function M(e){return A.find(t=>t.slug===e)}function N(){let e=new Map;return A.forEach(t=>{t.tags.forEach(t=>e.set(t,(e.get(t)||0)+1))}),[...e.entries()].map(([e,t])=>({name:e,count:t})).sort((e,t)=>t.count-e.count||e.name.localeCompare(t.name))}function P(){return E.map(e=>{let t=e.subs.map(e=>{let t=A.filter(t=>t.category.subId===e.id).length;return{...e,count:t}}),n=t.reduce((e,t)=>e+t.count,0);return{groupId:e.groupId,groupLabel:e.groupLabel,count:n,subs:t}})}export{P as a,N as i,M as n,j as r,E as t};