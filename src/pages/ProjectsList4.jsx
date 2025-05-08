import React, { useState } from "react";
import projects from "./Projects4"; // 프로젝트 데이터 import
import "../styles/projectsList.css";

const ProjectsList4 = () => {
    const [modalOpen, setModalOpen] = useState(false); // 모달 상태
    const [modalImage, setModalImage] = useState(""); // 모달에 표시할 이미지 URL

    // 이미지 클릭시 호출되는 함수
    const handleImageClick = (image) => {
        setModalImage(image); // 클릭한 이미지 URL을 모달에 전달
        setModalOpen(true); // 모달 열기
    };

    return (
        <div className="projects-container">
            <h1>📋 프로젝트 목록</h1>
            {projects.map((project, index) => (
                <div key={index} className="project">
                    <h2>{project.projectName}</h2>
                    <p><strong>기간:</strong> {project.period}</p>

                    <h3>주요 업무(KOSA 인증)</h3>
                    <ul className="task-list">
                        {project.mainTasks.map((task, i) => (
                            <li key={i} onClick={() => handleImageClick("/ex.png")}>
                                📝 {task} {/* 업무 항목 클릭 시 KOSA 경력증명서 이미지 확대 모달 열기 */}
                            </li>
                        ))}
                    </ul>

                    {/* 모달 오버레이 */}
                    {modalOpen && (
                        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
                            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                                <img
                                    src={modalImage}
                                    alt="확대 이미지"
                                    className="kosa-full"
                                />
                                <button className="modal-close" onClick={() => setModalOpen(false)}>
                                    ×
                                </button>
                            </div>
                        </div>
                    )}

                    {/* 세부 프로젝트 */}
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

export default ProjectsList4;
