import { Link } from "react-router-dom";
import { FaGithub, FaBlog } from "react-icons/fa";
import "./navbar.css"; // CSS 파일 추가

function Navbar({ isOpen, toggleSidebar }) {
  return (
    <div className={`navbar ${isOpen ? "open" : "closed"}`}>
      {/* 사이드바 토글 버튼 */}
      <button className="menu-button" onClick={toggleSidebar}>
        {isOpen ? "✖" : "☰"}
      </button>

      {/* 상단 로고 */}
      <div className="logo">
        <h2>
          <a href="/">Seulgae Portfolio</a>
        </h2>
        <img src="/giltaehyeong.jpg" alt="Profile" className="profile-image" />
      </div>

      {/* 네비게이션 메뉴 */}
      <nav>
        <ul>
          {[
            { to: "/", text: "자기소개서" },
            { to: "/ProjectsList", text: "포트폴리오" },
            { to: "/experience", text: "프로젝트 경험" },
            { to: "/education", text: "교육/학력" },
            { to: "/awards", text: "수상경력" },
            { to: "/contact", text: "연락처" },
          ].map((item, index) => (
            <li key={index}>
              <Link to={item.to}>{item.text}</Link>
            </li>
          ))}
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