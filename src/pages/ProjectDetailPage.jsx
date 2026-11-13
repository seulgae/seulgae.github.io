import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { findProjectBySlug } from "../data/projects";
import { projectStories } from "../data/projectStories";
import { ProjectWorkScope } from "../components/posters/ProjectsPoster";
import InlineProjectArchitecture from "../components/InlineProjectArchitecture";
import JeonseProjectDetail from "../components/JeonseProjectDetail";
import AbacusProjectDetail from "../components/AbacusProjectDetail";
import ProjectDetailLayout from "../components/ProjectDetailLayout";
import NotFoundPage from "./NotFoundPage";
import { paths } from "../routes";
import "../styles/projectDetail.css";
import "../styles/projectReading.css";

function ProjectDetailPage() {
  const { slug } = useParams();
  const project = findProjectBySlug(slug);
  const story = projectStories[slug];

  useEffect(() => {
    if (project) document.title = `${project.title} | 길태형 포트폴리오`;
  }, [project?.title]);

  if (!project || !story) {
    return <NotFoundPage message="요청한 프로젝트를 찾을 수 없습니다." />;
  }

  if (slug === "jeonse-support-system") return <ProjectDetailLayout key={slug} slug={slug}><JeonseProjectDetail project={project} /></ProjectDetailLayout>;
  if (project.companyId === "abacus") return <ProjectDetailLayout key={slug} slug={slug}><AbacusProjectDetail project={project} /></ProjectDetailLayout>;

  return (
    <article className="project-detail-page">
      <Link className="project-detail-back" to={paths.projectAnchor(
        project.companyId === "abacus" ? "lgu-billing-gw" : project.slug,
      )}>← 프로젝트 목록</Link>
      <header className="project-detail-header">
        <p className="project-detail-eyebrow">PROJECT CASE STUDY</p>
        <h1>{project.title}</h1>
        <p>{project.description}</p>
        <dl className="project-detail-meta">
          <div><dt>소속</dt><dd>{project.affiliation}</dd></div>
          <div><dt>기간</dt><dd>{project.period}</dd></div>
          <div><dt>역할</dt><dd>{project.role}</dd></div>
        </dl>
      </header>

      <nav className="project-star-nav" aria-label="프로젝트 상세 목차">
        <a href="#situation">S · 상황</a><a href="#task">T · 과제</a>
        <a href="#action">A · 행동</a><a href="#result">R · 결과</a>
      </nav>

      <section className="project-star-section" id="situation" aria-labelledby="situation-title">
        <span className="project-star-letter" aria-hidden="true">S</span>
        <div>
          <h2 id="situation-title">어떤 상황이었나요?</h2>
          {story.situation.map((line) => <p className="project-situation-line" key={line}>{line}</p>)}
        </div>
      </section>

      <section className="project-star-section" id="task" aria-labelledby="task-title">
        <span className="project-star-letter" aria-hidden="true">T</span>
        <div>
          <h2 id="task-title">무엇을 맡았나요?</h2><p>{story.task}</p>
          <table className="project-info-table">
            <caption>주요 담당 업무</caption>
            <tbody>
            {project.mainTasks.map((task, index) => (
              <tr key={task}><th scope="row">{story.taskLabels[index]}</th><td>{task}</td></tr>
            ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="project-star-section" id="action" aria-labelledby="action-title">
        <span className="project-star-letter" aria-hidden="true">A</span>
        <div>
          <h2 id="action-title">어떻게 해결했나요?</h2>
          {story.overviewFigureIds && (
            <InlineProjectArchitecture slug={project.slug} label="전체 시스템 구성" figureIds={story.overviewFigureIds} />
          )}
          <ProjectWorkScope project={project} showContext={false} showResults={false} />
        </div>
      </section>

      <section className="project-star-section" id="result" aria-labelledby="result-title">
        <span className="project-star-letter" aria-hidden="true">R</span>
        <div>
          <h2 id="result-title">무엇이 달라졌나요?</h2>
          <ul className="project-detail-results">{project.achievements.map((item) => (
            <li key={item.title}><h3>{item.title}</h3><p>{item.result}</p></li>
          ))}</ul>
        </div>
      </section>
      <Link className="project-detail-back" to={paths.section("projects")}>← 프로젝트 목록으로 돌아가기</Link>

    </article>
  );
}

export default ProjectDetailPage;
