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
        helpText="담당할 수 있는 업무와 프로젝트 경험, 사용 기술을 정리했습니다."
      />

      <div className="skill-matrix-grid">
        {profile.skillCompetencies.map((group) => (
          <article key={group.category} className="skill-matrix-card">
            <h3>{group.category}</h3>
            <p className="skill-matrix-summary">{group.summary}</p>
            <div className="skill-matrix-evidence">
              <strong>주요 수행 업무</strong>
              <p>{group.evidence}</p>
            </div>
            <div className="skill-tech-stack">
              <span className="skill-tech-label">사용 기술</span>
              <div className="tech-grid">
                {group.items.map((tag) => (
                  <span key={tag} className="tech-item">{tag}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default SkillsPoster;
