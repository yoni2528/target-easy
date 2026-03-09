"use client";

import { useRef, useState, useCallback } from "react";

const CX = 80, CY = 72;
const rings = [
  { r: 38, fill: "#c89820" }, { r: 33, fill: "#f5ecd0" },
  { r: 28, fill: "#d4a830" }, { r: 23, fill: "#faf3e0" },
  { r: 18, fill: "#b8860b" }, { r: 13, fill: "#f5ecd0" },
  { r: 8, fill: "#c89820" },
];

/* Single laurel leaf — mirrored for right side via scale(-1,1) */
const Leaf = ({ x, y, angle }: { x: number; y: number; angle: number }) => (
  <path d={`M${x},${y} Q${x - 5},${y - 10} ${x},${y - 18} Q${x + 5},${y - 10} ${x},${y}`}
    fill="#d4a830" stroke="#b8860b" strokeWidth="0.5"
    transform={`rotate(${angle}, ${x}, ${y})`} />
);

/** 3: עצירת פיגוע נכונה — Golden trophy with parallax (target-diagram style) */
export const CrackingMedalVisual = ({ isActive }: { isActive: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [rot, setRot] = useState({ x: 0, y: 0 });

  const onMove = useCallback((e: React.MouseEvent) => {
    if (!isActive || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setRot({
      x: ((e.clientY - r.top) / r.height - 0.5) * -16,
      y: ((e.clientX - r.left) / r.width - 0.5) * 20,
    });
  }, [isActive]);

  return (
    <div ref={ref} className="w-full h-full flex items-center justify-center p-1 cursor-default"
      onMouseMove={onMove} onMouseLeave={() => setRot({ x: 0, y: 0 })}>
      <div style={{
        transform: `perspective(900px) rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
        transition: rot.x === 0 && rot.y === 0 ? "transform 0.4s ease-out" : "transform 0.08s linear",
        willChange: "transform",
        opacity: isActive ? 1 : 0,
        transitionProperty: "transform, opacity",
      }}>
        <svg viewBox="0 0 160 175" width="150" height="168" fill="none"
          style={{ filter: "drop-shadow(0 12px 28px rgba(180,130,20,0.2)) drop-shadow(0 4px 8px rgba(0,0,0,0.08))" }}>

          {/* Base — pedestal */}
          <ellipse cx={CX} cy="156" rx="34" ry="7" fill="#a07820" opacity={0.4} />
          <ellipse cx={CX} cy="150" rx="32" ry="6.5" fill="#c89820" />
          <rect x={CX - 32} y="144" width="64" height="6" fill="#d4a830" />
          <ellipse cx={CX} cy="144" rx="32" ry="6.5" fill="#e8c84e" />
          <line x1={CX - 32} y1="144" x2={CX + 32} y2="144" stroke="white" strokeWidth="0.5" opacity={0.15} />

          {/* Stem */}
          <path d={`M${CX - 7},144 L${CX - 5},120 L${CX + 5},120 L${CX + 7},144`} fill="#d4a830" />
          <path d={`M${CX - 12},120 Q${CX},126 ${CX + 12},120 L${CX + 5},114 Q${CX},116 ${CX - 5},114 Z`} fill="#e8c84e" />

          {/* Left laurel */}
          <Leaf x={42} y={56} angle={35} />
          <Leaf x={38} y={72} angle={25} />
          <Leaf x={36} y={88} angle={15} />
          <Leaf x={37} y={104} angle={5} />
          <Leaf x={42} y={118} angle={-8} />

          {/* Right laurel */}
          <Leaf x={118} y={56} angle={-35} />
          <Leaf x={122} y={72} angle={-25} />
          <Leaf x={124} y={88} angle={-15} />
          <Leaf x={123} y={104} angle={-5} />
          <Leaf x={118} y={118} angle={8} />

          {/* Center disc — concentric rings like target diagram */}
          <circle cx={CX} cy={CY} r="42" fill="#a07820" opacity={0.15} />
          {rings.map((ring, i) => (
            <circle key={i} cx={CX} cy={CY} r={ring.r} fill={ring.fill}
              stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
          ))}
          <circle cx={CX} cy={CY} r="3" fill="white" opacity={0.2} />

          {/* Crosshair lines on disc */}
          <line x1={CX - 40} y1={CY} x2={CX + 40} y2={CY} stroke="white" opacity={0.08} strokeWidth="0.6" />
          <line x1={CX} y1={CY - 40} x2={CX} y2={CY + 40} stroke="white" opacity={0.08} strokeWidth="0.6" />

          {/* Star overlay */}
          <path d={`M${CX},${CY - 16} L${CX + 5},${CY - 4} L${CX + 17},${CY - 4} L${CX + 8},${CY + 4} L${CX + 11},${CY + 16} L${CX},${CY + 9} L${CX - 11},${CY + 16} L${CX - 8},${CY + 4} L${CX - 17},${CY - 4} L${CX - 5},${CY - 4} Z`}
            fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
        </svg>
      </div>
    </div>
  );
};
