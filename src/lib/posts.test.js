import { describe, expect, test } from "vitest";
import {
  findPostBySlug,
  getAllPosts,
  getAllTags,
  getCategoryTree,
} from "./posts";

describe("블로그 글 로더", () => {
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
    expect(java.count).toBe(series.length);
  });

  test("검수 글 대신 실습 과제를 분류하고 기존 실무 글은 유지한다", () => {
    const expected = [
      ["redis-permission-cache-side-project", "practice-tasks"],
      ["backend-reliability-practice", "practice-tasks"],
      ["portfolio-quality-practice", "practice-tasks"],
    ];
    expected.forEach(([slug, category]) => {
      expect(findPostBySlug(slug).category.subId).toBe(category);
    });
    expect(findPostBySlug("redis-permission-cache-ttl").category.subId).toBe("redis-cache");
    const group = getCategoryTree().find((item) => item.groupId === "practice");
    expect(group.count).toBe(expected.length + 1);
    expect(group.groupLabel).toBe("AI 활용 기록");
    expect(group.subs).toHaveLength(2);
    expect(group.subs[0].label).toBe("AI 성과별 실습 과제");
    expect(group.subs[0].count).toBe(3);
    expect(group.subs[1].label).toBe("AI 점검 기록");
    expect(group.subs[1].count).toBe(1);
    expect(findPostBySlug("ai-portfolio-inspection-log").category.subId).toBe("ai-inspection");
    ["portfolio-blog-audit-report", "portfolio-content-consistency-review", "portfolio-website", "ai-portfolio-review-notes"].forEach((slug) => {
      expect(findPostBySlug(slug)).toBeUndefined();
    });
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
