import { fireEvent, render, within } from "@testing-library/react";
import { expect, test } from "vitest";
import ArchitectureDiagrams from "./ArchitectureDiagrams";

test.each([
  ["lgu-billing-gw", "Redis · 키 매핑", "토픽 내용에 매핑되는 컬럼 key를 조회해 원부·응용 파트 데이터를 연계합니다."],
  ["cloudxper-billing", "Redis", "이후 요청에서 재사용해 권한 API 반복 호출을 줄입니다."],
  ["jeonse-support-system", "업무망 연계 · sync 매핑", "기존 연계 Service 인터페이스를 유지하면서"],
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

test("모바일 구성도는 망간 연계·보안 노드와 연결 방향을 보존하고 역할을 펼친다", () => {
  const { container } = render(<ArchitectureDiagrams slug="jeonse-support-system" figureIds={["public-network"]} />);
  const mobile = container.querySelector(".arch-mobile-layout");
  const sync = within(mobile).getByRole("button", { name: "업무망 연계 · sync 매핑 역할 보기" });
  expect(within(mobile).getByRole("button", { name: "보안 개선 지점 역할 보기" })).toBeInTheDocument();
  expect(within(mobile).getByRole("region", { name: "구성 요소 연결 흐름" })).toHaveTextContent("④ 매핑·반영");
  expect(within(mobile).getAllByLabelText("양방향").length).toBeGreaterThan(0);
  fireEvent.click(sync);
  expect(sync).toHaveAttribute("aria-expanded", "true");
  expect(mobile.querySelector(".arch-mobile-detail")).toHaveTextContent("기존 연계 Service 인터페이스를 유지하면서");
});
