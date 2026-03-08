"use client";

import { useEffect, useRef, useState } from "react";
import { Crosshair, FileCheck, ShoppingBag, ArrowLeft } from "lucide-react";

const returns = [
  { icon: Crosshair, title: "אימוני ירי", amount: 600 },
  { icon: FileCheck, title: "חידוש רישיון", amount: 300 },
  { icon: ShoppingBag, title: "ציוד במטווח", amount: 450 },
];

const MAX_AMOUNT = 600;

const CountUp = ({ target, started }: { target: number; started: boolean }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    const steps = 30;
    const inc = target / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += inc;
      if (current >= target) { setCount(target); clearInterval(interval); }
      else setCount(Math.floor(current));
    }, 1200 / steps);
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
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[var(--accent-amber)]/5 blur-[100px]" />
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        <h2 className="text-3xl md:text-4xl font-black text-center mb-3">
          הביטוח שמחזיר <span className="text-[var(--accent-amber)]">לך כסף</span>
        </h2>
        <p className="text-[var(--text-secondary)] text-center mb-14 max-w-lg mx-auto">
          כל שנה תקבל החזרים על אימונים, חידוש רישיון וציוד
        </p>

        {/* Animated bars */}
        <div className="space-y-6 mb-12">
          {returns.map((r, i) => {
            const pct = (r.amount / MAX_AMOUNT) * 100;
            return (
              <div
                key={r.title}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateX(0)" : "translateX(20px)",
                  transition: `opacity 0.5s ease ${i * 0.15}s, transform 0.5s ease ${i * 0.15}s`,
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <r.icon className="w-5 h-5 text-[var(--accent-amber)]" strokeWidth={1.5} />
                    <span className="font-bold text-[var(--text-primary)]">{r.title}</span>
                  </div>
                  <span className="text-lg font-black text-[var(--accent-amber)]">
                    <CountUp target={r.amount} started={visible} />
                    <span className="text-sm font-normal text-[var(--text-muted)] mr-1">₪</span>
                  </span>
                </div>
                {/* Bar track */}
                <div className="h-3 rounded-full bg-[var(--accent-amber)]/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-l from-[var(--accent-amber)] to-[var(--accent-amber)]/70"
                    style={{
                      width: visible ? `${pct}%` : "0%",
                      transition: `width 1.2s ease ${0.3 + i * 0.2}s`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Total */}
        <div
          className="p-6 rounded-2xl bg-gradient-to-l from-[var(--accent-amber)]/10 to-[var(--accent-amber)]/5 border border-[var(--accent-amber)]/30 text-center"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease 0.8s, transform 0.6s ease 0.8s",
          }}
        >
          <p className="text-sm text-[var(--text-secondary)] mb-2">סה״כ החזרים בשנה</p>
          <div className="flex items-baseline justify-center gap-2">
            <span className="text-5xl md:text-6xl font-black text-[var(--accent-amber)]">
              <CountUp target={total} started={visible} />
            </span>
            <span className="text-xl text-[var(--text-muted)]">₪</span>
          </div>
          <a href="#contact"
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
