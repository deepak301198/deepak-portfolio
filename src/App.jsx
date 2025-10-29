import React from "react";
import Hero from "./components/Hero";
import SocialLinks from "./components/SocialLinks";
import { motion } from "framer-motion";

export default function App() {
  return (
    <div id="home" className="min-h-screen bg-black text-gray-100">
      {/* Hero Section */}
      <Hero />

      {/* Connect Section */}
      <motion.section
        id="connect"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center justify-center py-40 text-center space-y-6"
      >
        <SocialLinks />
      </motion.section>
    </div>
  );
}