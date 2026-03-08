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
    if (w === 0) return { transform: "translateX(0) scale(1) rotateY(0)", opacity: 1, zIndex: 10 };
    if (w === 1 || w === -1) return { transform: `translateX(${w * -55}%) scale(0.85) rotateY(${w * 8}deg)`, opacity: 0.4, zIndex: 5 };
    return { transform: `translateX(${w * -100}%) scale(0.7) rotateY(${w * 15}deg)`, opacity: 0, zIndex: 0 };
  };

  return (
    <section ref={ref} className="py-20 px-6 overflow-hidden bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-center text-[#37374e] mb-3"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease" }}>
          מקרים שקורים <span className="text-[var(--accent-red)]">כל שנה</span>
        </h2>
        <p className="text-[#6b6b80] text-center mb-12"
          style={{ opacity: visible ? 1 : 0, transition: "opacity 0.6s ease 0.2s" }}>
          5 תרחישים אמיתיים למחזיקי נשק
        </p>

        <div className="relative mx-auto" style={{ maxWidth: 650, perspective: "1200px", opacity: visible ? 1 : 0, transition: "opacity 0.6s ease 0.3s" }}
          onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <div className="relative" style={{ height: 340 }}>
            {scenarios.map((_, i) => {
              const style = getSlideStyle(i);
              return (
                <div key={i} className="absolute inset-0 flex items-center justify-center"
                  style={{ ...style, transition: "all 0.6s cubic-bezier(0.16,1,0.3,1)", pointerEvents: style.zIndex === 10 ? "auto" : "none", transformStyle: "preserve-3d" }}>
                  <div className="w-full max-w-md h-full overflow-hidden"
                    style={{
                      borderRadius: "24px", background: "#f8faff", border: "1px solid #e8edf5",
                      boxShadow: style.zIndex === 10 ? "0 25px 50px -12px rgba(0,0,0,0.1)" : "0 10px 20px -5px rgba(0,0,0,0.05)",
                    }}>
                    <ScenarioVisual index={i} isActive={i === active} />
                  </div>
                </div>
              );
            })}
          </div>

          {[{ dir: 1, pos: "-right-4 md:-right-14", Icon: ChevronRight }, { dir: -1, pos: "-left-4 md:-left-14", Icon: ChevronLeft }].map(({ dir, pos, Icon }) => (
            <button key={dir} onClick={() => go(dir)}
              className={`absolute top-1/2 -translate-y-1/2 ${pos} w-11 h-11 flex items-center justify-center hover:scale-105 transition-transform z-20`}
              style={{ borderRadius: "50%", background: "white", border: "1px solid #e8edf5", boxShadow: "0 8px 20px -5px rgba(0,0,0,0.08)" }}>
              <Icon className="w-5 h-5 text-[#6b6b80]" />
            </button>
          ))}
        </div>

        <div className="max-w-md mx-auto text-center mt-8 min-h-[100px]">
          <h3 key={`t-${active}`} className="text-xl font-black text-[#37374e] mb-1 animate-[fadeInUp_0.4s_ease-out]">
            {scenarios[active].title}
          </h3>
          <p key={`s-${active}`} className="text-sm font-bold text-[var(--accent-red)] mb-2 animate-[fadeInUp_0.4s_ease-out]">
            {scenarios[active].subtitle}
          </p>
          <p key={`d-${active}`} className="text-sm text-[#6b6b80] leading-relaxed animate-[fadeInUp_0.4s_ease-out]">
            {scenarios[active].desc}
          </p>
        </div>

        <div className="flex justify-center gap-2.5 mt-6">
          {scenarios.map((_, i) => (
            <button key={i} onClick={() => setActive(i)}
              className="w-3 h-3 rounded-full transition-all duration-300"
              style={{
                background: i === active ? "var(--accent-red)" : "#dde0e6",
                transform: i === active ? "scale(1.3)" : "scale(1)",
                boxShadow: i === active ? "0 4px 10px -2px color-mix(in srgb, var(--accent-red) 40%, transparent)" : "none",
              }} />
          ))}
        </div>
      </div>
    </section>
  );
};
