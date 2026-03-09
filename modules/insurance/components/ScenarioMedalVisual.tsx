"use client";

import { useRef, useState, useEffect, useCallback } from "react";

/** 3: עצירת פיגוע נכונה — 3D medal with parallax + cracking */
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

  const crackFade = (level: number) => ({
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
        <svg viewBox="0 0 160 185" width="145" height="170" fill="none">
          <defs>
            <linearGradient id="scenMedalGold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f5de6c" />
              <stop offset="45%" stopColor="#e8c84e" />
              <stop offset="100%" stopColor="#c8a030" />
            </linearGradient>
            <radialGradient id="scenMedalShine" cx="0.35" cy="0.3" r="0.65">
              <stop offset="0%" stopColor="white" stopOpacity={0.35} />
              <stop offset="100%" stopColor="white" stopOpacity={0} />
            </radialGradient>
          </defs>

          {/* Ribbon tails */}
          <path d="M58 128 L46 168 L62 154 L72 168 L68 128" fill="#c8a84e" opacity={0.65} />
          <path d="M92 128 L88 168 L98 154 L114 168 L102 128" fill="#c8a84e" opacity={0.65} />

          {/* Medal circle */}
          <circle cx="80" cy="78" r="54" fill="url(#scenMedalGold)" stroke="#b8942d" strokeWidth="2.5" />
          <circle cx="80" cy="78" r="54" fill="url(#scenMedalShine)" />
          <circle cx="80" cy="78" r="46" fill="none" stroke="#d4b44a" strokeWidth="1" opacity={0.5} />

          {/* Star */}
          <path d="M80 42 L88 64 L112 64 L93 78 L100 100 L80 87 L60 100 L67 78 L48 64 L72 64 Z"
            fill="#e8c84e" stroke="#d4a830" strokeWidth="1" />

          {/* Text */}
          <text x="80" y="122" textAnchor="middle" fontSize="9" fill="#8a7530" fontWeight="bold">אות הצטיינות</text>

          {/* Crack 1 — upper left */}
          <g style={crackFade(1)}>
            <line x1="58" y1="52" x2="42" y2="36" stroke="var(--accent-red)" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="42" y1="36" x2="35" y2="28" stroke="var(--accent-red)" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="42" y1="36" x2="36" y2="42" stroke="var(--accent-red)" strokeWidth="0.8" strokeLinecap="round" />
          </g>

          {/* Crack 2 — right side */}
          <g style={crackFade(2)}>
            <line x1="104" y1="66" x2="122" y2="50" stroke="var(--accent-red)" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="122" y1="50" x2="130" y2="44" stroke="var(--accent-red)" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="122" y1="50" x2="128" y2="58" stroke="var(--accent-red)" strokeWidth="0.8" strokeLinecap="round" />
          </g>

          {/* Crack 3 — bottom + price tag */}
          <g style={crackFade(3)}>
            <line x1="72" y1="98" x2="60" y2="118" stroke="var(--accent-red)" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="60" y1="118" x2="52" y2="128" stroke="var(--accent-red)" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="60" y1="118" x2="68" y2="124" stroke="var(--accent-red)" strokeWidth="0.8" strokeLinecap="round" />
          </g>

          {/* Price tag appears at end */}
          <g style={{ ...crackFade(3), transform: crackLevel >= 3 ? "translateY(0)" : "translateY(-4px)", transition: "all 0.6s ease" }}>
            <rect x="95" y="148" width="58" height="24" rx="12" fill="var(--accent-red)" opacity={0.1} stroke="var(--accent-red)" strokeWidth="1" />
            <text x="124" y="164" textAnchor="middle" fontSize="10" fontWeight="900" fill="var(--accent-red)">₪65K+</text>
          </g>
        </svg>
      </div>
    </div>
  );
};
