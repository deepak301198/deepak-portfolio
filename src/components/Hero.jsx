import React, { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import heroImage from "../assets/hero.jpg";

export default function Hero() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  // 👇 Wrap scrollY in a spring for inertia / dampened motion
  const smoothY = useSpring(scrollY, {
    stiffness: 70,   // lower = slower follow
    damping: 20,     // higher = more resistance
    mass: 0.4,
  });

  // Use the smoothed value for transforms
  const opacity = useTransform(smoothY, [0, 600], [1, 0]);
  const scale   = useTransform(smoothY, [0, 600], [1, 0.96]);
  const y       = useTransform(smoothY, [0, 600], [0, 80]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.section
      id="home"
      style={{
        opacity,
        scale,
        y,
        transition: "all 0.8s cubic-bezier(0.22, 1, 0.36, 1)", // Apple-style ease
      }}
      className="relative h-screen w-full flex items-end justify-start overflow-hidden"
    >
      {/* Background image */}
      <motion.img
        src={heroImage}
        alt="Deepak Yadav"
        className="absolute inset-0 w-full h-full object-cover object-center brightness-90 contrast-110 saturate-[1.15]"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black/90" />

      {/* Quote */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 text-left px-8 pb-24 max-w-3xl"
      >
        <p className="text-gray-100 text-lg italic leading-relaxed tracking-wide">
          “It does not matter how slowly you go as long as you do not stop.”
        </p>
        <p className="text-gray-400 text-sm mt-2">— Confucius</p>
      </motion.div>

      {/* Scroll indicator */}
      <AnimatePresence>
        {!scrolled && (
          <motion.div
            key="scroll"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400 text-sm flex flex-col items-center"
          >
            <span>scroll</span>
            <motion.span
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="mt-1 text-2xl text-accent"
            >
              ↓
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}