---
title: CWE-476 Null Pointer 역참조 — 검출 15건을 한 곳에서 잡은 이야기
date: 2026-08-12
tags: Security, Java, SAST
summary: NPE 검출 20여 건을 라인 단위가 아니라 근원 단위로 추적해, 공통 유틸 한 곳 수정으로 15건을 일괄 해소한 기록
---

**CWE-476(NULL 포인터 역참조)** 은 검출 건수만 보면 20건이 넘었다.
그런데 검출 위치를 하나씩 열어 보니, 상당수가 **같은 메서드를 가리키고 있었다.**

## 검출 15건의 근원은 한 곳이었다

여러 화면의 입력 정제 코드가 공통 유틸의 문자열 치환 메서드를 호출하고 있었고,
정적분석은 호출 지점마다 결함을 하나씩 찍었다. 진짜 문제는 치환 메서드 내부에 있었다.

```java
// Before — target/from/to가 null이면 indexOf/substring/length에서 NPE
private static String replace(String target, String from, String to) {
    int idx = 0;
    while ((idx = target.indexOf(from, idx)) != -1) {
        target = target.substring(0, idx) + to + target.substring(idx + from.length());
        idx += to.length();
    }
    return target;
}

// After — 역참조 대상을 메서드 입구에서 직접 가드
private static String replace(String target, String from, String to) {
    if (target == null || from == null || to == null) {
        return target;
    }
    ...
}
```

호출부 15곳을 각각 고치는 대신 **근원 메서드 한 곳에 null 가드**를 넣어
검출 15건을 일괄 해소했다. 라인 단위로 따라갔다면 같은 방어 코드가 15곳에
복제됐을 것이다.

## 나머지 케이스 — "null을 반환할 수 있는 API"들

남은 검출은 대부분 표준 API의 null 반환 가능성을 잊은 코드였다.

```java
// System.getProperty는 null을 반환할 수 있다
output.write(System.getProperty("line.separator").getBytes());
// → non-null이 보장되는 System.lineSeparator()로 교체

// getCodeSource(), getLocation()도 null 반환 가능한 체인
clazz.getProtectionDomain().getCodeSource().getLocation().getPath()
// → 단계별 null 가드 + 디버그 로그는 isDebugEnabled 선평가로 감쌈
```

가장 재미있었던 건은 **API의 계약 자체를 바꾼 케이스**다. 허용되지 않은 호출자면
null을 반환하던 내부 메서드가 있었는데, 호출부 4곳이 전부 반환값을 검사 없이
사용해서 검출 4건이 나왔다. null 반환을 **예외 throw로 변경**하니 호출부를
한 줄도 고치지 않고 4건이 사라졌다 — 실패를 null로 알리는 API는 호출부 수만큼
NPE 위험을 복제한다.

## 배운 점

- 정적분석의 검출 단위는 "라인"이지만 결함의 단위는 "설계"다. 검출 목록을 근원별로
  다시 묶는 작업이 조치의 절반이었다.
- null 가드를 추가하는 것과 null이 나올 수 없게 만드는 것(non-null API 교체,
  예외 계약으로 변경) 중 후자가 가능하면 항상 후자가 낫다. 가드는 잊혀지지만
  계약은 컴파일러와 호출부 전체에 강제된다.
