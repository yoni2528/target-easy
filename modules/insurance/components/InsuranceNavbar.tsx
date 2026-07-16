"use client";

import { useState, useEffect } from "react";
import { X, Check } from "lucide-react";

const features = [
  "ביטוח צד ג׳ מנורה — כיסוי עד 1,000,000₪",
  "כיסוי נזקי גוף ורכוש",
  "כיסוי אירועי טרור",
  "קו חם לעו״ד 24/7",
];

export const InsuranceNavbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
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
            className="text-lg md:text-xl font-black transition-colors"
            style={{ color: scrolled ? "#37374e" : "white" }}
          >
            מטרה
          </a>
          <div className="flex items-center gap-3 md:gap-5">
            <button
              onClick={() => setOpen(true)}
              className="text-sm font-bold cursor-pointer transition-colors py-2"
              style={{ color: scrolled ? "#37374e" : "white" }}
            >
              המסלול
            </button>
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
        </div>
      </nav>

      {/* Plan details modal */}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-end md:items-center justify-center md:p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            style={{ animation: "fadeIn 0.2s ease" }}
          />
          <div
            className="relative bg-white w-full max-w-lg max-h-[92vh] overflow-y-auto p-6 pt-12 md:p-10 rounded-t-3xl md:rounded-[30px]"
            onClick={(e) => e.stopPropagation()}
            style={{
              boxShadow: "0 30px 60px -15px rgba(0,0,0,0.2)",
              animation: "fadeInUp 0.3s ease",
            }}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 left-3 md:top-4 md:left-4 w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#f0f2f5] transition-colors"
            >
              <X className="w-5 h-5 text-[#6b6b80]" />
            </button>

            <h2 className="text-xl md:text-3xl font-black text-[#37374e] text-center mb-2">
              ביטוח צד ג׳ <span className="text-[var(--accent-blue)]">מנורה</span>
            </h2>
            <p className="text-[#6b6b80] text-center mb-6 text-xs md:text-sm">
              כיסוי אחריות מקיף למחזיקי רישיון נשק
            </p>

            <div className="mx-auto mb-6 text-center">
              <div className="inline-flex items-baseline gap-1">
                <span className="text-4xl md:text-5xl font-black text-[var(--accent-blue)]">
                  42
                </span>
                <span className="text-sm text-[#6b6b80]">₪/חודש</span>
              </div>
              <div className="text-xs text-[#a0a0b0] mt-1">
                כ־500₪ לשנה · ללא התחייבות ארוכת טווח
              </div>
            </div>

            <ul className="space-y-3 mb-6">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-green-600" />
                  </div>
                  <span className="text-sm md:text-base text-[#37374e]">{f}</span>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="block text-center py-3.5 rounded-xl font-bold text-base bg-[var(--accent-blue)] text-white hover:scale-[1.02] transition-transform"
              style={{
                boxShadow:
                  "0 8px 20px -5px color-mix(in srgb, var(--accent-blue) 35%, transparent)",
              }}
            >
              השאר פרטים ונחזור אליך
            </a>

            <p className="text-center text-[11px] text-[#a0a0b0] mt-4 leading-relaxed">
              ניתן להגדיל את כיסוי צד ג׳ או ההוצאות המשפטיות — לפרטים צרו קשר
            </p>
          </div>
        </div>
      )}
    </>
  );
};
