---
title: 슬개기술연구소 — 카카오 로그인과 배포 설정을 같은 기능으로 다루기
date: 2026-11-17
createdAt: 2026-11-17T09:01:54+09:00
tags: Spring Boot, OAuth 2.0, PostgreSQL, Docker Compose, React
summary: 서명 쿠키와 기존 수정 키를 함께 지원하고 개발 DB·운영 로그인 설정을 연결한 커밋을 코드와 작업 문서로 정리했다.
category: seulgae-tech-lab
---

로그인 없이 수정 키로 글을 관리하던 연구소에 카카오 로그인을 붙였다. 기존 글을 잃지 않으면서 새 글에는 작성자를 연결해야 했다. 로그 7·8번은 PR #28의 로그인 구현, #29의 개발 DB 준비, #30의 운영 설정으로 이어진다. 마지막 기능 커밋 `8e4224a`의 시각을 이 글에 사용했다.

## 인증을 추가해도 이전 글은 고칠 수 있어야 한다

카카오 인가 코드를 토큰으로 교환하고 회원 정보를 조회해, 처음 방문한 사람은 회원을 만들고 닉네임을 확인한다. 글쓰기에는 로그인 상태를 사용하지만 기존 글의 수정 키도 유지했다.

`backend/src/main/java/kr/seulgae/techlab/common/write/Ownership.java`의 판정이다.

```java
    public boolean allows(String token, Optional<UUID> member) {
        return member.isPresent() && member.get().equals(authorId) || EditTokens.matches(token, tokenHash);
    }
```

회원 소유와 수정 키가 공존하므로 기존 데이터 전체를 한꺼번에 새 인증 체계로 바꿀 필요가 없었다. 로그인이 꺼진 환경은 이전 쓰기 방식을 유지한다. 화면에서 버튼만 숨기는 대신 실제 쓰기 API에서도 권한을 판단한다.

## 재시작과 별개로 검증하는 서명 쿠키

서버 메모리의 세션 목록 대신 회원 ID와 만료 시각을 HMAC으로 서명했다. `backend/src/main/java/kr/seulgae/techlab/auth/SessionCookies.java`의 발급 부분이다.

```java
    public String issue(UUID memberId, Instant now) {
        String body = memberId + "." + now.plus(TTL).getEpochSecond();
        return body + "." + sign(body);
    }
```

쿠키는 암호화된 저장소가 아니다. 값의 위변조를 검증하는 구조이며, 재배포 뒤에도 같은 서명 비밀값과 회원 정보가 있어야 유지된다. 로그인 시작 시 state를 쿠키와 대조하고 세션 쿠키에는 HttpOnly·Secure·SameSite 설정을 적용했다. SameSite만으로 모든 인증 보안 문제가 해결된다고 해석하지는 않는다.

React는 authStore를 외부 저장소로 두어 헤더와 패널이 같은 상태를 읽는다. 현재 `frontend/src/features/auth/authStore.ts`의 연결이다.

```ts
export function useAuth() { return useSyncExternalStore(authStore.subscribe, authStore.get, authStore.get) }
```

## 로그인 코드보다 먼저 준비돼야 할 것

개발 DB에 접속은 되는데 테이블이 없었던 이유는 계정 오류만이 아니었다. 새 서버의 개발 DB가 비어 있었고, 찾던 일지는 운영 DB에 있었다. 개발 전용 준비 스크립트를 분리하고 실행 계정과 마이그레이션 계정을 나눴다. 비밀번호 저장 실패와 실행 정책 문제도 기록돼 있지만 공개 글에는 계정명과 파일 위치를 싣지 않았다.

운영에서는 Compose 환경변수와 configtree secret을 연결했다. Spring 속성 이름을 secret의 대상 이름으로 사용해 비밀값을 코드에 넣지 않는다. 배포 점검은 파일 존재·길이와 컨테이너 사용자의 읽기 권한을 검사한다.

V3가 필요한 앱이 DB 마이그레이션보다 먼저 배포돼 호환 범위 검사에서 멈춘 일도 있었다. 기능 구현, 스키마 준비, 비밀값 공급은 서로 다른 완료 조건이었다. 이 경험은 뒤의 확장 우선 배포 방식으로 이어졌다.

회원·소유 확인과 설정 코드를 대조했다. 문서에 남은 운영 설정 과정은 당시 기록이며 이번에 로그인·배포를 다시 실행하지 않았다. 현재 카카오 실제 인증 결과는 **확인하지 못함**이다.

## 배운 점

인증 전환에서는 기존 데이터의 수정 경로도 함께 남겨야 했다.
서명 쿠키의 지속성은 서명 비밀값과 회원 저장소의 지속성에 달려 있었다.
로그인 기능은 코드 외에도 스키마와 배포 설정이 준비돼야 켜졌다.
