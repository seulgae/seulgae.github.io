---
title: 10분짜리 API를 1분 15초로 — 100만 건에서 드러난 N+1과 MyBatis 구조 리팩토링
date: 2024-11-27
tags: Java, Spring, MyBatis, Performance
summary: 1만 건에서는 드러나지 않던 목록 + 연관 리스트 조회의 N+1 문제가 100만 건 테스트 데이터에서 10분짜리 API가 된 사건 — 흩어진 Map 기반 로직을 계층화하고 병렬 처리로 응답 시간을 줄인 뒤, 그 해결의 한계까지 돌아본 기록
---

이전에 참여했던 프로젝트에서 겪은 일이다. 화면에서 도메인 목록을 조회하면
**각 항목에 연관된 상세 리스트**(예: 서비스 목록 → 서비스별 상품 구성)를
함께 붙여 내려주는 API가 있었다.

개발 단계에서는 별다른 문제가 없었다. 테스트 데이터가 **1만 건** 수준이었기
때문이다. 그러다 성능 검증을 위해 **100만 건 규모의 테스트 데이터**를
구성했고, 같은 API의 응답 시간이 **10분**까지 치솟았다.

화면이 느린 정도가 아니라 타임아웃과 싸워야 하는 수준이었다.

문제는 이 API 하나로 끝나지 않았다. 같은 "목록 + 연관 리스트" 조회 패턴이
**화면별로 복사되어 여러 곳에 분산**돼 있었다. 서비스 화면, 상품 화면,
청구 화면이 각자의 컨트롤러와 DAO에 비슷한 로직을 따로 들고 있었기 때문에
한 곳을 고쳐도 다른 화면은 그대로였다.

성능 문제와 구조 문제가 동시에 드러난 상황이었다.

## 왜 당시에는 DB보다 애플리케이션을 먼저 손댔나

이전 운영 경험은 Oracle 기반이었다. Oracle에서는 실행계획을 확인하고
인덱스 접근 경로와 힌트를 살펴보며 쿼리를 튜닝한 경험이 있었다.

하지만 이 프로젝트의 DB는 **MySQL**이었다.

물론 MySQL에도 `EXPLAIN`, 인덱스 설계, 옵티마이저 힌트 등 성능을 분석할
방법이 있다. 다만 당시의 나는 MySQL 실행계획과 옵티마이저에 익숙하지
않았다.

그래서 낯선 DB에서 근거 없이 힌트부터 적용하기보다 우선
**내가 구조와 동작을 명확하게 통제할 수 있는 애플리케이션 계층부터
정리하자**고 판단했다.

지금 돌아보면 절반은 맞고 절반은 부족한 판단이었다.

애플리케이션 구조를 정리한 것은 필요했지만, 성능 문제라면 동시에
`EXPLAIN`으로 실제 SQL의 접근 경로를 확인했어야 했다. 이 부분은 작업이
끝난 뒤 가장 크게 남은 아쉬움이었다.

## AS-IS — Map과 N+1이 화면마다 흩어져 있었다

성능 이야기 전에 기존 구조부터 봐야 한다.

일부 코드는 컨트롤러가 DAO를 직접 호출하고 있었고, DB에서 조회한
`Map<String, Object>`가 **별도의 모델링 없이 컨트롤러와 화면까지
그대로 전달**되고 있었다.

요청 파라미터도 Map, 조회 결과도 Map, 응답도 Map이었다.

```java
// AS-IS
public List<Map<String, Object>> getServiceList(Long customerId) {
    Map<String, Object> param = new HashMap<>();
    param.put("customerId", customerId);

    // 1. 서비스 목록 조회
    List<Map<String, Object>> services =
            serviceDAO.selectServiceList(param);

    for (Map<String, Object> service : services) {
        // 2. 서비스마다 연관 상품을 다시 조회
        Map<String, Object> productParam = new HashMap<>();
        productParam.put("serviceId", service.get("ID"));

        List<Map<String, Object>> products =
                serviceDAO.selectProductList(productParam);

        // 3. 조회 결과 Map에 다시 연관 데이터를 추가
        service.put("products", products);
    }

    return services;
}
```

이 코드에서 성능상 가장 큰 문제는 단순히 `for`문이 있다는 것이 아니었다.

```text
서비스 목록 조회           1회
서비스 1의 상품 목록 조회   1회
서비스 2의 상품 목록 조회   1회
서비스 3의 상품 목록 조회   1회
...
```

부모 목록이 N건이면 연관 데이터를 가져오기 위한 쿼리도 N번 추가되는
전형적인 **N+1 형태**였다.

조회 대상이 적을 때는 문제가 잘 드러나지 않았다. 하지만 부모 목록의
건수가 커지면서 DB 왕복 횟수도 함께 증가했고, 각 조회가 순차적으로
실행되면서 전체 응답 시간이 누적됐다.

구조적인 문제도 있었다.

**타입이 없었다.**  
Map은 어떤 키를 가져야 하는지 컴파일러가 알지 못한다. `"ID"`를 `"id"`로
잘못 적어도 컴파일 오류가 발생하지 않고 런타임에서 `null`로 드러난다.

**검증 위치가 제각각이었다.**  
필수값이나 길이 검증이 필요한 화면마다 `if`문이 흩어져 있었다.

**같은 로직이 복제돼 있었다.**  
같은 도메인 목록을 다루면서도 화면마다 코드 모양이 달랐고, 수정 요청이
들어오면 어느 화면의 어느 사본을 고쳐야 하는지부터 찾아야 했다.

성능만 고쳐서는 같은 문제가 다시 생길 수 있는 구조였다.

## TO-BE — 먼저 계층을 다시 세웠다

그래서 성능 코드를 바로 건드리기보다 애플리케이션의 역할을 먼저 나눴다.

```text
Controller
    ↓
Service
    ↓
ServiceImpl
    ↓
DAO
```

그리고 계층 사이에 전달되는 객체도 역할에 따라 구분했다.

```text
Controller   : HTTP 요청과 응답 처리
Service      : 비즈니스 기능의 계약
ServiceImpl  : 비즈니스 규칙, 트랜잭션, 데이터 조립
DTO          : API 입출력 객체
Model(VO)    : DB 매핑 객체
DAO          : MyBatis를 통한 DB 접근
```

화면별로 흩어져 있던 "목록 조회 + 연관 데이터 조립" 로직은
**ServiceImpl 한 곳으로 모았다.**

화면 A와 화면 B가 같은 도메인 데이터를 필요로 한다면 각각 로직을
복사하는 대신 같은 Service 계약을 호출하도록 정리했다.

### DTO — Map 대신 API의 계약을 코드로

```java
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ServiceDTO {

    private Long id;

    @NotNull(message = "고객 ID는 필수입니다.")
    private Long customerId;

    @NotBlank(message = "서비스명은 필수 입력 항목입니다.")
    @Size(max = 100, message = "서비스명은 100자 이내로 입력해주세요.")
    private String serviceName;

    private String status;
    private LocalDateTime createdAt;
    private List<ProductDTO> products;
}
```

Map으로 전달하던 값을 DTO로 바꾸면서 API가 어떤 값을 주고받는지
클래스 선언만으로 확인할 수 있게 됐다.

필수값과 길이 검증도 `@NotNull`, `@NotBlank`, `@Size` 같은 Bean Validation
애노테이션으로 DTO에 모았다.

```java
@PostMapping
public ResponseEntity<ServiceDTO> createService(
        @Valid @RequestBody ServiceDTO dto,
        Principal principal) {
    ...
}
```

컨트롤러에서는 `@Valid`를 통해 입력 검증을 요청하고, 실제 비즈니스
처리는 Service에 위임하도록 역할을 나눴다.

당시에는 하나의 DTO를 생성·수정·응답에 함께 사용하는 형태까지 정리했다.
지금 다시 설계한다면 여기서 한 단계 더 나아가
`CreateRequest`, `UpdateRequest`, `Response`처럼 역할별 DTO를 분리할
것이다.

생성과 수정에서 필요한 필드가 다르고, 응답에만 필요한 필드도 있기 때문이다.

### Model(VO) — DB 계층 전용, 애플리케이션 생성은 Builder로

```java
@Getter
public class ServiceItem {

    private Long id;
    private Long customerId;
    private String serviceName;
    private String status;
    private LocalDateTime createdAt;

    @Builder
    public ServiceItem(
            Long customerId,
            String serviceName,
            String status) {
        this.customerId = customerId;
        this.serviceName = serviceName;
        this.status = status;
    }

    public void changeStatus(String status) {
        this.status = status;
    }
}
```

DB 매핑 객체와 API DTO도 분리했다.

조회 결과는 MyBatis 매핑을 통해 `ServiceItem`으로 받고,
애플리케이션에서 저장용 객체를 생성할 때는 Builder를 사용했다.

여기서 의도적으로 Builder의 생성 대상에서 `id`와 `createdAt`을 제외했다.

```text
id          → DB가 생성
createdAt   → INSERT 시점에 DB가 생성
```

DB가 책임지는 값을 애플리케이션 코드에서 임의로 만들어 넣지 못하도록
객체 생성 경계를 좁힌 것이다.

setter도 전부 열어두지 않았다.

```java
item.setStatus("ACTIVE");
```

대신

```java
item.changeStatus("ACTIVE");
```

처럼 변경 의도를 메서드 이름으로 드러내도록 했다.

엄밀히 말하면 `ServiceItem` 자체가 완전한 불변 객체인 것은 아니다.
상태 변경 메서드가 존재하기 때문이다.

다만 Map과 setter를 여기저기 전달하던 이전 구조보다 **어디에서 어떤
상태 변경이 가능한지 범위를 좁히는 것**이 목적이었다.

### Service / ServiceImpl — 비즈니스 로직을 한곳으로

```java
public interface ServiceManagementService {

    ServiceDTO createService(ServiceDTO dto, String username);

    List<ServiceDTO> getServices(Long customerId);

    ServiceDTO updateService(
            Long id,
            ServiceDTO dto,
            String username);

    void deleteService(Long id, String username);
}
```

```java
@Service
@RequiredArgsConstructor
public class ServiceManagementServiceImpl
        implements ServiceManagementService {

    private final ServiceDAO serviceDAO;

    @Override
    @Transactional
    public ServiceDTO createService(
            ServiceDTO dto,
            String username) {

        ServiceItem item = ServiceItem.builder()
                .customerId(dto.getCustomerId())
                .serviceName(dto.getServiceName())
                .status("ACTIVE")
                .build();

        serviceDAO.insertService(item);

        return toDTO(item);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ServiceDTO> getServices(Long customerId) {

        List<ServiceItem> services =
                serviceDAO.selectServices(customerId);

        return services.parallelStream()
                .map(service -> {
                    List<ProductDTO> products =
                            serviceDAO
                                .selectProducts(service.getId())
                                .stream()
                                .map(this::toDTO)
                                .collect(Collectors.toList());

                    return toDTO(service, products);
                })
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ServiceDTO updateService(
            Long id,
            ServiceDTO dto,
            String username) {

        ServiceItem item = serviceDAO.selectService(id);

        if (item == null) {
            throw new IllegalArgumentException(
                    "존재하지 않는 서비스입니다.");
        }

        item.changeStatus(dto.getStatus());
        serviceDAO.updateService(item);

        return toDTO(item);
    }

    ...
}
```

화면마다 흩어져 있던 존재 여부 확인, 상태 검증, 데이터 조립과
트랜잭션 경계를 ServiceImpl로 모았다.

AS-IS에서는 어떤 화면은 검증하고 어떤 화면은 검증하지 않는 식으로
동일한 도메인 규칙조차 구현 위치에 따라 달라지는 경우가 있었다.

계층을 정리하면서 적어도 같은 기능은 같은 서비스 경로를 통하도록 만들었다.

### Controller — HTTP 처리만 남겼다

```java
@Slf4j
@RestController
@RequestMapping("/api/services")
@RequiredArgsConstructor
public class ServiceController {

    private final ServiceManagementService serviceService;

    @PostMapping
    public ResponseEntity<ServiceDTO> createService(
            @Valid @RequestBody ServiceDTO dto,
            Principal principal) {

        ServiceDTO created =
                serviceService.createService(
                        dto,
                        principal.getName());

        return new ResponseEntity<>(
                created,
                HttpStatus.CREATED);
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<ServiceDTO>> getServices(
            @PathVariable Long customerId) {

        return ResponseEntity.ok(
                serviceService.getServices(customerId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteService(
            @PathVariable Long id,
            Principal principal) {

        serviceService.deleteService(
                id,
                principal.getName());

        return ResponseEntity.noContent().build();
    }
}
```

컨트롤러에서는 HTTP 요청을 받고 검증을 시작한 뒤 Service를 호출하고,
그 결과를 HTTP 응답으로 변환하는 역할만 남겼다.

비즈니스 규칙이나 DAO 호출이 컨트롤러까지 올라오지 않도록 경계를 정리했다.

## 당시 성능 개선 — N+1을 없앤 것이 아니라 동시에 처리했다

구조를 정리한 뒤 실제 성능 개선에 들어갔다.

당시 적용한 방법은 기존의 순차 루프를 `parallelStream()`으로 바꾸는
것이었다.

AS-IS에서는 다음 조회가 순차적으로 진행됐다.

```text
상품 조회 1 → 완료
상품 조회 2 → 완료
상품 조회 3 → 완료
상품 조회 4 → 완료
...
```

이를 병렬 스트림으로 변경하면서 여러 항목의 연관 데이터 조회가
동시에 진행될 수 있게 했다.

```java
services.parallelStream()
        .map(service -> {
            List<ProductDTO> products =
                    serviceDAO
                        .selectProducts(service.getId())
                        .stream()
                        .map(this::toDTO)
                        .collect(Collectors.toList());

            return toDTO(service, products);
        })
        .collect(Collectors.toList());
```

여기서 정확히 구분해야 할 것이 있다.

**N+1을 제거한 것은 아니다.**

부모 데이터가 N건이면 연관 데이터를 조회하는 SQL도 여전히 N번 발생한다.
달라진 것은 이 SQL들이 순차적으로 끝나기를 기다리지 않고 일부 요청을
겹쳐 처리했다는 점이다.

즉,

```text
쿼리 횟수 감소        X
쿼리 대기 시간 중첩   O
```

에 가까운 개선이었다.

`parallelStream()` 역시 단순히 "CPU 코어 수만큼 정확하게 실행된다"고
설명할 수 있는 기능은 아니다. 기본적으로 공용 ForkJoinPool을 사용하며
실제 병렬 실행 정도는 실행 환경의 영향을 받는다.

더구나 이 로직은 CPU 계산보다 **DB I/O 비중이 높은 작업**이었다.

따라서 성능 개선 폭은 Java의 병렬 처리만으로 결정되는 것이 아니라
DB가 동시에 처리할 수 있는 요청 수, 애플리케이션의 커넥션 풀 크기,
DB 서버 자원 상태에도 영향을 받는다.

또 하나 뒤늦게 중요하게 본 부분은 트랜잭션 경계다.

Spring의 트랜잭션 컨텍스트는 기본적으로 실행 스레드에 연결되므로,
메서드에 선언된 `@Transactional(readOnly = true)`가
`parallelStream()`의 각 worker thread에 그대로 전파된다고 가정해서는
안 된다.

당시에는 이러한 부분까지 세밀하게 설계한 것이 아니라
**기존 N+1 구조의 대기 시간을 줄이기 위한 현실적인 개선책으로
병렬 스트림을 적용**했다.

별도의 Executor와 동시성 제한을 두는 방식에 비해 제어 수준이 낮았다는
점도 지금 보면 분명한 한계다.

그럼에도 동일한 테스트 조건에서 Swagger로 반복 확인했을 때
응답 시간은 다음과 같이 줄었다.

```text
AS-IS    약 10분
TO-BE    약 1분 15초
```

당시 목표였던 응답 시간 단축은 달성했다.

다만 이 숫자가 **N+1 문제가 해결됐다는 의미는 아니었다.**

## 지금 다시 한다면 — 쿼리 횟수부터 줄인다

지금 같은 문제를 다시 만난다면 `parallelStream()`부터 적용하지 않을 것이다.

먼저 실제 실행 SQL과 MySQL의 `EXPLAIN`을 확인하고,
인덱스와 접근 경로에 문제가 없는지 살펴본 뒤 **N+1 쿼리 자체를
제거하는 방향**을 우선 검토할 것이다.

예를 들어 먼저 부모 목록을 가져온다.

```java
List<ServiceItem> services =
        serviceDAO.selectServices(customerId);
```

그리고 부모 ID를 모은다.

```java
List<Long> serviceIds = services.stream()
        .map(ServiceItem::getId)
        .collect(Collectors.toList());
```

연관 상품은 항목별로 조회하는 대신 여러 ID를 묶어 조회한다.

```sql
SELECT
       service_id,
       product_id,
       product_name
  FROM product
 WHERE service_id IN (...)
```

조회 결과는 애플리케이션에서 `serviceId` 기준으로 그룹핑한다.

```java
Map<Long, List<ProductItem>> productMap =
        products.stream()
                .collect(
                    Collectors.groupingBy(
                        ProductItem::getServiceId));
```

이렇게 하면 핵심은

```text
서비스별 DB 호출
        ↓
연관 데이터를 집합 단위로 조회
```

로 바뀐다.

조회 대상 ID가 매우 많다면 하나의 거대한 `IN` 절을 만드는 것도 좋은
방법은 아니다. 일정 크기로 나눠 batch 조회하거나, 상황에 따라 JOIN이나
다른 조회 전략을 선택해야 한다.

중요한 것은 **동시에 더 많은 SQL을 실행하는 것보다 처음부터 실행해야 할
SQL의 수를 줄이는 것**이다.

당시에는 병렬화까지 적용하고 작업을 마쳤지만, 지금은 그 다음 단계가
어디였는지도 명확하게 알고 있다.

## 컨벤션 가이드 — 리팩토링을 팀의 표준으로

리팩토링 과정에서 또 하나 발견한 문제는
**팀원마다, 화면마다 코드 구조가 다르다는 것**이었다.

누구는 Map을 사용하고 누구는 VO를 사용했다.

같은 목록 조회 기능인데도 어떤 화면은 Controller에서 데이터를 조립하고,
어떤 화면은 Service에서 조립했다. 같은 도메인 규칙도 구현 위치에 따라
조금씩 달랐다.

코드를 고치는 것만으로는 시간이 지나면 다시 같은 구조가 생길 가능성이
높았다.

그래서 이번에 정리한 방향을 기준으로 **코드 컨벤션 가이드 문서**를
작성해 팀에 공유했다.

- 계층 구조는 `Controller → Service → ServiceImpl → DAO` 방향으로 유지
- API 입출력 DTO와 DB 매핑 Model(VO)의 역할 분리
- Map 기반 파라미터와 응답 사용 지양
- 애플리케이션에서 객체를 만들 때 Builder 사용
- 무분별한 setter 대신 의도가 드러나는 상태 변경 메서드 사용
- 동일 도메인의 조회·조립 로직은 Service 계층으로 집중
- Bean Validation을 이용한 입력값 검증 위치 통일
- 존재 여부와 비즈니스 상태 검사는 ServiceImpl에서 처리
- 예외 처리 위치와 로그 포맷 통일
- 화면별 동일 로직 복사 금지

코드는 시간이 지나면 다시 바뀐다.

하지만 **"다음 코드는 어떤 모양으로 작성해야 하는가"에 대한 팀의 합의**가
있으면 비슷한 구조적 부채가 반복되는 속도를 줄일 수 있다.

## 배운 점

- **적은 데이터에서 빠른 코드는 빠른 코드라는 증거가 아니다.**  
  1만 건에서는 드러나지 않았던 N+1 구조가 100만 건 규모의 테스트
  데이터에서야 문제가 됐다. 성능 검증은 운영 규모에 가까운 데이터에서
  해야 한다는 걸 체감했다.

- **병목의 핵심은 순차 for문보다 N+1이었다.**  
  당시에는 `parallelStream()`으로 여러 DB 대기 시간을 겹치게 만들어
  10분이던 응답을 약 1분 15초까지 줄였다. 하지만 실행되는 SQL 수 자체가
  줄어든 것은 아니었다.

- **병렬화는 처리량을 공짜로 만들어 주지 않는다.**  
  DB 호출을 병렬화하면 애플리케이션뿐 아니라 커넥션 풀과 DB 서버도
  동시에 더 많은 요청을 받아야 한다. `parallelStream()` 내부의 작업과
  Spring 트랜잭션의 스레드 경계 역시 별도로 생각해야 한다.

- **구조를 정리하면 성능 변경도 통제하기 쉬워진다.**  
  Map과 화면별 복제 로직을 DTO/Model/Service 구조로 모은 뒤에는
  성능 로직을 변경해야 할 위치도 한 곳으로 좁혀졌다. 병렬 처리 자체보다
  이 구조 정리가 이후 변경의 기반이 됐다.

- **낯선 DB 앞에서 애플리케이션으로 먼저 간 것은 절반만 정답이었다.**  
  애플리케이션 구조 개선은 필요했지만 성능 문제를 다루면서
  MySQL `EXPLAIN`과 인덱스를 함께 확인하지 않은 것은 부족했다.
  지금 다시 한다면 DB 접근 경로부터 확인할 것이다.

- **다음 단계는 병렬화가 아니라 쿼리 수 감소였다.**  
  연관 데이터를 ID별로 하나씩 조회하는 대신 집합 단위로 가져오고
  애플리케이션에서 그룹핑하면 N+1 자체를 제거하거나 크게 줄일 수 있다.
  조회 대상이 많다면 IN 절도 적절한 크기로 나누는 전략이 필요하다.

- **당시의 해결과 지금 알고 있는 더 나은 해결을 구분해야 한다.**  
  당시에는 병렬화를 통해 요구된 성능 개선을 만들었다. 지금은 그 방식이
  어떤 조건에서 위험할 수 있고, 무엇을 먼저 개선해야 하는지도 안다.
  과거의 선택을 완벽한 정답으로 포장하기보다 어디까지 해결했고 무엇이
  남았는지를 설명할 수 있는 것이 더 중요하다고 생각한다.

- **리팩토링의 산출물은 코드뿐 아니라 팀의 기준이었다.**  
  한 번 빠르게 만든 코드보다 다음 개발자도 같은 기준으로 작성할 수 있는
  구조와 컨벤션을 남기는 것이 장기적으로 더 큰 효과가 있었다.