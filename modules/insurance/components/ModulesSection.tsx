"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Scale, Gavel, Gift, Phone, ChevronDown } from "lucide-react";
import type { InsuranceModule } from "./ModuleMobileCard";
import { MobileCard } from "./ModuleMobileCard";
import { ModuleVisual } from "./ModuleVisuals";

const modules: InsuranceModule[] = [
  {
    icon: Scale, number: "01", title: "כיסוי משפטי מלא",
    desc: "כיסוי מקיף לנזקי גוף ורכוש לצד שלישי דרך מנורה ביטוח.",
    features: ["כיסוי עד 3,000,000 ש״ח", "נזקי גוף לצד שלישי", "נזקי רכוש לצד שלישי", "מנורה ביטוח — יציבות ואמינות"],
    accent: "var(--accent-blue)", stat: "3,000,000₪", statLabel: "כיסוי מקסימלי",
  },
  {
    icon: Gavel, number: "02", title: "הגנה פלילית ומנהלית",
    desc: "כיסוי מלא להגנה משפטית, ייצוג וערעורים.",
    features: ["כיסוי עד 400,000 ש״ח", "עורך דין פלילי", "הגנה בהליכים מנהליים", "ערעורים וייצוג מלא"],
    accent: "var(--accent-amber)", stat: "400,000₪", statLabel: "הגנה משפטית",
  },
  {
    icon: Gift, number: "03", title: "החזרים והטבות",
    desc: "החזרים על אימונים, חידוש רישיון וציוד.",
    features: ["אימוני ירי — עד 600 ש״ח", "חידוש רישיון — עד 300 ש״ח", "ציוד במטווח — עד 450 ש״ח", "סה״כ: עד 1,350 ש״ח בשנה"],
    accent: "var(--accent-amber)", stat: "1,350₪", statLabel: "החזרים בשנה",
  },
  {
    icon: Phone, number: "04", title: "קו חם וסיוע מורחב",
    desc: "קו חם לעורך דין 24/7, החזר בגניבה וליווי אישי.",
    features: ["קו חם לעורך דין 24/7", "החזר במקרה גניבת נשק", "סיוע משפטי מיידי", "ליווי אישי בכל שלב"],
    accent: "var(--accent-blue)", stat: "24/7", statLabel: "קו חם זמין",
  },
];

const VisualCard = ({ mod, index, isActive }: { mod: InsuranceModule; index: number; isActive: boolean }) => (
  <div className="absolute inset-0 flex items-center justify-center"
    style={{ opacity: isActive ? 1 : 0, transform: isActive ? "scale(1)" : "scale(0.92)", transition: "all 0.6s ease", pointerEvents: isActive ? "auto" : "none" }}>
    <div className="w-full h-full rounded-2xl border overflow-hidden relative"
      style={{ background: "var(--bg-card)", borderColor: isActive ? `color-mix(in srgb, ${mod.accent} 25%, transparent)` : "var(--border-subtle)", transition: "border-color 0.6s ease" }}>
      {/* Top accent bar */}
      <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, transparent, ${mod.accent}, transparent)`, opacity: isActive ? 0.6 : 0, transition: "opacity 0.6s ease" }} />
      {/* Visual content */}
      <div className="absolute inset-0 pt-1">
        <ModuleVisual index={index} isActive={isActive} />
      </div>
      {/* Bottom stat badge */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full border backdrop-blur"
        style={{ background: `color-mix(in srgb, ${mod.accent} 8%, var(--bg-card))`, borderColor: `color-mix(in srgb, ${mod.accent} 20%, transparent)`, opacity: isActive ? 1 : 0, transform: isActive ? "translateY(0)" : "translateY(8px)", transition: "all 0.5s ease 0.4s" }}>
        <span className="text-xs font-black" style={{ color: mod.accent }}>{mod.stat}</span>
        <span className="text-[10px] text-[var(--text-muted)] mr-1.5">{mod.statLabel}</span>
      </div>
    </div>
  </div>
);

export const InsuranceModules = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleScroll = useCallback(() => {
    const center = window.innerHeight / 2;
    let closest = 0;
    let minDist = Infinity;
    textRefs.current.forEach((el, i) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const dist = Math.abs(rect.top + rect.height / 2 - center);
      if (dist < minDist) { minDist = dist; closest = i; }
    });
    setActiveIdx(closest);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollTo = (i: number) => {
    textRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section id="modules" className="relative">
      <div className="pt-20 pb-8 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-black mb-3">
          מה אתה <span className="text-[var(--accent-blue)]">מקבל</span>?
        </h2>
        <p className="text-[var(--text-secondary)] max-w-lg mx-auto mb-4">
          ביטוח אחריות — המעטפת השלמה למחזיקי נשק ברישיון
        </p>
        <div className="hidden md:flex items-center justify-center gap-2 text-xs text-[var(--text-muted)]">
          <span>גלול למטה לצפייה בכל המודולים</span>
          <ChevronDown className="w-3 h-3 animate-bounce" />
        </div>
      </div>

      {/* Progress dots */}
      <div className="hidden md:flex fixed left-6 top-1/2 -translate-y-1/2 flex-col gap-3 z-30">
        {modules.map((m, i) => (
          <button key={m.number} onClick={() => scrollTo(i)}
            className="w-2.5 h-2.5 rounded-full transition-all duration-300"
            style={{
              background: i === activeIdx ? m.accent : "var(--border-default)",
              transform: i === activeIdx ? "scale(1.5)" : "scale(1)",
              boxShadow: i === activeIdx ? `0 0 8px ${m.accent}` : "none",
            }}
            title={m.title} />
        ))}
      </div>

      {/* Desktop: sticky layout */}
      <div className="hidden md:block">
        <div className="max-w-6xl mx-auto px-6" style={{ display: "flex", direction: "ltr" }}>
          <div style={{ width: "50%", position: "relative" }}>
            <div style={{ position: "sticky", top: 0, height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div className="relative" style={{ width: 380, height: 400 }}>
                {modules.map((m, i) => (
                  <VisualCard key={m.number} mod={m} index={i} isActive={i === activeIdx} />
                ))}
              </div>
            </div>
          </div>
          <div style={{ width: "50%" }}>
            {modules.map((m, i) => {
              const Icon = m.icon;
              const isActive = i === activeIdx;
              return (
                <div key={m.number} ref={(el) => { textRefs.current[i] = el; }}
                  onClick={() => scrollTo(i)} className="cursor-pointer"
                  style={{ minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "48px 0", opacity: isActive ? 1 : 0.2, transition: "opacity 0.5s ease", direction: "rtl" }}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: `color-mix(in srgb, ${m.accent} 12%, transparent)` }}>
                      <Icon className="w-5 h-5" style={{ color: m.accent }} strokeWidth={1.5} />
                    </div>
                    <span className="text-sm font-bold tracking-widest" style={{ color: m.accent }}>מודול {m.number}</span>
                  </div>
                  <h3 className="text-3xl font-black text-[var(--text-primary)] mb-3 leading-tight">{m.title}</h3>
                  <p className="text-base text-[var(--text-secondary)] leading-relaxed max-w-sm mb-5">{m.desc}</p>
                  <div className="space-y-2 max-w-sm">
                    {m.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                        <span className="font-bold" style={{ color: m.accent }}>✓</span> {f}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden space-y-6 px-6 pb-12">
        {modules.map((m, i) => <MobileCard key={m.number} module={m} index={i} />)}
      </div>
    </section>
  );
};
