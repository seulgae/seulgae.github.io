import { describe, expect, test } from "vitest";
import {
  CATEGORY_DEFINITIONS,
  comparePostsByCreatedAt,
  findPostBySlug,
  getAllPosts,
  getAllTags,
  getCategoryTree,
  loadAllPostBodies,
  loadPostBody,
} from "./posts";

describe("블로그 글 로더", () => {
  test("Claude 플러그인 글을 AI Workflow의 Claude Code 카테고리로 분류한다", () => {
    const post = findPostBySlug("claude-code-development-environment-plugins");
    expect(post.category.groupId).toBe("ai");
    expect(post.category.subId).toBe("claude-code");
    const group = getCategoryTree().find((category) => category.groupId === "ai");
    expect(group.subs.find((category) => category.id === "claude-code").count).toBeGreaterThanOrEqual(1);
  });

  test("객체지향 시리즈 7편을 Java 카테고리와 학습 날짜로 분류한다", () => {
    const series = getAllPosts().filter((post) => /^java-oop-0[1-7]-/.test(post.slug));
    expect(series).toHaveLength(7);
    series.forEach((post) => {
      expect(post.date).toBe("2022-06-07");
      expect(post.category.subId).toBe("java");
      expect(post.category.groupId).toBe("backend");
    });
    const backend = getCategoryTree().find((group) => group.groupId === "backend");
    const java = backend.subs.find((category) => category.id === "java");
    expect(java.label).toBe("Java");
    expect(java.count).toBeGreaterThanOrEqual(series.length);
  });

  test("삭제한 AI 활용 기록은 목록과 카테고리에 표시하지 않는다", () => {
    ["redis-permission-cache-side-project", "backend-reliability-practice", "portfolio-quality-practice", "ai-portfolio-inspection-log"].forEach((slug) => {
      expect(findPostBySlug(slug)).toBeUndefined();
    });
    expect(getCategoryTree().find((group) => group.groupId === "practice")).toBeUndefined();
    expect(findPostBySlug("redis-permission-cache-ttl").category.subId).toBe("redis-cache");
  });

  test("모든 글이 필수 frontmatter(title, date)와 분류 카테고리를 갖는다", () => {
    const posts = getAllPosts();

    expect(posts.length).toBeGreaterThan(0);
    posts.forEach((post) => {
      expect(post.title).toBeTruthy();
      expect(post.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      if (post.createdAt) {
        expect(post.createdAt, `${post.slug}: createdAt 형식`).toMatch(
          /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:Z|[+-]\d{2}:\d{2})$/,
        );
        expect(Number.isFinite(Date.parse(post.createdAt))).toBe(true);
      }
      expect(post.category.groupId).toBeTruthy();
      expect(post.category.groupLabel).toBeTruthy();
      expect(post.category.subId).toBeTruthy();
      expect(post.category.subLabel).toBeTruthy();
    });
  });

  test("목록용 메타데이터에는 본문이 없고 본문은 지연 로딩한다", async () => {
    const [first] = getAllPosts();
    expect(first).not.toHaveProperty("body");

    const body = await loadPostBody(first.slug);
    expect(body.trim().length).toBeGreaterThan(0);
    expect(body.startsWith("---")).toBe(false);
    expect(body).not.toMatch(/^title:/m);
    expect(await loadPostBody(first.slug)).toBe(body);
    await expect(loadPostBody("does-not-exist")).rejects.toThrow();
  });

  test("모든 글의 본문이 비어 있지 않다", async () => {
    const bodies = await loadAllPostBodies();
    expect(bodies.size).toBe(getAllPosts().length);
    bodies.forEach((body, slug) => {
      expect(body.trim().length, `${slug}: 본문`).toBeGreaterThan(0);
    });
  });

  test("모든 글은 frontmatter에 유효한 category id를 명시한다", () => {
    // category를 생략하면 태그로 추측하고, 맞는 규칙이 없으면 경고 없이 "Spring · 아키텍처"로 분류됩니다.
    // 새 글을 쓸 때 이 테스트가 실패하면 frontmatter에 아래 id 중 하나를 category로 적으세요.
    const validIds = CATEGORY_DEFINITIONS.flatMap((group) => group.subs.map((sub) => sub.id));
    const metas = import.meta.glob("../posts/*.md", { query: "?meta", import: "default", eager: true });
    Object.entries(metas).forEach(([path, meta]) => {
      const category = meta.match(/^category:\s*(.+?)\s*$/m)?.[1];
      expect(category, `${path}: category 누락`).toBeTruthy();
      expect(validIds, `${path}: 알 수 없는 category "${category}"`).toContain(category);
    });
  });

  test("slug는 중복되지 않는다", () => {
    const slugs = getAllPosts().map((post) => post.slug);

    expect(new Set(slugs).size).toBe(slugs.length);
  });

  test("최신 글이 먼저 온다", () => {
    const posts = getAllPosts();
    expect(posts).toEqual([...posts].sort(comparePostsByCreatedAt));
  });

  test("작성 시각 내림차순으로 정렬하고 누락·잘못된 시각은 날짜로 대체한다", () => {
    const records = [
      { slug: "legacy", date: "2026-11-15" },
      { slug: "early", date: "2026-11-15", createdAt: "2026-11-15T14:29:00+09:00" },
      { slug: "late", date: "2026-11-15", createdAt: "2026-11-15T05:30:00Z" },
      { slug: "invalid", date: "2026-11-14", createdAt: "invalid" },
    ];
    expect(records.sort(comparePostsByCreatedAt).map((post) => post.slug))
      .toEqual(["late", "early", "legacy", "invalid"]);
  });

  test("slug로 글을 찾을 수 있다", () => {
    const [first] = getAllPosts();

    expect(findPostBySlug(first.slug)).toBe(first);
    expect(findPostBySlug("does-not-exist")).toBeUndefined();
  });

  test("태그 집계에 개수가 포함된다", () => {
    getAllTags().forEach((tag) => {
      expect(tag.name).toBeTruthy();
      expect(tag.count).toBeGreaterThan(0);
    });
  });

  test("카테고리 트리 합계는 전체 글 수와 일치한다", () => {
    const posts = getAllPosts();
    const tree = getCategoryTree();

    const totalFromGroups = tree.reduce((sum, group) => sum + group.count, 0);
    const totalFromSubs = tree.reduce(
      (sum, group) =>
        sum + group.subs.reduce((subSum, sub) => subSum + sub.count, 0),
      0,
    );

    expect(totalFromGroups).toBe(posts.length);
    expect(totalFromSubs).toBe(posts.length);
  });
});
