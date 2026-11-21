---
title: 슬개기술연구소 — 개발 시작 경로를 DB 없는 화면 확인과 실제 DB 검증으로 나누기
date: 2026-11-20
createdAt: 2026-11-20T17:06:50+09:00
tags: Spring Boot, PostgreSQL, Maven, Vite, Testing
summary: 복제 이후 개발 경로를 메모리 테스트 앱과 일회용 PostgreSQL로 구분한 PR #52를 실제 구성과 대조했다.
category: seulgae-tech-lab
---

저장소를 복제하는 방법만으로는 새 개발자가 연구소를 실행할 수 없었다. 운영 DB 접속 정보가 없으면 화면조차 못 띄우는 구조도 피하고 싶었다. PR #52의 `40ed3d2`는 README를 개발 시작 가이드로 정리하면서 무엇을 확인할 것인지에 따라 실행 경로를 나눴다.

## 화면 흐름에는 운영 DB가 필요하지 않다

게임 이동과 WebSocket, 패널의 요청·응답은 메모리 저장소로도 확인할 수 있다. 테스트 전용 LocalLobbyTestApplication은 실제 HTTP·소켓을 열되 JDBC 자동 구성을 제외하고 저장소를 대체한다.

당시 `backend/src/test/java/kr/seulgae/techlab/multiplayer/lobby/LocalLobbyTestApplication.java`의 설정 일부다.

```java
@Configuration(proxyBeanMethods = false)
@EnableAutoConfiguration(excludeName = "org.springframework.boot.jdbc.autoconfigure.DataSourceAutoConfiguration")
```

같은 파일은 업무와 인벤토리 저장소를 명시적으로 만든다.

```java
    @Bean
    WorkStore fixtureWorkStore() { return new InMemoryWorkStore(); }

    /** 인벤토리(DB 없는 로컬 실행) */
    @Bean
    InventoryStore fixtureInventoryStore() { return new InMemoryInventoryStore(); }
```

테스트 클래스 경로에서 실행하는 앱이므로 운영 JAR의 진입점과 다르다. HTTP를 실제로 호출했다는 사실과 PostgreSQL에 저장했다는 사실도 다르다. 재시작하면 사라지는 자료로 화면 흐름을 살펴보는 경로다.

## 문서의 기능 목록보다 코드의 대체 범위를 확인하기

메모리 구현이 있다고 모든 회원 기능을 검증할 수 있는 것은 아니다. 카카오 로그인이 꺼진 환경은 비회원 흐름이며 실제 회원 세션과 관리자 SQL 콘솔을 대신하지 않는다. 반면 소스에는 연구 기록·아이디어용 메모리 구현도 있어 ‘DB 없음’을 모든 쓰기 기능이 없다는 뜻으로 해석하면 안 된다.

테스트 앱이 어떤 컨트롤러를 불러오고 어떤 저장소를 대체하는지 함께 읽어야 확인 범위를 정할 수 있다. 이번 글은 README의 안내와 실제 Bean 구성을 대조해 이 구분을 남겼다.

## SQL과 권한은 일회용 DB에서 확인하기

두 번째 경로는 CI와 같은 PostgreSQL을 띄워 역할·스키마를 만들고 Flyway를 적용한 뒤 앱 계정으로 실행하는 방식이다. 메모리 저장소로 확인할 수 없는 SQL·제약·권한·마이그레이션을 이 경로에서 다룬다.

운영 설정을 복사하는 대신 로컬·CI 전용 준비 자료를 사용한다. 마이그레이션과 앱 실행 권한도 분리한다. 공개 글에는 테스트용이라도 계정명이나 비밀번호 예시를 싣지 않았다. 실제 명령은 저장소 README의 실행 환경별 안내가 기준이다.

프런트는 Vite 프록시로 선택한 백엔드에 연결한다. 그래서 화면 코드를 고치지 않고 메모리 앱 또는 실제 DB 앱을 대상으로 바꿀 수 있다. 개발 시작 경로와 운영 Compose 배포를 섞지 않는 것도 중요했다.

## 문서 명령도 실행 위치에 의존한다

PR 검증에서는 루트에서 Maven 의존성 클래스 경로를 만들었을 때 결과가 어느 디렉터리에 생기는지 확인하고 Windows 명령으로 서버를 시작했다. 방명록 200 응답과 인증 상태도 읽었다고 기록돼 있다.

반면 당시 PC에 Docker가 없어 PostgreSQL 경로는 직접 실행하지 못했고 CI의 같은 절차를 옮겼다. 문서에 명령이 있다는 이유로 두 경로 모두 검증됐다고 표현하지 않았다. 이번 작성에서도 새 서버 실행과 DB 연결은 **확인하지 못함**이다.

## 배운 점

개발 시작 문서는 도구 설치보다 검증하려는 범위를 먼저 나눠야 했다.
메모리 대역의 실제 구성과 회원 인증 가능 여부는 서로 다른 조건이었다.
복제·로컬 실행·DB 검증·운영 배포를 다른 진입점으로 안내해야 혼동이 줄었다.
