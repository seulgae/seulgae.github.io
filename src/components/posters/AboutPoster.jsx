import { Link } from "react-router-dom";
import profile, { getBirthLabel } from "../../data/profile";
import { paths } from "../../routes";

function AboutPoster() {
  const [background, strength, direction] = profile.intro.split("\n\n");
  return (
    <section
      id="about"
      className="poster-section hero-poster"
      aria-label="개발자 소개"
    >
      <div className="hero-identity">
        {/*
        <span className="eyebrow">
          {profile.role} · {profile.badge} ({profile.careerSummary})
        </span>
        */}
        <h1 className="hero-title">
          <span className="hero-title-line">
            결과를 단순히 구현하는 데 그치지 않고,
          </span>{" "}
          <span className="hero-title-line">
            측정 가능한 성과로 검증하는 개발자 {profile.name}입니다.
          </span>
        </h1>
        <div className="hero-background">
          {background.split("\n").map((line) => (
            <p key={line} className="hero-subtitle">{line}</p>
          ))}
        </div>
        <div className="hero-story-grid">
          <div className="hero-story">
            <span className="hero-story-label">주요 작업 방식</span>
            <h2>문제의 원인을 분석하고, 개선 효과를 검증합니다.</h2>
            <p>{strength}</p>
          </div>
          <div className="hero-story hero-story-direction">
            <span className="hero-story-label">커리어 최종 목표</span>
            <h2>서비스의 성능과 안정성을 높이는 시니어 백엔드 엔지니어</h2>
            <p>{direction}</p>
          </div>
        </div>

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

    </section>
  );
}

export default AboutPoster;
