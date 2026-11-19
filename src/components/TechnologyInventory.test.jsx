import { render, screen, within } from "@testing-library/react";
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
  expect(itemsOf("개발 · 배포 도구")).not.toEqual(expect.arrayContaining(["Jasypt", "HTML/CSS"]));
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
  const labels = { backend: "백엔드", database: "DB · 캐시", frontend: "화면 기술", runtime: "서버 환경", tools: "개발 · 배포 도구", ai: "AI 활용 도구" };
  Object.entries(inventoryOrder).forEach(([id, order]) => {
    expect(itemsOf(labels[id]), labels[id]).toEqual(order);
  });
});
