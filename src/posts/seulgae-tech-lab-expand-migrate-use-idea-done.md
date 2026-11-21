---
title: 슬개기술연구소 — 완료 체크보다 먼저 배포한 스키마 확장
date: 2026-11-17
createdAt: 2026-11-17T13:01:35+09:00
tags: Flyway, PostgreSQL, React, CI/CD, Python
summary: 스키마 확장과 사용 코드를 분리하고 아이디어 완료 체크에 낙관적 갱신을 적용한 커밋을 코드와 작업 문서로 정리했다.
category: seulgae-tech-lab
---

아이디어 일지에 완료 체크 하나를 붙이는 일에도 배포 순서 문제가 있었다. main 병합이 자동 배포로 이어지는데 새 열을 쓰는 앱과 마이그레이션을 한 번에 올리면 앱이 먼저 실행될 수 있었다. 앞선 V3 배포는 실제로 DB 호환 범위 검사에서 멈췄다.

로그 13·14번은 PR #35의 확장 `6ad2015`와 PR #36의 사용 `f4e92dd`로 이 문제를 나눈 기록이다. 마지막 기능 커밋 시각을 이 글에 사용했다.

## 옛 앱도 견디는 스키마를 먼저 만들기

`backend/src/main/resources/db/migration/V4__research_record_done.sql`의 변경은 작다.

```sql
ALTER TABLE lab.research_records ADD COLUMN done boolean NOT NULL DEFAULT false;
```

확장 PR의 앱은 이 열을 아직 읽지 않는다. 릴리스의 호환 범위만 V3~V4로 넓혀 V3에서도 배포되게 한다. 그 상태에서 V4 마이그레이션을 실행하고, 마지막으로 V4를 요구하는 완료 체크 코드를 배포한다. 확장 → 마이그레이션 → 사용이 각각 독립적으로 성립하도록 만든 것이다.

상수 기본값으로 기존 행의 의미를 정했지만 잠금이 전혀 없다는 뜻은 아니다. 이번 기록에는 대용량 운영 테이블의 잠금 시간을 측정한 자료가 없으므로 무중단 성과로 단정하지 않았다.

## 새 릴리스뿐 아니라 실행 중인 앱도 확인하기

현재 `deploy/migrate-prod.py`는 릴리스와 실행 중인 버전이 모두 목표 스키마를 지원하는지 검사한다.

```python
    if not release['db_schema']['min'] <= LATEST_SCHEMA <= release['db_schema']['max']:
        raise ops.OpsError(f'Release does not declare schema V{LATEST_SCHEMA}')
    if running and not running['db_schema']['min'] <= LATEST_SCHEMA <= running['db_schema']['max']:
        raise ops.OpsError(f'Running release does not support schema V{LATEST_SCHEMA}; deploy the expand release first')
    return LATEST_SCHEMA
```

현재 목표 버전은 후속 마이그레이션으로 올라갔지만 범위를 검사하는 원칙은 같다. 새 코드가 준비됐다는 사실만으로 살아 있는 옛 앱을 깨뜨려서는 안 된다. 앱 롤백과 DB 구조 복원도 같은 동작으로 묶지 않는다.

## 공유 상태에는 별도의 권한 모델이 있었다

완료 표시는 작성자만 수정하는 본문과 달리 누구나 체크·해제하는 공동 할 일 상태로 정했다. 로그인과 수정 키를 요구하지 않고 쓰기 빈도 제한을 적용한다. 저장소는 done 열만 갱신해 본문과 수정 시각은 건드리지 않는다.

화면은 먼저 바뀌고 실패하면 되돌린다. `frontend/src/features/research/components/ResearchPanel.tsx`의 처리다.

```ts
    apply(done)
    try { await setIdeaDone(id, done) }
    catch (cause) {
      apply(!done)
      setActionError(cause instanceof BoardError && cause.status === 429 ? cause.message : '완료 표시를 바꾸지 못했어요. 잠시 후 다시 시도해 주세요.')
    }
```

이 낙관적 갱신은 응답을 기다리는 체감을 줄이지만 여러 사용자의 동시 변경을 합의하는 별도 버전 제어는 아니다. 그 수준의 충돌 처리가 검증됐다고 확대하지 않았다. 체크박스는 네이티브 입력을 사용하고 모양만 CSS로 바꿔 키보드 조작 의미를 남겼다.

기록에는 잘못된 요청의 400, 없는 글의 404, 체크·해제와 클라이언트 요청 검증이 남아 있다. 당시 실제 브라우저 화면은 확인하지 않았고 이번에도 운영 마이그레이션은 실행하지 않았다. 운영 결과는 **확인하지 못함**이다.

## 배운 점

스키마 변경의 크기보다 배포 순서와 호환 범위가 중요했다.
마이그레이션은 지금 실행 중인 앱이 견딜 수 있는지도 확인해야 했다.
공유 완료 상태와 글 소유권은 다른 정책으로 다뤄야 했다.
