import { useParams } from "react-router-dom";
import ProjectDetail from "../components/ProjectDetail";
import NotFoundPage from "./NotFoundPage";
import projects from "../data/projects";

/**
 * /projects/:slug 하나로 모든 프로젝트 상세를 처리합니다.
 * 데이터 배열 순서를 기준으로 이전/다음 프로젝트 이동을 제공합니다.
 */
function ProjectDetailPage() {
  const { slug } = useParams();
  const index = projects.findIndex((project) => project.slug === slug);

  if (index === -1) {
    return <NotFoundPage message="요청한 프로젝트를 찾을 수 없습니다." />;
  }

  return (
    <ProjectDetail
      project={projects[index]}
      prev={projects[index - 1]}
      next={projects[index + 1]}
    />
  );
}

export default ProjectDetailPage;
