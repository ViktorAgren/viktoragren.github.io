import { Code, Database, Layout, Server, GitBranch } from "lucide-react";

export const skillCategories = [
  {
    title: "LANGUAGES",
    icon: <Code className="w-4 h-4 text-green-500" />,
    description: "Programming Languages",
    skills: [
      {
        name: "PYTHON",
        detail:
          "Backend Development • Data Processing • Analysis • Visualization",
        projects: "TIMESERIES ANALYSIS, ATTRIBUTION, FUND RANKING",
        expertise: ["NumPy", "Pandas", "SciPy", "scikit-learn"],
        status: "LEARNING",
      },
      {
        name: "SQL",
        detail: "Database Management • Data Integration",
        projects: "ETL, DATA PIPELINE, DATABASE LIBRARY",
        expertise: ["MSSQL", "T-SQL", "pyodbc", "sqlalchemy"],
        status: "LEARNING",
      },
      {
        name: "JAVASCRIPT",
        detail: "Frontend • Node.js • Full Stack Development",
        projects: "JOURNAL APP, FPL DASHBOARD, PERSONAL WEBSITE",
        expertise: ["React", "Node.js"],
        status: "LEARNING",
      },
      {
        name: "C#",
        detail: "Systems Programming • Performance Optimization",
        projects: "FINANCIAL MODELING TOOLS",
        expertise: [".NET", "Entity Framework", "LINQ"],
        status: "LEARNING",
      },
      {
        name: "MATLAB",
        detail: "Mathematical Computing • Analysis",
        projects: "QUANTITATIVE RESEARCH",
        expertise: ["Financial Toolbox", "Statistics", "Optimization"],
        status: "LEARNING",
      },
    ],
  },
  {
    title: "FRONTEND",
    icon: <Layout className="w-4 h-4 text-green-500" />,
    description: "Frontend Development & UI",
    skills: [
      {
        name: "REACT.JS",
        detail: "Component Architecture • State Management • UI Development",
        projects: "PORTFOLIO, FPL DASHBOARD, MATHEMATICAL JOURNAL",
        expertise: ["Hooks", "Context API", "Component Design"],
        status: "LEARNING",
      },
      {
        name: "WEB TECHNOLOGIES",
        detail: "Modern Web Development Stack",
        projects: "ALL WEB PROJECTS",
        expertise: ["HTML5", "CSS3", "JavaScript ES6+"],
        status: "LEARNING",
      },
      {
        name: "UI FRAMEWORKS",
        detail: "CSS Frameworks & Component Libraries",
        projects: "PORTFOLIO, DASHBOARDS",
        expertise: ["Tailwind CSS", "Responsive Design"],
        status: "LEARNING",
      },
    ],
  },
  {
    title: "BACKEND",
    icon: <Server className="w-4 h-4 text-green-500" />,
    description: "Backend & Server Technologies",
    skills: [
      {
        name: "NODE.JS",
        detail: "Server-side JavaScript • API Development",
        projects: "FPL DASHBOARD API",
        expertise: ["Express.js", "REST APIs"],
        status: "LEARNING",
      },
      {
        name: "DATABASES",
        detail: "Database Design & Management",
        projects: "ETL PIPELINES, DATA STORAGE",
        expertise: ["MSSQL", "Database Design"],
        status: "LEARNING",
      },
    ],
  },
  {
    title: "DEVOPS",
    icon: <GitBranch className="w-4 h-4 text-green-500" />,
    description: "Development Operations & Tools",
    skills: [
      {
        name: "ORCHESTRATION",
        detail: "Data Pipeline & Workflow Management",
        projects: "ETL AUTOMATION",
        expertise: ["Prefect", "Task Scheduling"],
        status: "LEARNING",
      },
      {
        name: "CLOUD SERVICES",
        detail: "Cloud Infrastructure & Deployment",
        projects: "CONTAINERIZED APPLICATIONS",
        expertise: ["Docker", "GitHub Pages"],
        status: "LEARNING",
      },
      {
        name: "VERSION CONTROL",
        detail: "Code Management & Collaboration",
        projects: "ALL PROJECTS",
        expertise: ["Git", "GitHub", "Jira", "Bitbucket"],
        status: "LEARNING",
      },
      {
        name: "VISUALIZATION",
        detail: "Data Analysis & Reporting",
        projects: "FINANCIAL DASHBOARDS",
        expertise: ["Power BI", "Matplotlib", "Seaborn"],
        status: "LEARNING",
      },
      {
        name: "DEVELOPMENT TOOLS",
        detail: "Development Environment & Testing",
        projects: "DEVELOPMENT WORKFLOW",
        expertise: ["VS Code", "PyCharm", "MSSQL", "Windows Server", "VDI"],
        status: "LEARNING",
      },
    ],
  },
  {
    title: "DATA",
    icon: <Database className="w-4 h-4 text-green-500" />,
    description: "Data Processing & Analysis",
    skills: [
      {
        name: "DATA PROCESSING",
        detail: "ETL • Data Analysis • Visualization",
        projects: "FPL ANALYTICS, FINANCIAL MODELS",
        expertise: ["Pandas", "NumPy", "Matplotlib", "Jupyter"],
        status: "LEARNING",
      },
      {
        name: "MACHINE LEARNING",
        detail: "ML Libraries & Frameworks",
        projects: "PREDICTIVE MODELS",
        expertise: ["scikit-learn", "PyTorch", "TensorFlow"],
        status: "LEARNING",
      },
      {
        name: "FINANCIAL ANALYSIS",
        detail: "Quantitative Finance & Risk Management",
        projects: "OPTIONS PRICING, PORTFOLIO OPTIMIZATION",
        expertise: ["Simulation", "Portfolio", "Risk"],
        status: "LEARNING",
      },
    ],
  },
];
