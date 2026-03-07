"use client";

import { useEffect, useRef, useState } from "react";
import {
  Scale, Gavel, Gift, Phone,
  ChevronDown,
} from "lucide-react";

const modules = [
  {
    icon: Scale,
    number: "01",
    title: "כיסוי משפטי מלא",
    desc: "ביטוח אחריות צד ג׳ מקיף דרך מנורה ביטוח. כיסוי לנזקי גוף ורכוש שנגרמו לצד שלישי — הגנה רחבה שנותנת לך שקט.",
    features: [
      "כיסוי עד 3,000,000 ש״ח",
      "נזקי גוף לצד שלישי",
      "נזקי רכוש לצד שלישי",
      "מנורה ביטוח — יציבות ואמינות",
    ],
    accent: "var(--accent-blue)",
  },
  {
    icon: Gavel,
    number: "02",
    title: "הגנה פלילית ומנהלית",
    desc: "אם תצטרך עורך דין, אנחנו כאן. כיסוי מלא להגנה משפטית, ייצוג בבית משפט וערעורים — בפלילי ובמנהלי.",
    features: [
      "כיסוי עד 400,000 ש״ח",
      "עורך דין פלילי",
      "הגנה בהליכים מנהליים",
      "ערעורים וייצוג מלא",
    ],
    accent: "var(--accent-amber)",
  },
  {
    icon: Gift,
    number: "03",
    title: "החזרים והטבות",
    desc: "הביטוח לא רק מגן — הוא גם מחזיר לך כסף. החזרים על אימוני ירי, חידוש רישיון וציוד במטווח. ככה ביטוח צריך לעבוד.",
    features: [
      "אימוני ירי — החזר עד 600 ש״ח",
      "חידוש רישיון — החזר עד 300 ש״ח",
      "ציוד במטווח — החזר עד 450 ש״ח",
      "סה״כ החזרים: עד 1,350 ש״ח בשנה",
    ],
    accent: "var(--accent-green)",
  },
  {
    icon: Phone,
    number: "04",
    title: "קו חם וסיוע מורחב",
    desc: "קו חם לעורך דין זמין 24/7. במקרה גניבה — תקבל החזר. פעלת להצלת חיים? אנחנו איתך לכל אורך הדרך.",
    features: [
      "קו חם לעורך דין 24/7",
      "החזר במקרה גניבת נשק",
      "סיוע משפטי מיידי",
      "ליווי אישי בכל שלב",
    ],
    accent: "var(--accent-blue)",
  },
];

const VisualCard = ({ module, isActive }: {
  module: typeof modules[0]; isActive: boolean;
}) => {
  const Icon = module.icon;
  return (
    <div
      className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
        isActive ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
      }`}
    >
      <div className="w-[340px] md:w-[400px] p-8 rounded-3xl bg-[var(--bg-card)]/80 border border-[var(--border-subtle)] backdrop-blur-sm">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
          style={{ background: `color-mix(in srgb, ${module.accent} 15%, transparent)` }}
        >
          <Icon className="w-8 h-8" style={{ color: module.accent }} strokeWidth={1.5} />
        </div>
        <div className="space-y-3">
          {module.features.map((f, i) => (
            <div
              key={f}
              className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-elevated)]/60 border border-[var(--border-subtle)]"
              style={{
                transitionDelay: isActive ? `${i * 100}ms` : "0ms",
                opacity: isActive ? 1 : 0,
                transform: isActive ? "translateX(0)" : "translateX(-10px)",
                transition: "opacity 0.4s ease, transform 0.4s ease",
              }}
            >
              <span
                className="text-sm font-bold shrink-0"
                style={{ color: module.accent }}
              >
                ✓
              </span>
              <span className="text-sm text-[var(--text-secondary)]">{f}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const TextBlock = ({
  module, isActive, onClick,
}: {
  module: typeof modules[0]; isActive: boolean; onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className={`min-h-[80vh] flex flex-col justify-center py-12 transition-opacity duration-500 cursor-pointer ${
      isActive ? "opacity-100" : "opacity-30"
    }`}
  >
    <div
      className="text-sm font-bold tracking-widest mb-3"
      style={{ color: module.accent }}
    >
      מודול {module.number}
    </div>
    <h3 className="text-3xl md:text-4xl font-black text-[var(--text-primary)] mb-4 leading-tight">
      {module.title}
    </h3>
    <p className="text-base text-[var(--text-secondary)] leading-relaxed max-w-sm">
      {module.desc}
    </p>
  </div>
);

export const InsuranceModules = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const center = window.innerHeight / 2;
      let closest = 0;
      let minDist = Infinity;

      textRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const mid = rect.top + rect.height / 2;
        const dist = Math.abs(mid - center);
        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      });

      setActiveIdx(closest);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="modules" ref={sectionRef} className="relative">
      {/* Section header */}
      <div className="pt-20 pb-8 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-black mb-3">
          מה אתה <span className="text-[var(--accent-blue)]">מקבל</span>?
        </h2>
        <p className="text-[var(--text-secondary)] max-w-lg mx-auto mb-4">
          ביטוח אחריות — המעטפת השלמה למחזיקי נשק ברישיון
        </p>
        <div className="flex items-center justify-center gap-2 text-xs text-[var(--text-muted)]">
          <span>גלול למטה לצפייה בכל המודולים</span>
          <ChevronDown className="w-3 h-3 animate-bounce" />
        </div>
      </div>

      {/* Progress dots - fixed on side */}
      <div className="hidden md:flex fixed left-6 top-1/2 -translate-y-1/2 flex-col gap-3 z-30">
        {modules.map((m, i) => (
          <button
            key={m.number}
            onClick={() => {
              textRefs.current[i]?.scrollIntoView({
                behavior: "smooth",
                block: "center",
              });
            }}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              i === activeIdx
                ? "scale-150 shadow-[0_0_8px] shadow-[var(--accent-blue)]"
                : "bg-[var(--border-default)] hover:bg-[var(--text-muted)]"
            }`}
            style={i === activeIdx ? { background: m.accent } : {}}
            title={m.title}
          />
        ))}
      </div>

      {/* Sticky layout */}
      <div className="flex flex-col md:flex-row max-w-6xl mx-auto px-6">
        {/* Text panel (scrolls) */}
        <div className="md:w-[45%] md:order-1">
          {modules.map((m, i) => (
            <div
              key={m.number}
              ref={(el) => { textRefs.current[i] = el; }}
            >
              <TextBlock
                module={m}
                isActive={i === activeIdx}
                onClick={() => {
                  textRefs.current[i]?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
                }}
              />
            </div>
          ))}
        </div>

        {/* Visual panel (sticky) */}
        <div className="hidden md:block md:w-[55%] md:order-2">
          <div className="sticky top-0 h-screen flex items-center justify-center">
            <div className="relative w-full h-[420px]">
              {modules.map((m, i) => (
                <VisualCard
                  key={m.number}
                  module={m}
                  isActive={i === activeIdx}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: show features inline */}
        <div className="md:hidden space-y-8 pb-12">
          {modules.map((m) => (
            <MobileModuleCard key={m.number} module={m} />
          ))}
        </div>
      </div>
    </section>
  );
};

const MobileModuleCard = ({ module }: { module: typeof modules[0] }) => {
  const Icon = module.icon;
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
    <div
      ref={ref}
      className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)]"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ background: `color-mix(in srgb, ${module.accent} 15%, transparent)` }}
        >
          <Icon className="w-6 h-6" style={{ color: module.accent }} strokeWidth={1.5} />
        </div>
        <div>
          <span className="text-xs font-bold" style={{ color: module.accent }}>
            מודול {module.number}
          </span>
          <h3 className="text-lg font-bold text-[var(--text-primary)]">{module.title}</h3>
        </div>
      </div>
      <p className="text-sm text-[var(--text-secondary)] mb-4">{module.desc}</p>
      <div className="space-y-2">
        {module.features.map((f) => (
          <div
            key={f}
            className="flex items-center gap-2 text-sm text-[var(--text-secondary)]"
          >
            <span style={{ color: module.accent }} className="font-bold">✓</span>
            {f}
          </div>
        ))}
      </div>
    </div>
  );
};
