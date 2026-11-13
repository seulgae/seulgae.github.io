import { expect, test } from "vitest";
import projects, { getCareerGroups } from "../data/projects";
import { groupProjectTechnologies } from "./projectTechnologies";

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
});
