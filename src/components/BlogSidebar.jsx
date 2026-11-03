import { Link, useLocation, useSearchParams } from "react-router-dom";
import profile from "../data/profile";
import {
  findPostBySlug,
  getAllPosts,
  getAllTags,
  getCategoryTree,
} from "../lib/posts";
import { paths } from "../routes";
import { assetUrl } from "../utils/text";

/**
 * 티스토리 스타일 좌측 고정 사이드바.
 * 블로그 프로필, 계층형 카테고리 분류 트리(대분류 → 소분류 + 글 수), 인기 태그를 제공합니다.
 * 글 상세(/blog/:slug) 화면에서도 현재 읽고 있는 글의 카테고리가 자동으로 강조됩니다.
 */
function BlogSidebar({ drawerOpen = false, onCloseDrawer }) {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const totalPosts = getAllPosts().length;
  const categoryTree = getCategoryTree();
  const topTags = getAllTags().slice(0, 12);

  const isPostDetail = location.pathname.startsWith(`${paths.blog}/`);
  const currentSlug = isPostDetail
    ? location.pathname.slice(`${paths.blog}/`.length)
    : null;
  const currentPost = currentSlug ? findPostBySlug(currentSlug) : null;

  const activeGroupParam = searchParams.get("group");
  const activeCategoryParam = searchParams.get("category");
  const activeTagParam = searchParams.get("tag");

  const activeSubId = activeCategoryParam || currentPost?.category.subId || null;
  const activeGroupId =
    activeGroupParam || (!activeSubId ? null : currentPost?.category.groupId || null);

  const isAllActive =
    !isPostDetail && !activeGroupParam && !activeCategoryParam && !activeTagParam;

  const handleLinkClick = () => {
    if (onCloseDrawer) {
      onCloseDrawer();
    }
  };

  return (
    <>
      {drawerOpen ? (
        <div
          className="blog-sidebar-backdrop"
          role="presentation"
          onClick={onCloseDrawer}
        />
      ) : null}

      <aside
        id="blog-sidebar"
        className={`blog-sidebar ${drawerOpen ? "open" : ""}`}
        aria-label="블로그 사이드바"
      >
        {/* 1. 블로그 프로필 카드 */}
        <div className="blog-profile-box">
          <div className="blog-profile-top">
            <img
              src={assetUrl(profile.profileImage)}
              alt={`${profile.name} 개발 노트 로고`}
              className="blog-profile-avatar"
            />
            <div>
              <strong className="blog-profile-title">{profile.name} 개발 노트</strong>
              <span className="blog-profile-handle">@seulgae · Backend</span>
            </div>
          </div>
          <p className="blog-profile-bio">
            운영 환경에서 마주한 쿼리 튜닝, 데이터 정합성, 시큐어코딩과 아키텍처 개선 기록을 남깁니다.
          </p>
          <div className="blog-profile-links">
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub ↗
            </a>
            <a href={paths.home} target="_blank" rel="noopener noreferrer">
              Portfolio ↗
            </a>
          </div>
        </div>

        {/* 2. 티스토리형 계층 카테고리 메뉴 */}
        <nav className="blog-category-box" aria-label="블로그 카테고리">
          <div className="blog-sidebar-heading">CATEGORY</div>

          <Link
            to={paths.blog}
            className={`blog-cat-all ${isAllActive ? "active" : ""}`}
            onClick={handleLinkClick}
          >
            <span>📂 분류 전체보기</span>
            <span className="blog-cat-count">{totalPosts}</span>
          </Link>

          <div className="blog-cat-groups">
            {categoryTree.map((group) => {
              const isGroupActive =
                !isPostDetail &&
                activeGroupId === group.groupId &&
                !activeCategoryParam;

              return (
                <div key={group.groupId} className="blog-cat-group">
                  <Link
                    to={`${paths.blog}?group=${group.groupId}`}
                    className={`blog-cat-group-link ${isGroupActive ? "active" : ""}`}
                    onClick={handleLinkClick}
                  >
                    <span>{group.groupLabel}</span>
                    <span className="blog-cat-count">{group.count}</span>
                  </Link>

                  <ul className="blog-cat-sublist">
                    {group.subs.map((sub) => {
                      const isSubActive = activeSubId === sub.id;

                      return (
                        <li key={sub.id}>
                          <Link
                            to={`${paths.blog}?category=${sub.id}`}
                            className={`blog-cat-sub-link ${isSubActive ? "active" : ""}`}
                            onClick={handleLinkClick}
                          >
                            <span className="blog-cat-branch">└</span>
                            <span className="blog-cat-sub-label">{sub.label}</span>
                            <span className="blog-cat-count">{sub.count}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </nav>

        {/* 3. 인기 태그 클라우드 */}
        {topTags.length > 0 ? (
          <div className="blog-tagcloud-box">
            <div className="blog-sidebar-heading">POPULAR TAGS</div>
            <div className="blog-sidebar-tags">
              {topTags.map((tag) => (
                <Link
                  key={tag.name}
                  to={`${paths.blog}?tag=${encodeURIComponent(tag.name)}`}
                  className={`blog-sidebar-tag ${activeTagParam === tag.name ? "active" : ""}`}
                  onClick={handleLinkClick}
                >
                  #{tag.name}
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </aside>
    </>
  );
}

export default BlogSidebar;
