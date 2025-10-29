import React from "react";
import { motion } from "framer-motion";
import { Linkedin, Twitter, Instagram, Mail } from "lucide-react";

export default function SocialLinks() {
  const socials = [
    { icon: <Linkedin size={38} />, href: "https://linkedin.com/in/deepak-yadav3011" },
    { icon: <Twitter size={38} />, href: "https://x.com/deepak_yadav30" },
    { icon: <Instagram size={38} />, href: "https://instagram.com/longlost_human" },
    { icon: <Mail size={38} />, href: "mailto:mailyadav.deepak@gmail.com" },
  ];

  return (
    <motion.section
      className="relative flex flex-col justify-center items-center text-gray-300 py-32"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.3 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.4 }}
        transition={{ duration: 1 }}
        className="text-center text-4xl font-semibold mb-12 text-white tracking-wide"
      >
        Connect with Me
      </motion.h2>

      <motion.div
        className="flex flex-wrap items-center justify-center gap-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.3 }}
        transition={{ delay: 0.1, duration: 1.2 }}
      >
        {socials.map((social, i) => (
          <motion.a
            key={i}
            href={social.href}
            target="_blank"
            rel="noreferrer"
            className="text-gray-400 hover:text-accent transition-all duration-300 hover:drop-shadow-[0_0_12px_var(--tw-shadow-color)]"
            whileHover={{ scale: 1.25 }}
            style={{ "--tw-shadow-color": "#14b8a6" }}
          >
            {social.icon}
          </motion.a>
        ))}
      </motion.div>
    </motion.section>
  );
}