import { projects, projectCategories } from "./projects";

describe("projects data", () => {
  test("contains expected number of projects", () => {
    expect(projects).toHaveLength(3);
  });

  test("each project has required structure", () => {
    projects.forEach((project) => {
      expect(project).toHaveProperty("title");
      expect(project).toHaveProperty("description");
      expect(project).toHaveProperty("category");
      expect(project).toHaveProperty("stats");
      expect(project).toHaveProperty("tags");
      expect(project).toHaveProperty("links");
      expect(project).toHaveProperty("icon");
    });
  });

  test("project stats contain required fields", () => {
    projects.forEach((project) => {
      expect(project.stats).toHaveProperty("status");
      expect(project.stats).toHaveProperty("version");
      expect(project.stats).toHaveProperty("uptime");
      expect(project.stats).toHaveProperty("lastUpdate");
    });
  });

  test("project categories are valid", () => {
    expect(projectCategories).toContain("all");
    expect(projectCategories.length).toBeGreaterThan(1);
  });

  test("all project categories exist in projects", () => {
    const usedCategories = [...new Set(projects.map((p) => p.category))];
    const availableCategories = projectCategories.filter(
      (cat) => cat !== "all",
    );

    usedCategories.forEach((category) => {
      expect(availableCategories).toContain(category);
    });
  });
});
