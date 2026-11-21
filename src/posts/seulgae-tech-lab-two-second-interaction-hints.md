---
title: 슬개기술연구소 — 안내를 지워도 상호작용은 남아 있어야 했다
date: 2026-11-17
createdAt: 2026-11-17T13:20:59+09:00
tags: Phaser, TypeScript, Game UI
summary: 의자 안내에서 시작한 2초 표시 규칙을 대상과 문구의 변화로 일반화한 커밋을 코드와 작업 문서로 정리했다.
category: seulgae-tech-lab
---

의자에 다가갈 때마다 E 안내가 캐릭터 이름표와 겹쳤다. 처음에는 문구를 없앴지만 처음 보는 사람에게는 조작 단서가 필요했다. 로그 11번의 의자 전용 2초 안내와 15번의 전체 안내 확장은 이 두 요구를 함께 다룬 과정이다.

PR #34에 포함된 `4765e46`에서 시작해 PR #37의 `c385085`로 확장됐다. 이 글의 시각은 마지막 변경을 기준으로 했다. 안내의 표시 수명만 바꾸고 E 상호작용과 대상 강조는 유지하는 것이 목표였다.

## 대상이 같은데도 안내를 다시 보여 줘야 하는 경우

처음에는 대상 ID와 처음 접근한 시각만 기억하면 충분해 보였다. 의자에서 벗어났다가 돌아오면 ID가 바뀌므로 다시 2초를 보여 줄 수 있었다.

하지만 테이블 대화에 참여하면 같은 테이블의 문구가 ‘참여’에서 ‘나가기’로 바뀐다. 서버실 경보도 같은 랙의 행동을 바꾼다. ID만 기준으로 삼으면 중요한 새 안내가 이미 만료된 상태로 숨는다.

현재 `frontend/src/game/scenes/LabLobbyScene.ts`의 표시 기준이다.

```ts
    const hintKey = door || target ? `${door?.id ?? target?.id}|${this.interactionHint?.text ?? ''}` : undefined
    if (hintKey !== this.hintKey) { this.hintKey = hintKey; this.hintShownAt = this.time.now }
    const hintExpired = this.time.now - this.hintShownAt >= HINT_VISIBLE_MS
    this.interactionHint?.setVisible(enabled && (!!door || !!target) && !hintExpired)
```

핵심은 **대상 ID와 안내 내용의 조합을 상태의 정체성으로 삼는 것**이다. 대상 또는 행동이 달라질 때만 시간을 초기화한다. 매 프레임 현재 시각을 다시 넣으면 2초가 영원히 지나지 않는다.

같은 파일의 표시 시간 상수다.

```ts
const HINT_VISIBLE_MS = 2000
```

## 문구와 강조 표시를 별도로 갱신하기

문구가 사라져도 가까운 물체를 알 수 있도록 노란 강조는 유지했다. 같은 Scene의 강조 갱신이다.

```ts
    if (target) this.interactionHighlight?.setPosition(target.x, target.y + 2).setSize(target.width + 14, target.height + 8)
      .setDepth(target.y + target.height / 2 + 1)
    this.interactionHighlight?.setVisible(!!target && enabled)
```

문구 만료 조건을 강조나 대상 선택 조건에 넣지 않았다. 문구가 숨은 뒤에도 E 입력이 동작해야 하고, 패널이 열리거나 이동 중일 때는 기존 입력 제한을 따라야 하기 때문이다. 시각적인 안내와 행동 가능 여부를 하나로 묶지 않았다.

문 앞과 식물, 커피 등으로 적용 범위를 넓혔지만 모든 오브젝트마다 타이머를 만들지는 않았다. Scene이 현재 대상 하나의 키와 시각을 기억하므로 대상이 바뀔 때 이전 타이머를 취소하는 코드도 필요하지 않았다.

## 화면을 보지 못한 테스트의 의미

기록에는 의자 안내의 2초 전후, 다시 접근했을 때 재표시, 커피와 문 안내 만료, 테이블 대화 문구 변경 시 재표시를 Scene 하네스로 확인했다고 남아 있다. 실제 운영 화면에서 이름표 가림이 얼마나 줄었는지까지 측정한 것은 아니다.

작은 UI 변경에도 상태 전이 테스트가 유용했다. ‘2초 뒤 숨김’만 검사하면 문구가 바뀌는 순간의 재표시를 놓친다. 이번 글은 코드와 당시 기록을 대조했으며 실제 브라우저에서의 현재 시각적 결과는 **확인하지 못함**이다.

## 배운 점

안내의 정체성에는 물체뿐 아니라 현재 가능한 행동도 포함돼야 했다.
문구의 만료와 조작 가능 여부를 분리해야 안내가 사라져도 기능이 유지됐다.
작은 시간 규칙도 진입·만료·재진입이라는 전이로 확인해야 했다.
