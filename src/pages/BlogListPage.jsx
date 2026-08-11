import { useState } from "react";
import { Link } from "react-router-dom";
import { getAllPosts, getAllTags } from "../lib/posts";
import { paths } from "../routes";
import "../styles/pageShell.css";
import "../styles/blog.css";

/** 블로그 글 목록 + 태그 필터. 글은 src/posts/의 마크다운 파일에서 자동 생성됩니다. */
function BlogListPage() {
  const [activeTag, setActiveTag] = useState(null);
  const posts = getAllPosts();
  const tags = getAllTags();

  const visible = activeTag
    ? posts.filter((post) => post.tags.includes(activeTag))
    : posts;

  return (
    <div className="page-shell">
      <h1>Blog</h1>
      <p className="page-lead">
        공부한 내용과 작업 기록을 정리하는 공간입니다. 글은 마크다운 파일로 관리됩니다.
      </p>

      {tags.length ? (
        <div className="blog-tags" role="group" aria-label="태그 필터">
          <button
            type="button"
            className={`blog-tag ${activeTag === null ? "active" : ""}`}
            onClick={() => setActiveTag(null)}
          >
            전체 {posts.length}
          </button>
          {tags.map((tag) => (
            <button
              key={tag.name}
              type="button"
              className={`blog-tag ${activeTag === tag.name ? "active" : ""}`}
              onClick={() => setActiveTag(tag.name)}
            >
              {tag.name} {tag.count}
            </button>
          ))}
        </div>
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
          <p className="blog-empty">해당 태그의 글이 아직 없습니다.</p>
        ) : null}
      </div>
    </div>
  );
}

export default BlogListPage;
