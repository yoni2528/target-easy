"use client";

import { useRef, useState, useEffect, useCallback } from "react";

/** 3: עצירת פיגוע נכונה — 3D trophy with parallax + cracking */
export const CrackingMedalVisual = ({ isActive }: { isActive: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [rot, setRot] = useState({ x: 0, y: 0 });
  const [crackLevel, setCrackLevel] = useState(0);

  const onMove = useCallback((e: React.MouseEvent) => {
    if (!isActive || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = ((e.clientY - r.top) / r.height - 0.5) * -20;
    const y = ((e.clientX - r.left) / r.width - 0.5) * 20;
    setRot({ x, y });
  }, [isActive]);

  useEffect(() => {
    if (!isActive) { setRot({ x: 0, y: 0 }); setCrackLevel(0); return; }
    const t1 = setTimeout(() => setCrackLevel(1), 700);
    const t2 = setTimeout(() => setCrackLevel(2), 1400);
    const t3 = setTimeout(() => setCrackLevel(3), 2100);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [isActive]);

  const cf = (level: number) => ({
    opacity: crackLevel >= level ? 1 : 0,
    transition: "opacity 0.6s ease",
  });

  return (
    <div ref={ref} className="w-full h-full flex items-center justify-center p-1 cursor-default"
      onMouseMove={onMove} onMouseLeave={() => setRot({ x: 0, y: 0 })}>
      <div style={{
        transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
        transition: rot.x === 0 && rot.y === 0 ? "transform 0.4s ease-out" : "transform 0.08s linear",
        willChange: "transform",
      }}>
        <svg viewBox="0 0 160 190" width="145" height="175" fill="none">
          <defs>
            <linearGradient id="trophyGold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f5de6c" />
              <stop offset="40%" stopColor="#e8c84e" />
              <stop offset="100%" stopColor="#c8a030" />
            </linearGradient>
            <linearGradient id="trophyDark" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d4a830" />
              <stop offset="100%" stopColor="#a07820" />
            </linearGradient>
            <radialGradient id="trophyShine" cx="0.35" cy="0.3" r="0.6">
              <stop offset="0%" stopColor="white" stopOpacity={0.4} />
              <stop offset="100%" stopColor="white" stopOpacity={0} />
            </radialGradient>
          </defs>

          {/* Base — bottom cylinder */}
          <ellipse cx="80" cy="162" rx="38" ry="8" fill="url(#trophyDark)" />
          <rect x="42" y="152" width="76" height="10" fill="url(#trophyGold)" />
          <ellipse cx="80" cy="152" rx="38" ry="8" fill="url(#trophyGold)" />
          <ellipse cx="80" cy="152" rx="38" ry="8" fill="url(#trophyShine)" />

          {/* Stem */}
          <rect x="72" y="118" width="16" height="36" rx="3" fill="url(#trophyGold)" />
          <rect x="72" y="118" width="16" height="36" rx="3" fill="url(#trophyShine)" />
          {/* Stem flare top */}
          <path d="M68 118 Q80 124 92 118 L88 112 Q80 116 72 112 Z" fill="url(#trophyGold)" />

          {/* Left laurel wreath */}
          {[0, 1, 2, 3, 4, 5].map(i => (
            <ellipse key={`ll${i}`} cx={46 - i * 1.5} cy={55 + i * 14} rx="7" ry="12"
              fill="url(#trophyGold)" stroke="#c8a030" strokeWidth="0.5"
              transform={`rotate(${30 + i * 8}, ${46 - i * 1.5}, ${55 + i * 14})`} />
          ))}
          {/* Right laurel wreath */}
          {[0, 1, 2, 3, 4, 5].map(i => (
            <ellipse key={`rl${i}`} cx={114 + i * 1.5} cy={55 + i * 14} rx="7" ry="12"
              fill="url(#trophyGold)" stroke="#c8a030" strokeWidth="0.5"
              transform={`rotate(${-30 - i * 8}, ${114 + i * 1.5}, ${55 + i * 14})`} />
          ))}

          {/* Main disc */}
          <circle cx="80" cy="68" r="40" fill="url(#trophyGold)" stroke="#b8942d" strokeWidth="2.5" />
          <circle cx="80" cy="68" r="40" fill="url(#trophyShine)" />
          <circle cx="80" cy="68" r="33" fill="none" stroke="#d4b44a" strokeWidth="1.5" opacity={0.6} />
          <circle cx="80" cy="68" r="30" fill="none" stroke="#d4b44a" strokeWidth="0.5" opacity={0.3} />

          {/* Star in center */}
          <path d="M80 42 L87 58 L104 58 L90 68 L95 85 L80 75 L65 85 L70 68 L56 58 L73 58 Z"
            fill="#e8c84e" stroke="#d4a830" strokeWidth="1" />

          {/* Crack 1 — upper left of disc */}
          <g style={cf(1)}>
            <line x1="58" y1="50" x2="42" y2="34" stroke="var(--accent-red)" strokeWidth="2" strokeLinecap="round" />
            <line x1="42" y1="34" x2="34" y2="28" stroke="var(--accent-red)" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="42" y1="34" x2="36" y2="40" stroke="var(--accent-red)" strokeWidth="0.8" strokeLinecap="round" />
          </g>

          {/* Crack 2 — right side of disc */}
          <g style={cf(2)}>
            <line x1="106" y1="58" x2="124" y2="44" stroke="var(--accent-red)" strokeWidth="2" strokeLinecap="round" />
            <line x1="124" y1="44" x2="132" y2="38" stroke="var(--accent-red)" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="124" y1="44" x2="130" y2="52" stroke="var(--accent-red)" strokeWidth="0.8" strokeLinecap="round" />
          </g>

          {/* Crack 3 — bottom of disc */}
          <g style={cf(3)}>
            <line x1="72" y1="92" x2="60" y2="108" stroke="var(--accent-red)" strokeWidth="2" strokeLinecap="round" />
            <line x1="60" y1="108" x2="52" y2="116" stroke="var(--accent-red)" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="60" y1="108" x2="68" y2="114" stroke="var(--accent-red)" strokeWidth="0.8" strokeLinecap="round" />
          </g>

          {/* Price tag */}
          <g style={{ ...cf(3), transform: crackLevel >= 3 ? "translateY(0)" : "translateY(-4px)", transition: "all 0.6s ease" }}>
            <rect x="96" y="164" width="58" height="22" rx="11" fill="var(--accent-red)" opacity={0.1} stroke="var(--accent-red)" strokeWidth="1" />
            <text x="125" y="179" textAnchor="middle" fontSize="10" fontWeight="900" fill="var(--accent-red)">₪65K+</text>
          </g>
        </svg>
      </div>
    </div>
  );
};
