"use client";

import { useEffect, useRef, useState } from "react";

const rings = [
  { outer: 175, label: "כיסוי תביעות", pct: "70%", detail: "נזקי צד ג׳, פיצויים, תביעות אזרחיות", fill: "#4a4a52" },
  { outer: 140, label: "הגנה משפטית", pct: "20%", detail: "עו״ד, משפטים, ערעורים, ייעוץ 24/7", fill: "#d8d8de" },
  { outer: 105, label: "כיסוי טרור", pct: "5%", detail: "אירועי טרור ופעולות מבצעיות", fill: "#5a5a62" },
  { outer: 70, label: "עמלת ניהול", pct: "5%", detail: "ניהול הפוליסה ושירות לקוחות", fill: "#c8c8d0" },
];

const debris = [
  { x: -30, y: -35, r: 45, s: 9 }, { x: 20, y: -40, r: -30, s: 7 },
  { x: -40, y: 12, r: 60, s: 8 }, { x: 25, y: 30, r: -50, s: 6 },
  { x: -18, y: 35, r: 25, s: 10 }, { x: 35, y: -15, r: -65, s: 7 },
  { x: -45, y: -8, r: 40, s: 8 }, { x: 12, y: -28, r: -20, s: 6 },
  { x: 38, y: 20, r: 55, s: 5 }, { x: -22, y: -42, r: -35, s: 7 },
];

const cracks = [0, 40, 80, 130, 175, 220, 265, 310];

export const TargetDiagram = () => {
  const [vis, setVis] = useState(false);
  const [hov, setHov] = useState<number | null>(null);
  const [rot, setRot] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setRot({ x: ((e.clientY - r.top) / r.height - 0.5) * -18, y: ((e.clientX - r.left) / r.width - 0.5) * 18 });
  };

  const hd = hov !== null ? (hov === 4 ? { pct: "הליבה", label: "מרכז הפוליסה", detail: "הגנה מלאה — הביטוח שלך", fill: "#cc3333" } : rings[hov]) : null;

  return (
    <section ref={ref} className="py-28 px-6" style={{ background: "#f5f5f7" }}>
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-black text-[#1d1d1f] mb-3"
          style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease" }}>
          לאן הולך <span className="text-[var(--accent-blue)]">הכסף שלך</span>?
        </h2>
        <p className="text-[#86868b] mb-14" style={{ opacity: vis ? 1 : 0, transition: "opacity 0.6s ease 0.2s" }}>
          שקיפות מלאה — כמו שצריך
        </p>

        <div className="relative inline-block" onMouseMove={onMove}
          onMouseLeave={() => { setRot({ x: 0, y: 0 }); setHov(null); }}
          style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(30px)", transition: "opacity 0.8s ease 0.3s, transform 0.8s cubic-bezier(0.32,0.72,0,1) 0.3s" }}>

          {hd && (
            <div key={hov} className="absolute left-1/2 -translate-x-1/2 -top-2 -translate-y-full px-5 py-4 text-center z-20"
              style={{ background: "white", borderRadius: "20px", boxShadow: "0 15px 40px rgba(0,0,0,0.12)", animation: "fadeIn 0.2s ease", minWidth: 220 }}>
              <span className="text-3xl font-black block mb-1" style={{ color: hd.fill === "#cc3333" ? "#cc3333" : "var(--accent-blue)" }}>{hd.pct}</span>
              <h4 className="text-base font-black text-[#1d1d1f] mb-1">{hd.label}</h4>
              <p className="text-xs text-[#86868b]">{hd.detail}</p>
              <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-4 h-4 bg-white rotate-45" />
            </div>
          )}

          <div style={{ transform: `perspective(800px) rotateX(${rot.x}deg) rotateY(${rot.y}deg)`, transition: "transform 0.1s ease-out", transformStyle: "preserve-3d" }}>
            <svg viewBox="0 0 440 460" className="w-72 md:w-96" style={{ filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.18))" }}>
              <defs>
                <linearGradient id="bShine" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.35)" /><stop offset="100%" stopColor="rgba(0,0,0,0.15)" />
                </linearGradient>
                <radialGradient id="tShadow" cx="50%" cy="50%"><stop offset="80%" stopColor="transparent" /><stop offset="100%" stopColor="rgba(0,0,0,0.08)" /></radialGradient>
              </defs>

              {/* Stand */}
              <rect x="216" y="390" width="8" height="55" rx="4" fill="#3a3a40" />
              <ellipse cx="220" cy="448" rx="35" ry="5" fill="rgba(0,0,0,0.06)" />

              {/* Board edge depth */}
              <ellipse cx="220" cy="210" rx="180" ry="180" fill="#3a3a40" />

              {/* Rings outer→inner */}
              {rings.map((ring, i) => (
                <circle key={i} cx="220" cy="205" r={ring.outer} fill={ring.fill}
                  stroke={hov === i ? "var(--accent-blue)" : "rgba(0,0,0,0.06)"} strokeWidth={hov === i ? 3 : 1}
                  style={{ cursor: "pointer", transition: "all 0.3s ease", filter: hov === i ? "brightness(1.15)" : "none" }}
                  onMouseEnter={() => setHov(i)} onClick={() => setHov(hov === i ? null : i)} />
              ))}

              {/* Red center */}
              <circle cx="220" cy="205" r="38" fill="#cc3333"
                stroke={hov === 4 ? "#ff4444" : "none"} strokeWidth={hov === 4 ? 3 : 0}
                style={{ cursor: "pointer", transition: "all 0.3s ease", filter: hov === 4 ? "brightness(1.2)" : "none" }}
                onMouseEnter={() => setHov(4)} onClick={() => setHov(hov === 4 ? null : 4)} />
              <circle cx="220" cy="205" r="10" fill="#e03030" style={{ pointerEvents: "none" }} />

              {/* Shadow overlay on board */}
              <circle cx="220" cy="205" r="175" fill="url(#tShadow)" style={{ pointerEvents: "none" }} />

              {/* Impact cracks */}
              {cracks.map((a, i) => {
                const rad = a * Math.PI / 180, len = 18 + (i % 3) * 10;
                return <line key={i} x1={220 + Math.cos(rad) * 14} y1={205 + Math.sin(rad) * 14}
                  x2={220 + Math.cos(rad) * len} y2={205 + Math.sin(rad) * len}
                  stroke="#1d1d1f" strokeWidth="1.2" opacity="0.25" style={{ pointerEvents: "none" }} />;
              })}

              {/* Bullet — golden copper, embedded in center */}
              <g transform="translate(220, 205) rotate(180)" style={{ pointerEvents: "none" }}>
                <rect x="-5" y="-6" width="10" height="28" rx="2" fill="#c8941e" />
                <rect x="-5" y="-6" width="10" height="28" rx="2" fill="url(#bShine)" />
                <path d="M-5,-6 Q-5,-20 0,-26 Q5,-20 5,-6 Z" fill="#daa520" />
                <path d="M-2,-6 Q-2,-18 0,-24 Q2,-18 2,-6 Z" fill="rgba(255,255,255,0.25)" />
                <rect x="-6" y="20" width="12" height="4" rx="1.5" fill="#b8840e" />
                <rect x="-6.5" y="23" width="13" height="2" rx="1" fill="#a07008" />
              </g>

              {/* Debris fragments */}
              {debris.map((d, i) => (
                <rect key={i} x={220 + d.x} y={205 + d.y} width={d.s} height={d.s * 0.7} rx="1"
                  fill={i % 2 === 0 ? "#4a4a52" : "#6a6a72"} opacity="0.6"
                  transform={`rotate(${d.r} ${220 + d.x + d.s / 2} ${205 + d.y + d.s * 0.35})`}
                  style={{ pointerEvents: "none", animation: vis ? `debris-float ${2.5 + i * 0.3}s ease-in-out ${i * 0.1}s infinite alternate` : "none" }} />
              ))}
            </svg>
          </div>
        </div>

        <p className="mt-8 text-sm text-[#86868b] transition-opacity duration-300" style={{ opacity: hov === null ? 0.7 : 0 }}>
          העבירו את העכבר על המטרה
        </p>
      </div>
    </section>
  );
};
