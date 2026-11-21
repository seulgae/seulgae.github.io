/**
 * src/posts/*.md 파일을 읽어 블로그 글 목록·카테고리 트리·태그 집계를 생성합니다.
 *
 * frontmatter 예시:
 *   ---
 *   title: 글 제목
 *   date: 2026-08-11
 *   category: sql-tuning   (필수 — CATEGORY_DEFINITIONS의 sub id. posts.test.js가 누락·오타를 검사합니다)
 *   tags: SQL, Oracle, Performance
 *   summary: 목록에 표시할 요약
 *   ---
 */

// 목록·사이드바용 frontmatter만 즉시 읽습니다. (scripts/postMetaPlugin.js가 `?meta`를 처리)
const metaModules = import.meta.glob("../posts/*.md", {
  query: "?meta",
  import: "default",
  eager: true,
});

// 본문은 글마다 별도 청크로 분리하여 해당 글을 열거나 본문 검색할 때만 내려받습니다.
const bodyLoaders = import.meta.glob("../posts/*.md", {
  query: "?raw",
  import: "default",
});

export const CATEGORY_DEFINITIONS = [
  {
    groupId: "side-projects",
    groupLabel: "사이드 프로젝트",
    subs: [
      { id: "seulgae-tech-lab", label: "슬개 기술 연구소" },
    ],
  },
  {
    groupId: "practice",
    groupLabel: "AI 활용 기록",
    subs: [
      { id: "practice-tasks", label: "AI 성과별 실습 과제" },
      { id: "ai-inspection", label: "AI 점검 기록" },
    ],
  },
  {
    groupId: "backend",
    groupLabel: "Backend & Architecture",
    subs: [
      { id: "java", label: "Java" },
      { id: "spring-mybatis", label: "Spring · 아키텍처" },
      { id: "kafka-di", label: "Kafka · 데이터 정합성" },
    ],
  },
  {
    groupId: "database",
    groupLabel: "Database & Performance",
    subs: [
      { id: "sql-tuning", label: "SQL · 실행계획 튜닝" },
      { id: "redis-cache", label: "Redis · 캐시 설계" },
    ],
  },
  {
    groupId: "security-infra",
    groupLabel: "Security & Infra",
    subs: [
      { id: "sast-cwe", label: "SAST · 시큐어코딩 (CWE)" },
      { id: "linux-ops", label: "Linux · 운영 자동화" },
      { id: "home-server", label: "홈서버 구축하기" },
    ],
  },
  {
    groupId: "retrospective",
    groupLabel: "면접 준비 · 사이트 가이드",
    subs: [
      { id: "project-review", label: "기업 면접 준비" },
      { id: "dev-notes", label: "블로그 사이트 가이드" },
    ],
  },
];

function inferCategory(slug, tags, rawCategory) {
  if (rawCategory) {
    for (const group of CATEGORY_DEFINITIONS) {
      for (const sub of group.subs) {
        if (
          rawCategory.includes(sub.id) ||
          rawCategory.includes(sub.label)
        ) {
          return {
            groupId: group.groupId,
            groupLabel: group.groupLabel,
            subId: sub.id,
            subLabel: sub.label,
          };
        }
      }
    }
  }

  const lowerSlug = slug.toLowerCase();
  const tagSet = new Set(tags.map((t) => t.toLowerCase()));

  if (lowerSlug.startsWith("cwe-") || tagSet.has("sast")) {
    return {
      groupId: "security-infra",
      groupLabel: "Security & Infra",
      subId: "sast-cwe",
      subLabel: "SAST · 시큐어코딩 (CWE)",
    };
  }

  if (
    lowerSlug.startsWith("interview-") ||
    tagSet.has("interview") ||
    tagSet.has("review")
  ) {
    return {
      groupId: "retrospective",
      groupLabel: "면접 준비 · 사이트 가이드",
      subId: "project-review",
      subLabel: "기업 면접 준비",
    };
  }

  if (tagSet.has("guide") || tagSet.has("react") || tagSet.has("refactoring")) {
    return {
      groupId: "retrospective",
      groupLabel: "면접 준비 · 사이트 가이드",
      subId: "dev-notes",
      subLabel: "블로그 사이트 가이드",
    };
  }

  if (tagSet.has("kafka")) {
    return {
      groupId: "backend",
      groupLabel: "Backend & Architecture",
      subId: "kafka-di",
      subLabel: "Kafka · 데이터 정합성",
    };
  }

  if (tagSet.has("redis")) {
    return {
      groupId: "database",
      groupLabel: "Database & Performance",
      subId: "redis-cache",
      subLabel: "Redis · 캐시 설계",
    };
  }

  if (
    (tagSet.has("sql") && tagSet.has("performance")) ||
    tagSet.has("cubrid") ||
    tagSet.has("oracle")
  ) {
    return {
      groupId: "database",
      groupLabel: "Database & Performance",
      subId: "sql-tuning",
      subLabel: "SQL · 실행계획 튜닝",
    };
  }

  if (tagSet.has("ssh") || tagSet.has("linux") || tagSet.has("infra")) {
    return {
      groupId: "security-infra",
      groupLabel: "Security & Infra",
      subId: "linux-ops",
      subLabel: "Linux · 운영 자동화",
    };
  }

  return {
    groupId: "backend",
    groupLabel: "Backend & Architecture",
    subId: "spring-mybatis",
    subLabel: "Spring · 아키텍처",
  };
}

/** "key: value" 줄들로 이루어진 frontmatter 블록을 파싱합니다. */
function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);

  if (!match) {
    return { meta: {}, body: raw };
  }

  const meta = {};

  match[1].split(/\r?\n/).forEach((line) => {
    const separator = line.indexOf(":");

    if (separator === -1) {
      return;
    }

    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim();

    if (key) {
      meta[key] = value;
    }
  });

  return { meta, body: raw.slice(match[0].length) };
}

function slugFromPath(path) {
  return path.split("/").pop().replace(/\.md$/, "");
}

function toPost(path, rawMeta) {
  const slug = slugFromPath(path);
  const { meta } = parseFrontmatter(rawMeta);
  const tags = meta.tags
    ? meta.tags.split(",").map((tag) => tag.trim()).filter(Boolean)
    : [];
  const category = inferCategory(slug, tags, meta.category);

  return {
    slug,
    title: meta.title || slug,
    date: meta.date || "",
    createdAt: meta.createdAt || "",
    tags,
    summary: meta.summary || "",
    category,
  };
}

function postTimestamp(post) {
  const createdAt = Date.parse(post.createdAt);
  if (Number.isFinite(createdAt)) return createdAt;
  // 날짜만 있는 기존 글은 한국 시간 자정을 기준으로 정렬합니다.
  const date = Date.parse(`${post.date}T00:00:00+09:00`);
  return Number.isFinite(date) ? date : 0;
}

export function comparePostsByCreatedAt(a, b) {
  return postTimestamp(b) - postTimestamp(a) || a.slug.localeCompare(b.slug);
}

const posts = Object.entries(metaModules)
  .map(([path, rawMeta]) => toPost(path, rawMeta))
  .sort(comparePostsByCreatedAt);

const bodyLoadersBySlug = new Map(
  Object.entries(bodyLoaders).map(([path, load]) => [slugFromPath(path), load]),
);
const bodyCache = new Map();

/** 글 본문(frontmatter 제외)을 지연 로딩합니다. 같은 글은 한 번만 내려받습니다. */
export function loadPostBody(slug) {
  const load = bodyLoadersBySlug.get(slug);

  if (!load) {
    return Promise.reject(new Error(`존재하지 않는 글입니다: ${slug}`));
  }

  if (!bodyCache.has(slug)) {
    const pending = load().then((raw) => parseFrontmatter(raw).body);
    pending.catch(() => bodyCache.delete(slug));
    bodyCache.set(slug, pending);
  }

  return bodyCache.get(slug);
}

/** 본문 검색용으로 모든 글 본문을 읽어 slug → 본문 Map을 반환합니다. */
export async function loadAllPostBodies() {
  const entries = await Promise.all(
    posts.map(async (post) => [post.slug, await loadPostBody(post.slug)]),
  );
  return new Map(entries);
}

export function getAllPosts() {
  return posts;
}

export function findPostBySlug(slug) {
  return posts.find((post) => post.slug === slug);
}

export function getAllTags() {
  const tags = new Map();

  posts.forEach((post) => {
    post.tags.forEach((tag) => tags.set(tag, (tags.get(tag) || 0) + 1));
  });

  return [...tags.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export function getCategoryTree() {
  return CATEGORY_DEFINITIONS.map((group) => {
    const subs = group.subs.map((sub) => {
      const count = posts.filter((post) => post.category.subId === sub.id).length;
      return { ...sub, count };
    });
    const groupCount = subs.reduce((sum, sub) => sum + sub.count, 0);

    return {
      groupId: group.groupId,
      groupLabel: group.groupLabel,
      count: groupCount,
      subs,
    };
  });
}
