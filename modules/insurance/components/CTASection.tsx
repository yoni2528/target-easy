"use client";

import { ArrowLeft } from "lucide-react";

export const InsuranceCTA = () => (
  <section id="contact" className="py-24 px-6 text-center">
    <div className="max-w-lg mx-auto">
      <h2 className="text-3xl md:text-4xl font-black mb-4">
        רוצה להיות <span className="text-[var(--accent-blue)]">מוגן</span>?
      </h2>
      <p className="text-[var(--text-secondary)] mb-8">
        השאירו פרטים ונחזור אליכם עם הצעת מחיר מותאמת — ללא התחייבות.
      </p>
      <a href="tel:0552281168"
        className="inline-flex items-center gap-2 px-10 py-4 bg-[var(--accent-blue)] text-white font-bold text-lg rounded-2xl hover:brightness-110 transition-all shadow-xl shadow-[var(--accent-blue)]/20">
        דברו איתנו
        <ArrowLeft className="w-5 h-5" />
      </a>
      <p className="text-xs text-[var(--text-muted)] mt-4">ללא התחייבות · נחזור אליכם בהקדם</p>
    </div>
  </section>
);
