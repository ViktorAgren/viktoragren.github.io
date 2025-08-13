import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const TerminalModeContext = createContext();

export const useTerminalMode = () => {
  const context = useContext(TerminalModeContext);
  if (!context) {
    throw new Error("useTerminalMode must be used within a TerminalModeProvider");
  }
  return context;
};

export const TerminalModeProvider = ({ children }) => {
  const [isTerminalMode, setIsTerminalMode] = useState(false);

  const enterTerminalMode = useCallback(() => {
    setIsTerminalMode(true);
    document.body.style.overflow = "hidden"; // Prevent scrolling in terminal mode
  }, []);

  const exitTerminalMode = useCallback(() => {
    setIsTerminalMode(false);
    document.body.style.overflow = "auto"; // Restore scrolling
  }, []);

  const toggleTerminalMode = useCallback(() => {
    if (isTerminalMode) {
      exitTerminalMode();
    } else {
      enterTerminalMode();
    }
  }, [isTerminalMode, exitTerminalMode, enterTerminalMode]);

  // Keyboard shortcut for terminal toggle (Ctrl+T)
  useEffect(() => {
    const handleKeyPress = (event) => {
      // Don't trigger if user is typing in an input (except in terminal mode)
      if (!isTerminalMode && (
        event.target.tagName === "INPUT" ||
        event.target.tagName === "TEXTAREA"
      )) {
        return;
      }

      // Ctrl+T to toggle terminal mode
      if (event.ctrlKey && event.key.toLowerCase() === "t") {
        event.preventDefault();
        toggleTerminalMode();
      }

      // Escape to exit terminal mode
      if (isTerminalMode && event.key === "Escape") {
        event.preventDefault();
        exitTerminalMode();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      // Cleanup: restore body overflow on unmount
      document.body.style.overflow = "auto";
    };
  }, [isTerminalMode, toggleTerminalMode, exitTerminalMode]);

  const value = {
    isTerminalMode,
    enterTerminalMode,
    exitTerminalMode,
    toggleTerminalMode,
  };

  return (
    <TerminalModeContext.Provider value={value}>
      {children}
    </TerminalModeContext.Provider>
  );
};