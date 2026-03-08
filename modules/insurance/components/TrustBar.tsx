"use client";

import { useEffect, useRef, useState } from "react";
import { Shield, Award, Users, Zap } from "lucide-react";

const trustItems = [
  { icon: Shield, text: "מנורה ביטוח", sub: "חברת ביטוח מובילה" },
  { icon: Award, text: "כיסוי ייחודי", sub: "כולל אירועי טרור" },
  { icon: Users, text: "אלפי מבוטחים", sub: "ברחבי הארץ" },
  { icon: Zap, text: "הצטרפות מיידית", sub: "בלי ניירת מיותרת" },
];

export const TrustBar = () => {
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
    <section ref={ref} className="py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {trustItems.map((item, i) => (
            <div key={item.text}
              className="flex flex-col items-center text-center p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-sm"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(15px)",
                transition: `all 0.5s ease ${i * 0.1}s`,
              }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-2"
                style={{ background: "color-mix(in srgb, var(--accent-blue) 10%, transparent)" }}>
                <item.icon className="w-5 h-5 text-[var(--accent-blue)]" strokeWidth={1.5} />
              </div>
              <span className="text-sm font-bold text-[var(--text-primary)]">{item.text}</span>
              <span className="text-xs text-[var(--text-muted)]">{item.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
