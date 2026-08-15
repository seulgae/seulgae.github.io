import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

test("/blog 목록은 10개씩 페이징된다", () => {
  renderAt(paths.blog);

  const posts = getAllPosts();
  const firstPage = posts.slice(0, 10);

  firstPage.forEach((post) => {
    expect(
      screen.getByRole("heading", { level: 2, name: post.title }),
    ).toBeInTheDocument();
  });

  if (posts.length > 10) {
    // 11번째 글은 1페이지에 없어야 하고, 페이지 이동 버튼이 있어야 한다
    expect(
      screen.queryByRole("heading", { level: 2, name: posts[10].title }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "2" })).toBeInTheDocument();
  }
});

test("/blog 페이지 버튼을 누르면 다음 글 묶음이 보인다", async () => {
  const posts = getAllPosts();

  if (posts.length <= 10) {
    return;
  }

  renderAt(paths.blog);

  await userEvent.click(screen.getByRole("button", { name: "2" }));

  expect(
    screen.getByRole("heading", { level: 2, name: posts[10].title }),
  ).toBeInTheDocument();
  expect(
    screen.queryByRole("heading", { level: 2, name: posts[0].title }),
  ).not.toBeInTheDocument();
});

test("/blog 검색어를 입력하면 목록이 필터링된다", async () => {
  renderAt(paths.blog);

  const [first] = getAllPosts();
  const searchBox = screen.getByRole("searchbox", { name: "블로그 글 검색" });

  await userEvent.type(searchBox, first.title.slice(0, 8));

  expect(
    screen.getByRole("heading", { level: 2, name: first.title }),
  ).toBeInTheDocument();
  expect(screen.getByText(/검색 결과 \d+건/)).toBeInTheDocument();
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
