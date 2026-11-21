---
title: 슬개기술연구소 — 관리자실 문보다 중요한 것은 API의 권한 검사였다
date: 2026-11-18
createdAt: 2026-11-18T03:13:06+09:00
tags: Spring Boot, JDBC, PostgreSQL, React, Security
summary: 관리자 전용 SQL 콘솔에 요청별 권한과 실행 제한을 적용하고 검증 한계를 구분한 커밋을 코드와 문서로 정리했다.
category: seulgae-tech-lab
---

PR #51의 `dfbdcac`에서는 관제실을 관리자실과 DB 콘솔로 바꿨다. 방 이동이 로컬 처리인 구조라 문을 막는 것만으로 권한을 보장할 수 없었다.

## 문은 안내이고 권한은 요청마다 확인한다

화면의 관리자 여부는 메뉴와 문을 보여 주기 위한 값이다. API를 호출하는 요청까지 막으려면 서버가 로그인 회원을 다시 확인해야 한다.

현재 `backend/src/main/java/kr/seulgae/techlab/admin/AdminAccess.java`의 검사다.

```java
    public UUID require(HttpServletRequest request) {
        var member = auth.current(request).orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Login required"));
        if (!isAdmin(member.id())) throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Admin only");
        return member.id();
    }
```

테이블 목록과 SQL 실행 모두 이 검사를 거친다. 설정에 등록한 회원인지 판단하고 로그인 없음과 권한 없음을 구분한다. 공개 글에는 관리자 식별값을 포함하지 않았다.

## 자유 SQL에는 일반 조회 API와 다른 계약이 필요하다

콘솔은 앱 DB 계정 권한으로 실행한다. 조회 결과는 최대 200행, 칸당 1,000자까지 반환하고 한 번에 한 문장을 받는다. `SqlConsole.java`는 끝 세미콜론을 정리한 뒤 내부 세미콜론을 거부한다.

이 검사는 SQL 파서가 아니다. 문자열 안의 세미콜론도 거부할 수 있으며, 한 문장도 데이터를 바꿀 수 있다. 화면의 변경 쿼리 확인창은 사용자 실수를 줄이는 보조 장치이지 서버 권한 검사의 대체가 아니다.

같은 파일의 시간 제한과 실행 부분이다.

```java
                try (var timeout = connection.createStatement()) { timeout.execute("SET LOCAL statement_timeout = '" + TIMEOUT + "'"); }
                Result result;
                try (var query = connection.createStatement()) {
                    query.setMaxRows(MAX_ROWS + 1);
                    if (query.execute(statement)) {
```

트랜잭션 안에서 5초 제한을 설정하고 실패하면 롤백한다. 결과 한도를 하나 더 읽어 잘림 여부를 판단한다.

## Statement를 선택한 맥락

임의 SQL을 받는 콘솔에서는 PreparedStatement가 PostgreSQL JSONB의 물음표 연산자를 매개변수로 해석할 수 있어 Statement를 사용했다. 일반 업무 API의 입력값 결합까지 문자열 SQL로 바꾸자는 뜻은 아니다.

기본 조회는 식별자를 인용한다. `frontend/src/features/admin/adminApi.ts`의 생성식이다.

```ts
export const tableQuery = (table: DbTable) => `SELECT * FROM ${quoteIdent(table.schema)}.${quoteIdent(table.name)} LIMIT 100;`
```

실행 SQL 일부와 시간·행 수를 감사 로그로 남긴다. 운영 로그 원문은 공개하지 않았다.

## 가짜 JDBC로 확인한 것과 남은 것

JDBC 대역으로 시간 제한·200행 자르기·실패 롤백을 검사했다는 기록이 있다. 인증 응답의 admin 필드 추가로 계약 테스트가 실패해 기대값도 갱신했다. 백엔드 84개·프런트 119개 테스트, 타입 검사·빌드 통과 기록이 남았다.

당시 실제 관리자실 화면과 PostgreSQL 쿼리는 확인하지 못했다. 이번 작성에서도 운영 DB에 접속하지 않았으며 실제 권한·SQL 실행 결과는 **확인하지 못함**이다.

## 배운 점

프런트의 문과 버튼 제한은 서버의 요청별 권한 검사를 대신하지 못했다.
SQL 콘솔의 실행 제한은 편의 기능의 위험을 줄이지만 완전한 격리는 아니었다.
JDBC 대역 검증과 실제 DB의 권한·문법 검증은 분리해서 보고해야 했다.
