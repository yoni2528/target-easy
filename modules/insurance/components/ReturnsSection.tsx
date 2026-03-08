"use client";

import { useEffect, useRef, useState } from "react";
import { Crosshair, FileCheck, ShoppingBag } from "lucide-react";

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
    <section ref={ref} className="py-16 px-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-center mb-3">
          הביטוח שמחזיר <span className="text-[var(--accent-blue)]">לך כסף</span>
        </h2>
        <p className="text-[var(--text-secondary)] text-center mb-10 max-w-lg mx-auto">
          כל שנה תקבל החזרים על אימונים, חידוש רישיון וציוד
        </p>

        <div className="space-y-5 mb-10">
          {returns.map((r, i) => {
            const pct = (r.amount / MAX_AMOUNT) * 100;
            return (
              <div key={r.title}
                style={{ opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(15px)", transition: `all 0.5s ease ${i * 0.12}s` }}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <r.icon className="w-4 h-4 text-[var(--accent-blue)]" strokeWidth={1.5} />
                    <span className="font-bold text-sm text-[var(--text-primary)]">{r.title}</span>
                  </div>
                  <span className="text-base font-black text-[var(--accent-blue)]">
                    <CountUp target={r.amount} started={visible} />
                    <span className="text-sm font-normal text-[var(--text-muted)] mr-1">₪</span>
                  </span>
                </div>
                <div className="h-2.5 rounded-full bg-[var(--accent-blue)]/10 overflow-hidden">
                  <div className="h-full rounded-full bg-[var(--accent-blue)]"
                    style={{ width: visible ? `${pct}%` : "0%", transition: `width 1s ease ${0.3 + i * 0.15}s` }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Total */}
        <div className="p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--accent-blue)]/20 text-center"
          style={{ opacity: visible ? 1 : 0, transition: "opacity 0.6s ease 0.6s" }}>
          <p className="text-sm text-[var(--text-secondary)] mb-1">סה״כ החזרים בשנה</p>
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-4xl font-black text-[var(--accent-blue)]">
              <CountUp target={total} started={visible} />
            </span>
            <span className="text-lg text-[var(--text-muted)]">₪</span>
          </div>
        </div>
      </div>
    </section>
  );
};
