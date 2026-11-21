---
title: 슬개기술연구소 — 고지연 경로에서는 압축과 대기 시간도 게임 설계였다
date: 2026-11-16
createdAt: 2026-11-16T22:04:39+09:00
tags: WebSocket, nginx, Vite, Spring Boot, Network
summary: 정적 파일과 API 지연을 비교하고 압축·캐시·청크 분리와 연결 대기 시간을 조정한 커밋을 코드와 작업 문서로 정리했다.
category: seulgae-tech-lab
---

방 이동 중 연결이 끊기고 첫 화면도 늦게 열렸다. 이동 코드만 의심하기 전에 정적 파일과 API를 같은 경로로 비교했다. PR #23의 `9c113c1`은 이 측정에서 시작한 네트워크 대응이다.

작업 기록에서는 nginx가 직접 주는 파일도 API와 비슷하게 왕복 0.6~1.6초가 걸렸다. TCP 연결은 45ms였지만 TLS는 4.7초, WebSocket의 welcome까지는 3~5초였다. 렌더링은 60fps였으므로 화면 갱신보다 Funnel 중계 경로의 지연을 우선 다뤘다. 이 값은 당시 측정이며 현재 운영 성능을 뜻하지 않는다.

## 보내는 양과 다시 받는 횟수를 줄이기

당시 JavaScript 1.5MB가 압축과 캐시 헤더 없이 전달돼 첫 로드에 16.7초가 기록됐다. 현재 `deploy/nginx.conf`의 압축 설정이다.

```nginx
    gzip on;
    gzip_comp_level 6;
    gzip_min_length 1024;
    gzip_vary on;
    gzip_proxied any;
    gzip_types text/css application/javascript application/json image/svg+xml text/plain;
```

파일 이름에 내용 해시가 붙는 `/assets/`에는 1년 `immutable` 캐시를, 진입 HTML에는 `no-cache`를 적용했다. HTML은 새 배포를 재검증하고, 내용이 같은 에셋은 재사용하는 역할 분담이다. 오래 보관하는 정책은 파일 이름이 내용과 함께 바뀐다는 전제가 있어야 안전하다.

현재 `frontend/vite.config.ts`는 변경 빈도가 낮은 의존성을 나눈다.

```ts
          groups: [
            { name: 'phaser', test: /node_modules[\\/]phaser/ },
            { name: 'react', test: /node_modules[\\/](react|react-dom|scheduler)[\\/]/ },
          ],
```

앱만 수정할 때 Phaser와 React까지 다시 받을 필요를 줄이려는 선택이다. 현재 빌드 도구 문법은 위 코드가 기준이며, 당시 기록의 앱 약 30KB는 그 시점 압축 크기다. 지금 빌드에서도 같다고 단정할 수는 없다.

## 느린 응답을 실패로 판정하지 않기

전송량을 줄여도 왕복 지연이 없어지지는 않는다. 방 응답 제한은 5초에서 15초로, 입력 업로드 대기 허용량은 4KB에서 16KB로 조정했다. 서버의 송신 제한과 대기열에도 여유를 주되 이동 검증 자체는 유지했다.

현재 `frontend/src/features/multiplayer/MultiplayerClient.ts`의 기준이다.

```ts
export const ROOM_RESPONSE_TIMEOUT_MS = 15000
/** 업로드가 잠시 막혀도 바로 끊지 않도록 약 4초 분량의 입력(20Hz)을 허용한다. */
export const INPUT_BACKPRESSURE_BYTES = 16384
```

종료 코드는 사람이 읽을 수 있는 원인으로 바꿔 기록한다. 정상적인 지연, 잘못된 입력, 업로드 적체를 같은 ‘끊김’으로 묶으면 다음 수정도 빗나가기 쉽다. 이후 회의실 전용 멀티플레이로 구조가 바뀐 점은 이 당시의 모든 방 이동 구조와 구분해야 한다.

## 테스트 종료 오류와 실제 장애를 구분하기

반복 테스트에서 보인 4500 종료는 이미 닫히는 소켓에 퇴장 알림을 보내다 실패한 정리 경쟁으로 기록됐다. 이 분석만으로 실제 사용자 연결 종료까지 모두 해결됐다고 말할 수는 없다.

CI에는 프런트 이미지를 띄워 nginx 설정과 gzip·캐시 헤더를 검사하는 절차가 있다. 이번 글에서는 코드와 기록을 대조했으며 운영 재측정과 체감 개선은 **확인하지 못함**이다.

## 배운 점

정적 파일과 API를 비교하면 애플리케이션 밖의 지연을 분리할 수 있었다.
캐시 정책은 파일의 변경 방식과 함께 설계해야 했다.
대기 시간을 늘리는 수정에도 입력 검증과 종료 원인 구분은 남겨야 했다.
