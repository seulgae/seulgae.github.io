import { FaCode, FaDatabase, FaLayerGroup, FaServer, FaShieldAlt, FaTools } from "react-icons/fa";
import { SiClaude, SiGithub, SiGithubactions, SiOpenai, SiGooglegemini, SiSubversion, SiJavascript } from "react-icons/si";
import { assetUrl } from "../utils/text";

const logos = [
  [/^jQuery/i, "jquery"],
  [/^Java\b/, "java"], [/^Spring\b/, "spring"], [/^React\b/, "react"],
  [/^Oracle\b/i, "oracle"], [/^MySQL\b/i, "mysql"], [/^Redis\b/i, "redis"],
  [/^Kafka\b/i, "apachekafka"], [/^Apache Tomcat|^Tomcat/i, "tomcat"],
  [/^Linux\b/i, "linux"], [/^Maven\b/i, "maven"], [/^Gradle\b/i, "gradle"],
  [/^GitLab\b/i, "gitlab"], [/^Jenkins\b/i, "jenkins"], [/^SonarQube\b/i, "sonarqube"],
];

/**
 * 기술 이름에 맞는 로고와 명칭을 목록에 표시합니다.
 * @param {object} props 기술 이름, 기본 아이콘을 선택할 분류, 선택적인 활용 설명
 * @author seulgae
 * @version 1.0, GitHub 및 GitHub Actions 아이콘 추가
 * @see "TechnologyInventory"
 */
export default function ProjectTechnologyItem({ name, category, detail }) {
  const logo = logos.find(([pattern]) => pattern.test(name))?.[1];
  const namedIcon = { GitHub: SiGithub, "GitHub Actions": SiGithubactions, Claude: SiClaude, ChatGPT: SiOpenai, Gemini: SiGooglegemini, SVN: SiSubversion }[name]
    || (/^JavaScript/.test(name) ? SiJavascript : null);
  const fallback = { backend: FaLayerGroup, database: FaDatabase, frontend: FaCode, runtime: FaServer, quality: FaShieldAlt }[category] || FaTools;
  const Icon = namedIcon || fallback;
  return (
    <li className="project-technology-item">
      {logo
        ? <img className={`technology-logo logo-${logo}`} src={assetUrl(`tech-logos/${logo}.svg`)} alt="" width="22" height="22" loading="lazy" />
        : <Icon className={`technology-logo technology-icon-${name.toLowerCase()}`} aria-hidden="true" />}
      <span>
        <span className="technology-name">{name}</span>
        {detail && <span className="technology-usage">{detail}</span>}
      </span>
    </li>
  );
}
