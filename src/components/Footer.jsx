import { FaBlog, FaEnvelope, FaGithub, FaHome } from "react-icons/fa";
import { paths } from "../routes";
import profile from "../data/profile";
import "../styles/footer.css";

/** 연락처·외부 링크를 모아 둔 공용 푸터. */
function Footer({ isBlog = false }) {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-contact">
          <a href={`mailto:${profile.email}`}>
            <FaEnvelope aria-hidden="true" /> {profile.email}
          </a>
          <a href={profile.links.github} target="_blank" rel="noopener noreferrer">
            <FaGithub aria-hidden="true" /> GitHub
          </a>
          <a
            href={isBlog ? paths.home : paths.blog}
            target="_blank"
            rel="noopener noreferrer"
          >
            {isBlog ? <FaHome aria-hidden="true" /> : <FaBlog aria-hidden="true" />}
            {isBlog ? "Portfolio" : "Tech Blog"}
          </a>
        </div>
        <div className="site-footer-meta">
          <span>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </span>
          <span>Designed &amp; Developed by {profile.name}</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
