import { render, screen, within } from "@testing-library/react";
import { expect, test } from "vitest";
import TechnologyInventory from "./TechnologyInventory";

function itemsOf(groupLabel) {
  const heading = screen.getByRole("heading", { level: 3, name: groupLabel });
  return within(heading.closest(".technology-inventory-group")).getAllByRole("listitem").map((li) => li.textContent);
}

test("프로젝트 skills에 없는 프로필 기술(HTML·CSS·Jasypt)도 인벤토리에 표시한다", () => {
  render(<TechnologyInventory />);
  expect(itemsOf("백엔드")).toContain("Jasypt");
  expect(itemsOf("화면 기술")).toEqual(expect.arrayContaining(["HTML", "CSS"]));
  expect(itemsOf("개발 · 배포 도구")).not.toEqual(expect.arrayContaining(["Jasypt", "HTML", "CSS"]));
});

test("버전 표기를 합쳐 같은 기술을 한 번만 표시한다", () => {
  render(<TechnologyInventory />);
  const all = screen.getAllByRole("listitem").map((li) => li.textContent);
  expect(new Set(all).size).toBe(all.length);
  expect(all).not.toEqual(expect.arrayContaining([expect.stringMatching(/\(/)]));
});
