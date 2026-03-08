"use client";

import { Scale, Gavel, Gift, Phone } from "lucide-react";

/** Module 1 — Legal Coverage: Shield with animated protection bars */
const LegalVisual = ({ isActive }: { isActive: boolean }) => (
  <div className="relative w-full h-full flex flex-col items-center justify-center gap-6">
    <div className="relative z-10">
      <div className="w-[88px] h-[100px] flex items-center justify-center rounded-t-3xl relative"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 60%, 50% 100%, 0 60%)", background: "linear-gradient(160deg, color-mix(in srgb, var(--accent-blue) 25%, transparent), color-mix(in srgb, var(--accent-blue) 8%, transparent))" }}>
        <Scale className="w-9 h-9 text-[var(--accent-blue)]" strokeWidth={1.5}
          style={{ transform: isActive ? "scale(1)" : "scale(0.6)", opacity: isActive ? 1 : 0, transition: "all 0.5s ease 0.2s" }} />
      </div>
    </div>
    <div className="relative z-10 w-full max-w-[240px] space-y-2.5">
      {[
        { label: "נזקי גוף", pct: 100 },
        { label: "נזקי רכוש", pct: 85 },
        { label: "הגנה משפטית", pct: 70 },
      ].map((bar, i) => (
        <div key={bar.label}>
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[9px] text-[var(--text-muted)]">{bar.label}</span>
            <span className="text-[9px] font-bold text-[var(--accent-blue)]"
              style={{ opacity: isActive ? 1 : 0, transition: `opacity 0.4s ease ${0.5 + i * 0.15}s` }}>{bar.pct}%</span>
          </div>
          <div className="h-[5px] rounded-full" style={{ background: "color-mix(in srgb, var(--accent-blue) 10%, transparent)" }}>
            <div className="h-full rounded-full"
              style={{
                width: isActive ? `${bar.pct}%` : "0%",
                background: "var(--accent-blue)",
                transition: `width 1s cubic-bezier(0.16,1,0.3,1) ${0.3 + i * 0.15}s`,
              }} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

/** Module 2 — Criminal Defense: Gavel with case status */
const DefenseVisual = ({ isActive }: { isActive: boolean }) => (
  <div className="relative w-full h-full flex flex-col items-center justify-center gap-5">
    <div className="relative z-10">
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
        style={{ background: "color-mix(in srgb, var(--accent-blue) 12%, transparent)" }}>
        <Gavel className="w-8 h-8 text-[var(--accent-blue)]" strokeWidth={1.5}
          style={{ transform: isActive ? "rotate(0deg)" : "rotate(-20deg)", transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1) 0.2s" }} />
      </div>
    </div>
    <div className="relative z-10 w-full max-w-[220px] rounded-xl p-3 border transition-all duration-500"
      style={{
        background: "color-mix(in srgb, var(--accent-blue) 4%, transparent)",
        borderColor: "color-mix(in srgb, var(--accent-blue) 20%, transparent)",
        opacity: isActive ? 1 : 0, transform: isActive ? "translateY(0)" : "translateY(12px)",
      }}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[9px] text-[var(--text-muted)]">תיק הגנה #2026</span>
        <span className="text-[8px] font-bold text-green-500 bg-green-500/10 px-1.5 py-0.5 rounded">פעיל</span>
      </div>
      {["עו״ד פלילי מוצמד", "ייצוג בבית משפט", "הגנה בהליכים מנהליים"].map((item, i) => (
        <div key={item} className="flex items-center gap-1.5 py-0.5"
          style={{ opacity: isActive ? 1 : 0, transition: `opacity 0.3s ease ${0.5 + i * 0.1}s` }}>
          <div className="w-1 h-1 rounded-full bg-[var(--accent-blue)]" />
          <span className="text-[10px] text-[var(--text-secondary)]">{item}</span>
        </div>
      ))}
    </div>
  </div>
);

/** Module 3 — Returns: Receipt with items */
const ReturnsVisual = ({ isActive }: { isActive: boolean }) => {
  const items = [
    { label: "אימוני ירי", amount: "600₪" },
    { label: "חידוש רישיון", amount: "300₪" },
    { label: "ציוד במטווח", amount: "450₪" },
  ];
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <div className="relative z-10 w-full max-w-[230px] rounded-xl border overflow-hidden transition-all duration-500"
        style={{ background: "var(--bg-card)", borderColor: "color-mix(in srgb, var(--accent-blue) 20%, transparent)" }}>
        <div className="px-3 py-2 border-b border-[var(--accent-blue)]/10">
          <div className="flex items-center gap-2">
            <Gift className="w-4 h-4 text-[var(--accent-blue)]" strokeWidth={1.5} />
            <span className="text-[10px] font-bold text-[var(--text-primary)]">דוח החזרים שנתי</span>
          </div>
        </div>
        <div className="px-3 py-2 space-y-2">
          {items.map((item, i) => (
            <div key={item.label} className="flex items-center justify-between"
              style={{ opacity: isActive ? 1 : 0, transform: isActive ? "translateX(0)" : "translateX(10px)", transition: `all 0.4s ease ${0.3 + i * 0.12}s` }}>
              <span className="text-[10px] text-[var(--text-secondary)]">{item.label}</span>
              <span className="text-[10px] font-bold text-[var(--accent-blue)]">{item.amount}</span>
            </div>
          ))}
        </div>
        <div className="px-3 py-2 border-t border-[var(--accent-blue)]/10 bg-[var(--accent-blue)]/5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-[var(--text-primary)]">סה״כ בשנה</span>
            <span className="text-sm font-black text-[var(--accent-blue)]"
              style={{ opacity: isActive ? 1 : 0, transition: "opacity 0.5s ease 0.6s" }}>1,350₪</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/** Module 4 — Hotline: Incoming call */
const HotlineVisual = ({ isActive }: { isActive: boolean }) => (
  <div className="relative w-full h-full flex flex-col items-center justify-center gap-4">
    <div className="relative z-10">
      <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: "color-mix(in srgb, var(--accent-blue) 15%, transparent)" }}>
        <Phone className="w-7 h-7 text-[var(--accent-blue)]" strokeWidth={1.5} style={{ transform: isActive ? "rotate(0deg)" : "rotate(-15deg)", transition: "transform 0.5s ease 0.2s" }} />
      </div>
    </div>
    <div className="relative z-10 w-full max-w-[210px] rounded-xl p-3 text-center transition-all duration-500"
      style={{ background: "color-mix(in srgb, var(--accent-blue) 5%, transparent)", border: "1px solid color-mix(in srgb, var(--accent-blue) 15%, transparent)", opacity: isActive ? 1 : 0, transform: isActive ? "translateY(0)" : "translateY(12px)" }}>
      <p className="text-[10px] text-[var(--text-muted)] mb-0.5">שיחה נכנסת</p>
      <p className="text-[12px] font-bold text-[var(--text-primary)] mb-2">עו״ד תורן — ביטוח נשק</p>
      <div className="flex justify-center gap-3">
        {[{ color: "#22c55e", cls: "text-green-500", rot: "" }, { color: "var(--accent-red)", cls: "text-[var(--accent-red)]", rot: "rotate-[135deg]" }].map((b, i) => (
          <div key={i} className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: `color-mix(in srgb, ${b.color} 15%, transparent)`, opacity: isActive ? 1 : 0, transition: `opacity 0.3s ease ${0.6 + i * 0.1}s` }}>
            <Phone className={`w-3.5 h-3.5 ${b.cls} ${b.rot}`} strokeWidth={2} />
          </div>
        ))}
      </div>
    </div>
    <div className="relative z-10 flex items-center gap-1.5 px-3 py-1 rounded-full"
      style={{ background: "color-mix(in srgb, var(--accent-blue) 6%, transparent)", border: "1px solid color-mix(in srgb, var(--accent-blue) 12%, transparent)", opacity: isActive ? 1 : 0, transform: isActive ? "translateY(0)" : "translateY(8px)", transition: "all 0.5s ease 0.5s" }}>
      <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
      <span className="text-[9px] font-bold text-[var(--accent-blue)]">זמין 24/7</span>
    </div>
  </div>
);

const moduleVisuals = [LegalVisual, DefenseVisual, ReturnsVisual, HotlineVisual];

export const ModuleVisual = ({ index, isActive }: { index: number; isActive: boolean }) => {
  const Visual = moduleVisuals[index];
  return <Visual isActive={isActive} />;
};
