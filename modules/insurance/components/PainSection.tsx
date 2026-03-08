"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { PainDiagram } from "./PainDiagrams";

const steps = [
  {
    title: "אירוע ירי",
    desc: "השתמשת בנשק. חייב לתת עדות למשטרה — מיד. כל מילה שתגיד קובעת אם פעלת להצלת חיים או לא.",
  },
  {
    title: "הסנגוריה הציבורית",
    desc: "בלי ביטוח? מקבל עורך דין מהסנגוריה הציבורית. עובד מדינה שלא מתמחה במקרים כאלה. לא מומלץ לסמוך עליו.",
  },
  {
    title: "כתב הגנה",
    desc: "קיבלת תביעה? רק להעמיד כתב הגנה עולה 65,000–100,000 ש״ח. עוד לפני שהגעת לאולם בית המשפט.",
    highlight: "65,000–100,000₪",
  },
  {
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
    <section className="relative bg-[#fafbfe]">
      <div className="pt-16 pb-6 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-black text-[#37374e] mb-2">
          אבל למה <span className="text-[var(--accent-red)]">באמת</span> צריך ביטוח?
        </h2>
      </div>

      {/* Desktop: sticky layout */}
      <div className="hidden md:block">
        <div className="max-w-5xl mx-auto px-6" style={{ display: "flex", direction: "ltr" }}>
          {/* Sticky visual — SVG diagram */}
          <div style={{ width: "45%", position: "relative" }}>
            <div style={{ position: "sticky", top: 0, height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div className="text-center p-10 flex flex-col items-center"
                style={{
                  borderRadius: "30px", background: "white",
                  boxShadow: "0 30px 60px -15px rgba(0,0,0,0.1)",
                  border: "1px solid #e8edf5", minWidth: "280px",
                }}>
                <div key={activeIdx} style={{ animation: "fadeIn 0.3s ease" }}>
                  <PainDiagram step={activeIdx} />
                </div>
                {steps[activeIdx].highlight && (
                  <span key={`h-${activeIdx}`} className="text-4xl font-black text-[var(--accent-red)] mt-4 block"
                    style={{ animation: "fadeIn 0.3s ease" }}>
                    {steps[activeIdx].highlight}
                  </span>
                )}
                <p className="text-sm text-[#a0a0b0] mt-4">שלב {activeIdx + 1} מתוך {steps.length}</p>
              </div>
            </div>
          </div>

          {/* Scrolling steps */}
          <div style={{ width: "55%" }}>
            {steps.map((step, i) => {
              const isActive = i === activeIdx;
              return (
                <div key={step.title} ref={(el) => { stepRefs.current[i] = el; }}
                  style={{ minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "48px 0", opacity: isActive ? 1 : 0.12, transition: "opacity 0.5s ease", direction: "rtl" }}>
                  <span className="text-sm font-bold tracking-widest text-[var(--accent-red)] mb-3">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="text-3xl font-black text-[#37374e] mb-3">{step.title}</h3>
                  <p className="text-base text-[#6b6b80] leading-relaxed max-w-md">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden space-y-4 px-6 pb-12">
        {steps.map((step, i) => (
          <div key={step.title} className="p-5"
            style={{
              borderRadius: "24px", background: "white",
              border: "1px solid #e8edf5",
              boxShadow: "0 10px 25px -8px rgba(0,0,0,0.06)",
            }}>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-sm font-bold tracking-widest text-[var(--accent-red)]">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="text-lg font-black text-[#37374e]">{step.title}</h3>
            </div>
            <p className="text-sm text-[#6b6b80] leading-relaxed">{step.desc}</p>
            {step.highlight && (
              <p className="text-2xl font-black text-[var(--accent-red)] mt-3">{step.highlight}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
