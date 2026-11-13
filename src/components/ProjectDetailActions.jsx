import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { paths } from "../routes";

export default function ProjectDetailActions({ slug }) {
  const navigate = useNavigate();
  const goBack = () => {
    if (window.history.state?.idx > 0) navigate(-1);
    else navigate(paths.projectAnchor(slug));
  };
  return (
    <div className="project-detail-actions">
      <button type="button" onClick={goBack}><FiArrowLeft aria-hidden="true" />뒤로가기</button>
    </div>
  );
}
