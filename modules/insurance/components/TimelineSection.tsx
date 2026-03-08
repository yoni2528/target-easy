"use client";

import { useEffect, useRef, useState } from "react";
import { FileEdit, PhoneCall, ShieldCheck } from "lucide-react";

const steps = [
  { icon: FileEdit, number: "01", title: "משאירים פרטים", desc: "שם וטלפון — 30 שניות" },
  { icon: PhoneCall, number: "02", title: "מקבלים שיחה", desc: "נציג מסביר ועונה על שאלות" },
  { icon: ShieldCheck, number: "03", title: "מוגנים", desc: "הביטוח פעיל — מוגנים 24/7" },
];

export const TimelineSection = () => {
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
    <section ref={ref} className="py-20 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-black text-center text-[#37374e] mb-12">
          <span className="text-[var(--accent-blue)]">3 שלבים</span> וזה הכל
        </h2>

        <div className="relative flex items-start justify-between" style={{ perspective: "800px" }}>
          {/* Connecting line */}
          <div className="absolute top-10 left-[16.67%] right-[16.67%] h-px hidden md:block"
            style={{ background: "#e8edf5" }}>
            <div className="h-full bg-[var(--accent-blue)]"
              style={{ transform: visible ? "scaleX(1)" : "scaleX(0)", transformOrigin: "right", transition: "transform 1s ease 0.3s" }} />
          </div>

          {steps.map((step, i) => (
            <div key={step.number} className="flex flex-col items-center text-center w-1/3 relative z-10 px-2">
              <div className="w-20 h-20 flex items-center justify-center mb-4"
                style={{
                  borderRadius: "24px",
                  background: "white",
                  border: "1px solid #e8edf5",
                  boxShadow: "0 12px 25px -8px rgba(0,0,0,0.06)",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateZ(0) rotateX(0)" : "translateZ(-30px) rotateX(12deg)",
                  transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${0.2 + i * 0.2}s`,
                  transformStyle: "preserve-3d",
                }}>
                <step.icon className="w-8 h-8 text-[var(--accent-blue)]" strokeWidth={1.5} />
              </div>
              <div style={{ opacity: visible ? 1 : 0, transition: `opacity 0.5s ease ${0.4 + i * 0.2}s` }}>
                <h3 className="text-base font-black text-[#37374e] mb-1">{step.title}</h3>
                <p className="text-xs text-[#6b6b80]">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
