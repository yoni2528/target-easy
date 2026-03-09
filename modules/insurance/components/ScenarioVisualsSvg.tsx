"use client";

const fade = (active: boolean, delay: number) => ({
  opacity: active ? 1 : 0,
  transform: active ? "translateY(0)" : "translateY(4px)",
  transition: `all 0.5s ease ${delay}s`,
});

/** 1: פליטת כדור — SVG target with bullet holes + cracks */
export const BulletTargetVisual = ({ isActive }: { isActive: boolean }) => (
  <div className="w-full h-full flex items-center justify-center p-1">
    <svg viewBox="0 0 200 200" className="w-full h-full max-w-[190px]" fill="none">
      {/* Target rings */}
      <circle cx="100" cy="85" r="68" fill="#fafbfe" stroke="#dde0e6" strokeWidth="1.5" />
      <circle cx="100" cy="85" r="52" fill="#f0f1f5" stroke="#dde0e6" strokeWidth="1" />
      <circle cx="100" cy="85" r="36" fill="#e8eaef" stroke="#d5d8df" strokeWidth="1" />
      <circle cx="100" cy="85" r="20" fill="var(--accent-red)" opacity={0.1} stroke="var(--accent-red)" strokeWidth="1" strokeOpacity={0.3} />
      <circle cx="100" cy="85" r="5" fill="var(--accent-red)" opacity={0.5} />

      {/* Bullet hole 1 — outer ring */}
      <g style={fade(isActive, 0.2)}>
        <circle cx="72" cy="68" r="4.5" fill="#2a2a3a" />
        <circle cx="72" cy="68" r="7" fill="none" stroke="#2a2a3a" strokeWidth="0.5" opacity={0.25} />
        <line x1="68" y1="64" x2="59" y2="55" stroke="#2a2a3a" strokeWidth="0.8" opacity={0.3} />
        <line x1="75" y1="63" x2="80" y2="54" stroke="#2a2a3a" strokeWidth="0.6" opacity={0.2} />
        <line x1="68" y1="72" x2="60" y2="78" stroke="#2a2a3a" strokeWidth="0.6" opacity={0.2} />
      </g>

      {/* Bullet hole 2 — middle ring */}
      <g style={fade(isActive, 0.45)}>
        <circle cx="118" cy="98" r="3.5" fill="#2a2a3a" />
        <circle cx="118" cy="98" r="6" fill="none" stroke="#2a2a3a" strokeWidth="0.5" opacity={0.25} />
        <line x1="121" y1="101" x2="130" y2="110" stroke="#2a2a3a" strokeWidth="0.7" opacity={0.25} />
        <line x1="114" y1="101" x2="108" y2="108" stroke="#2a2a3a" strokeWidth="0.5" opacity={0.2} />
      </g>

      {/* Bullet hole 3 — near center, big cracks */}
      <g style={fade(isActive, 0.7)}>
        <circle cx="96" cy="82" r="3.5" fill="var(--accent-red)" opacity={0.9} />
        <circle cx="96" cy="82" r="6" fill="none" stroke="var(--accent-red)" strokeWidth="0.6" opacity={0.35} />
        <line x1="93" y1="79" x2="83" y2="68" stroke="var(--accent-red)" strokeWidth="1" opacity={0.4} />
        <line x1="99" y1="79" x2="108" y2="68" stroke="var(--accent-red)" strokeWidth="0.8" opacity={0.3} />
        <line x1="93" y1="85" x2="82" y2="96" stroke="var(--accent-red)" strokeWidth="0.8" opacity={0.3} />
        <line x1="99" y1="86" x2="112" y2="92" stroke="var(--accent-red)" strokeWidth="0.7" opacity={0.25} />
      </g>

      {/* Damage pill */}
      <g style={fade(isActive, 1)}>
        <rect x="45" y="166" width="110" height="26" rx="13" fill="var(--accent-red)" opacity={0.08} stroke="var(--accent-red)" strokeWidth="1" />
        <text x="100" y="183" textAnchor="middle" fontSize="12" fontWeight="900" fill="var(--accent-red)">₪3,000,000</text>
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
