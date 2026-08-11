import projects from "./data/projects";

/**
 * 경로 정의의 단일 출처.
 * App.jsx(라우팅)와 Navbar.jsx(메뉴)가 같은 곳을 보게 해서 둘이 어긋나지 않도록 합니다.
 */
export const paths = {
  home: "/",
  projects: "/projects",
  project: (slug) => `/projects/${slug}`,
  education: "/education",
  awards: "/awards",
  licenses: "/licenses",
  resume: "/resume",
  architecture: "/architecture",
};

/**
 * 사이드바 메뉴 구성. 프로젝트 서브메뉴는 data/projects.js에서 자동 생성되므로
 * 프로젝트를 추가해도 이 파일을 고칠 필요가 없습니다.
 */
export const navigation = [
  { kind: "link", label: "About Me", to: paths.home },
  {
    kind: "group",
    label: "Project Experience",
    children: projects.map((project) => ({
      label: project.shortTitle || project.title,
      to: paths.project(project.slug),
    })),
  },
  { kind: "link", label: "Education", to: paths.education },
  { kind: "link", label: "Awards", to: paths.awards },
  { kind: "link", label: "Licenses", to: paths.licenses },
  { kind: "link", label: "Resume Print", to: paths.resume },
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
