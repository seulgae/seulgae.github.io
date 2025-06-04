import React from "react";
import "../styles/sideProjectsList.css";

const SideProjectsList = ({ sideProjects = [] }) => {
    return (
        <div className="sideProjects-container">
            <h1>📋 사이드 프로젝트</h1>
            <div className="sideProjects-list">
                {sideProjects.map((project, index) => (
                    <div key={index} className="sideProjects-card">
                        <img src={project.image} alt={project.title} className="sideProjects-image" />
                        <div className="sideProjects-details">
                            <h2>{project.title}</h2>
                            <p><strong>📅 날짜:</strong> {project.date}</p>
                            <p>{project.description}</p>
                            <div className="sideProjects-links">
                                {project.oldLink && project.link ? (
                                    <>
                                        <a
                                            href={project.oldLink}
                                            className="sideProjects-link"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            🔄 고도화 전
                                        </a>
                                        <a
                                            href={project.link}
                                            className="sideProjects-link"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            ✅ 고도화 후
                                        </a>
                                    </>
                                ) : (
                                    project.link && (
                                        <a
                                            href={project.link}
                                            className="sideProjects-link"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            🔗 프로젝트 링크
                                        </a>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SideProjectsList;