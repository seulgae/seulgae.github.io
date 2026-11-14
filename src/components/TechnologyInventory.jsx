import projects from "../data/projects";
import { groupProjectTechnologies } from "../utils/projectTechnologies";
import ProjectTechnologyItem from "./ProjectTechnologyItem";
import "../styles/projectTechnologies.css";
import "../styles/technologyInventory.css";

const inventory = groupProjectTechnologies(projects.flatMap((project) => project.skills).map((group) => ({
  ...group,
  value: group.value.split(",").map((token) => token.trim()).filter((token) => token !== "SonarQube").join(", ")
    .replace(/Spring Boot\([^)]*\)/g, "Spring Boot")
    .replace(/Spring Batch\([^)]*\)/g, "Spring Batch")
    .replace(/Linux\([^)]*\)/g, "Linux"),
})));

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
