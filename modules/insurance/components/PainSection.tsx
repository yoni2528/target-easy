"use client";

import { useEffect, useRef, useState } from "react";
import { Scale, Gavel, UserX, ShieldOff } from "lucide-react";

const stats = [
  { icon: Scale, num: "3M₪", label: "תביעה אפשרית", desc: "תביעת צד ג׳ על נזקי גוף יכולה להגיע לשלושה מיליון שקל." },
  { icon: Gavel, num: "400K₪", label: "עלות הגנה", desc: "עורך דין פלילי, ייצוג בבית משפט, ערעורים — הכל עליך." },
  { icon: UserX, num: "100%", label: "אחריות אישית", desc: "בלי ביטוח, כל שקל של נזק יוצא מהכיס שלך." },
  { icon: ShieldOff, num: "0₪", label: "כיסוי בלי ביטוח", desc: "אף אחד לא מגן עליך. אתה חשוף לגמרי." },
];

export const PainSection = () => {
  const [visible, setVisible] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-16 px-6 relative overflow-hidden">
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(15px)",
          transition: "all 0.6s ease",
        }}>
          <h2 className="text-3xl md:text-4xl font-black mb-2 leading-tight text-[var(--text-primary)]">
            נשק בלי ביטוח?
          </h2>
          <p className="text-base font-bold text-[var(--accent-red)] mb-8">
            כמו רכב בלי ביטוח חובה.
          </p>
        </div>

        {/* Interactive stat display */}
        <div style={{ opacity: visible ? 1 : 0, transition: "opacity 0.6s ease 0.2s" }}>
          <div className="min-h-[110px] flex flex-col items-center justify-center mb-6">
            <span key={activeIdx}
              className="text-5xl md:text-7xl font-black block animate-[step-pop_0.4s_ease_both]"
              style={{ color: "var(--accent-red)" }}>
              {stats[activeIdx].num}
            </span>
            <p key={`d-${activeIdx}`}
              className="text-sm mt-2 max-w-sm mx-auto text-[var(--text-secondary)]">
              {stats[activeIdx].desc}
            </p>
          </div>

          <div className="flex justify-center gap-3 md:gap-4">
            {stats.map((item, i) => (
              <button key={item.label} onClick={() => setActiveIdx(i)}
                className="group flex flex-col items-center gap-1.5 px-3 py-2.5 rounded-xl transition-all duration-300 cursor-pointer"
                style={{
                  background: i === activeIdx
                    ? "color-mix(in srgb, var(--accent-red) 10%, transparent)"
                    : "transparent",
                  border: `1px solid ${i === activeIdx
                    ? "color-mix(in srgb, var(--accent-red) 30%, transparent)"
                    : "var(--border-subtle)"}`,
                }}>
                <item.icon className="w-5 h-5 transition-colors duration-300"
                  style={{ color: i === activeIdx ? "var(--accent-red)" : "var(--text-muted)" }}
                  strokeWidth={1.5} />
                <span className="text-[11px] font-bold transition-colors duration-300"
                  style={{ color: i === activeIdx ? "var(--accent-red)" : "var(--text-muted)" }}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
