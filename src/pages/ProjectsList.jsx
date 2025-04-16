import React from "react";
import projects from "./Projects"; // 프로젝트 데이터 import
import "../styles/projectsList.css";


const ProjectsList = () => {
  return (
    <div className="projects-container">
      <h1>📋 프로젝트 목록</h1>
      {projects.map((project, index) => (
        <div key={index} className="project">
          <h2>{project.projectName}</h2>
          <p><strong>기간:</strong> {project.period}</p>

          <h3>주요 업무</h3>
          <ul>
            {project.mainTasks.map((task, i) => (
              <li key={i}>{task}</li>
            ))}
          </ul>

          <h3>세부 프로젝트</h3>
          {project.projects.map((subProject, j) => (
            <div key={j} className="sub-project">
              <h4>{subProject.title}</h4>
              <p><strong>기간:</strong> {subProject.period}</p>

              <h5>상황 (Situation)</h5>
              <ul>
                {subProject.situation.map((item, k) => (
                  <li key={k}>{item}</li>
                ))}
              </ul>

              <h5>과제 (Task)</h5>
              <ul>
                {subProject.task.map((item, k) => (
                  <li key={k}>{item}</li>
                ))}
              </ul>

              <h5>행동 (Action)</h5>
              <ul>
                {subProject.action.map((item, k) => (
                  <li key={k}>{item}</li>
                ))}
              </ul>

              <h5>결과 (Result)</h5>
              <ul>
                {subProject.result.map((item, k) => (
                  <li key={k}>{item}</li>
                ))}
              </ul>

              <h5>기술 스택</h5>
              <ul>
                {Object.entries(subProject.techStack).map(([key, value], n) => (
                  <li key={n}>
                    <strong>{key}:</strong> {Array.isArray(value) ? value.join(", ") : value}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ProjectsList;