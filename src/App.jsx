import { lazy, Suspense, useEffect } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BottomNav from "./components/BottomNav";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import { findProjectBySlug } from "./data/projects";
import { legacyRedirects, paths, portfolioSections } from "./routes";
import { useScrollSpy } from "./hooks/useScrollSpy";

const BlogLayout = lazy(() => import("./pages/BlogLayout"));
const BlogListPage = lazy(() => import("./pages/BlogListPage"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage"));
const ResumePage = lazy(() => import("./pages/ResumePage"));

function ProjectLegacyRedirect() {
  const { slug } = useParams();
  const project = findProjectBySlug(slug);

  if (!project) {
    return <NotFoundPage message="요청한 프로젝트를 찾을 수 없습니다." />;
  }

  return <Navigate to={paths.projectAnchor(project.slug)} replace />;
}

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ScrollAndTitleManager />
      <Suspense
        fallback={
          <p className="loading-status" role="status">페이지를 불러오는 중입니다.</p>
        }
      >
        <Routes>
          {/* 독립된 블루 테마 기술 블로그 공간 (/blog, /blog/:slug) */}
          <Route path={paths.blog} element={<BlogLayout />}>
            <Route index element={<BlogListPage />} />
            <Route path=":slug" element={<BlogPostPage />} />
            <Route
              path="*"
              element={
                <NotFoundPage
                  message="요청한 블로그 페이지를 찾을 수 없습니다."
                  backTo={paths.blog}
                  backLabel="글 목록으로 돌아가기"
                />
              }
            />
          </Route>

          {/* 메인 포트폴리오 공간 (/ 원페이지 포스터 스트림 + /resume 인쇄용 이력서) */}
          <Route element={<PortfolioLayout />}>
            <Route path={paths.home} element={<HomePage />} />
            <Route path={paths.resume} element={<ResumePage />} />
            <Route path="/projects/:slug" element={<ProjectLegacyRedirect />} />

            {/* 통합 전 개별 메뉴 경로 및 옛 경로로 들어온 방문자를 해당 포스터 섹션으로 연결 */}
            {legacyRedirects.map((redirect) => (
              <Route
                key={redirect.from}
                path={redirect.from}
                element={<Navigate to={redirect.to} replace />}
              />
            ))}

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

function ScrollAndTitleManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (pathname === paths.blog) {
      document.title = "길태형 기술 블로그 | Backend Engineering";
    } else if (!pathname.startsWith(`${paths.blog}/`)) {
      document.title = "길태형 포트폴리오 | Backend Developer";
    }

    if (hash) {
      const targetId = decodeURIComponent(hash.slice(1));
      const frame = window.requestAnimationFrame(() => {
        const element = document.getElementById(targetId);
        if (element && typeof element.scrollIntoView === "function") {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
      return () => window.cancelAnimationFrame(frame);
    }

    window.scrollTo(0, 0);
    return undefined;
  }, [pathname, hash]);

  return null;
}

const SECTION_IDS = portfolioSections.map((section) => section.id);

function PortfolioLayout() {
  const location = useLocation();
  const [activeSection, navigateToSection] = useScrollSpy(
    SECTION_IDS,
    location.pathname === paths.home,
  );

  return (
    <div className="app-shell portfolio-shell">
      <Header activeSection={activeSection} navigateToSection={navigateToSection} />

      {/* pathname이 바뀔 때만 진입 애니메이션 재생 (해시 스크롤 시에는 끊김 없이 유지) */}
      <main className="app-main page-enter" key={location.pathname}>
        <Outlet />
      </main>

      <Footer />

      {/* 모바일(768px 이하) 전용 포트폴리오 하단 탭바 */}
      <BottomNav activeSection={activeSection} navigateToSection={navigateToSection} />
    </div>
  );
}

export default App;
