---
title: 홈서버 구축 6 — PostgreSQL 18의 데이터·계정·접속 경로를 분리하기
date: 2026-11-21
createdAt: 2026-11-21T23:23:49+09:00
tags: PostgreSQL, Docker Compose, Volumes, SSH, JDBC, Database
summary: PostgreSQL 18 Compose 예시를 통해 데이터 경로·초기화·역할 권한과 SSH 터널 검증을 구분해 정리했다.
category: linux-ops
---

## 1. 들어가며

[5편](/blog/home-server-docker-engine-compose-install)에서 Docker 실행을 확인했다. 이제 사라지면 안 되는 데이터를 가진 서비스를 올린다. 실제 구축에는 PostgreSQL 18 컨테이너, healthcheck, 개발·운영 DB와 역할 분리, IntelliJ SSH 터널 연결이 있었다. 아래는 운영 설정을 복사하지 않은 **새 실습용 예시**다.

## 2. 구현 목표

컨테이너 재생성과 데이터 보존을 구별하고 앱 계정이 필요한 조회·쓰기만 하도록 만든다. DB 포트를 인터넷에 직접 공개하지 않고 관리 접속과 앱 접속을 분리한다. 컨테이너가 healthy인 것만으로 앱 계정의 권한까지 검증했다고 보지 않는다.

## 3. 사전 지식

PostgreSQL 인스턴스에는 여러 DB가 있고 각 DB 안에는 스키마·테이블이 있다. 역할은 인스턴스에 공유되므로 DB를 나눴다는 사실만으로 권한이 자동 분리되지는 않는다. 연결할 DB를 선택하고 그 안의 객체 권한을 다시 적용해야 한다. [PostgreSQL 스키마 문서](https://www.postgresql.org/docs/18/ddl-schemas.html)를 기준으로 구별했다.

이 시리즈에서 관리자 계정은 초기 설정, 마이그레이션 계정은 구조 변경, 앱 계정은 업무 DML을 맡는다. 관리자 접속 성공은 일상 앱 실행 권한을 검증한 결과가 아니다.

## 4. 현재 환경과 버전 차이

사용한 메이저 버전은 PostgreSQL 18이다. `postgres:18`은 같은 메이저 안에서도 태그 내용이 갱신될 수 있다. 실제 복구용 기록에는 이미지 digest와 DB 버전도 남겨야 한다.

**18 계열 공식 이미지는 기본 데이터 디렉터리가 `/var/lib/postgresql/18/docker`이고 볼륨은 `/var/lib/postgresql`에 연결한다.** 이전 메이저의 `/var/lib/postgresql/data` 예시를 그대로 가져오지 않는다. [공식 이미지 설명](https://hub.docker.com/_/postgres)과 기존 데이터의 실제 mount·PGDATA를 확인한 뒤 결정한다. 이 경로 변경을 메이저 업그레이드 자동화로 오해하지 않는다.

## 5. 구축 과정

### 새 비밀값 파일 준비

아래는 새 실습 디렉터리에서의 Bash 예시다. 기존 파일 덮어쓰기를 막고 결과를 화면에 출력하지 않는다.

```bash
(
  umask 077
  set -C
  mkdir -p secrets
  openssl rand -hex 32 > secrets/postgres_password
)
```

이 파일은 Git과 공개 자료에 넣지 않는다. Compose secret의 일반 파일 연결 자체가 암호화 저장소를 뜻하지 않으므로 호스트 파일 권한도 관리한다.

### Compose로 DB 실행

다음은 `compose.yml` 예시다. 이름과 계정은 모두 실습용이다.

```yaml
name: home-lab-db
services:
  postgres:
    image: postgres:18
    restart: unless-stopped
    environment:
      POSTGRES_USER: example_admin
      POSTGRES_DB: example_dev
      POSTGRES_PASSWORD_FILE: /run/secrets/postgres_password
    secrets: [postgres_password]
    volumes:
      - postgres_data:/var/lib/postgresql
    ports:
      - "127.0.0.1:15432:5432"
    networks: [database]
    healthcheck:
      test: [CMD-SHELL, 'pg_isready -U "$$POSTGRES_USER" -d "$$POSTGRES_DB"']
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 20s
volumes:
  postgres_data: {}
networks:
  database: {}
secrets:
  postgres_password:
    file: ./secrets/postgres_password
```

named volume은 데이터 수명을 컨테이너와 나눈다. bind mount는 직접 지정한 호스트 경로를 연결하는 방식이라 경로·소유권·백업 관리의 책임이 다르다. 위 예시는 named volume이다.

비밀번호를 환경변수 값으로 쓰지 않고 `_FILE`로 전달했다. `POSTGRES_USER`와 `POSTGRES_DB` 등 초기화 변수는 **빈 데이터 디렉터리의 최초 초기화**에 사용된다. 파일이나 값을 바꿨다고 이미 생성된 계정 비밀번호와 DB가 자동 변경되지는 않는다.

```bash
docker compose config --quiet
docker compose up -d --wait
docker compose ps
docker compose logs --tail 100 postgres
docker compose exec postgres psql -U example_admin -d example_dev
```

`config --quiet`는 해석된 전체 설정을 출력하지 않고 검사한다. `up`은 상태를 적용하고 healthcheck가 준비될 때까지 기다린다. 내부 psql의 로컬 소켓 접속과 실제 TCP 비밀번호 인증은 검증 범위가 다르다. 실제 입력했던 `docker exec ... psql` 명령은 운영 계정명을 예시로 바꿔 위 형태로 설명했다.

### 목록부터 확인하고 역할 권한 나누기

psql에서는 다음으로 역할·DB·스키마·테이블을 구별한다.

```sql
\du
\l
\dn
\dt app.*
```

아래는 비어 있는 실습 DB에서 관리자만 실행하는 **개발용 권한 예시**다. 운영에는 별도 역할명을 사용하며 기존 DB에 반복 실행하지 않는다.

```sql
CREATE ROLE example_app LOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE;
CREATE ROLE example_migrator LOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE;
\password example_app
\password example_migrator
REVOKE CONNECT ON DATABASE example_dev FROM PUBLIC;
GRANT CONNECT ON DATABASE example_dev TO example_app, example_migrator;
REVOKE CREATE ON SCHEMA public FROM PUBLIC;
CREATE SCHEMA app AUTHORIZATION example_migrator;
GRANT USAGE ON SCHEMA app TO example_app;
ALTER DEFAULT PRIVILEGES FOR ROLE example_migrator IN SCHEMA app
  GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO example_app;
ALTER DEFAULT PRIVILEGES FOR ROLE example_migrator IN SCHEMA app
  GRANT USAGE, SELECT ON SEQUENCES TO example_app;
```

`\password`로 대화형 입력해 비밀번호를 SQL 리터럴로 남기지 않는다. 기본 권한은 앞으로 **해당 생성 역할이 만드는 객체**에 적용된다. 기존 테이블은 별도 GRANT가 필요하고 다른 역할이 만드는 테이블에는 그대로 적용되지 않는다. [객체 권한](https://www.postgresql.org/docs/18/ddl-priv.html)과 [ALTER DEFAULT PRIVILEGES](https://www.postgresql.org/docs/18/sql-alterdefaultprivileges.html)를 함께 확인한다.

이 예시는 모든 운영 권한을 완성하는 스크립트가 아니다. 운영·개발 역할 분리와 추가 DB의 PUBLIC 권한, 기본 EXECUTE 권한 등은 접근 정책에 맞게 검토한다. 개발 DB만 분리하고 슈퍼유저로 양쪽을 조회하면 분리 목적이 약해진다.

### SSH 터널로 IntelliJ 연결

Windows에서 실행하는 **공개용 주소의 예시**다.

```powershell
ssh -N -o ExitOnForwardFailure=yes -L 127.0.0.1:25432:127.0.0.1:15432 example_operator@10.77.0.10
```

`-N`은 원격 명령 없이 포워딩을 유지한다. 앞의 `127.0.0.1:25432`는 개발 PC의 리스너, 뒤는 SSH 서버가 보는 DB 게시 포트다. 터널이 열려도 원격 DB가 실제로 응답하는지는 별도 확인한다. [OpenSSH 포워딩 옵션](https://man.openbsd.org/ssh)을 기준으로 작성했다.

IntelliJ는 Host `127.0.0.1`, Port `25432`, Database `example_dev`, User `example_app`로 접속한다. 비밀번호는 저장한 비밀값 관리 경로에서 입력한다. 외부 터널을 쓰면 IDE 내부 SSH 터널을 중복으로 켜지 않는다.

JDBC URL 예시는 `jdbc:postgresql://127.0.0.1:25432/example_dev?currentSchema=app`이다. 호스트·포트·DB·기본 검색 스키마를 지정한다. Docker 안의 앱은 같은 네트워크의 서비스 이름 `postgres:5432`를 사용한다. 컨테이너 안의 localhost를 DB 컨테이너로 착각하지 않는다.

## 6. 트러블슈팅

기존 기록에는 접속은 되는데 테이블이 없었던 사례가 있다. 새 서버의 개발 DB가 비어 있었고 찾던 자료는 운영 DB에 있었다. 인증 실패와 객체 부재를 같은 문제로 처리할 수 없었다. 이후 개발 전용 계정·스키마와 마이그레이션을 따로 준비했다.

| 증상 | 확인 대상 |
| --- | --- |
| 비밀번호 변경 후 그대로 실패 | 기존 데이터 초기화 여부와 실제 역할 비밀번호 |
| healthy지만 앱 쿼리 실패 | TCP 인증·선택 DB·스키마·객체 권한 |
| relation does not exist | 연결 DB, `search_path`, 마이그레이션·실제 객체 |
| 권한 거부 | CONNECT·USAGE·테이블/시퀀스 권한과 생성 역할 |

`pg_isready`는 서버의 접속 수용 상태를 검사하며 로그인 계정이 업무 쿼리를 수행할 수 있다는 보장은 아니다. [공식 pg_isready 문서](https://www.postgresql.org/docs/18/app-pg-isready.html)와 구분해 검증한다.

## 7. 기술적 이해

컨테이너를 재생성해도 named volume이 남으면 데이터 수명은 유지될 수 있다. 하지만 볼륨 자체 삭제·디스크 장애·메이저 버전 비호환은 별개다. 볼륨이 있다는 사실은 백업이 있다는 뜻이 아니다. 복원 시험은 8편에서 다룬다.

## 8. 최종 검증

- [ ] 실제 mount와 PGDATA가 같은 데이터를 가리킨다.
- [ ] DB 컨테이너의 상태와 TCP 로그인·쿼리를 따로 확인한다.
- [ ] 앱 계정은 필요한 DML을 수행하고 스키마 변경은 거부된다.
- [ ] 개발 역할로 운영 데이터에 접근할 수 없는지 검증한다.
- [ ] 루프백 게시와 외부 비노출을 확인한다.
- [ ] 재생성·백업 복원을 비운영 환경에서 시험한다.

이번 예시는 실제 운영 DB에 적용하지 않았다. 현재 권한과 데이터 복원 결과는 **확인하지 못함**이다.

## 9. 회고

DB 연결 성공은 DB·스키마·권한·저장 수명 중 한 부분만 확인한다. 계정 하나로 모든 일을 할 수 있게 만드는 것보다 각 작업이 가능한 이유와 불가능한 이유를 설명하는 편이 운영에 도움이 됐다.

## 10. 다음 편

[7편](/blog/home-server-java17-spring-boot-docker-build)에서는 InvenCore의 실제 Gradle·Dockerfile을 읽으며 Java 17 앱을 이미지로 만들고 DB 연결과 실행 로그를 확인한다.

---

[전체 목차](/blog/home-server-architecture-hyper-v-ubuntu-docker) · [이전 글](/blog/home-server-docker-engine-compose-install) · [다음 글](/blog/home-server-java17-spring-boot-docker-build)

