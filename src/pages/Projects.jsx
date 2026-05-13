const projects = [
  {
    projectName: "전세사기 피해 지원관리시스템 운영·개발 (국토교통부)",
    description:
      "전세사기 피해 지원관리시스템의 보안 취약점 개선, AI 기반 유지보수 자동화, 인프라 모니터링 및 웹 접근성 품질 개선을 담당했습니다.",
    periodAndRole: "2025.09 ~ (재직중) / 시스템 운영·기능 개발",
    skills: [
      {
        label: "기술",
        value:
          "eGovFrame 4.1.0, JSP, JSTL, jQuery, CSS, MyBatis, Jasypt, Apache SSHD, Maven",
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
        title: "국자원 웹 취약점 점검 사전 대응 및 보안 아키텍처 강화",
        detail:
          "웹 취약점 점검 결과 기반 HIGH 6·MEDIUM 7·LOW 3 항목 개선 및 SQL Injection 오류 14건 대응 수행, 9개 테이블·97개 컬럼 정적 SQL 분기 재설계와 Jasypt 공통 암호화 유틸 적용으로 4개 환경별 계정 정보 17건 보호",
        result:
          "보안 취약점 16건 개선, SQL Injection 오류 14건 대응 및 환경별 계정정보 17건 암호화 적용",
      },
      {
        title: "Markdown 기반 AI 유지보수 자동화 체계 구축",
        detail:
          "전세사기피해 도메인 업무를 Markdown 기반 템플릿으로 정형화하고 AI 활용 개발 프로세스를 적용하여 자동화 기능 개발 속도 및 업무 처리 효율을 개선",
        result: "유지보수 시간 30~40% 단축, 업무 효율 60% 향상",
      },
      {
        title: "인프라 용량 관리 모니터링 자동화 및 점검 프로세스 표준화",
        detail:
          "Apache SSHD 기반 CPU·메모리·디스크 실시간 모니터링·진단 기능 신규 개발, CLI 기반 서버 점검 스크립트를 표준화하여 운영 부하 경감 절차로 점검 가능한 체계 마련",
        result: "평균 서버 리소스 사용률 30% 이하 안정 유지",
      },
      {
        title: "웹 접근성 품질 개선 및 인증마크 획득",
        detail:
          "WAI-ARIA 표준 준수 기반 접근성 부적합 항목을 전수 개선하고, UI 가시성 및 사용성 향상을 통해 웹 접근성 품질 개선 수행",
        result: "접근성 준수율 99.7% 달성, 웹 접근성 품질인증마크 획득",
      },
    ],
  },
];

export default projects;
