import React, { useEffect, Suspense, lazy } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { TerminalMode } from "./components/TerminalMode";
import { TerminalModeProvider, useTerminalMode } from "./contexts/TerminalModeContext";
import { useKeyboardNavigation } from "./hooks/useKeyboardNavigation";
import AOS from "aos";
import "aos/dist/aos.css";

// Lazy load components for better performance
const About = lazy(() =>
  import("./components/About").then((module) => ({ default: module.About })),
);
const Skills = lazy(() =>
  import("./components/Skills").then((module) => ({ default: module.Skills })),
);
const Projects = lazy(() =>
  import("./components/Projects").then((module) => ({
    default: module.Projects,
  })),
);
const Experience = lazy(() =>
  import("./components/Experience").then((module) => ({
    default: module.Experience,
  })),
);
const Contact = lazy(() =>
  import("./components/Contact").then((module) => ({
    default: module.Contact,
  })),
);
const Footer = lazy(() =>
  import("./components/Footer").then((module) => ({ default: module.Footer })),
);
const TerminalShowcase = lazy(() =>
  import("./components/TerminalShowcase").then((module) => ({
    default: module.TerminalShowcase,
  })),
);

// Loading component with terminal aesthetic
const LoadingTerminal = () => (
  <div className="flex items-center justify-center min-h-[200px] bg-black text-green-500 font-mono">
    <div className="text-center">
      <div className="text-xs mb-2">LOADING MODULE...</div>
      <div className="flex items-center gap-1">
        <span>{">"}</span>
        <div className="w-2 h-4 bg-green-500 animate-pulse">_</div>
      </div>
    </div>
  </div>
);

// Main App component with terminal mode support
const AppContent = () => {
  const { isTerminalMode, exitTerminalMode } = useTerminalMode();
  
  useKeyboardNavigation();

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
    });

    // Ensure page starts at the top (Hero section)
    window.scrollTo(0, 0);
    
    // Prevent scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // Render terminal mode
  if (isTerminalMode) {
    return <TerminalMode onExitTerminal={exitTerminalMode} />;
  }

  // Render normal website
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-gray-100">
      <Header />
      <Hero />
      <Suspense fallback={<LoadingTerminal />}>
        <About />
      </Suspense>
      <Suspense fallback={<LoadingTerminal />}>
        <Skills />
      </Suspense>
      <Suspense fallback={<LoadingTerminal />}>
        <Experience />
      </Suspense>
      <Suspense fallback={<LoadingTerminal />}>
        <Projects />
      </Suspense>
      <Suspense fallback={<LoadingTerminal />}>
        <Contact />
      </Suspense>
      <Suspense fallback={<LoadingTerminal />}>
        <TerminalShowcase />
      </Suspense>
      <Suspense fallback={<LoadingTerminal />}>
        <Footer />
      </Suspense>
    </div>
  );
};

function App() {
  return (
    <TerminalModeProvider>
      <AppContent />
    </TerminalModeProvider>
  );
}

export default App;
