---
title: 슬개기술연구소 — HTTPS는 열리는데 WebSocket만 연결되지 않은 이유
date: 2026-11-16
createdAt: 2026-11-16T18:56:58+09:00
tags: WebSocket, Spring Boot, Docker Compose, Security
summary: 서버 이전 뒤 달라진 Origin을 명시적 허용 목록과 실제 핸드셰이크 테스트로 확인한 PR #18을 정리했다.
category: seulgae-tech-lab
---

새 서버의 HTTPS 페이지는 정상인데 로비 WebSocket은 1006으로 끝났다. 이동 입력을 보내기도 전이라 이동 속도나 전송 빈도부터 고칠 상황은 아니었다. PR #18의 `6b44df2`에서는 서버 이전으로 공개 주소가 바뀌었는데 Origin 허용 목록은 이전 주소를 보고 있던 문제를 다뤘다.

## 1006은 원인 이름이 아니다

브라우저의 1006은 정상 종료 프레임을 받지 못했다는 관측이다. TLS·프록시·서버 중 어디에서 거부했는지 그 숫자만으로 확정할 수 없다. 이번에는 기본 허용 목록과 Compose가 실제 전달하는 값을 대조해 핸드셰이크의 Origin을 좁혔다.

운영 주소는 Compose의 환경변수로 명시하고 개발 기본값과 분리했다. 새 HTTPS 주소와 필요한 로컬 터널 두 출처만 허용했다. 이 PR에서 옛 공개 주소는 운영 목록에 남기지 않았고 와일드카드도 사용하지 않았다. 주소 자체는 공개 글에 싣지 않는다.

## 허용 목록의 형식부터 검사하기

도입 당시 `backend/src/main/java/kr/seulgae/techlab/multiplayer/lobby/config/LobbyWebSocketConfig.java`의 설정 처리다.

```java
        origins = Arrays.stream(allowedOrigins.split(",")).map(String::trim).filter(value -> !value.isEmpty()).collect(Collectors.toUnmodifiableSet());
        if (origins.isEmpty() || origins.stream().anyMatch(value -> value.contains("*"))) throw new IllegalArgumentException("Explicit WebSocket origins required");
```

빈 목록이나 와일드카드를 조용히 받아들이지 않는다. 개발·운영마다 값을 다르게 줄 수 있지만 허용 정책의 형태는 동일하다. 설정 파일에 값을 추가한 것과 컨테이너가 그 값을 받은 것도 다른 확인 항목이다. Compose 해석 결과와 배포 사전 점검 fixture를 함께 갱신했다.

## 업그레이드 전에 거부하기

같은 파일의 인터셉터는 Origin이 없거나 정확히 일치하지 않으면 403을 반환한다.

```java
                String origin = request.getHeaders().getOrigin();
                if (origin != null && origins.contains(origin)) return true;
                response.setStatusCode(HttpStatus.FORBIDDEN);
                return false;
```

도메인의 일부 문자열이 포함되는지를 보는 방식이 아니다. 스킴과 포트도 출처의 일부로 검사한다. 비슷한 주소나 다른 포트를 실수로 허용하지 않기 위해서다. 이 검사는 브라우저 출처 제한이며 로그인 권한을 대신하지는 않는다.

## 허용 테스트만 있으면 정책을 검증한 것이 아니다

실제 Tomcat 소켓 테스트는 운영과 같은 목록으로 구성했다. 허용한 출처에서 welcome을 받는지와 함께 이전 주소·외부 주소·누락·null·와일드카드·유사 주소·다른 스킴과 포트가 403인지 검사했다. 테스트 목록에는 실제 운영 정보가 들어가므로 공개 코드 발췌에서는 값 대신 판정 부분만 골랐다.

PR 기록에는 로컬 Maven verify 40개 테스트와 CI의 백엔드·프런트·운영 검증 통과가 남아 있다. 당시 자동 배포 비활성 상태도 읽어 확인했으며 서버에 직접 적용하지 않았다. 이미지와 설정을 업데이트하는 사용자 절차와 운영 WSS 접속 확인은 별도였다.

이번 작성에서도 운영 서버에 접속하지 않았다. 현재 공개 서비스의 연결 결과는 **확인하지 못함**이다. HTTPS 화면이 열리는 사실과 WebSocket 핸드셰이크가 허용되는 사실을 분리해서 기록했다.

## 배운 점

종료 코드만으로 원인을 붙이지 말고 연결이 어느 단계까지 갔는지 확인해야 했다.
서버 이전에서는 URL뿐 아니라 출처 허용 설정도 함께 옮겨야 했다.
허용과 거부를 실제 핸드셰이크로 확인해야 출처 정책의 경계가 드러났다.
