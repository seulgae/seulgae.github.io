---
title: 슬개기술연구소 — Phaser 한글 획이 사라진 원인은 축소 렌더링이었다
date: 2026-11-16
createdAt: 2026-11-16T21:46:07+09:00
tags: Phaser, Canvas, HiDPI, TypeScript
summary: 한글 획 손실을 표시 크기와 기기 픽셀 비율로 분석하고 렌더 해상도를 조정한 커밋을 코드와 작업 문서로 정리했다.
category: seulgae-tech-lab
---

픽셀아트 캐릭터는 또렷한데 이름표와 문 이름의 한글은 중간 획이 끊겼다. PR #22의 `f80a9e3`은 글꼴만 교체하는 대신, 글자를 만든 픽셀이 최종 화면까지 어떻게 전달되는지 확인한 수정이다.

당시 기록의 표시 너비는 564 CSS 픽셀, 기기 픽셀 비율은 1.25였다. 실제 표시 영역은 705 기기 픽셀이지만 게임은 가로 800픽셀로 그려지고 있었다. 이 축소 과정에서 최근접 샘플링이 일부 픽셀 줄을 버렸고 가느다란 한글 획도 함께 사라졌다.

## 픽셀아트와 글자가 같은 필터를 쓰던 문제

게임의 `pixelArt: true`는 도트 이미지를 선명하게 표현하기 위한 선택이었다. 하지만 글자 텍스처까지 같은 최근접 필터를 쓰면 축소 손실이 겹친다. 작은 글자에 한글이 없는 기본 글꼴을 지정해 대체 글꼴로 그리는 상황도 있었다.

해결 방향은 세계 좌표를 바꾸는 것이 아니라 **최종 표시 픽셀에 맞는 캔버스를 만드는 것**이었다. 현재 `frontend/src/game/render/renderScale.ts`에서 배율을 구한다.

```ts
export function renderZoomFor(cssWidth: number, devicePixelRatio: number) {
  if (!Number.isFinite(cssWidth) || cssWidth <= 0) return 1
  const ratio = Number.isFinite(devicePixelRatio) && devicePixelRatio > 0 ? devicePixelRatio : 1
  return Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, (cssWidth * ratio) / WORLD_WIDTH))
}
```

서버와 공유하는 게임 세계는 800×600으로 유지하고 캔버스의 내부 해상도와 카메라 배율을 바꿨다. 배율에는 0.5~3 범위를 둔다. 화면 크기를 바꾸기 위해 이동 속도나 충돌 좌표를 다시 계산할 필요는 없었다.

## 반올림 오차까지 실제 배율에 반영하기

같은 파일에서 캔버스 크기를 정수로 만든 뒤 적용 배율을 다시 구한다.

```ts
export function canvasSizeFor(zoom: number) {
  const width = Math.round(WORLD_WIDTH * zoom)
  return { width, height: Math.round((width * WORLD_HEIGHT) / WORLD_WIDTH), zoom: width / WORLD_WIDTH }
}
```

요청한 배율과 정수 캔버스에서 실제 사용하는 배율은 조금 다를 수 있다. 반올림한 너비를 기준으로 다시 계산하면 카메라와 글자가 서로 다른 배율을 쓰는 오차를 줄일 수 있다.

텍스트도 같은 기준으로 만든다.

```ts
export function crispText(scene: Phaser.Scene, x: number, y: number, value: string, style: TextStyle) {
  return scene.add.text(x, y, value, { fontFamily: UI_FONT, ...style }).setResolution(renderZoom(scene))
}
```

한글 글꼴을 앞에 둔 UI_FONT를 기본값으로 사용했다. GameCanvas는 ResizeObserver로 표시 영역 변화를 받고 게임 크기를 갱신한다. 이미 생성한 글자는 컨테이너 내부까지 순회해 해상도를 맞춘다. 처음 생성할 때만 고치면 창 크기를 바꾼 뒤 문제가 돌아올 수 있기 때문이다.

## 기록으로 확인한 범위

작업 로그에는 브라우저 재샘플링 비율을 0.998:1로 측정했다고 남아 있다. 정확히 모든 환경에서 재샘플링이 사라진다는 보장은 아니다. 배율 상한·하한과 정수 반올림이 있고 글꼴의 실제 설치 상태도 환경마다 다르다.

이번 작성에서는 현재 렌더 배율 함수와 GameCanvas 연결을 읽었다. 다양한 모바일 화면과 운영 브라우저에서의 재현·개선 여부는 **확인하지 못함**이다. 당시 측정값을 이번에 새로 측정한 결과로 바꾸지 않았다.

## 배운 점

글자가 깨지면 글꼴뿐 아니라 최종 픽셀로 가는 축소 경로도 확인해야 했다.
세계 좌표와 렌더 해상도를 분리하면 서버 계약을 유지하며 화면을 개선할 수 있었다.
텍스트의 해상도는 생성 시점과 화면 크기 변경 시점에 함께 관리해야 했다.
