import { Link, NavLink, useLocation } from "react-router-dom";
import {
  FaAward,
  FaFileAlt,
  FaFolderOpen,
  FaUser,
} from "react-icons/fa";
import { paths, portfolioSections } from "../routes";
import "../styles/bottomNav.css";


const SECTION_ICONS = {
  about: FaUser,
  projects: FaFolderOpen,
  credentials: FaAward,
};

/**
 * 모바일(768px 이하) 전용 포트폴리오 하단 탭바.
 * 스크롤 위치에 따라 3개 포스터 탭의 활성 표시가 자동으로 이동하며,
 * 우측 끝에는 출력용 이력서(/resume) 탭을 배치합니다.
 */
function BottomNav({ activeSection, navigateToSection }) {
  const location = useLocation();
  const isHome = location.pathname === paths.home;

  const handleSectionClick = (event, sectionId) => {
    if (!isHome) {
      return;
    }
    event.preventDefault();
    navigateToSection(sectionId);
  };

  return (
    <nav className="bottom-nav" aria-label="모바일 메뉴">
      {portfolioSections.map((section) => {
        const Icon = SECTION_ICONS[section.id] || FaUser;
        const isActive = isHome && activeSection === section.id;

        return (
          <Link
            key={section.id}
            to={paths.section(section.id)}
            className={`bottom-nav-item ${isActive ? "active" : ""}`}
            aria-current={isActive ? "location" : undefined}
            onClick={(event) => handleSectionClick(event, section.id)}
          >
            <Icon aria-hidden="true" />
            <span>{section.mobileLabel}</span>
          </Link>
        );
      })}

      <NavLink
        to={paths.resume}
        className={({ isActive }) =>
          `bottom-nav-item ${isActive ? "active" : ""}`
        }
      >
        <FaFileAlt aria-hidden="true" />
        <span>이력서</span>
      </NavLink>
    </nav>
  );
}

export default BottomNav;
