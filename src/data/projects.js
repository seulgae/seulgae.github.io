// 프로젝트 경력의 단일 출처(single source of truth).
// 상세 페이지(/projects/:slug), 사이드바 서브메뉴, 출력용 이력서가 모두 이 파일만 참조합니다.
// 항목을 추가하려면 아래 배열에 객체 하나를 넣으면 됩니다. 라우트/메뉴/이력서는 자동 반영됩니다.
//
// slug        : URL 경로 (/projects/<slug>). 변경하면 기존 링크가 깨지므로 신중히.
// title       : 상세 페이지·이력서에 쓰는 정식 명칭
// shortTitle  : 사이드바 메뉴처럼 폭이 좁은 곳에서 쓰는 축약 명칭 (없으면 title 사용)
// achievements: { title, detail, result, references? }
//               result는 이력서의 성과 한 줄로 그대로 재사용됩니다.

const projects = [
  {
    slug: "jeonse-support-system",
    title: "전세사기 피해자 지원관리시스템 운영·고도화",
    shortTitle: "전세사기 피해자 지원관리시스템 운영·고도화",
    description:
      "전세사기 피해자 관리 시스템 레거시 고도화, 성능 최적화, 보안 강화, 운영 안정화 및 신규 기능개발",
    period: "2025.09 ~ 2026.08",
    role: "시스템 운영·기능 개발",
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
        title: "CodeRay 기반 SAST 취약점 전수 분석 및 시큐어코딩 개선",
        detail:
          "CodeRay SAST 탐지 취약점 전수 분석 및 CWE 유형별 시큐어코딩 적용, 단순 코드 수정뿐 아니라 실행 경로 검증을 통해 미사용·벤더·테스트 코드까지 제거하여 애플리케이션 보안 품질 강화",
        result:
          "CodeRay 기반 SAST 취약점 358건을 CWE 유형별 분석·시큐어코딩하고 반복 재검증하여 최종 탐지 4건 달성",
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
        result:
          "CLI 수동 점검 화면 기반 모니터링으로 전환, 메모리·시스템 용량 사용률 30% 이하 관리",
      },
    ],
  },
  {
    slug: "cloudxper-billing",
    title: "LG CNS CloudXper 클라우드 빌링 플랫폼 고도화",
    shortTitle: "CloudXper 클라우드 빌링 플랫폼 고도화",
    description:
      "AWS · GCP · Azure · Kakao 저장소 대여·청구 통합 관리 플랫폼의 백엔드 아키텍처 개선 및 대용량 데이터 처리 최적화",
    period: "2024.10 ~ 2025.02",
    role: "플랫폼 서버 백엔드 개발",
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
        result:
          "인증·권한 조회 병목을 제거하여 페이지 전환 및 렌더링 응답 속도 개선(10초 -> 0.10초 이내)",
      },
      {
        title: "코드 리팩토링 및 개발 컨벤션 표준화",
        detail:
          "Builder Pattern 도입으로 객체 생성 중복 제거, 패키지 구조 재정립과 코딩 컨벤션 문서를 직접 작성·팀에 공유하여 온보딩 시간 단축",
        result: "유지보수성·협업 효율 향상, SonarQube 코드 품질 지표 개선",
      },
    ],
  },
  {
    slug: "lgu-billing-gw",
    title: "LG U+ 청구 및 빌링 GW 시스템 개발·운영 유지보수",
    shortTitle: "빌링 GW 시스템 개발·운영 유지보수",
    description:
      "Kafka 기반 청구·빌링 GW 시스템의 개발 및 운영, 이기종 시스템 연동 및 데이터 흐름 표준화",
    period: "2022.11 ~ 2025.05",
    role: "SM/SI 서비스 개발 및 연동 시스템 유지보수",
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
          "고객 계약·요금제·청구 정보를 통합 조회하는 REST API를 설계·개발하여 상담 시스템의 실시간 요금·위약금 조회 기능 구현",
        result:
          "요금 분석 시뮬레이터 실시간 조회 API 제공, 3개월 예상 요금 안내 상담 업무 효율 향상",
      },
    ],
  },
];

export function findProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug);
}

export default projects;
