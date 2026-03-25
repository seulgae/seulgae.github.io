import React from "react";
import ProjectExperiencePage from "../components/ProjectExperiencePage";
import projects from "./Projects";

const ProjectsList = () => (
  <ProjectExperiencePage title="프로젝트 경험" projects={projects} />
);

export default ProjectsList;
