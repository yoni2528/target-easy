"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Scale, Gavel, Gift, Phone, ChevronDown } from "lucide-react";

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
    desc: "הביטוח לא רק מגן — הוא גם מחזיר לך כסף. החזרים על אימוני ירי, חידוש רישיון וציוד במטווח.",
    features: [
      "אימוני ירי — החזר עד 600 ש״ח",
      "חידוש רישיון — החזר עד 300 ש״ח",
      "ציוד במטווח — החזר עד 450 ש״ח",
      "סה״כ החזרים: עד 1,350 ש״ח בשנה",
    ],
    accent: "var(--accent-amber)",
  },
  {
    icon: Phone,
    number: "04",
    title: "קו חם וסיוע מורחב",
    desc: "קו חם לעורך דין זמין 24/7. במקרה גניבה — תקבל החזר. פעלת להצלת חיים? אנחנו איתך.",
    features: [
      "קו חם לעורך דין 24/7",
      "החזר במקרה גניבת נשק",
      "סיוע משפטי מיידי",
      "ליווי אישי בכל שלב",
    ],
    accent: "var(--accent-blue)",
  },
];

const VisualCard = ({
  module,
  isActive,
}: {
  module: (typeof modules)[0];
  isActive: boolean;
}) => {
  const Icon = module.icon;
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        opacity: isActive ? 1 : 0,
        transform: isActive ? "scale(1) translateY(0)" : "scale(0.92) translateY(30px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
        pointerEvents: isActive ? "auto" : "none",
      }}
    >
      <div className="w-[380px] p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-subtle)]">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
          style={{
            background: `color-mix(in srgb, ${module.accent} 15%, transparent)`,
          }}
        >
          <Icon
            className="w-7 h-7"
            style={{ color: module.accent }}
            strokeWidth={1.5}
          />
        </div>
        <div className="space-y-3">
          {module.features.map((f, i) => (
            <div
              key={f}
              className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-elevated)]/60 border border-[var(--border-subtle)]"
              style={{
                opacity: isActive ? 1 : 0,
                transform: isActive ? "translateX(0)" : "translateX(-12px)",
                transition: `opacity 0.4s ease ${i * 80}ms, transform 0.4s ease ${i * 80}ms`,
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

export const InsuranceModules = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleScroll = useCallback(() => {
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
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollTo = (i: number) => {
    textRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section id="modules" className="relative">
      {/* Header */}
      <div className="pt-20 pb-8 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-black mb-3">
          מה אתה{" "}
          <span className="text-[var(--accent-green)]">מקבל</span>?
        </h2>
        <p className="text-[var(--text-secondary)] max-w-lg mx-auto mb-4">
          ביטוח אחריות — המעטפת השלמה למחזיקי נשק ברישיון
        </p>
        <div className="flex items-center justify-center gap-2 text-xs text-[var(--text-muted)]">
          <span>גלול למטה לצפייה בכל המודולים</span>
          <ChevronDown className="w-3 h-3 animate-bounce" />
        </div>
      </div>

      {/* Progress dots */}
      <div className="hidden md:flex fixed left-6 top-1/2 -translate-y-1/2 flex-col gap-3 z-30">
        {modules.map((m, i) => (
          <button
            key={m.number}
            onClick={() => scrollTo(i)}
            className="w-2.5 h-2.5 rounded-full transition-all duration-300"
            style={{
              background:
                i === activeIdx ? m.accent : "var(--border-default)",
              transform: i === activeIdx ? "scale(1.5)" : "scale(1)",
              boxShadow:
                i === activeIdx ? `0 0 8px ${m.accent}` : "none",
            }}
            title={m.title}
          />
        ))}
      </div>

      {/* Desktop: two-column sticky layout */}
      <div className="hidden md:block">
        <div
          className="max-w-6xl mx-auto px-6"
          style={{ display: "flex", direction: "ltr" }}
        >
          {/* Left: sticky visual */}
          <div style={{ width: "55%", position: "relative" }}>
            <div
              style={{
                position: "sticky",
                top: 0,
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div className="relative" style={{ width: 400, height: 420 }}>
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

          {/* Right: scrolling text */}
          <div style={{ width: "45%" }}>
            {modules.map((m, i) => (
              <div
                key={m.number}
                ref={(el) => {
                  textRefs.current[i] = el;
                }}
                onClick={() => scrollTo(i)}
                className="cursor-pointer"
                style={{
                  minHeight: "80vh",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  padding: "48px 0",
                  opacity: i === activeIdx ? 1 : 0.25,
                  transition: "opacity 0.5s ease",
                  direction: "rtl",
                }}
              >
                <div
                  className="text-sm font-bold tracking-widest mb-3"
                  style={{ color: m.accent }}
                >
                  מודול {m.number}
                </div>
                <h3 className="text-3xl font-black text-[var(--text-primary)] mb-4 leading-tight">
                  {m.title}
                </h3>
                <p className="text-base text-[var(--text-secondary)] leading-relaxed max-w-sm">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: card layout */}
      <div className="md:hidden space-y-6 px-6 pb-12">
        {modules.map((m, i) => (
          <MobileCard key={m.number} module={m} index={i} />
        ))}
      </div>
    </section>
  );
};

const MobileCard = ({
  module,
  index,
}: {
  module: (typeof modules)[0];
  index: number;
}) => {
  const Icon = module.icon;
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
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
        transition: `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`,
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{
            background: `color-mix(in srgb, ${module.accent} 15%, transparent)`,
          }}
        >
          <Icon
            className="w-6 h-6"
            style={{ color: module.accent }}
            strokeWidth={1.5}
          />
        </div>
        <div>
          <span
            className="text-xs font-bold"
            style={{ color: module.accent }}
          >
            מודול {module.number}
          </span>
          <h3 className="text-lg font-bold text-[var(--text-primary)]">
            {module.title}
          </h3>
        </div>
      </div>
      <p className="text-sm text-[var(--text-secondary)] mb-4">{module.desc}</p>
      <div className="space-y-2">
        {module.features.map((f) => (
          <div
            key={f}
            className="flex items-center gap-2 text-sm text-[var(--text-secondary)]"
          >
            <span style={{ color: module.accent }} className="font-bold">
              ✓
            </span>
            {f}
          </div>
        ))}
      </div>
    </div>
  );
};
