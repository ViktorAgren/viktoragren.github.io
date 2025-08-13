import React from "react";
import { Terminal, Activity, Coffee, Wifi } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-black border-t border-green-900 font-mono z-50">
      <div className="container mx-auto">
        <div className="flex items-center justify-between px-4 h-8 text-xs">
          {/* Left Side Status */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-green-500">SYSTEM_ACTIVE</span>
            </div>
            <div className="flex items-center gap-2 text-green-500">
              <Terminal size={12} />
              <span>VA_TERMINAL v1.0.0</span>
            </div>
          </div>

          {/* Center Status */}
          <div className="flex items-center gap-4 text-green-500">
            <div className="flex items-center gap-2">
              <Activity size={12} />
              <span>UPTIME: 99.9%</span>
            </div>
            <div className="flex items-center gap-2">
              <Wifi size={12} />
              <span>CONNECTED</span>
            </div>
          </div>

          {/* Right Side - Copyright */}
          <div className="flex items-center gap-2 text-green-500">
            <Coffee size={12} />
            <span>© 2024 VIKTOR ÅGREN [VA]</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
