---
title: React와 Phaser 3를 연결해 첫 게임 화면 띄우기
date: 2026-11-15
createdAt: 2026-11-15T12:06:55+09:00
tags: React, Phaser, TypeScript, Vite
summary: React 컴포넌트에서 Phaser 3.90.0 게임을 생성하고 StrictMode를 고려한 정리 코드를 작성한 뒤 첫 화면을 검증한 기록.
category: seulgae-tech-lab
---

Phaser를 3.90.0으로 고정한 다음, 슬개기술연구소의 첫 게임 화면을 React에 연결했다. 이번 목표는 게임 기능을 늘리는 것이 아니라 **React가 관리하는 화면 안에서 Phaser가 시작되고 정리되는 흐름을 이해하는 것**이었다.

800×600 화면에 짙은 회색 배경, 중앙의 초록색 사각형, 상단의 `Seulgae Tech Lab` 제목을 표시했다. 캐릭터 이동, 타일맵, 충돌 처리와 백엔드 API는 이번 범위에서 제외했다.

## 기존 프로젝트부터 확인했다

작업 전 `frontend/`의 파일과 설정을 읽었다. React + Vite + TypeScript 프로젝트였고 `App.tsx`에는 Vite 예제 화면이 들어 있었다. `main.tsx`는 `StrictMode`로 `App`을 감싸고 있었으며, `package.json`의 Phaser 버전은 `3.90.0`으로 고정되어 있었다.

기존 설정과 버전은 유지했다. 새 라이브러리를 추가하지 않고 다음 네 파일만 생성하거나 수정했다.

```text
frontend/src/
├── game/scenes/LabLobbyScene.ts  # 생성: 게임 장면
├── components/GameCanvas.tsx    # 생성: React와 Phaser 연결
├── App.tsx                     # 수정: 게임 컴포넌트 표시
└── App.css                     # 수정: 게임 화면 배치
```

`main.tsx`, `index.css`, 패키지 설정은 변경하지 않았다. 아래 코드는 이번 작업 후 실제 파일에서 확인한 내용이다.

## 장면의 내용은 LabLobbyScene에서 그렸다

`LabLobbyScene.ts`는 Phaser의 장면 하나를 정의한다. 생성자에서 장면 키를 `LabLobbyScene`으로 지정하고, `create()`에서 배경과 도형, 제목을 만든다.

```typescript
import Phaser from 'phaser'

export default class LabLobbyScene extends Phaser.Scene {
  constructor() {
    super('LabLobbyScene')
  }

  create() {
    this.cameras.main.setBackgroundColor('#263238')
    this.add.rectangle(400, 300, 100, 100, 0x4caf50)
    this.add.text(400, 60, 'Seulgae Tech Lab', {
      fontFamily: 'Arial, sans-serif',
      fontSize: '32px',
      color: '#ffffff',
    }).setOrigin(0.5)
  }
}
```

800×600 화면의 중심은 `(400, 300)`이다. 이 위치에 100×100 크기의 사각형을 놓았다. 제목은 `(400, 60)`에 배치하고 `setOrigin(0.5)`로 텍스트 자체의 중심을 기준점으로 삼았다.

배경과 게임 오브젝트는 Phaser가 담당한다. React 컴포넌트에서 도형의 위치나 색상을 직접 관리하지 않도록 역할을 나눴다.

## GameCanvas에서 게임 생성과 정리를 연결했다

`GameCanvas.tsx`의 역할은 Phaser가 사용할 DOM 요소를 제공하고 게임 인스턴스의 수명을 React 컴포넌트와 연결하는 것이다.

```tsx
import { useEffect, useRef } from 'react'
import Phaser from 'phaser'
import LabLobbyScene from '../game/scenes/LabLobbyScene'

export default function GameCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let game: Phaser.Game | null = null

    // StrictMode의 첫 setup/cleanup에서는 생성 예약만 취소한다.
    const frameId = requestAnimationFrame(() => {
      game = new Phaser.Game({
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: container,
        scene: [LabLobbyScene],
      })
    })

    return () => {
      cancelAnimationFrame(frameId)
      game?.destroy(true)
    }
  }, [])

  return <div ref={containerRef} className="game-canvas" aria-label="슬개기술연구소 게임 화면" />
}
```

`useRef`는 Phaser 캔버스가 들어갈 `div`를 가리킨다. `useEffect` 안에서는 그 요소를 `parent`로 전달해 `Phaser.Game`을 생성한다. `width`와 `height`는 각각 800과 600으로 지정하고, 앞서 작성한 장면을 등록했다.

게임 인스턴스는 화면에 표시할 React 상태가 아니므로 `useState`에 넣지 않았다. 이번 구현에서는 effect 내부 변수에 보관하고 정리 함수에서 같은 인스턴스를 참조한다.

### StrictMode를 끄는 대신 생성 예약을 취소하도록 했다

기존 `StrictMode`는 유지했다. 개발 모드에서 effect의 설정과 정리가 추가로 실행되는 상황을 고려해, 실제 게임 생성은 `requestAnimationFrame`으로 다음 화면 갱신 시점에 예약했다.

정리 함수는 먼저 `cancelAnimationFrame`을 호출한다. 생성 전에 정리가 실행되면 예약만 취소되고 게임은 만들어지지 않는다. 이미 게임이 생성되었다면 `game?.destroy(true)`로 정리를 요청한다.

설치된 Phaser 소스도 확인했다. Phaser 3.90.0의 `destroy(true)`는 캔버스 제거를 포함한 파괴를 요청하며, 실제 정리는 다음 게임 프레임에서 처리되는 비동기 동작이다. 따라서 호출 직후 모든 리소스가 즉시 사라진다고 설명하지 않는 것이 정확하다.

이번 브라우저 검증에서는 StrictMode가 켜진 상태에서 캔버스가 하나인 것을 확인했다. **컴포넌트를 제거하고 다시 장착하는 과정을 반복하는 검증까지 수행한 것은 아니다.** 생성 예약과 정리 코드의 의도, 실제로 확인한 범위를 구분했다.

## App과 CSS는 화면 배치만 맡겼다

Vite 예제 대신 `GameCanvas`를 렌더링하도록 `App.tsx`를 바꿨다.

```tsx
import GameCanvas from './components/GameCanvas'
import './App.css'

function App() {
  return (
    <main className="game-page">
      <GameCanvas />
    </main>
  )
}

export default App
```

`App.css`는 게임 컨테이너 크기와 배치에 필요한 내용으로 바꿨다.

```css
.game-page {
  padding: 24px 0;
  overflow-x: auto;
}

.game-canvas {
  width: 800px;
  height: 600px;
  margin: 0 auto;
}

.game-canvas canvas {
  display: block;
}
```

게임 화면은 800×600 고정 크기이며, 화면이 좁으면 가로로 스크롤할 수 있다. 반응형 크기 조절이나 모바일 조작은 이번에 구현하지 않았다. 기존 전역 CSS는 그대로 두었다.

## 빌드와 브라우저에서 확인한 결과

명령어는 `frontend/`에서 실행했다. 공개용 기록에는 개인 절대 경로를 포함하지 않았다.

| 검증 명령어 | 실제 결과 |
| --- | --- |
| `npm.cmd run build` | `tsc -b && vite build` 완료, 종료 코드 0 |
| `npm.cmd run lint` | `oxlint` 완료, 종료 코드 0 |
| `npm.cmd list phaser` | `phaser@3.90.0` 확인 |
| `npm.cmd run dev -- --host 127.0.0.1 --port 5173 --strictPort` | 로컬 개발 서버 준비 완료 |

빌드에서 확인한 주요 출력은 다음과 같다. 중간 출력 일부는 생략했다.

```text
> tsc -b && vite build

vite v8.3.8 building client environment for production...
✓ 20 modules transformed.
dist/index.html                     0.45 kB │ gzip:   0.29 kB
dist/assets/index-qChcFVPs.css      1.91 kB │ gzip:   0.86 kB
dist/assets/index-BoLAflth.js   1,415.62 kB │ gzip: 387.60 kB
✓ built in 2.35s
```

빌드는 성공했지만, 압축 후 500kB를 초과하는 청크가 있다는 경고도 있었다. 위 표의 gzip 크기와는 별개인 기준이다. 이번에는 경고를 숨기기 위한 설정 변경이나 코드 분할을 추가하지 않았다. 파일 크기의 원인을 정밀하게 분석한 것도 아니므로 Phaser만의 크기라고 단정하지 않는다.

개발 서버를 실행한 뒤 실제 브라우저에서 다음을 확인했다.

- React가 게임 컨테이너를 렌더링했다.
- 800×600 크기의 캔버스가 하나 생성되었다.
- 짙은 회색 배경, 중앙 초록 사각형, 상단 제목이 보였다.
- 해당 확인 시점에 수집된 브라우저 오류와 경고는 없었다.

이 결과로 React 안에서 Phaser 게임이 생성되어 첫 장면을 그리는 흐름은 확인했다. 별도의 게임 인스턴스 내부 상태를 조회한 것은 아니며, 실제 장면 표시와 캔버스 생성으로 동작을 확인한 것이다. 프로덕션 빌드 결과물을 브라우저에서 따로 실행하거나 여러 브라우저에서 비교하는 검증은 수행하지 않았다.

## 이번 작업에서 배운 점

React는 화면에 게임을 어디에 붙일지와 언제 정리할지를 맡고, Phaser는 게임 장면을 그리는 일을 맡았다. 처음부터 복잡한 구조를 도입하지 않아도 장면 파일과 연결 컴포넌트를 나누면 각 코드의 책임이 드러난다.

특히 게임을 생성하는 코드만큼 정리하는 코드도 이해해야 한다. `useEffect`의 정리 함수와 Phaser의 비동기 파괴 동작을 함께 살펴보면서, 화면에 한 번 잘 나오는 것과 제거·재생성까지 안정적으로 동작하는 것은 서로 다른 검증이라는 점을 확인했다.

다음에는 컴포넌트 제거와 재장착 시 리소스가 정리되는지 직접 확인할 예정이다. 캐릭터 이동이나 연구소 맵 구현은 그 이후의 별도 단계로 남겼다. 이번 작업에서는 커밋, 푸시, 배포를 수행하지 않았다.
