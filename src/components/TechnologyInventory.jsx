import { useEffect, useState } from "react";
import { FiMonitor, FiCpu, FiDatabase, FiLayers, FiShare2, FiServer } from "react-icons/fi";
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
  { label: "개발 도구", value: "GitHub, GitHub Actions" },
  { label: "핵심 기술", value: "Jasypt" },
  // 쉼표로 나누면 별도 항목이 되므로, 한 항목으로 보이도록 "/"로 묶습니다. (JSP/JSTL과 같은 방식)
  { label: "개발 환경", value: "HTML/CSS" },
];

/**
 * 프로젝트 skills에는 있지만 About 기술 인벤토리에서는 숨길 기술입니다.
 * 프로젝트 상세의 "사용 기술"에는 그대로 표시됩니다.
 */
const inventoryExcludedSkills = new Set(["SonarQube", "Swagger"]);

// 영역에 등록하지 않은 기술은 기타 도구로 표시합니다.
export const inventoryZones = {
  client: { detail: "웹 화면 분석 및 서버 데이터 연동", label: "화면", items: ["React", "JSP/JSTL", "JavaScript/jQuery", "HTML/CSS"] },
  server: { label: "서버 · 인프라", items: ["Linux", "Apache Tomcat 9", "JBoss"] },
  application: { detail: "REST API 설계 및 업무 로직 구현", label: "애플리케이션", items: ["Java", "Spring", "JPA", "MyBatis"] },
  storage: { detail: "실행계획 분석과 인덱스 튜닝", label: "데이터 저장소", items: ["Oracle", "MySQL", "CUBRID"] },
  cache: { detail: "캐시 설계 · TTL 및 메모리 사용량 관리", label: "캐시", items: ["Redis"] },
  messaging: { detail: "메시지 구독 로직 구현 · Kafka 환경 구축", label: "메시징", items: ["Kafka"] },
  vcs: { label: "형상 관리", items: ["GitHub", "GitLab", "SVN"] },
  build: { label: "빌드", items: ["Maven", "Gradle"] },
  deploy: { label: "배포 자동화", items: ["GitHub Actions", "Jenkins"] },
  analysis: { label: "보안 · 정적 분석", items: ["Jasypt", "CodeRay"] },
  monitoring: { label: "모니터링", items: ["WhaTap"] },
  ai: {
    label: "AI 어시스트",
    items: ["Claude", "ChatGPT", "Gemini"],
    usage: {
      Claude: "기능 구현 · 결함 원인 분석 · 브라우저 동작 검증",
      ChatGPT: "Markdown 문서 작성 및 개념·관계 정리",
      Gemini: "Google 문서와 연동해 산출물 작성",
    },
  },
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

// 데스크톱 구조도와 모바일 표에서 같은 도구별 활용 설명을 사용합니다.
function renderTechnology(name, usage) {
  return <ProjectTechnologyItem key={name} name={name} category={iconCategoryOf.get(name)} detail={usage?.[name]} />;
}

/**
 * 기술을 아키텍처의 담당 영역 또는 개발 도구 모음에 표시합니다.
 * @param {object} props 영역 ID와 선택적인 그림 및 제목 태그
 * @author seulgae
 * @version 1.0, 역할별 기술 노드 표시
 * @see "ProjectTechnologyItem"
 */
function Zone({ id, icon: Icon, heading: Heading = "h4" }) {
  const zone = zones[id];
  if (!zone.items.length) return null;
  return (
    <div className={`stack-zone stack-zone-${id}`}>
      {Icon && <Icon className="stack-symbol" aria-hidden="true" />}
      <div>
        <Heading>{zone.label}</Heading>
        {zone.detail && <p>{zone.detail}</p>}
        <ul className={zone.usage ? "project-technology-items stack-usage-list" : "project-technology-items"}>
          {zone.items.map((name) => renderTechnology(name, zone.usage))}
        </ul>
      </div>
    </div>
  );
}

/**
 * 모바일에서 각 영역의 기술과 사용 경험을 두 열로 표시합니다.
 * @author seulgae
 * @version 1.0, 모바일 기술 인벤토리 표 추가
 * @see "TechnologyInventory"
 */
function InventoryTable() {
  const rows = [...Object.values(zones), { label: "기타 도구", items: etcItems }];
  return (
    <table className="inventory-table" aria-labelledby="technology-inventory-title">
      <thead><tr><th scope="col">영역</th><th scope="col">사용 기술과 경험</th></tr></thead>
      <tbody>
        {rows.filter((row) => row.items.length > 0).map(({ label, items, detail, usage }) => (
          <tr key={label}>
            <th scope="row">{label}</th>
            <td>
              <ul className={usage ? "project-technology-items stack-usage-list" : "project-technology-items"}>
                {items.map((name) => renderTechnology(name, usage))}
              </ul>
              {detail && <p>{detail}</p>}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const mobileQuery = "(max-width: 720px)";

/**
 * 여러 프로젝트에서 수행한 업무를 웹 서비스의 요청 흐름에 대응시킵니다.
 * @author seulgae
 * @version 1.0, 요청 경로와 데이터 연계 구조 시각화
 * @see "ProjectTechnologyItem"
 */
export default function TechnologyInventory() {
  const [mobile, setMobile] = useState(() => window.matchMedia?.(mobileQuery).matches ?? false);
  useEffect(() => {
    const media = window.matchMedia?.(mobileQuery);
    if (!media) return;
    const updateLayout = () => setMobile(media.matches);
    updateLayout();
    media.addEventListener("change", updateLayout);
    return () => media.removeEventListener("change", updateLayout);
  }, []);

  return (
    <section className="technology-inventory" id="skills" aria-labelledby="technology-inventory-title">
      <header>
        <h2 id="technology-inventory-title">기술 인벤토리</h2>
      </header>
      {mobile ? <InventoryTable /> : (
        <>
          <section className="stack-blueprint" aria-labelledby="stack-service-title">
            <h3 id="stack-service-title">보유 기술 아키텍처</h3>
            <div className="stack-topology">
              <Zone id="client" icon={FiMonitor} />
              <span className="stack-http">HTTP 요청</span>
              <div className="stack-host">
                <Zone id="application" icon={FiCpu} />
                <Zone id="server" icon={FiServer} />
              </div>
              <div className="stack-targets" aria-label="애플리케이션의 데이터 처리와 외부 연계">
                <Zone id="storage" icon={FiDatabase} />
                <Zone id="cache" icon={FiLayers} />
                <Zone id="messaging" icon={FiShare2} />
              </div>
            </div>
          </section>
          <div className="stack-toolbelt">
            <section>
              <h3>빌드와 배포</h3>
              <Zone id="vcs" /><Zone id="build" /><Zone id="deploy" />
            </section>
            <section>
              <h3>품질과 운영</h3>
              <Zone id="analysis" /><Zone id="monitoring" />
            </section>
            <section>
              <Zone id="ai" heading="h3" />
            </section>
          </div>
          {etcItems.length > 0 && (
            <div className="stack-zone">
              <h4>기타 도구</h4>
              <ul className="project-technology-items">{etcItems.map((name) => <ProjectTechnologyItem key={name} name={name} category={iconCategoryOf.get(name)} />)}</ul>
            </div>
          )}
        </>
      )}
    </section>
  );
}
