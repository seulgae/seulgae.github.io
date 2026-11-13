import { act, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, expect, test, vi } from "vitest";
import App from "./App";
import projects from "./data/projects";
import awards from "./data/awards";
import education from "./data/education";
import licenses, { getVisibleLicenses } from "./data/licenses";
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

test.each(["/#%", "/#%E0%A4%A"])("잘못 인코딩된 해시 %s로 접속해도 홈을 표시한다", async (path) => {
  await renderAt(path);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("개발자 길태형입니다.");
  expect(screen.getByRole("heading", { name: "기술 인벤토리" })).toBeInTheDocument();
});

test("About에 기술 인벤토리를 표시하고 별도 Skills 메뉴와 카드는 제거한다", async () => {
  await renderAt(paths.home);
  const about = screen.getByRole("region", { name: "개발자 소개" });
  const inventory = within(about).getByRole("region", { name: "기술 인벤토리" });
  expect(within(inventory).getByText("Java")).toBeInTheDocument();
  expect(within(inventory).getAllByText("Spring Boot")).toHaveLength(1);
  expect(within(inventory).getByText("React")).toBeInTheDocument();
  expect(within(inventory).getByText("Claude")).toBeInTheDocument();
  expect(within(inventory).queryByRole("table")).not.toBeInTheDocument();
  expect(screen.queryByRole("heading", { name: "Core Skills & Competency" })).not.toBeInTheDocument();
  expect(screen.queryByRole("link", { name: "Skills", exact: true })).not.toBeInTheDocument();
  expect(document.querySelectorAll(".portfolio-posters > section")).toHaveLength(3);
});

test("출력용 이력서는 소개 표지와 경력 상세를 분리하고 자격 날짜의 의미를 표시한다", async () => {
  await renderAt(paths.resume);
  expect(document.title).toBe("길태형_이력_경력기술서");

  const cover = screen.getByRole("region", { name: "이력서 첫 장" });
  expect(within(cover).getByRole("heading", { level: 1, name: "길태형" })).toBeInTheDocument();
  expect(within(cover).getByRole("img", { name: "길태형 증명사진" })).toHaveAttribute("src", "/resume-portrait.jpg");
  expect(within(cover).getByRole("heading", { name: "ABOUT", exact: true })).toBeInTheDocument();
  expect(within(cover).getByRole("heading", { name: "TECH STACK", exact: true })).toBeInTheDocument();
  expect(within(cover).queryByRole("heading", { name: "경력 기술서" })).not.toBeInTheDocument();
  expect(document.querySelectorAll(".resume-paper")).toHaveLength(3);
  const careerPage = screen.getByRole("region", { name: "이력서 두 번째 장" });
  expect(within(careerPage).getAllByRole("article")).toHaveLength(2);
  expect(within(careerPage).getByRole("heading", { name: projects[0].title })).toBeInTheDocument();
  expect(within(careerPage).getByRole("heading", { name: projects[1].title })).toBeInTheDocument();
  expect(within(careerPage).queryByRole("heading", { name: projects[2].title })).not.toBeInTheDocument();
  expect(within(careerPage).getByText(projects[1].achievements[0].result)).toBeInTheDocument();
  expect(careerPage.querySelectorAll(".resume-career-key-result")).toHaveLength(2);

  const lastPage = screen.getByRole("region", { name: "이력서 세 번째 장" });
  expect(within(lastPage).getByRole("heading", { name: projects[2].title })).toBeInTheDocument();
  projects[2].achievements.forEach((item) => {
    expect(within(lastPage).getByText(item.detail)).toBeInTheDocument();
    expect(within(lastPage).getAllByText(item.result).length).toBeGreaterThan(0);
  });
  awards.forEach((item) => {
    expect(within(lastPage).getByRole("heading", { name: item.title })).toBeInTheDocument();
    expect(within(lastPage).getByText(item.description)).toBeInTheDocument();
  });
  education.forEach((item) => {
    expect(within(lastPage).getByRole("heading", { name: item.degree })).toBeInTheDocument();
  });
  getVisibleLicenses().forEach((item) => {
    const entry = within(lastPage).getByRole("heading", { name: item.title, exact: true }).closest("article");
    expect(entry).toHaveTextContent(item.date);
    expect(entry).toHaveTextContent(item.description);
  });
  licenses.filter((item) => !getVisibleLicenses().includes(item)).forEach((item) => {
    expect(within(lastPage).queryByRole("heading", { name: item.title, exact: true })).not.toBeInTheDocument();
  });
  const sqldRow = within(lastPage).getByRole("heading", { name: "SQLD", exact: true }).closest("article");
  expect(sqldRow).not.toHaveTextContent("합격자 발표일");
});

test("메인(/) 상단 헤더는 About·Projects·Credentials와 Resume 버튼을 표시한다", async () => {
  await renderAt(paths.home);

  const nav = screen.getByRole("navigation", { name: "주요 메뉴" });

  ["About", "Projects", "Credentials"].forEach((label) => {
    expect(within(nav).getByRole("link", { name: label })).toBeInTheDocument();
  });
  expect(within(nav).getByRole("link", { name: /Resume/ })).toBeInTheDocument();
  expect(within(nav).queryByRole("link", { name: "Blog" })).not.toBeInTheDocument();
});

test("메인(/)에서 스크롤하면 상단바 메뉴의 활성 커서가 해당 포스터 섹션으로 이동한다", async () => {
  await renderAt(paths.home);

  const nav = screen.getByRole("navigation", { name: "주요 메뉴" });
  const aboutLink = within(nav).getByRole("link", { name: "About" });
  const projectsLink = within(nav).getByRole("link", { name: "Projects" });
  const credentialsLink = within(nav).getByRole("link", { name: "Credentials" });

  // 초기 최상단에서는 About이 활성화된다
  expect(aboutLink).toHaveAttribute("aria-current", "location");

  const sectionOffsets = {
    about: -500,
    projects: 80,
    credentials: 1400,
  };

  ["about", "projects", "credentials"].forEach((id) => {
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

  // Projects 포스터 구간으로 스크롤
  act(() => {
    window.scrollY = 480;
    fireEvent.scroll(window);
  });
  expect(projectsLink).toHaveAttribute("aria-current", "location");
  expect(aboutLink).not.toHaveAttribute("aria-current");

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

test("메인은 프로젝트를 요약하고 상세 보기에서 STAR 사례와 펼쳐진 아키텍처를 제공한다", async () => {
  await renderAt(paths.home);
  ["about", "skills", "projects", "credentials"].forEach((id) => {
    expect(document.getElementById(id)).toBeInTheDocument();
  });
  const summary = screen.getByRole("heading", { level: 3, name: projects[0].title }).closest("article");
  expect(within(within(summary).getByRole("list", { name: "대표 성과" })).getAllByRole("listitem")).toHaveLength(3);
  const billingSummary = screen.getByRole("heading", { level: 3, name: "빌링 서비스·GW 연계 시스템 유지보수" }).closest("article");
  expect(within(within(billingSummary).getByRole("list", { name: "대표 성과" })).getAllByRole("listitem")).toHaveLength(2);
  const platformSummary = screen.getByRole("heading", { level: 3, name: projects[2].title }).closest("article");
  expect(within(platformSummary).getByRole("link", { name: "상세 보기" })).toHaveAttribute("href", paths.projectDetail("cloudxper-billing"));
  expect(within(billingSummary).getByRole("link", { name: "상세 보기" })).toHaveAttribute("href", paths.projectDetail("lgu-billing-gw"));
  expect(within(summary).queryByRole("region", { name: "사용 기술" })).not.toBeInTheDocument();
  expect(within(platformSummary).getByText("로그인 권한 조회 캐시 구현 및 응답 개선")).toBeInTheDocument();
  expect(within(billingSummary).queryByText("로그인 권한 조회 캐시 구현 및 응답 개선")).not.toBeInTheDocument();
  expect(within(summary).queryByText(projects[0].achievements[0].detail.replace(/\s+/g, " "))).not.toBeInTheDocument();
  expect(within(summary).queryByRole("link", { name: /技術|기술 블로그/ })).not.toBeInTheDocument();
  expect(screen.queryByRole("button", { name: /시스템 아키텍처/ })).not.toBeInTheDocument();
  expect(screen.queryByRole("heading", { name: "컴퓨터공학과 학사" })).not.toBeInTheDocument();
  expect(screen.getByRole("img", { name: "EZEN ACADEMY" })).toHaveAttribute("src", "/EZEN.png");

  await userEvent.click(within(summary).getByRole("link", { name: "상세 보기" }));
  await screen.findByRole("heading", { level: 1, name: projects[0].title });
  expect(window.location.pathname).toBe(paths.projectDetail(projects[0].slug));
  const overviewTable = screen.getByRole("table", { name: "프로젝트 요약" });
  expect(within(overviewTable).getByRole("region", { name: "사용 기술" })).toBeInTheDocument();
  expect(within(overviewTable).getByRole("rowheader", { name: "주요 담당 업무" })).toBeInTheDocument();
  ["프로젝트 소개", "주요 기능", "시스템 아키텍처", "주요 문제 해결 사례", "결과 및 성과"].forEach((name) => {
    expect(screen.getByRole("heading", { level: 2, name })).toBeInTheDocument();
  });
  projects[0].achievements[0].detail.split("\n").forEach((line) => expect(screen.getByText(line)).toBeInTheDocument());
  expect(screen.getAllByText(projects[0].achievements[0].result)).toHaveLength(2);
  expect(screen.getByRole("link", { name: /Claude 세션 분리/ })).toHaveAttribute("href", paths.blogPost("claude-assisted-security-remediation"));
  const overview = await screen.findByRole("region", { name: "전체 시스템 구성 시스템 아키텍처 및 데이터 흐름" });
  expect(within(overview).getByRole("heading", { name: "01 / 망 분리 환경과 데이터 동기화" })).toBeInTheDocument();
  expect(within(overview).queryByRole("heading", { name: "02 / SSH 기반 서버 점검과 이력 조회" })).not.toBeInTheDocument();
  const infrastructure = screen.getByText(projects[0].achievements[2].detail).closest("article");
  expect(within(infrastructure).getByRole("region", { name: "서버 점검 수집 시스템 아키텍처 및 데이터 흐름" })).toBeInTheDocument();
  expect(screen.getByRole("img", { name: /전세사기피해자 지원관리시스템 공개 메인 화면/ })).toHaveAttribute("src", "/jeonse-service-preview.jpg");
  expect(screen.getByRole("list", { name: "피해 신청 및 행정 처리 흐름" })).toBeInTheDocument();
  expect(screen.queryByText("S · 상황")).not.toBeInTheDocument();
  expect(screen.getAllByRole("heading", { name: "02 / SSH 기반 서버 점검과 이력 조회" })).toHaveLength(1);
  expect(screen.queryByRole("button", { name: /크게 보기/ })).not.toBeInTheDocument();
  expect(document.querySelector(".arch-help")).not.toBeInTheDocument();
  const architectureHelp = screen.getByRole("button", { name: "시스템 아키텍처 도움말" });
  fireEvent.click(architectureHelp);
  expect(screen.getByRole("tooltip")).toHaveTextContent("구성 요소를 누르면 연결된 흐름과 역할을 볼 수 있습니다.");
  fireEvent.click(architectureHelp);
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  document.querySelectorAll(".project-inline-architecture details").forEach((detail) => {
    expect(detail).toHaveAttribute("open");
  });
  await userEvent.click(screen.getByRole("link", { name: "← 프로젝트 목록" }));
  expect(window.location.pathname).toBe("/");
  expect(window.location.hash).toBe("#project-jeonse-support-system");
});

test("GW 상세 페이지는 해당 프로젝트의 성과와 아키텍처만 표시한다", async () => {
  await renderAt(paths.projectDetail("lgu-billing-gw"));
  expect(screen.getByRole("heading", { level: 1, name: "빌링 서비스·GW 연계 시스템 유지보수" })).toBeInTheDocument();
  projects[1].achievements.forEach((item) => {
    expect(screen.getAllByText(item.result)).toHaveLength(2);
  });
  expect(document.querySelectorAll(".project-case-study")).toHaveLength(2);
  expect(screen.getByRole("heading", { name: "주요 기능" })).toBeInTheDocument();
  expect(screen.getByRole("region", { name: "Kafka GW 시스템 아키텍처 및 데이터 흐름" })).toBeInTheDocument();
  expect(screen.queryByRole("region", { name: "플랫폼 고도화 시스템 아키텍처 및 데이터 흐름" })).not.toBeInTheDocument();
  expect(screen.queryByRole("button", { name: /크게 보기/ })).not.toBeInTheDocument();
  expect(screen.queryByText("S · 상황")).not.toBeInTheDocument();
});

test("CloudXper 상세 페이지는 플랫폼 성과와 아키텍처만 표시한다", async () => {
  await renderAt(paths.projectDetail("cloudxper-billing"));
  expect(screen.getByRole("heading", { level: 1, name: projects[2].title })).toBeInTheDocument();
  expect(screen.getByRole("navigation", { name: "프로젝트 상세 목차" })).toBeInTheDocument();
  expect(document.querySelectorAll(".project-case-study")).toHaveLength(2);
  expect(screen.queryByRole("region", { name: "Kafka GW 시스템 아키텍처 및 데이터 흐름" })).not.toBeInTheDocument();
  expect(screen.getByRole("region", { name: "플랫폼 고도화 시스템 아키텍처 및 데이터 흐름" })).toBeInTheDocument();
  expect(screen.getByRole("region", { name: "조회 병렬화 시스템 아키텍처 및 데이터 흐름" })).toBeInTheDocument();
  expect(screen.getByText("SQL 호출 수를 줄인 성과가 아니라, 당시 순차 조회를 병렬화한 결과입니다.")).toBeInTheDocument();
});

test("포스터 섹션 제목 옆 도움말(?) 버튼에 마우스를 올리면 안내 툴팁이 보이고 떼면 사라진다", async () => {
  await renderAt(paths.home);

  const helpBtn = screen.getByRole("button", {
    name: "Project Experience 도움말",
  });
  expect(helpBtn).toHaveAttribute("aria-expanded", "false");
  expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();

  await userEvent.hover(helpBtn);
  const tooltip = screen.getByRole("tooltip");
  expect(tooltip).toHaveTextContent(
    "회사별 프로젝트의 담당 역할, 사용 기술과 대표 성과를 요약했습니다. 각 카드의 상세 보기에서 주요 기능, 아키텍처와 문제 해결 사례를 확인할 수 있습니다.",
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

test("데스크톱 사이드바를 접으면 본문을 확장하고 다시 펼칠 수 있다", async () => {
  await renderAt(paths.blog);
  const toggle = screen.getByRole("button", { name: "카테고리 메뉴 닫기" });
  expect(toggle).toHaveAttribute("aria-expanded", "true");
  await userEvent.click(toggle);
  expect(toggle).toHaveAttribute("aria-expanded", "false");
  expect(screen.queryByRole("complementary", { name: "블로그 사이드바" })).not.toBeInTheDocument();
  expect(document.querySelector(".blog-container")).toHaveClass("sidebar-collapsed");
  await userEvent.click(screen.getByRole("link", { name: "전체 글", exact: true }));
  expect(toggle).toHaveAttribute("aria-expanded", "false");
  await userEvent.click(toggle);
  expect(screen.getByRole("complementary", { name: "블로그 사이드바" })).toBeVisible();
  expect(document.querySelector(".blog-container")).not.toHaveClass("sidebar-collapsed");
  fireEvent.keyDown(document, { key: "Escape" });
  expect(toggle).toHaveAttribute("aria-expanded", "false");
  expect(toggle).toHaveFocus();
});

test("모바일 사이드바는 닫힌 상태로 시작하고 메뉴 이동 후 다시 닫힌다", async () => {
  vi.stubGlobal("matchMedia", vi.fn(() => ({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() })));
  try {
    await renderAt(paths.blog);
    const toggle = screen.getByRole("button", { name: "카테고리 메뉴 열기" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(toggle);
    expect(screen.getByRole("complementary", { name: "블로그 사이드바" })).toBeVisible();
    expect(document.querySelector(".blog-sidebar-backdrop")).toBeInTheDocument();
    const nav = screen.getByRole("navigation", { name: "블로그 카테고리" });
    await userEvent.click(within(nav).getByRole("link", { name: /분류 전체보기/ }));
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(document.querySelector(".blog-sidebar-backdrop")).not.toBeInTheDocument();
  } finally {
    vi.unstubAllGlobals();
  }
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

test("이력서는 인쇄 직전에 색상 모드를 적용하고 인쇄 종료 후 초기화한다", async () => {
  const modes = [];
  const print = vi.spyOn(window, "print").mockImplementation(() => {
    modes.push(document.querySelector(".resume-print-page").dataset.printMode);
  });
  try {
    await renderAt(paths.resume);
    const page = document.querySelector(".resume-print-page");
    await userEvent.click(screen.getByRole("button", { name: "흑백으로 인쇄" }));
    expect(modes).toEqual(["monochrome"]);
    fireEvent(window, new Event("afterprint"));
    expect(page).toHaveAttribute("data-print-mode", "color");
    await userEvent.click(screen.getByRole("button", { name: "인쇄하기", exact: true }));
    expect(modes).toEqual(["monochrome", "color"]);
  } finally {
    print.mockRestore();
  }
});

test("없는 블로그 글 slug는 블로그 공간 내 404와 글 목록 복귀 링크를 보여준다", async () => {
  await renderAt(paths.blogPost("does-not-exist"));

  expect(screen.getByText("404")).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "글 목록으로 돌아가기" })).toHaveAttribute(
    "href",
    paths.blog,
  );
});

test("블로그 상세의 A4 PDF 저장 버튼은 현재 글에서 인쇄 창을 연다", async () => {
  const post = getAllPosts()[0];
  const print = vi.spyOn(window, "print").mockImplementation(() => {});
  try {
    await renderAt(paths.blogPost(post.slug));
    await userEvent.click(screen.getByRole("button", { name: "PDF 저장" }));
    expect(print).toHaveBeenCalledTimes(1);
    expect(document.title).toBe(`${post.title} | 길태형 기술 블로그`);
    expect(screen.getByRole("heading", { level: 1, name: post.title })).toBeInTheDocument();
  } finally {
    print.mockRestore();
  }
});
