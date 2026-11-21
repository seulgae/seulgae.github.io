---
title: 슬개기술연구소 — CCTV의 관측 범위와 낚시의 시간 규칙을 분리하기
date: 2026-11-17
createdAt: 2026-11-17T14:12:50+09:00
tags: Phaser, TypeScript, WebSocket, Game Design
summary: 관제실의 선택적 상태 배포와 바깥 초원·낚시의 순수 규칙을 추가한 커밋을 코드와 작업 문서로 정리했다.
category: seulgae-tech-lab
---

방을 늘리는 작업은 배경 그림만 추가하는 일이 아니었다. PR #38의 `d30427b`에서는 다른 방의 움직임을 보는 관제실과 혼자 쉬는 바깥 초원을 만들었다. 한쪽은 공유 상태를 관측하고 다른 쪽은 브라우저 안에서 시간을 진행한다. 두 공간의 상태 책임을 분리하는 것이 핵심이었다.

## 보는 사람에게 필요한 정보만 보내기

당시 서버는 관제실의 참가자에게만 여러 방의 목록을 4틱마다 보냈다. 모든 사람에게 모든 방을 전송하지 않고 공유 맵에 CCTV 상호작용이 있는지로 기능을 판단했다. 화면은 평면도에 위치를 축소해서 표시하고 React 패널은 더 큰 SVG 지도를 제공했다.

이 관제실 구현은 이후 PR #51에서 관리자실로 교체돼 현재 main에는 없다. 따라서 관련 소스는 도입 커밋에서 확인했다. 아래는 당시 `frontend/src/game/rooms/controlRoomFx.ts`가 방 평면도를 만드는 부분이다.

```ts
    for (const object of roomObjects(roomId)) {
      const a = feedPoint(map, object.body.x - object.body.width / 2, object.body.y - object.body.height / 2)
      const b = feedPoint(map, object.body.x + object.body.width / 2, object.body.y + object.body.height / 2)
      floor.fillRect(a.x, a.y, Math.max(1, b.x - a.x), Math.max(1, b.y - a.y))
    }
```

가구를 별도 좌표로 다시 그리지 않고 공유 맵의 영역을 화면 크기에 사상했다. 게임 공간과 관측 화면이 다른 배치를 갖지 않게 하는 선택이다.

## 낚시는 화면 효과보다 상태 전이가 먼저다

낚시는 던지기 → 대기 → 입질 → 게이지 → 결과로 진행한다. 시간대별 어종과 희귀도별 난이도는 Phaser 밖의 함수로 나눴다. 현재 `frontend/src/game/rooms/fishingLogic.ts`의 바늘 위치 계산이다.

```ts
export function needleAt(elapsedMs: number, rarity: Rarity) {
  const phase = (Math.max(elapsedMs, 0) / 1000 * NEEDLE_SPEED[rarity]) % 2
  return phase <= 1 ? phase : 2 - phase
}
```

프레임마다 일정 픽셀을 더하는 대신 경과 시간으로 위치를 구한다. 난수도 주입할 수 있어 어종 선택과 성공 구간을 재현할 수 있다. 최초 기록은 localStorage의 오늘 마릿수와 최대 크기였고, 회원 가방 저장은 이후 추가다.

## 바닥은 가구와 같은 깊이 규칙을 쓰면 안 된다

다리와 데크를 오브젝트 아래쪽 y로 정렬했더니 위에 선 캐릭터가 판자 밑으로 숨었다. 걸어 다니는 바닥에 가구의 앞뒤 가림 규칙을 적용한 것이 원인이었다. 후속 수정 `cb18ff4`로 깊이를 고정했다. 현재 `frontend/src/game/rooms/outdoorFx.ts`의 값이다.

```ts
export const WALKABLE_DECK_DEPTH = -41
```

물보다 위, 캐릭터보다 아래에 두어 바닥으로 다뤘다. 물의 충돌 영역은 공유 맵에 남기고 다리가 있는 구간만 통행할 수 있게 했다.

기록에는 숨겨진 브라우저에서 프레임이 줄어 트윈과 타이머의 체감이 어긋난 일이 남아 있다. 문자 키 자동 입력도 Phaser에 전달되지 않아 모바일 E 버튼으로 일부 흐름을 확인했다. 낚시 단계 화면과 잡기·기록의 단위 검증은 구별돼 있다. 이번 글에서 실제 운영 플레이와 현재 물고기 획득 흐름은 **확인하지 못함**이다.

## 배운 점

관측 기능은 필요한 사람과 범위에 맞춰 상태를 배포해야 했다.
미니게임 규칙을 시간과 난수의 함수로 만들면 화면 없이도 검증할 수 있었다.
걸어 다니는 바닥과 앞을 가리는 가구에는 서로 다른 깊이 규칙이 필요했다.
