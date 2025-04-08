import React from "react";
import "./AwardsList.css"; // 스타일 파일 추가

const AwardsList = ({ awards }) => {
  return (
    <div className="awards-list">
      {awards.map((award, index) => (
        <div key={index} className="award-card">
          <img src={award.image} alt={award.title} className="award-image" />
          <div className="award-details">
            <h2>{award.title}</h2>
            <p><strong>수상일:</strong> {award.date}</p>
            <p>{award.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AwardsList;