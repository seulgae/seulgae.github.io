import React from "react";
import AwardsList from "./AwardsList";

const awards = [
  {
    title: "(주)애버커스 우수사원상",
    date: "2024.12",
    description: "통신사업본부 빌링시스템팀 우수사원상",
    image: "/ABACUS.jpg" // 이미지 URL (수정 가능)
  },
  {
    title: "LG CNS UCAMP 36기 프로젝트 최우수상",
    date: "2022.11",
    description: "2팀 프로젝트 팀장",
    image: "/UCAMP.jpg"
  },
];

const Awards = () => {
  return (
    <div className="awards-container">
      <h1>🏆 수상 경력</h1>
      <AwardsList awards={awards} />
    </div>
  );
};

export default Awards;