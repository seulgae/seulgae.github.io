---
title: 슬개 오디세이 02 — 코드와 로그로 부트스트랩 다시 읽기
date: 2026-11-26
createdAt: 2026-11-26T20:36:55+09:00
tags: Seulgae Odyssey, Gradle, Spring Boot, JDBC, MyBatis, React
summary: 슬개 오디세이 초기 코드를 직접 분석하며 Gradle 의존성, Spring Boot 초기화, HTTP 요청, PostgreSQL 연결을 확인하는 학습 순서를 정리했다.
category: seulgae-odyssey
---

슬개 오디세이의 첫 화면에는 ‘연결됨’이라는 표시가 하나 있다. 이 문구가 뜨기까지 어느 코드가 요청을 보내고, 응답을 받으면 어디에서 화면 상태를 바꾸는지 설명해 보고 싶었다. 화면에 표시된 서버 상태와 PostgreSQL의 상태를 각각 어떤 테스트가 확인하는지도 함께 짚어 볼 수 있다.

[첫 글](/blog/seulgae-odyssey-project-bootstrap)에는 개발 환경을 구축하면서 내린 결정과 검증 결과를 정리했다. 이번 글은 그 결과물을 직접 읽고 설명하기 위한 학습 기록이다. **navigator 브랜치의 a30e1fc**를 기준으로 작성된 가이드에서 파일과 검증 근거를 골랐다. 아래 실습은 내가 앞으로 직접 따라갈 순서다. [Phase 01 프로젝트 분석 및 학습 가이드](https://github.com/seulgae/seulgae-odyssey/blob/navigator/docs/phase-01-project-analysis-guide.md)

## 1. Gradle이 무엇을 준비하는지 보기

먼저 `backend/build.gradle`과 Gradle Wrapper 설정을 나란히 본다. Wrapper는 실행할 Gradle 버전을 정하고, Java Toolchain은 프로젝트에서 사용할 Java 버전을 지정한다. 빌드 스크립트에서는 Spring 계열 의존성에 개별 버전을 적지 않고, MyBatis Starter의 버전은 직접 지정했다. PostgreSQL 드라이버는 `runtimeOnly`로 선언돼 있다.

백엔드 디렉터리에서 아래 명령으로 선언과 해석 결과를 비교한다.

```powershell
.\gradlew.bat --version
.\gradlew.bat dependencies --configuration runtimeClasspath
.\gradlew.bat dependencyInsight --dependency postgresql --configuration runtimeClasspath
```

출력에서 Gradle을 실행하는 JVM을 확인하고, Toolchain의 Java 17 설정과 어떤 역할이 다른지 설명해 본다. 의존성 출력에서는 드라이버가 선택된 버전과 그 버전을 선택한 근거를 찾는다. `compileClasspath`에도 같은 드라이버가 있는지 비교하면 `runtimeOnly` 선언의 효과를 직접 확인할 수 있다.

## 2. DataSource를 직접 만들지 않았는데 어디에서 생겼을까

`OdysseyApplication.java`의 `@SpringBootApplication`에서 시작해 공통 `application.yml`과 `application-local.yml`로 이동한다. 로컬 설정은 활성 프로파일과 환경변수에서 접속 정보를 가져온다. 데이터 소스를 사용하려면 JDBC 관련 의존성과 접속 설정을 갖춰야 하며, 어떤 자동 설정이 적용됐는지는 로컬 실행의 조건 평가 보고서에서 찾아볼 수 있다.

학습 가이드의 `dbTest` 실행 로그에는 Hikari의 풀 시작과 JDBC 연결 추가가 기록돼 있다. 설정 파일의 접속 정보가 어떤 객체로 이어지는지 따라가면서 각 요소의 책임을 한 문장으로 정리한다.

| 읽을 대상 | 설명해 볼 내용 |
| --- | --- |
| DataSource | 애플리케이션이 JDBC 연결을 얻는 진입점 |
| HikariCP | 연결을 풀에 보관하고 요청에 대여하는 구성 요소 |
| PostgreSQL JDBC Driver | JDBC URL로 접속할 대상을 식별하고 PostgreSQL과 통신하는 드라이버 |
| SSH 포트 포워딩 | 개발 PC에서 시작한 연결을 암호화된 채널을 통해 서버의 DB 접속 지점으로 전달하는 경로 |

이 단계에서는 ‘풀 시작 성공’ 로그가 보여 주는 사실과 풀 크기의 효과를 구분한다. 가이드에는 연결 성공이 기록돼 있다. 부하가 커질 때 풀이 어떤 동작을 하는지는 추가로 관찰할 주제다.

## 3. 브라우저에서 컨트롤러까지 왕복하기

프런트에서 `BackendStatusCard.jsx`를 열고 `api/health.js`와 `api/client.js`로 넘어간다. 상태 카드가 상대 경로인 `/api/v1/health`로 요청을 보내면 Vite가 받아 Spring Boot에 전달한다. 백엔드에서는 `HealthController.health()`가 응답하고, 프런트는 그 결과를 상태 값으로 바꿔 화면에 표시한다.

```text
상태 카드 → fetch → Vite 프록시 → Spring MVC → HealthController
         ← 연결 상태 표시 ← 응답 판정 ← HTTP 응답
```

가이드에는 백엔드 실행 중 200 응답, 중지 후 프록시 502와 ‘연결 실패’ 표시가 기록돼 있다. 이 실습을 반복할 때는 브라우저 Network 탭에서 요청 URL과 응답 코드를 확인하고, `response.ok`가 실패인 경우 카드가 어떤 상태를 표시하는지 따라간다. 화면을 떠날 때는 `AbortController`가 진행 중인 요청을 어떻게 정리하는지도 읽어 본다.

## 4. 테스트가 보장하는 범위를 읽기

`HealthControllerTest`는 Spring MVC 테스트 범위에서 상태 API의 HTTP 응답과 JSON 값을 확인한다. `DatabaseConnectionTest`는 별도 태스크에서 실제 PostgreSQL에 연결해, 앱 역할의 권한과 JPA·MyBatis가 참조하는 `DataSource`, 양쪽의 읽기 전용 조회를 확인한다.

| 확인하고 싶은 것 | 읽을 근거 |
| --- | --- |
| 상태 API가 기대한 응답을 만드는가 | `HealthControllerTest`의 HTTP 200과 JSON 값 검증 |
| 실제 DB에 의도한 역할로 접속하는가 | `DatabaseConnectionTest`의 접속 사용자·스키마·권한 검증 |
| JPA와 MyBatis가 같은 데이터 소스를 쓰는가 | 두 구성 요소의 `DataSource` 인스턴스 비교와 각각의 조회 결과 |
| 한 업무에서 JPA와 MyBatis의 쓰기가 같이 롤백되는가 | 업무용 엔티티와 매퍼를 추가한 뒤 트랜잭션 롤백을 검증할 학습 과제 |

‘같은 데이터 소스’를 확인한 다음에는 같은 트랜잭션에 참여하기 위해 어떤 연결이 바인딩되는지 공부할 수 있다. 쓰기 검증을 추가하는 시점에는 두 기술로 저장한 뒤 의도적으로 예외가 발생하는 시나리오를 만들고, 트랜잭션이 끝난 뒤 각 변경이 롤백됐는지 확인할 계획이다.

## 책을 닫고 설명해 볼 질문

1. Wrapper가 정하는 Gradle 버전과 Toolchain이 정하는 Java 버전은 어떤 차이가 있는가?
2. 애플리케이션에서 `DataSource`를 직접 등록하지 않아도 Hikari가 만들어지는 근거를 어느 설정과 로그에서 찾을 수 있는가?
3. 화면의 ‘연결됨’이 의미하는 것은 무엇이며, PostgreSQL 접속 상태는 어디에서 확인하는가?
4. 같은 `DataSource` 인스턴스를 확인한 테스트로 설명할 수 있는 범위는 어디까지인가?

각 질문에 답할 때는 **파일 하나와 로그 또는 테스트 하나**를 근거로 붙여 보려고 한다. 내가 읽은 설정이 어느 실행 결과와 연결되는지 설명할 수 있으면, 마이그레이션과 회원·인증을 붙일 때 달라진 경계도 같은 방식으로 추적할 수 있다.
