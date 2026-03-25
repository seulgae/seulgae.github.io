import React from "react";
import "../styles/architecture.css";

const packageTree = [
  "src/",
  "  App.js",
  "  index.js",
  "  index.css",
  "  components/",
  "    Navbar.jsx",
  "    ProjectExperiencePage.jsx",
  "  pages/",
  "    Home.jsx",
  "    Projects.jsx",
  "    Projects2.jsx",
  "    Projects3.jsx",
  "    ProjectsList.jsx",
  "    ProjectsList2.jsx",
  "    ProjectsList3.jsx",
  "    InventoryList.jsx",
  "    Education.jsx",
  "    EducationList.jsx",
  "    Awards.jsx",
  "    AwardsList.jsx",
  "    Licenses.jsx",
  "    LicensesList.jsx",
  "    Architecture.jsx",
  "  styles/",
  "    home.css",
  "    navBar.css",
  "    projectsList.css",
  "    inventoryList.css",
  "    educationList.css",
  "    awardsList.css",
  "    licensesList.css",
  "    architecture.css",
];

const packageSummary = [
  {
    name: "react / react-dom",
    role: "앱의 기본 렌더링과 컴포넌트 구조를 담당합니다.",
  },
  {
    name: "react-router-dom",
    role: "HashRouter 기반 페이지 이동과 라우트 구성을 담당합니다.",
  },
  {
    name: "framer-motion",
    role: "사이드바 슬라이드, 페이지 전환 애니메이션을 담당합니다.",
  },
  {
    name: "react-icons",
    role: "GitHub, 블로그 등 UI 아이콘 표시를 담당합니다.",
  },
  {
    name: "react-scripts",
    role: "CRA 기반 개발 서버, 빌드, 테스트 파이프라인을 담당합니다.",
  },
  {
    name: "gh-pages",
    role: "build 결과물을 GitHub Pages로 배포하는 스크립트에 사용됩니다.",
  },
];

const layers = [
  {
    title: "Entry",
    body: "index.js가 앱을 부트스트랩하고, 전역 CSS와 App 컴포넌트를 루트에 마운트합니다.",
  },
  {
    title: "Shell",
    body: "App.js가 사이드바, 메뉴 버튼, 페이지 전환 애니메이션, 라우팅 테이블을 한 곳에서 조립합니다.",
  },
  {
    title: "Navigation",
    body: "Navbar.jsx가 명함형 프로필, 프로젝트 드롭다운, 하단 제작 크레딧 링크를 담당합니다.",
  },
  {
    title: "Content",
    body: "pages/ 아래에서 홈, 경력, 교육, 수상, 자격증, 인벤토리 페이지를 각각 독립적으로 관리합니다.",
  },
  {
    title: "Presentation",
    body: "styles/ 아래 CSS 파일들이 페이지별 시각 톤을 담당해 수정 범위를 파일 단위로 좁힙니다.",
  },
  {
    title: "Deployment",
    body: "package.json의 build, predeploy, deploy 스크립트가 GitHub Pages 배포 흐름과 연결됩니다.",
  },
];

const flowSteps = [
  "index.js가 App를 마운트한다",
  "App.js가 라우트와 레이아웃 셸을 구성한다",
  "Navbar에서 메뉴 클릭이 발생한다",
  "react-router-dom이 경로를 변경한다",
  "AnimatePresence가 페이지 전환을 감싼다",
  "해당 pages/* 컴포넌트가 렌더링된다",
  "연결된 styles/* CSS가 화면을 완성한다",
];

function Architecture() {
  return (
    <div className="architecture-page">
      <section className="architecture-hero">
        <span className="architecture-eyebrow">SG</span>
        <h1>Portfolio Architecture</h1>
        <p>
          이 포트폴리오는 `라우팅 셸`, `사이드바 네비게이션`, `콘텐츠 페이지`, `페이지별
          스타일`을 분리한 구조입니다. 실무 포트폴리오 특성상 내용을 계속 교체해야 해서,
          수정 범위가 좁고 책임이 명확한 구조를 우선했습니다.
        </p>
      </section>

      <section className="architecture-map">
        <div className="map-column">
          <span className="architecture-index">01</span>
          <div className="map-box">
            <strong>index.js</strong>
            <span>app bootstrap</span>
          </div>
        </div>
        <div className="map-arrow">-&gt;</div>
        <div className="map-column">
          <span className="architecture-index">02</span>
          <div className="map-box">
            <strong>App.js</strong>
            <span>router + shell + motion</span>
          </div>
        </div>
        <div className="map-arrow">-&gt;</div>
        <div className="map-column">
          <span className="architecture-index">03</span>
          <div className="map-box">
            <strong>pages/*</strong>
            <span>content rendering</span>
          </div>
        </div>
        <div className="map-arrow">-&gt;</div>
        <div className="map-column">
          <span className="architecture-index">04</span>
          <div className="map-box">
            <strong>styles/*</strong>
            <span>page styling</span>
          </div>
        </div>
      </section>

      <section className="architecture-grid architecture-grid-wide">
        {layers.map((layer) => (
          <article key={layer.title} className="architecture-card">
            <h2>{layer.title}</h2>
            <p>{layer.body}</p>
          </article>
        ))}
      </section>

      <section className="architecture-shell">
        <div className="architecture-header">
          <span className="architecture-index">05</span>
          <h2>package.json Responsibilities</h2>
        </div>
        <div className="package-grid">
          {packageSummary.map((pkg) => (
            <article key={pkg.name} className="package-card">
              <h3>{pkg.name}</h3>
              <p>{pkg.role}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="architecture-shell">
        <div className="architecture-header">
          <span className="architecture-index">06</span>
          <h2>Package Structure</h2>
        </div>
        <pre className="architecture-code">
          <code>{packageTree.join("\n")}</code>
        </pre>
      </section>

      <section className="architecture-shell">
        <div className="architecture-header">
          <span className="architecture-index">07</span>
          <h2>Render Flow</h2>
        </div>
        <div className="flow-list">
          {flowSteps.map((step, index) => (
            <div key={step} className="flow-step">
              <span className="flow-number">{index + 1}</span>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Architecture;
