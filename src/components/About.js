import React from 'react';
import { 
  Award, 
  Book, 
  Briefcase, 
  GraduationCap,
  User,
  Mail,
  MapPin,
  Clock,
  Terminal,
  Code
} from 'lucide-react';

export const About = () => {
  const highlights = [
    {
      icon: <Award className="w-5 h-5 text-green-500" />,
      title: "EXPERIENCE",
      description: "1+ YRS FINANCE"
    },
    {
      icon: <Book className="w-5 h-5 text-green-500" />,
      title: "EDUCATION",
      description: "MSC FINANCIAL MATHEMATICS"
    },
    {
      icon: <Briefcase className="w-5 h-5 text-green-500" />,
      title: "PROJECTS",
      description: "X"
    },
    {
      icon: <GraduationCap className="w-5 h-5 text-green-500" />,
      title: "EXPERTISE",
      description: "X"
    }
  ];

  return (
    <section id="about" className="min-h-screen bg-black text-green-500 font-mono py-20">
      <div className="container mx-auto px-4">
        {/* Header Bar */}
        <div className="border border-green-900 p-2 mb-4 flex items-center justify-between bg-black">
          <div className="flex items-center gap-2">
            <Terminal size={14} />
            <span className="text-xs">ABOUT_PROFILE <span className="text-green-600">{`<F2>`}</span></span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={14} />
            <span className="text-xs">{new Date().toLocaleTimeString()}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Left Panel - Profile Info */}
          <div className="space-y-4">
            <div className="border border-green-900 p-4 bg-black">
              <div className="flex items-center gap-2 mb-4">
                <User size={14} />
                <span className="text-xs text-green-600">PERSONAL DETAILS</span>
              </div>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between">
                  <span>NAME</span>
                  <span className="text-white">VIKTOR ÅGREN</span>
                </div>
                <div className="flex justify-between">
                  <span>ROLE</span>
                  <span className="text-white">QUANTITATIVE ANALYST</span>
                </div>
                <div className="flex justify-between">
                  <span>LOCATION</span>
                  <span className="text-white">STOCKHOLM, SWE</span>
                </div>
                <div className="flex justify-between">
                  <span>EMAIL</span>
                  <span className="text-white truncate">99VIKTOR.AGREN@GMAIL.COM</span>
                </div>
              </div>
            </div>

            <div className="border border-green-900 p-4 bg-black">
              <div className="flex items-center gap-2 mb-4">
                <Code size={14} />
                <span className="text-xs text-green-600">TECHNICAL METRICS</span>
              </div>
              <div className="space-y-2 text-xs">
                {highlights.map((item, index) => (
                  <div key={index} className="flex justify-between items-center border-b border-green-900/30 pb-2">
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
                <div className="text-white">
                  DEVELOPER & QUANTITATIVE ANALYST WITH FOCUS ON:
                </div>
                <ul className="list-disc pl-4 space-y-2 text-white">
                  <li>Financial mathematics and timeseries Analysis</li>
                  <li>Complex data analysis and illustration</li>
                  <li>Scalable software architecture and development</li>
                  <li>Risk analysis and portfolio optimization</li>
                </ul>
              </div>
            </div>

            <div className="border border-green-900 p-4 bg-black">
              <div className="flex items-center gap-2 mb-4">
                <Terminal size={14} />
                <span className="text-xs text-green-600">EXPERIENCE & EXPERTISE</span>
              </div>
              <div className="text-xs space-y-4">
                <p className="text-white leading-relaxed">
                  {`>> SPECIALIZED IN DEVELOPING INNOVATIVE SOLUTIONS THAT BRIDGE THE GAP BETWEEN COMPLEX FINANCIAL ANALYSIS AND MODERN TECHNOLOGY. EXPERIENCED IN BUILDING SCALABLE APPLICATIONS THAT SOLVE REAL-WORLD FINANCIAL PROBLEMS.`}
                </p>
                <p className="text-white leading-relaxed">
                  {`>> COMBINING RIGOROUS MATHEMATICAL MODELING WITH CLEAN, MAINTAINABLE CODE TO CREATE EFFICIENT AND RELIABLE SYSTEMS.`}
                </p>
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="border border-green-900 p-4 bg-black">
              <div className="flex items-center justify-between">
                <div className="flex gap-4">
                  <a href="#projects" className="text-xs hover:text-white">PROJECTS {`<F3>`}</a>
                  <a href="#contact" className="text-xs hover:text-white">CONTACT {`<F4>`}</a>
                  <a href="#skills" className="text-xs hover:text-white">SKILLS {`<F5>`}</a>
                </div>
                <div className="text-xs text-green-600">PRESS KEY FOR NAVIGATION</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};