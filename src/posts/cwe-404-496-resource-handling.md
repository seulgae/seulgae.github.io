---
title: CWE-404·496 — 자원 해제와 방어적 복사, 객체를 안전하게 다루는 두 가지
date: 2026-08-12
tags: Security, Java, SAST
summary: 수동 close를 try-with-resources로 전환하고(CWE-404), setter의 배열 참조 저장을 방어적 복사로 바꾼(CWE-496) 조치 기록
---

건수는 적지만 Java의 기본기를 묻는 두 유형을 함께 정리한다.
**CWE-404(부적절한 리소스 종료/해제)** 와 **CWE-496(Private 배열에 Public 데이터 할당)**.

## CWE-404 — 예외가 나면 close는 실행되지 않는다

레거시 코드의 스트림 처리는 대부분 이런 모양이었다.

```java
// Before — 중간에 예외가 나면 close에 도달하지 못한다
OutputStream os = con.getOutputStream();
BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(os, "UTF-8"));
writer.write(param);
writer.flush();
writer.close();
```

닫는 코드가 있긴 하다. 문제는 **정상 경로에만 있다**는 것. `write()`에서 예외가 나면
close는 실행되지 않고 커넥션/스트림이 누수된다. 트래픽이 몰리는 날 서버가 서서히
느려지는 종류의 버그다.

```java
// After — try-with-resources: 정상이든 예외든 자동 close
try (OutputStream os = con.getOutputStream();
     BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(os, "UTF-8"))) {
    writer.write(param);
    writer.flush();
}
```

Java 7의 try-with-resources로 전환하면 선언 역순으로 자동 해제된다.
예외별로 중복돼 있던 수동 close 로직도 함께 제거되어 코드가 오히려 짧아졌다.
try-with-resources를 못 쓰는 구조(조건부 생성)는 try/finally로 해제를 보장했다.

## CWE-496 — setter가 배열 참조를 그대로 저장하면

```java
// Before — 외부 배열의 "참조"를 그대로 보관
public void setLocations(Resource[] locations) {
    this.locations = locations;
}
```

이 코드의 문제는 미묘하다. 호출자가 넘긴 배열을 나중에 수정하면, 이 객체의
내부 상태가 **객체 바깥에서 바뀐다.** private 필드라는 캡슐화가 사실상 무력화되는 것.

```java
// After — 방어적 복사: 내 상태는 내 것만 가리키게
public void setLocations(Resource[] locations) {
    this.locations = (locations == null) ? null : locations.clone();
}
```

배열을 복사해서 저장하면 외부 변조가 내부에 닿지 않는다. getter로 배열을 내줄 때도
같은 원리(복사본 반환)가 적용된다.

## 배운 점

- 이 두 유형은 "보안 결함"이라기보다 **견고함의 문제**다. 하지만 자원 누수는 가용성
  공격의 통로가 되고, 참조 노출은 검증 우회의 통로가 된다 — 견고하지 않은 코드가
  곧 공격 표면이라는 걸 정적분석 룰이 상기시켜 준다.
- try-with-resources 전환은 기계적으로 가능한 몇 안 되는 조치라, 이런 유형부터
  빠르게 끝내고 판단이 필요한 유형에 시간을 쓰는 순서가 효율적이었다.
