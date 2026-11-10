import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import NotFoundPage from "./NotFoundPage";
import profile from "../data/profile";
import { getAllPosts } from "../lib/posts";
import { paths } from "../routes";
import "../styles/blog.css";

const markdownComponents = {
  a({ href = "", children, ...props }) {
    if (href === paths.blog || href.startsWith(`${paths.blog}/`)) {
      return (
        <Link to={href} {...props}>
          {children}
        </Link>
      );
    }

    if (href.startsWith("/") || /^https?:\/\//.test(href)) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
          {children}
        </a>
      );
    }

    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  },
};

/** 블로그 글 상세. 티스토리 스타일 상단 카테고리 경로 및 하단 같은 카테고리 글 목록을 포함합니다. */
function BlogPostPage() {
  const { slug } = useParams();
  const allPosts = getAllPosts();
  const postIndex = allPosts.findIndex((item) => item.slug === slug);
  const post = postIndex !== -1 ? allPosts[postIndex] : undefined;

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | 길태형 기술 블로그`;
    }
  }, [post]);

  if (!post) {
    return (
      <NotFoundPage
        message="요청한 글을 찾을 수 없습니다."
        backTo={paths.blog}
        backLabel="글 목록으로 돌아가기"
      />
    );
  }

  const categorySiblings = allPosts
    .filter((item) => item.category.subId === post.category.subId)
    .slice(0, 6);

  const newerPost = postIndex > 0 ? allPosts[postIndex - 1] : null;
  const olderPost =
    postIndex < allPosts.length - 1 ? allPosts[postIndex + 1] : null;

  return (
    <div className="blog-post-wrap">
      <article className="blog-post">
        <header className="blog-post-header">
          <div className="blog-post-topbar">
            <Link
              to={`${paths.blog}?category=${post.category.subId}`}
              className="blog-post-category-link"
            >
              {post.category.groupLabel} › {post.category.subLabel}
            </Link>
            <div className="blog-post-actions">
              <button
                type="button"
                className="blog-post-print-btn"
                title="인쇄 창에서 PDF로 저장을 선택하세요"
                onClick={() => window.print()}
              >
                PDF 저장
              </button>
              <Link to={paths.blog} className="blog-post-list-btn">
                목록으로
              </Link>
            </div>
          </div>

          <h1>{post.title}</h1>

          <div className="blog-post-meta">
            <strong className="blog-post-author">{profile.name}</strong>
            <span aria-hidden="true">·</span>
            <time dateTime={post.date}>{post.date}</time>
          </div>
        </header>

        <div className="blog-prose">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={markdownComponents}
          >
            {post.body}
          </ReactMarkdown>
        </div>

        {post.tags.length > 0 ? (
          <footer className="blog-post-tags-footer">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                to={`${paths.blog}?tag=${encodeURIComponent(tag)}`}
                className="blog-tag-chip"
              >
                #{tag}
              </Link>
            ))}
          </footer>
        ) : null}
      </article>

      {/* 티스토리 스타일 '같은 카테고리의 다른 글' 위젯 */}
      {categorySiblings.length > 1 ? (
        <section
          className="blog-related-box"
          aria-label="같은 카테고리의 다른 글"
        >
          <div className="blog-related-head">
            <h3>
              &lsquo;<span>{post.category.subLabel}</span>&rsquo; 카테고리의 다른 글
            </h3>
            <Link to={`${paths.blog}?category=${post.category.subId}`}>
              더보기 →
            </Link>
          </div>
          <ul className="blog-related-list">
            {categorySiblings.map((item) => {
              const isCurrent = item.slug === post.slug;

              return (
                <li
                  key={item.slug}
                  className={isCurrent ? "current" : undefined}
                >
                  {isCurrent ? (
                    <span className="blog-related-current">
                      <span className="current-badge">현재글</span>
                      {item.title}
                    </span>
                  ) : (
                    <Link to={paths.blogPost(item.slug)}>{item.title}</Link>
                  )}
                  <time dateTime={item.date}>{item.date}</time>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}

      {/* 이전글 / 다음글 네비게이션 */}
      {newerPost || olderPost ? (
        <nav className="blog-post-pager" aria-label="이전 다음 글 이동">
          {newerPost ? (
            <Link
              to={paths.blogPost(newerPost.slug)}
              className="blog-pager-card"
            >
              <span className="blog-pager-label">↑ 다음 글</span>
              <strong>{newerPost.title}</strong>
            </Link>
          ) : (
            <div />
          )}

          {olderPost ? (
            <Link
              to={paths.blogPost(olderPost.slug)}
              className="blog-pager-card align-right"
            >
              <span className="blog-pager-label">↓ 이전 글</span>
              <strong>{olderPost.title}</strong>
            </Link>
          ) : (
            <div />
          )}
        </nav>
      ) : null}
    </div>
  );
}

export default BlogPostPage;
