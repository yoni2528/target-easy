"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Star } from "lucide-react";

const plans = [
  {
    name: "בסיסי",
    price: "500",
    period: "לשנה",
    features: [
      "כיסוי צד ג׳ בסיסי",
      "אחריות למחזיק הנשק",
      "כיסוי נזקי גוף",
      "ליווי משפטי ראשוני",
    ],
    popular: false,
    accent: "var(--accent-blue)",
  },
  {
    name: "מורחב",
    price: "700",
    period: "לשנה",
    features: [
      "כיסוי צד ג׳ מורחב",
      "אחריות מלאה למחזיק",
      "כיסוי נזקי גוף ורכוש",
      "ליווי משפטי מלא",
      "כיסוי אירועי ירי במטווח",
    ],
    popular: true,
    accent: "var(--accent-green)",
  },
  {
    name: "פרימיום",
    price: "900",
    period: "לשנה",
    features: [
      "כיסוי צד ג׳ מקסימלי",
      "אחריות מלאה + הרחבות",
      "כיסוי נזקי גוף, רכוש ותוצאתי",
      "ליווי משפטי מלא + ייצוג",
      "כיסוי מטווח + נשיאה",
      "הגנה על בני משפחה",
    ],
    popular: false,
    accent: "var(--accent-amber)",
  },
];

const PlanCard = ({ plan, index }: { plan: typeof plans[0]; index: number }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative p-6 rounded-2xl border transition-all duration-300 ${
        plan.popular
          ? "bg-[var(--bg-elevated)] border-[var(--accent-green)]/40 shadow-lg shadow-[var(--accent-green)]/5"
          : "bg-[var(--bg-card)] border-[var(--border-subtle)] hover:border-[var(--border-default)]"
      }`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ease ${index * 0.15}s, transform 0.5s ease ${index * 0.15}s`,
      }}
    >
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[var(--accent-green)] text-[var(--bg-primary)] text-xs font-bold rounded-full flex items-center gap-1">
          <Star className="w-3 h-3" fill="currentColor" /> הכי פופולרי
        </div>
      )}
      <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1">{plan.name}</h3>
      <div className="flex items-baseline gap-1 mb-5">
        <span className="text-4xl font-black" style={{ color: plan.accent }}>
          {plan.price}
        </span>
        <span className="text-sm text-[var(--text-muted)]">&#8362; {plan.period}</span>
      </div>
      <ul className="space-y-3 mb-6">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
            <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: plan.accent }} />
            {f}
          </li>
        ))}
      </ul>
      <a
        href="#contact"
        className={`block text-center py-3 rounded-xl font-bold text-sm transition-all ${
          plan.popular
            ? "bg-[var(--accent-green)] text-[var(--bg-primary)] hover:brightness-110 shadow-md shadow-[var(--accent-green)]/20"
            : "border border-[var(--border-default)] text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]"
        }`}
      >
        לפרטים נוספים
      </a>
    </div>
  );
};

export const PlansSection = () => (
  <section id="plans" className="py-20 px-6">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-black text-center mb-3">
        בחר את <span className="text-[var(--accent-blue)]">המסלול שלך</span>
      </h2>
      <p className="text-[var(--text-secondary)] text-center mb-12 max-w-lg mx-auto">
        ביטוח צד ג׳ דרך מנורה ביטוח — 3 מסלולים שמתאימים לכל צורך ותקציב
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, i) => (
          <PlanCard key={plan.name} plan={plan} index={i} />
        ))}
      </div>
    </div>
  </section>
);
