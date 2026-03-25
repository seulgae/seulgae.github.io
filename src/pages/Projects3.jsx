const projects = [
  {
    projectName:
      "LG U+ 통합 빌링 플랫폼 운영 및 유지보수 " +
      "(배치·API·GW / NUBL·NUBO 기반)",
    description:
      "빌링 청구 시스템의 배치·조회 서비스와 Kafka 기반 GW 연동 시스템의 운영 및 유지보수를 담당했습니다.",
    periodAndRole: "2022.11 ~ 2025.04 / 시스템 운영·기능 개발",
    skills: [
      {
        label: "기술",
        value:
          "Spring Boot(2.x.x), Batch(4.x.x), REST API, HTML5, CSS, JavaScript, Swagger, MyBatis, Maven",
      },
      {
        label: "인프라",
        value:
          "Redis, Kafka, APIM, TMS, Jenkins, GitLab, WhaTap, JobPass, Linux(CentOs), Oracle",
      },
      {
        label: "사용 툴",
        value: "Trusted Orange, STS, SecureCRT, FileZilla(SFTP), VSCode",
      },
    ],
    mainTasks: [
      "Kafka Topic 기반 데이터 처리 로직 설계·구현 및 연동 시스템 모니터링·장애 대응",
      "빌링 요금·위약금 조회 및 전자세금계산서·청구 API 설계·개발",
      "Spring Batch 기반 배치 처리 및 리포팅 자동화 시스템 개발·운영",
    ],
    achievements: [
      {
        text: "WhaTap 기반 오류 분석 및 재처리 프로세스 구축으로 Kafka 연동 오류 93% 감소(70건 -> 5건 미만)",
      },
      {
        text: "Oracle·MySQL 인코딩 처리 로직 개선으로 데이터 오류 95% 이상 감소",
      },
      {
        text: "배치·리포팅 자동화(CSV -> XLSX·SFTP)로 업무 처리 시간을 80% 이상 단축",
      },
    ],
  },
];

export default projects;
