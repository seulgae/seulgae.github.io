// 인물 정보 및 핵심 역량의 단일 출처(SSOT).
// 포트폴리오 각 포스터(About, Skills)와 출력용 이력서(/resume)가 모두 이 파일만 참조합니다.
// 만 나이는 birthDate에서 계산하므로 해가 바뀌어도 손댈 필요가 없습니다.

const skillCompetencies = [
  {
    category: "Backend & Architecture",
    resumeLabel: "Back-End",
    summary: "엔터프라이즈 비즈니스 로직 구현, 계층 분리 리팩토링 및 배치·비동기 연동",
    items: [
      "Java",
      "Spring",
      "Spring Boot",
      "eGovFrame 4.1",
      "Spring Batch",
      "MyBatis",
      "REST API",
      "JSP/JSTL",
      "Apache MINA SSHD",
      "Jasypt",
    ],
    evidence:
      "백엔드 패키지·계층 표준화(Request·Response DTO/Model/Builder), SSH 비동기 타임아웃 제어 및 도메인 GW 변환 설계",
  },
  {
    category: "Database & Performance",
    resumeLabel: "Database / Cache",
    summary: "실행계획(EXPLAIN) 기반 슬로우 쿼리 튜닝, 복합 인덱스 설계 및 무중단 대량 DML",
    items: ["Oracle", "MySQL", "CUBRID", "Redis", "SQLD"],
    evidence:
      // "CUBRID 53초→1초 미만 복합 인덱스, Oracle 묵시적 형변환 튜닝, Redis 세션 TTL 동기화 캐싱(10초→0.1초)",
      "CUBRID 53초→1초 미만 복합 인덱스, 이기종 DB(Oracle·MySQL) 정합성 검증, Redis 세션 TTL 동기화 캐싱(10초→0.10초)",
  },
  {
    category: "Messaging · Infra · Security",
    resumeLabel: "Infra / Tools",
    summary: "이벤트 기반 데이터 정합성(DI) 관리, SAST 시큐어코딩 및 리눅스 운영 자동화",
    items: [
      "Apache Kafka",
      "Linux",
      "WhaTap",
      // "Damo",
      "CodeRay SAST",
      "Jenkins",
      "Git / SVN",
      "Maven / Gradle",
      "React",
      "JavaScript / jQuery",
    ],
    evidence:
      // "Kafka 주간 오류 93% 감소, 384만 건 무중단 암호화 패치, SAST 취약점 358건→4건 감축",
      "Kafka 주간 오류 93% 감소, SAST 취약점 358건→4건 감축, SSH 서버 용량 모니터링 자동화",
  },
];

const profile = {
  name: "길태형",
  role: "Backend Developer",
  badge: "Operations · Performance · Architecture",
  birthDate: "1996-08-16",
  careerSummary: "3년+",
  keywords: "성능 최적화, 데이터 정합성, 운영 자동화",
  phone: "010-3933-3763",
  email: "r1605866@gmail.com",
  profileImage: "giltaehyeong.jpg",
  profileThumbnail: "giltaehyeong-thumbnail.jpg",
  links: {
    portfolio: "https://seulgae.github.io",
    github: "https://github.com/seulgae",
    blog: "https://seulgae.github.io/blog",
  },
  intro:
    "Kafka, Redis, 병렬 처리 등 다양한 기술을 활용해 시스템의 연계 안정성과 데이터 처리 성능을 개선하고, 소스코드 보안 취약점까지 지속적으로 개선하며 운영 품질을 높여 왔습니다.",
  strengths: [
    "실행계획(EXPLAIN) 기반 복합 인덱스 설계(53초 → 1초 미만)와 Redis 세션 TTL 동기화 캐싱(10초 → 0.10초 이내) 등 근거 중심의 성능 최적화를 수행합니다.",
    // "Kafka 도메인 GW의 업무키 매핑·대사 표준화(주간 오류 93% 감소)와 384만 건 무중단 분할 패치 등 운영 데이터 정합성을 끝까지 책임집니다.",
    "Kafka 도메인 GW의 업무키 매핑·대사 표준화(주간 오류 93% 감소)와 이기종 DB 인코딩 검증 모듈화(오류 95% 감소) 등 운영 데이터 정합성을 끝까지 책임집니다.",
    "SAST 취약점 358건 → 4건 감축, 망간 동기화 정적 SQL 재설계, SSH 기반 인프라 점검 자동화 등 레거시의 잠재 리스크를 구조적으로 제거합니다.",
  ],
  kpiMetrics: [
    /*
    {
      value: "384만 건",
      label: "무중단 개인정보 암호화",
      detail: "csql · nohup 분할 커밋 패치",
      postSlug: "csql-nohup-mass-patch",
    },
    */
    {
      value: "53초 → 1초 미만",
      label: "Slow Query 인덱스 튜닝",
      detail: "실행계획 분석 · 복합 인덱스 설계",
      postSlug: "cubrid-query-plan-index-tuning",
    },
    {
      value: "358건 → 4건",
      label: "SAST 보안 취약점 감축",
      detail: "CWE 유형별 구조 개선 · 데드코드 제거",
      postSlug: "cwe-476-null-dereference",
    },
    {
      value: "10분 → 30초 이내",
      label: "100만 건 조회 응답 95% 단축",
      detail: "계층 분리 리팩토링 · 병렬 스트림 적용",
      postSlug: "mybatis-builder-parallel-refactoring",
    },
    {
      value: "70건 → 5건 미만",
      label: "주간 Kafka 오류 93% 감소",
      detail: "실패 패턴 분류 · 대사 보정 표준화",
      postSlug: "kafka-gw-data-integrity",
    },
  ],
  skillCompetencies,
  // 출력용 이력서(/resume)의 기술 스택 표가 동일한 단일 출처에서 파생됩니다.
  techStack: skillCompetencies.map((group) => ({
    label: group.resumeLabel,
    items: group.items,
  })),
};

/** birthDate 기준 만 나이. 생일이 지나지 않았으면 1을 뺍니다. */
export function getAge(today = new Date()) {
  const birth = new Date(profile.birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age -= 1;
  }

  return age;
}

/** "1996년 8월 16일생 (만 29세)" 형태의 표기 */
export function getBirthLabel(today = new Date()) {
  const birth = new Date(profile.birthDate);

  return `${birth.getFullYear()}년 ${birth.getMonth() + 1}월 ${birth.getDate()}일생 (만 ${getAge(today)}세)`;
}

export default profile;
