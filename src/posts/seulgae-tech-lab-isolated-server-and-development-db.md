---
title: 기존 Ubuntu 서버에 연구소를 함께 운영하기 — Compose 격리부터 IntelliJ 개발 DB 연결까지
date: 2026-11-15
createdAt: 2026-11-15T15:12:02+09:00
tags: Ubuntu, Hyper-V, Docker Compose, PostgreSQL, SSH, Spring Boot, IntelliJ, Infra
summary: InvenCore를 중단하지 않고 기존 서버에 연구소 실행 환경과 개발·운영 DB를 분리하고, SSH 터널과 IntelliJ에서 접속 및 권한 제한을 검증한 기록.
category: seulgae-tech-lab
---

컴퓨터 가까이에서 E를 누르면 React 연구 기록 패널이 열리는 기능까지 구현했다. 다음에는 기록을 실제로 저장할 백엔드와 데이터베이스가 필요했다. 다만 이미 InvenCore를 운영하는 Ubuntu 서버가 있어, 새 VM을 만드는 대신 **기존 서비스를 유지하면서 연구소를 추가할 수 있는지** 먼저 확인하기로 했다.

이번 작업은 9단계의 서버 재활용·배포 기반 구성과 10단계의 IntelliJ 개발 DB 연결 검증을 묶은 기록이다. 연구 기록 API나 게임 기능을 확장한 작업은 아니다. 서버에서 컨테이너가 실행되는 상태, Windows에서 DB에 접속되는 상태, IntelliJ에서 실제 조회되는 상태를 각각 확인했다.

## 변경보다 기존 서비스 조사부터 시작했다

기존 서버는 Hyper-V 기반 Ubuntu Server 24.04 LTS였다. Docker Compose로 InvenCore 애플리케이션, PostgreSQL, Kafka, Redis를 운영하고 있었고, 기존 웹 서비스는 Tailscale Funnel을 통해 공개하고 있었다.

먼저 다음 명령으로 자원과 실행 상태를 조사했다. 아래는 당시 실행한 조사 명령 중 일부이다.

```bash
uptime
free -h
df -h /
docker compose ls
docker ps
docker network ls
docker volume ls
docker stats --no-stream
ss -lnt
tailscale funnel status
```

| 항목 | 당시 확인 결과 |
| --- | --- |
| CPU | 8개 |
| 메모리 | 전체 약 7.8GiB, 작업 전 가용 약 6.3GiB |
| 루트 디스크 | 전체 약 31GiB, 작업 전 여유 약 15GiB |
| PostgreSQL | 기존 18 버전 인스턴스 정상 동작 |
| DB 최대 연결 수 | 100 |
| 기존 서비스의 DB 연결 | 조사 시점 10개 |
| 기존 애플리케이션 | 프론트엔드·백엔드 컨테이너 healthy |

자원에는 여유가 있었지만, 이것만으로 향후 부하까지 감당한다고 판단하지는 않았다. 우선 작은 실행 환경을 추가하고 신규 컨테이너의 자원 상한을 설정하는 수준으로 범위를 잡았다.

### SSH와 Docker 권한도 별도로 풀어야 했다

처음에는 SSH 공개키 인증이 실패했다. 상세 로그에서는 서버가 공개키를 수락했지만, 암호로 잠긴 개인키를 비대화형 접속에서 사용할 수 없었다. Windows의 `ssh-agent`를 활성화하고 키를 등록한 뒤 연결했다.

에이전트 서비스를 설정할 때는 일반 PowerShell에서 접근 거부가 발생했다. 서비스 설정과 시작은 관리자 PowerShell에서, 개인키 암호 입력은 사용자가 직접 진행했다. SSH 개인키의 암호와 이후 생성한 DB 계정의 비밀번호는 서로 다른 인증정보이다.

SSH 접속 후에는 Docker 소켓 접근이 거부됐다. 기존 로그인 계정에 Docker 그룹 권한을 추가하고 새 SSH 연결을 만든 뒤 조사 명령을 실행했다. **Docker 그룹은 단순 조회 권한이 아니라 관리자 수준의 제어 권한을 갖는다는 점**도 운영 안내에 남겼다. 이후 CI용 배포 권한을 설계할 때 이 개인용 접속 경로를 그대로 재사용하지 않기로 했다.

## Compose를 분리하고 DB 인스턴스만 공유했다

새 프로젝트의 실행 환경은 별도 Compose 프로젝트로 만들었다. 기존 컨테이너의 설정이나 네트워크 연결을 바꾸는 대신, 신규 백엔드와 개발 접속 프록시만 기존 PostgreSQL 네트워크에 참여시켰다.

```text
Windows IntelliJ
  → SSH 터널
  → 서버 루프백의 개발 DB 프록시
  → 기존 PostgreSQL 인스턴스의 개발 DB

신규 프론트엔드
  → 연구소 전용 내부 네트워크
  → 신규 Spring Boot 백엔드
  → 기존 DB 네트워크
  → 같은 PostgreSQL 인스턴스의 운영 DB
```

프론트엔드에는 호스트 접속용 네트워크와 백엔드 통신용 내부 네트워크를 두었다. 백엔드의 HTTP 포트는 호스트에 공개하지 않았다. 신규 웹과 개발 DB 프록시도 서버의 루프백 주소에만 바인딩했다.

여기서 한 번 시행착오가 있었다. 프론트엔드를 내부 네트워크에만 연결했을 때 컨테이너 자체 healthcheck는 통과했지만, 호스트에서 새 웹 포트에 접속할 수 없었다. 당시 Docker 환경에서는 PortBindings 설정이 있어도 실제 공개 포트가 생성되지 않았다. 프론트엔드에 별도 접속용 네트워크를 추가하고 신규 프론트엔드만 다시 생성한 뒤 HTTP 응답을 확인했다.

이는 **컨테이너 내부의 정상 응답과 호스트에서의 접근 가능성이 서로 다른 검증 항목**이라는 것을 보여 줬다. 내부 네트워크만으로 모든 접속 경로를 처리할 수 있다고 가정하지 않고, 실제 포트 상태와 호스트 HTTP 요청으로 수정 결과를 확인했다.

| 신규 컨테이너 | 메모리 상한 | 역할 |
| --- | --- | --- |
| 프론트엔드 | 128MiB | React·Phaser 정적 파일과 백엔드 요청 전달 |
| 백엔드 | 512MiB | Spring Boot 실행과 운영 DB 연결 |
| 개발 DB 프록시 | 32MiB | SSH 터널로 들어온 DB 연결 전달 |

호스트와 PostgreSQL 인스턴스를 공유하므로 CPU·디스크·DB 장애까지 독립적인 것은 아니다. 이번에 분리한 것은 실행 구성, 네트워크 참여 범위, DB와 계정 권한이다.

## DB 이름뿐 아니라 실행·마이그레이션 권한도 나눴다

기존 PostgreSQL 인스턴스를 재활용하되 개발 DB와 운영 DB를 각각 생성했다. 각 환경에는 다음 세 역할을 두었다. 실제 계정명은 공개 글에서 생략했다.

| 역할 | 부여한 범위 |
| --- | --- |
| DB 소유 역할 | 로그인 불가, 해당 DB 소유 |
| 마이그레이션 역할 | 해당 환경의 스키마 소유와 객체 생성 |
| 앱 실행 역할 | 스키마 사용, 테이블 조회·추가·수정·삭제와 시퀀스 사용 |

새 DB의 `PUBLIC` 권한을 제거한 뒤 해당 환경의 로그인 역할에만 접속 권한을 부여했다. 앱 실행 역할에는 스키마 생성, DB 생성, 계정 생성, 슈퍼유저 권한을 주지 않았다.

또한 마이그레이션 역할이 앞으로 생성하는 테이블과 시퀀스에도 앱 실행 역할이 필요한 권한을 받도록 기본 권한을 설정했다. 이 기본 권한은 **누가 객체를 생성하는지**와 연결돼 있으므로, 이후 Flyway를 붙일 때도 해당 마이그레이션 역할을 사용해야 한다.

기존 InvenCore DB의 ACL은 바꾸지 않았다. 기존 DB는 `PUBLIC` 설정에 따라 새 역할에 연결 자체가 허용될 수 있다. 따라서 “기존 DB에는 접속조차 불가능하다”고 표현하지 않았다. 대신 연구소의 네 로그인 역할에 기존 애플리케이션 테이블의 읽기·쓰기 권한이 없음을 별도로 검사했다. 개발·운영 DB 사이의 접속 차단과 기존 서비스 테이블의 접근 제한은 구분해서 검증했다.

[PostgreSQL 권한 문서](https://www.postgresql.org/docs/current/ddl-priv.html)도 DB 접속, 스키마 사용, 객체 권한을 구분해 설명한다. DB 이름을 나눈 것만으로 권한 분리가 끝났다고 볼 수 없었다.

## 추가한 파일과 실제 구현 범위

인프라 작업 시작 시 저장소에는 프론트엔드만 있었다. 이번에는 DB 연결과 상태 확인에 필요한 최소 백엔드 및 배포 기반을 추가했다.

| 파일 | 역할 |
| --- | --- |
| `compose.yml` | 연구소 전용 앱 프로젝트, 네트워크, 자원 상한, healthcheck |
| `frontend/Dockerfile` | 프론트엔드 빌드 후 비루트 nginx 이미지에 정적 파일 제공 |
| `backend/pom.xml` | Java 21, Spring Boot 4.1.2, Web MVC·Actuator·JDBC·PostgreSQL 의존성 |
| `backend/src/main/java/kr/seulgae/techlab/TechLabApplication.java` | Spring Boot 진입점 |
| `backend/src/main/resources/application.yml` | DB 연결 풀, 초기화 제한, 상태 확인 설정 |
| `backend/Dockerfile` | Maven 빌드와 비루트 JRE 실행 이미지 분리 |
| `deploy/nginx.conf` | SPA 경로 처리와 백엔드 health 프록시 |
| `deploy/compose.dev-db.yml` | 개발 DB 접속용 프록시를 별도 Compose 프로젝트로 실행 |
| `deploy/provision-db.sh` | 신규 DB·역할·기본 권한과 비밀번호 파일의 최초 생성 |
| `deploy/verify-db.sh` | 환경 간 권한, 개발 DB의 DDL/DML, 기존 테이블 ACL 검증 |
| `deploy/audit-existing.sh` | 기존 컨테이너와 읽기 가능한 설정 파일의 전후 비교 |
| `deploy/dev-tunnel.ps1` | Windows에서 개발 DB와 신규 웹으로 SSH 터널 연결 |
| `deploy/dev-env.ps1` | 로컬 비밀 파일에서 개발 실행 환경 로드 |
| `deploy/deploy.sh` | 커밋 검증·배포 잠금·빌드·기동·상태 확인과 이미지 복원 로직 |
| `.github/workflows/ci.yml` | 프론트엔드·백엔드 CI와 조건부 배포 작업 |
| `.dockerignore`, `.gitignore`, `.gitattributes` | 빌드 문맥 제외, 비밀 파일 제외와 줄바꿈 규칙 |
| `README.md`, `docs/infrastructure.md` | 구성 개요와 개발·운영 절차 안내 |

글 작성 시 지정된 개발용 작업 폴더는 아직 이전 프론트엔드 커밋 상태였다. 위 인프라 파일은 당시 서버 작업에 사용한 별도 체크아웃의 `c4b8156`에서 확인했다. 글을 맞추기 위해 개발 폴더를 체크아웃하거나 코드를 수정하지는 않았다.

### 백엔드는 DB 연결과 상태 확인까지만 만들었다

다음은 `backend/src/main/resources/application.yml`에서 환경별 접속 값과 인증정보를 제외하고 발췌한 부분이다.

```yaml
    hikari:
      maximum-pool-size: 5
      minimum-idle: 1
      connection-timeout: 5000
  sql:
    init:
      mode: never
```

연결 풀은 최대 5개로 제한했다. 기존 DB 인스턴스를 공유하므로 신규 앱이 연결 수를 불필요하게 늘리지 않도록 한 것이다. SQL 자동 초기화도 끄고, 애플리케이션 기동만으로 스키마 생성이나 데이터 초기화가 실행되지 않게 했다.

다음은 같은 파일의 상태 확인 관련 설정이다.

```yaml
management:
  endpoints:
    web:
      exposure:
        include: health
  endpoint:
    health:
      show-details: never
```

외부 요청 경로에서는 nginx가 상태 확인 요청만 백엔드로 전달한다. 다음 코드는 `deploy/nginx.conf`의 실제 발췌이다.

```nginx
location = /api/health {
    proxy_pass http://backend:8080/actuator/health;
    proxy_connect_timeout 5s;
    proxy_read_timeout 10s;
}
```

연구 기록 저장·조회 API, 인증, 프론트엔드의 실제 기록 연동은 아직 구현하지 않았다. 백엔드가 DB에 연결된 상태와 게임 패널이 DB 기록을 보여 주는 상태는 별개이다.

### 비밀번호는 이미지와 Git 밖에서 전달했다

운영 앱에는 필요한 비밀번호 파일 하나만 Compose secret으로 제공하고, Spring의 config tree로 읽도록 했다. 신규 앱은 비루트 사용자로 실행하며 읽기 전용 파일시스템과 필요한 임시 디렉터리를 사용한다.

파일 기반 [Compose secrets](https://docs.docker.com/compose/how-tos/use-secrets/)는 컨테이너에 파일을 bind mount하는 방식이다. 암호화된 비밀 저장소를 새로 구축한 것은 아니다. 호스트에서는 상위 비밀 디렉터리를 0700으로 제한했고, 운영 앱용 파일은 컨테이너의 비루트 사용자가 읽을 수 있게 파일 권한을 조정했다. 소스 파일과 이미지에 비밀번호를 넣지 않는 것과 호스트 파일 접근을 관리하는 것은 함께 필요한 작업이었다.

## 상태 확인 경로도 실제 응답으로 바로잡았다

처음에는 기존 웹의 `/actuator/health`에서 HTTP 200을 받았다는 이유로 백엔드까지 정상이라고 판단했다. 그러나 기존 프론트엔드는 알 수 없는 경로를 SPA의 `index.html`로 돌려주고 있었다. 이 응답만으로는 백엔드 정상 여부를 증명할 수 없었다.

기존 백엔드에 직접 `/actuator/health`를 요청했을 때는 401이 반환됐다. 컨테이너의 실제 healthcheck 설정을 조사한 뒤, 기존 서비스가 사용하는 `/api/health`에서 JSON `status=UP`을 확인하도록 검증을 수정했다.

새 연구소 앱은 nginx의 `/api/health`를 Spring Actuator로 연결했다. 기존 서비스와 신규 앱이 같은 외부 경로를 사용하더라도 내부 구현까지 같다고 가정하지 않았다.

또한 기존 설정 파일 해시를 수집하는 첫 시도에서는 읽을 수 없는 과거 백업 파일 때문에 실패했다. 비교 대상을 읽기 가능한 파일로 제한하고, 기준값을 임시 파일에 완성한 뒤 옮기도록 수정했다. 따라서 설정 비교 결과는 **접근 가능한 최상위 Compose·환경 파일 범위**의 결과이며 서버의 모든 파일을 감사한 것은 아니다.

## Windows 터널과 IntelliJ 조회를 따로 검증했다

PostgreSQL 포트를 인터넷에 공개하지 않고, Windows의 SSH 로컬 포워딩을 통해 서버의 루프백 프록시에 연결했다. IntelliJ 데이터 소스는 이 로컬 터널을 사용하므로 IDE 내부 SSH 터널을 중복해서 켜지 않았다.

IntelliJ에서 처음 생성된 PostgreSQL 데이터 소스는 기본 포트 5432와 기본 DB를 가리켰다. 이를 실제 개발용 터널과 개발 DB로 수정하고, 개발 앱 실행 계정으로 연결 테스트를 수행했다. 비밀번호는 사용자가 IntelliJ의 비밀번호 입력란에 직접 입력했다.

연결 성공 안내만 확인하고 끝내지 않고, SQL 콘솔에서 다음 읽기 전용 쿼리를 실행했다. 이는 당시 마지막 재연결 검증에서 실행한 실제 SQL이다. 계정명과 접속 대상 주소를 코드에 넣지 않았다.

```sql
SELECT current_database() AS db,
       current_user AS usr,
       current_schema() AS schema,
       current_setting('server_version') AS version,
       has_database_privilege(current_user, 'stlab_prod', 'CONNECT') AS prod_access;
```

| 항목 | IntelliJ에서 확인한 결과 |
| --- | --- |
| 현재 DB | `stlab_dev` |
| 현재 사용자 | 개발 앱 실행 역할과 일치, 실제 이름은 공개 글에서 생략 |
| 현재 스키마 | `lab` |
| PostgreSQL | `18.7` |
| 운영 DB 접속 권한 | `false` |

이와 별도로 Windows의 PostgreSQL 클라이언트에서 같은 개발 자격증명으로 운영 DB에 실제 로그인을 시도했다. 결과는 권한 부족을 뜻하는 SQLSTATE `42501`이었다. 권한 조회 결과와 실제 접속 거부를 모두 확인한 것이다.

### 노출된 개발 비밀번호는 교체하고 다시 연결했다

진행 중 개발 계정의 비밀번호가 대화에 붙여넣어지는 일이 있었다. 값 자체는 이 글에 남기지 않았다. 해당 개발 실행 계정의 비밀번호를 새 무작위 값으로 바꾸고, Windows의 비밀 파일도 갱신했다.

이후 이전 비밀번호의 로그인이 SQLSTATE `28P01`로 거부되는지 확인했고, 새 비밀번호로 개발 DB 조회가 성공하는지 검사했다. IntelliJ에도 새 값을 반영한 뒤 위 SQL을 다시 실행했다. 운영 계정이나 기존 서비스의 인증정보는 바꾸지 않았다.

비밀번호를 Git에서 제외하는 것만으로 모든 노출 경로가 사라지는 것은 아니었다. 복사·붙여넣기 과정에서 인증정보를 어디에 입력하는지 구분해야 하고, 노출됐다면 실제 인증 실패와 재연결까지 확인해야 했다.

## 실제 수행한 검증과 한계를 구분했다

다음은 인프라 구축 및 연결 작업 당시의 실행 기록이다. 글을 작성하면서 서버 명령, 권한 검증, 테스트나 배포를 다시 실행하지 않았다. 글 작성 중에는 관련 코드와 기존 기록만 읽었다.

| 검증 영역 | 수행한 내용과 결과 |
| --- | --- |
| 기존 서비스 | 기존 컨테이너 6개의 ID·시작 시각·재시작 횟수 동일 |
| 기존 설정 | 읽기 가능한 최상위 Compose·환경 파일의 SHA-256 동일 |
| 기존 health | 프론트엔드·백엔드·PostgreSQL·Kafka·Redis healthy, 실제 상태 API UP |
| 신규 앱 | 프론트엔드·백엔드 healthy, 호스트와 Windows 터널에서 HTTP 200 |
| 운영 DB 연결 | 신규 백엔드의 전용 운영 역할 연결을 DB 세션 목록에서 확인 |
| 환경 간 제한 | 개발·운영 역할의 반대 환경 CONNECT 차단, 개발 계정의 운영 DB 로그인 거부 |
| 앱 실행 권한 | 개발 스키마 CREATE 불가, 마이그레이션 역할이 만든 테이블에 DML 가능 |
| 기존 데이터 접근 | 연구소 로그인 역할의 InvenCore 애플리케이션 테이블 권한 없음 |
| IntelliJ | 새 비밀번호 반영 후 SQL 콘솔 조회 성공 |

`deploy/verify-db.sh`의 DDL/DML 검증은 인프라 구축 단계에서 개발 DB의 트랜잭션 안에 임시 테이블을 만들고, 생성·조회·수정·삭제 후 롤백했다. 실제 일반 로그인으로 모든 경우를 시험한 것은 아니며, 관리자 세션에서 역할을 전환해 기본 권한과 DML을 검사한 부분이 포함된다. 환경 간 실제 로그인 거부는 별도 Windows 클라이언트로 확인했다.

IntelliJ 검증 단계에서는 데이터 확인에 읽기 전용 SQL만 사용했다. 보안 후속 조치로 개발 실행 계정의 비밀번호는 변경했지만, 운영 DB나 기존 서비스 데이터에 실험용 DML을 실행하지 않았다.

당시 프로젝트 검증에서 사용한 주요 명령은 다음과 같다. 서버의 실제 접속 명령과 개인 경로는 생략했다.

```bash
# 저장소 루트
bash -n deploy/*.sh
docker compose config --quiet
docker compose -f deploy/compose.dev-db.yml config --quiet
docker compose --parallel 1 build
docker compose up -d --wait --wait-timeout 180
bash deploy/audit-existing.sh check
bash deploy/verify-db.sh
```

프론트엔드에서는 다음 명령을 실행했다.

```bash
# frontend/에서 실행
npm ci
npm test
npm run lint
npm run build
```

기존 프론트엔드 테스트 7개와 린트·빌드는 통과했다. 두 Docker 이미지 빌드도 성공했다. 프론트엔드 테스트는 기존 상호작용 로직 검증이며, 신규 인프라 전체를 검증하는 테스트로 확대 해석하지 않았다.

빌드에는 기존 500kB 초과 JavaScript 청크 경고가 남았다. 로컬 테스트에서는 Node의 TypeScript 변환 기능에 대한 실험적 API 경고도 있었다. 실패는 아니었지만 번들 최적화나 실행기 경고 해소는 이번 범위에 포함하지 않았다.

최초 이미지 빌드와 신규 앱 기동 후 가용 메모리는 약 5.9GiB, 루트 디스크 여유는 약 13GiB였다. 이는 빌드 캐시·이미지·OS 캐시까지 포함된 시점 측정이다. 차이를 신규 컨테이너의 순수 메모리 사용량이나 장기적인 용량 요구량으로 해석하지 않았다.

## 커밋·CI 성공과 자동 배포 완료는 구분했다

인프라 코드는 `c4b8156660034d6471c2946cc1d6df29757ccb34`로 커밋하고 작업 브랜치에 푸시했다. 당시 PR #1을 생성했고, 확인한 시점에는 main에 병합하지 않은 상태였다.

- [인프라 구현 커밋](https://github.com/seulgae/seulgae-tech-lab/commit/c4b8156660034d6471c2946cc1d6df29757ccb34)
- [PR #1](https://github.com/seulgae/seulgae-tech-lab/pull/1)
- [확인한 GitHub Actions 실행](https://github.com/seulgae/seulgae-tech-lab/actions/runs/43682255389)

해당 CI에서 프론트엔드 테스트·린트·빌드, 백엔드 Maven verify, 두 Docker 이미지 빌드가 성공했다. 백엔드에 업무 API 테스트를 새로 작성한 것은 아니므로 Maven verify 성공을 연구 기록 기능 검증이라고 표현하지 않았다.

서버에는 직접 빌드한 이미지를 기동한 뒤 같은 커밋 SHA 태그로 맞췄다. 이는 **서버에 실제 배포한 결과**이지만, GitHub에서 서버까지 자동 배포한 결과는 아니다. 워크플로의 배포 작업은 당시 skipped였고, 전용 Tailscale·SSH 자격증명과 활성화 설정이 남아 있었다.

`deploy/deploy.sh`에는 요청 커밋이 원격 main에 포함되는지 검사하고, 동시 배포를 잠그며, 기동·HTTP 검증 실패 시 이전 성공 이미지로 복원하는 코드가 있다. 다만 이 초기 작업에서 해당 스크립트 전체의 자동 배포 경로나 실패 복원 시나리오를 끝까지 실행해 본 것은 아니다. 초기 서버 기동은 별도 명령으로 수행했다. DB 마이그레이션 롤백 기능도 없다.

기존 Funnel의 443 설정은 유지했다. 신규 웹의 HTTPS 공개는 별도 8443 포트로 설계만 했으며 실제 공개 설정은 적용하지 않았다. [Funnel 문서](https://tailscale.com/docs/features/tailscale-funnel)의 허용 포트 범위 안에서 기존 서비스와 충돌하지 않는 구성을 검토한 단계이다.

## 배운 점과 남은 범위

이번에는 새 기능을 추가하는 것보다 **기존 환경을 건드리지 않았다는 근거를 남기는 일**이 중요했다. 컨테이너가 healthy라는 결과만으로 호스트 접속이 된다고 볼 수 없었고, 웹의 HTTP 200만으로 백엔드 상태를 판단할 수도 없었다. 실제 요청 경로와 응답 본문까지 확인해야 했다.

DB 역시 개발·운영 이름을 나누는 것에서 끝나지 않았다. 연결 권한, 스키마 소유권, 실행 역할의 권한, 앞으로 객체를 생성할 역할까지 나눠야 이후 개발 과정에서도 분리가 유지된다. 터널을 통한 클라이언트 로그인과 IntelliJ의 실제 SQL 조회도 각각의 경계에서 확인했다.

현재 완료한 범위는 기존 서버의 자원 조사, 독립 Compose 실행 환경, 개발·운영 DB와 역할 분리, Windows SSH 터널, IntelliJ 연결 및 운영 DB 접근 제한 검증이다. 기존 InvenCore는 작업 중 중단하거나 재시작하지 않았고, 기존 데이터와 볼륨 구성을 변경하지 않았다. 새 DB 생성에 따라 공유 PostgreSQL 저장소에 쓰기가 발생한 것과 기존 서비스 데이터를 변경한 것은 구분한다.

남은 범위는 인프라 PR 병합, 전용 자격증명을 이용한 자동 배포 활성화와 검증, 신규 HTTPS 공개, 연구 기록 스키마와 Flyway 마이그레이션, 연구 기록 API 및 React 패널 연동이다. 다음 개발은 연결된 개발 DB에서 스키마와 마이그레이션을 설계하는 것부터 시작할 수 있다.
