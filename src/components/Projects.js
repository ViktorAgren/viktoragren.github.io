import React, { useState } from 'react';
import { 
  ExternalLink, 
  Github, 
  LineChart, 
  Code, 
  Database, 
  Terminal,
  Clock,
  Filter,
  ArrowUpRight,
  Box,
  Activity
} from 'lucide-react';

export const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const projects = [
    {
      title: "Black-Scholes Option Calculator",
      description: "Interactive visualization of the Black-Scholes option pricing model with Greeks calculation",
      category: "finance",
      stats: {
        status: "DEV",
        version: "0.1.0",
        uptime: "99.9%",
        lastUpdate: "2024-11"
      },
      tags: ["FIN MATH", "REACT", "JS"],
      links: {
        github: "https://github.com/yourusername/black-scholes-visualizer",
        live: "https://viktoragren.github.io/black-scholes-visualizer"
      },
      icon: <LineChart className="w-4 h-4 text-green-500" />
    },
    {
      title: "Fantasy Premier League Dashboard",
      description: "End-to-end data pipeline and analytics platform for FPL managers. Integrates live API data, custom statistical models, and interactive visualizations for optimized team selection and performance analysis.",
      category: "data-science",
      stats: {
        status: "DEV",
        version: "1.5.0",
        uptime: "98.5%",
        lastUpdate: "2024-03"
      },
      tags: ["REACT", "PYTHON", "FLASK", "API"],
      links: {
        github: "https://github.com/viktoragren/fpl-stats-dashboard",
        live: "https://viktoragren.github.io/"
      },
      icon: <Database className="w-4 h-4 text-green-500" />
    },
    {
      title: "Blog Style Scientific Journal",
      description: "Interactive publishing platform for quantitative research and mathematical analysis. Features LaTeX rendering, dynamic data visualizations, and customizable article templates. Built with React for seamless user experience and Python backend for data processing.",
      category: "mathematics",
      stats: {
        status: "DEV",
        version: "0.9.0",
        uptime: "97.8%",
        lastUpdate: "2024-04"
      },
      tags: ["TeX", "REACT", "RECHART", "PYTHON"],
      links: {
        github: "https://github.com/viktoragren/ridge-regression",
        live: "https://viktoragren.github.io/ridge-regression"
      },
      icon: <Code className="w-4 h-4 text-green-500" />
     }
  ];

  const filteredProjects = projects.filter(project => 
    activeFilter === 'all' || project.category === activeFilter
  );

  return (
    <section id="projects" className="min-h-screen bg-black text-green-500 font-mono py-20">
      <div className="container mx-auto px-4">
        {/* Terminal Header */}
        <div className="border border-green-900 p-2 mb-4 flex items-center justify-between bg-black">
          <div className="flex items-center gap-2">
            <Terminal size={14} />
            <span className="text-xs">PROJECT_PORTFOLIO <span className="text-green-600">{`<F4>`}</span></span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={14} />
            <span className="text-xs">{new Date().toLocaleTimeString()}</span>
          </div>
        </div>

        {/* Project Status Overview */}
        <div className="grid grid-cols-12 gap-4 mb-4">
          {/* Left Panel - Filters & Stats */}
          <div className="col-span-3 space-y-4">
            <div className="border border-green-900 p-4 bg-black">
              <div className="flex items-center gap-2 mb-4">
                <Filter size={14} />
                <span className="text-xs text-green-600">FILTER PROJECTS</span>
              </div>
              <div className="space-y-2">
                {['ALL', 'SOFTWARE', 'FINANCE', 'DATA-SCIENCE', 'MATHEMATICS'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter.toLowerCase())}
                    className={`w-full text-left text-xs p-2 ${
                      activeFilter === filter.toLowerCase()
                        ? 'bg-green-900/30 text-white'
                        : 'hover:bg-green-900/20'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="border border-green-900 p-4 bg-black">
              <div className="flex items-center gap-2 mb-4">
                <Activity size={14} />
                <span className="text-xs text-green-600">PROJECT METRICS</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span>TOTAL PROJECTS</span>
                  <span className="text-white">3</span>
                </div>
                <div className="flex justify-between">
                  <span>AVG UPTIME</span>
                  <span className="text-white">98.7%</span>
                </div>
                <div className="flex justify-between">
                  <span>ACTIVE DEVS</span>
                  <span className="text-white">1</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Project Grid */}
          <div className="col-span-9 space-y-4">
            {filteredProjects.map((project, index) => (
              <div
                key={index}
                className="border border-green-900 bg-black p-4"
              >
                <div className="grid grid-cols-12 gap-4">
                  {/* Project Info */}
                  <div className="col-span-8">
                    <div className="flex items-center gap-2 mb-2">
                      {project.icon}
                      <h3 className="text-xs font-bold text-white">{project.title}</h3>
                    </div>
                    <p className="text-xs mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 text-xs bg-green-900/20 text-green-500"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Project Stats */}
                  <div className="col-span-4 text-xs space-y-2">
                    <div className="flex justify-between">
                      <span>STATUS</span>
                      <span className={`text-${project.stats.status === 'LIVE' ? 'green' : 'yellow'}-500`}>
                        {project.stats.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>VERSION</span>
                      <span className="text-white">{project.stats.version}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>UPTIME</span>
                      <span className="text-white">{project.stats.uptime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>UPDATED</span>
                      <span className="text-white">{project.stats.lastUpdate}</span>
                    </div>
                  </div>
                </div>

                {/* Project Links */}
                <div className="mt-4 pt-4 border-t border-green-900/30 flex gap-4">
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs flex items-center gap-1 hover:text-white"
                  >
                    <Github size={12} />
                    <span>SOURCE {`<GET>`}</span>
                  </a>
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs flex items-center gap-1 hover:text-white"
                  >
                    <ArrowUpRight size={12} />
                    <span>DEMO {`<VIEW>`}</span>
                  </a>
                </div>
              </div>
            ))}

            {/* Command Line */}
            <div className="border border-green-900 p-4 bg-black">
              <div className="text-xs space-y-2">
                <p>{`>> Type "PROJECT <name>" for detailed analysis`}</p>
                <p>{`>> Type "COMPARE" to compare projects`}</p>
                <p>{`>> Type "DOCS" for documentation`}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};