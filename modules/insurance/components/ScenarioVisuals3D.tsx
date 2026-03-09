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
            background: "linear-gradient(160deg, #2a2a3e 0%, #1e1e30 40%, #181828 100%)",
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
              <div className="text-[8px] tracking-[0.15em] text-[#6a6a80] uppercase">הסנגוריה הציבורית</div>
              <div className="text-[9px] font-bold text-[#8888a0]">משרד המשפטים</div>
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
                    stroke="#6a6a80" strokeWidth="1.2" strokeLinecap="round" />
                ))}
              </svg>
            </div>
          </div>
          <div className="absolute bottom-[30px] right-3.5 z-10">
            <div className="text-[7px] text-[#4a4a60] tracking-[0.2em] font-mono">6529 0000 0000</div>
            <div className="text-[7px] text-[#4a4a60] mt-0.5">סנגור ציבורי תורן</div>
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

/** 5: גניבת נשק — Dark premium safe with wheel handle */
export const BrokenSafeVisual = ({ isActive }: { isActive: boolean }) => {
  const [doorOpen, setDoorOpen] = useState(false);

  useEffect(() => {
    if (isActive) {
      const t = setTimeout(() => setDoorOpen(true), 500);
      return () => clearTimeout(t);
    }
    setDoorOpen(false);
  }, [isActive]);

  /* Wheel handle SVG — 6 spokes radiating from center disc */
  const Wheel = () => (
    <svg viewBox="0 0 60 60" className="w-14 h-14" style={{
      transform: doorOpen ? "rotate(45deg)" : "rotate(0deg)",
      transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
    }}>
      <circle cx="30" cy="30" r="28" fill="none" stroke="#1e1e2e" strokeWidth="2" />
      <circle cx="30" cy="30" r="10" fill="#2a2a3e" stroke="#1e1e2e" strokeWidth="1.5" />
      {[0, 60, 120, 180, 240, 300].map(a => (
        <line key={a} x1="30" y1="30"
          x2={30 + 24 * Math.cos(a * Math.PI / 180)} y2={30 + 24 * Math.sin(a * Math.PI / 180)}
          stroke="#1e1e2e" strokeWidth="4" strokeLinecap="round" />
      ))}
      <circle cx="30" cy="30" r="4" fill="#3a3a4e" />
    </svg>
  );

  return (
    <div className="w-full h-full flex items-center justify-center p-2" style={{ perspective: "700px" }}>
      <div className="relative" style={{ width: 135, height: 145, transformStyle: "preserve-3d" }}>
        {/* Safe body — dark charcoal */}
        <div className="absolute inset-0 rounded-xl" style={{
          background: "linear-gradient(160deg, #35354a 0%, #25253a 50%, #1e1e30 100%)",
          border: "2px solid #2a2a40",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05), 0 16px 40px -8px rgba(0,0,0,0.4)",
        }}>
          {/* Interior with warm golden glow */}
          <div className="absolute inset-[6px] rounded-lg overflow-hidden" style={{
            background: "linear-gradient(160deg, #1a1a28, #14141f)",
            boxShadow: "inset 0 4px 16px rgba(0,0,0,0.6)",
            opacity: doorOpen ? 1 : 0, transition: "opacity 0.5s ease 0.3s",
          }}>
            <div className="absolute inset-0" style={{
              background: "radial-gradient(circle at 50% 50%, rgba(200,150,40,0.25) 0%, rgba(200,150,40,0.05) 50%, transparent 80%)",
              opacity: doorOpen ? 1 : 0, transition: "opacity 0.8s ease 0.6s",
            }} />
            <div className="w-full h-full flex items-center justify-center" style={{ opacity: doorOpen ? 1 : 0, transition: "opacity 0.5s ease 1.2s" }}>
              <span className="text-[10px] text-[#665530] font-bold">ריק</span>
            </div>
          </div>
        </div>

        {/* Safe door — dark with wheel handle */}
        <div className="absolute inset-0 rounded-xl" style={{
          background: "linear-gradient(160deg, #40405a 0%, #30304a 40%, #28283e 100%)",
          border: "2px solid #3a3a50",
          transformOrigin: "right center",
          transform: doorOpen ? "perspective(700px) rotateY(-65deg)" : "rotateY(0deg)",
          transition: "transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: doorOpen
            ? "8px 0 25px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)"
            : "0 4px 12px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}>
          {/* Door inner border */}
          <div className="absolute inset-[5px] rounded-lg" style={{ border: "1px solid rgba(255,255,255,0.04)" }} />
          <div className="w-full h-full flex items-center justify-center">
            <Wheel />
          </div>
        </div>

        {/* Criminal case badge */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full whitespace-nowrap"
          style={{ background: "var(--accent-red)", opacity: doorOpen ? 0.9 : 0, transform: doorOpen ? "translateY(0)" : "translateY(-8px)", transition: "all 0.5s ease 1.2s" }}>
          <span className="text-[9px] font-bold text-white">תיק פלילי נפתח</span>
        </div>
      </div>
    </div>
  );
};
