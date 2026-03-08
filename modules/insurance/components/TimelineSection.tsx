"use client";

import { useEffect, useRef, useState } from "react";
import { FileEdit, PhoneCall, ShieldCheck } from "lucide-react";

const steps = [
  {
    icon: FileEdit,
    number: "01",
    title: "משאירים פרטים",
    desc: "ממלאים שם וטלפון — ייקח 30 שניות",
  },
  {
    icon: PhoneCall,
    number: "02",
    title: "מקבלים שיחה",
    desc: "נציג מסביר את הפוליסה ועונה על כל שאלה",
  },
  {
    icon: ShieldCheck,
    number: "03",
    title: "מוגנים",
    desc: "הביטוח פעיל מרגע ההצטרפות — מוגנים 24/7",
  },
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
    <section ref={ref} className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-center mb-3">
          <span className="text-[var(--accent-blue)]">3 שלבים</span> וזה הכל
        </h2>
        <p className="text-[var(--text-secondary)] text-center mb-16 max-w-md mx-auto">
          ההצטרפות פשוטה ומהירה — בלי ניירת, בלי בירוקרטיה
        </p>

        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-0 bottom-0 right-[39px] w-px bg-[var(--border-subtle)] hidden md:block" />

          <div className="space-y-12 md:space-y-16">
            {steps.map((step, i) => (
              <div
                key={step.number}
                className="flex items-start gap-6 relative"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(30px)",
                  transition: `opacity 0.6s ease ${i * 0.2}s, transform 0.6s ease ${i * 0.2}s`,
                }}
              >
                <div className="w-20 h-20 rounded-2xl bg-[var(--accent-blue)]/10 border-2 border-[var(--accent-blue)]/30 flex items-center justify-center shrink-0 relative z-10">
                  <step.icon className="w-8 h-8 text-[var(--accent-blue)]" strokeWidth={1.5} />
                </div>
                <div className="pt-2">
                  <span className="text-sm font-bold text-[var(--accent-blue)] tracking-widest">
                    שלב {step.number}
                  </span>
                  <h3 className="text-2xl font-black text-[var(--text-primary)] mt-1 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[var(--text-secondary)] leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
