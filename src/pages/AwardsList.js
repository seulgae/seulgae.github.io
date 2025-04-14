import React, { useState } from "react";
import "./AwardsList.css"; // 스타일 파일 추가

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
              onClick={() => setSelectedImage(award.image)} // 이미지 클릭 시 모달 오픈
            />
            <div className="awards-details">
              <h2>{award.title}</h2>
              <p><strong>취득일:</strong> {award.date}</p>
              <p>{award.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 이미지 확대 모달 */}
      {selectedImage && (
        <div className="modal" onClick={() => setSelectedImage(null)}> {/* 클릭하면 닫힘 */}
          <div className="modal-content">
            <button className="modal-close" onClick={() => setSelectedImage(null)}>×</button>
            <img src={selectedImage} alt="확대된 자격증 이미지" />
          </div>
        </div>
      )}
    </div>
  );
};

export default AwardsList;