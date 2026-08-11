import { describe, expect, test } from "vitest";
import projects from "./projects";
import education from "./education";
import awards from "./awards";
import licenses from "./licenses";
import profile, { getAge } from "./profile";

describe("projects", () => {
  test("slug는 중복되지 않고 URL로 쓸 수 있는 형태다", () => {
    const slugs = projects.map((project) => project.slug);

    expect(new Set(slugs).size).toBe(slugs.length);
    slugs.forEach((slug) => expect(slug).toMatch(/^[a-z0-9-]+$/));
  });

  test("화면과 이력서가 요구하는 필드가 모두 채워져 있다", () => {
    projects.forEach((project) => {
      expect(project.title).toBeTruthy();
      expect(project.period).toBeTruthy();
      expect(project.role).toBeTruthy();
      expect(project.mainTasks.length).toBeGreaterThan(0);
      expect(project.skills.length).toBeGreaterThan(0);
      expect(project.achievements.length).toBeGreaterThan(0);
    });
  });

  test("성과 항목에는 이력서에 쓰이는 result가 있다", () => {
    projects.forEach((project) => {
      project.achievements.forEach((achievement) => {
        expect(achievement.title).toBeTruthy();
        expect(achievement.result).toBeTruthy();
      });
    });
  });
});

describe("이력 데이터", () => {
  test("목록 항목의 id는 중복되지 않는다", () => {
    [education, awards, licenses].forEach((list) => {
      const ids = list.map((item) => item.id);

      expect(new Set(ids).size).toBe(ids.length);
    });
  });
});

describe("profile", () => {
  test("만 나이는 기준일에 따라 계산된다", () => {
    // 1996-08-16 생일 기준
    expect(getAge(new Date("2026-08-11"))).toBe(29);
    expect(getAge(new Date("2026-08-16"))).toBe(30);
  });

  test("기술 스택은 Home과 이력서가 함께 쓰는 그룹 구조다", () => {
    expect(profile.techStack.length).toBeGreaterThan(0);
    profile.techStack.forEach((group) => {
      expect(group.label).toBeTruthy();
      expect(group.items.length).toBeGreaterThan(0);
    });
  });
});
