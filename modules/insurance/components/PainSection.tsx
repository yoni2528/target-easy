"use client";

import { useEffect, useRef, useState } from "react";
import { AlertTriangle, Scale, Gavel, UserX, ShieldOff } from "lucide-react";

const stats = [
  { icon: Scale, num: "3M₪", label: "תביעה אפשרית", desc: "תביעת צד ג׳ על נזקי גוף יכולה להגיע לשלושה מיליון שקל." },
  { icon: Gavel, num: "400K₪", label: "עלות הגנה פלילית", desc: "עורך דין פלילי, ייצוג בבית משפט, ערעורים — הכל עליך." },
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

  const ActiveIcon = stats[activeIdx].icon;

  return (
    <section ref={ref} className="py-24 px-6 relative overflow-hidden" style={{ background: "#0a1a30" }}>
      {/* Background effects */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] rounded-full border border-[#cc3333]/8 animate-[pulse_4s_ease-in-out_infinite]" />
        <div className="absolute w-[300px] h-[300px] rounded-full border border-[#cc3333]/12 animate-[pulse_4s_ease-in-out_infinite_0.5s]" />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-[#cc3333]/5 blur-[100px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-l from-transparent via-[#cc3333]/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-l from-transparent via-[#cc3333]/20 to-transparent" />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}>
          <AlertTriangle className="w-14 h-14 text-[#cc3333] mx-auto mb-6" strokeWidth={1} />
          <h2
            className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight"
            style={{ animation: visible ? "shake 0.6s ease-in-out 0.8s" : "none" }}
          >
            נשק בלי ביטוח?
          </h2>
          <p
            className="text-xl md:text-2xl text-[#cc3333] font-bold mb-6"
            style={{ animation: visible ? "glitch-flicker 4s linear 1.5s infinite" : "none" }}
          >
            כמו רכב בלי ביטוח חובה.
          </p>
        </div>

        {/* Interactive stat display */}
        <div className="mt-10" style={{
          opacity: visible ? 1 : 0, transition: "opacity 0.8s ease 0.3s",
        }}>
          {/* Big number reveal */}
          <div className="min-h-[140px] flex flex-col items-center justify-center mb-8">
            <span
              key={activeIdx}
              className="text-6xl md:text-8xl font-black text-[#cc3333] block animate-[step-pop_0.4s_ease_both]"
            >
              {stats[activeIdx].num}
            </span>
            <p
              key={`d-${activeIdx}`}
              className="text-base text-[#8a96b0] mt-3 max-w-sm mx-auto animate-[fadeInUp_0.4s_ease-out]"
            >
              {stats[activeIdx].desc}
            </p>
          </div>

          {/* Selector row */}
          <div className="flex justify-center gap-3 md:gap-4">
            {stats.map((item, i) => (
              <button
                key={item.label}
                onClick={() => setActiveIdx(i)}
                className="flex flex-col items-center gap-2 px-3 py-3 rounded-xl transition-all duration-300"
                style={{
                  background: i === activeIdx ? "rgba(204,51,51,0.15)" : "transparent",
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: i === activeIdx ? "rgba(204,51,51,0.4)" : "rgba(204,51,51,0.1)",
                  transform: i === activeIdx ? "scale(1.05)" : "scale(1)",
                  animation: visible ? `step-pop 0.5s ease ${0.6 + i * 0.1}s both` : "none",
                }}
              >
                <item.icon
                  className="w-6 h-6 transition-colors duration-300"
                  style={{ color: i === activeIdx ? "#cc3333" : "#5a6a80" }}
                  strokeWidth={1.5}
                />
                <span
                  className="text-xs font-bold transition-colors duration-300"
                  style={{ color: i === activeIdx ? "#cc3333" : "#5a6a80" }}
                >
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
