import { render, screen, within } from "@testing-library/react";
import projects from "../data/projects";
import profile from "../data/profile";
import { groupProjectTechnologies } from "../utils/projectTechnologies";
import { expect, test } from "vitest";
import TechnologyInventory, { inventoryRows } from "./TechnologyInventory";

function itemsOf(groupLabel) {
  const heading = screen.getByRole("heading", { level: 3, name: groupLabel });
  return within(heading.closest(".technology-inventory-group")).getAllByRole("listitem").map((li) => li.textContent);
}

test("인벤토리는 역할별 9개 행을 정한 순서대로 표시하고 기타 도구 행은 없다", () => {
  render(<TechnologyInventory />);
  const headings = screen.getAllByRole("heading", { level: 3 }).map((heading) => heading.textContent);
  expect(headings).toEqual(inventoryRows.map(([, label]) => label));
  // 기타 도구가 보이면 새 기술이 inventoryRows 어느 행에도 없는 것입니다.
  expect(headings).not.toContain("기타 도구");
});

test("각 행의 기술은 inventoryRows에 정한 기술과 순서 그대로 표시한다", () => {
  render(<TechnologyInventory />);
  // 실패하면 inventoryRows의 기술 이름이 프로젝트 데이터 표기와 다른지 확인하세요.
  inventoryRows.forEach(([, label, names]) => {
    expect(itemsOf(label), label).toEqual(names);
  });
});

test("프로젝트 skills에 없는 프로필 기술(HTML/CSS·Jasypt)도 인벤토리에 표시한다", () => {
  render(<TechnologyInventory />);
  expect(itemsOf("화면 기술")).toContain("HTML/CSS");
  expect(itemsOf("보안 · 모니터링")).toContain("Jasypt");
});

test("프로젝트 상세 분류는 원래 분야 이름을 유지한다", () => {
  const labels = groupProjectTechnologies(projects.flatMap((project) => project.skills)).map((group) => group.label);
  expect(labels).toEqual(expect.arrayContaining(["백엔드", "DB · 캐시", "개발 · 배포 도구", "품질 · 보안 분석"]));
});

test("인벤토리에서 숨긴 기술(React·SonarQube)은 표시하지 않는다", () => {
  render(<TechnologyInventory />);
  const all = screen.getAllByRole("listitem").map((li) => li.textContent);
  expect(all).not.toContain("React");
  expect(all).not.toContain("SonarQube");
});

test("버전 표기를 합쳐 같은 기술을 한 번만 표시한다", () => {
  render(<TechnologyInventory />);
  const all = screen.getAllByRole("listitem").map((li) => li.textContent);
  expect(new Set(all).size).toBe(all.length);
  expect(all).not.toEqual(expect.arrayContaining([expect.stringMatching(/\(/)]));
});

test("인벤토리는 Spring Boot·Spring Batch를 Spring으로 합치고 프로젝트 상세 분류는 원래 이름을 유지한다", () => {
  render(<TechnologyInventory />);
  expect(itemsOf("언어 · 프레임워크")).toEqual(["Java", "Spring", "JPA", "MyBatis"]);
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
