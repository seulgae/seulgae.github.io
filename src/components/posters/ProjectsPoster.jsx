import { lazy, Suspense, useMemo, useRef, useState } from "react";
import { getCareerGroups } from "../../data/projects";
import { paths } from "../../routes";
import PosterHeading from "./PosterHeading";

const ArchitectureModal = lazy(() => import("../ArchitectureModal"));

function splitSkillTokens(skills) {
  return skills.flatMap((group) =>
    group.value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
  );
}

function ProjectTrackCard({ project, isGrouped, onOpenArchitecture }) {
  const triggerRef = useRef(null);
  const skillTokens = splitSkillTokens(project.skills);
  const isSiTrack = project.trackBadge === "SI 프로젝트";

  return (
    <article
      className={`project-track-card ${isGrouped ? "is-grouped" : ""}`}
      id={`project-${project.slug}`}
    >
      <header className="project-track-header">
        <div className="project-track-badges">
          {project.trackBadge ? (
            <span
              className={`project-track-badge ${isSiTrack ? "parallel" : "primary"}`}
            >
              {project.trackBadge}
            </span>
          ) : null}
          <span className="project-track-period">{project.period}</span>
          <span className="project-role-badge">{project.role}</span>
        </div>

        <h3 className="project-title-heading">{project.title}</h3>
        <p className="project-track-desc">{project.description}</p>
      </header>

      <div className="project-poster-content">
        <div className="project-skill-pills" aria-label="사용 기술">
          {skillTokens.map((token) => (
            <span key={token} className="project-skill-pill">
              {token}
            </span>
          ))}
        </div>

        <div className="project-content-block">
          <h4 className="project-block-label">주요 담당 업무</h4>
          <ul className="project-task-list">
            {project.mainTasks.map((task) => (
              <li key={task}>{task}</li>
            ))}
          </ul>
        </div>

        <div className="project-content-block">
          <h4 className="project-block-label">핵심 기술 성과 및 트러블슈팅</h4>
          <ul className="project-achievement-list">
            {project.achievements.map((ach) => {
              const relatedPosts = ach.relatedPosts || [];

              return (
                <li key={ach.title} className="project-achievement-card">
                  <div className="project-achievement-header">
                    <strong className="project-achievement-title">{ach.title}</strong>
                    {ach.result ? (
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
              );
            })}
          </ul>
        </div>

        <div className="project-arch-toggle-wrap">
          <button
            ref={triggerRef}
            type="button"
            className="project-arch-toggle-btn"
            aria-haspopup="dialog"
            onClick={() => onOpenArchitecture(project, triggerRef.current)}
          >
            <span>📊 시스템 아키텍처 &amp; 데이터 흐름 다이어그램</span>
            <span className="toggle-hint">팝업으로 보기 ↗</span>
          </button>
        </div>
      </div>
    </article>
  );
}

function ProjectsPoster() {
  const [modalState, setModalState] = useState({ project: null, trigger: null });
  const careerGroups = useMemo(() => getCareerGroups(), []);

  const handleOpenArchitecture = (project, trigger) => {
    setModalState({ project, trigger });
  };

  const handleCloseArchitecture = () => {
    const triggerEl = modalState.trigger;
    setModalState({ project: null, trigger: null });
    window.requestAnimationFrame(() => {
      triggerEl?.focus();
    });
  };

  return (
    <section
      id="projects"
      className="poster-section"
      aria-labelledby="projects-poster-title"
    >
      <PosterHeading
        index="02"
        titleId="projects-poster-title"
        title="Project Experience"
        helpText="소속 회사·부서 기준으로 수행한 프로젝트 이력입니다. 시스템 아키텍처는 전용 팝업창에서 넓은 화면으로 확인할 수 있으며, 기술 블로그 버튼은 상세 회고(새 탭)로 연결됩니다."
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
                    onOpenArchitecture={handleOpenArchitecture}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {modalState.project ? (
        <Suspense fallback={<p role="status">아키텍처를 불러오는 중입니다.</p>}>
          <ArchitectureModal
            project={modalState.project}
            onClose={handleCloseArchitecture}
          />
        </Suspense>
      ) : null}
    </section>
  );
}

export default ProjectsPoster;
