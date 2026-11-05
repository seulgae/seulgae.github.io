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

## Stack

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
