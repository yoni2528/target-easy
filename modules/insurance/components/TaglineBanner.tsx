"use client";

import { useEffect, useRef, useState } from "react";
import { Heart } from "lucide-react";

export const TaglineBanner = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="px-6 pb-16">
      <div
        className="max-w-2xl mx-auto p-8 rounded-2xl bg-[var(--bg-card)] border border-[var(--accent-blue)]/20 text-center relative overflow-hidden shadow-sm"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.97)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] rounded-full bg-[var(--accent-blue)]/5 blur-[80px]" />
        </div>
        <Heart className="w-8 h-8 text-[var(--accent-blue)] mx-auto mb-3" strokeWidth={1.5} />
        <p className="text-2xl md:text-3xl font-black text-[var(--text-primary)] relative z-10">
          פעלתם להצלת חיים?{" "}
          <span className="text-[var(--accent-blue)]">אנחנו איתכם.</span>
        </p>
      </div>
    </div>
  );
};
