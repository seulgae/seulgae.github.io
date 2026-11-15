---
title: 앱 계정에 DDL을 주지 않고 연구 기록 스키마와 Flyway 구성하기
date: 2026-11-15
createdAt: 2026-11-15T15:23:31+09:00
tags: PostgreSQL, Flyway, Maven, Spring Boot, Database
summary: 연구 기록 테이블과 정렬 인덱스를 V1 마이그레이션으로 만들고, 앱 실행 권한과 Flyway 이력 접근을 분리해 개발 DB에서 검증한 기록.
category: seulgae-tech-lab
---

로컬 Spring Boot와 개발 DB 연결을 확인한 뒤, 임시 연구 기록을 저장할 구조를 만들었다. 이번 챕터의 목표는 **운영 DB를 변경하지 않고 개발 DB에서 반복 가능한 스키마 변경 절차를 갖추는 것**이었다.

## 한 테이블부터 시작했다

첫 버전은 `lab.research_records` 테이블 하나로 구성했다. 계정·태그·수정·삭제 기능은 아직 추가하지 않았다.

| 컬럼 | 설계 |
| --- | --- |
| id | 앱에서 생성하는 UUID, 기본키 |
| title | 공백만 있는 값 금지, 최대 120자 |
| summary | 공백만 있는 값 금지, 최대 500자 |
| content | 공백만 있는 값 금지, 최대 20,000자 |
| created_at | DB에서 부여하는 timestamptz |

시간이 같은 기록도 정렬 순서가 결정되도록 생성 시각과 ID를 함께 사용했다. 다음은 `backend/src/main/resources/db/migration/V1__create_research_records.sql`의 실제 발췌이다.

```sql
CREATE INDEX research_records_created_at_id_idx
    ON lab.research_records (created_at DESC, id DESC);
```

이는 정렬 조건에 맞춘 초기 인덱스이며 대량 데이터에서 실행계획과 성능까지 측정한 결과는 아니다. V1에는 예제 데이터 INSERT를 넣지 않았다.

## 앱 기동과 마이그레이션을 분리했다

기존 앱 실행 역할에는 DDL 권한이 없었다. 이 원칙을 유지하기 위해 Spring Boot 기동 시 Flyway를 자동 실행하지 않고 `backend/pom.xml`에 Maven 플러그인을 구성했다. 버전은 프로젝트의 Spring Boot 의존성 관리에 정의된 Flyway `12.4.0`을 사용했고 PostgreSQL 지원 모듈을 플러그인 의존성으로 추가했다.

다음은 실제 플러그인 설정 중 일부이다. 접속 값과 인증정보 설정은 생략했다.

```xml
<createSchemas>false</createSchemas><cleanDisabled>true</cleanDisabled>
<baselineOnMigrate>false</baselineOnMigrate><validateOnMigrate>true</validateOnMigrate>
```

이미 준비한 스키마만 사용하고 자동 baseline으로 기존 상태를 덮어 이해하지 않도록 했다. 파괴적인 clean도 비활성화했다. 적용된 SQL을 고쳐 이력을 맞추는 대신 앞으로 V2, V3를 추가하는 방식을 운영 안내에 적었다.

`deploy/migrate-dev.ps1`은 `info`, `validate`, `migrate`만 받는다. 개발 전용 대상과 마이그레이션 역할을 선택하고, 실행이 끝나면 호출자의 DB 연결 환경을 복원한다. 비밀번호를 명령 인자나 소스에 쓰지 않고 기존 비밀 파일에서 읽는다. 실제 개인 경로나 역할명은 이 글에서 생략했다.

## Flyway 이력 테이블의 기본 권한을 따로 제거했다

이전 프로비저닝은 마이그레이션 역할이 만드는 테이블에 앱 역할의 DML 권한이 기본 부여되도록 구성했다. 이 규칙은 업무 테이블뿐 아니라 Flyway 이력 테이블에도 영향을 줄 수 있다.

따라서 V1에서 `lab.flyway_schema_history`에 대한 앱 역할의 권한을 제거했다. 마이그레이션을 실행한 역할 이름에서 해당 환경의 앱 역할을 계산하고 식별자를 안전하게 인용해 REVOKE를 실행한다. 마이그레이션 역할이 아닌 경우에는 실패하도록 했다. 업무 테이블에 대한 앱 DML과 이력 관리 권한을 같은 것으로 취급하지 않은 것이다.

## 실제 개발 DB에서 검증했다

기존 SSH 터널과 Java 21, Maven을 사용해 다음 명령을 실행했다.

```powershell
.\deploy\migrate-dev.ps1 info
.\deploy\migrate-dev.ps1 migrate
.\deploy\migrate-dev.ps1 validate
.\deploy\migrate-dev.ps1 migrate
```

첫 info에서 빈 스키마와 Pending V1을 확인했다. migrate는 이력 테이블을 생성하고 V1 하나를 적용했다. validate는 성공했고, 두 번째 migrate는 스키마가 최신이므로 적용할 변경이 없다고 보고했다.

| 권한 조회 | 실제 결과 |
| --- | --- |
| 앱 역할의 연구 기록 테이블 DML | 허용 |
| 앱 역할의 Flyway 이력 DML·조회 | 차단 |
| 앱 역할의 스키마 CREATE | 차단 |
| 앱 역할의 운영 DB CONNECT | 차단 |

이 표는 앱 역할로 접속한 Windows PostgreSQL 클라이언트의 권한 조회 결과이다. 마이그레이션 명령은 개발용 마이그레이션 역할로 수행했다. 운영 DB에는 마이그레이션을 적용하지 않았다.

## 변경 파일과 남은 범위

- `backend/pom.xml`: 명시적으로 실행하는 Flyway Maven 플러그인을 추가했다.
- `backend/src/main/resources/db/migration/V1__create_research_records.sql`: 테이블·인덱스·이력 권한 분리를 정의했다.
- `deploy/migrate-dev.ps1`: 개발 전용 마이그레이션 실행 경로를 만들었다.
- `docs/research-records.md`: 스키마와 적용·검증 절차를 기록했다.

이 글은 해당 챕터의 실제 명령과 결과를 바탕으로 작성했다. DB 분리가 Flyway 이력까지 자동으로 보호해 주는 것은 아니었다. 객체 생성자의 기본 권한이 관리용 테이블에도 적용될 수 있어, 생성 후 실제 역할로 확인해야 했다.

다음은 이 테이블을 사용하는 저장·조회 API이다. 운영 적용 절차, 인증, 데이터 편집과 삭제는 별도 범위로 남겼다. 이 글 저장 시점에는 작업 브랜치에서 다음 챕터를 진행 중이며, 이 변경을 운영 배포한 상태는 아니다.

참고: [Flyway와 Spring Boot DB 초기화](https://docs.spring.io/spring-boot/how-to/data-initialization.html), [Flyway 스키마 설정](https://documentation.red-gate.com/flyway/reference/configuration/environments-namespace/environment-schemas-setting).
