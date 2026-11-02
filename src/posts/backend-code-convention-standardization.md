---
title: 4인 백엔드 팀의 제각각이던 selectList 코드 — 사원급에서 PDF 컨벤션을 만들어 표준화하기까지
date: 2024-12-12
tags: Java, Spring, MyBatis, Architecture
summary: PM을 겸임하던 팀장님을 대신해 사원급 정규직으로서 백엔드 실무 기준을 맡아, 4명이 각자 다른 스타일로 작성하던 List 자료형 기반 selectList 코드를 Request/Response DTO·Model·Builder 패턴으로 리팩토링하고 PDF 가이드로 표준화한 기록
---

클라우드 빌링 플랫폼 고도화 프로젝트에서는 **백엔드 개발자 4명**이 가입, 청구, 상품, 공통 조회 등의 도메인을 나누어 동시에 REST API를 개발하고 있었다.

당시 팀의 인력 구성에는 특수한 사정이 있었다. 백엔드 4명 중 **소속 정규직은 사원급이던 나 한 명**이었고, 나머지 분들은 프로젝트에 파견 투입된 **프리랜서 개발자분들**과 기존 레거시 **시스템 운영 위주로 경력을 쌓아 신규 API 개발 패턴에는 아직 익숙하지 않았던 선임 인력**으로 구성되어 있었다. 게다가 함께 방향을 잡아주시던 **팀장님은 프로젝트 PM 역할까지 대행**하시느라 전체 일정 조율과 대외 업무만으로도 여력이 없는 상황이었다.

결국 프로젝트가 끝난 뒤에도 남아서 이 코드를 계속 운영·유지보수해야 할 내부 인력으로서, **백엔드 실무 단에서는 사원급인 내게 사실상 PL(파트 리드)에 준하는 역할과 책임이 분담**되어 있었다. 가장 기본이 되는 단일 `selectList` 조회 API조차 4명의 코드 모양이 제각각으로 갈라지는 상황에서, 직접 패턴을 정립하고 **PDF 가이드 문서로 만들어 팀 회의에서 주도적으로 공유·통일했던 과정**을 기록해 둔다.

## 배경 — 서로 다른 배경의 4명, 네 가지 모양의 `selectList` 코드

당시 프로젝트는 Spring Boot 3.x와 MyBatis 기반이었는데, 각자 일해온 현장 스타일(빠른 진도 위주의 SI 프리랜서 방식, 기존 유지보수·운영 중심 방식 등)이 다르다 보니 합의된 패키지 규칙이나 객체 작성 표준이 없었다. 똑같이 MyBatis `selectList`로 `List<자료형>` 목록을 조회해 프론트엔드(React)로 내려주는 기능 하나를 만들어도 작성자마다 구조가 완전히 달랐다.

| 구분 | 현장에서 섞여 있던 작성 방식들 | 겪었던 문제 |
| --- | --- | --- |
| **계층 호출 및 패키지** | `Controller`에서 곧바로 `DAO.selectList()` 호출·가공 vs `Service` 인터페이스 경유 vs 구체 클래스 단독 사용, 도메인별 패키지 위치 불일치 | 비즈니스 로직과 트랜잭션이 걸리는 위치를 예측할 수 없고 파일 탐색이 어려움 |
| **`List<T>` 자료형 설계** | 요청 조건·DB 컬럼·응답 필드를 **단일 만능 VO 클래스 하나에 모두 몰아넣어** `List<VO>`로 공용 사용 vs 화면마다 비슷한 클래스(`ProductVO`, `ProductData` 등) 중복 생성 | 요청에 불필요한 응답·DB 필드까지 Swagger 입력창에 그대로 노출되고 변경 영향 범위 파악이 어려움 |
| **객체 생성·조립** | 기본 생성자(`new`) 후 `setter` 수십 줄 나열로 `List` 원소 복사·가공 | 불필요한 가변 상태 노출, 메서드마다 똑같은 `setter` 조립 코드가 반복되며 가독성 저하 |
| **입력값 검증 및 명명** | 컨트롤러 `if (vo.get...() == null)` 수동 분기 vs MyBatis XML `<if>`에만 의존, 메서드명(`get/select/find`) 혼용 | 필수 파라미터 누락 시 에러 응답 형태와 메서드 규칙이 API마다 달라짐 |

팀장님은 PM 업무로 바쁘시고 외부 투입 인력분들은 각자 익숙한 방식으로 빠르게 화면을 개발해 나가는 상황에서, 지금 기준을 세우지 않으면 프로젝트 종료 후 남겨진 코드를 유지보수할 때 감당하기 어려운 부채가 될 것이 분명했다.

## AS-IS — 표준 없는 단일 `selectList`가 만들던 비용

기존 코드에서 흔히 보이던 형태는 요청 파라미터부터 MyBatis `selectList` 결과, 최종 API 응답까지 **하나의 범용 데이터 클래스(`VO`/`DTO`)로 돌려쓰면서 컨트롤러나 서비스 곳곳에서 `setter`로 값을 덧씌우는 패턴**이었다.

```java
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
```

단건 API 하나만 놓고 보면 단순해 보이지만, 4명이 각기 다른 네이밍과 패키지 구조로 수십 개의 API를 만들자 세 가지 비용이 빠르게 불어났다.

1. **하나의 클래스가 비대해지고 API 계약이 흐려진다.**  
   검색 조건용 필드, DB 테이블 컬럼, 화면 전용 파생 필드가 `ProductVO` 하나에 계속 추가되다 보니, 프론트엔드가 보는 Swagger 문서에서는 조회 요청인데도 수십 개의 응답·내부 컬럼이 입력 파라미터처럼 함께 노출되었다.
2. **타인의 코드를 이어받아 수정하는 비용이 커진다.**  
   패키지 구조와 계층 역할이 개발자마다 달라 API 하나를 고치려면 컨트롤러에 가공 로직이 있는지, 어떤 `List<자료형>` 클래스가 실제 매퍼 XML과 연결되어 있는지부터 매번 추적해야 했다.
3. **객체 생성 코드 중복과 가독성 저하.**  
   조회한 `List`를 가공하거나 등록·수정 객체를 만들 때마다 `new` 생성 후 `setter`를 스무 줄씩 나열하는 보일러플레이트 코드가 도메인 전역에 복제되면서, 실제 중요한 비즈니스 조건이 필드 복사 코드 사이에 파묻혀 잘 읽히지 않았다.

## 먼저 코드로 증명하기 — 패키지 재정립과 Request/Response · Model · Builder 패턴화

아무리 백엔드 실무 책임이 내게 넘어와 있었다 해도, 직급상 사원급인 내가 연차가 높은 프리랜서·선임 개발자분들께 구두로만 "앞으로 이렇게 짜주세요"라고 요청하면 번거로운 규칙 강요로 느껴지기 쉬웠다. 특히 운영 업무 위주였던 동료분도 큰 어려움 없이 바로 따라 쓸 수 있으려면 **기준이 명확하면서도 예시 코드가 직관적**이어야 했다.

그래서 가이드를 만들기 전에 **내가 맡고 있던 가입·상품·공통 조회 API에 먼저 표준 구조를 적용해 동작하는 레퍼런스 코드부터 완성**했다. 핵심 기준은 세 가지였다.

### 1. 패키지 구조와 계층별 책임 고정

도메인마다 달랐던 디렉터리 구성을 재정립하고, 모든 모듈이 동일한 호출 흐름을 타도록 책임을 일원화했다.

```text
controller   : HTTP 요청 매핑, @Valid 입력 검증, 공통 응답 반환 (DAO 직접 호출 금지)
service      : 도메인 유스케이스 인터페이스 정의
service.impl : 비즈니스 규칙 처리, @Transactional 경계, List<Model> → List<ResponseDTO> 변환
dao          : 순수 MyBatis SQL(selectList, selectOne, insert, update) 실행
dto          : 외부 API 계약 전용 객체 (Request / Response 분리)
model        : DB 테이블 및 MyBatis 매퍼 결과와 1:1 대응하는 영속 계층 자료형
```

### 2. 만능 VO 지양 — `Request` · `Response` DTO와 `Model` 분리

데이터 객체를 하나의 공용 클래스로 통일해 돌려쓰지 않고, **모든 기능마다 요청(`Request`)과 응답(`Response`) DTO를 분리하고 MyBatis `selectList`가 반환하는 DB 매핑용 `Model`(`List<ProductModel>`)까지 별도로 두는 원칙**을 세웠다. 입력 검증(`@NotBlank`, `@NotNull`)이 필요한 요청 스펙과 화면 노출용 필드가 담기는 응답 스펙, 그리고 DB 컬럼 구조가 서로 영향을 주지 않게 하기 위해서였다.

### 3. 무분별한 `@Setter` 대신 `@Builder` 패턴 도입

빈 객체를 만들고 `setter`를 줄줄이 호출하던 방식을 걷어내고, **`@Builder` 패턴**으로 객체 생성과 리스트 원소 변환 방식을 통일했다. 이때 DB가 자동 생성하는 PK나 감사(Audit) 컬럼처럼 외부에서 임의로 덮어쓰면 안 되는 필드는 빌더 대상에서 제외해 오용 가능성을 줄였다.

```java
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
```

```java
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
```

이렇게 정리하자 컨트롤러는 서너 줄로 얇아졌고, Swagger 문서에는 해당 API에 실제로 필요한 요청 파라미터와 응답 필드만 깔끔하게 분리되어 나타났다.

## PDF 가이드 제작과 팀 회의 공유 — 사원급 PL 역할로서 합의를 이끌어내기까지

레퍼런스 리팩토링을 마친 뒤, 함께 일하는 프리랜서 개발자분들과 신규 개발 패턴이 낯선 선임 동료분까지 내 소스를 일일이 찾아보지 않고도 옆에 띄워두고 그대로 작성할 수 있도록 **핵심 규칙과 예제를 압축한 PDF 컨벤션 가이드**를 직접 제작했다.

추상적인 원칙 나열 대신 실무에서 바로 복사해 참고할 수 있는 구성으로 채웠다.

- **표준 패키지 트리 및 클래스 네이밍 규칙** (`controller`, `service`, `service.impl`, `dao`, `dto`, `model` 위치와 `Request`/`Response` 명명 기준)
- **단일 `selectList` / 단건 조회 / 등록·수정 Before → After 비교 코드** (단일 VO + `setter` 나열 구조를 `List<Model>` → `List<ResponseDTO>` + `@Builder`로 전환하는 실전 템플릿)
- **검증·예외·어노테이션 기준** (`@Valid` 적용 위치, 무분별한 `@Setter` 지양 이유, 생성자 레벨 `@Builder` 권장 패턴)

준비한 PDF 파일을 들고 팀 회의 시간에 발표를 요청해 백엔드 개발자 전원에게 공유했다. PM 업무까지 도맡아 분주하셨던 팀장님께도 백엔드 코드 품질 기준을 대신 챙겨 정리해 간 결과물이 되었고, 연차가 높은 외부·선임 개발자분들 앞에서는 사원급으로서 조심스러우면서도 꽤 당돌한 제안이었다.

그래서 발표의 초점을 **"누구의 방식이 맞고 틀리다"가 아니라 "배경이 다른 우리가 서로의 코드를 5분 안에 읽고 교차 수정할 수 있도록 틀을 맞추자"**에 두었다. 말로만 규칙을 요구한 것이 아니라 실제 동작하는 템플릿 코드와 한눈에 들어오는 PDF 가이드를 함께 제시해 전환 허들을 낮추자, 동료분들 모두 열린 마음으로 제안을 받아들여 주셨다.

특히 정말 다행이고 감사했던 점은, **내가 사원급으로서 기술 역량이나 경험 면에서 미처 챙기지 못했던 부분들을 함께 일하던 고년차 프리랜서 개발자분들께서 적극적으로 도와주시고 실무 가이드를 보태주셨다는 것**이다. 내가 내부 정규직으로서 프로젝트의 패키지 구조와 컨벤션 초안을 잡아 오면, 고년차 분들께서는 현업에서 겪어본 예외 처리 노하우나 복잡한 쿼리·트랜잭션 경계에서 주의할 점들을 짚어주시며 기준을 훨씬 단단하게 다듬어 주셨다. 어느 한 사람이 일방적으로 끌고 간 것이 아니라, 서로의 강점을 보태어 다 같이 좋은 결과를 만들어낼 수 있었다.

## 결과

- **4인 백엔드 코드베이스 일원화 및 온보딩·적응 시간 단축**: 이후 작성되는 단일 `selectList` 조회부터 신규 도메인 API까지 모두 동일한 패키지 계층과 `Request/Response DTO · Model · @Builder` 구조를 따르게 되었다. 외부 투입 인력이나 기존 운영 중심이던 동료분도 PDF 템플릿을 보며 일관된 품질로 API를 작성할 수 있게 되었고, 도메인 간 교차 수정 및 온보딩 시간이 눈에 띄게 줄었다.
- **객체 생성 중복 제거 및 프론트엔드 협업 효율 향상**: 메서드마다 길게 늘어지던 `setter` 나열 코드가 `@Builder`와 정적 변환 메서드로 일원화되어 코드 가독성과 유지보수성이 크게 높아졌다. 또한 만능 VO 대신 요청과 응답 DTO가 분리되면서 Swagger 명세가 정확해져 프론트엔드와의 필드 확인 커뮤니케이션 비용도 눈에 띄게 줄었다.
- **후속 성능 개선의 발판 마련**: 화면별로 흩어져 있던 조회·조립 코드를 `ServiceImpl`과 명확한 `List<Model>` / `List<DTO>` 구조로 정돈해 둔 덕분에, 뒤이어 터진 [100만 건 대용량 조회 성능 병목 개선 작업](/blog/mybatis-builder-parallel-refactoring)에서도 컨트롤러 곳곳을 헤매지 않고 서비스 계층에서 신속하게 병렬 처리를 적용할 수 있었다.

## 한계 회고 — 지금 다시 한다면

당시 실무 기준을 세우며 직접 부딪혔던 고민과 지금 시점에서 돌아보는 개선점도 분명히 남아 있다.

1. **모든 기능마다 예외 없이 `Request`와 `Response`를 분리했던 선택에 대하여**  
   기존처럼 만능 VO 하나로 통일해 돌려쓰는 문제를 막고자, 당시에는 검색 조건이 한두 개뿐인 단순 `selectList`부터 등록·수정까지 모든 기능마다 `Request`와 `Response` 클래스를 전부 별도로 분리해 개발했다. 작업을 하면서도 *"필드가 비슷한 단순 API까지 클래스를 매번 따로 만드는 게 과연 맞는 걸까, 파일 수만 너무 늘어나는 건 아닐까?"* 하는 고민이 계속 따라다녔다.  
   지금 돌아보면 **요청과 응답을 하나로 통일하지 않고 분리한 방향 자체는 옳았다.** 초기에는 같아 보이던 스펙도 요구사항이 붙기 시작하면 요청 쪽에는 검색 조건·검증 규칙(`@Valid`)이, 응답 쪽에는 상태명·마스킹 같은 파생 필드가 각각 다르게 추가되기 때문이다. 다만 모든 DTO를 개별 최상위 `.java` 파일로 만들다 보니 패키지 내 파일 개수가 급증했던 점은 아쉬움으로 남는다. 지금 다시 설계한다면 분리 원칙은 지키되, 도메인 단위 클래스 내부에 `static` 중첩 클래스나 Java `record`(`ProductDto.SearchRequest`, `ProductDto.Response`)로 묶어 파일 파편화를 줄이고, 가공이 전혀 없는 순수 조회에 한해서는 MyBatis 매퍼가 조회 전용 `Response` DTO로 바로 매핑되게 해 불필요한 변환 보일러플레이트를 덜어냈을 것이다.
2. **정량적 품질 좌표 기록과 CI 파이프라인 자동 검증의 부재**  
   당시에는 일정 안에서 팀 전체의 코드 모양을 맞추고 가독성·유지보수성을 끌어올리는 데 집중하느라, 리팩토링 전후의 코드 중복률이나 복잡도를 SonarQube 같은 정적 분석 지표로 정량 측정해 기준 좌표로 남겨두지 못했다. 또한 PDF 가이드는 초기 합의에는 큰 힘을 발휘했지만 바쁜 일정 속에서는 사람이 눈으로 지키는 규칙이 다시 느슨해질 여지가 있었다. 지금 다시 한다면 전환 전후의 정적 분석 수치를 먼저 기록해 개선 폭을 객관적으로 증명하고, 합의된 규칙을 `ArchUnit` 테스트(*"Controller는 DAO를 직접 호출하지 않는다"*, *"Controller는 영속 계층의 Model을 외부로 직접 반환하지 않는다"*)나 Checkstyle로 코드화해 GitLab·Jenkins 빌드 단계에서 자동 검증되게 구성했을 것이다.

## 배운 점

- **역할은 직급이 아니라 '누가 이 코드의 내일을 책임지는가'에서 나온다.**  
  팀장님이 PM 역할까지 겸임하며 바쁘신 상황에서 사원급 정규직이던 내가 백엔드 실무 기준의 초안을 잡아야 했는데, 부담스럽더라도 먼저 움직여 틀을 제안한 덕분에 프로젝트 후반부의 유지보수 비용을 크게 아낄 수 있었다.
- **표준화는 혼자 완성하는 영웅담이 아니라 '서로의 빈곳을 채우는 협업'이다.**  
  신규 패턴이 낯선 동료를 위해서는 바로 참고할 수 있는 PDF 예제 템플릿으로 장벽을 낮추고, 사원급이던 내게 부족했던 기술적 깊이들은 고년차 프리랜서 분들의 조언과 가이드로 채워 넣었기에 백엔드 4명 모두가 만족하는 좋은 결과로 이어질 수 있었다.
