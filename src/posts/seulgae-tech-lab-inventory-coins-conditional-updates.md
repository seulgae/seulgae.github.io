---
title: 슬개기술연구소 — 물고기 소유권과 동전 잔액을 조건부 UPDATE로 지키기
date: 2026-11-17
createdAt: 2026-11-17T19:03:58+09:00
tags: Spring Boot, PostgreSQL, React, WebSocket
summary: 회원 가방과 동전 장부에 조건부 갱신을 적용하고 통신 방식의 후속 변화까지 구분한 커밋을 코드와 작업 문서로 정리했다.
category: seulgae-tech-lab
---

낚시 결과를 브라우저 기록으로만 남기던 단계에서 회원 가방으로 옮겼다. PR #44의 `eef9162`는 물고기를 보관·버리기·줍기로 연결하고 업무 게시물 보상과 오락실 이용료를 추가한 변경이다. 화면에 숫자를 보여 주는 것보다 동시 요청에도 소유권과 잔액을 지키는 일이 중요했다.

## 가방과 바닥을 하나의 아이템 상태로 표현하기

아이템은 주인이 있으면 가방 안에, 주인이 없으면 방과 좌표를 가진 바닥 상태로 저장한다. 별도 테이블 사이에서 복사하기보다 소유권을 바꾸는 구조다. V5 확장에 가방·동전 변동 기록·아이템 테이블을 먼저 넣었다.

현재 `backend/src/main/java/kr/seulgae/techlab/inventory/JdbcInventoryStore.java`의 줍기 갱신이다.

```java
        return jdbc.sql("UPDATE lab.items SET owner_id = :m, room_id = NULL, x = NULL, y = NULL WHERE id = :id AND owner_id IS NULL AND room_id = :room RETURNING " + COLUMNS)
            .param("m", member).param("id", itemId).param("room", roomId).query((rs, row) -> map(rs)).optional();
```

‘주인이 없고 이 방에 있다’는 조건을 갱신문 안에 둔다. 앞서 조회했을 때 비어 있었다는 사실만으로 성공시키지 않는다. 두 사람이 같은 물고기를 주우려 해도 소유권 변경은 조건에 맞는 요청만 성공한다.

## 잔액 검사와 차감을 따로 하지 않기

게시물 보상은 10원, 오락실 새 게임은 1원으로 정했다. 잔액을 읽어 충분하다고 판단한 뒤 별도 UPDATE를 하면 그 사이 다른 결제가 들어올 수 있다. 같은 파일의 조건부 갱신문이다.

```sql
            UPDATE lab.inventories SET coins = coins + :amount, updated_at = CURRENT_TIMESTAMP
            WHERE member_id = :m AND coins + :amount >= 0 RETURNING coins
```

성공한 변동은 사유와 함께 장부에 남긴다. 서비스는 트랜잭션으로 잔액과 변동 기록을 묶는다. 다만 게시물의 하루 보상 횟수 확인과 가방 칸 수 제한까지 이 한 쿼리가 모두 보장하는 것은 아니다. 그 부분의 엄격한 동시성 보장은 별도 검토가 필요하다.

## 소켓을 썼던 이유와 지금의 차이

도입 당시 버리기·줍기는 서버 좌표가 필요한 행동이어서 WebSocket으로 처리했다. 반면 물고기 보관과 결제는 REST를 사용했다. 현재 main은 회의실 밖에 소켓이 없어 버리기·줍기도 REST로 옮겼다. 당시 설계를 현재 동작으로 그대로 소개하면 잘못된 설명이 된다.

현재 `backend/src/main/java/kr/seulgae/techlab/inventory/InventoryService.java`에는 근접 확인이 남아 있다.

```java
        boolean near = store.ground(roomId).stream().anyMatch(item -> item.id().equals(itemId) && Math.hypot(item.x() - x, item.y() - y) <= PICK_RANGE);
        return near ? pick(member, itemId, roomId) : Optional.empty();
```

지금의 좌표는 클라이언트가 전달하므로 도입 당시 서버가 알고 있던 좌표와 신뢰 수준도 다르다. 물고기 보관 역시 어종과 크기 범위는 검사하지만 실제 낚시 성공을 서버에서 재현하는 구조는 아니다.

기록에는 가방 40칸, 방 바닥 30개 제한과 잔액·줍기 규칙 테스트, 타입 검사·빌드 통과가 남아 있다. 로그인 회원 기능의 실제 화면은 당시 로컬에서 확인하지 못했다. 이번 작성에서도 운영의 저장·동시 줍기는 **확인하지 못함**이다.

## 배운 점

공유 아이템은 표시보다 소유권 전이를 먼저 모델링해야 했다.
음수 방지 같은 조건은 조회 이후 판단보다 갱신문 안에 두는 편이 명확했다.
통신 구조가 바뀌면 좌표를 믿는 전제도 함께 다시 설명해야 했다.
