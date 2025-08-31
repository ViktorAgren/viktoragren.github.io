import { Award, Book, Briefcase, GraduationCap } from "lucide-react";

export const profileDetails = {
  name: "VIKTOR ÅGREN",
  role: "QUANTITATIVE ANALYST",
  location: "STOCKHOLM, SWE",
  email: "99VIKTOR.AGREN@GMAIL.COM",
};

export const highlights = [
  {
    icon: <Award className="w-5 h-5 text-green-500" />,
    title: "EXPERIENCE",
    description: "2+ YRS FINANCE",
  },
  {
    icon: <Book className="w-5 h-5 text-green-500" />,
    title: "EDUCATION",
    description: "MSC FINANCIAL MATHEMATICS",
  }
];

export const profileSummary = {
  title: "DEVELOPER & QUANTITATIVE ANALYST WITH FOCUS ON:",
  points: [
    "Financial mathematics and timeseries Analysis",
    "Complex data analysis and illustration",
    "Scalable software architecture and development",
    "Attribution, risk analysis, and portfolio analysis",
  ],
};

export const experience = [
  "TRANSFORMING COMPLEX FINANCIAL DATA INTO ACTIONABLE INVESTMENT INSIGHTS. SPECIALIZED IN QUANTITATIVE ANALYSIS AND PORTFOLIO OPTIMIZATION.",
  "ENGINEERING ROBUST SOFTWARE SOLUTIONS WITH AN EMPHASIS ON MATHEMATICAL PRECISION. DEDICATED TO CLEAN CODE AND SYSTEM RELIABILITY.",
];
