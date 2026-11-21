---
title: 홈서버 구축 8 — Compose 운영에서 재시작·백업·롤백을 구분하기
date: 2026-11-21
createdAt: 2026-11-21T23:27:10+09:00
tags: Docker Compose, PostgreSQL, Backup, Rollback, Python, Operations
summary: 두 프로젝트의 실제 운영 도구를 비교하고 상태 확인·설정 반영·데이터 복원·이미지 롤백의 경계를 정리했다.
category: linux-ops
---

## 1. 들어가며

[7편](/blog/home-server-java17-spring-boot-docker-build)에서 앱 이미지를 만들었다. 운영에서는 새 이미지를 시작하는 일보다 기존 데이터와 정상 서비스를 지키는 일이 더 중요했다. 이 글은 Compose의 기본 조작과 실제 구현된 스크립트를 구분한다. 파일 이름만 보고 복구가 자동이라고 추측하지 않는다.

## 2. 구현 목표

현재 서비스와 이미지·설정·데이터를 식별하고, 실패 시 되돌릴 대상을 분명하게 한다. 앱 이미지 복원과 DB 복원을 같은 버튼으로 취급하지 않는다. 운영 DB를 지우는 명령은 점검 과정에 포함하지 않는다.

## 3. 사전 지식

Compose의 서비스는 앱의 역할이고 컨테이너는 그 실행 인스턴스다. 네트워크는 통신 범위, 볼륨은 데이터 수명, secret은 전달 경로를 표현한다. 환경 파일과 secret 파일은 호스트의 별도 접근 제어가 필요하다. [Compose secret 문서](https://docs.docker.com/compose/how-tos/use-secrets/)와 함께 확인한다.

`depends_on`의 `service_healthy`는 기동 시 준비 조건이다. 실행 중 DB 장애의 자동 복구나 앱의 재연결을 대신하지 않는다. `restart: unless-stopped`도 unhealthy 표시만으로 컨테이너를 무조건 재시작하는 정책이 아니다. [Compose 기동 순서](https://docs.docker.com/compose/how-tos/startup-order/)와 프로세스 재시작 정책을 구별한다.

## 4. 현재 환경 — 프로젝트별 복구 정책이 다르다

| 대상 | 확인한 구현과 범위 |
| --- | --- |
| InvenCore | `deployment/docker/deploy.sh`가 Python 배포 도구를 호출한다. 문서는 실패 시 종료·별도 확인을 안내하며 자동 롤백을 약속하지 않는다. |
| 슬개기술연구소 | 루트의 start·stop·restart·status·logs·rollback 진입점이 `deploy/ops.py`로 연결된다. 상태 기록·이미지·스키마·공유 서비스 검증을 수행한다. |

‘우리 sh’라는 이름만으로 두 도구의 내부 동작을 같다고 쓰면 안 된다. 이 글 작성에서는 두 구현을 읽었고 실제 운영 명령은 실행하지 않았다.

## 5. 구축 과정

### 조회부터 하고 설정 반영 방식을 선택하기

다음은 현재 서비스의 Compose 파일·프로젝트를 정확히 선택했다는 전제의 일반 예시다.

```bash
docker compose config --quiet
docker compose ps --all
docker compose logs --tail 100 backend
docker compose logs --follow backend
```

로그는 최근 범위를 먼저 보고 필요하면 추적한다. 자격 증명이나 사용자 입력이 포함될 수 있으므로 원문을 공개하지 않는다. 설정 전체를 출력하는 대신 검사용 `--quiet`를 쓴다.

`restart`는 기존 컨테이너를 다시 시작한다. 환경변수나 Compose 설정 변경을 새로 적용하는 동작과 같지 않다. 변경된 서비스를 재생성하려면 대상과 차이를 검토해 `up -d` 등을 사용한다. [Compose restart 문서](https://docs.docker.com/reference/cli/docker/compose/restart/)도 설정 변경이 반영되지 않는 점을 명시한다.

### 실제 운영 진입점 확인

연구소의 `start.sh`는 경로를 계산한 뒤 다음으로 위임한다.

```bash
exec python3 "$ROOT/deploy/ops.py" start "$@"
```

다른 파일도 action을 달리해 같은 Python 로직으로 연결된다. 확인한 사용 형태는 다음과 같다. 이는 **연구소 도구 설명**이며 새 실습 Compose의 공통 명령이 아니다.

| 명령 | 확인한 역할 |
| --- | --- |
| `./status.sh` | 기록된 버전·이미지·스키마와 컨테이너·상태 확인 |
| `./logs.sh backend --follow` | 제한된 서비스의 최근 로그와 추적 |
| `./start.sh` / `./stop.sh` | 관리 대상 앱 시작·중지 |
| `./restart.sh` | 앱 재시작과 상태 확인 |
| `./rollback.sh` | 이전 성공 상태 또는 중단 기록을 사용한 복구 |

DB·다른 앱까지 한꺼번에 내리는 범용 명령과 다르다. 실제 대상은 스크립트가 계산한 Compose 프로젝트·서비스에 따른다.

### DB 백업은 Ubuntu Bash에서 별도로 만들기

아래는 6편의 **실습 DB용 예시**다. 운영 자료를 복사하는 명령이 아니며 백업 파일은 비공개로 보관한다.

```bash
umask 077
mkdir -p backups
labBackup="./backups/example_dev-$(date +%Y%m%d-%H%M%S).dump"
docker compose exec -T postgres pg_dump -U example_admin -d example_dev -Fc > "$labBackup" &&
test -s "$labBackup" &&
docker compose exec -T postgres pg_restore --list < "$labBackup"
```

`-T`는 가상 터미널을 끄고 `-Fc`는 custom 형식 아카이브를 만든다. `&&`는 앞 단계가 성공할 때만 다음 검사를 진행하게 한다. 전체 명령의 종료 코드도 반드시 확인하며, 파일 크기와 목록 출력은 복원 성공을 뜻하지 않는다. [PostgreSQL SQL dump](https://www.postgresql.org/docs/18/backup-dump.html)의 기본 원리다.

DB별 dump에는 전체 클러스터의 역할·모든 외부 파일이 자동 포함되지 않는다. 소유 역할과 권한, 업로드 파일, 확장과 DB 버전은 별도로 보관한다. 서로 연결된 DB와 파일의 일관성도 백업 시점 정책으로 정해야 한다.

### 복원은 빈 검증 DB에서 시험하기

같은 실습 인스턴스에 해당 이름의 DB가 없다는 전제다.

```bash
docker compose exec -T postgres createdb -U example_admin example_restore &&
docker compose exec -T postgres pg_restore --exit-on-error -U example_admin -d example_restore < "$labBackup"
```

운영 DB에 덮어쓰는 예시가 아니다. 필요한 역할이 존재하는지 확인하고, 복원 뒤 객체·행 수·업무 조회를 원본과 대조한다. `--exit-on-error`는 오류를 조용히 넘기지 않게 한다. [pg_restore 문서](https://www.postgresql.org/docs/18/app-pgrestore.html)처럼 백업 형식과 복원 도구를 맞춘다.

### 앱 롤백의 호환 조건 확인

연구소의 `deploy/ops.py`는 후보와 DB 스키마의 호환성을 확인하고 성공·이전·진행 중 상태를 기록한다. 실패 시 기존 앱을 한 번 복원하거나 첫 설치 후보 앱만 정리한다. 복구도 실패하면 기록을 남기고 명시적 대응을 요구한다.

반면 확인한 InvenCore 문서는 앱 교체 실패 뒤 자동 롤백하지 않는다고 적혀 있다. 이전 성공 버전을 다시 선택하더라도 DB가 그 앱과 호환되는지 확인해야 한다. 앱 이미지가 옛 버전이라고 DB의 열과 데이터가 옛 상태로 돌아가지는 않는다.

## 6. 트러블슈팅

실제 기록에는 새 이미지는 배포됐지만 서버 저장소의 Compose가 옛 버전이라 로그인 환경변수가 반영되지 않은 문제가 있다. 같은 이미지라는 이유로 배포를 생략한 경로도 있었다. 연구소는 릴리스 커밋과 설정·배포 도구를 맞추고 같은 이미지에도 필요한 설정 적용을 하도록 수정했다.

또한 물리 서버 첫 설치에는 이전 앱이 없어 일반 롤백을 할 수 없었다. 이전 상태 없음과 부분 설치를 구분하고 후보 소유 컨테이너만 정리하도록 보완했다. 이러한 사례는 단순 재시작으로 해결되는 장애와 다르다.

## 7. 기술적 이해

운영 상태는 이미지·설정·스키마·영속 데이터의 조합이다. 각 항목이 같은 시점의 자료인지 확인해야 한다. 재시작은 프로세스 수명, 이미지 전환은 실행 코드, 복원은 데이터 상태에 영향을 준다. 어떤 복구를 하는지 먼저 말할 수 있어야 했다.

## 8. 최종 검증

- [ ] 변경할 Compose 프로젝트와 서비스를 식별한다.
- [ ] 실행 이미지와 상태 기록을 대조한다.
- [ ] 앱·프록시·DB 연결을 따로 확인한다.
- [ ] 재시작 정책과 건강 상태의 의미를 구분한다.
- [ ] 백업의 목록 검사와 별도 DB 복원 시험을 남긴다.
- [ ] 롤백할 앱의 스키마 호환성을 확인한다.
- [ ] 공유 DB·다른 서비스가 변경되지 않았는지 비교한다.

이번에는 운영 명령·백업·복원을 실행하지 않았다. 실제 백업 파일의 복원 가능성과 현재 운영 상태는 **확인하지 못함**이다.

## 9. 회고

운영 명령을 짧게 만드는 것보다 그 명령의 대상과 실패 범위를 좁히는 일이 먼저였다. 백업이 있다는 말에도 복원 시험이 필요하고 롤백 가능하다는 말에도 DB 호환성이 따라온다. 이후에는 복구 명령과 성공 판정 기준을 함께 기록하겠다.

## 10. 다음 편

[9편](/blog/home-server-tailscale-funnel-access)에서는 내부 관리 경로와 공개 HTTPS 경로를 나눈다. 서버가 healthy인데 브라우저에서 열리지 않는 경우를 요청 경로별로 살펴본다.

---

[전체 목차](/blog/home-server-architecture-hyper-v-ubuntu-docker) · [이전 글](/blog/home-server-java17-spring-boot-docker-build) · [다음 글](/blog/home-server-tailscale-funnel-access)



