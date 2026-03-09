"use client";

const fade = (active: boolean, delay: number) => ({
  opacity: active ? 1 : 0,
  transform: active ? "translateY(0)" : "translateY(4px)",
  transition: `all 0.5s ease ${delay}s`,
});

const targetRings = [
  { r: 84, fill: "#1a6fcc" }, { r: 73, fill: "#dce9f7" },
  { r: 62, fill: "#2580d8" }, { r: 50, fill: "#e6eff8" },
  { r: 39, fill: "#1560b8" }, { r: 28, fill: "#edf3fa" },
  { r: 17, fill: "#0e4e9e" },
];
const TX = 100, TY = 88;

/** 1: פליטת כדור — Blue target (matching TargetDiagram) with bullet holes */
export const BulletTargetVisual = ({ isActive }: { isActive: boolean }) => (
  <div className="w-full h-full flex items-center justify-center p-1">
    <svg viewBox="0 0 200 200" className="w-full h-full max-w-[190px]" fill="none"
      style={{ filter: "drop-shadow(0 12px 28px rgba(26,111,204,0.14)) drop-shadow(0 4px 8px rgba(0,0,0,0.06))" }}>
      {/* Shadow */}
      <ellipse cx={TX} cy={TY + 4} rx="88" ry="88" fill="#1254a0" opacity="0.15" />
      {/* Concentric rings — same as TargetDiagram */}
      {targetRings.map((ring, i) => (
        <circle key={i} cx={TX} cy={TY} r={ring.r} fill={ring.fill}
          stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />
      ))}
      <circle cx={TX} cy={TY} r="5" fill="#fff" opacity={0.15} />
      {/* Crosshair */}
      <line x1={TX - 88} y1={TY} x2={TX + 88} y2={TY} stroke="white" opacity="0.06" strokeWidth="0.8" />
      <line x1={TX} y1={TY - 88} x2={TX} y2={TY + 88} stroke="white" opacity="0.06" strokeWidth="0.8" />

      {/* Bullet hole 1 — outer white ring */}
      <g style={fade(isActive, 0.2)}>
        <circle cx="68" cy="60" r="4.5" fill="#1a1a2a" />
        <circle cx="68" cy="60" r="7.5" fill="none" stroke="#1a1a2a" strokeWidth="0.5" opacity={0.3} />
        <line x1="64" y1="56" x2="55" y2="47" stroke="#1a1a2a" strokeWidth="0.8" opacity={0.3} />
        <line x1="72" y1="56" x2="78" y2="48" stroke="#1a1a2a" strokeWidth="0.6" opacity={0.2} />
        <line x1="64" y1="64" x2="56" y2="72" stroke="#1a1a2a" strokeWidth="0.6" opacity={0.2} />
      </g>

      {/* Bullet hole 2 — middle blue ring */}
      <g style={fade(isActive, 0.45)}>
        <circle cx="130" cy="102" r="3.5" fill="#0a0a18" />
        <circle cx="130" cy="102" r="6" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.5" />
        <line x1="133" y1="105" x2="142" y2="114" stroke="rgba(255,255,255,0.2)" strokeWidth="0.7" />
        <line x1="126" y1="105" x2="120" y2="112" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
      </g>

      {/* Bullet hole 3 — near center, red accent */}
      <g style={fade(isActive, 0.7)}>
        <circle cx="95" cy="84" r="3.5" fill="var(--accent-red)" opacity={0.9} />
        <circle cx="95" cy="84" r="6" fill="none" stroke="var(--accent-red)" strokeWidth="0.6" opacity={0.4} />
        <line x1="92" y1="81" x2="82" y2="70" stroke="var(--accent-red)" strokeWidth="1" opacity={0.4} />
        <line x1="98" y1="80" x2="108" y2="70" stroke="var(--accent-red)" strokeWidth="0.8" opacity={0.3} />
        <line x1="92" y1="87" x2="80" y2="98" stroke="var(--accent-red)" strokeWidth="0.8" opacity={0.3} />
        <line x1="98" y1="88" x2="112" y2="95" stroke="var(--accent-red)" strokeWidth="0.7" opacity={0.25} />
      </g>

      {/* Damage pill */}
      <g style={fade(isActive, 1)}>
        <rect x="45" y="182" width="110" height="16" rx="8" fill="var(--accent-red)" opacity={0.08} stroke="var(--accent-red)" strokeWidth="0.8" />
        <text x="100" y="193" textAnchor="middle" fontSize="10" fontWeight="900" fill="var(--accent-red)">₪3,000,000</text>
      </g>
    </svg>
  </div>
);

/** 4: עצירת פיגוע שגויה — Two red gauges */
const Gauge = ({ label, isActive, delay }: { label: string; isActive: boolean; delay: number }) => {
  const angle = isActive ? 70 : -80;
  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 100 62" width="95" height="58" fill="none">
        {/* Background arc */}
        <path d="M 10 55 A 40 40 0 0 1 90 55" stroke="#e8edf5" strokeWidth="7" strokeLinecap="round" fill="none" />
        {/* Green zone */}
        <path d="M 10 55 A 40 40 0 0 1 30 20" stroke="#22c55e" strokeWidth="7" strokeLinecap="round" fill="none" opacity={0.5} />
        {/* Yellow zone */}
        <path d="M 30 20 A 40 40 0 0 1 70 20" stroke="#fbbf24" strokeWidth="7" strokeLinecap="round" fill="none" opacity={0.5} />
        {/* Red zone */}
        <path d="M 70 20 A 40 40 0 0 1 90 55" stroke="var(--accent-red)" strokeWidth="7" strokeLinecap="round" fill="none" opacity={0.7} />
        {/* Needle */}
        <line x1="50" y1="55" x2="50" y2="20" stroke="#37374e" strokeWidth="2.5" strokeLinecap="round"
          style={{ transformOrigin: "50px 55px", transform: `rotate(${angle}deg)`, transition: `transform 1.2s cubic-bezier(0.34,1.56,0.64,1) ${delay}s` }} />
        <circle cx="50" cy="55" r="4" fill="#37374e" />
      </svg>
      <span className="text-[9px] font-bold text-center leading-tight" style={{ color: isActive ? "var(--accent-red)" : "#a0a0b0", transition: `color 0.5s ease ${delay + 0.5}s` }}>
        {label}
      </span>
    </div>
  );
};

export const DualGaugeVisual = ({ isActive }: { isActive: boolean }) => (
  <div className="w-full h-full flex items-center justify-center gap-3 p-2">
    <Gauge label="תביעה אזרחית" isActive={isActive} delay={0.3} />
    <Gauge label="חקירה פלילית" isActive={isActive} delay={0.6} />
  </div>
);

/** 6: תביעת נזיקין — Horizontal cost bars */
const costs = [
  { label: "כתב הגנה", amount: "₪25,000", pct: 35 },
  { label: "ייצוג בבית משפט", amount: "₪40,000", pct: 55 },
  { label: "ערעורים", amount: "₪30,000", pct: 42 },
];

export const CostBarsVisual = ({ isActive }: { isActive: boolean }) => (
  <div className="w-full h-full flex flex-col items-center justify-center p-3 gap-3">
    <div className="text-[10px] text-[#86868b] text-center" style={{ opacity: isActive ? 1 : 0, transition: "opacity 0.3s ease" }}>
      עלויות משפטיות צפויות
    </div>
    <div className="w-full max-w-[200px] space-y-3">
      {costs.map((c, i) => (
        <div key={c.label}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-[9px] text-[#6b6b80]">{c.label}</span>
            <span className="text-[9px] font-bold" style={{ color: "var(--accent-red)", opacity: isActive ? 1 : 0, transition: `opacity 0.4s ease ${0.5 + i * 0.2}s` }}>{c.amount}</span>
          </div>
          <div className="h-[6px] rounded-full" style={{ background: "rgba(0,0,0,0.04)" }}>
            <div className="h-full rounded-full" style={{ width: isActive ? `${c.pct}%` : "0%", background: "linear-gradient(90deg, var(--accent-red), #ff8888)", transition: `width 1s cubic-bezier(0.16,1,0.3,1) ${0.3 + i * 0.2}s` }} />
          </div>
        </div>
      ))}
    </div>
    <div className="flex items-center justify-between w-full max-w-[200px] pt-2" style={{ borderTop: "1px solid rgba(0,0,0,0.06)", opacity: isActive ? 1 : 0, transition: "all 0.5s ease 1s" }}>
      <span className="text-[10px] font-bold text-[#37374e]">סה״כ</span>
      <span className="text-[13px] font-black text-[var(--accent-red)]">₪65,000–100,000</span>
    </div>
  </div>
);
