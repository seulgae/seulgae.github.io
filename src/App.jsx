import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import EducationPage from "./pages/EducationPage";
import AwardsPage from "./pages/AwardsPage";
import LicensesPage from "./pages/LicensesPage";
import ArchitecturePage from "./pages/ArchitecturePage";
import ResumePage from "./pages/ResumePage";
import NotFoundPage from "./pages/NotFoundPage";
import { legacyRedirects, paths } from "./routes";

// 마우스가 오른쪽 화면 끝에서 이 거리 안으로 들어오면 사이드바가 열립니다.
const EDGE_OPEN_THRESHOLD = 10;
// 사이드바 폭보다 왼쪽으로 마우스가 벗어나면 닫습니다.
const CLOSE_DISTANCE = 400;

const pageRoutes = [
  { path: paths.home, element: <HomePage /> },
  { path: `${paths.projects}/:slug`, element: <ProjectDetailPage /> },
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
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (event.clientX > window.innerWidth - EDGE_OPEN_THRESHOLD) {
        setIsOpen(true);
      } else if (event.clientX < window.innerWidth - CLOSE_DISTANCE) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="app-shell">
      <motion.aside
        id="app-sidebar"
        className="app-sidebar"
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ type: "tween", duration: 0.35 }}
        // 닫혀 있을 때는 화면 밖이므로 키보드 탭 이동에서도 제외합니다.
        inert={!isOpen}
      >
        <Navbar onNavigate={() => setIsOpen(false)} />
      </motion.aside>

      <button
        type="button"
        className="app-menu-toggle"
        aria-label={isOpen ? "메뉴 닫기" : "메뉴 열기"}
        aria-expanded={isOpen}
        aria-controls="app-sidebar"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? "X" : "Menu"}
      </button>

      <main className="app-main">
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            {pageRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<PageWrapper>{route.element}</PageWrapper>}
              />
            ))}

            {/* 이전 버전 경로로 들어온 방문자를 새 경로로 넘겨 줍니다. */}
            {legacyRedirects.map((redirect) => (
              <Route
                key={redirect.from}
                path={redirect.from}
                element={<Navigate to={redirect.to} replace />}
              />
            ))}

            <Route path="*" element={<PageWrapper><NotFoundPage /></PageWrapper>} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -80 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 80 }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      style={{ width: "100%", height: "100%" }}
    >
      {children}
    </motion.div>
  );
}

export default App;
