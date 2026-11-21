---
title: 슬개기술연구소 — 한 주소의 새 연결이 기존 연결을 대신하게 만들기
date: 2026-11-17
createdAt: 2026-11-17T12:39:37+09:00
tags: WebSocket, Spring Boot, nginx, TypeScript
summary: 같은 주소의 연결 대체와 재연결 중단, 프록시 주소 신뢰 조건을 정리한 커밋을 코드와 작업 문서로 정리했다.
category: seulgae-tech-lab
---

같은 사람이 창을 여러 개 열면 로비 인원이 계속 늘었다. PR #34의 `6f0217e`에서는 같은 주소의 새 연결을 받으면 기존 연결을 정리하도록 했다. 단순히 ‘한 사람을 찾는 기능’으로 설명하면 부정확하다. 이 정책의 식별 기준은 회원이 아니라 네트워크 주소다.

## 주소를 쓰기 전에 전달 경로를 확인하기

nginx 뒤의 백엔드가 직접 연결 주소만 보면 모든 방문자가 프록시로 보일 수 있다. 반대로 X-Forwarded-For를 무조건 믿으면 방문자가 남의 주소를 적어 연결을 끊게 할 수도 있다.

`backend/src/main/java/kr/seulgae/techlab/common/web/ClientAddress.java`는 다음과 같이 값을 고른다.

```java
    public static String of(String forwardedFor, String remoteAddress) {
        if (forwardedFor != null && !forwardedFor.isBlank()) {
            String first = forwardedFor.split(",")[0].strip();
            if (!first.isEmpty() && first.length() <= 64) return first;
        }
        return String.valueOf(remoteAddress);
    }
```

이 함수 자체가 신뢰할 프록시를 검증하는 것은 아니다. 당시 기록에는 앞단 중계가 전달 헤더를 실제 방문자 주소로 새로 쓰는지 확인했고, 백엔드는 외부에 직접 노출하지 않았다고 남아 있다. 따라서 이 함수의 전제는 배포 경로와 함께 유지해야 한다.

nginx의 WebSocket 경로에도 전달 헤더를 추가했다. API에만 있던 설정을 소켓 경로에도 적용한 것이다. 쓰기 제한과 소켓의 주소 판정은 같은 함수를 사용하도록 모았다.

## 연결 교체는 종료 코드까지 설계해야 한다

서버는 기존 연결을 정원 계산에서 먼저 빼고 새 연결을 입장시킨다. 교체 사유는 일반 네트워크 장애와 다른 4409로 구분한다.

`frontend/src/features/multiplayer/model/protocol.ts`의 계약이다.

```ts
export const REPLACED_CLOSE_CODE = 4409
```

클라이언트가 이 종료를 평소처럼 자동 복구하면 두 창이 서로를 계속 끊는다. 현재 `frontend/src/features/multiplayer/MultiplayerClient.ts`는 교체를 별도 상태로 끝낸다.

```ts
        this.online = false
        this.updateStatus({ phase: 'replaced', online: 0, message: REPLACED_MESSAGE }); return
```

현재 코드는 이후 추가된 회의실 입장 대기 처리도 포함한다. 위 두 줄은 공통적으로 재연결 경로로 넘어가지 않게 하는 부분이다. 일반적인 끊김에서는 복구가 맞지만 의도된 대체에서는 멈추는 것이 맞았다.

## 한 주소와 한 사용자는 다르다

같은 공유기를 사용하는 서로 다른 사람도 하나의 공인 주소로 보일 수 있다. 이 정책은 그 사람들까지 한 연결로 제한한다. 당시에는 받아들인 제약이지만 회원 단위 중복 접속 방지와 같다고 표현할 수 없다. 로컬 다중 창 테스트에서는 기본값을 끄고 운영 설정에서 켠다.

로그에는 실제 소켓으로 기존 연결 대체·인원 수·다른 주소 유지를 확인하고, 클라이언트의 재연결 중단을 테스트했다고 남아 있다. 이번 작성에서 운영의 전달 헤더 신뢰나 공유기 환경은 **확인하지 못함**이다. 이후 멀티플레이 범위가 회의실로 축소된 변화도 당시 전역 로비 정책과 구분해야 한다.

## 배운 점

주소 기반 제한은 코드보다 먼저 프록시의 신뢰 경계를 확인해야 했다.
의도된 연결 종료에는 일반 장애와 다른 복구 정책이 필요했다.
네트워크 주소를 사용자 정체성과 동일하게 취급하면 정책의 부작용을 놓치게 됐다.
