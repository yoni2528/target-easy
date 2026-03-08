"use client";

import { useRef, useState, useEffect } from "react";
import { Crosshair, CarFront, Gavel, Building2, Heart } from "lucide-react";

const scenarios = [
  { icon: Crosshair, title: "ירי באימון", desc: "כדור פגע בצד שלישי — מי משלם?" },
  { icon: CarFront, title: "גניבת נשק", desc: "חקירה ותביעה מובטחות." },
  { icon: Gavel, title: "חקירה פלילית", desc: "צריך עורך דין — עכשיו." },
  { icon: Building2, title: "תביעת נזיקין", desc: "תביעה של מאות אלפים." },
  { icon: Heart, title: "הצלת חיים", desc: "פעלת נכון — ועדיין חוקרים אותך." },
];

const handleTilt = (e: React.MouseEvent<HTMLDivElement>) => {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
  const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
  el.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${y}deg) scale3d(1.02,1.02,1.02)`;
};

const resetTilt = (e: React.MouseEvent<HTMLDivElement>) => {
  e.currentTarget.style.transform = "";
};

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
            /* Outer: entrance animation */
            <div
              key={s.title}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : (i % 2 === 0 ? "translateX(-30px)" : "translateX(30px)"),
                transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`,
              }}
            >
              {/* Inner: 3D tilt */}
              <div
                className="flex items-center gap-5 p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-sm hover:border-[var(--accent-red)]/30 hover:shadow-md transition-[border,box-shadow] duration-300"
                style={{ transition: "transform 0.15s ease, border-color 0.3s, box-shadow 0.3s" }}
                onMouseMove={handleTilt}
                onMouseLeave={resetTilt}
              >
                <div className="relative w-12 h-12 rounded-xl bg-[var(--accent-red)]/10 flex items-center justify-center shrink-0">
                  <div
                    className="absolute inset-0 rounded-xl bg-[var(--accent-red)]/20"
                    style={{
                      animation: visible ? `alert-ping 0.8s ease-out ${0.3 + i * 0.15}s both` : "none",
                    }}
                  />
                  <s.icon className="w-6 h-6 text-[var(--accent-red)] relative z-10" strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-0.5">{s.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">{s.desc}</p>
                </div>
                <span className="text-3xl font-black text-[var(--accent-red)]/10 hidden md:block">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
