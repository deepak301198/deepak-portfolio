// src/pages/Work.jsx
import React from "react";
import { motion } from "framer-motion";

const works = [
  {
    title: "Strategic Product Playbook",
    description:
      "A comprehensive product management guide covering lifecycle ownership, roadmap design, and stakeholder alignment frameworks.",
    file: "/work/Strategic_Product_Playbook.pdf",
  },
  {
    title: "AI-driven Sourcing Framework",
    description:
      "Presentation on integrating GenAI capabilities within sourcing tools to automate supplier evaluation and negotiation workflows.",
    file: "/work/AI_Sourcing_Framework.pptx",
  },
  {
    title: "User Adoption & Retention Dashboard",
    description:
      "Data-driven dashboard for tracking product usage, NPS, and retention metrics with visual storytelling and actionable insights.",
    file: "/work/User_Adoption_Retention.pdf",
  },
];

export default function Work() {
  return (
    <div className="bg-black text-gray-100 pt-32 pb-40">
      {/* Page Title */}
      <motion.h1
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 60,
          damping: 18,
          delay: 0.2,
        }}
        className="text-5xl font-bold text-center mb-24"
      >
        Work 💼
      </motion.h1>

      {/* Work Sections */}
      <div className="flex flex-col gap-[35vh]">
        {works.map((work, i) => (
          <motion.section
            key={i}
            initial={{ opacity: 0, y: 120 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 60,
              damping: 18,
              delay: 0.1,
            }}
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true }}
              className="mb-10"
            >
              <h2 className="text-3xl font-semibold text-accent mb-3">
                {work.title}
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed">
                {work.description}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 60 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 60,
                damping: 18,
                delay: 0.1,
              }}
              viewport={{ once: true }}
              className="w-full h-[70vh] bg-slate-900/40 border border-slate-800 rounded-3xl overflow-hidden shadow-lg shadow-slate-900/50 backdrop-blur-sm"
            >
              <iframe
                src={work.file}
                title={work.title}
                className="w-full h-full rounded-3xl"
              />
            </motion.div>
          </motion.section>
        ))}
      </div>
    </div>
  );
}