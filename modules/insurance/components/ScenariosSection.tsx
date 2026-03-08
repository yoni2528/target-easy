"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Crosshair, CarFront, Gavel, Building2, Heart, ChevronLeft, ChevronRight } from "lucide-react";

const scenarios = [
  { icon: Crosshair, title: "ירי באימון", desc: "כדור פגע בצד שלישי במטווח. מי משלם על הטיפול הרפואי, על הנזק, על התביעה?" },
  { icon: CarFront, title: "גניבת נשק", desc: "הנשק נגנב מהרכב או מהבית. חקירה משטרתית, תביעה אזרחית — ואתה לבד." },
  { icon: Gavel, title: "חקירה פלילית", desc: "השתמשת בנשק באירוע. צריך עורך דין פלילי עכשיו — לא מחר." },
  { icon: Building2, title: "תביעת נזיקין", desc: "נזק לרכוש של צד שלישי. תביעה של מאות אלפי שקלים." },
  { icon: Heart, title: "הצלת חיים", desc: "פעלת נכון ומנעת פיגוע — ועדיין פותחים נגדך חקירה." },
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
    if (Math.abs(diff) > 50) go(diff > 0 ? -1 : 1); // RTL: swipe left = next (go -1 in RTL)
  };

  const getSlideStyle = (i: number) => {
    const diff = i - active;
    const wrappedDiff = diff > 2 ? diff - scenarios.length : diff < -2 ? diff + scenarios.length : diff;

    if (wrappedDiff === 0) return { transform: "translateX(0) scale(1)", opacity: 1, zIndex: 10 };
    if (wrappedDiff === 1 || wrappedDiff === -1) {
      const xDir = wrappedDiff * -65; // RTL
      return { transform: `translateX(${xDir}%) scale(0.8)`, opacity: 0.35, zIndex: 5 };
    }
    return { transform: `translateX(${wrappedDiff * -100}%) scale(0.6)`, opacity: 0, zIndex: 0 };
  };

  const ActiveIcon = scenarios[active].icon;

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
          {/* Slides container */}
          <div className="relative" style={{ height: 320 }}>
            {scenarios.map((s, i) => {
              const style = getSlideStyle(i);
              return (
                <div
                  key={s.title}
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    ...style,
                    transition: "transform 0.5s ease, opacity 0.5s ease",
                    pointerEvents: style.zIndex === 10 ? "auto" : "none",
                  }}
                >
                  <div className="w-full max-w-md p-8 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-lg text-center">
                    {/* Large icon */}
                    <div className="relative w-20 h-20 rounded-2xl bg-[var(--accent-red)]/10 flex items-center justify-center mx-auto mb-6">
                      <div
                        className="absolute inset-0 rounded-2xl bg-[var(--accent-red)]/15"
                        style={{
                          animation: i === active ? "alert-ping 1.5s ease-out infinite" : "none",
                        }}
                      />
                      <s.icon className="w-10 h-10 text-[var(--accent-red)] relative z-10" strokeWidth={1.5} />
                    </div>
                    {/* Number badge */}
                    <span className="text-xs font-bold tracking-widest text-[var(--accent-red)] mb-2 block">
                      תרחיש {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-2xl font-black text-[var(--text-primary)] mb-3">{s.title}</h3>
                    <p className="text-base text-[var(--text-secondary)] leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation arrows */}
          <button
            onClick={() => go(1)}
            className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-14 w-10 h-10 rounded-full bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-md flex items-center justify-center hover:bg-[var(--bg-elevated)] transition-colors z-20"
          >
            <ChevronRight className="w-5 h-5 text-[var(--text-secondary)]" />
          </button>
          <button
            onClick={() => go(-1)}
            className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-14 w-10 h-10 rounded-full bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-md flex items-center justify-center hover:bg-[var(--bg-elevated)] transition-colors z-20"
          >
            <ChevronLeft className="w-5 h-5 text-[var(--text-secondary)]" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {scenarios.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
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
