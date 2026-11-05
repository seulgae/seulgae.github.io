// 인물 정보 및 핵심 역량의 단일 출처(SSOT).
// 포트폴리오 각 포스터(About, Skills)와 출력용 이력서(/resume)가 모두 이 파일만 참조합니다.
// 만 나이는 birthDate에서 계산하므로 해가 바뀌어도 손댈 필요가 없습니다.

const skillCompetencies = [
  {
    category: "비즈니스 로직 구현 및 API 개발",
    resumeLabel: "Back-End",
    blogLinks: [{ slug: "backend-code-convention-standardization", label: "코드 표준화 회고" }],
    summary: "업무 요구에 맞춰 도메인별 조회 SQL과 API를 구현하고, 팀이 함께 수정하기 쉬운 코드 구조를 정리합니다.",
    items: ["Java", "Spring Boot", "Spring Batch", "MyBatis"],
    evidence:
      "시스템 고도화 프로젝트에서 가입·청구·상품 API와 청구 산정 결과를 조회하는 SQL을 구현했습니다. 개발자마다 달랐던 코드 구조와 작성 규칙을 문서화해 팀에 공유했습니다.",
  },
  {
    category: "조회 병목을 분석하는 성능 개선",
    detailAnchor: "achievement-query-index-tuning",
    resumeLabel: "Database / Cache",
    relatedPosts: [
      { slug: "cubrid-query-plan-index-tuning" },
      { slug: "mybatis-builder-parallel-refactoring" },
    ],
    summary: "느린 조회의 원인을 데이터 접근 방식과 처리 흐름에서 찾고, 개선 전후의 응답 시간을 비교합니다.",
    items: ["Oracle", "MySQL", "CUBRID", "Redis"],
    evidence:
      // "CUBRID 53초→1초 미만 복합 인덱스, Oracle 묵시적 형변환 튜닝, Redis 세션 TTL 동기화 캐싱(10초→0.1초)",
      "공공 시스템에서는 조회 조건에 맞는 인덱스를 적용했습니다. 고도화 프로젝트에서는 연관 조회를 병렬화하고 반복되는 권한 조회에 캐시를 적용했습니다.",
  },
  {
    category: "운영 문제를 해결하는 안정성 개선",
    categoryLink: { category: "sast-cwe", label: "보안 취약점 개선 기록" },
    resumeLabel: "Infra / Tools",
    relatedPosts: [
      { slug: "cwe-476-null-dereference" },
      { slug: "kafka-gw-data-integrity" },
    ],
    summary: "데이터 불일치와 보안 취약점의 원인을 확인하고, 수정 후 결과를 재점검하며 반복 업무를 자동화합니다.",
    items: [
      "Apache Kafka",
      "Linux",
      "CodeRay SAST",
      "WhaTap",
      // "Damo",
    ],
    evidence:
      // "Kafka 주간 오류 93% 감소, 384만 건 무중단 암호화 패치, SAST 취약점 358건→4건 감축",
      "시스템 연동 과정의 데이터 불일치를 보정하고 결과를 재검증했습니다. 보안 취약점 유형별로 코드를 수정하고 서버 용량 점검을 자동화했습니다.",
  },
];

const profile = {
  name: "길태형",
  role: "Backend Developer",
  badge: "Operations · Performance · Architecture",
  birthDate: "1996-08-16",
  careerSummary: "약 3년 7개월",
  keywords: "API 설계·개발, 성능 개선, 데이터 정합성",
  email: "r1605866@gmail.com",
  profileImage: "backend-mark.svg",
  links: {
    portfolio: "https://seulgae.github.io",
    github: "https://github.com/seulgae",
    blog: "https://seulgae.github.io/blog",
  },
  intro:
    "Java와 Spring으로 업무에 필요한 기능을 만들고, 운영 중 드러난 문제를 개선해 왔습니다. 약 3년 7개월 동안 청구·요금 관리와 공공 서비스 분야에서 API·조회 SQL 구현부터 성능 개선, 데이터 정합성 대응까지 경험했습니다.\n\n문제가 생기면 처리 흐름과 데이터를 따라 원인을 찾고, 개선한 결과를 확인하는 데 강점이 있습니다. 함께 일하는 개발자가 코드를 이해하고 수정할 수 있도록 구조와 규칙을 정리하는 일도 중요하게 생각합니다.\n\n시스템 고도화 프로젝트에서 요구사항을 확인하고 도메인별 API·조회 로직을 구현하며, 기능을 완성하는 과정에 가장 큰 성취감을 느꼈습니다. 운영에서 쌓은 문제 해결 경험을 바탕으로, 요구사항을 구체화하고 운영까지 고려하는 백엔드 개발자로 성장하고자 합니다.",
  resumeIntro: "Java/Spring 기반 약 3년 7개월 경력의 백엔드 개발자입니다. 시스템 고도화 프로젝트에서 도메인별 API·조회 SQL 구현과 코드 표준화에 참여했으며, 운영 중 조회 성능과 데이터 정합성·보안 문제를 개선했습니다. 운영 경험을 바탕으로 기능 개발과 시스템 고도화에 기여하고자 합니다.",
  strengths: [
    "가입·청구·상품 API와 청구 산정 결과 조회 SQL을 구현하고, 요청·응답 객체와 계층별 역할을 정리해 예제 코드·PDF 가이드로 팀에 공유했습니다.",
    // "Kafka 도메인 GW의 업무키 매핑·대사 표준화(주간 오류 93% 감소)와 384만 건 무중단 분할 패치 등 운영 데이터 정합성을 끝까지 책임집니다.",
    "실행계획 기반 인덱스 적용으로 조회 53초 → 1초 미만, 연관 조회 병렬화로 약 480,000ms → 10,000ms 이내 단축을 기록했습니다. 병렬화 시 SQL 호출 수는 유지됐습니다.",
    "원천·대상 데이터를 대사·보정한 뒤 재검증하고, 보안 검출 유형별 공통 원인 수정과 망간 동기화·서버 점검 절차 개선을 수행했습니다.",
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
      value: "약 480,000ms → 10,000ms 이내",
      label: "대용량 조회 응답 약 98% 단축",
      detail: "계층 분리 리팩토링 · 병렬 스트림 적용",
      postSlug: "mybatis-builder-parallel-refactoring",
    },
    {
      value: "약 70건 → 5건",
      label: "주간 Kafka 연동 오류 감소",
      detail: "대응 절차 표준화 · 일일 보고 체계 구축",
      postSlug: "kafka-gw-data-integrity",
    },
  ],
  skillCompetencies,
  // 출력용 이력서(/resume)의 기술 스택 표가 동일한 단일 출처에서 파생됩니다.
  techStack: [
    ...skillCompetencies.map((group) => ({ label: group.resumeLabel, items: group.items })),
    { label: "개발 도구", items: ["Git / SVN", "Maven / Gradle", "Jenkins", "GitLab", "SonarQube", "Swagger"] },
  ],
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
