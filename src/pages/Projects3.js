const projects3 = [
    {
      projectName: "LG CNS 클라우드 플랫폼 팀 SI 개발",
      period: "2024.10.07 ~ 2025.01.30",
      mainTasks: [
        "CloudXper 서버 API 개발"
      ],
      projects: [
        {
          title: "서버 API 개발, 개발 표준화 구축",
          period: "2024.10.07 ~ 2025.01.30",
          description: [
            "[가입 및 청구 프로세스 API 개발]",
            "가입 프로세스: 정산 그룹 관리 API, 가입 상품 관리 API 개발",
            "청구 프로세스: 청구 ID 관리 API, 청구 계정 상세 조회 API, 청구 계정 재처리 대상 관리 API, 청구 계정 항목 관리 API 개발",
            "보안 인증: 사용자 권한 인증 모듈 Redis 연동 모듈 개발"
          ],
          achievements: [
            "개발 표준화 구축을 통해 청구 처리 속도 50% 개선."
          ],
          techStack: {
            frontend: "React",
            backend: "Spring Boot, Rest API, Redis",
            buildTools: "Gradle",
            database: "Oracle",
            library: "Swagger",
            tools: ["Jenkins", "DBeaver", "IntelliJ"]
          }
        }
      ],
    }
  ];
  
  export default projects3;