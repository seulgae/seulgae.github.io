---
title: 슬개기술연구소 — 네 사무실을 하나의 업무 흐름과 작은 오락실로 채우기
date: 2026-11-17
createdAt: 2026-11-17T18:45:48+09:00
tags: Spring Boot, PostgreSQL, React, Phaser, Workflow
summary: 개인 사무실 골격에 공통코드 기반 업무 흐름과 순수 규칙의 벽돌 부수기를 연결한 커밋을 코드와 작업 문서로 정리했다.
category: seulgae-tech-lab
---

방 네 개를 추가한 뒤 같은 컴퓨터만 반복해서 놓으면 공간은 넓어져도 할 일은 늘지 않는다. 로그 18·20·21번은 PR #40의 사무실 골격, #42의 V5 확장, #43의 업무 게시판과 오락실 구현으로 이어진다. 마지막 기능 커밋 `e4b2fcc`의 시각을 기준으로 정리했다.

## 공간의 차이를 데이터 흐름으로 만들기

1번은 QA 등록, 2번은 유지보수, 4번은 운영 점검을 담당한다. QA 티켓을 부모로 두고 조치·점검 기록을 자식으로 연결했다. 게시판 복제 대신 한 업무의 이력을 카테고리로 나누는 모델이다.

현재 `backend/src/main/java/kr/seulgae/techlab/office/work/WorkItemService.java`는 각 단계가 받을 상태를 정의한다.

```java
    static final Map<String, Set<String>> INBOX = Map.of(
        QA, Set.of(),
        MAINTENANCE, Set.of(REGISTERED, IN_PROGRESS, REJECTED),
        OPERATION, Set.of(RESOLVED));
```

등록·조치 중·반려 티켓은 유지보수에, 조치 완료 티켓은 운영에 보인다. 화면에서 숨기는 데 그치지 않고 서비스가 전이 가능 여부를 검사한다. 차례가 아닌 요청에는 409를 반환한다. 현재 코드에서 상태 변경을 모은 지점은 확인되지만 Kafka 이벤트 발행은 이 작업의 구현 범위가 아니다.

## 공통코드는 DB에서도 그룹을 구분해야 한다

카테고리와 상태를 같은 공통코드 테이블에 저장하면 다른 그룹의 코드가 섞일 수 있다. `backend/src/main/resources/db/migration/V5__common_codes_work_items_inventory.sql`의 제약 일부다.

```sql
    FOREIGN KEY (category_group, category) REFERENCES lab.common_codes (code_group, code),
    FOREIGN KEY (status_group, status) REFERENCES lab.common_codes (code_group, code),
    -- QA 티켓만 부모가 없고, 유지보수·운영 기록은 반드시 티켓에 연결된다.
    CHECK ((category = 'QA') = (parent_id IS NULL))
```

앞부분의 CHECK는 그룹 열을 각각 고정한다. 코드값뿐 아니라 그룹과 값의 쌍을 참조해 잘못된 분류를 막는다. V5 테이블은 기능보다 먼저 확장 배포했다. 업무 기록과 티켓 상태 갱신에는 트랜잭션을 적용했다.

## 오락실은 게임 규칙과 그리기를 나누기

3번 공간은 벽돌 부수기로 채웠다. React 모달 안의 Canvas는 입력과 그리기를 맡고 규칙은 순수 TypeScript로 분리했다. `frontend/src/features/arcade/breakout.ts`에서 한 프레임을 시작하는 부분이다.

```ts
  const dt = Math.min(Math.max(seconds, 0), 0.05)
  const events: BreakoutEvent[] = []
  const s: Breakout = { ...state, ball: { ...state.ball }, bricks: state.bricks }
```

탭을 옮겼다가 돌아온 긴 프레임이 공을 크게 튀게 하지 않도록 시간을 제한한다. 규칙은 새 상태와 사건 목록을 반환하고 화면은 그 결과로 소리와 표시를 갱신한다. 최고 점수는 브라우저 기록이며 공유 랭킹은 아니다. 모달 종료 시 프레임 예약과 입력 리스너도 정리한다.

## 요청 도구의 오류를 앱 오류와 구별하기

당시 Windows에서 한글 JSON을 curl 인자로 보냈다가 400이 발생했다. UTF-8 파일을 본문으로 전송해 확인한 결과 요청 도구의 인코딩 문제였다. 기록에는 QA 등록부터 조치 전 승인 거부, 조치 완료, 최종 승인까지 API로 확인했다고 남아 있다.

백엔드와 프런트 테스트·타입 검사·빌드 통과도 기록돼 있다. 다만 게시판과 오락실 화면은 당시 브라우저에서 확인하지 않았고 이번에도 운영 결과는 **확인하지 못함**이다.

## 배운 점

공간의 역할은 다른 색상뿐 아니라 다른 업무 단계로도 표현할 수 있었다.
공통코드의 유효성은 그룹까지 포함해 DB에서 보장해야 했다.
미니게임의 규칙과 렌더링을 분리하면 입력·시간 경계를 검증하기 쉬웠다.
