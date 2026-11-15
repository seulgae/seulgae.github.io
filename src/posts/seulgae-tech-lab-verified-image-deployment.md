---
title: SHA 입력 없이 검증된 이미지를 배포하는 운영 명령 구성하기
date: 2026-11-15
createdAt: 2026-11-15T19:36:10+09:00
tags: Docker Compose, GitHub Actions, GHCR, Python, CI/CD
summary: CI 성공 이력과 이미지 digest를 연결하고 앱 롤백과 DB 마이그레이션을 분리한 운영 스크립트를 구현한 기록이다.
category: seulgae-tech-lab
---

연구 기록 기능을 main에 병합했지만 서버에는 초기 인프라 버전이 실행 중이었다. 기존 배포는 운영자가 커밋 SHA를 직접 지정해야 했다. 운영 명령은 간단하게 유지하면서, 실제로 어떤 검증 버전이 실행되는지는 추적할 수 있도록 바꾸기로 했다.

이번 챕터는 배포 로직과 CI 구성의 구현 기록이다. 글 작성 시점에는 PR #3의 검증이 진행 중이며, 새 이미지의 실제 배포와 수동 롤백 결과는 다음 챕터에서 다룬다. 자동 배포 자격증명도 아직 GitHub에 등록하지 않았다.

## 기존 서비스의 상태부터 다시 확인했다

기존 Ubuntu 서버의 Compose 구성, 실행 이미지, PostgreSQL, 배포 경로와 GitHub Actions를 조사했다. 연구소 앱은 별도 Compose 프로젝트와 네트워크를 사용하며 PostgreSQL 인스턴스만 공유하는 구조였다. 개발 DB와 운영 DB도 분리돼 있었다.

작업을 재개해 조사하던 중 기존 InvenCore 앱 두 개가 중지된 것을 발견했다. OOM 표시는 없었지만 그것만으로 원인을 단정하지 않았다. 사용자 확인을 통해 직접 중지한 상태이며 Funnel도 연구소 웹으로 변경했음을 확인했다.

처음 작성한 배포 검사는 기존 앱이 실행 중이어야 통과하는 방식이었다. 현재 운영 의도에 맞게 이를 수정했다. **사용자가 중지한 앱은 그대로 중지 상태를 보존하고, 공유 PostgreSQL 등은 정상 실행 여부를 검사**한다. 기존 앱을 임의로 시작하지 않았다.

## 짧은 명령과 검증 로직을 분리했다

프로젝트 루트에 `deploy.sh`, `start.sh`, `stop.sh`, `restart.sh`, `status.sh`, `logs.sh`, `rollback.sh`를 두었다. 기존 `deploy/deploy.sh`도 새 명령으로 연결해 배포 진입점을 중복 구현하지 않았다.

다음은 실제 `deploy.sh` 전체이다.

```bash
#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd -- "$(dirname -- "$0")" && pwd)"
exec python3 "$ROOT/deploy/ops.py" deploy "$@"
```

공통 구현은 `deploy/ops.py`에 모았다. Linux의 `flock`으로 중복 변경 작업을 막고, Compose 프로젝트와 서비스 대상을 코드에서 고정했다. 운영자가 SHA나 Compose 옵션을 추가로 전달하면 거부한다. 조회 명령은 상태를 바꾸지 않으므로 변경 작업 잠금과 분리했다.

| 명령 | 역할 |
| --- | --- |
| deploy.sh | 최신 검증 릴리스 선정과 배포 |
| start.sh | 현재 기록된 이미지 시작 |
| stop.sh | 연구소 앱 두 개만 중지 |
| restart.sh | 연구소 앱 재시작 후 정상 응답 확인 |
| status.sh | SHA·CI 실행·digest·스키마·컨테이너 상태 조회 |
| logs.sh | 앱 로그 조회 |
| rollback.sh | 직전 정상 앱 이미지 복원 |

`deploy/compose.release.yml`은 기본 Compose에 이미지 참조만 덮어쓴다. 공유 DB를 중지하거나 볼륨을 삭제하는 명령은 포함하지 않았다. 컨테이너 재시작과 Ubuntu 재부팅도 별개로 다뤘다.

## latest 대신 성공 CI와 digest를 연결했다

`.github/workflows/ci.yml`은 프론트엔드, Java 17 백엔드, 운영 스크립트를 검증한다. main에서 검증이 통과하면 두 이미지를 GHCR에 게시하고 GitHub Release에 `release.json`을 첨부한다. manifest에는 커밋 SHA, CI 실행 ID, 두 이미지의 digest, DB 스키마 호환 범위를 기록한다.

배포 스크립트는 다음 조건을 차례로 검사한다.

1. main에서 성공 완료한 push 또는 수동 CI 실행인가.
2. 해당 실행에 게시된 manifest가 존재하는가.
3. manifest의 저장소·SHA·실행 ID가 실제 CI와 일치하는가.
4. 해당 커밋이 원격 main의 이력에 포함되는가.
5. 이미지가 지정된 GHCR 경로의 digest 참조인가.
6. 현재 DB 스키마가 앱의 호환 범위 안에 있는가.
7. Pull한 이미지의 OCI revision 라벨이 검증 SHA와 같은가.

태그가 나중에 다른 이미지를 가리키는 상황을 피하려고 실행 대상을 digest로 고정했다. CI가 진행 중이거나 실패한 커밋은 선택하지 않는다. manifest가 없던 과거 CI는 건너뛰되, SHA 대조가 틀린 manifest를 만나면 중단한다.

## 앱 복원과 DB 복원을 분리했다

배포 전 현재 버전과 후보 버전을 진행 기록에 저장한다. 갱신 후 컨테이너 health, 웹 HTML, 상태 API와 연구 기록 읽기 API를 확인한다. 검증에 실패하면 이전 앱을 한 번 복원하고, 복원에도 실패하면 기록을 남긴 채 중단한다. 무한 재시도하지 않는다.

다음은 `deploy/ops.py`에서 발췌한 스키마 검사이다.

```python
def compatible(release, version):
    b = release['db_schema']
    if not b['min'] <= version <= b['max']:
        raise OpsError(f'DB schema {version} outside compatible range {b["min"]}..{b["max"]}; no DB changes performed')
```

현재 연구 기록 앱은 스키마 1을 요구한다. 배포 스크립트 자체는 Flyway를 실행하지 않는다. `deploy/migrate-prod.py`는 기존 V1을 처음 적용할 때만 사용하는 별도 명령으로 구성했다. 검증 main 소스를 선택하고 운영 DB를 백업한 뒤, 백업 목록을 읽을 수 있는지 확인하고 전용 migrator로 target=1을 적용하도록 구현했다. 이 글 작성 시점에는 운영 DB에 실행하지 않았다.

이미지를 되돌려도 DB 데이터와 Flyway 이력이 되돌아가지는 않는다. 이전 앱과 현재 스키마가 호환되지 않으면 이미지 롤백도 거부한다. DB 복원은 별도 판단과 승인 범위로 남겼다.

## 자동 배포도 같은 명령을 사용하도록 했다

`.github/workflows/deploy.yml`은 main CI 성공 후 Tailscale로 서버에 연결해 동일한 `deploy.sh`를 실행하도록 작성했다. 별도 배포 구현을 Actions 안에 복제하지 않았다. `DEPLOY_ENABLED`가 활성화돼야 실행되므로 자격증명 등록 전에는 배포되지 않는다.

개인 접속용 SSH 키를 재사용하지 않고 전용 CI 키를 생성했다. 서버에는 `restrict`와 고정 배포 명령을 붙여 공개키를 등록했고, 개인키는 저장소 밖에 보관했다. 기존에 인증된 SSH 세션으로 서버 호스트 공개키를 읽어 known_hosts 파일도 준비했다. 개인키와 비밀번호는 본문과 Git에 포함하지 않았다.

Secrets 등록 항목과 운영자의 실제 서버 명령은 `docs/operations.md`에 정리하고, `docs/infrastructure.md`에서 연결했다. GitHub Secrets 등록과 Tailscale CI 연결은 아직 미완료이다.

## 검증한 범위와 남은 작업

당시 서버의 별도 임시 디렉터리에서 다음 테스트를 실행해 기존 10개 테스트가 통과했다.

```bash
python3 -m unittest discover -s deploy -p 'test_*.py' -v
```

검증 대상은 잘못된 manifest, 성공 main 선택, 스키마 범위, 중복 잠금, 모의 배포 실패 시 한 번 복원, 복원 실패 시 복구 기록 유지 등이었다. 이후 의도적으로 중지한 기존 앱을 허용하는 수정과 관련 테스트 2개를 추가했다. 최신 수정의 CI 결과는 이 글 작성 시점에 진행 중이었다.

첫 구현 커밋의 PR CI에서는 프론트엔드·백엔드·운영 검증이 모두 성공했다. 이후 수정한 최신 head의 결과를 대신하는 근거로 사용하지는 않았다. 실제 운영 장애를 주입하는 테스트도 하지 않았다.

- 구현과 문서: PR #3에 반영했다.
- 실제 신규 이미지 배포와 수동 롤백: 아직 수행하지 않았다.
- 운영 DB V1 적용: 아직 수행하지 않았다.
- 자동 배포: Secrets 등록 후 실제 연결 검증이 필요하다.

이번에 배운 점은 명령을 짧게 만드는 것과 배포 근거를 생략하는 것이 다르다는 점이다. 운영자는 한 명령을 실행하되, 내부에서는 검증 이력·이미지·스키마·이전 정상 버전을 연결해야 한다. 다음 챕터에서는 게시된 이미지로 실제 배포와 운영 명령을 검증하고 결과를 구분해 기록할 예정이다.