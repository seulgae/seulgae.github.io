---
title: 영속성 컨텍스트와 엔티티 생명주기
date: 2026-11-22
createdAt: 2026-11-22T13:09:56+09:00
tags: JPA, Persistence Context, Entity, Interview, 데이터 접근
summary: 엔티티의 네 상태와 변경 감지·flush·commit을 구분하고 merge와 지연 로딩의 오개념을 정리한다.
category: spring-mybatis
---

# 영속성 컨텍스트와 엔티티 생명주기

## 1. 학습 배경

저장 메서드 호출과 실제 SQL·커밋을 같은 시점으로 생각하지 않기 위해 JPA 상태 모델을 복습한다. Jakarta Persistence 3.1과 Hibernate 6.6을 참고한 일반 학습이며 실무 성과를 주장하지 않는다.

## 2. 핵심 개념

영속성 컨텍스트는 관리 중인 엔티티를 다루는 문맥이다. 같은 컨텍스트에서 같은 영속 식별자에 대응하는 관리 객체의 동일성을 유지한다. DB 전체의 데이터를 담은 전역 캐시가 아니다.

| 상태 | 의미 |
| --- | --- |
| 비영속 | 새 객체이며 아직 관리되지 않음 |
| 영속 | 컨텍스트가 관리하는 상태 |
| 준영속 | 식별자는 있으나 현재 컨텍스트에서 분리됨 |
| 삭제 | 관리 상태에서 삭제가 예약된 상태 |

## 3. 동작 원리

조회·persist 등으로 관리 상태에 들어오면 컨텍스트는 객체 상태를 추적한다. Hibernate는 스냅샷 비교나 변경 추적 기법으로 변경을 감지하고 flush에서 DB와 동기화한다. 구체적인 SQL 실행 순서와 INSERT 시점은 식별자 전략·구현에 영향을 받는다.

**flush는 commit이 아니다.** 트랜잭션 안의 SQL 동기화 뒤에도 롤백될 수 있다. AUTO flush에서는 커밋 전이나 관련 쿼리 실행 전에 동기화가 필요할 수 있다. [JPA 명세](https://jakarta.ee/specifications/persistence/3.1/jakarta-persistence-spec-3.1)의 상태·동기화 계약과 [Hibernate 안내](https://docs.hibernate.org/orm/6.6/userguide/html_single/)의 구현 설명을 구별한다.

## 4. 실무 활용

**학습용 예제:** 트랜잭션 안에서 주문을 조회해 상태를 변경하면 관리 객체의 변경이 flush 때 반영될 수 있다. 반면 clear·detach 뒤 객체를 바꿨다고 자동으로 UPDATE되지는 않는다.

merge는 분리 객체 상태를 관리 객체에 복사하고 관리 객체를 반환한다. 전달한 객체 자체가 반드시 다시 영속화된다고 이해하지 않는다. 복사할 값과 연관 관계가 넓으면 의도하지 않은 변경도 발생할 수 있어 갱신 범위를 명확히 한다.

## 5. 주의사항 및 오개념

1차 캐시는 컨텍스트 범위다. 쿼리를 두 번 호출하면 무조건 DB 요청이 한 번만 발생한다는 보장은 없다. 컨텍스트 밖에서 미초기화 지연 관계를 탐색하면 공급자와 실행 환경에 따라 실패할 수 있다. 목록 조회에 필요한 데이터를 트랜잭션 안에서 명확히 준비하고, 편의를 위해 모든 관계를 즉시 로딩으로 바꾸지 않는다.

## 6. 기술 면접 예상 질문

| 질문·의도 | 핵심을 담은 구어체 답변 | 꼬리 질문 |
| --- | --- | --- |
| 영속성 컨텍스트 역할은? 상태 모델 | “관리 객체의 동일성과 변경 상태를 관리해요. DB 전체 캐시가 아니라 EntityManager가 다루는 문맥이에요.” | 준영속 객체를 변경하면? |
| flush와 commit 차이는? 동기화·확정 | “flush는 SQL을 DB에 반영하는 동기화이고 commit은 트랜잭션 완료예요. flush했어도 그 트랜잭션은 롤백될 수 있어요.” | 조회 전에 flush될 수 있나? |
| merge에 원본을 계속 쓰면? 반환 계약 | “원본이 관리 객체가 됐다고 가정하지 않고 반환된 관리 객체를 봐야 해요. 필요한 변경만 명시하는 방식도 검토하겠습니다.” | bulk UPDATE 뒤 상태는? |

## 7. 핵심 요약

객체 상태·컨텍스트 수명·SQL 동기화·트랜잭션 완료를 나눈다. bulk SQL이나 다른 접근 도구로 변경한 내용은 이미 관리 중인 객체에 자동 반영된다고 가정하지 않는다.

## 8. 참고 자료

- [Jakarta Persistence 3.1 — 엔티티 관리 계약](https://jakarta.ee/specifications/persistence/3.1/jakarta-persistence-spec-3.1)
- [Hibernate ORM 6.6 — Persistence Context](https://docs.hibernate.org/orm/6.6/userguide/html_single/)
- [Jakarta Persistence 3.1 — EntityManager API](https://jakarta.ee/specifications/persistence/3.1/apidocs/jakarta.persistence/jakarta/persistence/EntityManager.html): persist·merge·clear·flush의 계약.

---

[이전 복습](/blog/orm-jpa-hibernate-relationship) · [다음 복습](/blog/jpa-mybatis-selection-tradeoffs)
