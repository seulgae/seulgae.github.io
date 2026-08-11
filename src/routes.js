/**
 * 경로 정의의 단일 출처.
 * App.jsx(라우팅)와 Header.jsx(메뉴)가 같은 곳을 보게 해서 둘이 어긋나지 않도록 합니다.
 */
export const paths = {
  home: "/",
  projects: "/projects",
  project: (slug) => `/projects/${slug}`,
  blog: "/blog",
  blogPost: (slug) => `/blog/${slug}`,
  education: "/education",
  awards: "/awards",
  licenses: "/licenses",
  resume: "/resume",
  architecture: "/architecture",
};

/** 상단 헤더 메뉴 구성. 프로젝트·블로그 개별 글은 각 인덱스 페이지에서 진입합니다. */
export const navigation = [
  { label: "About", to: paths.home },
  { label: "Projects", to: paths.projects },
  { label: "Education", to: paths.education },
  { label: "Awards", to: paths.awards },
  { label: "Licenses", to: paths.licenses },
  { label: "Resume", to: paths.resume },
  { label: "Blog", to: paths.blog },
];

/**
 * 이전 버전에서 쓰던 경로. 이력서·메일 등으로 이미 공유된 링크가 깨지지 않도록 유지합니다.
 * 프로젝트 경로는 순서가 아니라 slug를 직접 지정해, 데이터 순서를 바꿔도 링크가 엉키지 않습니다.
 */
export const legacyRedirects = [
  { from: "/ProjectsList", to: paths.project("jeonse-support-system") },
  { from: "/ProjectsList2", to: paths.project("cloudxper-billing") },
  { from: "/ProjectsList3", to: paths.project("lgu-billing-gw") },
  { from: "/EducationList", to: paths.education },
  { from: "/Awards", to: paths.awards },
  { from: "/Licenses", to: paths.licenses },
  { from: "/ResumePrint", to: paths.resume },
  { from: "/Architecture", to: paths.architecture },
  { from: "/Inventory", to: paths.home },
];
