import { describe, expect, test } from "vitest";
import projects, { getCareerGroups } from "./projects";
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

  test("화면과 이력서가 요구하는 필드와 소속 회사·팀이 모두 채워져 있다", () => {
    projects.forEach((project) => {
      expect(project.companyId).toBeTruthy();
      expect(project.company).toBeTruthy();
      expect(project.team).toBeTruthy();
      expect(project.affiliation).toBeTruthy();
      expect(project.title).toBeTruthy();
      expect(project.period).toBeTruthy();
      expect(project.role).toBeTruthy();
      expect(project.mainTasks.length).toBeGreaterThan(0);
      expect(project.skills.length).toBeGreaterThan(0);
      expect(project.achievements.length).toBeGreaterThan(0);
    });
  });

  test("소속 회사·팀 단위로 그룹핑하면 전체 프로젝트 합계와 일치한다", () => {
    const groups = getCareerGroups();
    expect(groups).toHaveLength(2);
    expect(groups[0].affiliation).toBe("(주)마이크로 서비스 | SI 본부");
    expect(groups[1].affiliation).toBe("(주)애버커스 | 빌링시스템팀");
    expect(groups[1].projects).toHaveLength(1);
    expect(groups[1].projects[0].workScopes).toHaveLength(2);
    const skillTokens = groups[1].projects[0].skills.flatMap((skill) => skill.value.split(",").map((token) => token.trim()));
    expect(skillTokens.filter((token) => token.startsWith("Spring Boot"))).toEqual(["Spring Boot(3.x.x)"]);
    expect(skillTokens.filter((token) => token.startsWith("Linux"))).toEqual(["Linux(CentOS·Ubuntu)"]);
    expect(new Set(skillTokens).size).toBe(skillTokens.length);

    const total = groups.reduce((sum, group) => sum + group.projects.reduce((count, project) => count + (project.workScopes?.length || 1), 0), 0);
    expect(total).toBe(projects.length);
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
