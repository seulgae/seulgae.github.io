import React from "react";
import educationData from "./Education";
import "./EducationList.css"; // 스타일 적용

const EducationList = () => {
  return (
    <div className="education-container">
      <h1>📚 학력 및 교육</h1>
      <div className="education-list">
        {educationData.map((edu, index) => (
          <div key={index} className="education-card">
            <img src={edu.image} alt={edu.school} className="education-image" />
            <div className="education-details">
              <h2>{edu.degree}</h2>
              <h3>{edu.school}</h3>
              <p><strong>📅 기간:</strong> {edu.period}</p>
              <p>{edu.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationList;