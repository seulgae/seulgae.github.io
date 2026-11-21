---
title: 슬개기술연구소 — 서버 기준 이동에도 전송과 종료의 순서가 필요했다
date: 2026-11-16
createdAt: 2026-11-16T01:28:13+09:00
tags: WebSocket, Spring Boot, TypeScript, Concurrency
summary: 서버 기준 이동과 전송 제한·송신 종료 경쟁을 보완한 PR #6~#10을 정리했다.
category: seulgae-tech-lab
---

멀티플레이를 처음 붙일 때 클라이언트 좌표를 그대로 방송하지 않았다. 브라우저는 방향을 보내고 서버가 속도와 충돌을 계산했다. PR #6의 `9aa0c9b`로 시작했지만, 검증이 엄격하다는 사실만으로 정상 사용자의 연결이 안정적인 것은 아니었다. #7~#10은 전송·수신·종료의 시간 차이를 다룬 후속 작업이다.

## 좌표 대신 입력을 받는 이유

초기 서버는 최대 5명의 메모리 로비에서 방향을 정규화해 공유 맵으로 이동시켰다. 클라이언트 좌표·시간은 받지 않았다. 도입 당시 `backend/src/main/java/kr/seulgae/techlab/multiplayer/lobby/domain/LobbyRoom.java`의 계산이다.

```java
            double length = Math.hypot(x, y);
            var position = world.move(member.x, member.y, length == 0 ? 0 : x / length * 200 * elapsed, length == 0 ? 0 : y / length * 200 * elapsed);
```

대각선도 같은 속도를 쓰며 벽은 서버가 다시 검사한다. 화면은 로컬 예측·원격 보간을 사용했다. 완료 입력 재생으로 바뀐 시간선은 기존 이동 보정 글에서 다뤘다.

## 20Hz로 보내도 수신은 몰릴 수 있다

방향 변경마다 즉시 보내면서 정기 전송도 수행하면 의도한 전송률을 넘을 수 있었다. #8에서는 두 경로에 같은 최소 간격을 적용했다. #9에서는 정상 전송도 네트워크에서 지연돼 한꺼번에 도착할 수 있는 상황을 재현했다.

`695a1bd`의 `backend/src/main/java/kr/seulgae/techlab/multiplayer/lobby/websocket/LobbySocketHandler.java`는 토큰을 시간에 따라 보충한다.

```java
            inputTokens = Math.min(INPUT_BURST_CAPACITY,
                inputTokens + Math.max(0, now - replenishedAt) / 1_000_000_000d * INPUTS_PER_SECOND);
            replenishedAt = now;
            if (inputTokens < 1) return false;
            inputTokens--;
            return true;
```

당시 기준은 초당 40개 보충과 최대 80개 여유분이었다. 짧은 몰림을 허용하면서 지속 과다 입력은 제한한다. 무조건 한도를 없애는 수정과 다르다. 버스트 재현이 실제 운영의 종료 원인까지 확정하지는 않는다.

## 종료 프레임도 같은 송신 흐름에서 처리하기

#7에서는 데이터 송신 중 다른 스레드가 연결을 닫아 정책 종료 1008 대신 비정상 종료 1006처럼 보일 수 있는 경로를 고쳤다. 플레이어는 즉시 제거하되 정상 종료 프레임은 송신 작업자가 전달하게 했다.

`3a1f268`의 같은 핸들러 송신 루프다.

```java
                        var closeStatus = peer.closing.getAndSet(null);
                        if (closeStatus != null) {
                            if (peer.socket.isOpen()) peer.socket.close(closeStatus);
                            break;
                        }
```

느리거나 손상된 연결의 강제 정리는 별도 경로로 남겼다. 종료 코드와 이유, 송수신 개수·경과 시간을 나누어 기록하되 원문 입력과 자격 증명은 로그에 넣지 않는다.

#10에서는 정지 입력 후 불필요한 전송을 멈추고 ping/pong으로 유휴 연결을 유지했다. 고정 인사는 서버 지원 확인 후 켰고 이후 #12의 채팅으로 교체됐다.

PR 기록에는 송신 중 종료 경쟁, 정상 입력 몰림 수용과 과다 입력 거부, 실제 로컬 소켓·브라우저 검증이 남아 있다. 재기동 뒤 정상화된 사례도 있지만 거부된 원문이 없어 정확한 필드를 단정하지 않았다. 운영 연결은 **확인하지 못함**이다.

## 배운 점

서버 검증과 정상 사용자의 지연 허용은 함께 설계해야 했다.
송신 주기와 실제 수신 주기는 같은 수치가 아니었다.
종료 원인을 전달하려면 데이터 송신과 종료의 순서도 지켜야 했다.
