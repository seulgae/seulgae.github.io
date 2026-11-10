# Seulgae Portfolio & Tech Blog

개인 포트폴리오 사이트(`https://seulgae.github.io`)와 마크다운 기반 기술 블로그(`https://seulgae.github.io/blog`)를 독립된 레이아웃으로 분리 운영하는 React + Vite 정적 웹 애플리케이션입니다.

- **포트폴리오 주소**: https://seulgae.github.io
  - 4개 포스터 컴포넌트(`About` · `Skills` · `Projects` · `Credentials`)로 조립되는 원페이지 스트림 구조
  - 스크롤 위치에 따라 상단 헤더·모바일 하단바의 슬라이딩 커서가 해당 섹션으로 자동 이동 (Scrollspy)
  - 프로젝트 성과와 연결된 시스템 아키텍처 팝업 및 다이어그램 확대 보기
- **기술 블로그 주소**: https://seulgae.github.io/blog
  - 포트폴리오 네비게이션과 분리된 전용 헤더·푸터 레이아웃
  - 태그 필터, 본문 검색, 페이징 지원 (DB 없이 마크다운 파일 기반 운영)
  - 상세 글을 A4 PDF로 저장하는 인쇄 기능
- **출력용 이력서 주소**: https://seulgae.github.io/resume
  - `src/data/` 단일 출처 데이터를 참조하는 A4 3장 레이아웃
  - 컬러 인쇄 및 흑백 인쇄 선택 지원

## 블로그 글 수정과 배포

게시글은 `src/posts/*.md`를 직접 수정합니다. 파일명이 글 주소가 되므로 기존 글의 파일명은 유지합니다.

로컬에서 `npm test`와 `npm run build`를 확인한 뒤 변경 사항을 커밋하고 `main`에 push합니다. GitHub Actions가 테스트·빌드 후 GitHub Pages에 자동 배포합니다.

## 배포 방식

저장소의 **Settings → Pages → Build and deployment → Source**는 **GitHub Actions**로 설정합니다. 실행 설정은 [pages.yml](.github/workflows/pages.yml)에 있습니다.

```text
main에 push 또는 PR 병합
  → Node.js 22 환경 준비
  → npm ci
  → npm test
  → npm run build
  → build/ 결과물을 Pages 아티팩트로 업로드
  → GitHub Pages에 배포
```

| 실행 계기 | 테스트·빌드 | 사이트 배포 |
| --- | --- | --- |
| `main`에 push | 실행 | 성공 후 실행 |
| `main` 대상 PR 생성·업데이트 | 실행 | PR 병합 후 `main` 실행에서 배포 |
| Actions에서 수동 실행 | 실행 | 성공 후 실행 |

코드를 로컬에서 저장하거나 커밋한 뒤, GitHub의 `main`에 push해야 자동 배포가 시작됩니다. 테스트나 빌드가 실패하면 배포 작업은 진행되지 않습니다.

### 배포 결과 확인과 수동 실행

1. 저장소의 **Actions → Deploy portfolio and blog**를 엽니다.
2. 해당 커밋의 `build`와 `deploy` 작업이 모두 성공했는지 확인합니다.
3. 배포가 완료되면 [포트폴리오](https://seulgae.github.io/)와 수정한 페이지를 확인합니다.
4. 수동으로 다시 배포하려면 **Run workflow**에서 `main`을 선택해 실행합니다.

배포 인증에는 Actions가 제공하는 `GITHUB_TOKEN`과 OIDC를 사용합니다. 워크플로에 설정된 `pages: write`, `id-token: write` 권한으로 배포하며, 개인 접근 토큰을 별도로 등록할 필요는 없습니다.

### 배포 방식 변경 기록 · 2026-11-10

| 항목 | 이전 방식 | 현재 방식 |
| --- | --- | --- |
| Pages Source | Deploy from a branch | GitHub Actions |
| 배포 시작 | 로컬에서 `npm run deploy` 실행 | `main`에 push |
| 빌드 위치 | 로컬 PC | GitHub Actions 러너 |
| 배포 결과물 | `gh-pages` 브랜치에 저장 | `build/`를 아티팩트로 업로드해 배포 |
| 배포 전 검사 | 로컬에서 개별 실행 | 워크플로에서 테스트·빌드 실행 |

- 기존 배포용 `gh-pages` 브랜치를 삭제했습니다. 현재 배포는 `main`의 소스와 Actions 빌드 결과물을 사용합니다.
- 웹 글 관리 기능을 제거하고 `src/posts/*.md`를 직접 편집하는 방식으로 정리했습니다. CMS 의존성과 관리자 빌드 진입점도 제거했습니다.
- `package.json`의 기존 `deploy`·`predeploy` 스크립트와 `gh-pages` 패키지는 남아 있지만, 현재 배포 절차에서는 사용하지 않습니다. 배포할 때는 `main`에 push합니다.

## 사용 기술

- React 19 + Vite 8 + React Router DOM 6
- react-markdown + remark-gfm (블로그 렌더링)
- Vitest + Testing Library
- GitHub Pages (정적 호스팅)

## 로컬 실행과 검증

GitHub Actions와 같은 Node.js 22 환경을 기준으로 실행합니다.

```bash
npm ci
npm run dev
npm test
npm run build
npm run preview
```

## 디렉터리 구조

```text
.github/workflows/pages.yml    테스트·빌드·GitHub Pages 자동 배포
src/
  routes.js                   경로 및 포스터 섹션(About·Skills·Projects·Credentials) 정의
  data/                       콘텐츠 단일 출처(SSOT: profile, projects, education, awards, licenses)
  components/
    posters/                  원페이지 포트폴리오를 구성하는 4대 포스터 컴포넌트
      AboutPoster.jsx         인사말·일하는 방식·개발 방향 소개
      SkillsPoster.jsx        역량 매트릭스 (profile.js 단일 출처 공유)
      ProjectsPoster.jsx      프로젝트 타임라인 + 성과·관련 글·아키텍처 팝업
      CredentialsPoster.jsx   학력·수상·자격 통합 (이미지 확대 Lightbox 및 산출물 링크 포함)
    Header.jsx / BottomNav.jsx / Footer.jsx       포트폴리오 전용 셸 (스크롤 스파이 커서)
    BlogHeader.jsx / BlogFooter.jsx               블로그 전용 독립 셸
    ArchitectureDiagrams.jsx / ProjectArchitecture.jsx / BillingArchitecture.jsx
  pages/
    HomePage.jsx              4개 포스터 조립 엔트리
    ResumePage.jsx            A4 출력용 이력서
    BlogListPage.jsx / BlogPostPage.jsx
  posts/                      블로그 마크다운 원문 (*.md)
  old/                        개편 전 구 다중 페이지·컴포넌트·스타일 보관 패키지
```
