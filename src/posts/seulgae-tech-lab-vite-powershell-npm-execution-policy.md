---
title: PowerShell에서 npm 실행이 차단될 때 npm.cmd로 Vite 프로젝트 생성하기
date: 2026-11-15
createdAt: 2026-11-15T11:48:43+09:00
tags: Windows, PowerShell, Node.js, npm, Vite, React, TypeScript
summary: PowerShell의 npm.ps1 실행 정책 오류를 npm.cmd로 우회하고 React·TypeScript 기반 Vite 개발 서버를 실행한 과정이다.
category: seulgae-tech-lab
---

## React 개발환경을 구성하다 npm 실행이 막혔다

슬개기술연구소의 프론트엔드는 React, TypeScript, Phaser를 사용하기로 했다. GitHub 저장소를 로컬에 복제한 다음, 프로젝트 루트에 `frontend` 디렉터리를 만들고 Vite 기반 React 애플리케이션을 구성하려 했다.

그런데 Node.js가 설치되어 있음에도 PowerShell에서 `npm` 명령을 실행하자 보안 오류가 발생했다. 패키지 설치 이전에 명령어 실행 방식부터 확인해야 하는 상황이었다.

이번 글은 Windows PowerShell에서 발생한 `npm.ps1` 실행 정책 오류를 확인하고, 시스템 정책을 변경하지 않은 채 Vite 프로젝트 생성과 개발 서버 실행까지 진행한 기록이다.

## 환경과 오류 확인

프로젝트의 로컬 작업 위치는 Windows PC에 미리 만든 프로젝트 폴더였다. GitHub 저장소의 Clone과 `main` 브랜치 연결 확인은 앞선 단계에서 마친 상태였고, 이 단계에서는 프론트엔드 환경만 구성했다.

실행 환경에서 확인한 버전은 다음과 같다.

| 항목 | 확인한 값 |
| --- | --- |
| 운영 환경 | Windows PowerShell |
| Node.js | `v26.13.0` |
| npm | `11.20.0` (`npm.cmd -v`로 확인) |
| Vite 생성 도구 | `create-vite@9.3.4` |
| 프로젝트 템플릿 | React + TypeScript (`react-ts`) |

먼저 Node.js 버전은 정상적으로 출력됐다.

```powershell
node -v
```

```text
v26.13.0
```

하지만 `npm -v`를 실행하자 다음 오류가 발생했다.

```text
npm : 이 시스템에서 스크립트를 실행할 수 없으므로
C:\Program Files\nodejs\npm.ps1 파일을 로드할 수 없습니다.
CategoryInfo          : 보안 오류: (:) [], PSSecurityException
FullyQualifiedErrorId : UnauthorizedAccess
```

이 메시지는 npm 패키지 자체의 설치 실패라기보다 **PowerShell이 `npm.ps1` 스크립트의 실행을 허용하지 않았음**을 보여준다. `node -v`가 성공했다는 사실만으로 `npm` 호출까지 정상이라는 뜻은 아니었다.

## 실행 정책을 바꾸지 않고 npm.cmd 사용

Windows에 설치된 npm은 PowerShell 스크립트인 `npm.ps1`뿐 아니라 명령 파일인 `npm.cmd`를 통해서도 호출할 수 있다. 이번에는 사용자 또는 시스템의 PowerShell 실행 정책을 수정하지 않고 `npm.cmd`를 직접 실행하는 방법을 선택했다.

```powershell
npm.cmd -v
```

실제 실행 결과는 다음과 같았다.

```text
11.20.0
```

이 결과로 npm 실행 파일 자체는 사용 가능한 상태이며, 앞선 실패가 PowerShell에서 `npm.ps1`을 실행하는 경로와 관련 있다는 점을 좁혀 볼 수 있었다.

다른 방법으로는 현재 사용자 범위에 `RemoteSigned` 실행 정책을 설정하는 방식도 있지만, **이번 과정에서 해당 정책 변경 명령은 실행하지 않았다.** 문제가 발생한 범위에 맞춰 호출 방식만 바꾸는 쪽을 택했다.

## Vite로 React·TypeScript 프로젝트 생성

GitHub 저장소를 복제해 둔 로컬 프로젝트 루트에서 다음 명령을 실행했다.

```powershell
npm.cmd create vite@latest frontend -- --template react-ts
```

명령의 각 요소는 다음 의미를 갖는다.

| 구문 | 역할 |
| --- | --- |
| `npm.cmd create` | Windows 명령 파일을 통해 프로젝트 생성 도구 실행 |
| `vite@latest` | Vite 프로젝트 생성 도구 호출 |
| `frontend` | 생성할 프론트엔드 디렉터리 이름 |
| `-- --template react-ts` | React + TypeScript 템플릿 지정 |

실행 중 `create-vite@9.3.4` 설치 확인 메시지가 출력됐으며, `y`를 입력해 계속 진행했다. 이후 생성 도구가 Linter를 고르는 화면을 표시했다. 당시 화면에는 `Oxlint`와 `ESLint`가 선택지로 나타났다.

초기 구성에서는 빠르고 단순하게 시작하는 방향으로 `Oxlint`를 추천받았지만, **최종적으로 어떤 Linter를 선택했는지는 대화 기록만으로 확인할 수 없다.** 따라서 특정 Linter가 실제로 설정됐다고 단정하지 않는다.

Vite 프로젝트 생성 후 일반적인 실행 절차는 다음과 같다.

```powershell
cd frontend
npm.cmd install
npm.cmd run dev
```

이 명령은 생성된 `frontend` 디렉터리에서 의존성을 설치하고 개발 서버를 실행하는 방법이다. 실제 대화에서는 각 명령의 개별 실행 로그가 남아 있지 않지만, 이후 **개발 서버가 정상 실행됐다는 사실은 직접 확인했다.**

## 검증 결과와 확인하지 못한 부분

이번 작업에서 직접 확인한 결과는 다음과 같다.

1. `node -v`가 `v26.13.0`을 출력했다.
2. `npm -v`가 `npm.ps1` 실행 정책 오류로 실패했다.
3. `npm.cmd -v`가 `11.20.0`을 출력했다.
4. `npm.cmd create vite@latest frontend -- --template react-ts` 실행 후 Vite 생성 마법사의 Linter 선택 화면까지 진입했다.
5. 이후 프론트엔드 개발 서버가 **정상 실행됐다**고 확인했다.

반면 다음 항목은 별도로 검증한 기록이 없다.

- Vite 생성 과정에서 최종 선택한 Linter와 부가 옵션
- 생성된 `package.json`의 세부 의존성 버전
- 특정 브라우저에서의 화면 표시 결과 및 빌드 결과
- Phaser 설치와 게임 화면 실행 여부
- Git 커밋 또는 원격 저장소 Push 여부

따라서 이 단계의 완료 범위는 **React·TypeScript 기반 프론트엔드 개발환경의 실행 확인**까지로 제한한다. Phaser 게임 로직 구현과 배포가 완료된 상태는 아니다.

## 정리

처음에는 npm 자체에 문제가 있는 것처럼 보였지만, 오류 메시지에 표시된 파일이 `npm.ps1`이라는 점을 확인하면서 원인을 PowerShell의 스크립트 실행 정책으로 좁힐 수 있었다. 실행 정책을 변경하지 않고 `npm.cmd`를 사용해 npm 명령을 실행했고, 그 상태로 Vite 프로젝트 생성과 개발 서버 실행까지 진행했다.

이후 같은 PowerShell 환경에서 npm 명령이 막힌다면 무조건 실행 정책을 변경하기보다, **어떤 실행 파일이 호출되는지와 오류가 발생하는 계층을 먼저 확인**하는 것이 유용하다. 슬개기술연구소의 다음 단계는 Phaser를 설치하고 첫 게임 화면을 출력하는 것이다.
