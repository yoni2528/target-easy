"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ScenarioVisual } from "./ScenarioVisuals";

const scenarios = [
  { title: "פליטת כדור", brief: "ירי לא מכוון שפוגע באדם או ברכוש",
    full: "כדור נורה בטעות בזמן אימון, ניקוי או שליפה. הנפגע מגיש תביעת נזיקין. עלויות משפטיות: ₪50,000+. פיצויים אפשריים: עד ₪3,000,000." },
  { title: "כשצריך עורך דין", brief: "שיהיה זמין 24/7 או שלא רוצים לסמוך על הסנגוריה הציבורית",
    full: "הסנגור הציבורי לא מומחה לנשק, לא זמין 24/7 ולא מכיר את העולם שלך. בשעה קריטית אתה צריך עו״ד שמבין את התחום." },
  { title: "עצירת פיגוע", brief: "פעלת נכון — עדיין חשוף לתביעה",
    full: "ניטרלת מחבל ופעלת כגיבור. אבל המשפחה תובעת. עלות ייצוג: ₪100,000+. בלי ביטוח — אתה לבד מול המערכת." },
  { title: "עצירת פיגוע שגויה", brief: "טעות בזיהוי — חקירה פלילית",
    full: "חשבת שזה מחבל, טעית. תביעה אזרחית + חקירה פלילית. עלות ייצוג: ₪50,000+. הקריירה והחירות שלך בסכנה." },
  { title: "גניבת נשק", brief: "הנשק נגנב — תיק פלילי נפתח",
    full: "הנשק נגנב מהרכב או מהבית. נפתח תיק פלילי בגין רשלנות. עלות ייצוג: ₪30,000+. רישיון הנשק בסכנה." },
  { title: "פגיעה בצד ג׳", brief: "פגיעה באדם או ברכוש בזמן שימוש לגיטימי בנשק",
    full: "ירי במטווח, אימון או הגנה עצמית שפוגע בעובר אורח. הנפגע תובע פיצויים. עלות ייצוג: ₪40,000+. פיצויים אפשריים: עד ₪3,000,000." },
];

const N = scenarios.length;

export const ScenariosSection = () => {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const touchStart = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => setHovered(false), [active]);

  // Auto-play: advance every 5s, pause on hover
  useEffect(() => {
    if (hovered || !visible) return;
    const id = setInterval(() => setActive((p) => (p + 1) % N), 5000);
    return () => clearInterval(id);
  }, [hovered, visible]);

  const go = useCallback((dir: number) => setActive((p) => (p + dir + N) % N), []);
  const onTouchStart = (e: React.TouchEvent) => { touchStart.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (diff > 50) go(1);
    if (diff < -50) go(-1);
  };

  const getOff = (i: number) => {
    let d = i - active;
    if (d > N / 2) d -= N;
    if (d < -N / 2) d += N;
    return d;
  };

  return (
    <section ref={ref} className="py-28 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-black text-center mb-2"
          style={{ color: "#1d1d1f", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s cubic-bezier(0.32,0.72,0,1)", letterSpacing: "-0.02em" }}>
          מתי צריך <span className="text-[var(--accent-red)]">ביטוח לאקדח?</span>
        </h2>
        <p className="text-center mb-14 text-lg" style={{ color: "#86868b", opacity: visible ? 1 : 0, transition: "opacity 0.8s ease 0.2s" }}>
          6 סכנות אמיתיות למחזיקי נשק
        </p>
      </div>

      <div className="relative" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}
        style={{ perspective: "1200px", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s cubic-bezier(0.32,0.72,0,1) 0.3s" }}>
        <div style={{ position: "relative", height: 480, maxWidth: 1000, margin: "0 auto" }}>
          {scenarios.map((s, i) => {
            const d = getOff(i);
            const absD = Math.abs(d);
            if (absD > 2) return null;
            const isAct = i === active;
            const isHov = isAct && hovered;
            return (
              <div key={i} className="absolute inset-y-0" style={{
                width: 320,
                left: "50%",
                transform: `translateX(-50%) translateX(${d * 280}px) translateZ(${absD === 0 ? 30 : -60}px) rotateY(${d * -40}deg) scale(${isHov ? 1.06 : absD === 0 ? 1 : 0.85})`,
                opacity: absD === 0 ? 1 : absD === 1 ? 0.5 : 0.15,
                zIndex: 10 - absD,
                transition: "all 0.7s cubic-bezier(0.32, 0.72, 0, 1)",
                pointerEvents: isAct ? "auto" : "none",
              }}
                onMouseEnter={() => isAct && setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                <div className="h-full flex flex-col items-center justify-center px-6"
                  style={{ borderRadius: 28, background: "linear-gradient(180deg, #f5f5f7, #fbfbfd)", boxShadow: isAct ? "0 25px 50px -12px rgba(0,0,0,0.12)" : "none", cursor: isAct ? "pointer" : "default" }}>
                  <div style={{ width: "100%", maxWidth: isHov ? 250 : 230, height: isHov ? 200 : 190, transition: "all 0.4s ease" }}>
                    <ScenarioVisual index={i} isActive={isAct} />
                  </div>
                  <div className="text-center mt-3" style={{ maxWidth: 280 }}>
                    <h3 className="text-lg md:text-xl font-black mb-1" style={{ color: "#1d1d1f" }}>{s.title}</h3>
                    <p className="text-sm" style={{ color: "#86868b" }}>{s.brief}</p>
                    <div style={{
                      maxHeight: isHov ? 120 : 0, opacity: isHov ? 1 : 0,
                      overflow: "hidden", transition: "all 0.5s cubic-bezier(0.32,0.72,0,1)",
                    }}>
                      <p className="text-xs leading-relaxed mt-3 px-1" style={{ color: "#4a4a5a" }}>{s.full}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button onClick={() => go(-1)}
          className="absolute top-1/2 -translate-y-1/2 right-4 md:right-12 w-10 h-10 flex items-center justify-center rounded-full z-20 cursor-pointer"
          style={{ background: "rgba(255,255,255,0.72)", backdropFilter: "blur(12px)", boxShadow: "0 1px 8px rgba(0,0,0,0.08)" }}>
          <span style={{ color: "#1d1d1f", fontSize: 18 }}>›</span>
        </button>
        <button onClick={() => go(1)}
          className="absolute top-1/2 -translate-y-1/2 left-4 md:left-12 w-10 h-10 flex items-center justify-center rounded-full z-20 cursor-pointer"
          style={{ background: "rgba(255,255,255,0.72)", backdropFilter: "blur(12px)", boxShadow: "0 1px 8px rgba(0,0,0,0.08)" }}>
          <span style={{ color: "#1d1d1f", fontSize: 18 }}>‹</span>
        </button>
      </div>

      <div className="flex justify-center gap-2 mt-8">
        {scenarios.map((_, i) => (
          <button key={i} onClick={() => setActive(i)} className="transition-all duration-500 cursor-pointer"
            style={{ width: i === active ? 28 : 8, height: 8, borderRadius: 4, background: i === active ? "#1d1d1f" : "#d2d2d7" }} />
        ))}
      </div>
      <p className="md:hidden text-center text-xs text-[#a0a0b0] mt-3">← החליקו →</p>
    </section>
  );
};
