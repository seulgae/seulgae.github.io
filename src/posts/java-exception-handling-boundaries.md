---
title: 예외를 어디에서 처리하고 어디까지 전달할 것인가
date: 2026-11-22
createdAt: 2026-11-22T13:06:34+09:00
tags: Java, Exception, Resources, Interview
summary: 예외 전파와 복구 책임, 자원 정리, 트랜잭션 실패 전달을 하나의 처리 경계로 복습한다.
category: java
---

# 예외를 어디에서 처리하고 어디까지 전달할 것인가

## 1. 학습 배경

연동 장애에서 중요한 것은 예외를 없애는 일이 아니라 실패를 올바르게 전달하는 일이다. 아래 DB·외부 발송 사례는 학습용이며 기존 프로젝트의 catch 정책을 재현한 것이 아니다.

## 2. 핵심 개념

예외는 정상 처리 경로를 중단하고 다른 처리기로 제어를 넘기는 수단이다. checked 예외는 잡거나 선언해야 하는 컴파일 규칙이 적용되고 RuntimeException 및 Error 계열은 그 규칙에서 제외된다. checked가 반드시 복구 가능하고 unchecked는 항상 개발 실수라는 대응은 성립하지 않는다.

## 3. 동작 원리

```text
호출 중 예외 발생 → 현재 처리기 탐색 → 호출 스택을 따라 전파
  → 적합한 catch 또는 최종 실패 처리
  → 적용되는 finally·자원 종료 수행
```

실제 복구가 가능한 계층은 재시도나 대체 처리를 결정한다. 복구할 수 없다면 필요한 업무 문맥을 붙여 전파한다. 예외를 변환할 때는 원인을 cause로 보존한다. close 가능한 자원은 try-with-resources를 사용하면 정상·실패 경로 모두 정리가 가능하다. 종료 중 추가 예외는 suppressed 예외가 될 수 있다. 언어의 기본 규칙은 [Oracle 예외 안내](https://docs.oracle.com/javase/tutorial/essential/exceptions/index.html)에 정리돼 있다.

## 4. 실무 활용

**학습용 상황:** 발송 데이터 적재가 실패했는데 로그만 남기고 정상 반환하면 호출 측은 성공으로 오해할 수 있다. 같은 트랜잭션에서 예외가 밖으로 전파되는지, 상위 계층이 어떤 실패 상태를 기록하는지 확인해야 한다. HTTP 응답에는 내부 SQL·인증 정보를 그대로 노출하지 않는다.

자원 정리는 예외 처리와 별도 성공 기준으로 확인한다. 연결 풀에서 받은 Connection의 close는 보통 물리 연결을 매번 끊기보다 풀에 반납하는 역할이다.

## 5. 주의사항 및 오개념

모든 Exception을 잡아 무조건 재시도하면 영구 오류와 중복 처리를 확대할 수 있다. catch에서 삼킨 예외는 트랜잭션 프록시의 기본 실패 판단에도 영향을 준다. finally에서 반환하거나 새 예외를 던져 원래 실패를 가리지 않도록 한다. 프로세스 강제 종료 등에서 finally 실행을 절대 보장한다고 답하지 않는다.

## 6. 기술 면접 예상 질문

| 질문·의도 | 답변에 담을 핵심과 구어체 예시 | 꼬리 질문 |
| --- | --- | --- |
| checked와 unchecked 차이는? 언어 규칙 | “잡거나 선언해야 하는 컴파일 규칙의 차이예요. 실제 복구 가능성은 예외의 의미와 호출 상황을 따로 봐야 해요.” | SQLException은 어디서 변환하나? |
| catch에서 로그만 남기면? 실패 계약 | “호출 측이 성공으로 오해할 수 있어요. 복구하지 못했다면 원인과 업무 문맥을 보존해서 실패를 전달하겠습니다.” | 트랜잭션은 롤백되나? |
| 자원 종료도 실패하면? 원인 추적 | “try-with-resources의 본문 실패와 suppressed 예외를 함께 보겠습니다. 마지막 오류 한 줄만 보면 최초 원인을 놓칠 수 있어요.” | 연결 누수는 어떻게 확인하나? |

## 7. 핵심 요약

복구 책임이 있는 곳에서 처리하고, 실패 원인과 자원을 함께 관리한다. 다음은 [Spring 트랜잭션 프록시](/blog/spring-aop-transactional-proxy)와 연결한다.

## 8. 참고 자료

- [Oracle — Exceptions](https://docs.oracle.com/javase/tutorial/essential/exceptions/index.html): JDK 8 튜토리얼의 예외·자원 관리 기본 개념. Java 17 학습에서 공통 규칙을 참고했다.
- [Java SE 17 언어 명세 — Exceptions](https://docs.oracle.com/javase/specs/jls/se17/html/jls-11.html): 예외 분류와 전파 규칙.

---

[이전 복습](/blog/java-collections-selection) · [다음 복습](/blog/spring-boot-ioc-dependency-injection)
