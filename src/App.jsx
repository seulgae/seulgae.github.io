import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProjectsList from "./pages/ProjectsList";
import ProjectsList2 from "./pages/ProjectsList2";
import ProjectsList3 from "./pages/ProjectsList3";
import EducationList from "./pages/EducationList";
import InventoryList from "./pages/InventoryList";
import Awards from "./pages/Awards";
import Licenses from "./pages/Licenses";
import Architecture from "./pages/Architecture";
import ResumePrint from "./pages/ResumePrint";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/ProjectsList", element: <ProjectsList /> },
  { path: "/ProjectsList2", element: <ProjectsList2 /> },
  { path: "/ProjectsList3", element: <ProjectsList3 /> },
  { path: "/Inventory", element: <InventoryList /> },
  { path: "/Awards", element: <Awards /> },
  { path: "/EducationList", element: <EducationList /> },
  { path: "/Licenses", element: <Licenses /> },
  { path: "/Architecture", element: <Architecture /> },
  { path: "/ResumePrint", element: <ResumePrint /> },
];

function getViewMode() {
  const ua = window.navigator.userAgent;
  const hasCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const mobileUa = /Android|iPhone|iPad|iPod/i.test(ua);
  const appWebViewUa = /WebView|; wv\)|NAVER|KAKAOTALK|Instagram|FBAN|FBAV|Line\//i.test(ua);

  if (appWebViewUa || (mobileUa && hasCoarsePointer && window.innerWidth <= 980)) {
    return "app-web";
  }

  return "desktop";
}

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
  const [viewMode, setViewMode] = useState(() => getViewMode());
  const isAppWeb = viewMode === "app-web";

  useEffect(() => {
    const handleResize = () => setViewMode(getViewMode());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.viewMode = viewMode;
    document.body.dataset.viewMode = viewMode;

    return () => {
      delete document.documentElement.dataset.viewMode;
      delete document.body.dataset.viewMode;
    };
  }, [viewMode]);

  useEffect(() => {
    if (isAppWeb) {
      return undefined;
    }

    const handleMouseMove = (event) => {
      if (event.clientX > window.innerWidth - 10) {
        setIsOpen(true);
      } else if (event.clientX < window.innerWidth - 400) {
        setIsOpen(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isAppWeb]);

  useEffect(() => {
    if (!isAppWeb) {
      return undefined;
    }

    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (event) => {
      touchStartX = event.touches[0].clientX;
      touchEndX = touchStartX;
    };

    const handleTouchMove = (event) => {
      touchEndX = event.touches[0].clientX;
    };

    const handleTouchEnd = () => {
      const diff = touchEndX - touchStartX;
      if (touchStartX > window.innerWidth - 40 && diff < -40) {
        setIsOpen(true);
      } else if (touchStartX < window.innerWidth - 260 && diff > 40) {
        setIsOpen(false);
      }
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isAppWeb]);

  return (
    <div className={`app-shell ${viewMode}`}>
      <motion.aside
        className="app-sidebar"
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ type: "tween", duration: 0.35 }}
      >
        <Navbar isOpen={isOpen} toggleSidebar={() => setIsOpen(false)} />
      </motion.aside>

      <button
        type="button"
        className="app-menu-toggle"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? "X" : "Menu"}
      </button>

      <main className="app-main">
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<PageWrapper>{route.element}</PageWrapper>}
              />
            ))}
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
