import { describe, expect, test } from "vitest";
import {
  findPostBySlug,
  getAllPosts,
  getAllTags,
  getCategoryTree,
} from "./posts";

describe("블로그 글 로더", () => {
  test("검수 글은 기존 태그보다 명시한 AI 검수 분류를 우선한다", () => {
    const slugs = ["portfolio-blog-audit-report", "portfolio-content-consistency-review", "portfolio-website", "ai-portfolio-review-notes"];
    slugs.forEach((slug) => {
      expect(findPostBySlug(slug).category.subId).toBe("ai-review");
    });
    const group = getCategoryTree().find((item) => item.groupId === "review");
    expect(group.count).toBe(slugs.length);
    expect(group.groupLabel).toBe("AI 검수");
  });

  test("모든 글이 필수 frontmatter(title, date)와 분류 카테고리를 갖는다", () => {
    const posts = getAllPosts();

    expect(posts.length).toBeGreaterThan(0);
    posts.forEach((post) => {
      expect(post.title).toBeTruthy();
      expect(post.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(post.body.trim().length).toBeGreaterThan(0);
      expect(post.category.groupId).toBeTruthy();
      expect(post.category.groupLabel).toBeTruthy();
      expect(post.category.subId).toBeTruthy();
      expect(post.category.subLabel).toBeTruthy();
    });
  });

  test("slug는 중복되지 않는다", () => {
    const slugs = getAllPosts().map((post) => post.slug);

    expect(new Set(slugs).size).toBe(slugs.length);
  });

  test("최신 글이 먼저 온다", () => {
    const dates = getAllPosts().map((post) => post.date);
    const sorted = [...dates].sort((a, b) => b.localeCompare(a));

    expect(dates).toEqual(sorted);
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
