"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  { label: "אירוע קורה", sub: "ירי, גניבת נשק, תביעת נזיקין" },
  { label: "פונים אלינו", sub: "קו חם 24/7 — עו״ד עונה תוך דקות" },
  { label: "מקבלים ייצוג", sub: "הגנה פלילית + ייצוג אזרחי מלא" },
  { label: "מכוסים", sub: "עד ₪3,000,000 — לא משלם שקל" },
];

const rings = [
  { r: 210, fill: "#1a6fcc" }, { r: 182, fill: "#dce9f7" },
  { r: 154, fill: "#2580d8" }, { r: 126, fill: "#e6eff8" },
  { r: 98, fill: "#1560b8" }, { r: 70, fill: "#edf3fa" },
  { r: 42, fill: "#0e4e9e" },
];

const CX = 250, CY = 250;

export const TargetDiagram = () => {
  const [v, setV] = useState(false);
  const [rot, setRot] = useState({ x: 14, y: -6 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Gyroscope for mobile
  useEffect(() => {
    const handler = (e: DeviceOrientationEvent) => {
      const b = e.beta ?? 0, g = e.gamma ?? 0;
      setRot({ x: Math.max(-10, Math.min(25, b * 0.3)), y: Math.max(-15, Math.min(15, g * 0.4)) });
    };
    window.addEventListener("deviceorientation", handler);
    return () => window.removeEventListener("deviceorientation", handler);
  }, []);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setRot({ x: ((e.clientY - r.top) / r.height - 0.5) * -16 + 14, y: ((e.clientX - r.left) / r.width - 0.5) * 20 });
  };

  return (
    <section ref={ref} className="py-16 md:py-28 px-4 md:px-6" style={{ background: "#f5f5f7" }}>
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-2xl md:text-4xl font-black text-[#1d1d1f] mb-3"
          style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease", letterSpacing: "-0.02em" }}>
          איך <span className="text-[var(--accent-blue)]">הביטוח</span> עובד?
        </h2>
        <p className="text-sm md:text-base text-[#86868b] mb-10 md:mb-16" style={{ opacity: v ? 1 : 0, transition: "opacity 0.6s ease 0.2s" }}>
          4 שכבות הגנה — מהאירוע ועד הכיסוי המלא
        </p>

        {/* Target graphic */}
        <div onMouseMove={onMove} onMouseLeave={() => setRot({ x: 14, y: -6 })}
          style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(40px)", transition: "all 0.8s cubic-bezier(0.32,0.72,0,1) 0.3s" }}>
          <div style={{ transform: `perspective(900px) rotateX(${rot.x}deg) rotateY(${rot.y}deg)`, transition: "transform 0.12s ease-out", transformStyle: "preserve-3d" }}>
            <svg viewBox="0 0 500 500" className="w-full max-w-[280px] md:max-w-[420px] mx-auto"
              style={{ filter: "drop-shadow(0 25px 50px rgba(26,111,204,0.14)) drop-shadow(0 8px 16px rgba(0,0,0,0.06))" }}>
              <ellipse cx={CX} cy={CY + 8} rx="214" ry="214" fill="#1254a0" opacity="0.2" />
              {rings.map((ring, i) => (
                <circle key={i} cx={CX} cy={CY} r={ring.r} fill={ring.fill} stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />
              ))}
              <circle cx={CX} cy={CY} r="12" fill="#fff" opacity="0.15" />
              <line x1={CX - 215} y1={CY} x2={CX + 215} y2={CY} stroke="white" opacity="0.06" strokeWidth="0.8" />
              <line x1={CX} y1={CY - 215} x2={CX} y2={CY + 215} stroke="white" opacity="0.06" strokeWidth="0.8" />
            </svg>
          </div>
        </div>

        {/* Steps below target */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 mt-8 md:mt-12 max-w-3xl mx-auto" dir="rtl">
          {steps.map((s, i) => (
            <div key={i} className="text-center p-3 md:p-4 rounded-2xl"
              style={{ background: "#fff", border: "1px solid #e8edf5", boxShadow: "0 4px 12px rgba(0,0,0,0.04)", opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(16px)", transition: `all 0.5s ease ${0.8 + i * 0.12}s` }}>
              <span className="text-lg md:text-xl font-black text-[#1a6fcc]">{i + 1}.</span>
              <h3 className="text-sm md:text-base font-black text-[#1d1d1f] mt-1">{s.label}</h3>
              <p className="text-[11px] md:text-xs text-[#6b6b80] mt-1 leading-relaxed">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
