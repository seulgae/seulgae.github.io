import profile from "../../data/profile";
import { paths } from "../../routes";
import PosterHeading from "./PosterHeading";
import { FiCode, FiActivity, FiShield } from "react-icons/fi";
import { useEffect, useRef } from "react";

const competencyVisuals = {
  "Back-End": { Icon: FiCode, label: "BUSINESS LOGIC · API" },
  "Database / Cache": { Icon: FiActivity, label: "DATABASE · PERFORMANCE" },
  "Infra / Tools": { Icon: FiShield, label: "RELIABILITY · SECURITY" },
};

function SkillsPoster() {
  const pendingHighlight = useRef(null);
  const activeHighlight = useRef(null);

  useEffect(() => () => {
    pendingHighlight.current?.();
    activeHighlight.current?.cancel();
  }, []);

  const revealAchievement = (event, anchor) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const target = document.getElementById(anchor);
    if (!target) return;
    event.preventDefault();
    pendingHighlight.current?.();
    activeHighlight.current?.cancel();
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    let timer;
    const cleanup = () => {
      window.clearTimeout(timer);
      document.removeEventListener("scrollend", highlight);
    };
    const highlight = () => {
      cleanup();
      pendingHighlight.current = null;
      if (!target.animate) return;
      const style = window.getComputedStyle(target);
      activeHighlight.current = target.animate([
        { backgroundColor: "var(--accent-soft)", borderColor: "var(--accent)", boxShadow: "0 0 0 3px var(--accent-border)", offset: 0 },
        { backgroundColor: "var(--accent-soft)", borderColor: "var(--accent)", boxShadow: "0 0 0 3px var(--accent-border)", offset: 0.3 },
        { backgroundColor: style.backgroundColor, borderColor: style.borderColor, boxShadow: "0 0 0 0 transparent", offset: 1 },
      ], { duration: reducedMotion ? 0 : 1800, easing: "ease-out" });
    };
    pendingHighlight.current = cleanup;
    document.addEventListener("scrollend", highlight, { once: true });
    target.scrollIntoView({ behavior: reducedMotion ? "instant" : "smooth", block: "start" });
    timer = window.setTimeout(highlight, reducedMotion ? 0 : 900);
  };

  return (
    <section
      id="skills"
      className="poster-section"
      aria-labelledby="skills-poster-title"
    >
      <PosterHeading
        index="01"
        titleId="skills-poster-title"
        title="Core Skills & Competency"
        helpText="API·비즈니스 로직 개발, 조회 성능 개선, 운영 안정성·보안 개선의 세 가지 역량과 주요 수행 업무를 요약했습니다. 관련 사례는 각 카드의 링크에서 확인할 수 있습니다."
      />

      <div className="skill-matrix-grid">
        {profile.skillCompetencies.map((group) => {
          const { Icon, label } = competencyVisuals[group.resumeLabel];
          return (
          <article key={group.category} className="skill-matrix-card">
            <header className="skill-card-heading">
              <span className="skill-card-icon" aria-hidden="true"><Icon /></span>
              <div>
                <span className="skill-card-eyebrow">{label}</span>
                <h3>{group.category}</h3>
              </div>
            </header>
            <p className="skill-matrix-summary">{group.summary}</p>
            <div className="skill-matrix-evidence">
              <strong>주요 수행 업무</strong>
              <p>{group.evidence}</p>
              {group.categoryLink && (
                <div className="project-evidence-links skill-blog-links">
                  <a className="evidence-chip blog-chip" href={`${paths.blog}?category=${group.categoryLink.category}`} target="_blank" rel="noopener noreferrer">
                    📝 {group.categoryLink.label} ↗
                  </a>
                </div>
              )}
              {group.detailAnchor && (
                <div className="project-evidence-links skill-blog-links">
                  <a className="evidence-chip blog-chip" href={`#${group.detailAnchor}`} onClick={(event) => revealAchievement(event, group.detailAnchor)}>
                    📊 조회 성능 개선 사례 ↘
                  </a>
                </div>
              )}
              {group.blogLinks && (
                <div className="project-evidence-links skill-blog-links">
                  {group.blogLinks.map((post) => (
                    <a key={post.slug} href={paths.blogPost(post.slug)} target="_blank" rel="noopener noreferrer" className="evidence-chip blog-chip">
                      📝 {post.label} ↗
                    </a>
                  ))}
                </div>
              )}
            </div>
          </article>
          );
        })}
      </div>
    </section>
  );
}

export default SkillsPoster;
