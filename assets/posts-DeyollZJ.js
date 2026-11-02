var e=`---
title: 4인 백엔드 팀의 제각각이던 selectList 코드 — 사원급에서 PDF 컨벤션을 만들어 표준화하기까지
date: 2024-12-12
tags: Java, Spring, MyBatis, Architecture
summary: PM을 겸임하던 팀장님을 대신해 사원급 정규직으로서 백엔드 실무 기준을 맡아, 4명이 각자 다른 스타일로 작성하던 List 자료형 기반 selectList 코드를 Request/Response DTO·Model·Builder 패턴으로 리팩토링하고 PDF 가이드로 표준화한 기록
---

클라우드 빌링 플랫폼 고도화 프로젝트에서는 **백엔드 개발자 4명**이 가입, 청구, 상품, 공통 조회 등의 도메인을 나누어 동시에 REST API를 개발하고 있었다.

당시 팀의 인력 구성에는 특수한 사정이 있었다. 백엔드 4명 중 **소속 정규직은 사원급이던 나 한 명**이었고, 나머지 분들은 프로젝트에 파견 투입된 **프리랜서 개발자분들**과 기존 레거시 **시스템 운영 위주로 경력을 쌓아 신규 API 개발 패턴에는 아직 익숙하지 않았던 선임 인력**으로 구성되어 있었다. 게다가 함께 방향을 잡아주시던 **팀장님은 프로젝트 PM 역할까지 대행**하시느라 전체 일정 조율과 대외 업무만으로도 여력이 없는 상황이었다.

결국 프로젝트가 끝난 뒤에도 남아서 이 코드를 계속 운영·유지보수해야 할 내부 인력으로서, **백엔드 실무 단에서는 사원급인 내게 사실상 PL(파트 리드)에 준하는 역할과 책임이 분담**되어 있었다. 가장 기본이 되는 단일 \`selectList\` 조회 API조차 4명의 코드 모양이 제각각으로 갈라지는 상황에서, 직접 패턴을 정립하고 **PDF 가이드 문서로 만들어 팀 회의에서 주도적으로 공유·통일했던 과정**을 기록해 둔다.

## 배경 — 서로 다른 배경의 4명, 네 가지 모양의 \`selectList\` 코드

당시 프로젝트는 Spring Boot 3.x와 MyBatis 기반이었는데, 각자 일해온 현장 스타일(빠른 진도 위주의 SI 프리랜서 방식, 기존 유지보수·운영 중심 방식 등)이 다르다 보니 합의된 패키지 규칙이나 객체 작성 표준이 없었다. 똑같이 MyBatis \`selectList\`로 \`List<자료형>\` 목록을 조회해 프론트엔드(React)로 내려주는 기능 하나를 만들어도 작성자마다 구조가 완전히 달랐다.

| 구분 | 현장에서 섞여 있던 작성 방식들 | 겪었던 문제 |
| --- | --- | --- |
| **계층 호출 및 패키지** | \`Controller\`에서 곧바로 \`DAO.selectList()\` 호출·가공 vs \`Service\` 인터페이스 경유 vs 구체 클래스 단독 사용, 도메인별 패키지 위치 불일치 | 비즈니스 로직과 트랜잭션이 걸리는 위치를 예측할 수 없고 파일 탐색이 어려움 |
| **\`List<T>\` 자료형 설계** | 요청 조건·DB 컬럼·응답 필드를 **단일 만능 VO 클래스 하나에 모두 몰아넣어** \`List<VO>\`로 공용 사용 vs 화면마다 비슷한 클래스(\`ProductVO\`, \`ProductData\` 등) 중복 생성 | 요청에 불필요한 응답·DB 필드까지 Swagger 입력창에 그대로 노출되고 변경 영향 범위 파악이 어려움 |
| **객체 생성·조립** | 기본 생성자(\`new\`) 후 \`setter\` 수십 줄 나열로 \`List\` 원소 복사·가공 | 불필요한 가변 상태 노출, 메서드마다 똑같은 \`setter\` 조립 코드가 반복되며 가독성 저하 |
| **입력값 검증 및 명명** | 컨트롤러 \`if (vo.get...() == null)\` 수동 분기 vs MyBatis XML \`<if>\`에만 의존, 메서드명(\`get/select/find\`) 혼용 | 필수 파라미터 누락 시 에러 응답 형태와 메서드 규칙이 API마다 달라짐 |

팀장님은 PM 업무로 바쁘시고 외부 투입 인력분들은 각자 익숙한 방식으로 빠르게 화면을 개발해 나가는 상황에서, 지금 기준을 세우지 않으면 프로젝트 종료 후 남겨진 코드를 유지보수할 때 감당하기 어려운 부채가 될 것이 분명했다.

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

아무리 백엔드 실무 책임이 내게 넘어와 있었다 해도, 직급상 사원급인 내가 연차가 높은 프리랜서·선임 개발자분들께 구두로만 "앞으로 이렇게 짜주세요"라고 요청하면 번거로운 규칙 강요로 느껴지기 쉬웠다. 특히 운영 업무 위주였던 동료분도 큰 어려움 없이 바로 따라 쓸 수 있으려면 **기준이 명확하면서도 예시 코드가 직관적**이어야 했다.

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

## PDF 가이드 제작과 팀 회의 공유 — 사원급 PL 역할로서 합의를 이끌어내기까지

레퍼런스 리팩토링을 마친 뒤, 함께 일하는 프리랜서 개발자분들과 신규 개발 패턴이 낯선 선임 동료분까지 내 소스를 일일이 찾아보지 않고도 옆에 띄워두고 그대로 작성할 수 있도록 **핵심 규칙과 예제를 압축한 PDF 컨벤션 가이드**를 직접 제작했다.

추상적인 원칙 나열 대신 실무에서 바로 복사해 참고할 수 있는 구성으로 채웠다.

- **표준 패키지 트리 및 클래스 네이밍 규칙** (\`controller\`, \`service\`, \`service.impl\`, \`dao\`, \`dto\`, \`model\` 위치와 \`Request\`/\`Response\` 명명 기준)
- **단일 \`selectList\` / 단건 조회 / 등록·수정 Before → After 비교 코드** (단일 VO + \`setter\` 나열 구조를 \`List<Model>\` → \`List<ResponseDTO>\` + \`@Builder\`로 전환하는 실전 템플릿)
- **검증·예외·어노테이션 기준** (\`@Valid\` 적용 위치, 무분별한 \`@Setter\` 지양 이유, 생성자 레벨 \`@Builder\` 권장 패턴)

준비한 PDF 파일을 들고 팀 회의 시간에 발표를 요청해 백엔드 개발자 전원에게 공유했다. PM 업무까지 도맡아 분주하셨던 팀장님께도 백엔드 코드 품질 기준을 대신 챙겨 정리해 간 결과물이 되었고, 연차가 높은 외부·선임 개발자분들 앞에서는 사원급으로서 조심스러우면서도 꽤 당돌한 제안이었다.

그래서 발표의 초점을 **"누구의 방식이 맞고 틀리다"가 아니라 "배경이 다른 우리가 서로의 코드를 5분 안에 읽고 교차 수정할 수 있도록 틀을 맞추자"**에 두었다. 말로만 규칙을 요구한 것이 아니라 실제 동작하는 템플릿 코드와 한눈에 들어오는 PDF 가이드를 함께 제시해 전환 허들을 낮추자, 동료분들 모두 열린 마음으로 제안을 받아들여 주셨다.

특히 정말 다행이고 감사했던 점은, **내가 사원급으로서 기술 역량이나 경험 면에서 미처 챙기지 못했던 부분들을 함께 일하던 고년차 프리랜서 개발자분들께서 적극적으로 도와주시고 실무 가이드를 보태주셨다는 것**이다. 내가 내부 정규직으로서 프로젝트의 패키지 구조와 컨벤션 초안을 잡아 오면, 고년차 분들께서는 현업에서 겪어본 예외 처리 노하우나 복잡한 쿼리·트랜잭션 경계에서 주의할 점들을 짚어주시며 기준을 훨씬 단단하게 다듬어 주셨다. 어느 한 사람이 일방적으로 끌고 간 것이 아니라, 서로의 강점을 보태어 다 같이 좋은 결과를 만들어낼 수 있었다.

## 결과

- **4인 백엔드 코드베이스 일원화 및 온보딩·적응 시간 단축**: 이후 작성되는 단일 \`selectList\` 조회부터 신규 도메인 API까지 모두 동일한 패키지 계층과 \`Request/Response DTO · Model · @Builder\` 구조를 따르게 되었다. 외부 투입 인력이나 기존 운영 중심이던 동료분도 PDF 템플릿을 보며 일관된 품질로 API를 작성할 수 있게 되었고, 도메인 간 교차 수정 및 온보딩 시간이 눈에 띄게 줄었다.
- **객체 생성 중복 제거 및 프론트엔드 협업 효율 향상**: 메서드마다 길게 늘어지던 \`setter\` 나열 코드가 \`@Builder\`와 정적 변환 메서드로 일원화되어 코드 가독성과 유지보수성이 크게 높아졌다. 또한 만능 VO 대신 요청과 응답 DTO가 분리되면서 Swagger 명세가 정확해져 프론트엔드와의 필드 확인 커뮤니케이션 비용도 눈에 띄게 줄었다.
- **후속 성능 개선의 발판 마련**: 화면별로 흩어져 있던 조회·조립 코드를 \`ServiceImpl\`과 명확한 \`List<Model>\` / \`List<DTO>\` 구조로 정돈해 둔 덕분에, 뒤이어 터진 [100만 건 대용량 조회 성능 병목 개선 작업](/blog/mybatis-builder-parallel-refactoring)에서도 컨트롤러 곳곳을 헤매지 않고 서비스 계층에서 신속하게 병렬 처리를 적용할 수 있었다.

## 한계 회고 — 지금 다시 한다면

당시 실무 기준을 세우며 직접 부딪혔던 고민과 지금 시점에서 돌아보는 개선점도 분명히 남아 있다.

1. **모든 기능마다 예외 없이 \`Request\`와 \`Response\`를 분리했던 선택에 대하여**  
   기존처럼 만능 VO 하나로 통일해 돌려쓰는 문제를 막고자, 당시에는 검색 조건이 한두 개뿐인 단순 \`selectList\`부터 등록·수정까지 모든 기능마다 \`Request\`와 \`Response\` 클래스를 전부 별도로 분리해 개발했다. 작업을 하면서도 *"필드가 비슷한 단순 API까지 클래스를 매번 따로 만드는 게 과연 맞는 걸까, 파일 수만 너무 늘어나는 건 아닐까?"* 하는 고민이 계속 따라다녔다.  
   지금 돌아보면 **요청과 응답을 하나로 통일하지 않고 분리한 방향 자체는 옳았다.** 초기에는 같아 보이던 스펙도 요구사항이 붙기 시작하면 요청 쪽에는 검색 조건·검증 규칙(\`@Valid\`)이, 응답 쪽에는 상태명·마스킹 같은 파생 필드가 각각 다르게 추가되기 때문이다. 다만 모든 DTO를 개별 최상위 \`.java\` 파일로 만들다 보니 패키지 내 파일 개수가 급증했던 점은 아쉬움으로 남는다. 지금 다시 설계한다면 분리 원칙은 지키되, 도메인 단위 클래스 내부에 \`static\` 중첩 클래스나 Java \`record\`(\`ProductDto.SearchRequest\`, \`ProductDto.Response\`)로 묶어 파일 파편화를 줄이고, 가공이 전혀 없는 순수 조회에 한해서는 MyBatis 매퍼가 조회 전용 \`Response\` DTO로 바로 매핑되게 해 불필요한 변환 보일러플레이트를 덜어냈을 것이다.
2. **정량적 품질 좌표 기록과 CI 파이프라인 자동 검증의 부재**  
   당시에는 일정 안에서 팀 전체의 코드 모양을 맞추고 가독성·유지보수성을 끌어올리는 데 집중하느라, 리팩토링 전후의 코드 중복률이나 복잡도를 SonarQube 같은 정적 분석 지표로 정량 측정해 기준 좌표로 남겨두지 못했다. 또한 PDF 가이드는 초기 합의에는 큰 힘을 발휘했지만 바쁜 일정 속에서는 사람이 눈으로 지키는 규칙이 다시 느슨해질 여지가 있었다. 지금 다시 한다면 전환 전후의 정적 분석 수치를 먼저 기록해 개선 폭을 객관적으로 증명하고, 합의된 규칙을 \`ArchUnit\` 테스트(*"Controller는 DAO를 직접 호출하지 않는다"*, *"Controller는 영속 계층의 Model을 외부로 직접 반환하지 않는다"*)나 Checkstyle로 코드화해 GitLab·Jenkins 빌드 단계에서 자동 검증되게 구성했을 것이다.

## 배운 점

- **역할은 직급이 아니라 '누가 이 코드의 내일을 책임지는가'에서 나온다.**  
  팀장님이 PM 역할까지 겸임하며 바쁘신 상황에서 사원급 정규직이던 내가 백엔드 실무 기준의 초안을 잡아야 했는데, 부담스럽더라도 먼저 움직여 틀을 제안한 덕분에 프로젝트 후반부의 유지보수 비용을 크게 아낄 수 있었다.
- **표준화는 혼자 완성하는 영웅담이 아니라 '서로의 빈곳을 채우는 협업'이다.**  
  신규 패턴이 낯선 동료를 위해서는 바로 참고할 수 있는 PDF 예제 템플릿으로 장벽을 낮추고, 사원급이던 내게 부족했던 기술적 깊이들은 고년차 프리랜서 분들의 조언과 가이드로 채워 넣었기에 백엔드 4명 모두가 만족하는 좋은 결과로 이어질 수 있었다.
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

nohup은 "작업이 죽지 않게" 해줄 뿐, "서비스에 지장이 없게" 해주지는 않는다.
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
SET    ci_val = ENC_FN(ci_val)          -- 암호화 솔루션 함수
WHERE  member_id BETWEEN 1 AND 10000
AND    enc_yn = 'N';                     -- 재실행 대비: 미처리 건만
COMMIT;

UPDATE member_auth
SET    ci_val = ENC_FN(ci_val)
WHERE  member_id BETWEEN 10001 AND 20000
AND    enc_yn = 'N';
COMMIT;
-- ... 반복
\`\`\`

- **블록 단위 커밋**: 락 보유 시간이 블록 하나 처리 시간으로 줄어든다.
  실사용자 쿼리는 블록 사이사이에 자연스럽게 끼어든다.
- **처리 플래그(미처리 조건)**: 중간에 죽어도 같은 스크립트를 다시 돌리면
  안 된 것만 이어서 처리된다 — 재실행 가능(idempotent)하게 만드는 것이
  대량 작업의 보험이다.
- **저부하 시간대 실행**: 그래도 부하는 부하라서, 트래픽이 가장 적은
  시간대에 실행을 걸었다.

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
  끝난다.
- **보안 조치의 타이밍은 사고가 아니라 보도다.** 남의 사고를 보고 우리
  데이터를 점검하는 것 — 선제 조치는 거창한 게 아니라 뉴스를 자기 시스템에
  대입해 보는 습관에서 시작했다.
`,n=`---\r
title: 53초짜리 목록 조회 — CUBRID 쿼리 플랜의 빨간 구간을 지우는 인덱스 설계\r
date: 2026-03-04\r
tags: SQL, CUBRID, Performance\r
summary: 7만 건 목록 조회가 53초 걸리던 운영 화면 — CUBRID 매니저의 쿼리 플랜에서 풀 스캔(sscan) 구간을 찾아 WHERE 조건과 ORDER BY까지 함께 타는 복합 인덱스로 재설계한 기록\r
---\r
\r
운영 행정망 화면 중에 접수 목록을 조회하는 화면이 있었다. 대상 데이터는\r
약 **7만 건** — 요즘 기준으로 큰 데이터가 아니다. 그런데 조회 버튼을 누르면\r
**53초**가 걸렸다. 운영자는 화면이 죽은 줄 알고 새로고침을 눌렀고, 그러면\r
같은 쿼리가 한 번 더 돌았다.\r
\r
7만 건에 53초라면 데이터 양의 문제가 아니라 **데이터를 읽는 방법**의\r
문제다. DB는 CUBRID였고, 진단은 큐브리드 매니저(CUBRID Manager)의 쿼리\r
플랜에서 시작했다.\r
\r
## 진단 — 플랜의 빨간 구간부터\r
\r
문제의 쿼리는 전형적인 목록 조회였다.\r
\r
\`\`\`sql\r
SELECT rcpt_no, rcpt_status, apply_nm, area_cd, reg_dt\r
  FROM rcpt_list\r
 WHERE del_yn = 'N'\r
   AND area_cd = ?\r
   AND rcpt_status = ?\r
   AND reg_dt BETWEEN ? AND ?\r
 ORDER BY reg_dt DESC, rcpt_no DESC\r
\`\`\`\r
\r
큐브리드 매니저에서 실행 계획을 열면 비용이 큰 노드가 **빨간색으로\r
강조**된다. 이 쿼리의 플랜은 두 군데가 빨갰다.\r
\r
\`\`\`text\r
Query plan:\r
  temp(order by)                  ← 정렬을 위한 temp 생성 (빨강)\r
    sscan                         ← rcpt_list 순차 풀 스캔 (빨강)\r
      class: rcpt_list\r
      filter: del_yn='N' and area_cd=? and rcpt_status=? and reg_dt between ...\r
\`\`\`\r
\r
CUBRID 플랜에서 \`sscan\`은 테이블을 처음부터 끝까지 읽는 순차 스캔이고,\r
\`iscan\`이 인덱스 스캔이다. 이 쿼리는 **WHERE에 걸린 컬럼 어디에도 쓸 만한\r
인덱스가 없어서** 7만 건 전체를 읽은 뒤 필터링하고, 걸러진 결과를 다시\r
\`temp\` 공간에서 정렬하고 있었다. 읽기도 풀 스캔, 정렬도 별도 작업 — 53초의\r
정체였다.\r
\r
## 인덱스 설계 — 컬럼을 어떤 순서로 태울 것인가\r
\r
"인덱스를 건다"는 결정보다 **어떤 컬럼을 어떤 순서로 거는가**가 본론이다.\r
후보 컬럼은 WHERE의 4개(del_yn, area_cd, rcpt_status, reg_dt)와 ORDER BY의\r
2개(reg_dt, rcpt_no)였고, 하나씩 따져봤다.\r
\r
**1) 등치(=) 조건을 앞에, 범위 조건을 뒤에.**\r
복합 인덱스는 선두 컬럼부터 순서대로 좁혀 들어간다. \`area_cd = ?\`,\r
\`rcpt_status = ?\` 같은 등치 조건은 인덱스 앞쪽에 있어야 탐색 범위를 점으로\r
좁히고, \`reg_dt BETWEEN\`은 범위 조건이라 **범위 조건 뒤의 컬럼은 탐색에\r
쓰이지 못한다.** 그래서 reg_dt는 등치 조건들 뒤로 보냈다.\r
\r
**2) 선택도(카디널리티) 낮은 컬럼은 선두에 두지 않는다.**\r
\`del_yn\`은 'Y'/'N' 두 값뿐이고 운영 데이터의 대부분이 'N'이다. 이런 컬럼을\r
선두에 두면 인덱스를 타도 거의 전 구간을 훑는다. del_yn은 인덱스에서\r
빼고 필터로 남기는 것과, 맨 뒤에 포함하는 것을 비교해 본 뒤 뒤쪽에\r
포함하는 것으로 정리했다 — 커버링 효과로 테이블 접근을 줄이는 쪽이\r
근소하게 나았다.\r
\r
**3) ORDER BY까지 인덱스로 해결할 수 있는지 본다.**\r
정렬 컬럼(reg_dt DESC, rcpt_no DESC)이 인덱스 순서와 이어지면 DB는 정렬\r
작업 없이 **인덱스를 읽는 순서 그대로** 결과를 내놓는다. 플랜의\r
\`temp(order by)\` 노드를 지우는 방법이다. 등치 조건 뒤에 reg_dt를 두고,\r
그 뒤에 rcpt_no를 붙이면 WHERE와 ORDER BY가 한 인덱스에서 끝난다.\r
정렬 방향도 함께 본다 — 두 컬럼 모두 DESC로 방향이 일치해서 역순 스캔으로\r
처리 가능했다.\r
\r
정리된 인덱스는 이렇다.\r
\r
\`\`\`sql\r
CREATE INDEX ix_rcpt_list_01\r
    ON rcpt_list (area_cd, rcpt_status, reg_dt DESC, rcpt_no DESC, del_yn);\r
\`\`\`\r
\r
\`\`\`text\r
등치(area_cd, rcpt_status) → 범위+정렬(reg_dt) → 정렬 보조(rcpt_no) → 필터(del_yn)\r
\`\`\`\r
\r
## 함께 잡은 것 — 인덱스를 무력화하는 조건절\r
\r
인덱스를 만들어도 조건절이 인덱스를 못 쓰게 막는 패턴이 화면 곳곳에\r
있었다. 같은 화면의 다른 조회에서 발견한 두 가지다.\r
\r
\`\`\`sql\r
-- (1) 컬럼을 함수로 가공 — 인덱스의 정렬 기준이 깨져서 못 탄다\r
WHERE TO_CHAR(reg_dt, 'YYYYMMDD') = ?\r
\r
-- 컬럼은 그대로 두고 파라미터 쪽을 범위로 가공한다\r
WHERE reg_dt >= ? AND reg_dt < ?   -- 해당 일자 00:00 ~ 다음날 00:00\r
\`\`\`\r
\r
\`\`\`sql\r
-- (2) 선행 와일드카드 — 시작점을 알 수 없어 풀 스캔\r
WHERE apply_nm LIKE '%' || ? || '%'\r
\r
-- 업무 협의로 전방 일치 검색으로 변경 (이름 검색은 앞자리 입력이 자연스러움)\r
WHERE apply_nm LIKE ? || '%'\r
\`\`\`\r
\r
마지막으로 \`UPDATE STATISTICS ON rcpt_list;\`로 통계 정보를 갱신했다.\r
인덱스가 있어도 통계가 낡으면 옵티마이저가 엉뚱한 판단을 한다.\r
\r
## 결과\r
\r
같은 조건으로 다시 실행한 플랜은 이렇게 바뀌었다.\r
\r
\`\`\`text\r
Query plan:\r
  iscan                           ← 인덱스 스캔, 빨간 구간 없음\r
    class: rcpt_list\r
    index: ix_rcpt_list_01\r
\`\`\`\r
\r
\`sscan\`이 \`iscan\`으로 바뀌었고, 정렬 \`temp\` 노드는 사라졌다. 조회 시간은\r
**53초 → 1초 미만**. 이후 월간 운영 점검에서 이 화면의 Slow Query\r
특이사항은 0건으로 유지됐다.\r
\r
## 배운 점\r
\r
- **튜닝은 플랜을 여는 데서 시작한다.** "느리다"는 증상만으로 인덱스를\r
  추측해서 걸면 안 걸리는 인덱스만 늘어난다. 빨간 구간(고비용 노드)이\r
  어디인지 — 읽기인지 정렬인지 — 를 먼저 확인하면 고칠 곳은 한 군데로\r
  좁혀진다.\r
- **인덱스 설계는 컬럼 나열이 아니라 순서 결정이다.** 등치 → 범위 → 정렬의\r
  배치, 선택도, 정렬 방향까지 맞아야 WHERE와 ORDER BY가 인덱스 하나로\r
  끝난다. 순서가 틀린 복합 인덱스는 없는 것과 비슷하다.\r
- **인덱스는 공짜가 아니다.** INSERT/UPDATE마다 인덱스도 갱신된다. 접수\r
  테이블은 조회가 압도적이라 남는 장사였지만, 쓰기 위주 테이블이었다면\r
  같은 결정을 하지 않았을 것이다.\r
- **조건절 습관이 인덱스를 살리고 죽인다.** 컬럼 가공과 선행 와일드카드는\r
  아무리 좋은 인덱스도 무력화한다. 인덱스 설계와 쿼리 작성 규칙은 세트로\r
  다녀야 한다.\r
`,r=`---\r
title: CWE-209 오류 메시지 정보노출 — 예외 로깅이 보안 결함이 되는 순간\r
date: 2026-08-12\r
tags: Security, Java, SAST\r
summary: e.getMessage() 문자열 조립, printStackTrace 등 예외 정보가 새어 나가던 25여 건을 "고정 문구 + throwable 전달" 원칙으로 통일한 기록\r
---\r
\r
정적분석 도구 코드레이(CodeRay)가 검출한 결함 중 가장 건수가 많았던 유형이\r
**CWE-209(민감한 정보가 포함된 오류 메시지 생성)** 였다. 레거시 Java 코드 곳곳에서\r
예외의 내부 정보가 로그 문자열, 사용자 응답, 심지어 DB 이력 테이블까지 새어 나가고 있었다.\r
\r
## 무엇이 문제인가\r
\r
예외 메시지에는 생각보다 많은 것이 담긴다. 파일 경로, DB 접속 정보 조각, 클래스 구조,\r
호스트/포트 — 공격자에게는 시스템 내부를 추측할 단서가 된다. 문제 코드는 형태가 다양했지만\r
본질은 같았다. **예외 객체의 내부 문자열을 직접 조립해서 내보내는 것.**\r
\r
\`\`\`java\r
// 유형 1 — 예외 원문을 문자열로 조립해 로깅\r
LOGGER.error("[" + e.getClass() + "] : " + e.getMessage());\r
\r
// 유형 2 — 스택트레이스를 표준출력으로\r
e.printStackTrace();\r
\r
// 유형 3 — 예외 원문을 DB 이력에 저장\r
saveHistory(String.format("실패 [에러: %s]", ex.getMessage()));\r
\r
// 유형 4 — 예외 원문을 새 예외 메시지에 담아 전파\r
throw new SQLException(ie.getMessage());\r
\`\`\`\r
\r
## 조치 원칙 — 하나로 통일\r
\r
25여 건을 개별로 고민하지 않고 원칙 하나를 정해 전부 같은 방식으로 조치했다.\r
\r
> **사람에게 보이는 메시지는 고정 문구, 예외 상세는 throwable 인자로만.**\r
\r
\`\`\`java\r
// After — 고정 문구 + throwable 전달\r
LOGGER.error("데이터 처리 중 오류가 발생했습니다.", e);\r
\r
// DB 이력도 고정 메시지만\r
saveHistory("작업 실행 오류");\r
\r
// 예외 전파 시에는 원인을 cause 체인으로\r
throw new SQLException("데이터 읽기 중 오류가 발생했습니다.", ie);\r
\`\`\`\r
\r
로깅 프레임워크(SLF4J/Log4j)는 throwable을 마지막 인자로 받으면 스택트레이스를\r
**서버 로그에만** 온전히 기록한다. 운영자는 원인을 전부 볼 수 있고, 로그 문자열이나\r
응답으로 흘러가는 건 고정 문구뿐이다. 진단 정보를 잃지 않으면서 노출만 막는 구조다.\r
\r
함정 하나 — \`LOGGER.error("오류: {}", e.getMessage(), e)\` 처럼 getMessage를\r
플레이스홀더에 넣는 코드도 있었다. throwable을 넘기고 있으니 괜찮아 보이지만,\r
메시지 원문이 로그 한 줄에 그대로 박히는 건 동일해서 함께 정리했다.\r
\r
## 배운 점\r
\r
- 예외 처리 코드는 "에러 났을 때만 도는 코드"라서 리뷰에서 가장 관대해지기 쉬운 곳이고,\r
  그래서 결함이 가장 많이 쌓여 있었다.\r
- 유형이 4가지여도 조치 원칙이 하나면 25건이 한 방향으로 정리된다. 원칙을 먼저 문서로\r
  합의하고 시작한 것이 일관성을 만들었다.\r
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
`,a=`---\r
title: CWE-404·496 — 자원 해제와 방어적 복사, 객체를 안전하게 다루는 두 가지\r
date: 2026-08-12\r
tags: Security, Java, SAST\r
summary: 수동 close를 try-with-resources로 전환하고(CWE-404), setter의 배열 참조 저장을 방어적 복사로 바꾼(CWE-496) 조치 기록\r
---\r
\r
건수는 적지만 Java의 기본기를 묻는 두 유형을 함께 정리한다.\r
**CWE-404(부적절한 리소스 종료/해제)** 와 **CWE-496(Private 배열에 Public 데이터 할당)**.\r
\r
## CWE-404 — 예외가 나면 close는 실행되지 않는다\r
\r
레거시 코드의 스트림 처리는 대부분 이런 모양이었다.\r
\r
\`\`\`java\r
// Before — 중간에 예외가 나면 close에 도달하지 못한다\r
OutputStream os = con.getOutputStream();\r
BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(os, "UTF-8"));\r
writer.write(param);\r
writer.flush();\r
writer.close();\r
\`\`\`\r
\r
닫는 코드가 있긴 하다. 문제는 **정상 경로에만 있다**는 것. \`write()\`에서 예외가 나면\r
close는 실행되지 않고 커넥션/스트림이 누수된다. 트래픽이 몰리는 날 서버가 서서히\r
느려지는 종류의 버그다.\r
\r
\`\`\`java\r
// After — try-with-resources: 정상이든 예외든 자동 close\r
try (OutputStream os = con.getOutputStream();\r
     BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(os, "UTF-8"))) {\r
    writer.write(param);\r
    writer.flush();\r
}\r
\`\`\`\r
\r
Java 7의 try-with-resources로 전환하면 선언 역순으로 자동 해제된다.\r
예외별로 중복돼 있던 수동 close 로직도 함께 제거되어 코드가 오히려 짧아졌다.\r
try-with-resources를 못 쓰는 구조(조건부 생성)는 try/finally로 해제를 보장했다.\r
\r
## CWE-496 — setter가 배열 참조를 그대로 저장하면\r
\r
\`\`\`java\r
// Before — 외부 배열의 "참조"를 그대로 보관\r
public void setLocations(Resource[] locations) {\r
    this.locations = locations;\r
}\r
\`\`\`\r
\r
이 코드의 문제는 미묘하다. 호출자가 넘긴 배열을 나중에 수정하면, 이 객체의\r
내부 상태가 **객체 바깥에서 바뀐다.** private 필드라는 캡슐화가 사실상 무력화되는 것.\r
\r
\`\`\`java\r
// After — 방어적 복사: 내 상태는 내 것만 가리키게\r
public void setLocations(Resource[] locations) {\r
    this.locations = (locations == null) ? null : locations.clone();\r
}\r
\`\`\`\r
\r
배열을 복사해서 저장하면 외부 변조가 내부에 닿지 않는다. getter로 배열을 내줄 때도\r
같은 원리(복사본 반환)가 적용된다.\r
\r
## 배운 점\r
\r
- 이 두 유형은 "보안 결함"이라기보다 **견고함의 문제**다. 하지만 자원 누수는 가용성\r
  공격의 통로가 되고, 참조 노출은 검증 우회의 통로가 된다 — 견고하지 않은 코드가\r
  곧 공격 표면이라는 걸 정적분석 룰이 상기시켜 준다.\r
- try-with-resources 전환은 기계적으로 가능한 몇 안 되는 조치라, 이런 유형부터\r
  빠르게 끝내고 판단이 필요한 유형에 시간을 쓰는 순서가 효율적이었다.\r
`,o=`---\r
title: CWE-476 Null Pointer 역참조 — 검출 15건을 한 곳에서 잡은 이야기\r
date: 2026-08-12\r
tags: Security, Java, SAST\r
summary: NPE 검출 20여 건을 라인 단위가 아니라 근원 단위로 추적해, 공통 유틸 한 곳 수정으로 15건을 일괄 해소한 기록\r
---\r
\r
**CWE-476(NULL 포인터 역참조)** 은 검출 건수만 보면 20건이 넘었다.\r
그런데 검출 위치를 하나씩 열어 보니, 상당수가 **같은 메서드를 가리키고 있었다.**\r
\r
## 검출 15건의 근원은 한 곳이었다\r
\r
여러 화면의 입력 정제 코드가 공통 유틸의 문자열 치환 메서드를 호출하고 있었고,\r
정적분석은 호출 지점마다 결함을 하나씩 찍었다. 진짜 문제는 치환 메서드 내부에 있었다.\r
\r
\`\`\`java\r
// Before — target/from/to가 null이면 indexOf/substring/length에서 NPE\r
private static String replace(String target, String from, String to) {\r
    int idx = 0;\r
    while ((idx = target.indexOf(from, idx)) != -1) {\r
        target = target.substring(0, idx) + to + target.substring(idx + from.length());\r
        idx += to.length();\r
    }\r
    return target;\r
}\r
\r
// After — 역참조 대상을 메서드 입구에서 직접 가드\r
private static String replace(String target, String from, String to) {\r
    if (target == null || from == null || to == null) {\r
        return target;\r
    }\r
    ...\r
}\r
\`\`\`\r
\r
호출부 15곳을 각각 고치는 대신 **근원 메서드 한 곳에 null 가드**를 넣어\r
검출 15건을 일괄 해소했다. 라인 단위로 따라갔다면 같은 방어 코드가 15곳에\r
복제됐을 것이다.\r
\r
## 나머지 케이스 — "null을 반환할 수 있는 API"들\r
\r
남은 검출은 대부분 표준 API의 null 반환 가능성을 잊은 코드였다.\r
\r
\`\`\`java\r
// System.getProperty는 null을 반환할 수 있다\r
output.write(System.getProperty("line.separator").getBytes());\r
// → non-null이 보장되는 System.lineSeparator()로 교체\r
\r
// getCodeSource(), getLocation()도 null 반환 가능한 체인\r
clazz.getProtectionDomain().getCodeSource().getLocation().getPath()\r
// → 단계별 null 가드 + 디버그 로그는 isDebugEnabled 선평가로 감쌈\r
\`\`\`\r
\r
가장 재미있었던 건은 **API의 계약 자체를 바꾼 케이스**다. 허용되지 않은 호출자면\r
null을 반환하던 내부 메서드가 있었는데, 호출부 4곳이 전부 반환값을 검사 없이\r
사용해서 검출 4건이 나왔다. null 반환을 **예외 throw로 변경**하니 호출부를\r
한 줄도 고치지 않고 4건이 사라졌다 — 실패를 null로 알리는 API는 호출부 수만큼\r
NPE 위험을 복제한다.\r
\r
## 배운 점\r
\r
- 정적분석의 검출 단위는 "라인"이지만 결함의 단위는 "설계"다. 검출 목록을 근원별로\r
  다시 묶는 작업이 조치의 절반이었다.\r
- null 가드를 추가하는 것과 null이 나올 수 없게 만드는 것(non-null API 교체,\r
  예외 계약으로 변경) 중 후자가 가능하면 항상 후자가 낫다. 가드는 잊혀지지만\r
  계약은 컴파일러와 호출부 전체에 강제된다.\r
`,s=`---\r
title: CWE-615 주석 속 민감정보 — 주석 처리했다고 사라지는 게 아니다\r
date: 2026-08-12\r
tags: Security, Java, SAST\r
summary: 주석 처리된 코드에 남아 있던 인증 URL·계정 파라미터·하드코딩 password를 삭제한 기록 — 주석은 배포 산출물에도 그대로 실린다\r
---\r
\r
**CWE-615(소스 코드 주석에 민감한 정보 포함)** 로 검출된 건들은 코드를 한 줄도\r
실행하지 않는 "죽은 텍스트"였다. 그런데 조치 우선순위는 높음이었다. 왜일까.\r
\r
## 발견된 것들\r
\r
\`\`\`java\r
// 케이스 1 — 주석 처리된 옛 로그인 코드에 인증 엔드포인트와 파라미터 구성이 통째로\r
//response.sendRedirect(ctx + "/auth_check?username=" + user.getId() + "&password=" + user.getKey());\r
\r
// 케이스 2 — 주석 블록 안의 테스트 main()에 하드코딩 password/salt\r
/*\r
public static void main(String[] args) {\r
    String password = "abc";\r
    String salt = "def";\r
    ...\r
}\r
*/\r
\r
// 케이스 3 — 쓰지 않게 된 password 파라미터 참조가 주석으로 잔존\r
//String password = request.getParameter("password");\r
\`\`\`\r
\r
공통점은 전부 **"나중에 쓸지 몰라서" 주석 처리해 둔 코드**라는 것.\r
기능을 끄면서 지우지 않고 주석으로 남긴 흔적들이다.\r
\r
## 주석이 왜 위험한가\r
\r
- 주석은 컴파일되지 않지만 **소스는 배포·백업·형상관리 어디에나 실려 다닌다.**\r
  소스가 유출되는 순간(저장소 오설정, 백업 유출, 협력사 반출) 주석 속 인증 URL과\r
  파라미터 구성은 실행 코드와 똑같은 가치의 정보가 된다.\r
- 특히 인증 관련 주석 코드는 "이 시스템이 과거에 어떻게 인증했는지, 어떤 파라미터를\r
  받는지"를 알려주는 공격 설계도 역할을 한다.\r
\r
## 조치 — 삭제, 그리고 걱정 내려놓기\r
\r
조치는 전부 **해당 라인 삭제**다. 간단하지만 심리적 저항이 있는 조치이기도 하다.\r
"나중에 필요하면?" — 필요 없다. **형상관리(Git) 이력에 전부 남아 있다.**\r
주석 처리는 버전 관리가 없던 시절의 습관이고, 지금은 지우는 것이 보관이다.\r
\r
## 배운 점\r
\r
- 주석 처리된 코드는 기능적으로는 죽어 있지만 정보로서는 살아 있다.\r
  "주석이니까 괜찮다"는 실행 관점의 판단이고, 보안은 노출 관점으로 판단해야 한다.\r
- 이런 결함이 쌓이는 걸 막는 건 결국 코드 리뷰 문화다 — "주석 처리 말고 삭제하세요,\r
  이력은 Git에 있습니다" 한 마디면 예방되는 유형이다.\r
`,c=`---\r
title: CWE-676 위험한 API 사용 — eval을 지우기 전에 해야 하는 일\r
date: 2026-08-12\r
tags: Security, JavaScript, Java, SAST\r
summary: 레거시 JS의 eval 두 종류를 호출부 전수조사 후 안전한 문법으로 대체하고, deprecated API를 정리한 기록\r
---\r
\r
**CWE-676(잠재적으로 위험한 함수 사용)** 검출의 주인공은 예상대로 JavaScript의\r
\`eval\`이었다. 그런데 이 유형의 조치에서 정작 오래 걸린 건 코드를 고치는 일이 아니라,\r
**고쳐도 되는지 확인하는 일**이었다.\r
\r
## 케이스 1 — 문자열 조립 eval은 문법으로 대체된다\r
\r
\`\`\`js\r
// Before — 폼/필드 이름을 문자열로 조립해 eval\r
var fields = eval("document.forms." + formName + "." + fieldName);\r
\r
// After — 대괄호 표기법: 동작 동일, 인젝션 불가\r
var fields = document.forms[formName][fieldName];\r
\`\`\`\r
\r
동적으로 프로퍼티에 접근하고 싶어서 eval을 쓴 전형적인 케이스.\r
JavaScript의 대괄호 표기법이 정확히 이 용도라서, 코드 인젝션 가능성만 제거하고\r
동작은 그대로 유지된다. 90년대 스타일 레거시 JS에서 아주 흔한 패턴이다.\r
\r
## 케이스 2 — 콜백 eval, 지우기 전에 전수조사\r
\r
\`\`\`js\r
// Before — 콜백이 문자열이면 eval로 실행\r
if (typeof callback === "function") {\r
    callback();\r
} else if (callback) {\r
    eval(callback);\r
}\r
\`\`\`\r
\r
공통 확인창 유틸의 콜백 처리다. 여기서 eval을 그냥 지우면 문자열 콜백을 넘기는\r
화면이 조용히 깨진다. 그래서 먼저 **호출부 22곳을 전수조사**했다.\r
결과: 전부 함수 참조를 넘기고 있었고, 문자열 분기는 실행된 적 없는 dead path였다.\r
\r
확인이 끝났으니 안전하게 대체할 수 있었다.\r
\r
\`\`\`js\r
// After — 문자열이면 전역 함수명으로만 해석 (임의 코드 실행 불가)\r
} else if (typeof window[callback] === "function") {\r
    window[callback]();\r
}\r
\`\`\`\r
\r
## 케이스 3 — deprecated API의 조용한 위험\r
\r
\`\`\`java\r
// Before — 플랫폼 기본 charset에 의존 (deprecated)\r
String enc = URLEncoder.encode(text);\r
\r
// After — charset 명시\r
String enc = URLEncoder.encode(text, "UTF-8");\r
\`\`\`\r
\r
서버 OS 설정에 따라 인코딩 결과가 달라질 수 있는 API. 보안 결함이라기보다\r
이식성 결함에 가깝지만, 인코딩 불일치는 필터 우회의 재료가 되기도 해서 함께 정리했다.\r
\r
## 조치불가 판정 — 서드파티 라이브러리 속 eval\r
\r
오픈소스 JSON 폴리필과 벤더 암호화 번들 안에도 eval 검출이 있었다.\r
난독화·압축된 서드파티 산출물을 직접 수정하는 건 라이선스와 유지보수 양쪽에서\r
부적합하다고 판단해 **"조치불가 + 사유 기록"** 으로 종결했다.\r
모든 검출을 억지로 고치는 것보다, 못 고치는 이유를 남기는 것이 감리 관점에서 정직하다.\r
\r
## 배운 점\r
\r
- eval 제거의 핵심은 대체 문법이 아니라 **영향 범위 확인**이다. 호출부 전수조사 없이\r
  고쳤다면 "보안 조치가 기능을 깨뜨린" 사례가 됐을 것이다.\r
- 정적분석 도구는 서드파티 코드도 가리지 않고 찍는다. 수정/제외/조치불가를 판정하고\r
  사유를 기록하는 것까지가 조치 프로세스다.\r
`,l=`---\r
title: CWE-754 부적절한 예외 처리 — catch(Exception)을 걷어내며\r
date: 2026-08-12\r
tags: Security, Java, SAST\r
summary: 광범위한 catch, 무의미한 재던지기, 예외 삼키기, null 미검사 — 네 가지 안티패턴을 걷어낸 예외 처리 정비 기록\r
---\r
\r
**CWE-754(비정상적이거나 예외적인 조건에 대한 부적절한 검사)** 로 검출된 15여 건을\r
정리했다. 하나의 CWE지만 실제 코드에서는 네 가지 안티패턴으로 나타났고,\r
각각 조치 방법이 달랐다.\r
\r
## 안티패턴 1 — 광범위한 catch(Exception)\r
\r
\`\`\`java\r
// Before — 모든 예외를 한 덩어리로\r
try {\r
    executeRemoteCall(config);\r
} catch (Exception e) { ... }\r
\r
// After — try 블록이 실제로 던지는 예외로 좁힘\r
try {\r
    executeRemoteCall(config);\r
} catch (IOException e) { ... }\r
\`\`\`\r
\r
\`catch(Exception)\`은 의도하지 않은 예외(버그로 인한 NPE 등)까지 삼켜서\r
문제를 숨긴다. try 블록이 실제로 던질 수 있는 예외를 확인하고 그것만 잡도록 좁혔다.\r
DB 접근과 일반 로직이 섞인 블록은 \`DataAccessException\` catch를 앞에 추가하는\r
2단 구성으로 갔다.\r
\r
## 안티패턴 2 — 잡아서 그대로 다시 던지기\r
\r
\`\`\`java\r
// Before — catch가 하는 일이 없다\r
try {\r
    return doProceed();\r
} catch (Throwable e) {\r
    throw e;          // 무의미\r
} finally {\r
    stopWatch.stop();\r
}\r
\r
// After — try/finally만 남김 (동작 동일)\r
try {\r
    return doProceed();\r
} finally {\r
    stopWatch.stop();\r
}\r
\`\`\`\r
\r
메서드가 이미 \`throws Throwable\`이고 finally는 어차피 실행되므로,\r
catch 블록은 존재 이유가 없었다. 같은 클래스 안에 복사-붙여넣기로 4곳 반복되어 있었다.\r
\r
## 안티패턴 3 — 예외 삼키기\r
\r
\`\`\`java\r
// Before — 프린트만 하고 아무 일도 없었던 것처럼 진행\r
} catch (Exception e) {\r
    e.printStackTrace();\r
}\r
\r
// After — 로깅하고, 호출자에게 실패를 알림\r
} catch (IOException e) {\r
    LOGGER.error("파일 다운로드 처리 중 오류가 발생했습니다.", e);\r
    throw new IOException("파일 다운로드 처리 중 오류가 발생했습니다.");\r
}\r
\`\`\`\r
\r
삼켜진 예외는 "다운로드가 조용히 안 되는" 유령 버그가 된다. AJAX 응답을 반환하는\r
컨트롤러는 예외를 다시 던지는 대신 \`result=false\`로 정상적인 실패 JSON을\r
반환하도록 바꿨다 — 전파와 응답 중 무엇이 맞는지는 호출자가 누구냐에 따라 갈린다.\r
\r
## 안티패턴 4 — 실패 조건 미검사\r
\r
연결 생성 함수가 실패 시 null을 반환하는데 호출부가 검사 없이 바로 사용하는 코드.\r
null 체크를 추가하는 것으로 조치했지만, 근본적으로는 "실패를 null로 알리는 API"\r
자체가 문제라는 걸 다음 편(CWE-476)에서 다시 만나게 된다.\r
\r
## 배운 점\r
\r
- 같은 CWE 번호라도 코드 현실은 여러 갈래다. 검출 결과를 안티패턴 단위로 다시\r
  분류해야 조치 방법이 명확해진다.\r
- 예외 처리의 기준은 "잡을 수 있는 것만 잡고, 잡았으면 책임진다(로깅+전파 또는\r
  명시적 실패 응답)"로 요약된다. 이 기준에 안 맞는 catch는 대부분 지우는 게 답이었다.\r
`,u=`---\r
title: CWE-79 크로스 사이트 스크립팅 — 레거시 JSP 200여 건 조치 기록\r
date: 2026-08-12\r
tags: Security, JSP, XSS, SAST\r
summary: 코드레이 정적분석에서 검출된 CWE-79 결함 200여 건을 패턴별로 분류하고, 레거시 JSP 출력 구조를 개편해 조치한 과정 정리\r
---\r
\r
공공기관 웹 시스템의 웹 취약점 점검 과제를 수행하면서, 정적분석 도구 **코드레이(CodeRay)** 가\r
검출한 **CWE-79(크로스 사이트 스크립팅)** 결함 200여 건을 조치했다.\r
대상은 eGovFrame + Spring MVC + JSP 기반의 레거시 시스템이었다.\r
\r
건수는 많았지만 원인은 몇 가지 패턴으로 수렴했다. 그래서 결함을 하나씩 고치기 전에\r
**전체를 유형별로 분류하는 작업부터** 했고, 유형마다 표준 조치 방식을 정한 뒤 일괄 적용했다.\r
이 글은 그 분류와 조치 기준의 기록이다. (예시 코드는 전부 일반화한 것이다.)\r
\r
## 전제 — 이 시스템의 방어 구조\r
\r
이 시스템은 서블릿 필터가 요청 파라미터의 특수문자(\`<\` \`>\` \`"\` \`'\` 등)를\r
HTML 엔티티로 인코딩해서 DB에 저장하는, **입력 측 방어**가 이미 있는 구조였다.\r
\r
문제는 출력 측이었다. JSP에서 EL(\`\${...}\`)을 그대로 출력하는 코드가 화면 곳곳에 있었고,\r
필터를 거치지 않는 값(예외 메시지, 내부 조회 값, 외부 연동 리턴값)은 입력 방어의 보호도 받지 못했다.\r
**방어는 출력 컨텍스트에서 완성된다**는 원칙으로 출력부 전체를 손봤다.\r
\r
## 패턴 1 — HTML 본문의 raw EL 출력 (가장 많음)\r
\r
목록과 상세 화면의 \`<td>\`, \`<div>\` 안에 EL을 그대로 찍는 코드. 전형적인 XSS 출력점이다.\r
\r
\`\`\`jsp\r
<%-- Before --%>\r
<td><div class="txt">\${item.userName}</div></td>\r
\r
<%-- After --%>\r
<td><div class="txt"><c:out value="\${item.userName}"/></div></td>\r
\`\`\`\r
\r
JSTL \`c:out\`은 기본값으로 escapeXml이 켜져 있어 \`<\` \`>\` 등을 엔티티로 치환해 준다.\r
단순해 보이지만 전체 검출의 절반 이상이 이 패턴이었다.\r
\r
### 함정 — "마스킹했으니 안전하다"는 착각\r
\r
이름·전화번호 마스킹 함수를 거친 출력은 안전해 보이지만, 마스킹은 **개인정보 보호**이지\r
**escape가 아니다**. 마스킹 후에도 남는 문자열에 스크립트 조각이 살아 있을 수 있다.\r
그래서 마스킹 함수 출력부도 예외 없이 \`c:out\`으로 감쌌다.\r
\r
\`\`\`jsp\r
<%-- 마스킹 함수도 escape 대상이다 --%>\r
<c:out value="\${custom:nameMasking(item.userName)}"/>\r
\`\`\`\r
\r
## 패턴 2 — 인코딩 저장값의 이중 처리 (디코딩 + 재이스케이프)\r
\r
입력 필터가 인코딩한 값을 그대로 출력하면 화면에 \`&lt;\` \`&#40;\` 같은 깨진 문자가 보인다.\r
그렇다고 raw로 출력하면 XSS다. 답은 **디코딩해서 원문으로 되돌린 뒤, 출력 시점에 다시 escape**\r
하는 것이다.\r
\r
\`\`\`jsp\r
<%-- Before: 인코딩된 값이 그대로 노출되거나, raw 출력으로 XSS 위험 --%>\r
\${item.address}\r
\r
<%-- After: 커스텀 EL 함수로 디코딩 → c:out으로 재이스케이프 --%>\r
<c:out value="\${custom:decode(item.address)}"/>\r
\`\`\`\r
\r
"입력에서 한 번 막았으니 출력은 자유"가 아니라, 입력 인코딩과 출력 escape는\r
**각자 자기 계층의 계약을 지켜야** 전체가 안전해진다. 주소류 필드처럼 사용자가\r
직접 타이핑하는 값에 이 패턴을 집중 적용했다.\r
\r
## 패턴 3 — HTML을 반환하는 서버 함수 출력\r
\r
셀렉트박스 옵션을 서버 측 공통코드 함수가 \`<option>...</option>\` HTML 문자열로\r
만들어 주는 레거시 구조가 있었다. 이걸 \`c:out\`으로 감싸면 태그가 문자 그대로\r
화면에 노출되어 UI가 깨진다.\r
\r
\`\`\`jsp\r
<%-- Before: 함수가 만든 HTML을 raw EL로 출력 --%>\r
<select>\${custom:codeOptions('CODE_GROUP')}</select>\r
\r
<%-- After: 통제된 raw 출력 전용 커스텀 태그로 이관 --%>\r
<select><egovc:rawHtml value="\${custom:codeOptions('CODE_GROUP')}"/></select>\r
\`\`\`\r
\r
핵심은 **"escape하지 않는 출력"을 없애는 게 아니라, 한 곳으로 모아 통제하는 것**이다.\r
전용 커스텀 태그를 만들어 두면 ① raw 출력 지점이 코드 검색 한 번에 전부 드러나고\r
② "이 태그에는 사용자 입력을 넣지 않는다"는 규칙을 리뷰에서 강제할 수 있다.\r
\`fn:replace\`로 강조 태그(\`<span>\`)를 만들어 raw 출력하던 케이스도 같은 방식으로 정리했다.\r
\r
## 패턴 4 — 에러 페이지의 예외 메시지 출력\r
\r
공통 에러 JSP들이 \`\${exception.message}\`, \`\${pageTitle}\` 같은 값을 그대로 출력하고 있었다.\r
예외 메시지에는 요청 파라미터가 섞여 들어오는 경우가 많아서 reflected XSS의 통로가 된다.\r
\r
\`\`\`jsp\r
<%-- Before --%>\r
<p class="title">\${exception.message}</p>\r
\r
<%-- After --%>\r
<p class="title"><c:out value="\${exception.message}"/></p>\r
\`\`\`\r
\r
에러 페이지는 "화면"으로 잘 인식되지 않아 점검에서 누락되기 쉬운 사각지대였다.\r
이번 조치에서 에러 템플릿 전체를 한 번에 정리했다.\r
\r
## 패턴 5 — 죽은 코드는 고치지 않고 삭제\r
\r
검출 건수 2위는 의외의 곳에서 나왔다. 본인확인 연동 샘플, 인증서 벤더의 진단용 샘플,\r
컴포넌트 테스트 화면 같은 **미사용 JSP**들이 \`request.getParameter()\`를 스크립틀릿으로\r
그대로 출력하고 있었다.\r
\r
\`\`\`jsp\r
<%-- 파라미터를 무방비로 출력하는 벤더 샘플 코드 --%>\r
<li>결과메세지 : <%=RESULT_MSG%></li>\r
\`\`\`\r
\r
이런 파일은 escape를 씌워 "고치는" 것보다, 실제 진입 경로가 없음을 확인하고\r
**삭제해서 공격 표면 자체를 없애는 것**이 맞다고 판단했다. 컨트롤러 매핑과\r
화면 흐름을 역추적해 미사용을 확인한 뒤 40여 건을 파일 삭제로 종결했다.\r
\r
## 패턴 6 — 에디터 본문처럼 escape할 수 없는 값\r
\r
위지윅 에디터로 작성된 게시 본문은 HTML 태그를 보존해야 해서 escape가 불가능하다.\r
이 영역은 raw EL이 화면 여기저기 흩어져 있던 것을 패턴 3의 전용 태그로 모아,\r
**"raw 출력이 허용된 유일한 통로"** 로 단일화했다. 대신 이 값의 안전성은\r
에디터의 허용 태그 정책과 입력 필터가 책임진다는 것을 문서화해 남겼다.\r
\r
## 정리\r
\r
| 패턴 | 조치 | 비고 |\r
| --- | --- | --- |\r
| HTML 본문 raw EL | c:out 래핑 | 마스킹 함수 출력 포함 |\r
| 인코딩 저장값 | 디코딩 + c:out 재이스케이프 | 입력 필터와 역할 분담 |\r
| HTML 반환 함수 | 전용 rawHtml 커스텀 태그 | raw 출력 지점 단일화 |\r
| 에러 페이지 예외 메시지 | c:out 래핑 | 점검 사각지대 |\r
| 미사용 샘플/테스트 JSP | 파일 삭제 | 공격 표면 제거 |\r
| 에디터 HTML 본문 | rawHtml 태그로 통로 단일화 | 정책 문서화 병행 |\r
\r
## 배운 점\r
\r
- **결함 200건 ≠ 문제 200개.** 분류부터 하면 원인은 소수의 패턴으로 수렴하고,\r
  패턴별 표준 조치를 정하면 일관성 있게 빠르게 끝난다. 개별 건을 하나씩 고쳤다면\r
  같은 위치에 다른 방식의 코드가 섞였을 것이다.\r
- **escape는 컨텍스트가 결정한다.** HTML 본문, 태그를 보존해야 하는 본문,\r
  깨진 문자를 되돌려야 하는 인코딩 값 — 같은 XSS 지적이라도 답이 다르다.\r
- **삭제도 조치다.** 쓰지 않는 코드는 고치는 순간부터 다시 유지보수 대상이 된다.\r
  미사용이 확인되면 지우는 것이 가장 확실한 보안 조치였다.\r
- **정적분석 도구와 일하는 법.** 도구는 같은 라인을 중복 검출하기도 하고,\r
  위험하지 않은 출력을 지적하기도 한다. 검출 결과를 그대로 따라가는 게 아니라\r
  코드 맥락을 판단해 조치/제외를 구분하고 사유를 남기는 것까지가 조치다.\r
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
`,p='---\ntitle: 면접 정리 2 — CloudXper 클라우드 빌링 플랫폼 경력 기술서와 심층 질문·사이드 프로젝트\ndate: 2026-10-23\ntags: Interview, Retrospective, Spring, MyBatis, Redis, Performance\nsummary: CloudXper 빌링 플랫폼의 핵심 성과(100만 건 대용량 조회 병렬화와 한계 회고, Redis 권한 캐시와 세션 TTL 동기화, 4인 백엔드 코드 표준화 및 PDF 컨벤션 공유)를 의사결정 근거와 트레이드오프 중심으로 재구성한 경력 기술서\n---\n\n포트폴리오의 **[CloudXper 클라우드 빌링 플랫폼 고도화 (2024.10 ~ 2025.02)](/#project-cloudxper-billing)** 경험을 채용 담당자와 테크 리드 관점의 **5단계 구조(문제 정의 → 의사결정 및 대안 비교 → 해결 및 한계 복기 → 정량·정성 성과 → 심층 꼬리 질문)**로 재구성했다.\n\n- **소속 및 역할**: (주)애버커스 | 빌링시스템팀 (SI 프로젝트) · 플랫폼 서버 백엔드 개발 (AWS · GCP · Azure · Kakao 멀티 클라우드 대여·청구 통합 관리)\n- **사용 기술 스택**: Spring Boot 3.x, Java, REST API, React, MyBatis, MySQL, Redis, SonarQube, Gradle\n\n---\n\n## 프로젝트 성과 × 기술 블로그 매핑\n\n| 프로젝트 핵심 성과 (`projects.js`) | 핵심 지표 | 연결된 블로그 원문 |\n| --- | --- | --- |\n| **1. 대용량 데이터 조회 성능 최적화** | API 응답 시간 **95% 단축 (10분 → 30초 이내)** | [mybatis-builder-parallel-refactoring](/blog/mybatis-builder-parallel-refactoring) |\n| **2. Redis 기반 인증 아키텍처 최적화** | 권한 조회 및 화면 전환 **10초 → 0.10초 이내** | [redis-permission-cache-ttl](/blog/redis-permission-cache-ttl) |\n| **3. 코드 리팩토링 및 개발 컨벤션 표준화** | `Request/Response DTO · Model` 분리, `Builder` 도입, PDF 가이드 공유 및 온보딩 단축 | [backend-code-convention-standardization](/blog/backend-code-convention-standardization) |\n\n---\n\n## Case 1. 100만 건 환경 대용량 조회 성능 개선과 `parallelStream`의 명암\n\n- **원문**: [10분짜리 API를 30초 이내로 — 100만 건 대용량 조회 성능 개선과 병렬 스트림](/blog/mybatis-builder-parallel-refactoring)\n\n### 1. [문제 정의 및 배경]\n- **100만 건 규모에서 터진 10분 지연**: 청구 목록·가입 목록 등 마스터 데이터를 조회한 뒤 각 항목의 상세 내역을 묶어 내려주는 조회·집계 API가 있었다. 개발 단계의 **1만 건** 테스트 데이터에서는 지연이 드러나지 않았으나, 성능 검증을 위해 **100만 건 규모의 테스트 데이터**를 구성하자 같은 API 응답 시간이 **10분**까지 치솟아 사실상 타임아웃 상태가 됐다.\n- **MyBatis `selectList` 순차 반복 호출로 인한 직렬 대기 누적**:\n  - 부모 목록 1회 조회 후 `for`문을 돌며 하위 상세 `selectList` 쿼리를 건건이 순차 실행하는 구조가 청구·가입·집계 로직 전반에 반복되고 있었고, 대용량 조건에서 네트워크 왕복 및 DB I/O 대기 시간이 직렬로 누적됐다.\n\n### 2. [기술적 의사결정 및 대안 비교]\n- **낯선 DB 옵티마이저 힌트 시도 vs 통제 가능한 애플리케이션 병렬화**:\n  - 이전 운영 경험이 Oracle 기반이어서 당시 MySQL의 실행계획과 옵티마이저 특성에 충분히 익숙하지 않았다. 제한된 일정 안에 10분짜리 지연을 해결해야 하는 상황에서, 익숙하지 않은 DB 힌트를 근거 없이 건드리기보다 **내가 동작 흐름을 명확히 통제할 수 있는 애플리케이션 계층 병렬 처리**를 먼저 선택했다.\n- **`ServiceImpl` 단일화 후 병렬 스트림 적용**:\n  - 소스 전역의 순차 조회·집계 루프에 Java `parallelStream`을 적용해 여러 DB 조회의 I/O 대기 시간을 병렬로 중첩시켰다.\n\n### 3. [해결 과정 및 기술적 한계 복기 (Fail-Recovery & Reflection)]\n- **병렬 스트림 적용 결과**:\n  - `ServiceImpl`에서 상세 리스트 조회 및 집계 조립을 `parallelStream`으로 병렬 실행하도록 변경해, 동일한 100만 건 테스트 조건에서 응답 시간을 **약 10분 → 30초 이내(95% 단축)**로 줄였다.\n- **[핵심 복기] 당시 해결의 기술적 한계와 지금 다시 푼다면**:\n  - 작업을 마친 뒤 가장 크게 돌아본 점은 **`parallelStream`은 여러 DB 조회의 대기 시간(Latency)을 겹쳐 전체 응답 시간을 줄인 것일 뿐, 반복되는 총 SQL 실행 횟수 자체를 줄인 것이 아니다**라는 사실이다.\n  - **남아 있던 구조적 위험 3가지**:\n    1. **공용 스레드 풀 및 커넥션 풀 경합**: `parallelStream`은 JVM 전역의 `ForkJoinPool.commonPool()`을 공유하므로, 대량 조회 요청이 동시에 여러 건 들어오면 워커 스레드와 HikariCP DB 커넥션 풀을 급격히 점유해 다른 일반 API 요청까지 대기시킬 수 있다.\n    2. **트랜잭션 경계 분리**: 스프링의 `@Transactional`은 `ThreadLocal` 기반이므로 `parallelStream`이 쪼갠 별도 워커 스레드에는 호출 스레드의 트랜잭션 컨텍스트가 전파되지 않는다.\n    3. **실행계획 미확인**: 애플리케이션을 고치는 동시에 MySQL `EXPLAIN`으로 실제 SQL의 인덱스 접근 경로부터 함께 확인했어야 했다.\n  - **지금 다시 설계한다면**: 루프 안에서 단건 `selectList`를 병렬로 호출하는 대신, 마스터 목록에서 ID 리스트를 추출해 **`WHERE billing_id IN (...)` 배치 쿼리로 하위 데이터를 단 1번(총 쿼리 2회)에 조회한 뒤 메모리에서 `Collectors.groupingBy`로 매핑**하는 집합 단위 조회 구조로 풀었을 것이다.\n\n### 4. [정량적/정성적 성과 및 배운 점]\n- **성과**: 동일 100만 건 테스트 데이터 기준 API 응답 시간 **95% 단축 (10분 → 30초 이내)**.\n- **배운 점**: "성능 수치 개선이 곧 구조적 완성을 뜻하지는 않는다." 10분을 30초 이내로 줄인 성과와 별개로, 애플리케이션 병렬화가 DB I/O에서 갖는 한계를 정확히 직시하고 쿼리 횟수 자체를 줄이는 집합 사고로 넘어가는 계기가 됐다.\n\n### 5. [면접관 예상 꼬리 질문 (2가지)]\n1. **Q. `parallelStream`으로 10분을 30초 이내로 줄였다고 하셨는데, DB 조회에 `parallelStream`을 쓰면 커넥션 풀이나 스레드 풀에서 어떤 문제가 생길 수 있나요?**\n   - **답변 포인트**: 당시에는 순차 DB 왕복 대기 시간을 병렬로 겹쳐 당장의 10분 타임아웃을 30초 이내로 줄였지만, 반복되는 SQL 실행 횟수는 그대로라는 한계가 있었습니다. 특히 `parallelStream`은 JVM 전역의 `ForkJoinPool.commonPool()`을 쓰기 때문에 동시 요청이 몰리면 공용 스레드와 HikariCP 커넥션을 한 요청이 독점해 다른 API들이 커넥션 획득 타임아웃에 빠질 수 있고, `ThreadLocal` 기반인 `@Transactional`도 워커 스레드로 전파되지 않습니다. 그래서 회고를 통해 이 한계를 명확히 정리했고, 근본 해법은 병렬 호출이 아니라 `WHERE billing_id IN (...)`으로 한 번에 조회한 뒤 메모리에서 `groupingBy`로 조립해 쿼리 수를 2회로 줄이는 것이라는 결론을 내렸습니다.\n2. **Q. 만약 `WHERE IN (...)` 절로 바꿨을 때 부모 ID가 수만 건이면 `IN` 절 파라미터 제한이나 쿼리 크기 문제는 어떻게 해결할 수 있나요?**\n   - **답변 포인트**: 먼저 화면 조회 API라면 한 번에 수만 건을 다 내려주기보다 페이지네이션(예: 페이지당 50~100건)을 적용해 `IN` 절에 들어가는 ID 개수를 페이지 크기로 제한하는 것이 우선입니다. 만약 전체 대량 추출처럼 수만 건을 반드시 한 번에 읽어야 하는 경우라면, ID 리스트를 1,000건 단위 청크(Chunk)로 잘라 Batch `IN` 조회를 수행하거나 검색 조건 자체를 서브쿼리/JOIN으로 넘겨 DB 옵티마이저가 집합 단위로 처리하게 설계합니다.\n\n---\n\n## Case 2. OAuth 인증·권한 조회 Redis 캐싱과 `TTL = 세션 만료 시간` 설계\n\n- **원문**: [화면마다 권한을 DB에 묻던 시스템 — Redis 캐시와 "세션과 같은 TTL"](/blog/redis-permission-cache-ttl)\n\n### 1. [문제 정의 및 배경]\n같은 조회 화면이라도 사용자 권한에 따라 셀렉트 박스에 노출되는 코드 항목(자기 부서만 노출 vs 전체 노출 등)이 달랐다. 기존 구조는 화면이 열릴 때마다, 그리고 화면 안의 셀렉트 박스가 대여섯 개 그려질 때마다 `사용자-역할-권한-코드`를 잇는 무거운 조인 쿼리를 매번 DB에 날리고 있어 화면 전환 및 렌더링에 **최대 10초**가 걸렸다.\n\n### 2. [기술적 의사결정 및 대안 비교]\n- **캐시 도입 타당성 판단**:\n  - 권한·허용 코드 데이터는 ① 모든 화면 렌더링마다 읽혀 **읽기 빈도가 압도적**이고, ② 관리자의 권한 변경은 하루에 몇 번 안 될 만큼 **변경이 희소**하며, ③ **한 로그인 세션 동안에는 일관성이 유지**되므로 캐시 도입 시 비용 대비 효과가 가장 큰 영역이었다.\n- **로컬 캐시 vs Redis 분산 캐시**:\n  - 다중 인스턴스 환경에서 로컬 캐시를 쓰면 관리자가 특정 사용자의 권한을 변경했을 때 서버 간 캐시 불일치가 발생할 수 있다. 권한은 보안과 직결되므로 단일 저장소에서 즉시 키를 무효화할 수 있는 **Redis**를 선택했다.\n- **핵심 의사결정 — 왜 TTL을 \'세션 만료 시간(30분)\'과 일치시켰는가?**:\n  - **TTL > 세션 타임아웃일 때**: 사용자가 로그아웃하고 관리자가 권한을 축소한 뒤 재로그인해도, Redis에 살아 있는 이전 캐시 때문에 **회수된 권한이 그대로 보이는 보안 사고**가 발생할 수 있다.\n  - **TTL < 세션 타임아웃일 때**: 로그인해 업무를 보는 도중에 캐시가 먼저 증발해 다시 무거운 DB 조인이 실행된다.\n  - **결론 (`TTL = 세션 타임아웃`)**: 캐시 수명을 세션 수명(30분)에 정렬함으로써 "한 세션 동안의 권한은 로그인 시점 기준으로 유지된다"는 시스템의 기존 암묵적 규칙을 명시적 캐시 정책으로 일치시켰다.\n\n### 3. [해결 과정 및 트러블슈팅]\n- **핀포인트 캐시 키 설계 (`userPermissions::{username}:{codeGroup}`)**:\n  - `@Cacheable(value = "userPermissions", key = "#username + \':\' + #codeGroup")`과 `GenericJackson2JsonRedisSerializer`, `entryTtl(Duration.ofMinutes(30))`을 설정했다.\n- **경계 이벤트 무효화(Cache Eviction) 처리**:\n  - TTL에만 의존하지 않고 두 가지 경계 이벤트를 명시적으로 처리했다.\n  - **로그아웃 시**: 세션 무효화와 동시에 해당 사용자의 캐시 키를 즉시 삭제해 남은 TTL과 무관하게 캐시 수명을 종료시켰다.\n  - **관리자의 권한 변경 시**: 전체 캐시를 날려(flush) 다른 사용자의 캐시 미스를 유발하는 대신, 변경 대상 사용자의 키만 정확히 타겟팅해 `@CacheEvict` 처리했다.\n\n### 4. [정량적/정성적 성과 및 배운 점]\n- **성과**: 로그인 후 첫 조회 이후 반복되던 권한 조인 쿼리가 **0건**이 됐고, DB 왕복이 Redis 메모리 조회(밀리초 미만)로 대체되면서 화면 전환 및 렌더링 응답 속도가 **10초 → 0.10초 이내**로 단축됐다.\n- **배운 점**: 캐시 설계의 본질은 `@Cacheable` 어노테이션 한 줄을 붙이는 것이 아니라 **"캐시 수명(TTL)을 비즈니스상 어떤 수명 주기에 정렬할 것인가"**와 **"어떤 이벤트에서 누구의 키를 지울 것인가(Invalidation)"**를 정의하는 데 있다.\n\n### 5. [면접관 예상 꼬리 질문 (3가지)]\n1. **Q. 사용자가 29분 동안 활동해서 세션은 연장됐는데, 첫 조회 시점에 생성된 Redis 캐시는 30분이 지나 만료되면 어떻게 되나요?**\n   - **답변 포인트**: 그 경우에는 30분 시점의 다음 화면 요청에서 Cache Miss가 1회 발생하고, `@Cacheable`에 의해 DB에서 최신 권한을 다시 조회해 30분 TTL로 재적재합니다. 보안상 낡은 권한이 남는 문제(TTL > 세션)는 로그아웃 시 즉시 Evict와 관리자 변경 시 Evict로 막았고, 활동 연장으로 인한 30분 단위의 1회 재조회는 DB 부하에 영향을 주지 않으면서 오히려 장기 세션의 권한 최신성을 보강해 주는 효과가 있습니다.\n2. **Q. 만약 운영 중에 Redis 서버에 장애가 나거나 네트워크가 끊기면 모든 화면 진입이 막히지 않나요?**\n   - **답변 포인트**: 맞습니다. 권한 조회가 모든 화면에 걸려 있기 때문에 Redis 장애가 곧 전체 서비스 장애(Single Point of Failure)로 번지면 안 됩니다. Spring Cache의 `CacheErrorHandler`를 구현해 Redis 조회/저장 중 타임아웃이나 연결 예외가 발생하면 예외를 던지는 대신 경고 로그만 남기고 원본 DB(MySQL)를 조회하도록 Fallback(Graceful Degradation) 구조를 갖추는 것이 안전합니다.\n3. **Q. `GenericJackson2JsonRedisSerializer`를 사용했을 때의 장단점은 무엇인가요?**\n   - **답변 포인트**: 자바 기본 직렬화(`JdkSerializationRedisSerializer`)와 달리 Redis CLI에서 데이터를 사람이 읽을 수 있는 JSON 형태로 바로 확인할 수 있어 디버깅이 쉽고 `Serializable` 구현 강제도 없습니다. 다만 JSON 안에 `@class` 타입 패키지 경로가 함께 저장되기 때문에, 향후 패키지 경로나 클래스명을 리팩토링하면 기존 캐시 역직렬화 시 `ClassNotFoundException`이 날 수 있다는 점을 유의해야 합니다.\n\n---\n\n## Case 3. 4인 백엔드 팀 코드 리팩토링과 PDF 컨벤션 표준화\n\n- **원문**: [4인 백엔드 팀의 제각각이던 selectList 코드 — 사원급에서 PDF 컨벤션을 만들어 표준화하기까지](/blog/backend-code-convention-standardization)\n\n### 1. [문제 정의 및 배경]\n백엔드 4명 중 소속 정규직은 사원급이던 나 한 명이었고, 나머지 구성원은 외부 파견 프리랜서 개발자분들과 기존 레거시 운영 위주로 업무를 해오던 선임 인력이었다. 함께 중심을 잡던 팀장님은 PM 역할까지 대행하시느라 대외 일정 조율에 여력이 없었고, 프로젝트 종료 후에도 시스템을 운영해야 할 내부 인력으로서 백엔드 실무 단에서는 사실상 PL 성격의 기술 기준 수립 책임이 내게 분담되어 있었다. 당시 합의된 코드 컨벤션이 없어 단순한 단일 `selectList` 조회 API조차 컨트롤러의 `DAO` 직호출 여부, `List<자료형>`에 담기는 단일 만능 VO 공용 사용 여부, `new` + `setter` 나열 방식이 작성자마다 모두 달랐고, Swagger 명세 혼선과 중복 보일러플레이트 코드가 계속 누적됐다.\n\n### 2. [해결 과정 — 레퍼런스 코드 검증 후 PDF 가이드 주도 공유]\n- **먼저 동작하는 레퍼런스 코드 구현**: 연차가 높은 프리랜서·선임 동료분들께 구두로만 규칙을 요청하면 부담이 될 수 있어, 담당 도메인 API를 먼저 `Controller → Service → ServiceImpl → DAO` 계층과 기능별 `Request / Response DTO` 및 `Model` 분리, `@Builder` 패턴, `@Valid` 검증 구조로 리팩토링해 효과를 증명했다.\n- **PDF 가이드 문서화 및 상호 보완을 통한 팀 표준 완성**: 신규 패턴이 낯선 동료도 바로 따라 쓸 수 있도록 패키지 구조, 네이밍, 단일 `selectList`·등록·수정 Before/After 템플릿을 **PDF 파일**로 정리해 팀 회의에서 공유했다. 이 과정에서 사원급이던 내게 부족했던 기술적 디테일이나 예외 케이스는 경험 많은 고년차 프리랜서 개발자분들께서 조언과 가이드를 보태주셔서 다 함께 완성도 높은 팀 표준을 만들어낼 수 있었다.\n\n### 3. [성과 및 면접관 예상 꼬리 질문]\n- **성과**: 4인 백엔드 코드 구조 일원화로 객체 생성 중복 제거 및 유지보수성·프론트엔드 협업 효율 향상, 외부/교차 인력 온보딩 및 적응 시간 단축(정량적 정적 분석 지표를 전후 좌표로 측정해 두지 못한 점은 이후 회고 과제로 복기).\n- **Q. 연차가 높은 외부 프리랜서나 선임 개발자분들께 사원급으로서 새 컨벤션을 도입할 때 어떻게 설득하고 협업하셨나요?**\n  - **답변 포인트**: "기존 방식이 틀렸다"고 접근하기보다 "배경이 다른 4명이 서로의 코드를 5분 안에 읽고 교차 수정할 수 있게 틀을 맞추자"는 협업 관점으로 접근했습니다. 먼저 실제 모듈을 `Request/Response DTO · Model · @Builder` 구조로 리팩토링해 `setter` 중복 제거와 Swagger 자동 명세화 효과를 결과물로 보여드리고 바로 복사해 쓸 수 있는 PDF 예제 가이드를 준비해 전환 장벽을 낮췄으며, 사원급인 제게 부족했던 실무 예외 처리나 기술적인 부분들은 고년차 프리랜서 분들께 적극적으로 자문을 구하고 가이드를 반영하면서 팀 전원 합작의 표준으로 정착시킬 수 있었습니다.\n\n---\n\n## 기본기를 다지기 위한 사이드 프로젝트 아이디어 (이 프로젝트 기반)\n\n### Idea 1. 반복 조회 vs 집합 조회(`IN` 절) 벤치마크 & HikariCP 커넥션 풀 프로파일러\n- **목적**: 블로그 회고에서 남긴 *"지금 다시 한다면 집합 조회로 풀었을 것이다"*를 실제 코드와 부하 테스트 수치로 증명하기.\n- **구현 내용**: 대용량 데이터 환경에서 ① 순차 `selectList` 반복 호출 ② `parallelStream` 병렬 호출 ③ 커스텀 `ThreadPoolExecutor` + `CompletableFuture` ④ `WHERE billing_id IN (...)` + `Collectors.groupingBy` 4가지를 구현하고, 동시 요청 50명일 때 `parallelStream`의 커넥션 풀 경합 현상과 `IN` 절 집합 조회의 안정성을 수치로 비교.\n\n### Idea 2. 탄력적(Resilient) 2-Tier 권한 캐시 & Cache Fallback 모듈\n- **목적**: 단순 `@Cacheable`을 넘어 **L1/L2 캐시 동기화와 Redis 장애 시 자동 DB 우회(Fallback)**까지 갖춘 권한 모듈 구현.\n- **구현 내용**: Caffeine(L1) + Redis(L2) 구조에 권한 변경 시 Redis Pub/Sub으로 전 서버 L1 캐시를 즉시 무효화하고, `CacheErrorHandler`를 통해 Redis 컨테이너를 강제 중지(`docker pause`)했을 때 에러 없이 MySQL 원본 조회로 자동 전환되는지 통합 테스트로 검증.\n\n### Idea 3. `ArchUnit` 기반 아키텍처 컨벤션 자동 검증 테스트\n- **목적**: 팀에 PDF 문서로 공유했던 계층 분리와 `Request/Response DTO · Model` 분리 규칙을 **CI 빌드 테스트 코드로 자동 강제**하기.\n- **구현 내용**: JUnit + `ArchUnit`으로 *"Controller는 DAO를 직접 참조할 수 없다"*, *"Controller의 public 메서드는 DB 영속 계층의 `Model`을 외부로 직접 반환할 수 없고 오직 `DTO`만 반환해야 한다"* 규칙을 코드화해 위반 시 테스트가 실패하도록 구성.\n',m="---\r\ntitle: 면접 정리 1 — 전세사기 피해자 지원관리시스템 경력 기술서와 심층 질문·사이드 프로젝트\r\ndate: 2026-10-24\r\ntags: Interview, Retrospective, CUBRID, Security, Infra, Java\r\nsummary: 전세사기 피해자 지원관리시스템의 6대 성과를 의사결정 근거(Why & Trade-off)·실패 복구(Fail-Recovery)·과장 없는 기여도 기준으로 재구성한 경력 기술서 및 면접 대비 정리본\r\n---\r\n\r\n포트폴리오의 **[전세사기 피해자 지원관리시스템 운영·고도화 (2025.09 ~ 2026.08)](/#project-jeonse-support-system)** 경험을 채용 담당자와 테크 리드 관점의 **5단계 구조(문제 정의 → 의사결정 및 대안 비교 → 해결 및 실패 복구 → 정량·정성 성과 → 심층 꼬리 질문)**로 재구성했다.\r\n\r\n- **소속 및 역할**: (주)마이크로 서비스 | SI 본부 · 시스템 운영 및 기능 개발\r\n- **사용 기술 스택**: eGovFrame 4.1.0, Java, JSP/JSTL, MyBatis, CUBRID, Apache MINA SSHD, Damo, Jasypt, Linux (망분리: 인터넷망 ↔ 업무망)\r\n\r\n---\r\n\r\n## 프로젝트 성과 × 기술 블로그 매핑\r\n\r\n| 프로젝트 핵심 성과 (`projects.js`) | 핵심 지표 | 연결된 블로그 원문 |\r\n| --- | --- | --- |\r\n| **1. 운영 행정망 Slow Query 분석 및 인덱스 튜닝** | **53초 → 1초 미만**, 월간 점검 특이사항 0건 | [cubrid-query-plan-index-tuning](/blog/cubrid-query-plan-index-tuning) |\r\n| **2. 개인정보 대량 암호화 패치 및 CI값 보안 강화** | CI 14만 + 이력 370만 = **총 384만 건 무중단 패치** | [csql-nohup-mass-patch](/blog/csql-nohup-mass-patch) |\r\n| **3. 국자원 웹 취약점 점검 사전 대응 및 보안 강화** | SQL Injection **14건 해소**, 9개 테이블·97개 컬럼 정적 전환 | [dynamic-to-static-sync-query](/blog/dynamic-to-static-sync-query) |\r\n| **4. 인프라 용량 관리 모니터링 자동화** | JSch 협상 실패 해결, **4시간 주기 수집** (용량 30% 이하 관리) | [jsch-to-mina-sshd](/blog/jsch-to-mina-sshd) |\r\n| **5. CodeRay 기반 SAST 취약점 전수 분석·시큐어코딩** | SAST 탐지 **358건 → 최종 4건** 달성 | CWE 보안 시리즈 8편 (하단 표 참조) |\r\n| **6. Markdown 기반 AI 유지보수 자동화 체계 구축** | 오류 재현 및 소스 분석 시간 **30~40% 단축** | 도메인 업무 템플릿 정형화 및 분석 표준화 |\r\n\r\n---\r\n\r\n## Case 1. 망간 데이터 동기화 쿼리 정적 전환과 테이블 누락 사고 복구\r\n\r\n- **원문**: [MyBatis를 JPA처럼 쓰던 연계 로직 — 범용 동적 쿼리를 정적 쿼리로 되돌리기](/blog/dynamic-to-static-sync-query)\r\n\r\n### 1. [문제 정의 및 배경]\r\n내부망(업무망)과 외부망(인터넷망)에 각각 CUBRID DB를 두고 게시물·첨부파일을 양방향 동기화하는 연계 로직이 있었다. 기존 코드는 어떤 테이블이든 처리할 수 있도록 `${targetTable}`과 `<foreach>${item.columnName} = #{item.columnValue}</foreach>` 문자열 치환을 사용한 **단 2개의 범용 statement(`selectSyncInfo`, `updateSyncInfoReg`)**로 구현되어 있었다.\r\n- MyBatis에서 `${}`는 `PreparedStatement` 바인딩이 아닌 런타임 문자열 치환이므로 외부 입력과 닿는 순간 SQL Injection에 그대로 노출된다.\r\n- 소스 코드 어디에도 완성된 SQL이 존재하지 않아 정적분석 스캐너나 코드 리뷰어가 실제 실행 쿼리를 검증할 수 없었다.\r\n- 원본 조회 결과가 `null`일 때도 `MERGE`가 실행되어 반대편 망의 정상 데이터를 전부 `NULL`로 덮어쓸 수 있는 잠재 버그가 있었다.\r\n\r\n### 2. [기술적 의사결정 및 대안 비교]\r\n- **대안 A (기존 유지 + 애플리케이션 화이트리스트 검증)**: 범용 동적 쿼리 2개를 유지하고 Java 단에서 허용 테이블·컬럼 문자열만 검사하는 방식. 코드는 짧지만 SAST 도구에서는 여전히 `${}` 구문을 SQL Injection 취약점으로 검출하며, `SELECT *`와 동적 컬럼 조립이 스키마 변경에 취약하다는 근본 한계가 남는다.\r\n- **대안 B (채택 — 테이블별 명시적 정적 Statement 분리 + Statement ID 라우팅)**:\r\n  - JDBC `PreparedStatement` 표준상 테이블명·컬럼명 같은 식별자 자리에는 `?`(`#{}`) 바인딩을 쓸 수 없다. 따라서 \"범용 1개\"의 편의성을 버리고 연계 대상 **9개 테이블·97개 컬럼**을 테이블별 정적 `SELECT` / `MERGE` statement로 모두 풀어 썼다.\r\n  - 이때 상위 `Service` 인터페이스와 스케줄러 호출부는 건드리지 않고, DAO에서만 `selectOne(\"SyncDAO.select_\" + tableName)`처럼 **statement ID를 선택**하도록 변경했다. 매퍼 XML에 정의되지 않은 테이블명이 들어오면 SQL이 조립·실행되는 대신 \"존재하지 않는 statement ID\" 예외로 즉시 차단되어 자연스러운 화이트리스트가 완성됐다.\r\n\r\n### 3. [해결 과정 및 트러블슈팅 (Fail-Recovery)]\r\n- **원본 미존재 가드 추가**: 원본 조회 결과가 없을 때는 `MERGE`를 건너뛰고(skip) 경고 로그를 남기도록 방어 로직을 추가해 `NULL` 덮어쓰기 위험을 제거했다.\r\n- **[실패와 수습] 코드 상수만 믿었다가 발생한 '조용한 연계 누락'**:\r\n  - 정적 statement를 작성할 대상 테이블 목록을 **소스 코드에 하드코딩되어 있던 테이블 목록**에서 뽑았다.\r\n  - 그러나 운영 DB의 **동기화 이력(`hist`) 테이블**에는 실제로 연계가 돌고 있었지만 Java 상수 목록에는 빠져 있던 테이블이 1개 존재했다.\r\n  - 배포 직후 해당 테이블의 정적 statement가 없다 보니 그 테이블의 변경분만 반대편 DB로 넘어가지 않았고, 동기화 호출 자체가 누락되니 에러 로그조차 찍히지 않는 장애가 발생했다.\r\n  - 양쪽 DB 데이터가 어긋난 것을 확인한 즉시 이력 테이블(`hist`)을 전수 조회해 누락된 테이블의 정적 statement를 추가 배포하고, 누락 기간 동안 쌓인 변경 이력의 PK를 추출해 데이터를 보정한 뒤 **양쪽 DB 건수 및 PK 대사(Reconciliation)**로 정합성 복구를 완료했다.\r\n\r\n### 4. [정량적/정성적 성과 및 배운 점]\r\n- **성과**: 국자원 웹 취약점 점검 사전 대응으로 **SQL Injection 14건 해소**(이후 CodeRay 정적분석에서 SQL 삽입 검출 0건), 보안 취약점 16건 개선 및 Jasypt 공통 유틸 기반 4개 환경 계정정보 17건 암호화 완료.\r\n- **배운 점**: **\"운영 시스템의 진실은 코드가 아니라 운영 데이터(이력 테이블)에 있다.\"** 리팩토링 범위를 잡을 때 코드 상수만 믿지 않고 반드시 운영 이력 테이블의 `DISTINCT` 집계와 교차 검증해야 하며, 에러 로그가 안 찍히는 '조용한 누락'을 잡기 위해 배포 후에는 반드시 **데이터 대사 쿼리**로 검증하는 원칙을 세웠다.\r\n\r\n### 5. [면접관 예상 꼬리 질문 (3가지)]\r\n1. **Q. MyBatis에서 `#{}`와 `${}`의 내부 동작 원리 차이는 무엇이며, 왜 테이블명에는 `#{}`를 쓸 수 없나요?**\r\n   - **답변 포인트**: `#{}`는 JDBC `PreparedStatement`의 `?` 파라미터로 컴파일되어 DB가 값을 리터럴로만 취급하므로 SQL 구조가 변조되지 않고 실행계획도 캐싱됩니다. 반면 DB 옵티마이저는 실행계획을 세울 때 테이블과 컬럼 식별자를 먼저 확정해야 하므로 표준 SQL 문법상 식별자 자리에는 `?` 바인딩을 허용하지 않습니다. 그래서 `${}` 문자열 치환을 쓰게 되는데, 이를 제거하기 위해 매퍼 XML에 테이블별 정적 쿼리를 선언하고 Java에서는 실행할 statement ID만 매핑하도록 구조를 바꿨습니다.\r\n2. **Q. 테이블 1개가 누락됐을 때 에러 로그도 안 남았다고 했는데, 어떻게 인지했고 누락된 데이터는 어떤 절차로 복구했나요?**\r\n   - **답변 포인트**: 업무망과 인터넷망 게시물 건수가 어긋난다는 현업/운영 확인 과정에서 발견했습니다. 즉시 동기화 이력(`hist`) 테이블을 기준으로 코드의 대상 목록과 `MINUS` 비교를 수행해 빠져 있던 테이블 1개를 특정했습니다. statement를 추가 배포한 뒤에는, 배포 시점부터 복구 시점까지 이력 테이블에 기록된 해당 테이블의 변경 `row_id` 목록을 뽑아 원본 행을 조회하고 대상 망에 `MERGE` 보정을 실행한 뒤 양쪽 `COUNT`와 PK 대사로 일치 여부를 최종 확인했습니다.\r\n3. **Q. 테이블마다 정적 쿼리를 다 만들면 향후 테이블이나 컬럼이 추가될 때 유지보수가 번거롭지 않나요?**\r\n   - **답변 포인트**: 맞습니다. 범용 동적 쿼리 대비 새 컬럼 추가 시 매퍼 XML을 함께 수정해야 하는 번거로움은 늘어납니다. 하지만 공공 망분리 시스템에서는 '스키마 변경 시 코드 한 줄 덜 고치는 편의성'보다 '외부 점검 기준 충족(SQL Injection 원천 차단)과 실행 SQL의 가시성 확보, 의도치 않은 신규 컬럼 자동 동기화 방지'가 훨씬 중요한 가치였기 때문에 명시적 관리 비용을 감수하는 트레이드오프를 선택했습니다.\r\n\r\n---\r\n\r\n## Case 2. 운영 행정망 53초 Slow Query 분석 및 복합 인덱스 설계\r\n\r\n- **원문**: [53초짜리 목록 조회 — CUBRID 쿼리 플랜의 빨간 구간을 지우는 인덱스 설계](/blog/cubrid-query-plan-index-tuning)\r\n\r\n### 1. [문제 정의 및 배경]\r\n운영 행정망에서 약 **7만 건** 규모의 접수 목록을 조회할 때 응답에 **53초**가 걸렸다. 7만 건은 RDBMS 기준 대용량도 아닌데 1분 가까이 걸리다 보니, 운영자는 화면이 멈춘 줄 알고 새로고침을 반복했고 동일한 무거운 쿼리가 DB에 중첩으로 쌓였다.\r\n\r\n### 2. [기술적 의사결정 및 대안 비교]\r\n- **CUBRID Manager 쿼리 플랜 진단**:\r\n  - 실행계획을 열어본 결과 비용이 큰 빨간색 노드가 두 곳이었다: ① `sscan`(유효한 인덱스가 없어 7만 건 테이블 전체 순차 스캔) ② `temp(order by)`(필터링 결과를 임시 공간에서 별도 정렬).\r\n- **단일 인덱스 추가 vs WHERE + ORDER BY 통합 복합 인덱스 설계**:\r\n  - 후보 컬럼은 `WHERE`절 4개(`del_yn`, `area_cd`, `rcpt_status`, `reg_dt`)와 `ORDER BY`절 2개(`reg_dt DESC`, `rcpt_no DESC`)였다.\r\n  - 단순히 조건 컬럼 하나에만 인덱스를 걸면 `sscan`은 피해도 `temp(order by)` 정렬 부하가 남는다. 따라서 **탐색(Range Scan)과 정렬 생략, 커버링 필터까지 인덱스 1개로 끝내는 복합 인덱스 순서**를 설계하기로 결정했다.\r\n  - **순서 결정 근거**:\r\n    1. **등치(`=`) 조건 선두 배치 (`area_cd, rcpt_status`)**: 탐색 범위를 가장 먼저 점으로 좁힌다.\r\n    2. **범위(`BETWEEN`) + 정렬 조건 연결 (`reg_dt DESC, rcpt_no DESC`)**: B-Tree 특성상 범위 조건 뒤에 오는 컬럼은 인덱스 탐색 범위를 좁히는 데 쓰이지 못하므로 등치 조건 뒤에 `reg_dt`를 두고, 이어서 `rcpt_no DESC`를 붙여 두 컬럼 모두 `DESC` 방향을 일치시킴으로써 별도 정렬(`temp`) 없이 인덱스 읽는 순서 그대로 결과를 반환하게 했다.\r\n    3. **저카디널리티 컬럼 후미 배치 (`del_yn`)**: `'Y'/'N'` 두 값뿐이고 대부분이 `'N'`인 `del_yn`을 선두에 두면 거의 전 구간을 스캔한다. 맨 뒤에 포함시켜 테이블 접근 전 인덱스 단에서 걸러내는 커버링 효과를 택했다.\r\n\r\n### 3. [해결 과정 및 트러블슈팅]\r\n- **복합 인덱스 생성**: `CREATE INDEX ix_rcpt_list_01 ON rcpt_list (area_cd, rcpt_status, reg_dt DESC, rcpt_no DESC, del_yn);`\r\n- **인덱스를 무력화하던 조건절(Non-SARGable) 교정**:\r\n  - 같은 화면의 다른 조회 조건들에 인덱스를 못 타게 막는 패턴이 섞여 있어 함께 수정했다.\r\n  - **좌변 컬럼 가공 제거**: `WHERE TO_CHAR(reg_dt, 'YYYYMMDD') = ?`처럼 인덱스 컬럼을 함수로 감싸 정렬 기준을 깨뜨리던 조건을 `WHERE reg_dt >= ? AND reg_dt < ?` 범위 비교로 변경했다.\r\n  - **선행 와일드카드 협의 변경**: `WHERE apply_nm LIKE '%' || ? || '%'`는 시작점을 알 수 없어 풀스캔을 유발한다. 이름 검색은 앞자리 입력이 자연스럽다는 점을 현업과 협의해 `LIKE ? || '%'` 전방 일치로 전환했다.\r\n- **통계 정보 갱신**: 인덱스를 생성해도 통계가 낡으면 옵티마이저가 기존 풀스캔을 고집할 수 있어 `UPDATE STATISTICS ON rcpt_list;`까지 실행해 마무리했다.\r\n\r\n### 4. [정량적/정성적 성과 및 배운 점]\r\n- **성과**: 실행계획이 `iscan`(인덱스 스캔) 단일 경로로 바뀌고 `temp(order by)` 노드가 완전히 제거됐다. 조회 응답 시간은 **53초 → 1초 미만**으로 단축됐고, 이후 월간 운영 점검에서 해당 화면의 Slow Query 특이사항 0건을 유지했다.\r\n- **배운 점**: 인덱스는 공짜가 아니며 `INSERT/UPDATE`마다 갱신 비용을 치른다. 접수 목록 테이블은 쓰기보다 운영자의 반복 조회가 압도적인 읽기 위주 테이블이어서 5개 컬럼 복합 인덱스가 남는 장사였지만, 이력 로그처럼 쓰기가 집중되는 테이블이었다면 같은 결정을 내리지 않았을 것이다.\r\n\r\n### 5. [면접관 예상 꼬리 질문 (3가지)]\r\n1. **Q. 만약 `ORDER BY reg_dt DESC, rcpt_no ASC`처럼 두 정렬 컬럼의 방향이 서로 달랐다면 인덱스를 어떻게 타게 되나요?**\r\n   - **답변 포인트**: 기본 ASC 인덱스를 역순(Backward)으로 읽으면 전체 방향이 뒤집히므로 `DESC, DESC`는 해결되지만, `DESC, ASC`처럼 방향이 섞여 있으면 인덱스를 읽는 순서만으로 정렬을 끝낼 수 없어 다시 `temp(order by)` 정렬 노드가 생깁니다. 이를 피하려면 인덱스 생성 시점부터 쿼리의 정렬 방향과 동일하게 `(..., reg_dt DESC, rcpt_no ASC)`로 내림차순/오름차순을 명시해서 생성해야 합니다.\r\n2. **Q. `del_yn`을 아예 인덱스에서 빼는 것과 맨 뒤에 넣는 것을 둘 다 비교해 봤다고 했는데, 어떤 차이가 있었나요?**\r\n   - **답변 포인트**: `del_yn`을 인덱스에서 빼면 인덱스로 `area_cd, rcpt_status, reg_dt` 조건을 만족하는 행들의 OID/데이터 페이지를 찾아간 뒤에야 테이블을 읽고 `del_yn = 'N'`인지 확인합니다. 반면 맨 뒤에라도 인덱스에 넣어두면 테이블 데이터 페이지로 랜덤 액세스하기 전에 인덱스 리프 노드 안에서 `del_yn = 'N'`이 아닌 행을 먼저 걸러낼 수 있어 테이블 접근 횟수가 근소하게 줄어드는 것을 플랜으로 확인하고 포함시켰습니다.\r\n3. **Q. 이름 검색을 `%키워드%`에서 `키워드%`로 바꿀 때 현업(운영자)의 반대는 없었나요?**\r\n   - **답변 포인트**: 무작정 기능부터 바꾸지 않고, 먼저 운영자가 실제로 이름을 어떻게 검색하는지 패턴과 53초 지연의 원인을 함께 설명드렸습니다. 신청자 성명 검색은 대부분 성씨를 포함한 전체 이름이나 앞 글자부터 입력하고 있었고, 중간 글자 검색 기능을 유지하느라 매번 수십 초를 기다리는 것보다 전방 일치로 바꿔 1초 안에 조회하는 편이 업무 효율에 훨씬 유리하다는 공감대를 얻어 변경했습니다.\r\n\r\n---\r\n\r\n## Case 3. 개인정보 384만 건 무중단 암호화 패치 (`csql + nohup`)\r\n\r\n- **원문**: [csql과 nohup — 운영 중인 DB에 수백만 건 패치를 조용히 밀어 넣는 법](/blog/csql-nohup-mass-patch)\r\n\r\n### 1. [문제 정의 및 배경]\r\n외부 OTT 서비스의 본인확인 값(CI) 유출 사건 보도를 계기로 자체 점검을 수행한 결과, 가입·인증 과정에서 수집된 행안부 연계 CI값(**14만 건**)과 개인정보 이력 로그(**370만 건**) 총 **384만 건**이 평문으로 저장된 테이블을 확인했다. 유출 사고 예방을 위해 DB 암호화 솔루션(Damo) 함수로 즉시 암호화 패치를 수행해야 했으나, **운영 중인 대민/업무 서비스를 중단할 수 없다**는 제약이 있었다.\r\n\r\n### 2. [기술적 의사결정 및 대안 비교]\r\n- **애플리케이션 배치 개발·배포 vs DB 서버 CLI(`csql`) 스크립트 직접 실행**:\r\n  - 일회성 마이그레이션을 위해 WAS 애플리케이션에 배치 코드를 작성해 빌드·배포하면 불필요한 배포 리스크와 형상 관리 부담이 생긴다. DB 서버 내부에서 Damo 암호화 함수를 직접 호출하는 SQL 스크립트를 `csql` CLI로 실행하는 편이 네트워크 왕복도 없고 영향 범위도 최소였다.\r\n- **포그라운드 실행 vs `nohup` 백그라운드 + 단일 트랜잭션 vs 범위 분할 커밋**:\r\n  - 수백만 건 UPDATE 도중 작업자 PC의 VPN이 끊기거나 터미널 세션이 닫히면 `SIGHUP` 시그널로 프로세스가 죽고 어디까지 반영됐는지조차 알기 어렵다. 따라서 `nohup ... > encrypt_patch.log 2>&1 &`로 세션 생명줄을 분리했다.\r\n  - 또한 384만 건을 단일 트랜잭션으로 UPDATE하면 커밋 전까지 전체 행의 배타 락(X-Lock)이 잡혀 실사용자 거래가 마비되므로, **PK 범위 분할(예: 1만 건 단위) + 블록마다 `COMMIT` + 미처리 조건(`enc_yn = 'N'`)** 구조를 채택했다.\r\n\r\n### 3. [해결 과정 및 트러블슈팅]\r\n- **사전 검증**: 대상 테이블 백업 및 전체 `COUNT` 확정 후, 샘플 row를 대상으로 Damo 암·복호화 왕복 테스트를 먼저 수행해 함수 오적용으로 인한 데이터 훼손 가능성을 차단했다.\r\n- **실행 및 모니터링**: 저부하 시간대에 백그라운드 작업을 띄운 뒤 `jobs -l`, `ps -ef | grep csql`, `tail -f encrypt_patch.log`로 진행 상황을 추적하면서 동시에 실제 운영 화면의 조회·인증 응답 속도에 지연이 없는지 체감 모니터링을 병행했다.\r\n- **사후 대사**: 패치 완료 후 사전 확정 건수와 암호화 반영 건수(384만 건)를 대사하고, 애플리케이션 화면에서 복호화 조회가 정상 동작하는지 확인해 무중단으로 작업을 마쳤다.\r\n\r\n### 4. [정량적/정성적 성과 및 배운 점]\r\n- **성과**: 서비스 중단 및 사용자 지연 0건으로 **총 384만 건(CI 14만 건 + 이력 로그 370만 건) 암호화 완료**. 이 절차(`nohup` 백그라운드 + 범위 분할 커밋 + 멱등 조건 + 전후 대사)는 이후 연계 데이터 보정 등 다른 대량 DB 작업의 표준 절차로 재사용됐다.\r\n- **배운 점**: 대량 DML의 핵심은 `nohup` 명령어 한 줄이 아니라 **\"중간에 죽어도 같은 스크립트를 그대로 다시 돌릴 수 있는가(Idempotency)\"**와 **\"실사용자 트랜잭션이 블록 사이에 끼어들 수 있게 락 보유 시간을 쪼갰는가\"**에 있다.\r\n\r\n---\r\n\r\n## Case 4. 인프라 용량 모니터링 자동화 (`JSch` → `Apache MINA SSHD`) & SAST 358건 → 4건 개선\r\n\r\n- **원문**: [JSch가 WEB 서버 앞에서 멈춘 날 — Apache MINA SSHD로 서버 용량 모니터링 만들기](/blog/jsch-to-mina-sshd) / CWE 보안 시리즈 8편\r\n\r\n### 1. [문제 정의 및 배경]\r\n- **수기 서버 점검**: 매월 말 인터넷망·업무망의 WEB/WAS 서버마다 터미널로 접속해 `free -h`, `df -h`를 치고 표로 옮겨 적는 반복 수작업이 있었고, 공공 인프라 특성상 각 서버에 별도 모니터링 에이전트를 설치하기엔 보안 승인 비용이 컸다.\r\n- **SAST 358건 검출**: CodeRay 정적분석에서 XSS(200여 건), NPE 역참조(20여 건), 오류 메시지 노출(25여 건), 자원 미해제 등 총 **358건**의 보안 약점이 검출됐다.\r\n\r\n### 2. [기술적 의사결정 및 트러블슈팅]\r\n- **[Troubleshooting] JSch 암호화 알고리즘 협상 실패와 MINA SSHD 전환**:\r\n  - 에이전트 설치 대신 대표 WAS 1대가 Quartz(4시간 주기)로 각 서버에 SSH 접속해 명령 결과를 수집하는 구조를 설계했다.\r\n  - 초기 적용한 `JSch`가 로컬/개발 서버에서는 잘 붙었으나 **운영 WEB 서버 앞에서 인증 단계조차 가지 못하고 실패**했다. `/etc/ssh/sshd_config`와 `ssh -vvv` 협상 로그를 비교한 결과, 운영 서버는 보안 정책상 `ssh-rsa`(SHA-1) 등 구형 알고리즘이 비활성화돼 있었고 오래된 JSch와 알고리즘 교집합이 없었다.\r\n  - 보안 점검을 받는 시스템에서 서버 보안 설정을 낮추는(구형 알고리즘 허용) 대신, 최신 키 교환(kex)·호스트키 알고리즘을 지원하는 **Apache MINA SSHD 2.16.0**으로 클라이언트를 교체해 해결했다.\r\n- **[Edge Cases] 비동기 타임아웃 격리와 예외 마스킹 방지**:\r\n  - 모니터링 대상 서버 1대가 죽거나 방화벽에 막혔을 때 전체 수집 스레드가 무한 대기하지 않도록, MINA SSHD의 연결·인증·채널 오픈·종료 대기 모든 Future 단계에 `verify(10, TimeUnit.SECONDS)` 타임아웃을 걸었다.\r\n  - 프롬프트 파싱이 불필요하고 종료 이벤트(`CLOSED`)가 명확한 `CHANNEL_EXEC`를 사용하며 `stdout`/`stderr`를 분리 수집했다. 특히 `finally`에서 채널→세션→클라이언트 역순 종료 시 `close()` 예외가 `try` 블록의 원본 예외를 덮어쓰지 않도록 원본 예외 보존 분기를 구현했다.\r\n- **[SAST 전략] 데드 코드 제거 + 공통 뿌리 수정**:\r\n  - 358건을 줄 단위로 고치지 않고, 먼저 검출 파일의 URL·메뉴 진입점을 역추적해 **실제 운영에서 쓰지 않는 벤더 샘플과 테스트 화면을 통째 삭제**(CWE-330·489·497)해 공격 표면과 작업량을 대폭 줄였다.\r\n  - NPE 검출 20여 건(CWE-476)은 호출 사슬을 역추적해 **공통 유틸 메서드 1곳을 수정함으로써 15건을 일괄 해소**했고, 예외 정보 노출(CWE-209)은 `\"고정 안내 문구 + 로거 throwable 전달\"` 원칙으로 통일했다.\r\n\r\n| CWE 분류 | 핵심 조치 요약 | 원문 링크 |\r\n| --- | --- | --- |\r\n| **CWE-79 (XSS)** | 레거시 JSP 200여 건을 출력 컨텍스트(본문/속성/JS)별로 분류해 `<c:out>` 및 이스케이프 적용 | [cwe-79-xss-remediation](/blog/cwe-79-xss-remediation) |\r\n| **CWE-476 (Null 역참조)** | 라인별 방어 대신 호출 사슬 역추적으로 **공통 유틸 1곳 수정 → 15건 일괄 해결** | [cwe-476-null-dereference](/blog/cwe-476-null-dereference) |\r\n| **CWE-330·489·497** | 진입점(Controller/메뉴) 역추적 후 **미사용 벤더 샘플·테스트 코드 삭제**로 종결 | [cwe-330-489-dead-code-removal](/blog/cwe-330-489-dead-code-removal) |\r\n| **CWE-404·496** | 수동 `close()`의 `try-with-resources` 전환 및 VO 배열 참조의 방어적 복사(`clone`) 적용 | [cwe-404-496-resource-handling](/blog/cwe-404-496-resource-handling) |\r\n| **CWE-209 (오류 노출)** | `e.getMessage()` 조립·`printStackTrace` 25여 건을 고정 문구 + throwable 로깅으로 통일 | [cwe-209-error-message-exposure](/blog/cwe-209-error-message-exposure) |\r\n| **CWE-754 (예외 처리)** | 광범위한 `catch(Exception)`, 무의미한 재던지기, 예외 삼키기, null 미검사 정비 | [cwe-754-exception-handling](/blog/cwe-754-exception-handling) |\r\n| **CWE-676 (위험한 API)** | 레거시 JS의 `eval()`을 호출부 전수조사 후 `JSON.parse` 및 `window[fn]`으로 대체 | [cwe-676-dangerous-api](/blog/cwe-676-dangerous-api) |\r\n| **CWE-615 (주석 민감정보)** | 배포 산출물에 노출되는 주석 속 인증 URL·계정 파라미터·하드코딩 비밀번호 삭제 | [cwe-615-sensitive-comments](/blog/cwe-615-sensitive-comments) |\r\n\r\n---\r\n\r\n## 기본기를 다지기 위한 사이드 프로젝트 아이디어 (이 프로젝트 기반)\r\n\r\n### Idea 1. B-Tree 복합 인덱스 & 실행계획 벤치마크 샌드박스\r\n- **목적**: \"등치 → 범위 → 정렬\"과 \"카디널리티(선택도)\", \"커버링 인덱스\"가 실제 디스크 페이지 I/O와 실행 시간에 미치는 영향을 눈으로 증명하는 실습.\r\n- **구현 내용**: Docker MySQL에 100만 건 더미 데이터(지역 17종, 상태 5종, `del_yn` 99:1, 등록일시)를 적재하고 ① 인덱스 없음 ② `del_yn` 선두 인덱스 ③ `reg_dt` 선두 인덱스 ④ 최적 복합 인덱스 4가지 케이스의 `EXPLAIN ANALYZE` 결과와 k6 부하 테스트 TPS 차이를 리포트로 정리.\r\n\r\n### Idea 2. 무중단 대량 마이그레이션 시뮬레이터 (Lock 경합 & Zero-Offset Paging)\r\n- **목적**: `csql + nohup`으로 수행한 384만 건 분할 커밋 패치를 애플리케이션 레벨에서 재구현하며 **Lock 경합과 페이징 성능** 비교하기.\r\n- **구현 내용**: 실사용자 조회/수정 트래픽(초당 50건)이 도는 상태에서 ① 단일 트랜잭션 일괄 UPDATE ② `OFFSET` 페이징 분할 업데이트 ③ PK 커서(`WHERE id > :lastId LIMIT 5000`) 기반 Zero-Offset 분할 커밋 3가지를 실행해 실사용자 API의 p99 지연(Lock Wait)과 실패 지점 자동 재개(Resume) 체크포인트를 검증.\r\n\r\n### Idea 3. 경량 SSH 리소스 수집기 & 다중 서버 분산 스케줄러 (`ShedLock` 실습)\r\n- **목적**: 대표 WAS 1대 고정 플래그로 풀었던 Quartz 스케줄러를 **다중 인스턴스 자동 Failover 구조**와 **타임아웃 격리(Bulkhead)**로 고도화하기.\r\n- **구현 내용**: 수집 서버 2대에 `ShedLock`을 적용해 1대 강제 종료 시 나머지 1대가 다음 주기에 자동 인계받는지 검증하고, 대상 컨테이너 1대에 `tc netem delay 15s` 네트워크 지연을 걸어 `verify(10s)` 타임아웃으로 정상 서버 수집이 보호되는지 테스트.\r\n",h='---\r\ntitle: 면접 정리 3 — 빌링 GW 시스템 경력 기술서와 심층 질문·사이드 프로젝트\r\ndate: 2026-10-22\r\ntags: Interview, Retrospective, Kafka, Oracle, POI, Spring\r\nsummary: LG U+ 빌링 GW 시스템의 핵심 성과(주간 Kafka 오류 70건→5건 미만, 이기종 DB 인코딩 오류 95% 감소, Oracle 묵시적 형변환 튜닝 및 POI 엑셀 선택 기준)를 의사결정과 실패 복구 중심으로 재구성한 경력 기술서\r\n---\r\n\r\n포트폴리오의 **[빌링 GW 시스템 개발·운영 유지보수 (2022.11 ~ 2025.05)](/#project-lgu-billing-gw)** 경험을 채용 담당자와 테크 리드 관점의 **5단계 구조(문제 정의 → 의사결정 및 대안 비교 → 해결 및 트러블슈팅 → 정량·정성 성과 → 심층 꼬리 질문)**로 재구성했다.\r\n\r\n- **소속 및 역할**: (주)애버커스 | 빌링시스템팀 (개발·운영) · SM/SI 서비스 개발 및 연동 시스템 유지보수\r\n- **사용 기술 스택**: Spring Boot 2.x, Spring Batch 4.x, Apache Kafka, Redis, Oracle, MySQL, MyBatis, WhaTap, Trusted Orange, Linux (CentOS)\r\n\r\n---\r\n\r\n## 프로젝트 성과 × 기술 블로그 매핑\r\n\r\n| 프로젝트 핵심 성과 (`projects.js`) | 핵심 지표 | 연결된 블로그 원문 |\r\n| --- | --- | --- |\r\n| **1. Kafka 연동 오류 모니터링 체계 및 대응 시나리오 표준화** | 주간 Kafka 오류 **70건 → 5건 미만 (93% 감소)** | [kafka-gw-data-integrity](/blog/kafka-gw-data-integrity) |\r\n| **2. 이기종 DB 연동 유지보수 및 데이터 정합성 자동 검증** | Oracle↔MySQL 인코딩 오류 **95% 감소**, 신규 연동 실패율 **5% 미만** | [kafka-gw-data-integrity](/blog/kafka-gw-data-integrity) |\r\n| **3. 청구 도메인 기반 요금·위약금 조회 API 및 운영 기능 개발** | 실시간 조회 API 제공, Oracle 쿼리 튜닝 및 POI 엑셀 다운로드 | [oracle-hint-subquery-fullscan](/blog/oracle-hint-subquery-fullscan), [sxssf-vs-xssf-excel-download](/blog/sxssf-vs-xssf-excel-download) |\r\n\r\n---\r\n\r\n## Case 1. 차세대 전환에 따른 Kafka 도메인 GW 아키텍처와 데이터 정합성(DI) 수호\r\n\r\n- **원문**: [쪼개진 원천 테이블과 달라진 PK 사이 — Kafka 서비스 도메인 GW에서 데이터 정합성 지키기](/blog/kafka-gw-data-integrity)\r\n\r\n### 1. [문제 정의 및 배경]\r\n- **원천 테이블 분할과 PK(UUID) 체계 변경**: 발행(Pub) 측 상위 시스템이 차세대로 전환되면서 기존 원천 테이블이 여러 테이블로 쪼개지고 PK가 기존 업무키에서 **UUID**로 변경됐다. 반면 과금·청구·정산 같은 하위 구독(Sub) 파트의 DB 테이블들은 기존 업무키 기준으로 설계돼 있어, 발행 페이로드를 그대로 적재할 수 없었다.\r\n- **이벤트 순서 역전과 이기종 DB 오류**: 분산 이벤트 특성상 신규 생성(`INS`)보다 변경(`UPD`) 이벤트가 먼저 도착해 키 해석이 실패하거나, 신규 컬럼 누락 및 Oracle↔MySQL 간 인코딩 바이트 차이로 인해 적재가 실패하는 연동 오류가 **주간 약 70건**씩 발생하고 있었다.\r\n\r\n### 2. [기술적 의사결정 및 대안 비교]\r\n- **하위 구독 시스템 개별 수정 vs 중간 도메인 GW + 메타데이터 테이블 구동**:\r\n  - 과금·청구·정산 파트가 각자 차세대 UUID와 쪼개진 테이블 형상을 직접 해석하게 만들면 전사 하위 시스템의 쿼리와 스키마를 모두 뜯어고쳐야 한다.\r\n  - 대신 중간에 **서비스 도메인 GW**를 두어 형상 변환을 전담시키고, 변환 규칙(토픽·이벤트 필드·원천/대상 컬럼 매핑·UPDATE용 join 조건 플래그)을 코드 하드코딩이 아닌 **3종의 메타데이터 테이블(`gw_topic_mgmt`, `gw_event_mgmt`, `gw_src_trgt_mapg`)**로 관리하도록 설계했다.\r\n- **UUID ↔ 기존 업무키 해석을 위한 Redis 매핑 저장소 활용**:\r\n  - 변경(`UPD`) 이벤트가 새 UUID만 들고 왔을 때 구독 DB의 기존 업무키 행을 업데이트하려면 빠른 키 변환이 필요하다.\r\n  - 신규 생성(`INS`) 이벤트 처리 시점에 `UUID ↔ 기존 업무키` 매핑을 **Redis**에 저장하고, 이후 변경 이벤트 수신 시 Redis에서 기존 업무키를 찾아 대상 테이블의 WHERE(join) 조건을 완성하도록 구성했다(여기서 Redis는 메시지 브로커가 아니라 **업무키 매핑 Lookup 저장소**로 동작한다).\r\n\r\n### 3. [해결 과정 및 트러블슈팅 (Fail-Recovery)]\r\n- **`AbstractGwService` 기반 변환 파이프라인 운영**:\r\n  - 진입점 `Dispatcher`가 메시지 헤더로 사업 구분(MNO/MVNO)을 분기하고, payload 구조에 따라 단일 DTO는 `process()`, 레벨 2 리스트 포함 구조는 `processWithList()`를 실행했다.\r\n  - 원천과 대상이 1:1이면 `OneToOneService`, 1:N이면 `OneToManyService` 구현체가 원천 해석(`stepInSrc`)과 대상 반영(`stepInTrgt`)을 수행하며 `eventWorkCd`에 따라 `INS / UPD / MER / DEL` DML을 실행했다.\r\n- **[Fail-Recovery] 이벤트 순서 역전 대응과 일일 대사(Reconciliation)·보정 표준화**:\r\n  - 순서 역전으로 `INS` 매핑이 Redis에 생성되기 전에 `UPD` 이벤트가 먼저 도착하면 키 해석에 실패한다. 이를 즉시 버리지 않고 **재처리 대기 경로**로 분리 보관했다가 업무키 매핑이 생성된 뒤 재처리되도록 운영했다.\r\n  - **WhaTap 히트맵**에서 slow/fail 쿼리와 Kafka 연동 오류 내역을 일일 단위로 추출·집계하고, 원천-구독 데이터 대사 결과를 4가지 원인(**① 발행 누락 ② 이벤트 순서 역전 ③ 변환·신규 컬럼 매핑 오류 ④ 수기 데이터 변경**)으로 분류했다.\r\n  - 특히 오류 발생 자체보다 **각 파트 운영자가 인지하고 조치하기까지 걸리는 리드타임**이 더 큰 문제였기 때문에, `불일치 키 추출 → 보정 DML 작성(일회성은 엑셀 수식 기반 DML 생성, 반복 유형은 보정 스크립트 정비) → 대상 SELECT 사전 검증 → 반영 → 재대사`로 이어지는 대응 시나리오를 매뉴얼화해 공유 체계를 정립했다.\r\n- **[Encoding] Oracle ↔ MySQL 인코딩 바이트 차이(`SUBSTRB`) 해결**:\r\n  - Oracle과 MySQL 간 캐릭터셋 바이트 계산 차이(한글 2바이트 vs 3바이트 등)로 인해 글자 수 기준 처리 시 발생하던 컬럼 길이 초과 오류를 Java 바이트 변환 로직(`SUBSTRB` 대응)과 Subscriber 검증 모듈 공통화로 근본 해결했다.\r\n\r\n### 4. [정량적/정성적 성과 및 배운 점]\r\n- **성과**:\r\n  - WhaTap 모니터링·대사·보정 시나리오 표준화로 **주간 Kafka 연동 오류 70건 → 5건 미만 (약 93% 감소)**.\r\n  - 이기종 DB 바이트 처리 개선 및 연동 검증 공통 모듈화로 **인코딩 오류 95% 감소, 신규 연동 실패율 5% 미만 유지**.\r\n- **배운 점**:\r\n  - 분산 이벤트 파이프라인에서는 "오류가 0건인 완벽한 상태"를 가정하기보다, 순서 역전이나 스키마 변경으로 정합성이 어긋났을 때 **얼마나 빨리 대사(Reconciliation)로 감지하고 동일한 표준 절차로 안전하게 보정할 수 있는가**가 시스템 신뢰성을 결정한다.\r\n\r\n### 5. [면접관 예상 꼬리 질문 (3가지)]\r\n1. **Q. 아키텍처에 Kafka와 Redis가 둘 다 있는데, 두 저장소의 역할은 어떻게 달랐나요?**\r\n   - **답변 포인트**: Kafka는 차세대 발행 시스템에서 발생한 도메인·테이블 이벤트를 구독 측 GW로 전달하는 **Pub/Sub 메시지 스트리밍 통로**이고, Redis는 메시지 큐가 아니라 차세대의 **새 `UUID`와 구독 파트의 `기존 업무키`를 매핑해 둔 Key-Value Lookup 저장소**입니다. `INS` 이벤트 때 Redis에 매핑을 적재하고, 이후 UUID만 담겨 오는 `UPD` 이벤트 때 Redis를 조회해 대상 DB의 기존 PK를 찾아내는 용도로 책임을 분리했습니다.\r\n2. **Q. 신규 토픽이나 payload 필드가 추가될 때 메타데이터 등록만으로 끝났나요, 아니면 배포도 필요했나요?**\r\n   - **답변 포인트**: 기존 DTO 필드 범위 안에서 테이블·컬럼 매핑만 조정하는 경우라면 3종 메타데이터 테이블(`gw_topic_mgmt`, `gw_event_mgmt`, `gw_src_trgt_mapg`) 등록만으로 반영됩니다. 하지만 payload 자체에 신규 필드가 추가된 경우에는 메타데이터 등록과 함께 **공통 DTO 모듈을 수정해 사내 Nexus에 배포하고, 각 구독 파트의 `pom.xml` 의존성 버전을 올려 배포하는 작업**까지 한 세트로 진행해야 정합성이 깨지지 않았습니다.\r\n3. **Q. 엑셀로 보정 DML을 만들어 불일치를 맞췄다고 했는데, 운영 DB에 수동 DML을 반영할 때 실수를 막기 위해 어떤 안전장치를 두었나요?**\r\n   - **답변 포인트**: 보정 DML을 만들어서 바로 실행하지 않고 반드시 4단계 검증을 거쳤습니다. ① 대사 결과에서 `mismatch` 난 키만 추출해 원천 데이터를 조회하고, ② 반영 전 대상 DB에 `SELECT`를 먼저 날려 현재 상태와 변경될 값을 눈으로 대조한 뒤, ③ 건수가 많을 때는 블록 단위로 나눠 반영하고, ④ 반영 직후 대사 쿼리를 다시 돌려 불일치 건수가 정확히 0으로 떨어졌는지 재대사까지 확인한 뒤에야 조치를 완료했습니다.\r\n\r\n---\r\n\r\n## Case 2. 상담 청구 조회 Oracle 슬로우 쿼리 튜닝 (묵시적 형변환과 실행계획)\r\n\r\n- **원문**: [인덱스가 있는데 왜 안 타지 — 실행계획으로 좁혀간 슬로우 쿼리 튜닝기](/blog/oracle-hint-subquery-fullscan)\r\n\r\n### 1. [문제 정의 및 배경]\r\n상담 화면에서 특정 월의 청구 목록과 각 청구 건의 \'최근 납부일\'을 함께 조회하는 쿼리가 있었다. 데이터가 몰린 고객사를 조회하면 응답이 **수십 초**까지 늘어져 실시간 상담 업무에 지장을 주었다.\r\n\r\n### 2. [기술적 의사결정 및 원인 진단]\r\n- **Trusted Orange 실행계획(Plan) 분석**:\r\n  - 쿼리 본문(`bill` 테이블)은 `IX_BILL_YM_SVC` 인덱스를 정상적으로 타는데, 최근 납부일(`MAX(p.pay_dt)`)을 구하는 스칼라 서브쿼리의 `payment` 테이블이 **`TABLE ACCESS (FULL)`**로 돌고 있었다. 청구 목록이 5천 건이면 `payment` 풀스캔이 5천 번 반복되는 구조였다.\r\n- **인덱스가 있는데 왜 안 타는가? — Predicate에서 찾은 \'묵시적 형변환\'**:\r\n  - `payment` 테이블에는 이미 `bill_no` 인덱스가 존재했다. 그런데도 풀스캔이 나는 이유를 Orange 플랜 하단의 **Predicate Information**에서 찾았다.\r\n  - `bill.bill_no`는 `NUMBER` 타입이고 `payment.bill_no`는 `VARCHAR2(20)` 타입이어서, Oracle 옵티마이저가 우선순위에 따라 인덱스 컬럼 쪽에 **`TO_NUMBER("P"."BILL_NO") = :B1` 묵시적 형변환**을 씌우고 있었다.\r\n  - 인덱스 컬럼이 함수(`TO_NUMBER`)로 가공되면서 인덱스가 무력화됐을 뿐 아니라, 만약 `payment.bill_no`에 숫자가 아닌 문자가 한 건이라도 섞여 들어오면 `ORA-01722 (invalid number)` 런타임 장애가 터질 시한폭탄 상태였다.\r\n\r\n### 3. [해결 과정 및 트러블슈팅]\r\n- **1단계 (형변환 방향 교정 + 인덱스 힌트 고정)**:\r\n  - 운영 중인 두 테이블의 컬럼 타입을 즉시 변경할 수는 없었다. 대신 양쪽 값의 표기 규칙(선행 `\'0\'` 유무 등)이 일치하는지 실제 데이터로 먼저 검증한 뒤, 인덱스 컬럼(`p.bill_no`)은 그대로 두고 반대편 본문 값을 **`TO_CHAR(a.bill_no)`**로 변환했다.\r\n  - 통계 변화에도 경로가 흔들리지 않도록 `/*+ INDEX(p IX_PAYMENT_BILLNO) */` 힌트를 명시해 `TABLE ACCESS (FULL)`을 `INDEX (RANGE SCAN)`으로 복구했다.\r\n- **2단계 (대량 목록 조회의 구조 변경 — 스칼라 서브쿼리 → LEFT JOIN + Hash Join)**:\r\n  - 인덱스를 태워도 "본문 행 수만큼 서브쿼리가 반복 실행된다"는 구조는 남는다. 조회 건수가 많은 화면은 스칼라 서브쿼리를 걷어내고 `LEFT JOIN (SELECT bill_no, MAX(pay_dt) ... GROUP BY bill_no) p` 인라인 뷰와 `/*+ LEADING(a) USE_HASH(p) */` 해시 조인으로 재작성해 한 번의 집합 연산으로 끝나게 만들었다.\r\n- **[과장 없는 기여도와 학습 맥락]**:\r\n  - 당시 이 힌트들과 옵티마이저 원리를 처음부터 완벽히 알고 짠 것이 아니다. 시스템 내 다른 쿼리들과 **DBA가 남겨둔 과거 튜닝 보고서**를 읽으며 왜 `LEADING`, `USE_NL`/`USE_HASH`, `INDEX`를 썼는지 플랜과 대조해 역으로 배웠다. 또한 단일 쿼리를 빨리 돌리겠다고 온라인 화면 쿼리에 무심코 `PARALLEL` 힌트를 넣으면 동시 호출 시 DB CPU를 고갈시킨다는 운영 한계도 이때 배웠다.\r\n\r\n---\r\n\r\n## Case 3. 수작업 엑셀 대장 다운로드 기능화와 `XSSF` vs `SXSSF` 선택 기준\r\n\r\n- **원문**: [XSSFWorkbook vs SXSSFWorkbook — 수작업 엑셀 업무를 기능으로 만들며 정리한 선택 기준](/blog/sxssf-vs-xssf-excel-download)\r\n\r\n### 1. [문제 정의 및 의사결정]\r\n운영자가 매번 DB에 쿼리를 날려 수작업으로 가공하던 추출 대장·통계 엑셀을 화면 다운로드 기능으로 구현해야 했다. Apache POI의 두 구현체(`XSSFWorkbook` vs `SXSSFWorkbook`) 중 무조건 하나만 쓰는 대신 **건수와 양식 복잡도에 따른 선택 기준**을 세웠다.\r\n- **`XSSFWorkbook` (수천 건 이하 · 복잡한 서식/셀 병합)**: 전체 행을 JVM 메모리에 들고 있어 이미 쓴 이전 행(`getRow`)을 다시 읽어 위아래 셀 값을 비교·병합하거나 템플릿을 수정하기에 적합하다. 단, 수만 건 이상에서는 XML 객체 오버헤드로 Heap OOM 위험이 크다.\r\n- **`SXSSFWorkbook` (수만 건 이상 대량 추출 대장)**: 지정한 `windowSize`(예: 500~1,000행)만 메모리에 남기고 이전 행은 디스크 임시 파일로 즉시 기록(Flush)해 대량 건수에서도 메모리가 일정하게 유지된다.\r\n\r\n### 2. [트러블슈팅 및 엣지 케이스]\r\n- **플러시된 이전 행 접근(`null`) 주의**: `SXSSF`에서 윈도우 밖으로 밀려나 디스크에 기록된 행은 `sheet.getRow()` 호출 시 `null`이 반환된다. 따라서 이전 행 참조가 필요한 작업은 윈도우 크기 안에서 끝내거나 단순 목록 추출에만 사용했다.\r\n- **`autoSizeColumn` 깨짐과 고정 폭 적용**: `SXSSF`에서 `autoSizeColumn()`을 그냥 호출하면 현재 메모리에 남아 있는 최근 몇백 행의 글자 길이만 기준으로 폭을 계산해 앞쪽 긴 텍스트가 잘린다. 대량 시트는 컬럼별 고정 폭(`setColumnWidth`)을 지정해 해결했다.\r\n- **임시 파일 정리(`wb.dispose()`)**: `SXSSF`는 디스크에 압축 전 임시 XML 파일을 만들므로, `wb.close()`와 별개로 `finally`에서 반드시 **`wb.dispose()`**를 호출해 서버 `/tmp` 디스크에 임시 파일이 쌓이지 않게 처리했다.\r\n\r\n---\r\n\r\n## 기본기를 다지기 위한 사이드 프로젝트 아이디어 (이 프로젝트 기반)\r\n\r\n### Idea 1. Kafka 이벤트 순서 역전 방어 & Non-blocking Retry + DLQ 파이프라인\r\n- **목적**: 실무 GW에서 겪었던 *"생성(`INS`)보다 변경(`UPD`) 이벤트가 먼저 도착하는 순서 역전"*을 Spring Kafka 표준 아키텍처로 직접 구현하기.\r\n- **구현 내용**: 일부러 `UPD(UUID-1)`를 먼저 발행하고 3초 뒤 `INS(UUID-1, 업무키-100)`를 발행하는 시나리오에서, `@RetryableTopic`(지수 백오프 토픽 재시도)과 Dead Letter Topic(DLQ), 자동 대사 배치를 결합해 데이터 유실 없이 최종 정합성이 100% 맞춰지는 과정을 구현.\r\n\r\n### Idea 2. 옵티마이저 함정 재현기 — 묵시적 형변환과 스칼라 서브쿼리 vs 해시 조인\r\n- **목적**: DBA 보고서와 기존 소스를 보며 배웠던 내용을 **내가 직접 설계한 스키마와 실행계획 비교 실험**으로 체화하기.\r\n- **구현 내용**: `bill(bill_no INT)` 10만 건과 `payment(bill_no VARCHAR)` 100만 건을 구성해 ① 타입 불일치로 인한 인덱스 무력화 재현 ② `CAST`/`TO_CHAR` 방향 교정 ③ 결과 건수(10건 vs 5만 건)에 따른 스칼라 서브쿼리(NL)와 인라인 뷰 Hash Join의 손익분기점 그래프 도출.\r\n\r\n### Idea 3. `-Xmx256m` 환경 30만 건 엑셀 다운로드 OOM 재현 & Heap 프로파일링 실험실\r\n- **목적**: `XSSF`와 `SXSSF`의 메모리 차이를 **JVM 힙 그래프(VisualVM / JFR)**로 직접 증명하기.\r\n- **구현 내용**: 힙을 256MB로 제한한 서버에서 30만 건 다운로드 시 `XSSF`가 OOM으로 죽는 지점과, `SXSSF(windowSize=500)`가 일정한 톱니바퀴(Sawtooth) 힙 그래프를 그리며 완주하는 모습을 캡처하고 `wb.dispose()` 호출 여부에 따른 임시 파일 삭제를 테스트 코드로 검증.\r\n',g=`---\r
title: JSch가 WEB 서버 앞에서 멈춘 날 — Apache MINA SSHD로 서버 용량 모니터링 만들기\r
date: 2026-01-05\r
tags: Java, SSH, Infra, Spring\r
summary: 월말마다 수기로 정리하던 서버 메모리·디스크 현황을 SSH 기반 실시간 화면으로 자동화한 과정 — JSch의 암호화 협상 실패, MINA SSHD 교체, 그리고 함수 하나하나의 선택 이유\r
---\r
\r
운영 업무 중에 매달 반복되는 일이 있었다. **월말이 되면 서버마다 접속해서\r
메모리와 디스크 사용량을 확인하고, 표로 정리해 보고하는 것.** 서버는 인터넷망과\r
업무망에 WEB/WAS가 각각 있어서, 사람이 일일이 터미널로 들어가 \`free\`와 \`df\`를\r
치고 결과를 옮겨 적는 구조였다. 이걸 관리자 화면에서 실시간으로 보이게 만들고,\r
월말 정리도 쌓인 데이터로 하자는 게 시작이었다.\r
\r
## 설계 — WAS가 각 서버에 SSH로 물어본다\r
\r
에이전트를 서버마다 설치하는 방식은 공공 인프라 특성상 승인 비용이 크다.\r
대신 **WAS 애플리케이션이 SSH 클라이언트가 되어 각 서버에 접속해 명령을 실행**하고,\r
결과를 파싱해 DB에 쌓는 구조로 갔다.\r
\r
\`\`\`text\r
[관리자 화면] ← [Controller] ← [DB (수집 이력)]\r
                                   ↑\r
[Quartz 스케줄러(4시간 주기)] → [SSH 클라이언트] → 각 서버 (WEB/WAS × 인터넷망/업무망)\r
                                → free -h / top / df -h 실행 → 파싱 → 저장\r
\`\`\`\r
\r
접속 정보(호스트/계정/비밀번호)는 properties 하드코딩 대신 **DB 테이블로\r
관리**하고 비밀번호 컬럼은 DB 암호화 솔루션으로 암호화했다. 운영 중 서버가\r
추가돼도 재배포 없이 row 하나만 넣으면 수집 대상에 포함된다.\r
\r
## 첫 시도 — JSch, 그리고 암호화 협상 실패\r
\r
Java에서 SSH라면 가장 먼저 나오는 라이브러리가 JSch라서 그걸로 시작했다.\r
로컬에서 개발 서버로는 잘 붙었다. 그런데 **운영 WAS에서 WEB 서버를 찌르는 순간\r
인증 단계도 못 가고 접속이 실패했다.**\r
\r
원인은 코드가 아니라 **암호화 알고리즘 협상(negotiation)** 이었다. SSH는 접속\r
시점에 클라이언트와 서버가 지원하는 키 교환(kex)·호스트 키·암호화 알고리즘\r
목록을 교환해 공통분모를 고르는데, WEB 서버의 sshd는 보안 정책상 구형 알고리즘이\r
비활성화된 상태였고 JSch가 제시하는 목록과 **교집합이 없었다.** 최신 OpenSSH가\r
\`ssh-rsa\`(SHA-1 기반) 같은 구형 방식을 기본 비활성화하는 흐름과, 오래된 JSch가\r
최신 알고리즘을 모르는 상황이 정확히 충돌한 것이다.\r
\r
이걸 파악하는 과정에서 코드 바깥을 봐야 했다. WEB 서버의 \`/etc/ssh/sshd_config\`\r
허용 알고리즘을 확인하고 \`ssh -vvv\` 협상 로그로 양쪽 목록을 비교했다.\r
**WAS에서 WEB으로 가는 길은 애플리케이션 코드가 아니라 인프라 설정이 결정한다.**\r
서버 설정을 낮춰(구형 알고리즘 허용) 맞출 수도 있었지만, 보안 점검을 받는\r
시스템에서 서버 보안 수준을 낮추는 건 답이 아니라고 판단해 클라이언트를 바꿨다.\r
\r
## 교체 — Apache MINA SSHD 2.16.0\r
\r
기준은 하나 — **어떤 운영체제, 어떤 sshd 정책과도 협상이 되는 라이브러리.**\r
MINA SSHD는 활발히 관리되어 최신 키 교환·호스트 키 알고리즘을 지원하고,\r
서버가 무엇을 요구하든 협상이 성립했다.\r
\r
\`\`\`xml\r
<dependency>\r
    <groupId>org.apache.sshd</groupId>\r
    <artifactId>sshd-core</artifactId>\r
    <version>2.16.0</version>\r
</dependency>\r
\`\`\`\r
\r
## 구현 디테일 — 함수 하나하나의 선택 이유\r
\r
### 접속: 모든 비동기 단계에 verify(timeout)\r
\r
\`\`\`java\r
SshClient client = SshClient.setUpDefaultClient();\r
client.start();\r
\r
ClientSession session = client.connect(user, host, port)\r
        .verify(10, TimeUnit.SECONDS)      // 연결 완료를 10초까지만 기다림\r
        .getSession();\r
session.addPasswordIdentity(password);\r
session.auth().verify(10, TimeUnit.SECONDS); // 인증도 동일\r
\`\`\`\r
\r
MINA SSHD의 API는 대부분 **비동기 Future를 반환**한다. \`connect()\`도 \`auth()\`도\r
즉시 리턴되고, \`verify(timeout)\`을 호출해야 완료를 대기한다. 모니터링 대상\r
서버 중 한 대가 죽어 있거나 방화벽에 막혀 있으면 그 지점에서 무한 대기가\r
발생하므로, **연결·인증·채널 오픈·명령 종료까지 모든 단계에 10초 타임아웃**을\r
걸었다. 한 대의 장애가 전체 수집을 멈추면 안 되는 게 모니터링 코드의 제1 요건이다.\r
\r
### 명령 실행: 셸 채널이 아니라 EXEC 채널\r
\r
\`\`\`java\r
ClientChannel channel = session.createChannel(ClientChannel.CHANNEL_EXEC, command);\r
channel.setOut(outputStream);   // 표준출력\r
channel.setErr(errorStream);    // 표준에러 — 반드시 분리\r
channel.open().verify(10, TimeUnit.SECONDS);\r
channel.waitFor(Collections.singletonList(ClientChannelEvent.CLOSED),\r
        TimeUnit.SECONDS.toMillis(10));\r
\`\`\`\r
\r
- **\`CHANNEL_EXEC\`를 선택한 이유**: 셸 채널(\`CHANNEL_SHELL\`)은 대화형 세션이라\r
  프롬프트 파싱, 명령 종료 판별을 직접 해야 한다. EXEC 채널은 명령 하나를 던지면\r
  실행 후 채널이 닫히므로 "닫힘 이벤트 = 명령 종료"로 판별이 명확하다.\r
- **\`setOut\`/\`setErr\` 분리**: 처음엔 출력만 받았는데, 명령이 실패하면 "결과가\r
  비어 있다"는 것만 알 수 있었다. stderr를 분리 수집하니 "명령을 찾을 수 없음"\r
  같은 실패 원인이 로그에 남는다.\r
- **\`waitFor(CLOSED, timeout)\`**: 채널이 닫힐 때까지 대기하되 역시 상한 10초.\r
\r
### 종료: finally에서 채널 → 세션 → 클라이언트 순서로\r
\r
SSH 연결 정리도 비동기라서, 그냥 close만 호출하고 나가면 커넥션이 누수될 수\r
있다. finally 블록에서 **채널 → 세션 → 클라이언트 순으로 명시적으로 닫고**,\r
비동기 정리가 끝날 시간을 짧게 대기한 뒤 진행한다. 이때 한 가지 함정이 있는데 —\r
finally 안에서 close 예외를 그대로 던지면 **try에서 난 원본 예외가 덮여 사라진다.**\r
그래서 원본 예외를 변수에 보관하고, 원본이 있으면 close 예외는 로깅만 하도록 했다.\r
\r
\`\`\`java\r
} catch (Exception e) {\r
    originalException = ...;  // 원본 보관\r
    throw originalException;\r
} finally {\r
    try { session.close(); ... }\r
    catch (Exception e) {\r
        LOGGER.warn("세션 종료 중 오류", e);\r
        if (originalException == null) {   // 원본이 없을 때만 던짐\r
            throw new RuntimeException("세션 종료 중 오류 발생", e);\r
        }\r
    }\r
}\r
\`\`\`\r
\r
### 수집 명령과 파싱 — 왜 이 명령이었나\r
\r
**메모리: \`free -h\`** — 사람이 읽는 단위(G/M)로 나와 파싱 후 화면에 그대로\r
쓸 수 있다. 단, \`-h\`는 \`Gi\`/\`Mi\`(binary 단위)로 출력하므로 보고서 표기에 맞게\r
정규식으로 접미사를 정리했다.\r
\r
\`\`\`java\r
// "2Gi" → "2G", "512Mi" → "512M"\r
value.trim().replaceAll("(?i)(\\\\d+)([KMGT])i", "$1$2");\r
\`\`\`\r
\r
**CPU: \`top\` 우선, \`vmstat\` 폴백** — 서버마다 설치된 도구와 출력 포맷이 미묘하게\r
달라서 단일 명령에 걸 수 없었다.\r
\r
\`\`\`bash\r
# 1차: top 배치 모드 1회 실행에서 user CPU 추출\r
top -bn1 | grep 'Cpu(s)' | awk '{print $2}' | sed 's/%us,//'\r
# 1차가 빈 값이면 2차: vmstat의 idle(15번째 컬럼)을 100에서 빼서 사용률 계산\r
vmstat 1 2 | tail -1 | awk '{print 100-$15}'\r
\`\`\`\r
\r
\`top -bn1\`의 \`-b\`(배치 모드)가 핵심이다 — 화면 제어 문자 없이 텍스트로만 출력돼\r
파싱이 가능해진다. \`vmstat 1 2\`에서 \`2\`인 이유는 첫 샘플이 부팅 이후 누적\r
평균이라 부정확하기 때문에 두 번째 샘플(직전 1초 실측)을 \`tail -1\`로 집는 것이다.\r
파싱된 사용률이 90% 이상이면 화면에 "경고" 상태를 표시한다.\r
\r
**디스크: \`df -h\`** — 전체 파일시스템이 아니라 **마운트 포인트 기준으로 필요한\r
볼륨만** 골라 담았다. 애플리케이션 볼륨은 전 서버 공통으로 수집하고, 공유\r
스토리지 볼륨은 WAS에만 마운트되어 있어 WEB 서버는 파싱에서 제외했다 —\r
서버 역할에 따라 봐야 할 디스크가 다르다는 인프라 지식이 파싱 조건으로\r
들어간 부분이다. 로컬 개발 환경에는 운영과 같은 마운트가 없어서, 같은 코드가\r
로컬에서는 다른 마운트 포인트를 대신 읽도록 분기해 파싱 로직 자체를 테스트할\r
수 있게 했다.\r
\r
### 스케줄러: Quartz와 "Spring Bean이 아닌 클래스"의 함정\r
\r
수집은 Quartz cron(\`0 0 */4 * * ?\`, 4시간 주기)으로 돈다. 여기서 두 가지\r
비자명한 문제를 만났다.\r
\r
1. **Quartz Job은 Spring Bean이 아니다.** \`@Resource\`, \`@Value\` 주입이 동작하지\r
   않는다. 서비스는 \`JobDataMap\`을 통해 넘겨받고, 환경 값은 properties 유틸로\r
   직접 읽는 방식으로 우회했다.\r
2. **이중 수집 방지.** WAS가 2대라 스케줄러도 2곳에서 뜬다. 같은 데이터가 두 번\r
   쌓이지 않도록 properties의 스케줄 활성화 플래그로 **대표 1대만 수집**하게\r
   하고, local/dev 환경은 Spring profile(\`!dev\`)과 서버 타입 검사로 이중 차단했다\r
   — 개발 PC가 운영 서버에 SSH를 날리는 사고를 막는 안전장치다.\r
\r
### 화면 조회: Collectors.toMap이 버그 검출기가 되도록\r
\r
화면은 서버별 최신 1건만 보여주면 되므로, 쿼리가 서버별 최신 데이터만 내려주고\r
Controller는 이를 \`"WAS_1"\`, \`"WEB_2"\` 형태의 키로 Map에 담아 JSP에 넘긴다.\r
\r
\`\`\`java\r
serverList.stream()\r
    .filter(vo -> vo != null && vo.getServerType() != null && vo.getServerNo() != null)\r
    .collect(Collectors.toMap(\r
        vo -> vo.getServerType() + "_" + vo.getServerNo(),\r
        vo -> vo\r
    ));\r
\`\`\`\r
\r
\`Collectors.toMap\`은 **키가 중복되면 IllegalStateException을 던진다.** 보통은\r
merge 함수를 넣어 무마하지만 일부러 넣지 않았다 — 중복이 왔다는 건 "서버별\r
최신 1건" 쿼리가 깨졌다는 뜻이라, 조용히 덮는 것보다 크게 실패해서 로그에\r
드러나는 편이 낫다. 조회가 실패해도 화면은 떠야 하므로 model 속성 주입은\r
finally에서 빈 Map으로라도 보장했다.\r
\r
## 결과\r
\r
관리자 화면에서 메모리 탭 / 시스템(디스크) 탭으로 전 서버 현황을 실시간 조회할\r
수 있게 됐고, 4시간마다 수집된 데이터가 DB에 쌓이면서 월말 용량 보고는\r
"서버 들어가서 적어 오기"에서 "쌓인 데이터 정리"로 바뀌었다.\r
\r
## 배운 점\r
\r
- **라이브러리 선택 기준은 인지도가 아니라 대상 환경과의 호환성이다.** JSch는\r
  훌륭하지만 접속할 서버의 보안 정책과 맞지 않으면 소용이 없다. "무엇에\r
  붙는가"를 먼저 확인해야 한다.\r
- **개발자도 자기 코드가 지나가는 인프라 구간은 읽을 줄 알아야 한다.**\r
  sshd_config, 알고리즘 협상 로그, 마운트 구성, 망 분리 — 이번 기능의 실패\r
  원인과 파싱 조건은 전부 애플리케이션 코드 바깥에 있었다.\r
- **모니터링 코드는 감시 대상보다 튼튼해야 한다.** 전 단계 타임아웃, 명령 폴백,\r
  한 대 실패 시 계속 진행, 원본 예외 보존 — 장애 상황에 동작해야 하는 코드라서\r
  정상 경로보다 실패 경로에 더 많은 코드를 썼다.\r
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
발행 시스템(차세대) --Kafka Pub--> [토픽] --Sub--> GW 변환 --Redis--> 구독 파트 DB
                                                     (과금 / 청구 / 정산)
\`\`\`

용어를 정리하면 — **topic**은 메시지가 발행되고 소비되는 단위,
**payload**는 Producer가 토픽으로 보내는 메시지의 본문(body)이다. GW는
토픽을 구독해서 payload를 받아 변환하고, 중간 저장소(Redis)를 거쳐 구독
파트 DB에 반영한다.

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
   INSERT 누락 건은 같은 방식으로 INSERT 문을 만들었다.
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
   \`parallelStream()\`은 JVM 전역이 공유하는 \`ForkJoinPool.commonPool()\`을 사용한다. 여러 사용자가 동시에 대용량 조회를 요청하면 순간적으로 워커 스레드들이 HikariCP 커넥션을 한꺼번에 점유해, 다른 일반 API 요청까지 커넥션 대기 타임아웃에 빠뜨리거나 DB CPU 부하를 급증시킬 수 있다.
2. **트랜잭션 컨텍스트 전파 불가**:  
   Spring의 \`@Transactional\`은 \`ThreadLocal\` 기반이므로, \`parallelStream\`이 쪼갠 별도 워커 스레드에는 기존 트랜잭션 컨텍스트가 전파되지 않는다. 단순 조회(\`readOnly\`)였기에 동작했지만, 변경 작업이 섞인 로직이었다면 정합성 사고로 이어질 수 있는 구조다.

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

로 줄어든다(대상 키가 수천 건을 넘기면 1,000건 단위 청크로 나누어 배치 \`IN\` 조회하거나 페이지네이션으로 범위를 제한하면 된다). 결국 **"많은 쿼리를 동시에 빨리 날리는 것"보다 "애초에 날리는 쿼리 횟수를 줄이는 것"이 데이터베이스 성능 최적화의 정석**이다.

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
\`TABLE ACCESS (FULL)\`**이었다. 스칼라 서브쿼리는 기본적으로 본문 행마다
실행된다. 같은 입력값이 반복되면 Oracle이 결과를 캐싱해 주기도 하지만,
bill_no처럼 행마다 다른 키로 조회하는 경우에는 사실상 행 수만큼 실행된다.
청구 목록이 5천 건이면 payment 풀 스캔이 5천 번 가까이 돈다는 뜻이다.
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
컬럼에 함수가 걸리면 그 인덱스는 못 쓴다. **인덱스가 없어서가 아니라,
있어도 못 쓰는 조건**이었다.

지금 생각하면 아찔한 점이 하나 더 있다. \`TO_NUMBER(p.bill_no)\`는
payment에 숫자가 아닌 값이 한 건이라도 섞여 있으면 ORA-01722로 터진다.
느린 것보다 더 나쁜 사고가 잠복해 있던 셈이다.

## 개선 1 — 형변환을 정리하고, 힌트로 접근 경로를 고정

가공이 인덱스 컬럼이 아닌 본문 쪽에 가도록 변환 방향을 명시했다. 그리고
같은 사고가 재발하지 않도록 서브쿼리에 인덱스 힌트를 걸어 접근 경로를
고정했다.

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

힌트에 대한 생각도 분명히 해 둘 필요가 있다. **힌트는 원인을 찾은 뒤에
쓰는 고정 장치이지, 원인을 모른 채 쓰는 치료제가 아니다.** 이 케이스의
원인은 묵시적 형변환이었고, 그걸 고친 다음에 "통계나 데이터 분포가 변해도
옵티마이저가 이 경로를 벗어나지 않도록" 힌트로 고정한 것이다. 형변환을
그대로 둔 채 힌트만 걸었다면 인덱스를 탈 수 없으니 힌트는 무시됐을 것이다.

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
NULL이라 결과는 동일하다. \`LEADING\`/\`USE_HASH\`는 힌트가 없어도
옵티마이저가 대개 같은 계획을 골랐겠지만, 통계 변화로 플랜이 뒤집히지
않도록 고정해 둔 것이다.

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

\`PARALLEL(p 4)\`는 payment 스캔을 병렬 실행 서버 4개로 나누라는 지시다.
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
- **힌트는 진단 후의 고정 장치다.** 원인(형변환)을 고치고 나서 경로를
  고정하는 데 쓰면 유용하지만, 원인을 모른 채 걸면 무시되거나 다른 병목을
  가린다.
- **따라 쓴 것과 이해한 것을 구분해야 한다.** 기존 소스의 힌트 패턴과
  DBA 보고서는 훌륭한 출발점이었지만, "왜"를 설명하지 못한 채 따라 쓴
  부분(병렬도 같은)은 당시 실력의 한계였다. 한계를 인정하고 나서야
  플랜을 근거로 스스로 검증하는 습관이 생겼다.
`,b='---\r\ntitle: 포트폴리오 · 이력서 · 기술 블로그 정합성 및 개선사항 총점검 리포트\r\ndate: 2026-10-25\r\ntags: Review, Retrospective, Portfolio, Interview\r\nsummary: 시니어 테크 면접관 관점에서 현재 포트폴리오(profile.js, projects.js, About Me, 출력용 이력서)와 19편의 블로그 포스팅을 대조해 수정이 필요한 지점과 보완할 디테일을 정리한 체크리스트\r\n---\r\n\r\n현재 포트폴리오 사이트([`seulgae.github.io`](https://seulgae.github.io))의 **데이터 소스(`profile.js`, `projects.js`)**, **화면(`HomePage.jsx`, `ResumePage.jsx`)**, 그리고 **개별 기술 블로그 포스팅(`src/posts/*.md`)**을 시니어 테크 면접관 및 테크니컬 라이터 관점에서 교차 점검한 결과다.\r\n\r\n이 문서는 코드를 바로 고치기 전에 **"어디가 왜 부족한지, 면접관이 어떤 지점을 파고들 수 있는지, 어떻게 고쳐야 하는지"**를 한눈에 보고 결정하기 위한 작업 지시서다.\r\n\r\n---\r\n\r\n## 1. 한눈에 보는 핵심 수정 우선순위 (Top 6)\r\n\r\n| 순위 | 대상 파일 / 영역 | 현재 문제점 (부족한 부분) | 면접 리스크 및 개선 방향 |\r\n| --- | --- | --- | --- |\r\n| **1** | `src/data/projects.js`<br>(CloudXper 성과 1) | *"Java Parallel Stream을 **소스 전역 집계 로직에 적용**"*이라고 서술됨 | DB I/O에 `parallelStream`을 전역 적용했다는 표현은 커넥션 풀·`ForkJoinPool` 고갈 공격을 100% 부름. 블로그 원문처럼 **"파편화된 N+1 조회·조립 로직을 `ServiceImpl`로 통합하고 병렬 스트림으로 대기 시간 단축"**으로 정밀화 필요 |\r\n| **2** | `src/data/projects.js`<br>(빌링 GW 성과) | 블로그의 핵심 무기인 **Oracle 묵시적 형변환 쿼리 튜닝**과 **POI(`SXSSF`) 대용량 엑셀 개선**이 프로젝트 성과(`achievements`)에 빠져 있음 | 출력용 이력서(`/resume`)는 `projects.js`만 읽어 출력하므로, 종이 이력서를 보는 면접관은 지원자의 **Oracle 실행계획 튜닝 경험 자체를 모르고 지나침** |\r\n| **3** | `src/data/profile.js`<br>(자기소개 & 강점) | `intro` 문장과 `strengths[0]` 문장이 거의 똑같은 단어(*"임시 대응으로 끝내지 않고 재발 방지 구조와 자동화까지 연결"*)를 반복함 | 첫 화면과 이력서 최상단에서 같은 말을 두 번 연속 읽게 되어 밀도가 떨어짐. `strengths` 3줄을 **① DB/성능 ② 데이터 정합성/아키텍처 ③ 보안/운영 자동화**로 역할을 나눠야 함 |\r\n| **4** | `src/data/profile.js`<br>(기술 스택 & 링크) | 프로젝트 어디에도 없는 **`Thymeleaf`**가 기술 스택에 들어 있고, 정작 주력인 **`CUBRID`, `eGovFrame`, `Apache MINA SSHD`**가 빠져 있음. 블로그 링크도 구 티스토리로 연결됨 | *"Thymeleaf를 어디서 쓰셨나요?"*라는 질문에 불필요한 해명이 필요함. 안 쓴 기술은 빼고 실제 무기를 넣으며, 이력서 블로그 링크를 `seulgae.github.io/blog`로 통일 필요 |\r\n| **5** | `src/data/projects.js`<br>(전세사기 성과 5) | *"Markdown 기반 AI 유지보수 자동화 체계 구축 (30~40% 단축)"*의 기술적 실체가 모호함 | 다른 5개 성과에 비해 추상적이어서 "그냥 AI한테 물어봤다는 건가?"라는 오해를 살 수 있음. **어떤 도메인 컨텍스트(테이블 관계, 상태 코드, 망간 동기화 흐름)를 어떻게 표준화했는지** 구체화 필요 |\r\n| **6** | `src/posts/*.md`<br>(개별 블로그 본문) | 블로그 글과 `projects.js` 사이의 **수치 불일치** 일부 존재 (예: `csql` 패치 글에는 `384만 건` 구체 수치가 없고 "수백만 건"으로만 적힘, `redis` 글에는 `10초 → 0.10초` 수치가 없음) | 이력서에서 수치를 보고 블로그 원문을 클릭해 들어갔는데 정작 블로그 글에 그 수치가 없으면 신뢰도가 반감됨. 양쪽 수치 동기화 필요 |\r\n\r\n---\r\n\r\n## 2. 영역별 상세 분석 및 AS-IS → TO-BE 수정안\r\n\r\n### 2-1. 프로필 및 자기소개 (`src/data/profile.js`)\r\n\r\n#### ① 포지셔닝 라벨 (`SI / SM Developer`)\r\n- **현재(AS-IS)**:\r\n  - `badge: "SI / SM Developer"`\r\n  - `intro`: `"... SI / SM 중심의 백엔드 개발자입니다."`\r\n- **부족한 점**:\r\n  - 채용 담당자(특히 자체 서비스 기업·플랫폼 기업) 입장에서 `SI / SM`이라는 단어를 전면에 내세우면, 지원자가 가진 **쿼리 튜닝·데이터 정합성·아키텍처 리팩토링 역량**보다 \'단순 유지보수 인력\'이라는 선입견이 먼저 작동할 수 있다.\r\n- **개선안(TO-BE)**:\r\n  - `badge`를 **`"Backend · Operations & Performance"`** 등으로 변경하고, `intro`에서는 `"SI / SM 중심의"`라는 수식어 대신 **"엔터프라이즈 운영 환경의 병목과 불안정성을 데이터·실행계획·아키텍처 개선으로 해결해 온 백엔드 개발자"**로 정의한다.\r\n\r\n#### ② `intro`와 `strengths`의 중복 제거 및 MECE 재구성\r\n- **현재(AS-IS)**:\r\n  ```text\r\n  [intro] 운영 환경에서 발생하는 문제를 빠르게 수습하는 데서 끝내지 않고, 재발을 줄이는 구조 개선과 자동화까지 연결해온...\r\n  [strengths 1] 운영 이슈를 임시 대응으로 끝내지 않고, 재발 방지 구조와 자동화까지 연결합니다. (← intro와 중복)\r\n  [strengths 2] Spring Boot, Batch, REST API 기반 업무 시스템 개발과 운영 안정화 경험을 보유하고 있습니다. (← 평범한 나열)\r\n  [strengths 3] 모니터링, 로그 분석, 배치 자동화, 성능 개선을 통해 수치로 확인되는 결과를 만들어왔습니다.\r\n  ```\r\n- **개선안(TO-BE)**:\r\n  - `strengths` 3줄이 각각 **성능(DB/Cache)**, **정합성(Kafka/DML)**, **보안·품질(SAST/자동화)**을 대표하도록 구체화한다.\r\n  ```text\r\n  [strengths 1] 실행계획(EXPLAIN) 기반 인덱스 설계(53초→1초 미만)와 Redis 세션 동기화 캐싱(10초→0.1초) 등 근거 중심의 성능 최적화를 수행합니다.\r\n  [strengths 2] Kafka 도메인 GW의 업무키 매핑·대사 표준화(주간 오류 93% 감소)와 384만 건 무중단 분할 패치 등 운영 데이터 정합성을 끝까지 책임집니다.\r\n  [strengths 3] SAST 취약점 358건→4건 감축, 망간 동기화 정적 SQL 전환, SSH 기반 인프라 점검 자동화 등 레거시의 잠재 리스크를 구조적으로 제거합니다.\r\n  ```\r\n\r\n#### ③ 기술 스택(`techStack`) 정합성 및 링크 수정\r\n- **제거 권장**: `Thymeleaf` (3개 프로젝트 어디에도 사용 이력이 없음)\r\n- **추가 권장**:\r\n  - `Back-End`: `eGovFrame`, `JSP/JSTL`, `Apache MINA SSHD`\r\n  - `Data / Infra`: `CUBRID`\r\n- **링크 수정**: `links.blog`를 `"https://doltae.tistory.com/"`에서 **`"https://seulgae.github.io/blog"`**로 변경해 출력용 이력서에서도 현재 사이트의 20여 편 기술 블로그로 바로 유입되게 연결.\r\n\r\n---\r\n\r\n### 2-2. 프로젝트 경력 데이터 (`src/data/projects.js`)\r\n\r\n`projects.js`는 **메인 화면(`/`), 프로젝트 상세(`/projects/:slug`), 출력용 이력서(`/resume`) 세 곳 모두의 단일 출처(SSOT)**다. 여기서 표현이 모호하거나 과장되면 모든 화면과 이력서가 함께 영향을 받는다.\r\n\r\n#### ① CloudXper — `parallelStream` 서술의 정밀화 (면접 방어용)\r\n- **현재(AS-IS)**:\r\n  - `detail`: `"Java Parallel Stream 기반 병렬 처리 구조를 소스 전역 집계 로직에 적용하여 대용량 데이터 처리 성능 개선"`\r\n- **왜 고쳐야 하는가**:\r\n  - 실제로는 화면별로 복사돼 있던 `Map` 기반의 "목록 + 연관 리스트(N+1)" 조회 로직을 `ServiceImpl`로 모으고 거기에 `parallelStream`을 적용해 DB 대기 시간을 겹친 것이다. `"소스 전역 집계 로직에 적용"`이라고 쓰면 면접관이 *"DB I/O에 parallelStream을 전역으로 쓰면 공용 ForkJoinPool이 막히지 않나요?"*라고 바로 압박한다.\r\n- **개선안(TO-BE)**:\r\n  - `detail`: `"화면별로 파편화된 Map 기반 N+1 연관 조회 로직을 DTO·Model·ServiceImpl 계층으로 통합하고, 병렬 스트림을 적용해 순차 DB 왕복 대기 시간을 단축 (이후 쿼리 횟수 자체를 줄이는 집합 조회 방식으로 한계 복기)"`\r\n\r\n#### ② LG U+ 빌링 GW — 누락된 핵심 기술 성과(Oracle 튜닝 · POI) 반영\r\n- **현재(AS-IS)**:\r\n  - 성과 3개: ① Kafka 오류 70건→5건 미만 ② 이기종 DB 인코딩(`SUBSTRB`) 95% 감소 ③ 청구 도메인 요금·위약금 조회 API 신규 개발.\r\n  - 정작 블로그에서 가장 깊이 있게 다룬 **[Oracle 스칼라 서브쿼리 묵시적 형변환(`TO_NUMBER`) 실행계획 튜닝](/blog/oracle-hint-subquery-fullscan)**과 **[POI `XSSF` vs `SXSSF` 대용량 엑셀 다운로드 구현](/blog/sxssf-vs-xssf-excel-download)**이 `projects.js`에는 빠져 있다.\r\n- **개선안(TO-BE)**:\r\n  - 세 번째 성과를 보강하거나 네 번째 성과로 분리해, **종이 이력서(`/resume`)에도 Oracle 실행계획 튜닝과 대용량 스트리밍 엑셀 처리 경험이 명시**되도록 해야 한다.\r\n\r\n#### ③ 전세사기 피해자 지원관리 — AI 유지보수 자동화 항목의 구체화\r\n- **현재(AS-IS)**:\r\n  - `detail`: `"전세사기 도메인 업무를 Markdown 기반 템플릿으로 정형화하고 AI 활용 개발 프로세스를 적용하여 기능 개발 속도 및 업무 처리 효율 개선"`\r\n- **개선안(TO-BE)**:\r\n  - `"복잡한 전세사기 접수·심사 상태 흐름, 테이블 관계, 망간 동기화 규칙을 Markdown 컨텍스트 문서로 구조화하여, AI 기반 영향도 분석 및 오류 재현 시간을 30~40% 단축"`처럼 **무엇을 구조화했는지**를 명시한다.\r\n\r\n---\r\n\r\n### 2-3. 개별 기술 블로그 포스팅 (`src/posts/*.md`) 보완 포인트\r\n\r\n현재 19편의 블로그 원문은 솔직한 회고와 문제 해결 흐름이 매우 훌륭하지만, **이력서(`projects.js`)와 대조했을 때 숫자나 디테일이 살짝 비어 있는 5개 포스트**를 보강하면 완성도가 완벽해진다.\r\n\r\n#### ① [`csql-nohup-mass-patch.md`](/blog/csql-nohup-mass-patch)\r\n- **부족한 부분**:\r\n  - 이력서(`projects.js`)에는 **"행안부 연계 CI값 14만 건 · 개인정보 이력 로그 370만 건, 총 384만 건 암호화, Damo 솔루션"**이라고 구체적인 수치가 적혀 있는데, 정작 블로그 본문에는 `"수백만 건"`, `"암호화 솔루션 함수"`라고만 추상적으로 적혀 있다.\r\n- **보완할 내용**:\r\n  - 도입부와 결과 섹션에 **CI값 14만 건 + 개인정보 이력 로그 370만 건(총 384만 건)** 규모의 실체와, 왜 두 테이블의 성격(마스터성 테이블 vs 대량 이력 테이블)에 따라 분할 커밋이 더 중요했는지 한 문단만 보강하면 이력서와 완벽히 아귀가 맞는다.\r\n\r\n#### ② [`redis-permission-cache-ttl.md`](/blog/redis-permission-cache-ttl)\r\n- **부족한 부분**:\r\n  - 이력서에는 **"페이지 전환 및 렌더링 응답 속도 개선(10초 → 0.10초 이내), OAuth 인증·권한 정보"**라고 적혀 있으나, 블로그 본문에는 `"밀리초 미만으로 바뀌면서 화면 체감 렌더링이 눈에 띄게 빨라졌다"`라고만 되어 있고 **10초 → 0.10초**라는 정량 수치가 빠져 있다.\r\n- **보완할 내용**:\r\n  - 결과 섹션에 개선 전후 측정 수치(**10초 → 0.10초 이내**)를 명시하고, 추가로 면접 단골 질문인 **"로컬 캐시(Caffeine/Ehcache) 대신 왜 Redis 분산 캐시를 선택했는가(다중 인스턴스 환경에서 권한 변경 시 일관된 즉시 Evict 보장)"**를 2~3줄 덧붙이면 좋다.\r\n\r\n#### ③ [`dynamic-to-static-sync-query.md`](/blog/dynamic-to-static-sync-query)\r\n- **부족한 부분**:\r\n  - 이력서에는 **"9개 테이블·97개 컬럼 정적 SQL 분기 재설계, SQL Injection 14건 해소"**라고 되어 있는데, 블로그 본문에는 대상 규모(`9개 테이블·97개 컬럼`, `14건 해소`) 숫자가 빠져 있다.\r\n- **보완할 내용**:\r\n  - 본문의 정적 쿼리 전환 섹션에 **"연계 대상 9개 테이블(총 97개 컬럼)을 전수 조사해 정적 statement로 재작성했고, 국자원 웹 취약점 점검 기준 SQL Injection 14건을 모두 해소했다"**는 문장을 넣어 이력서 성과와 1:1로 일치시킨다.\r\n\r\n#### ④ [`kafka-gw-data-integrity.md`](/blog/kafka-gw-data-integrity)\r\n- **부족한 부분**:\r\n  - 이력서의 핵심 성과인 **"WhaTap 히트맵 기반 모니터링 및 대응 시나리오 매뉴얼화로 주간 Kafka 오류 70건 → 5건 미만(93% 감소)"**과 **"Oracle ↔ MySQL 인코딩 바이트 차이(`SUBSTRB`) 해결로 인코딩 오류 95% 감소"** 내용이 블로그 원문에서는 빠져 있거나 약하게 다뤄져 있다.\r\n- **보완할 내용**:\r\n  - 운영 대사(DI) 섹션에 **① WhaTap과 대사로 분류한 오류 4대 패턴(발행 누락, 순서 역전, 인코딩 `SUBSTRB` 길이 초과, 신규 컬럼 누락)**과 **② 이를 표준화해 주간 70건이던 오류를 5건 미만으로 줄인 결과**를 명시하면 블로그 글의 설득력이 배가된다.\r\n\r\n#### ⑤ [`oracle-hint-subquery-fullscan.md`](/blog/oracle-hint-subquery-fullscan)\r\n- **부족한 부분 (단순 편집 실수 발견)**:\r\n  - 본문 `## 원인 — 인덱스는 있는데 타지 않았다` 섹션 중간(75~87행 부근)에 **똑같은 문단(`Oracle은 VARCHAR2와 NUMBER를 비교할 때 암시적 형변환을 수행한다. 추측이 아니라 플랜에 증거가 있었다 — Orange 플랜 하단의 Predicate 정보에...`)이 두 번 연속 중복으로 적혀 있다.**\r\n- **보완할 내용**:\r\n  - 중복된 문단 하나를 깔끔하게 제거해 글의 완성도를 높인다.\r\n\r\n---\r\n\r\n### 2-4. 블로그 목록 노출 관리 (`interview-*` 포스트 분리 여부)\r\n\r\n- 현재 `src/posts/` 안에 면접 대비용으로 만든 3개의 요약 포스트(`interview-jeonse-support-system.md`, `interview-cloudxper-billing.md`, `interview-lgu-billing-gw.md`)가 들어 있다.\r\n- `src/lib/posts.js`는 `src/posts/*.md`의 모든 파일을 읽어 `/blog` 목록 최상단에 노출하므로, 만약 **인사담당자가 `/blog` 탭을 눌렀을 때 `\'면접 정리 1·2·3\'`이라는 제목이 보이는 것을 원치 않는다면**:\r\n  1. `posts.js`에서 `hidden: true` 프론트매터 옵션을 추가해 일반 `/blog` 목록에서는 숨기고, 본인이 직접 주소(`/blog/interview-...`)로 들어갈 때만 보이게 처리하거나,\r\n  2. 파일 제목을 `[면접 정리]` 대신 **`[프로젝트 회고] 전세사기 피해자 지원관리시스템 — 아키텍처 의사결정과 트러블슈팅 총정리`**처럼 인사담당자가 읽어도 자연스러운 **프로젝트 종합 회고록(Case Study)** 톤으로 바꾸는 방법 중 하나를 선택하면 된다.\r\n\r\n---\r\n\r\n## 3. 다음 작업 진행 체크리스트\r\n\r\n위 점검 항목 중에서 적용을 원하시는 번호를 알려주시면 바로 반영하겠습니다.\r\n\r\n- [ ] **작업 1**: `oracle-hint-subquery-fullscan.md`의 중복 문단 오타 제거 및 `csql`, `redis`, `dynamic-to-static`, `kafka-gw` 4개 블로그 본문에 이력서 정량 수치(`384만 건`, `10초→0.1초`, `9개 테이블·97개 컬럼`, `70건→5건 미만`) 보강\r\n- [ ] **작업 2**: `src/data/profile.js`의 중복 문장(`intro` vs `strengths`) 정리, 기술 스택(`Thymeleaf` 제거, `CUBRID`·`eGovFrame` 추가), 블로그 링크 통일\r\n- [ ] **작업 3**: `src/data/projects.js`의 CloudXper `parallelStream` 표현 정밀화, 빌링 GW에 Oracle/POI 성과 반영, 전세사기 AI 템플릿 설명 구체화\r\n- [ ] **작업 4**: `interview-*` 3개 포스트를 `/blog` 목록에서 숨김(`hidden: true`) 처리할지, 혹은 인사담당자도 볼 수 있는 `[프로젝트 종합 회고]` 타이틀로 다듬을지 결정\r\n',x=`---\r
title: 포트폴리오 사이트 구조 리팩터링 기록\r
date: 2026-08-11\r
tags: React, Refactoring\r
summary: 콘텐츠와 화면을 분리하고, 페이지 파일 복제를 단일 라우트로 통합한 과정 정리\r
---\r
\r
이 사이트를 만들고 1년 넘게 운영하면서 반복해서 겪은 문제가 있었다.\r
**경력 내용 하나를 고치려면 파일 여러 개를 같이 고쳐야 한다**는 점이다.\r
\r
## 문제\r
\r
- 프로젝트마다 \`Projects.jsx\`, \`Projects2.jsx\`, \`Projects3.jsx\`처럼 데이터 파일과\r
  페이지 파일을 복제해서 만들었다.\r
- 출력용 이력서(\`ResumePrint\`)에는 같은 경력 내용을 손으로 다시 타이핑해 두었다.\r
  그 결과 웹 화면과 이력서의 성과 문구가 서로 달라지는 일이 실제로 발생했다.\r
- 커밋 로그에 "경력기술서 현행화"가 반복해서 등장했다 — 같은 내용을 여러 곳에서\r
  맞추느라 생긴 비용이었다.\r
\r
## 개선\r
\r
핵심은 **단일 출처(single source of truth)** 원칙이었다.\r
\r
1. 콘텐츠를 전부 \`src/data/\`로 분리했다. 프로젝트, 교육, 수상, 자격, 프로필이\r
   각각 파일 하나씩이다.\r
2. 프로젝트 페이지 3개를 \`/projects/:slug\` 라우트 하나로 통합했다.\r
   이제 프로젝트를 추가하면 상세 페이지, 메뉴, 이력서에 자동 반영된다.\r
3. 이력서 페이지는 데이터를 다시 쓰지 않고, 각 성과의 \`result\` 필드를 그대로\r
   가져다 쓴다. 웹과 이력서가 어긋날 수 없는 구조다.\r
\r
\`\`\`text\r
변경 전: 콘텐츠 1건 수정 → 파일 6곳 편집\r
변경 후: 콘텐츠 1건 수정 → data/ 파일 1곳 편집\r
\`\`\`\r
\r
## 배운 점\r
\r
- 중복은 처음엔 빠르지만, 시간이 지날수록 "어느 쪽이 최신인지 모르는" 비용으로\r
  돌아온다. 운영 시스템에서 겪던 데이터 정합성 문제와 본질이 같았다.\r
- 구조를 고치기 전에 커밋 로그를 훑어보면 어디가 아픈지 보인다. 같은 종류의\r
  커밋 메시지가 반복되는 지점이 리팩터링 대상이었다.\r
`,S=`---
title: 화면마다 권한을 DB에 묻던 시스템 — Redis 캐시와 "세션과 같은 TTL"
date: 2025-01-07
tags: Java, Spring, Redis, Performance
summary: 셀렉트 박스 하나 그릴 때마다 권한 테이블을 조회하던 구조를 Redis 캐시로 바꾸고, TTL을 로그아웃(세션 만료) 시간과 일치시켜 정합성과 속도를 함께 잡은 기록
---

권한 관리가 화면 단위로 촘촘한 시스템이 있었다. OAuth 기반으로 로그인한 사용자라도
권한에 따라 **같은 화면의 셀렉트 박스에 보이는 항목이 달랐다** — 일반 사용자는 자기 부서·테넌트
코드만, 관리자는 전체 코드가 보이는 식이다. 문제는 이걸 구현한 방식이었다.

## AS-IS — 렌더링할 때마다 권한 테이블로

화면이 열릴 때마다, 셀렉트 박스가 그려질 때마다 서버는 DB의 권한 테이블을
조회했다.

\`\`\`java
// AS-IS — 화면 컨트롤러마다 반복되던 패턴
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
구조다. 답은 뻔했다 — 로그인해 있는 동안 이 사용자의 권한은 바뀌지 않는데,
왜 매번 묻는가.

## TO-BE — 로그인할 때 한 번 묻고, Redis에 올려두기

권한 데이터의 성질을 먼저 정리했다.

- **읽기는 매우 잦다** — 모든 화면 이동과 렌더링이 읽는다.
- **변경은 매우 드물다** — 관리자가 권한을 바꾸는 이벤트는 하루에 몇 번도 안 된다.
- **사용자별로 다르지만, 세션(토큰 유효 구간) 동안에는 같다.**

읽기 압도적 + 변경 희소 + 세션 단위 일관성 — 캐시에 딱 맞는 프로필이다.
이때 인메모리 로컬 캐시(Caffeine, Ehcache) 대신 **Redis 분산 캐시**를 선택했다.
다중 인스턴스 환경에서 로컬 캐시를 쓰면 관리자가 특정 사용자의 권한을 회수하거나
사용자가 로그아웃했을 때 다른 서버 메모리에 예전 권한이 남을 수 있지만, Redis를
단일 캐시 저장소로 두면 한 번의 Evict로 모든 인스턴스가 즉시 같은 상태를 바라보게
할 수 있기 때문이다.

로그인(인증) 시점에 권한을 조회해 Redis에 올리고, 이후 렌더링은 전부 캐시에서
읽도록 바꿨다.

\`\`\`java
// TO-BE — 권한 조회에 캐시를 씌운다
@Cacheable(value = "userPermissions", key = "#username + ':' + #codeGroup")
public List<CodeVO> getAllowedCodes(String username, String codeGroup) {
    return permissionDAO.selectAllowedCodes(username, codeGroup); // 캐시 미스일 때만 실행
}
\`\`\`

\`\`\`java
// Redis 캐시 설정 — TTL을 인증 만료 시간과 동일하게 동기화
@Bean
public RedisCacheManager cacheManager(RedisConnectionFactory factory) {
    RedisCacheConfiguration config = RedisCacheConfiguration.defaultCacheConfig()
            .entryTtl(Duration.ofMinutes(30))   // ← 세션/토큰 타임아웃과 같은 값
            .serializeValuesWith(SerializationPair.fromSerializer(
                    new GenericJackson2JsonRedisSerializer()));
    return RedisCacheManager.builder(factory)
            .withCacheConfiguration("userPermissions", config)
            .build();
}
\`\`\`

## 핵심 설계 — 왜 TTL을 로그아웃 시간과 맞췄나

이 작업에서 코드보다 중요한 게 TTL 값의 결정이었다. 캐시 TTL을
**세션·토큰 만료(로그아웃) 시간과 동일하게** 잡았는데, 이유는 이렇다.

- **TTL이 세션보다 길면**: 사용자가 로그아웃하고 권한이 변경된 뒤 재로그인해도
  낡은 권한이 캐시에 살아 있을 수 있다. 권한 데이터에서 이건 성능 문제가
  아니라 **보안 문제**다.
- **TTL이 세션보다 짧으면**: 로그인 중인 사용자의 캐시가 중간에 증발해
  다시 DB를 두드린다. 캐시 미스가 잦아져 효과가 반감된다.
- **TTL = 세션이면**: "한 세션 동안의 권한은 로그인 시점 기준으로 고정"이라는
  규칙이 된다. 이건 원래부터 이 시스템의 암묵적 동작이기도 했다 — 권한이
  바뀌어도 재로그인해야 반영되는 게 사용자에게도 자연스럽다. 캐시 수명을
  세션 수명에 정렬함으로써, **캐시가 만든 새로운 불일치가 하나도 없는**
  상태를 만들었다.

경계 이벤트도 같은 원칙으로 처리했다.

- **로그아웃**: 세션 무효화와 함께 해당 사용자의 캐시 키를 즉시 삭제
  (\`@CacheEvict\` / 로그아웃 핸들러에서 키 삭제). TTL이 남아 있어도 세션이
  끝나면 캐시도 끝난다.
- **관리자가 권한을 변경**: 대상 사용자의 캐시 키를 evict. 그 사용자는
  다음 요청(또는 재로그인)부터 새 권한을 받는다.

키는 \`userPermissions::{username}:{codeGroup}\` 형태로 잡아, 사용자 한 명의
권한만 정확히 지울 수 있게 했다. 전체 flush는 권한 체계 개편 같은 예외
상황에만 쓰는 것으로 정리했다.

## 결과

- 화면 하나를 그릴 때 나가던 권한 조인 쿼리 여러 건이 **로그인 후 첫 조회
  이후에는 0건**이 됐다. 권한 조회가 DB 다중 조인 왕복에서 Redis 메모리 조회로
  바뀌면서, 셀렉트 박스가 집중된 관리 화면 기준으로 **약 10초까지 지연되던 페이지
  전환·렌더링 응답 속도가 0.10초 이내**로 단축됐다.
- DB 입장에서는 접속자 수 × 화면 이동 수만큼 반복되던 동일 조인이
  사라졌다 — 캐시는 응답 속도만이 아니라 **DB의 여유**를 만드는 장치였다.

## 배운 점

- **캐시 설계의 절반은 TTL과 무효화 정책이다.** "Redis를 붙였다"가 아니라
  "캐시 수명을 무엇에 정렬했고, 어떤 이벤트에 지우는가"가 설계의 실체였다.
  권한처럼 민감한 데이터일수록 TTL은 성능 파라미터가 아니라 정합성 규칙이다.
- **캐시하기 좋은 데이터부터 골라야 한다.** 읽기 빈도, 변경 빈도, 일관성
  요구 수준을 먼저 따져보면 권한/코드성 데이터가 1순위로 나온다. 반대로
  실시간성이 필요한 데이터에 같은 패턴을 쓰면 사고가 된다.
- **기존 시스템의 암묵적 규칙을 명시적 규칙으로.** "권한 변경은 재로그인해야
  반영된다"는 원래 있던 동작을 TTL 정책으로 문서화한 셈이 됐다. 캐시를
  도입하면서 시스템의 동작 계약이 오히려 분명해졌다.
`,C=`---\r
title: XSSFWorkbook vs SXSSFWorkbook — 수작업 엑셀 업무를 기능으로 만들며 정리한 선택 기준\r
date: 2025-11-20\r
tags: Java, POI, Excel, Performance\r
summary: 운영자가 매번 DB를 조회해 손으로 만들던 추출 대장·통계 엑셀을 다운로드 기능으로 구현한 기록 — 건수에 따라 XSSF와 SXSSF를 가르는 기준과 스트리밍 방식의 함정들\r
---\r
\r
운영 업무 중에 정기적으로 반복되는 일이 있었다. 담당자가 DB를 직접 조회해서\r
결과를 복사하고, 엑셀에 붙여 넣고, 서식을 정리해서 보고용 대장과 주간 통계를\r
만드는 것. 조회 조건이 매번 비슷하고 산출물 양식이 정해져 있는데도 사람 손을\r
거치니 시간이 들고, 복사 과정에서 실수도 났다. 이걸 **관리자 화면에서 조회\r
조건을 걸고 버튼 한 번으로 내려받는 엑셀 다운로드 기능**으로 만들었다.\r
\r
구현 자체는 Apache POI로 하는 흔한 작업이다. 흔하지 않았던 건 데이터\r
규모였다 — 추출 대상이 **수만~수십만 행**이라, POI의 두 클래스\r
\`XSSFWorkbook\`과 \`SXSSFWorkbook\` 중 무엇을 쓰느냐가 기능의 생사를 갈랐다.\r
\r
## XSSF vs SXSSF — 차이의 본질은 "어디에 들고 있느냐"\r
\r
둘 다 .xlsx를 만든다. 차이는 **작성 중인 워크북을 어디에 유지하느냐**다.\r
\r
| | XSSFWorkbook | SXSSFWorkbook |\r
|---|---|---|\r
| 데이터 위치 | 전체를 **힙 메모리**(DOM)에 유지 | 최근 N행만 메모리, 나머지는 **디스크 임시파일**로 flush |\r
| 메모리 사용 | 행 수에 비례해 증가 | window 크기만큼 **일정** |\r
| 이미 쓴 행 접근 | 자유 (수정, 재조회 가능) | flush된 행은 **접근 불가** |\r
| autoSizeColumn | 자유 | 기본 불가 (컬럼 추적을 켜야 하고, 켜면 스트리밍 이점 상쇄) |\r
| 뒷정리 | close()만 | **dispose() 필수** (임시파일 삭제) |\r
| 적합 규모 | 수천~1만 행 내외 | 수만 행 이상 |\r
\r
XSSF는 셀 하나가 객체 하나다. 30개 컬럼 × 10만 행이면 셀 객체만 300만 개가\r
힙에 쌓인다. 스타일·문자열 캐시까지 더하면 수십만 행에서 힙이 수 GB로 치솟고,\r
운영 WAS처럼 힙이 제한된 환경에서는 **다운로드 버튼 하나가 OOM으로 서버를\r
쓰러뜨릴 수 있다.**\r
\r
SXSSF는 생성자에 준 window 크기만큼의 행만 메모리에 유지하고, 그보다 오래된\r
행은 디스크 임시파일에 순차 기록한다. 100만 행을 써도 메모리 사용량은\r
window만큼으로 일정하다. 대신 "이미 흘려보낸 행"으로는 돌아갈 수 없다 —\r
스트리밍이라는 이름 그대로다.\r
\r
## 건수별 선택 기준\r
\r
이 시스템에서는 다운로드를 두 종류로 이원화했다.\r
\r
- **일반 다운로드 (수백~수천 건)** — \`XSSFWorkbook\`. 목록 화면의 검색 결과\r
  내려받기 수준이면 메모리 부담이 없고, \`autoSizeColumn\` 같은 편의 기능을\r
  자유롭게 쓸 수 있어 산출물 품질을 챙기기 좋다.\r
- **대용량 추출 (수만 건 이상)** — \`SXSSFWorkbook\`. 전 건 추출 대장처럼\r
  행 수 상한을 예측할 수 없는 기능은 처음부터 스트리밍으로 갔다.\r
\r
기준을 한 줄로 줄이면 이렇다. **"최대 몇 행까지 커질 수 있는가"를 예측할 수\r
없다면 SXSSF다.** XSSF의 한계는 평균이 아니라 최악의 케이스에서 터지고,\r
운영 데이터는 언제나 예상보다 많아진다.\r
\r
## 구현 — 스트리밍을 무력화하는 함정들\r
\r
대용량 쪽 코드의 뼈대는 이렇다.\r
\r
\`\`\`java\r
// window 크기만큼만 메모리에 유지, 초과분은 디스크로\r
SXSSFWorkbook workbook = new SXSSFWorkbook(1000);\r
\r
try {\r
    SXSSFSheet sheet = workbook.createSheet(sheetName);\r
\r
    // (1) 스타일은 루프 밖에서 1회만 생성\r
    CellStyle headerStyle = defaultCellStyle(workbook.createCellStyle(), true);\r
    CellStyle bodyStyle   = defaultCellStyle(workbook.createCellStyle(), false);\r
\r
    // 헤더\r
    Row headerRow = sheet.createRow(rowNo++);\r
    for (int i = 0; i < headerFields.length; i++) {\r
        Cell cell = headerRow.createCell(i, CellType.STRING);\r
        cell.setCellValue(headerFields[i]);\r
        cell.setCellStyle(headerStyle);\r
    }\r
\r
    // (2) autoSizeColumn 대신 고정 컬럼 너비\r
    for (int i = 0; i < headerFields.length; i++) {\r
        sheet.setColumnWidth(i, FIXED_COLUMN_WIDTH);\r
    }\r
\r
    // 데이터 바인딩 — 행을 만들며 지나가면 window 밖 행은 디스크로 flush\r
    for (Map<String, String> rowData : dataList) {\r
        Row row = sheet.createRow(rowNo++);\r
        ...\r
    }\r
\r
    workbook.write(response.getOutputStream());\r
} finally {\r
    workbook.dispose();   // (3) 디스크 임시파일 삭제 — 잊으면 서버에 쌓인다\r
    workbook.close();\r
}\r
\`\`\`\r
\r
번호를 단 세 곳이 이번 구현에서 배운 함정들이다.\r
\r
**(1) CellStyle을 루프 안에서 만들면 안 된다.** 스타일은 셀이 아니라 워크북\r
소속이고, 워크북당 개수 제한(6만여 개)이 있다. 행마다 \`createCellStyle()\`을\r
호출하는 코드는 소량에서는 멀쩡하다가 대량에서 스타일 한도 초과로 깨진다.\r
헤더용/본문용 스타일을 **루프 밖에서 한 번만 만들어 재사용**했다.\r
\r
**(2) autoSizeColumn은 스트리밍의 적이다.** 컬럼 폭 자동 조절은 "그 컬럼의\r
모든 셀"을 봐야 하는 연산이다. SXSSF에서 쓰려면 전 컬럼 추적\r
(\`trackAllColumnsForAutoSizing\`)을 켜야 하는데, 그러면 flush한 행의 정보를\r
계속 들고 있어야 해서 **스트리밍으로 아낀 메모리를 도로 쓰는 꼴**이 된다.\r
대용량 쪽은 자동 조절을 포기하고 고정 너비로 갔다 — 산출물 양식이 정해져\r
있어서 가능한 트레이드오프였다.\r
\r
**(3) dispose()는 close()와 다르다.** SXSSF가 흘려보낸 행들은 서버 디스크의\r
임시파일에 있다. \`close()\`는 스트림을 닫을 뿐 이 파일을 지우지 않는다.\r
\`dispose()\`를 finally에서 호출하지 않으면 다운로드가 실행될 때마다\r
임시파일이 쌓여, 언젠가 디스크가 가득 찬다. 조용히 진행되는 종류의 장애라\r
코드 리뷰에서 반드시 잡아야 하는 지점이다.\r
\r
## 검증 — 힙 로그로 눈으로 확인하기\r
\r
"메모리가 일정하다"를 믿음이 아니라 측정으로 확인하고 싶어서, 개발 단계에\r
1,000행 처리마다 힙 사용량을 찍는 로깅을 넣고 대량 데이터로 돌려봤다.\r
\r
\`\`\`java\r
private void logHeap(String label) {\r
    Runtime rt = Runtime.getRuntime();\r
    long used = (rt.totalMemory() - rt.freeMemory()) / 1024 / 1024;\r
    logger.info("[HEAP] {} | used={}MB, max={}MB", label, used, rt.maxMemory() / 1024 / 1024);\r
}\r
\`\`\`\r
\r
XSSF로 대량을 쓰면 행 수에 비례해 used가 우상향하는 그래프가 나오고, SXSSF는\r
window 크기 수준에서 톱니 모양으로 일정하게 유지된다. 이 로그 덕에 "수십만\r
건이 와도 힙은 평평하다"를 확인하고 기능을 열 수 있었다.\r
\r
## 결과\r
\r
- 담당자가 DB 조회 → 복사 → 엑셀 서식 정리로 처리하던 정기 산출물(추출 대장\r
  2종, 주간 통계)이 **화면에서 조건 선택 후 버튼 한 번**으로 바뀌었다.\r
  건당 수십 분씩 걸리고 실수 여지가 있던 작업이 다운로드 대기 시간으로\r
  줄었다.\r
- 산출물 양식이 코드로 고정되면서 "만드는 사람에 따라 달라지는 엑셀"이\r
  사라졌다 — 자동화는 시간만이 아니라 일관성도 산출물이다.\r
\r
## 배운 점\r
\r
- **라이브러리의 클래스 선택이 곧 용량 설계다.** XSSF/SXSSF는 기능이 아니라\r
  메모리 모델이 다른 클래스다. "몇 건까지 감당해야 하는 기능인가"라는 질문\r
  없이 예제 코드를 복사하면, 소량 테스트를 통과하고 운영에서 터진다.\r
- **스트리밍의 대가는 되돌아갈 수 없다는 것.** autoSizeColumn 포기, flush된\r
  행 접근 불가, dispose 책임 — 메모리를 아끼는 방식에는 항상 교환 조건이\r
  있고, 그걸 알고 선택하는 것과 모르고 겪는 것은 다르다.\r
- **성능 주장은 로그로 증명한다.** 힙 로깅 몇 줄이 "아마 괜찮을 것"을\r
  "측정해서 평평한 것"으로 바꿔줬다. 대용량 기능은 열기 전에 최악 케이스를\r
  눈으로 봐야 한다.\r
`,w=Object.assign({"../posts/backend-code-convention-standardization.md":e,"../posts/csql-nohup-mass-patch.md":t,"../posts/cubrid-query-plan-index-tuning.md":n,"../posts/cwe-209-error-message-exposure.md":r,"../posts/cwe-330-489-dead-code-removal.md":i,"../posts/cwe-404-496-resource-handling.md":a,"../posts/cwe-476-null-dereference.md":o,"../posts/cwe-615-sensitive-comments.md":s,"../posts/cwe-676-dangerous-api.md":c,"../posts/cwe-754-exception-handling.md":l,"../posts/cwe-79-xss-remediation.md":u,"../posts/dynamic-to-static-sync-query.md":d,"../posts/how-to-write-posts.md":f,"../posts/interview-cloudxper-billing.md":p,"../posts/interview-jeonse-support-system.md":m,"../posts/interview-lgu-billing-gw.md":h,"../posts/jsch-to-mina-sshd.md":g,"../posts/kafka-gw-data-integrity.md":_,"../posts/mybatis-builder-parallel-refactoring.md":v,"../posts/oracle-hint-subquery-fullscan.md":y,"../posts/portfolio-blog-audit-report.md":b,"../posts/portfolio-refactoring.md":x,"../posts/redis-permission-cache-ttl.md":S,"../posts/sxssf-vs-xssf-excel-download.md":C}),T=[{groupId:`backend`,groupLabel:`Backend & Architecture`,subs:[{id:`spring-mybatis`,label:`Spring · 아키텍처`},{id:`kafka-di`,label:`Kafka · 데이터 정합성`}]},{groupId:`database`,groupLabel:`Database & Performance`,subs:[{id:`sql-tuning`,label:`SQL · 실행계획 튜닝`},{id:`redis-cache`,label:`Redis · 캐시 설계`}]},{groupId:`security-infra`,groupLabel:`Security & Infra`,subs:[{id:`sast-cwe`,label:`SAST · 시큐어코딩 (CWE)`},{id:`linux-ops`,label:`Linux · 운영 자동화`}]},{groupId:`retrospective`,groupLabel:`Retrospective & Notes`,subs:[{id:`project-review`,label:`프로젝트 심층 회고`},{id:`dev-notes`,label:`개발 기록 · 가이드`}]}];function E(e,t,n){if(n){for(let e of T)for(let t of e.subs)if(n.includes(t.id)||n.includes(t.label))return{groupId:e.groupId,groupLabel:e.groupLabel,subId:t.id,subLabel:t.label}}let r=e.toLowerCase(),i=new Set(t.map(e=>e.toLowerCase()));return r.startsWith(`cwe-`)||i.has(`sast`)?{groupId:`security-infra`,groupLabel:`Security & Infra`,subId:`sast-cwe`,subLabel:`SAST · 시큐어코딩 (CWE)`}:r.startsWith(`interview-`)||i.has(`interview`)||i.has(`review`)?{groupId:`retrospective`,groupLabel:`Retrospective & Notes`,subId:`project-review`,subLabel:`프로젝트 심층 회고`}:i.has(`guide`)||i.has(`react`)||i.has(`refactoring`)?{groupId:`retrospective`,groupLabel:`Retrospective & Notes`,subId:`dev-notes`,subLabel:`개발 기록 · 가이드`}:i.has(`kafka`)?{groupId:`backend`,groupLabel:`Backend & Architecture`,subId:`kafka-di`,subLabel:`Kafka · 데이터 정합성`}:i.has(`redis`)?{groupId:`database`,groupLabel:`Database & Performance`,subId:`redis-cache`,subLabel:`Redis · 캐시 설계`}:i.has(`sql`)&&i.has(`performance`)||i.has(`cubrid`)||i.has(`oracle`)?{groupId:`database`,groupLabel:`Database & Performance`,subId:`sql-tuning`,subLabel:`SQL · 실행계획 튜닝`}:i.has(`ssh`)||i.has(`linux`)||i.has(`infra`)?{groupId:`security-infra`,groupLabel:`Security & Infra`,subId:`linux-ops`,subLabel:`Linux · 운영 자동화`}:{groupId:`backend`,groupLabel:`Backend & Architecture`,subId:`spring-mybatis`,subLabel:`Spring · 아키텍처`}}function D(e){let t=e.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);if(!t)return{meta:{},body:e};let n={};return t[1].split(/\r?\n/).forEach(e=>{let t=e.indexOf(`:`);if(t===-1)return;let r=e.slice(0,t).trim(),i=e.slice(t+1).trim();r&&(n[r]=i)}),{meta:n,body:e.slice(t[0].length)}}function O(e,t){let n=e.split(`/`).pop().replace(/\.md$/,``),{meta:r,body:i}=D(t),a=r.tags?r.tags.split(`,`).map(e=>e.trim()).filter(Boolean):[],o=E(n,a,r.category);return{slug:n,title:r.title||n,date:r.date||``,tags:a,summary:r.summary||``,category:o,body:i}}var k=Object.entries(w).map(([e,t])=>O(e,t)).sort((e,t)=>t.date.localeCompare(e.date));function A(){return k}function j(e){return k.find(t=>t.slug===e)}function M(){let e=new Map;return k.forEach(t=>{t.tags.forEach(t=>e.set(t,(e.get(t)||0)+1))}),[...e.entries()].map(([e,t])=>({name:e,count:t})).sort((e,t)=>t.count-e.count||e.name.localeCompare(t.name))}function N(){return T.map(e=>{let t=e.subs.map(e=>{let t=k.filter(t=>t.category.subId===e.id).length;return{...e,count:t}}),n=t.reduce((e,t)=>e+t.count,0);return{groupId:e.groupId,groupLabel:e.groupLabel,count:n,subs:t}})}export{N as a,M as i,j as n,A as r,T as t};