// src/components/Layout.jsx
import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import ScrollToTop from "./ScrollToTop"; // <-- new import

/**
 * Layout.jsx
 * - Header hidden by default
 * - Header becomes visible when user scrolls OR hovers the top hover zone
 * - Smooth CSS transition for slide+fade
 */

export default function Layout() {
  const [isHoveredTop, setIsHoveredTop] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleConnectClick = (e) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/");
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const element = document.getElementById("connect");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 200);
    } else {
      const element = document.getElementById("connect");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/");
      // Wait for navigation to complete, then scroll to top
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 200);
    } else {
      // Already on home page, just scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // header visible if scrolled OR top hover active
  const headerVisible = isScrolled || isHoveredTop;

  return (
    <div className="bg-black text-gray-100 min-h-screen relative">
      {/* Top hover zone: larger so it's reliable */}
      <div
        className="fixed top-0 left-0 w-full h-20 z-40 pointer-events-auto"
        onMouseEnter={() => setIsHoveredTop(true)}
        onMouseLeave={() => setIsHoveredTop(false)}
        aria-hidden="true"
      />

      {/* Header: CSS transition for transform + opacity */}
      <header
        className={`fixed left-0 top-0 w-full z-50 bg-black/70 backdrop-blur-md border-b border-slate-800 transition-all duration-500 ease-in-out ${
          headerVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
        style={{ willChange: "transform, opacity" }}
        onMouseEnter={() => setIsHoveredTop(true)}
        onMouseLeave={() => {
          if (!isScrolled) {
            setIsHoveredTop(false);
          }
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <button
            onClick={handleHomeClick}
            className="text-lg font-semibold text-white hover:text-accent bg-transparent border-none cursor-pointer p-0"
          >
            Deepak Yadav
          </button>

          <nav className="flex items-center gap-8 text-sm md:text-base">
            <Link
              to="/"
              className={`hover:text-accent ${location.pathname === "/" ? "text-accent" : "text-gray-300"}`}
            >
              Home
            </Link>
            <Link
              to="/product-experience"
              className={`hover:text-accent ${location.pathname === "/product-experience" ? "text-accent" : "text-gray-300"}`}
            >
              Product Experience
            </Link>
            <Link
              to="/writing"
              className={`hover:text-accent ${location.pathname === "/writing" ? "text-accent" : "text-gray-300"}`}
            >
              Writing
            </Link>
            <Link
              to="/travels"
              className={`hover:text-accent ${location.pathname === "/travels" ? "text-accent" : "text-gray-300"}`}
            >
              Travels
            </Link>
       {/* <Link
  to="/work"
  className={`hover:text-accent ${location.pathname === "/work" ? "text-accent" : "text-gray-300"}`}
>
  Work
</Link> */}
            <button
              onClick={handleConnectClick}
              className="hover:text-accent text-gray-300 bg-transparent border-none cursor-pointer"
            >
              Connect
            </button>
          </nav>

          <a
            href="mailto:mailyadav.deepak@gmail.com"
            className="hidden sm:inline-block text-sm text-slate-400 hover:text-accent"
            title="Email"
          >
            Email
          </a>
        </div>
      </header>

      <main>
        {/* ScrollToTop ensures every route change scrolls to top */}
        <ScrollToTop />

        <Outlet />
      </main>

      <footer className="text-center py-10 border-t border-slate-800 text-slate-500 text-sm mt-20">
        © {new Date().getFullYear()} Deepak Yadav — Built with ❤️
      </footer>
    </div>
  );
}