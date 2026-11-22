---
title: ORM·JPA·Hibernate는 각각 무엇인가
date: 2026-11-22
createdAt: 2026-11-22T13:09:56+09:00
tags: JPA, ORM, Hibernate, Interview, 데이터 접근
summary: 객체·테이블 매핑이라는 접근법과 영속성 명세·구현체를 구분하고 SQL 관측의 필요성을 정리한다.
category: spring-mybatis
---

## 1. 학습 배경

JPA가 면접 후보에 있어 개념을 복습한다. 이 글을 JPA 운영 경험의 증거로 사용하지 않는다. 기존 실무에서의 사용 범위는 별도 확인 대상이며 아래 주문 모델은 학습용이다.

## 2. 핵심 개념

ORM은 객체와 관계형 DB의 데이터를 매핑하는 접근이다. 객체의 참조·상속과 테이블의 외래키·행 구조가 달라 생기는 변환 부담을 줄인다. Jakarta Persistence, 흔히 JPA라고 부르는 기술은 Java 영속성 관리의 계약을 정의한 명세다. Hibernate ORM은 그 계약을 구현하는 대표 구현체 중 하나다.

따라서 JPA와 Hibernate를 경쟁 프레임워크처럼 비교하지 않는다. Spring Data JPA의 Repository 추상화도 JPA 명세 자체와는 다른 계층이다.

## 3. 동작 원리

```text
애플리케이션 → EntityManager·조회 API
  → 영속성 공급자(Hibernate 등)
  → 객체 상태·매핑 분석 → SQL·JDBC → DB
```

엔티티 매핑은 객체 필드와 열, 연관 관계의 대응을 정의한다. 영속성 컨텍스트는 관리 중인 엔티티의 동일성과 상태 변경을 다룬다. 조회·flush·식별자 생성 전략 등에 따라 SQL이 나가는 시점과 모양이 달라진다. “메서드를 호출할 때마다 즉시 같은 SQL 한 개가 실행된다”는 모델로 이해하면 안 된다.

명세와 공급자 기능의 경계는 [Jakarta Persistence 3.1](https://jakarta.ee/specifications/persistence/3.1/jakarta-persistence-spec-3.1)과 [Hibernate 6.6 안내](https://docs.hibernate.org/orm/6.6/userguide/html_single/)를 나눠 참고한다. 이 조합은 학습 기준이며 고객사 버전을 뜻하지 않는다.

## 4. 실무 활용

학습용 주문·주문 항목 모델처럼 관계와 변경 규칙이 중요하면 객체 중심 변경을 표현하기 쉽다. 다만 통계·복잡한 집계는 엔티티 전체를 적재하기보다 DTO 조회나 명시적 SQL이 더 적절할 수 있다. 선택은 객체 변경 편의와 실제 DB 비용을 함께 비교한다.

## 5. 주의사항 및 오개념

ORM은 SQL 지식을 불필요하게 만들지 않는다. 조회 후 연관 객체를 반복 접근해 SQL이 늘어나는 N+1, 예상치 못한 JOIN과 과한 데이터 적재를 관측해야 한다. 지연 로딩을 모든 성능 문제의 해결책으로 보지도 않는다. 필요한 범위를 조회 시점에 설계한다.

## 6. 기술 면접 예상 질문

| 질문·의도 | 핵심을 담은 구어체 답변 | 꼬리 질문 |
| --- | --- | --- |
| JPA와 Hibernate 차이는? 명세·구현 | “JPA는 영속성 관리의 계약이고 Hibernate는 구현체예요. 공급자 전용 기능인지도 구분해서 쓰겠습니다.” | Spring Data JPA는 어디에 있나? |
| ORM을 쓰면 SQL을 몰라도 되나? 비용 이해 | “SQL 작성량은 줄 수 있지만 실행 SQL·조회 횟수·플랜은 알아야 해요. DB가 실제 하는 일이 사라지지는 않아요.” | N+1을 어떻게 찾나? |
| 어떤 조회에 부적합할 수 있나? 선택 기준 | “복잡한 집계와 DB 전용 기능이 중심이면 명시적 SQL의 이점도 비교해요. ORM 사용 여부만으로 우열을 정하지 않겠습니다.” | 혼용하면 무엇을 조심하나? |

## 7. 핵심 요약

ORM은 접근법, JPA는 명세, Hibernate는 구현체다. 이어서 [영속성 컨텍스트](/blog/jpa-persistence-context-entity-lifecycle)로 객체 상태와 SQL의 연결을 확인한다.

## 8. 참고 자료

- [Jakarta Persistence 3.1 명세](https://jakarta.ee/specifications/persistence/3.1/jakarta-persistence-spec-3.1)
- [Hibernate ORM 6.6 User Guide](https://docs.hibernate.org/orm/6.6/userguide/html_single/)
- [An Introduction to Hibernate 6](https://docs.hibernate.org/orm/6.6/introduction/html_single/): JPA와 구현체의 관계·객체 매핑 관점.

---

[이전 복습](/blog/jdbc-mybatis-query-execution) · [다음 복습](/blog/jpa-persistence-context-entity-lifecycle)
