"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Scale } from "lucide-react";

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

      <div className="relative z-10 max-w-3xl text-center">
        <motion.img
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          src="/bia-logo-white.png"
          alt="Brothers in Arms"
          className="h-10 md:h-12 w-auto mx-auto mb-7 md:mb-9"
        />

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl md:text-6xl font-black text-white mb-4 md:mb-6 leading-[1.05]"
        >
          המגן המשפטי
          <br />
          <span className="text-[#fbbf24]">שכל חמוש צריך</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-base md:text-xl text-white/75 max-w-2xl mx-auto leading-relaxed mb-8 md:mb-10"
        >
          עו״ד פלילי בקו ישיר, 24/7.
          <br />
          ברגעים שבהם חשוב לדעת בדיוק מה לעשות.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center"
        >
          <button
            type="button"
            onClick={() => {
              window.dispatchEvent(new CustomEvent("open-contact-modal"));
            }}
            className="inline-flex items-center gap-2 px-8 py-4 md:px-10 md:py-5 bg-[#fbbf24] text-[#0a1628] font-black text-base md:text-xl hover:scale-105 transition-transform"
            style={{
              borderRadius: "35px",
              boxShadow: "0 16px 50px -5px rgba(251,191,36,0.45)",
            }}
          >
            אני רוצה להצטרף
            <ArrowLeft className="w-5 h-5" />
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-6 text-xs md:text-sm text-white/45"
        >
          14.90 ₪ לחודש · ביטול בקליק · ללא התחייבות
        </motion.p>
      </div>
    </section>
  );
};
