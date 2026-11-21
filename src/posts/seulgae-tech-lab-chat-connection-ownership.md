---
title: 슬개기술연구소 — 채팅창을 열어도 게임 연결은 다시 만들지 않기
date: 2026-11-16
createdAt: 2026-11-16T02:51:04+09:00
tags: React, Phaser, WebSocket, Spring Boot, Unicode
summary: 채팅의 연결 소유권과 메시지 검증을 분리한 PR #12를 정리했다.
category: seulgae-tech-lab
---

고정 인사만 주고받던 연구소에 채팅을 붙이면 React 상태가 자주 바뀐다. 메시지가 추가될 때마다 게임과 소켓까지 재생성되면 대화가 이동 안정성을 깨뜨릴 수 있다. PR #12의 `86ea0c7`에서는 같은 WebSocket을 사용하면서 UI 갱신과 연결 수명을 분리했다.

## 연결 소유자는 하나, 화면은 구독자로 두기

GameCanvas가 클라이언트를 소유하고 React는 내역, Scene은 말풍선을 구독한다. Scene의 구독 해제와 메시지 상태 갱신이 소켓 재생성으로 이어지지 않게 했다.

도입 당시 `frontend/src/components/GameCanvas.tsx`의 콜백이다.

```ts
      const client = new MultiplayerClient({
        status: info => { setConnection(info); setChatAvailable(client.canChat()) },
        history: setMessages,
        chat: message => setMessages(previous => [...previous, message].slice(-50)),
        chatError: setChatError,
      })
```

입장 기록과 새 메시지를 나눠 과거 기록이 말풍선으로 재생되지 않게 했다. 기록과 중복 확인 자료의 크기도 제한한다.

## 발신자와 시각은 서버가 정하기

클라이언트가 보내는 것은 대화 내용이다. 연결에 대응하는 플레이어에서 발신자 정보를 가져오고 서버가 메시지 ID와 시각을 만든다. 이동과 채팅의 전송 예산도 분리했다. 채팅 거부가 곧 이동 연결 종료가 되지 않도록 오류 메시지를 반환한다.

당시 `backend/src/main/java/kr/seulgae/techlab/multiplayer/lobby/domain/LobbyChat.java`의 내용 검사다.

```java
        if (message.isEmpty()) throw new Rejected("empty");
        if (message.codePointCount(0, message.length()) > 150) throw new Rejected("too_long");
        if (message.codePoints().anyMatch(c -> Character.isISOControl(c) && c != '\n' && c != '\t' || c >= 0xd800 && c <= 0xdfff)) throw new Rejected("invalid");
```

150자를 코드 포인트로 세고 허용하지 않는 제어 문자와 단독 surrogate를 거부한다. 화면은 HTML로 해석하지 않는 일반 텍스트로 표시한다. 최근 50개는 서버 메모리에만 남아 재시작하면 사라진다. DB 채팅 저장 기능으로 소개하면 안 된다.

## 말풍선은 메시지마다 만들지 않기

말풍선은 재사용해 내용과 만료 시각만 갱신한다. 12줄을 넘는 표시는 줄이되 채팅창에는 전체 내용을 남긴다. 도입 커밋의 `frontend/src/game/multiplayer/ChatBubble.ts`에서 페이드를 계산한다.

```ts
    const remaining = this.expiresAt - Date.now()
    this.container.setAlpha(Math.max(0, Math.min(1, remaining / 400)))
    return remaining > 0
```

5초 표시의 마지막 400ms에 사라지며 퇴장·재접속·장면 종료 때 정리한다. 위치는 카메라 안으로 제한한다.

## 입력창과 게임 키보드의 경계

채팅 입력은 키 전파를 막고 포커스 전환 때 게임 키 상태를 초기화한다. Enter 전송과 Shift+Enter 줄바꿈을 나누되 조합 중인 IME 입력은 전송으로 처리하지 않는다. 이후 게시판의 전역 키 가로채기 문제는 별도 수정이 필요했다.

PR과 `docs/chat.md`에는 백엔드 31회 테스트, 프런트 24개 검사, 타입 검사·빌드, 로컬 다중 창의 방송·기록·재접속 확인이 남아 있다. 실제 운영과 모든 OS의 IME 조합은 확인하지 못했다. 현재는 회의실에서만 채팅하는 후속 정책이 적용돼 있으며 운영 검증은 **확인하지 못함**이다.

## 배운 점

메시지 상태와 연결 수명을 분리해야 대화가 이동을 방해하지 않았다.
전송 제한도 이동과 대화의 실패 의미에 맞춰 나눠야 했다.
최근 기록과 지금 발생한 사건은 화면에서도 다른 경로로 다뤄야 했다.
