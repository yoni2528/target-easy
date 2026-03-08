"use client";

import { useEffect, useRef, useState } from "react";

const Phone = ({ children, delay }: { children: React.ReactNode; delay: number }) => (
  <div className="relative mx-auto" style={{ width: 200, height: 380 }}>
    <div className="absolute inset-0 rounded-[32px] overflow-hidden"
      style={{ background: "white", border: "6px solid #1d1d1f", boxShadow: "0 25px 60px rgba(0,0,0,0.12)" }}>
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-[#1d1d1f] rounded-b-xl z-10" />
      {/* Status bar */}
      <div className="flex justify-between items-center px-5 pt-6 pb-1 text-[8px] font-bold text-[#1d1d1f]">
        <span>9:41</span>
        <div className="flex gap-0.5">
          <div className="w-3 h-1.5 rounded-sm bg-[#1d1d1f]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#1d1d1f]" />
        </div>
      </div>
      <div className="px-3 pt-1 pb-3 flex flex-col gap-2 h-[calc(100%-48px)] overflow-hidden">
        {children}
      </div>
    </div>
  </div>
);

const Bubble = ({ text, bot, delay }: { text: string; bot?: boolean; delay: number }) => (
  <div className={`max-w-[85%] px-3 py-2 text-xs leading-relaxed ${bot ? "self-start" : "self-end"}`}
    style={{
      background: bot ? "#f0f1f6" : "var(--accent-blue)",
      color: bot ? "#1d1d1f" : "white",
      borderRadius: bot ? "16px 16px 16px 4px" : "16px 16px 4px 16px",
      animation: `step-pop 0.4s cubic-bezier(0.32,0.72,0,1) ${delay}s both`,
    }}>
    {text}
  </div>
);

export const TimelineSection = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-28 px-6 bg-[#fafbfe]">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-black text-[#1d1d1f] mb-3"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease", letterSpacing: "-0.02em" }}>
          <span className="text-[var(--accent-blue)]">30 שניות</span> וזה הכל
        </h2>
        <p className="text-[#86868b] mb-14"
          style={{ opacity: visible ? 1 : 0, transition: "opacity 0.6s ease 0.2s" }}>
          משאירים פרטים — מקבלים שיחה — מוגנים
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s cubic-bezier(0.32,0.72,0,1) 0.3s" }}>

          {/* Phone 1 — Registration chat */}
          <div className="text-center">
            <Phone delay={0.3}>
              <div className="flex flex-col gap-2 mt-1">
                <Bubble bot text="היי! רוצה להצטרף לביטוח נשק?" delay={0.5} />
                <Bubble text="כן, בטח" delay={0.9} />
                <Bubble bot text="מעולה! מה השם שלך?" delay={1.3} />
                <Bubble text="ישראל ישראלי" delay={1.7} />
                <Bubble bot text="ומספר טלפון?" delay={2.1} />
                <Bubble text="055-228-1168" delay={2.5} />
                <Bubble bot text="קיבלתי! נציג יחזור אליך תוך דקות ✓" delay={2.9} />
              </div>
            </Phone>
            <p className="mt-5 text-sm font-bold text-[#1d1d1f]">משאירים פרטים</p>
            <p className="text-xs text-[#86868b]">30 שניות בלבד</p>
          </div>

          {/* Arrow between phones */}
          <div className="hidden md:block text-3xl text-[#d2d2d7]"
            style={{ animation: visible ? "float-up 2s ease-in-out infinite" : "none" }}>
            ←
          </div>
          <div className="md:hidden text-3xl text-[#d2d2d7]"
            style={{ animation: visible ? "float-up 2s ease-in-out infinite" : "none" }}>
            ↓
          </div>

          {/* Phone 2 — Policy ready */}
          <div className="text-center">
            <Phone delay={0.6}>
              <div className="flex flex-col items-center justify-center h-full gap-3 -mt-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, var(--accent-blue), #4da6ff)", animation: `step-pop 0.5s cubic-bezier(0.32,0.72,0,1) 3.3s both` }}>
                  <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <div style={{ animation: `step-pop 0.4s ease 3.6s both` }}>
                  <p className="text-base font-black text-[#1d1d1f]">הפוליסה פעילה!</p>
                  <p className="text-[10px] text-[#86868b] mt-1">כיסוי עד ₪3,000,000</p>
                  <p className="text-[10px] text-[#86868b]">הגנה משפטית 24/7</p>
                </div>
              </div>
            </Phone>
            <p className="mt-5 text-sm font-bold text-[#1d1d1f]">מוגנים</p>
            <p className="text-xs text-[#86868b]">שיחה אחת וזהו</p>
          </div>
        </div>
      </div>
    </section>
  );
};
