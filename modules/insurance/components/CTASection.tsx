"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowLeft, CheckCircle, Loader2 } from "lucide-react";

const createConfetti = (container: HTMLElement) => {
  const colors = ["#1a6fcc", "#c89000", "#4ade80", "#fbbf24", "#60a5fa"];
  for (let i = 0; i < 40; i++) {
    const piece = document.createElement("div");
    const size = 6 + Math.random() * 6;
    const xDir = (Math.random() - 0.5) * 200;
    piece.style.cssText = `
      position:absolute; z-index:50; pointer-events:none;
      width:${size}px; height:${size}px;
      background:${colors[i % colors.length]};
      left:calc(50% + ${xDir}px); top:30%;
      border-radius:${Math.random() > 0.5 ? "50%" : "2px"};
      animation:confetti-piece ${1 + Math.random() * 1.5}s ease-out ${Math.random() * 0.3}s forwards;
    `;
    container.appendChild(piece);
    setTimeout(() => piece.remove(), 3000);
  }
};

const handleRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
  const btn = e.currentTarget;
  const rect = btn.getBoundingClientRect();
  const ripple = document.createElement("span");
  const size = Math.max(rect.width, rect.height);
  ripple.style.cssText = `
    position:absolute; border-radius:50%; pointer-events:none;
    width:${size}px; height:${size}px;
    left:${e.clientX - rect.left - size / 2}px;
    top:${e.clientY - rect.top - size / 2}px;
    background:rgba(255,255,255,0.3);
    transform:scale(0); animation:ripple-effect 0.6s ease-out;
  `;
  btn.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
};

export const InsuranceCTA = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (submitted && sectionRef.current) createConfetti(sectionRef.current);
  }, [submitted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section ref={sectionRef} id="contact" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-[var(--accent-blue)]/5 blur-[100px]" />
      </div>

      <div className="max-w-lg mx-auto text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-black mb-4">
          רוצה <span className="text-[var(--accent-blue)]">להתחיל</span>?
        </h2>
        <p className="text-[var(--text-secondary)] mb-8">
          השאירו פרטים ונחזור אליכם עם כל המידע על הביטוח
        </p>

        {submitted ? (
          <div className="p-8 rounded-2xl bg-[var(--bg-card)] border border-[var(--accent-blue)]/30 space-y-3">
            <CheckCircle className="w-12 h-12 text-[var(--accent-blue)] mx-auto" />
            <p className="text-lg font-bold text-[var(--text-primary)]">הפרטים נשלחו בהצלחה!</p>
            <p className="text-sm text-[var(--text-secondary)]">ניצור איתך קשר בהקדם</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-right">
            <input type="text" placeholder="שם מלא" value={name} onChange={(e) => setName(e.target.value)} required
              className="w-full px-4 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-blue)] transition-colors" />
            <input type="tel" placeholder="טלפון" value={phone} onChange={(e) => setPhone(e.target.value)} required
              className="w-full px-4 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-blue)] transition-colors" />
            <button type="submit" disabled={loading}
              onClick={handleRipple}
              className="relative overflow-hidden w-full flex items-center justify-center gap-2 py-4 bg-[var(--accent-blue)] text-white font-bold text-lg rounded-2xl hover:brightness-110 transition-all disabled:opacity-50 animate-[pulse-glow-blue_3s_ease-in-out_infinite]"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                <>שלחו לי פרטים <ArrowLeft className="w-5 h-5" /></>
              )}
            </button>
            <p className="text-xs text-[var(--text-muted)] text-center">ללא התחייבות · נחזור אליכם בהקדם</p>
          </form>
        )}
      </div>
    </section>
  );
};
