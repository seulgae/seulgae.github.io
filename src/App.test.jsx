import { act, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, expect, test } from "vitest";
import App from "./App";
import projects from "./data/projects";
import { getAllPosts, getCategoryTree } from "./lib/posts";
import { paths } from "./routes";

async function renderAt(path) {
  window.history.pushState({}, "", path);

  let result;
  await act(async () => {
    result = render(<App />);
  });
  await waitFor(() => expect(screen.queryByText("페이지를 불러오는 중입니다.")).not.toBeInTheDocument());
  return result;
}

beforeEach(() => {
  window.history.pushState({}, "", "/");
  Object.defineProperty(window, "scrollY", {
    value: 0,
    writable: true,
    configurable: true,
  });
});

test("메인(/) 상단 헤더는 4개 포스터 메뉴(About·Skills·Projects·Credentials)와 Resume 버튼을 렌더링하고 Blog 탭은 노출하지 않는다", async () => {
  await renderAt(paths.home);

  const nav = screen.getByRole("navigation", { name: "주요 메뉴" });

  ["About", "Skills", "Projects", "Credentials"].forEach((label) => {
    expect(within(nav).getByRole("link", { name: label })).toBeInTheDocument();
  });
  expect(within(nav).getByRole("link", { name: /Resume/ })).toBeInTheDocument();
  expect(within(nav).queryByRole("link", { name: "Blog" })).not.toBeInTheDocument();
});

test("메인(/)에서 스크롤하면 상단바 메뉴의 활성 커서가 해당 포스터 섹션으로 이동한다", async () => {
  await renderAt(paths.home);

  const nav = screen.getByRole("navigation", { name: "주요 메뉴" });
  const aboutLink = within(nav).getByRole("link", { name: "About" });
  const skillsLink = within(nav).getByRole("link", { name: "Skills" });
  const projectsLink = within(nav).getByRole("link", { name: "Projects" });
  const credentialsLink = within(nav).getByRole("link", { name: "Credentials" });

  // 초기 최상단에서는 About이 활성화된다
  expect(aboutLink).toHaveAttribute("aria-current", "location");

  const sectionOffsets = {
    about: -500,
    skills: 80,
    projects: 650,
    credentials: 1400,
  };

  ["about", "skills", "projects", "credentials"].forEach((id) => {
    const el = document.getElementById(id);
    el.getBoundingClientRect = () => ({
      top: sectionOffsets[id],
      bottom: sectionOffsets[id] + 500,
      left: 0,
      right: 1000,
      width: 1000,
      height: 500,
    });
  });

  // Skills 포스터 구간으로 스크롤
  act(() => {
    window.scrollY = 480;
    fireEvent.scroll(window);
  });
  expect(skillsLink).toHaveAttribute("aria-current", "location");
  expect(aboutLink).not.toHaveAttribute("aria-current");

  // Projects 포스터 구간으로 스크롤
  sectionOffsets.skills = -400;
  sectionOffsets.projects = 60;
  act(() => {
    window.scrollY = 1050;
    fireEvent.scroll(window);
  });
  expect(projectsLink).toHaveAttribute("aria-current", "location");
  expect(skillsLink).not.toHaveAttribute("aria-current");

  // Credentials 포스터 구간으로 스크롤
  sectionOffsets.projects = -600;
  sectionOffsets.credentials = 40;
  act(() => {
    window.scrollY = 1900;
    fireEvent.scroll(window);
  });
  expect(credentialsLink).toHaveAttribute("aria-current", "location");
});

test("상단바 포스터 메뉴를 클릭하면 커서가 즉시 해당 메뉴로 이동하고 해시가 갱신된다", async () => {
  await renderAt(paths.home);

  const nav = screen.getByRole("navigation", { name: "주요 메뉴" });
  const projectsLink = within(nav).getByRole("link", { name: "Projects" });

  await userEvent.click(projectsLink);

  expect(projectsLink).toHaveAttribute("aria-current", "location");
  expect(window.location.hash).toBe("#projects");
});

test("메인(/)에 4개의 포스터 컴포넌트가 조립되고 프로젝트 아키텍처를 팝업 모달로 열고 닫을 수 있다", async () => {
  await renderAt(paths.home);

  expect(document.getElementById("about")).toBeInTheDocument();
  expect(document.getElementById("skills")).toBeInTheDocument();
  expect(document.getElementById("projects")).toBeInTheDocument();
  expect(document.getElementById("credentials")).toBeInTheDocument();

  projects.forEach((project) => {
    expect(
      screen.getByRole("heading", { level: 3, name: project.title }),
    ).toBeInTheDocument();
  });

  expect(screen.getByText("(주)마이크로 서비스")).toBeInTheDocument();
  expect(screen.getByText("SI 본부")).toBeInTheDocument();
  expect(screen.getByText("(주)애버커스")).toBeInTheDocument();
  expect(screen.getByText("빌링시스템팀")).toBeInTheDocument();
  expect(screen.getByText("개발·운영")).toBeInTheDocument();
  expect(screen.getByText("SI 프로젝트")).toBeInTheDocument();

  expect(screen.queryByRole("button", { name: "성적증명서" })).not.toBeInTheDocument();
  const educationImageBtn = screen.getByRole("button", { name: "EZEN ACADEMY 이미지 크게 보기" });
  await userEvent.click(educationImageBtn);
  const lightboxDialog = screen.getByRole("dialog", {
    name: "EZEN ACADEMY",
  });
  expect(within(lightboxDialog).getByRole("img")).toHaveAttribute(
    "src",
    "/Ezen2.png",
  );
  await userEvent.click(within(lightboxDialog).getByRole("button", { name: "닫기" }));

  const popupButtons = screen.getAllByRole("button", {
    name: /시스템 아키텍처 & 데이터 흐름 다이어그램/,
  });
  expect(popupButtons).toHaveLength(projects.length);

  await userEvent.click(popupButtons[0]);
  const modal = await screen.findByRole("dialog", { name: projects[0].title });
  expect(modal).toBeInTheDocument();
  expect(
    within(modal).getByRole("heading", { name: "시스템 한눈에 보기" }),
  ).toBeInTheDocument();

  await userEvent.click(
    within(modal).getByRole("button", { name: "아키텍처 팝업 닫기" }),
  );
  expect(
    screen.queryByRole("dialog", { name: projects[0].title }),
  ).not.toBeInTheDocument();
});

test("포스터 섹션 제목 옆 도움말(?) 버튼에 마우스를 올리면 안내 툴팁이 보이고 떼면 사라진다", async () => {
  await renderAt(paths.home);

  const helpBtn = screen.getByRole("button", {
    name: "Core Skills & Competency 도움말",
  });
  expect(helpBtn).toHaveAttribute("aria-expanded", "false");
  expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();

  await userEvent.hover(helpBtn);
  const tooltip = screen.getByRole("tooltip");
  expect(tooltip).toHaveTextContent(
    "실무 프로젝트에서 직접 문제를 진단하고 수치로 개선을 증명한 핵심 기술 역량입니다.",
  );
  expect(helpBtn).toHaveAttribute("aria-expanded", "true");

  await userEvent.unhover(helpBtn);
  expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  expect(helpBtn).toHaveAttribute("aria-expanded", "false");
});

test("기존 개별 페이지 경로(/education, /ProjectsList2 등)로 접속하면 메인 원페이지 해당 포스터로 리다이렉트된다", async () => {
  const { unmount } = await renderAt("/education");
  expect(window.location.pathname).toBe("/");
  expect(window.location.hash).toBe("#credentials");
  unmount();

  await renderAt("/ProjectsList2");
  expect(window.location.pathname).toBe("/");
  expect(window.location.hash).toBe("#project-cloudxper-billing");
});

test("없는 프로젝트 slug는 404 화면을 보여준다", async () => {
  await renderAt("/projects/does-not-exist");

  expect(screen.getByText("404")).toBeInTheDocument();
});

test("/blog 접속 시 포트폴리오 레이아웃 없이 독립된 티스토리형 좌측 카테고리 사이드바가 렌더링된다", async () => {
  await renderAt(paths.blog);

  expect(screen.getByRole("navigation", { name: "블로그 메뉴" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /길태형 기술 블로그/ })).toHaveAttribute(
    "href",
    paths.blog,
  );

  const categoryNav = screen.getByRole("navigation", { name: "블로그 카테고리" });
  expect(
    within(categoryNav).getByRole("link", { name: /분류 전체보기/ }),
  ).toBeInTheDocument();

  getCategoryTree().forEach((group) => {
    expect(
      within(categoryNav).getByRole("link", { name: new RegExp(group.groupLabel) }),
    ).toBeInTheDocument();
  });

  expect(
    screen.queryByRole("navigation", { name: "주요 메뉴" }),
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole("navigation", { name: "모바일 메뉴" }),
  ).not.toBeInTheDocument();
});

test("좌측 카테고리 소분류를 클릭하면 해당 카테고리 글만 필터링된다", async () => {
  await renderAt(paths.blog);

  const categoryNav = screen.getByRole("navigation", { name: "블로그 카테고리" });
  const targetSub = getCategoryTree()
    .flatMap((group) => group.subs)
    .find((sub) => sub.count > 0 && sub.count < getAllPosts().length);

  const subLink = within(categoryNav).getByRole("link", {
    name: new RegExp(targetSub.label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
  });

  await userEvent.click(subLink);

  expect(
    screen.getByRole("heading", { level: 1, name: targetSub.label }),
  ).toBeInTheDocument();
  expect(screen.getByText(`검색 결과 ${targetSub.count}건`)).toBeInTheDocument();
});

test("/blog 목록은 10개씩 페이징된다", async () => {
  await renderAt(paths.blog);

  const posts = getAllPosts();
  const firstPage = posts.slice(0, 10);

  firstPage.forEach((post) => {
    expect(
      screen.getByRole("heading", { level: 2, name: post.title }),
    ).toBeInTheDocument();
  });

  if (posts.length > 10) {
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

  await renderAt(paths.blog);

  await userEvent.click(screen.getByRole("button", { name: "2" }));

  expect(
    screen.getByRole("heading", { level: 2, name: posts[10].title }),
  ).toBeInTheDocument();
  expect(
    screen.queryByRole("heading", { level: 2, name: posts[0].title }),
  ).not.toBeInTheDocument();
});

test("/blog 검색어를 입력하면 목록이 필터링된다", async () => {
  await renderAt(paths.blog);

  const [first] = getAllPosts();
  const searchBox = screen.getByRole("searchbox", { name: "블로그 글 검색" });

  await userEvent.type(searchBox, first.title.slice(0, 8));

  expect(
    screen.getByRole("heading", { level: 2, name: first.title }),
  ).toBeInTheDocument();
  expect(screen.getByText(/검색 결과 \d+건/)).toBeInTheDocument();
});

test("/blog/:slug에서 마크다운 본문과 같은 카테고리 다른 글 위젯이 렌더링되고 좌측 카테고리가 활성화된다", async () => {
  const posts = getAllPosts();
  const postWithSiblings =
    posts.find(
      (candidate) =>
        posts.filter((item) => item.category.subId === candidate.category.subId)
          .length > 1,
    ) || posts[0];

  await renderAt(paths.blogPost(postWithSiblings.slug));

  expect(
    screen.getByRole("heading", { level: 1, name: postWithSiblings.title }),
  ).toBeInTheDocument();

  const categoryNav = screen.getByRole("navigation", { name: "블로그 카테고리" });
  const activeSubLink = within(categoryNav).getByRole("link", {
    name: new RegExp(
      postWithSiblings.category.subLabel.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
    ),
  });
  expect(activeSubLink).toHaveClass("active");

  expect(
    screen.getByRole("region", { name: "같은 카테고리의 다른 글" }),
  ).toBeInTheDocument();
});

test("없는 블로그 글 slug는 블로그 공간 내 404와 글 목록 복귀 링크를 보여준다", async () => {
  await renderAt(paths.blogPost("does-not-exist"));

  expect(screen.getByText("404")).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "글 목록으로 돌아가기" })).toHaveAttribute(
    "href",
    paths.blog,
  );
});
