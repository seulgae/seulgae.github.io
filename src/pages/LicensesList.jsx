import React, { useState } from "react";
import "../styles/licensesList.css";

const LicensesList = ({ licenses }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="licenses-container">
      <div className="licenses-list">
        {licenses.map((license, index) => (
          <div key={index} className="licenses-card">
            <img
              src={license.image}
              alt={license.title}
              className="licenses-image"
              onClick={() => setSelectedImage(license.image)} // 이미지 클릭 시 모달 오픈
            />
            <div className="licenses-details">
              <h2>{license.title}</h2>
              <p><strong>취득일:</strong> {license.date}</p>
              <p>{license.description}</p>
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

export default LicensesList;