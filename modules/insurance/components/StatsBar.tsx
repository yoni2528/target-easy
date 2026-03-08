"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 3, suffix: "M", label: "כיסוי משפטי מקסימלי" },
  { value: 1350, suffix: "₪", label: "החזרים בשנה" },
  { value: 24, suffix: "/7", label: "קו חם לעורך דין" },
];

const CountUp = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const duration = 1500;
    const steps = 40;
    const increment = target / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [started, target]);

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-black text-[var(--accent-green)]">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

export const InsuranceStats = () => (
  <section className="py-16 px-6 border-y border-[var(--border-subtle)] bg-[var(--bg-secondary)]/50">
    <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6">
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col items-center gap-2">
          <CountUp target={stat.value} suffix={stat.suffix} />
          <span className="text-sm text-[var(--text-muted)] text-center">{stat.label}</span>
        </div>
      ))}
    </div>
  </section>
);
