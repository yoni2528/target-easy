"use client";

import { useEffect, useRef, useState } from "react";
import { Crosshair, FileCheck, ShoppingBag } from "lucide-react";

const returns = [
  { icon: Crosshair, title: "אימוני ירי", desc: "עד 600₪ החזר בשנה", amount: 600 },
  { icon: FileCheck, title: "חידוש רישיון", desc: "עד 300₪ החזר בשנה", amount: 300 },
  { icon: ShoppingBag, title: "ציוד במטווח", desc: "עד 450₪ החזר בשנה", amount: 450 },
];

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
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-center mb-10">
          מביא לי <span className="text-[var(--accent-blue)]">1,350₪</span> בשנה?
        </h2>

        {/* 3D Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10" style={{ perspective: "1000px" }}>
          {returns.map((r, i) => {
            const Icon = r.icon;
            return (
              <div key={r.title}
                className="rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] p-6 text-center"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible
                    ? "rotateY(0deg) translateZ(0)"
                    : `rotateY(${i === 0 ? -15 : i === 2 ? 15 : 0}deg) translateZ(-40px)`,
                  transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 0.15}s`,
                  transformStyle: "preserve-3d",
                }}>
                <div className="w-14 h-14 rounded-xl bg-[var(--accent-blue)]/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-[var(--accent-blue)]" strokeWidth={1.5} />
                </div>
                <h3 className="text-base font-black text-[var(--text-primary)] mb-1">{r.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] mb-3">{r.desc}</p>
                <span className="text-3xl font-black text-[var(--accent-blue)]">
                  <CountUp target={r.amount} started={visible} />
                  <span className="text-lg font-normal text-[var(--text-muted)] mr-1">₪</span>
                </span>
              </div>
            );
          })}
        </div>

        {/* Total */}
        <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--accent-blue)]/20 text-center"
          style={{ opacity: visible ? 1 : 0, transition: "opacity 0.6s ease 0.6s" }}>
          <p className="text-sm text-[var(--text-secondary)] mb-1">סה״כ החזרים בשנה</p>
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-5xl font-black text-[var(--accent-blue)]">
              <CountUp target={total} started={visible} />
            </span>
            <span className="text-xl text-[var(--text-muted)]">₪</span>
          </div>
        </div>
      </div>
    </section>
  );
};
