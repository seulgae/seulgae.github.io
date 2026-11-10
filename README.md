# Seulgae Portfolio & Tech Blog

개인 포트폴리오 사이트(`https://seulgae.github.io`)와 마크다운 기반 기술 블로그(`https://seulgae.github.io/blog`)를 독립된 레이아웃으로 분리 운영하는 React + Vite 정적 웹 애플리케이션입니다.

- **포트폴리오 주소**: https://seulgae.github.io
  - 4개 포스터 컴포넌트(`About` · `Skills` · `Projects` · `Credentials`)로 조립되는 원페이지 스트림 구조
  - 스크롤 위치에 따라 상단 헤더·모바일 하단바의 슬라이딩 커서가 해당 섹션으로 자동 이동 (Scrollspy)
  - 프로젝트 성과와 연결된 시스템 아키텍처 팝업 및 다이어그램 확대 보기
- **기술 블로그 주소**: https://seulgae.github.io/blog
  - 포트폴리오 네비게이션과 분리된 전용 헤더·푸터 레이아웃
  - 태그 필터, 본문 검색, 페이징 지원 (DB 없이 마크다운 파일 기반 운영)
- **출력용 이력서 주소**: https://seulgae.github.io/resume
  - `src/data/` 단일 출처 데이터를 그대로 참조하는 A4 2장 인쇄용 레이아웃

## 웹에서 블로그 글 관리

개발 환경에서는 `http://localhost:5173/admin/`, 배포 후에는 `https://seulgae.github.io/admin/`에서 글을 관리합니다. 블로그 하단의 **글 관리** 링크로도 이동할 수 있습니다.

Sveltia CMS의 GitHub 접근 토큰 로그인을 사용합니다. 토큰은 관리자 화면에 직접 입력하고, 저장소 파일이나 채팅에 작성하지 않습니다. 로컬 관리자 화면도 로그인 후에는 GitHub의 `main`과 초안 브랜치를 읽고 수정합니다.

### 처음 한 번 설정하기

1. 이 변경을 GitHub에 반영합니다.
2. 저장소 **Settings → Pages → Build and deployment → Source**를 **GitHub Actions**로 변경합니다.
3. **Actions → Deploy portfolio and blog**의 실행 결과를 확인합니다. 수동 실행도 가능합니다.
4. GitHub의 **Settings → Developer settings → Personal access tokens → Fine-grained tokens**에서 토큰을 만듭니다.
   - Resource owner는 `seulgae`, 저장소는 `seulgae.github.io` 하나만 선택합니다.
   - Repository permissions의 **Contents**, **Pull requests**에 **Read and write**를 지정합니다. Metadata 읽기 권한은 자동으로 포함됩니다.
   - 만료일을 설정하고, 발급된 토큰은 `/admin/`의 접근 토큰 로그인에 입력합니다.

### 작성부터 게시까지

- **블로그 글**에서 기존 글을 선택하거나 새 글을 만듭니다.
- 새 글의 주소는 `redis-permission-cache`처럼 영문 소문자·숫자·하이픈으로 입력합니다. 기존 글 주소는 편집기에서 변경할 수 없도록 설정했습니다.
- 제목·작성일·태그·요약·카테고리·본문을 편집하고 미리보기를 확인합니다. 태그는 쉼표로 구분합니다.
- 초안을 저장하면 `main`과 구분된 브랜치와 PR에 커밋됩니다. 준비되면 워크플로에서 게시합니다.
- 게시로 `main`에 반영되면 자동으로 테스트·빌드를 실행하고 GitHub Pages에 배포합니다. 실제 공개는 Actions의 배포가 성공한 뒤 완료됩니다.
- 관리자 화면에서 글 삭제는 비활성화했습니다. 이미지 업로드는 `public/uploads`에 저장됩니다.
- 커밋 메시지는 `[블로그] 글주소 글 추가` 또는 `[블로그] 글주소 글 수정` 형태로 생성됩니다.

기존의 단순 `key: value` Markdown 형식은 전용 저장 형식으로 유지합니다. 기존 게시글을 일괄 변환하지 않습니다. 관리자는 별도의 HTML 진입점으로 빌드되어 일반 포트폴리오에서 편집기를 로드하지 않습니다.

로그인·실제 게시·GitHub Actions 배포는 계정 설정 완료 후 확인해야 합니다. 로컬 테스트에는 실제 저장소에 글을 게시하는 동작을 포함하지 않습니다.

참고 문서 — [Sveltia GitHub 인증](https://sveltiacms.app/en/docs/backends/github), [GitHub Pages 자동 배포](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)

## 사용 기술

- React 19 + Vite 8 + React Router DOM 6
- react-markdown + remark-gfm (블로그 렌더링)
- Vitest + Testing Library
- GitHub Pages (정적 호스팅)

## Local Run & Test

```bash
npm install
npm run dev
npm test
npm run build
npm run deploy
```

## 디렉터리 구조

```text
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
