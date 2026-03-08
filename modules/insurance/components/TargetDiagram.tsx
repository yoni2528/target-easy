"use client";

import { useEffect, useRef, useState } from "react";

const data = [
  { label: "אירוע קורה", sub: "ירי, גניבת נשק, תביעת נזיקין" },
  { label: "פונים אלינו", sub: "קו חם 24/7 — עו״ד עונה תוך דקות" },
  { label: "מקבלים ייצוג", sub: "הגנה פלילית + ייצוג אזרחי מלא" },
  { label: "מכוסים", sub: "עד ₪3,000,000 — אתה לא משלם שקל" },
];

const vis = [
  { r: 210, fill: "#1a6fcc", idx: 0 },
  { r: 182, fill: "#dce9f7" },
  { r: 154, fill: "#2580d8", idx: 1 },
  { r: 126, fill: "#e6eff8" },
  { r: 98, fill: "#1560b8", idx: 2 },
  { r: 70, fill: "#edf3fa" },
  { r: 42, fill: "#0e4e9e", idx: 3 },
];

export const TargetDiagram = () => {
  const [v, setV] = useState(false);
  const [hov, setHov] = useState<number | null>(null);
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
    const nx = ((e.clientX - r.left) / r.width - 0.5) * 22;
    const ny = ((e.clientY - r.top) / r.height - 0.5) * -18 + 14;
    setRot({ x: ny, y: nx });
  };

  const hd = hov !== null ? data[hov] : null;
  const stepNum = hov !== null ? hov + 1 : 0;

  return (
    <section ref={ref} className="py-28 px-6" style={{ background: "#f5f5f7" }}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-black text-[#1d1d1f] mb-3"
          style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease", letterSpacing: "-0.02em" }}>
          איך <span className="text-[var(--accent-blue)]">הביטוח</span> עובד?
        </h2>
        <p className="text-[#86868b] mb-16" style={{ opacity: v ? 1 : 0, transition: "opacity 0.6s ease 0.2s" }}>
          4 שכבות הגנה — מהאירוע ועד הכיסוי המלא
        </p>

        <div className="relative inline-block" onMouseMove={onMove}
          onMouseLeave={() => { setRot({ x: 14, y: -6 }); setHov(null); }}
          style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(40px)", transition: "opacity 0.8s ease 0.3s, transform 0.8s cubic-bezier(0.32,0.72,0,1) 0.3s" }}>

          {/* Tooltip */}
          {hd && (
            <div key={hov} className="absolute left-1/2 -translate-x-1/2 -top-3 -translate-y-full px-6 py-4 text-center z-20"
              style={{ background: "white", borderRadius: "20px", boxShadow: "0 15px 40px rgba(0,0,0,0.12)", animation: "fadeIn 0.2s ease", minWidth: 240 }}>
              <span className="text-sm font-bold block mb-1" style={{ color: "var(--accent-blue)" }}>שלב {stepNum}</span>
              <h4 className="text-lg font-black text-[#1d1d1f] mb-1">{hd.label}</h4>
              <p className="text-sm text-[#86868b]">{hd.sub}</p>
              <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-4 h-4 bg-white rotate-45" />
            </div>
          )}

          {/* 3D tilt wrapper */}
          <div style={{ transform: `perspective(900px) rotateX(${rot.x}deg) rotateY(${rot.y}deg)`, transition: "transform 0.12s ease-out", transformStyle: "preserve-3d" }}>

            {/* Ground shadow */}
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-6 md:-bottom-8"
              style={{ width: "70%", height: 30, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(26,111,204,0.15) 0%, transparent 70%)", filter: "blur(8px)" }} />

            <svg viewBox="0 0 460 460" className="w-80 md:w-[440px]"
              style={{ filter: "drop-shadow(0 20px 40px rgba(26,111,204,0.18)) drop-shadow(0 8px 16px rgba(0,0,0,0.08))" }}>

              {/* Board edge — gives 3D depth */}
              <ellipse cx="230" cy="238" rx="214" ry="214" fill="#1254a0" opacity="0.35" />

              {/* Rings outer→inner */}
              {vis.map((ring, i) => {
                const interactive = ring.idx !== undefined;
                const isHov = interactive && hov === ring.idx;
                return (
                  <circle key={i} cx="230" cy="230" r={ring.r} fill={ring.fill}
                    stroke={isHov ? "white" : "rgba(255,255,255,0.08)"} strokeWidth={isHov ? 3 : 0.5}
                    style={{ cursor: interactive ? "pointer" : "default", transition: "all 0.3s ease", filter: isHov ? "brightness(1.2)" : "none" }}
                    onMouseEnter={() => interactive && setHov(ring.idx!)}
                    onClick={() => interactive && setHov(hov === ring.idx ? null : ring.idx!)} />
                );
              })}

              {/* Center dot highlight */}
              <circle cx="230" cy="230" r="12" fill="#fff" opacity="0.15" style={{ pointerEvents: "none" }} />

              {/* Subtle crosshair */}
              <line x1="18" y1="230" x2="442" y2="230" stroke="white" opacity="0.06" strokeWidth="0.8" />
              <line x1="230" y1="18" x2="230" y2="442" stroke="white" opacity="0.06" strokeWidth="0.8" />
            </svg>
          </div>
        </div>

        <p className="mt-10 text-sm text-[#86868b] transition-opacity duration-300" style={{ opacity: hov === null ? 0.7 : 0 }}>
          העבירו את העכבר על המטרה
        </p>
      </div>
    </section>
  );
};
