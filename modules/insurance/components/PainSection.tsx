"use client";

import { useEffect, useRef, useState } from "react";
import { AlertTriangle } from "lucide-react";

const stats = [
  { num: "3M₪", label: "תביעה אפשרית" },
  { num: "400K₪", label: "עלות הגנה פלילית" },
  { num: "100%", label: "אחריות אישית" },
  { num: "0₪", label: "כיסוי בלי ביטוח" },
];

export const PainSection = () => {
  const [visible, setVisible] = useState(false);
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
    <section ref={ref} className="py-24 px-6 relative overflow-hidden" style={{ background: "#0a1a30" }}>
      {/* Animated rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] rounded-full border border-[#cc3333]/8 animate-[pulse_4s_ease-in-out_infinite]" />
        <div className="absolute w-[300px] h-[300px] rounded-full border border-[#cc3333]/12 animate-[pulse_4s_ease-in-out_infinite_0.5s]" />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-[#cc3333]/5 blur-[100px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-l from-transparent via-[#cc3333]/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-l from-transparent via-[#cc3333]/20 to-transparent" />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <AlertTriangle className="w-14 h-14 text-[#cc3333] mx-auto mb-6" strokeWidth={1} />
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
            נשק בלי ביטוח?
          </h2>
          <p className="text-xl md:text-2xl text-[#cc3333] font-bold mb-6">
            כמו רכב בלי ביטוח חובה.
          </p>
          <p className="text-lg text-[#8a96b0] max-w-xl mx-auto leading-relaxed">
            כל יום אתה נושא אחריות. תביעה יכולה להגיע למיליונים, הגנה פלילית
            עולה מאות אלפים. בלי ביטוח — אתה נושא את הכל לבד.
          </p>
        </div>

        <div
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s",
          }}
        >
          {stats.map((item) => (
            <div key={item.label} className="p-4 rounded-xl border border-[#cc3333]/20 bg-[#cc3333]/5">
              <span className="text-2xl font-black text-[#cc3333]">{item.num}</span>
              <p className="text-xs text-[#8a96b0] mt-1">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
