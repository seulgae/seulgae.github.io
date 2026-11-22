---
title: Spring Bean은 언제 만들어지고 정리되는가
date: 2026-11-22
createdAt: 2026-11-22T13:08:16+09:00
tags: Spring, Bean, Lifecycle, Interview
summary: Bean의 생성·주입·초기화·후처리·종료와 singleton의 공유 상태 문제를 복습한다.
category: spring-mybatis
---

## 1. 학습 배경

서버 시작과 종료 때 연결·스레드·캐시가 준비되고 정리되는 이유를 이해하려 한다. 자원 초기화의 일반 원리를 다루며 실제 업무에서 특정 생명주기 콜백을 썼다는 경험은 가정하지 않는다.

## 2. 핵심 개념

Bean은 컨테이너가 등록 정보에 따라 생성·관리하는 객체다. 기본 singleton scope는 컨테이너 안에서 해당 Bean 정의의 인스턴스를 공유한다는 뜻이다. JVM 전체에서 그 클래스의 객체가 하나만 존재한다는 뜻이 아니다. 일반 요청 데이터까지 필드에 넣어 공유하면 경쟁 조건이 생길 수 있다.

## 3. 동작 원리

일반적인 흐름을 단순화하면 다음과 같다. 실제 후처리기와 확장 지점은 더 많다.

```text
인스턴스 생성 → 의존성 설정 → 초기화 전 후처리
  → 초기화 콜백 → 초기화 후 후처리(프록시 등)
  → 사용 → 컨텍스트 종료 시 파괴 콜백
```

`@PostConstruct`는 의존성 설정 뒤 초기화 작업에, `@PreDestroy`는 관리 대상 자원의 정리에 사용할 수 있다. Spring 6 이후 예제에서는 `jakarta.annotation` 패키지를 확인한다. 생성자에서 아직 주입되지 않은 필드를 사용하면 초기화 순서를 오해한 것이다. 콜백 계약은 [Bean 생명주기 문서](https://docs.spring.io/spring-framework/reference/core/beans/factory-nature.html)에 근거한다.

초기화 시점의 자신의 메서드 호출은 완성된 외부 프록시 호출과 같지 않다. 초기화 메서드 안에서 `@Transactional`이 평소와 똑같이 적용될 것이라고 가정하지 않는다.

## 4. 실무 활용

**학습용 예제:** 외부 연동 클라이언트를 준비할 때 필수 설정을 검증하고, 실패하면 명확한 기동 실패로 드러나게 할 수 있다. 하지만 느린 외부 호출을 모든 Bean 초기화에 넣으면 앱 시작이 지연된다. 필수 준비와 백그라운드 갱신의 경계를 나누는 편이 낫다.

종료 때는 생성한 실행기·연결 같은 소유 자원을 정리한다. 누가 생성했고 누가 닫아야 하는지부터 정한다.

## 5. 주의사항 및 오개념

prototype Bean은 컨테이너가 생성·초기화하지만 일반적으로 이후 파괴 콜백까지 자동 관리하지 않는다. 종료 콜백은 강제 프로세스 종료나 전원 장애까지 보장하는 영속성 장치가 아니다. singleton을 쓴다고 요청 처리가 직렬화되거나 스레드 안전해지는 것도 아니다.

## 6. 기술 면접 예상 질문

| 질문·의도 | 핵심을 담은 구어체 답변 | 꼬리 질문 |
| --- | --- | --- |
| 생성자와 PostConstruct 차이는? 초기화 순서 | “생성자는 인스턴스 생성 단계고 PostConstruct는 의존성 설정 뒤예요. 주입 객체를 써야 하는 준비 작업은 순서를 고려하겠습니다.” | 생성자 주입이면 무엇이 다른가? |
| singleton이면 안전한가? 공유 상태 | “같은 Bean을 여러 요청이 쓰므로 가변 필드가 오히려 문제가 될 수 있어요. 요청 상태는 지역 변수 등으로 분리하겠습니다.” | 프로토타입이면 해결되나? |
| PreDestroy는 언제나 실행되나? 종료 한계 | “정상적인 컨텍스트 종료에서 정리를 기대할 수 있지만 강제 종료까지 보장하지는 않아요.” | 중요한 처리 상태는 어디에 남기나? |

## 7. 핵심 요약

생성·주입·초기화·프록시 적용·종료를 구분한다. 초기화와 종료를 업무 트랜잭션의 완결성 보장으로 대신하지 않는다.

## 8. 참고 자료

- [Spring — Customizing the Nature of a Bean](https://docs.spring.io/spring-framework/reference/core/beans/factory-nature.html): 초기화·파괴 콜백 기준.
- [Spring — Proxying Mechanisms](https://docs.spring.io/spring-framework/reference/core/aop/proxying.html): 자기 호출과 프록시 경계.
- [Spring — Bean Scopes](https://docs.spring.io/spring-framework/reference/core/beans/factory-scopes.html): singleton·prototype 수명 차이.

---

[이전 복습](/blog/spring-boot-ioc-dependency-injection) · [다음 복습](/blog/spring-mvc-request-lifecycle)
