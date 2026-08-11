import { Link } from "react-router-dom";
import { paths } from "../routes";
import "../styles/notFound.css";

function NotFoundPage({ message = "요청한 페이지를 찾을 수 없습니다." }) {
  return (
    <div className="not-found-page">
      <span className="not-found-code">404</span>
      <h1>{message}</h1>
      <p>주소가 변경되었을 수 있습니다. 아래 링크로 이동해 주세요.</p>
      <Link to={paths.home} className="not-found-link">
        홈으로 돌아가기
      </Link>
    </div>
  );
}

export default NotFoundPage;
