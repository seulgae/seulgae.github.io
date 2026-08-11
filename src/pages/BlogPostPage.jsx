import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import NotFoundPage from "./NotFoundPage";
import { findPostBySlug } from "../lib/posts";
import { paths } from "../routes";
import "../styles/pageShell.css";
import "../styles/blog.css";

/** 블로그 글 상세. 마크다운 본문을 GFM(표·체크리스트 포함) 문법으로 렌더링합니다. */
function BlogPostPage() {
  const { slug } = useParams();
  const post = findPostBySlug(slug);

  if (!post) {
    return <NotFoundPage message="요청한 글을 찾을 수 없습니다." />;
  }

  return (
    <div className="page-shell blog-post-shell">
      <Link to={paths.blog} className="page-back-link">
        ← 글 목록
      </Link>

      <article className="blog-post">
        <header className="blog-post-header">
          <h1>{post.title}</h1>
          <div className="blog-post-meta">
            <time dateTime={post.date}>{post.date}</time>
            {post.tags.map((tag) => (
              <span key={tag} className="blog-post-tag">
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="blog-prose">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
        </div>
      </article>
    </div>
  );
}

export default BlogPostPage;
