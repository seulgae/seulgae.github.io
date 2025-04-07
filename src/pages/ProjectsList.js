import React from "react";
import projects from "./Projects"; // 프로젝트 데이터 import

const ProjectsList = () => {
  return (
    <div>
      <h1>프로젝트 목록</h1>
      {projects.map((project, index) => (
        <div key={index} style={styles.projectContainer}>
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
            <div key={j} style={styles.subProjectContainer}>
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

// 간단한 스타일 추가
const styles = {
  projectContainer: {
    border: "1px solid #ddd",
    padding: "15px",
    margin: "15px 0",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9"
  },
  subProjectContainer: {
    border: "1px solid #ccc",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "6px",
    backgroundColor: "#ffffff"
  }
};

export default ProjectsList;