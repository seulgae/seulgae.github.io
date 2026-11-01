import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CATEGORY_DEFINITIONS, getAllPosts } from "../lib/posts";
import { paths } from "../routes";
import "../styles/blog.css";

const PAGE_SIZE = 10;

function resolveFeedHeading(groupParam, categoryParam, tagParam) {
  if (categoryParam) {
    for (const group of CATEGORY_DEFINITIONS) {
      const foundSub = group.subs.find((sub) => sub.id === categoryParam);
      if (foundSub) {
        return {
          eyebrow: group.groupLabel,
          title: foundSub.label,
        };
      }
    }
  }

  if (groupParam) {
    const foundGroup = CATEGORY_DEFINITIONS.find(
      (group) => group.groupId === groupParam,
    );
    if (foundGroup) {
      return {
        eyebrow: "CATEGORY GROUP",
        title: foundGroup.groupLabel,
      };
    }
  }

  if (tagParam) {
    return {
      eyebrow: "TAG ARCHIVE",
      title: `#${tagParam}`,
    };
  }

  return {
    eyebrow: "ALL ARTICLES",
    title: "분류 전체보기",
  };
}

/**
 * 티스토리 스타일 블로그 글 목록.
 * 좌측 사이드바의 대분류(group)·소분류(category)·태그(tag) 쿼리 파라미터와
 * 키워드 실시간 검색 + 10개 단위 페이징을 연동합니다.
 */
function BlogListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const groupParam = searchParams.get("group");
  const categoryParam = searchParams.get("category");
  const tagParam = searchParams.get("tag");

  useEffect(() => {
    setPage(1);
  }, [groupParam, categoryParam, tagParam]);

  const posts = getAllPosts();
  const heading = resolveFeedHeading(groupParam, categoryParam, tagParam);

  const filtered = useMemo(() => {
    const keyword = query.trim().toLowerCase();

    return posts.filter((post) => {
      if (categoryParam && post.category.subId !== categoryParam) {
        return false;
      }

      if (groupParam && post.category.groupId !== groupParam) {
        return false;
      }

      if (tagParam && !post.tags.includes(tagParam)) {
        return false;
      }

      if (!keyword) {
        return true;
      }

      return (
        post.title.toLowerCase().includes(keyword) ||
        post.summary.toLowerCase().includes(keyword) ||
        post.tags.some((tag) => tag.toLowerCase().includes(keyword)) ||
        post.body.toLowerCase().includes(keyword)
      );
    });
  }, [posts, groupParam, categoryParam, tagParam, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const handleSearch = (value) => {
    setQuery(value);
    setPage(1);
  };

  const resetAllFilters = () => {
    setQuery("");
    setPage(1);
    setSearchParams({});
  };

  const goToPage = (next) => {
    setPage(next);
    window.scrollTo(0, 0);
  };

  const isSearching = query.trim() !== "";
  const hasUrlFilter = Boolean(groupParam || categoryParam || tagParam);

  return (
    <div className="blog-feed-sheet">
      <header className="blog-feed-header">
        <div className="blog-feed-title-wrap">
          <span className="blog-feed-eyebrow">{heading.eyebrow}</span>
          <div className="blog-feed-title-row">
            <h1>{heading.title}</h1>
            <span className="blog-feed-badge">{filtered.length}</span>
          </div>
        </div>

        <div className="blog-search">
          <input
            type="search"
            value={query}
            placeholder="제목 · 내용 · 태그 검색"
            aria-label="블로그 글 검색"
            onChange={(event) => handleSearch(event.target.value)}
          />
        </div>
      </header>

      {isSearching || hasUrlFilter ? (
        <div className="blog-filter-bar">
          <p className="blog-result-count">검색 결과 {filtered.length}건</p>
          <button
            type="button"
            className="blog-reset-btn"
            onClick={resetAllFilters}
          >
            필터 초기화 ×
          </button>
        </div>
      ) : null}

      <div className="blog-list">
        {visible.map((post) => (
          <article key={post.slug} className="blog-feed-item">
            <div className="blog-item-meta">
              <Link
                to={`${paths.blog}?category=${post.category.subId}`}
                className="blog-item-cat"
              >
                {post.category.subLabel}
              </Link>
              <span className="blog-meta-dot" aria-hidden="true">
                ·
              </span>
              <time dateTime={post.date}>{post.date}</time>
            </div>

            <Link to={paths.blogPost(post.slug)} className="blog-item-link">
              <h2>{post.title}</h2>
              {post.summary ? (
                <p className="blog-card-summary">{post.summary}</p>
              ) : null}
            </Link>

            {post.tags.length ? (
              <div className="blog-card-tags">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    to={`${paths.blog}?tag=${encodeURIComponent(tag)}`}
                    className="blog-tag-chip"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            ) : null}
          </article>
        ))}

        {!visible.length ? (
          <div className="blog-empty">
            <p>조건에 맞는 게시글이 없습니다.</p>
            <button
              type="button"
              className="blog-reset-btn"
              onClick={resetAllFilters}
            >
              전체 글 보기로 돌아가기
            </button>
          </div>
        ) : null}
      </div>

      {totalPages > 1 ? (
        <nav className="blog-pagination" aria-label="블로그 페이지 이동">
          <button
            type="button"
            className="blog-page-button"
            disabled={currentPage === 1}
            onClick={() => goToPage(currentPage - 1)}
          >
            이전
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map((n) => (
            <button
              key={n}
              type="button"
              className={`blog-page-button number ${n === currentPage ? "active" : ""}`}
              aria-current={n === currentPage ? "page" : undefined}
              onClick={() => goToPage(n)}
            >
              {n}
            </button>
          ))}

          <button
            type="button"
            className="blog-page-button"
            disabled={currentPage === totalPages}
            onClick={() => goToPage(currentPage + 1)}
          >
            다음
          </button>
        </nav>
      ) : null}
    </div>
  );
}

export default BlogListPage;
