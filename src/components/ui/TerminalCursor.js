import React from "react";

export const TerminalCursor = ({ className = "" }) => (
  <span
    className={`inline-block w-2 h-4 bg-green-500 animate-pulse ${className}`}
  >
    _
  </span>
);

export const TerminalPrompt = ({ children, className = "" }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <span className="text-green-500">{">"}</span>
    <span className="text-white">{children}</span>
    <TerminalCursor />
  </div>
);

export const TerminalHeader = ({ title, functionKey, showTime = true }) => (
  <div className="border border-green-900 p-2 mb-4 flex items-center justify-between bg-black">
    <div className="flex items-center gap-2">
      <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
      <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1"></div>
      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
      <span className="text-xs">
        {title} <span className="text-green-600">{functionKey}</span>
      </span>
    </div>
    {showTime && (
      <div className="flex items-center gap-2">
        <span className="text-xs">{new Date().toLocaleTimeString()}</span>
      </div>
    )}
  </div>
);

export const StatusIndicator = ({ status, label }) => {
  const statusColors = {
    active: "bg-green-500",
    warning: "bg-yellow-500",
    error: "bg-red-500",
    idle: "bg-gray-500",
  };

  return (
    <div className="flex items-center gap-2">
      <div
        className={`w-2 h-2 rounded-full ${statusColors[status] || statusColors.idle}`}
      ></div>
      <span className="text-xs text-green-500">{label}</span>
    </div>
  );
};
