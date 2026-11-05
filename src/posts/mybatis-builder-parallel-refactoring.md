---
title: API 응답 약 480,000ms → 10,000ms 이내 — 병렬 조회 개선과 한계
date: 2024-11-27
tags: Java, Spring, MyBatis, Performance
summary: DB 적재 규모를 1만 건에서 운영 데이터 테스트를 위한 100만 건으로 늘리자 드러난 청구·가입 조회 병목 — 병렬 스트림으로 API 응답을 약 480,000ms에서 10,000ms 이내로 줄인 과정과 한계
---

클라우드 빌링 플랫폼 프로젝트에 참여했을 때 겪은 일이다.

> 수치 정정(2026-11-05): 저자가 최종 성과를 **약 480,000ms → 10,000ms 이내**로 정정했다. DB 전체 테스트 데이터 100만 건 환경에서 Swagger 등으로 API를 호출한 뒤 응답 완료까지의 시간이다. 동시 요청 수·반복 횟수·서버 및 DB 자원·원본 측정 로그는 확인 필요다.
화면에서 고객의 **가입 목록이나 청구 목록**을 조회하면, 각 목록 항목에 딸린 상세 내역(예: 가입 건별 할인·옵션 상품, 청구 건별 세부 항목)을 함께 묶어 내려주는 조회성 API가 있었다.

개발 단계에서는 별다른 문제가 없었다. 개발 환경의 테스트 데이터는 **1만 건** 안팎이었기 때문에 화면 응답에 큰 지연이 없었다.
운영 데이터 테스트를 위해 **DB 전체 적재 규모를 100만 건으로 늘렸을 때**, 같은 조회 API의 응답 시간이 **약 480,000ms**까지 치솟았다. 여기서 1만 건과 100만 건은 DB에 저장된 전체 테스트 데이터 규모다. API 한 번에 조회·반환한 건수를 뜻하지 않는다.

화면이 단순히 느린 정도가 아니라 타임아웃과 싸워야 하는 수준이었다.

문제는 이 API 하나로 끝나지 않았다. MyBatis의 `selectList`로 부모 목록을 가져온 뒤 루프를 돌며 자식 상세 목록을 `selectList`로 건건이 반복 호출하는 패턴이 **청구 조회, 가입 조회, 정산 집계 등 여러 화면의 조회 로직에 걸쳐 반복**되고 있었다.

## 왜 당시에는 DB보다 애플리케이션을 먼저 손댔나

이전 프로젝트 운영 경험은 주로 Oracle 기반이었다. Oracle에서는 실행계획을 열고 인덱스 접근 경로와 힌트를 조정하며 쿼리를 튜닝한 경험이 있었다.

하지만 이 프로젝트의 DB는 **MySQL**이었다.

물론 MySQL에도 `EXPLAIN`, 인덱스 설계, 옵티마이저 힌트 등 쿼리 튜닝 수단이 있다. 다만 당시의 나는 MySQL의 실행계획 분석과 옵티마이저 동작 특성에 익숙하지 않았다.

낯선 DB 환경에서 섣불리 힌트를 남발하기보다는, **내가 로직 흐름과 동작을 완벽히 통제할 수 있는 애플리케이션 계층에서 먼저 대기 시간을 줄이자**고 판단했다.

지금 돌아보면 절반은 맞고 절반은 아쉬운 판단이었다.
애플리케이션 계층의 직렬 호출 구조를 손본 것은 당장의 약 480,000ms 지연을 해소하는 데 유효했지만, 성능 문제라면 동시에 MySQL `EXPLAIN`으로 실제 쿼리의 테이블 풀 스캔 여부나 인덱스 상태를 함께 진단했어야 했다.

## AS-IS — MyBatis selectList 순차 반복 호출이 만든 약 480,000ms 지연

기존 코드의 조회 흐름을 단순화하면 다음과 같았다. 목록을 `selectList`로 가져온 뒤, 루프를 돌며 각 항목의 상세 내역이나 집계 데이터를 다시 `selectList`로 건건이 호출하는 직렬 구조였다.

```java
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
```

이 로직의 치명적인 병목은 `for`문 자체의 연산 비용보다 **DB I/O 대기 시간의 직렬 누적**에 있었다.

```text
청구 마스터 목록 조회 (selectList)           1회
  ↳ 청구 건 1의 상세 항목 조회 (selectList)      1회 (응답까지 대기)
  ↳ 청구 건 2의 상세 항목 조회 (selectList)      1회 (응답까지 대기)
  ↳ 청구 건 3의 상세 항목 조회 (selectList)      1회 (응답까지 대기)
  ...
  ↳ 청구 건 N의 상세 항목 조회 (selectList)      1회 (응답까지 대기)
```

DB의 테스트 데이터가 1만 건 규모일 때는 조회 지연이 눈에 띄지 않았다. 하지만 **DB 전체 적재 규모를 100만 건으로 늘린 환경**에서는 반복되는 연관 조회의 대기 시간이 병목으로 드러났다. 앞선 쿼리가 끝나야만 다음 쿼리가 출발하는 직렬 대기 시간이 고스란히 합산되어 **약 480,000ms**의 응답 지연을 만들어냈다.

*(참고로 당시 4명의 백엔드 개발자마다 제각각이던 `List` 자료형 기반 조회 코드를 `ServiceImpl`·`Request/Response DTO`·`Model`·`Builder` 구조로 표준화해 팀 전체에 공유한 과정은 별도 글인 [4인 백엔드 팀의 코드 리팩토링과 PDF 컨벤션 표준화 기록](/blog/backend-code-convention-standardization)에 따로 정리해 두었다.)*

## TO-BE — parallelStream을 통한 조회 대기 시간 중첩

계층 정비를 통해 `ServiceImpl`로 모인 조회·집계 로직에 내가 적용한 방법은, 순차 루프로 돌던 `selectList` 호출을 Java의 **`parallelStream()` 기반 병렬 처리 구조**로 전환하는 것이었다. 청구·가입 조회와 같은 순차 병목이 확인된 집계·목록 조립 구간에 병렬 스트림을 적용했다.

```java
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
```

기존의 순차 루프에서는 하나가 끝나야 다음 쿼리가 실행됐다.

```text
상세 쿼리 1 실행 → 완료 대기
                            상세 쿼리 2 실행 → 완료 대기
                                                        상세 쿼리 3 실행 → 완료 대기
```

이를 `parallelStream()`으로 전환하면서 여러 워커 스레드가 상세 조회 요청을 **동시에 병렬로 실행해 DB I/O 대기 시간을 서로 겹치게(Overlap)** 만들었다.

```text
Thread 1 : 상세 쿼리 1 실행 → 완료 대기
Thread 2 : 상세 쿼리 2 실행 → 완료 대기
Thread 3 : 상세 쿼리 3 실행 → 완료 대기
```

### 결과

DB에 전체 테스트 데이터 100만 건이 적재된 동일 조건에서 Swagger 등으로 API를 호출하고, **호출 후 응답이 완료될 때까지의 시간**을 측정했다. 브라우저에서 목록 화면이 렌더링되는 시간을 뜻하지 않는다. 기존에 기록한 측정 결과는 다음과 같았다.

```text
AS-IS (순차 직렬 selectList)   : 약 480,000ms
TO-BE (병렬 스트림 selectList) : 10,000ms 이내 (응답 시간 약 98% 단축)
```

타임아웃에 걸리던 대용량 목록·집계 API를 **10,000ms 이내**로 끌어내리며 당면했던 성능 병목을 해소했다.

## 이 방식의 분명한 한계와 교훈

하지만 작업을 마친 뒤 이 해결책을 다시 뜯어보며 냉정하게 짚어야 할 사실이 있었다.

**이 조치는 반복되는 SQL 실행 횟수 자체를 줄인 것이 아니다.**

마스터 건수가 많으면 상세 항목을 조회하는 `selectList` 쿼리도 여전히 그만큼 실행된다. 달라진 것은 수많은 쿼리를 한 줄로 서서 기다리던 것을 **여러 스레드가 병렬로 겹쳐서 기다린 것뿐**이다.

```text
총 SQL 실행 횟수 감소 : X (여전히 건별 반복 쿼리 발생)
DB I/O 대기 시간 중첩 : O (병렬 처리로 전체 소요 시간 단축)
```

이 방식은 실무 운영 환경에서 다음과 같은 **위험과 한계**를 안고 있다.

1. **공용 스레드 풀 및 DB 커넥션 풀 경합**:  
   일반적인 병렬 스트림 실행에서는 공용 `ForkJoinPool.commonPool()` 워커가 사용된다. 호출 스레드와 실행 컨텍스트도 고려해야 하며 별도 풀 설정 여부는 기록에 없다. 여러 사용자가 동시에 대용량 조회를 요청하면 순간적으로 워커 스레드들이 DB 커넥션을 한꺼번에 점유해, 다른 일반 API 요청까지 커넥션 대기 타임아웃에 빠뜨리거나 DB CPU 부하를 급증시킬 수 있다.
2. **트랜잭션 컨텍스트 전파 불가**:  
   Spring의 `@Transactional`은 `ThreadLocal` 기반이므로, `parallelStream`이 쪼갠 별도 워커 스레드에는 기존 트랜잭션 컨텍스트가 전파되지 않는다. `readOnly=true`도 워커 스레드 전체에 동일한 스냅샷이나 트랜잭션을 보장하지 않는다. 읽기만 해도 조회 시점 차이로 결과가 불일치할 수 있다. [Spring Transactional 문서](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/transaction/annotation/Transactional.html)

## 지금 다시 한다면 — IN 절을 활용한 '집합 단위 조회'

지금 같은 문제를 다시 마주한다면, `parallelStream`으로 호출을 병렬화하기 전에 **실행되는 SQL의 개수 자체를 줄이는 집합 단위 조회**로 설계할 것이다.

### 1단계: 마스터 목록 조회 및 키 추출 (쿼리 1회)
```java
List<BillingModel> billings = billingDAO.selectBillingList(customerId);
List<Long> billingIds = billings.stream()
        .map(BillingModel::getBillingId)
        .collect(Collectors.toList());
```

### 2단계: 하위 데이터를 IN 절로 한 번에 조회 (쿼리 1회)
```sql
SELECT billing_id, item_id, item_name, amount
  FROM billing_item
 WHERE billing_id IN (1, 2, 3, ...)
```

### 3단계: 애플리케이션 메모리에서 부모 키 기준으로 매핑
```java
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
```

이렇게 설계하면 대상 건수가 1,000건이더라도:
- **기존 반복 호출**: 마스터 1회 + 상세 1,000회 = **총 1,001회 쿼리**
- **집합 단위 조회**: 마스터 1회 + 상세 `IN` 조회 1회 = **단 2회 쿼리**

로 줄어든다. 이는 하위 컬렉션 한 종류를 한 청크로 조회하는 예시다. 빈 ID 목록은 조회를 생략하고, 대량 키는 페이지/청크로 나눠야 한다. 청크 크기 1,000은 보편적 한도가 아니며 DB·드라이버·SQL 길이·결과 크기로 결정한다. 청크가 C개라면 단순 모델의 SQL 수는 1+C회다. 결국 **"많은 쿼리를 동시에 빨리 날리는 것"보다 "애초에 날리는 쿼리 횟수를 줄이는 것"이 데이터베이스 성능 최적화의 정석**이다.

## 배운 점

- **1만 건에서 괜찮은 코드가 100만 건에서도 괜찮은 것은 아니다.**  
  개발 데이터의 볼륨이 작을 때는 직렬 `selectList` 반복 호출의 비효율이 가려져 있었다. 운영 규모에 준하는 데이터로 검증해야 비로소 잠복해 있던 I/O 병목이 드러난다.
- **병렬 스트림은 대기 시간을 겹치는 우회책이지 쿼리 자체를 줄이는 해법이 아니다.**  
  약 480,000ms 걸리던 응답을 10,000ms 이내로 줄인 것은 당시 일정 안에서 유효한 개선이었지만, DB I/O에 `parallelStream`을 적용할 때는 공용 스레드 풀과 커넥션 풀 경합 위험을 반드시 의식해야 한다.
- **대량 연관 데이터는 집합(`IN` 절)으로 한 번에 읽어 메모리에서 조립하자.**  
  루프 안에서 DAO를 반복 호출하는 대신, 키 목록을 모아 한 번에 조회하고 `groupingBy`로 매핑하는 방식이 애플리케이션과 DB 모두를 지키는 구조다.
- **과거의 해결을 솔직하게 복기하는 힘.**  
  당시의 병렬화 성과를 완벽한 정답으로 포장하기보다, "당시에는 대기 시간을 병렬로 중첩해 10,000ms 이내로 단축했고, 지금 다시 한다면 쿼리 횟수를 줄이는 집합 조회로 풀 것"이라고 한계와 대안을 명확히 구분해 설명할 수 있는 것이 엔지니어로서의 성장이라고 생각한다.
