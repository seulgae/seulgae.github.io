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
  { label: "개발 환경", value: "HTML, CSS" },
];

const inventory = groupProjectTechnologies([...projects.flatMap((project) => project.skills), ...inventoryOnlySkills].map((group) => ({
  ...group,
  value: group.value.split(",").map((token) => token.trim()).filter((token) => token !== "SonarQube").join(", ")
    .replace(/eGovFrame 4\.1/g, "JPA")
    .replace(/Spring Boot\([^)]*\)/g, "Spring Boot")
    .replace(/Spring Batch\([^)]*\)/g, "Spring Batch")
    .replace(/Linux\([^)]*\)/g, "Linux"),
})));

const databaseOrder = ["Oracle", "MySQL", "CUBRID", "Redis"];
inventory.find((group) => group.id === "database")?.items.sort((a, b) => databaseOrder.indexOf(a) - databaseOrder.indexOf(b));

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
