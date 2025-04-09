import React from "react";
import projects from "./Projects2"; // 프로젝트 데이터 import
import "./ProjectsList.css"; // 분리된 CSS 파일 import

const ProjectsList2 = () => {
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

              <h5>설명</h5>
              <ul>
                {subProject.description.map((desc, k) => (
                  <li key={k}>{desc}</li>
                ))}
              </ul>

              <h5>성과</h5>
              <ul>
                {subProject.achievements.map((achievement, m) => (
                  <li key={m}>{achievement}</li>
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

export default ProjectsList2;