import { render, screen } from "@testing-library/react";
import { beforeEach, expect, test } from "vitest";
import App from "./App";
import projects from "./data/projects";
import { paths } from "./routes";

function renderAt(path) {
  window.history.pushState({}, "", path);

  return render(<App />);
}

beforeEach(() => {
  window.history.pushState({}, "", "/");
});

test("사이드바 메뉴가 routes 정의대로 렌더링된다", () => {
  renderAt(paths.home);

  expect(screen.getByRole("link", { name: "About Me" })).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: "Project Experience" }),
  ).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Education" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Awards" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Licenses" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Resume Print" })).toBeInTheDocument();
});

test("프로젝트 서브메뉴가 데이터 건수만큼 생성된다", () => {
  renderAt(paths.home);

  projects.forEach((project) => {
    const label = project.shortTitle || project.title;

    expect(screen.getByRole("link", { name: label })).toBeInTheDocument();
  });
});

test("/projects/:slug 하나로 각 프로젝트 상세가 렌더링된다", () => {
  projects.forEach((project) => {
    const { unmount } = renderAt(paths.project(project.slug));

    expect(
      screen.getByRole("heading", { level: 2, name: project.title }),
    ).toBeInTheDocument();
    expect(screen.getByText(project.achievements[0].title)).toBeInTheDocument();

    unmount();
  });
});

test("이전 경로로 들어오면 새 경로 화면으로 이동한다", () => {
  renderAt("/ProjectsList2");

  expect(window.location.pathname).toBe(paths.project("cloudxper-billing"));
});

test("없는 프로젝트 slug는 404 화면을 보여준다", () => {
  renderAt(paths.project("does-not-exist"));

  expect(screen.getByText("404")).toBeInTheDocument();
});
