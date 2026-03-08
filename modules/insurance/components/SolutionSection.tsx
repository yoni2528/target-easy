"use client";

import { useEffect, useRef, useState } from "react";

const coverages = [
  { stat: "24/7", title: "עו״ד שלך, לא של המדינה", desc: "מומחה לנשק. זמין תמיד." },
  { stat: "400,000₪", title: "הגנה משפטית מלאה", desc: "עו״ד, משפט, ערעורים — מכוסה." },
  { stat: "3,000,000₪", title: "אתה לא משלם", desc: "נזקי צד שלישי — עלינו." },
  { stat: "כלול", title: "כיסוי טרור", desc: "השתמשת בנשק באירוע? מכוסה." },
  { stat: "כלול", title: "גניבת נשק", desc: "תיק פלילי + החזר על האקדח." },
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
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-center text-[#37374e] mb-16"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease" }}>
          מה הביטוח <span className="text-[var(--accent-blue)]">נותן לך</span>?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ perspective: "1000px" }}>
          {coverages.map((c, i) => (
            <div key={c.title}
              className="p-7 text-center hover:scale-[1.02] transition-transform cursor-default"
              style={{
                borderRadius: "24px",
                background: "white",
                border: "1px solid #e8edf5",
                boxShadow: "0 10px 25px -8px rgba(0,0,0,0.06)",
                opacity: visible ? 1 : 0,
                transform: visible
                  ? "translateZ(0) rotateX(0) rotateY(0)"
                  : `translateZ(-40px) rotateX(8deg) rotateY(${i % 2 === 0 ? -4 : 4}deg)`,
                transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${0.15 + i * 0.1}s`,
                transformStyle: "preserve-3d",
              }}>
              <span className="text-3xl md:text-4xl font-black text-[var(--accent-blue)] block mb-3">{c.stat}</span>
              <h3 className="text-base font-black text-[#37374e] mb-1">{c.title}</h3>
              <p className="text-sm text-[#6b6b80]">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
