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
        title: "개인정보 대량 암호화 패치 및 CI값 보안 강화",
        detail:
          "티빙 CI값 유출 사례 인지 후 가입·인증 컬럼 암호화 선제 조치, 디아모 암복호화 솔루션 기반 CSQL nohup 백그라운드 처리로 서비스 중단 없이 대량 패치 완료",
        result: "행안부 연계 CI값 10만 건·개인정보 이력 300만 건, 총 310만 건 암호화",
        references: [
          {
            text: "티빙 CI값 유출 관련 보도 - JTBC",
            href: "https://news.jtbc.co.kr/article/NB12302277",
          },
        ],
      },
      {
        title: "의결기한 당일 민원인 알림톡 발송 기능 신규 개발",
        detail:
          "의결기한 초과로 인한 민원인 피해 방지를 위해 기한 당일 알림톡 자동 발송 기능 신규 개발, 새벽 1시 당일 기한 도래 대상(주말 포함) 자동 추출 후 오전 10시 nuri2 알림톡 일괄 발송 배치 구조 구현",
        result: "의결기한 도래 민원인 알림 발송률 100% 달성, 주말 도래건 포함 누락률 0%",
        references: [
          {
            text: "의결기한 초과 관련 보도 - 네이버뉴스",
            href: "https://n.news.naver.com/mnews/article/088/0001013871?sid=102",
          },
        ],
      },
      {
        title: "국자원 웹 취약점 점검 사전 대응 및 보안 아키텍처 강화",
        detail:
          "웹 취약점 점검 결과 기반 HIGH 6·MEDIUM 7·LOW 3 항목 개선 및 SQL Injection 오류 14건 대응 수행, 9개 테이블·97개 컬럼 정적 SQL 분기 재설계와 Jasypt 공통 암호화 유틸 적용으로 4개 환경별 계정 정보 17건 보호",
        result:
          "보안 취약점 16건 개선, SQL Injection 오류 14건 대응 및 환경별 계정정보 17건 암호화 적용",
      },
      {
        title: "XSS 취약점 전수 점검 및 출처 컨텍스트별 조치 표준화",
        detail:
          "SAST 점검 식별 XSS를 1차 정책분석·조치, 2차 재검증 프로세스로 전수 처리하고 EL·DOM·이벤트 핸들러·URL 스킴·JSP expression 등 출력 컨텍스트별 escape 적용 기준을 표준화, CKEditor 본문은 커스텀 태그로 정책분석 미검출과 디자인 보존을 동시에 달성",
        result:
          "JSP 화면 260개 점검·217개 조치 완료, 입출력 이중 인코딩으로 인한 화면 깨짐 동시 해소",
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
