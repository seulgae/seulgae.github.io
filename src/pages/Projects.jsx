const projects = [
  {
    projectName: "전세사기 피해자 지원관리시스템 운영·고도화",
    description:
      "전세사기 피해자 관리 시스템 레거시 고도화, 성능 최적화, 보안 강화, 운영 안정화 및 신규 기능개발",
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
        title: "SAST 기반 XSS 취약점 전수 점검 및 조치",
        detail:
          "SAST 점검으로 식별된 XSS 취약점을 1차 정책분석 → 조치 → 2차 재검증 프로세스로 전수 처리하고, 출력 컨텍스트별로 c:out·fn:escapeXml·egovc:reXSS·JS Escape를 차등 적용",
        result:
          "JSP 화면 260개 점검·217개 조치 완료, 이중 인코딩으로 인한 화면 깨짐 동시 해소",
      },
      {
        title: "국자원 웹 취약점 점검 사전 대응 및 보안 아키텍처 강화",
        detail:
          "KISA 표준 웹 취약점 점검 결과 기반 HIGH 6·MEDIUM 7·LOW 3 항목 개선 및 SQL Injection 오류 14건 대응, 9개 테이블·97개 컬럼 정적 SQL 분기 재설계와 Jasypt 공통 암호화 유틸 적용으로 4개 환경별 계정 정보 17건 보호",
        result:
          "보안 취약점 16건 개선, SQL Injection 14건 해소, 계정정보 17건 암호화 적용",
      },
      {
        title: "개인정보 대량 암호화 패치 및 CI값 보안 강화",
        detail:
          "티빙 CI값 유출 사례 인지 후 가입·인증 컬럼 암호화 선제 조치, Damo 암복호화 솔루션 기반 CSQL nohup 백그라운드 처리로 서비스 중단 없이 대량 패치 완료",
        result:
          "행안부 연계 CI값 14만 건·개인정보 이력 로그 370만 건, 총 384만 건 암호화 적용",
        references: [
          {
            text: "티빙 CI값 유출 관련 보도 - JTBC",
            href: "https://news.jtbc.co.kr/article/NB12302277",
          },
        ],
      },
      {
        title: "운영 행정망 Slow Query 분석 및 인덱스 튜닝",
        detail:
          "DBeaver 실행계획(EXPLAIN)을 기반으로 Full Scan 및 병목 구간을 분석하고, 조회 패턴에 맞는 인덱스 설계와 SQL 조건 개선을 수행하여 반복 발생하는 Slow Query를 최적화",
        result: "53초 소요 Slow Query 개선 및 월간 운영 점검 특이사항 0건 유지",
      },
      {
        title: "Markdown 기반 AI 유지보수 자동화 체계 구축",
        detail:
          "전세사기 도메인 업무를 Markdown 기반 템플릿으로 정형화하고 AI 활용 개발 프로세스를 적용하여 기능 개발 속도 및 업무 처리 효율 개선",
        result: "사용자 오류 재현 및 소스 분석 시간 30~40% 단축",
      },
      {
        title: "인프라 용량 관리 모니터링 자동화 및 점검 프로세스 표준화",
        detail:
          "Apache SSHD 의존성을 적용하여 SSH 기반 서버 접속 기능을 구현하고, CPU·메모리·디스크 사용률 정보를 실시간 수집해 화면에서 시각적으로 확인 가능한 기능 개발",
        result: "CLI 수동 점검 화면 기반 모니터링으로 전환, 메모리·시스템 용량 사용률 30% 이하 관리",
      },
    ],
  },
];

export default projects;
