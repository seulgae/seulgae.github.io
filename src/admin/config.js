import { CATEGORY_DEFINITIONS } from "../lib/posts";

export const adminConfig = {
  load_config_file: false,
  locale: "ko",
  backend: {
    name: "github",
    repo: "seulgae/seulgae.github.io",
    branch: "main",
    auth_methods: ["token"],
    squash_merges: true,
    commit_messages: {
      create: "[블로그] {{slug}} 글 추가",
      update: "[블로그] {{slug}} 글 수정",
      delete: "[블로그] {{slug}} 글 삭제",
      uploadMedia: "[블로그] {{path}} 이미지 추가",
      deleteMedia: "[블로그] {{path}} 이미지 삭제",
    },
  },
  publish_mode: "editorial_workflow",
  site_url: "https://seulgae.github.io",
  display_url: "https://seulgae.github.io/blog",
  logo_url: "/backend-mark.svg",
  media_folder: "public/uploads",
  public_folder: "/uploads",
  collections: [{
    name: "posts",
    label: "블로그 글",
    label_singular: "글",
    folder: "src/posts",
    create: true,
    delete: false,
    extension: "md",
    format: "portfolio-post",
    slug: {
      editable: ["create"],
      pattern: ["^[a-z0-9]+(?:-[a-z0-9]+)*$", "주소는 영문 소문자·숫자·하이픈으로 입력해 주세요."],
      hint: "예: redis-permission-cache · 게시 후 글 주소는 고정됩니다.",
    },
    preview_path: "blog/{{slug}}",
    summary: "{{title}} · {{date}}",
    sortable_fields: ["date", "title"],
    fields: [
      { name: "title", label: "제목", widget: "string" },
      { name: "date", label: "작성일", widget: "datetime", format: "YYYY-MM-DD", date_format: "YYYY-MM-DD", time_format: false },
      { name: "tags", label: "태그", widget: "string", required: false, hint: "Java, Spring처럼 쉼표로 구분해 주세요." },
      { name: "summary", label: "목록 요약", widget: "string", required: false },
      {
        name: "category", label: "카테고리", widget: "select", required: false,
        hint: "비워 두면 기존처럼 태그와 글 주소를 기준으로 분류합니다.",
        options: CATEGORY_DEFINITIONS.flatMap((group) => group.subs.map((sub) => ({
          label: `${group.groupLabel} / ${sub.label}`, value: sub.id,
        }))),
      },
      { name: "body", label: "본문", widget: "markdown" },
    ],
  }],
};
