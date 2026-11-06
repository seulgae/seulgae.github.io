import { Link, NavLink } from "react-router-dom";
import { blogNavigation, paths } from "../routes";
import profile from "../data/profile";
import BrandSignature from "./BrandSignature";
import "../styles/blogLayout.css";

/**
 * 독립 기술 블로그 전용 상단 마스트헤드 (딥 네이비·블루 테마).
 * 모바일·태블릿에서는 좌측 카테고리 사이드바를 여닫는 토글 버튼을 함께 제공합니다.
 */
function BlogHeader({ sidebarOpen = false, onToggleSidebar, toggleRef }) {
  return (
    <header className="blog-header">
      <div className="blog-header-inner">
        <div className="blog-header-left">
          <button
            type="button"
            ref={toggleRef}
            className="blog-sidebar-toggle"
            aria-label={sidebarOpen ? "카테고리 메뉴 닫기" : "카테고리 메뉴 열기"}
            aria-expanded={sidebarOpen}
            aria-controls="blog-sidebar"
            onClick={onToggleSidebar}
          >
            <span className="blog-hamburger" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>

          <Link to={paths.blog} className="blog-brand" aria-label="길태형 기술 블로그">
            <BrandSignature blog />
          </Link>
        </div>

        <nav className="blog-nav" aria-label="블로그 메뉴">
          <ul>
            {blogNavigation.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) => (isActive ? "active" : undefined)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li>
              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub ↗
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default BlogHeader;
