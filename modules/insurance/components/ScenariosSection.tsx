"use client";

import { useEffect, useRef, useState } from "react";
import { Crosshair, CarFront, Gavel, Building2, Heart } from "lucide-react";

const scenarios = [
  {
    icon: Crosshair,
    title: "ירי באימון",
    desc: "כדור פגע בצד שלישי במטווח. מי משלם על הנזק?",
  },
  {
    icon: CarFront,
    title: "גניבת נשק",
    desc: "הנשק נגנב מהרכב או מהבית. חקירה ותביעה מובטחות.",
  },
  {
    icon: Gavel,
    title: "חקירה פלילית",
    desc: "השתמשת בנשק באירוע. צריך עורך דין — עכשיו.",
  },
  {
    icon: Building2,
    title: "תביעת נזיקין",
    desc: "נזק לרכוש של צד שלישי. תביעה של מאות אלפים.",
  },
  {
    icon: Heart,
    title: "פעולה להצלת חיים",
    desc: "פעלת נכון ומנעת פיגוע — ועדיין חוקרים אותך.",
  },
];

export const ScenariosSection = () => {
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
    <section ref={ref} className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-center mb-3">
          מתי <span className="text-[var(--accent-red)]">צריך</span> ביטוח?
        </h2>
        <p className="text-[var(--text-secondary)] text-center mb-14 max-w-lg mx-auto">
          5 תרחישים אמיתיים שקורים כל שנה למחזיקי נשק בישראל
        </p>
        <div className="space-y-4">
          {scenarios.map((s, i) => (
            <div
              key={s.title}
              className="flex items-center gap-5 p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-sm hover:border-[var(--accent-red)]/30 hover:shadow-md transition-all duration-300"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(-20px)",
                transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`,
              }}
            >
              <div className="w-12 h-12 rounded-xl bg-[var(--accent-red)]/10 flex items-center justify-center shrink-0">
                <s.icon className="w-6 h-6 text-[var(--accent-red)]" strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-0.5">{s.title}</h3>
                <p className="text-sm text-[var(--text-secondary)]">{s.desc}</p>
              </div>
              <span className="text-3xl font-black text-[var(--accent-red)]/10 hidden md:block">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
