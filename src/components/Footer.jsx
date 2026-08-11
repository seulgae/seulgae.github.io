import { Link } from "react-router-dom";
import { FaBlog, FaEnvelope, FaGithub, FaPhone } from "react-icons/fa";
import { paths } from "../routes";
import profile from "../data/profile";
import "../styles/footer.css";

/** 연락처·외부 링크·Architecture 문서 진입점을 모아 둔 푸터. (이전 사이드바 명함 역할) */
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
          <a href={profile.links.blog} target="_blank" rel="noopener noreferrer">
            <FaBlog aria-hidden="true" /> Tistory
          </a>
        </div>
        <div className="site-footer-meta">
          <span>
            © {new Date().getFullYear()} {profile.name} · {profile.role}
          </span>
          <Link to={paths.architecture}>이 사이트의 구조 문서 보기</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
