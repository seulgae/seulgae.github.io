---
title: JPA와 MyBatis를 선택할 때 비교할 것들
date: 2026-11-22
createdAt: 2026-11-22T13:09:56+09:00
tags: JPA, MyBatis, JDBC, Interview, 데이터 접근
summary: 객체 상태 관리와 SQL 중심 매핑의 차이, 조회 비용, 혼용 시 연결·flush·캐시 경계를 비교한다.
category: spring-mybatis
---

# JPA와 MyBatis를 선택할 때 비교할 것들

## 1. 학습 배경

기존 SQL·MyBatis 활용 기록을 JPA 학습과 연결한다. 두 기술을 같은 규모의 운영 환경에서 비교 실험했다는 뜻은 아니다. 선택 예시는 가상 시스템이며 성능 수치를 제시하지 않는다.

## 2. 핵심 개념

JPA는 객체의 매핑과 영속 상태 관리를 중심으로 한다. MyBatis는 작성한 SQL과 파라미터·결과 매핑을 중심으로 한다. 둘 다 JDBC 기반으로 관계형 DB와 통신할 수 있고, 실제 성능은 실행 SQL·호출 횟수·데이터 크기 등에 달려 있다.

## 3. 동작 원리

| 관점 | JPA | MyBatis |
| --- | --- | --- |
| 주요 작업 단위 | 관리 엔티티와 조회 | 매핑된 SQL 실행 |
| 변경 반영 | 영속 상태·flush 규칙에 영향받음 | UPDATE 등 명시적 문장 실행 |
| 조회 설계 | JPQL·Criteria·네이티브 SQL 등 | 직접 작성한 SQL·동적 SQL |
| 주의할 상태 | 영속성 컨텍스트와 캐시 | 세션·결과 매핑·캐시 설정 |

JPA에도 네이티브 SQL이 있고 MyBatis에도 캐시가 있다. “JPA는 SQL을 못 쓰고 MyBatis는 캐시가 없다”는 비교는 잘못이다. 기본 근거는 [Hibernate의 영속성 설명](https://docs.hibernate.org/orm/6.6/userguide/html_single/)과 [MyBatis API](https://mybatis.org/mybatis-3/java-api.html)에 둔다.

## 4. 실무 활용

**학습용 선택:** 상태 전이가 복잡한 주문 업무에서는 객체 모델과 변경 추적의 장점을 검토한다. 기존 DB의 복잡한 통계 SQL이나 DB 전용 기능이 핵심이면 SQL 매퍼의 직접 제어가 유용할 수 있다. 팀의 SQL 역량·기존 구조·테스트 방식도 선택 조건이다.

혼용할 때는 같은 DataSource·트랜잭션 관리자와 실제 연결 참여를 검증한다. 같은 메서드에 `@Transactional`이 있다는 이유만으로 서로 다른 연결의 작업이 원자적으로 묶이지 않는다.

## 5. 주의사항 및 오개념

MyBatis로 DB를 갱신해도 JPA가 이미 관리하는 엔티티의 값은 자동 갱신되지 않을 수 있다. 반대로 JPA의 미반영 변경을 MyBatis 조회가 곧바로 읽는다고 기대하면 flush 순서에서 문제가 생긴다. 두 도구 사이의 가시성·캐시 무효화·트랜잭션을 통합 테스트로 확인한다.

조회 결과가 많을 때는 두 기술 모두 필요한 열과 건수만 가져오는지 본다. 도구 이름만으로 N+1·과다 조회가 사라지지 않는다.

## 6. 기술 면접 예상 질문

| 질문·의도 | 핵심을 담은 구어체 답변 | 꼬리 질문 |
| --- | --- | --- |
| 무엇을 기준으로 선택하나? 맥락 | “객체 상태 변경이 중심인지, 복잡한 SQL 제어가 중심인지 보겠습니다. 기존 DB와 팀 운영 방식도 함께 비교해요.” | 둘을 혼용할 수 있나? |
| 어느 쪽이 빠른가? 비용 이해 | “같은 요구의 실제 SQL·횟수·데이터량을 봐야 해요. 도구 이름만으로 성능 우위를 말하기는 어려워요.” | 측정 조건은 어떻게 맞추나? |
| 혼용 시 가장 조심할 점은? 일관성 | “연결 참여와 flush·캐시 상태를 확인해요. 한쪽의 변경을 다른 쪽 객체가 바로 안다고 가정하지 않겠습니다.” | 변경 뒤 refresh·clear는 언제 필요한가? |

## 7. 핵심 요약

기술 선택과 실행 비용, 상태 동기화는 따로 검증한다. 실무 경험을 답할 때는 직접 사용한 도구의 범위와 JPA 학습 범위를 구분한다.

## 8. 참고 자료

- [MyBatis 3 — Java API](https://mybatis.org/mybatis-3/java-api.html)
- [MyBatis 3 — SQL Mapping](https://mybatis.org/mybatis-3/sqlmap-xml.html)
- [Hibernate ORM 6.6 User Guide](https://docs.hibernate.org/orm/6.6/userguide/html_single/)

---

[이전 복습](/blog/jpa-persistence-context-entity-lifecycle) · [다음 복습](/blog/sql-joins-cardinality-null)
