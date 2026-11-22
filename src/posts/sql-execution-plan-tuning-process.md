---
title: 실행계획으로 SQL 병목을 좁히는 방법
date: 2026-11-22
createdAt: 2026-11-22T13:11:57+09:00
tags: SQL, EXPLAIN, Performance, Interview
summary: 결과 정확성부터 예상·실제 행 수, 반복 횟수와 I/O까지 확인하는 SQL 튜닝의 검증 순서.
category: sql-tuning
---

# 실행계획으로 SQL 병목을 좁히는 방법

## 1. 학습 배경

기존 튜닝 복기에는 CUBRID 화면 조회를 개선한 경험과 당시 이해의 한계가 함께 있다. 이 글은 성과 수치를 반복하지 않고 이후 설명할 수 있어야 할 분석 순서를 정리한다. 명령 구문은 PostgreSQL 17 학습 기준이다.

## 2. 핵심 개념

실행계획은 DB가 SQL을 처리할 접근 경로와 연산의 조합이다. 인덱스 사용 여부만 보는 목록이 아니라 필터·JOIN·정렬·집계가 어떤 입력과 반복 비용을 갖는지 읽는 자료다. 옵티마이저는 통계와 비용 모델로 계획을 추정한다.

## 3. 동작 원리

```text
SQL·파라미터·통계 → 후보 접근·JOIN 방법 비교 → 계획 선택
  → 실제 실행 → 실제 행 수·반복·읽기 비용과 비교
```

EXPLAIN은 계획을 보여 주고, PostgreSQL의 EXPLAIN ANALYZE는 실제로 문장을 실행해 측정한다. 비용 숫자는 밀리초 측정값이 아니다. actual rows와 loops는 함께 읽으며, 상위 연산의 시간이 하위 비용을 포함할 수 있어 단순 합산하지 않는다. [공식 EXPLAIN 안내](https://www.postgresql.org/docs/17/using-explain.html)를 기준으로 해석한다.

## 4. 실무 활용

아래는 **학습용 조회 발췌**다. 예시 테이블이 준비됐다는 전제이며 실행하거나 성능을 측정하지 않았다.

```sql
EXPLAIN (ANALYZE, BUFFERS)
SELECT message_id, created_at
FROM example_message
WHERE status = 'READY'
ORDER BY created_at
LIMIT 20;
```

먼저 결과와 파라미터를 고정하고 추정 행 수와 실제 행 수의 차이를 본다. 이후 필터에서 버리는 행, JOIN 반복, 정렬·메모리·디스크 사용, 버퍼 읽기 등을 확인한다. 통계·쿼리·인덱스 중 한 변경씩 적용하고 동일 조건의 결과·시간·부하를 대조한다.

[기존 실무 복기](/blog/sql-performance-tuning-interview-review)는 실제 경험 자료다. 위 PostgreSQL 구문과 예제 결과가 당시 CUBRID 실행계획은 아니다.

## 5. 주의사항 및 오개념

ANALYZE가 붙은 실행계획 검사는 DML도 실제 실행한다. 운영에서 무심코 적용하지 않는다. SELECT도 큰 부하를 만들 수 있다. 캐시가 따뜻한 실행과 차가운 실행, 대표 파라미터와 예외 파라미터를 구분한다. 앱 전체 지연과 DB 쿼리 실행 시간을 같은 수치로 취급하지 않는다.

## 6. 기술 면접 예상 질문

| 질문·의도 | 핵심을 담은 구어체 답변 | 꼬리 질문 |
| --- | --- | --- |
| 실행계획에서 먼저 볼 것은? 진단 순서 | “결과 의미와 파라미터를 확인하고 예상·실제 행 수, 반복 횟수부터 보겠습니다. 큰 오차가 있으면 통계와 조건을 의심해요.” | 추정이 크게 틀리는 이유는? |
| 인덱스를 탔으면 튜닝 완료인가? 총비용 | “아니요. 테이블 접근과 JOIN 반복이 많을 수도 있어요. 전체 비용과 실제 응답, 결과 정확성을 확인하겠습니다.” | 정렬이 병목이라면? |
| 개선 결과를 어떻게 검증하나? 재현성 | “같은 데이터·파라미터·부하 조건에서 전후를 비교하고 다른 대표 조회의 회귀도 보겠습니다.” | 힌트로 강제하면 충분한가? |

## 7. 핵심 요약

관측 → 가설 → 작은 변경 → 같은 조건의 검증으로 진행한다. 실행계획은 원인을 좁히는 자료이며 이름만으로 성능을 판정하지 않는다.

## 8. 참고 자료

- [PostgreSQL 17 — Using EXPLAIN](https://www.postgresql.org/docs/17/using-explain.html)
- [PostgreSQL 17 — Multicolumn Indexes](https://www.postgresql.org/docs/17/indexes-multicolumn.html): 인덱스 변경 가설의 기준.

---

[이전 복습](/blog/database-index-access-paths) · [다음 복습](/blog/database-transactions-acid-boundaries)
