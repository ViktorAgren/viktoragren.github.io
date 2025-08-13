import React, { useEffect, useRef, useState } from "react";
import { Terminal, Clock, Activity, Power } from "lucide-react";

export const TerminalMode = ({ onExitTerminal }) => {
  const terminalInputRef = useRef(null);
  const terminalOutputRef = useRef(null);
  const [time, setTime] = useState(new Date());
  const [command, setCommand] = useState("");
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isBooting, setIsBooting] = useState(true);
  const [terminalOutput, setTerminalOutput] = useState([]);

  // Boot sequence
  useEffect(() => {
    const bootMessages = [
      { type: "system", text: "VIKTOR_TERMINAL v2.0.0 - FULL MODE", delay: 200 },
      { type: "system", text: "Initializing secure connection...", delay: 400 },
      { type: "success", text: "✓ System authentication successful", delay: 600 },
      { type: "success", text: "✓ Loading user profile...", delay: 800 },
      { type: "success", text: "✓ Terminal interface ready", delay: 1000 },
      { type: "info", text: "", delay: 1200 },
      { type: "info", text: "Welcome to VIKTOR_TERMINAL Full Mode", delay: 1400 },
      { type: "info", text: 'Type "help" for commands or "exit" to return to GUI mode', delay: 1600 }
    ];

    let timeoutIds = [];
    
    bootMessages.forEach((msg, index) => {
      const timeoutId = setTimeout(() => {
        setTerminalOutput(prev => [...prev, msg]);
        if (index === bootMessages.length - 1) {
          setIsBooting(false);
        }
      }, msg.delay);
      timeoutIds.push(timeoutId);
    });

    return () => {
      timeoutIds.forEach(id => clearTimeout(id));
    };
  }, []);

  // Terminal commands system
  const commands = {
    help: () => ({
      type: "success",
      text: [
        "Available commands:",
        "  help        - Show this help message",
        "  view <section> - View section content (about, skills, projects, contact)",
        "  resume      - Open resume in new tab",
        "  clear       - Clear terminal",
        "  whoami      - Display current user info",
        "  ls          - List directory contents",
        "  date        - Show current date and time",
        "  uptime      - Show portfolio uptime",
        "  mode        - Show current interface mode",
        "  exit        - Return to GUI mode",
        "",
        "Fun commands:",
        "  matrix      - Display Matrix digital rain",
        "  hack        - Run hacking simulation",
        "  joke        - Random programming joke",
        "  cowsay <msg> - ASCII cow with message",
        "  weather     - Check weather status",
        "  coffee      - Brew virtual coffee",
        "  tree        - Show directory tree",
        "  ping <host> - Ping a domain",
        "  sudo <cmd>  - Try to run as admin",
        "  ps          - Show running processes",
        "",
        "Use arrow keys (↑↓) to navigate command history",
        "Press Ctrl+T from GUI mode to enter terminal mode",
      ],
    }),
    whoami: () => ({
      type: "info",
      text: "viktor@portfolio:~$ Quantitative Analyst & Developer",
    }),
    ls: () => ({
      type: "info",
      text: ["about.md  projects/  skills.json  contact.txt  resume.pdf  gui_mode.exe"],
    }),
    clear: () => {
      setTerminalOutput([]);
      return null;
    },
    exit: () => {
      onExitTerminal();
      return { type: "success", text: "Exiting terminal mode... Loading GUI..." };
    },
    gui: () => {
      onExitTerminal();
      return { type: "success", text: "Switching to GUI mode..." };
    },
    mode: () => ({
      type: "info",
      text: "Current mode: TERMINAL_FULL_MODE",
    }),
    view: (args) => {
      if (!args) {
        return {
          type: "error",
          text: "Usage: view <section>. Available: about, skills, projects, contact",
        };
      }
      
      const section = args.toLowerCase();
      switch (section) {
        case "about":
          return {
            type: "info",
            text: [
              "=== ABOUT SECTION ===",
              "",
              "Viktor Ågren is a quantitative analyst and software developer based in Stockholm.",
              "With an MSc in Financial Mathematics, he specializes in:",
              "• Financial modeling and quantitative analysis",
              "• Data-driven software solutions", 
              "• Mathematical algorithm implementation",
              "• Risk assessment and portfolio optimization",
              "",
              "Currently working on innovative fintech solutions and data analytics platforms.",
            ],
          };
        case "skills":
          return {
            type: "info", 
            text: [
              "=== TECHNICAL SKILLS ===",
              "",
              "Programming Languages:",
              "  Python",
              "  SQL",
              "  C#",
              "  MATLAB",
              "",
              "Frameworks & Libraries:",
              "  React, Node.js, Flask, NumPy, Pandas, scikit-learn",
              "",
              "Tools & Technologies:",
              "  Git, Docker, VS Code, Jupyter, Power BI, AWS",
            ],
          };
        case "projects":
          return {
            type: "info",
            text: [
              "=== PROJECT DETAILS ===",
              "",
              "[1] Black-Scholes Option Calculator",
              "    • Real-time options pricing using Black-Scholes model",
              "    • Interactive web interface with Python backend",
              "    • Monte Carlo simulations for risk analysis",
              "    • Technologies: Python, Flask, JavaScript, Chart.js",
              "",
              "[2] FPL Analytics Dashboard",
              "    • Fantasy Premier League data visualization platform",
              "    • Player performance analytics and predictions",
              "    • Real-time data scraping and processing",
              "    • Technologies: Python, React, PostgreSQL, D3.js",
              "",
              "[3] Mathematical Journal System",
              "    • LaTeX-based academic publishing platform",
              "    • Collaborative editing with version control",
              "    • Automated typesetting and formatting",
              "    • Technologies: LaTeX, Node.js, Git, MongoDB",
            ],
          };
        case "contact":
          return {
            type: "success",
            text: [
              "=== CONTACT INFORMATION ===",
              "",
              "Email:     99viktor.agren@gmail.com",
              "Location:  Stockholm, Sweden",
              "Timezone:  CET (UTC+1)",
              "LinkedIn:  linkedin.com/in/viktoragren/",
              "GitHub:    github.com/viktoragren",
              "",
              "Status:    ● Online - Available for opportunities",
              "Response:  Within 24 hours",
            ],
          };
        default:
          return {
            type: "error",
            text: `Section '${section}' not found. Available: about, skills, projects, contact`,
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
      text: "Portfolio uptime: 99.9% | Last deployed: 2024-12 | Mode: TERMINAL_FULL",
    }),
    reboot: () => {
      setIsBooting(true);
      setTerminalOutput([]);
      // Re-trigger boot sequence
      setTimeout(() => {
        const bootMessages = [
          { type: "system", text: "Rebooting VIKTOR_TERMINAL...", delay: 0 },
          { type: "success", text: "✓ System restart complete", delay: 500 },
          { type: "info", text: 'Type "help" for commands', delay: 800 }
        ];
        
        bootMessages.forEach((msg, index) => {
          setTimeout(() => {
            setTerminalOutput(prev => [...prev, msg]);
            if (index === bootMessages.length - 1) {
              setIsBooting(false);
            }
          }, msg.delay);
        });
      }, 100);
      
      return null;
    },
    // Fun commands
    matrix: () => ({
      type: "special",
      text: [
        "01001101 01100001 01110100 01110010 01101001 01111000",
        "11010001 10110100 11001010 10101101 11110000 10011001",
        "10101010 11110101 01010101 11001100 00110011 11001010",
        "01110100 01101000 01100101 01101111 01101110 01100101",
        "11100001 10010110 11010101 01001011 11001101 10101001",
        "",
        "Wake up, Viktor... The Matrix has you...",
        "Follow the white rabbit. 🐰",
        "",
        "The answer is 42."
      ],
    }),
    hack: () => {
      const steps = [
        "Initializing hacking sequence...",
        "Scanning network for vulnerabilities...",
        "Found 127.0.0.1 - localhost",
        "Attempting to breach firewall...",
        "Firewall bypassed successfully ✓",
        "Accessing mainframe...",
        "██████████████ 50%",
      ];
      
      return {
        type: "success",
        text: steps
      };
    },
    joke: () => {
      const jokes = [
        "Why do programmers prefer dark mode? Because light attracts bugs! ",
        "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
        "Why did the programmer quit his job? He didn't get arrays! ",
        "What's a programmer's favorite hangout place? Foo Bar! ",
        "Why do Java developers wear glasses? Because they can't C#! ",
        "How do you comfort a JavaScript bug? You console it! ",
        "Why did the developer go broke? Because he used up all his cache! ",
        "What do you call a programmer from Finland? Nerdic! 🇫",
        "Why don't programmers like nature? It has too many bugs! ",
        "What's the object-oriented way to become wealthy? Inheritance! "
      ];
      
      const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
      return {
        type: "success",
        text: randomJoke
      };
    },
    cowsay: (message) => {
      const msg = message || "Hello from Viktor's terminal!";
      const msgLength = msg.length;
      const topLine = " " + "_".repeat(msgLength + 2);
      const msgLine = `< ${msg} >`;
      const bottomLine = " " + "-".repeat(msgLength + 2);
      
      return {
        type: "info",
        text: [
          topLine,
          msgLine,
          bottomLine,
          "        \\   ^__^",
          "         \\  (oo)\\_______",
          "            (__)\\       )\\/\\",
          "                ||----w |",
          "                ||     ||"
        ]
      };
    },
    weather: () => ({
      type: "info",
      text: [
        "Stockholm Weather Report ☁️",
        "═══════════════════════════",
        "Temperature: 5°C (41°F)",
        "Condition: Cloudy with chance of code ☁️💻",
        "Humidity: 80%",
        "Wind: 15 km/h",
        "Visibility: Excellent (for debugging)",
        "",
        "Perfect weather for coding indoors! ☕"
      ]
    }),
    coffee: () => ({
      type: "success", 
      text: [
        "Brewing virtual coffee... ☕",
        "",
        "    )  (     ",
        "   (   ) )    ",
        "    ) ( (     ",
        "  _______)_   ",
        " (---------) ",
        "",
        "Your coffee is ready!"
      ]
    }),
    tree: () => ({
      type: "info",
      text: [
        "viktor-portfolio/",
        "├── src/",
        "│   ├── components/",
        "│   │   ├── Hero.js",
        "│   │   ├── About.js",
        "│   │   ├── Skills.js",
        "│   │   ├── Projects.js",
        "│   │   ├── Contact.js",
        "│   │   └── TerminalMode.js ",
        "│   ├── contexts/",
        "│   │   └── TerminalModeContext.js",
        "│   └── data/",
        "├── public/",
        "│   └── resume.pdf",
        "└── package.json",
        ""
      ]
    }),
    ping: (domain) => {
      const target = domain || "viktor-portfolio.com";
      const responseTime = Math.floor(Math.random() * 50) + 10;
      
      return {
        type: "info",
        text: [
          `PING ${target} (127.0.0.1): 56 data bytes`,
          `64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=${responseTime}.${Math.floor(Math.random() * 999)} ms`,
          `64 bytes from 127.0.0.1: icmp_seq=2 ttl=64 time=${responseTime + 1}.${Math.floor(Math.random() * 999)} ms`,
          `64 bytes from 127.0.0.1: icmp_seq=3 ttl=64 time=${responseTime - 2}.${Math.floor(Math.random() * 999)} ms`,
          "",
          `--- ${target} ping statistics ---`,
          "3 packets transmitted, 3 received, 0% packet loss",
          `round-trip min/avg/max/stddev = ${responseTime-2}.123/${responseTime}.456/${responseTime+1}.789/1.234 ms`
        ]
      };
    },
    sudo: (command) => {
      const cmd = command || "make-coffee";
      return {
        type: "error",
        text: [
          `sudo: ${cmd}: command not found`
        ]
      };
    },
    ps: () => ({
      type: "info", 
      text: [
        "  PID TTY      STAT   TIME COMMAND",
        " 1337 pts/0    R+   00:42 /usr/bin/vim skills.improvement",
        " 2024 pts/0    S    02:15 /bin/coffee --continuous",
        " 3141 pts/0    R    01:30 python3 machine_learning.py",
        " 4242 pts/0    S+   00:05 git commit -m 'another amazing feature'",
        " 9001 pts/0    R+   99:99 /usr/local/bin/terminal-mode",
        ""
      ]
    }),
    fortune: () => {
      const fortunes = [
        '"Code is like humor. When you have to explain it, it\'s bad." - Cory House',
        '"The best error message is the one that never shows up." - Thomas Fuchs',
        '"Experience is the name everyone gives to their mistakes." - Oscar Wilde',
        '"In order to understand recursion, one must first understand recursion."',
        '"There are only two hard things in Computer Science: cache invalidation and naming things." - Phil Karlton',
        '"First, solve the problem. Then, write the code." - John Johnson',
        '"Programs must be written for people to read, and only incidentally for machines to execute." - Harold Abelson',
        '"The most important property of a program is whether it accomplishes the intention of its user." - C.A.R. Hoare'
      ];
      
      const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
      return {
        type: "info",
        text: [
          "🔮 Fortune says:",
          "",
          randomFortune,
          "",
          "Your code will compile today! "
        ]
      };
    },
  };

  const executeCommand = (cmd) => {
    const [command, ...args] = cmd.trim().toLowerCase().split(" ");
    const argString = args.join(" ");

    // Add command to output
    setTerminalOutput((prev) => [
      ...prev,
      { type: "command", text: `viktor@portfolio:~$ ${cmd}` },
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
    if (isBooting) return;
    
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
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // Auto-scroll terminal to bottom when new output is added
  useEffect(() => {
    if (terminalOutputRef.current) {
      terminalOutputRef.current.scrollTop = terminalOutputRef.current.scrollHeight;
    }
  }, [terminalOutput]);

  // Auto-focus input when not booting
  useEffect(() => {
    if (!isBooting && terminalInputRef.current) {
      terminalInputRef.current.focus();
    }
  }, [isBooting]);

  return (
    <div className="fixed inset-0 bg-black text-green-500 font-mono flex flex-col">
      {/* Terminal Header */}
      <div className="border-b border-green-900 p-2 flex justify-between items-center bg-black">
        <div className="flex items-center gap-3">
          <Terminal size={16} />
          <span>VIKTOR_TERMINAL_FULL v2.0</span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Activity size={14} />
            <span>FULL MODE</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={14} />
            <span>{time.toLocaleTimeString()}</span>
          </div>
          <button
            onClick={onExitTerminal}
            className="flex items-center gap-2 hover:text-white transition-colors"
            title="Exit Terminal Mode"
          >
            <Power size={14} />
            <span className="hidden sm:inline">EXIT</span>
          </button>
        </div>
      </div>

      {/* Terminal Content */}
      <div className="flex-1 p-4 overflow-hidden flex flex-col">
        {/* Terminal Output */}
        <div 
          ref={terminalOutputRef} 
          className="flex-1 overflow-y-auto text-sm mb-4 space-y-1"
        >
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
              {output.type === "system" && (
                <div className="text-yellow-500">{output.text}</div>
              )}
              {output.type === "special" && (
                <div className="text-cyan-500">
                  {Array.isArray(output.text)
                    ? output.text.map((line, i) => (
                        <div key={i}>{line}</div>
                      ))
                    : output.text}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Terminal Input */}
        {!isBooting && (
          <div className="flex items-center gap-2 border-t border-green-900 pt-2">
            <span className="text-green-400 text-sm">
              viktor@portfolio:~$
            </span>
            <input
              ref={terminalInputRef}
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-white text-sm outline-none"
              placeholder="Type 'help' for available commands..."
              autoFocus
            />
            <span className="text-green-500 animate-pulse">_</span>
          </div>
        )}
      </div>
    </div>
  );
};