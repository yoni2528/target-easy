"use client";

import { Shield, ChevronDown, CheckCircle, Award, Users, Zap } from "lucide-react";

const highlights = [
  { icon: Shield, text: "מנורה ביטוח" },
  { icon: Award, text: "כיסוי אירועי טרור" },
  { icon: Users, text: "אלפי מבוטחים" },
  { icon: Zap, text: "הצטרפות מיידית" },
];

export const InsuranceHero = () => {
  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Single subtle background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[var(--accent-blue)]/5 blur-[120px]" />
      </div>

      {/* Badge */}
      <div className="mb-4 animate-[fadeIn_0.8s_ease-out]">
        <div className="px-4 py-1.5 rounded-full border border-[var(--accent-blue)]/20 bg-[var(--accent-blue)]/5">
          <span className="text-sm font-bold text-[var(--accent-blue)]">ביטוח ייחודי ובלעדי למחזיקי נשק</span>
        </div>
      </div>

      {/* Direct question */}
      <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-2 animate-[fadeInUp_0.8s_ease-out]">
        יש לך נשק ברישיון?
      </p>

      {/* Main title */}
      <h1 className="text-5xl md:text-7xl font-black text-[var(--text-primary)] tracking-tight mb-3 text-center animate-[fadeInUp_0.8s_ease-out_0.15s] opacity-0 [animation-fill-mode:forwards]">
        אתה צריך <span className="text-[var(--accent-blue)]">הגנה מלאה</span>
      </h1>

      {/* Subtitle */}
      <p className="text-base md:text-lg text-[var(--text-secondary)] max-w-lg text-center mb-8 animate-[fadeInUp_0.8s_ease-out_0.3s] opacity-0 [animation-fill-mode:forwards]">
        ביטוח אחריות צד ג׳ מקיף — כולל כיסוי לאירועי טרור, באמצעות מנורה ביטוח
      </p>

      {/* CTA Buttons */}
      <div className="flex gap-4 mb-12 animate-[fadeInUp_0.8s_ease-out_0.45s] opacity-0 [animation-fill-mode:forwards]">
        <a href="#contact"
          className="px-8 py-3.5 bg-[var(--accent-blue)] text-white font-bold rounded-xl hover:brightness-110 transition-all shadow-lg shadow-[var(--accent-blue)]/20 text-lg">
          קבלו הצעת מחיר
        </a>
        <a href="#modules"
          className="px-8 py-3.5 border border-[var(--border-default)] text-[var(--text-primary)] font-medium rounded-xl hover:bg-[var(--bg-elevated)] transition-all">
          מה מכוסה?
        </a>
      </div>

      {/* Trust signals — merged from TrustBar */}
      <div className="flex flex-wrap justify-center gap-3 animate-[fadeInUp_0.8s_ease-out_0.6s] opacity-0 [animation-fill-mode:forwards]">
        {highlights.map((h) => (
          <div key={h.text} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--bg-card)]/80 border border-[var(--border-subtle)]">
            <h.icon className="w-3.5 h-3.5 text-[var(--accent-blue)]" strokeWidth={2} />
            <span className="text-xs font-medium text-[var(--text-primary)]">{h.text}</span>
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 flex flex-col items-center gap-2 animate-[fadeIn_1s_ease-out_1.2s] opacity-0 [animation-fill-mode:forwards]">
        <span className="text-xs text-[var(--text-muted)]">גלול למטה</span>
        <ChevronDown className="w-4 h-4 text-[var(--text-muted)]" />
      </div>
    </section>
  );
};
