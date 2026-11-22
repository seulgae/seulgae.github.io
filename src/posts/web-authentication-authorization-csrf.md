---
title: 인증·인가와 CSRF를 구분하기
date: 2026-11-22
createdAt: 2026-11-22T13:16:14+09:00
tags: Security, Authentication, Authorization, CSRF, Interview
summary: 사용자 신원과 요청별 권한, 브라우저 자격 증명 자동 전송을 구별하고 CSRF의 성립 조건을 정리한다.
category: sast-cwe
---

# 인증·인가와 CSRF를 구분하기

## 1. 학습 배경

로그인됐다는 사실만으로 모든 데이터 접근이 허용되는 것은 아니다. 이 글은 인증·인가·CSRF의 일반 학습이다. 실제 고객사에서 인증 체계를 설계하거나 CSRF 취약점을 직접 조치했다는 경험은 별도 근거 없이는 주장하지 않는다.

## 2. 핵심 개념

인증은 요청 주체가 누구인지 확인하는 것이고 인가는 해당 주체가 특정 자원에 특정 행동을 할 권한이 있는지 판단하는 것이다. CSRF는 브라우저가 자격 증명을 자동 전송하는 특성을 이용해 사용자가 원치 않은 요청을 보내게 하는 공격이다. 비밀번호를 훔치는 공격과는 다르다.

## 3. 동작 원리

```text
로그인된 브라우저 → 세션 쿠키 보유
  → 다른 출처에서 유도한 요청 → 조건에 따라 쿠키 자동 전송
  → 서버가 추가 검증 없이 상태 변경을 처리하면 위험
```

CSRF 토큰은 서버가 발급·검증하는 예측하기 어려운 값으로 요청의 정당성을 보완한다. SameSite 쿠키·Origin 검증도 요청 종류와 브라우저 조건에 맞게 사용한다. 구체 방법은 [OWASP CSRF 안내](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)를 참고한다.

인가는 각 요청에서 자원·행동·소유 관계를 검사해야 한다. 관리자 메뉴를 숨기는 것은 화면 제어이고 API 권한 검사의 대체가 아니다. [OWASP 인가 안내](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html)는 기본 거부와 요청별 검증을 강조한다.

## 4. 실무 활용

**학습용 API:** 로그인한 사용자가 `문서 123 수정`을 요청해도 문서의 소유자·역할·업무 상태가 허용하는지 서버에서 확인한다. 화면에서 버튼이 없다는 이유로 요청을 신뢰하지 않는다.

Bearer 토큰을 앱이 명시적으로 Authorization 헤더에 넣는 흐름과 세션 쿠키 자동 전송 흐름은 CSRF 조건이 다르다. 토큰을 쿠키에 저장하면 다시 자동 전송 특성을 고려해야 한다. “JWT니까 CSRF가 없다”는 결론을 내리지 않는다.

## 5. 주의사항 및 오개념

CORS는 다른 출처의 응답 접근을 제어하는 브라우저 정책이며 요청 자체가 모두 차단된다는 뜻은 아니다. XSS는 같은 출처의 스크립트 권한으로 CSRF 방어를 우회할 수 있어 별도 예방이 필요하다. SameSite 하나를 모든 인증 흐름에 동일하게 적용하면 외부 로그인·정상 연동도 달라질 수 있어 실제 흐름을 검증한다.

## 6. 기술 면접 예상 질문

| 질문·의도 | 핵심을 담은 구어체 답변 | 꼬리 질문 |
| --- | --- | --- |
| 인증과 인가 차이는? 주체·행동 | “누구인지 확인하는 것과 그 사람이 이 자원을 수정해도 되는지 판단하는 차이예요. 로그인 뒤에도 요청별 권한 검사가 필요해요.” | 다른 사용자 ID를 보내면? |
| CSRF는 왜 발생하나? 자동 자격 증명 | “브라우저가 쿠키를 자동으로 붙이는 조건에서 유도된 요청을 서버가 정상 요청으로 오인할 수 있어요. 토큰과 출처·쿠키 정책을 함께 보겠습니다.” | XSS와 어떻게 다른가? |
| JWT면 CSRF 방어가 필요 없나? 저장·전송 | “형식보다 어디에 저장하고 어떻게 전송하는지가 중요해요. 쿠키면 자동 전송 조건을 다시 확인해야 해요.” | CORS만 설정하면 충분한가? |

## 7. 핵심 요약

신원·권한·요청 의도를 구분한다. 방어는 토큰 종류 이름보다 실제 브라우저 전송 흐름과 서버 검증으로 판단한다.

## 8. 참고 자료

- [OWASP — Cross-Site Request Forgery Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)
- [OWASP — Authorization](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html)

---

[이전 복습](/blog/web-sql-injection-xss-prevention) · [다음 복습](/blog/security-sast-dast-finding-validation)
