import React from "react";
import AwardsList from "./AwardsList";

const awards = [
  {
    title: "(주)애버커스 통신사업본부 우수사원",
    date: "2024.12",
    description:
      "CloudXper 플랫폼 성능 개선과 LG U+ 통합 빌링 운영 안정화 성과를 바탕으로 선정되었습니다.",
    image: "/ABACUS.jpg",
    links: [
      {
        label: "회사 홈페이지",
        href: "http://iabacus.co.kr/iabacus/",
      },
      {
        label: "기업정보",
        href: "https://www.jobkorea.co.kr/recruit/co_read/c/abacus",
      },
    ],
  },
  {
    title: "LG CNS UCAMP 프로젝트 최우수상",
    date: "2022.11",
    description: "교육 과정 중 진행한 프로젝트 성과로 수상했습니다.",
    image: "/UCAMP.jpg",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/seulgae/fmBoot",
      },
      {
        label: "프로젝트 설명",
        href: "https://github.com/seulgae/fmBoot/blob/main/PPT.pdf",
      },
      {
        label: "프로젝트 영상",
        href: "https://youtu.be/Cb8BTgsmOXY",
      },
    ],
  },
];

const Awards = () => {
  return (
    <div className="awards-container">
      <h1>수상 이력</h1>
      <AwardsList awards={awards} />
    </div>
  );
};

export default Awards;
