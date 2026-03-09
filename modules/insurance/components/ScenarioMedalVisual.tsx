"use client";

/** 3: עצירת פיגוע נכונה — Spinning military medal of valor */
export const CrackingMedalVisual = ({ isActive }: { isActive: boolean }) => (
  <div className="w-full h-full flex items-center justify-center p-1">
    <div style={{
      opacity: isActive ? 1 : 0, transition: "opacity 0.5s ease",
      animation: isActive ? "medal-spin 4s linear infinite" : "none",
    }}>
      <svg viewBox="0 0 120 142" width="130" height="155" fill="none"
        style={{ filter: "drop-shadow(0 8px 20px rgba(180,130,20,0.25)) drop-shadow(0 3px 6px rgba(0,0,0,0.12))" }}>
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
        {/* Top highlight arc */}
        <path d="M20,78 A37,37 0 0 1 80,78" fill="none" stroke="rgba(255,255,255,0.18)"
          strokeWidth="1.5" strokeLinecap="round" />
        <path d="M25,80 A34,34 0 0 1 75,80" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="2.5" />
        {/* Center accent */}
        <circle cx="50" cy="92" r="2" fill="rgba(255,255,255,0.12)" />
      </svg>
    </div>
    <style>{`
      @keyframes medal-spin {
        from { transform: rotateY(0deg); }
        to { transform: rotateY(360deg); }
      }
    `}</style>
  </div>
);
