import { Fragment, useMemo } from "react";
import { Link } from "react-router-dom";
import { getCareerGroups } from "../../data/projects";
import InlineProjectArchitecture from "../InlineProjectArchitecture";
import { paths } from "../../routes";
import PosterHeading from "./PosterHeading";

function splitSkillTokens(skills) {
  return [...new Set(skills.flatMap((group) =>
    group.value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
  ))];
}

export function ProjectWorkScope({ project, showContext = true, showResults = true }) {
  return (
      <div className="project-poster-content">
        {showContext && <div className="project-technology-groups" aria-label="사용 기술">
          {project.skills.map((group) => (
            <div key={group.label} className="project-technology-row">
              <span className="project-technology-label">{group.label}</span>
              {group.label === "핵심 기술" ? (
                <div className="project-skill-pills">
                  {splitSkillTokens([group]).map((token) => (
                    <span key={token} className="project-skill-pill">{token}</span>
                  ))}
                </div>
              ) : (
                <p className="project-technology-context">{group.value.split(",").map((token) => token.trim()).join(" · ")}</p>
              )}
            </div>
          ))}
        </div>}

        {showContext && <div className="project-content-block">
          <h4 className="project-block-label">주요 담당 업무</h4>
          <ul className="project-task-list">
            {project.mainTasks.map((task) => (
              <li key={task}>{task}</li>
            ))}
          </ul>
        </div>}

        <div className="project-content-block">
          <h4 className="project-block-label">핵심 기술 성과 및 트러블슈팅</h4>
          <ul className="project-achievement-list">
            {project.achievements.map((ach) => {
              const relatedPosts = ach.relatedPosts || [];

              return (
                <Fragment key={ach.title}>
                  {ach.architectureSlug && (
                    <li className="project-architecture-item">
                    <InlineProjectArchitecture
                      slug={ach.architectureSlug}
                      figureIds={ach.architectureFigures}
                      label={ach.architectureLabel || (ach.architectureSlug === "lgu-billing-gw" ? "Kafka GW" : "플랫폼 고도화")}
                    />
                    </li>
                  )}

                <li className="project-achievement-card" id={ach.anchorId}>
                  <div className="project-achievement-header">
                    <strong className="project-achievement-title">{ach.title}</strong>
                    {showResults && ach.result ? (
                      <span className="project-achievement-result">{ach.result}</span>
                    ) : null}
                  </div>
                  {ach.detail ? (
                    <p className="project-achievement-detail">{ach.detail}</p>
                  ) : null}

                  {relatedPosts.length > 0 || ach.references?.length > 0 ? (
                    <div className="project-evidence-links">
                      {relatedPosts.map((post) => (
                        <a
                          key={post.slug}
                          href={paths.blogPost(post.slug)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="evidence-chip blog-chip"
                        >
                          📝 기술 블로그: {post.label} ↗
                        </a>
                      ))}
                      {ach.references?.map((ref) => (
                        <a
                          key={ref.href}
                          href={ref.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="evidence-chip news-chip"
                        >
                          📰 관련 보도: {ref.text} ↗
                        </a>
                      ))}
                    </div>
                  ) : null}
                </li>
                </Fragment>
              );
            })}
          </ul>
        </div>

        {!project.workScopes && !project.achievements.some((item) => item.architectureSlug === project.slug) && (
          <InlineProjectArchitecture slug={project.slug} label="프로젝트" />
        )}
      </div>
  );
}

function ProjectTrackCard({ project, isGrouped }) {
  return (
    <article className={`project-track-card ${isGrouped ? "is-grouped" : ""}`} id={`project-${project.slug}`}>
      <header className="project-track-header">
        <div className="project-track-badges">
          {project.trackBadge && <span className="project-track-badge primary">{project.trackBadge}</span>}
          <span className="project-track-period">{project.period}</span>
          <span className="project-role-badge">{project.role}</span>
        </div>
        <h3 className="project-title-heading">{project.title}</h3>
        <p className="project-track-desc">{project.description}</p>
      </header>
      {project.workScopes && <span id="project-cloudxper-billing" className="project-anchor-alias" aria-hidden="true" />}
      <h4 className="project-summary-heading">요약 성과</h4>
      <ul className="project-summary-results" aria-label="대표 성과">
        {project.achievements.map((achievement) => (
          <li key={achievement.title} id={achievement.anchorId} className="project-achievement-card">
            <strong>{achievement.title}</strong>
            <span>{achievement.result}</span>
          </li>
        ))}
      </ul>
      <Link className="project-detail-link" to={paths.projectDetail(project.slug)}>
        상세 보기 <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}

function ProjectsPoster() {
  const careerGroups = useMemo(() => getCareerGroups({ splitProjects: true }), []);

  return (
    <section
      id="projects"
      className="poster-section"
      aria-labelledby="projects-poster-title"
    >
      <PosterHeading
        index="01"
        titleId="projects-poster-title"
        title="Project Experience"
        helpText="회사별 프로젝트의 담당 역할, 사용 기술과 대표 성과를 요약했습니다. 각 카드의 상세 보기에서 주요 기능, 아키텍처와 문제 해결 사례를 확인할 수 있습니다."
      />

      <div className="career-group-list">
        {careerGroups.map((group) => {
          const isMultiTrack = group.projects.length > 1;

          return (
            <div key={group.companyId} className="career-company-group">
              <aside className="career-company-meta">
                <span className="project-period">{group.period}</span>
                <div className="career-affiliation">
                  <strong className="career-company-name">{group.company}</strong>
                  <span className="career-affiliation-sep" aria-hidden="true">
                    |
                  </span>
                  <span className="career-team-name">{group.team}</span>
                </div>
                {group.summary ? (
                  <p className="project-desc">{group.summary}</p>
                ) : null}

                {isMultiTrack ? (
                  <div className="career-track-summary">
                    <span className="career-track-summary-label">
                      수행 프로젝트
                    </span>
                    <ul
                      className="career-track-nav"
                      aria-label={`${group.affiliation} 수행 프로젝트`}
                    >
                      {group.projects.map((proj, index) => (
                        <li key={proj.slug}>
                          <a
                            href={`#project-${proj.slug}`}
                            className="career-track-jump"
                          >
                            <span className="track-num">0{index + 1}</span>
                            <span className="track-jump-text">{proj.title}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </aside>

              <div className="career-tracks-column">
                {group.projects.map((project) => (
                  <ProjectTrackCard
                    key={project.slug}
                    project={project}
                    isGrouped={isMultiTrack}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}

export default ProjectsPoster;
