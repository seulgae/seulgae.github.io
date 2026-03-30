import React from "react";
import "../styles/architecture.css";

const architectureSteps = [
  {
    step: "01. Bootstrap",
    title: "main.jsx",
    body: "ReactDOM root를 생성하고 App을 마운트합니다. 프로젝트 전체의 진입점이며 전역 CSS도 여기서 연결됩니다.",
  },
  {
    step: "02. Application Shell",
    title: "App.jsx",
    body: "BrowserRouter, 페이지 전환 애니메이션, 오른쪽 고정 사이드바, 모바일 터치 제스처를 관리합니다.",
  },
  {
    step: "03. Navigation",
    title: "components/Navbar.jsx",
    body: "프로필 카드, 프로젝트 서브메뉴, 외부 링크, Resume Print 및 Architecture 진입 링크를 제공합니다.",
  },
  {
    step: "04. Content Pages",
    title: "pages/*",
    body: "Home, 프로젝트 상세, 교육, 수상, 자격, 아키텍처, 출력용 이력서 페이지가 각각 독립된 화면 단위로 동작합니다.",
  },
  {
    step: "05. Presentation",
    title: "styles/*",
    body: "페이지별 CSS 파일로 시각 스타일을 분리합니다. 구조 변경 없이 화면 표현만 조정하기 쉽게 나눠져 있습니다.",
  },
  {
    step: "06. Deployment",
    title: "Vite + GitHub Pages",
    body: "vite build 결과물을 gh-pages로 배포합니다. package.json의 predeploy/deploy 스크립트가 실제 배포 흐름을 담당합니다.",
  },
];

const routeGuide = [
  {
    path: "/",
    page: "Home",
    purpose: "포트폴리오 첫 화면. 자기소개, 핵심 메시지, 기술 스택 요약을 제공합니다.",
    userGuide: "처음 방문한 사용자는 여기서 전체 톤과 강점을 빠르게 파악하면 됩니다.",
  },
  {
    path: "/ProjectsList",
    page: "국토교통부 프로젝트",
    purpose: "전세사기 피해 지원관리시스템 운영·개발 경험을 상세히 보여줍니다.",
    userGuide: "공공 SI/SM 운영과 개선 경험을 확인하려면 이 페이지부터 보면 됩니다.",
  },
  {
    path: "/ProjectsList2",
    page: "CloudXper 프로젝트",
    purpose: "플랫폼 백엔드 개발, 성능 개선, 인증/권한 구조 개선 경험을 보여줍니다.",
    userGuide: "순수 백엔드 개발과 구조 개선 관점의 강점을 확인하기 좋습니다.",
  },
  {
    path: "/ProjectsList3",
    page: "LG U+ 프로젝트",
    purpose: "운영/배치/API/GW 유지보수와 장애 대응 경험을 상세히 정리한 페이지입니다.",
    userGuide: "운영 안정화, 모니터링, 배치 자동화 경험을 보고 싶을 때 가장 먼저 보는 페이지입니다.",
  },
  {
    path: "/EducationList",
    page: "Education",
    purpose: "학위 및 교육 이력을 정리해둔 페이지입니다.",
    userGuide: "기술 역량이 어떤 학습 경로를 통해 형성됐는지 확인할 수 있습니다.",
  },
  {
    path: "/Awards",
    page: "Awards",
    purpose: "수상 이력을 정리합니다.",
    userGuide: "성과에 대한 외부 평가나 조직 내 인정 이력을 확인할 수 있습니다.",
  },
  {
    path: "/Licenses",
    page: "Licenses",
    purpose: "자격증 이력을 정리합니다.",
    userGuide: "기술/직무 관련 공식 자격 보유 여부를 확인할 수 있습니다.",
  },
  {
    path: "/ResumePrint",
    page: "Resume Print",
    purpose: "A4 출력용 이력서 페이지입니다.",
    userGuide: "실제 제출용 문서를 보거나 인쇄할 때 사용합니다.",
  },
  {
    path: "/Architecture",
    page: "Architecture",
    purpose: "현재 프로젝트의 구조, 흐름, 의존성, 변경 이력을 설명하는 내부 문서 페이지입니다.",
    userGuide: "이 프로젝트를 유지보수하거나 확장하려는 사람이 먼저 보는 안내서 역할입니다.",
  },
];

const maintenanceGuide = [
  {
    title: "새 프로젝트 추가",
    body: "1) pages/에 데이터 파일을 추가하고 2) ProjectsList 라우트를 연결한 뒤 3) Navbar 서브메뉴와 App.jsx routes 배열을 함께 갱신합니다.",
  },
  {
    title: "화면 수정 포인트",
    body: "페이지 구조는 pages/, 공통 UI는 components/, 시각 스타일은 styles/에 분리돼 있으므로 변경 범위를 좁게 유지할 수 있습니다.",
  },
  {
    title: "모바일/데스크톱 대응",
    body: "현재 프로젝트는 페이지별 CSS에 반응형 규칙이 분리돼 있으므로 전역 폭보다 각 페이지 CSS를 먼저 확인하는 방식이 안전합니다.",
  },
  {
    title: "배포 절차",
    body: "로컬 확인 후 npm run build, 배포 시 npm run deploy를 사용합니다. homepage와 gh-pages 스크립트가 GitHub Pages 경로를 맞춥니다.",
  },
];

const packageDetails = [
  {
    name: "react",
    version: "^19.1.0",
    category: "runtime",
    purpose: "컴포넌트 기반 UI 렌더링의 핵심 라이브러리입니다.",
    note: "현재 전체 화면이 함수형 컴포넌트 기준으로 구성돼 있습니다.",
  },
  {
    name: "react-dom",
    version: "^19.1.0",
    category: "runtime",
    purpose: "브라우저 DOM에 React 컴포넌트를 마운트합니다.",
    note: "main.jsx에서 root 생성에 사용됩니다.",
  },
  {
    name: "react-router-dom",
    version: "^6.30.1",
    category: "runtime",
    purpose: "라우팅과 화면 전환 경로를 담당합니다.",
    note: "App.jsx의 BrowserRouter, Routes, Route 구성이 핵심입니다.",
  },
  {
    name: "framer-motion",
    version: "^12.6.3",
    category: "runtime",
    purpose: "사이드바 슬라이드와 페이지 전환 애니메이션을 담당합니다.",
    note: "AnimatePresence, motion.aside, motion.div에 사용됩니다.",
  },
  {
    name: "react-icons",
    version: "^5.5.0",
    category: "runtime",
    purpose: "GitHub, 블로그 아이콘 등 UI 아이콘을 제공합니다.",
    note: "Navbar.jsx에서 사용됩니다.",
  },
  {
    name: "@testing-library/react",
    version: "^16.3.0",
    category: "test",
    purpose: "컴포넌트 테스트 렌더링 도구입니다.",
    note: "테스트 코드 기반은 유지되고 있으나 현재는 화면 중심 프로젝트에 가깝습니다.",
  },
  {
    name: "@testing-library/jest-dom",
    version: "^6.6.3",
    category: "test",
    purpose: "DOM assertion 확장을 제공합니다.",
    note: "테스트 가독성을 높이는 용도입니다.",
  },
  {
    name: "@testing-library/user-event",
    version: "^13.5.0",
    category: "test",
    purpose: "사용자 인터랙션 시뮬레이션에 사용됩니다.",
    note: "버튼 클릭, 입력, 탐색 시나리오 검증에 적합합니다.",
  },
  {
    name: "@testing-library/dom",
    version: "^10.4.0",
    category: "test",
    purpose: "DOM 기반 테스트 유틸리티입니다.",
    note: "React Testing Library 하위 동작을 보완합니다.",
  },
  {
    name: "web-vitals",
    version: "^2.1.4",
    category: "runtime",
    purpose: "웹 성능 지표 측정용 라이브러리입니다.",
    note: "현재 적극적으로 노출되지는 않지만 성능 계측 확장 포인트로 남아 있습니다.",
  },
  {
    name: "vite",
    version: "^8.0.3",
    category: "build",
    purpose: "개발 서버와 프로덕션 번들 빌드를 담당합니다.",
    note: "start/dev/build/preview 스크립트가 모두 Vite 기준입니다.",
  },
  {
    name: "@vitejs/plugin-react",
    version: "^6.0.1",
    category: "build",
    purpose: "Vite에서 React JSX 변환과 개발 경험을 지원합니다.",
    note: "vite.config.js와 함께 React 개발 환경을 구성합니다.",
  },
  {
    name: "vitest",
    version: "^4.1.2",
    category: "test",
    purpose: "테스트 러너입니다.",
    note: "package.json의 test 스크립트가 vitest run으로 연결돼 있습니다.",
  },
  {
    name: "jsdom",
    version: "^26.0.0",
    category: "test",
    purpose: "브라우저 유사 DOM 환경을 테스트에서 제공합니다.",
    note: "컴포넌트 테스트 실행 기반입니다.",
  },
  {
    name: "gh-pages",
    version: "^6.3.0",
    category: "deploy",
    purpose: "build 결과물을 GitHub Pages 브랜치로 배포합니다.",
    note: "npm run deploy에서 직접 사용됩니다.",
  },
  {
    name: "tailwindcss",
    version: "^4.1.3",
    category: "style",
    purpose: "유틸리티 CSS 프레임워크입니다.",
    note: "현재 코드에서는 핵심 렌더링에 직접 사용되지 않아 향후 정리 또는 활용 판단이 필요합니다.",
  },
  {
    name: "postcss",
    version: "^8.5.3",
    category: "style",
    purpose: "CSS 후처리 파이프라인 기반 라이브러리입니다.",
    note: "tailwindcss/autoprefixer와 함께 스타일 빌드 확장용입니다.",
  },
  {
    name: "autoprefixer",
    version: "^10.4.21",
    category: "style",
    purpose: "브라우저 접두어 자동 보완 도구입니다.",
    note: "향후 CSS 호환성 유지에 유리합니다.",
  },
  {
    name: "css-loader",
    version: "^7.1.2",
    category: "style",
    purpose: "CSS import 처리용 로더입니다.",
    note: "현재 Vite 프로젝트에서는 직접 필요성이 낮아 보이는 의존성입니다.",
  },
  {
    name: "style-loader",
    version: "^4.0.0",
    category: "style",
    purpose: "스타일 주입 로더입니다.",
    note: "webpack 계열에서 주로 쓰이며 현재 구조에서는 정리 후보입니다.",
  },
  {
    name: "react-transition-group",
    version: "^4.4.5",
    category: "runtime",
    purpose: "React 전환 애니메이션 유틸리티입니다.",
    note: "현재 코드는 framer-motion 중심이라 실제 사용 여부 점검이 필요합니다.",
  },
];

const structureTree = [
  "src/",
  "  main.jsx                 // 앱 진입점",
  "  App.jsx                  // 라우팅, 사이드바, 전환 애니메이션",
  "  index.css                // 전역 스타일",
  "  components/",
  "    Navbar.jsx             // 네비게이션, 프로필 카드, 외부 링크",
  "    ProjectExperiencePage.jsx // 프로젝트 상세 공통 렌더러",
  "  pages/",
  "    Home.jsx",
  "    Projects.jsx / Projects2.jsx / Projects3.jsx",
  "    ProjectsList.jsx / ProjectsList2.jsx / ProjectsList3.jsx",
  "    Education.jsx / EducationList.jsx",
  "    Awards.jsx / AwardsList.jsx",
  "    Licenses.jsx / LicensesList.jsx",
  "    Architecture.jsx",
  "    ResumePrint.jsx",
  "  styles/",
  "    home.css",
  "    navBar.css",
  "    projectsList.css",
  "    educationList.css",
  "    awardsList.css",
  "    licensesList.css",
  "    inventoryList.css",
  "    architecture.css",
  "    resumePrint.css",
];

const commitHistory = [
  "2026-03-30 | 4f1a6b6 | [20260330]이력서 출력페이지 추가, Awards, Licenses 내용 수정",
  "2026-03-30 | 49f316d | [20260330]이력서 출력페이지 추가, Awards, Licenses 내용 수정",
  "2026-03-26 | 54ce037 | [20260326]BrowserRouter 변경",
  "2026-03-26 | 587c79e | [20260326]포트폴리오 사이트 개선 업로드",
  "2025-06-27 | 7de9113 | 20250627 ReadMe UPD",
  "2025-06-27 | c78b02a | Merge branch 'main' of https://github.com/seulgae/seulgae.github.io",
  "2025-06-27 | 31c51da | SQLD Licenses img UPD",
  "2025-06-26 | 55527d3 | Update README.md",
  "2025-06-26 | e71057a | 20250625 ReadMe UPD",
  "2025-06-04 | 740ff1b | 사이드 프로젝트 링크 수정",
  "2025-06-04 | f83c5bf | 자격증 목록 수정",
  "2025-05-28 | 1cff3e2 | 기술 스택 수정",
  "2025-05-16 | 3659100 | 사이드 프로젝트 임시 활성화",
  "2025-05-09 | a0a9eb9 | 포트폴리오 사이트 지원용 임시 백업",
  "2025-05-08 | 203e6ce | 경력기술서 update",
  "2025-05-07 | 546065f | 깃허브 포맷 후 커밋 테스트",
  "2025-05-06 | bed0ad0 | 기술 스택 영역별 박스 추가",
  "2025-05-05 | 250682e | 사이드 프로젝트 목록 최신화",
  "2025-05-04 | 61a5e35 | 프로젝트 리스트 mainTasks 수정",
  "2025-05-04 | 647a28d | 프로젝트 리스트 Kosa 경력 항목 추가",
  "2025-05-02 | 67dcca7 | 사이드 프로젝트 메뉴 임시 비활성화",
  "2025-04-29 | 8e319c4 | 사이드 프로젝트 목록 수정",
  "2025-04-25 | d933763 | Merge branch 'main' of https://github.com/seulgae/seulgae.github.io",
  "2025-04-25 | cc64bc1 | 교육 내용 패스트캠퍼스 이력 추가",
  "2025-04-25 | 45f65fe | Update README.md",
  "2025-04-24 | 868baf6 | 로고 사이즈 조절",
  "2025-04-24 | 9cb4f2a | 로고 사이즈 조절",
  "2025-04-24 | a2fc987 | 로고 사이즈 조절",
  "2025-04-24 | 6b99eed | SideProject 로고 업데이트",
  "2025-04-23 | 7ce0761 | sideProjects 메뉴 수정, 마이그레이션 전, 후 아이콘 추가",
  "2025-04-22 | de35e99 | SideProject FM 프로젝트 JDK 수정",
  "2025-04-21 | 64751d8 | 교육 목록 수정",
  "2025-04-21 | 5876690 | 사이드 프로젝트 목록과 내용 수정",
  "2025-04-20 | f46ab56 | 앞으로의 다짐 Home 내용 추가",
  "2025-04-20 | 4effd64 | Education 목록 수정",
  "2025-04-20 | fc402e9 | 교육 모달 레이어 이미지 효과 추가",
  "2025-04-18 | 8dbab4e | 사이드 프로젝트 메뉴 활성화",
  "2025-04-17 | e5d9e93 | 모바일 css 제거 viewport 태그 주석처리",
  "2025-04-17 | d438497 | 모바일 버전 pc 사이즈에 맞는 css 반영",
  "2025-04-17 | 1e978bc | css 폴더 구조 분리, 모바일 css 주석처리",
  "2025-04-17 | 2a1fa2b | Blog 형태 소스로 다시 원복",
  "2025-04-15 | 3fbc90b | css width 사이즈 100% 적용",
  "2025-04-14 | 7abb3b8 | 각 메뉴별 애니메이션 효과 적용, Home 페이지 디자인 수정 및 적용",
  "2025-04-14 | 744c6a0 | 사이드 프로젝트 목록 정리",
  "2025-04-14 | 9eb2540 | 모달레이어 x버튼 위치 수정",
  "2025-04-14 | e39dc59 | 수상경력 사진 수정",
  "2025-04-14 | cceddf7 | 사이드바 메뉴 위치 수정, 애니메이션 수정, 버튼 위치 수정",
  "2025-04-14 | 2ee7e7d | 모바일 슬라이드 기능 추가",
  "2025-04-14 | 9c7e6d6 | 사이드바 버튼 제거, 스크롤 방식으로 변경",
  "2025-04-14 | 271e562 | 모바일 css 적용",
  "2025-04-14 | 0c8cd88 | 페이지별 CSS 사이즈 %로 변경",
  "2025-04-14 | 6328ca0 | 프로젝트 일지 추가작성",
  "2025-04-13 | a0505a2 | Side Project 메뉴 추가",
  "2025-04-13 | 779acc4 | ProjectList STAR 양식으로 변경",
  "2025-04-11 | 95e1ffc | ReadMe 내용 업데이트",
  "2025-04-11 | a18b230 | ReadMe 정리",
  "2025-04-10 | f369906 | Contact 디자인 적용",
  "2025-04-09 | cd5b7f0 | 자격증 메뉴 추가",
  "2025-04-09 | 000861d | ReadMe 프로젝트 일지 기록",
  "2025-04-09 | 2c1e574 | Project Experience 메뉴 하위 세부항목 메뉴 추가",
  "2025-04-09 | 250f4af | Router 속성 변경 -> HashRouter",
  "2025-04-08 | e2b41ee | 사이드바 버튼 수정",
  "2025-04-08 | c7ea94e | 포트폴리오 버전 V2 업로드",
  "2025-04-08 | 808f362 | Navbar 사이드 수정",
  "2025-04-08 | bbaeac9 | Navbar 사이드 수정",
  "2025-04-08 | 8c9f6b0 | Navbar 사이드 수정",
  "2025-04-08 | d98909f | Navbar 사이드 수정",
  "2025-04-08 | e43d134 | Navbar 사이드 수정",
  "2025-04-08 | 72a4de8 | Navbar 사이드 수정",
  "2025-04-08 | a3b8b42 | Navbar 사이드 수정",
  "2025-04-08 | da544c1 | Navbar 사이드 수정",
  "2025-04-08 | 23a1c75 | Navbar 사이드 수정",
  "2025-04-08 | d619506 | Navbar 사이드 수정",
  "2025-04-07 | 2baa3ef | ReadMe Edit",
  "2025-04-07 | 47719ca | ReadMe Edit",
  "2025-04-07 | af8f40d | ReadMe Edit",
  "2025-04-07 | 7dad5a3 | 포트폴리오 페이지 초안 디자인 V1",
  "2025-04-07 | 5c04f97 | ReadMe Edit",
  "2025-04-07 | 2a29d0a | HomePage Main Edit",
  "2025-04-07 | 27e38c8 | ReadMe Edit",
  "2025-04-07 | 72ccab5 | favicon.ico file Edit",
  "2025-04-07 | 1ffd21a | package.json Edit",
  "2025-04-07 | c18fe9a | first upload",
];

const timelineHighlights = [
  {
    date: "2026-03",
    title: "Resume Print와 라우팅 정리",
    body: "출력용 이력서 페이지가 추가됐고 BrowserRouter 기반으로 현재 라우팅 구성이 정리됐습니다.",
  },
  {
    date: "2025-06",
    title: "이력 최신화",
    body: "SQLD 자격증, README, 포트폴리오 소개 내용이 갱신됐습니다.",
  },
  {
    date: "2025-05",
    title: "프로젝트 데이터 정비",
    body: "기술 스택, 사이드 프로젝트, 경력기술서 관련 데이터와 표현이 계속 보완됐습니다.",
  },
  {
    date: "2025-04",
    title: "UI 구조 확장 집중",
    body: "Navbar, Project Experience 하위 메뉴, 모바일 CSS, 모달, 애니메이션, Home 디자인이 집중적으로 발전했습니다.",
  },
];

function Architecture() {
  return (
    <div className="architecture-page">
      <section className="architecture-hero">
        <span className="architecture-eyebrow">Project Manual</span>
        <h1>Portfolio Architecture & Maintenance Guide</h1>
        <p>
          이 페이지는 현재 포트폴리오 프로젝트를 유지보수하거나 확장하려는 사람이 먼저 보는 문서입니다.
          화면 구조, 라우팅, 파일 역할, 패키지 버전, 사용 가이드, 변경 이력을 한 곳에서 확인할 수 있도록
          정리했습니다.
        </p>
      </section>

      <section className="architecture-map">
        {architectureSteps.slice(0, 4).map((item) => (
          <div key={item.step} className="map-column">
            <span className="architecture-index">{item.step}</span>
            <div className="map-box">
              <strong>{item.title}</strong>
              <span>{item.body}</span>
            </div>
          </div>
        ))}
      </section>

      <section className="architecture-shell">
        <div className="architecture-header">
          <span className="architecture-index">Overview</span>
          <h2>아키텍처 레벨 단계</h2>
        </div>
        <div className="architecture-grid architecture-grid-wide">
          {architectureSteps.map((item) => (
            <article key={item.step} className="architecture-card">
              <span className="architecture-card-step">{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="architecture-shell">
        <div className="architecture-header">
          <span className="architecture-index">Guide</span>
          <h2>사용자/운영자 가이드</h2>
        </div>
        <div className="architecture-grid">
          {maintenanceGuide.map((item) => (
            <article key={item.title} className="architecture-card">
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="architecture-shell">
        <div className="architecture-header">
          <span className="architecture-index">Routes</span>
          <h2>페이지 구조와 사용 흐름</h2>
        </div>
        <div className="route-list">
          {routeGuide.map((item) => (
            <article key={item.path} className="route-card">
              <div className="route-head">
                <strong>{item.page}</strong>
                <span>{item.path}</span>
              </div>
              <p>{item.purpose}</p>
              <p className="route-guide">{item.userGuide}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="architecture-shell">
        <div className="architecture-header">
          <span className="architecture-index">Packages</span>
          <h2>package.json 라이브러리와 버전 설명</h2>
        </div>
        <div className="package-grid package-grid-wide">
          {packageDetails.map((pkg) => (
            <article key={pkg.name} className="package-card">
              <div className="package-meta">
                <strong>{pkg.name}</strong>
                <span>{pkg.version}</span>
              </div>
              <em>{pkg.category}</em>
              <p>{pkg.purpose}</p>
              <p className="package-note">{pkg.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="architecture-shell">
        <div className="architecture-header">
          <span className="architecture-index">Structure</span>
          <h2>실제 디렉터리 구조</h2>
        </div>
        <pre className="architecture-code">
          <code>{structureTree.join("\n")}</code>
        </pre>
      </section>

      <section className="architecture-shell">
        <div className="architecture-header">
          <span className="architecture-index">History</span>
          <h2>변경 이력 요약</h2>
        </div>
        <div className="timeline-list">
          {timelineHighlights.map((item) => (
            <article key={`${item.date}-${item.title}`} className="timeline-card">
              <span>{item.date}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="architecture-shell">
        <div className="architecture-header">
          <span className="architecture-index">Commits</span>
          <h2>전체 커밋 리스트</h2>
        </div>
        <pre className="architecture-code architecture-code-tall">
          <code>{commitHistory.join("\n")}</code>
        </pre>
      </section>
    </div>
  );
}

export default Architecture;
