"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ScenarioVisual } from "./ScenarioVisuals";

const scenarios = [
  {
    title: "פליטת כדור",
    subtitle: "מה קורה עכשיו?",
    desc: "כדור פגע בצד שלישי במטווח. הנפגע מגיש תביעה. אתה נושא באחריות — מעו״ד ועד פיצויים. עלות: עד 3,000,000₪.",
  },
  {
    title: "עצירת פיגוע כמו שצריך",
    subtitle: "מה קורה עכשיו?",
    desc: "נותן עדות, מוכיח שפעלת נכון. עדיין חשוף לתביעה אזרחית מצד גורמים שמייצגים את המחבל. עלות: מ-65K₪ ועד מיליונים.",
  },
  {
    title: "עצירת פיגוע לא כמו שצריך",
    subtitle: "מה קורה עכשיו?",
    desc: "נותן עדות, מנסים להוכיח שלא פעלת נכון. חשוף לתביעה אזרחית וגם לחקירה פלילית. עלות: מ-50K₪ ועד מיליונים.",
  },
  {
    title: "גניבת נשק",
    subtitle: "מה קורה עכשיו?",
    desc: "מגיע שוטר לקחת עדות. במידה ולא עמדת בתקנות הנדרשות, נפתח תיק פלילי נגדך. הפסדת את האקדח ואתה משלם על ההגנה המשפטית.",
  },
  {
    title: "תביעת נזיקין",
    subtitle: "מה קורה עכשיו?",
    desc: "גרמת נזק לרכוש של צד שלישי. רק להעמיד כתב הגנה עולה 65-100K₪ — עוד לפני שהגעת לאולם בית המשפט.",
  },
];

export const ScenariosSection = () => {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const touchStart = useRef(0);

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

  const go = useCallback((dir: number) => {
    setActive((p) => (p + dir + scenarios.length) % scenarios.length);
  }, []);

  const onTouchStart = (e: React.TouchEvent) => { touchStart.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) go(diff > 0 ? -1 : 1);
  };

  const getSlideStyle = (i: number) => {
    const diff = i - active;
    const w = diff > 2 ? diff - scenarios.length : diff < -2 ? diff + scenarios.length : diff;
    if (w === 0) return { transform: "translateX(0) scale(1)", opacity: 1, zIndex: 10 };
    if (w === 1 || w === -1) return { transform: `translateX(${w * -55}%) scale(0.85)`, opacity: 0.3, zIndex: 5 };
    return { transform: `translateX(${w * -100}%) scale(0.7)`, opacity: 0, zIndex: 0 };
  };

  return (
    <section ref={ref} className="py-16 px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-center mb-3"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease" }}>
          מקרים שקורים <span className="text-[var(--accent-red)]">כל שנה</span>
        </h2>
        <p className="text-[var(--text-secondary)] text-center mb-12"
          style={{ opacity: visible ? 1 : 0, transition: "opacity 0.6s ease 0.2s" }}>
          5 תרחישים אמיתיים למחזיקי נשק
        </p>

        {/* Carousel */}
        <div className="relative mx-auto" style={{ maxWidth: 650, opacity: visible ? 1 : 0, transition: "opacity 0.6s ease 0.3s" }}
          onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <div className="relative" style={{ height: 320 }}>
            {scenarios.map((_, i) => {
              const style = getSlideStyle(i);
              return (
                <div key={i} className="absolute inset-0 flex items-center justify-center"
                  style={{ ...style, transition: "transform 0.5s ease, opacity 0.5s ease", pointerEvents: style.zIndex === 10 ? "auto" : "none" }}>
                  <div className="w-full max-w-md h-full rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] overflow-hidden">
                    <ScenarioVisual index={i} isActive={i === active} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Arrows */}
          <button onClick={() => go(1)}
            className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-14 w-10 h-10 rounded-full bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-md flex items-center justify-center hover:bg-[var(--bg-elevated)] transition-colors z-20">
            <ChevronRight className="w-5 h-5 text-[var(--text-secondary)]" />
          </button>
          <button onClick={() => go(-1)}
            className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-14 w-10 h-10 rounded-full bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-md flex items-center justify-center hover:bg-[var(--bg-elevated)] transition-colors z-20">
            <ChevronLeft className="w-5 h-5 text-[var(--text-secondary)]" />
          </button>
        </div>

        {/* Text below */}
        <div className="max-w-md mx-auto text-center mt-8 min-h-[100px]">
          <h3 key={`t-${active}`} className="text-xl font-black text-[var(--text-primary)] mb-1 animate-[fadeInUp_0.4s_ease-out]">
            {scenarios[active].title}
          </h3>
          <p key={`s-${active}`} className="text-sm font-bold text-[var(--accent-red)] mb-2 animate-[fadeInUp_0.4s_ease-out]">
            {scenarios[active].subtitle}
          </p>
          <p key={`d-${active}`} className="text-sm text-[var(--text-secondary)] leading-relaxed animate-[fadeInUp_0.4s_ease-out]">
            {scenarios[active].desc}
          </p>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {scenarios.map((_, i) => (
            <button key={i} onClick={() => setActive(i)}
              className="w-2.5 h-2.5 rounded-full transition-all duration-300"
              style={{
                background: i === active ? "var(--accent-red)" : "var(--border-default)",
                transform: i === active ? "scale(1.4)" : "scale(1)",
              }} />
          ))}
        </div>
      </div>
    </section>
  );
};
