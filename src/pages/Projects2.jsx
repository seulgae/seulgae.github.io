const projects = [
  {
    projectName: "CloudXper 빌링 통합 관리 플랫폼 고도화 개발 (LG CNS)",
    description:
      "클라우드(AWS, GCP, Azure, Kakao) 저장소 대여·청구를 통합하고 자동화하는 백엔드 고도화 프로젝트입니다.",
    periodAndRole: "2024.10 ~ 2025.02 / 플랫폼 서버 백엔드 개발",
    skills: [
      {
        label: "기술",
        value: "Spring Boot(3.x.x), REST API, React, Swagger, MyBatis, Gradle",
      },
      {
        label: "인프라",
        value: "Redis, MySQL, SonarQube, Linux(Ubuntu), Jenkins, GitLab",
      },
      {
        label: "사용 툴",
        value: "DBeaver, IntelliJ, VSCode",
      },
    ],
    mainTasks: [
      "가입, 청구, 상품 및 공통 조회 등 주요 REST API 설계·개발",
      "프로젝트 구조 표준 정의 및 코드 리팩토링 후 팀 공유 및 적용",
      "OAuth 사용자 인증 정보 Redis 캐싱 기반 저장·조회 권한 모듈 신규 개발",
    ],
    achievements: [
      {
        text: "Java Parallel Stream 기반 병렬 처리 구조 적용으로 대용량 집계 처리 성능 87% 개선(10분 -> 1분 15초)",
      },
      {
        text: "Redis 기반 인증·권한 캐싱 구조 설계로 인증 과정의 DB 조회를 제거하고 처리 성능을 개선",
      },
      {
        text: "Builder Pattern 기반 객체 생성 구조와 코드 표준 정의로 중복 로직을 제거하고 유지보수성을 높임",
      },
    ],
  },
];

export default projects;
