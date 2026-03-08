"use client";

import { useEffect, useRef, useState } from "react";
import { FileEdit, PhoneCall, ShieldCheck } from "lucide-react";

const steps = [
  { icon: FileEdit, number: "01", title: "משאירים פרטים", desc: "ממלאים שם וטלפון — ייקח 30 שניות" },
  { icon: PhoneCall, number: "02", title: "מקבלים שיחה", desc: "נציג מסביר את הפוליסה ועונה על כל שאלה" },
  { icon: ShieldCheck, number: "03", title: "מוגנים", desc: "הביטוח פעיל מרגע ההצטרפות — מוגנים 24/7" },
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
    <section ref={ref} className="py-24 px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-center mb-3">
          <span className="text-[var(--accent-blue)]">3 שלבים</span> וזה הכל
        </h2>
        <p className="text-[var(--text-secondary)] text-center mb-16 max-w-md mx-auto">
          ההצטרפות פשוטה ומהירה — בלי ניירת, בלי בירוקרטיה
        </p>

        {/* Horizontal timeline */}
        <div className="relative flex items-start justify-between">
          {/* Connecting line background */}
          <div className="absolute top-10 left-[16.67%] right-[16.67%] h-0.5 bg-[var(--border-subtle)] hidden md:block">
            {/* Animated fill line */}
            <div
              className="h-full bg-[var(--accent-blue)] origin-right"
              style={{
                transform: visible ? "scaleX(1)" : "scaleX(0)",
                transition: "transform 1.2s ease-out 0.5s",
              }}
            />
          </div>

          {steps.map((step, i) => (
            <div
              key={step.number}
              className="flex flex-col items-center text-center w-1/3 relative z-10 px-2"
            >
              {/* Icon circle with pop animation */}
              <div
                className="w-20 h-20 rounded-2xl bg-[var(--bg-card)] border-2 border-[var(--accent-blue)]/30 flex items-center justify-center mb-4 shadow-lg"
                style={{
                  animation: visible ? `step-pop 0.6s ease ${0.3 + i * 0.3}s both` : "none",
                }}
              >
                <step.icon className="w-8 h-8 text-[var(--accent-blue)]" strokeWidth={1.5} />
              </div>

              {/* Text content */}
              <div
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(15px)",
                  transition: `opacity 0.5s ease ${0.6 + i * 0.3}s, transform 0.5s ease ${0.6 + i * 0.3}s`,
                }}
              >
                <span className="text-xs font-bold text-[var(--accent-blue)] tracking-widest">
                  שלב {step.number}
                </span>
                <h3 className="text-lg md:text-xl font-black text-[var(--text-primary)] mt-1 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] max-w-[200px] mx-auto">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
