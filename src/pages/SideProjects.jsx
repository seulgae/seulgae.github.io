import React from "react";
import SideProjectsList from "./SideProjectsList";

const sideProjects = [
  {
    title: "SpringBatch",
    date: "2025.04.19 ~ ",
    description: "SpringBatch 기술 경력 증빙용 사이드 프로젝트.",
    skill: "SpringBatch 4.2.5 / JPA / MySQL DB",
    image: "/SpringBatchLogo.png",
    link: "https://github.com/seulgae/springBatch.git"
  },
  {
    title: "풋살 매니저(UCAMP 36기 프로젝트)",
    date: "2022.11, 리뉴얼 2025.04.18 ~ ",
    description: "LG CNS UCAMP 36기 팀 프로젝트.",
    skill: "React / SpringBoot / MyBatis / JDK11 / Oracle DB",
    image: "/FMSideProject.png",
    link: "https://github.com/seulgae/fmBoot.git"
  },
  {
    title: "원데이 클래스(Ezen 아카데미)",
    date: "2021.10, 리뉴얼 2025.05.25 ~ ",
    description: "Ezen 아카데미 팀 프로젝트.",
    skill: "Vue / SpringBoot / JPA / JDK17 / MySQL DB",
    image: "/OneDayClass.png",
    link: "https://github.com/seulgae/Proj_OnedayClass"
  },
];

const SideProjects = () => {
  return <SideProjectsList sideProjects={sideProjects} />;
};

export default SideProjects;