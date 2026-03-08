"use client";

import { useEffect, useRef, useState } from "react";
import { Phone, Scale, Gavel, Shield, Lock } from "lucide-react";

const coverages = [
  {
    icon: Phone,
    title: "עו״ד מומחה 24/7",
    desc: "קו חם לעורך דין — לפני העדות, לא אחרי.",
    stat: "24/7",
  },
  {
    icon: Gavel,
    title: "הגנה פלילית ומנהלית",
    desc: "ייצוג מלא, ערעורים, הגנה בהליכים מנהליים.",
    stat: "400,000₪",
  },
  {
    icon: Scale,
    title: "כיסוי צד שלישי",
    desc: "נזקי גוף ורכוש לצד שלישי — אתה לא משלם.",
    stat: "3,000,000₪",
  },
  {
    icon: Shield,
    title: "כיסוי אירועי טרור",
    desc: "שימוש בנשק באירוע טרור + הגנה משפטית אחרי.",
    stat: "כלול",
  },
  {
    icon: Lock,
    title: "גניבת נשק",
    desc: "כיסוי פלילי + החזר כספי על האקדח.",
    stat: "כלול",
  },
];

export const SolutionSection = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} id="modules" className="py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-center mb-3"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease" }}>
          מה הביטוח <span className="text-[var(--accent-blue)]">נותן לך</span>?
        </h2>
        <p className="text-[var(--text-secondary)] text-center mb-12"
          style={{ opacity: visible ? 1 : 0, transition: "opacity 0.6s ease 0.2s" }}>
          הכיסוי המלא למחזיקי נשק ברישיון
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {coverages.map((c, i) => {
            const Icon = c.icon;
            return (
              <div key={c.title}
                className="p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] flex items-start gap-4"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(15px)",
                  transition: `all 0.5s ease ${0.2 + i * 0.1}s`,
                }}>
                <div className="w-11 h-11 rounded-xl bg-[var(--accent-blue)]/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-[var(--accent-blue)]" strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-base font-black text-[var(--text-primary)]">{c.title}</h3>
                    <span className="text-sm font-black text-[var(--accent-blue)]">{c.stat}</span>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)]">{c.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
