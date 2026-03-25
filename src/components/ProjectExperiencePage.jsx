import React from "react";
import "../styles/projectsList.css";

function splitTitle(text) {
  const bracketIndex = text.indexOf("(");

  if (bracketIndex === -1) {
    return { main: text, sub: "" };
  }

  return {
    main: text.slice(0, bracketIndex).trimEnd(),
    sub: text.slice(bracketIndex).trim(),
  };
}

function ProjectTitle({ text }) {
  const { main, sub } = splitTitle(text);

  return (
    <h2 className="project-title">
      <span>{main}</span>
      {sub ? <span className="project-title-sub">{sub}</span> : null}
    </h2>
  );
}

function ProjectExperiencePage({ title = "프로젝트 경험", projects = [] }) {
  return (
    <div className="projects-container">
      <h1>{title}</h1>
      {projects.map((project) => (
        <article key={project.projectName} className="project">
          <div className="project-header">
            <div>
              <span className="project-eyebrow">Project</span>
              <ProjectTitle text={project.projectName} />
              {project.description && <p className="project-description">{project.description}</p>}
            </div>
            <div className="project-meta">
              <div className="meta-card">
                <span className="meta-label">기간 / 역할</span>
                <strong>{project.periodAndRole}</strong>
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
              <ul className="project-list">
                {project.achievements.map((achievement) => {
                  const item =
                    typeof achievement === "string"
                      ? { text: achievement, href: "" }
                      : achievement;

                  return (
                    <li key={item.text}>
                      {item.href ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="achievement-link"
                        >
                          {item.text}
                        </a>
                      ) : (
                        item.text
                      )}
                    </li>
                  );
                })}
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
      ))}
    </div>
  );
}

export default ProjectExperiencePage;
