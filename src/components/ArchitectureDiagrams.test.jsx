import { fireEvent, render, within } from "@testing-library/react";
import { expect, test } from "vitest";
import ArchitectureDiagrams from "./ArchitectureDiagrams";

test.each([
  ["lgu-billing-gw", "Redis · 키 매핑", "INS 이벤트에서 UUID와 업무키 매핑을 저장합니다."],
  ["cloudxper-billing", "Redis", "Redis가 DB를 직접 조회하는 구조는 아닙니다."],
  ["jeonse-support-system", "동기화 Service / DAO", "기존 연계 Service 인터페이스를 유지하면서"],
])("%s의 노드를 키보드로 선택해 역할을 확인하고 해제한다", (slug, name, explanation) => {
  const { container } = render(<ArchitectureDiagrams slug={slug} />);
  const figure = container.querySelector(".arch-figure");
  const canvas = figure.querySelector(".arch-scroll");
  const button = within(canvas).getByRole("button", { name: `${name} 역할 보기` });
  fireEvent.keyDown(button, { key: "Enter" });
  expect(button).toHaveAttribute("aria-pressed", "true");
  expect(figure.querySelector("figcaption .arch-selection")).toHaveTextContent(explanation);
  expect(canvas.querySelector(".arch-dim")).not.toBeNull();
  fireEvent.keyDown(button, { key: " " });
  expect(button).toHaveAttribute("aria-pressed", "false");
  expect(figure.querySelector("figcaption .arch-selection")).toHaveTextContent("그림 읽는 순서");
  expect(canvas.querySelector(".arch-dim")).toBeNull();
});
