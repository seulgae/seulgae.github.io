import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBlog, FaGithub } from "react-icons/fa";
import { navigation, paths } from "../routes";
import profile from "../data/profile";
import { assetUrl, splitBracketTitle } from "../utils/text";
import "../styles/navBar.css";

function NavLabel({ text }) {
  const { main, sub } = splitBracketTitle(text);

  return (
    <span className="nav-label-text">
      <span>{main}</span>
      {sub ? <span className="nav-label-sub">{sub}</span> : null}
    </span>
  );
}

function NavItem({ item, currentPath, onNavigate }) {
  const [submenuOpen, setSubmenuOpen] = useState(false);

  useEffect(() => {
    setSubmenuOpen(false);
  }, [currentPath]);

  if (item.kind === "link") {
    return (
      <li>
        <Link
          to={item.to}
          onClick={onNavigate}
          aria-current={currentPath === item.to ? "page" : undefined}
        >
          {item.label}
        </Link>
      </li>
    );
  }

  const hasActiveChild = item.children.some((child) => child.to === currentPath);

  return (
    <li
      className="dropdown"
      onMouseEnter={() => setSubmenuOpen(true)}
      onMouseLeave={() => setSubmenuOpen(false)}
    >
      <button
        type="button"
        className="dropdown-toggle"
        aria-expanded={submenuOpen || hasActiveChild}
        onClick={() => setSubmenuOpen((prev) => !prev)}
      >
        {item.label}
      </button>
      <ul className={`submenu ${submenuOpen || hasActiveChild ? "open" : ""}`}>
        {item.children.map((child) => (
          <li key={child.to}>
            <Link
              to={child.to}
              onClick={onNavigate}
              aria-current={currentPath === child.to ? "page" : undefined}
            >
              <NavLabel text={child.label} />
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
}

function Navbar({ onNavigate }) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <div className="navbar">
      <div className="logo-shell">
        <div className="business-card">
          <div className="business-head">
            <img
              src={assetUrl(profile.profileImage)}
              alt={`${profile.name} 프로필 사진`}
              className="profile-image"
            />
            <div className="logo-copy">
              <span className="logo-badge">{profile.badge}</span>
              <h2>
                <Link to={paths.home} onClick={onNavigate}>
                  {profile.name}
                </Link>
              </h2>
              <p className="logo-description">{profile.role}</p>
            </div>
          </div>

          <div className="business-body">
            <a className="business-link" href={`tel:${profile.phone.replace(/-/g, "")}`}>
              <span className="business-label">Phone</span>
              <strong>{profile.phone}</strong>
            </a>
            <a className="business-link" href={`mailto:${profile.email}`}>
              <span className="business-label">Email</span>
              <strong>{profile.email}</strong>
            </a>
          </div>

          <div className="business-icons">
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FaGithub size={22} />
            </a>
            <a
              href={profile.links.blog}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Blog"
            >
              <FaBlog size={22} />
            </a>
          </div>
        </div>
      </div>

      <nav aria-label="주요 메뉴">
        <ul>
          {navigation.map((item) => (
            <NavItem
              key={item.label}
              item={item}
              currentPath={location.pathname}
              onNavigate={onNavigate}
            />
          ))}
        </ul>
      </nav>

      <Link to={paths.architecture} onClick={onNavigate} className="sidebar-credit">
        <span className="sidebar-credit-mark">SG</span>
        <span className="sidebar-credit-copy">
          <strong>Designed by seulgae</strong>
          <span>Portfolio structure &amp; design notes</span>
        </span>
      </Link>
    </div>
  );
}

export default Navbar;
