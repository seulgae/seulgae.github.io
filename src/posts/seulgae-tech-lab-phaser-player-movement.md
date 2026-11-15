---
title: Phaser 플레이어 이동 구현 — delta 적용과 대각선 속도 정규화
date: 2026-11-15
createdAt: 2026-11-15T12:20:33+09:00
tags: Phaser, TypeScript, 게임 개발, 키보드 입력
summary: 주황색 사각형 플레이어에 WASD·방향키 이동을 연결하고 delta 적용, 대각선 정규화, 화면 경계 제한을 검증한 기록.
category: seulgae-tech-lab
---

React 안에서 Phaser의 첫 화면을 띄운 다음, 키보드로 조작할 수 있는 플레이어를 추가했다. 이번 목표는 캐릭터 이미지나 맵을 만드는 것이 아니라 **입력 → 방향 계산 → 시간에 따른 이동 → 화면 경계 제한**의 흐름을 이해하고 구현하는 것이었다.

플레이어는 24×24 크기의 주황색 사각형으로 만들었다. 기존 배경과 제목, 중앙 초록색 사각형은 그대로 두고, WASD와 방향키로 움직이도록 연결했다.

## 기존 장면에 이동 로직을 분리해 붙이기

작업 전 프로젝트 파일과 Git 상태를 확인했다. 작업 트리는 깨끗했고, Phaser는 `3.90.0`으로 고정되어 있었다. 기존 `LabLobbyScene.ts`는 배경과 도형, 제목을 그리는 역할을 맡고 있었다.

이 장면 안에 모든 이동 코드를 넣는 대신 `Player.ts`를 추가했다. 변경한 파일은 두 개다.

```text
frontend/src/game/
├── Player.ts                  # 생성: 플레이어와 이동 로직
└── scenes/LabLobbyScene.ts     # 수정: 플레이어 생성과 update 연결
```

`GameCanvas.tsx`와 React 구성은 수정하지 않았다. 물리 엔진 설정이나 새 라이브러리도 추가하지 않았다. 이번에는 좌표를 직접 갱신하는 방식으로 충분했다.

## Player.ts에서 입력과 이동을 처리했다

플레이어는 `Phaser.GameObjects.Rectangle`을 상속한다. 생성자에서 크기와 색상을 지정하고 `scene.add.existing(this)`로 장면에 등록했다.

아래 코드는 작업 후 실제 파일에서 확인한 내용이다.

```typescript
import Phaser from 'phaser'

export default class Player extends Phaser.GameObjects.Rectangle {
  private readonly speed = 200 // 초당 이동 거리(px)
  private readonly direction = new Phaser.Math.Vector2()
  private readonly cursors: Phaser.Types.Input.Keyboard.CursorKeys
  private readonly wasd: {
    up: Phaser.Input.Keyboard.Key
    down: Phaser.Input.Keyboard.Key
    left: Phaser.Input.Keyboard.Key
    right: Phaser.Input.Keyboard.Key
  }

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 24, 24, 0xff9800)
    scene.add.existing(this)

    const keyboard = scene.input.keyboard
    if (!keyboard) throw new Error('Player requires keyboard input')

    this.cursors = keyboard.createCursorKeys()
    this.wasd = {
      up: keyboard.addKey('W'),
      down: keyboard.addKey('S'),
      left: keyboard.addKey('A'),
      right: keyboard.addKey('D'),
    }
  }

  update(delta: number) {
    const left = this.cursors.left.isDown || this.wasd.left.isDown
    const right = this.cursors.right.isDown || this.wasd.right.isDown
    const up = this.cursors.up.isDown || this.wasd.up.isDown
    const down = this.cursors.down.isDown || this.wasd.down.isDown

    // 대각선 벡터도 길이 1로 맞춘 뒤, 밀리초를 초로 바꿔 이동한다.
    this.direction.set(Number(right) - Number(left), Number(down) - Number(up))
    this.direction.normalize().scale(this.speed * delta / 1000)

    const halfWidth = this.displayWidth / 2
    const halfHeight = this.displayHeight / 2
    this.x = Phaser.Math.Clamp(this.x + this.direction.x, halfWidth, this.scene.scale.width - halfWidth)
    this.y = Phaser.Math.Clamp(this.y + this.direction.y, halfHeight, this.scene.scale.height - halfHeight)
  }
}
```

### 두 종류의 키를 하나의 방향으로 합쳤다

방향키는 `createCursorKeys()`로 만들고, WASD는 `addKey()`로 등록했다. 예를 들어 왼쪽 방향키와 A 중 하나라도 눌리면 왼쪽 입력으로 판단한다.

각 방향은 참·거짓 값이므로 숫자로 바꿔 좌우와 상하의 차이를 계산했다.

```typescript
this.direction.set(Number(right) - Number(left), Number(down) - Number(up))
```

이렇게 하면 오른쪽은 `(1, 0)`, 위쪽은 `(0, -1)`이 된다. 반대 방향을 동시에 누르면 해당 축은 0이 된다. W와 위쪽 방향키를 함께 눌러도 같은 방향을 두 번 더하지 않으므로 속도가 배로 늘지 않는다.

매 프레임 방향을 새로 계산하기 때문에 키를 놓으면 방향 벡터가 `(0, 0)`이 된다. 별도의 감속 처리는 넣지 않았고 다음 갱신에서 바로 멈추도록 했다.

### delta를 초로 바꿔 이동 거리를 계산했다

속도는 초당 200px로 정했다. 프레임마다 일정한 픽셀 수를 더하면 갱신 횟수가 많은 환경에서 더 빨리 움직이므로, 전달받은 `delta`를 이동 거리에 적용했다.

```text
이동 거리 = 초당 속도 × delta(ms) / 1000
```

예를 들어 `delta`가 100ms라면 이동 거리는 `200 × 100 / 1000 = 20px`이다. 이 계산은 전달된 프레임 시간이 실제 경과 시간을 나타낸다는 전제에서 이동량을 맞춘다. 브라우저가 비활성화되거나 게임 루프가 시간을 보정하는 상황까지 실제 시계와 항상 일치한다고 보장하는 것은 아니다.

### 대각선 벡터를 정규화했다

오른쪽과 위쪽을 함께 누르면 방향 벡터는 `(1, -1)`이다. 이 벡터의 길이는 √2이므로 그대로 이동량을 곱하면 대각선이 단일 축보다 약 1.414배 빨라진다.

`normalize()`로 길이를 1로 맞춘 뒤 속도와 시간을 곱했다.

```typescript
this.direction.normalize().scale(this.speed * delta / 1000)
```

이번 구현에서 사용하는 Phaser의 `Vector2`는 길이가 0인 벡터도 0으로 유지한다. 따라서 입력이 없을 때는 이동량도 0이다.

### 중심 좌표 대신 사각형 전체를 화면 안에 제한했다

플레이어의 좌표는 사각형 중심이다. 중심만 0부터 800까지 허용하면 도형의 절반이 화면 밖으로 나갈 수 있다.

그래서 가로·세로 크기의 절반을 경계 계산에 반영했다. 현재 화면은 800×600이고 플레이어는 24×24이므로 중심 좌표의 범위는 다음과 같다.

| 축 | 최솟값 | 최댓값 |
| --- | --- | --- |
| X | 12 | 788 |
| Y | 12 | 588 |

이동 후 좌표를 `Phaser.Math.Clamp()`로 제한했다. 이는 화면 가장자리 제한이며, 중앙 초록색 사각형과의 충돌 처리는 아니다. 플레이어가 그 사각형을 통과하는 것은 이번 범위에서 의도된 상태다.

## LabLobbyScene에서 생성과 갱신을 연결했다

장면은 `create()`에서 플레이어를 생성하고, `update()`에서 프레임 시간을 전달한다.

```typescript
import Phaser from 'phaser'
import Player from '../Player'

export default class LabLobbyScene extends Phaser.Scene {
  private player?: Player

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
    this.player = new Player(this, 400, 400)
  }

  update(_time: number, delta: number) {
    this.player?.update(delta)
  }
}
```

플레이어 시작 위치는 `(400, 400)`으로 정했다. 기존 초록색 사각형의 중심 `(400, 300)`보다 아래에 두어 처음부터 두 도형을 구별할 수 있게 했다.

`update(_time, delta)`에서 첫 번째 인자는 사용하지 않으므로 `_time`으로 표시했다. 이동 계산은 `Player.update(delta)`가 맡고 장면은 호출만 연결한다.

## 실제 검증한 범위

아래 결과는 구현 직후 수행한 검증 기록이다. 글 작성 중 새로 실행한 결과처럼 섞지 않았다. 명령어는 별도 표시가 없는 경우 `frontend/`에서 실행했다.

| 명령어 | 결과 |
| --- | --- |
| `npm.cmd run build` | `tsc -b && vite build` 통과, 종료 코드 0 |
| `npm.cmd run lint` | `oxlint` 통과, 종료 코드 0 |
| `npm.cmd list phaser` | `phaser@3.90.0` 확인 |
| `git diff --check` | 공백 오류 없음. Git의 LF→CRLF 변환 안내는 출력됨 |

빌드 로그의 주요 부분은 다음과 같다. 중간 출력은 일부 생략했다.

```text
> tsc -b && vite build

vite v8.3.8 building client environment for production...
✓ 21 modules transformed.
dist/index.html                     0.45 kB │ gzip:   0.29 kB
dist/assets/index-qChcFVPs.css      1.91 kB │ gzip:   0.86 kB
dist/assets/index-Cv3B-QYD.js   1,416.60 kB │ gzip: 387.97 kB
✓ built in 875ms
```

기존과 마찬가지로 500kB를 초과하는 청크 경고가 있었다. 빌드는 성공했지만, 이번 작업에서 파일 크기 개선이나 코드 분할을 수행하지는 않았다.

### 브라우저에서 키를 눌러 확인한 항목

로컬 개발 서버를 브라우저로 열고 키를 일정 시간 누른 뒤 화면 변화를 확인했다.

- 24×24 주황색 플레이어와 기존 배경·제목·초록 사각형 표시
- W, A, S, D 각각의 방향 이동
- 위·아래·왼쪽·오른쪽 방향키 각각의 이동
- 키를 계속 눌러도 위·아래·왼쪽·오른쪽 경계 밖으로 나가지 않음
- 화면 안쪽에서 키를 놓은 뒤 연속 화면 확인 시 위치 유지

해당 확인 시점에 수집된 브라우저 오류와 경고는 없었다. 브라우저에서 이동을 확인한 것과 이동 속도를 수치로 검증한 것은 별개로 기록했다.

### 별도 계산 검증 16개

임시 검증 스크립트에서 실제 `Player.ts`를 읽고 키 상태와 장면·도형을 대체해 이동 로직을 실행했다. 벡터 계산과 좌표 제한에는 프로젝트에 설치된 실제 Phaser의 `Vector2`와 `Clamp`를 사용했다. 이 검증은 브라우저 키보드 이벤트 전체를 재현한 통합 테스트는 아니다.

| 검증 항목 | 개수 | 결과 |
| --- | --- | --- |
| 플레이어 크기와 주황색 값 | 1 | 통과 |
| WASD·방향키 각각의 방향과 이동량 | 8 | 통과 |
| 30·60·144 FPS에 해당하는 delta로 1초간 이동 거리 비교 | 1 | 통과 |
| 대각선 이동 거리와 단일 축 이동 거리 비교 | 1 | 통과 |
| 네 방향 경계에서 중심 좌표 확인 | 1 | 통과 |
| 대각선으로 화면 모서리까지 이동 | 1 | 통과 |
| 키 해제 후 다음 갱신에서 정지 | 1 | 통과 |
| 반대 방향 키 상쇄 | 1 | 통과 |
| W와 위쪽 방향키 동시 입력 시 속도 중복 방지 | 1 | 통과 |

총 16개 검증을 통과했다. 실제 브라우저의 FPS를 30·60·144로 바꾸거나, 브라우저에서 대각선 이동 거리를 수치로 측정한 것은 아니다. 프레임 간격에 따른 거리와 대각선 속도의 수치 비교는 이 별도 계산 검증에서 수행했다.

## 배운 점과 남은 범위

이번 작업에서 핵심은 입력 키 자체보다 **방향, 속도, 경과 시간, 화면 경계를 분리해서 계산하는 것**이었다. 방향 벡터를 정규화한 뒤 속도와 시간을 적용하면 대각선과 단일 축 이동을 같은 기준으로 다룰 수 있다. 경계 제한에는 오브젝트의 중심뿐 아니라 실제 크기도 반영해야 한다.

기존 화면을 유지하면서 두 파일만으로 플레이어 이동을 연결했다. Phaser 버전과 패키지 설정은 유지했고, 새로운 라이브러리와 물리 엔진 설정은 추가하지 않았다.

남은 사항은 빌드의 청크 크기 경고이며, 창 포커스 변경 등 다양한 입력 환경은 별도로 검증하지 않았다. 캐릭터 이미지, 애니메이션, 타일맵, 충돌 처리는 이번 작업에 포함하지 않았다. 이번 변경에 대한 커밋, 푸시, 배포도 수행하지 않았다.
