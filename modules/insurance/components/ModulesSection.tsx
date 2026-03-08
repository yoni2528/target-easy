"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Scale, Gavel, Gift, Phone, ChevronDown } from "lucide-react";
import type { InsuranceModule } from "./ModuleMobileCard";
import { MobileCard } from "./ModuleMobileCard";

const modules: InsuranceModule[] = [
  {
    icon: Scale, number: "01", title: "כיסוי משפטי מלא",
    desc: "ביטוח אחריות צד ג׳ מקיף דרך מנורה ביטוח. כיסוי לנזקי גוף ורכוש שנגרמו לצד שלישי — הגנה רחבה שנותנת לך שקט.",
    features: ["כיסוי עד 3,000,000 ש״ח", "נזקי גוף לצד שלישי", "נזקי רכוש לצד שלישי", "מנורה ביטוח — יציבות ואמינות"],
    accent: "var(--accent-blue)", stat: "3,000,000₪", statLabel: "כיסוי מקסימלי",
  },
  {
    icon: Gavel, number: "02", title: "הגנה פלילית ומנהלית",
    desc: "אם תצטרך עורך דין, אנחנו כאן. כיסוי מלא להגנה משפטית, ייצוג בבית משפט וערעורים.",
    features: ["כיסוי עד 400,000 ש״ח", "עורך דין פלילי", "הגנה בהליכים מנהליים", "ערעורים וייצוג מלא"],
    accent: "var(--accent-amber)", stat: "400,000₪", statLabel: "הגנה משפטית",
  },
  {
    icon: Gift, number: "03", title: "החזרים והטבות",
    desc: "הביטוח לא רק מגן — הוא גם מחזיר לך כסף. החזרים על אימונים, חידוש רישיון וציוד.",
    features: ["אימוני ירי — עד 600 ש״ח", "חידוש רישיון — עד 300 ש״ח", "ציוד במטווח — עד 450 ש״ח", "סה״כ: עד 1,350 ש״ח בשנה"],
    accent: "var(--accent-amber)", stat: "1,350₪", statLabel: "החזרים בשנה",
  },
  {
    icon: Phone, number: "04", title: "קו חם וסיוע מורחב",
    desc: "קו חם לעורך דין זמין 24/7. במקרה גניבה — תקבל החזר. פעלת להצלת חיים? אנחנו איתך.",
    features: ["קו חם לעורך דין 24/7", "החזר במקרה גניבת נשק", "סיוע משפטי מיידי", "ליווי אישי בכל שלב"],
    accent: "var(--accent-blue)", stat: "24/7", statLabel: "קו חם זמין",
  },
];

const VisualCard = ({ module, isActive }: { module: InsuranceModule; isActive: boolean }) => {
  const Icon = module.icon;
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        opacity: isActive ? 1 : 0,
        transform: isActive ? "scale(1) translateY(0)" : "scale(0.92) translateY(30px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
        pointerEvents: isActive ? "auto" : "none",
      }}
    >
      <div className="flex flex-col items-center">
        {/* Decorative rings + icon */}
        <div className="relative w-44 h-44 flex items-center justify-center mb-8">
          <div
            className="absolute inset-0 rounded-full border-2 animate-[pulse_3s_ease-in-out_infinite]"
            style={{ borderColor: `color-mix(in srgb, ${module.accent} 20%, transparent)` }}
          />
          <div
            className="absolute inset-5 rounded-full border"
            style={{ borderColor: `color-mix(in srgb, ${module.accent} 12%, transparent)` }}
          />
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center"
            style={{ background: `color-mix(in srgb, ${module.accent} 10%, transparent)` }}
          >
            <Icon className="w-10 h-10" style={{
              color: module.accent,
              transform: isActive ? "scale(1) rotate(0deg)" : "scale(0.5) rotate(-10deg)",
              transition: "transform 0.5s ease",
            }} strokeWidth={1.5} />
          </div>
        </div>
        {/* Key stat with delayed entrance */}
        <span className="text-5xl font-black mb-1" style={{
          color: module.accent,
          transform: isActive ? "scale(1) translateY(0)" : "scale(0.7) translateY(10px)",
          transition: "transform 0.5s ease 0.15s",
        }}>{module.stat}</span>
        <span className="text-sm text-[var(--text-secondary)] mb-6" style={{
          transform: isActive ? "translateY(0)" : "translateY(8px)",
          transition: "transform 0.4s ease 0.25s",
        }}>{module.statLabel}</span>
        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-2 max-w-[380px]">
          {module.features.map((f, i) => (
            <span
              key={f}
              className="px-3 py-1.5 rounded-full text-xs font-medium bg-[var(--bg-card)] border shadow-sm"
              style={{
                borderColor: `color-mix(in srgb, ${module.accent} 25%, transparent)`,
                color: module.accent,
                opacity: isActive ? 1 : 0,
                transform: isActive ? "translateY(0)" : "translateY(8px)",
                transition: `opacity 0.4s ease ${i * 70}ms, transform 0.4s ease ${i * 70}ms`,
              }}
            >
              {f}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

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
        <div className="flex items-center justify-center gap-2 text-xs text-[var(--text-muted)]">
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
            title={m.title}
          />
        ))}
      </div>

      {/* Desktop: two-column sticky layout */}
      <div className="hidden md:block">
        <div className="max-w-6xl mx-auto px-6" style={{ display: "flex", direction: "ltr" }}>
          <div style={{ width: "55%", position: "relative" }}>
            <div style={{ position: "sticky", top: 0, height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div className="relative" style={{ width: 400, height: 420 }}>
                {modules.map((m, i) => (
                  <VisualCard key={m.number} module={m} isActive={i === activeIdx} />
                ))}
              </div>
            </div>
          </div>
          <div style={{ width: "45%" }}>
            {modules.map((m, i) => (
              <div key={m.number} ref={(el) => { textRefs.current[i] = el; }}
                onClick={() => scrollTo(i)} className="cursor-pointer"
                style={{
                  minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "center",
                  padding: "48px 0", opacity: i === activeIdx ? 1 : 0.25,
                  transition: "opacity 0.5s ease", direction: "rtl",
                }}
              >
                <div className="text-sm font-bold tracking-widest mb-3" style={{ color: m.accent }}>מודול {m.number}</div>
                <h3 className="text-3xl font-black text-[var(--text-primary)] mb-4 leading-tight">{m.title}</h3>
                <p className="text-base text-[var(--text-secondary)] leading-relaxed max-w-sm">{m.desc}</p>
              </div>
            ))}
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
