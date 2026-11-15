---
title: 새 프로젝트의 GitHub 저장소를 만들고 Windows 개발 환경에 연결하기
date: 2026-11-15
createdAt: 2026-11-15T11:30:43+09:00
tags: Git, GitHub, Windows, Repository
summary: 슬개기술연구소를 기존 프로젝트와 분리하기 위해 GitHub 저장소 생성과 Windows 로컬 복제 절차를 정리했다.
category: seulgae-tech-lab
---

## 새 프로젝트에 독립된 저장소가 필요했던 이유

기존 InvenCore에서는 웹 애플리케이션 개발뿐 아니라 서버 구성, 데이터베이스 연결, 배포 설정까지 함께 다루었다. 새 프로젝트인 **슬개기술연구소(Seulgae Tech Lab)**에서는 개발 과정을 처음부터 다시 이해하고 기록하기 위해 기존 저장소를 수정하는 대신 별도 GitHub 저장소를 사용하기로 했다.

슬개기술연구소는 React와 Phaser로 구현하는 2D 탑다운 RPG형 인터페이스에 Spring Boot와 PostgreSQL을 연결할 계획이다. 다만 이 글의 범위는 애플리케이션 구현이 아니라 **원격 저장소를 생성하고 Windows 로컬 개발 환경에 연결하는 준비 과정**이다.

이 단계에서 저장소 생성과 `git clone`을 실제로 완료했다는 실행 결과는 아직 기록되지 않았다. 아래는 결정한 설정과 실행·확인 절차를 정리한 것이다.

## 저장소 생성 시 정한 기준

GitHub의 새 저장소 생성 화면에서 다음과 같이 구성할 계획이다.

| 항목 | 설정 | 선택 이유 |
| --- | --- | --- |
| 저장소 이름 | `seulgae-tech-lab` | 프로젝트 이름을 그대로 식별할 수 있도록 지정 |
| 공개 범위 | Public | 코드와 개발 이력을 포트폴리오로 공개하기 위해 선택 |
| README | 생성 | 저장소를 처음 열었을 때 프로젝트 목적을 확인할 수 있도록 준비 |
| .gitignore | 초기 생성 시 선택하지 않음 | 프론트엔드와 백엔드 구조가 정해진 뒤 직접 작성할 계획 |
| License | 초기 생성 시 선택하지 않음 | 라이선스 정책을 검토한 후 결정할 계획 |

GitHub의 [새 저장소 생성 페이지](https://github.com/new)에서 위 값을 입력하고 `Create repository`를 선택하면 된다. 공개 저장소로 운영할 예정이므로 비밀번호, 토큰, JWT 서명 키, `.env`의 실제 비밀값은 커밋 대상에서 제외해야 한다.

README를 포함해 원격 저장소를 초기화하면 첫 커밋이 원격에 만들어진다. 따라서 로컬에서는 별도의 `git init`부터 시작하지 않고 **원격 저장소를 복제하는 방식**을 선택했다.

## Windows에서 로컬 작업 공간 준비

PowerShell에서 작업 폴더를 만들고 이동한다.

```powershell
New-Item -ItemType Directory -Force -Path "$HOME\projects"
Set-Location "$HOME\projects"
```

이후 GitHub에 저장소가 생성되어 있다는 전제에서 다음 명령어로 복제한다.

```powershell
git clone https://github.com/seulgae/seulgae-tech-lab.git
Set-Location .\seulgae-tech-lab
```

위 URL은 계획한 GitHub 계정과 저장소 이름을 조합한 **복제 명령 예시**이며, 실제 저장소 생성 여부나 URL의 유효성은 아직 검증하지 않았다. 저장소 생성 후 GitHub의 `Code → HTTPS` 메뉴에 표시된 주소와 일치하는지 확인해야 한다.

## 로컬 저장소 연결 확인

복제 후에는 다음 세 명령어로 작업 상태와 원격 연결을 점검할 수 있다.

```powershell
git status
git remote -v
git branch --show-current
```

`git status`는 작업 트리의 변경 여부, `git remote -v`는 원격 저장소 주소, `git branch --show-current`는 현재 브랜치를 확인하는 명령어이다. 기본 브랜치를 `main`으로 사용할 계획이지만 실제 브랜치 이름은 명령어 결과로 확인해야 한다.

| 확인 항목 | 기대 상태 | 실제 확인 여부 |
| --- | --- | --- |
| GitHub 저장소 | `seulgae-tech-lab` 생성 | 미확인 |
| 초기 파일 | `README.md` 존재 | 미확인 |
| 로컬 복제 | `git clone` 완료 | 미확인 |
| 원격 주소 | `origin`이 생성한 저장소를 가리킴 | 미확인 |
| 기본 브랜치 | `main` | 미확인 |

## 초기 브랜치 운영 계획

기능별 작업을 구분하기 위해 다음과 같은 브랜치 이름을 사용할 계획이다.

| 브랜치 | 용도 |
| --- | --- |
| `main` | 정상 실행을 확인한 코드 관리 |
| `feature/phaser-setup` | Phaser 기본 환경 구성 |
| `feature/lab-lobby` | 연구소 로비 구현 |
| `feature/player-movement` | 캐릭터 이동 구현 |

초기에는 복잡한 브랜치 전략보다 **작은 기능을 구현하고 확인한 뒤 병합하는 흐름**을 익히는 데 집중하려 한다. 이 브랜치들은 아직 생성되거나 병합된 것으로 확인되지 않았다.

## 정리와 다음 확인 사항

이번에 결정한 것은 기존 InvenCore를 유지하면서 슬개기술연구소용 저장소를 별도로 만드는 방향이다. README로 시작해 로컬에 복제하고, 이후 React·TypeScript·Phaser와 Spring Boot를 단계적으로 추가할 계획이다.

다음에는 실제 저장소 생성 결과, `git clone` 출력, `origin` 및 브랜치 상태를 확인해야 한다. 해당 검증이 끝나야 GitHub와 Windows 개발 환경의 연결이 완료됐다고 기록할 수 있다. 또한 프론트엔드와 백엔드 프로젝트를 만들기 전에 `.gitignore`를 작성해 빌드 산출물과 비밀 설정 파일이 추적되지 않도록 할 필요가 있다.

## 참고 자료

- [GitHub Docs — Creating a new repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository)
- [GitHub Docs — Cloning a repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)
