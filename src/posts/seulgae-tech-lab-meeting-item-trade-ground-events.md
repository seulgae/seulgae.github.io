---
title: 슬개기술연구소 — 아이템 교환은 신청보다 소유권 확정이 중요했다
date: 2026-11-21
createdAt: 2026-11-21T22:06:06+09:00
tags: Spring Boot, WebSocket, PostgreSQL, React, Transactions
summary: 회의실 교환 신청과 조건부 소유권 교체, REST 변경의 소켓 알림을 연결한 PR #55를 코드와 검증 기록으로 정리했다.
category: seulgae-tech-lab
---

회의실에서 아이템을 버려도 다른 창에는 바로 보이지 않았다. 버리기·줍기를 REST로 옮긴 뒤 방 입장 때만 바닥을 읽었기 때문이다. PR #55의 `8376617`은 이 누락을 연결하면서 회원끼리 아이템을 맞바꾸는 기능을 추가했다.

## 짧은 신청과 영속 소유권을 나누기

교환 신청은 서버 메모리 TradeDesk에 두고 60초 뒤 만료시킨다. 받은 사람이 자신의 아이템을 선택해 답할 때 실제 DB 소유권을 바꾼다. 대기 상태를 저장하기 위한 새 스키마는 추가하지 않았다.

`backend/src/main/java/kr/seulgae/techlab/multiplayer/lobby/domain/TradeDesk.java`는 수신자만 신청을 소비하게 한다.

```java
        var offer = offers.get(tradeId);
        if (offer == null || !offer.toPlayer().equals(byPlayer)) return Optional.empty();
        offers.remove(tradeId);
        return Optional.of(offer);
```

자기 자신에게 신청하지 못하고 이미 진행 중인 신청이 있는지도 확인한다. 한쪽이 나가면 관련 신청을 지우고 상대에게 알린다. synchronized는 이 단일 서버 메모리의 동시 접근을 조정하는 장치이며 여러 서버에 걸친 대기열은 아니다.

## 신청할 때 내 물건이었다는 사실만 믿지 않기

상대가 답하는 동안 물고기를 버리거나 다른 상태로 옮길 수 있다. 따라서 확정 시점의 소유권을 다시 검사해야 한다. `backend/src/main/java/kr/seulgae/techlab/inventory/JdbcInventoryStore.java`는 두 아이템을 한 문장으로 갱신한다.

```sql
            UPDATE lab.items SET owner_id = CASE WHEN id = :itemA THEN :b ELSE :a END
            WHERE (id = :itemA AND owner_id = :a) OR (id = :itemB AND owner_id = :b)
```

서비스는 바뀐 행이 정확히 2개가 아니면 예외를 발생시켜 트랜잭션을 롤백한다. 한 물건만 넘어가는 부분 성공을 허용하지 않는 것이다. 교환 신청 ID가 유효한지와 실제 소유권이 유효한지는 별도의 조건이다.

이 과정에서 WebSocket 핸드셰이크의 회원 확인도 다시 필요해졌다. 회의실 전용 연결 전환 때 없앴던 처리를 교환 권한 검증용으로 되살렸다. 익명 플레이어 ID와 회원의 아이템 소유권을 같은 값으로 취급하지 않는다.

## REST는 변경하고 소켓은 알려 주기

버리기·줍기는 REST를 유지한다. 성공 뒤 컨트롤러가 Spring 이벤트를 발행하고 소켓 핸들러가 같은 방에 바닥 목록을 보낸다. `backend/src/main/java/kr/seulgae/techlab/inventory/InventoryController.java`의 알림 연결이다.

```java
        var items = service.groundView(room);
        events.publishEvent(new GroundChanged(room, items));
        return items;
```

상태 변경 경로를 소켓으로 다시 복제하는 대신 알림을 덧붙였다. 인프로세스 이벤트는 영속 메시지 큐나 outbox와 같지 않다. 이벤트가 있다는 이유만으로 장애 시에도 알림 유실이 없다고 말할 수는 없다.

React 가방은 교환 가능한 연결과 대상 목록을 보여 주고, 수신 창은 맞바꾸기·거절을 처리한다. 결과 알림 뒤에는 가방을 다시 읽는다. 클라이언트가 소유권을 임의로 확정하지 않고 서버 결과를 반영한다.

## 검증과 남은 화면 확인

PR에는 백엔드 91개·프런트 123개 테스트, 타입 검사·빌드 통과가 기록돼 있다. 신청 만료·수신자·중복·자기 대상 거부와 교환 실패의 원상 유지, 비회원 요청과 메시지 처리를 다뤘다. 로그인 회원 두 명이 필요해 교환 화면은 로컬에서 확인하지 못했다. 이번 작성에서도 운영 두 계정 교환은 **확인하지 못함**이다.

## 배운 점

교환 의사와 소유권 변경은 서로 다른 수명과 저장 책임을 가졌다.
최종 소유권 검사는 확정 순간의 조건부 갱신으로 수행해야 했다.
REST 변경과 실시간 통지는 연결하되 전달 보장의 수준까지 구별해야 했다.
