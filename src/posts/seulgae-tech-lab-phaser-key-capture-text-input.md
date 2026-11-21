---
title: 슬개기술연구소 — 한글은 써지는데 띄어쓰기가 막힌 이유
date: 2026-11-17
createdAt: 2026-11-17T20:30:33+09:00
tags: Phaser, React, TypeScript, DOM
summary: Phaser의 전역 키 가로채기를 입력 포커스와 연동해 게시판 입력을 복구한 커밋을 코드와 작업 문서로 정리했다.
category: seulgae-tech-lab
---

업무 게시판과 방명록에서 한글은 입력되는데 스페이스바가 먹지 않았다. 입력창의 길이 제한이나 저장 API보다 먼저 브라우저가 키의 기본 동작을 취소하는지 확인해야 했다. PR #47의 `82f86cc`는 React 입력창과 Phaser 키보드가 같은 페이지에 있을 때 생긴 문제를 다룬다.

## 게임 입력을 막아도 기본 동작 취소는 남는다

Phaser에 방향키나 Space, WASD, E, I를 등록하면 해당 키가 가로채기 목록에 들어간다. 이 처리는 캔버스만이 아니라 window로 전파된 키 이벤트에도 영향을 준다. 입력창에 포커스가 있어도 preventDefault가 실행되면 글자가 입력되지 않는다.

한글이 가능했던 이유는 당시 IME 조합 중 입력이 일반 Space와 다른 코드로 들어왔기 때문이다. 그래서 ‘문자는 써지니 키보드 문제는 아니다’라는 판단이 틀렸다. 영문 이동 키도 같은 영향을 받을 수 있었다.

기존 채팅과 연구 입력은 전파를 막았지만 새 게시판마다 같은 방어를 복사하는 방식은 빠뜨리기 쉬웠다. Scene 한 곳에서 입력 포커스에 따라 가로채기를 전환했다.

## 포커스가 입력의 소유자를 결정하게 하기

현재 `frontend/src/game/scenes/LabLobbyScene.ts`의 전환 부분이다.

```ts
    const keyboard = this.input.keyboard
    if (!keyboard || textFocused === this.keyCaptureReleased) return
    this.keyCaptureReleased = textFocused
    if (textFocused) keyboard.disableGlobalCapture()
    else keyboard.enableGlobalCapture()
```

입력창에 포커스가 있으면 브라우저 기본 입력을 살리고, 게임으로 돌아오면 Space와 방향키가 페이지를 스크롤하지 않게 다시 가로챈다. 게임의 이동 비활성화와 DOM 기본 동작 허용은 서로 다른 조치다. 캐릭터만 멈춰서는 띄어쓰기가 복구되지 않는다.

다음 프레임만 기다리면 포커스를 옮긴 직후 누른 키를 놓칠 수 있다. 같은 파일은 포커스 이벤트도 받는다.

```ts
  private readonly syncKeyCaptureNow = () => this.syncKeyCapture()
  private readonly onFocusChange = () => { setTimeout(() => this.syncKeyCapture(), 0) }
```

focusin은 즉시 반영하고 focusout은 새 포커스가 정해진 뒤 확인한다. update에서도 현재 상태를 맞춰 놓친 전이를 보완한다. 같은 값일 때는 다시 토글하지 않는다.

## Scene이 끝나면 입력 정책도 돌려놓기

방을 옮겨 Scene이 끝났는데 가로채기가 꺼진 채 남으면 다음 장면의 조작이 달라질 수 있다. 종료 시 등록한 리스너를 제거하고 원래 상태를 복원한다.

```ts
      globalThis.document?.removeEventListener?.('focusin', this.syncKeyCaptureNow)
      globalThis.document?.removeEventListener?.('focusout', this.onFocusChange)
      this.syncKeyCapture(false)
```

리스너 정리는 메모리 문제뿐 아니라 입력의 소유권 문제이기도 했다. 이전 Scene이 살아 있는 것처럼 반응하면 새 장면과 전역 키 상태를 번갈아 바꿀 수 있기 때문이다.

## 확인한 값은 입력 성공 화면만이 아니었다

당시 로그에는 Space keydown의 defaultPrevented를 비교한 결과가 남아 있다. 수정 전 일반 입력창은 true였고, 수정 후 입력창의 Space와 w는 false였다. 게임 본문에서는 true를 유지했고 입력창을 벗어나면 다시 가로챘다. 프런트 테스트 113개와 타입 검사 통과도 기록돼 있다.

이번 글은 해당 코드와 기록을 대조했다. 모든 모바일 키보드·IME 조합에서 같은 결과인지는 **확인하지 못함**이다.

## 배운 점

입력 버그는 값 저장 이전에 이벤트의 기본 동작 취소부터 확인해야 했다.
게임 이동 잠금과 브라우저 문자 입력 허용은 다른 책임이었다.
전역 입력 정책에는 포커스 전환과 Scene 종료 시 복원이 함께 필요했다.
