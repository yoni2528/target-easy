"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ScenarioVisual } from "./ScenarioVisuals";

const scenarios = [
  { title: "פליטת כדור", stat: "₪3,000,000", desc: "הנפגע תובע. אתה משלם." },
  { title: "הסנגוריה הציבורית", stat: "לא מומחה", desc: "עו״ד של המדינה. לא זמין 24/7." },
  { title: "עצירת פיגוע נכונה", stat: "₪65,000+", desc: "פעלת נכון — עדיין חשוף לתביעה." },
  { title: "עצירת פיגוע שגויה", stat: "₪50,000+", desc: "תביעה אזרחית + חקירה פלילית." },
  { title: "גניבת נשק", stat: "תיק פלילי", desc: "הנשק נגנב. תיק נפתח. הפסדת אקדח." },
  { title: "תביעת נזיקין", stat: "₪65–100K", desc: "רק כתב הגנה. עוד לפני המשפט." },
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
    setActive((p) => Math.max(0, Math.min(scenarios.length - 1, p + dir)));
  }, []);

  const onTouchStart = (e: React.TouchEvent) => { touchStart.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (diff > 50) go(1);
    if (diff < -50) go(-1);
  };

  return (
    <section ref={ref} className="py-28 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-black text-center mb-2"
          style={{ color: "#1d1d1f", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s cubic-bezier(0.32,0.72,0,1)", letterSpacing: "-0.02em" }}>
          מקרים שקורים <span className="text-[var(--accent-red)]">כל שנה</span>
        </h2>
        <p className="text-center mb-14 text-lg" style={{ color: "#86868b", opacity: visible ? 1 : 0, transition: "opacity 0.8s ease 0.2s" }}>
          6 תרחישים אמיתיים למחזיקי נשק
        </p>

        {/* Apple-style slider */}
        <div className="relative" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s cubic-bezier(0.32,0.72,0,1) 0.3s" }}>

          <div className="overflow-hidden" style={{ borderRadius: "28px" }}>
            <div style={{
              display: "flex",
              transform: `translateX(${active * 100}%)`,
              transition: "transform 0.6s cubic-bezier(0.32, 0.72, 0, 1)",
            }}>
              {scenarios.map((s, i) => (
                <div key={i} style={{ minWidth: "100%", flexShrink: 0 }}>
                  <div className="flex flex-col items-center justify-center px-8 md:px-16"
                    style={{ background: "linear-gradient(180deg, #f5f5f7 0%, #fbfbfd 100%)", minHeight: 480, paddingTop: 48, paddingBottom: 40 }}>
                    <div style={{ width: "100%", maxWidth: 260, height: 220 }}>
                      <ScenarioVisual index={i} isActive={i === active} />
                    </div>
                    <div className="text-center mt-4">
                      <span className="text-4xl md:text-5xl font-black block mb-3"
                        style={{ color: "var(--accent-red)", letterSpacing: "-0.02em" }}>
                        {s.stat}
                      </span>
                      <h3 className="text-xl md:text-2xl font-black mb-2" style={{ color: "#1d1d1f" }}>{s.title}</h3>
                      <p className="text-base" style={{ color: "#86868b" }}>{s.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Arrows — glass blur, Apple-minimal */}
          {active > 0 && (
            <button onClick={() => go(-1)}
              className="absolute top-1/2 -translate-y-1/2 right-3 md:-right-6 w-10 h-10 flex items-center justify-center rounded-full z-10"
              style={{ background: "rgba(255,255,255,0.72)", backdropFilter: "blur(12px)", boxShadow: "0 1px 8px rgba(0,0,0,0.08)" }}>
              <span style={{ color: "#1d1d1f", fontSize: 18 }}>›</span>
            </button>
          )}
          {active < scenarios.length - 1 && (
            <button onClick={() => go(1)}
              className="absolute top-1/2 -translate-y-1/2 left-3 md:-left-6 w-10 h-10 flex items-center justify-center rounded-full z-10"
              style={{ background: "rgba(255,255,255,0.72)", backdropFilter: "blur(12px)", boxShadow: "0 1px 8px rgba(0,0,0,0.08)" }}>
              <span style={{ color: "#1d1d1f", fontSize: 18 }}>‹</span>
            </button>
          )}
        </div>

        {/* Pill dots — Apple style */}
        <div className="flex justify-center gap-2 mt-8">
          {scenarios.map((_, i) => (
            <button key={i} onClick={() => setActive(i)}
              className="transition-all duration-500"
              style={{
                width: i === active ? 28 : 8,
                height: 8,
                borderRadius: 4,
                background: i === active ? "#1d1d1f" : "#d2d2d7",
              }} />
          ))}
        </div>
      </div>
    </section>
  );
};
