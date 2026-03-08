"use client";

import { useEffect, useRef, useState } from "react";
import { Crosshair, FileCheck, ShoppingBag, ArrowLeft } from "lucide-react";

const returns = [
  {
    icon: Crosshair,
    title: "אימוני ירי",
    amount: 600,
    desc: "החזר על אימוני ירי ורענון שנתי",
  },
  {
    icon: FileCheck,
    title: "חידוש רישיון",
    amount: 300,
    desc: "החזר על תהליך חידוש רישיון הנשק",
  },
  {
    icon: ShoppingBag,
    title: "ציוד במטווח",
    amount: 450,
    desc: "החזר על ציוד ואביזרי ירי במטווח",
  },
];

const CountUp = ({ target, started }: { target: number; started: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    const duration = 1200;
    const steps = 30;
    const inc = target / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += inc;
      if (current >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [started, target]);

  return <>{count.toLocaleString()}</>;
};

export const ReturnsSection = () => {
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

  const total = returns.reduce((s, r) => s + r.amount, 0);

  return (
    <section ref={ref} className="py-24 px-6 relative overflow-hidden">
      {/* Glow background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[var(--accent-amber)]/5 blur-[100px]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-3xl md:text-4xl font-black text-center mb-3">
          הביטוח שמחזיר <span className="text-[var(--accent-amber)]">לך כסף</span>
        </h2>
        <p className="text-[var(--text-secondary)] text-center mb-14 max-w-lg mx-auto">
          זה לא סתם ביטוח — כל שנה תקבל החזרים על אימונים, חידוש רישיון וציוד
        </p>

        {/* Return cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {returns.map((r, i) => (
            <div
              key={r.title}
              className="group p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--accent-amber)]/20 hover:border-[var(--accent-amber)]/40 transition-all duration-300"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
                transition: `opacity 0.6s ease ${i * 0.15}s, transform 0.6s ease ${i * 0.15}s`,
              }}
            >
              <div className="w-12 h-12 rounded-xl bg-[var(--accent-amber)]/10 flex items-center justify-center mb-4 group-hover:bg-[var(--accent-amber)]/20 transition-colors">
                <r.icon className="w-6 h-6 text-[var(--accent-amber)]" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1">
                {r.title}
              </h3>
              <p className="text-sm text-[var(--text-muted)] mb-4">{r.desc}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-[var(--accent-amber)]">
                  <CountUp target={r.amount} started={visible} />
                </span>
                <span className="text-sm text-[var(--text-muted)]">₪ בשנה</span>
              </div>
            </div>
          ))}
        </div>

        {/* Total highlight */}
        <div
          className="p-6 rounded-2xl bg-gradient-to-l from-[var(--accent-amber)]/10 to-[var(--accent-amber)]/5 border border-[var(--accent-amber)]/30 text-center"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s",
          }}
        >
          <p className="text-sm text-[var(--text-secondary)] mb-2">סה״כ החזרים בשנה</p>
          <div className="flex items-baseline justify-center gap-2">
            <span className="text-5xl md:text-6xl font-black text-[var(--accent-amber)]">
              <CountUp target={total} started={visible} />
            </span>
            <span className="text-xl text-[var(--text-muted)]">₪</span>
          </div>
          <p className="text-sm text-[var(--text-secondary)] mt-2">
            הביטוח משלם על עצמו — ואתה מוגן בכל רגע
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 mt-5 px-8 py-3 bg-[var(--accent-amber)] text-white font-bold rounded-xl hover:brightness-110 transition-all shadow-lg shadow-[var(--accent-amber)]/20"
          >
            רוצה לשמוע עוד
            <ArrowLeft className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
