import { useParams } from "react-router-dom";
import ProjectDetail from "../components/ProjectDetail";
import NotFoundPage from "./NotFoundPage";
import { findProjectBySlug } from "../data/projects";

/**
 * /projects/:slug 하나로 모든 프로젝트 상세를 처리합니다.
 * (기존에는 프로젝트마다 페이지 파일과 라우트를 따로 만들어야 했습니다.)
 */
function ProjectDetailPage() {
  const { slug } = useParams();
  const project = findProjectBySlug(slug);

  if (!project) {
    return <NotFoundPage message="요청한 프로젝트를 찾을 수 없습니다." />;
  }

  return <ProjectDetail project={project} />;
}

export default ProjectDetailPage;
