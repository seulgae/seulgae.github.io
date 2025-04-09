import { useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProjectsList from "./pages/ProjectsList";
import ProjectsList2 from "./pages/ProjectsList2";
import ProjectsList3 from "./pages/ProjectsList3";
import ProjectsList4 from "./pages/ProjectsList4";
import EducationList from "./pages/EducationList";
import Contact from "./pages/Contact";
import Awards from "./pages/Awards";
import Licenses from "./pages/Licenses";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <Router>
      <div style={{ display: "flex", height: "100vh", position: "relative" }}>
        {/* ✅ Sidebar 애니메이션 */}
        <motion.div
          animate={{ x: isOpen ? 0 : "-100%" }}
          transition={{ type: "spring", stiffness: 100 }}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "250px",
            background: "#333",
            color: "white",
            zIndex: 10, // 사이드바보다 낮게 설정
          }}
        >
          <Navbar isOpen={isOpen} toggleSidebar={toggleSidebar} />
        </motion.div>

        {/* ✅ 버튼 (오른쪽 상단으로 이동) */}
        <button
          onClick={toggleSidebar}
          style={{
            position: "absolute",
            top: 20,
            right: 20, // 왼쪽 → 오른쪽으로 변경
            zIndex: 15, // 사이드바보다 위로 배치
            background: "#007BFF",
            color: "white",
            padding: "10px 15px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {isOpen ? "Close" : "Open"}
        </button>

        {/* ✅ 페이지 컨텐츠 (애니메이션 적용) */}
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

/* ✅ 페이지 전환 애니메이션 */
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