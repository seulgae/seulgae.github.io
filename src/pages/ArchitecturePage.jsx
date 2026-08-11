import projects from "../data/projects";
import commitHistory from "../data/commitHistory";
import { legacyRedirects, paths } from "../routes";
import "../styles/pageShell.css";
import "../styles/architecture.css";

const architectureSteps = [
  {
    step: "01. Bootstrap",
    title: "main.jsx",
    body: "ReactDOM root를 생성하고 App을 마운트합니다. 전역 토큰(styles/tokens.css)과 기본 스타일도 여기서 연결됩니다.",
  },
  {
    step: "02. Application Shell",
    title: "App.jsx",
    body: "BrowserRouter, 상단 고정 헤더, 푸터, 페이지 진입 애니메이션을 관리합니다. 라우트 목록은 routes.js에서 가져옵니다.",
  },
  {
    step: "03. Routing Source",
    title: "routes.js",
    body: "경로와 상단 메뉴 구성의 단일 출처입니다. App(라우팅)과 Header(메뉴)가 같은 정의를 공유합니다.",
  },
  {
    step: "04. Content Data",
    title: "data/* + posts/*",
    body: "프로필·프로젝트·교육·수상·자격은 data/에, 블로그 글은 posts/의 마크다운 파일에만 존재합니다. 화면과 출력용 이력서가 같은 데이터를 참조합니다.",
  },
  {
    step: "05. Composition",
    title: "components/ + pages/",
    body: "components/는 재사용 UI(Header, Lightbox, CredentialList 등), pages/는 라우트 단위 화면 조립만 담당합니다.",
  },
  {
    step: "06. Deployment",
    title: "Vite + GitHub Pages",
    body: "vite build 결과물을 gh-pages로 배포합니다. package.json의 predeploy/deploy 스크립트가 배포 흐름을 담당합니다.",
  },
];

const maintenanceGuide = [
  {
    title: "새 프로젝트 추가",
    body: "data/projects.js 배열에 객체 하나만 추가하면 됩니다. 상세 페이지(/projects/:slug), 사이드바 서브메뉴, 출력용 이력서가 모두 자동으로 반영됩니다.",
  },
  {
    title: "블로그 글 작성",
    body: "src/posts/에 마크다운 파일을 추가하면 목록·상세·태그가 자동 반영됩니다. 파일 상단 frontmatter(title, date, tags, summary)만 지키면 됩니다. 자세한 방법은 블로그의 '이 블로그에 글 쓰는 방법' 글 참고.",
  },
  {
    title: "이력 내용 수정",
    body: "교육·수상·자격은 data/education.js, data/awards.js, data/licenses.js에만 있습니다. 연락처·기술 스택·핵심 요약은 data/profile.js에 있습니다.",
  },
  {
    title: "디자인 조정",
    body: "색·반경·그림자는 styles/tokens.css의 변수를 수정하면 전체에 반영됩니다. 화면별 레이아웃만 각 CSS 파일에서 다룹니다.",
  },
  {
    title: "경로 변경",
    body: "routes.js의 paths를 수정하면 라우팅과 메뉴가 함께 바뀝니다. 이전 경로는 legacyRedirects에 남겨 두어 공유된 링크가 깨지지 않게 합니다.",
  },
  {
    title: "화면 대응 범위",
    body: "3단계 적응형입니다. 데스크톱(960px 초과)은 상단 메뉴, 태블릿(769~960px)은 햄버거 패널, 모바일(768px 이하)은 앱 스타일 하단 탭바(BottomNav)로 이동합니다. 모바일은 여백·글자 밀도도 별도로 조정되며, 출력용 이력서는 A4 폭 유지 + 가로 스크롤로 열람합니다.",
  },
  {
    title: "배포 절차",
    body: "npm run sync:history로 커밋 이력을 갱신하고, npm run build로 확인한 뒤 npm run deploy를 실행합니다.",
  },
];

const routeGuide = [
  {
    path: paths.home,
    page: "Home",
    purpose: "포트폴리오 첫 화면. 자기소개, 핵심 메시지, 기술 스택 요약을 제공합니다.",
    userGuide: "처음 방문한 사용자는 여기서 전체 톤과 강점을 빠르게 파악하면 됩니다.",
  },
  {
    path: paths.projects,
    page: "Projects",
    purpose: "프로젝트 목록. 개요 카드에서 상세로 진입합니다.",
    userGuide: "무엇을 먼저 볼지 여기서 고르면 됩니다. 상세에서 이전/다음 이동도 가능합니다.",
  },
  ...projects.map((project) => ({
    path: paths.project(project.slug),
    page: project.shortTitle || project.title,
    purpose: project.description,
    userGuide: `${project.period} / ${project.role}`,
  })),
  {
    path: paths.blog,
    page: "Blog",
    purpose: "학습·작업 기록. src/posts/의 마크다운 파일에서 자동 생성됩니다.",
    userGuide: "태그로 필터링할 수 있고, 글은 DB 없이 파일로 관리됩니다.",
  },
  {
    path: paths.education,
    page: "Education",
    purpose: "학위 및 교육 이력을 정리해둔 페이지입니다.",
    userGuide: "기술 역량이 어떤 학습 경로를 통해 형성됐는지 확인할 수 있습니다.",
  },
  {
    path: paths.awards,
    page: "Awards",
    purpose: "수상 이력을 정리합니다.",
    userGuide: "성과에 대한 외부 평가나 조직 내 인정 이력을 확인할 수 있습니다.",
  },
  {
    path: paths.licenses,
    page: "Licenses",
    purpose: "자격증 이력을 정리합니다.",
    userGuide: "기술/직무 관련 공식 자격 보유 여부를 확인할 수 있습니다.",
  },
  {
    path: paths.resume,
    page: "Resume Print",
    purpose: "A4 2장 출력용 이력서입니다. 내용은 data/의 원본을 그대로 사용합니다.",
    userGuide: "실제 제출용 문서를 보거나 인쇄할 때 사용합니다.",
  },
  {
    path: paths.architecture,
    page: "Architecture",
    purpose: "현재 프로젝트의 구조, 흐름, 의존성, 변경 이력을 설명하는 내부 문서 페이지입니다.",
    userGuide: "이 프로젝트를 유지보수하거나 확장하려는 사람이 먼저 보는 안내서입니다.",
  },
];

const packageDetails = [
  {
    name: "react / react-dom",
    version: "^19.1.0",
    category: "runtime",
    purpose: "컴포넌트 기반 UI 렌더링과 DOM 마운트를 담당합니다.",
    note: "전체 화면이 함수형 컴포넌트 기준으로 구성돼 있습니다.",
  },
  {
    name: "react-router-dom",
    version: "^6.30.1",
    category: "runtime",
    purpose: "라우팅과 화면 전환 경로를 담당합니다.",
    note: "routes.js의 경로 정의를 App.jsx가 Route로 펼쳐 사용합니다.",
  },
  {
    name: "react-markdown / remark-gfm",
    version: "^10.1.0 / ^4.0.1",
    category: "runtime",
    purpose: "블로그 마크다운 본문을 렌더링합니다. GFM(표·체크리스트) 문법 지원.",
    note: "BlogPostPage.jsx에서 사용됩니다. 페이지 전환은 CSS 애니메이션으로 대체되어 framer-motion은 제거했습니다.",
  },
  {
    name: "react-icons",
    version: "^5.5.0",
    category: "runtime",
    purpose: "GitHub, 블로그 아이콘 등 UI 아이콘을 제공합니다.",
    note: "Navbar.jsx에서 사용됩니다.",
  },
  {
    name: "vite / @vitejs/plugin-react",
    version: "^8.0.3 / ^6.0.1",
    category: "build",
    purpose: "개발 서버와 프로덕션 번들 빌드, JSX 변환을 담당합니다.",
    note: "dev/build/preview 스크립트가 모두 Vite 기준입니다.",
  },
  {
    name: "vitest / jsdom",
    version: "^4.1.2 / ^26.0.0",
    category: "test",
    purpose: "테스트 러너와 브라우저 유사 DOM 환경을 제공합니다.",
    note: "npm test는 vitest run으로 연결돼 있습니다.",
  },
  {
    name: "@testing-library/react · jest-dom · user-event",
    version: "^16.3.0 / ^6.6.3 / ^13.5.0",
    category: "test",
    purpose: "컴포넌트 렌더링, DOM assertion, 사용자 인터랙션 검증 도구입니다.",
    note: "라우팅·데이터 정합성 테스트에 사용합니다.",
  },
  {
    name: "gh-pages",
    version: "^6.3.0",
    category: "deploy",
    purpose: "build 결과물을 GitHub Pages 브랜치로 배포합니다.",
    note: "npm run deploy에서 사용됩니다.",
  },
];

const structureTree = [
  "src/",
  "  main.jsx                    // 앱 진입점, 전역 스타일 연결",
  "  App.jsx                     // 라우팅, 헤더/푸터 배치, 진입 애니메이션",
  "  routes.js                   // 경로 + 메뉴 정의 (단일 출처)",
  "  index.css                   // 기본 스타일",
  "  data/                       // 콘텐츠 단일 출처",
  "    profile.js                // 인물 정보, 연락처, 기술 스택",
  "    projects.js               // 프로젝트 경력 (목록·상세·이력서 공용)",
  "    education.js / awards.js / licenses.js",
  "    commitHistory.js          // 자동 생성 (npm run sync:history)",
  "  posts/                      // 블로그 글 (마크다운 파일 = 글 1건)",
  "    how-to-write-posts.md",
  "    portfolio-refactoring.md",
  "  lib/posts.js                // posts/ 로더 + frontmatter 파서",
  "  components/                 // 재사용 UI",
  "    Header.jsx / Footer.jsx   // 상단 고정 메뉴, 연락처 푸터",
  "    BottomNav.jsx             // 모바일 전용 하단 탭바 (+더보기 시트)",
  "    ProjectDetail.jsx         // 프로젝트 상세 렌더러 (+이전/다음 이동)",
  "    CredentialList.jsx        // 수상·자격 공용 카드 목록",
  "    Lightbox.jsx / ZoomableImage.jsx / ExternalLinks.jsx",
  "  pages/                      // 라우트 단위 화면",
  "    HomePage.jsx",
  "    ProjectsIndexPage.jsx     // /projects 목록",
  "    ProjectDetailPage.jsx     // /projects/:slug 단일 처리",
  "    BlogListPage.jsx / BlogPostPage.jsx",
  "    EducationPage.jsx / AwardsPage.jsx / LicensesPage.jsx",
  "    ResumePage.jsx / ArchitecturePage.jsx / NotFoundPage.jsx",
  "  hooks/useLightbox.js",
  "  utils/text.js               // 제목 분리, 정적 파일 경로",
  "  styles/",
  "    tokens.css                // 색·반경·그림자·폰트 단일 출처 (클린 라이트)",
  "    pageShell.css             // 페이지 공통 폭·제목·뒤로가기",
  "    header.css / footer.css / bottomNav.css / blog.css / projectsIndex.css",
  "    lightbox.css / externalLinks.css / credentials.css",
  "    home.css / projectDetail.css / education.css",
  "    architecture.css / resume.css / notFound.css",
  "scripts/",
  "  generate-commit-history.mjs // git log -> data/commitHistory.js",
];

const timelineHighlights = [
  {
    date: "2026-08",
    title: "클린 라이트 개편 + 블로그 추가",
    body: "숨은 사이드바를 상단 고정 헤더로 교체하고 모바일 반응형을 적용했습니다. 마크다운 파일 기반 블로그(/blog)와 프로젝트 목록(/projects)을 추가했습니다.",
  },
  {
    date: "2026-08",
    title: "구조 리팩터링",
    body: "콘텐츠를 data/로 분리해 웹 화면과 출력용 이력서의 내용 중복을 제거했고, 프로젝트별 페이지 파일을 /projects/:slug 단일 라우트로 통합했습니다. 미사용 반응형 코드와 중복 CSS도 함께 정리했습니다.",
  },
  {
    date: "2026-03",
    title: "Resume Print와 라우팅 정리",
    body: "출력용 이력서 페이지가 추가됐고 BrowserRouter 기반으로 라우팅 구성이 정리됐습니다.",
  },
  {
    date: "2025-06",
    title: "이력 최신화",
    body: "SQLD 자격증, README, 포트폴리오 소개 내용이 갱신됐습니다.",
  },
  {
    date: "2025-04",
    title: "UI 구조 확장 집중",
    body: "Navbar, Project Experience 하위 메뉴, 모달, 애니메이션, Home 디자인이 집중적으로 발전했습니다.",
  },
];

function ArchitecturePage() {
  return (
    <div className="page-shell architecture-page">
      <section className="architecture-hero">
        <span className="architecture-eyebrow">Project Manual</span>
        <h1>Portfolio Architecture &amp; Maintenance Guide</h1>
        <p>
          이 페이지는 현재 포트폴리오 프로젝트를 유지보수하거나 확장하려는 사람이 먼저 보는
          문서입니다. 화면 구조, 라우팅, 파일 역할, 패키지 버전, 사용 가이드, 변경 이력을 한
          곳에서 확인할 수 있도록 정리했습니다.
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
          <span className="architecture-index">Legacy</span>
          <h2>이전 경로 리다이렉트</h2>
        </div>
        <p className="architecture-note">
          이미 공유된 옛 주소로 접속해도 새 경로로 자동 이동합니다.
        </p>
        <pre className="architecture-code">
          <code>
            {legacyRedirects
              .map((redirect) => `${redirect.from}  ->  ${redirect.to}`)
              .join("\n")}
          </code>
        </pre>
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
        <p className="architecture-note">
          npm run sync:history로 git log에서 자동 생성됩니다. (총 {commitHistory.length}건)
        </p>
        <pre className="architecture-code architecture-code-tall">
          <code>{commitHistory.join("\n")}</code>
        </pre>
      </section>
    </div>
  );
}

export default ArchitecturePage;
