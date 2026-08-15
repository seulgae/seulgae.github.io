import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getAllPosts, getAllTags } from "../lib/posts";
import { paths } from "../routes";
import "../styles/pageShell.css";
import "../styles/blog.css";

const PAGE_SIZE = 10;

/**
 * 블로그 글 목록.
 * 태그 필터 + 검색(제목·요약·본문·태그) + 10개 단위 페이징을 제공합니다.
 * 글은 src/posts/의 마크다운 파일에서 자동 생성됩니다.
 */
function BlogListPage() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState(null);
  const [page, setPage] = useState(1);

  const posts = getAllPosts();
  const tags = getAllTags();

  const filtered = useMemo(() => {
    const keyword = query.trim().toLowerCase();

    return posts.filter((post) => {
      if (activeTag && !post.tags.includes(activeTag)) {
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
  }, [posts, activeTag, query]);

  // 필터 결과가 줄어 현재 페이지가 범위를 벗어나면 마지막 페이지로 보정합니다.
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

  const handleTag = (tag) => {
    setActiveTag(tag);
    setPage(1);
  };

  const goToPage = (next) => {
    setPage(next);
    window.scrollTo(0, 0);
  };

  const isFiltering = query.trim() !== "" || activeTag !== null;

  return (
    <div className="page-shell">
      <h1>Blog</h1>
      <p className="page-lead">
        공부한 내용과 작업 기록을 정리하는 공간입니다. 글은 마크다운 파일로 관리됩니다.
      </p>

      <div className="blog-search">
        <input
          type="search"
          value={query}
          placeholder="제목 · 내용 · 태그 검색"
          aria-label="블로그 글 검색"
          onChange={(event) => handleSearch(event.target.value)}
        />
      </div>

      {tags.length ? (
        <div className="blog-tags" role="group" aria-label="태그 필터">
          <button
            type="button"
            className={`blog-tag ${activeTag === null ? "active" : ""}`}
            onClick={() => handleTag(null)}
          >
            전체 {posts.length}
          </button>
          {tags.map((tag) => (
            <button
              key={tag.name}
              type="button"
              className={`blog-tag ${activeTag === tag.name ? "active" : ""}`}
              onClick={() => handleTag(tag.name)}
            >
              {tag.name} {tag.count}
            </button>
          ))}
        </div>
      ) : null}

      {isFiltering ? (
        <p className="blog-result-count">검색 결과 {filtered.length}건</p>
      ) : null}

      <div className="blog-list">
        {visible.map((post) => (
          <Link key={post.slug} to={paths.blogPost(post.slug)} className="blog-card">
            <div className="blog-card-head">
              <h2>{post.title}</h2>
              <time dateTime={post.date}>{post.date}</time>
            </div>
            {post.summary ? <p className="blog-card-summary">{post.summary}</p> : null}
            {post.tags.length ? (
              <div className="blog-card-tags">
                {post.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            ) : null}
          </Link>
        ))}

        {!visible.length ? (
          <p className="blog-empty">조건에 맞는 글이 없습니다.</p>
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
