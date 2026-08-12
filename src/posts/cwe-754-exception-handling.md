---
title: CWE-754 부적절한 예외 처리 — catch(Exception)을 걷어내며
date: 2026-08-12
tags: Security, Java, SAST
summary: 광범위한 catch, 무의미한 재던지기, 예외 삼키기, null 미검사 — 네 가지 안티패턴을 걷어낸 예외 처리 정비 기록
---

**CWE-754(비정상적이거나 예외적인 조건에 대한 부적절한 검사)** 로 검출된 15여 건을
정리했다. 하나의 CWE지만 실제 코드에서는 네 가지 안티패턴으로 나타났고,
각각 조치 방법이 달랐다.

## 안티패턴 1 — 광범위한 catch(Exception)

```java
// Before — 모든 예외를 한 덩어리로
try {
    executeRemoteCall(config);
} catch (Exception e) { ... }

// After — try 블록이 실제로 던지는 예외로 좁힘
try {
    executeRemoteCall(config);
} catch (IOException e) { ... }
```

`catch(Exception)`은 의도하지 않은 예외(버그로 인한 NPE 등)까지 삼켜서
문제를 숨긴다. try 블록이 실제로 던질 수 있는 예외를 확인하고 그것만 잡도록 좁혔다.
DB 접근과 일반 로직이 섞인 블록은 `DataAccessException` catch를 앞에 추가하는
2단 구성으로 갔다.

## 안티패턴 2 — 잡아서 그대로 다시 던지기

```java
// Before — catch가 하는 일이 없다
try {
    return doProceed();
} catch (Throwable e) {
    throw e;          // 무의미
} finally {
    stopWatch.stop();
}

// After — try/finally만 남김 (동작 동일)
try {
    return doProceed();
} finally {
    stopWatch.stop();
}
```

메서드가 이미 `throws Throwable`이고 finally는 어차피 실행되므로,
catch 블록은 존재 이유가 없었다. 같은 클래스 안에 복사-붙여넣기로 4곳 반복되어 있었다.

## 안티패턴 3 — 예외 삼키기

```java
// Before — 프린트만 하고 아무 일도 없었던 것처럼 진행
} catch (Exception e) {
    e.printStackTrace();
}

// After — 로깅하고, 호출자에게 실패를 알림
} catch (IOException e) {
    LOGGER.error("파일 다운로드 처리 중 오류가 발생했습니다.", e);
    throw new IOException("파일 다운로드 처리 중 오류가 발생했습니다.");
}
```

삼켜진 예외는 "다운로드가 조용히 안 되는" 유령 버그가 된다. AJAX 응답을 반환하는
컨트롤러는 예외를 다시 던지는 대신 `result=false`로 정상적인 실패 JSON을
반환하도록 바꿨다 — 전파와 응답 중 무엇이 맞는지는 호출자가 누구냐에 따라 갈린다.

## 안티패턴 4 — 실패 조건 미검사

연결 생성 함수가 실패 시 null을 반환하는데 호출부가 검사 없이 바로 사용하는 코드.
null 체크를 추가하는 것으로 조치했지만, 근본적으로는 "실패를 null로 알리는 API"
자체가 문제라는 걸 다음 편(CWE-476)에서 다시 만나게 된다.

## 배운 점

- 같은 CWE 번호라도 코드 현실은 여러 갈래다. 검출 결과를 안티패턴 단위로 다시
  분류해야 조치 방법이 명확해진다.
- 예외 처리의 기준은 "잡을 수 있는 것만 잡고, 잡았으면 책임진다(로깅+전파 또는
  명시적 실패 응답)"로 요약된다. 이 기준에 안 맞는 catch는 대부분 지우는 게 답이었다.
