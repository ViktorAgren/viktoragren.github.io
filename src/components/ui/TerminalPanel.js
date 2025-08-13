import React from "react";

export const TerminalPanel = ({
  children,
  className = "",
  glowEffect = false,
  bordered = true,
}) => (
  <div
    className={`
    ${bordered ? "border border-green-900" : ""}
    ${glowEffect ? "shadow-lg shadow-green-500/20" : ""}
    bg-black p-4 
    ${className}
  `}
  >
    {children}
  </div>
);

export const TerminalGrid = ({ children, className = "" }) => (
  <div className={`grid gap-4 ${className}`}>{children}</div>
);

export const DataField = ({ label, value, className = "" }) => (
  <div className={`flex justify-between text-xs ${className}`}>
    <span className="text-green-600">{label}:</span>
    <span className="text-white">{value}</span>
  </div>
);

export const CommandOutput = ({ children, type = "info" }) => {
  const typeColors = {
    info: "text-white",
    success: "text-green-500",
    warning: "text-yellow-500",
    error: "text-red-500",
    command: "text-green-400",
  };

  return <div className={`text-xs ${typeColors[type]}`}>{children}</div>;
};
