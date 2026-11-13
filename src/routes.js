/**
 * 경로 및 포스터 섹션 정의의 단일 출처.
 * 포트폴리오 셸(스크롤 스파이 섹션 + 출력용 이력서)과 블로그 셸이 공유합니다.
 */
export const paths = {
  home: "/",
  section: (id) => (id === "about" ? "/" : `/#${id}`),
  projectAnchor: (slug) => `/#project-${slug}`,
  projectDetail: (slug) => `/projects/${slug}`,
  blog: "/blog",
  blogPost: (slug) => `/blog/${slug}`,
  resume: "/resume",
};

/**
 * 메인 포트폴리오(/) 원페이지를 구성하는 4개 포스터 섹션.
 * 스크롤 위치에 따라 상단 헤더·모바일 하단바의 활성 커서가 이 순서대로 이동합니다.
 */
export const portfolioSections = [
  { id: "about", label: "About", mobileLabel: "소개" },
  { id: "skills", label: "Skills", mobileLabel: "역량" },
  { id: "projects", label: "Projects", mobileLabel: "프로젝트" },
  { id: "credentials", label: "Credentials", mobileLabel: "이력·자격" },
];

/** 독립된 블로그 공간(/blog/*) 전용 상단 메뉴 구성. */
export const blogNavigation = [
  { label: "전체 글", to: paths.blog, end: true },
];

/**
 * 통합 전 개별 페이지 경로 및 구 버전 경로 리다이렉트.
 * 기존에 공유된 링크로 들어와도 메인 페이지의 해당 포스터 위치로 안내합니다.
 */
export const legacyRedirects = [
  { from: "/projects", to: paths.section("projects") },
  { from: "/education", to: paths.section("credentials") },
  { from: "/awards", to: paths.section("credentials") },
  { from: "/licenses", to: paths.section("credentials") },
  { from: "/architecture", to: paths.home },
  { from: "/ProjectsList", to: paths.projectAnchor("jeonse-support-system") },
  { from: "/ProjectsList2", to: paths.projectAnchor("cloudxper-billing") },
  { from: "/ProjectsList3", to: paths.projectAnchor("lgu-billing-gw") },
  { from: "/EducationList", to: paths.section("credentials") },
  { from: "/Awards", to: paths.section("credentials") },
  { from: "/Licenses", to: paths.section("credentials") },
  { from: "/ResumePrint", to: paths.resume },
  { from: "/Architecture", to: paths.home },
  { from: "/Inventory", to: paths.home },
];
