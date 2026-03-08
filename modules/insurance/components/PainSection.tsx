"use client";

import { useEffect, useRef, useState } from "react";
import { AlertTriangle, Scale, Gavel, UserX, ShieldOff } from "lucide-react";

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
    <section ref={ref} className="py-24 px-6 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, var(--bg-primary) 0%, color-mix(in srgb, var(--accent-red) 6%, var(--bg-primary)) 50%, var(--bg-primary) 100%)" }}>
      {/* Subtle background rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[400px] h-[400px] rounded-full border border-[var(--accent-red)]/8 animate-[pulse_4s_ease-in-out_infinite]" />
        <div className="absolute w-[250px] h-[250px] rounded-full border border-[var(--accent-red)]/12 animate-[pulse_4s_ease-in-out_infinite_0.5s]" />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[250px] rounded-full blur-[100px] pointer-events-none"
        style={{ background: "color-mix(in srgb, var(--accent-red) 6%, transparent)" }} />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}>
          <AlertTriangle className="w-12 h-12 mx-auto mb-5" style={{ color: "var(--accent-red)" }} strokeWidth={1.5} />
          <h2 className="text-4xl md:text-5xl font-black mb-3 leading-tight"
            style={{ color: "var(--text-primary)" }}>
            נשק בלי ביטוח?
          </h2>
          <p className="text-lg md:text-xl font-bold mb-2"
            style={{ color: "var(--accent-red)" }}>
            כמו רכב בלי ביטוח חובה.
          </p>
        </div>

        {/* Interactive stat display */}
        <div className="mt-10" style={{ opacity: visible ? 1 : 0, transition: "opacity 0.8s ease 0.3s" }}>
          <div className="min-h-[130px] flex flex-col items-center justify-center mb-8">
            <span key={activeIdx}
              className="text-6xl md:text-8xl font-black block animate-[step-pop_0.4s_ease_both]"
              style={{ color: "var(--accent-red)" }}>
              {stats[activeIdx].num}
            </span>
            <p key={`d-${activeIdx}`}
              className="text-sm mt-3 max-w-sm mx-auto animate-[fadeInUp_0.4s_ease-out]"
              style={{ color: "var(--text-secondary)" }}>
              {stats[activeIdx].desc}
            </p>
          </div>

          <p className="text-[11px] mb-3" style={{ color: "var(--text-muted)" }}>
            בחר תרחיש ↓
          </p>

          <div className="flex justify-center gap-3 md:gap-4">
            {stats.map((item, i) => (
              <button key={item.label} onClick={() => setActiveIdx(i)}
                className="group flex flex-col items-center gap-2 px-3 py-3 rounded-xl transition-all duration-300 cursor-pointer hover:scale-105"
                style={{
                  background: i === activeIdx
                    ? "color-mix(in srgb, var(--accent-red) 12%, transparent)"
                    : "color-mix(in srgb, var(--accent-red) 3%, var(--bg-card))",
                  border: `1px solid ${i === activeIdx
                    ? "color-mix(in srgb, var(--accent-red) 35%, transparent)"
                    : "color-mix(in srgb, var(--accent-red) 10%, transparent)"}`,
                  transform: i === activeIdx ? "scale(1.05)" : "scale(1)",
                  animation: visible ? `step-pop 0.5s ease ${0.6 + i * 0.1}s both` : "none",
                }}>
                <item.icon className="w-6 h-6 transition-colors duration-300 group-hover:text-[var(--accent-red)]"
                  style={{ color: i === activeIdx ? "var(--accent-red)" : "var(--text-muted)" }}
                  strokeWidth={1.5} />
                <span className="text-xs font-bold transition-colors duration-300 group-hover:text-[var(--accent-red)]"
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
