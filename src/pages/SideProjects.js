import React from "react";
import SideProjectsList from "./SideProjectsList";

const sideProjects = [
  {
    title: "Spring Batch 사이드 프로젝트",
    date: "2025.05",
    description: "Spring Batch 사이드 프로젝트 입니다.",
    image: "/LGCNS.png",
    link: "https://github.com/your-id/spring-batch-project"
  },
  {
    title: "Spring Boot 사이드 프로젝트",
    date: "2025.06",
    description: "Spring Boot 사이드 프로젝트 입니다.",
    image: "/LGCNS.png",
    link: "https://github.com/your-id/spring-batch-project"
  },
  {
    title: "React 사이드 프로젝트",
    date: "2025.08",
    description: "React 사이드 프로젝트 입니다.",
    image: "/LGCNS.png",
    link: "https://github.com/your-id/spring-batch-project"
  },
];

const SideProjects = () => {
  return <SideProjectsList sideProjects={sideProjects} />;
};

export default SideProjects;