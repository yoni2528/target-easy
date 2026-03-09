"use client";

import { useState, useEffect } from "react";

const D = 14;

const Wheel = ({ open }: { open: boolean }) => (
  <svg viewBox="0 0 70 70" className="w-16 h-16" style={{
    transform: open ? "rotate(45deg)" : "rotate(0deg)",
    transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
  }}>
    <defs>
      <radialGradient id="safe-hub" cx="50%" cy="40%">
        <stop offset="0%" stopColor="#4a4a60" />
        <stop offset="100%" stopColor="#2a2a3e" />
      </radialGradient>
    </defs>
    <circle cx="35" cy="35" r="32" fill="none" stroke="#3a3a50" strokeWidth="3" />
    <circle cx="35" cy="35" r="30.5" fill="none" stroke="#1e1e2e" strokeWidth="1" />
    {[0, 60, 120, 180, 240, 300].map(a => {
      const r = a * Math.PI / 180;
      const ex = 35 + 27 * Math.cos(r), ey = 35 + 27 * Math.sin(r);
      return (
        <g key={a}>
          <line x1="35" y1="35" x2={ex} y2={ey} stroke="#3a3a50" strokeWidth="5" strokeLinecap="round" />
          <line x1="35" y1="35" x2={ex} y2={ey} stroke="#4a4a65" strokeWidth="3" strokeLinecap="round" />
          <circle cx={ex} cy={ey} r="2.5" fill="#3a3a50" stroke="#2a2a3e" strokeWidth="0.5" />
        </g>
      );
    })}
    <circle cx="35" cy="35" r="11" fill="url(#safe-hub)" stroke="#1e1e2e" strokeWidth="1.5" />
    <circle cx="35" cy="35" r="4.5" fill="#3a3a4e" stroke="#2a2a3e" strokeWidth="1" />
    <circle cx="33" cy="33" r="1.5" fill="rgba(255,255,255,0.08)" />
  </svg>
);

const brushed = "repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.008) 2px, rgba(255,255,255,0.008) 3px)";
const edgeGrad = "linear-gradient(180deg, #3a3a4e 0%, #25253a 40%, #2a2a3e 60%, #3a3a4e 100%)";

/** 5: גניבת נשק — 3D safe with depth edges, hinges, bolts */
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
    <div className="w-full h-full flex items-center justify-center p-2" style={{ perspective: "700px" }}>
      <div className="relative" style={{ width: 140, height: 150, transformStyle: "preserve-3d" }}>

        {/* 3D depth edges */}
        <div style={{ position: "absolute", top: 10, right: -1, width: D, height: 130,
          background: edgeGrad, borderRadius: "0 3px 3px 0",
          transformOrigin: "left center", transform: "rotateY(-90deg)" }} />
        <div style={{ position: "absolute", top: 10, left: -1, width: D, height: 130,
          background: edgeGrad, borderRadius: "3px 0 0 3px",
          transformOrigin: "right center", transform: "rotateY(90deg)" }} />
        <div style={{ position: "absolute", top: -1, left: 10, width: 120, height: D,
          background: "linear-gradient(90deg, #3a3a4e, #2a2a3e, #3a3a4e)",
          borderRadius: "3px 3px 0 0", transformOrigin: "center bottom", transform: "rotateX(-90deg)" }} />
        <div style={{ position: "absolute", bottom: -1, left: 10, width: 120, height: D,
          background: "linear-gradient(90deg, #3a3a4e, #25253a, #3a3a4e)",
          borderRadius: "0 0 3px 3px", transformOrigin: "center top", transform: "rotateX(90deg)" }} />

        {/* Safe body front */}
        <div className="absolute inset-0 rounded-xl" style={{
          background: "linear-gradient(160deg, #35354a 0%, #25253a 50%, #1e1e30 100%)",
          border: "2px solid #2a2a40",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05), 0 16px 40px -8px rgba(0,0,0,0.4)",
          transform: `translateZ(${D / 2}px)`,
        }}>
          <div className="absolute inset-0 rounded-xl" style={{ background: brushed }} />
          {/* Interior — deep box with visible walls */}
          <div className="absolute inset-[6px] rounded-lg overflow-hidden" style={{
            background: "#0e0e18",
            boxShadow: "inset 0 4px 16px rgba(0,0,0,0.8)",
            opacity: doorOpen ? 1 : 0, transition: "opacity 0.5s ease 0.3s",
          }}>
            {/* Back wall */}
            <div className="absolute inset-[8px] rounded" style={{
              background: "linear-gradient(180deg, #12121e 0%, #16162a 50%, #14141f 100%)",
              boxShadow: "inset 0 0 12px rgba(0,0,0,0.5)",
            }} />
            {/* Top inner wall — dark ceiling */}
            <div className="absolute top-0 left-0 right-0 h-[8px]" style={{
              background: "linear-gradient(180deg, #0a0a14, #10101c)",
            }} />
            {/* Bottom inner wall — floor with subtle reflection */}
            <div className="absolute bottom-0 left-0 right-0 h-[8px]" style={{
              background: "linear-gradient(0deg, #0c0c16, #10101c)",
            }}>
              <div className="w-full h-full" style={{
                background: "linear-gradient(0deg, rgba(200,150,40,0.08), transparent)",
              }} />
            </div>
            {/* Left inner wall */}
            <div className="absolute top-0 bottom-0 left-0 w-[8px]" style={{
              background: "linear-gradient(90deg, #0a0a14, #10101c)",
            }} />
            {/* Right inner wall */}
            <div className="absolute top-0 bottom-0 right-0 w-[8px]" style={{
              background: "linear-gradient(-90deg, #0a0a14, #10101c)",
            }} />
            {/* Golden ambient glow */}
            <div className="absolute inset-0" style={{
              background: "radial-gradient(ellipse at 50% 60%, rgba(200,150,40,0.2) 0%, rgba(200,150,40,0.04) 45%, transparent 75%)",
              opacity: doorOpen ? 1 : 0, transition: "opacity 0.8s ease 0.6s",
            }} />
            {/* Corner shadow lines */}
            <div className="absolute top-[7px] left-[7px] right-[7px] h-[1px]" style={{ background: "rgba(0,0,0,0.4)" }} />
            <div className="absolute bottom-[7px] left-[7px] right-[7px] h-[1px]" style={{ background: "rgba(0,0,0,0.3)" }} />
            <div className="absolute top-[7px] bottom-[7px] left-[7px] w-[1px]" style={{ background: "rgba(0,0,0,0.4)" }} />
            <div className="absolute top-[7px] bottom-[7px] right-[7px] w-[1px]" style={{ background: "rgba(0,0,0,0.3)" }} />
          </div>
          {/* Hinges on right side */}
          {[25, 75, 125].map((y, i) => (
            <div key={i} className="absolute" style={{
              right: 4, top: y - 6, width: 8, height: 12,
              background: "linear-gradient(90deg, #3a3a50, #4a4a60, #3a3a50)",
              borderRadius: 2, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)",
            }} />
          ))}
        </div>

        {/* Door */}
        <div className="absolute inset-0 rounded-xl" style={{
          background: "linear-gradient(160deg, #40405a 0%, #30304a 40%, #28283e 100%)",
          border: "2px solid #3a3a50",
          transformOrigin: "right center",
          transform: doorOpen
            ? `perspective(700px) rotateY(-65deg) translateZ(${D / 2}px)`
            : `translateZ(${D / 2 + 1}px)`,
          transition: "transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: doorOpen
            ? "8px 0 25px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)"
            : "0 4px 12px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}>
          <div className="absolute inset-0 rounded-xl" style={{ background: brushed }} />
          <div className="absolute inset-[5px] rounded-lg" style={{ border: "1px solid rgba(255,255,255,0.04)" }} />
          {/* Locking bolts on left edge */}
          {[30, 75, 120].map((y, i) => (
            <div key={i} className="absolute" style={{
              left: 4, top: y - 3, width: 12, height: 6,
              background: "linear-gradient(180deg, #4a4a60, #3a3a50)",
              borderRadius: 1, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
            }} />
          ))}
          <div className="w-full h-full flex items-center justify-center">
            <Wheel open={doorOpen} />
          </div>
        </div>

      </div>
    </div>
  );
};
