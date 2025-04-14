import { useState, useEffect } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProjectsList from "./pages/ProjectsList";
import ProjectsList2 from "./pages/ProjectsList2";
import ProjectsList3 from "./pages/ProjectsList3";
import ProjectsList4 from "./pages/ProjectsList4";
import EducationList from "./pages/EducationList";
import SideProjects from "./pages/SideProjects";
import Contact from "./pages/Contact";
import Awards from "./pages/Awards";
import Licenses from "./pages/Licenses";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // 왼쪽 30px 영역에 진입하면 열고, 250px 이상 벗어나면 닫음
      if (e.clientX < 30) {
        setIsOpen(true);
      } else if (e.clientX > 270 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isOpen]);

  return (
    <Router>
      <div style={{ display: "flex", height: "100vh", position: "relative" }}>
        {/* ✅ Sidebar 애니메이션 */}
        <motion.div
          initial={{ x: "-100%" }} // ← 초기 상태를 명확하게 지정
          animate={{ x: isOpen ? 0 : "-100%" }}
          transition={{ type: "tween", duration: 0.3 }} // spring → tween으로 부드럽게
          style={{
            position: "fixed", // absolute → fixed로 변경
            left: 0,
            top: 0,
            bottom: 0,
            width: "250px",
            background: "#333",
            color: "white",
            zIndex: 1000,
            overflow: "hidden",
            willChange: "transform", // 렌더링 최적화
            background: "transparent", // ← 배경 제거
          }}
        >
          <Navbar isOpen={isOpen} toggleSidebar={() => setIsOpen(false)} />
        </motion.div>

        {/* ✅ 컨텐츠 영역 */}
        <div
          style={{
            flexGrow: 1,
            padding: "20px",
            transition: "margin-left 0.3s ease",
            marginLeft: isOpen ? "250px" : "0",
            width: "100%",
          }}
        >
          <AnimatePresence mode="wait">
            <Routes>
              <Route
                path="/"
                element={
                  <PageWrapper>
                    <Home />
                  </PageWrapper>
                }
              />
              <Route
                path="/ProjectsList"
                element={
                  <PageWrapper>
                    <ProjectsList />
                  </PageWrapper>
                }
              />
              <Route
                path="/ProjectsList2"
                element={
                  <PageWrapper>
                    <ProjectsList2 />
                  </PageWrapper>
                }
              />
              <Route
                path="/ProjectsList3"
                element={
                  <PageWrapper>
                    <ProjectsList3 />
                  </PageWrapper>
                }
              />
              <Route
                path="/ProjectsList4"
                element={
                  <PageWrapper>
                    <ProjectsList4 />
                  </PageWrapper>
                }
              />
              <Route
                path="/SideProjects"
                element={
                  <PageWrapper>
                    <SideProjects />
                  </PageWrapper>
                }
              />
              <Route
                path="/Awards"
                element={
                  <PageWrapper>
                    <Awards />
                  </PageWrapper>
                }
              />
              <Route
                path="/EducationList"
                element={
                  <PageWrapper>
                    <EducationList />
                  </PageWrapper>
                }
              />
              <Route
                path="/Licenses"
                element={
                  <PageWrapper>
                    <Licenses />
                  </PageWrapper>
                }
              />
              <Route
                path="/contact"
                element={
                  <PageWrapper>
                    <Contact />
                  </PageWrapper>
                }
              />
            </Routes>
          </AnimatePresence>
        </div>
      </div>
    </Router>
  );
}

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5 }}
      style={{ position: "relative", width: "100%", height: "100%" }}
    >
      {children}
    </motion.div>
  );
}

export default App;