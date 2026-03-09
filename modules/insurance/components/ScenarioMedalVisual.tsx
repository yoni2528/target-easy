"use client";

/** 3: עצירת פיגוע נכונה — Spinning shield with Star of David */
export const CrackingMedalVisual = ({ isActive }: { isActive: boolean }) => (
  <div className="w-full h-full flex items-center justify-center p-1">
    <div style={{
      animation: "shield-spin 4s linear infinite",
    }}>
      <svg viewBox="0 0 120 150" width="135" height="168" fill="none"
        style={{ filter: "drop-shadow(0 10px 24px rgba(20,60,140,0.3)) drop-shadow(0 3px 6px rgba(0,0,0,0.15))" }}>
        <defs>
          <linearGradient id="sh-body" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2a6dd4" /><stop offset="40%" stopColor="#1a4faa" />
            <stop offset="100%" stopColor="#0e3878" />
          </linearGradient>
          <linearGradient id="sh-rim" x1="0" y1="0" x2="0.8" y2="1">
            <stop offset="0%" stopColor="#c0cfe8" /><stop offset="50%" stopColor="#8a9fc0" />
            <stop offset="100%" stopColor="#607898" />
          </linearGradient>
          <linearGradient id="sh-star" x1="0.2" y1="0" x2="0.7" y2="1">
            <stop offset="0%" stopColor="#f0f4ff" /><stop offset="50%" stopColor="#d0ddf0" />
            <stop offset="100%" stopColor="#8aa0c0" />
          </linearGradient>
          <linearGradient id="sh-band" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e8eef8" /><stop offset="100%" stopColor="#b0c0d8" />
          </linearGradient>
        </defs>
        {/* Shield shape — outer rim (silver/steel) */}
        <path d="M60,8 C28,8 10,18 10,18 L10,62 C10,95 35,125 60,142 C85,125 110,95 110,62 L110,18 C110,18 92,8 60,8 Z"
          fill="url(#sh-rim)" />
        {/* Inner shield body (blue) */}
        <path d="M60,15 C32,15 17,23 17,23 L17,62 C17,91 39,118 60,133 C81,118 103,91 103,62 L103,23 C103,23 88,15 60,15 Z"
          fill="url(#sh-body)" />
        {/* Blue field highlight — top-left light source */}
        <path d="M60,15 C32,15 17,23 17,23 L17,62 C17,75 22,88 30,100 L60,50 L45,20 C50,16 55,15 60,15 Z"
          fill="rgba(255,255,255,0.08)" />
        {/* Horizontal white band (Israeli flag style) */}
        <path d="M17,52 L103,52 L103,62 C103,65 102,68 101,71 L19,71 C18,68 17,65 17,62 Z"
          fill="url(#sh-band)" opacity={0.35} />
        <path d="M20,82 L100,82 L100,92 C98,96 95,100 92,104 L28,104 C25,100 22,96 20,92 Z"
          fill="url(#sh-band)" opacity={0.35} />
        {/* Star of David */}
        <path d="M60,48 L72,68 L48,68 Z" fill="url(#sh-star)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
        <path d="M60,88 L48,68 L72,68 Z" fill="url(#sh-star)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
        {/* Star facet shadows */}
        <path d="M60,88 L72,68 L60,75 Z" fill="rgba(0,0,0,0.15)" />
        <path d="M72,68 L60,48 L66,58 Z" fill="rgba(0,0,0,0.1)" />
        {/* Star facet highlights */}
        <path d="M60,48 L48,68 L54,58 Z" fill="rgba(255,255,255,0.2)" />
        <path d="M48,68 L60,88 L54,78 Z" fill="rgba(255,255,255,0.08)" />
        {/* Olive branches — left */}
        <path d="M32,78 Q40,72 44,64" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />
        {[{ cx: 35, cy: 72, a: -22 }, { cx: 38, cy: 67, a: -32 }, { cx: 33, cy: 77, a: -10 }].map((l, i) => (
          <ellipse key={`l${i}`} cx={l.cx} cy={l.cy} rx="2.2" ry="4"
            fill="rgba(255,255,255,0.15)" transform={`rotate(${l.a}, ${l.cx}, ${l.cy})`} />
        ))}
        {/* Olive branches — right */}
        <path d="M88,78 Q80,72 76,64" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />
        {[{ cx: 85, cy: 72, a: 22 }, { cx: 82, cy: 67, a: 32 }, { cx: 87, cy: 77, a: 10 }].map((l, i) => (
          <ellipse key={`r${i}`} cx={l.cx} cy={l.cy} rx="2.2" ry="4"
            fill="rgba(255,255,255,0.15)" transform={`rotate(${l.a}, ${l.cx}, ${l.cy})`} />
        ))}
        {/* Rim highlight — top edge catching light */}
        <path d="M30,12 C45,9 75,9 90,12" fill="none" stroke="rgba(255,255,255,0.4)"
          strokeWidth="1.5" strokeLinecap="round" />
        {/* Inner border line */}
        <path d="M60,15 C32,15 17,23 17,23 L17,62 C17,91 39,118 60,133 C81,118 103,91 103,62 L103,23 C103,23 88,15 60,15 Z"
          fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" />
        {/* Bottom point accent */}
        <circle cx="60" cy="130" r="2" fill="rgba(255,255,255,0.15)" />
        {/* Rivets on rim */}
        {[{ x: 18, y: 35 }, { x: 18, y: 55 }, { x: 102, y: 35 }, { x: 102, y: 55 },
          { x: 35, y: 12 }, { x: 85, y: 12 }].map((r, i) => (
          <g key={i}>
            <circle cx={r.x} cy={r.y} r="2" fill="#8a9fc0" />
            <circle cx={r.x} cy={r.y} r="2" fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth="0.3" />
            <circle cx={r.x - 0.5} cy={r.y - 0.5} r="0.8" fill="rgba(255,255,255,0.3)" />
          </g>
        ))}
      </svg>
    </div>
    <style>{`
      @keyframes shield-spin {
        from { transform: rotateY(0deg); }
        to { transform: rotateY(360deg); }
      }
    `}</style>
  </div>
);
