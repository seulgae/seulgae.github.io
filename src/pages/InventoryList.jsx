import React from "react";
import ProjectExperiencePage from "../components/ProjectExperiencePage";

const inventoryItems = [
  {
    projectName: "Portfolio Inventory Sample",
    description:
      "이 페이지는 다른 경력 메뉴와 동일한 구조를 사용하는 샘플입니다. 아래 데이터 형식만 복사해서 항목을 추가하면 됩니다.",
    periodAndRole: "2026.03 ~ / Personal Branding",
    skills: [
      {
        label: "기술",
        value: "React, CSS, Framer Motion",
      },
      {
        label: "인프라",
        value: "GitHub Pages, GitHub Actions",
      },
      {
        label: "사용 툴",
        value: "VSCode, Cursor, Claude",
      },
    ],
    mainTasks: [
      "포트폴리오 콘텐츠 구조 정리",
      "경력형 포트폴리오에 맞는 화면 설계",
      "페이지 스타일 통일 및 유지보수 구조 개선",
    ],
    achievements: [
      {
        text: "성과 항목은 이렇게 링크 객체로 넣으면 클릭 시 이동합니다.",
        href: "https://github.com/seulgae",
      },
      {
        text: "링크가 필요 없는 경우에는 문자열만 추가하면 일반 텍스트로 표시됩니다.",
      },
    ],
  }
];

const InventoryList = () => (
  <ProjectExperiencePage title="Inventory" projects={inventoryItems} />
);

export default InventoryList;
