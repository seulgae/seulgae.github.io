import AboutPoster from "../components/posters/AboutPoster";
import SkillsPoster from "../components/posters/SkillsPoster";
import ProjectsPoster from "../components/posters/ProjectsPoster";
import CredentialsPoster from "../components/posters/CredentialsPoster";
import "../styles/pageShell.css";
import "../styles/posters.css";

/**
 * 메인 포트폴리오 원페이지 스트림.
 * 상단바 스크롤 스파이 메뉴(About · Skills · Projects · Credentials)와 1:1 대응하는
 * 4개의 독립 포스터 컴포넌트를 조립합니다.
 */
function HomePage() {
  return (
    <div className="page-shell portfolio-posters">
      <AboutPoster />
      <SkillsPoster />
      <ProjectsPoster />
      <CredentialsPoster />
    </div>
  );
}

export default HomePage;
