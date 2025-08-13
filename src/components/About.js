import React from "react";
import { User, Clock, Terminal, Code } from "lucide-react";
import {
  profileDetails,
  highlights,
  profileSummary,
  experience,
} from "../data/profile";
import { TerminalPanel, DataField } from "./ui/TerminalPanel";
import { TerminalHeader } from "./ui/TerminalCursor";

export const About = () => {
  return (
    <section
      id="about"
      className="min-h-screen bg-black text-green-500 font-mono py-20"
    >
      <div className="container mx-auto px-4">
        <TerminalHeader title="ABOUT_PROFILE" functionKey="<F2>" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Left Panel - Profile Info */}
          <div className="space-y-4">
            <TerminalPanel glowEffect>
              <div className="flex items-center gap-2 mb-4">
                <User size={14} />
                <span className="text-xs text-green-600">PERSONAL DETAILS</span>
              </div>
              <div className="space-y-3">
                <DataField label="NAME" value={profileDetails.name} />
                <DataField label="ROLE" value={profileDetails.role} />
                <DataField label="LOCATION" value={profileDetails.location} />
                <DataField
                  label="EMAIL"
                  value={profileDetails.email}
                  className="truncate"
                />
              </div>
            </TerminalPanel>

            <div className="border border-green-900 p-4 bg-black">
              <div className="flex items-center gap-2 mb-4">
                <Code size={14} />
                <span className="text-xs text-green-600">
                  TECHNICAL METRICS
                </span>
              </div>
              <div className="space-y-2 text-xs">
                {highlights.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center border-b border-green-900/30 pb-2"
                  >
                    <span>{item.title}</span>
                    <span className="text-white">{item.description}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2 space-y-4">
            <div className="border border-green-900 p-4 bg-black">
              <div className="flex items-center gap-2 mb-4">
                <Terminal size={14} />
                <span className="text-xs text-green-600">PROFILE SUMMARY</span>
              </div>
              <div className="space-y-4 text-xs">
                <div className="text-white">{profileSummary.title}</div>
                <ul className="list-disc pl-4 space-y-2 text-white">
                  {profileSummary.points.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border border-green-900 p-4 bg-black">
              <div className="flex items-center gap-2 mb-4">
                <Terminal size={14} />
                <span className="text-xs text-green-600">
                  EXPERIENCE & EXPERTISE
                </span>
              </div>
              <div className="text-xs space-y-4">
                {experience.map((exp, index) => (
                  <p key={index} className="text-white leading-relaxed">
                    {`>> ${exp}`}
                  </p>
                ))}
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="border border-green-900 p-4 bg-black">
              <div className="flex items-center justify-between">
                <div className="flex gap-4">
                  <a href="#projects" className="text-xs hover:text-white">
                    PROJECTS {`<F3>`}
                  </a>
                  <a href="#contact" className="text-xs hover:text-white">
                    CONTACT {`<F4>`}
                  </a>
                  <a href="#skills" className="text-xs hover:text-white">
                    SKILLS {`<F5>`}
                  </a>
                </div>
                <div className="text-xs text-green-600">
                  PRESS KEY FOR NAVIGATION
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
