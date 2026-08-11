/**
 * src/posts/*.md 파일을 읽어 블로그 글 목록을 만듭니다.
 *
 * 글 하나 = 마크다운 파일 하나. 파일 상단에 frontmatter를 씁니다:
 *
 *   ---
 *   title: Redis TTL과 토큰 만료 동기화
 *   date: 2026-08-11
 *   tags: Redis, Spring
 *   summary: 목록 카드에 보여줄 한 줄 요약
 *   ---
 *   본문 마크다운...
 *
 * 파일명이 곧 글 주소(slug)가 됩니다. (redis-ttl.md -> /blog/redis-ttl)
 * DB 없이 동작합니다 — 파일을 추가하고 배포하면 그대로 공개됩니다.
 */

const modules = import.meta.glob("../posts/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

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

  return {
    slug,
    title: meta.title || slug,
    date: meta.date || "",
    tags: meta.tags
      ? meta.tags.split(",").map((tag) => tag.trim()).filter(Boolean)
      : [],
    summary: meta.summary || "",
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

  return [...tags.entries()].map(([name, count]) => ({ name, count }));
}
