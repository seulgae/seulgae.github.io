---
title: 인덱스는 어떻게 찾고, 언제 효율이 떨어지는가
date: 2026-11-22
createdAt: 2026-11-22T13:11:57+09:00
tags: Database, Index, B-tree, Interview
summary: B-tree 탐색과 복합 인덱스, 테이블 접근 비용을 연결하고 Full Scan이 유리할 수 있는 이유를 정리한다.
category: sql-tuning
---

## 1. 학습 배경

CUBRID 실행계획과 인덱스를 다룬 기존 실무 복기를 원리 중심으로 보완한다. 물리 저장·접근 방식은 DBMS별 차이가 있어 여기서는 PostgreSQL 17의 B-tree 문서로 일반 원리를 설명한다. 당시 CUBRID 설정과 동일하다는 의미는 아니다.

## 2. 핵심 개념

인덱스는 전체 데이터를 모두 읽지 않고 후보를 찾도록 돕는 별도 접근 구조다. 탐색 비용을 줄이는 대신 저장 공간과 INSERT·UPDATE·DELETE의 유지 비용이 생긴다. 모든 인덱스가 B-tree인 것은 아니다.

B-tree는 정렬된 키를 계층적으로 탐색해 조건에 맞는 범위를 좁힌다. 실제 분기·리프 저장 형식과 테이블 행을 가리키는 방식은 구현마다 다르다. [인덱스 유형 문서](https://www.postgresql.org/docs/17/indexes-types.html)를 기준으로 구별한다.

## 3. 동작 원리

```text
조건 키 탐색 → 일치하는 인덱스 항목의 범위 확인
  → 필요한 테이블 행 접근 → 남은 조건 검사·반환
```

인덱스에서 후보를 찾은 뒤 테이블을 여러 번 찾아가면 I/O가 커질 수 있다. 반대로 많은 행이 필요한 조회는 순차 읽기가 더 저렴할 수 있다. PostgreSQL의 Seq Scan과 일반적으로 말하는 Full Table Scan은 용어·구현 차이를 남겨 두고 비교한다.

복합 인덱스 `(status, created_at)`는 앞쪽 키 조건과 뒤쪽 범위 조건의 조합을 고려해 설계한다. 선두 열 조건이 없으면 무조건 사용 불가라고 단정하지 않지만, 효율적인 탐색 범위가 줄어드는지는 확인해야 한다. [PostgreSQL 17 복합 인덱스](https://www.postgresql.org/docs/17/indexes-multicolumn.html)의 해당 버전 동작을 기준으로 한다.

## 4. 실무 활용

**학습용 예제:** 상태별 최근 요청 조회라면 상태의 분포·기간·정렬·LIMIT을 함께 본다. “중복이 많은 열은 인덱스를 만들면 안 된다”는 식으로 판단하지 않는다. 다른 열과의 조합, 반환 건수와 쓰기 빈도가 달라지면 선택도 달라진다.

## 5. 주의사항 및 오개념

WHERE 절의 문자 순서대로 인덱스를 읽는 것은 아니다. 옵티마이저가 통계와 비용으로 접근 경로를 고른다. 컬럼에 함수를 씌우면 일반 인덱스 활용이 어려울 수 있지만 함수·표현식 인덱스 지원 여부는 별도다. 인덱스만으로 조회하는 조건도 DBMS의 가시성·구조에 따라 다르다.

## 6. 기술 면접 예상 질문

| 질문·의도 | 핵심을 담은 구어체 답변 | 꼬리 질문 |
| --- | --- | --- |
| 인덱스가 빠른 이유는? 탐색 구조 | “정렬된 키 구조에서 후보 범위를 좁혀요. 다만 찾은 뒤 테이블을 읽는 비용도 합쳐서 봐야 해요.” | 범위 조회는 어떻게 진행되나? |
| Full Scan은 나쁜가? 비용 비교 | “많은 행이 필요하거나 테이블이 작으면 순차 읽기가 더 쌀 수 있어요. 접근 이름보다 실제 처리량과 시간을 보겠습니다.” | LIMIT이 있으면? |
| 복합 인덱스 순서는? 쿼리 패턴 | “동등·범위 조건, 정렬, 반환 건수와 데이터 분포를 같이 보겠습니다. 열 하나의 선택도만으로 정하지 않아요.” | 인덱스를 많이 만들면? |

## 7. 핵심 요약

인덱스 탐색·행 접근·유지 비용을 함께 비교한다. 다음은 [실행계획으로 검증하기](/blog/sql-execution-plan-tuning-process)다.

## 8. 참고 자료

- [PostgreSQL 17 — Index Types](https://www.postgresql.org/docs/17/indexes-types.html)
- [PostgreSQL 17 — Multicolumn Indexes](https://www.postgresql.org/docs/17/indexes-multicolumn.html)

---

[이전 복습](/blog/sql-joins-cardinality-null) · [다음 복습](/blog/sql-execution-plan-tuning-process)
