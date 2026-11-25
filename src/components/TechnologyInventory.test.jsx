import { render, screen, within } from "@testing-library/react";
import projects from "../data/projects";
import profile from "../data/profile";
import { groupProjectTechnologies } from "../utils/projectTechnologies";
import { expect, test } from "vitest";
import TechnologyInventory, { inventoryOrder } from "./TechnologyInventory";

function itemsOf(groupLabel) {
  const heading = screen.getByRole("heading", { level: 3, name: groupLabel });
  return within(heading.closest(".technology-inventory-group")).getAllByRole("listitem").map((li) => li.textContent);
}

test("프로젝트 skills에 없는 프로필 기술(HTML/CSS·Jasypt)도 인벤토리에 표시한다", () => {
  render(<TechnologyInventory />);
  expect(itemsOf("백엔드")).toContain("Jasypt");
  expect(itemsOf("화면 기술")).toContain("HTML/CSS");
  expect(screen.queryByRole("heading", { level: 3, name: "기타 도구" })).toBeNull();
});

test("인벤토리는 DB·캐시와 개발 도구를 성격별로 나누고 품질 분석은 정적 분석으로 표시한다", () => {
  render(<TechnologyInventory />);
  const headings = screen.getAllByRole("heading", { level: 3 }).map((heading) => heading.textContent);
  expect(headings).toEqual(expect.arrayContaining(["데이터베이스", "캐시", "빌드 도구", "형상 관리", "배포 자동화", "API 문서화", "정적 분석"]));
  expect(headings).not.toEqual(expect.arrayContaining(["DB · 캐시", "개발 · 배포 도구", "품질 · 보안 분석"]));
  expect(headings.indexOf("캐시")).toBe(headings.indexOf("데이터베이스") + 1);
  expect(headings.slice(headings.indexOf("빌드 도구"), headings.indexOf("빌드 도구") + 4)).toEqual(["빌드 도구", "형상 관리", "배포 자동화", "API 문서화"]);
  expect(itemsOf("정적 분석")).toEqual(["CodeRay"]);
});

test("프로젝트 상세 분류는 원래 분야 이름을 유지한다", () => {
  const labels = groupProjectTechnologies(projects.flatMap((project) => project.skills)).map((group) => group.label);
  expect(labels).toEqual(expect.arrayContaining(["DB · 캐시", "개발 · 배포 도구", "품질 · 보안 분석"]));
});

test("인벤토리에서 숨긴 기술(React·SonarQube)은 표시하지 않는다", () => {
  render(<TechnologyInventory />);
  const all = screen.getAllByRole("listitem").map((li) => li.textContent);
  expect(all).not.toContain("React");
  expect(all).not.toContain("SonarQube");
  expect(itemsOf("화면 기술")).toEqual(["JSP/JSTL", "JavaScript/jQuery", "HTML/CSS"]);
});

test("버전 표기를 합쳐 같은 기술을 한 번만 표시한다", () => {
  render(<TechnologyInventory />);
  const all = screen.getAllByRole("listitem").map((li) => li.textContent);
  expect(new Set(all).size).toBe(all.length);
  expect(all).not.toEqual(expect.arrayContaining([expect.stringMatching(/\(/)]));
});

test("분야 안의 기술은 inventoryOrder에 정한 순서대로 표시한다", () => {
  render(<TechnologyInventory />);
  // 새 기술을 추가해 이 테스트가 실패하면 TechnologyInventory.jsx의 inventoryOrder에 원하는 위치로 넣으세요.
  const labels = { backend: "백엔드", database: "데이터베이스", cache: "캐시", frontend: "화면 기술", runtime: "서버 환경", build: "빌드 도구", vcs: "형상 관리", deploy: "배포 자동화", apidoc: "API 문서화", ai: "AI 활용 도구" };
  Object.entries(inventoryOrder).forEach(([id, order]) => {
    expect(itemsOf(labels[id]), labels[id]).toEqual(order);
  });
});

test("인벤토리는 Spring Boot·Spring Batch를 Spring으로 합치고 프로젝트 상세 분류는 원래 이름을 유지한다", () => {
  render(<TechnologyInventory />);
  expect(itemsOf("백엔드")).toEqual(["Java", "Spring", "JPA", "MyBatis", "Jasypt"]);
  const billing = projects.find((project) => project.skills.some((group) => /Spring Batch/.test(group.value)));
  const backend = groupProjectTechnologies(billing.skills).find((group) => group.id === "backend").items;
  expect(backend).toEqual(expect.arrayContaining([expect.stringMatching(/^Spring Boot/), expect.stringMatching(/^Spring Batch/)]));
});

test("출력용 이력서 TECH STACK은 기술 인벤토리와 같은 기술을 담는다", () => {
  render(<TechnologyInventory />);
  const inventoryItems = screen.getAllByRole("listitem").map((li) => li.textContent);
  const resumeItems = profile.resumeCover.techStack.flatMap(([, value]) => value.split(" · ").map((item) => item.trim()));
  // 실패하면 profile.js resumeCover.techStack과 TechnologyInventory.jsx 중 한쪽만 고친 것입니다.
  expect(resumeItems.filter((item) => !inventoryItems.includes(item)), "이력서에만 있는 기술").toEqual([]);
  expect(inventoryItems.filter((item) => !resumeItems.includes(item)), "인벤토리에만 있는 기술").toEqual([]);
  expect(new Set(resumeItems).size, "이력서 중복 기술").toBe(resumeItems.length);
});
