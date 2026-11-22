---
title: List·Set·Map은 어떤 기준으로 선택하는가
date: 2026-11-22
createdAt: 2026-11-22T13:06:34+09:00
tags: Java, Collections, HashMap, Interview
summary: 중복·순서·키 조회 요구에서 자료구조를 선택하고 해시 동등성과 공유 컬렉션의 제약을 정리한다.
category: java
---

# List·Set·Map은 어떤 기준으로 선택하는가

## 1. 학습 배경

조회 결과나 발송 대상을 담을 때 컬렉션 이름보다 필요한 연산을 먼저 설명하려 한다. 실제 업무에서 사용한 구체 클래스와 크기는 별도 코드 확인 대상이다. 아래 발송 대상 처리는 학습용이다.

## 2. 핵심 개념

List는 순서와 중복을 허용하는 원소 모음, Set은 동등성 기준으로 중복을 배제하는 모음이다. Map은 키와 값을 연결하며 Collection을 직접 상속하는 타입은 아니다. “순서가 있다”와 “정렬돼 있다”도 다르다.

## 3. 동작 원리

ArrayList는 내부 배열로 인덱스 접근을 지원하고, 용량 확장이나 중간 삽입에서는 복사·이동 비용이 생긴다. HashMap은 키의 해시를 통해 후보 버킷을 좁힌 뒤 동등성을 확인한다. 동일한 객체로 판정되면 기존 키의 값이 갱신된다.

좋은 분산을 전제로 HashMap의 기본 조회·삽입은 기대 상수 시간이다. 모든 입력에서 무조건 O(1)은 아니다. 충돌·용량·재해시와 메모리 비용을 함께 봐야 한다. 동등한 키는 같은 hashCode를 반환해야 하며, 저장 뒤 키의 동등성 관련 값을 바꾸면 조회가 어긋날 수 있다. [Java 17 HashMap 계약](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/HashMap.html)을 기준으로 한다.

## 4. 실무 활용

**학습용 선택 예제:** 표시 순서를 유지하는 발송 이력은 List, 이미 처리한 식별자를 메모리에서 확인할 때는 Set, 메시지 ID로 결과를 찾을 때는 Map을 검토한다. 재시작·다중 서버까지 중복을 막아야 한다면 메모리 Set만으로 업무 멱등성을 보장하지 않는다.

삽입 순서 유지와 키 조회가 함께 필요하면 LinkedHashMap 같은 후보를 비교한다. 실제 자료량·조회 패턴이 없으면 특정 컬렉션의 성능 우위를 수치로 단정하지 않는다.

## 5. 주의사항 및 오개념

HashMap은 기본적으로 스레드 안전하지 않다. ConcurrentHashMap을 선택해도 여러 메서드를 조합한 업무 전체가 자동으로 원자적이지는 않다. Set의 중복 기준과 업무상 같은 발송의 기준도 다를 수 있다.

## 6. 기술 면접 예상 질문

| 질문·의도 | 답변에 담을 핵심과 구어체 예시 | 꼬리 질문 |
| --- | --- | --- |
| List·Set·Map을 어떻게 고르나? 요구 분석 | “순서와 중복, 키 조회가 필요한지부터 정해요. 그다음 구현체의 시간·메모리 비용을 비교하겠습니다.” | 정렬 순서가 필요하면? |
| equals와 hashCode는 왜 함께 보나? 조회 원리 | “해시로 후보를 좁히고 동등성을 판단하니까, 같은 키의 해시가 달라지면 정상 조회를 기대할 수 없어요.” | 키가 가변 객체라면? |
| 메모리 Set으로 중복 발송을 막나? 범위 인식 | “한 프로세스 안의 중복 확인에는 쓸 수 있지만, 서버가 여러 대거나 재시작되면 DB 제약 같은 지속적인 장치가 필요해요.” | 원자적 등록은 어떻게 하나? |

## 7. 핵심 요약

의미상의 요구를 고르고 구현 비용을 비교한다. 컬렉션의 중복 배제와 [업무 멱등성](/blog/message-delivery-idempotency)은 범위가 다르다.

## 8. 참고 자료

- [Java SE 17 — HashMap](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/HashMap.html): 해시 조회·순서·동기화 계약. 다른 구현체의 세부 성능은 해당 API로 따로 확인한다.
- [Java SE 17 — java.util](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/package-summary.html): 컬렉션 인터페이스와 구현 분류.

---

[이전 복습](/blog/java-oop-interface-abstract-class) · [다음 복습](/blog/java-exception-handling-boundaries)
