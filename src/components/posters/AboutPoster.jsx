import { Link } from "react-router-dom";
import profile, { getBirthLabel } from "../../data/profile";
import { paths } from "../../routes";

function AboutPoster() {
  return (
    <section
      id="about"
      className="poster-section hero-poster"
      aria-label="소개 및 핵심 성과 지표"
    >
      <div className="hero-identity">
        <span className="eyebrow">
          {profile.role} · {profile.badge} ({profile.careerSummary})
        </span>
        <h1 className="hero-title">
          복잡한 운영 이슈를 구조적으로 해결하는
          <br />
          백엔드 개발자 {profile.name}입니다.
        </h1>
        <p className="hero-subtitle">{profile.intro}</p>

        <ul className="hero-strength-list">
          {profile.strengths.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div className="hero-contact-bar">
          <a href={`mailto:${profile.email}`} className="contact-pill">
            ✉️ {profile.email}
          </a>
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-pill"
          >
            💻 GitHub (@seulgae) ↗
          </a>
          <a
            href={paths.blog}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-pill primary"
          >
            📚 기술 블로그 ↗
          </a>
          <Link to={paths.resume} className="contact-pill">
            🖨️ 출력용 이력서 (A4)
          </Link>
          <span className="contact-meta">{getBirthLabel()}</span>
        </div>
      </div>

      <div className="kpi-grid" aria-label="핵심 성과 지표">
        {profile.kpiMetrics.map((kpi) => (
          <a
            key={kpi.label}
            href={paths.blogPost(kpi.postSlug)}
            target="_blank"
            rel="noopener noreferrer"
            className="kpi-card"
          >
            <strong className="kpi-value">{kpi.value}</strong>
            <span className="kpi-label">{kpi.label}</span>
            <span className="kpi-detail">{kpi.detail} ↗</span>
          </a>
        ))}
      </div>
    </section>
  );
}

export default AboutPoster;
