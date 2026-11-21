---
title: 슬개기술연구소 — 모바일 조이스틱은 방향보다 손을 뗀 순간이 중요했다
date: 2026-11-16
createdAt: 2026-11-16T15:46:36+09:00
tags: React, Phaser, TypeScript, Pointer Events
summary: 터치 입력을 기존 이동 경로로 통합하고 포인터 취소·화면 전환의 입력 해제를 설계한 PR #16을 정리했다.
category: seulgae-tech-lab
---

모바일에서 연구소를 둘러보려면 키보드 대신 조이스틱과 E 버튼이 필요했다. 새 이동 시스템을 만들면 충돌과 멀티플레이 검증도 두 벌이 된다. PR #16의 `7ed64ed`에서는 하단 조작부가 기존 플레이어에 같은 방향값을 전달하게 했다.

## 아날로그 위치를 기존 8방향으로 바꾸기

패드 손잡이는 손가락을 따라 움직이지만 실제 입력은 -1, 0, 1의 조합이다. 중앙에는 작은 흔들림을 무시하는 데드존을 두고 각도를 45도 단위로 나눈다.

`frontend/src/game/input/mobileInput.ts`의 핵심이다.

```ts
  if (distance < radius * 0.22 || radius <= 0) return { offset, direction: { x: 0, y: 0 } }
  const angle = Math.round(Math.atan2(dy, dx) / (Math.PI / 4)) * Math.PI / 4
  return { offset, direction: { x: Math.round(Math.cos(angle)) || 0, y: Math.round(Math.sin(angle)) || 0 } }
```

손잡이 표시 위치와 이동 명령을 구별했다. 바깥으로 길게 드래그해도 표시 반경만 제한하고 입력은 같은 8방향을 사용한다. 대각선 속도 정규화와 Arcade 충돌은 기존 Player가 계속 담당한다.

키보드와 터치가 동시에 있을 때도 서버 계약을 벗어나지 않게 합친다.

```ts
export function combineDirections(keyboard: DirectionInput, touch: DirectionInput): DirectionInput {
  return { x: Math.sign(keyboard.x + touch.x), y: Math.sign(keyboard.y + touch.y) }
}
```

동일 방향을 두 기기로 입력했다고 두 배 속도가 되지 않는다. 반대 입력은 상쇄된다. 새 장치를 기존 계약에 맞추면 네트워크 프로토콜을 늘릴 필요도 없다.

## 패드 밖에서 손을 떼도 멈춰야 한다

버튼 영역 안의 pointerup만 기다리면 손가락을 밖으로 끌고 나가 놓았을 때 이동이 남을 수 있다. 포인터를 캡처해 드래그를 추적하고 해제·취소·캡처 상실을 같은 초기화 경로로 연결했다.

도입 당시 `frontend/src/components/MobileControls.tsx`의 초기화 순서다.

```ts
    const id = pointer.current
    pointer.current = null
    if (id !== null && pad.current?.hasPointerCapture(id)) pad.current.releasePointerCapture(id)
    setOffset({ x: 0, y: 0, active: false }); onMove({ x: 0, y: 0 })
```

캡처 해제는 다시 lostpointercapture를 발생시킬 수 있어 현재 포인터부터 비운다. 외형을 중앙으로 돌리는 것과 게임에 정지값을 보내는 것도 함께 수행한다. 손잡이만 돌아오고 캐릭터는 계속 걷는 상태가 남아서는 안 된다.

## 패널과 화면 전환도 제스처의 끝이다

화면 숨김, 창 포커스 상실, 크기 변경, 채팅과 연구 패널 입력 시 진행 중인 조작을 해제한다. React 컴포넌트 종료 때 리스너도 제거한다. E 버튼은 별도 상호작용 구현 대신 Scene의 기존 입력 이벤트를 사용한다.

이는 하단 버튼의 배치보다 입력 수명에 관한 작업이었다. 조이스틱이 눌린 상태에서 모달이 열려도 모달을 닫았을 때 옛 입력이 재개되지 않도록 했다. 세로·가로 화면에서는 조작부와 채팅의 위치를 나눴다.

## 모의 포인터와 실제 휴대폰은 구별하기

PR에는 프런트 테스트 35개, lint·타입 검사·빌드, 로컬 브라우저의 세로·가로·PC 배치와 패드 밖 드래그, E 패널 개폐·입력 잠금 확인이 남아 있다. 실제 휴대폰의 멀티터치와 터치 감도는 검증하지 않았다. 이번 작성에서도 실기기와 운영 동작은 **확인하지 못함**이다.

## 배운 점

새 입력 장치는 기존 이동 규칙에 연결하는 편이 책임을 줄였다.
포인터 취소와 캡처 상실도 정상적인 제스처 종료로 처리해야 했다.
입력 초기화에는 화면 상태와 실제 게임 명령이 함께 포함돼야 했다.
