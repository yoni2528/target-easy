"use client";

import { useState, useEffect } from "react";

const D = 12;
const wood = "linear-gradient(160deg, #6b3a2a 0%, #5a2e1e 30%, #4a2515 60%, #3d1f10 100%)";
const grain = "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.05) 3px, rgba(0,0,0,0.05) 4px)";
const side = "linear-gradient(180deg, #6b3a2a 0%, #3d1f10 50%, #5a2e1e 100%)";

/** 3: עצירת פיגוע נכונה — Military medal of valor in wooden presentation box */
export const CrackingMedalVisual = ({ isActive }: { isActive: boolean }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isActive) {
      const t = setTimeout(() => setOpen(true), 500);
      return () => clearTimeout(t);
    }
    setOpen(false);
  }, [isActive]);

  return (
    <div className="w-full h-full flex items-center justify-center p-2" style={{ perspective: "700px" }}>
      <div className="relative" style={{ width: 150, height: 160, transformStyle: "preserve-3d" }}>
        {/* 3D depth edges */}
        <div style={{ position: "absolute", top: 8, right: -1, width: D, height: 144,
          background: side, borderRadius: "0 3px 3px 0",
          transformOrigin: "left center", transform: "rotateY(-90deg)" }} />
        <div style={{ position: "absolute", top: 8, left: -1, width: D, height: 144,
          background: side, borderRadius: "3px 0 0 3px",
          transformOrigin: "right center", transform: "rotateY(90deg)" }} />
        <div style={{ position: "absolute", bottom: -1, left: 8, width: 134, height: D,
          background: "linear-gradient(90deg, #5a2e1e, #3d1f10, #5a2e1e)",
          transformOrigin: "center top", transform: "rotateX(90deg)" }} />

        {/* Box body */}
        <div className="absolute inset-0 rounded-xl" style={{
          background: wood, border: "2px solid #3d1f10",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 16px 40px -8px rgba(0,0,0,0.45)",
          transform: `translateZ(${D / 2}px)`,
        }}>
          <div className="absolute inset-0 rounded-xl" style={{ background: grain }} />
          {/* Maroon cushion */}
          <div className="absolute rounded-lg" style={{
            top: 8, left: 8, right: 8, bottom: 8,
            background: "radial-gradient(ellipse at 38% 32%, #5a1a25, #3a0e15 50%, #2a0810)",
            boxShadow: "inset 0 3px 10px rgba(0,0,0,0.6), inset 0 -1px 3px rgba(255,255,255,0.02)",
            opacity: open ? 1 : 0, transition: "opacity 0.8s ease 0.3s",
          }} />
          {/* Medal SVG */}
          <MedalSvg visible={open} />
          {/* Metal hinges */}
          {[35, 115].map((x, i) => (
            <div key={i} className="absolute" style={{
              top: 3, left: x - 8, width: 16, height: 6,
              background: "linear-gradient(90deg, #8a6518, #c89820, #8a6518)",
              borderRadius: 1, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15)",
            }} />
          ))}
        </div>

        {/* Lid */}
        <div className="absolute inset-0 rounded-xl" style={{
          background: wood, border: "2px solid #3d1f10",
          transformOrigin: "top center",
          transform: open
            ? `perspective(700px) rotateX(-75deg) translateZ(${D / 2}px)`
            : `translateZ(${D / 2 + 1}px)`,
          transition: "transform 1.8s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: open
            ? "0 -6px 20px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.06)"
            : "0 4px 12px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}>
          <div className="absolute inset-0 rounded-xl" style={{ background: grain }} />
          <div className="absolute inset-[5px] rounded-lg" style={{ border: "1px solid rgba(255,255,255,0.03)" }} />
          {/* Metal clasp */}
          <div className="absolute" style={{
            bottom: 6, left: "50%", transform: "translateX(-50%)",
            width: 18, height: 10, borderRadius: 2,
            background: "linear-gradient(180deg, #d4a830, #8a6518)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.25), 0 1px 2px rgba(0,0,0,0.3)",
          }}>
            <div className="absolute" style={{
              top: 3, left: "50%", transform: "translateX(-50%)",
              width: 6, height: 4, borderRadius: 1, background: "#6b4e10",
            }} />
          </div>
        </div>
      </div>
    </div>
  );
};

/* Extracted medal SVG to stay under 200-line limit */
const MedalSvg = ({ visible }: { visible: boolean }) => (
  <svg viewBox="0 0 120 142" className="absolute" style={{
    top: 4, left: 15, width: 120, height: 142,
    opacity: visible ? 1 : 0, transition: "opacity 1s ease 0.5s",
    filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.5))",
  }}>
    <defs>
      <radialGradient id="mbody" cx="35%" cy="30%">
        <stop offset="0%" stopColor="#e8c84e" /><stop offset="35%" stopColor="#d4a830" />
        <stop offset="70%" stopColor="#a07820" /><stop offset="100%" stopColor="#8a6518" />
      </radialGradient>
      <linearGradient id="mrim" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#d4a830" /><stop offset="50%" stopColor="#7a5810" />
        <stop offset="100%" stopColor="#c89820" />
      </linearGradient>
      <linearGradient id="mstar" x1="0.2" y1="0" x2="0.8" y2="1">
        <stop offset="0%" stopColor="#f5e070" /><stop offset="50%" stopColor="#c89820" />
        <stop offset="100%" stopColor="#8a6518" />
      </linearGradient>
      <radialGradient id="mglow" cx="50%" cy="50%">
        <stop offset="0%" stopColor="rgba(200,150,40,0.25)" /><stop offset="100%" stopColor="transparent" />
      </radialGradient>
    </defs>
    {/* Ribbon — Israeli blue-white-blue */}
    <rect x="40" y="0" width="5.5" height="52" fill="#1a4fcc" rx="0.5" />
    <rect x="45.5" y="0" width="9" height="52" fill="#eef0f5" />
    <rect x="54.5" y="0" width="5.5" height="52" fill="#1a4fcc" rx="0.5" />
    <polygon points="40,48 50,57 60,48 60,52 50,61 40,52" fill="#1a4fcc" />
    <polygon points="45.5,48 50,54 54.5,48 54.5,52 50,58 45.5,52" fill="#eef0f5" />
    <rect x="54" y="0" width="7" height="55" fill="rgba(0,0,0,0.08)" />
    {/* Ring connector */}
    <circle cx="50" cy="56" r="4.5" fill="none" stroke="#c89820" strokeWidth="2.5" />
    <circle cx="50" cy="56" r="4.5" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />
    {/* Medal glow on cushion */}
    <circle cx="50" cy="92" r="40" fill="url(#mglow)" />
    {/* Outer rim with depth */}
    <circle cx="50" cy="92" r="37" fill="url(#mrim)" />
    <circle cx="50" cy="92" r="37" fill="none" stroke="#5a4010" strokeWidth="0.5" />
    {/* Knurling marks */}
    {Array.from({ length: 54 }).map((_, i) => {
      const a = (i * 360 / 54) * Math.PI / 180;
      return <line key={i} x1={50 + 35 * Math.cos(a)} y1={92 + 35 * Math.sin(a)}
        x2={50 + 37 * Math.cos(a)} y2={92 + 37 * Math.sin(a)} stroke="#6b4e10" strokeWidth="0.4" opacity={0.5} />;
    })}
    {/* Inner medal body */}
    <circle cx="50" cy="92" r="33" fill="url(#mbody)" />
    <circle cx="50" cy="92" r="33" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
    {/* Decorative double ring */}
    <circle cx="50" cy="92" r="29" fill="none" stroke="#8a6518" strokeWidth="0.7" opacity={0.5} />
    <circle cx="50" cy="92" r="28.3" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.3" />
    {/* Accent dots */}
    {Array.from({ length: 10 }).map((_, i) => {
      const a = (i * 36) * Math.PI / 180;
      return <circle key={i} cx={50 + 26 * Math.cos(a)} cy={92 + 26 * Math.sin(a)}
        r="1" fill="#7a5810" opacity={0.35} />;
    })}
    {/* Star of David — two triangles with faceted light/shadow */}
    <path d="M50,76 L64,100 L36,100 Z" fill="url(#mstar)" stroke="#7a5810" strokeWidth="0.5" />
    <path d="M50,108 L36,84 L64,84 Z" fill="url(#mstar)" stroke="#7a5810" strokeWidth="0.5" />
    <path d="M50,108 L64,84 L50,92 Z" fill="rgba(0,0,0,0.12)" />
    <path d="M50,76 L64,100 L57,88 Z" fill="rgba(0,0,0,0.08)" />
    <path d="M50,76 L36,100 L43,88 Z" fill="rgba(255,255,255,0.14)" />
    <path d="M36,84 L50,108 L43,96 Z" fill="rgba(255,255,255,0.06)" />
    {/* Olive branches — left */}
    <path d="M28,97 Q34,91 37,83" fill="none" stroke="#7a5810" strokeWidth="0.8" />
    {[{ cx: 30, cy: 90, a: -20 }, { cx: 33, cy: 85, a: -30 }, { cx: 28, cy: 95, a: -8 }].map((l, i) => (
      <ellipse key={`l${i}`} cx={l.cx} cy={l.cy} rx="2.5" ry="4.5"
        fill={["#a07820", "#b8860b", "#9a7218"][i]}
        transform={`rotate(${l.a}, ${l.cx}, ${l.cy})`} opacity={0.55 + i * 0.05} />
    ))}
    <circle cx="28" cy="100" r="1.2" fill="#6b4e10" opacity={0.4} />
    {/* Olive branches — right */}
    <path d="M72,97 Q66,91 63,83" fill="none" stroke="#7a5810" strokeWidth="0.8" />
    {[{ cx: 70, cy: 90, a: 20 }, { cx: 67, cy: 85, a: 30 }, { cx: 72, cy: 95, a: 8 }].map((l, i) => (
      <ellipse key={`r${i}`} cx={l.cx} cy={l.cy} rx="2.5" ry="4.5"
        fill={["#a07820", "#b8860b", "#9a7218"][i]}
        transform={`rotate(${l.a}, ${l.cx}, ${l.cy})`} opacity={0.55 + i * 0.05} />
    ))}
    <circle cx="72" cy="100" r="1.2" fill="#6b4e10" opacity={0.4} />
    {/* Top highlight arc — light catching the rim */}
    <path d="M20,78 A37,37 0 0 1 80,78" fill="none" stroke="rgba(255,255,255,0.18)"
      strokeWidth="1.5" strokeLinecap="round" />
    <path d="M25,80 A34,34 0 0 1 75,80" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="2.5" />
    {/* Center accent */}
    <circle cx="50" cy="92" r="2" fill="rgba(255,255,255,0.12)" />
  </svg>
);
