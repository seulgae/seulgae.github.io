// 학력·교육 이력의 단일 출처. Education 페이지와 출력용 이력서가 함께 참조합니다.
//
// summary    : 과정 한 줄 요약
// curriculum : 상세 교육 내용(없으면 생략)
// imageLink  : 값이 있으면 로고 클릭 시 외부 링크로 이동, 없으면 이미지 확대 보기

const education = [
  {
    id: "lgcns-ucamp",
    degree: "LG CNS U-CAMP 36기 신입 교육 프로그램",
    school: "LG CNS",
    period: "2022.09 - 2022.11",
    summary: "Full-Stack Web Development Bootcamp 과정",
    curriculum: ["JAVA(JDK 11), ORACLE(11c), React.js, Spring Boot(2.x.x)"],
    image: "LGCNS.png",
    imageLink: "https://www.lg.co.kr/media/release/3933",
  },
  {
    id: "ezen-academy",
    degree: "빅데이터 기반 자바 백엔드 과정",
    school: "EZEN ACADEMY",
    period: "2021.06 - 2022.01",
    summary: "Full-Stack Web Application Development Program",
    curriculum: [
      "JAVA(JDK11), MYSQL, HTML, CSS, JavaScript(ES6), JSP, Spring Framework",
    ],
    image: "Ezen2.png",
  },
  {
    id: "hycu-bachelor",
    degree: "컴퓨터공학과 학사",
    school: "한양사이버대학교",
    period: "2016.03 - 2021.03",
    summary: "평점 4.05 / 4.5",
    image: "HYLOGO.jpg",
    imageLink: "https://www.hycu.ac.kr/user/maSnEx/goMain/30003/loadMap.do",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/seulgae/Leesigukgram",
      },
      {
        label: "프로젝트 설명 PDF",
        href: "https://github.com/Giltaehyeong/Leesigukgram/blob/main/LeeSigukgram(%EC%84%A4%EB%AA%85).pdf",
      },
      {
        label: "동작 영상",
        href: "https://www.youtube.com/watch?v=kE8Ci-JRsi4",
      },
    ],
  },
];

export default education;
