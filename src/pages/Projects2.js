const projects2 = [
    {
      projectName: "LG CNS 빌링 디지털 서비스팀 SI 개발",
      period: "2022.11.21 ~ 2024.10.07",
      mainTasks: [
        "유플러스 청구 파트 시스템 SI 개발"
      ],
      projects: [
        {
          title: "요금 시뮬레이션 3개월 청구요금 조회 API 개발",
          period: "2024.08.15 ~ 2024.09.14",
          description: [
            "최근 3개월간 청구 데이터를 분석하여 고객이 특정 요금제에 가입할 경우 예상되는 요금을 산출하는 기능개발."
          ],
          achievements: [
            "요금제 가입 시 기존 사용자 데이터를 기반으로 예상 청구 금액을 조회할 수 있는 시뮬레이션 기능을 구현하여 비용 예측이 가능."
          ],
          techStack: {
            backend: "Spring Boot, Rest API",
            buildTools: "Maven",
            library: "Apache POI",
            database: "Oracle",
            tools: ["Jenkins, Trusted Orange, UplusStuio(STS)"]
          }
        },
        {
          title: "요금 시뮬레이션 핫빌 결과 조회 API 개발",
          period: "2024.08.15 ~ 2024.09.14",
          description: [
            "고객 해지 시 발생하는 반환금 및 위약금 정보를 반환하는 API 개발.",
            "사용자 요구사항에 맞는 데이터 포맷 설계."
          ],
          achievements: [
            "반환금 및 위약금 계산 로직 최적화로 서비스 품질 개선.",
            "Swagger를 활용한 API 문서화로 타 부서와의 협업 및 유지보수 효율성 증대",
            "API 배포 후 사용자 피드백 기반 추가 개선 사항을 반영해 시스템 안정성 강화"
          ],
          techStack: {
            backend: "Spring Boot, Rest API",
            buildTools: "Maven",
            library: "Apache POI",
            database: "Oracle",
            tools: ["Jenkins, Trusted Orange, UplusStuio(STS)"]
          }
        },
        {
          title: "국내 75 이상 요금제 로밍 종량 데이터 할인 생성 배치 작업 개발",
          period: "2024.04.01 ~ 2024.04.25",
          description: [
            "75 요금제 사용자들의 해외 로밍 데이터 과금 예외 처리를 위한 로직 설계 및 구현.",
            "할인 대상 데이터를 생성하는 배치 프로그램 개발."
          ],
          achievements: [
            "데이터 처리 로직 설계로 대규모 할인 데이터의 생성 및 운영 편의성 증대."
          ],
          techStack: {
            backend: "Spring Batch",
            buildTools: "Maven",
            library: "Apache POI",
            database: "Oracle",
            tools: ["Jenkins, Trusted Orange, UplusStuio(STS)"]
          }
        },
        {
          title: "전자세금계산서 이메일 템플릿 개발",
          period: "2023.07.10 ~ 2023.09.28",
          description: [
            "개인 과금 유형 추가를 위해 연동 파일(B, C, D)을 신규로 정의 및 추가.",
            "SFTP 서버와 연동하여 파일 업로드 프로세스를 구현."
          ],
          achievements: [
            "기존 하나의 배치 프로그램이 한 가지 작업만 처리할 수 있었던 구조를 다양한 파일을 처리할 수 있도록 개선하여 작업 효율성을 향상.",
            "자동화된 파일 업로드 프로세스를 통해 수동 작업을 축소시켜 운영자 편의성 증대."
          ],
          techStack: {
            frontend: "HTML, CSS, JavaScript",
            buildTools: "TMS(이메일 발송 솔루션 시스템)",
            database: "Oracle (Orange)",
            server: "SFTP",
            tools: ["EditPlus"]
          }
        },
        {
          title: "전자세금계산서 다차월 조회 API 개발",
          period: "2023.07.10 ~ 2023.09.28",
          description: [
            "기존 input 값 기반의 3개월 조회 제한 로직을 개선하여 날짜 입력 방식을 도입.",
            "사용자 요구사항에 따라 다차월 조회가 가능하도록 백엔드 로직과 쿼리 최적화.",
            "조회 성능을 유지하면서 유연성을 높이기 위한 데이터 처리 로직 개선."
          ],
          achievements: [
            "사용자 요구사항을 반영한 다차월 조회 기능으로 고객 편의성 및 시스템 활용성 증대.",
            "최적화된 쿼리와 로직 개선으로 성능 저하 없이 확장 가능한 데이터 처리 구조 확보.",
            "개발된 API의 문서화를 통해 협업 부서 간 개발 및 유지보수 효율성 강화"
          ],
          techStack: {
            backend: "Spring Boot, Rest API",
            buildTools: "Maven",
            database: "Oracle",
            server: "Swagger",
            tools: ["Jenkins", "SecureCRT", "Trusted Orange", "UplusStuio(STS)"]
          }
        },
        {
          title: "전자세금계산서 이메일 발송 기능 API 개발",
          period: "2023.07.10 ~ 2023.09.28",
          description: [
            "TMS 이메일 발송 시스템과 연계하여 대상 등록 및 이메일 발송 로직 설계.",
            "전송 대상 관리 및 발송 프로세스 자동화 API 구현."
          ],
          achievements: [
            "대상 등록 및 관리 로직 설계로 발송 프로세스의 확장성과 안정성 확보.",
            "API 개발 및 문서화를 통해 협업 부서 간 생산성과 유지보수 편의성 향상."
          ],
          techStack: {
            backend: "Spring Boot, Rest API",
            buildTools: "Maven",
            database: "Oracle",
            tools: ["Jenkins", "Swagger", "TMS(이메일 발송 솔루션 시스템)"]
          }
        }
      ],
    }
  ];
  
  export default projects2;