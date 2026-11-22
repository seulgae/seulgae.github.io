---
title: JOIN 결과가 예상보다 늘어나는 이유
date: 2026-11-22
createdAt: 2026-11-22T13:11:57+09:00
tags: SQL, JOIN, NULL, Interview
summary: 관계의 건수와 OUTER JOIN의 NULL 확장을 이해하고 이력 조회의 중복·누락을 진단하는 방법.
category: sql-tuning
---

## 1. 학습 배경

기존 NURI2 복기에는 메시지 ID를 기준으로 관리 데이터와 LOG를 연결한 경험이 있다. 이 글은 그 경험을 설명할 JOIN 원리를 정리한다. 아래 테이블 이름과 데이터는 실제 운영 구조가 아닌 학습용이다.

## 2. 핵심 개념

JOIN은 조건에 맞는 두 입력의 행 조합을 만드는 연산이다. INNER JOIN은 조건을 만족하는 조합을, LEFT JOIN은 왼쪽 행을 보존하면서 짝이 없는 오른쪽 열에 NULL을 만든다. 단순히 두 테이블을 옆으로 한 번씩 붙이는 작업은 아니다.

하나의 요청에 로그가 여러 건이면 요청 한 건이 결과 여러 행이 된다. JOIN 조건 누락뿐 아니라 정상적인 1:N 관계도 결과 증가의 원인이다. [PostgreSQL 17 JOIN 안내](https://www.postgresql.org/docs/17/tutorial-join.html)를 설명 기준으로 삼는다.

## 3. 동작 원리

다음은 실행 가능한 형태의 **학습용 SELECT**이며 이번 집필에서는 실행하지 않았다.

```sql
WITH request(id) AS (VALUES (1), (2)),
     send_log(request_id, status) AS (
       VALUES (1, 'SUCCESS'), (1, 'FAILED')
     )
SELECT r.id, l.status
FROM request r
LEFT JOIN send_log l ON l.request_id = r.id;
```

조건상 1번 요청은 두 로그와 각각 연결되고 2번은 오른쪽이 NULL인 행으로 남는다. 이는 예제에서 도출한 결과이며 실제 DB 관측값이 아니다. 여기에 `WHERE l.status = 'SUCCESS'`를 붙이면 NULL 확장 행도 제외된다. 같은 조건을 ON에 두면 성공 로그가 없는 요청을 왼쪽 행으로 보존할 수 있다.

## 4. 실무 활용

이력 화면이 요청당 한 행이어야 한다면 최신 로그를 선택할지, 성공 여부를 집계할지, 모든 발송 시도를 보여 줄지 먼저 정한다. 존재 여부만 필요하면 EXISTS도 비교한다. DISTINCT부터 붙여 증상을 가리면 잘못된 관계나 필요한 이력을 놓칠 수 있다.

실제 NURI2의 메시지 ID 유일성과 재시도 로그 관계는 원본 스키마 확인 사항이다. 학습용 1:N 구조를 그대로 당시 시스템에 적용했다고 주장하지 않는다.

## 5. 주의사항 및 오개념

NULL은 빈 문자열·0과 같은 값이 아니다. `= NULL` 대신 IS NULL을 사용한다. COUNT(*)는 행을, COUNT(오른쪽열)은 해당 열이 NULL이 아닌 값을 센다. 다만 이 글의 NULL 설명을 모든 DBMS의 빈 문자열 처리까지 동일하다고 일반화하지 않는다.

## 6. 기술 면접 예상 질문

| 질문·의도 | 핵심을 담은 구어체 답변 | 꼬리 질문 |
| --- | --- | --- |
| JOIN 뒤 건수가 늘면? 카디널리티 | “조건 누락뿐 아니라 1:N 관계인지 보겠습니다. 화면이 요청 단위인지 로그 단위인지부터 확인해요.” | DISTINCT로 해결해도 되나? |
| LEFT JOIN인데 행이 사라지면? 조건 위치 | “오른쪽 조건을 WHERE에서 검사해 NULL 행이 제외됐는지 보겠습니다. ON과 WHERE는 보존하는 의미가 달라요.” | IS NULL 조건이면? |
| 최신 로그 한 건만 필요하면? 업무 의미 | “최신의 기준 열과 동률 처리 기준을 정한 다음 집계나 윈도 함수 등으로 한 건을 선택하겠습니다.” | 성공 이후 실패 로그가 오면? |

## 7. 핵심 요약

관계의 건수·행 보존·조건 위치를 먼저 확인한다. 성능을 바꾸기 전에 결과 의미가 맞는지 검증한다.

## 8. 참고 자료

- [PostgreSQL 17 — Joins Between Tables](https://www.postgresql.org/docs/17/tutorial-join.html)
- [기존 NURI2 실무 복기](/blog/nuri2-message-batch-interview-review): 실제 담당 업무를 확인하는 내부 자료이며 SQL 예제의 실행 근거는 아니다.

---

[이전 복습](/blog/jpa-mybatis-selection-tradeoffs) · [다음 복습](/blog/database-index-access-paths)
