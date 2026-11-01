import { FaBlog, FaEnvelope, FaGithub, FaPhone } from "react-icons/fa";
import { paths } from "../routes";
import profile from "../data/profile";
import "../styles/footer.css";

/** 연락처·외부 링크를 모아 둔 포트폴리오 전용 푸터. */
function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-contact">
          <a href={`tel:${profile.phone.replace(/-/g, "")}`}>
            <FaPhone aria-hidden="true" /> {profile.phone}
          </a>
          <a href={`mailto:${profile.email}`}>
            <FaEnvelope aria-hidden="true" /> {profile.email}
          </a>
          <a href={profile.links.github} target="_blank" rel="noopener noreferrer">
            <FaGithub aria-hidden="true" /> GitHub
          </a>
          <a href={paths.blog} target="_blank" rel="noopener noreferrer">
            <FaBlog aria-hidden="true" /> Tech Blog
          </a>
        </div>
        <div className="site-footer-meta">
          <span>
            © {new Date().getFullYear()} {profile.name} · {profile.role}
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
