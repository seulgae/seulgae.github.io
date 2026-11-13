import { Link } from "react-router-dom";
import { FiArrowUpRight, FiFileText } from "react-icons/fi";
import { paths } from "../routes";

export default function ProjectRelatedPosts({ posts = [], layout = "links", featuredFirst = false }) {
  if (!posts.length) return null;
  return (
    <nav className={`project-case-related${layout === "actions" ? " project-case-related-actions" : ""}${featuredFirst ? " project-case-related-featured" : ""}`} aria-label="관련 기술 글">
      {posts.map((post) => (
        <Link key={post.slug} to={paths.blogPost(post.slug)}>
          <FiFileText aria-hidden="true" />
          <span>{post.label}</span>
          <FiArrowUpRight aria-hidden="true" />
        </Link>
      ))}
    </nav>
  );
}
