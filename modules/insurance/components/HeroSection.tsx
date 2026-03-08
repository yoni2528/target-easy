"use client";

import { Shield, ChevronDown } from "lucide-react";

export const InsuranceHero = () => {
  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Deep background layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--accent-green)]/5 via-transparent to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[var(--accent-green)]/3 blur-[120px]" />
        <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-[var(--accent-blue)]/3 blur-[80px]" />
      </div>

      {/* Animated rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full border border-[var(--accent-green)]/5 animate-[pulse_4s_ease-in-out_infinite]" />
        <div className="absolute w-[400px] h-[400px] rounded-full border border-[var(--accent-green)]/8 animate-[pulse_4s_ease-in-out_infinite_0.5s]" />
        <div className="absolute w-[200px] h-[200px] rounded-full border border-[var(--accent-green)]/12 animate-[pulse_4s_ease-in-out_infinite_1s]" />
      </div>

      {/* Shield icon */}
      <div className="relative mb-6 animate-[fadeIn_1s_ease-out]">
        <Shield className="w-16 h-16 text-[var(--accent-green)]" strokeWidth={1} />
        <div className="absolute inset-0 w-16 h-16 rounded-full bg-[var(--accent-green)]/10 blur-xl" />
      </div>

      {/* Main title */}
      <h1
        className="text-6xl md:text-8xl font-black text-[var(--text-primary)] tracking-tight mb-3 animate-[fadeInUp_0.8s_ease-out]"
        style={{ fontFamily: "var(--font-heebo)" }}
      >
        הגנה מלאה
      </h1>

      {/* Subtitle */}
      <p className="text-xl md:text-2xl text-[var(--accent-green)] font-medium mb-4 animate-[fadeInUp_0.8s_ease-out_0.2s] opacity-0 [animation-fill-mode:forwards]">
        למחזיקי נשק ברישיון
      </p>

      {/* Tagline */}
      <p className="text-base md:text-lg text-[var(--text-secondary)] max-w-md text-center mb-10 animate-[fadeInUp_0.8s_ease-out_0.4s] opacity-0 [animation-fill-mode:forwards]">
        ביטוח אחריות מקיף · כיסוי משפטי · החזרים על אימונים · קו חם 24/7
      </p>

      {/* CTA Buttons */}
      <div className="flex gap-4 animate-[fadeInUp_0.8s_ease-out_0.6s] opacity-0 [animation-fill-mode:forwards]">
        <a
          href="#modules"
          className="px-8 py-3 bg-[var(--accent-green)] text-[var(--bg-primary)] font-bold rounded-xl hover:brightness-110 transition-all shadow-lg shadow-[var(--accent-green)]/20"
        >
          מה מכוסה?
        </a>
        <a
          href="#contact"
          className="px-8 py-3 border border-[var(--border-default)] text-[var(--text-primary)] font-medium rounded-xl hover:bg-[var(--bg-elevated)] transition-all"
        >
          השאירו פרטים
        </a>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 flex flex-col items-center gap-2 animate-[fadeIn_1s_ease-out_1.2s] opacity-0 [animation-fill-mode:forwards]">
        <span className="text-xs text-[var(--text-muted)]">גלול למטה</span>
        <div className="w-8 h-12 border-2 border-[var(--border-default)] rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-[var(--accent-green)] rounded-full animate-[scrollDot_2s_ease-in-out_infinite]" />
        </div>
        <ChevronDown className="w-4 h-4 text-[var(--text-muted)] animate-bounce" />
      </div>
    </section>
  );
};
