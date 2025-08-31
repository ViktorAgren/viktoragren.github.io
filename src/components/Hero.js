import React, { useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import { Terminal, Clock, Globe, Activity, Monitor, Cpu, Maximize } from "lucide-react";
import { useTerminalMode } from "../contexts/TerminalModeContext";

export const Hero = () => {
  const { enterTerminalMode } = useTerminalMode();
  const typedRef = useRef(null);
  const terminalInputRef = useRef(null);
  const terminalOutputRef = useRef(null);
  const [time, setTime] = useState(new Date());
  const [command, setCommand] = useState("");
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [terminalOutput, setTerminalOutput] = useState([
    { type: "info", text: "Welcome to DEV_TERMINAL v1.0.0" },
    { type: "info", text: 'Type "help" to see available commands' },
  ]);

  // Terminal commands system
  const commands = {
    help: () => ({
      type: "success",
      text: [
        "Available commands:",
        "  help        - Show this help message",
        "  about       - Display personal information",
        "  skills      - Show technical skills",
        "  projects    - List recent projects",
        "  contact     - Get contact information",
        "  cd <dir>    - Navigate to section (about, skills, projects, contact)",
        "  resume      - Open resume in new tab",
        "  clear       - Clear terminal",
        "  whoami      - Display current user info",
        "  ls          - List directory contents",
        "  date        - Show current date and time",
        "  uptime      - Show portfolio uptime",
        "  terminal    - Enter full-screen terminal mode",
        ""
      ],
    }),
    about: () => ({
      type: "info",
      text: [
        "VIKTOR ÅGREN - Quantitative Analyst & Software Developer",
        "Location: Stockholm, Sweden",
        "Education: MSc Financial Mathematics",
        "Experience: 2+ years in quantitative finance",
        "Specialization: Financial modeling, data analysis, software architecture",
      ],
    }),
    skills: () => ({
      type: "info",
      text: [
        "Technical Skills:",
        "  Languages: Python, JavaScript, SQL, C#, MATLAB",
        "  Frontend:  React, HTML5, CSS3, Tailwind CSS",
        "  Backend:   Node.js, Flask, REST APIs",
        "  Data:      NumPy, Pandas, scikit-learn, Power BI",
        "  Tools:     Git, Docker, VS Code, Jupyter",
      ],
    }),
    projects: () => ({
      type: "info",
      text: [
        "Recent Projects:",
        "  [1] Black-Scholes Option Calculator - Financial modeling tool",
        "  [2] FPL Analytics Dashboard - Data visualization platform",
        "  [3] Mathematical Journal - LaTeX publishing system"
      ],
    }),
    contact: () => ({
      type: "success",
      text: [
        "Contact Information:",
        "  Email: 99viktor.agren@gmail.com",
        "  Location: Stockholm, Sweden",
        "  Timezone: CET (UTC+1)",
        "  Status: Available for opportunities",
      ],
    }),
    whoami: () => ({
      type: "info",
      text: "Viktor",
    }),
    ls: () => ({
      type: "info",
      text: ["about  projects  skills  contact"],
    }),
    clear: () => {
      setTerminalOutput([]);
      return null;
    },
    cd: (args) => {
      if (args === "projects") {
        document
          .getElementById("projects")
          ?.scrollIntoView({ behavior: "smooth" });
        return { type: "success", text: "Navigating to projects section..." };
      } else if (args === "about") {
        document
          .getElementById("about")
          ?.scrollIntoView({ behavior: "smooth" });
        return { type: "success", text: "Navigating to about section..." };
      } else if (args === "skills") {
        document
          .getElementById("skills")
          ?.scrollIntoView({ behavior: "smooth" });
        return { type: "success", text: "Navigating to skills section..." };
      } else if (args === "contact") {
        document
          .getElementById("contact")
          ?.scrollIntoView({ behavior: "smooth" });
        return { type: "success", text: "Navigating to contact section..." };
      } else {
        return {
          type: "error",
          text: `Directory not found: ${args}. Available: about, skills, projects, contact`,
        };
      }
    },
    resume: () => {
      window.open("/resume.pdf", "_blank");
      return { type: "success", text: "Opening resume in new tab..." };
    },
    date: () => ({
      type: "info",
      text: new Date().toLocaleString(),
    }),
    uptime: () => ({
      type: "info",
      text: "Portfolio uptime: 99.9% | Last deployed: 2025-07",
    }),
    terminal: () => {
      enterTerminalMode();
      return { type: "success", text: "Entering full-screen terminal mode..." };
    },
  };

  const executeCommand = (cmd) => {
    const [command, ...args] = cmd.trim().toLowerCase().split(" ");
    const argString = args.join(" ");

    // Add command to output
    setTerminalOutput((prev) => [
      ...prev,
      { type: "command", text: `portfolio:~$ ${cmd}` },
    ]);

    // Add to history
    if (cmd.trim()) {
      setCommandHistory((prev) => [cmd, ...prev.slice(0, 49)]); // Keep last 50 commands
      setHistoryIndex(-1);
    }

    // Execute command
    if (commands[command]) {
      const result = commands[command](argString);
      if (result) {
        setTerminalOutput((prev) => [...prev, result]);
      }
    } else if (command) {
      setTerminalOutput((prev) => [
        ...prev,
        {
          type: "error",
          text: `Command not found: ${command}. Type 'help' for available commands.`,
        },
      ]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      executeCommand(command);
      setCommand("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCommand(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCommand(commandHistory[newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCommand("");
      }
    }
  };

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: [
        "Software Developer",
        "Quantitative Analyst",
        "Applied Mathematics Graduate",
        "Data Scientist",
        "Financial Modeler"
      ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      startDelay: 1000,
      loop: true,
    });

    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      typed.destroy();
      clearInterval(timer);
    };
  }, []);

  // Auto-scroll terminal to bottom when new output is added
  useEffect(() => {
    if (terminalOutputRef.current) {
      terminalOutputRef.current.scrollTop = terminalOutputRef.current.scrollHeight;
    }
  }, [terminalOutput]);

  // Ensure Hero is the landing page by forcing scroll to top on mount
  useEffect(() => {
    const forceScrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };
    
    forceScrollToTop();
    
    // Additional safety timeout
    const timeout = setTimeout(forceScrollToTop, 100);
    
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen bg-black text-green-500 font-mono relative top-0"
      style={{ scrollMarginTop: 0 }}
    >
      {/* Terminal Header */}
      <div className="border-b border-green-900 p-2 flex justify-between items-center bg-black">
        <div className="flex items-center gap-3">
          <Terminal size={16} />

        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Clock size={14} />
            <span>{time.toLocaleTimeString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe size={14} />
            <span>SWE</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-12 gap-1 p-1">
        {/* Left Column */}
        <div className="col-span-3 space-y-1">
          <div className="border border-green-900 p-3 bg-black">
            <h2 className="text-xs mb-2 text-green-600">PROFILE</h2>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span>NAME</span>
                <span className="text-white">VIKTOR ÅGREN</span>
              </div>
              <div className="flex justify-between">
                <span>LOCATION</span>
                <span className="text-white">STOCKHOLM, SWE</span>
              </div>
              <div className="flex justify-between">
                <span>SPECIALTY</span>
                <span className="text-white">QUANT</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Terminal Area */}
        <div className="col-span-9 space-y-1">
          <div className="border border-green-900 p-4 bg-black h-[calc(100vh-8rem)]">
            <div className="flex items-center gap-2 mb-6">
            </div>

            <div className="mb-8">
              <p className="text-xs text-green-600 mb-1"></p>
              <div className="text-2xl mb-4">
                I'm a <span ref={typedRef} className="text-white"></span>
              </div>
            </div>


            {/* Terminal Output */}
            <div ref={terminalOutputRef} className="mb-80 h-52 overflow-y-auto text-xs">
              {terminalOutput.map((output, index) => (
                <div key={index} className="mb-1">
                  {output.type === "command" && (
                    <div className="text-green-400">{output.text}</div>
                  )}
                  {output.type === "info" && (
                    <div className="text-white">
                      {Array.isArray(output.text)
                        ? output.text.map((line, i) => (
                            <div key={i}>{line}</div>
                          ))
                        : output.text}
                    </div>
                  )}
                  {output.type === "success" && (
                    <div className="text-green-500">
                      {Array.isArray(output.text)
                        ? output.text.map((line, i) => (
                            <div key={i}>{line}</div>
                          ))
                        : output.text}
                    </div>
                  )}
                  {output.type === "error" && (
                    <div className="text-red-500">{output.text}</div>
                  )}
                </div>
              ))}
            </div>

            {/* Terminal Input */}
            <div className="flex items-center gap-2 border-t border-green-900 pt-2">
              <span className="text-green-400 text-xs">
                portfolio:~$
              </span>
              <input
                ref={terminalInputRef}
                type="text"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-white text-xs outline-none"
                placeholder="Type 'help' for available commands..."
                autoFocus
              />
              <button
                onClick={enterTerminalMode}
                className="text-green-500 hover:text-white transition-colors"
                title="Enter Full Terminal Mode (Ctrl+T)"
              >
                <Maximize size={12} />
              </button>
              <span className="text-green-500 animate-pulse">_</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
