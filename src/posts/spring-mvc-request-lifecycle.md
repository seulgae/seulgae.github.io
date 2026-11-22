---
title: HTTP 요청은 Spring MVC에서 어떻게 처리되는가
date: 2026-11-22
createdAt: 2026-11-22T13:08:16+09:00
tags: Spring MVC, HTTP, Controller, Interview
summary: 서블릿 필터부터 DispatcherServlet·컨트롤러·메시지 변환·예외 처리까지 요청의 경로를 정리한다.
category: spring-mybatis
---

## 1. 학습 배경

운영자 이력 조회를 개발한 기록은 있지만 당시 모든 내부 프레임워크 동작을 분석했다고 말할 수는 없다. 그 경험을 설명할 기반으로 Servlet 기반 Spring MVC의 일반 요청 흐름을 복습한다. WebFlux의 실행 모델은 이 글의 범위가 아니다.

## 2. 핵심 개념

DispatcherServlet은 공통 요청 처리를 조정하는 프런트 컨트롤러다. 실제 업무를 모두 수행하는 클래스는 아니며, 매핑·호출 어댑터·뷰·예외 처리 전략에 역할을 나눈다. 컨트롤러 메서드는 이 흐름 안에서 실행되는 핸들러다.

## 3. 동작 원리

```text
클라이언트 → Servlet 컨테이너·Filter 체인 → DispatcherServlet
  → HandlerMapping → HandlerAdapter → Controller → Service
  → 응답 처리(JSON 변환 또는 View 렌더링) → 클라이언트
```

HandlerMapping은 요청에 맞는 핸들러를 찾고 HandlerAdapter는 해당 핸들러의 호출 방식을 제공한다. 메서드 호출 전 인자 해석·변환이 진행된다. JSON 요청 본문과 응답은 보통 HttpMessageConverter가 처리한다. `@ResponseBody` 계열은 반환값을 응답 본문으로 다루며 템플릿 뷰 이름으로 해석하는 흐름과 다르다.

Interceptor는 핸들러 전후의 관심사에, Filter는 서블릿 경계의 요청·응답 처리에 사용한다. MVC 예외는 HandlerExceptionResolver 계열로 전달될 수 있지만 Filter에서 발생한 모든 예외가 ControllerAdvice에 자동 포착되는 것은 아니다. 기본 순서는 [Spring MVC 처리 문서](https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-servlet/sequence.html)를 기준으로 한다.

## 4. 실무 활용

**학습용 이력 조회 API:** 날짜 입력 형식이 잘못돼 Controller 진입 전에 실패했다면 인자 변환·검증부터 확인한다. 서비스와 SQL이 정상인데 응답이 실패한다면 직렬화와 반환 객체를 확인한다. 한 요청의 trace ID·상태 코드·처리 시간을 연결하면 어느 경계에서 실패했는지 좁힐 수 있다. 실제 프로젝트에 trace ID를 도입했다는 의미는 아니다.

## 5. 주의사항 및 오개념

모든 요청이 Controller까지 도달하지 않는다. 보안 Filter나 매핑 단계에서 끝날 수 있다. `@RestController`가 자동으로 비동기·논블로킹 처리를 만드는 것도 아니다. 공통 로깅에서 요청 본문·인증 정보·개인정보를 무조건 기록하지 않는다.

## 6. 기술 면접 예상 질문

| 질문·의도 | 핵심을 담은 구어체 답변 | 꼬리 질문 |
| --- | --- | --- |
| DispatcherServlet 역할은? 책임 분리 | “공통 진입점에서 핸들러 탐색과 호출, 응답·예외 처리를 조정해요. 실제 처리는 여러 전략과 컨트롤러가 나눠 맡아요.” | HandlerAdapter가 필요한 이유는? |
| Filter와 Interceptor 차이는? 실행 경계 | “Filter는 서블릿 요청 체인에 있고 Interceptor는 Spring MVC 핸들러 실행에 연결돼요. 어느 범위를 처리할지 보고 선택하겠습니다.” | 인증은 어디에서 처리하나? |
| JSON 변환은 누가 하나? 응답 흐름 | “ResponseBody 계열 반환은 메시지 컨버터가 변환해요. 컨트롤러 성공 뒤 직렬화에서 실패할 수도 있어요.” | 순환 참조 객체라면? |

## 7. 핵심 요약

진입·매핑·인자 변환·업무 실행·응답 변환의 관측 지점을 나눈다. “컨트롤러 로그가 없다”만으로 네트워크 장애라고 결론 내리지 않는다.

## 8. 참고 자료

- [Spring MVC — Processing](https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-servlet/sequence.html)
- [Spring MVC — Message Converters](https://docs.spring.io/spring-framework/reference/web/webmvc/message-converters.html): 본문 변환 역할.

---

[이전 복습](/blog/spring-bean-lifecycle) · [다음 복습](/blog/spring-aop-transactional-proxy)
