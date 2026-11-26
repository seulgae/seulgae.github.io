import projects from "../data/projects";
import { groupProjectTechnologies } from "../utils/projectTechnologies";
import ProjectTechnologyItem from "./ProjectTechnologyItem";
import "../styles/projectTechnologies.css";
import "../styles/technologyInventory.css";

/**
 * 프로젝트 skills에는 없지만 About 기술 인벤토리에 보여야 하는 기술입니다. (profile.js techStack 기준)
 * 프로젝트 상세의 "사용 기술"에는 영향을 주지 않습니다. 프로젝트에도 보여야 한다면 projects.js에 추가하세요.
 * label은 분류 규칙(AI·모니터링 판단)에만 쓰이며 화면에 표시되지 않습니다.
 */
export const inventoryOnlySkills = [
  { label: "핵심 기술", value: "Jasypt" },
  // 쉼표로 나누면 별도 항목이 되므로, 한 항목으로 보이도록 "/"로 묶습니다. (JSP/JSTL과 같은 방식)
  { label: "개발 환경", value: "HTML/CSS" },
];

/**
 * 프로젝트 skills에는 있지만 About 기술 인벤토리에서는 숨길 기술입니다.
 * 프로젝트 상세의 "사용 기술"에는 그대로 표시됩니다.
 */
const inventoryExcludedSkills = new Set(["SonarQube", "React"]);

/*
 * [아키텍처 그림의 영역] 공용 분류(projectTechnologies.js)는 프로젝트 상세와 같이 쓰므로 그대로 두고,
 * About 인벤토리에서만 아래 영역에 기술을 배치합니다.
 *   - 기술 이름은 아래 replace를 적용한 뒤의 표기 기준이고, 배열 순서가 화면 순서입니다.
 *   - 여기에 없는 새 기술은 그림 아래 "기타 도구"에 등장 순서대로 붙습니다. 원하는 영역에 이름을 추가하세요.
 *   - 프로젝트 데이터에 없는 기술은 이름이 있어도 표시하지 않습니다.
 *   - 영역의 위치(가운데 서비스 흐름, 왼쪽 빌드·배포, 오른쪽 품질·운영)는 아래 컴포넌트의 JSX가 정합니다.
 * 아이콘은 공용 분류의 분야 id를 기준으로 고르므로 영역을 옮겨도 바뀌지 않습니다.
 */
export const inventoryZones = {
  client: { label: "화면", items: ["JSP/JSTL", "JavaScript/jQuery", "HTML/CSS"] },
  server: { label: "서버 · 인프라", items: ["Linux", "Apache Tomcat 9", "JBoss"] },
  application: { label: "애플리케이션", items: ["Java", "Spring", "JPA", "MyBatis", "Jasypt"] },
  storage: { label: "데이터 저장소", items: ["Oracle", "MySQL", "CUBRID", "Redis"] },
  messaging: { label: "메시징", items: ["Kafka"] },
  vcs: { label: "형상 관리", items: ["GitLab", "SVN"] },
  build: { label: "빌드", items: ["Maven", "Gradle"] },
  deploy: { label: "배포 자동화", items: ["Jenkins"] },
  analysis: { label: "정적 분석", items: ["CodeRay"] },
  monitoring: { label: "모니터링", items: ["WhaTap"] },
  apidoc: { label: "API 문서화", items: ["Swagger"] },
  ai: { label: "AI 개발 보조", items: ["Claude", "ChatGPT", "Gemini"] },
};

const technologyGroups = groupProjectTechnologies([...projects.flatMap((project) => project.skills), ...inventoryOnlySkills].map((group) => ({
  ...group,
  value: group.value.split(",").map((token) => token.trim()).filter((token) => !inventoryExcludedSkills.has(token)).join(", ")
    .replace(/eGovFrame 4\.1/g, "JPA")
    // 인벤토리에서는 Spring Boot·Spring Batch(버전 표기 포함)를 Spring 하나로 합칩니다.
    // 같은 이름은 groupProjectTechnologies에서 한 번만 남습니다. 프로젝트 상세에는 원래 이름이 그대로 표시됩니다.
    .replace(/Spring (?:Boot|Batch)(?:\([^)]*\))?/g, "Spring")
    .replace(/Linux\([^)]*\)/g, "Linux"),
})));

/** 기술 이름 → 공용 분류 id. 아이콘 fallback을 고를 때 씁니다. 삽입 순서가 곧 등장 순서입니다. */
const iconCategoryOf = new Map(technologyGroups.flatMap((group) => group.items.map((name) => [name, group.id])));

const placed = new Set(Object.values(inventoryZones).flatMap((zone) => zone.items));
const zones = Object.fromEntries(Object.entries(inventoryZones).map(([id, zone]) => [id, { ...zone, items: zone.items.filter((name) => iconCategoryOf.has(name)) }]));
const etcItems = [...iconCategoryOf.keys()].filter((name) => !placed.has(name));

function Zone({ id, className = "" }) {
  const zone = zones[id];
  if (!zone.items.length) return null;
  return (
    <div className={`stack-zone stack-zone-${id} ${className}`.trim()}>
      <h4>{zone.label}</h4>
      <ul className="project-technology-items">{zone.items.map((name) => <ProjectTechnologyItem key={name} name={name} category={iconCategoryOf.get(name)} />)}</ul>
    </div>
  );
}

function Flow({ label }) {
  return <div className="stack-flow" aria-hidden="true"><span>{label}</span></div>;
}

export default function TechnologyInventory() {
  return (
    <section className="technology-inventory" id="skills" aria-labelledby="technology-inventory-title">
      <header>
        <h2 id="technology-inventory-title">기술 인벤토리</h2>
        <p>서비스가 요청을 처리하는 흐름을 가운데에, 코드를 서버까지 올리는 과정과 품질·운영 도구를 양옆에 두었습니다.</p>
      </header>

      <div className="stack-architecture">
        <section className="stack-lane stack-lane-delivery" aria-labelledby="stack-delivery-title">
          <h3 id="stack-delivery-title"><span>Build & Deploy</span><small>코드가 서버에 올라가기까지</small></h3>
          <Zone id="vcs" />
          <Flow label="커밋" />
          <Zone id="build" />
          <Flow label="패키징" />
          <Zone id="deploy" />
          <p className="stack-lane-note"><span aria-hidden="true">→</span> 서버 · 인프라에 배포</p>
        </section>

        <section className="stack-lane stack-lane-service" aria-labelledby="stack-service-title">
          <h3 id="stack-service-title"><span>Service</span><small>요청이 처리되는 흐름</small></h3>
          <Zone id="client" />
          <Flow label="HTTP 요청" />
          <div className="stack-runtime">
            <Zone id="server" className="stack-zone-host" />
            <Zone id="application" className="stack-zone-core" />
          </div>
          <Flow label="조회 · 저장 · 이벤트 연계" />
          <div className="stack-backing">
            <Zone id="storage" />
            <Zone id="messaging" />
          </div>
        </section>

        <section className="stack-lane stack-lane-ops" aria-labelledby="stack-ops-title">
          <h3 id="stack-ops-title"><span>Quality & Ops</span><small>코드를 점검하고 운영을 지켜보기</small></h3>
          <Zone id="analysis" />
          <Zone id="monitoring" />
          <Zone id="apidoc" />
          <p className="stack-lane-note"><span aria-hidden="true">←</span> 코드 · 서버 · API 점검</p>
        </section>

        <section className="stack-lane stack-lane-ai" aria-labelledby="stack-ai-title">
          <h3 id="stack-ai-title"><span>AI-assisted Development</span><small>분석 · 구현 · 검증을 보조</small></h3>
          <Zone id="ai" />
        </section>
      </div>

      {etcItems.length > 0 && (
        <div className="stack-zone stack-zone-etc">
          <h4>기타 도구</h4>
          <ul className="project-technology-items">{etcItems.map((name) => <ProjectTechnologyItem key={name} name={name} category={iconCategoryOf.get(name)} />)}</ul>
        </div>
      )}
    </section>
  );
}
