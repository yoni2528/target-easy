"use client";

import { InsuranceContactForm } from "./InsuranceContactForm";

export const InsuranceCTA = () => (
  <section
    id="contact"
    className="py-20 md:py-28 px-4 md:px-6 bg-[#fafbfe]"
  >
    <div className="max-w-lg mx-auto text-center">
      <h2 className="text-2xl md:text-4xl font-black text-[#37374e] mb-3">
        רוצה להיות <span className="text-[var(--accent-blue)]">מוגן</span>?
      </h2>
      <p className="text-[#6b6b80] mb-8 text-sm md:text-base">
        השאר פרטים ונחזור אליך בהקדם עם הצעה מותאמת. ללא התחייבות.
      </p>
      <InsuranceContactForm variant="full" />
    </div>
  </section>
);
