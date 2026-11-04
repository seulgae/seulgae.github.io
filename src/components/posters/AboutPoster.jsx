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
            성능과 안정성을 실질적인 개선으로 증명하는
          </span>{" "}
          <span className="hero-title-line">
            백엔드 개발자 {profile.name}입니다.
          </span>
        </h1>
        <p className="hero-subtitle hero-background">
          {background.split(/(?<=\.)\s+/).map((sentence) => (
            <span key={sentence} className="hero-intro-sentence">
              {sentence.split(/(약 \d+년 \d+개월|API·조회 SQL|데이터 정합성)/).map((part, index) => (
                <span key={index} className={index % 2 ? "hero-intro-unit" : undefined}>
                  {part}
                </span>
              ))}
            </span>
          ))}
        </p>
        <div className="hero-story-grid">
          <div className="hero-story">
            <span className="hero-story-label">HOW I WORK</span>
            <h2>원인을 찾고, 함께 개선합니다.</h2>
            <p>{strength}</p>
          </div>
          <div className="hero-story hero-story-direction">
            <span className="hero-story-label">WHERE I’M HEADED</span>
            <h2>설계부터 완성까지 참여하는 개발자</h2>
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
