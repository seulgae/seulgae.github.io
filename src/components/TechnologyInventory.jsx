import projects from "../data/projects";
import { groupProjectTechnologies } from "../utils/projectTechnologies";
import ProjectTechnologyItem from "./ProjectTechnologyItem";
import "../styles/projectTechnologies.css";
import "../styles/technologyInventory.css";

/**
 * 프로젝트 skills에는 없지만 About 기술 인벤토리에 보여야 하는 기술입니다. (profile.js techStack 기준)
 * 프로젝트 상세의 "사용 기술"에는 영향을 주지 않습니다. 프로젝트에도 보여야 한다면 projects.js에 추가하세요.
 * label은 분류 규칙(AI·모니터링 판단)에만 쓰이며 화면에 표시되지 않습니다.
 */
export const inventoryOnlySkills = [
  { label: "핵심 기술", value: "Jasypt" },
  // 쉼표로 나누면 별도 항목이 되므로, 한 항목으로 보이도록 "/"로 묶습니다. (JSP/JSTL과 같은 방식)
  { label: "개발 환경", value: "HTML/CSS" },
];

/**
 * 프로젝트 skills에는 있지만 About 기술 인벤토리에서는 숨길 기술입니다.
 * 프로젝트 상세의 "사용 기술"에는 그대로 표시됩니다.
 */
const inventoryExcludedSkills = new Set(["SonarQube", "React"]);

/*
 * [인벤토리 분야] 공용 분류(projectTechnologies.js의 categories)는 프로젝트 상세 "사용 기술"과 같이 쓰므로 그대로 두고,
 * About 인벤토리에서만 역할별로 다시 묶습니다.
 *   - 배열 순서가 화면의 행 순서이고, 각 행의 기술 목록 순서가 화면의 기술 순서입니다.
 *   - 기술 이름은 아래 replace를 적용한 뒤의 표기 기준입니다. (예: Spring Boot → Spring)
 *   - 여기에 없는 새 기술은 맨 아래 "기타 도구" 행에 등장 순서대로 붙습니다. 원하는 행에 이름을 추가하세요.
 *   - 프로젝트 데이터에 없는 기술은 이름이 있어도 표시하지 않습니다.
 * 아이콘은 공용 분류의 분야 id를 기준으로 고르므로 행을 옮겨도 바뀌지 않습니다.
 */
export const inventoryRows = [
  ["language", "언어 · 프레임워크", ["Java", "Spring", "JPA", "MyBatis"]],
  ["storage", "데이터 저장소", ["Oracle", "MySQL", "CUBRID", "Redis"]],
  ["messaging", "메시징", ["Kafka"]],
  ["frontend", "화면 기술", ["JSP/JSTL", "JavaScript/jQuery", "HTML/CSS"]],
  ["infra", "서버 · 인프라", ["Linux", "Apache Tomcat 9", "JBoss"]],
  ["delivery", "빌드 · 배포", ["Maven", "Gradle", "Jenkins"]],
  ["collaboration", "협업 · 형상 관리", ["GitLab", "SVN", "Swagger"]],
  ["security", "보안 · 모니터링", ["Jasypt", "CodeRay", "WhaTap"]],
  ["ai", "AI 도구", ["Claude", "ChatGPT", "Gemini"]],
];

const technologyGroups = groupProjectTechnologies([...projects.flatMap((project) => project.skills), ...inventoryOnlySkills].map((group) => ({
  ...group,
  value: group.value.split(",").map((token) => token.trim()).filter((token) => !inventoryExcludedSkills.has(token)).join(", ")
    .replace(/eGovFrame 4\.1/g, "JPA")
    // 인벤토리에서는 Spring Boot·Spring Batch(버전 표기 포함)를 Spring 하나로 합칩니다.
    // 같은 이름은 groupProjectTechnologies에서 한 번만 남습니다. 프로젝트 상세에는 원래 이름이 그대로 표시됩니다.
    .replace(/Spring (?:Boot|Batch)(?:\([^)]*\))?/g, "Spring")
    .replace(/Linux\([^)]*\)/g, "Linux"),
})));

/** 기술 이름 → 공용 분류 id. 아이콘 fallback을 고를 때 씁니다. 삽입 순서가 곧 등장 순서입니다. */
const iconCategoryOf = new Map(technologyGroups.flatMap((group) => group.items.map((name) => [name, group.id])));

function buildInventory() {
  const placed = new Set(inventoryRows.flatMap(([, , names]) => names));
  const rows = inventoryRows.map(([id, label, names]) => ({ id, label, items: names.filter((name) => iconCategoryOf.has(name)) }));
  const etc = { id: "etc", label: "기타 도구", items: [...iconCategoryOf.keys()].filter((name) => !placed.has(name)) };
  return [...rows, etc].filter((row) => row.items.length);
}

const inventory = buildInventory();

export default function TechnologyInventory() {
  return (
    <section className="technology-inventory" id="skills" aria-labelledby="technology-inventory-title">
      <header><h2 id="technology-inventory-title">기술 인벤토리</h2></header>
      <div className="technology-inventory-groups">{inventory.map((row) => (
        <div className="technology-inventory-group" key={row.id}>
          <h3>{row.label}</h3>
          <ul className="project-technology-items">{row.items.map((name) => <ProjectTechnologyItem key={name} name={name} category={iconCategoryOf.get(name)} />)}</ul>
        </div>
      ))}</div>
    </section>
  );
}
