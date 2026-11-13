// 프로젝트 경력의 단일 출처(single source of truth).
// 메인 포트폴리오의 Projects 포스터(소속 회사·팀 그룹 구조)와 출력용 이력서(/resume)가 모두 이 파일만 참조합니다.
//
// slug        : 프로젝트 고유 식별자 (#project-<slug> 앵커 및 아키텍처 다이어그램 매핑 키)
// affiliation : 소속 회사 및 부서/팀 표기
// title       : 포스터·이력서에 쓰는 정식 프로젝트 명칭
// achievements: { title, detail, result, relatedPosts?, references? }
//               result는 출력용 이력서의 성과 한 줄로 그대로 재사용됩니다.

const projects = [
  {
    slug: "jeonse-support-system",
    companyId: "microservice",
    company: "(주)마이크로 서비스",
    team: "SI 본부",
    affiliation: "(주)마이크로 서비스 | SI 본부",
    companyPeriod: "2025.09 ~ 2026.08",
    companySummary:
      "공공 행정 시스템 기능 개선, 조회 성능·보안 취약점 조치 및 서버 점검 자동화 수행",
    title: "전세사기 피해자 지원관리시스템 개발·운영 유지보수",
    shortTitle: "전세사기 피해자 지원관리시스템 개발·운영 유지보수",
    description:
      "전세사기 피해자 관리 시스템 레거시 고도화, 성능 최적화, 보안 강화, 운영 안정화 및 신규 기능 개발",
    period: "2025.09 ~ 2026.08",
    role: "시스템 운영·기능 개발",
    resumeKeyResult: "SAST 358건 → 4건 · 조회 53초 → 1초 미만 · 서버 점검 4시간 주기 자동화",
    skills: [
      { label: "핵심 기술", value: "Java, Spring, eGovFrame 4.1, MyBatis, CUBRID" },
      { label: "개발 환경", value: "JSP/JSTL, JavaScript/jQuery, Apache Tomcat 9, JBoss, Linux(Fedora)" },
      { label: "개발 도구", value: "Maven, SVN" },
      { label: "AI 활용 도구", value: "Claude, ChatGPT, Gemini" },
    ],
    mainTasks: [
      "요청 기반 개선 대응 및 오류 분석, 기능 유지보수·자동화 수행",
      "서버 용량 점검, 파일 관리, 리소스 모니터링 등 인프라 운영",
      "SVN 기반 JAR 패키징 및 SFTP/SSH 활용 운영 환경 배포",
    ],
    achievements: [
      /*
      {
        title: "CodeRay 기반 SAST 취약점 전수 분석 및 시큐어코딩 개선",
        detail:
          "CodeRay SAST 탐지 취약점 전수 분석 및 CWE 유형별 시큐어코딩 적용, 단순 코드 수정뿐 아니라 실행 경로 검증을 통해 미사용·벤더·테스트 코드까지 제거하여 애플리케이션 보안 품질 강화",
        result:
          "CodeRay 기반 SAST 취약점 358건을 CWE 유형별 분석·시큐어코딩하고 반복 재검증하여 최종 탐지 4건 달성",
        relatedPosts: [
          { slug: "cwe-79-xss-remediation", label: "CWE-79 XSS 200건 조치" },
          { slug: "cwe-476-null-dereference", label: "CWE-476 NPE 공통 유틸 해결" },
          { slug: "cwe-330-489-dead-code-removal", label: "CWE-330·489 미사용 코드 제거" },
          { slug: "cwe-209-error-message-exposure", label: "CWE-209 오류 메시지 노출 방지" },
        ],
      },
      {
        title: "국자원 웹 취약점 점검 사전 대응 및 보안 아키텍처 강화",
        detail:
          "KISA 표준 웹 취약점 점검 결과 기반 HIGH 6·MEDIUM 7·LOW 3 항목 개선 및 SQL Injection 오류 14건 대응, 9개 테이블·97개 컬럼 정적 SQL 분기 재설계와 Jasypt 공통 암호화 유틸 적용으로 4개 환경별 계정 정보 17건 보호",
        result:
          "보안 취약점 16건 개선, SQL Injection 14건 해소, 계정정보 17건 암호화 적용",
        relatedPosts: [
          { slug: "dynamic-to-static-sync-query", label: "망간 동기화 정적 쿼리 전환기" },
          { slug: "cwe-615-sensitive-comments", label: "주석 민감정보 제거 & 암호화" },
        ],
      },
      */
      {
        title: "CodeRay SAST · 웹 취약점 조치 및 연계 SQL 개선",
        detail:
          "CodeRay 결과를 CWE 유형별로 분류하고 Claude 세션을 나눠 분석·조치안 검토·구현·디버깅에 활용.\n시큐어코딩·미사용 코드 정리, 망간 동기화 정적 SQL 재설계(9개 테이블·97개 컬럼) 및 Jasypt 기반 4개 환경 계정 설정 암호화 수행.\n브라우저 동작 확인 후 직접 재테스트·AS-IS 데이터 대조로 반영 여부 판단",
        result:
          "SAST 취약점 358건 → 4건 감축, 웹 취약점 16건·SQL Injection 14건 해소 및 계정정보 17건 암호화",
        relatedPosts: [
          { slug: "claude-assisted-security-remediation", label: "Claude 세션 분리와 취약점 조치·검증 과정" },
          { slug: "dynamic-to-static-sync-query", label: "망간 동기화 정적 쿼리 전환기" },
          { slug: "cwe-79-xss-remediation", label: "CWE-79 XSS 200건 조치" },
          { slug: "cwe-476-null-dereference", label: "CWE-476 NPE 공통 유틸 해결" },
          { slug: "cwe-330-489-dead-code-removal", label: "CWE-330·489 미사용 코드 제거" },
          { slug: "cwe-209-error-message-exposure", label: "CWE-209 오류 메시지 노출 방지" },
          { slug: "cwe-615-sensitive-comments", label: "CWE-615 주석 민감정보 제거" },
        ],
      },
      /*
      {
        title: "개인정보 대량 암호화 패치 및 CI값 보안 강화",
        detail:
          "티빙 CI값 유출 사례 인지 후 가입·인증 컬럼 암호화 선제 조치, Damo 암복호화 솔루션 기반 CSQL nohup 백그라운드 처리로 서비스 중단 없이 대량 패치 완료",
        result:
          "행안부 연계 CI값 14만 건·개인정보 이력 로그 370만 건, 총 384만 건 암호화 적용",
        relatedPosts: [
          { slug: "csql-nohup-mass-patch", label: "csql·nohup 수백만 건 무중단 패치" },
        ],
        references: [
          {
            text: "티빙 CI값 유출 관련 보도 - JTBC",
            href: "https://news.jtbc.co.kr/article/NB12302277",
          },
        ],
      },
      */
      {
        title: "운영 행정망 Slow Query 분석 및 인덱스 튜닝",
        anchorId: "achievement-query-index-tuning",
        detail:
          "실행계획을 기반으로 Full Scan 및 병목 구간을 분석하고, 조회 패턴에 맞는 인덱스 설계와 SQL 조건 개선을 수행하여 반복 발생하는 Slow Query를 최적화",
        result: "조회 53초 → 1초 미만, 이후 월간 점검에서 해당 화면의 Slow Query 관련 특이사항 0건",
        relatedPosts: [
          { slug: "cubrid-query-plan-index-tuning", label: "53초 조회 CUBRID 복합 인덱스 설계" },
        ],
      },
      /*
      {
        title: "Markdown 기반 AI 유지보수 자동화 체계 구축",
        detail:
          "복잡한 전세사기 접수·심사 상태 흐름, 테이블 관계, 망간 동기화 규칙을 Markdown 컨텍스트 문서로 구조화하고 AI 활용 분석 프로세스를 적용하여 유지보수 효율 개선",
        result: "사용자 오류 재현 및 소스 영향도 분석 시간 30~40% 단축",
      },
      */
      {
        title: "인프라 용량 관리 모니터링 자동화 및 점검 프로세스 표준화",
        architectureSlug: "jeonse-support-system",
        architectureFigures: ["public-monitoring"],
        architectureLabel: "서버 점검 수집",
        detail:
          "Apache SSHD 의존성을 적용하여 SSH 기반 서버 접속 기능을 구현하고, CPU·메모리·디스크 사용률 정보를 주기 수집해 화면에서 시각적으로 확인 가능한 기능 개발",
        result:
          "서버 용량 정보를 4시간마다 수집하고 화면에서 조회하도록 구현해 수동 점검·월말 보고 업무 개선",
        relatedPosts: [
          { slug: "jsch-to-mina-sshd", label: "JSch 협상 실패와 MINA SSHD 전환" },
        ],
      },
    ],
  },
  {
    slug: "lgu-billing-gw",
    companyId: "abacus",
    company: "(주)애버커스",
    team: "빌링시스템팀",
    affiliation: "(주)애버커스 | 빌링시스템팀",
    companyPeriod: "2022.11 ~ 2025.05",
    companySummary:
      "LG U+ 빌링·GW 연계 시스템 유지보수 및 CloudXper 기업별 청구 관리 기능 개선",
    trackBadge: "개발·운영",
    title: "빌링 서비스·GW 연계 시스템 유지보수",
    shortTitle: "빌링 서비스·GW 연계 시스템 유지보수",
    description:
      "Kafka 기반 청구·빌링 GW 시스템의 개발 및 운영, 이기종 시스템 연동 및 데이터 흐름 표준화",
    period: "2022.11 ~ 2025.05",
    role: "SM/SI 서비스 개발 및 연동 시스템 유지보수",
    resumeKeyResult: "주간 연동 오류 약 70건 → 5건 · 인코딩 오류 95% 감소",
    skills: [
      { label: "핵심 기술", value: "Java, Spring Boot(2.x.x), Spring Batch(4.x.x), MyBatis, Oracle, Redis, Kafka" },
      { label: "개발 환경", value: "Linux(CentOS)" },
      { label: "개발 도구", value: "Maven, GitLab, Jenkins, Swagger" },
      { label: "모니터링", value: "WhaTap" },
    ],
    mainTasks: [
      "Kafka Topic 기반 데이터 처리 로직 설계·구현 및 연동 시스템 모니터링·장애 대응",
      "빌링 요금·위약금 조회 및 전자세금계산서·청구 API 설계·개발",
      "Spring Batch 기반 배치 처리 및 리포팅 자동화 시스템 개발·운영",
    ],
    achievements: [
      {
        title: "GW 연동 오류 분석 및 대응 체계 개선",
        detail:
          "WhaTap 히트맵 기반 실패 패턴 분석, 오류 유형별 대응 시나리오 매뉴얼화 및 데이터 보정 스크립트 정비로 즉시 대응 절차 마련. 파트별 오류를 종합·공유하는 일일 메일 보고 체계 구축으로 운영자 대응·PL 검토 지원",
        result: "주간 Kafka 연동 오류 약 70건 → 5건",
        relatedPosts: [
          { slug: "kafka-gw-data-integrity", label: "Kafka 도메인 GW 데이터 정합성 지키기" },
          { slug: "gw-daily-error-reporting-workflow", label: "일일 오류 보고와 담당 파트 조치 연결" },
        ],
      },
      {
        title: "GW 연동 데이터 검증 공통화 및 정합성 대응",
        architectureSlug: "lgu-billing-gw",
        detail:
          "Oracle ↔ MySQL 연동의 문자셋·바이트 길이 문제를 Java 변환 로직과 Subscriber 검증으로 개선, 연동 검증 로직을 공통 모듈로 표준화하여 신규 연동 추가 시 자동 적용",
        result: "인코딩 오류 95% 감소, 신규 연동 실패율 5% 미만 유지",
        relatedPosts: [
            { slug: "gw-encoding-byte-length-validation", label: "문자셋 차이와 Java 바이트 길이 보정" },
        ],
      },
      /*
      {
        title: "청구 도메인 요금·위약금 조회 API 개발 및 조회·리포팅 성능 개선",
        detail:
          "고객 계약·요금제·청구 통합 조회 REST API 설계·개발, Oracle 스칼라 서브쿼리 묵시적 형변환 실행계획 튜닝 및 건수 기반 POI(XSSF/SXSSF) 대용량 엑셀 다운로드 구현",
        result:
          "실시간 요금 시뮬레이터 API 제공, 슬로우 쿼리 인덱스 접근 전환 및 수작업 엑셀 추출 자동화",
        relatedPosts: [
          { slug: "oracle-hint-subquery-fullscan", label: "Oracle 묵시적 형변환 & 실행계획 튜닝" },
          { slug: "sxssf-vs-xssf-excel-download", label: "XSSF vs SXSSF 대용량 엑셀 기준" },
        ],
      },
      */
    ],
  },
  {
    slug: "cloudxper-billing",
    companyId: "abacus",
    company: "(주)애버커스",
    team: "빌링시스템팀",
    affiliation: "(주)애버커스 | 빌링시스템팀",
    companyPeriod: "2022.11 ~ 2025.05",
    companySummary:
      "LG U+ 빌링·GW 연계 시스템 유지보수 및 CloudXper 기업별 청구 관리 기능 개선",
    trackBadge: "SI 프로젝트",
    title: "CloudXper 플랫폼 고도화 프로젝트",
    shortTitle: "CloudXper 플랫폼 고도화 프로젝트",
    description:
      "클라우드 저장소 대여 내역과 기업별 청구 정보를 관리하는 서비스의 백엔드 기능 개선 및 대용량 조회 최적화",
    period: "2024.10 ~ 2025.02",
    role: "플랫폼 서버 백엔드 개발",
    skills: [
      { label: "핵심 기술", value: "Java, Spring Boot(3.x.x), MyBatis, MySQL, Redis, React" },
      { label: "개발 환경", value: "Linux(Ubuntu)" },
      { label: "개발 도구", value: "Gradle, GitLab, Jenkins, Swagger, SonarQube" },
    ],
    mainTasks: [
      "가입·청구·상품·공통 조회 REST API 구현 및 청구 산정 결과 조회 SQL 작성",
      "프로젝트 구조 표준 정의 및 코드 리팩토링 후 팀 공유 및 적용",
      "로그인 사용자별 권한 조회 결과를 Redis에 캐싱하는 모듈 개발",
    ],
    achievements: [
      {
        title: "대용량 데이터 조회 병렬화 및 응답 시간 단축",
        detail:
          "서비스 계층으로 연관 조회·결과 조립 로직 통합, 병렬 스트림 적용으로 조회 대기 시간 및 API 응답 속도 개선",
        result: "API 응답 시간 약 98% 단축 (약 480,000ms → 10,000ms 이내)",
        relatedPosts: [
          { slug: "mybatis-builder-parallel-refactoring", label: "DB 100만 건 환경의 조회 병렬화" },
        ],
      },
      {
        title: "로그인 권한 조회 캐시 구현 및 응답 개선",
        architectureSlug: "cloudxper-billing",
        detail:
          "로그인·재로그인 시 권한 API 조회 결과를 Redis에 저장·갱신하고, 이후 요청에서 재사용해 반복 호출 감소",
        result:
          "인증·권한 조회 병목을 제거하여 페이지 전환 및 렌더링 응답 속도 개선(10초 -> 0.10초 이내)",
        relatedPosts: [
          { slug: "redis-permission-cache-ttl", label: "Redis 권한 캐시와 TTL·무효화" },
        ],
      },
      /*
      {
        title: "코드 리팩토링 및 개발 컨벤션 표준화",
        architectureSlug: "cloudxper-billing",
        detail:
          "Builder Pattern과 변환 메서드로 객체 생성·조립 방식 정리, 패키지 구조와 작성 규칙을 예제 코드·PDF 가이드로 정리해 팀에 공유",
        // result: "유지보수성·협업 효율 향상, SonarQube 코드 품질 지표 개선",
        result: "객체 생성 중복 제거 및 유지보수성·협업 효율 향상",
        relatedPosts: [
          { slug: "backend-code-convention-standardization", label: "4인 백엔드 코드 표준화 & PDF 컨벤션 공유기" },
        ],
      },
      */
    ],
  },
];

/** 소속 회사·부서 단위로 프로젝트를 묶어서 반환합니다. */
export function getCareerGroups({ splitProjects = false } = {}) {
  const groups = [];
  const map = new Map();

  projects.forEach((project) => {
    let group = map.get(project.companyId);
    if (!group) {
      group = {
        companyId: project.companyId,
        company: project.company,
        team: project.team,
        affiliation: project.affiliation,
        period: project.companyPeriod || project.period,
        summary: project.companySummary,
        projects: [],
      };
      map.set(project.companyId, group);
      groups.push(group);
    }
    group.projects.push(project);
  });

  return groups.map((group) => {
    if (group.companyId !== "abacus" || splitProjects) return group;
    const workScopes = group.projects;
    const combined = {
      ...workScopes[0],
      title: "빌링 서비스·GW 연계 시스템 유지보수",
      shortTitle: "빌링 서비스·GW 연계 시스템 유지보수",
      description: "청구·요금 관리 등 빌링 비즈니스 기능과 공통 모듈 개발, 대내외 데이터 연계 및 운영 안정화 수행",
      period: group.period,
      role: "시스템 운영·기능 개발",
      trackBadge: null,
      workScopes,
      skills: [...new Set(workScopes.flatMap((scope) => scope.skills.map((skill) => skill.label)))].map((label) => ({
        label,
        value: [...new Set(workScopes.flatMap((scope) => scope.skills)
          .filter((skill) => skill.label === label)
          .flatMap((skill) => skill.value.split(","))
          .map((token) => token.trim())
          .filter(Boolean)
          .map((token) => {
            if (/^Spring Boot\(/.test(token)) return "Spring Boot";
            if (/^Linux\(/.test(token)) return "Linux(CentOS·Ubuntu)";
            return token;
          }))].join(", "),
      })),
      mainTasks: [
        "Kafka 기반 GW 연동 시스템 모니터링 및 장애 대응, 로그 분석을 통한 원인 분석 및 조치",
        "SI 프로젝트 모듈 설계 및 빌링 서비스 개발",
        "도메인(빌링-청구) 시스템, Spring 기반 배치, API 서비스 개발 및 유지보수",
      ],
      achievements: workScopes.flatMap((scope) => scope.achievements),
    };
    return { ...group, projects: [combined] };
  });
}

export function findProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug);
}

export default projects;
