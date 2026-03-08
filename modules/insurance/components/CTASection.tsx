"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowLeft, CheckCircle, Loader2, Heart } from "lucide-react";

const createConfetti = (container: HTMLElement) => {
  const colors = ["#1a6fcc", "#4ade80", "#60a5fa"];
  for (let i = 0; i < 30; i++) {
    const piece = document.createElement("div");
    const size = 5 + Math.random() * 5;
    const xDir = (Math.random() - 0.5) * 200;
    piece.style.cssText = `position:absolute;z-index:50;pointer-events:none;width:${size}px;height:${size}px;background:${colors[i % colors.length]};left:calc(50% + ${xDir}px);top:30%;border-radius:${Math.random() > 0.5 ? "50%" : "2px"};animation:confetti-piece ${1 + Math.random()}s ease-out ${Math.random() * 0.2}s forwards;`;
    container.appendChild(piece);
    setTimeout(() => piece.remove(), 2500);
  }
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
    <section ref={sectionRef} id="contact" className="py-16 px-6 relative overflow-hidden">
      <div className="max-w-lg mx-auto text-center relative z-10">
        {/* Tagline banner — merged */}
        <div className="mb-8 p-5 rounded-xl bg-[var(--bg-card)] border border-[var(--accent-blue)]/15">
          <Heart className="w-6 h-6 text-[var(--accent-blue)] mx-auto mb-2" strokeWidth={1.5} />
          <p className="text-lg md:text-xl font-black text-[var(--text-primary)]">
            פעלתם להצלת חיים? <span className="text-[var(--accent-blue)]">אנחנו איתכם.</span>
          </p>
        </div>

        <h2 className="text-2xl md:text-3xl font-black mb-3">
          רוצה <span className="text-[var(--accent-blue)]">להתחיל</span>?
        </h2>
        <p className="text-sm text-[var(--text-secondary)] mb-6">
          השאירו פרטים ונחזור אליכם עם הצעת מחיר
        </p>

        {submitted ? (
          <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--accent-blue)]/30 space-y-2">
            <CheckCircle className="w-10 h-10 text-[var(--accent-blue)] mx-auto" />
            <p className="text-lg font-bold text-[var(--text-primary)]">הפרטים נשלחו!</p>
            <p className="text-sm text-[var(--text-secondary)]">ניצור איתך קשר בהקדם</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 text-right">
            <input type="text" placeholder="שם מלא" value={name} onChange={(e) => setName(e.target.value)} required
              className="w-full px-4 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-blue)] transition-colors" />
            <input type="tel" placeholder="טלפון" value={phone} onChange={(e) => setPhone(e.target.value)} required
              className="w-full px-4 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-blue)] transition-colors" />
            <button type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-[var(--accent-blue)] text-white font-bold text-lg rounded-xl hover:brightness-110 transition-all disabled:opacity-50">
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
