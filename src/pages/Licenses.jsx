import React from "react";
import LicensesList from "./LicensesList";

const licenses = [
  // {
  //   title: "정보처리기사",
  //   date: "2025.09.12",
  //   description: "한국산업인력공단",
  //   image: "" // 이미지 URL (수정 가능)
  // },
  {
    title: "SQLD",
    date: "2025.06.27",
    description: "한국데이터산업진흥원장",
    image: "" // 이미지 URL (수정 가능)
  },
  {
    title: "웹 디자인 개발기능사",
    date: "2014.06.24",
    description: "한국산업인력공단",
    image: "/Licenses1.png"
  },
];

const Licenses = () => {
  return (
    <div className="licenses-container">
      <h1>📄 자격증</h1>
      <LicensesList licenses={licenses} />
    </div>
  );
};

export default Licenses;