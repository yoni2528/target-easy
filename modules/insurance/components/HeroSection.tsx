"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

const CountUp = ({ target, duration = 2000 }: { target: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const steps = 60;
    const inc = target / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += inc;
      if (current >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [target, duration]);
  return <>{count.toLocaleString()}</>;
};

export const InsuranceHero = () => {
  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Background counter */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="text-[120px] md:text-[220px] font-black text-[var(--accent-red)]/[0.04] leading-none tracking-tight">
          <CountUp target={3000000} duration={2500} />₪
        </span>
      </div>

      {/* Main title */}
      <h1 className="relative z-10 text-4xl md:text-6xl font-black text-[var(--text-primary)] tracking-tight text-center animate-[fadeInUp_0.8s_ease-out] opacity-0 [animation-fill-mode:forwards]">
        למה צריך ביטוח לאקדח?
      </h1>

      {/* Subtitle */}
      <p className="relative z-10 text-lg md:text-2xl text-[var(--text-secondary)] text-center mt-4 animate-[fadeInUp_0.8s_ease-out_0.2s] opacity-0 [animation-fill-mode:forwards]">
        חוץ מזה שהוא מביא לי <span className="font-black text-[var(--accent-blue)]">1,350₪</span> בשנה.
      </p>

      {/* CTA */}
      <div className="relative z-10 mt-10 animate-[fadeInUp_0.8s_ease-out_0.4s] opacity-0 [animation-fill-mode:forwards]">
        <a href="#contact"
          className="px-8 py-3.5 bg-[var(--accent-blue)] text-white font-bold rounded-xl hover:brightness-110 transition-all shadow-lg shadow-[var(--accent-blue)]/20 text-lg">
          קבלו הצעת מחיר
        </a>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 flex flex-col items-center gap-2 animate-[fadeIn_1s_ease-out_1.5s] opacity-0 [animation-fill-mode:forwards]">
        <span className="text-xs text-[var(--text-muted)]">גלול למטה</span>
        <ChevronDown className="w-4 h-4 text-[var(--text-muted)]" />
      </div>
    </section>
  );
};
