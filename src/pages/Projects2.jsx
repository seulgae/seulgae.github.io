const projects2 = [
  {
    projectName: "LG CNS 빌링 디지털 서비스팀 SI 개발",
    period: "2022.11.21 ~ 2024.10.07",
    mainTasks: [
      "LG CNS 빌링 디지털 서비스팀 청구파트 SM/SI 개발"
    ],
    projects: [
      {
        title: "요금 시뮬레이션 3개월 청구요금 조회 API 개발",
        period: "2024.08.15 ~ 2024.09.14",
        situation: ["유플러스에서는 고객이 요금제에 가입할 때, 다양한 결합 상품 및 조건에 따라 어느 정도의 요금이 발생하는지 사전에 파악하고자 하는 니즈가 있었음."
                  + " 기존에는 이를 자동화된 방식으로 확인할 수 있는 수단이 없었고, 타 통신사처럼 요금 예측을 제공할 수 있는 시스템이 부재했음."],
        task: ["고객이 실제 사용 중인 요금제 상품 기준으로 전월, 당월, 익월의 3개월 요금을 조회하고 예측할 수 있도록" 
              + "고객의 3개월 요금 조회 API 개발요청(사용료, 할인료). 이 API는 실시간 조회 및 다양한 요금 조건을 반영할 수 있어야 했음.",
                "최근 3개월간 청구 데이터를 분석하여 고객이 특정 요금제에 가입할 경우 예상되는 요금을 산출하는 기능개발."],
        action: [
          "요금 시뮬레이터의 기본 구조 설계 및 데이터 흐름 정의",
          "고객 식별을 통한 사용 요금제 정보 조회 및 요금 계산 로직 구현",
          "실시간으로 고객의 3개월 요금 데이터를 계산하여 반환하는 API 개발",
          "API 테스트 및 검증을 통해 정확한 요금 예측이 가능하도록 개선"
        ],
        result: ["상담원이 고객과 통화 중, 고객이 가입하려는 요금제와 결합 상품 조건에 따라 예상 요금을 즉시 확인할 수 있게 되었음.", 
                 "유플러스에서 제공하는 요금 안내의 정확도와 신뢰도가 향상되었고, 고객 맞춤형 요금 상담이 가능해졌음." ],
        techStack: {
          Backend: ["Spring Boot", "Rest API"],
          Framework: "Waffle Framework(Spring F/W 기반의 유플러스 자사 F/W)",
          Library: ["Swagger", "MyBatis"],
          buildTools: "Maven",
          Infra: ["Jenkins", "GitLab", "WhaTap"],
          Server : ["Linux"],
          DB: ["Oracle"],
          Tools: ["Trusted Orange", "UplusStuio(STS)"]
        }
      },
      {
        title: "요금 시뮬레이션 핫빌 결과 조회 API 개발",
        period: "2024.08.15 ~ 2024.09.14",
        situation: ["위 시뮬레이터 결과에 이어 고객이 요금제에 가입하거나 해지를 고려할 때, 다양한 조건에 따른 요금 예측 또는 해지 시 위약금을 미리 확인할 수 있도록 사용할 수 있는 호출성 API가 없었음."
                   +" 특히, 가입 전 요금 예측뿐만 아니라 해지 후 발생하는 해지반환금(Hotbill)에 대한 실시간 안내를 위해 기능 추가 개발."],
        task: ["고객의 실제 사용 요금제를 기준으로 전월, 당월, 익월 요금을 예측하는 요금 시뮬레이터 API 개발", 
              "고객이 몇 개월 뒤 해지할 경우 발생하는 위약금(Hotbill) 정보를 반환하는 시뮬레이터 API 추가 개발",
        ],
        action: [
          "고객 식별을 통한 사용 요금제 및 상품 정보 조회 로직 중 전월, 당월, 익월 요금을 계산할 수 있는 비지니스 로직 개발",
          "기존 유큐브 화면 핫빌 시스템과 연계하여, 위약금 조건/계산 로직을 참조하여 API로 구현",
        ],
        result: ["상담원이 고객과의 통화 중, 요금제 및 결합 조건에 따른 해지반환금 예측 정보를 빠르게 제공 가능", 
                 "고객 해지 요청 시, 몇 개월 뒤 해지했을 때 발생하는 위약금 정보를 실시간으로 조회하여 정확한 요금 안내 제공",
        ],
        techStack: {
          Backend: ["Spring Boot", "Rest API"],
          Framework: "Waffle Framework(Spring F/W 기반의 유플러스 자사 F/W)",
          Library: ["Swagger", "MyBatis"],
          buildTools: "Maven",
          Infra: ["Jenkins", "GitLab", "WhaTap"],
          Server : ["Linux"],
          DB: ["Oracle"],
          Tools: ["Trusted Orange", "UplusStuio(STS)"]
        }
      },
      {
          title: "국내 75 이상 요금제 로밍 종량 데이터 할인 생성 배치 작업 개발",
          period: "2024.04.01 ~ 2024.04.25",
          situation: ["유플러스는 국내 75 요금제 가입자에게 해외 로밍 데이터 요금을 면제하는 신규 혜택 정책을 도입하게 되었고, 이 혜택을 정기적으로 자동 적용할 수 있는 배치 프로그램이 필요한 상황이었음."],
          task: ["75 요금제 가입자를 식별하고, 대상자에게 로밍 할인 상품을 자동 등록하여 요금이 발생하지 않도록 처리하는 신규 배치 프로그램을 개발 요청"],
          action: [
            "75 요금제에 해당하는 고객을 그룹 상품 및 서비스 코드 기준으로 필터링",
            "기존의 할인 등록 프로세스를 분석해 재사용 가능한 로직을 참고",
            "신규 요금제 혜택을 자동 반영하기 위해 Spring Batch의 Tasklet 기반 배치 구조로 설계",
            "등록 대상이 없거나 실패한 경우에 대한 예외 처리 및 결과 로그 출력 로직 포함",
            "JobPass 스케줄러 시스템과 연동함으로써, 운영자가 자동/수동으로 관리할 수 있도록 구성"
          ],
          result: ["75 요금제 신규 가입자에게 로밍 데이터 면제 혜택이 자동으로 적용되도록 프로그램 개발", 
                   "혜택 누락 없이 정확한 정책 반영 가능, 정기 배치 자동 실행으로 업무 효율성 향상"],
          techStack: {
          Backend: ["Spring Boot", "Spring Batch"],
          Framework: "Waffle Framework(Spring F/W 기반의 유플러스 자사 F/W)",
          Library: ["MyBatis"],
          buildTools: "Maven",
          Infra: ["Jenkins", "GitLab", "SFTP", "WhaTap", "JobPass"],
          Server : ["Linux"],
          DB: ["Oracle"],
          Tools: ["Trusted Orange", "UplusStuio(STS)", "SecureCRT"]
        }
      },
      {
        title: "전자세금계산서 전용 이메일 템플릿, 다차월 조회 API, 이메일 발송 기능 API 개발",
        period: "2023.07.10 ~ 2023.09.28",
        situation: ["기업 고객으로부터 전자세금계산서를 이메일 형식으로 수신하고 싶다는 요구가 있었으나, 기존 시스템에는 이를 위한 이메일 템플릿 및 발송 기능이 부재하였고,"
                  +" 과거 세금계산서를 다차월로 조회할 수 있는 기능 또한 부족하여, 개발 요청."],
        task: ["이메일을 통해 세금계산서 정보를 직관적으로 확인할 수 있도록 HTML 기반 템플릿 및 다차월 조회 API, 발송 대상 등록 신규 개발요청.", 
               "발송 시점과 대상 관리와 템플릿 연동을 위한 TMS 솔루션 이해, 전용 테이블 응용 및 데이터 흐름 구성 필요."
        ],
        action: [
          "세금계산서 전용 이메일 템플릿을 HTML로 구현하여, 항목별 정보가 명확히 보이도록 디자인",
          "발송 대상 데이터를 관리하기 위한 발송 테이블 응용, 해당 테이블에 대상 고객을 등록할 수 있는 API 추가 개발",
          "전체 데이터 흐름과 발송 타이밍을 고려하여, 이메일 발송 TMS 이메일 솔루션 사용 및 스케줄러 사용"
        ],
        result: ["기업 고객은 과거 및 현재 세금계산서를 이메일로 손쉽게 수신할 수 있게 되었고, "
                + "별도 시스템 접근 없이 템플릿을 통해 바로 확인 가능한 사용자 경험을 제공함", 
                 "다차월 조회 및 발송 등록 API를 통해 운영 프로세스 자동화가 가능해졌으며, "
                + "기존 수동 발송 대비 발송 정확도 및 편의성 향상", 
        ],
        techStack: {
          Frontend: ["HTML5", "CSS", "JavaScript"],
          Backend: ["Spring Boot", "Rest API"],
          Framework: "Waffle Framework(Spring F/W 기반의 유플러스 자사 F/W)",
          buildTools: "Maven",
          Library: ["Swagger", "MyBatis"],
          Infra: ["TMS(UPlUS 이메일 발송 솔루션 시스템)", "SFTP", "Jenkins", "GitLab", "WhaTap"],
          Server : ["Linux"],
          DB: ["Oracle"],
          Tools: ["Trusted Orange", "UplusStuio(STS), EditPlus, VsCode"]
        }
      },
    ],
  }
];

export default projects2;