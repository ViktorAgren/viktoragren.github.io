import React, { useEffect, useRef, useState } from "react";
import { Mail, Globe, Terminal, Wifi, Clock, User, Copy, CheckCircle, Activity, Shield, Zap } from "lucide-react";

const MatrixRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Matrix characters
    const chars = "0123456789ABCDEF".split("");
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(0);

    // Animation settings
    let fadeStrength = 0.05;

    const draw = () => {
      // Create fade effect
      ctx.fillStyle = `rgba(0, 0, 0, ${fadeStrength})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set text properties
      ctx.fillStyle = "#0f0";
      ctx.font = `${fontSize}px monospace`;

      // Draw characters
      drops.forEach((y, i) => {
        // Generate random character
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;

        ctx.fillStyle = `rgba(0, 255, 0, ${Math.random()})`;
        ctx.fillText(char, x, y);

        // Reset drop or move it down
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        } else {
          drops[i] += fontSize;
        }
      });
    };

    // Animation loop
    const interval = setInterval(draw, 50);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", setCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full"
      style={{ opacity: 0.2 }}
    />
  );
};

export const Contact = () => {
  const [command, setCommand] = useState("");
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isConnected, setIsConnected] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [copiedItem, setCopiedItem] = useState("");
  const [networkLatency, setNetworkLatency] = useState(42);
  const [isTyping, setIsTyping] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState([
    { type: "info", text: "Initializing secure connection..." },
    { type: "success", text: "✓ SSH connection established" },
    { type: "info", text: "Welcome to CONTACT_PORTAL v2.0.0" },
    { type: "info", text: 'Type "help" for available commands' },
  ]);
  const outputRef = useRef(null);
  const inputRef = useRef(null);

  // Update time and network status
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setNetworkLatency(35 + Math.floor(Math.random() * 20));
    }, 1000);
    
    setTimeout(() => setIsConnected(true), 2000);
    
    return () => clearInterval(timer);
  }, []);

  // Auto-scroll terminal
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [terminalOutput]);

  const copyToClipboard = async (text, item) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(item);
      setTimeout(() => setCopiedItem(""), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const simulateTyping = (callback, delay = 1000) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      callback();
    }, delay);
  };

  const addToOutput = (newOutput) => {
    setTerminalOutput(prev => [...prev, newOutput]);
  };

  const commands = {
    help: () => ({
      type: "info",
      text: [
        "VIKTOR_CONTACT_PORTAL - Available Commands:",
        "",
        "  help              - Show this help message",
        "  whoami            - Display contact information", 
        "  ping              - Test connection to Viktor",
        "  social            - Show social media links",
        "  location          - Display current location",
        "  availability      - Check current availability",
        "  download          - Download contact vCard",
        "  ssh viktor        - Initiate contact session",
        "  scan              - Network diagnostic scan",
        "  clear             - Clear terminal",
        "",
        "Use arrow keys (↑↓) to navigate command history",
      ],
    }),
    
    whoami: () => ({
      type: "profile",
      text: {
        name: "VIKTOR ÅGREN",
        role: "Quantitative Analyst & Software Developer",
        email: "99viktor.agren@gmail.com",
        location: "Stockholm, Sweden",
        timezone: "CET (UTC+1)",
        status: "Available for opportunities"
      }
    }),

    ping: () => {
      const responses = [
        "PING 64.233.160.0: 56 data bytes",
        `64 bytes from viktor.dev: icmp_seq=1 ttl=64 time=${networkLatency}ms`,
        `64 bytes from viktor.dev: icmp_seq=2 ttl=64 time=${networkLatency + 2}ms`,
        `64 bytes from viktor.dev: icmp_seq=3 ttl=64 time=${networkLatency - 1}ms`,
        "",
        "--- viktor.dev ping statistics ---",
        `3 packets transmitted, 3 received, 0% packet loss`,
        `round-trip min/avg/max/stddev = ${networkLatency-1}/${networkLatency+1}/${networkLatency+2}/1.2 ms`
      ];
      return { type: "ping", text: responses };
    },

    social: () => ({
      type: "social",
      text: {
        github: "https://github.com/viktoragren",
        linkedin: "https://linkedin.com/in/viktor-agren",
        email: "99viktor.agren@gmail.com"
      }
    }),

    location: () => ({
      type: "location", 
      text: {
        city: "Stockholm",
        country: "Sweden",
        timezone: "CET (UTC+1)",
        coordinates: "59.3293° N, 18.0686° E",
        weather: "Partly cloudy, 8°C"
      }
    }),

    availability: () => ({
      type: "availability",
      text: {
        status: "ONLINE",
        timezone: "CET (UTC+1)",
        localTime: currentTime.toLocaleString(),
        workingHours: "09:00 - 17:00 CET",
        responseTime: "< 24 hours"
      }
    }),

    download: () => {
      // Simulate vCard download
      const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:Viktor Ågren
ORG:Quantitative Analyst & Software Developer
EMAIL:99viktor.agren@gmail.com
URL:https://viktoragren.github.io
ADR:;;Stockholm;;;Sweden
END:VCARD`;
      
      const blob = new Blob([vCardData], { type: 'text/vcard' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'viktor_agren.vcf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      return {
        type: "success",
        text: "✓ Contact vCard downloaded successfully"
      };
    },

    ssh: (args) => {
      if (args === "viktor") {
        return {
          type: "ssh",
          text: [
            "Establishing SSH connection to viktor@contact.dev...",
            "Host key fingerprint is SHA256:aB3dE5gH7jK9mN2pQ4rS6tU8vW0xY2z",
            "✓ Connection established",
            "",
            "Secure contact channel!",
            "This is a direct line for:",
            "- Job opportunities",
            "- Project collaborations", 
            "- Technical discussions",
            "- General networking",
            "",
            "Please send your message to: 99viktor.agren@gmail.com"
          ]
        };
      }
      return { type: "error", text: "Usage: ssh viktor" };
    },

    scan: () => ({
      type: "scan",
      text: [
        "Running network diagnostic scan...",
        "",
        "Host: viktor.dev",
        "Status: ✓ ONLINE",
        `Latency: ${networkLatency}ms`, 
        "Security: ✓ TLS 1.3",
        "Availability: ✓ 99.9%",
        "",
        "Open channels:",
        "  Email:    ✓ SECURE",
        "  LinkedIn: ✓ ACTIVE", 
        "  GitHub:   ✓ ACTIVE",
        "",
        "Ready for communication."
      ]
    }),

    clear: () => {
      setTerminalOutput([]);
      return null;
    }
  };

  const executeCommand = (cmd) => {
    const [command, ...args] = cmd.trim().toLowerCase().split(" ");
    const argString = args.join(" ");

    // Add command to output
    addToOutput({ type: "command", text: `contact:~$ ${cmd}` });

    // Add to history
    if (cmd.trim()) {
      setCommandHistory(prev => [cmd, ...prev.slice(0, 49)]);
      setHistoryIndex(-1);
    }

    // Execute command with typing simulation
    if (commands[command]) {
      simulateTyping(() => {
        const result = commands[command](argString);
        if (result) {
          addToOutput(result);
        }
      }, Math.random() * 800 + 200);
    } else if (command) {
      addToOutput({
        type: "error",
        text: `Command not found: ${command}. Type 'help' for available commands.`
      });
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

  const renderOutput = (item, index) => {
    switch (item.type) {
      case "command":
        return <div key={index} className="text-green-400">{item.text}</div>;
      
      case "error":
        return <div key={index} className="text-red-500">{item.text}</div>;
      
      case "success":
        return <div key={index} className="text-green-500">{item.text}</div>;

      case "profile":
        return (
          <div key={index} className="border border-green-900 p-4 my-2 bg-gray-900/50">
            <div className="text-green-400 mb-2 flex items-center gap-2">
              <User size={14} />
              Contact Profile
            </div>
            <div className="space-y-2 text-sm">
              <div><span className="text-green-600">Name:</span> <span className="text-white">{item.text.name}</span></div>
              <div><span className="text-green-600">Role:</span> <span className="text-white">{item.text.role}</span></div>
              <div className="flex items-center gap-2">
                <span className="text-green-600">Email:</span> 
                <span className="text-white">{item.text.email}</span>
                <button 
                  onClick={() => copyToClipboard(item.text.email, "email")}
                  className="text-green-500 hover:text-white transition-colors"
                >
                  {copiedItem === "email" ? <CheckCircle size={12} /> : <Copy size={12} />}
                </button>
              </div>
              <div><span className="text-green-600">Location:</span> <span className="text-white">{item.text.location}</span></div>
              <div><span className="text-green-600">Timezone:</span> <span className="text-white">{item.text.timezone}</span></div>
              <div><span className="text-green-600">Status:</span> <span className="text-green-400">{item.text.status}</span></div>
            </div>
          </div>
        );

      case "social":
        return (
          <div key={index} className="border border-green-900 p-4 my-2 bg-gray-900/50">
            <div className="text-green-400 mb-3 flex items-center gap-2">
              <Wifi size={14} />
              Social Networks
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span className="text-white">GitHub</span>
                </div>
                <a href={item.text.github} target="_blank" rel="noopener noreferrer" 
                   className="text-green-500 hover:text-white transition-colors">
                  viktoragren →
                </a>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span className="text-white">LinkedIn</span>
                </div>
                <a href={item.text.linkedin} target="_blank" rel="noopener noreferrer"
                   className="text-green-500 hover:text-white transition-colors">
                  viktor-agren →
                </a>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail size={16} />
                  <span className="text-white">Email</span>
                </div>
                <a href={`mailto:${item.text.email}`}
                   className="text-green-500 hover:text-white transition-colors">
                  Send Message →
                </a>
              </div>
            </div>
          </div>
        );

      case "availability":
        return (
          <div key={index} className="border border-green-900 p-4 my-2 bg-gray-900/50">
            <div className="text-green-400 mb-3 flex items-center gap-2">
              <Activity size={14} />
              Availability Status
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 font-bold">{item.text.status}</span>
              </div>
              <div><span className="text-green-600">Local Time:</span> <span className="text-white">{item.text.localTime}</span></div>
              <div><span className="text-green-600">Working Hours:</span> <span className="text-white">{item.text.workingHours}</span></div>
              <div><span className="text-green-600">Response Time:</span> <span className="text-white">{item.text.responseTime}</span></div>
            </div>
          </div>
        );

      case "location":
        return (
          <div key={index} className="border border-green-900 p-4 my-2 bg-gray-900/50">
            <div className="text-green-400 mb-3 flex items-center gap-2">
              <Globe size={14} />
              Geographic Location
            </div>
            <div className="space-y-2 text-sm">
              <div><span className="text-green-600">City:</span> <span className="text-white">{item.text.city}</span></div>
              <div><span className="text-green-600">Country:</span> <span className="text-white">{item.text.country}</span></div>
              <div><span className="text-green-600">Timezone:</span> <span className="text-white">{item.text.timezone}</span></div>
              <div><span className="text-green-600">Coordinates:</span> <span className="text-white">{item.text.coordinates}</span></div>
              <div><span className="text-green-600">Weather:</span> <span className="text-white">{item.text.weather}</span></div>
            </div>
          </div>
        );

      case "ping":
        return (
          <div key={index} className="font-mono text-xs">
            {item.text.map((line, i) => (
              <div key={i} className={line.includes("statistics") ? "text-green-400" : "text-white"}>
                {line}
              </div>
            ))}
          </div>
        );

      case "scan":
        return (
          <div key={index} className="border border-green-900 p-4 my-2 bg-gray-900/50">
            <div className="text-green-400 mb-2 flex items-center gap-2">
              <Shield size={14} />
              Network Diagnostic Results
            </div>
            <div className="font-mono text-xs space-y-1">
              {item.text.map((line, i) => (
                <div key={i} className={
                  line.includes("✓") ? "text-green-400" : 
                  line.includes("ONLINE") ? "text-green-500" :
                  line.includes("SECURE") || line.includes("ACTIVE") ? "text-green-400" :
                  "text-white"
                }>
                  {line}
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div key={index} className="text-white">
            {Array.isArray(item.text)
              ? item.text.map((line, i) => <div key={i}>{line}</div>)
              : item.text}
          </div>
        );
    }
  };

  return (
    <section id="contact" className="relative min-h-screen bg-black text-green-500 font-mono py-20 overflow-hidden">
      <MatrixRain />

      <div className="container relative mx-auto px-4">
        {/* Status Bar */}
        <div className="max-w-4xl mx-auto mb-4">
          <div className="flex flex-col sm:flex-row justify-between items-center text-xs border border-green-900 p-2 bg-black/90 gap-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
                <span>{isConnected ? 'CONNECTED' : 'CONNECTING...'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap size={12} />
                <span>{networkLatency}ms</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Terminal */}
        <div className="max-w-4xl mx-auto backdrop-blur-sm">
          {/* Terminal Header */}
          <div className="border border-green-900 p-2 flex flex-col sm:flex-row items-center justify-between bg-black/90 gap-2">
            <div className="flex items-center gap-2">
              <Terminal size={14} />
              <span className="text-xs">
                 CONTACT_PORTAL <span className="text-green-600">{`<F6>`}</span>
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs">
            </div>
          </div>

          {/* Terminal Content */}
          <div className="border-l border-r border-b border-green-900 bg-black/90">
            {/* Terminal Output */}
            <div ref={outputRef} className="h-[50vh] sm:h-[60vh] overflow-y-auto p-2 sm:p-4 space-y-1">
              {terminalOutput.map((item, index) => renderOutput(item, index))}
              
              {isTyping && (
                <div className="flex items-center gap-2 text-green-400">
                  <span>viktor is typing</span>
                  <div className="flex gap-1">
                    <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
                    <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                  </div>
                </div>
              )}
            </div>

            {/* Terminal Input */}
            <div className="border-t border-green-900 p-2 sm:p-4">
              <div className="flex items-center gap-2">
                <span className="text-green-400 text-xs sm:text-sm whitespace-nowrap">contact:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent text-white text-xs sm:text-sm outline-none"
                  placeholder="Type 'help' for available commands..."
                  autoFocus
                />
                <span className="text-green-500 animate-pulse">_</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="max-w-4xl mx-auto mt-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <button 
              onClick={() => executeCommand("whoami")}
              className="border border-green-900 p-2 bg-black/90 hover:border-green-500 transition-colors text-center"
            >
              whoami
            </button>
            <button 
              onClick={() => executeCommand("social")}
              className="border border-green-900 p-2 bg-black/90 hover:border-green-500 transition-colors text-center"
            >
              social
            </button>
            <button 
              onClick={() => executeCommand("availability")}
              className="border border-green-900 p-2 bg-black/90 hover:border-green-500 transition-colors text-center"
            >
              availability
            </button>
            <button 
              onClick={() => executeCommand("ping")}
              className="border border-green-900 p-2 bg-black/90 hover:border-green-500 transition-colors text-center"
            >
              ping
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
