# Seulgae Portfolio

개인 포트폴리오 사이트입니다. React + Vite 기반이며, 프로젝트 경험·교육·수상·자격·출력용 이력서·아키텍처 문서에 더해 마크다운 파일로 운영되는 블로그를 포함합니다.

- 배포 주소: https://seulgae.github.io
- 디자인: 클린 라이트 (흰 배경 + 상단 고정 헤더 + Pretendard)
- 화면 대응: 데스크톱은 상단 메뉴, 태블릿(769~960px)은 햄버거 패널,
  모바일(768px 이하)은 앱 스타일 **하단 탭바** + 모바일 전용 밀도로 렌더링

## Stack

- React 19
- Vite 8
- React Router DOM 6
- react-markdown + remark-gfm (블로그 렌더링)
- GitHub Pages (정적 호스팅, DB 없음)

## Local Run

```bash
npm install
npm run dev
```

## Test

```bash
npm test
```

## Build & Deploy

```bash
npm run sync:history   # git log -> Architecture 페이지 커밋 이력 갱신
npm run build
npm run deploy
```

## 구조

콘텐츠와 화면을 분리해, 내용을 고칠 때 파일 하나만 수정하면 되도록 구성했습니다.

```
src/
  routes.js        경로 + 상단 메뉴 정의 (단일 출처)
  data/            콘텐츠 단일 출처 (profile, projects, education, awards, licenses)
  posts/           블로그 글 (마크다운 파일 1개 = 글 1건)
  lib/posts.js     posts/ 로더 + frontmatter 파서
  components/      재사용 UI (Header, Footer, ProjectDetail, CredentialList, Lightbox 등)
  pages/           라우트 단위 화면
  hooks/ utils/    공용 로직
  styles/          tokens.css(디자인 토큰) + 화면별 CSS
scripts/           git log -> data/commitHistory.js 생성 스크립트
```

### 콘텐츠 수정 위치

| 수정하고 싶은 것 | 파일 |
| --- | --- |
| 프로젝트 경력 (목록·상세·이력서 전부) | `src/data/projects.js` |
| 블로그 글 | `src/posts/*.md` |
| 이름·연락처·기술 스택·핵심 요약 | `src/data/profile.js` |
| 교육 / 수상 / 자격 | `src/data/education.js`, `awards.js`, `licenses.js` |
| 색·반경·그림자·폰트 | `src/styles/tokens.css` |
| 경로 / 메뉴 구성 | `src/routes.js` |

새 프로젝트를 추가할 때는 `src/data/projects.js` 배열에 객체 하나만 넣으면 됩니다.
목록(`/projects`), 상세(`/projects/:slug`), 출력용 이력서에 자동으로 반영됩니다.

### 블로그 글 쓰기

`src/posts/`에 `.md` 파일을 추가하면 목록·상세·태그 필터가 자동 생성됩니다.
파일명이 곧 글 주소입니다. (`redis-ttl.md` → `/blog/redis-ttl`)

```markdown
---
title: 글 제목
date: 2026-08-15
tags: Redis, Spring
summary: 목록 카드에 보여줄 한 줄 요약
---

본문은 GitHub 마크다운(GFM) 문법을 지원합니다. 표·코드 블록·체크리스트 사용 가능.
```

수정은 파일 수정, 삭제는 파일 삭제이며, `npm run deploy`로 공개됩니다.
자세한 내용은 사이트의 `/blog/how-to-write-posts` 글에 정리돼 있습니다.

## Routes

- `/` : 홈 (About)
- `/projects` : 프로젝트 목록
- `/projects/:slug` : 프로젝트 상세 (jeonse-support-system, cloudxper-billing, lgu-billing-gw)
- `/blog` : 블로그 목록 (태그 필터)
- `/blog/:slug` : 블로그 글
- `/education` : 교육 이력
- `/awards` : 수상 이력
- `/licenses` : 자격 이력
- `/resume` : 출력용 이력서 (A4 2장, 모바일은 가로 스크롤)
- `/architecture` : 프로젝트 구조 및 유지보수 문서

이전 경로(`/ProjectsList`, `/Awards`, `/ResumePrint` 등)는 `src/routes.js`의 `legacyRedirects`에
등록돼 있어 새 경로로 자동 이동합니다.
