"use client";

import { useState } from "react";
import { ArrowRight, Crosshair, CheckCircle, Send } from "lucide-react";
import Link from "next/link";

export default function JoinPage() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <CheckCircle className="w-14 h-14 text-[var(--accent-green)] mx-auto mb-4" />
          <h2 className="text-lg font-bold mb-2">הבקשה נשלחה בהצלחה!</h2>
          <p className="text-xs text-[var(--text-muted)] mb-6 max-w-[280px] mx-auto">
            ניצור איתך קשר תוך 24 שעות לסיום תהליך ההרשמה
          </p>
          <Link href="/" className="inline-flex items-center gap-2 h-10 px-5 rounded-xl bg-[var(--accent-green)] text-[var(--bg-primary)] text-sm font-bold">
            חזרה לדף הבית
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-8">
      <header className="sticky top-0 z-40 bg-[var(--bg-primary)]/90 backdrop-blur-xl border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-3 px-4 h-14 max-w-2xl mx-auto">
          <Link href="/" className="w-9 h-9 rounded-lg border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)]">
            <ArrowRight className="w-5 h-5" />
          </Link>
          <h1 className="font-bold text-sm">הצטרפות ל-EasyTarget</h1>
        </div>
      </header>

      <div className="px-4 pt-6 max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <Crosshair className="w-10 h-10 text-[var(--accent-green)] mx-auto mb-3" strokeWidth={1.5} />
          <h2 className="text-lg font-bold mb-1">הצטרף כמדריך ירי</h2>
          <p className="text-xs text-[var(--text-muted)]">הגע לאלפי לקוחות חדשים ונהל את העסק שלך בקלות</p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-2 gap-2 mb-6">
          {["פרופיל מדריך מקצועי", "מערכת הזמנות", "דירוג ELO", "לוח בקרה וסטטיסטיקות"].map((b) => (
            <div key={b} className="flex items-center gap-2 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-3">
              <CheckCircle className="w-4 h-4 text-[var(--accent-green)] flex-shrink-0" />
              <span className="text-xs text-[var(--text-secondary)]">{b}</span>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="space-y-3">
          {[
            { label: "שם מלא", placeholder: "שם פרטי ומשפחה", type: "text" },
            { label: "טלפון", placeholder: "050-1234567", type: "tel" },
            { label: "אימייל", placeholder: "email@example.com", type: "email" },
            { label: "עיר", placeholder: "עיר מגורים", type: "text" },
            { label: "ניסיון בהדרכה (שנים)", placeholder: "5", type: "number" },
          ].map((f) => (
            <div key={f.label}>
              <label className="text-xs text-[var(--text-muted)] mb-1 block">{f.label}</label>
              <input type={f.type} placeholder={f.placeholder}
                className="w-full h-11 px-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-green)]/50 transition-colors" />
            </div>
          ))}
          <div>
            <label className="text-xs text-[var(--text-muted)] mb-1 block">ספר לנו על עצמך</label>
            <textarea rows={3} placeholder="ניסיון, התמחות, רישיונות..."
              className="w-full px-3 py-2 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-green)]/50 transition-colors resize-none" />
          </div>
          <button onClick={() => setSubmitted(true)}
            className="w-full h-11 rounded-xl bg-[var(--accent-green)] text-[var(--bg-primary)] font-bold text-sm flex items-center justify-center gap-2">
            <Send className="w-4 h-4" /> שלח בקשת הצטרפות
          </button>
        </div>
      </div>
    </div>
  );
}
