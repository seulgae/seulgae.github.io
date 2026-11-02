import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { paths, portfolioSections } from "../routes";
import profile from "../data/profile";
import { assetUrl } from "../utils/text";
import "../styles/header.css";


/**
 * 포트폴리오 상단 고정 헤더.
 * 메인(/) 스크롤 위치에 따라 활성 커서(슬라이딩 인디케이터)가 각 포스터 메뉴로 이동합니다.
 * 출력용 이력서(/resume)는 우측 별도 액션 버튼으로 구분해 배치합니다.
 */
function Header({ activeSection, navigateToSection }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === paths.home;

  const itemRefs = useRef({});
  const [cursorMetrics, setCursorMetrics] = useState(null);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.hash]);

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

  // 활성 메뉴 엘리먼트의 위치·폭을 측정해 슬라이딩 커서를 이동시킵니다.
  useLayoutEffect(() => {
    const updateCursor = () => {
      if (!isHome) {
        setCursorMetrics(null);
        return;
      }

      const activeEl = itemRefs.current[activeSection];
      if (activeEl && activeEl.offsetWidth > 0) {
        setCursorMetrics({
          left: activeEl.offsetLeft,
          width: activeEl.offsetWidth,
        });
      } else {
        setCursorMetrics(null);
      }
    };

    updateCursor();
    window.addEventListener("resize", updateCursor);
    return () => window.removeEventListener("resize", updateCursor);
  }, [activeSection, isHome]);

  const cursorStyle = useMemo(() => {
    if (!cursorMetrics) {
      return { opacity: 0 };
    }
    return {
      opacity: 1,
      width: `${cursorMetrics.width}px`,
      transform: `translateX(${cursorMetrics.left}px)`,
    };
  }, [cursorMetrics]);

  const handleSectionClick = (event, sectionId) => {
    if (!isHome) {
      return;
    }
    event.preventDefault();
    setMenuOpen(false);
    navigateToSection(sectionId);
  };

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link
          to={paths.home}
          className="site-brand"
          onClick={(event) => handleSectionClick(event, "about")}
        >
          <img
            src={assetUrl(profile.profileThumbnail || profile.profileImage)}
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
          <div className="site-nav-track">
            <span
              className="site-nav-cursor"
              aria-hidden="true"
              style={cursorStyle}
            />
            <ul>
              {portfolioSections.map((item) => {
                const isActive = isHome && activeSection === item.id;

                return (
                  <li key={item.id}>
                    <Link
                      ref={(el) => {
                        itemRefs.current[item.id] = el;
                      }}
                      to={paths.section(item.id)}
                      className={isActive ? "active" : undefined}
                      aria-current={isActive ? "location" : undefined}
                      onClick={(event) => handleSectionClick(event, item.id)}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <span className="site-nav-divider" aria-hidden="true" />

          <NavLink
            to={paths.resume}
            className={({ isActive }) =>
              `site-resume-button ${isActive ? "active" : ""}`
            }
          >
            🖨️ Resume
          </NavLink>
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
