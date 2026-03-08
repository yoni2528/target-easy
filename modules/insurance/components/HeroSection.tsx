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
      if (current >= target) { setCount(target); clearInterval(interval); }
      else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(interval);
  }, [target, duration]);
  return <>{count.toLocaleString()}</>;
};

export const InsuranceHero = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setLoaded(true); }, []);

  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center px-6 overflow-hidden bg-gradient-to-b from-[#f8faff] to-white">
      {/* Background counter — 3D depth */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{ perspective: "1000px" }}>
        <span className="text-[100px] md:text-[200px] font-black leading-none tracking-tight"
          style={{
            color: "transparent",
            WebkitTextStroke: "2px color-mix(in srgb, var(--accent-red) 8%, transparent)",
            transform: loaded ? "translateZ(0) rotateX(0)" : "translateZ(-150px) rotateX(15deg)",
            transition: "all 2s cubic-bezier(0.16,1,0.3,1)",
          }}>
          <CountUp target={3000000} duration={2500} />₪
        </span>
      </div>

      {/* Content */}
      <h1 className="relative z-10 text-4xl md:text-6xl font-black text-[#37374e] tracking-tight text-center"
        style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s",
        }}>
        למה צריך ביטוח לאקדח?
      </h1>

      <p className="relative z-10 text-lg md:text-2xl text-[#6b6b80] text-center mt-4"
        style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s",
        }}>
        חוץ מזה שהוא מביא לי <span className="font-black text-[var(--accent-blue)]">1,350₪</span> בשנה.
      </p>

      {/* CTA — Menora-style rounded button with warm shadow */}
      <div className="relative z-10 mt-10"
        style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.7s",
        }}>
        <a href="#contact"
          className="px-10 py-4 bg-[var(--accent-blue)] text-white font-bold text-lg inline-block hover:scale-105 transition-transform"
          style={{
            borderRadius: "35px",
            boxShadow: "0 12px 30px -5px color-mix(in srgb, var(--accent-blue) 40%, transparent)",
          }}>
          קבלו הצעת מחיר
        </a>
      </div>

      {/* Scroll */}
      <div className="absolute bottom-8 flex flex-col items-center gap-2"
        style={{ opacity: loaded ? 1 : 0, transition: "opacity 1s ease 1.5s" }}>
        <span className="text-xs text-[#a0a0b0]">גלול למטה</span>
        <ChevronDown className="w-4 h-4 text-[#a0a0b0]" />
      </div>
    </section>
  );
};
