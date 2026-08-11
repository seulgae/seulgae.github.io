import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  FaEllipsisH,
  FaFileAlt,
  FaFolderOpen,
  FaHome,
  FaPen,
} from "react-icons/fa";
import { paths } from "../routes";
import "../styles/bottomNav.css";

/**
 * 모바일 전용 하단 탭바 (768px 이하에서만 표시 — bottomNav.css).
 * 핵심 4개는 바로 이동, 나머지는 "더보기" 시트로 진입합니다.
 * 데스크톱은 상단 헤더(Header.jsx)를 그대로 사용합니다.
 */
const tabs = [
  { label: "홈", to: paths.home, icon: FaHome, end: true },
  { label: "프로젝트", to: paths.projects, icon: FaFolderOpen },
  { label: "블로그", to: paths.blog, icon: FaPen },
  { label: "이력서", to: paths.resume, icon: FaFileAlt },
];

const moreLinks = [
  { label: "학력 및 교육", to: paths.education },
  { label: "수상 이력", to: paths.awards },
  { label: "자격증", to: paths.licenses },
  { label: "사이트 구조 문서", to: paths.architecture },
];

function BottomNav() {
  const [moreOpen, setMoreOpen] = useState(false);
  const location = useLocation();

  // 페이지를 이동하면 더보기 시트를 닫습니다.
  useEffect(() => {
    setMoreOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!moreOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMoreOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [moreOpen]);

  const moreActive = moreLinks.some((link) => location.pathname === link.to);

  return (
    <>
      {moreOpen ? (
        <div
          className="bottom-sheet-backdrop"
          role="presentation"
          onClick={() => setMoreOpen(false)}
        />
      ) : null}

      {moreOpen ? (
        <div className="bottom-sheet" role="dialog" aria-label="더보기 메뉴">
          <ul>
            {moreLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) => (isActive ? "active" : undefined)}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <nav className="bottom-nav" aria-label="모바일 메뉴">
        {tabs.map((tab) => {
          const Icon = tab.icon;

          return (
            <NavLink
              key={tab.to}
              to={tab.to}
              end={tab.end}
              className={({ isActive }) =>
                `bottom-nav-item ${isActive ? "active" : ""}`
              }
            >
              <Icon aria-hidden="true" />
              <span>{tab.label}</span>
            </NavLink>
          );
        })}

        <button
          type="button"
          className={`bottom-nav-item ${moreActive || moreOpen ? "active" : ""}`}
          aria-expanded={moreOpen}
          onClick={() => setMoreOpen((prev) => !prev)}
        >
          <FaEllipsisH aria-hidden="true" />
          <span>더보기</span>
        </button>
      </nav>
    </>
  );
}

export default BottomNav;
