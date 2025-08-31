import React, { useState, useEffect } from "react";
import { Terminal, Clock, Menu, X, ChevronRight } from "lucide-react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.8);
    };

    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(timer);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-mono ${
        scrolled ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="border-b border-green-900 bg-black/95 backdrop-blur-sm">
        <nav className="container mx-auto">
          <div className="flex items-center justify-between h-16 px-4">
            {/* Logo & System Status */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-green-500" />
                <span className="text-green-500 text-xs"></span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-green-500" />
                <span className="text-green-500 text-xs">
                  {time.toLocaleTimeString()}
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center gap-6">
              {["HOME", "ABOUT", "SKILLS", "PROJECTS", "CONTACT"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="text-xs text-green-500 hover:text-white transition-colors"
                    >
                      {item} {`<${item[0]}>`}
                    </a>
                  </li>
                ),
              )}
              <li>
                <a
                  href="/resume.pdf"
                  className="px-3 py-1 text-xs border border-green-500 text-green-500 hover:bg-green-500/10"
                >
                  RESUME {`<R>`}
                </a>
              </li>
            </ul>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-green-500"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-green-900 bg-black/95 backdrop-blur-sm">
              <ul className="py-4 px-4 space-y-2">
                {["HOME", "ABOUT", "SKILLS", "PROJECTS", "CONTACT"].map(
                  (item) => (
                    <li key={item}>
                      <a
                        href={`#${item.toLowerCase()}`}
                        className="flex items-center gap-2 text-xs text-green-500 hover:text-white transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <ChevronRight size={12} />
                        {item}
                      </a>
                    </li>
                  ),
                )}
                <li className="pt-2 border-t border-green-900/50">
                  <a
                    href="/resume.pdf"
                    className="flex items-center gap-2 text-xs text-green-500 hover:text-white transition-colors"
                  >
                    <ChevronRight size={12} />
                    RESUME
                  </a>
                </li>
              </ul>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};
