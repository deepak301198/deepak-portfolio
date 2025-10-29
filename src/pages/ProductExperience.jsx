// src/pages/ProductExperience.jsx
import React from "react";
import { motion } from "framer-motion";

export default function ProductExperience() {
  const experiences = [
    {
      period: "Sept 2025 – Present",
      role: "Associate Product Manager @ Zycus",
      product: "Merlin Intake — AI-Powered Procurement Intake",
      description: [
        "Owning the next generation of Merlin Intake to simplify enterprise procurement intake workflows.",
        "Enhancing user adoption through AI-driven insights and integrations.",
        "Leading product strategy discussions to scale intake capabilities across enterprise ecosystems.",
      ],
      link: "https://www.zycus.com/solution/intake-management",
    },
    {
      period: "Mar 2024 – Sept 2025",
      role: "Associate Product Manager @ Zycus",
      product: "iSource & ANA — Autonomous Negotiation Agents",
      description: [
        "Scoped, designed, and launched sourcing agents that automated creation of events and award recommendations.",
        "Delivered measurable procurement agility — 50% faster requisition-to-approval and improved supplier alignment.",
        "Partnered with design, QA, and engineering teams to optimize agent UX and increase enterprise adoption rates.",
      ],
      link: "https://www.zycus.com/solution/autonomous-negotiation-agents",
    },
    {
      period: "May 2022 – Mar 2024",
      role: "Associate Product Lead @ Zycus",
      product: "iSource — Strategic Sourcing Suite",
      description: [
        "Led the roadmap and feature design for Zycus’s flagship sourcing platform, focusing on supplier collaboration and evaluation.",
        "Built and launched multiple GenAI-powered sourcing apps (ResponseAnalyzerPro, Autoscore Pro, RFQ Genie) to automate supplier evaluations and boost efficiency.",
        "Streamlined usability and adoption across enterprise clients, improving NPS by 30% within six months.",
    ],
    links: [
      "https://www.zycus.com/solution/esourcing-software#elementor-toc__heading-anchor-2",
      "https://www.zycus.com/solution/strategic-sourcing-suite/sourcing-genai-power-apps"
    ],
    },
    {
      period: "May 2021 – Sept 2021",
      role: "Product Management Intern @ Certinal Software",
      product: "Certinal eSign — Workflow Automation",
      description: [
        "Got Introduced to the world of Product Management & fundamentals of product lifecycle management and cross-functional collaboration.",
        "Scoped and tested Certinal platform, for MVP launch.",
        "Recognized for strong ownership and received a Pre-Placement Offer (PPO) for consistent delivery and initiative.",
      ],
      link: "https://www.certinal.com/",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-gray-100 pt-32 pb-40 overflow-hidden">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="text-4xl font-bold text-center mb-20"
      >
        Product Experience 🧠
      </motion.h1>

      {/* Timeline */}
      <div className="relative max-w-5xl mx-auto px-6 md:px-12 mb-32">
        {/* Vertical line */}
        <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-1 h-full bg-gradient-to-b from-accent/70 via-accent/20 to-transparent rounded-full" />

        <div className="space-y-32 relative z-10">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 60,
                damping: 18,
                delay: i * 0.08,
              }}
              viewport={{ once: true, amount: 0.28 }}
              className={`relative flex flex-col md:flex-row items-start md:items-center ${
                i % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Connector Dot */}
              <div className="absolute left-3 md:left-1/2 transform md:-translate-x-1/2 bg-accent w-5 h-5 rounded-full shadow-lg shadow-accent/40 border-2 border-black" />

              {/* Timeline Card */}
              <div
                onClick={() => {
                  if (exp.links && exp.links.length > 0) {
                    exp.links.forEach((url) => window.open(url, "_blank"));
                  } else if (exp.link) {
                    window.open(exp.link, "_blank");
                  }
                }}
                className={`relative md:w-1/2 bg-gradient-to-b from-slate-900/70 to-slate-900/40 border border-slate-800 rounded-2xl p-8 shadow-lg backdrop-blur-xl hover:border-accent/70 hover:shadow-[0_0_30px_rgba(20,184,166,0.28)] cursor-pointer transition-all duration-500 ${
                  i % 2 === 0 ? "md:mr-auto md:text-right" : "md:ml-auto"
                }`}
              >
                <h3 className="text-accent text-sm mb-2 font-medium">
                  {exp.period}
                </h3>
                <h2 className="text-2xl font-semibold text-white mb-1">
                  {exp.role}
                </h2>
                <p className="text-slate-400 mb-4 italic">{exp.product}</p>

                <ul className="list-disc pl-5 text-slate-300 text-sm leading-relaxed text-justify space-y-2">
                  {exp.description.map((point, j) => (
                    <li key={j}>{point}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Resume Button (exactly as-is + fixed spacing) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="flex justify-center mb-24 mt-16"
      >
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="px-10 py-4 border border-accent text-accent rounded-full text-lg font-medium hover:bg-accent hover:text-black transition-all duration-500 shadow-[0_0_15px_rgba(20,184,166,0.2)] hover:shadow-[0_0_30px_rgba(20,184,166,0.5)]"
        >
          View My Resume →
        </a>
      </motion.div>
    </div>
  );
}