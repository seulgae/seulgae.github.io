---
title: CWE-676 위험한 API 사용 — eval을 지우기 전에 해야 하는 일
date: 2026-08-12
tags: Security, JavaScript, Java, SAST
summary: 레거시 JS의 eval 두 종류를 호출부 전수조사 후 안전한 문법으로 대체하고, deprecated API를 정리한 기록
---

**CWE-676(잠재적으로 위험한 함수 사용)** 검출의 주인공은 예상대로 JavaScript의
`eval`이었다. 그런데 이 유형의 조치에서 정작 오래 걸린 건 코드를 고치는 일이 아니라,
**고쳐도 되는지 확인하는 일**이었다.

## 케이스 1 — 문자열 조립 eval은 문법으로 대체된다

```js
// Before — 폼/필드 이름을 문자열로 조립해 eval
var fields = eval("document.forms." + formName + "." + fieldName);

// After — 대괄호 표기법: 동작 동일, 인젝션 불가
var fields = document.forms[formName][fieldName];
```

동적으로 프로퍼티에 접근하고 싶어서 eval을 쓴 전형적인 케이스.
JavaScript의 대괄호 표기법이 정확히 이 용도라서, 코드 인젝션 가능성만 제거하고
동작은 그대로 유지된다. 90년대 스타일 레거시 JS에서 아주 흔한 패턴이다.

## 케이스 2 — 콜백 eval, 지우기 전에 전수조사

```js
// Before — 콜백이 문자열이면 eval로 실행
if (typeof callback === "function") {
    callback();
} else if (callback) {
    eval(callback);
}
```

공통 확인창 유틸의 콜백 처리다. 여기서 eval을 그냥 지우면 문자열 콜백을 넘기는
화면이 조용히 깨진다. 그래서 먼저 **호출부 22곳을 전수조사**했다.
결과: 전부 함수 참조를 넘기고 있었고, 문자열 분기는 실행된 적 없는 dead path였다.

확인이 끝났으니 안전하게 대체할 수 있었다.

```js
// After — 문자열이면 전역 함수명으로만 해석 (임의 코드 실행 불가)
} else if (typeof window[callback] === "function") {
    window[callback]();
}
```

## 케이스 3 — deprecated API의 조용한 위험

```java
// Before — 플랫폼 기본 charset에 의존 (deprecated)
String enc = URLEncoder.encode(text);

// After — charset 명시
String enc = URLEncoder.encode(text, "UTF-8");
```

서버 OS 설정에 따라 인코딩 결과가 달라질 수 있는 API. 보안 결함이라기보다
이식성 결함에 가깝지만, 인코딩 불일치는 필터 우회의 재료가 되기도 해서 함께 정리했다.

## 조치불가 판정 — 서드파티 라이브러리 속 eval

오픈소스 JSON 폴리필과 벤더 암호화 번들 안에도 eval 검출이 있었다.
난독화·압축된 서드파티 산출물을 직접 수정하는 건 라이선스와 유지보수 양쪽에서
부적합하다고 판단해 **"조치불가 + 사유 기록"** 으로 종결했다.
모든 검출을 억지로 고치는 것보다, 못 고치는 이유를 남기는 것이 감리 관점에서 정직하다.

## 배운 점

- eval 제거의 핵심은 대체 문법이 아니라 **영향 범위 확인**이다. 호출부 전수조사 없이
  고쳤다면 "보안 조치가 기능을 깨뜨린" 사례가 됐을 것이다.
- 정적분석 도구는 서드파티 코드도 가리지 않고 찍는다. 수정/제외/조치불가를 판정하고
  사유를 기록하는 것까지가 조치 프로세스다.
