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
 * [출력 순서] 분야(행) 순서는 projectTechnologies.js의 categories 배열 순서를 따릅니다.
 * 같은 분야 안의 기술 순서는 아래 inventoryOrder로 고정합니다.
 *   - 그대로 두면 "처음 등장한 순서"(projects.js의 프로젝트 순서 → inventoryOnlySkills)가 되어
 *     Spring과 Spring Boot가 떨어지는 등 뒤섞여 보입니다.
 *   - 목록에 없는 새 기술은 해당 분야의 맨 뒤에 등장한 순서대로 붙습니다.
 *     원하는 위치가 있다면 이 목록에 이름을 추가하세요. (이름은 replace 적용 후 표기 기준)
 */
export const inventoryOrder = {
  backend: ["Java", "Spring", "Spring Boot", "Spring Batch", "JPA", "MyBatis", "Jasypt"],
  database: ["Oracle", "MySQL", "CUBRID", "Redis"],
  frontend: ["JSP/JSTL", "JavaScript/jQuery", "HTML/CSS"],
  runtime: ["Linux", "Apache Tomcat 9", "JBoss"],
  tools: ["Maven", "Gradle", "GitLab", "SVN", "Jenkins", "Swagger"],
  ai: ["Claude", "ChatGPT", "Gemini"],
};
const inventory = groupProjectTechnologies([...projects.flatMap((project) => project.skills), ...inventoryOnlySkills].map((group) => ({
  ...group,
  value: group.value.split(",").map((token) => token.trim()).filter((token) => !inventoryExcludedSkills.has(token)).join(", ")
    .replace(/eGovFrame 4\.1/g, "JPA")
    .replace(/Spring Boot\([^)]*\)/g, "Spring Boot")
    .replace(/Spring Batch\([^)]*\)/g, "Spring Batch")
    .replace(/Linux\([^)]*\)/g, "Linux"),
})));

inventory.forEach((group) => {
  const order = inventoryOrder[group.id];
  if (!order) return;
  const rank = (name) => (order.includes(name) ? order.indexOf(name) : order.length);
  // sort는 안정 정렬이므로 목록에 없는 기술끼리는 등장 순서가 유지됩니다.
  group.items.sort((a, b) => rank(a) - rank(b));
});

export default function TechnologyInventory() {
  return (
    <section className="technology-inventory" id="skills" aria-labelledby="technology-inventory-title">
      <header><h2 id="technology-inventory-title">기술 인벤토리</h2></header>
      <div className="technology-inventory-groups">{inventory.map((group) => (
        <div className="technology-inventory-group" key={group.id}>
          <h3>{group.label}</h3>
          <ul className="project-technology-items">{group.items.map((name) => <ProjectTechnologyItem key={name} name={name} category={group.id} />)}</ul>
        </div>
      ))}</div>
    </section>
  );
}
