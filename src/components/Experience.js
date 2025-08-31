import React from "react";
import {
  Terminal,
  Clock,
  Briefcase,
  Activity,
  Award,
  ChevronRight,
} from "lucide-react";

const experiences = [
  {
    title: "SWEDISH FUND SELECTION AGENCY",
    position: "QUANTITATIVE ANALYST",
    period: "AUG 2023 - PRESENT",
    status: "ACTIVE",
    department: "QUANTITATIVE ANALYSIS",
    location: "STOCKHOLM, SWE",
    metrics: {
      projectsCompleted: "5+",
      modelsDeployed: "3",
      teamSize: 3,
    },
    techStack: ["PYTHON", "SQL", "POWER BI"],
    responsibilities: [
      "DEVELOPED QUANTITATIVE MODELS FOR FUND SELECTION",
      "INTEGRATED DATA-DRIVEN INSIGHTS INTO DECISION PROCESS",
      "AUTOMATED ANALYSIS AND REPORTING SYSTEMS",
      "MUTUAL FUND TRADING ANALYSIS (4M+ TRADES)"
    ],
  },
];

export const Experience = () => {
  return (
    <section
      id="experience"
      className="min-h-screen bg-black text-green-500 font-mono py-20"
    >
      <div className="container mx-auto px-4">
        {/* Terminal Header */}
        <div className="border border-green-900 p-2 mb-4 flex items-center justify-between bg-black">
          <div className="flex items-center gap-2">
            <Terminal size={14} />
            <span className="text-xs">
              PROFESSIONAL_EXPERIENCE{" "}
              <span className="text-green-600">{`<F5>`}</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          {/* Left Panel - Career Overview */}
          <div className="col-span-3 space-y-4">
            <div className="border border-green-900 p-4 bg-black">
              <div className="flex items-center gap-2 mb-4">
                <Briefcase size={14} />
                <span className="text-xs text-green-600">CAREER SUMMARY</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span>TOTAL EXP</span>
                  <span className="text-white">2+ YRS</span>
                </div>
                <div className="flex justify-between">
                  <span>POSITIONS</span>
                  <span className="text-white">1</span>
                </div>
                <div className="flex justify-between">
                  <span>STATUS</span>
                  <span className="text-green-400">ACTIVE</span>
                </div>
              </div>
            </div>

          </div>

          {/* Main Experience Timeline */}
          <div className="col-span-9 space-y-4">
            {experiences.map((exp, index) => (
              <div key={index} className="border border-green-900 bg-black">
                {/* Header */}
                <div className="border-b border-green-900 p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <Activity size={14} className="text-green-500" />
                      <span className="text-xs text-white font-bold">
                        {exp.title}
                      </span>
                    </div>
                    <span className="text-xs text-green-400">{exp.status}</span>
                  </div>
                  <div className="grid grid-cols-3 text-xs gap-4">
                    <div>
                      <span className="text-green-600">POSITION: </span>
                      <span className="text-white">{exp.position}</span>
                    </div>
                    <div>
                      <span className="text-green-600">PERIOD: </span>
                      <span className="text-white">{exp.period}</span>
                    </div>
                    <div>
                      <span className="text-green-600">DEPT: </span>
                      <span className="text-white">{exp.department}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-4">
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {exp.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 text-xs bg-green-900/20 text-green-500"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Responsibilities */}
                  <div className="space-y-2">
                    <span className="text-xs text-green-600">
                      KEY RESPONSIBILITIES:
                    </span>
                    <div className="grid gap-2">
                      {exp.responsibilities.map((resp, idx) => (
                        <div
                          key={idx}
                          className="text-xs flex items-center gap-2"
                        >
                          <ChevronRight size={12} />
                          <span className="text-white">{resp}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-green-900/30">
                    {Object.entries(exp.metrics).map(([key, value], idx) => (
                      <div key={idx} className="text-xs">
                        <span className="text-green-600">
                          {key.toUpperCase()}:{" "}
                        </span>
                        <span className="text-white">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

          
          </div>
        </div>
      </div>
    </section>
  );
};
