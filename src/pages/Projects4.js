const projects4 = [
    {
      projectName: "LG CNS 빌링 GW 파트 연동 SM 개발 시스템 운영 유지보수",
      period: "2025.02.07 ~ 2025.04.30",
      mainTasks: [
        "GW 파트 연동 SM 개발 시스템 운영 유지보수"
      ],
      projects: [
        {
          title: "GW 파트 연동 시스템 모니터링 운영",
          period: "2025.02.07 ~ 2025.04.30",
          description: [
            "Ucube Eventuate 모니터링 및 연동 관리",
            "발행 ↔ 구독 연동 오류 조치 및 관리",
            "데이터 오류 및 식별 조치 대상 메일 문의 응대",
          ],
          achievements: [
            "오류 데이터 식별 및 조치를 통해 청구/과금 작업 시 발생하는 오류 감소"
          ],
          techStack: {
            database: "Oracle, MySQL",
            tools: ["Ucube", "Trusted Orange", "IntelliJ"]
          }
        },
        {
          title: "빌링 GW 연동 소스 컬럼 매핑 변환 규칙 추가",
          period: "2025.03.14 ~ 2025.03.27",
          description: [
            "substrb 자바 연동 로직 구현",
            "연동 컬럼이 바이트 제한을 받을 수 있도록 로직 설계",
            "변환 규칙 적용을 위한 테이블 응용 및 적용",
          ],
          achievements: [
            "연동 데이터의 바이트 제한 문제 해결로 데이터 적재 오류 방지.",
            "substrb 연동 로직 적용으로 데이터 변환 안정성 향상",
            "기존 GW 연동 로직과의 호환성을 유지하며 변환 규칙 추가"
          ],
          techStack: {
            backend: "Spring Boot, Kafka, Redis",
            buildTools: "Maven",
            database: "Oracle",
            tools: ["Jenkins", "Trusted Orange", "UplusStudio(STS)"]
          }
        },
        {
          title: "빌링 GW 신규 연동 토픽 및 추가 기능 개발",
          period: "2025.03.01 ~ 2025.03.13",
          description: [
            "1-1. from_nucm_mblcntcdcntamt_tb_event",
            "모바일 계약 매핑 신규 토픽 연동 로직 개발 (신규 토픽 생성)",
            "1-2. to_nubo_itgwmblbillacntchg_sg_event",
            "MVNO 할인 간소화 등록 및 청구계정 변경 대상 매핑 로직 추가",
            "1-3 from_nuca_intgbill_event",
            "기존 연동 이벤트에 '청구계정 변경 상태 사유코드' 필드 추가",
          ],
          achievements: [
            "모바일 계약 매핑 프로세스 설계, 신규 토픽 연동 로직개발.",
            "MVNO 할인 및 청구계정 변경 관련 처리 효율성 증대."
          ],
          techStack: {
            backend: "Spring Boot, Kafka, Redis",
            buildTools: "Maven",
            database: "Oracle",
            tools: ["Jenkins", "Trusted Orange", "UplusStudio(STS)"]
          }
        },
      ],
    }
  ];
  
  export default projects4;