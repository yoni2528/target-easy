"use client";

import { ArrowLeft } from "lucide-react";

export const InsuranceCTA = () => (
  <section id="contact" className="py-32 px-6 text-center bg-[#fafbfe]">
    <div className="max-w-lg mx-auto">
      <h2 className="text-3xl md:text-4xl font-black text-[#37374e] mb-4">
        רוצה להיות <span className="text-[var(--accent-blue)]">מוגן</span>?
      </h2>
      <p className="text-[#6b6b80] mb-8">
        הצעת מחיר בשיחה אחת. ללא התחייבות.
      </p>
      <a href="tel:0552281168"
        className="inline-flex items-center gap-2 px-10 py-4 bg-[var(--accent-blue)] text-white font-bold text-lg hover:scale-105 transition-transform"
        style={{
          borderRadius: "35px",
          boxShadow: "0 12px 30px -5px color-mix(in srgb, var(--accent-blue) 35%, transparent)",
        }}>
        דברו איתנו
        <ArrowLeft className="w-5 h-5" />
      </a>
      <p className="text-xs text-[#a0a0b0] mt-4">ללא התחייבות · נחזור אליכם בהקדם</p>
    </div>
  </section>
);
