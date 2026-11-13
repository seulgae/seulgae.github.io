import AboutPoster from "../components/posters/AboutPoster";
import ProjectsPoster from "../components/posters/ProjectsPoster";
import CredentialsPoster from "../components/posters/CredentialsPoster";
import "../styles/pageShell.css";
import "../styles/posters.css";

/**
 * 메인 포트폴리오 원페이지 스트림.
 * About(기술 인벤토리 포함) · Projects · Credentials를 조립합니다.
 */
function HomePage() {
  return (
    <div className="page-shell portfolio-posters">
      <AboutPoster />
      <ProjectsPoster />
      <CredentialsPoster />
    </div>
  );
}

export default HomePage;
