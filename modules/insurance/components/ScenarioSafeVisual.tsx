"use client";

import { useState, useEffect } from "react";

const D = 14;

const Wheel = ({ angle, speed }: { angle: number; speed: number }) => (
  <svg viewBox="0 0 70 70" className="w-16 h-16" style={{
    transform: `rotate(${angle}deg)`,
    transition: `transform ${speed}s cubic-bezier(0.4, 0, 0.2, 1)`,
    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
  }}>
    <defs>
      <radialGradient id="safe-hub" cx="50%" cy="40%">
        <stop offset="0%" stopColor="#3a4a65" />
        <stop offset="100%" stopColor="#1e2a42" />
      </radialGradient>
    </defs>
    <circle cx="35" cy="35" r="32" fill="none" stroke="#2a3a55" strokeWidth="3" />
    <circle cx="35" cy="35" r="30.5" fill="none" stroke="#162038" strokeWidth="1" />
    {[0, 60, 120, 180, 240, 300].map(a => {
      const r = a * Math.PI / 180;
      const ex = 35 + 27 * Math.cos(r), ey = 35 + 27 * Math.sin(r);
      return (
        <g key={a}>
          <line x1="35" y1="35" x2={ex} y2={ey} stroke="#2a3a55" strokeWidth="5" strokeLinecap="round" />
          <line x1="35" y1="35" x2={ex} y2={ey} stroke="#3a4a68" strokeWidth="3" strokeLinecap="round" />
          <circle cx={ex} cy={ey} r="2.5" fill="#2a3a55" stroke="#1e2a42" strokeWidth="0.5" />
        </g>
      );
    })}
    <circle cx="35" cy="35" r="11" fill="url(#safe-hub)" stroke="#162038" strokeWidth="1.5" />
    <circle cx="35" cy="35" r="4.5" fill="#2a3a50" stroke="#1e2a42" strokeWidth="1" />
    <circle cx="33" cy="33" r="1.5" fill="rgba(255,255,255,0.08)" />
  </svg>
);

const brushed = "repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.008) 2px, rgba(255,255,255,0.008) 3px)";
const edgeGrad = "linear-gradient(180deg, #2a3548 0%, #1a2538 40%, #1e2a40 60%, #2a3548 100%)";

/** 5: גניבת נשק — 3D safe with depth edges, hinges, bolts */
export const BrokenSafeVisual = ({ isActive }: { isActive: boolean }) => {
  const [wheelAngle, setWheelAngle] = useState(0);
  const [wheelSpeed, setWheelSpeed] = useState(0);
  const [doorOpen, setDoorOpen] = useState(false);

  useEffect(() => {
    if (isActive) {
      // Wheel: full turn forward (1.5s)
      const t1 = setTimeout(() => { setWheelSpeed(1.5); setWheelAngle(360); }, 400);
      // Wheel: half turn back (1s)
      const t2 = setTimeout(() => { setWheelSpeed(1); setWheelAngle(180); }, 2000);
      // Wheel: half turn forward (1s)
      const t3 = setTimeout(() => { setWheelSpeed(1); setWheelAngle(360); }, 3100);
      // Door opens (slow 2.4s transition)
      const t4 = setTimeout(() => setDoorOpen(true), 4200);
      return () => { [t1, t2, t3, t4].forEach(clearTimeout); };
    }
    setWheelAngle(0);
    setWheelSpeed(0);
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
          background: "linear-gradient(90deg, #2a3548, #1e2a40, #2a3548)",
          borderRadius: "3px 3px 0 0", transformOrigin: "center bottom", transform: "rotateX(-90deg)" }} />
        <div style={{ position: "absolute", bottom: -1, left: 10, width: 120, height: D,
          background: "linear-gradient(90deg, #2a3548, #1a2538, #2a3548)",
          borderRadius: "0 0 3px 3px", transformOrigin: "center top", transform: "rotateX(90deg)" }} />

        {/* Safe body front */}
        <div className="absolute inset-0 rounded-xl" style={{
          background: "linear-gradient(160deg, #1e2a42 0%, #162038 50%, #0e1828 100%)",
          border: "2px solid #1a2a40",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05), 0 16px 40px -8px rgba(0,0,0,0.4)",
          transform: `translateZ(${D / 2}px)`,
        }}>
          <div className="absolute inset-0 rounded-xl" style={{ background: brushed }} />
          {/* Interior — SVG shadow-box with perspective trapezoids */}
          <svg viewBox="0 0 124 134" className="absolute rounded-lg"
            style={{ top: 8, left: 8, width: 124, height: 134,
              opacity: doorOpen ? 1 : 0, transition: "opacity 0.8s ease 0.5s" }}>
            <defs>
              <radialGradient id="safe-glow" cx="50%" cy="55%">
                <stop offset="0%" stopColor="rgba(200,150,40,0.22)" />
                <stop offset="50%" stopColor="rgba(200,150,40,0.05)" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>
            {/* Back wall */}
            <rect x="20" y="20" width="84" height="94" rx="2" fill="#16162a" />
            {/* Ceiling */}
            <polygon points="0,0 124,0 104,20 20,20" fill="#08080f" />
            {/* Floor */}
            <polygon points="20,114 104,114 124,134 0,134" fill="#0c0c18" />
            {/* Left wall */}
            <polygon points="0,0 20,20 20,114 0,134" fill="#0a0a15" />
            {/* Right wall */}
            <polygon points="124,0 124,134 104,114 104,20" fill="#0e0e1a" />
            {/* Edge highlights */}
            <line x1="20" y1="20" x2="104" y2="20" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
            <line x1="20" y1="20" x2="20" y2="114" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
            <line x1="104" y1="20" x2="104" y2="114" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
            {/* Golden glow on back wall */}
            <rect x="20" y="20" width="84" height="94" fill="url(#safe-glow)" />
            {/* Floor reflection */}
            <polygon points="20,114 104,114 124,134 0,134" fill="rgba(200,150,40,0.04)" />
          </svg>
          {/* Hinges on right side */}
          {[25, 75, 125].map((y, i) => (
            <div key={i} className="absolute" style={{
              right: 4, top: y - 6, width: 8, height: 12,
              background: "linear-gradient(90deg, #2a3a55, #3a4a65, #2a3a55)",
              borderRadius: 2, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)",
            }} />
          ))}
        </div>

        {/* Door */}
        <div className="absolute inset-0 rounded-xl" style={{
          background: "linear-gradient(160deg, #2a3a55 0%, #1e3048 40%, #182840 100%)",
          border: "2px solid #2a3550",
          transformOrigin: "right center",
          transform: doorOpen
            ? `perspective(700px) rotateY(-65deg) translateZ(${D / 2}px)`
            : `translateZ(${D / 2 + 1}px)`,
          transition: "transform 2.4s cubic-bezier(0.4, 0, 0.2, 1)",
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
              background: "linear-gradient(180deg, #3a4a65, #2a3a55)",
              borderRadius: 1, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
            }} />
          ))}
          <div className="w-full h-full flex items-center justify-center">
            <Wheel angle={wheelAngle} speed={wheelSpeed} />
          </div>
        </div>

      </div>
    </div>
  );
};
