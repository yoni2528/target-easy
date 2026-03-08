"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ScenarioVisual } from "./ScenarioVisuals";

const scenarios = [
  { title: "ירי באימון", desc: "כדור פגע בצד שלישי במטווח. מי משלם על הטיפול הרפואי, על הנזק, על התביעה?" },
  { title: "גניבת נשק", desc: "הנשק נגנב מהרכב או מהבית. חקירה משטרתית, תביעה אזרחית — ואתה לבד." },
  { title: "חקירה פלילית", desc: "השתמשת בנשק באירוע. צריך עורך דין פלילי עכשיו — לא מחר." },
  { title: "תביעת נזיקין", desc: "נזק לרכוש של צד שלישי. תביעה של מאות אלפי שקלים." },
  { title: "הצלת חיים", desc: "פעלת נכון ומנעת פיגוע — ועדיין פותחים נגדך חקירה." },
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
    if (w === 1 || w === -1) return { transform: `translateX(${w * -65}%) scale(0.8)`, opacity: 0.3, zIndex: 5 };
    return { transform: `translateX(${w * -100}%) scale(0.6)`, opacity: 0, zIndex: 0 };
  };

  return (
    <section ref={ref} className="py-24 px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <h2
          className="text-3xl md:text-4xl font-black text-center mb-3"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease" }}
        >
          מתי <span className="text-[var(--accent-red)]">צריך</span> ביטוח?
        </h2>
        <p
          className="text-[var(--text-secondary)] text-center mb-14 max-w-lg mx-auto"
          style={{ opacity: visible ? 1 : 0, transition: "opacity 0.6s ease 0.2s" }}
        >
          5 תרחישים אמיתיים שקורים כל שנה למחזיקי נשק
        </p>

        {/* Carousel */}
        <div
          className="relative mx-auto"
          style={{ maxWidth: 600, opacity: visible ? 1 : 0, transition: "opacity 0.6s ease 0.3s" }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Visual slides — icon dominant */}
          <div className="relative" style={{ height: 260 }}>
            {scenarios.map((s, i) => {
              const style = getSlideStyle(i);
              return (
                <div
                  key={s.title}
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ ...style, transition: "transform 0.5s ease, opacity 0.5s ease", pointerEvents: style.zIndex === 10 ? "auto" : "none" }}
                >
                  <div className="w-full max-w-sm rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-lg p-6 pt-8 flex flex-col items-center">
                    {/* Visual scene */}
                    <ScenarioVisual index={i} isActive={i === active} />
                    {/* Number + Title */}
                    <span className="text-xs font-bold tracking-widest text-[var(--accent-red)] mt-3 mb-1">
                      תרחיש {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-2xl font-black text-[var(--text-primary)]">{s.title}</h3>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Arrows */}
          <button onClick={() => go(1)}
            className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-14 w-10 h-10 rounded-full bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-md flex items-center justify-center hover:bg-[var(--bg-elevated)] transition-colors z-20"
          >
            <ChevronRight className="w-5 h-5 text-[var(--text-secondary)]" />
          </button>
          <button onClick={() => go(-1)}
            className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-14 w-10 h-10 rounded-full bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-md flex items-center justify-center hover:bg-[var(--bg-elevated)] transition-colors z-20"
          >
            <ChevronLeft className="w-5 h-5 text-[var(--text-secondary)]" />
          </button>
        </div>

        {/* Description below — only active */}
        <div className="max-w-md mx-auto text-center mt-6 min-h-[60px]">
          <p
            key={active}
            className="text-base text-[var(--text-secondary)] leading-relaxed animate-[fadeInUp_0.4s_ease-out]"
          >
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
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
