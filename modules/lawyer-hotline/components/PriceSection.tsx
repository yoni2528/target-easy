"use client";

import { Users, Check, ArrowLeft } from "lucide-react";

function openContactModal() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-contact-modal"));
  }
}

const includes = [
  "עו״ד פלילי בקו ישיר 24/7",
  "ייעוץ טלפוני בלתי מוגבל",
  "הוראות מיידיות מה לומר / לא לומר",
  "ייעוץ ראשוני לתיק אזרחי הקשור לנשק",
];

const subsidized = [
  "נציג פיזי במקום האירוע",
  "ליווי לחקירה במשטרה",
  "ייצוג מלא בכתב אישום",
];

export const PriceSection = () => (
  <section
    id="price"
    className="py-20 md:py-32 px-4 md:px-6 text-center relative overflow-hidden"
    style={{
      background:
        "linear-gradient(180deg, #0a1628 0%, #122643 100%)",
    }}
  >
    {/* Subtle pattern */}
    <div
      className="absolute inset-0 pointer-events-none opacity-30"
      style={{
        background:
          "radial-gradient(ellipse at 30% 20%, rgba(96,165,250,0.18) 0%, transparent 60%)," +
          "radial-gradient(ellipse at 80% 80%, rgba(251,191,36,0.10) 0%, transparent 50%)",
      }}
    />

    <div className="relative z-10 max-w-3xl mx-auto">
      <div
        className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold"
        style={{
          background: "rgba(251,191,36,0.12)",
          border: "1px solid rgba(251,191,36,0.40)",
          color: "#fbbf24",
        }}
      >
        <Users className="w-3.5 h-3.5" />
        קבוצת רכישה · מאות חמושים בפנים
      </div>

      <h2 className="text-3xl md:text-5xl font-black text-white mb-5 md:mb-7 leading-tight">
        שווי שוק: <span className="line-through text-white/35">1,200 ₪</span>
        <br />
        שלך כחבר קבוצה:
      </h2>

      {/* Price hero */}
      <div className="flex items-baseline justify-center gap-2 mb-3">
        <span className="text-7xl md:text-9xl font-black text-[#fbbf24] leading-none">
          14
          <span className="text-5xl md:text-7xl">.90</span>
        </span>
        <span className="text-xl md:text-2xl font-bold text-white/70">₪/חודש</span>
      </div>

      <p className="text-sm md:text-base text-white/55 mb-10 md:mb-12">
        פחות מקפה ב-Aroma. כל יום.
      </p>

      {/* What's included */}
      <div
        className="text-right rounded-2xl p-6 md:p-8 mb-5 max-w-xl mx-auto"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.10)",
        }}
      >
        <p className="font-bold text-white mb-4 text-center md:text-right">
          ✓ כלול במנוי החודשי
        </p>
        <ul className="space-y-2.5">
          {includes.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm md:text-base">
              <Check className="w-4 h-4 md:w-5 md:h-5 text-[#fbbf24] mt-0.5 flex-shrink-0" />
              <span className="text-white/85">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Subsidized add-ons */}
      <div
        className="text-right rounded-2xl p-6 md:p-8 mb-8 md:mb-10 max-w-xl mx-auto"
        style={{
          background: "rgba(96,165,250,0.05)",
          border: "1px dashed rgba(96,165,250,0.30)",
        }}
      >
        <p className="font-bold text-[#93c5fd] mb-1.5 text-center md:text-right text-sm md:text-base">
          ✦ במחיר חבר קבוצה (תוספת מסובסדת)
        </p>
        <p className="text-xs text-white/55 mb-4 text-center md:text-right">
          לא כלול במחיר החודשי. במחיר מסובסד משמעותית לחברי הקבוצה.
        </p>
        <ul className="space-y-2.5">
          {subsidized.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm">
              <span className="text-[#93c5fd] mt-0.5 flex-shrink-0">+</span>
              <span className="text-white/70">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Why so cheap */}
      <div
        className="text-right rounded-xl p-5 mb-8 md:mb-10 max-w-xl mx-auto"
        style={{
          background: "rgba(251,191,36,0.08)",
          border: "1px solid rgba(251,191,36,0.25)",
        }}
      >
        <p className="text-xs md:text-sm font-bold text-[#fbbf24] mb-2 text-center md:text-right">
          ✦ למה דווקא 14.90?
        </p>
        <p className="text-sm text-white/80 leading-relaxed text-center md:text-right">
          עו״ד פלילי פרטי עולה <strong>800-1,200 ₪ לחודש</strong> בודד. בקבוצת רכישה של מאות חמושים —
          הצוות מוכן לתת לכולנו את אותו השירות במחיר עלות. כי כל אחד מאיתנו פותח את הדלת לעוד אחד.
        </p>
      </div>

      {/* CTA */}
      <button
        type="button"
        onClick={openContactModal}
        className="inline-flex items-center gap-2 px-8 py-4 md:px-10 md:py-5 bg-[#fbbf24] text-[#0a1628] font-black text-base md:text-xl hover:scale-105 transition-transform"
        style={{
          borderRadius: "35px",
          boxShadow: "0 16px 50px -5px rgba(251,191,36,0.45)",
        }}
      >
        אני בפנים — 14.90 ₪
        <ArrowLeft className="w-5 h-5" />
      </button>
      <p className="text-xs text-white/45 mt-5">
        ביטול בקליק · ללא דמי הצטרפות · ללא התחייבות
      </p>
    </div>
  </section>
);
