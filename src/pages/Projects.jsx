const projects = [
  {
    projectName: "전세사기 피해 지원관리시스템 운영·개발 (국토교통부)",
    description:
      "전세사기 지원관리시스템 전반을 담당하며, 유지보수 구조를 자동화·개선해 서비스 품질을 고도화했습니다.",
    periodAndRole: "2025.09 ~ (재직중) / 시스템 운영·기능 개발",
    skills: [
      {
        label: "기술",
        value: "eGovFrame 4.1.0, JSP, JSTL, jQuery, CSS, MyBatis, Maven",
      },
      {
        label: "인프라",
        value: "Apache Tomcat 9.0.31, JBOSS, Linux(Fedora), CUBRID, SVN",
      },
      {
        label: "사용 툴",
        value: "Cursor IDE, Claude AI, STS4, DBeaver",
      },
    ],
    mainTasks: [
      "요청 기반 개선 대응 및 오류 분석, 기능 유지보수·자동화 수행",
      "서버 용량 점검, 파일 관리, 리소스 모니터링 등 인프라 운영",
      "SVN 기반 JAR 패키징 및 SFTP/SSH 활용 운영 환경 배포",
    ],
    achievements: [
      {
        text: "웹 접근성 전수 개선(31개 화면) 및 WAI-ARIA 적용으로 준수율 99.7%를 달성하고 품질인증을 획득",
      },
      {
        text: "민원 처리 시스템에서 34건의 결함 및 개선 조치와 오류 분석·보완을 수행해 월 평균 오류 신고 접수율을 2건 미만으로 안정화",
      },
      // {
      //   text: "콜센터 문자 알림 서비스 개발로 상담 시간을 40% 단축(5분 -> 3분)",
      // },
      {
        text: "Apache SSHD 기반 서버 리소스 실시간 모니터링과 CLI 점검 자동화로 사용률 30% 이하를 안정적으로 유지",
      },
    ],
  },
];

export default projects;
