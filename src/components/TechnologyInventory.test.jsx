import { render, screen, within } from "@testing-library/react";
import projects from "../data/projects";
import profile from "../data/profile";
import { groupProjectTechnologies } from "../utils/projectTechnologies";
import { expect, test } from "vitest";
import TechnologyInventory, { inventoryZones } from "./TechnologyInventory";

function itemsOf(zoneLabel) {
  const heading = screen.getByRole("heading", { name: zoneLabel });
  return within(heading.closest(".stack-zone")).getAllByRole("listitem").map((li) => li.querySelector(".technology-name").textContent);
}

test("서비스 구조도에서 서버에 애플리케이션을 두고 저장소·캐시·메시징으로 분기한다", () => {
  render(<TechnologyInventory />);
  const diagram = screen.getByRole("region", { name: "보유 기술 아키텍처" });
  expect(within(diagram).getByText("HTTP 요청")).toBeInTheDocument();
  const host = within(diagram).getByRole("heading", { name: "서버 · 인프라" }).closest(".stack-host");
  expect(within(host).getByRole("heading", { name: "애플리케이션" })).toBeInTheDocument();
  const targets = diagram.querySelector(".stack-targets");
  expect(within(targets).getAllByRole("heading").map((heading) => heading.textContent))
    .toEqual(["데이터 저장소", "캐시", "메시징"]);
});

test("각 영역의 기술은 inventoryZones에 정한 기술과 순서 그대로 표시하고 기타 도구는 없다", () => {
  render(<TechnologyInventory />);
  // 실패하면 inventoryZones의 기술 이름이 프로젝트 데이터 표기와 다른지 확인하세요.
  Object.values(inventoryZones).forEach(({ label, items }) => {
    expect(itemsOf(label), label).toEqual(items);
  });
  // 기타 도구가 보이면 새 기술이 inventoryZones 어느 영역에도 없는 것입니다.
  expect(screen.queryByRole("heading", { level: 4, name: "기타 도구" })).toBeNull();
});

test("프로젝트 skills에 없는 프로필 기술(HTML/CSS·Jasypt)도 인벤토리에 표시한다", () => {
  render(<TechnologyInventory />);
  expect(itemsOf("화면")).toContain("HTML/CSS");
  expect(itemsOf("보안 · 정적 분석")).toEqual(["Jasypt", "CodeRay"]);
});

test("프로젝트 상세 분류는 원래 분야 이름을 유지한다", () => {
  const labels = groupProjectTechnologies(projects.flatMap((project) => project.skills)).map((group) => group.label);
  expect(labels).toEqual(expect.arrayContaining(["백엔드", "DB · 캐시", "개발 · 배포 도구", "품질 · 보안 분석"]));
});

test("화면 기술은 React로 시작하고 API 문서화와 제외 기술은 표시하지 않는다", () => {
  render(<TechnologyInventory />);
  const all = screen.getAllByRole("listitem").map((li) => li.querySelector(".technology-name").textContent);
  expect(itemsOf("화면")[0]).toBe("React");
  expect(screen.queryByRole("heading", { name: "API 문서화" })).toBeNull();
  expect(all).not.toContain("Swagger");
  expect(all).not.toContain("SonarQube");
});

test("버전 표기를 합쳐 같은 기술을 한 번만 표시한다", () => {
  render(<TechnologyInventory />);
  const all = screen.getAllByRole("listitem").map((li) => li.querySelector(".technology-name").textContent);
  expect(new Set(all).size).toBe(all.length);
  expect(all).not.toEqual(expect.arrayContaining([expect.stringMatching(/\(/)]));
});

test("인벤토리는 Spring Boot·Spring Batch를 Spring으로 합치고 프로젝트 상세 분류는 원래 이름을 유지한다", () => {
  render(<TechnologyInventory />);
  expect(itemsOf("애플리케이션")).toEqual(["Java", "Spring", "JPA", "MyBatis"]);
  const billing = projects.find((project) => project.skills.some((group) => /Spring Batch/.test(group.value)));
  const backend = groupProjectTechnologies(billing.skills).find((group) => group.id === "backend").items;
  expect(backend).toEqual(expect.arrayContaining([expect.stringMatching(/^Spring Boot/), expect.stringMatching(/^Spring Batch/)]));
});

test("출력용 이력서 TECH STACK은 기술 인벤토리와 같은 기술을 담는다", () => {
  render(<TechnologyInventory />);
  const inventoryItems = screen.getAllByRole("listitem").map((li) => li.querySelector(".technology-name").textContent);
  const resumeItems = profile.resumeCover.techStack.flatMap(([, value]) => value.split(" · ").map((item) => item.trim()));
  // 실패하면 profile.js resumeCover.techStack과 TechnologyInventory.jsx 중 한쪽만 고친 것입니다.
  expect(resumeItems.filter((item) => !inventoryItems.includes(item)), "이력서에만 있는 기술").toEqual([]);
  expect(inventoryItems.filter((item) => !resumeItems.includes(item)), "인벤토리에만 있는 기술").toEqual([]);
  expect(new Set(resumeItems).size, "이력서 중복 기술").toBe(resumeItems.length);
});
