import { expect, test } from "vitest";
import projects, { getCareerGroups } from "../data/projects";
import { DEFAULT_TECHNOLOGY_CATEGORY, groupProjectTechnologies } from "./projectTechnologies";

test("역할별 재분류에서 기존 기술을 누락하거나 중복하지 않는다", () => {
  [...projects, ...getCareerGroups().flatMap((group) => group.projects)].forEach((project) => {
    const original = [...new Set(project.skills.flatMap((group) => group.value.split(",").map((token) => token.trim()).filter(Boolean)))];
    const grouped = groupProjectTechnologies(project.skills).flatMap((group) => group.items);
    expect(grouped.sort()).toEqual(original.sort());
  });
});

test("화면·서버·AI 도구를 백엔드 기술과 구분한다", () => {
  const groups = groupProjectTechnologies(projects[0].skills);
  const items = (id) => groups.find((group) => group.id === id).items;
  expect(items("backend")).toEqual(["Java", "Spring", "eGovFrame 4.1", "MyBatis"]);
  expect(items("database")).toEqual(["CUBRID"]);
  expect(items("frontend")).toEqual(["JSP/JSTL", "JavaScript/jQuery"]);
  expect(items("runtime")).toEqual(["Apache Tomcat 9", "JBoss", "Linux(Fedora)"]);
  expect(items("ai")).toEqual(["Claude", "ChatGPT", "Gemini"]);
  expect(items("quality")).toEqual(["CodeRay"]);
});

test("품질·보안 분석 도구는 개발·배포 및 운영 모니터링과 구분한다", () => {
  const groups = groupProjectTechnologies([
    { label: "개발 도구", value: "Maven, Jenkins, CodeRay, SonarQube" },
    { label: "모니터링", value: "WhaTap" },
  ]);
  expect(groups.find((group) => group.id === "tools").items).toEqual(["Maven", "Jenkins"]);
  expect(groups.find((group) => group.id === "quality").items).toEqual(["CodeRay", "SonarQube"]);
  expect(groups.find((group) => group.id === "monitoring").items).toEqual(["WhaTap"]);
});

test("어떤 분류 규칙에도 맞지 않아 기본 분류로 떨어진 기술이 없다", async () => {
  // 개발·배포 도구로 의도한 기술만 허용합니다. 새 기술이 여기서 실패하면
  // projectTechnologies.js의 분야별 정규식에 추가하거나, 정말 도구라면 이 목록에 추가하세요.
  const intendedTools = ["Maven", "Gradle", "SVN", "GitLab", "Jenkins", "Swagger"];
  const { inventoryOnlySkills } = await import("../components/TechnologyInventory");
  const inputs = [
    ...[...projects, ...getCareerGroups().flatMap((group) => group.projects)].map((project) => project.skills),
    inventoryOnlySkills,
  ];
  inputs.forEach((skills) => {
    const tools = groupProjectTechnologies(skills).find((group) => group.id === DEFAULT_TECHNOLOGY_CATEGORY);
    (tools?.items ?? []).forEach((name) => expect(intendedTools, `${name}: 분류 규칙 없음`).toContain(name));
  });
});
