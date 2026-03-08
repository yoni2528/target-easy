"use client";

import { useEffect, useRef, useState } from "react";

const coverages = [
  { stat: "24/7", title: "עו״ד מומחה", desc: "לא של המדינה." },
  { stat: "400K₪", title: "הגנה משפטית", desc: "עו״ד, משפט, ערעורים." },
  { stat: "3M₪", title: "נזקי צד ג׳", desc: "אתה לא משלם." },
  { stat: "כלול", title: "כיסוי טרור", desc: "מכוסה." },
  { stat: "כלול", title: "גניבת נשק", desc: "תיק + החזר." },
];

const items = [...coverages, ...coverages, ...coverages]; // triple for seamless fill

export const SolutionSection = () => {
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} id="modules" className="py-28 bg-[#fafbfe] overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-black text-center text-[#37374e] mb-14"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease" }}>
          מה הביטוח <span className="text-[var(--accent-blue)]">נותן לך</span>?
        </h2>
      </div>

      <div className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}>
        <div className="absolute inset-y-0 left-0 w-12 md:w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #fafbfe, transparent)" }} />
        <div className="absolute inset-y-0 right-0 w-12 md:w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #fafbfe, transparent)" }} />

        <div style={{
          display: "flex",
          gap: 20,
          direction: "ltr",
          width: "fit-content",
          animation: visible ? "ticker 30s linear infinite" : "none",
          animationPlayState: paused ? "paused" : "running",
        }}>
          {items.map((c, i) => (
            <div key={i}
              className="flex-shrink-0 p-6 text-center cursor-default hover:scale-[1.03] transition-transform"
              style={{
                width: 280,
                direction: "rtl",
                borderRadius: "20px",
                background: "white",
                border: "1px solid #e8edf5",
                boxShadow: "0 12px 30px -8px rgba(0,0,0,0.07)",
              }}>
              <span className="text-3xl font-black text-[var(--accent-blue)] block mb-3">{c.stat}</span>
              <h3 className="text-base font-black text-[#37374e] mb-1">{c.title}</h3>
              <p className="text-xs text-[#6b6b80]">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
