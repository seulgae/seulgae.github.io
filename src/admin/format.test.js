import { describe, expect, test } from "vitest";
import { getAllPosts } from "../lib/posts";
import { readPost, writePost } from "./format";
import { adminConfig } from "./config";

describe("관리자 글 저장 형식", () => {
  test("기존 글의 메타데이터와 본문을 저장 후 다시 읽을 수 있다", () => {
    for (const post of getAllPosts()) {
      const data = { title: post.title, date: post.date, tags: post.tags.join(", "), summary: post.summary, body: post.body };
      const restored = readPost(writePost(data));
      expect(restored.title).toBe(data.title);
      expect(restored.date).toBe(data.date);
      expect(restored.tags || "").toBe(data.tags);
      expect(restored.body.trim()).toBe(data.body.trim());
    }
  });

  test("제목의 콜론·따옴표와 코드 블록을 그대로 유지한다", () => {
    const data = { title: 'Redis: "권한" 캐시', date: "2026-11-10", category: "redis-cache", body: '```java\nString a = "x";\n```\n' };
    expect(readPost(writePost(data))).toEqual(data);
  });

  test("여러 줄 메타데이터 삽입을 거부한다", () => {
    expect(() => writePost({ title: "제목\ncategory: injected" })).toThrow("한 줄");
  });

  test("초안은 별도 브랜치로 저장하고 기존 글 주소 변경·삭제를 제한한다", () => {
    expect(adminConfig.publish_mode).toBe("editorial_workflow");
    expect(adminConfig.backend.auth_methods).toEqual(["token"]);
    expect(adminConfig.collections[0].slug.editable).toEqual(["create"]);
    expect(adminConfig.collections[0].delete).toBe(false);
  });
});
