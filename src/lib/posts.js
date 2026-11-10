/**
 * src/posts/*.md 파일을 읽어 블로그 글 목록·카테고리 트리·태그 집계를 생성합니다.
 *
 * frontmatter 예시:
 *   ---
 *   title: 글 제목
 *   date: 2026-08-11
 *   category: Database & Performance / SQL · 실행계획 튜닝   (선택 — 생략 시 태그·슬러그로 자동 분류)
 *   tags: SQL, Oracle, Performance
 *   summary: 목록에 표시할 요약
 *   ---
 */

const modules = import.meta.glob("../posts/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

export const CATEGORY_DEFINITIONS = [
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

function toPost(path, raw) {
  const slug = path.split("/").pop().replace(/\.md$/, "");
  const { meta, body } = parseFrontmatter(raw);
  const tags = meta.tags
    ? meta.tags.split(",").map((tag) => tag.trim()).filter(Boolean)
    : [];
  const category = inferCategory(slug, tags, meta.category);

  return {
    slug,
    title: meta.title || slug,
    date: meta.date || "",
    tags,
    summary: meta.summary || "",
    category,
    body,
  };
}

const posts = Object.entries(modules)
  .map(([path, raw]) => toPost(path, raw))
  .sort((a, b) => b.date.localeCompare(a.date));

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
