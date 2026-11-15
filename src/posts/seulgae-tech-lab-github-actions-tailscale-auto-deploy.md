---
title: "[슬개기술연구소] GitHub Actions와 Tailscale로 홈서버 자동 배포 연결하기"
date: 2026-11-15
createdAt: 2026-11-15T20:10:00+09:00
tags: GitHub Actions, Tailscale, CI/CD, SSH, Docker Compose, Ubuntu, 홈서버
summary: "GitHub Actions Secrets·Variables와 Tailscale Auth Key를 설정하고, 기존 deploy.sh를 원격 실행하는 자동 배포를 연결한 과정"
category: seulgae-tech-lab
---

# GitHub Actions와 Tailscale로 홈서버 자동 배포 연결하기

슬개기술연구소 프로젝트는 React·Phaser 프론트엔드, Spring Boot 백엔드, PostgreSQL을 사용하고 Ubuntu 홈서버에서 Docker Compose로 운영한다.

수동 배포는 이미 `./deploy.sh` 명령어 하나로 처리하도록 정리했다. 이번에는 **GitHub의 검증된 빌드가 성공한 뒤 홈서버의 동일한 배포 스크립트를 자동으로 실행**하는 환경을 완성했다.

핵심은 서버에 SSH 포트를 인터넷으로 공개하지 않고 **Tailscale 네트워크를 통해 GitHub Actions 러너가 접근**하도록 만드는 것이다.

> 이 글은 실제 설정 과정과 완료 후 확인한 결과를 기록한 것이다. 인증키·SSH 개인키·Secret 값은 포함하지 않았다.

## 1. 배포 구조

```text
GitHub main 브랜치
       │
       ▼
GitHub Actions CI
  - 프론트엔드 / 백엔드 빌드·검증
  - 검증된 이미지 및 배포 정보 게시
       │ 성공
       ▼
GitHub Actions 배포 워크플로
  - Tailscale 임시 노드 연결
  - SSH로 Ubuntu 서버 접속
       │
       ▼
Ubuntu 홈서버
/opt/homeserver/apps/seulgae-tech-lab
       │
       └── ./deploy.sh
             ├── 검증된 배포 버전 선택
             ├── Docker 이미지 갱신
             ├── Health Check
             └── 실패 시 이전 앱 버전 복원 시도
```

GitHub Actions에서 이미지 SHA를 사람이 직접 입력하는 방식이 아니라, 서버의 `deploy.sh`가 **최신 검증 버전을 내부적으로 판별**하는 방식이다. 운영자는 이미지 태그나 커밋 해시 없이 같은 명령어를 사용할 수 있다.

```bash
cd /opt/homeserver/apps/seulgae-tech-lab
./deploy.sh
```

## 2. GitHub Actions Secrets 등록

먼저 저장소의 **Settings → Secrets and variables → Actions → Secrets**에 들어갔다.

- 저장소: `seulgae/seulgae-tech-lab`
- 설정 페이지: https://github.com/seulgae/seulgae-tech-lab/settings/secrets/actions

초기 화면에서는 Repository secrets가 비어 있었다. `New repository secret`을 눌러 아래 3개를 등록했다.

| Secret 이름 | 목적 |
| --- | --- |
| `DEPLOY_SSH_PRIVATE_KEY` | Actions 러너가 서버에 접속할 전용 SSH 개인키 |
| `DEPLOY_SSH_KNOWN_HOSTS` | SSH 연결 대상의 호스트 공개키 검증 |
| `TAILSCALE_AUTHKEY` | Actions 러너의 Tailscale 네트워크 접속 |

### SSH 배포키 등록

프로젝트 운영 가이드에 따라 별도의 CI 전용 SSH 키가 준비돼 있었다. 개인적으로 사용하는 홈서버 SSH 키를 그대로 공유하지 않고 배포용 키를 분리했다.

Windows PowerShell에서 개인키를 **화면에 출력하지 않고 클립보드에 복사**해 GitHub Secret 입력란에 붙여 넣었다.

```powershell
Get-Content "$env:USERPROFILE\.config\seulgae-tech-lab\ci\deploy_ed25519" -Raw | Set-Clipboard
```

`DEPLOY_SSH_KNOWN_HOSTS`에는 미리 확인한 서버 호스트 공개키 정보를 등록했다.

```powershell
Get-Content "$env:USERPROFILE\.config\seulgae-tech-lab\ci\known_hosts" -Raw | Set-Clipboard
```

`known_hosts`는 SSH 개인키와 다르다. 실제 연결 대상 서버가 기대한 서버인지 확인하는 데 사용한다. 접속 시마다 `ssh-keyscan` 결과를 무조건 신뢰하도록 만드는 대신, 사전에 확인한 값을 사용했다.

> 키 파일의 실제 내용은 로그·블로그·채팅·Git 저장소에 남기지 않는다. 클립보드에도 민감한 내용이 잠시 들어가므로 사용 후 다른 값으로 덮어쓰는 것이 좋다.

## 3. Tailscale Auth Key 생성

Tailscale 관리자 페이지의 **Settings → Keys → Auth keys**에서 `Generate auth key...`를 선택했다.

- 관리 페이지: https://login.tailscale.com/admin/settings/keys
- `Generate access token...`은 이번 목적에 사용하지 않았다.

설정 화면에서 아래 항목을 확인했다.

| 항목 | 설정 |
| --- | --- |
| Description | `seulgae-tech-lab-github-actions` |
| Reusable | 켬 |
| Expiration | 90일 |
| Ephemeral | 켬 |
| Tags | 끔 |

**Reusable**은 여러 GitHub Actions 실행에서 같은 인증키를 사용할 수 있도록 한다. **Ephemeral**은 작업이 끝나고 연결이 끊어진 임시 장치를 정리하는 데 적합하다.

생성된 Auth Key는 GitHub의 `TAILSCALE_AUTHKEY` Secret에 직접 저장했다. 실제 키 문자열은 문서에 남기지 않았다.

> Auth Key의 만료 기간과 장치의 노드 키 만료는 별개다. 이때 Auth Key에 90일 유효기간을 설정했으므로, 계속 자동 배포하려면 만료 전에 Secret을 갱신해야 한다.

## 4. GitHub Actions Variables 설정

같은 설정 페이지의 **Variables** 탭에서 `New repository variable`로 다음 항목을 추가했다.

| Variable 이름 | 값 | 의미 |
| --- | --- | --- |
| `DEPLOY_HOST` | `seulgae-server.tailac4b36.ts.net` | Tailscale에서 접근할 서버 |
| `DEPLOY_USER` | `seulgae` | SSH 로그인 계정 |
| `DEPLOY_ENABLED` | `false` → `true` | 자동 배포 활성화 여부 |

- 설정 페이지: https://github.com/seulgae/seulgae-tech-lab/settings/variables/actions

먼저 `DEPLOY_ENABLED=false`로 등록했다. 인증 정보와 네트워크 정책을 확인한 뒤 `true`로 변경해 실제 자동 배포를 활성화했다.

`DEPLOY_ENABLED`를 두면 민감한 배포 정보를 지우지 않고도 자동 배포 실행 여부를 제어할 수 있다.

## 5. Tailscale 접근 정책 확인

Tailscale의 **Access controls → Policies → General access rules** 화면도 확인했다.

당시 보인 정책은 다음과 같은 전체 허용 규칙이었다.

```json
{
  "src": ["*"],
  "dst": ["*"],
  "ip": ["*"]
}
```

따라서 GitHub Actions의 임시 Tailscale 장치가 네트워크에 연결되면 정책상 서버 SSH 포트로 통신할 수 있는 상태였다.

다만 이것은 **최소 권한 정책이 아니다.** 실제 운영 보안을 개선하려면 CI 전용 태그와 Tailscale 접근 규칙을 분리하고, CI 노드가 배포 서버의 TCP 22 등 필요한 연결만 할 수 있도록 좁혀야 한다. 이 과정에서는 광범위한 허용 정책이 확인되었으며, 세부 제한 정책으로 교체했다고 기록하지 않는다.

## 6. 배포 워크플로 동작 방식

저장소의 `.github/workflows/deploy.yml`은 CI 워크플로 완료 이벤트를 기준으로 실행되도록 구성되어 있다.

배포 Job은 다음 조건들을 확인한다.

- 선행 CI 워크플로가 성공했는가?
- 실행 대상 브랜치가 `main`인가?
- 동일 저장소에서 실행된 작업인가?
- Pull Request 이벤트가 아닌가?
- `DEPLOY_ENABLED`가 `true`인가?

조건을 만족하면 Tailscale GitHub Action을 통해 Tailnet에 연결하고, 등록한 SSH 인증 정보를 이용해 서버에 접속한다.

서버에서 실행하는 배포 명령의 핵심은 다음과 같다.

```bash
cd /opt/homeserver/apps/seulgae-tech-lab && ./deploy.sh
```

자동 배포와 수동 배포에서 같은 스크립트를 사용하므로 배포 동작을 각각 다르게 유지할 필요가 없다.

SSH 연결은 호스트 키 검증을 켠 상태로 수행한다. 또한 프로젝트 전용 CI 공개키는 서버의 `authorized_keys`에서 지정된 배포 명령만 실행할 수 있도록 제한하는 구성을 사용했다.

## 7. 첫 자동 배포 실행 및 결과

설정이 끝난 뒤 `DEPLOY_ENABLED=true`로 변경하고 GitHub Actions 화면에서 **Build and deploy tech lab** 워크플로를 `main` 대상으로 실행했다.

- GitHub Actions: https://github.com/seulgae/seulgae-tech-lab/actions

사용자가 실행 결과를 확인했고 **자동 배포가 정상 동작**했다고 보고했다.

서버에서 배포 상태를 확인할 때는 다음 명령어를 사용한다.

```bash
cd /opt/homeserver/apps/seulgae-tech-lab
./status.sh
```

실패 원인을 확인할 때는 다음 명령을 활용할 수 있다.

```bash
cd /opt/homeserver/apps/seulgae-tech-lab
./logs.sh backend
./logs.sh frontend
```

이번 대화에서는 실제 GitHub Actions Job 로그의 상세 출력이나 실행 ID를 별도로 기록하지 않았으므로, 성공한 개별 Job의 시간·소요 시간·로그 내용을 임의로 작성하지 않았다.

## 8. 홈서버에서 자주 쓰는 운영 명령어

모든 명령어는 아래 위치에서 실행한다.

```bash
cd /opt/homeserver/apps/seulgae-tech-lab
```

| 목적 | 명령어 |
| --- | --- |
| 검증된 최신 버전 배포 | `./deploy.sh` |
| 연구소 앱 시작 | `./start.sh` |
| 연구소 앱 중지 | `./stop.sh` |
| 연구소 앱 재시작 | `./restart.sh` |
| 상태 확인 | `./status.sh` |
| 앱 로그 확인 | `./logs.sh` |
| 이전 앱 버전 복원 | `./rollback.sh` |

이 명령어들은 슬개기술연구소 애플리케이션을 대상으로 하며 공유 PostgreSQL이나 기존 InvenCore를 임의로 재시작하지 않도록 설계했다.

특히 `./restart.sh`는 **애플리케이션 컨테이너 재시작**이지 Ubuntu 운영체제 재부팅이 아니다.

롤백 또한 앱 이미지 복원을 의미하며, **PostgreSQL 데이터나 Flyway 스키마를 자동으로 되돌리는 작업은 아니다.**

## 9. 정리 및 남은 개선 사항

이번 작업으로 GitHub Actions Secrets 3개, Variables 3개를 등록하고, Tailscale을 통한 SSH 연결 기반 자동 배포가 작동하는 것을 확인했다. 사용자는 이미지 SHA를 직접 관리하거나 서버에서 매번 복잡한 Docker 명령어를 입력하지 않아도 된다.

남은 개선 과제는 다음과 같다.

- 기존 전체 허용 Tailscale 정책을 CI 전용 최소 권한 규칙으로 좁히기
- Tailscale Auth Key 만료 전 교체 절차 마련
- 이후에도 자동 배포 로그와 서버 `./status.sh` 결과를 함께 점검하기
- 운영 환경 변경 시 애플리케이션 롤백과 DB 복원을 구분해 검증하기

**핵심은 GitHub Actions가 모든 배포 절차를 새로 구현하는 게 아니라, 서버에서 이미 검증된 `deploy.sh`를 안전하게 호출하도록 연결했다는 점이다.**
