---
title: "Phaser 4.2.1에서 3.90.0으로 변경하고 버전 고정하기"
date: 2026-11-15
createdAt: 2026-11-15T11:58:43+09:00
tags: ["Phaser", "npm", "의존성 관리", "개발 환경"]
summary: "슬개기술연구소 프런트엔드의 Phaser를 4.2.1에서 3.90.0으로 변경하고, --save-exact와 npm prune으로 의존성을 정리한 기록."
category: seulgae-tech-lab
---

슬개기술연구소의 게임 화면을 만들기 전에 Phaser 버전을 정리했다. 처음 설치된 버전은 4.2.1이었지만, 앞서 잡아 둔 구현 방향이 Phaser 3 기준이라 3.90.0으로 맞추기로 했다. 이번 작업의 목적은 프로젝트에서 사용할 버전을 명확히 정하고 의존성을 깔끔하게 관리하는 것이다.

이 글은 2026년 11월 15일 한국 날짜 기준의 작업 기록이다. 명령어는 프로젝트의 `frontend/`에서 PowerShell로 실행했다. 아래 로그는 당시 공유한 실행 결과이며, 공개용으로 절대 경로와 프롬프트만 생략했다. 현재 파일을 읽어 추가로 확인한 내용은 별도로 표시했다.

## 처음 설치된 버전 확인

처음에는 버전을 지정하지 않고 설치했다.

```powershell
npm.cmd install phaser
```

```text
added 2 packages, and audited 31 packages in 9s

9 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

이어 설치 버전을 확인했다.

```powershell
npm.cmd list phaser
```

```text
frontend@0.0.0
`-- phaser@4.2.1
```

이 출력으로 당시 프로젝트에 설치된 Phaser가 4.2.1이라는 것을 확인했다. Phaser 4 자체의 문제를 확인해서 내린 결정은 아니다. 기존 구현 계획과 버전을 맞추기 위해 3.90.0을 선택했다.

## Phaser 3.90.0으로 변경

실행 과정에서 먼저 명령어 끝에 역슬래시가 붙은 입력이 있었다.

```powershell
npm.cmd install phaser@3.90.0\
```

```text
removed 1 package, changed 1 package, and audited 31 packages in 805ms

9 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

이 입력은 재사용할 명령어가 아니다. 이후 역슬래시를 뺀 명령어를 다시 실행했다.

```powershell
npm.cmd install phaser@3.90.0
```

```text
added 1 package, changed 1 package, and audited 31 packages in 5s

9 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

두 설치 로그의 패키지 개수만으로 어떤 파일이 교체되었는지까지 단정하지 않았다. 실제 버전은 다음 조회 결과로 확인했다.

```powershell
npm.cmd list phaser
```

```text
frontend@0.0.0
`-- phaser@3.90.0
```

프로젝트의 직접 의존성으로 표시되는 Phaser 버전은 4.2.1에서 3.90.0으로 바뀌었다.

## --save-exact로 버전 고정

설치된 버전과 `package.json`에 저장된 버전 조건은 따로 확인해야 한다. 당시 저장된 값은 다음과 같았다.

```powershell
npm.cmd pkg get dependencies.phaser
```

```json
"^3.90.0"
```

정확한 버전을 저장하기 위해 다음 명령어를 실행했다. npm 공식 문서에서 `--save-exact`는 기본 버전 범위 대신 정확한 버전을 저장하는 옵션으로 설명한다. [npm install 문서](https://docs.npmjs.com/cli/v11/commands/npm-install/)

```powershell
npm.cmd install phaser@3.90.0 --save-exact
```

```text
up to date, audited 31 packages in 615ms

9 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

이미 설치된 버전은 3.90.0이었으므로 이때는 `up to date`가 출력됐다.

당시 대화에는 고정 후의 `npm.cmd pkg get dependencies.phaser` 재조회 결과가 없다. 대신 이 글 작성 과정에서 현재 `frontend/package.json`을 직접 읽어 다음 값이 저장된 것을 확인했다. 아래는 해당 항목만 발췌한 것이다.

```json
{
  "phaser": "3.90.0"
}
```

따라서 버전 고정은 명령어 실행에 따른 예상에 그치지 않고 현재 파일에서도 확인한 상태다. 다만 이 설정 하나가 모든 하위 의존성의 버전까지 고정한다는 의미는 아니다.

## npm prune 실행

마지막으로 의존성 정리 명령어를 실행했다.

```powershell
npm.cmd prune
```

```text
up to date, audited 31 packages in 725ms

9 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

`npm prune`은 의존성 트리에서 불필요한 것으로 판단되는 패키지를 제거한다. 소스 코드를 분석해서 사용하지 않는 라이브러리를 모두 찾아주는 명령은 아니다. [npm prune 문서](https://docs.npmjs.com/cli/v11/commands/npm-prune/)

이번 결과는 `up to date`였고 제거 개수는 표시되지 않았다. 따라서 “prune으로 Phaser 4를 삭제했다”고 쓰기보다는 “버전 변경 후 prune을 실행했고 추가 변경이 보고되지 않았다”고 기록하는 것이 정확하다.

## 확인된 결과와 남은 확인 범위

| 항목 | 확인 결과와 근거 |
| --- | --- |
| 변경 전 Phaser | 당시 `npm.cmd list phaser` 출력에서 4.2.1 확인 |
| 변경 후 Phaser | 당시 `npm.cmd list phaser` 출력에서 3.90.0 확인 |
| 버전 고정 전 값 | 당시 조회 결과 `"^3.90.0"` |
| 정확한 버전 저장 | `--save-exact` 실행 기록과 현재 파일의 `"3.90.0"` 확인 |
| 의존성 정리 | `npm.cmd prune`에서 `up to date` 보고 |
| npm 감사 결과 | 인용한 설치·정리 로그에서 `found 0 vulnerabilities` 보고 |

기존 Phaser 4가 프로젝트의 직접 의존성에서 교체된 것은 확인했다. 다만 전체 하위 의존성을 조회한 결과는 이번 기록에 없으므로, 모든 위치에서 Phaser 4가 사라졌다고까지 단정하지 않는다. npm 캐시나 다른 프로젝트의 설치 상태도 확인 범위에 포함하지 않았다.

전체 트리에 남은 버전까지 확인하려면 `frontend/`에서 다음 명령어를 사용할 수 있다. 아래는 추가 확인용이며 이번에 실행한 결과로 제시하는 것은 아니다.

```powershell
npm.cmd list phaser --all
```

또한 `found 0 vulnerabilities`는 해당 실행 시점의 npm 감사 보고다. 이 결과가 애플리케이션 전체의 안전성이나 게임 화면의 정상 동작을 증명하지는 않는다. React와 Phaser 연결, 빌드, 브라우저 렌더링은 이번 의존성 정리 작업과 별도로 검증해야 한다.

이번 작업으로 Phaser 직접 의존성을 3.90.0으로 맞췄고, `package.json`에도 정확한 버전을 저장했다. 다음 개발 단계에서는 이 버전을 기준으로 React 화면에 Phaser를 연결할 예정이다.
