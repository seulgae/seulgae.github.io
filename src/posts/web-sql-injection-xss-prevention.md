---
title: SQL Injection과 XSS는 어디에서 막아야 하는가
date: 2026-11-22
createdAt: 2026-11-22T13:16:14+09:00
tags: Security, SQL Injection, XSS, Interview
summary: 입력이 코드로 해석되는 경계를 기준으로 SQL 바인딩·식별자 허용 목록·출력 문맥별 XSS 방어를 구별한다.
category: sast-cwe
---

## 1. 학습 배경

기존 웹 취약점 개선 기록을 설명할 개념을 복습한다. CodeRay에서 검출·조치한 사실과 모든 유형을 직접 공격해 재현했다는 주장은 다르다. 아래 SQL·화면 상황은 일반 학습용 예제다.

## 2. 핵심 개념

SQL Injection은 입력이 의도한 SQL 구조를 바꾸게 되는 문제다. XSS는 신뢰할 수 없는 데이터가 브라우저의 실행 문맥으로 들어가는 문제다. 둘 다 입력과 코드의 경계가 중요하지만 실행 주체와 방어 지점은 다르다.

서버 입력 검증은 업무적으로 허용된 값인지 확인한다. SQL 파라미터 바인딩과 출력 문맥에 맞는 처리를 대신하지 않는다.

## 3. 동작 원리

```text
SQL: 입력 문자열을 SQL에 연결 → DB가 코드 구조로 해석할 위험
XSS: 입력을 HTML·스크립트 문맥에 삽입 → 브라우저가 실행할 위험
```

SQL 값은 PreparedStatement 등으로 바인딩해 구조와 분리한다. 하지만 열 이름·정렬 방향·테이블 이름은 일반 값 파라미터로 대체할 수 없으므로 서버의 허용 목록에서 고른다. MyBatis의 문자열 치환과 바인딩도 구별한다. [OWASP SQL 방어 안내](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html)가 기준이다.

XSS는 HTML 본문·속성·URL·JavaScript 등 삽입 문맥에 맞게 처리한다. HTML을 허용해야 하는 기능은 적절한 sanitizer 정책을 검토하고, 보통 텍스트면 안전한 텍스트 출력 API를 사용한다. [OWASP XSS 방어 안내](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)를 참고한다.

## 4. 실무 활용

**학습용 예제:** 검색어는 SQL 값으로 바인딩하고 정렬 옵션은 `최근순/이름순`을 서버의 고정 SQL 조각으로 매핑한다. 게시판 내용은 일반 텍스트인지 제한된 HTML인지 정책을 먼저 정한다. 텍스트를 보여 주기 위해 불필요하게 raw HTML을 삽입하지 않는다.

수정 뒤에는 정상 입력이 유지되는지와 문제가 된 데이터 흐름이 차단되는지 확인한다. 실제 운영 공격 문자열이나 고객 데이터는 글에 인용하지 않는다.

## 5. 주의사항 및 오개념

특수문자 몇 개를 삭제하거나 모든 입력에 같은 escape 함수를 쓰는 것은 충분하지 않다. 입력 순간 HTML 인코딩한 데이터를 다른 문맥에서 재사용하면 이중 인코딩이나 잘못된 보호가 생길 수 있다. CSP는 추가 방어이며 안전하지 않은 출력의 대체가 아니다. 저장된 값·외부 API 응답도 출력 시 무조건 신뢰하지 않는다.

## 6. 기술 면접 예상 질문

| 질문·의도 | 핵심을 담은 구어체 답변 | 꼬리 질문 |
| --- | --- | --- |
| SQL Injection을 어떻게 막나? 코드·값 분리 | “값은 파라미터 바인딩하고, 바인딩 불가능한 식별자는 서버 허용 목록에서 선택해요. 문자열 치환을 같은 것으로 보지 않겠습니다.” | 동적 ORDER BY는? |
| XSS는 입력 검증으로 끝나나? 출력 경계 | “아니요. 실제 출력 문맥의 인코딩과 안전한 API가 필요해요. HTML 허용 기능은 sanitizer 정책도 따로 정해야 해요.” | 저장형과 반사형 차이는? |
| 스캐너에서 사라지면 안전한가? 검증 범위 | “해당 경고와 데이터 흐름은 다시 확인하되 전체 안전을 증명한 것으로 보지 않아요. 정상 기능과 우회 경로도 검사하겠습니다.” | 공통 필터만 고치면 되나? |

## 7. 핵심 요약

실행되는 문맥을 찾고 그 경계에서 방어한다. 직접 조치한 사례와 학습한 예방 원리를 구분해 답한다.

## 8. 참고 자료

- [OWASP — SQL Injection Prevention](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html)
- [OWASP — Cross Site Scripting Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)

---

[이전 복습](/blog/tcp-http-https-request-path) · [다음 복습](/blog/web-authentication-authorization-csrf)
