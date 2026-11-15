---
title: 임시 연구 기록을 실제 API로 교체하기 — 목록·상세와 재시도 연결
date: 2026-11-15
createdAt: 2026-11-15T15:31:29+09:00
tags: React, TypeScript, Phaser, API, AbortController
summary: 게임의 연구 기록 패널을 DB 목록·상세 API에 연결하고 로딩·빈 결과·오류·재시도를 브라우저에서 확인한 기록.
category: seulgae-tech-lab
---

기존 연구 기록 패널은 React에 직접 작성한 임시 내용 한 건을 보여 줬다. 저장·조회 API가 준비됐으므로, 이번에는 게임의 E 입력으로 여는 패널에서 실제 DB 기록을 읽도록 바꿨다.

## 게임 입력 흐름은 유지하고 데이터 부분을 교체했다

Phaser의 근접 판정과 React 패널 열기·닫기 연결은 유지했다. 변경의 중심은 `frontend/src/components/ResearchPanel.tsx`이다. 목록에서 제목을 선택하면 상세 본문을 요청하고, 목록으로 돌아가는 흐름을 추가했다. 저장 폼은 이번에 만들지 않았다.

`frontend/src/researchApi.ts`에는 요약·상세·페이지 응답 타입과 fetch 함수를 분리했다. HTTP 실패나 HTML 응답을 정상 데이터로 처리하지 않게 했으며, 요청에는 JSON 응답을 받겠다는 헤더를 지정한다. 이는 응답 전체의 런타임 스키마 검증을 구현했다는 의미는 아니다.

다음은 실제 상세 조회 함수이다.

```typescript
export function fetchResearchRecord(id: string, signal: AbortSignal) {
  return getJson<ResearchRecord>(`/api/research-records/${encodeURIComponent(id)}`, signal)
}
```

목록은 한 번에 10개를 조회하고 API의 `hasMore`로 다음 버튼을 제어한다. 본문은 선택한 기록에 대해서만 읽는다.

## 개발 프록시로 같은 출처의 경로를 사용했다

브라우저는 상대 경로 `/api/research-records`로 요청한다. `frontend/vite.config.ts`에는 개발용 API 프록시를 추가했고, 기존 `deploy/nginx.conf`에는 운영용 API 프록시가 이미 있었다. 클라이언트에 서버 주소나 DB 자격증명을 넣거나 광범위한 CORS 허용을 추가하지 않았다. 실제 접속 대상 값은 공개 본문에서 생략했다.

## 패널이 닫히면 진행 중인 요청을 취소했다

목록과 상세 요청은 각각 effect에서 `AbortController`를 생성한다. 목록 effect의 실제 핵심 부분이다. 시작 상태를 변경하는 이벤트 처리 부분은 생략했다.

```typescript
const controller = new AbortController()
fetchResearchPage(controller.signal, offset)
  .then((data) => { if (!controller.signal.aborted) setPage(data) })
  .catch(() => { if (!controller.signal.aborted) setError(true) })
  .finally(() => { if (!controller.signal.aborted) setLoading(false) })
return () => controller.abort()
```

패널 해제나 요청 대상 변경 시 취소하고, 취소된 요청의 늦은 응답으로 상태를 덮지 않도록 했다. 상세 본문은 React의 일반 텍스트로 출력한다. 원문 HTML을 DOM에 삽입하는 방식은 사용하지 않았다.

처음에는 effect 안에서 로딩·오류 상태를 즉시 바꾸도록 했는데, 린트에서 연쇄 렌더링 가능성을 경고했다. 로딩 시작은 기록 선택·페이지 이동·재시도 이벤트에서 처리하도록 옮겼고, effect에는 요청과 응답 반영·정리만 남겼다. 수정 후 린트 경고는 없어졌다.

## 실제 브라우저에서 확인한 흐름

API HTTP 검증에서 만든 개발용 기록을 사용했다. 아래는 실제 브라우저 확인 결과이며, 자동 테스트 결과와 구분했다.

| 상황 | 확인한 화면 |
| --- | --- |
| 컴퓨터 접근 후 E 입력 | DB 기록의 제목과 요약 목록 |
| 제목 선택 | 저장한 한글 본문과 생성 시각 |
| 패널 닫기·다시 열기 | 게임 화면 복귀와 새 목록 요청 |
| 내가 실행한 로컬 API만 중단 | 실패 안내와 다시 시도 버튼 |
| 로컬 API 복구 후 다시 시도 | 로딩 표시 후 정상 목록 |
| 검증용 기록만 정리 후 다시 열기 | 아직 등록된 기록이 없다는 안내 |

Vite 기본 포트는 이미 사용 중이어서 개발 서버가 선택한 다른 로컬 포트로 확인했다. 기존 개발 서버를 강제로 종료하지 않았다. API 중단 검사는 서버의 운영 컨테이너가 아닌 내가 실행한 로컬 Java 프로세스만 대상으로 했다.

빈 목록 검증을 위해 이번 작업에서 만든 기록의 UUID와 제목을 함께 조건으로 사용해 그 한 건만 삭제했다. 기존 데이터 전체를 지우거나 운영 DB를 실험에 사용하지 않았다.

화면에 로딩·오류·빈 상태가 보인 것은 확인했지만, 요청 취소의 모든 타이밍 경쟁을 브라우저에서 재현한 것은 아니다. 게임 물리·충돌을 이번에 네 방향 모두 재검증한 것도 아니다. 해당 로직을 수정하지 않았고 기존 입력 흐름 테스트로 회귀 범위를 확인했다.

## 자동 검증과 변경 파일

```bash
# frontend/에서 실행
npm test
npm run lint
npm run build
```

- 기존 상호작용 테스트 7개와 신규 API 클라이언트 테스트 1개, 총 8개가 통과했다.
- 신규 테스트는 fetch를 대체해 목록·상세 URL, AbortSignal 전달, HTTP 오류와 HTML 응답 거부를 확인했다. 실제 브라우저나 DB를 사용하는 테스트는 아니다.
- 최종 린트와 TypeScript·Vite 빌드는 통과했다.
- Node의 TypeScript 변환 기능 경고와 기존 500kB 초과 청크 경고는 남았다. 번들 최적화는 수행하지 않았다.

생성 파일은 `frontend/src/researchApi.ts`와 `frontend/tests/research-api.test.mjs`이다. `ResearchPanel.tsx`, `frontend/vite.config.ts`, `frontend/src/App.css`를 수정했다. 상세 본문의 줄바꿈과 긴 문자열 표시, 기록 간 여백, 페이지 이동 버튼도 함께 정리했다.

이 글은 구현·검증 당시의 결과를 기록했다. 메모리 누수를 측정한 작업은 아니며, 반복 개폐나 캔버스 개수만으로 누수가 없다고 판단하지 않았다. 현재 연결은 개발 환경에서 확인한 상태이고 운영 DB 마이그레이션과 서버 배포는 아직 수행하지 않았다.
