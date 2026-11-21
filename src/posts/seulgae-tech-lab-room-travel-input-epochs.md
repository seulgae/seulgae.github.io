---
title: 슬개기술연구소 — 방을 바꿀 때 좌표뿐 아니라 입력의 세대도 바꾸기
date: 2026-11-16
createdAt: 2026-11-16T20:31:58+09:00
tags: Phaser, WebSocket, Spring Boot, TypeScript
summary: 공유 맵의 서버 승인 이동과 roomEpoch·입력 초기화를 연결한 PR #19를 당시 코드와 후속 변경으로 구분해 정리했다.
category: seulgae-tech-lab
---

로비를 여러 연구실로 넓히면 방 배경만 바꿔서는 안 된다. 이전 방에서 보낸 이동이 도착한 방에서 처리되거나 늦은 상태가 새 캐릭터를 덮을 수 있다. PR #19의 `ae1ca2e`는 서버가 문을 검증한 뒤 이동을 승인하고 입력의 시간선도 함께 전환한 작업이다.

이 글은 모든 방이 멀티플레이였던 당시 구조다. 현재는 PR #50으로 회의실만 실시간 연결을 사용하므로 아래 승인 프로토콜을 현재 모든 방의 동작으로 읽으면 안 된다.

## 문과 스폰은 서버·클라이언트가 같이 읽기

`shared/lobby-world.json`에 출입구 ID·목적지·안전 스폰·가구를 넣었다. 서버와 Phaser가 같은 데이터를 사용해 보이는 문과 실제 목적지가 어긋나지 않게 했다. 당시 서버는 현재 방의 출입구인지, 캐릭터와 가까운지, 쿨다운을 지켰는지 확인한다.

도입 커밋의 `backend/src/main/java/kr/seulgae/techlab/multiplayer/lobby/domain/LobbyRoom.java`는 승인 뒤 상태를 함께 바꾼다.

```java
        m.roomId = target; m.roomEpoch++; m.movedAt = now;
        m.x = spawn.x(); m.y = spawn.y(); m.facing = "down"; m.moving = false;
        m.inputX = 0; m.inputY = 0; m.sequence = -1; m.receivedSequence = -1;
        m.pending.clear(); m.pendingMs = 0; m.timeBudget = 250; m.budgetAt = now;
```

위치만 바꾸면 이전 방의 대기 입력이 새 스폰부터 재생된다. 방 세대를 올리고 입력 번호·ACK·대기 명령·시간 예산을 동시에 초기화했다. 같은 방으로 돌아와도 이전 방문과 새 방문을 구별할 수 있다.

## 같은 소켓 안에서도 메시지의 유효 범위가 있다

방을 바꿀 때 소켓과 플레이어 ID는 유지한다. 대신 메시지에 방과 세대를 붙이고 늦게 도착한 상태·채팅을 거른다. 최종 PR 커밋 `910c5e8`의 `frontend/src/features/multiplayer/MultiplayerClient.ts`다.

```ts
        if (message.type !== 'welcome' && message.type !== 'room_changed' && message.roomId !== undefined
            && (message.roomId !== this.roomId || message.roomEpoch !== this.roomEpoch)) return
```

목적지로 옮긴 뒤에는 새 방의 최근 기록을 받되 옛 내역을 말풍선으로 재생하지 않는다. 상태와 채팅은 같은 방에만 전달하고 방 이동이 채팅 전송 제한까지 초기화하지 않게 했다.

## 보간의 서버 시각도 이어 주기

승인 응답에서 좌표만 받고 서버 시각을 놓치면 새 방의 원격 보간은 잘못된 기준으로 시작한다. 같은 파일은 입력과 함께 시각을 갱신한다.

```ts
          this.input = {x:0,y:0}; this.lastSentInput = null; this.lastInputSent = -Infinity; this.serverTime = message.time
```

후속 테스트 커밋은 승인에도 보간 시각이 전달되는지 확인한다. 화면 전환의 페이드가 자연스러워도 네트워크 버퍼의 시간 기준이 맞는지는 별개의 문제였다.

## Scene 종료 순서도 실제로 확인하기

Phaser 게임은 유지하고 Scene만 재시작한다. 구독과 UI·물리 이벤트, 원격 캐릭터·말풍선·예측 버퍼를 정리해야 한다. 브라우저에서 Physics 플러그인이 world를 먼저 비워 종료 중 이벤트 해제가 실패하는 문제가 발견돼 원래 객체를 보관해 정리하고 회귀 테스트를 추가했다.

PR에는 자동화의 18회 전환, 실제 소켓의 이전 세대 무시와 새 입력, 로컬 두 창의 합류·채팅 격리 확인이 남아 있다. 최종 회의실 UI와 장시간 메모리 검증은 완료하지 못했다. 이번 글에서도 운영 왕복과 메모리 누수 부재는 **확인하지 못함**이다.

## 배운 점

공간 전환은 좌표 이동과 입력 수명의 전환을 함께 다뤄야 했다.
같은 연결을 유지해도 메시지에는 방과 방문 세대의 경계가 필요했다.
보간 시계와 Scene 종료 순서는 화면 연출만 보고 검증할 수 없었다.
