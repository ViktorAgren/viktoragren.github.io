import { useEffect } from "react";

export const useKeyboardNavigation = () => {
  useEffect(() => {
    const handleKeyPress = (event) => {
      // Prevent navigation if user is typing in an input
      if (
        event.target.tagName === "INPUT" ||
        event.target.tagName === "TEXTAREA"
      ) {
        return;
      }

      const key = event.key.toLowerCase();

      // Function key shortcuts
      if (event.altKey || event.ctrlKey) {
        switch (key) {
          case "h":
            event.preventDefault();
            document
              .getElementById("home")
              ?.scrollIntoView({ behavior: "smooth" });
            break;
          case "a":
            event.preventDefault();
            document
              .getElementById("about")
              ?.scrollIntoView({ behavior: "smooth" });
            break;
          case "s":
            event.preventDefault();
            document
              .getElementById("skills")
              ?.scrollIntoView({ behavior: "smooth" });
            break;
          case "p":
            event.preventDefault();
            document
              .getElementById("projects")
              ?.scrollIntoView({ behavior: "smooth" });
            break;
          case "e":
            event.preventDefault();
            document
              .getElementById("experience")
              ?.scrollIntoView({ behavior: "smooth" });
            break;
          case "c":
            event.preventDefault();
            document
              .getElementById("contact")
              ?.scrollIntoView({ behavior: "smooth" });
            break;
          case "r":
            event.preventDefault();
            window.open("/resume.pdf", "_blank");
            break;
        }
      }

      // Single key shortcuts
      switch (key) {
        case "escape":
          event.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
          break;
        case "?":
          event.preventDefault();
          showKeyboardHelp();
          break;
      }
    };

    const showKeyboardHelp = () => {
      const helpText = `
Terminal Navigation Shortcuts:
Ctrl/Alt + H  →  Home
Ctrl/Alt + A  →  About  
Ctrl/Alt + S  →  Skills
Ctrl/Alt + P  →  Projects
Ctrl/Alt + E  →  Experience
Ctrl/Alt + C  →  Contact
Ctrl/Alt + R  →  Resume
Escape       →  Back to top
?            →  Show this help
      `;

      // Create a temporary terminal-style overlay
      const overlay = document.createElement("div");
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        color: #10b981;
        font-family: monospace;
        font-size: 14px;
        padding: 2rem;
        z-index: 9999;
        white-space: pre-line;
        display: flex;
        align-items: center;
        justify-content: center;
      `;
      overlay.textContent = helpText + "\n\nPress any key to close...";

      document.body.appendChild(overlay);

      const removeOverlay = () => {
        document.body.removeChild(overlay);
        document.removeEventListener("keydown", removeOverlay);
        document.removeEventListener("click", removeOverlay);
      };

      document.addEventListener("keydown", removeOverlay);
      document.addEventListener("click", removeOverlay);
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);
};
