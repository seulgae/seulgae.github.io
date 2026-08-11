import { Link } from "react-router-dom";
import projects from "../data/projects";
import { paths } from "../routes";
import "../styles/pageShell.css";
import "../styles/projectsIndex.css";

/** 프로젝트 목록. 무엇을 먼저 볼지 판단할 수 있는 개요 카드를 제공합니다. */
function ProjectsIndexPage() {
  return (
    <div className="page-shell">
      <h1>Projects</h1>
      <p className="page-lead">
        운영 안정화·성능 개선·보안 강화를 중심으로 진행한 프로젝트들입니다. 카드를 누르면
        상세 업무와 성과를 볼 수 있습니다.
      </p>

      <div className="project-index-list">
        {projects.map((project) => (
          <Link
            key={project.slug}
            to={paths.project(project.slug)}
            className="project-index-card"
          >
            <div className="project-index-head">
              <h2>{project.shortTitle || project.title}</h2>
              <span className="project-index-period">
                {project.period} · {project.role}
              </span>
            </div>
            <p className="project-index-description">{project.description}</p>
            <div className="project-index-results">
              {project.achievements.slice(0, 2).map((achievement) => (
                <span key={achievement.title} className="project-index-result">
                  {achievement.result}
                </span>
              ))}
            </div>
            <span className="project-index-more">자세히 보기 →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProjectsIndexPage;
