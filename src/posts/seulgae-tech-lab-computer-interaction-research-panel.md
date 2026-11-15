---
title: 컴퓨터 상호작용으로 React 연구 기록 패널 열기 — 슬개기술연구소 8단계
date: 2026-11-15
createdAt: 2026-11-15T12:40:38+09:00
tags: Phaser, React, TypeScript, 이벤트, 게임 개발
summary: 컴퓨터 근접 판정과 E 키 단일 입력을 React 패널에 연결하고, 이동 잠금과 이벤트 정리·반복 개폐를 검증한 기록.
category: seulgae-tech-lab
---

연구소 로비에서 캐릭터가 움직이고 벽과 가구에 막히는 것까지 구현했다. 이번에는 컴퓨터 가까이에서 E를 누르면 React로 만든 **연구 기록 패널**을 여는 기능을 추가했다.

게임 오브젝트의 거리와 입력은 Phaser가 판단하고, 기록을 보여 주는 화면은 React가 담당하도록 나눴다. 화면만 여는 것으로 끝내지 않고 패널 표시 중 이동 잠금, 닫은 뒤 입력 복구, 반복 개폐 시 이벤트 정리까지 확인했다.

## 먼저 확인한 기존 상태와 작업 범위

작업 전 실제 코드와 Git 상태를 확인했다. 800×600 화면, 24×24 주황색 플레이어, WASD·방향키 이동, Arcade Physics 기반 벽·가구 충돌이 구현되어 있었다. Phaser는 `3.90.0`으로 고정되어 있었고 작업 트리는 깨끗했다.

이번에는 컴퓨터 한 개만 상호작용 대상으로 삼았다. 연구 기록은 임시 데이터 한 건이며, 로그인·백엔드 API·PostgreSQL·추가 연구실은 연결하지 않았다. 새로운 라이브러리도 추가하지 않았다.

| 파일 | 변경과 역할 |
| --- | --- |
| `frontend/src/game/interaction.ts` | 생성. 오브젝트 가장자리까지의 거리 계산 |
| `frontend/src/game/gameEvents.ts` | 생성. 패널 열기·닫기 이벤트 이름 정의 |
| `frontend/src/components/ResearchPanel.tsx` | 생성. 연구 기록과 닫기 UI |
| `frontend/src/game/scenes/LabLobbyScene.ts` | 수정. 근접 안내, E 입력, 패널 상태와 이동 제어 |
| `frontend/src/components/GameCanvas.tsx` | 수정. 인스턴스별 이벤트 연결과 React 상태 관리 |
| `frontend/src/game/LobbyMap.ts` | 수정. 컴퓨터 위치·크기를 공통 상수로 정리 |
| `frontend/src/game/Player.ts` | 수정. 이동 잠금 시 속도를 0으로 설정 |
| `frontend/src/App.css` | 수정. 연구소 콘셉트의 패널 스타일 |
| `frontend/tests/interaction.test.mjs` | 생성. 거리와 장면 이벤트 흐름 검증 |
| `frontend/package.json` | 수정. `npm test` 명령 추가 |

## 중심점 대신 컴퓨터 책상 가장자리로 접근을 판정했다

컴퓨터는 112×72 크기의 책상 위에 있다. 캐릭터가 책상을 통과할 수 없으므로, 컴퓨터 중심까지의 거리만 짧게 제한하면 바로 앞에 서 있어도 상호작용이 어려워질 수 있다.

책상 배치와 상호작용 판정이 같은 값을 쓰도록 `LobbyMap.ts`에서 다음 상수를 내보냈다. 모니터·키보드 장식 위치도 이 좌표를 기준으로 계산하도록 바꿨다.

```typescript
export const COMPUTER = { x: 620, y: 330, width: 112, height: 72 }
```

판정 함수는 다음과 같다. 실제 파일의 코드다.

```typescript
type InteractionArea = { x: number; y: number; width: number; height: number }

// 오브젝트 중심이 아닌 가장 가까운 가장자리까지의 거리로 판정한다.
export function isNearObject(x: number, y: number, area: InteractionArea, range: number) {
  const dx = Math.max(Math.abs(x - area.x) - area.width / 2, 0)
  const dy = Math.max(Math.abs(y - area.y) - area.height / 2, 0)
  return Math.hypot(dx, dy) <= range
}
```

플레이어의 중심에서 책상 사각형의 가장 가까운 지점까지의 거리를 계산한다. 현재 상호작용 범위는 56px이다. 이 값은 두 오브젝트 표면 사이의 거리가 아니라 **플레이어 중심과 책상 가장자리 사이의 거리**라는 점을 구분했다.

안내는 범위 안에 있고 패널이 닫힌 경우에만 표시한다.

```typescript
const nearby = isNearObject(this.player.x, this.player.y, COMPUTER, 56)
this.interactionHint?.setVisible(nearby && !this.researchOpen)
```

처음에는 안내 문구를 책상 아래에 배치했는데, 브라우저에서 보니 플레이어를 가렸다. 안내를 컴퓨터 위쪽으로 옮긴 뒤 다시 확인했다. 범위를 벗어나면 문구는 숨겨진다.

## E를 누르고 있어도 한 번만 실행하도록 했다

상호작용에는 `isDown` 대신 `Phaser.Input.Keyboard.JustDown()`을 사용했다. 이 함수는 한 번 누른 입력을 한 번 소비하므로, 누르고 있는 매 프레임 패널 열기 이벤트를 발생시키지 않는다.

`LabLobbyScene.update()`의 핵심 부분은 다음과 같다.

```typescript
this.player.update(!this.researchOpen)
const nearby = isNearObject(this.player.x, this.player.y, COMPUTER, 56)
this.interactionHint?.setVisible(nearby && !this.researchOpen)

// 범위 밖과 패널 표시 중에도 소비해, 누르고 있던 E가 나중에 실행되지 않게 한다.
const pressed = this.interactKey && Phaser.Input.Keyboard.JustDown(this.interactKey)
if (pressed && nearby && !this.researchOpen) {
  this.researchOpen = true
  this.player.update(false)
  this.interactionHint?.setVisible(false)
  this.uiEvents.emit(GAME_EVENTS.openResearch)
}
```

`JustDown()`을 범위 조건 안에서만 호출하지 않은 이유가 있다. 범위 밖에서 눌렀던 E를 소비하지 않으면 나중에 가까이 갔을 때 이전 입력이 실행될 수 있다. 패널이 열린 동안의 E 입력도 소비해 닫은 직후 예전 입력으로 다시 열리지 않도록 했다.

## Phaser와 React는 인스턴스별 이벤트로 연결했다

이벤트 이름은 두 개만 정의했다.

```typescript
export const GAME_EVENTS = {
  openResearch: 'research:open',
  closeResearch: 'research:close',
} as const
```

연결 흐름은 다음과 같다.

```text
Phaser: 근접 상태에서 E 입력
  → research:open
React: 상태 변경 → 연구 기록 패널 표시

React: ESC 또는 닫기 버튼
  → research:close
Phaser: 패널 상태 해제 → 이동 입력 처리 재개
```

`GameCanvas`의 effect에서 이벤트 발행기를 만들고, 같은 발행기를 장면 생성자에 전달한다. 모듈 전역에 공유 발행기를 두지 않아 게임 인스턴스별로 연결이 분리된다. 아래는 실제 `GameCanvas.tsx`다.

```tsx
import { useEffect, useRef, useState } from 'react'
import Phaser from 'phaser'
import LabLobbyScene from '../game/scenes/LabLobbyScene'
import { GAME_EVENTS } from '../game/gameEvents'
import ResearchPanel from './ResearchPanel'

export default function GameCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)
  const eventRef = useRef<Phaser.Events.EventEmitter | null>(null)
  const [researchOpen, setResearchOpen] = useState(false)

  const closeResearch = () => {
    eventRef.current?.emit(GAME_EVENTS.closeResearch)
    setResearchOpen(false)
    containerRef.current?.focus({ preventScroll: true })
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let game: Phaser.Game | null = null
    const uiEvents = new Phaser.Events.EventEmitter()
    eventRef.current = uiEvents
    const openResearch = () => setResearchOpen(true)
    uiEvents.on(GAME_EVENTS.openResearch, openResearch)

    // StrictMode의 첫 setup/cleanup에서는 생성 예약만 취소한다.
    const frameId = requestAnimationFrame(() => {
      game = new Phaser.Game({
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: container,
        physics: {
          default: 'arcade',
          arcade: { gravity: { x: 0, y: 0 } },
        },
        scene: [new LabLobbyScene(uiEvents)],
      })
    })

    return () => {
      cancelAnimationFrame(frameId)
      uiEvents.off(GAME_EVENTS.openResearch, openResearch)
      uiEvents.removeAllListeners()
      eventRef.current = null
      game?.destroy(true)
    }
  }, [])

  return (
    <>
      <div ref={containerRef} className="game-canvas" tabIndex={0} aria-label="슬개기술연구소 게임 화면" />
      {researchOpen && <ResearchPanel onClose={closeResearch} />}
    </>
  )
}
```

패널의 React 상태가 바뀌어도 effect의 의존성 배열은 비어 있으므로 게임을 다시 생성하지 않는다. 기존 StrictMode 대응용 생성 예약과 정리 코드는 유지했다.

컴포넌트 해제 시에는 생성 예약을 취소하고 이벤트 리스너를 제거한 뒤 `game.destroy(true)`를 호출한다. 장면 자체도 종료 시 닫기 이벤트 리스너를 제거한다.

```typescript
this.uiEvents.on(GAME_EVENTS.closeResearch, this.closeResearch)
this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
  this.uiEvents.off(GAME_EVENTS.closeResearch, this.closeResearch)
})
```

이벤트 정리는 React 컴포넌트의 수명과 Phaser 장면의 수명을 각각 고려한 것이다.

## React 패널은 기본 dialog로 구현했다

별도 UI 라이브러리를 추가하지 않고 HTML `dialog`와 `showModal()`을 사용했다. 제목은 `연구 기록`이며, 임시 기록 한 건을 표시한다.

```tsx
import { useEffect, useRef } from 'react'

type ResearchPanelProps = { onClose: () => void }

export default function ResearchPanel({ onClose }: ResearchPanelProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    dialog?.showModal()
    return () => dialog?.close()
  }, [])

  return (
    <dialog
      ref={dialogRef}
      className="research-panel"
      aria-labelledby="research-title"
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
    >
      <header className="research-panel-header">
        <div>
          <p className="research-eyebrow">SEULGAE TECH LAB / ARCHIVE</p>
          <h2 id="research-title">연구 기록</h2>
        </div>
        <button type="button" className="research-close" onClick={onClose} autoFocus>
          닫기
        </button>
      </header>
      <article className="research-entry">
        <span className="research-status">임시 기록 · 001</span>
        <h3>연구소 로비의 첫 번째 실험</h3>
        <p>컴퓨터에서 연구 기록을 열었다. 이동과 충돌에 이어 게임 오브젝트와 화면을 연결하는 실험을 진행 중이다.</p>
      </article>
      <p className="research-footer">ESC 또는 닫기 버튼으로 로비로 돌아갑니다.</p>
    </dialog>
  )
}
```

ESC는 `onCancel`에서 처리한다. 브라우저가 dialog만 닫고 React·Phaser의 상태는 열린 채로 남지 않도록 기본 동작을 막고 공통 `onClose()`를 호출한다. 닫기 버튼도 같은 함수를 사용한다.

스타일은 어두운 연구소 화면에 맞춘 배경, 민트색 강조선과 기록 카드로 구성했다. 패널 너비는 화면에 맞춰 제한하고 내용이 길어지면 세로로 스크롤할 수 있게 했다. 이는 패널의 배치 처리이며, 게임 전체를 모바일 조작에 맞춘 것은 아니다.

## 패널 표시와 이동 잠금은 별도로 처리했다

패널이 화면을 덮는다고 Phaser 게임 루프가 자동으로 멈추는 것은 아니다. 그래서 `Player.update()`가 이동 허용 여부를 받도록 수정했다.

```typescript
update(movementEnabled = true) {
  if (!movementEnabled) {
    this.body.setVelocity(0, 0)
    return
  }

  // 이후 기존 WASD·방향키 입력과 정규화된 속도 계산을 수행한다.
}
```

패널을 여는 순간에도 `update(false)`를 호출해 속도를 즉시 0으로 만든다. 열린 동안에는 매 프레임 이동 입력 처리를 건너뛰고, 닫기 이벤트를 받으면 다시 기존 입력을 처리한다. 물리 엔진과 충돌체를 제거하거나 장면 전체를 종료하는 방식은 사용하지 않았다.

## 실제 검증한 결과

아래는 구현 과정에서 수행한 결과다. 글 작성 중 새로 실행한 검증과 혼동하지 않도록 당시 기록을 기준으로 정리했다.

### 브라우저에서 확인한 항목

| 항목 | 확인 결과 |
| --- | --- |
| 범위 밖에서 E 입력 | 패널이 열리지 않음 |
| 컴퓨터 접근과 이탈 | 안내 표시·숨김 확인 |
| E를 길게 누르기 | 패널 하나가 열린 상태 유지 |
| ESC와 닫기 버튼 | 두 방법 모두 종료 확인 |
| 패널 표시 중 이동 입력 | 위치가 유지되는 것을 확인 |
| 패널 종료 후 이동 | 이동 복구 확인 |
| 반복 개폐 | 닫기 버튼으로 3회 반복, 매번 패널·캔버스 각 1개 확인 |
| 기존 충돌 | 안내 데스크·컴퓨터 및 오른쪽·하단 벽 충돌 재확인 |
| 브라우저 오류 | 확인 시점에 수집된 오류·경고 없음 |

이번 단계에서 네 방향 벽을 모두 다시 검사한 것은 아니다. 기존 로비 구현 당시에는 네 방향을 확인했고, 이번에는 위 표의 항목을 재검증했다.

패널·캔버스 개수 확인은 화면 중복 생성에 대한 관찰 결과다. 이것만으로 메모리 누수가 전혀 없다고 단정하지는 않았다.

### 자동 검증 7개

`frontend/`에서 다음 명령어를 실행했다.

```powershell
npm.cmd test
npm.cmd run lint
npm.cmd run build
```

- 테스트 7개 통과, 실패 0개
- `oxlint` 통과
- `tsc -b && vite build` 통과
- Phaser `3.90.0` 유지 확인

자동 검증에는 책상 상하좌우 접근, 범위 경계와 모서리 판정, 범위 밖 E 입력 소비, 한 번의 E 입력에 대한 단일 열기, 이동 잠금·복구, 20회 개폐와 장면 종료 시 닫기 리스너 제거가 포함되어 있다.

이 테스트는 장면의 렌더링·플레이어·물리 환경을 대체하고, 실제 Phaser의 `JustDown`을 사용해 입력과 이벤트 흐름을 검증했다. React DOM이나 실제 충돌 엔진까지 포함한 통합 테스트는 아니다. 화면 표시와 충돌은 브라우저 검증으로 구분했다.

Node의 내장 테스트 실행기를 사용해 새 테스트 라이브러리는 추가하지 않았다. 실행 환경에서는 `stripTypeScriptTypes`의 실험적 API 경고가 출력됐지만 테스트는 통과했다.

최종 빌드에서는 25개 모듈이 변환됐고, JavaScript 파일은 1,420.26kB, gzip 기준 389.44kB였다. 기존과 마찬가지로 500kB 초과 청크 경고가 남았다. 이번 작업에서는 코드 분할이나 번들 크기 최적화를 수행하지 않았다.

## 프로젝트 커밋과 푸시, 배포 범위

구현 변경은 프로젝트 저장소에 커밋하고 원격 `main`으로 푸시했다.

- 커밋은 `08b4045`이다.
- 메시지는 `[20261115] 컴퓨터 상호작용 및 React 연구 기록 패널 구현`이다.
- 푸시 후 로컬 HEAD와 원격 `main`의 커밋 해시가 같은 것을 확인했다.
- 작업 완료 시 프로젝트 작업 트리는 깨끗했다.

[구현 커밋 보기](https://github.com/seulgae/seulgae-tech-lab/commit/08b404565c0531db5348a564060746f2d8f7dfef)

저장소에는 배포 설정이 없었으며, 작업 중 범위를 **커밋·푸시까지만** 진행하기로 확정했다. 공개 배포나 실제 배포 사이트의 접속 검증은 수행하지 않았다. 기존 InvenCore 서버와 데이터베이스도 수정하지 않았다.

## 배운 점과 다음 단계

상호작용 구현에서 중요한 것은 패널을 보여 주는 코드 하나보다 **입력 소비 시점과 두 실행 환경의 상태를 맞추는 것**이었다. 범위 밖 입력도 소비해야 이전 키 입력이 뒤늦게 실행되지 않고, ESC 역시 React 상태와 Phaser의 이동 잠금을 함께 해제해야 한다.

또한 이벤트 발행기를 게임 인스턴스에 묶고, 컴포넌트와 장면이 끝나는 지점에서 각각 리스너를 정리하도록 했다. 반복 개폐가 처음 한 번의 성공과 별개로 검증해야 할 항목이라는 점도 확인했다.

다음 단계는 임시 연구 기록을 실제 콘텐츠 구조로 정리하는 것이다. 백엔드 연결, 로그인, 추가 연구실은 아직 구현하지 않았으며 이번 단계의 완료 범위에 포함하지 않는다.
