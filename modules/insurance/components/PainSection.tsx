"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { MessageSquareWarning, UserX, FileText, Banknote } from "lucide-react";

const steps = [
  {
    icon: MessageSquareWarning,
    title: "אירוע ירי",
    desc: "השתמשת בנשק. חייב לתת עדות למשטרה — מיד. כל מילה שתגיד קובעת אם פעלת להצלת חיים או לא.",
  },
  {
    icon: UserX,
    title: "הסנגוריה הציבורית",
    desc: "בלי ביטוח? מקבל עורך דין מהסנגוריה הציבורית. עובד מדינה שלא מתמחה במקרים כאלה. לא מומלץ לסמוך עליו.",
  },
  {
    icon: FileText,
    title: "כתב הגנה",
    desc: "קיבלת תביעה? רק להעמיד כתב הגנה עולה 65,000–100,000 ש״ח. עוד לפני שהגעת לאולם בית המשפט.",
    highlight: "65,000–100,000₪",
  },
  {
    icon: Banknote,
    title: "תביעת מיליונים",
    desc: "תביעה מצד שלישי או ממשפחת המחבל. נזקי גוף, נזקי רכוש — עד 3,000,000 ש״ח. הכל מהכיס שלך.",
    highlight: "3,000,000₪",
  },
];

export const PainSection = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleScroll = useCallback(() => {
    const center = window.innerHeight / 2;
    let closest = 0;
    let minDist = Infinity;
    stepRefs.current.forEach((el, i) => {
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

  return (
    <section className="relative">
      <div className="pt-16 pb-6 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-black mb-2">
          אבל למה <span className="text-[var(--accent-red)]">באמת</span> צריך ביטוח?
        </h2>
      </div>

      {/* Desktop: sticky layout */}
      <div className="hidden md:block">
        <div className="max-w-5xl mx-auto px-6" style={{ display: "flex", direction: "ltr" }}>
          {/* Sticky visual — left */}
          <div style={{ width: "45%", position: "relative" }}>
            <div style={{ position: "sticky", top: 0, height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div className="text-center">
                {steps[activeIdx].highlight ? (
                  <span className="text-6xl font-black text-[var(--accent-red)] animate-[fadeIn_0.3s_ease]" key={activeIdx}>
                    {steps[activeIdx].highlight}
                  </span>
                ) : (
                  <div key={activeIdx} className="animate-[fadeIn_0.3s_ease]">
                    {(() => { const Icon = steps[activeIdx].icon; return <Icon className="w-20 h-20 text-[var(--accent-red)] mx-auto" strokeWidth={1} />; })()}
                  </div>
                )}
                <p className="text-sm text-[var(--text-muted)] mt-3">שלב {activeIdx + 1} מתוך {steps.length}</p>
              </div>
            </div>
          </div>

          {/* Scrolling steps — right */}
          <div style={{ width: "55%" }}>
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isActive = i === activeIdx;
              return (
                <div key={step.title} ref={(el) => { stepRefs.current[i] = el; }}
                  style={{ minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "48px 0", opacity: isActive ? 1 : 0.15, transition: "opacity 0.5s ease", direction: "rtl" }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[var(--accent-red)]/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[var(--accent-red)]" strokeWidth={1.5} />
                    </div>
                    <span className="text-sm font-bold tracking-widest text-[var(--accent-red)]">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="text-3xl font-black text-[var(--text-primary)] mb-3">{step.title}</h3>
                  <p className="text-base text-[var(--text-secondary)] leading-relaxed max-w-md">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile: simple stack */}
      <div className="md:hidden space-y-6 px-6 pb-12">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <div key={step.title} className="p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-[var(--accent-red)]/10 flex items-center justify-center">
                  <Icon className="w-4.5 h-4.5 text-[var(--accent-red)]" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-black text-[var(--text-primary)]">{step.title}</h3>
              </div>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{step.desc}</p>
              {step.highlight && (
                <p className="text-2xl font-black text-[var(--accent-red)] mt-3">{step.highlight}</p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
