import React, { useState } from "react";
import {
  Terminal,
  Clock,
  Database,
  Activity,
  CheckCircle2,
} from "lucide-react";
import { skillCategories } from "../data/skills";

const filterSkillsByCategory = (categories, activeCategory) => {
  return categories.find((cat) => cat.title === activeCategory);
};

const getStatusColor = (status) => {
  const statusColors = {
    ACTIVE: "bg-green-900/20 text-green-400",
    LEARNING: "bg-blue-900/20 text-blue-400",
    MAINTAINED: "bg-gray-900/20 text-gray-400",
  };
  return statusColors[status] || statusColors.MAINTAINED;
};

const SkillCard = ({ skill }) => (
  <div className="border border-green-900/50 p-4 hover:border-green-500 transition-colors">
    <div className="flex justify-between items-start mb-2">
      <div>
        <div className="flex items-center gap-2">
          <CheckCircle2 size={14} className="text-green-500" />
          <span className="text-white">{skill.name}</span>
        </div>
        <p className="text-xs text-gray-500 mt-1">{skill.detail}</p>
      </div>
      <span
        className={`text-xs px-2 py-1 rounded-full ${getStatusColor(skill.status)}`}
      >
        {skill.status}
      </span>
    </div>

    <div className="grid grid-cols-2 gap-4 mt-4">
      <div className="text-xs">
        <span className="text-gray-500">Projects: </span>
        <span className="text-white">{skill.projects}</span>
      </div>
      <div className="text-xs">
        <span className="text-gray-500">Technologies: </span>
        <span className="text-white">{skill.expertise.length}</span>
      </div>
    </div>

    <div className="mt-2 flex flex-wrap gap-2">
      {skill.expertise.map((tech, i) => (
        <span
          key={i}
          className="text-xs px-2 py-1 bg-green-900/10 text-green-400"
        >
          {tech}
        </span>
      ))}
    </div>
  </div>
);

const CategorySelector = ({ categories, activeCategory, onCategoryChange }) => (
  <div className="border border-green-900 p-4 bg-black">
    <div className="flex items-center gap-2 mb-4">
      <Database size={14} />
      <span className="text-xs text-green-600">SKILL CATEGORIES</span>
    </div>
    <div className="space-y-2">
      {categories.map((category) => (
        <button
          key={category.title}
          onClick={() => onCategoryChange(category.title)}
          className={`w-full text-left text-xs p-2 flex items-center gap-2 ${
            activeCategory === category.title
              ? "bg-green-900/20 text-green-400"
              : "hover:bg-green-900/10"
          }`}
        >
          {category.icon}
          <span>{category.title}</span>
        </button>
      ))}
    </div>
  </div>
);

export const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("LANGUAGES");

  const currentCategory = filterSkillsByCategory(
    skillCategories,
    activeCategory,
  );

  return (
    <section
      id="skills"
      className="min-h-screen bg-black text-green-500 font-mono py-20"
    >
      <div className="container mx-auto px-4">
        <div className="border border-green-900 p-2 mb-4 flex items-center justify-between bg-black">
          <div className="flex items-center gap-2">
            <Terminal size={14} />
            <span className="text-xs">
              SKILL_MATRIX <span className="text-green-600">{`<F3>`}</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Activity size={14} />
              <span className="text-xs">MATRIX ACTIVE</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={14} />
              <span className="text-xs">{new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-3 space-y-4">
            <CategorySelector
              categories={skillCategories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>

          <div className="col-span-9">
            <div className="border border-green-900 p-4 bg-black h-full">
              <div className="flex items-center gap-2 mb-4">
                {currentCategory?.icon}
                <span className="text-xs text-green-600">
                  {activeCategory} SKILLS
                </span>
              </div>

              <div className="space-y-4">
                {currentCategory?.skills.map((skill, idx) => (
                  <SkillCard key={skill.name} skill={skill} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
