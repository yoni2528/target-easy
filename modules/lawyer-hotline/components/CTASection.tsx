"use client";

import { ArrowLeft, Shield, Clock, Phone } from "lucide-react";

function openContactModal() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-contact-modal"));
  }
}

export const LawyerCTA = () => (
  <section
    id="contact"
    className="py-20 md:py-32 px-4 md:px-6 text-center bg-[#fafbfe]"
  >
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl md:text-4xl font-black text-[#37374e] mb-4">
        רוצה <span className="text-[var(--accent-blue)]">גיבוי משפטי</span>?
      </h2>
      <p className="text-[#6b6b80] mb-8">
        השאר פרטים — נחזיר לך טלפון תוך 60 דקות. ללא התחייבות.
      </p>
      <button
        type="button"
        onClick={openContactModal}
        className="inline-flex items-center gap-2 px-8 py-3.5 md:px-10 md:py-4 bg-[var(--accent-blue)] text-white font-bold text-base md:text-lg hover:scale-105 transition-transform"
        style={{
          borderRadius: "35px",
          boxShadow:
            "0 12px 30px -5px color-mix(in srgb, var(--accent-blue) 35%, transparent)",
        }}
      >
        אני בפנים
        <ArrowLeft className="w-5 h-5" />
      </button>
      <p className="text-xs text-[#a0a0b0] mt-4">
        14.90 ₪/חודש · ניתן לבטל בכל עת · ללא דמי הצטרפות
      </p>

      <div className="flex items-center justify-center gap-6 mt-10 flex-wrap">
        {[
          { icon: Shield, text: "עו״ד פלילי ייעודי" },
          { icon: Clock, text: "מענה תוך דקות" },
          { icon: Phone, text: "קו חם 24/7" },
        ].map(({ icon: Icon, text }) => (
          <div
            key={text}
            className="flex items-center gap-2 text-xs text-[#6b6b80]"
          >
            <Icon className="w-4 h-4 text-[var(--accent-blue)]" />
            <span>{text}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);
