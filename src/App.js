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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e) => {
      if (e.clientX < 30) {
        setIsOpen(true);
      } else if (e.clientX > 270 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile, isOpen]);

  useEffect(() => {
    if (!isMobile) return;

    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e) => {
      touchStartX = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
      touchEndX = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
      const diff = touchEndX - touchStartX;
      if (touchStartX < 30 && diff > 50) {
        setIsOpen(true);
      } else if (touchStartX > 250 && diff < -50) {
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
  }, [isMobile]);

  return (
    <Router>
      <div style={{ display: "flex", height: "100vh", position: "relative" }}>
        {/* ✅ 햄버거 버튼 (모바일 전용) */}
        {isMobile && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              position: "fixed",
              top: 20,
              left: 20,
              zIndex: 1100,
              background: "#007BFF",
              color: "white",
              padding: "10px 15px",
              border: "none",
              borderRadius: "5px",
            }}
          >
            ☰
          </button>
        )}

        {/* ✅ Sidebar 애니메이션 */}
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: isOpen ? 0 : "-100%" }}
          transition={{ type: "tween", duration: 0.3 }}
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
            width: "250px",
            background: "#333",
            color: "white",
            zIndex: 1000,
            overflow: "hidden",
            willChange: "transform",
            background: "transparent",
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
            marginLeft: isOpen && !isMobile ? "250px" : "0",
            width: "100%",
          }}
        >
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
              <Route path="/ProjectsList" element={<PageWrapper><ProjectsList /></PageWrapper>} />
              <Route path="/ProjectsList2" element={<PageWrapper><ProjectsList2 /></PageWrapper>} />
              <Route path="/ProjectsList3" element={<PageWrapper><ProjectsList3 /></PageWrapper>} />
              <Route path="/ProjectsList4" element={<PageWrapper><ProjectsList4 /></PageWrapper>} />
              <Route path="/SideProjects" element={<PageWrapper><SideProjects /></PageWrapper>} />
              <Route path="/Awards" element={<PageWrapper><Awards /></PageWrapper>} />
              <Route path="/EducationList" element={<PageWrapper><EducationList /></PageWrapper>} />
              <Route path="/Licenses" element={<PageWrapper><Licenses /></PageWrapper>} />
              <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
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
