"use client";

import { useState } from "react";
import { ArrowRight, Phone, Mail, MapPin, Send, CheckCircle, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen pb-8">
      <header className="sticky top-0 z-40 bg-[var(--bg-primary)]/90 backdrop-blur-xl border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-3 px-4 h-14 max-w-2xl mx-auto">
          <Link href="/" className="w-9 h-9 rounded-lg border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)]">
            <ArrowRight className="w-5 h-5" />
          </Link>
          <h1 className="font-bold text-sm">יצירת קשר</h1>
        </div>
      </header>

      <div className="px-4 pt-6 max-w-2xl mx-auto space-y-4">
        {/* Quick contact */}
        <div className="grid grid-cols-3 gap-2">
          <a href="tel:+972501234567" className="flex flex-col items-center gap-2 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4">
            <Phone className="w-6 h-6 text-[var(--accent-green)]" />
            <span className="text-[10px] text-[var(--text-secondary)]">טלפון</span>
          </a>
          <a href="https://wa.me/972501234567" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4">
            <MessageCircle className="w-6 h-6 text-[#25D366]" />
            <span className="text-[10px] text-[var(--text-secondary)]">WhatsApp</span>
          </a>
          <a href="mailto:info@easytarget.co.il" className="flex flex-col items-center gap-2 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4">
            <Mail className="w-6 h-6 text-[var(--accent-blue)]" />
            <span className="text-[10px] text-[var(--text-secondary)]">אימייל</span>
          </a>
        </div>

        {/* Info */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-[var(--text-muted)] flex-shrink-0" />
            <div>
              <p className="text-sm font-medium">אחים עם נשק</p>
              <p className="text-[10px] text-[var(--text-muted)]">ישראל</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-[var(--text-muted)] flex-shrink-0" />
            <p className="text-sm">050-123-4567</p>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-[var(--text-muted)] flex-shrink-0" />
            <p className="text-sm">info@easytarget.co.il</p>
          </div>
        </div>

        {/* Contact form */}
        {sent ? (
          <div className="bg-[var(--bg-card)] border border-[var(--accent-green)]/30 rounded-xl p-6 text-center">
            <CheckCircle className="w-10 h-10 text-[var(--accent-green)] mx-auto mb-3" />
            <h3 className="text-sm font-bold mb-1">ההודעה נשלחה!</h3>
            <p className="text-xs text-[var(--text-muted)]">נחזור אליך בהקדם</p>
          </div>
        ) : (
          <div className="space-y-3">
            <h3 className="text-sm font-bold">שלח לנו הודעה</h3>
            {[
              { label: "שם", placeholder: "השם שלך", type: "text" },
              { label: "טלפון", placeholder: "050-1234567", type: "tel" },
              { label: "אימייל", placeholder: "email@example.com", type: "email" },
            ].map((f) => (
              <div key={f.label}>
                <label className="text-xs text-[var(--text-muted)] mb-1 block">{f.label}</label>
                <input type={f.type} placeholder={f.placeholder}
                  className="w-full h-11 px-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-green)]/50 transition-colors" />
              </div>
            ))}
            <div>
              <label className="text-xs text-[var(--text-muted)] mb-1 block">הודעה</label>
              <textarea rows={4} placeholder="איך נוכל לעזור?"
                className="w-full px-3 py-2 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-green)]/50 transition-colors resize-none" />
            </div>
            <button onClick={() => setSent(true)}
              className="w-full h-11 rounded-xl bg-[var(--accent-green)] text-[var(--bg-primary)] font-bold text-sm flex items-center justify-center gap-2">
              <Send className="w-4 h-4" /> שלח הודעה
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
