import { describe, expect, test } from "vitest";
import { findPostBySlug, getAllPosts, getAllTags } from "./posts";

describe("블로그 글 로더", () => {
  test("모든 글이 필수 frontmatter(title, date)를 갖는다", () => {
    const posts = getAllPosts();

    expect(posts.length).toBeGreaterThan(0);
    posts.forEach((post) => {
      expect(post.title).toBeTruthy();
      expect(post.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(post.body.trim().length).toBeGreaterThan(0);
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
});
