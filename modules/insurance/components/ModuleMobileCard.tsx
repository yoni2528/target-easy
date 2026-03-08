"use client";

import { useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";

export type InsuranceModule = {
  icon: LucideIcon;
  number: string;
  title: string;
  desc: string;
  features: string[];
  accent: string;
  stat: string;
  statLabel: string;
};

export const MobileCard = ({
  module,
  index,
}: {
  module: InsuranceModule;
  index: number;
}) => {
  const Icon = module.icon;
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
    <div
      ref={ref}
      className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-sm"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`,
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ background: `color-mix(in srgb, ${module.accent} 12%, transparent)` }}
        >
          <Icon className="w-6 h-6" style={{ color: module.accent }} strokeWidth={1.5} />
        </div>
        <div>
          <span className="text-xs font-bold" style={{ color: module.accent }}>
            מודול {module.number}
          </span>
          <h3 className="text-lg font-bold text-[var(--text-primary)]">{module.title}</h3>
        </div>
      </div>
      <p className="text-sm text-[var(--text-secondary)] mb-4">{module.desc}</p>
      <div className="space-y-2">
        {module.features.map((f) => (
          <div key={f} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
            <span style={{ color: module.accent }} className="font-bold">✓</span>
            {f}
          </div>
        ))}
      </div>
    </div>
  );
};
