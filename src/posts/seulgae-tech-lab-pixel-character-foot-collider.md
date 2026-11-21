---
title: 슬개기술연구소 — 픽셀 캐릭터의 외형과 발밑 충돌을 분리하기
date: 2026-11-15
createdAt: 2026-11-15T20:47:53+09:00
tags: Phaser, TypeScript, Pixel Art, React
summary: 직접 생성한 픽셀 에셋과 방향별 애니메이션을 기존 물리·UI 계약에 연결한 PR #5를 코드와 작업 문서로 정리했다.
category: seulgae-tech-lab
---

사각형 캐릭터를 픽셀아트로 바꿀 때 가장 조심할 부분은 그림보다 충돌이었다. 외형이 커졌다는 이유로 물리 영역까지 키우면 이전에 지나가던 책상 뒤를 통과하지 못한다. PR #5의 `da614be`는 기존 이동과 연구 기록 연결을 유지하면서 화면을 바꾼 작업이다.

## 이미지를 내려받는 대신 정수 픽셀로 그리기

외부 그래픽 리소스 없이 같은 팔레트로 바닥·가구·캐릭터를 생성했다. 당시 `frontend/src/game/assets/pixelAssets.ts`의 텍스처 생성 과정이다.

```ts
  context.imageSmoothingEnabled = false
  draw((color, x, y, w, h) => { context.fillStyle = color; context.fillRect(x, y, w, h) })
  scene.textures.addCanvas(key, canvas)
```

정수 좌표 사각형으로 원본을 만들고 두 배로 표시했다. 이 방식은 작은 도트 리소스를 코드와 함께 관리할 수 있지만, 코드만 읽어 결과의 조화를 판단하기는 어렵다. 등록·크기 검사는 자동화하고 실제 그림은 브라우저로 확인하는 역할 분담이 필요했다.

## 발밑만 부딪히게 만들기

캐릭터는 16×24 원본을 확대해 표시하고 실제 충돌은 발 주변에만 둔다. 도입 커밋의 `frontend/src/game/Player.ts`에서 발췌했다.

```ts
    this.setOrigin(0.5, 1).setScale(2)
    scene.physics.add.existing(this)
    // 32×48 외형과 달리 발밑 20×16 영역만 충돌시켜 가구 뒤를 자연스럽게 지나간다.
    this.body.setSize(10, 8).setOffset(3, 16)
```

외형의 기준점을 발에 두고 y를 깊이로 사용한다. 캐릭터의 머리가 가구 위와 겹쳐도 발이 지나갈 수 있는지로 이동을 판단한다. 시각적 가림과 물리적 통행을 같은 사각형으로 해결하려 하지 않은 것이다.

속도는 초당 거리로 Arcade Physics에 전달한다. 별도로 delta를 또 곱하면 물리 엔진의 시간 적용과 중복될 수 있어 기존 직접 좌표 이동과 구별했다.

## 방향과 걷기 상태를 따로 관리하기

`frontend/src/game/PlayerAnimation.ts`의 방향 선택이다.

```ts
export function getFacing(x: number, y: number, previous: Facing): Facing {
  if (y !== 0) return y < 0 ? 'up' : 'down'
  if (x !== 0) return x < 0 ? 'left' : 'right'
  return previous
}
```

멈췄다고 방향을 초기화하지 않고 마지막 방향의 대기 애니메이션을 재생한다. 걷기와 대기를 네 방향으로 나누되 애니메이션은 게임마다 한 번 등록한다. 벽에 막혀 실제 진행이 없으면 대기 자세를 사용해 제자리에서 발만 움직이는 느낌을 줄였다.

당시 화면은 800×600 세계를 FIT로 맞추고 ResizeObserver로 부모 크기 변화를 반영했다. 이후 한글 렌더링 문제로 렌더 배율 구조가 바뀌었으므로 당시 FIT 구성을 현재 구현으로 단정하지 않는다.

## 당시 확인한 화면과 남은 범위

PR과 `docs/pixel-lobby.md`에는 테스트 13개, lint·빌드, 네 방향 이동과 가구 충돌, E 패널 개폐·입력 잠금, 세 화면 크기의 배치를 확인했다고 남아 있다. 운영 API는 실제 빈 목록을 읽었으며 채워진 운영 기록 상세까지 검증한 것은 아니다. 문 이동과 모바일 조이스틱도 이때는 범위 밖이었다.

이번 글에서는 도입 커밋과 문서를 대조했다. 현재 운영 화면을 새로 실행한 결과는 **확인하지 못함**이다.

## 배운 점

캐릭터의 외형 크기와 통행을 결정하는 충돌 크기는 분리해야 했다.
정지 상태에서도 마지막 방향을 기억해야 애니메이션이 자연스럽게 이어졌다.
에셋 생성 테스트와 실제 화면 검증은 서로 다른 문제를 확인했다.
