"use client";

import { useEffect, useRef, useState } from "react";

const Phone = ({ children, tiltY = 0 }: { children: React.ReactNode; tiltY?: number }) => (
  <div className="relative mx-auto" style={{ width: 200, height: 380, transformStyle: "preserve-3d", transform: `rotateY(${tiltY}deg)` }}>
    {/* Right edge */}
    <div style={{
      position: "absolute", top: 20, right: -1, width: 14, height: 340,
      background: "linear-gradient(180deg, #3a3a3e 0%, #1d1d22 40%, #2a2a2e 60%, #3a3a3e 100%)",
      borderRadius: "0 4px 4px 0", transformOrigin: "left center", transform: "rotateY(-90deg) translateZ(0px)",
    }} />
    {/* Left edge */}
    <div style={{
      position: "absolute", top: 20, left: -1, width: 14, height: 340,
      background: "linear-gradient(180deg, #3a3a3e 0%, #1d1d22 40%, #2a2a2e 60%, #3a3a3e 100%)",
      borderRadius: "4px 0 0 4px", transformOrigin: "right center", transform: "rotateY(90deg) translateZ(0px)",
    }} />
    {/* Bottom edge */}
    <div style={{
      position: "absolute", bottom: -1, left: 20, width: 160, height: 14,
      background: "linear-gradient(90deg, #3a3a3e, #1d1d22, #3a3a3e)",
      borderRadius: "0 0 4px 4px", transformOrigin: "center top", transform: "rotateX(90deg)",
    }} />
    {/* Top edge */}
    <div style={{
      position: "absolute", top: -1, left: 20, width: 160, height: 14,
      background: "linear-gradient(90deg, #3a3a3e, #2a2a2e, #3a3a3e)",
      borderRadius: "4px 4px 0 0", transformOrigin: "center bottom", transform: "rotateX(-90deg)",
    }} />
    {/* Front face */}
    <div className="absolute inset-0 rounded-[32px] overflow-hidden"
      style={{ background: "white", border: "6px solid #1d1d1f", boxShadow: "0 30px 60px rgba(0,0,0,0.22), 0 10px 20px rgba(0,0,0,0.1)", transform: "translateZ(7px)" }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-4 bg-[#1d1d1f] rounded-b-lg z-10" />
      <div className="flex justify-between items-center px-4 pt-5 pb-0.5" style={{ fontSize: 7 }}>
        <span className="font-bold text-[#1d1d1f]">9:41</span>
        <div className="flex gap-0.5">
          <div className="w-2.5 h-1 rounded-sm bg-[#1d1d1f]" />
          <div className="w-1 h-1 rounded-full bg-[#1d1d1f]" />
        </div>
      </div>
      <div className="px-2.5 pt-0.5 pb-2 flex flex-col gap-1.5 h-[calc(100%-38px)] overflow-hidden">
        {children}
      </div>
    </div>
  </div>
);

const Bubble = ({ text, bot, delay }: { text: string; bot?: boolean; delay: number }) => (
  <div className={`max-w-[88%] ${bot ? "self-start" : "self-end"}`}
    style={{
      padding: "4px 8px",
      fontSize: 9,
      lineHeight: 1.4,
      background: bot ? "#f0f1f6" : "var(--accent-blue)",
      color: bot ? "#1d1d1f" : "white",
      borderRadius: bot ? "10px 10px 10px 3px" : "10px 10px 3px 10px",
      animation: `step-pop 0.4s cubic-bezier(0.32,0.72,0,1) ${delay}s both`,
    }}>
    {text}
  </div>
);

export const TimelineSection = () => {
  const [vis, setVis] = useState(false);
  const [rot, setRot] = useState({ x: 12, y: -8 });
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
    setRot({ x: ((e.clientY - r.top) / r.height - 0.5) * -18 + 12, y: ((e.clientX - r.left) / r.width - 0.5) * 24 - 8 });
  };

  return (
    <section ref={ref} className="py-28 px-6 bg-[#fafbfe]">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-black text-[#1d1d1f] mb-3"
          style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease", letterSpacing: "-0.02em" }}>
          <span className="text-[var(--accent-blue)]">30 שניות</span> וזה הכל
        </h2>
        <p className="text-[#86868b] mb-14" style={{ opacity: vis ? 1 : 0, transition: "opacity 0.6s ease 0.2s" }}>
          משאירים פרטים — מקבלים שיחה — מוגנים
        </p>

        <div onMouseMove={onMove} onMouseLeave={() => setRot({ x: 12, y: -8 })}
          style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(30px)", transition: "all 0.8s cubic-bezier(0.32,0.72,0,1) 0.3s" }}>
          <div style={{ transform: `perspective(1000px) rotateX(${rot.x}deg) rotateY(${rot.y}deg)`, transition: "transform 0.12s ease-out", transformStyle: "preserve-3d" }}>
            <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16"
              style={{ transformStyle: "preserve-3d" }}>

              <div className="text-center" style={{ animation: vis ? "fadeInUp 0.8s cubic-bezier(0.32,0.72,0,1) 0.4s both" : "none", transformStyle: "preserve-3d" }}>
                <Phone tiltY={8}>
                  <div className="flex flex-col gap-1.5 mt-1">
                    <Bubble bot text="היי! רוצה להצטרף לביטוח נשק?" delay={0.8} />
                    <Bubble text="כן, בטח" delay={1.2} />
                    <Bubble bot text="מעולה! מה השם שלך?" delay={1.6} />
                    <Bubble text="ישראל ישראלי" delay={2.0} />
                    <Bubble bot text="ומספר טלפון?" delay={2.4} />
                    <Bubble text="055-228-1168" delay={2.8} />
                    <Bubble bot text="קיבלתי! נציג יחזור אליך תוך דקות ✓" delay={3.2} />
                  </div>
                </Phone>
                <p className="mt-5 text-sm font-bold text-[#1d1d1f]">משאירים פרטים</p>
                <p className="text-xs text-[#86868b]">30 שניות בלבד</p>
              </div>

              <div className="hidden md:block text-3xl text-[#d2d2d7]"
                style={{ animation: vis ? "float-up 2s ease-in-out infinite" : "none" }}>←</div>
              <div className="md:hidden text-3xl text-[#d2d2d7]"
                style={{ animation: vis ? "float-up 2s ease-in-out infinite" : "none" }}>↓</div>

              <div className="text-center" style={{ animation: vis ? "fadeInUp 0.8s cubic-bezier(0.32,0.72,0,1) 0.7s both" : "none", transformStyle: "preserve-3d" }}>
                <Phone tiltY={-8}>
                  <div className="flex flex-col items-center justify-center h-full gap-3 -mt-4">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{ background: "linear-gradient(135deg, var(--accent-blue), #4da6ff)", animation: `step-pop 0.5s cubic-bezier(0.32,0.72,0,1) 3.5s both` }}>
                      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </div>
                    <div style={{ animation: `step-pop 0.4s ease 3.8s both` }}>
                      <p className="text-sm font-black text-[#1d1d1f]">הפוליסה פעילה!</p>
                      <p className="text-[#86868b] mt-0.5" style={{ fontSize: 8 }}>כיסוי עד ₪3,000,000</p>
                      <p className="text-[#86868b]" style={{ fontSize: 8 }}>הגנה משפטית 24/7</p>
                    </div>
                  </div>
                </Phone>
                <p className="mt-5 text-sm font-bold text-[#1d1d1f]">מוגנים</p>
                <p className="text-xs text-[#86868b]">שיחה אחת וזהו</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
