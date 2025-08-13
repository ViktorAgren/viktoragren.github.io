import { LineChart, Database, Code } from "lucide-react";

export const projects = [
  {
    title: "Black-Scholes Option Calculator",
    description:
      "Interactive visualization of the Black-Scholes option pricing model with Greeks calculation",
    category: "finance",
    stats: {
      status: "DEV",
      version: "0.1.0",
      uptime: "99.9%",
      lastUpdate: "2024-12",
    },
    tags: ["FIN MATH", "REACT", "JS"],
    links: {
      github: "https://github.com/viktoragren/black-scholes-visualizer",
      live: "https://viktoragren.github.io/black-scholes-visualizer",
    },
    icon: <LineChart className="w-4 h-4 text-green-500" />,
    details: {
      challenge:
        "Visualizing complex financial mathematics in an intuitive interface",
      solution:
        "Real-time calculation engine with interactive parameter adjustment",
      impact: "Educational tool for options pricing theory",
      techHighlights: [
        "Custom mathematical visualization library",
        "Real-time Greeks calculation",
        "Responsive design patterns",
      ],
    },
  },
  {
    title: "Fantasy Premier League Dashboard",
    description:
      "End-to-end data pipeline and analytics platform for FPL managers. Integrates live API data, custom statistical models, and interactive visualizations.",
    category: "data-science",
    stats: {
      status: "DEV",
      version: "1.5.0",
      uptime: "98.5%",
      lastUpdate: "2024-03",
    },
    tags: ["REACT", "PYTHON", "FLASK", "API"],
    links: {
      github: "https://github.com/viktoragren/fpl-stats-dashboard",
      screenshot: "/images/fpl-dashboard.png",
    },
    icon: <Database className="w-4 h-4 text-green-500" />,
    details: {
      challenge: "Processing large-scale sports data for predictive analytics",
      solution: "Automated ETL pipeline with machine learning insights",
      impact: "Data-driven fantasy football decision making platform",
      techHighlights: [
        "Real-time API integration",
        "Predictive modeling",
        "Interactive data visualization",
        "Automated data pipelines",
      ],
    },
  },
  {
    title: "Mathematical Journal",
    description:
      "Web-based platform for publishing mathematical papers with interactive LaTeX rendering and visualizations.",
    category: "mathematics",
    stats: {
      status: "DEV",
      version: "0.9.0",
      uptime: "97.8%",
      lastUpdate: "2024-12",
    },
    tags: ["REACT", "MATHJAX", "PYTHON", "LATEX"],
    links: {
      github: "https://github.com/viktoragren/mathematical-journal",
      live: "https://viktoragren.github.io/mathematical-journal",
    },
    icon: <Code className="w-4 h-4 text-green-500" />,
    details: {
      challenge:
        "Creating a modern platform for mathematical research publishing",
      solution:
        "LaTeX compilation with interactive mathematical visualizations",
      impact: "Accessible academic publishing for mathematical research",
      techHighlights: [
        "LaTeX to web compilation",
        "Mathematical notation rendering",
        "Interactive theorem proofs",
        "Academic workflow optimization",
      ],
    },
  },
];

export const projectCategories = [
  "all",
  "software",
  "finance",
  "data-science",
  "mathematics",
];
