import ProjectTechnologies from "./ProjectTechnologies";

export default function ProjectSummaryTable({ project, metrics }) {
  return (
    <table className="project-overview-table">
      <caption>프로젝트 요약</caption>
      <colgroup><col className="project-overview-label-column" /><col /></colgroup>
      <tbody>
        <tr><th scope="row">주요 담당 업무</th><td><ul className="project-overview-tasks">{project.mainTasks.map((task) => <li key={task}>{task}</li>)}</ul></td></tr>
        <tr><th scope="row">주요 성과</th><td><dl className="project-overview-metrics">{metrics.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></td></tr>
        <tr><th scope="row">사용 기술</th><td><ProjectTechnologies skills={project.skills} showHeading={false} /></td></tr>
      </tbody>
    </table>
  );
}
