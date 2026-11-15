---
title: DB 저장부터 게임 패널까지 연결 검증하기 — 개발 데이터와 CI를 분리하다
date: 2026-11-15
createdAt: 2026-11-15T15:34:02+09:00
tags: PostgreSQL, GitHub Actions, Integration Test, Spring Boot, React
summary: 개발환경의 실제 저장·조회·게임 패널 흐름과 임시 PostgreSQL 기반 CI 통합 검증을 나누고, 검증 데이터를 정리한 기록.
category: seulgae-tech-lab
---

스키마, API, React 화면을 각각 확인해도 전체 경로가 연결됐다고 단정할 수는 없었다. 마지막 챕터에서는 **개발 DB의 저장 결과가 실제 게임 패널에 나타나는지** 확인하고, 같은 종류의 API 검증을 개발 데이터와 분리된 CI에서도 실행하도록 했다.

## 실제 개발환경에서는 한 건의 기록으로 연결을 확인했다

개발용 저장 API로 제목·요약·한글 본문이 있는 기록 한 건을 만들었다. 생성 응답 201과 반환된 ID를 확인하고, 상세 API의 본문과 목록 API의 ID가 저장 결과와 일치하는지 검사했다.

브라우저에서는 캐릭터를 컴퓨터 근처로 이동시키고 E를 눌렀다. 연구 기록 패널에 DB의 제목과 요약이 표시됐고, 제목 선택 후 본문까지 확인했다. 브라우저 DOM 결과와 화면으로 확인한 흐름이며, fetch 대체 테스트의 성공만으로 화면을 확인했다고 적은 것은 아니다.

| 경계 | 확인한 결과 |
| --- | --- |
| 앱 실행 역할 → 개발 DB | 저장 및 조회 성공 |
| 브라우저 → Vite 프록시 → API | 목록과 상세 응답이 패널에 반영 |
| 로컬 API 중단 | 오류 안내와 재시도 버튼 표시 |
| 로컬 API 복구 | 재시도 후 목록 복원 |
| 이번 검증 기록만 삭제 후 재개방 | 빈 목록 안내 |

의도적인 API 중단은 내가 시작한 로컬 Java 프로세스만 대상으로 했다. 서버의 기존 서비스나 운영 DB를 장애 실험에 사용하지 않았다.

검증을 마친 기록은 반환된 UUID와 지정했던 제목을 모두 조건으로 삭제했고, 삭제 건수가 1인지 확인했다. 이후 목록 응답은 빈 items와 `hasMore=false`였다. 테이블 전체를 비우거나 기존 기록을 임의로 지운 작업은 아니다.

## CI에는 별도의 임시 PostgreSQL을 추가했다

실제 개발 DB를 GitHub Actions에 연결하면 반복 실행이 개발 데이터에 영향을 줄 수 있다. 따라서 `.github/workflows/ci.yml`의 backend 작업에 임시 PostgreSQL 18 서비스를 추가했다. CI용 역할과 스키마는 `backend/src/test/resources/bootstrap-ci.sql`에서 준비한다.

부트스트랩 파일의 값은 버려지는 CI 서비스용 테스트 자격증명이며 운영·개발 서버의 인증정보를 사용하지 않는다. 실제 인증정보와 환경변수 값은 이 글에서 생략했다.

CI 순서는 다음과 같다.

```text
임시 PostgreSQL 준비
  → 테스트 전용 역할·스키마 구성
  → Flyway migrate 및 validate
  → Maven verify
  → 실행 역할로 백엔드 기동
  → 실제 HTTP API 검증
  → 이미지 빌드
```

`backend/tests/research-api.mjs`는 검증 데이터를 생성하는 스크립트이다. 버릴 수 있는 테스트 DB라는 명시적 설정이 없으면 실행을 거부하고, 대상 API도 로컬 호스트로 제한한다. 개발·운영 데이터용 실행 도구로 사용하지 않도록 `docs/research-records.md`에 기록했다. 테스트로 만든 데이터는 CI의 임시 DB 안에만 남고 서비스 종료와 함께 폐기되는 구성이다.

## 통합 검증에서는 페이지 경계도 확인했다

CI 스크립트는 처음 빈 목록을 확인하고 기록 세 건을 생성한다. 각 저장 응답의 상태·Location과 상세 본문을 검사한 뒤 두 건씩 조회한다. 첫 페이지의 `hasMore=true`, 다음 페이지 한 건의 `hasMore=false`, 두 페이지에 중복 ID가 없는지를 확인한다.

다음은 `backend/tests/research-api.mjs`의 실제 발췌이다.

```javascript
const page = await (await fetch(`${route}?limit=2`)).json()
assert.equal(page.items.length, 2)
assert.equal(page.hasMore, true)
assert.equal('content' in page.items[0], false)
const second = await (await fetch(`${route}?limit=2&offset=2`)).json()
assert.equal(second.items.length, 1)
assert.equal(second.hasMore, false)
assert.equal(new Set([...page.items, ...second.items].map((item) => item.id)).size, 3)
```

추가로 잘못된 limit·offset, UUID 형식, 공백 저장 입력은 400, 없는 UUID는 404인지 확인한다. 이 스크립트는 API와 실제 PostgreSQL을 포함하지만 React나 Phaser를 실행하지는 않는다. 화면 검증과 CI 통합 검증의 범위를 혼동하지 않았다.

GitHub의 실제 실행에서 Flyway migrate·validate, Maven verify, 임시 PostgreSQL을 사용하는 HTTP 검증 단계가 성공한 것을 확인했다. 프론트엔드 작업과 두 Docker 이미지 빌드도 성공해 최종 CI가 통과했다. 배포 작업은 비활성 상태로 skipped였으며, CI 성공을 운영 배포 성공으로 표현하지 않았다.

## 기존 서비스에 대한 확인도 유지했다

검증 종료 시 기존 서비스 감사 스크립트를 다시 실행했다. 컨테이너 6개의 ID·시작 시각·재시작 횟수와 읽기 가능한 설정 파일 해시는 기존 기준값과 같았고, 실제 InvenCore 상태 API도 UP이었다.

새 스키마는 개발 DB에만 적용했다. 운영 DB에는 V1을 적용하지 않았으며 기존 서비스 데이터와 볼륨 구성을 바꾸지 않았다. 개발 DB 변경은 공유 PostgreSQL 저장소를 사용하므로 물리적인 디스크 쓰기가 없었다는 의미는 아니다.

## 커밋과 완료 범위

프로젝트 변경은 `53c72dc91520df1a232ec6c1e45f2dea34d947d0`으로 커밋하고 작업 브랜치에 푸시했다. 다음 PR은 코드 검토와 운영 적용 준비를 위한 결과물이다.

- [연구 기록 구현 커밋](https://github.com/seulgae/seulgae-tech-lab/commit/53c72dc91520df1a232ec6c1e45f2dea34d947d0)
- [PR #2](https://github.com/seulgae/seulgae-tech-lab/pull/2)
- [CI 실행](https://github.com/seulgae/seulgae-tech-lab/actions/runs/43685857735)

이번에는 연구 기록 스키마·Flyway, 저장·조회 API, React 목록·상세 연결, 실제 개발환경과 임시 DB의 통합 검증까지 진행했다. 챕터별 블로그 글은 저장만 했으며 커밋·푸시·공개 배포하지 않았다.

PR #2의 main 병합, 운영 마이그레이션과 서버 배포, 전용 자격증명을 사용하는 자동 배포 활성화, 신규 HTTPS 공개는 남아 있다. 저장 API는 인증 구현 전까지 공개 환경에서 활성화하지 않는다. 편집·삭제·검색·관리 화면과 인증도 이번 범위 밖이다.

이 글은 완료한 검사와 기록을 바탕으로 작성했다. 대량 데이터 성능, 동시 쓰기 부하, DB 장애 복구나 이전 이미지로의 배포 복원까지 검증했다고 확대하지 않았다. 다음 운영 적용에서는 코드 병합과 DB 마이그레이션 순서, 백업과 실패 시 대응을 별도 챕터로 다뤄야 한다.
