import { splitBracketTitle } from "../utils/text";
import "../styles/pageShell.css";
import "../styles/projectDetail.css";

function ProjectTitle({ text }) {
  const { main, sub } = splitBracketTitle(text);

  return (
    <h2 className="project-title">
      <span>{main}</span>
      {sub ? <span className="project-title-sub">{sub}</span> : null}
    </h2>
  );
}

function AchievementItem({ achievement }) {
  return (
    <li className="achievement-item">
      <strong className="achievement-title">{achievement.title}</strong>
      {achievement.detail ? (
        <p className="achievement-detail">{achievement.detail}</p>
      ) : null}
      {achievement.result ? (
        <p className="achievement-result">→ {achievement.result}</p>
      ) : null}
      {achievement.references?.length ? (
        <div className="achievement-references">
          <span>참고 기사 ↗</span>
          {achievement.references.map((reference) => (
            <a
              key={reference.href}
              href={reference.href}
              target="_blank"
              rel="noopener noreferrer"
              className="achievement-link"
            >
              {reference.text}
            </a>
          ))}
        </div>
      ) : null}
    </li>
  );
}

/** 프로젝트 한 건의 상세 화면. data/projects.js의 항목 하나를 그대로 받습니다. */
function ProjectDetail({ project }) {
  return (
    <div className="page-shell">
      <h1>프로젝트 경험</h1>
      <article className="project">
        <div className="project-header">
          <div>
            <span className="project-eyebrow">Project</span>
            <ProjectTitle text={project.title} />
            {project.description ? (
              <p className="project-description">{project.description}</p>
            ) : null}
          </div>
          <div className="project-meta">
            <div className="meta-card">
              <span className="meta-label">기간 / 역할</span>
              <strong>
                {project.period} / {project.role}
              </strong>
            </div>
          </div>
        </div>

        <div className="project-section-grid">
          <section className="project-block accent-block">
            <h3>주요 업무</h3>
            <ul className="project-list">
              {project.mainTasks.map((task) => (
                <li key={task}>{task}</li>
              ))}
            </ul>
          </section>

          <section className="project-block">
            <h3>주요 성과</h3>
            <ul className="project-list achievement-list">
              {project.achievements.map((achievement) => (
                <AchievementItem key={achievement.title} achievement={achievement} />
              ))}
            </ul>
          </section>
        </div>

        <div className="tech-stack-shell">
          <h3>보유 기술</h3>
          <div className="tech-stack-grid">
            {project.skills.map((skillGroup) => (
              <div key={skillGroup.label} className="tech-stack-card">
                <span className="meta-label">{skillGroup.label}</span>
                <p>{skillGroup.value}</p>
              </div>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}

export default ProjectDetail;
