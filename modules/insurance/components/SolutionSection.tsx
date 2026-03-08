"use client";

import { useEffect, useRef, useState } from "react";

const coverages = [
  { stat: "24/7", title: "עו״ד מומחה", desc: "לא של המדינה." },
  { stat: "400K₪", title: "הגנה משפטית", desc: "עו״ד, משפט, ערעורים." },
  { stat: "3M₪", title: "נזקי צד ג׳", desc: "אתה לא משלם." },
  { stat: "כלול", title: "כיסוי טרור", desc: "מכוסה." },
  { stat: "כלול", title: "גניבת נשק", desc: "תיק + החזר." },
];

export const SolutionSection = () => {
  const [visible, setVisible] = useState(false);
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
    <section ref={ref} id="modules" className="py-28 px-6 bg-[#fafbfe]">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-center text-[#37374e] mb-14"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease" }}>
          מה הביטוח <span className="text-[var(--accent-blue)]">נותן לך</span>?
        </h2>

        {/* 5 cubes — horizontal scroll on mobile, grid on desktop */}
        <div className="flex gap-3 overflow-x-auto pb-3 snap-x snap-mandatory md:overflow-visible md:grid md:grid-cols-5 md:gap-4 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0">
          {coverages.map((c, i) => (
            <div key={c.title}
              className="flex-shrink-0 w-[140px] md:w-auto snap-center p-5 text-center cursor-default group"
              style={{
                borderRadius: "20px",
                background: "white",
                border: "1px solid #e8edf5",
                boxShadow: visible ? "0 12px 30px -8px rgba(0,0,0,0.07)" : "none",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : `translateY(${25 + i * 5}px)`,
                transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${0.1 + i * 0.1}s`,
              }}>
              <span className="text-2xl md:text-3xl font-black text-[var(--accent-blue)] block mb-3 group-hover:scale-110 transition-transform">
                {c.stat}
              </span>
              <h3 className="text-sm font-black text-[#37374e] mb-1 leading-tight">{c.title}</h3>
              <p className="text-xs text-[#6b6b80]">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
