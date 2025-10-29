// src/components/ScrollToTop.jsx
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop
 * - Smooth-scrolls to top on route changes.
 * - If URL contains a hash (e.g. /#connect), it'll try to scroll to that element.
 * - Uses a short timeout so the destination page has a chance to render.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const lastPathRef = useRef("");

  useEffect(() => {
    // if the pathname didn't change, still allow hash handling
    const isSamePath = lastPathRef.current === pathname;
    lastPathRef.current = pathname;

    // Delay slightly so new page DOM can render
    const id = (hash || "").replace("#", "");
    const to = setTimeout(() => {
      if (id) {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
        // fallback to top if anchor not found
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      // If same path (e.g., only search changed) still scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 60); // 60ms is small but lets React render route content

    return () => clearTimeout(to);
  }, [pathname, hash]);

  return null;
}