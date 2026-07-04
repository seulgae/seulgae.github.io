const projects = [
  {
    projectName:
      "LG U+ 청구 및 빌링 GW 시스템 개발·운영 유지보수",
    description:
      "Kafka 기반 청구·빌링 GW 시스템의 개발 및 운영, 이기종 시스템 연동 및 데이터 흐름 표준화",
    periodAndRole: "2022.11 ~ 2025.05 / SM/SI 서비스 개발 및 연동 시스템 유지보수",
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
        title: "Kafka 연동 오류 모니터링 체계 구축 및 대응 시나리오 표준화",
        detail:
          "WhaTap 히트맵 기반 연동 실패 패턴을 분석해 오류 유형별 대응 시나리오를 매뉴얼화하고, 데이터 보정 스크립트 정비 및 장애 발생 시 동일한 절차로 즉시 대응 가능한 운영 체계 마련",
        result: "주간 Kafka 오류 70건 → 5건 미만 (93% 감소)",
      },
      {
        title: "이기종 DB 연동 유지보수 및 데이터 정합성 자동 검증",
        detail:
          "Oracle ↔ MySQL 인코딩 차이 이슈를 Java 바이트 변환 로직(SUBSTRB)·Subscriber 로직 수정으로 근본 해결, 연동 검증 로직을 공통 모듈로 표준화하여 신규 연동 추가 시 자동 적용",
        result: "인코딩 오류 95% 감소, 신규 연동 실패율 5% 미만 유지",
      },
      {
        title: "청구 도메인 기반 요금·위약금 조회 API 신규 개발",
        detail:
          "3개월 요금 및 해지 위약금 조회 대내 API를 신규 개발하고, 고객 계약·요금제·청구 데이터를 연계하여 상담 화면 실시간 조회 기능 구현",
        result:
          "요금 분석 시뮬레이터 실시간 조회 API 제공, 3개월 예상 요금 안내 상담 업무 효율 향상",
      },
    ],
  },
];

export default projects;
