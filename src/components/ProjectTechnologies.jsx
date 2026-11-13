import { groupProjectTechnologies } from "../utils/projectTechnologies";
import ProjectTechnologyItem from "./ProjectTechnologyItem";
import "../styles/projectTechnologies.css";

export default function ProjectTechnologies({ skills }) {
  return (
    <section className="project-technology-section" aria-label="사용 기술">
      <h4>사용 기술</h4>
      <div className="project-technology-groups-inline">
        {groupProjectTechnologies(skills).map((group) => (
          <div key={group.id} className="project-technology-group-inline">
            <h5>{group.label}</h5>
            <ul className="project-technology-items">{group.items.map((name) => (
              <ProjectTechnologyItem key={name} name={name} category={group.id} />
            ))}</ul>
          </div>
        ))}
      </div>
    </section>
  );
}
