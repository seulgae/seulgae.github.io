import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProjectsList from "./pages/ProjectsList";
import Contact from "./pages/Contact";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <Router>
      <div style={{ display: "flex", height: "100vh" }}>
        {/* ✅ Sidebar를 absolute로 배치하고, 모바일에서는 왼쪽으로 숨김 */}
        <Navbar isOpen={isOpen} toggleSidebar={toggleSidebar} />

        {/* ✅ 메인 컨텐츠 스타일 개선 */}
        <div
          style={{
            flexGrow: 1,
            padding: "20px",
            transition: "margin-left 0.3s ease",
            marginLeft: isOpen ? "250px" : "0",
            width: "100%", // 화면 전체를 차지하도록 설정
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ProjectsList" element={<ProjectsList />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </div>

      {/* ✅ 모바일에서 Sidebar가 완전히 숨겨지도록 CSS 추가 */}
      <style>
        {`
          @media (max-width: 768px) {
            .sidebar {
              position: absolute;
              left: ${isOpen ? "0" : "-250px"};
              width: 250px;
              height: 100vh;
              transition: left 0.3s ease-in-out;
            }
          }
        `}
      </style>
    </Router>
  );
}

export default App;