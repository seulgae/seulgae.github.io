const projects = [
    {
      projectName: "LG CNS 빌링 디지털 서비스팀 SM 개발/운영",
      period: "2022.11.21 ~ 2024.10.07",
      mainTasks: [
        "유플러스 청구 파트 시스템 유지보수"
      ],
      projects: [
        {
          title: "GW 모니터링 데이터 연동 diff건 조치 및 관리",
          period: "2024.01.29 ~ 2024.09.26",
          description: [
            "GW 모니터링 사이트를 활용해 데이터 일관성을 유지.",
            "원부 DB와 응용 DB 간 검증 쿼리 실행.",
            "불일치 데이터(difference) 탐지 및 수정."
          ],
          achievements: [
            "데이터 불일치 문제를 선제적으로 해결하여 연동 간 데이터 정확도를 99%로 향상 및 유지."
          ],
          techStack: {
            messagingSystem: "Kafka (실시간 비동기 통신)",
            database: ["Oracle (Orange)", "MySQL (DBeaver)"]
          }
        },
        {
          title: "캘린더 테스트 수행 결과 내역 엑셀 표기 개선",
          period: "2024.01.26 ~ 2024.02.22",
          description: [
            "테스트 수행 결과 데이터를 자동화된 방식으로 엑셀 형식에 출력.",
            "기존 자바 I/O 기반의 데이터 처리 로직을 개선하여 Apache POI를 활용한 엑셀 파일 생성 및 처리 기능을 구현."
          ],
          achievements: [
            "운영자가 텍스트 파일을 엑셀로 수작업 변환할 필요 없이, 결과를 바로 전달할 수 있는 환경을 구축하여 편의성 증대."
          ],
          techStack: {
            backend: "Spring Batch",
            buildTools: "Maven",
            library: "Apache POI",
            database: "Oracle",
            tools: ["Jenkins", "SecureCRT", "Trusted Orange", "UplusStudio"]
          }
        },
        {
          title: "유플러스, MVNO 이메일 청구서 13종 표기 개선",
          period: "2023.05.31 ~ 2023.08.26",
          description: [
            "이메일 청구서 내 휴대폰 이용 내역에 대한 셀 병합 조건 추가 및 수정.",
            "청구서 하단 문구를 요구사항에 맞게 수정 및 반영하여 고객이 필요한 정보를 명확히 이해할 수 있도록 개선.",
            "이메일 템플릿의 구조를 개선하여 다양한 청구서 유형에 대응 가능하도록 작업."
          ],
          achievements: [
            "고객이 이메일 청구서에서 휴대폰 이용 내역을 보다 쉽게 확인할 수 있게 되어 정보 전달의 효율성 향상."
          ],
          techStack: {
            frontend: ["HTML5", "CSS", "JavaScript"],
            fileTransfer: "SFTP (FileZilla)",
            tools: ["Trusted Orange", "EditPlus(HTML)"]
          }
        },
        {
          title: "V컬러링 Biz 상품의 개인 과금 유형 추가 개발",
          period: "2023.02.01 ~ 2023.03.23",
          description: [
            "개인 과금 유형 추가를 위해 연동 파일(B, C, D)을 신규로 정의 및 추가.",
            "SFTP 서버와 연동하여 파일 업로드 프로세스를 구현."
          ],
          achievements: [
            "기존 하나의 배치 프로그램이 한 가지 작업만 처리할 수 있었던 구조를 다양한 파일을 처리할 수 있도록 개선하여 작업 효율성을 향상.",
            "자동화된 파일 업로드 프로세스를 통해 수동 작업을 축소시켜 운영자 편의성 증대."
          ],
          techStack: {
            backend: "Spring Batch",
            buildTools: "Maven",
            database: "Oracle (Orange)",
            server: "Linux",
            tools: ["Jenkins", "SecureCRT", "Trusted Orange", "UplusStudio"]
          }
        }
      ],
    }
  ];
  
  export default projects;