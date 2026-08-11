# Seulgae Portfolio

개인 포트폴리오 사이트입니다. React + Vite 기반으로 구성되어 있으며, 프로젝트 경험, 교육, 수상, 자격, 출력용 이력서, 아키텍처 문서를 포함합니다.

## Stack

- React 19
- Vite 8
- React Router DOM 6
- Framer Motion
- GitHub Pages

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
npm run sync:history
npm run build
npm run deploy
```

## 구조

콘텐츠와 화면을 분리해, 내용을 고칠 때 파일 하나만 수정하면 되도록 구성했습니다.

```
src/
  routes.js        경로 + 사이드바 메뉴 정의 (단일 출처)
  data/            콘텐츠 단일 출처 (profile, projects, education, awards, licenses)
  components/      재사용 UI (Navbar, ProjectDetail, CredentialList, Lightbox 등)
  pages/           라우트 단위 화면
  hooks/ utils/    공용 로직
  styles/          tokens.css(디자인 토큰) + 화면별 CSS
scripts/           git log -> data/commitHistory.js 생성 스크립트
```

### 콘텐츠 수정 위치

| 수정하고 싶은 것 | 파일 |
| --- | --- |
| 프로젝트 경력 (상세 페이지·사이드바 메뉴·이력서 전부) | `src/data/projects.js` |
| 이름·연락처·기술 스택·핵심 요약 | `src/data/profile.js` |
| 교육 / 수상 / 자격 | `src/data/education.js`, `awards.js`, `licenses.js` |
| 색·반경·그림자 | `src/styles/tokens.css` |
| 경로 / 메뉴 구성 | `src/routes.js` |

새 프로젝트를 추가할 때는 `src/data/projects.js` 배열에 객체 하나만 넣으면 됩니다.
상세 페이지(`/projects/:slug`), 사이드바 서브메뉴, 출력용 이력서에 자동으로 반영됩니다.

## Routes

- `/` : 홈
- `/projects/:slug` : 프로젝트 상세 (jeonse-support-system, cloudxper-billing, lgu-billing-gw)
- `/education` : 교육 이력
- `/awards` : 수상 이력
- `/licenses` : 자격 이력
- `/resume` : 출력용 이력서 (A4 2장)
- `/architecture` : 프로젝트 구조 및 유지보수 문서

이전 경로(`/ProjectsList`, `/Awards`, `/ResumePrint` 등)는 `src/routes.js`의 `legacyRedirects`에
등록돼 있어 새 경로로 자동 이동합니다.

## Update Notes

- 2026-08-11 : 구조 리팩터링 — 콘텐츠를 `data/`로 분리해 화면·이력서 내용 중복 제거,
  프로젝트별 페이지 파일을 `/projects/:slug` 단일 라우트로 통합, 미사용 반응형 코드와
  중복 CSS 정리, 디자인 토큰 분리, 미사용 의존성 제거, 메타 태그·접근성 보완
- 2026-05-12 : Projects.jsx, Projects2.jsx, Projects3.jsx 내용 현행화 및 구조 수정
- 2026-03-31 : Architecture 페이지에 라우팅, 패키지 버전, 유지보수 가이드, 커밋 이력 문서화
- 2026-03-31 : ResumePrint를 A4 출력용 표 기반 문서 레이아웃으로 재구성
- 2026-03-30 : 이력서 출력 페이지 추가, Awards/Licenses 내용 수정
- 2026-03-26 : BrowserRouter 변경 및 포트폴리오 구조 개선
- 2025-06-27 : SQLD 자격 정보 및 README 업데이트
