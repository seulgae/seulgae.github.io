import { render, screen } from "@testing-library/react";
import { beforeEach, expect, test } from "vitest";
import App from "./App";
import projects from "./data/projects";
import { getAllPosts } from "./lib/posts";
import { paths } from "./routes";

function renderAt(path) {
  window.history.pushState({}, "", path);

  return render(<App />);
}

beforeEach(() => {
  window.history.pushState({}, "", "/");
});

test("상단 헤더 메뉴가 routes 정의대로 렌더링된다", () => {
  renderAt(paths.home);

  ["About", "Projects", "Blog", "Education", "Awards", "Licenses", "Resume"].forEach(
    (label) => {
      expect(screen.getByRole("link", { name: label })).toBeInTheDocument();
    },
  );
});

test("모바일 하단 탭바가 렌더링된다", () => {
  renderAt(paths.home);

  ["홈", "프로젝트", "블로그", "이력서"].forEach((label) => {
    expect(screen.getByRole("link", { name: label })).toBeInTheDocument();
  });
  expect(screen.getByRole("button", { name: "더보기" })).toBeInTheDocument();
});

test("/projects 목록에 모든 프로젝트 카드가 나온다", () => {
  renderAt(paths.projects);

  projects.forEach((project) => {
    expect(
      screen.getByRole("heading", { level: 2, name: project.shortTitle || project.title }),
    ).toBeInTheDocument();
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

test("/blog 목록에 마크다운 글이 나온다", () => {
  renderAt(paths.blog);

  getAllPosts().forEach((post) => {
    expect(
      screen.getByRole("heading", { level: 2, name: post.title }),
    ).toBeInTheDocument();
  });
});

test("/blog/:slug에서 마크다운 본문이 렌더링된다", () => {
  const [post] = getAllPosts();

  renderAt(paths.blogPost(post.slug));

  expect(screen.getByRole("heading", { level: 1, name: post.title })).toBeInTheDocument();
});

test("이전 경로로 들어오면 새 경로 화면으로 이동한다", () => {
  renderAt("/ProjectsList2");

  expect(window.location.pathname).toBe(paths.project("cloudxper-billing"));
});

test("없는 프로젝트 slug는 404 화면을 보여준다", () => {
  renderAt(paths.project("does-not-exist"));

  expect(screen.getByText("404")).toBeInTheDocument();
});
