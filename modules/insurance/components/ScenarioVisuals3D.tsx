"use client";

import { useState, useEffect } from "react";

/** 2: הסנגוריה הציבורית — 3D flipping business card */
export const DefenderCardVisual = ({ isActive }: { isActive: boolean }) => {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    if (isActive) {
      const t = setTimeout(() => setFlipped(true), 800);
      return () => clearTimeout(t);
    }
    setFlipped(false);
  }, [isActive]);

  return (
    <div className="w-full h-full flex items-center justify-center p-2" style={{ perspective: "600px" }}>
      <div style={{
        width: 200, height: 125, position: "relative",
        transformStyle: "preserve-3d",
        transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
      }}>
        {/* Front — professional card */}
        <div className="absolute inset-0 rounded-xl p-4 flex flex-col justify-between"
          style={{
            backfaceVisibility: "hidden",
            background: "linear-gradient(135deg, #f8f9fc 0%, #eef1f8 100%)",
            border: "1px solid #dde2ec",
            boxShadow: "0 8px 24px -4px rgba(0,0,0,0.1)",
          }}>
          <div>
            <div className="text-[9px] text-[#a0a8b8] tracking-wider mb-0.5">משרד המשפטים</div>
            <div className="text-[14px] font-black text-[#37374e] leading-tight">הסנגוריה הציבורית</div>
          </div>
          <div>
            <div className="h-[1px] bg-[#e2e6ee] mb-2" />
            <div className="flex justify-between items-end">
              <div>
                <div className="text-[8px] text-[#8890a0]">סנגור ציבורי תורן</div>
                <div className="text-[8px] text-[#8890a0]">טל: *6529</div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-[#e8edf5] flex items-center justify-center">
                <div className="w-4 h-5 rounded-sm bg-[#c8cdd8]" />
              </div>
            </div>
          </div>
        </div>

        {/* Back — the truth */}
        <div className="absolute inset-0 rounded-xl p-4 flex flex-col items-center justify-center gap-2.5"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "linear-gradient(135deg, #fff5f5 0%, #fee 100%)",
            border: "1px solid",
            borderColor: "color-mix(in srgb, var(--accent-red) 30%, transparent)",
            boxShadow: "0 8px 24px -4px rgba(200,0,0,0.08)",
          }}>
          {["לא מומחה לנשק", "לא זמין 24/7", "לא מכיר את התיק"].map((text, i) => (
            <div key={text} className="flex flex-col items-center">
              <div className="text-[11px] font-black text-[var(--accent-red)] text-center">{text}</div>
              {i < 2 && <div className="w-10 h-[1px] mt-2.5" style={{ background: "color-mix(in srgb, var(--accent-red) 20%, transparent)" }} />}
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
