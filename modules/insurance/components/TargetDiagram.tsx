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

const CX = 480, CY = 255;
const anns = [
  { rr: 210, a: 38, right: true, ey: 60 },
  { rr: 154, a: 145, right: false, ey: 140 },
  { rr: 98, a: -35, right: true, ey: 390 },
  { rr: 42, a: -145, right: false, ey: 450 },
];

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

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setRot({ x: ((e.clientY - r.top) / r.height - 0.5) * -16 + 14, y: ((e.clientX - r.left) / r.width - 0.5) * 20 });
  };

  return (
    <section ref={ref} className="py-28 px-6" style={{ background: "#f5f5f7" }}>
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-black text-[#1d1d1f] mb-3"
          style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease", letterSpacing: "-0.02em" }}>
          איך <span className="text-[var(--accent-blue)]">הביטוח</span> עובד?
        </h2>
        <p className="text-[#86868b] mb-16" style={{ opacity: v ? 1 : 0, transition: "opacity 0.6s ease 0.2s" }}>
          4 שכבות הגנה — מהאירוע ועד הכיסוי המלא
        </p>

        {/* Desktop — target with annotation lines */}
        <div className="hidden md:block" onMouseMove={onMove} onMouseLeave={() => setRot({ x: 14, y: -6 })}
          style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(40px)", transition: "all 0.8s cubic-bezier(0.32,0.72,0,1) 0.3s" }}>
          <div style={{ transform: `perspective(900px) rotateX(${rot.x}deg) rotateY(${rot.y}deg)`, transition: "transform 0.12s ease-out", transformStyle: "preserve-3d" }}>
            <svg viewBox="0 0 960 510" className="w-full max-w-[880px] mx-auto"
              style={{ filter: "drop-shadow(0 25px 50px rgba(26,111,204,0.14)) drop-shadow(0 8px 16px rgba(0,0,0,0.06))" }}>
              <ellipse cx={CX} cy={CY + 8} rx="214" ry="214" fill="#1254a0" opacity="0.2" />
              {rings.map((ring, i) => (
                <circle key={i} cx={CX} cy={CY} r={ring.r} fill={ring.fill} stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />
              ))}
              <circle cx={CX} cy={CY} r="12" fill="#fff" opacity="0.15" />
              <line x1={CX - 215} y1={CY} x2={CX + 215} y2={CY} stroke="white" opacity="0.06" strokeWidth="0.8" />
              <line x1={CX} y1={CY - 215} x2={CX} y2={CY + 215} stroke="white" opacity="0.06" strokeWidth="0.8" />

              {anns.map((an, i) => {
                const rad = an.a * Math.PI / 180;
                const sx = CX + an.rr * Math.cos(rad), sy = CY - an.rr * Math.sin(rad);
                const dx = an.right ? 720 : 240;
                const elbX = an.right ? dx - 25 : dx + 25;
                const tx = an.right ? dx + 18 : 12;
                const tw = an.right ? 218 : dx - 30;
                return (
                  <g key={i} style={{ opacity: v ? 1 : 0, transition: `opacity 0.5s ease ${0.8 + i * 0.15}s` }}>
                    <path d={`M${sx},${sy} L${elbX},${an.ey} L${dx},${an.ey}`}
                      fill="none" stroke="#1a6fcc" strokeWidth="2" strokeDasharray="6 4" opacity="0.7" />
                    <circle cx={sx} cy={sy} r="6" fill="#1a6fcc" opacity="0.85" />
                    <circle cx={dx} cy={an.ey} r="5" fill="#1a6fcc" />
                    <foreignObject x={tx} y={an.ey - 24} width={tw} height="56">
                      <div style={{ direction: "rtl", textAlign: an.right ? "left" : "right" }}>
                        <p style={{ fontSize: 16, fontWeight: 800, color: "#1d1d1f", margin: 0, lineHeight: 1.3 }}>
                          <span style={{ color: "#1a6fcc", marginLeft: 5, fontSize: 18 }}>{i + 1}.</span> {steps[i].label}
                        </p>
                        <p style={{ fontSize: 13, color: "#6b6b80", margin: "3px 0 0", lineHeight: 1.3 }}>{steps[i].sub}</p>
                      </div>
                    </foreignObject>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Mobile — target + list */}
        <div className="md:hidden" style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(40px)", transition: "all 0.8s cubic-bezier(0.32,0.72,0,1) 0.3s" }}>
          <svg viewBox="0 0 460 460" className="w-64 mx-auto mb-10"
            style={{ filter: "drop-shadow(0 20px 40px rgba(26,111,204,0.15))" }}>
            <ellipse cx="230" cy="238" rx="214" ry="214" fill="#1254a0" opacity="0.2" />
            {rings.map((ring, i) => (
              <circle key={i} cx="230" cy="230" r={ring.r} fill={ring.fill} stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />
            ))}
            <circle cx="230" cy="230" r="12" fill="#fff" opacity="0.15" />
          </svg>
          <div className="flex flex-col gap-4 max-w-xs mx-auto">
            {steps.map((s, i) => (
              <div key={i} className="flex gap-3 items-start text-right">
                <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: "rgba(26,111,204,0.1)" }}>
                  <span className="text-xs font-black" style={{ color: "#1a6fcc" }}>{i + 1}</span>
                </div>
                <div>
                  <p className="text-sm font-black text-[#1d1d1f]">{s.label}</p>
                  <p className="text-xs text-[#86868b]">{s.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
