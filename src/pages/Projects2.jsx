const projects = [
  {
    projectName: "LG CNS CloudXper 클라우드 빌링 플랫폼 고도화",
    description:
      "AWS · GCP · Azure · Kakao 저장소 대여·청구 통합 관리 플랫폼의 백엔드 아키텍처 개선 및 대용량 데이터 처리 최적화",
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
        title: "대용량 데이터 조회 성능 최적화",
        detail:
          "Java Parallel Stream 기반 병렬 처리 구조를 소스 전역 집계 로직에 적용하여 대용량 데이터 처리 성능 개선",
        result: "API 응답 시간 87% 단축 (10분 → 1분 15초)",
      },
      {
        title: "Redis 기반 인증 아키텍처 최적화",
        detail:
          "OAuth 인증·권한 정보를 Redis에 캐싱하는 권한 모듈을 신규 개발하고 토큰 만료와 Redis TTL을 자동 동기화",
        result: "인증·권한 조회 병목을 제거하여 페이지 전환 및 렌더링 응답 속도 개선(10초 -> 0.10초 이내)",
      },
      {
        title: "코드 리팩토링 및 개발 컨벤션 표준화",
        detail:
          "Builder Pattern 도입으로 객체 생성 중복 제거, 패키지 구조 재정립과 코딩 컨벤션 문서를 직접 작성·팀에 공유하여 온보딩 시간 단축",
        result: "유지보수성·협업 효율 향상, SonarQube 코드 품질 지표 개선",
      },
    ],
  },
];

export default projects;
