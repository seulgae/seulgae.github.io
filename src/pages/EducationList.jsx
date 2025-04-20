import React, { useState } from "react";
import educationData from "./Education";
import "../styles/educationList.css";

const EducationList = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalImage, setModalImage] = useState("");

    const openModal = (imageSrc) => {
        setModalImage(imageSrc);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setModalImage("");
    };

    return (
        <div className="education-container">
            <h1>📚 학력 및 교육</h1>
            <div className="education-list">
                {educationData.map((edu, index) => (
                    <div key={index} className="education-card">
                        <img
                            src={edu.image}
                            alt={edu.school}
                            className="education-image"
                            onClick={() => openModal(edu.image)}
                        />
                        <div className="education-details">
                            <h2>{edu.degree}</h2>
                            <h3>{edu.school}</h3>
                            <p><strong>📅 기간:</strong> {edu.period}</p>
                            <p>{edu.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* 모달 */}
            {modalOpen && (
                <div className="education-modal" onClick={closeModal}>
                    <div className="education-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="education-modal-close" onClick={closeModal}>
                            &times;
                        </button>
                        <img src={modalImage} alt="확대된 교육 이미지" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default EducationList;