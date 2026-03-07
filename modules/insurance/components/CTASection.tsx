"use client";

import { useState } from "react";
import { ArrowLeft, CheckCircle, Loader2 } from "lucide-react";

export const InsuranceCTA = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 px-6 relative">
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
          <div className="p-8 rounded-2xl bg-[var(--bg-card)] border border-[var(--accent-green)]/30 space-y-3">
            <CheckCircle className="w-12 h-12 text-[var(--accent-green)] mx-auto" />
            <p className="text-lg font-bold text-[var(--text-primary)]">
              הפרטים נשלחו בהצלחה!
            </p>
            <p className="text-sm text-[var(--text-secondary)]">
              ניצור איתך קשר בהקדם
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-right">
            <input
              type="text"
              placeholder="שם מלא"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-blue)] transition-colors"
            />
            <input
              type="tel"
              placeholder="טלפון"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-blue)] transition-colors"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-4 bg-[var(--accent-blue)] text-[var(--bg-primary)] font-bold text-lg rounded-2xl hover:brightness-110 transition-all shadow-xl shadow-[var(--accent-blue)]/20 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  שלחו לי פרטים
                  <ArrowLeft className="w-5 h-5" />
                </>
              )}
            </button>
            <p className="text-xs text-[var(--text-muted)] text-center">
              ללא התחייבות · נחזור אליכם בהקדם
            </p>
          </form>
        )}
      </div>
    </section>
  );
};
