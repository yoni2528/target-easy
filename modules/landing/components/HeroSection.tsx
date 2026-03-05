"use client";

import { Crosshair } from "lucide-react";
import Link from "next/link";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Animated rings background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full border border-[var(--accent-green)]/5 animate-[pulse_4s_ease-in-out_infinite]" />
        <div className="absolute w-[400px] h-[400px] rounded-full border border-[var(--accent-green)]/8 animate-[pulse_4s_ease-in-out_infinite_0.5s]" />
        <div className="absolute w-[200px] h-[200px] rounded-full border border-[var(--accent-green)]/12 animate-[pulse_4s_ease-in-out_infinite_1s]" />
      </div>

      {/* Crosshair icon */}
      <div className="relative mb-6 animate-[fadeIn_1s_ease-out]">
        <Crosshair
          className="w-16 h-16 text-[var(--accent-green)]"
          strokeWidth={1}
        />
        <div className="absolute inset-0 w-16 h-16 rounded-full bg-[var(--accent-green)]/10 blur-xl" />
      </div>

      {/* Main title */}
      <h1
        className="text-7xl md:text-8xl font-black text-[var(--text-primary)] tracking-tight mb-3 animate-[fadeInUp_0.8s_ease-out]"
        style={{ fontFamily: "var(--font-heebo)" }}
      >
        מטרה
      </h1>

      {/* Subtitle */}
      <p className="text-xl md:text-2xl text-[var(--accent-green)] font-medium mb-4 animate-[fadeInUp_0.8s_ease-out_0.2s] opacity-0 [animation-fill-mode:forwards]">
        מערכת ניהול מטווח חכמה
      </p>

      {/* Tagline */}
      <p className="text-base md:text-lg text-[var(--text-secondary)] max-w-md text-center mb-10 animate-[fadeInUp_0.8s_ease-out_0.4s] opacity-0 [animation-fill-mode:forwards]">
        תנהל מטווח, לא ניירת. הכל דיגיטלי, הכל במקום אחד.
      </p>

      {/* CTA Buttons */}
      <div className="flex gap-4 animate-[fadeInUp_0.8s_ease-out_0.6s] opacity-0 [animation-fill-mode:forwards]">
        <Link
          href="/contact"
          className="px-8 py-3 bg-[var(--accent-green)] text-[var(--bg-primary)] font-bold rounded-xl hover:brightness-110 transition-all shadow-lg shadow-[var(--accent-green)]/20"
        >
          צור קשר
        </Link>
        <Link
          href="/login"
          className="px-8 py-3 border border-[var(--border-default)] text-[var(--text-primary)] font-medium rounded-xl hover:bg-[var(--bg-elevated)] transition-all"
        >
          התחברות
        </Link>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 animate-bounce">
        <div className="w-6 h-10 border-2 border-[var(--border-default)] rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-[var(--accent-green)] rounded-full animate-[scrollDot_2s_ease-in-out_infinite]" />
        </div>
      </div>
    </section>
  );
};
