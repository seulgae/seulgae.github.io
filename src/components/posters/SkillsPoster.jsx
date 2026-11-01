import profile from "../../data/profile";
import PosterHeading from "./PosterHeading";

function SkillsPoster() {
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
        helpText="실무 프로젝트에서 직접 문제를 진단하고 수치로 개선을 증명한 핵심 기술 역량입니다."
      />

      <div className="skill-matrix-grid">
        {profile.skillCompetencies.map((group) => (
          <article key={group.category} className="skill-matrix-card">
            <h3>{group.category}</h3>
            <p className="skill-matrix-summary">{group.summary}</p>
            <div className="tech-grid">
              {group.items.map((tag) => (
                <span key={tag} className="tech-item">
                  {tag}
                </span>
              ))}
            </div>
            <p className="skill-matrix-evidence">
              <strong>실무 적용:</strong> {group.evidence}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default SkillsPoster;
