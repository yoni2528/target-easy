"use client";

import { useEffect, useRef, useState } from "react";
import { Crosshair, FileCheck, ShoppingBag } from "lucide-react";

const returns = [
  { icon: Crosshair, title: "אימוני ירי", desc: "החזר שנתי", amount: 600, color: "#4A90D9" },
  { icon: FileCheck, title: "חידוש רישיון", desc: "החזר שנתי", amount: 300, color: "#5BA0E8" },
  { icon: ShoppingBag, title: "ציוד במטווח", desc: "החזר שנתי", amount: 450, color: "#6BB0F0" },
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
    <section ref={ref} className="py-28 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-center text-[#37374e] mb-12"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease" }}>
          מביא לי <span className="text-[var(--accent-blue)]">1,350₪</span> בשנה?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10" style={{ perspective: "1200px" }}>
          {returns.map((r, i) => {
            const Icon = r.icon;
            return (
              <div key={r.title}
                className="p-6 text-center hover:scale-[1.03] transition-transform cursor-default"
                style={{
                  borderRadius: "24px",
                  background: "#f8faff",
                  border: "1px solid #e8edf5",
                  opacity: visible ? 1 : 0,
                  transform: visible
                    ? "rotateY(0) rotateX(0) translateZ(0)"
                    : `rotateY(${[-10, 0, 10][i]}deg) rotateX(12deg) translateZ(-60px)`,
                  transition: `all 0.9s cubic-bezier(0.16,1,0.3,1) ${i * 0.15}s`,
                  transformStyle: "preserve-3d",
                  boxShadow: visible ? "0 20px 40px -12px rgba(0,0,0,0.08)" : "none",
                }}>
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: `${r.color}15` }}>
                  <Icon className="w-8 h-8" style={{ color: r.color }} strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-black text-[#37374e] mb-1">{r.title}</h3>
                <p className="text-sm text-[#6b6b80] mb-3">{r.desc}</p>
                <span className="text-4xl font-black text-[var(--accent-blue)]">
                  <CountUp target={r.amount} started={visible} />
                  <span className="text-lg font-normal text-[#a0a0b0] mr-1">₪</span>
                </span>
              </div>
            );
          })}
        </div>

        {/* Total — elevated card with glow */}
        <div className="p-8 text-center"
          style={{
            borderRadius: "30px",
            background: "linear-gradient(135deg, #f0f6ff, #f8faff)",
            border: "1px solid #dce6f5",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0) rotateX(0)" : "translateY(20px) rotateX(8deg)",
            transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s",
            animation: visible ? "pulse-glow-blue 3s ease-in-out 1.5s infinite" : "none",
          }}>
          <p className="text-sm text-[#6b6b80] mb-2">סה״כ החזרים בשנה</p>
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-5xl font-black text-[var(--accent-blue)]">
              <CountUp target={total} started={visible} />
            </span>
            <span className="text-xl text-[#a0a0b0]">₪</span>
          </div>
        </div>
      </div>
    </section>
  );
};
