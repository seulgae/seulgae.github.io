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
      <h1>학력 및 교육</h1>
      <div className="education-list">
        {educationData.map((edu, index) => {
          const descriptionLines = edu.description
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean);

          const imageElement = (
            <img
              src={edu.image}
              alt={edu.school}
              className="education-image"
              onClick={!edu.imageLink ? () => openModal(edu.image) : undefined}
            />
          );

          return (
            <div key={index} className="education-card">
              {edu.imageLink ? (
                <a
                  href={edu.imageLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="education-image-link"
                >
                  {imageElement}
                </a>
              ) : (
                imageElement
              )}
              <div className="education-details">
                <h2>{edu.degree}</h2>
                <h3>{edu.school}</h3>
                <p>
                  <strong>기간:</strong> {edu.period}
                </p>
                {descriptionLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}

                {edu.projectLinks?.length ? (
                  <div className="education-links">
                    <p>
                      <strong>프로젝트 항목</strong>
                    </p>
                    <div className="education-link-list">
                      {edu.projectLinks.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="education-link"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      {modalOpen && (
        <div className="education-modal" onClick={closeModal}>
          <div className="education-modal-content" onClick={(event) => event.stopPropagation()}>
            <button className="education-modal-close" onClick={closeModal}>
              &times;
            </button>
            <img src={modalImage} alt="교육 이미지" />
          </div>
        </div>
      )}
    </div>
  );
};

export default EducationList;
