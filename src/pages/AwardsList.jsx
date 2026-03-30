import React, { useState } from "react";
import "../styles/awardsList.css";

const AwardsList = ({ awards }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="awards-container">
      <div className="awards-list">
        {awards.map((award, index) => (
          <div key={index} className="awards-card">
            <img
              src={award.image}
              alt={award.title}
              className="awards-image"
              onClick={() => setSelectedImage(award.image)}
            />
            <div className="awards-details">
              <h2>{award.title}</h2>
              <p>
                <strong>수상일</strong> {award.date}
              </p>
              <p>{award.description}</p>

              {award.links?.length ? (
                <div className="awards-links">
                  {award.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="award-link"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="modal" onClick={() => setSelectedImage(null)}>
          <div className="modal-content">
            <button className="modal-close" onClick={() => setSelectedImage(null)}>
              X
            </button>
            <img src={selectedImage} alt="수상 이미지" />
          </div>
        </div>
      )}
    </div>
  );
};

export default AwardsList;
