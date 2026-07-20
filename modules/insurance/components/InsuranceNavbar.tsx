"use client";

import { useState, useEffect } from "react";

export const InsuranceNavbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(255,255,255,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid #e8edf5" : "1px solid transparent",
      }}
    >
      <div className="max-w-5xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
        <a
          href="#"
          className="flex items-center gap-2 text-lg md:text-xl font-black transition-colors"
          style={{ color: scrolled ? "#37374e" : "white" }}
        >
          <svg viewBox="0 0 48 48" fill="none" className="w-7 h-7 md:w-8 md:h-8">
            <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="3.5" />
            <circle cx="24" cy="24" r="9" stroke="#8bc1ea" strokeWidth="3" />
            <circle cx="24" cy="24" r="3.5" fill="currentColor" />
            <line x1="24" y1="2" x2="24" y2="10" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="24" y1="38" x2="24" y2="46" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="2" y1="24" x2="10" y2="24" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="38" y1="24" x2="46" y2="24" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
          </svg>
          מטרה
        </a>
        <a
          href="#contact"
          className="text-xs md:text-sm font-bold px-4 md:px-5 py-2 hover:scale-105 transition-transform"
          style={{
            borderRadius: "20px",
            background: "var(--accent-blue)",
            color: "white",
          }}
        >
          השאר פרטים
        </a>
      </div>
    </nav>
  );
};
