import { useState } from "react";  // ✅ useState를 import해야 함
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProjectsList from "./pages/ProjectsList";
import Contact from "./pages/Contact";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen); // ✅ 버튼 토글 함수 추가

  return (
    <Router>
      <div style={{ display: "flex", height: "100vh" }}>
        {/* ✅ Sidebar에 toggleSidebar 함수 전달 */}
        <Navbar isOpen={isOpen} toggleSidebar={toggleSidebar} />

        {/* 메인 컨텐츠 */}
        <div style={{ flexGrow: 1, padding: "20px", transition: "margin-left 0.3s", marginLeft: isOpen ? "250px" : "0" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ProjectsList" element={<ProjectsList />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}


export default App;