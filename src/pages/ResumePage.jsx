import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import profile from "../data/profile";
import projects from "../data/projects";
import education from "../data/education";
import awards from "../data/awards";
import licenses from "../data/licenses";
import { assetUrl } from "../utils/text";
import "../styles/resume.css";

/**
 * A4 표지와 경력 상세로 구성한 출력용 이력서.
 * 모든 내용을 data/에서 가져오므로, 웹 화면과 이력서 내용이 어긋날 수 없습니다.
 * 성과 항목은 각 achievement의 result(결과 한 줄)를 그대로 사용합니다.
 */

// A4 한 장에 들어가는 분량 기준으로 정한 값입니다. 내용이 늘면 이 숫자만 조정하세요.
const PROJECTS_ON_FIRST_PAGE = 2;

const pages = [
  projects.slice(0, PROJECTS_ON_FIRST_PAGE),
  projects.slice(PROJECTS_ON_FIRST_PAGE),
];

function CareerEntry({ project, number, includeTools = false }) {
  const stack = project.skills
    .filter((group) => includeTools || group.label !== "개발 도구")
    .map((group) => group.value)
    .join(", ")
    .split(",")
    .map((token) => token.trim())
    .join(" · ");
  return (
    <article className="resume-career-entry">
      <div className="resume-career-title">
        <span className="resume-career-number">{String(number).padStart(2, "0")}</span>
        <h3>{project.title}</h3>
      </div>
      <div className="resume-career-meta">
        <strong>{project.company}</strong>
        <span>{project.period}</span>
        <span>{project.role}{project.team ? ` | ${project.team}` : ""}</span>
      </div>
      <p className="resume-career-stack"><strong>STACK</strong><span>{stack}</span></p>
      <p className="resume-career-description">{project.description}</p>
      <div className="resume-career-key-result">
        <strong>KEY RESULT</strong><p>{project.resumeKeyResult || project.achievements[0]?.result}</p>
      </div>
      <ul className="resume-career-achievements">
        {project.achievements.map((achievement) => (
          <li key={achievement.title}>
            <h4>{achievement.title}</h4>
            <p>{achievement.detail}</p>
            <p className="resume-career-result"><span aria-hidden="true">→ </span>{achievement.result}</p>
          </li>
        ))}
      </ul>
    </article>
  );
}

function ResumePage() {
  const cover = profile.resumeCover;
  const [printMode, setPrintMode] = useState("color");

  useEffect(() => {
    const resetPrintMode = () => setPrintMode("color");
    window.addEventListener("afterprint", resetPrintMode);
    return () => window.removeEventListener("afterprint", resetPrintMode);
  }, []);

  const printResume = (mode) => {
    flushSync(() => setPrintMode(mode));
    window.print();
  };

  return (
    <div className="resume-print-page" data-print-mode={printMode}>
      <div className="resume-print-toolbar">
        <div>
          <strong>출력용 이력서</strong>
          <span>
            소개와 경력기술서를 A4 3장으로 정리했습니다. 인쇄하거나 PDF로 저장할 수 있습니다.
          </span>
        </div>
        <div className="resume-print-actions">
          <button
            type="button"
            className="resume-print-button"
            onClick={() => printResume("color")}
          >
            인쇄하기
          </button>
          <button
            type="button"
            className="resume-print-button resume-print-button-monochrome"
            onClick={() => printResume("monochrome")}
          >
            흑백으로 인쇄
          </button>
        </div>
      </div>

      <section className="resume-paper resume-cover" aria-label="이력서 첫 장">
        <header className="resume-cover-header">
          <div className="resume-cover-identity">
            <p className="resume-cover-eyebrow">Wise Developer</p>
            <h1>{profile.name}</h1>
            <div className="resume-cover-message">
              <p className="resume-cover-tagline">{cover.tagline}</p>
              <p className="resume-cover-role">{cover.role}</p>
            </div>
          </div>
          <div className="resume-cover-portrait-frame">
            <img className="resume-cover-portrait" src={assetUrl(cover.image)}
              alt={`${profile.name} 증명사진`} width="160" height="214" />
          </div>
        </header>

        <dl className="resume-cover-meta">
          <div><dt>BIRTH</dt><dd>{profile.birthDate.replaceAll("-", ".")}</dd></div>
          <div><dt>EXPERIENCE</dt><dd>{profile.careerSummary.replace(/^약\s*/, "")}</dd></div>
          <div><dt>PORTFOLIO</dt><dd><a href={profile.links.portfolio}>{profile.links.portfolio.replace(/^https?:\/\//, "")}</a></dd></div>
        </dl>

        <section className="resume-cover-section" aria-labelledby="resume-about-title">
          <h2 id="resume-about-title">ABOUT</h2>
          <h3>{cover.heading}</h3>
          <div className="resume-cover-prose">
            {cover.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </section>

        <section className="resume-cover-section resume-cover-stack" aria-labelledby="resume-stack-title">
          <h2 id="resume-stack-title">TECH STACK</h2>
          <dl>
            {cover.techStack.map(([label, value]) => (
              <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
            ))}
          </dl>
        </section>
        <footer className="resume-page-number" aria-label="1 / 3 페이지">1 / 3</footer>
      </section>

      <section className="resume-paper resume-career-page page-break" aria-label="이력서 두 번째 장">
        <header className="resume-career-header">
          <h2>경력기술서</h2>
          <p className="resume-career-person"><strong>{profile.name}</strong><span>Developer</span></p>
          <p className="resume-career-person-meta">생년월일 {profile.birthDate.replaceAll("-", ".")}<span aria-hidden="true"> | </span>총 경력 {profile.careerSummary.replace(/^약\s*/, "")}</p>
        </header>
        <section aria-labelledby="resume-work-title">
          <h2 className="resume-work-title" id="resume-work-title">WORK EXPERIENCE <span>경력 사항</span></h2>
          {pages[0].map((project, index) => (
            <CareerEntry key={project.slug} project={project} number={index + 1} />
          ))}
        </section>
        <footer className="resume-page-number" aria-label="2 / 3 페이지">2 / 3</footer>
      </section>

      <section className="resume-paper resume-career-page resume-credentials-page page-break" aria-label="이력서 세 번째 장">
        {pages[1].map((project, index) => (
          <CareerEntry key={project.slug} project={project} number={PROJECTS_ON_FIRST_PAGE + index + 1} includeTools />
        ))}

        <section className="resume-record-section resume-awards" aria-labelledby="resume-awards-title">
          <h2 id="resume-awards-title">AWARDS</h2>
          {awards.map((item) => (
            <article className="resume-record-entry" key={item.id}>
              <div className="resume-record-title"><h3>{item.title}</h3><span>{item.date}</span></div>
              <p>{item.description}</p>
            </article>
          ))}
        </section>

        <div className="resume-credentials-grid">
          <section className="resume-record-section" aria-labelledby="resume-certification-title">
            <h2 id="resume-certification-title">CERTIFICATION</h2>
            {licenses.map((item) => (
              <article className="resume-record-entry" key={item.id}>
                <div className="resume-record-title"><h3>{item.title}</h3><span>{item.date}</span></div>
                <p>{item.description}</p>
              </article>
            ))}
          </section>
          <section className="resume-record-section" aria-labelledby="resume-education-title">
            <h2 id="resume-education-title">EDUCATION</h2>
            {education.map((item) => (
              <article className="resume-record-entry" key={item.id}>
                <div className="resume-record-title"><h3>{item.degree}</h3><span>{item.period}</span></div>
                <p>{item.school} · {item.summary}</p>
              </article>
            ))}
          </section>
        </div>

        <footer className="resume-portfolio-footer">
          <strong>PORTFOLIO</strong>
          <a href={profile.links.portfolio}>{profile.links.portfolio.replace(/^https?:\/\//, "")}</a>
          <span>{profile.name} · {profile.role}</span>
        </footer>
        <div className="resume-page-number" aria-label="3 / 3 페이지">3 / 3</div>
      </section>
    </div>
  );
}

export default ResumePage;
