"use client";

import { useEffect, useRef, useState } from "react";

const rings = [
  { r: 180, pct: "70%", label: "כיסוי תביעות", detail: "נזקי צד ג׳, פיצויים, תביעות אזרחיות", color: "var(--accent-red)" },
  { r: 120, pct: "20%", label: "הגנה משפטית", detail: "עו״ד, משפטים, ערעורים, ייעוץ 24/7", color: "var(--accent-blue)" },
  { r: 60, pct: "10%", label: "עמלת ניהול", detail: "ניהול הפוליסה ושירות לקוחות", color: "#37374e" },
];

export const TargetDiagram = () => {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [rot, setRot] = useState({ x: 20, y: 0 });
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

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -15 + 20;
    setRot({ x: y, y: x });
  };

  return (
    <section ref={ref} className="py-28 px-6 bg-[#fafbfe]">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-black text-[#37374e] mb-3"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease" }}>
          לאן הולך <span className="text-[var(--accent-blue)]">הכסף שלך</span>?
        </h2>
        <p className="text-[#6b6b80] mb-14"
          style={{ opacity: visible ? 1 : 0, transition: "opacity 0.6s ease 0.2s" }}>
          שקיפות מלאה — כמו שצריך
        </p>

        {/* 3D Target with mouse-tracking rotation */}
        <div className="relative inline-block"
          onMouseMove={onMove}
          onMouseLeave={() => { setRot({ x: 20, y: 0 }); setHovered(null); }}
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: "opacity 0.8s ease 0.3s, transform 0.8s cubic-bezier(0.32,0.72,0,1) 0.3s" }}>

          {/* Tooltip bubble */}
          {hovered !== null && (
            <div key={hovered} className="absolute left-1/2 -translate-x-1/2 -top-2 -translate-y-full px-5 py-4 text-center z-20"
              style={{
                background: "white", borderRadius: "20px",
                boxShadow: "0 15px 40px rgba(0,0,0,0.12)",
                animation: "fadeIn 0.2s ease", minWidth: 220,
              }}>
              <span className="text-3xl font-black block mb-1" style={{ color: rings[hovered].color }}>
                {rings[hovered].pct}
              </span>
              <h4 className="text-base font-black text-[#37374e] mb-1">{rings[hovered].label}</h4>
              <p className="text-xs text-[#6b6b80]">{rings[hovered].detail}</p>
              <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-4 h-4 bg-white rotate-45" />
            </div>
          )}

          <div style={{
            transform: `perspective(600px) rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
            transition: "transform 0.15s ease-out",
            transformStyle: "preserve-3d",
          }}>
            <svg viewBox="0 0 400 400" className="w-64 md:w-80"
              style={{ filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.15))" }}>
              {/* Rings — outer first (bottom), inner last (top for events) */}
              {rings.map((ring, i) => (
                <circle key={i} cx="200" cy="200" r={ring.r}
                  fill={ring.color}
                  opacity={hovered === i ? 0.28 : 0.1}
                  stroke={ring.color}
                  strokeWidth={hovered === i ? 3 : 1}
                  style={{ transition: "all 0.3s ease", cursor: "pointer" }}
                  onMouseEnter={() => setHovered(i)}
                  onClick={() => setHovered(hovered === i ? null : i)}
                />
              ))}
              {/* Crosshair */}
              <line x1="10" y1="200" x2="390" y2="200" stroke="#37374e" opacity={0.05} strokeWidth="1" />
              <line x1="200" y1="10" x2="200" y2="390" stroke="#37374e" opacity={0.05} strokeWidth="1" />
              {/* Center dot */}
              <circle cx="200" cy="200" r="4" fill="#37374e" opacity={0.25} />
            </svg>
          </div>
        </div>

        <p className="mt-8 text-sm text-[#a0a0b0] transition-opacity duration-300"
          style={{ opacity: hovered === null ? 0.7 : 0 }}>
          העבירו את העכבר על המטרה
        </p>
      </div>
    </section>
  );
};
