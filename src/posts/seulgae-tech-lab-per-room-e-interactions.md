---
title: 슬개기술연구소 — 같은 E 키에 방마다 다른 책임을 연결하기
date: 2026-11-16
createdAt: 2026-11-16T21:16:03+09:00
tags: React, Phaser, Spring Boot, WebSocket
summary: 공유 맵의 근접 판정과 서버 좌표 기반 테이블 대화, 요청 수명을 관리하는 정보 패널을 추가한 커밋을 코드와 작업 문서로 정리했다.
category: seulgae-tech-lab
---

React와 Phaser로 만든 연구소에 방 이동을 추가한 뒤, 방마다 다른 행동이 필요했다. 컴퓨터는 빌드 정보를, 서버 랙은 상태를 보여 주고, 회의 테이블에서는 가까운 참가자끼리 대화하도록 했다.

PR #20의 커밋 `94fbdb8` 시각은 로그와 일치한다. 당시 설계와 현재 코드를 함께 읽되 후속 기능은 구분했다.

## 대상 선택과 실행 책임을 나누기

오브젝트별로 키보드 처리를 복제하면 가까운 대상 두 개가 같은 E 입력에 반응할 수 있다. 공유 맵에 `kind`, 영역, 접근 범위를 정의하고, Scene이 대상 하나를 고른 뒤 종류에 맞는 행동을 연결했다.

현재 `frontend/src/game/maps/rooms.ts`의 선택 루프다. 생략한 앞부분에서는 방의 후보를 구성한다.

```ts
  let best: RoomInteraction | undefined
  let bestDistance = Infinity
  for (const interaction of candidates) {
    if (!isNearObject(x, y, interaction, interaction.range)) continue
    const distance = edgeDistance(x, y, interaction)
    if (distance < bestDistance) { best = interaction; bestDistance = distance }
  }
  return best
```

중심점 대신 **사각형 가장자리 거리**를 써 큰 책상에도 자연스럽게 접근하게 했다. 현재 후보의 의자·식물은 후속 추가이며, 대상 선택과 실행의 분리는 유지된다.

`backend/src/main/java/kr/seulgae/techlab/multiplayer/lobby/domain/LobbyWorld.java`의 `Interaction.near()`다.

```java
        public boolean near(double px, double py) {
            double dx = Math.max(Math.abs(px - x) - width / 2, 0);
            double dy = Math.max(Math.abs(py - y) - height / 2, 0);
            return Math.hypot(dx, dy) <= range;
        }
```

## 대화 범위는 화면이 아닌 서버가 결정한다

클라이언트가 “테이블 근처”라고 보내는 값을 그대로 믿으면 범위 밖에서도 대화에 참여할 수 있다.

`LobbyChat`은 발신자 좌표를 검사하고, `LobbySocketHandler`는 같은 방의 테이블 범위 안 참가자에게만 전달한다. 일반 대화와 전송 제한을 공유하지만 최근 기록에는 저장하지 않는다. 나중에 입장한 사람에게 근거리 대화를 과거 기록으로 노출하지 않기 위해서다.

## 정보 패널이 닫히면 조회도 끝나야 한다

상태·빌드 정보는 React 패널이 HTTP API로 읽는다. 상태 API는 집계 정보만 반환하고 `no-store`를 지정한다. 빌드 정보는 Maven의 `build-info`와 이미지 빌드 인자로 연결하며, 커밋 값은 형식을 검사해 표시한다.

상태 패널은 요청 완료 후 다음 조회를 예약하고 종료 시 정리한다. `frontend/src/features/lab/components/LabInfoPanel.tsx`에서 발췌했다.

```ts
    load()
    return () => { controller.abort(); clearTimeout(timer) }
```

`POLL_MS`는 3000이다. 완료 뒤 다음 조회를 예약하고 닫힐 때 요청·타이머를 정리한다. 응답 형식도 검사한다.

## 장애와 설계상 주의를 구별하기

Jackson의 보조 메서드가 JSON 속성에 섞이지 않도록 `table()`로 이름 지었다는 메모도 있다. 실제 장애가 아닌 직렬화 계약을 위한 설계 주의다.

검증 기록은 서버 이동을 이용한 범위 판정·수신자 목록·기록 미저장, 실제 소켓의 거부 응답, 프런트엔드 대상 선택·입력 잠금·리스너 정리를 다룬다. 이번 작성에서는 테스트를 다시 실행하지 않았고 운영 반영 결과는 **확인하지 못함**이다.

## 배운 점

같은 키를 재사용하려면 먼저 대상 선택과 행동 실행을 분리해야 했다.
근거리 대화의 범위는 화면 안내가 아니라 서버 좌표로 검증해야 했다.
패널의 수명에는 화면뿐 아니라 요청과 타이머의 정리도 포함됐다.
