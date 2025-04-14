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
    if (isMobile) return; // 모바일에서는 마우스 이벤트 처리 안 함

    const handleMouseMove = (e) => {
      if (e.clientX > window.innerWidth - 30) {
        setIsOpen(true);
      } else if (e.clientX < window.innerWidth - 270 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile, isOpen]);

  useEffect(() => {
    if (!isMobile) return; // 모바일에서는 터치 이벤트 처리

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
      if (touchStartX > window.innerWidth - 30 && diff < -50) {
        setIsOpen(true);
      } else if (touchStartX < window.innerWidth - 250 && diff > 50) {
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
        {/* ✅ 사이드바와 버튼을 분리 */}
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: isOpen ? 0 : "100%" }}
          transition={{ type: "tween", duration: 0.8 }} // 속도 빠르게 수정
          style={{
            position: "fixed",
            right: 0,
            top: 0,
            bottom: 0,
            width: "250px",
            // background: "#333",
            color: "white",
            zIndex: 1000,
            overflow: "hidden",
            willChange: "transform",
            display: "flex",
            flexDirection: "column", // 버튼을 사이드바 내부에 배치하지 않음
          }}
        >
          <Navbar isOpen={isOpen} toggleSidebar={() => setIsOpen(false)} />
        </motion.div>

        {/* ✅ 버튼을 사이드바 외부로 이동 */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            zIndex: 1100,
            fontSize: "25px",
            background: "transparent",
            color: "black",
            padding: "10px 15px",
            border: "none",
            borderRadius: "5px",
          }}
        >
          {isOpen ? "X" : "☰"}
        </button>

        {/* ✅ 컨텐츠 영역 */}
        <div
          style={{
            flexGrow: 1,
            padding: "20px",
            transition: "margin-right 0.2s ease",
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
              {/* <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} /> */}
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