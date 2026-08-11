// 수상 이력의 단일 출처. Awards 페이지와 출력용 이력서가 함께 참조합니다.

const awards = [
  {
    id: "abacus-2024",
    title: "(주)애버커스 통신사업본부 우수사원",
    date: "2024.12",
    description:
      "CloudXper 플랫폼 성능 개선과 LG U+ 통합 빌링 운영 안정화 성과를 바탕으로 선정되었습니다.",
    image: "ABACUS.jpg",
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
    id: "ucamp-2022",
    title: "LG CNS UCAMP 프로젝트 최우수상",
    date: "2022.11",
    description:
      "사전 평가 시험에서 반 2등을 기록해 2팀 팀장을 맡았고, 4명의 팀원과 협업하여 프로젝트를 최우수상으로 이끌었습니다.",
    image: "UCAMP.jpg",
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

export default awards;
