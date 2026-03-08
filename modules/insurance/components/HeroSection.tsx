"use client";

import { Shield, ChevronDown, CheckCircle } from "lucide-react";

const highlights = [
  "כיסוי עד 3,000,000₪",
  "הגנה פלילית ומשפטית",
  "החזרים על אימונים וציוד",
  "קו חם לעו״ד 24/7",
];

export const InsuranceHero = () => {
  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--accent-blue)]/8 via-transparent to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[var(--accent-blue)]/5 blur-[120px]" />
      </div>

      {/* Animated rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full border border-[var(--accent-blue)]/15 animate-[pulse_4s_ease-in-out_infinite]" />
        <div className="absolute w-[400px] h-[400px] rounded-full border border-[var(--accent-blue)]/20 animate-[pulse_4s_ease-in-out_infinite_0.5s]" />
        <div className="absolute w-[200px] h-[200px] rounded-full border border-[var(--accent-blue)]/25 animate-[pulse_4s_ease-in-out_infinite_1s]" />
      </div>

      {/* Exclusive badge */}
      <div className="relative mb-4 animate-[fadeIn_0.8s_ease-out]">
        <div className="px-4 py-1.5 rounded-full border border-[var(--accent-blue)]/25 bg-[var(--accent-blue)]/5 backdrop-blur">
          <span className="text-sm font-bold text-[var(--accent-blue)]">ביטוח ייחודי ובלעדי למחזיקי נשק</span>
        </div>
      </div>

      {/* Shield icon */}
      <div className="relative mb-5 animate-[fadeIn_1s_ease-out]">
        <Shield className="w-14 h-14 text-[var(--accent-blue)]" strokeWidth={1} />
        <div className="absolute inset-0 w-14 h-14 rounded-full bg-[var(--accent-blue)]/10 blur-xl" />
      </div>

      {/* Direct question */}
      <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-2 animate-[fadeInUp_0.8s_ease-out]">
        יש לך נשק ברישיון?
      </p>

      {/* Main title */}
      <h1 className="text-5xl md:text-7xl font-black text-[var(--text-primary)] tracking-tight mb-3 text-center animate-[fadeInUp_0.8s_ease-out_0.15s] opacity-0 [animation-fill-mode:forwards]">
        אתה צריך <span className="text-[var(--accent-blue)]">הגנה מלאה</span>
      </h1>

      {/* Subtitle */}
      <p className="text-base md:text-lg text-[var(--text-secondary)] max-w-lg text-center mb-8 animate-[fadeInUp_0.8s_ease-out_0.3s] opacity-0 [animation-fill-mode:forwards]">
        ביטוח אחריות צד ג׳ מקיף למחזיקי רישיון נשק — כולל כיסוי לאירועי טרור, באמצעות מנורה ביטוח
      </p>

      {/* Highlight chips */}
      <div className="flex flex-wrap justify-center gap-2 mb-10 animate-[fadeInUp_0.8s_ease-out_0.45s] opacity-0 [animation-fill-mode:forwards]">
        {highlights.map((h) => (
          <div key={h} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-sm">
            <CheckCircle className="w-3.5 h-3.5 text-[var(--accent-blue)]" strokeWidth={2} />
            <span className="text-xs font-medium text-[var(--text-primary)]">{h}</span>
          </div>
        ))}
      </div>

      {/* CTA Buttons */}
      <div className="flex gap-4 animate-[fadeInUp_0.8s_ease-out_0.6s] opacity-0 [animation-fill-mode:forwards]">
        <a href="#contact"
          className="px-8 py-3.5 bg-[var(--accent-blue)] text-white font-bold rounded-xl hover:brightness-110 transition-all shadow-lg shadow-[var(--accent-blue)]/20 text-lg">
          קבלו הצעת מחיר
        </a>
        <a href="#modules"
          className="px-8 py-3.5 border border-[var(--border-default)] text-[var(--text-primary)] font-medium rounded-xl hover:bg-[var(--bg-elevated)] transition-all">
          מה מכוסה?
        </a>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 flex flex-col items-center gap-2 animate-[fadeIn_1s_ease-out_1.2s] opacity-0 [animation-fill-mode:forwards]">
        <span className="text-xs text-[var(--text-muted)]">גלול למטה</span>
        <div className="w-8 h-12 border-2 border-[var(--border-default)] rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-[var(--accent-blue)] rounded-full animate-[scrollDot_2s_ease-in-out_infinite]" />
        </div>
        <ChevronDown className="w-4 h-4 text-[var(--text-muted)] animate-bounce" />
      </div>
    </section>
  );
};
