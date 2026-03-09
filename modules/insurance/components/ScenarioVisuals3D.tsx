"use client";

import { useState, useEffect } from "react";

/** 2: הסנגוריה הציבורית — Premium dark card that flips */
export const DefenderCardVisual = ({ isActive }: { isActive: boolean }) => {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    if (isActive) {
      const t = setTimeout(() => setFlipped(true), 1200);
      return () => clearTimeout(t);
    }
    setFlipped(false);
  }, [isActive]);

  return (
    <div className="w-full h-full flex items-center justify-center p-2" style={{ perspective: "600px" }}>
      <div style={{
        width: 210, height: 130, position: "relative",
        transformStyle: "preserve-3d",
        transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        transition: "transform 0.9s cubic-bezier(0.4, 0, 0.2, 1)",
      }}>
        {/* Front — dark premium card */}
        <div className="absolute inset-0 rounded-xl overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            background: "linear-gradient(160deg, #1e2a44 0%, #142038 40%, #0e182c 100%)",
            boxShadow: "0 12px 32px -6px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}>
          {/* Embossed large letters background */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden" style={{ opacity: 0.04 }}>
            <span style={{ fontSize: 80, fontWeight: 900, color: "white", letterSpacing: -6, lineHeight: 1 }}>ס״צ</span>
          </div>
          {/* Subtle diagonal lines */}
          <div className="absolute inset-0" style={{
            background: "repeating-linear-gradient(135deg, transparent, transparent 18px, rgba(255,255,255,0.015) 18px, rgba(255,255,255,0.015) 19px)",
          }} />
          {/* Content */}
          <div className="relative z-10 p-3.5 flex flex-col justify-between h-full">
            <div className="flex justify-between items-start">
              <div className="text-[8px] tracking-[0.15em] text-[#5a6a88] uppercase">הסנגוריה הציבורית</div>
              <div className="text-[9px] font-bold text-[#7888a8]">משרד המשפטים</div>
            </div>
            <div className="flex justify-between items-end">
              <div className="flex items-center gap-2">
                {/* Chip */}
                <div className="rounded" style={{ width: 22, height: 16, background: "linear-gradient(135deg, #c8c4b0, #a09880)", boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.15)" }}>
                  <div className="w-full h-full grid grid-cols-3 gap-[1px] p-[2px]">
                    {[...Array(6)].map((_, i) => <div key={i} className="rounded-[1px]" style={{ background: "rgba(180,170,140,0.6)" }} />)}
                  </div>
                </div>
              </div>
              {/* Contactless */}
              <svg viewBox="0 0 20 20" width="14" height="14" fill="none">
                {[6, 10, 14].map(r => (
                  <path key={r} d={`M${10 + r * 0.4},${10 - r * 0.5} A${r},${r} 0 0 1 ${10 + r * 0.4},${10 + r * 0.5}`}
                    stroke="#5a6a88" strokeWidth="1.2" strokeLinecap="round" />
                ))}
              </svg>
            </div>
          </div>
          <div className="absolute bottom-[30px] right-3.5 z-10">
            <div className="text-[7px] text-[#3a4a62] tracking-[0.2em] font-mono">6529 0000 0000</div>
            <div className="text-[7px] text-[#3a4a62] mt-0.5">סנגור ציבורי תורן</div>
          </div>
        </div>

        {/* Back — the truth (red) */}
        <div className="absolute inset-0 rounded-xl overflow-hidden flex flex-col items-center justify-center gap-2"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "linear-gradient(160deg, #2a1a1a 0%, #1e1015 40%, #180c10 100%)",
            boxShadow: "0 12px 32px -6px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,100,100,0.06)",
          }}>
          {/* Subtle red diagonal lines */}
          <div className="absolute inset-0" style={{
            background: "repeating-linear-gradient(135deg, transparent, transparent 18px, rgba(200,50,50,0.03) 18px, rgba(200,50,50,0.03) 19px)",
          }} />
          {["לא מומחה לנשק", "לא זמין 24/7", "לא מכיר את התיק"].map((text, i) => (
            <div key={text} className="relative z-10 flex flex-col items-center">
              <div className="text-[11px] font-black text-[var(--accent-red)] text-center">{text}</div>
              {i < 2 && <div className="w-10 h-[1px] mt-2" style={{ background: "rgba(200,50,50,0.2)" }} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

