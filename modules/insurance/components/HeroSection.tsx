"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { InsuranceContactForm } from "./InsuranceContactForm";

export const InsuranceHero = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setLoaded(true); }, []);

  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center px-6 pt-32 pb-16 md:pt-24 md:pb-0 overflow-hidden">
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
      <div className="absolute z-[5] pointer-events-none w-[200px] h-[200px] md:w-[320px] md:h-[320px]"
        style={{
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
      <div className="absolute z-[5] pointer-events-none w-[260px] h-[260px] md:w-[400px] md:h-[400px]"
        style={{
          borderRadius: "50%",
          border: "1px solid rgba(26,111,204,0.15)",
          opacity: loaded ? 1 : 0,
          transition: "opacity 1.5s ease 1s",
          animation: loaded ? "hero-pulse 4s ease-in-out infinite" : "none",
        }} />

      {/* Content */}
      <h1 className="relative z-10 text-5xl md:text-7xl font-black text-white tracking-tight text-center"
        style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s",
        }}>
        <span className="block text-xl md:text-3xl font-bold text-white/80 tracking-normal mb-2">
          לראשונה במדינת ישראל
        </span>
        ביטוח לחמושים
      </h1>

      <p className="relative z-10 text-base md:text-2xl text-white/80 text-center mt-4"
        style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s",
        }}>
        כמו שאין רכב בלי ביטוח חובה, אין נשק בלי כיסוי.
      </p>

      {/* Contact form */}
      <div className="relative z-10 mt-8 w-full max-w-sm"
        style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.7s",
        }}>
        <InsuranceContactForm variant="compact" />
      </div>

    </section>
  );
};
