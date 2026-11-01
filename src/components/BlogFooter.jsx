import { FaEnvelope, FaGithub } from "react-icons/fa";
import profile from "../data/profile";
import "../styles/blogLayout.css";

/** 독립된 기술 블로그 전용 푸터. */
function BlogFooter() {
  return (
    <footer className="blog-footer">
      <div className="blog-footer-inner">
        <span>
          © {new Date().getFullYear()} {profile.name} 기술 블로그 · Powered by Markdown &amp; React
        </span>
        <div className="blog-footer-links">
          <a href={`mailto:${profile.email}`}>
            <FaEnvelope aria-hidden="true" /> {profile.email}
          </a>
          <a href={profile.links.github} target="_blank" rel="noopener noreferrer">
            <FaGithub aria-hidden="true" /> GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}

export default BlogFooter;
