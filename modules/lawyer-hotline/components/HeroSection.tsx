"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Phone, Scale } from "lucide-react";

export const LawyerHero = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex flex-col items-center justify-center px-6 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 50% 20%, #1a2c4e 0%, #0a1628 60%), #0a1628",
      }}
    >
      {/* Decorative scales icon glow */}
      <div
        className="absolute z-[5] pointer-events-none"
        style={{
          width: "min(70vw, 520px)",
          height: "min(70vw, 520px)",
          opacity: loaded ? 0.06 : 0,
          transition: "opacity 1.2s ease-out 0.2s",
          background:
            "radial-gradient(circle, rgba(96,165,250,0.6) 0%, transparent 60%)",
        }}
      />
      <Scale
        className="absolute z-[5] pointer-events-none"
        style={{
          width: "min(45vw, 360px)",
          height: "min(45vw, 360px)",
          color: "rgba(96,165,250,0.10)",
          opacity: loaded ? 1 : 0,
          transition: "opacity 1.2s ease-out 0.3s",
        }}
        strokeWidth={1}
      />

      <div
        className="relative z-10 max-w-3xl text-center"
        style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
        }}
      >
        <div
          className="inline-flex items-center gap-2 mb-5 md:mb-7 px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold tracking-wide"
          style={{
            background: "rgba(96,165,250,0.10)",
            border: "1px solid rgba(96,165,250,0.30)",
            color: "#93c5fd",
          }}
        >
          ✦ קבוצת רכישה פתוחה — מאות חמושים יחד
        </div>

        <h1 className="text-3xl md:text-6xl font-black text-white mb-4 md:mb-6 leading-[1.05]">
          הדבר שיכול להפוך אותך
          <br />
          <span className="text-[#fbbf24]">מגיבור לחשוד</span>
        </h1>

        <p className="text-base md:text-xl text-white/75 max-w-2xl mx-auto leading-relaxed mb-8 md:mb-10">
          לא הירייה. <strong className="text-white">החקירה אחריה.</strong>
          <br />
          כל מילה שתגיד למשטרה לבד — תיכנס לפרוטוקול.
          <br />
          אז עשינו לך עו״ד פלילי בקו ישיר 24/7.
        </p>

        <div className="flex items-center justify-center gap-3 flex-wrap">
          <a
            href="#price"
            className="inline-flex items-center gap-2 px-7 py-3.5 md:px-9 md:py-4 bg-[#fbbf24] text-[#0a1628] font-black text-base md:text-lg hover:scale-105 transition-transform"
            style={{
              borderRadius: "35px",
              boxShadow: "0 12px 40px -5px rgba(251,191,36,0.45)",
            }}
          >
            אני בפנים — 14.90 ₪
            <ArrowLeft className="w-5 h-5" />
          </a>
          <a
            href="tel:0552281168"
            className="inline-flex items-center gap-2 px-6 py-3.5 md:px-7 md:py-4 border border-white/25 text-white font-bold text-base md:text-lg hover:bg-white/5 transition-colors"
            style={{ borderRadius: "35px" }}
          >
            <Phone className="w-4 h-4" />
            דברו איתי
          </a>
        </div>

        <p className="mt-6 text-xs md:text-sm text-white/45">
          14.90 ₪ לחודש · ביטול בקליק · ללא התחייבות
        </p>
      </div>
    </section>
  );
};
