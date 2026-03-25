import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBlog, FaGithub } from "react-icons/fa";
import "../styles/navBar.css";

function splitLabel(text) {
  const bracketIndex = text.indexOf("(");

  if (bracketIndex === -1) {
    return { main: text, sub: "" };
  }

  return {
    main: text.slice(0, bracketIndex).trimEnd(),
    sub: text.slice(bracketIndex).trim(),
  };
}

function NavLabel({ text }) {
  const { main, sub } = splitLabel(text);

  return (
    <span className="nav-label-text">
      <span>{main}</span>
      {sub ? <span className="nav-label-sub">{sub}</span> : null}
    </span>
  );
}

function Navbar({ isOpen, toggleSidebar }) {
  const [showSubmenu, setShowSubmenu] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setShowSubmenu(false);
  }, [location.pathname]);

  return (
    <div className={`navbar ${isOpen ? "open" : "closed"}`}>
      <div className="logo-shell">
        <div className="business-card">
          <div className="business-head">
            <img
              src={`${process.env.PUBLIC_URL}/giltaehyeong.jpg`}
              alt="Profile"
              className="profile-image"
            />
            <div className="logo-copy">
              <span className="logo-badge">SI / SM Developer</span>
              <h2>
                <Link to="/" onClick={toggleSidebar}>
                  길태형
                </Link>
              </h2>
              <p className="logo-description">Backend Developer</p>
            </div>
          </div>

          <div className="business-body">
            <a className="business-link" href="tel:+82-10-3933-3763">
              <span className="business-label">Phone</span>
              <strong>010-3933-3763</strong>
            </a>
            <a className="business-link" href="mailto:r1605866@gmail.com">
              <span className="business-label">Email</span>
              <strong>r1605866@gmail.com</strong>
            </a>
          </div>

          <div className="business-icons">
            <a
              href="https://github.com/seulgae"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FaGithub size={22} />
            </a>
            <a
              href="https://doltae.tistory.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Blog"
            >
              <FaBlog size={22} />
            </a>
          </div>
        </div>
      </div>

      <nav>
        <ul>
          <li>
            <Link to="/" onClick={toggleSidebar}>
              About Me
            </Link>
          </li>
          <li
            className="dropdown"
            onMouseEnter={() => setShowSubmenu(true)}
            onMouseLeave={() => setShowSubmenu(false)}
          >
            <button type="button" className="dropdown-toggle">
              Project Experience
            </button>
            <ul className={`submenu ${showSubmenu ? "open" : ""}`}>
              <li>
                <Link to="/ProjectsList" onClick={toggleSidebar}>
                  <NavLabel text="전세사기 피해 지원관리시스템 운영·개발 (국토교통부)" />
                </Link>
              </li>
              <li>
                <Link to="/ProjectsList2" onClick={toggleSidebar}>
                  <NavLabel text="CloudXper 클라우드 빌링 통합 관리 플랫폼 고도화 개발 (LG CNS)" />
                </Link>
              </li>
              <li>
                <Link to="/ProjectsList3" onClick={toggleSidebar}>
                  <NavLabel text="LG U+ 통합 빌링 플랫폼 운영 및 유지보수 (배치·API·GW / NUBL·NUBO 기반)" />
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/Inventory" onClick={toggleSidebar}>
              Inventory
            </Link>
          </li>
          <li>
            <Link to="/EducationList" onClick={toggleSidebar}>
              Education
            </Link>
          </li>
          <li>
            <Link to="/Awards" onClick={toggleSidebar}>
              Awards
            </Link>
          </li>
          <li>
            <Link to="/Licenses" onClick={toggleSidebar}>
              Licenses
            </Link>
          </li>
        </ul>
      </nav>

      <Link to="/Architecture" onClick={toggleSidebar} className="sidebar-credit">
        <span className="sidebar-credit-mark">SG</span>
        <span className="sidebar-credit-copy">
          <strong>Designed by seulgae</strong>
          <span>Portfolio structure & design notes</span>
        </span>
      </Link>
    </div>
  );
}

export default Navbar;
