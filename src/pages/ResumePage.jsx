import profile, { getBirthLabel } from "../data/profile";
import projects from "../data/projects";
import education from "../data/education";
import awards from "../data/awards";
import licenses from "../data/licenses";
import "../styles/resume.css";

/**
 * A4 2장 출력용 이력서.
 * 모든 내용을 data/에서 가져오므로, 웹 화면과 이력서 내용이 어긋날 수 없습니다.
 * 성과 항목은 각 achievement의 result(결과 한 줄)를 그대로 사용합니다.
 */

// A4 한 장에 들어가는 분량 기준으로 정한 값입니다. 내용이 늘면 이 숫자만 조정하세요.
const PROJECTS_ON_FIRST_PAGE = 2;

const pages = [
  projects.slice(0, PROJECTS_ON_FIRST_PAGE),
  projects.slice(PROJECTS_ON_FIRST_PAGE),
];

function ProjectEntry({ project }) {
  return (
    <article className="resume-project-entry">
      <div className="resume-project-title-row">
        <h3>{project.title}</h3>
        <span>
          {project.period} / {project.role}
        </span>
      </div>
      <table className="resume-table resume-project-table">
        <tbody>
          <tr>
            <th scope="row">주요 업무</th>
            <td>
              <ul className="resume-doc-list compact">
                {project.mainTasks.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </td>
          </tr>
          <tr>
            <th scope="row">주요 성과</th>
            <td>
              <ul className="resume-doc-list compact">
                {project.achievements.map((achievement) => (
                  <li key={achievement.title}>{achievement.result}</li>
                ))}
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </article>
  );
}

function LabelValueTable({ rows }) {
  return (
    <table className="resume-table">
      <tbody>
        {rows.map(([label, value]) => (
          <tr key={label}>
            <th scope="row">{label}</th>
            <td>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function ResumePage() {
  const profileRows = [
    ["이름", profile.name],
    ["생년월일", getBirthLabel()],
    ["직무", profile.role],
    ["경력", profile.careerSummary],
    ["핵심 키워드", profile.keywords],
    ["연락처", `${profile.phone} / ${profile.email}`],
    [
      "링크",
      `${profile.links.github.replace(/^https?:\/\//, "")} / ${profile.links.blog
        .replace(/^https?:\/\//, "")
        .replace(/\/$/, "")}`,
    ],
  ];

  const techRows = profile.techStack.map((group) => [
    group.label,
    group.items.join(", "),
  ]);

  return (
    <div className="resume-print-page">
      <div className="resume-print-toolbar">
        <div>
          <strong>출력용 이력서</strong>
          <span>
            Ctrl+P 후 A4, 배율 기본값, 머리글/바닥글 끔 기준으로 2장 출력에 맞춰
            구성했습니다.
          </span>
        </div>
        <button
          type="button"
          className="resume-print-button"
          onClick={() => window.print()}
        >
          인쇄하기
        </button>
      </div>

      <section className="resume-paper">
        <header className="resume-doc-header">
          <div>
            <p className="resume-doc-eyebrow">Printable Resume</p>
            <h1>{profile.name}</h1>
            <p className="resume-doc-role">{profile.role}</p>
          </div>
          <p className="resume-doc-intro">{profile.intro}</p>
        </header>

        <section className="resume-doc-section">
          <h2>기본 정보</h2>
          <LabelValueTable rows={profileRows} />
        </section>

        <section className="resume-doc-section">
          <h2>핵심 요약</h2>
          <ul className="resume-doc-list">
            {profile.strengths.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="resume-doc-section">
          <h2>경력 기술서</h2>
          {pages[0].map((project) => (
            <ProjectEntry key={project.slug} project={project} />
          ))}
        </section>
      </section>

      <section className="resume-paper page-break">
        {pages[1].length ? (
          <section className="resume-doc-section">
            <h2>경력 기술서</h2>
            {pages[1].map((project) => (
              <ProjectEntry key={project.slug} project={project} />
            ))}
          </section>
        ) : null}

        <section className="resume-doc-section">
          <h2>기술 스택</h2>
          <LabelValueTable rows={techRows} />
        </section>

        <section className="resume-doc-section">
          <h2>교육</h2>
          <table className="resume-table">
            <thead>
              <tr>
                <th>과정</th>
                <th>기관</th>
                <th>기간</th>
              </tr>
            </thead>
            <tbody>
              {education.map((item) => (
                <tr key={item.id}>
                  <th scope="row">{item.degree}</th>
                  <td>{item.school}</td>
                  <td>{item.period}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="resume-doc-section">
          <h2>수상</h2>
          <table className="resume-table">
            <thead>
              <tr>
                <th>항목</th>
                <th>일자</th>
              </tr>
            </thead>
            <tbody>
              {awards.map((item) => (
                <tr key={item.id}>
                  <th scope="row">{item.title}</th>
                  <td>{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="resume-doc-section">
          <h2>자격</h2>
          <table className="resume-table">
            <thead>
              <tr>
                <th>항목</th>
                <th>취득일</th>
              </tr>
            </thead>
            <tbody>
              {licenses.map((item) => (
                <tr key={item.id}>
                  <th scope="row">{item.title}</th>
                  <td>{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </section>
    </div>
  );
}

export default ResumePage;
