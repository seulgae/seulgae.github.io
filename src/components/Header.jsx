import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { navigation, paths } from "../routes";
import profile from "../data/profile";
import { assetUrl } from "../utils/text";
import "../styles/header.css";

/**
 * 상단 고정 헤더.
 * 이전의 "화면 오른쪽 끝 hover로 여는 사이드바"를 대체합니다 — 메뉴가 항상 보이고,
 * 현재 페이지가 표시되며, 모바일에서는 햄버거 버튼으로 열립니다.
 */
function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // 페이지를 이동하면 모바일 메뉴를 닫습니다.
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link to={paths.home} className="site-brand">
          <img
            src={assetUrl(profile.profileImage)}
            alt=""
            className="site-brand-avatar"
          />
          <span className="site-brand-name">{profile.name}</span>
          <span className="site-brand-role">{profile.role}</span>
        </Link>

        <nav
          id="site-nav"
          className={`site-nav ${menuOpen ? "open" : ""}`}
          aria-label="주요 메뉴"
        >
          <ul>
            {navigation.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === paths.home}
                  className={({ isActive }) => (isActive ? "active" : undefined)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="site-menu-button"
          aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span className="site-menu-icon" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>
    </header>
  );
}

export default Header;
