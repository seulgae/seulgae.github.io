---
title: 격리 수준과 잠금 — 동시에 처리하면 무엇이 달라지는가
date: 2026-11-22
createdAt: 2026-11-22T13:11:57+09:00
tags: Database, Isolation, Lock, MVCC, Interview
summary: 동시성 이상 현상과 PostgreSQL의 스냅샷·잠금, 교착 상태 및 조건부 갱신을 구분한다.
category: sql-tuning
---

## 1. 학습 배경

두 배치나 두 요청이 같은 대상을 처리할 때 순차 실행에서는 없던 문제가 생긴다. 아래 재고 예제는 일반 학습이며 실제 시스템에 낙관·비관 잠금을 도입했다는 경험은 아니다. 구체 동작은 PostgreSQL 17 기준이다.

## 2. 핵심 개념

격리 수준은 동시 트랜잭션에서 어떤 상태를 읽고 어떤 이상 현상을 허용할지 정한다. 잠금은 충돌하는 작업을 제어하는 수단이다. MVCC는 데이터의 여러 버전으로 읽기 일관성을 지원하며 모든 잠금을 없애는 기술은 아니다.

Dirty Read는 미커밋 변경 읽기, Non-repeatable Read는 같은 행 재조회 결과 변경, Phantom Read는 조건에 맞는 행 집합 변경을 뜻한다. 세 현상 목록만으로 모든 동시성 이상을 설명할 수는 없다.

## 3. 동작 원리

PostgreSQL Read Committed는 일반 조회에서 문장 시작 기준 스냅샷을 사용한다. Repeatable Read는 트랜잭션의 스냅샷을 유지하고 표준의 최소 요구보다 강하게 phantom도 방지하지만 직렬화 이상이 모두 사라지는 것은 아니다. Serializable은 직렬 실행과 맞지 않는 충돌에서 트랜잭션을 실패시킬 수 있어 재시도를 설계해야 한다. 다른 DBMS의 동명 수준이 똑같이 동작한다고 답하지 않는다. [격리 문서](https://www.postgresql.org/docs/17/transaction-iso.html)가 기준이다.

행 잠금과 일반 MVCC 조회는 동작이 다르다. SELECT FOR UPDATE는 해당 행에 충돌하는 쓰기·잠금 요청을 조정하지만 일반 조회를 모두 막는 것으로 설명하지 않는다. [명시적 잠금 문서](https://www.postgresql.org/docs/17/explicit-locking.html)를 함께 본다.

## 4. 실무 활용

**학습용 조건부 갱신:** 예시 테이블이 준비됐다는 전제이며 실행하지 않았다.

```sql
UPDATE example_stock
SET quantity = quantity - 1
WHERE id = 1 AND quantity > 0;
```

사전 조회의 값만 믿지 않고 실제 갱신 행 수로 성공을 판단한다. 복잡한 여러 행의 조건이면 잠금이나 버전 검증을 검토한다. 낙관적 방식은 버전 조건 등으로 충돌을 감지하고, 비관적 방식은 필요한 시점에 잠금을 확보한다. 둘 중 하나가 언제나 빠르다는 규칙은 없다.

## 5. 주의사항 및 오개념

교착 상태는 서로가 가진 자원을 기다리는 순환이다. 접근 순서 통일과 짧은 트랜잭션으로 위험을 줄이고, DB가 한 작업을 취소할 때 전체 업무를 재시도할 수 있어야 한다. 외부 부수 효과가 있으면 무작정 전체 재실행하지 않는다. 잠금 획득 순서·타임아웃·관측 로그가 필요하다.

## 6. 기술 면접 예상 질문

| 질문·의도 | 핵심을 담은 구어체 답변 | 꼬리 질문 |
| --- | --- | --- |
| 격리를 높이면 안전한가? 비용·실패 | “간섭은 더 강하게 제어하지만 대기나 재시도 비용이 생겨요. 필요한 불변식과 DB의 실제 동작을 먼저 보겠습니다.” | Serializable 실패는 어떻게 처리하나? |
| MVCC면 잠금이 없나? 읽기·쓰기 구분 | “버전 기반 읽기로 충돌을 줄이지만 쓰기와 명시적 잠금은 남아 있어요. 일반 조회와 FOR UPDATE를 구분하겠습니다.” | 긴 조회가 미치는 영향은? |
| 교착 상태는 어떻게 줄이나? 운영 대응 | “자원 접근 순서를 맞추고 보유 시간을 줄여요. 실패한 트랜잭션은 재시도 가능성과 외부 효과를 함께 확인하겠습니다.” | 낙관 잠금이 적절한 경우는? |

## 7. 핵심 요약

업무 불변식 → 격리·제약·잠금 선택 → 실패 감지·재시도 순서로 설계한다. DBMS별 보장을 확인하고 격리 수준 이름만 외우지 않는다.

## 8. 참고 자료

- [PostgreSQL 17 — Transaction Isolation](https://www.postgresql.org/docs/17/transaction-iso.html)
- [PostgreSQL 17 — Explicit Locking](https://www.postgresql.org/docs/17/explicit-locking.html)

---

[이전 복습](/blog/database-transactions-acid-boundaries) · [다음 복습](/blog/messaging-sync-async-ums-flow)
