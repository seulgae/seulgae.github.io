import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaGithub, FaBlog } from "react-icons/fa";
import "./navbar.css"; // CSS 파일 추가

function Navbar({ isOpen, toggleSidebar }) {
  const [showSubmenu, setShowSubmenu] = useState(false);
  const location = useLocation(); // 현재 경로 감지

  // 경로 변경 시 스크롤을 최상단으로 이동
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <div className={`navbar ${isOpen ? "open" : "closed"}`}>
      {/* 상단 로고 */}
      <div className="logo">
        <h2>
          <a href="/">Seulgae</a>
        </h2>
        <img src="/giltaehyeong.jpg" alt="Profile" className="profile-image" />
      </div>

      {/* 네비게이션 메뉴 */}
      <nav>
        <ul>
          <li>
            <Link to="/">About Me</Link>
          </li>

          {/* ProjectsList 항목 */}
          <li 
            className="dropdown"
            onMouseEnter={() => setShowSubmenu(true)}
            onMouseLeave={() => setShowSubmenu(false)}
          >
            <button className="dropdown-toggle">
              Project Experience
            </button>
            <ul className={`submenu ${showSubmenu ? "open" : ""}`}>
              <li>
                <Link to="/ProjectsList">LG CNS 빌링 디지털 서비스 팀 SM개발/운영</Link>
              </li>
              <li>
                <Link to="/ProjectsList2">LG CNS 빌링 디지털 서비스 팀 SI개발</Link>
              </li>
              <li>
                <Link to="/ProjectsList3">★ LG CNS 클라우드 플랫폼 개발 ★</Link>
              </li>
              <li>
                <Link to="/ProjectsList4">LG CNS 빌링 GW 연동 파트 개발/운영</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/SideProjects">Side Projects</Link>
          </li>
          <li>
            <Link to="/EducationList">Education</Link>
          </li>
          <li>
            <Link to="/awards">Awards</Link>
          </li>
          <li>
            <Link to="/Licenses">Licenses</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>

      {/* 하단 아이콘 */}
      <div className="icon-container">
        <Link to="https://github.com/seulgae" target="_blank" rel="noopener noreferrer">
          <FaGithub size={24} />
        </Link>
        <Link to="https://doltae.tistory.com/" target="_blank" rel="noopener noreferrer">
          <FaBlog size={24} />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;