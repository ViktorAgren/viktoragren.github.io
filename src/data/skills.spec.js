import { skillCategories } from "./skills";

describe("skillCategories", () => {
  test("contains expected number of categories", () => {
    expect(skillCategories).toHaveLength(5);
  });

  test("each category has required structure", () => {
    skillCategories.forEach((category) => {
      expect(category).toHaveProperty("title");
      expect(category).toHaveProperty("icon");
      expect(category).toHaveProperty("description");
      expect(category).toHaveProperty("skills");
      expect(Array.isArray(category.skills)).toBe(true);
    });
  });

  test("each skill has required properties", () => {
    skillCategories.forEach((category) => {
      category.skills.forEach((skill) => {
        expect(skill).toHaveProperty("name");
        expect(skill).toHaveProperty("detail");
        expect(skill).toHaveProperty("projects");
        expect(skill).toHaveProperty("expertise");
        expect(skill).toHaveProperty("status");
        expect(Array.isArray(skill.expertise)).toBe(true);
      });
    });
  });

  test("skill statuses are valid values", () => {
    const validStatuses = ["LEARNING", "MAINTAINED", "ACTIVE"];

    skillCategories.forEach((category) => {
      category.skills.forEach((skill) => {
        expect(validStatuses).toContain(skill.status);
      });
    });
  });
});
