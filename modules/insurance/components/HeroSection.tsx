"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export const InsuranceHero = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setLoaded(true); }, []);

  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Background image */}
      <Image
        src="/insurance-hero.jpg"
        alt=""
        fill
        priority
        className="object-cover"
        style={{ filter: "brightness(0.35)" }}
      />

      {/* Animated crosshair */}
      <div className="absolute z-[5] pointer-events-none"
        style={{
          width: 320, height: 320,
          opacity: loaded ? 0.08 : 0,
          transition: "opacity 1.5s ease 0.8s",
          animation: loaded ? "hero-spin 40s linear infinite" : "none",
        }}>
        <svg viewBox="0 0 200 200" fill="none" stroke="white" strokeWidth="1.5">
          <circle cx="100" cy="100" r="90" opacity="0.5" />
          <circle cx="100" cy="100" r="60" opacity="0.4" />
          <circle cx="100" cy="100" r="30" opacity="0.3" />
          <line x1="100" y1="0" x2="100" y2="200" opacity="0.3" />
          <line x1="0" y1="100" x2="200" y2="100" opacity="0.3" />
        </svg>
      </div>

      {/* Pulsing glow ring */}
      <div className="absolute z-[5] pointer-events-none"
        style={{
          width: 400, height: 400,
          borderRadius: "50%",
          border: "1px solid rgba(26,111,204,0.15)",
          opacity: loaded ? 1 : 0,
          transition: "opacity 1.5s ease 1s",
          animation: loaded ? "hero-pulse 4s ease-in-out infinite" : "none",
        }} />

      {/* Content */}
      <h1 className="relative z-10 text-4xl md:text-6xl font-black text-white tracking-tight text-center"
        style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s",
        }}>
        למה צריך ביטוח לאקדח?
      </h1>

      <p className="relative z-10 text-lg md:text-2xl text-white/80 text-center mt-4"
        style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s",
        }}>
        חוץ מזה שהוא מביא לי <span className="font-black text-white">1,350₪</span> בשנה.
      </p>

      {/* CTA */}
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
            boxShadow: "0 12px 30px -5px rgba(0,0,0,0.4)",
          }}>
          קבלו הצעת מחיר
        </a>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 flex flex-col items-center gap-2 z-10"
        style={{ opacity: loaded ? 1 : 0, transition: "opacity 1s ease 1.5s" }}>
        <span className="text-xs text-white/50">גלול למטה</span>
        <span className="text-white/50 text-sm">↓</span>
      </div>
    </section>
  );
};
