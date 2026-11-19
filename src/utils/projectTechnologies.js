/**
 * 프로젝트 사용 기술을 화면 표시용 분야별 그룹으로 재분류합니다.
 * 사용처: 프로젝트 상세의 "사용 기술"(ProjectTechnologies), About의 "기술 인벤토리"(TechnologyInventory)
 *
 * ──────────────────────────────────────────────────────────────
 * [중요] 이 함수는 "입력받은 기술을 나누기만" 합니다. 기술 목록 자체를 만들지 않습니다.
 *
 * 아래 분류 규칙에 HTML·CSS·Jasypt가 있어도, 입력(skills)에 그 이름이 없으면 화면에 나오지 않습니다.
 * 과거 About 기술 인벤토리에서 HTML·CSS·Jasypt가 빠졌던 원인이 바로 이것입니다.
 * 인벤토리가 projects.js의 프로젝트 skills만 입력으로 사용했는데, 세 프로젝트의 skills에는
 * 해당 기술이 없었습니다. (profile.js의 techStack에는 있었음)
 *
 * ▶ 화면에 기술이 안 보일 때 확인 순서
 *   1. 입력 데이터에 그 기술 이름이 있는지 확인합니다.
 *      - 프로젝트 상세에 보여야 함 → src/data/projects.js 해당 프로젝트의 skills value에 추가
 *        예) { label: "핵심 기술", value: "Java, Spring, MyBatis, Jasypt" }
 *      - About 기술 인벤토리에만 보여야 함 → TechnologyInventory.jsx의 inventoryOnlySkills에 추가
 *   2. 이름이 아래 분류 규칙 정규식에 맞는지 확인합니다.
 *      - 어떤 규칙에도 맞지 않으면 경고 없이 "개발 · 배포 도구"(tools)로 들어갑니다.
 *        새 기술을 추가했는데 엉뚱한 그룹에 있다면 해당 분야 정규식에 이름을 추가하세요.
 *        예) Thymeleaf를 화면 기술로 → /^(React|JSP|...|CSS|Thymeleaf)\b/i
 *   3. 같은 기술이 두 번 나오면 표기가 다른지 확인합니다.
 *      - 중복 제거는 글자 그대로 비교합니다. "Spring Boot"와 "Spring Boot(3.x.x)"는 다른 항목입니다.
 *      - 인벤토리에서는 TechnologyInventory.jsx의 replace로 버전 표기를 지워 하나로 합칩니다.
 *   4. 아이콘이 이상하면 이 파일이 아니라 ProjectTechnologyItem.jsx의 logos/namedIcon을 확인합니다.
 *
 * ▶ 규칙 순서도 의미가 있습니다. 위에서부터 처음 맞는 규칙으로 분류됩니다.
 *   - AI는 기술 이름이 아니라 그룹 label("AI 활용 도구")로 판단하므로 가장 먼저 검사합니다.
 *   - 모니터링은 이름(WhaTap) 또는 label("모니터링")로 판단합니다.
 * ──────────────────────────────────────────────────────────────
 */
const categories = [
  ["backend", "백엔드"],
  ["database", "DB · 캐시"],
  ["messaging", "메시지 연계"],
  ["frontend", "화면 기술"],
  ["runtime", "서버 환경"],
  ["tools", "개발 · 배포 도구"],
  ["quality", "품질 · 보안 분석"],
  ["monitoring", "모니터링"],
  ["ai", "AI 활용 도구"],
];

/** 어떤 규칙에도 맞지 않는 기술이 들어가는 기본 분류입니다. */
export const DEFAULT_TECHNOLOGY_CATEGORY = "tools";

export function groupProjectTechnologies(skills) {
  const groups = new Map(categories.map(([id, label]) => [id, { id, label, items: [] }]));
  const seen = new Set();
  skills.forEach((group) => {
    group.value.split(",").map((token) => token.trim()).filter(Boolean).forEach((token) => {
      if (seen.has(token)) return;
      seen.add(token);
      let id = DEFAULT_TECHNOLOGY_CATEGORY;
      if (/AI/.test(group.label)) id = "ai";
      else if (/Kafka/i.test(token)) id = "messaging";
      else if (/^(Oracle|MySQL|CUBRID|Redis)\b/i.test(token)) id = "database";
      else if (/^(React|JSP|JSTL|JavaScript|jQuery|HTML|CSS)\b/i.test(token)) id = "frontend";
      else if (/^(Linux|Apache Tomcat|Tomcat|JBoss)\b/i.test(token)) id = "runtime";
      else if (/^(CodeRay|SonarQube)\b/i.test(token)) id = "quality";
      else if (/WhaTap|모니터링/i.test(token + group.label)) id = "monitoring";
      else if (/^(Java|Spring|eGovFrame|MyBatis|JPA|Jasypt)\b/i.test(token)) id = "backend";
      groups.get(id).items.push(token);
    });
  });
  return [...groups.values()].filter((group) => group.items.length);
}
