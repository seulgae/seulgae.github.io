---
title: 슬개기술연구소 GitHub 저장소를 기존 로컬 폴더에 복제한 과정
date: 2026-11-15
createdAt: 2026-11-15T11:20:43+09:00
tags: Git, GitHub, Windows, PowerShell
summary: 새 프로젝트의 GitHub 저장소를 미리 생성한 로컬 폴더에 복제하고 origin, 브랜치, 작업 트리 상태를 검증한 과정이다.
category: seulgae-tech-lab
---

## 저장소를 새로 만들면서 고민한 점

기존 InvenCore 프로젝트에서는 애플리케이션 개발과 서버 운영, 배포 설정을 함께 다뤘다. 새 프로젝트인 **슬개기술연구소(Seulgae Tech Lab)**에서는 기존 코드를 그대로 확장하기보다 새 저장소에서 구조와 개발 과정을 다시 설계하기로 했다.

프로젝트는 React·Phaser 기반 2D 탑다운 RPG형 화면과 Spring Boot API를 결합하는 방향으로 구상했다. 아직 해당 기능을 구현한 단계는 아니며, 이번에 실제로 확인한 작업은 **GitHub 원격 저장소 생성 후 Windows의 로컬 작업 폴더에 복제하는 과정**이다.

특히 로컬 폴더를 이미 만들어 둔 상황이었기 때문에, `git clone` 명령이 불필요한 하위 폴더를 만들지 않도록 하는 방법이 중요했다.

## 원격 저장소와 로컬 저장소의 역할

GitHub 저장소는 프로젝트의 코드와 변경 이력을 원격에서 관리하는 공간이다. 로컬 저장소는 **본인 PC에서 파일을 수정하고 Git 명령을 실행하는 작업 공간**이다. 둘은 별개의 위치에 있지만, 복제할 때 설정되는 `origin`을 통해 연결된다.

이번에는 GitHub에 `seulgae-tech-lab` 저장소를 먼저 생성하고, Windows에서 미리 준비한 빈 프로젝트 폴더에 복제했다. 기존 InvenCore 저장소는 삭제하거나 수정하지 않았다.

## 이미 만든 폴더에 바로 복제하기

일반적인 복제 명령은 다음 형태이다.

```powershell
git clone https://github.com/seulgae/seulgae-tech-lab.git
```

이 명령을 상위 폴더에서 실행하면 Git이 `seulgae-tech-lab`이라는 하위 폴더를 새로 만든다. 그런데 본인 PC에 같은 이름의 프로젝트 폴더를 미리 만들고 그 안으로 이동했다면, 이 방식은 원하는 디렉터리 구조와 다르다.

그래서 **이미 만들어 둔 빈 폴더로 이동한 상태**에서 명령어 끝에 `.`을 붙였다.

```powershell
git clone https://github.com/seulgae/seulgae-tech-lab.git .
```

여기서 `.`은 **현재 디렉터리**를 의미한다. 따라서 별도의 하위 폴더를 만들지 않고 현재 위치에 저장소의 파일과 `.git` 디렉터리를 복제한다.

| 명령어 | 결과 |
| --- | --- |
| `git clone URL` | 현재 폴더 아래에 저장소 이름의 새 폴더를 생성 |
| `git clone URL .` | 현재 폴더 자체를 복제 대상 디렉터리로 사용 |

두 번째 방식은 현재 폴더가 비어 있어야 한다. 이미 다른 파일이 들어 있는 폴더라면 Git이 복제를 거부할 수 있으므로, 파일을 임의로 삭제하지 말고 폴더 상태부터 확인해야 한다. 또한 실제 복제 시에는 GitHub 저장소 화면의 **Code → HTTPS**에서 주소를 복사해 사용하는 것이 안전하다.

## 실제 복제 결과와 검증

PowerShell에서 현재 폴더를 복제 대상으로 지정한 결과, GitHub가 저장소 객체를 전송했고 복제가 오류 없이 완료됐다. 당시 콘솔에는 다음과 같이 표시됐다.

```text
Cloning into '.'...
remote: Enumerating objects: 3, done.
remote: Total 3 (delta 0), reused 0 (delta 0), pack-reused 0 (from 0)
Receiving objects: 100% (3/3), done.
```

복제 명령의 완료만으로 원격 연결과 현재 브랜치 상태까지 모두 확인할 수는 없다. 이어서 세 가지 Git 명령을 실행했다.

```powershell
git status
git remote -v
git branch --show-current
```

각 명령은 확인 대상이 다르다.

- `git status`: 현재 브랜치와 로컬 작업 파일의 변경 여부
- `git remote -v`: 로컬 저장소에 등록된 원격 저장소 주소와 fetch/push 방향
- `git branch --show-current`: 현재 체크아웃된 브랜치 이름

실제 출력에서 아래 사항을 확인했다.

```text
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
```

```text
origin  https://github.com/seulgae/seulgae-tech-lab.git (fetch)
origin  https://github.com/seulgae/seulgae-tech-lab.git (push)
```

```text
main
```

따라서 이 시점에 확인된 결과는 **로컬 복제 성공**, **`origin` 원격 주소 등록**, **현재 브랜치 `main`**, **`origin/main`과 동기화된 상태**, **추적 파일의 미커밋 변경 없음**이다. 아직 새 코드를 커밋하거나 원격에 push한 결과를 확인한 것은 아니다.

## 다음 단계에서 주의할 점

Git 저장소 연결을 마쳤으므로 다음에는 같은 저장소 안에 프론트엔드 프로젝트를 구성할 예정이다. React·Vite·TypeScript와 Phaser를 사용하되, 기술 설치와 실행 성공 여부는 별도의 실습에서 확인해야 한다.

프론트엔드 프로젝트를 생성하기 전에는 `.gitignore`를 점검해야 한다. `node_modules`, 빌드 산출물, 실제 비밀번호가 포함된 환경변수 파일이 Git에 추적되지 않도록 관리하기 위해서이다. 저장소를 Public으로 공개하더라도 **소스코드 공개와 비밀 정보 공개는 전혀 다른 문제**이다.

이번 작업에서 배운 핵심은 `git clone`의 마지막 인자 하나로 복제 위치가 달라진다는 점이다. 이미 만들어 둔 로컬 폴더를 그대로 사용하려면 `.`을 지정하고, 복제 후에는 `status`, `remote`, `branch`를 각각 확인해야 연결 상태를 확실하게 이해할 수 있다.

## 참고 자료

- [GitHub Docs — Creating a new repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository)
- [GitHub Docs — Cloning a repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)
- [Git documentation — git-clone](https://git-scm.com/docs/git-clone)
