import React from "react";
import SideProjectsList from "./SideProjectsList";

const sideProjects = [
  // {
  //   title: "SpringBatch",
  //   date: "2025.04.19 ~ ",
  //   description: "SpringBatch 기술 경력 증빙용 사이드 프로젝트.",
  //   image: "/SpringBatchLogo.png",
  //   link: "https://github.com/seulgae/springBatch.git",
  //   oldLink: null
  // },
  // {
  //   title: "BillNest",
  //   date: "2025.08 ~ ",
  //   description: "결제 정보를 기반으로 청구서를 자동 생성하고 이메일로 발송하는 청구서 발송 시스템.",
  //   image: "/BillNestLogo.png",
  //   link: "https://github.com/seulgae/springBatch",
  //   oldLink: null
  // },
  {
    title: "FM Manager",
    date: "2022.11, 고도화 2025.06.01 ~  ",
    description: "구장 예약부터 동호회 소통까지, 풋살을 즐기는 사람들을 위한 올인원 플랫폼 사이트.",
    image: "/FMLogo.png",
    link: "https://github.com/seulgae/fmBootReact",
    oldLink: "https://github.com/seulgae/fmBoot.git"
  },
  {
    title: "OneDayClass",
    date: "2021.10",
    description: "수강생을 연결해주는 일일 체험 학습 플랫폼 사이트, 누구나 쉽게 클래스를 등록하고 리뷰로 소통할 수 있는 공간.",
    image: "/OneDayClass.png",
    link: "https://github.com/seulgae/Proj_OnedayClass",
    oldLink: ""
  },
];

const SideProjects = () => {
  return <SideProjectsList sideProjects={sideProjects} />;
};

export default SideProjects;