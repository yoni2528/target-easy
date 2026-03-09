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

/** 5: גניבת נשק — 3D broken safe */
export const BrokenSafeVisual = ({ isActive }: { isActive: boolean }) => {
  const [doorOpen, setDoorOpen] = useState(false);

  useEffect(() => {
    if (isActive) {
      const t = setTimeout(() => setDoorOpen(true), 500);
      return () => clearTimeout(t);
    }
    setDoorOpen(false);
  }, [isActive]);

  return (
    <div className="w-full h-full flex items-center justify-center p-2" style={{ perspective: "600px" }}>
      <div className="relative" style={{ width: 130, height: 140, transformStyle: "preserve-3d" }}>
        {/* Safe body */}
        <div className="absolute inset-0 rounded-lg" style={{
          background: "linear-gradient(145deg, #6b7280, #4b5563)",
          border: "2px solid #374151",
          boxShadow: "inset 0 2px 8px rgba(0,0,0,0.3), 0 10px 30px -5px rgba(0,0,0,0.15)",
        }}>
          {/* Dark interior */}
          <div className="absolute inset-3 rounded" style={{
            background: "linear-gradient(180deg, #1a1a2e, #12121f)",
            boxShadow: "inset 0 4px 12px rgba(0,0,0,0.5)",
            opacity: doorOpen ? 1 : 0, transition: "opacity 0.5s ease 0.3s",
          }}>
            <div className="w-full h-full flex items-center justify-center" style={{ opacity: doorOpen ? 1 : 0, transition: "opacity 0.5s ease 1s" }}>
              <span className="text-[11px] text-[#555] font-bold">ריק</span>
            </div>
          </div>
        </div>

        {/* Safe door */}
        <div className="absolute inset-0 rounded-lg" style={{
          background: "linear-gradient(145deg, #9ca3af, #6b7280)",
          border: "2px solid #4b5563",
          transformOrigin: "right center",
          transform: doorOpen ? "perspective(600px) rotateY(-70deg)" : "rotateY(0deg)",
          transition: "transform 1s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: doorOpen ? "5px 0 20px rgba(0,0,0,0.3)" : "0 2px 8px rgba(0,0,0,0.1)",
        }}>
          <div className="w-full h-full flex flex-col items-center justify-center gap-2">
            {/* Dial */}
            <div className="w-14 h-14 rounded-full border-2 flex items-center justify-center"
              style={{ borderColor: "#4b5563", background: "linear-gradient(135deg, #9ca3af, #6b7280)" }}>
              <div className="w-7 h-1 bg-[#4b5563] rounded" style={{ transform: doorOpen ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.5s ease" }} />
            </div>
            {/* Keyhole */}
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-[#374151]" />
              <div className="w-1.5 h-2 bg-[#374151] -mt-0.5" />
            </div>
          </div>
        </div>

        {/* Criminal case badge */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full whitespace-nowrap"
          style={{ background: "var(--accent-red)", opacity: doorOpen ? 0.9 : 0, transform: doorOpen ? "translateY(0)" : "translateY(-8px)", transition: "all 0.5s ease 1s" }}>
          <span className="text-[9px] font-bold text-white">תיק פלילי נפתח</span>
        </div>
      </div>
    </div>
  );
};
