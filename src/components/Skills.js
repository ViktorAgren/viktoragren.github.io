import React, { useState, useEffect } from 'react';
import {
  Code,
  Database,
  Layout,
  Terminal,
  Clock,
  GitBranch,
  Server,
  Activity,
  CheckCircle2
} from 'lucide-react';

const skillCategories = [
  {
    title: "LANGUAGES",
    icon: <Code className="w-4 h-4 text-green-500" />,
    description: "Programming Languages",
    skills: [
      { 
        name: "PYTHON",
        detail: "Backend Development • Data Processing • Analysis • Visualization",
        projects: "TIMESERIES ANALYSIS, ATTRIBUTION, FUND RANKING",
        expertise: ["NumPy", "Pandas", "SciPy", "scikit-learn"],
        status: "LEARNING"
      },
      { 
        name: "SQL",
        detail: "Database Management • Data Integration ",
        projects: "ETL, DATA PIPELINE, DATABASE LIBRARY",
        expertise: ["MSSQL", "T-SQL", "pyodbc", "sqlalchemy"],
        status: "LEARNING"
      },
      { 
        name: "JAVASCRIPT",
        detail: "Frontend • Node.js • Full Stack Development",
        projects: "JOURNAL APP, FPL DASHBOARD, PERSONAL WEBSITE",
        expertise: ["React", "Node.js"],
        status: "LEARNING"
      },
      { 
        name: "C#",
        detail: "Systems Programming • Performance Optimization",
        projects: "X",
        expertise: ["X", "X", "X"],
        status: "MAINTAINED"
      },
      { 
        name: "Matlab",
        detail: "Mathematics • Analysis",
        projects: "X",
        expertise: ["X", "X", "X"],
        status: "MAINTAINED"
      }
    ]
  },
  {
    title: "FRONTEND",
    icon: <Layout className="w-4 h-4 text-green-500" />,
    description: "Frontend Development & UI",
    skills: [
      {
        name: "REACT.JS",
        detail: "Component Architecture • State Management • UI Development",
        projects: "X",
        expertise: ["Next.js", "Tailwind"],
        status: "LEARNING"
      },
      {
        name: "WEB TECHNOLOGIES",
        detail: "Modern Web Development Stack",
        projects: "X",
        expertise: ["HTML5", "CSS3"],
        status: "LEARNING"
      },
      {
        name: "UI FRAMEWORKS",
        detail: "CSS Frameworks & Component Libraries",
        projects: "X",
        expertise: ["Tailwind"],
        status: "LEARNING"
      }
    ]
  },
  {
    title: "BACKEND",
    icon: <Server className="w-4 h-4 text-green-500" />,
    description: "Backend & Server Technologies",
    skills: [
      {
        name: "NODE.JS",
        detail: "Server-side JavaScript • API Development",
        projects: "X",
        expertise: ["REST APIs"],
        status: "LEARNING"
      },
      {
        name: "DATABASES",
        detail: "Database Design & Management",
        projects: "X",
        expertise: ["MSSQL"],
        status: "LEARNING"
      }
    ]
  },
  {
    title: "DEVOPS",
    icon: <GitBranch className="w-4 h-4 text-green-500" />,
    description: "Development Operations & Tools",
    skills: [
      {
        name: "ORCHESTRATION",
        detail: "Data Pipeline & Workflow Management",
        projects: "ETL",
        expertise: ["Prefect"],
        status: "LEARNING"
      },
      {
        name: "CLOUD SERVICES",
        detail: "Cloud Infrastructure & Deployment",
        projects: "X",
        expertise: ["Docker"],
        status: "LEARNING"
      },
      {
        name: "VERSION CONTROL",
        detail: "Code Management & Collaboration",
        projects: "X",
        expertise: ["Git", "GitHub"],
        status: "LEARNING"
      },
      {
        name: "VISUALIZATION",
        detail: "Data Analysis & Reporting",
        projects: "Dashboard",
        expertise: ["Power BI"],
        status: "LEARNING"
      },
      {
        name: "DEVELOPMENT TOOLS",
        detail: "Development Environment & Testing",
        projects: "X",
        expertise: ["VS Code", "PyCharm"],
        status: "LEARNING"
      }
    ]
  },
  {
    title: "DATA",
    icon: <Database className="w-4 h-4 text-green-500" />,
    description: "Data Processing & Analysis",
    skills: [
      {
        name: "DATA PROCESSING",
        detail: "ETL • Data Analysis • Visualization",
        projects: "X",
        expertise: ["Pandas", "NumPy", "Matplotlib", "Jupyter"],
        status: "LEARNING"
      },
      {
        name: "MACHINE LEARNING",
        detail: "ML Libraries & Frameworks",
        projects: "X",
        expertise: ["TensorFlow", "scikit-learn", "PyTorch"],
        status: "LEARNING"
      },
      {
        name: "BIG DATA",
        detail: "Large Scale Data Processing",
        projects: "X",
        expertise: ["Data Pipelines"],
        status: "LEARNING"
      }
    ]
  }
];

export const Skills = () => {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [activeCategory, setActiveCategory] = useState('PROGRAMMING');
  const [commandLog, setCommandLog] = useState(['System initialized...', 'Loading skill matrix...']);

  useEffect(() => {
    // terminal initialization
    const timer = setInterval(() => {
      setCommandLog(prev => [...prev, `Scanning ${activeCategory.toLowerCase()} modules...`]);
    }, 3000);
    return () => clearInterval(timer);
  }, [activeCategory]);

  return (
    <section id="skills" className="min-h-screen bg-black text-green-500 font-mono py-20">
      <div className="container mx-auto px-4">
        {/* Terminal Header */}
        <div className="border border-green-900 p-2 mb-4 flex items-center justify-between bg-black">
          <div className="flex items-center gap-2">
            <Terminal size={14} />
            <span className="text-xs">SKILL_MATRIX <span className="text-green-600">{`<F3>`}</span></span>
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
          {/* Category Selection */}
          <div className="col-span-3 space-y-4">
            <div className="border border-green-900 p-4 bg-black">
              <div className="flex items-center gap-2 mb-4">
                <Database size={14} />
                <span className="text-xs text-green-600">SYSTEM INDEX</span>
              </div>
              <div className="space-y-2">
                {skillCategories.map(category => (
                  <button
                    key={category.title}
                    onClick={() => setActiveCategory(category.title)}
                    className={`w-full text-left text-xs p-2 flex items-center gap-2 ${
                      activeCategory === category.title 
                        ? 'bg-green-900/20 text-green-400' 
                        : 'hover:bg-green-900/10'
                    }`}
                  >
                    {category.icon}
                    <span>{category.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Command Log */}
            <div className="border border-green-900 p-4 bg-black">
              <div className="flex items-center gap-2 mb-4">
                <Terminal size={14} />
                <span className="text-xs text-green-600">SYSTEM LOG</span>
              </div>
              <div className="h-40 overflow-y-auto text-xs space-y-1">
                {commandLog.map((log, idx) => (
                  <div key={idx} className="flex items-start">
                    <span className="text-green-600 mr-2">&gt;</span>
                    <span>{log}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-9">
            <div className="border border-green-900 p-4 bg-black h-full">
              <div className="flex items-center gap-2 mb-4">
                {skillCategories.find(cat => cat.title === activeCategory)?.icon}
                <span className="text-xs text-green-600">{activeCategory} MATRIX</span>
              </div>

              <div className="space-y-4">
                {skillCategories
                  .find(cat => cat.title === activeCategory)
                  ?.skills.map((skill, idx) => (
                    <div 
                      key={skill.name}
                      className="border border-green-900/50 p-4 hover:border-green-500 transition-colors cursor-pointer"
                      onClick={() => setSelectedSkill(skill)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 size={14} className="text-green-500" />
                            <span className="text-white">{skill.name}</span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{skill.detail}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          skill.status === 'ACTIVE' 
                            ? 'bg-green-900/20 text-green-400'
                            : skill.status === 'LEARNING'
                            ? 'bg-blue-900/20 text-blue-400'
                            : 'bg-gray-900/20 text-gray-400'
                        }`}>
                          {skill.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="text-xs">
                          <span className="text-gray-500">Projects Completed: </span>
                          <span className="text-white">{skill.projects}</span>
                        </div>
                        <div className="text-xs">
                          <span className="text-gray-500">Core Competencies: </span>
                          <span className="text-white">{skill.expertise.length}</span>
                        </div>
                      </div>

                      <div className="mt-2 flex flex-wrap gap-2">
                        {skill.expertise.map((exp, i) => (
                          <span 
                            key={i}
                            className="text-xs px-2 py-1 bg-green-900/10 text-green-400"
                          >
                            {exp}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};