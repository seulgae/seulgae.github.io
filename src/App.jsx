import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BottomNav from "./components/BottomNav";
import HomePage from "./pages/HomePage";
import ProjectsIndexPage from "./pages/ProjectsIndexPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import BlogListPage from "./pages/BlogListPage";
import BlogPostPage from "./pages/BlogPostPage";
import EducationPage from "./pages/EducationPage";
import AwardsPage from "./pages/AwardsPage";
import LicensesPage from "./pages/LicensesPage";
import ArchitecturePage from "./pages/ArchitecturePage";
import ResumePage from "./pages/ResumePage";
import NotFoundPage from "./pages/NotFoundPage";
import { legacyRedirects, paths } from "./routes";

const pageRoutes = [
  { path: paths.home, element: <HomePage /> },
  { path: paths.projects, element: <ProjectsIndexPage /> },
  { path: `${paths.projects}/:slug`, element: <ProjectDetailPage /> },
  { path: paths.blog, element: <BlogListPage /> },
  { path: `${paths.blog}/:slug`, element: <BlogPostPage /> },
  { path: paths.education, element: <EducationPage /> },
  { path: paths.awards, element: <AwardsPage /> },
  { path: paths.licenses, element: <LicensesPage /> },
  { path: paths.resume, element: <ResumePage /> },
  { path: paths.architecture, element: <ArchitecturePage /> },
];

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppLayout />
    </Router>
  );
}

function AppLayout() {
  const location = useLocation();

  // 페이지 이동 시 맨 위로. (부드러운 스크롤은 전환 애니메이션과 겹쳐 어지러워서 즉시 이동)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="app-shell">
      <Header />

      {/* key가 바뀌면 다시 마운트되면서 CSS 진입 애니메이션이 재생됩니다. */}
      <main className="app-main page-enter" key={location.pathname}>
        <Routes location={location}>
          {pageRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}

          {/* 이전 버전 경로로 들어온 방문자를 새 경로로 넘겨 줍니다. */}
          {legacyRedirects.map((redirect) => (
            <Route
              key={redirect.from}
              path={redirect.from}
              element={<Navigate to={redirect.to} replace />}
            />
          ))}

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />

      {/* 모바일(768px 이하) 전용 하단 탭바. 데스크톱에서는 CSS로 숨겨집니다. */}
      <BottomNav />
    </div>
  );
}

export default App;
