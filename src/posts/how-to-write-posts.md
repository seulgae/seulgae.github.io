---
title: 이 블로그에 글 쓰는 방법
date: 2026-08-11
tags: Guide
summary: DB 없이 마크다운 파일로 운영되는 이 블로그의 글 작성·수정·배포 방법 정리
category: dev-notes
---

이 블로그는 별도의 서버나 DB 없이 동작합니다. 글 하나가 마크다운 파일 하나이고,
빌드할 때 Vite가 `src/posts/` 폴더를 읽어 목록과 상세 페이지를 자동으로 만듭니다.

## 글 추가하기

`src/posts/` 폴더에 `.md` 파일을 하나 만듭니다. 파일명이 곧 글 주소가 됩니다.

```
src/posts/redis-ttl.md   →   /blog/redis-ttl
```

파일 맨 위에 글 정보를 씁니다.

```markdown
---
title: Redis TTL과 토큰 만료 동기화
date: 2026-08-15
createdAt: 2026-08-15T14:30:00+09:00
tags: Redis, Spring
summary: 목록 카드에 보여줄 한 줄 요약
category: redis-cache
---

여기부터 본문입니다. 마크다운 문법을 그대로 쓰면 됩니다.
```

## 지원하는 문법

제목(`#`, `##`), 목록, **굵게**, `인라인 코드`, 코드 블록, 인용문, 링크, 표까지
GitHub 마크다운(GFM) 문법을 지원합니다.

| 항목 | 필수 | 설명 |
| --- | --- | --- |
| title | O | 글 제목 |
| date | O | YYYY-MM-DD — 목록에 표시할 날짜, createdAt이 없으면 정렬 기준으로 사용 |
| createdAt | X | 작성 시각(예: 2026-08-15T14:30:00+09:00), 최신 시각부터 내림차순 정렬 |
| category | O | 왼쪽 카테고리 메뉴의 소분류 id (아래 표 참고) |
| tags | X | 쉼표로 구분 |
| summary | X | 목록 카드에 표시되는 요약 |

같은 날 여러 글을 작성한다면 `createdAt`을 입력해 작성 순서를 구분하세요.
`+09:00`은 한국 시간이며, 기존 글을 수정할 때는 최초 작성 시각을 유지합니다.

### category id

`category`를 빠뜨리거나 잘못 적으면 테스트가 실패하여 배포되지 않습니다.
예전에는 태그로 분류를 추측했지만, 맞는 규칙이 없으면 엉뚱한 카테고리에 들어가는 문제가 있어 직접 적도록 바꿨습니다.

| 대분류 | id | 소분류 |
| --- | --- | --- |
| 사이드 프로젝트 | `seulgae-tech-lab` | 슬개 기술 연구소 |
| AI 활용 기록 | `practice-tasks` | AI 성과별 실습 과제 |
| AI 활용 기록 | `ai-inspection` | AI 점검 기록 |
| Backend & Architecture | `java` | Java |
| Backend & Architecture | `spring-mybatis` | Spring · 아키텍처 |
| Backend & Architecture | `kafka-di` | Kafka · 데이터 정합성 |
| Database & Performance | `sql-tuning` | SQL · 실행계획 튜닝 |
| Database & Performance | `redis-cache` | Redis · 캐시 설계 |
| Security & Infra | `sast-cwe` | SAST · 시큐어코딩 (CWE) |
| Security & Infra | `linux-ops` | Linux · 운영 자동화 |
| Security & Infra | `home-server` | 홈서버 구축하기 |
| 면접 준비 · 사이트 가이드 | `project-review` | 기업 면접 준비 |
| 면접 준비 · 사이트 가이드 | `dev-notes` | 블로그 사이트 가이드 |

## 수정과 삭제

- 수정: 해당 `.md` 파일을 고치면 됩니다.
- 삭제: 파일을 지우면 목록에서도 사라집니다.

## 공개(배포)

로컬에서 `npm run dev`로 미리 확인하고, `npm test`와 `npm run build`가 통과하는지 확인합니다.

```bash
npm test
npm run build
```

변경 사항을 `main`에 push하거나 PR을 병합하면 GitHub Actions가 테스트·빌드 후 GitHub Pages에 자동으로 배포합니다.
테스트가 실패하면 배포되지 않습니다.

> 참고: Claude Code에게 "오늘 공부한 ○○ 내용으로 블로그 글 초안 만들어줘"라고 하면
> 이 형식에 맞는 파일 생성까지 한 번에 처리할 수 있습니다.
