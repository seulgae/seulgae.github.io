---
title: AOP 프록시로 이해하는 @Transactional
date: 2026-11-22
createdAt: 2026-11-22T13:08:16+09:00
tags: Spring, AOP, Transaction, Interview
summary: 프록시를 통과한 호출이 트랜잭션 경계를 만드는 원리와 자기 호출·롤백·전파의 주의점을 정리한다.
category: spring-mybatis
---

# AOP 프록시로 이해하는 @Transactional

## 1. 학습 배경

NURI2 연동 복기에는 발송 대상 관리와 DATA 적재의 트랜잭션 범위를 다시 확인할 필요가 남아 있다. 이 글의 동작 설명과 예시는 일반 학습이다. 당시 소스에서 어떤 애너테이션·전파 옵션을 썼는지 확인했다고 주장하지 않는다.

## 2. 핵심 개념

AOP는 로깅·트랜잭션처럼 여러 업무에 걸친 관심사를 분리하는 방법이다. Spring AOP의 일반적인 프록시 방식에서는 대상 객체 앞의 대리 객체가 호출을 가로채 부가 처리를 적용한다. `@Transactional`은 트랜잭션 속성의 선언이지 애너테이션 자체가 DB를 조작하는 것은 아니다.

## 3. 동작 원리

```text
외부 호출 → Spring 프록시 → 트랜잭션 관리자
  → 트랜잭션 시작 또는 참여 → 대상 메서드
  → 결과·예외에 따라 완료 처리 → 호출자
```

JDK 동적 프록시와 클래스 기반 프록시가 있으며 선택은 설정에 따라 달라진다. 같은 객체 안의 `this.method()` 호출은 외부 프록시를 다시 거치지 않아, 호출된 메서드의 별도 트랜잭션 속성이 적용되지 않는 문제가 있다. AspectJ 방식은 이 설명과 구분한다. [프록시 문서](https://docs.spring.io/spring-framework/reference/core/aop/proxying.html)의 중요한 제약이다.

일반 기본 롤백 규칙은 RuntimeException·Error에 적용되고 checked 예외는 별도 설정을 검토한다. 최신 버전에서는 전역 정책도 바꿀 수 있으므로 실제 설정을 확인한다. REQUIRED는 기존 트랜잭션 참여, REQUIRES_NEW는 독립 물리 트랜잭션을 사용하며 추가 연결 수요가 생길 수 있다. [애너테이션 문서](https://docs.spring.io/spring-framework/reference/data-access/transaction/declarative/annotations.html)를 기준으로 한다.

## 4. 실무 활용

**학습용 예제:** 같은 DB·트랜잭션 자원에서 발송 대상 등록과 큐 적재를 한 단위로 묶으면 한쪽 실패 시 함께 취소하도록 설계할 수 있다. 그러나 이후 솔루션이 수행한 실제 외부 발송까지 로컬 DB 롤백으로 취소되지는 않는다. 연동 완료와 DB 커밋을 같은 성공으로 다루지 않는다.

## 5. 주의사항 및 오개념

예외를 잡아 정상 반환하면 프록시는 그 예외를 직접 관측하지 못한다. 이미 rollback-only 상태라면 최종 커밋 시 실패할 수도 있다. `readOnly=true`는 모든 DB 쓰기를 무조건 막는 보안 장치가 아니다. 일반 스레드 바인딩 트랜잭션은 새 스레드로 자동 전파되지 않는다.

## 6. 기술 면접 예상 질문

| 질문·의도 | 핵심을 담은 구어체 답변 | 꼬리 질문 |
| --- | --- | --- |
| Transactional은 어떻게 작동하나? 프록시 경계 | “프록시가 호출 전후에 트랜잭션 관리자와 협력해 시작·참여·완료를 처리해요. 어떤 자원이 참여하는지도 확인해야 해요.” | 자기 호출은 왜 문제가 되나? |
| 예외면 전부 롤백되나? 기본값·설정 | “기본 규칙과 rollbackFor 등 실제 설정을 봐야 해요. catch해서 정상 반환했는지, rollback-only인지도 확인하겠습니다.” | checked 예외를 롤백하려면? |
| 새 트랜잭션이면 항상 좋은가? 자원·일관성 | “독립 커밋이 필요한 이유가 있어야 해요. 연결 풀과 외부 트랜잭션의 실패 관계도 달라져요.” | 내부만 성공하고 외부가 실패하면? |

## 7. 핵심 요약

프록시 진입·자원 참여·예외·전파를 함께 설명한다. 다음은 [DB 트랜잭션의 원자성](/blog/database-transactions-acid-boundaries)이다.

## 8. 참고 자료

- [Spring — Proxying Mechanisms](https://docs.spring.io/spring-framework/reference/core/aop/proxying.html)
- [Spring — Using @Transactional](https://docs.spring.io/spring-framework/reference/data-access/transaction/declarative/annotations.html): 기본 프록시 방식 기준. 가시성과 전역 롤백 정책은 버전별 대조가 필요하다.
- [Spring — Transaction Propagation](https://docs.spring.io/spring-framework/reference/data-access/transaction/declarative/tx-propagation.html): 전파와 물리 트랜잭션·자원 경계.

---

[이전 복습](/blog/spring-mvc-request-lifecycle) · [다음 복습](/blog/jdbc-mybatis-query-execution)
