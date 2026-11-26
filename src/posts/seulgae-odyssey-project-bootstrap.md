---
title: 슬개 오디세이 01 — 첫 화면에서 PostgreSQL까지 연결하기
date: 2026-11-26
createdAt: 2026-11-26T19:53:58+09:00
tags: Seulgae Odyssey, Java, Spring Boot, MyBatis, React, PostgreSQL
summary: Spring Boot와 MyBatis의 버전 호환을 확인하고 React의 API 호출과 홈서버 PostgreSQL 접근을 단계별로 검증한 초기 개발 기록.
category: seulgae-odyssey
---

> Seulgae Odyssey · Seulgae Tech Lab · *Until I find my harbor.*

슬개 오디세이의 첫 작업은 화면에서 백엔드 상태를 확인하고, 백엔드가 기존 홈서버의 PostgreSQL에 연결되는 경로를 만드는 일이었다. 기능을 붙이기 전에 **화면에서 요청이 실패했을 때 어디부터 확인해야 하는지** 기준을 잡고 싶었다. 브라우저의 HTTP 요청과 백엔드의 DB 접속을 따로 검증하면 프록시 설정과 DB 인증 문제를 한꺼번에 의심할 일이 줄어든다.

## 한 저장소에서 프런트엔드와 백엔드를 따로 실행했다

저장소 안에 `frontend/`와 `backend/`를 두었다. 프런트엔드는 React와 Vite, 백엔드는 Java 17과 Spring Boot로 구성하고, 빌드와 실행은 각 디렉터리에서 독립적으로 할 수 있게 했다. 한 변경에서 화면과 API를 함께 수정할 수 있으면서도, 특정 계층의 오류를 조사할 때는 그 계층의 실행과 검증에 집중할 수 있는 구조다.

백엔드는 기능 단위로 패키지를 구성하기로 했다. 이 단계에서 필요한 구현은 상태 확인 API였고, 업무 도메인의 패키지는 코드가 생기는 시점에 추가할 계획이다.

## Initializr 오류를 보고 호환 범위를 다시 확인했다

Spring Initializr에서 Spring Boot 4.1.3과 MyBatis를 함께 선택해 프로젝트 생성을 요청했을 때 호환되지 않는다는 400 응답이 돌아왔다. 작업 당시 Initializr가 제공한 MyBatis 선택 범위는 Boot 4.0 계열이었고, MyBatis Starter 저장소의 요구사항에는 4.1 계열에서 Boot 4.1을 지원한다고 명시돼 있었다. Initializr에서 MyBatis를 빼고 기본 프로젝트를 만든 뒤 Gradle 설정에 **MyBatis Starter 4.1.0**을 추가했다. [MyBatis Spring Boot Starter의 버전별 요구사항](https://github.com/mybatis/spring-boot-starter#requirements)

Spring이 관리하는 라이브러리는 Boot의 의존성 관리에 맡기고 MyBatis Starter의 버전은 직접 지정했다. 이후 기본 빌드와 실제 DB 연결 검증을 통해 이 프로젝트에서 선택한 조합이 초기화되는지 확인했다. 생성 도구의 선택 가능 범위, 라이브러리의 지원 범위, 실제 실행 결과는 각각 다른 근거였다.

Windows에서 실행할 때는 IDE에 설치된 JDK를 터미널이 찾지 못하는 문제도 있었다. 실행 환경에 JDK 경로를 지정해 Gradle Wrapper를 시작했고, Java Toolchain에서 컴파일 대상 버전을 17로 고정했다. **Gradle을 실행할 JVM을 찾는 일과 프로젝트가 사용할 Java 버전을 선언하는 일**을 구분해야 원인을 좁힐 수 있었다.

## 브라우저 요청과 DB 상태를 따로 확인했다

브라우저는 상대 경로인 `/api/v1/health`로 요청한다. 개발 중에는 Vite가 `/api` 요청을 Spring Boot에 전달한다. 브라우저가 Vite와 같은 출처로 요청하기 때문에 이 개발 경로에서는 별도 CORS 설정 없이 API를 확인할 수 있었다. [Vite 개발 서버 프록시 설정](https://vite.dev/config/server-options#server-proxy)

| 확인 경로 | 확인한 대상 |
| --- | --- |
| 브라우저 → Vite → `/api/v1/health` | 프록시를 통과해 백엔드 컨트롤러가 응답하는지 확인 |
| 백엔드 → PostgreSQL | 별도의 DB 테스트로 접속, 권한, JPA·MyBatis 초기화 확인 |
| `/actuator/health` | 실제 데이터 소스를 포함한 애플리케이션 상태 확인 |

홈 화면에는 백엔드 연결 상태와 다시 확인 버튼을 두었다. 작업 기록에는 정상 연결 시 HTTP 200을 받고, 백엔드를 중지했을 때 프록시 요청이 502로 실패하면서 화면이 ‘연결 실패’로 바뀐 결과가 남아 있다. 화면에서 연결됐다고 표시하는 기준은 앞의 HTTP 요청이다. DB의 정상 여부는 별도로 확인한다.

## 기존 PostgreSQL에 개발 DB를 분리했다

홈서버의 PostgreSQL을 재사용하면서 슬개 오디세이 전용 개발 DB와 역할을 만들었다. PostgreSQL 포트는 서버 내부에만 바인딩한 상태에서 SSH 로컬 포트 포워딩으로 접속했다. 소유 역할, 마이그레이션용 역할, 앱 실행 역할을 나누고 앱은 스키마를 생성할 권한 없이 데이터에 접근하도록 구성했다.

로컬 프로파일에서만 접속 환경변수를 읽도록 설정했다. 작업 기록에는 프로파일을 지정하지 않았을 때와 로컬 프로파일에서 접속 환경변수가 없을 때 모두 기동에 실패했다고 남아 있다. Hibernate의 자동 DDL과 Spring Boot의 SQL 초기화도 꺼 두었다. 접속 대상과 스키마 변경은 각각 명시적으로 관리할 수 있게 했다.

권한 설정에서 주의한 점은 **향후 생성하는 객체의 기본 권한은 객체를 생성한 역할을 기준으로 적용된다**는 것이다. 따라서 나중에 마이그레이션을 붙일 때는 접속 역할과 실제 DDL을 실행하는 역할을 구분해야 한다. [PostgreSQL 기본 권한 문서](https://www.postgresql.org/docs/18/sql-alterdefaultprivileges.html)

## 같은 DataSource를 쓰는지 실행 결과로 확인했다

DB 없이 실행하는 `test`에는 상태 확인 컨트롤러 테스트를, 실제 PostgreSQL이 필요한 검증은 `dbTest`에 넣었다. DB 테스트는 JPA와 MyBatis가 같은 `DataSource` 인스턴스를 참조하는지 비교하고, 각 경로에서 읽기 전용 쿼리가 성공하는지 확인했다. 앱 역할에 스키마 생성 권한이 없고 소유 역할의 멤버가 아닌지도 검사했다.

작업 기록상 기본 테스트 1건과 DB 테스트 5건이 통과했고, 프런트엔드는 린트와 빌드가 성공했다. 이 결과로 공통 데이터 소스와 두 접근 경로의 초기화까지 확인했다. 한 업무 트랜잭션 안에서 두 기술의 쓰기가 함께 롤백되는지는 별도의 검증 범위다. JDBC 코드가 JPA 트랜잭션에 참여하려면 같은 데이터 소스 외에도 트랜잭션에 연결된 커넥션을 얻는 방식과 JPA 방언 설정을 확인해야 한다. [Spring JpaTransactionManager 문서](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/orm/jpa/JpaTransactionManager.html)

이번 작업으로 브라우저 요청, 백엔드 기동, DB 연결과 권한을 각각 확인할 수 있게 됐다. 다음 단계에서는 이 연결을 바탕으로 스키마 마이그레이션과 회원·인증을 검토할 예정이다.
