---
title: Spring과 Spring Boot, IoC·DI가 해결하는 문제
date: 2026-11-22
createdAt: 2026-11-22T13:08:16+09:00
tags: Spring, Spring Boot, DI, Interview
summary: 객체 생성 책임과 자동 구성의 범위를 구별하고 생성자 주입이 변경·테스트에 주는 효과를 정리한다.
category: spring-mybatis
---

# Spring과 Spring Boot, IoC·DI가 해결하는 문제

## 1. 학습 배경

Spring을 사용했다는 사실과 컨테이너가 객체를 연결하는 과정을 설명하는 능력은 다르다. 프레임워크 원리를 복습하는 글이며 아래 발송 서비스는 학습용이다. 당시 업무의 설정 방식은 확인 없이 단정하지 않는다.

## 2. 핵심 개념

Spring Framework는 IoC 컨테이너·웹·데이터 접근·AOP 등의 기반을 제공한다. Spring Boot는 그 기반 위에서 의존성 조합, 자동 구성, 실행·운영 설정을 편리하게 제공한다. Spring과 무관한 별도 대체 프레임워크는 아니다.

IoC는 객체가 필요한 협력자를 직접 생성·탐색하던 제어를 외부로 옮기는 개념이다. DI는 생성자·설정 메서드 등을 통해 의존 객체를 공급하는 방식이다. Spring에서 컨테이너가 관리하는 객체를 Bean이라고 한다.

## 3. 동작 원리

```text
컴포넌트 탐색·명시적 설정 → Bean 정의 등록
  → 의존 관계 해석 → 객체 생성·주입 → 초기화·후처리
  → 애플리케이션에 관리 객체 제공
```

생성자 주입에서는 필요한 의존성이 객체 생성 시 드러난다. 단일 생성자라면 일반적인 Spring 구성에서 `@Autowired`를 생략할 수 있다. 같은 타입이 여러 개면 이름·Qualifier·Primary 같은 선택 기준이 필요하다. 구체적인 선택 규칙은 적용 버전과 설정에 맞춘다. [Spring DI 문서](https://docs.spring.io/spring-framework/reference/core/beans/dependencies/factory-collaborators.html)를 기준으로 이해한다.

Boot 자동 구성은 클래스패스·설정값·기존 Bean 등의 조건을 평가해 구성을 제안한다. 모든 라이브러리를 무조건 등록하는 기능이 아니다. [Boot 자동 구성 문서](https://docs.spring.io/spring-boot/reference/using/auto-configuration.html)는 사용자 Bean으로 기본 구성을 대체하는 흐름도 설명한다.

## 4. 실무 활용

학습용 발송 서비스가 인터페이스를 생성자로 받으면 실제 외부 발송기와 테스트 대역을 바꿔 넣기 쉽다. 테스트에서 컨테이너를 띄우지 않고 일반 생성자로 조립할 수도 있다. 반대로 객체를 여기저기서 직접 new로 만들면 해당 객체에 대한 Bean 후처리·프록시 적용을 기대하기 어렵다.

## 5. 주의사항 및 오개념

DI가 모든 결합을 제거하지는 않는다. 잘못 설계한 인터페이스에도 결합될 수 있다. 생성자 순환 의존성이 드러나면 필드 주입으로 숨기기보다 책임 분리를 검토한다. 자동 구성 실패는 조건 보고서와 실제 Bean 목록으로 조사한다. 이 글은 공통 원리를 다루며 Boot 버전별 자동 구성 클래스 이름은 고정하지 않는다.

## 6. 기술 면접 예상 질문

| 질문·의도 | 핵심을 담은 구어체 답변 | 꼬리 질문 |
| --- | --- | --- |
| Spring과 Boot 차이는? 역할 | “Spring이 기능의 기반이고 Boot는 자동 구성과 의존성·실행 설정을 편하게 제공해요. 실제 등록된 구성을 확인하는 책임은 남아 있어요.” | 자동 구성을 끄려면? |
| DI를 왜 쓰나? 변경·테스트 | “협력 객체를 만드는 책임을 분리해서 구현을 교체하기 쉽게 해요. 생성자로 필수 의존성을 드러내겠습니다.” | 인터페이스가 반드시 필요한가? |
| 같은 타입 Bean이 둘이면? 주입 과정 | “의도한 구현을 Qualifier 등으로 명확히 선택하겠습니다. 무조건 아무 객체나 주입되는 것은 아니에요.” | 순환 의존성은 어떻게 풀까? |

## 7. 핵심 요약

객체 관리와 역할 설계, Boot의 조건부 자동 구성을 구분한다. 이어서 [Bean 생명주기](/blog/spring-bean-lifecycle)를 읽는다.

## 8. 참고 자료

- [Spring — Dependency Injection](https://docs.spring.io/spring-framework/reference/core/beans/dependencies/factory-collaborators.html)
- [Spring Boot — Auto-configuration](https://docs.spring.io/spring-boot/reference/using/auto-configuration.html)

---

[이전 복습](/blog/java-exception-handling-boundaries) · [다음 복습](/blog/spring-bean-lifecycle)
