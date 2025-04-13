import React from "react";
import "./SideProjectsList.css"; // 스타일 import

const SideProjectsList = ({ sideProjects = [] }) => {
  return (
    <div className="sideProjects-container">
      <h1>📋 사이드 프로젝트</h1>
      <div className="sideProjects-list">
        {sideProjects.map((project, index) => (
          <div key={index} className="sideProjects-card">
            <a
              href={project.link}
              className="sideProjects-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={project.image} alt={project.title} className="sideProjects-image" />
              <div className="sideProjects-details">
                <h2>{project.title}</h2>
                <p><strong>📅 날짜:</strong> {project.date}</p>
                <p>{project.description}</p>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideProjectsList;