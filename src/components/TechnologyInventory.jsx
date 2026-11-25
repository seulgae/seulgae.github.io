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
 * [인벤토리 전용 분야] 공용 분류(projectTechnologies.js의 categories)는 프로젝트 상세 "사용 기술"과 같이 쓰므로 그대로 두고,
 * 인벤토리에서만 아래 규칙으로 한 번 더 나누거나 이름을 바꿉니다.
 *   - split: 위에서부터 처음 맞는 규칙의 분야로 들어갑니다. 어느 규칙에도 맞지 않으면 fallback 분야로 갑니다.
 *   - label: 분야 이름만 바꿉니다.
 *   - fallback 분야가 "etc"면 인벤토리 맨 아래에 "기타 도구"로 표시합니다. 비어 있는 분야는 표시하지 않습니다.
 * 아이콘은 원래 분야 id(database·tools·quality)를 기준으로 고르므로 나눠도 바뀌지 않습니다.
 */
const inventoryCategories = {
  database: {
    split: [
      ["database", "데이터베이스", /^(Oracle|MySQL|CUBRID)\b/i],
      ["cache", "캐시", /^Redis\b/i],
    ],
    fallback: "database",
  },
  tools: {
    split: [
      ["build", "빌드 도구", /^(Maven|Gradle)\b/i],
      ["vcs", "형상 관리", /^(GitLab|GitHub|Git|SVN)\b/i],
      ["deploy", "배포 자동화", /^Jenkins\b/i],
      ["apidoc", "API 문서화", /^Swagger\b/i],
    ],
    fallback: "etc",
  },
  quality: { label: "정적 분석" },
};
const etcCategory = { id: "etc", label: "기타 도구", iconCategory: "tools" };

function splitInventoryGroups(groups) {
  const etc = { ...etcCategory, items: [] };
  const result = groups.flatMap((group) => {
    const rule = inventoryCategories[group.id];
    const base = { ...group, iconCategory: group.id };
    if (!rule) return [base];
    if (!rule.split) return [{ ...base, label: rule.label }];
    const parts = rule.split.map(([id, label]) => ({ id, label, iconCategory: group.id, items: [] }));
    group.items.forEach((name) => {
      const index = rule.split.findIndex(([, , pattern]) => pattern.test(name));
      if (index >= 0) parts[index].items.push(name);
      else if (rule.fallback === "etc") etc.items.push(name);
      else parts.find((part) => part.id === rule.fallback).items.push(name);
    });
    return parts;
  });
  return [...result, etc].filter((group) => group.items.length);
}

/*
 * [출력 순서] 분야(행) 순서는 projectTechnologies.js의 categories 배열 순서를 따르고,
 * 나눈 분야는 원래 분야 자리에 split 순서대로 들어갑니다. "기타 도구"는 맨 아래입니다.
 * 같은 분야 안의 기술 순서는 아래 inventoryOrder로 고정합니다. (키는 인벤토리 분야 id 기준)
 *   - 그대로 두면 "처음 등장한 순서"(projects.js의 프로젝트 순서 → inventoryOnlySkills)가 되어
 *     JPA가 Java·Spring 사이에 끼는 등 뒤섞여 보입니다.
 *   - 목록에 없는 새 기술은 해당 분야의 맨 뒤에 등장한 순서대로 붙습니다.
 *     원하는 위치가 있다면 이 목록에 이름을 추가하세요. (이름은 replace 적용 후 표기 기준)
 */
export const inventoryOrder = {
  backend: ["Java", "Spring", "JPA", "MyBatis", "Jasypt"],
  database: ["Oracle", "MySQL", "CUBRID"],
  cache: ["Redis"],
  frontend: ["JSP/JSTL", "JavaScript/jQuery", "HTML/CSS"],
  runtime: ["Linux", "Apache Tomcat 9", "JBoss"],
  build: ["Maven", "Gradle"],
  vcs: ["GitLab", "SVN"],
  deploy: ["Jenkins"],
  apidoc: ["Swagger"],
  ai: ["Claude", "ChatGPT", "Gemini"],
};
const inventory = splitInventoryGroups(groupProjectTechnologies([...projects.flatMap((project) => project.skills), ...inventoryOnlySkills].map((group) => ({
  ...group,
  value: group.value.split(",").map((token) => token.trim()).filter((token) => !inventoryExcludedSkills.has(token)).join(", ")
    .replace(/eGovFrame 4\.1/g, "JPA")
    // 인벤토리에서는 Spring Boot·Spring Batch(버전 표기 포함)를 Spring 하나로 합칩니다.
    // 같은 이름은 groupProjectTechnologies에서 한 번만 남습니다. 프로젝트 상세에는 원래 이름이 그대로 표시됩니다.
    .replace(/Spring (?:Boot|Batch)(?:\([^)]*\))?/g, "Spring")
    .replace(/Linux\([^)]*\)/g, "Linux"),
}))));

inventory.forEach((group) => {
  const order = inventoryOrder[group.id];
  if (!order) return;
  const rank = (name) => (order.includes(name) ? order.indexOf(name) : order.length);
  // sort는 안정 정렬이므로 목록에 없는 기술끼리는 등장 순서가 유지됩니다.
  group.items.sort((a, b) => rank(a) - rank(b));
});

export default function TechnologyInventory() {
  return (
    <section className="technology-inventory" id="skills" aria-labelledby="technology-inventory-title">
      <header><h2 id="technology-inventory-title">기술 인벤토리</h2></header>
      <div className="technology-inventory-groups">{inventory.map((group) => (
        <div className="technology-inventory-group" key={group.id}>
          <h3>{group.label}</h3>
          <ul className="project-technology-items">{group.items.map((name) => <ProjectTechnologyItem key={name} name={name} category={group.iconCategory} />)}</ul>
        </div>
      ))}</div>
    </section>
  );
}
