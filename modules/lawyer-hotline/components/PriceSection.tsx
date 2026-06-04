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
  "ייעוץ נמשך לכל התפתחות בתיק",
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
        עו״ד פלילי
        <br />
        <span className="text-white/85">שתמיד יהיה שם</span>
      </h2>

      {/* Price hero */}
      <div className="flex items-baseline justify-center gap-2 mb-3">
        <span className="text-7xl md:text-9xl font-black text-[#fbbf24] leading-none">
          14
          <span className="text-5xl md:text-7xl">.90</span>
        </span>
        <span className="text-xl md:text-2xl font-bold text-white/70">₪/חודש</span>
      </div>

      <div className="mb-10 md:mb-12" />

      {/* What's included */}
      <div
        className="text-right rounded-2xl p-6 md:p-8 mb-8 md:mb-10 max-w-xl mx-auto"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.10)",
        }}
      >
        <p className="font-bold text-white mb-4 text-center md:text-right">
          מה כלול:
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

      {/* Why availability matters */}
      <div
        className="text-right rounded-xl p-5 mb-8 md:mb-10 max-w-xl mx-auto"
        style={{
          background: "rgba(251,191,36,0.08)",
          border: "1px solid rgba(251,191,36,0.25)",
        }}
      >
        <p className="text-xs md:text-sm font-bold text-[#fbbf24] mb-2 text-center md:text-right">
          ✦ למה זה כל כך קריטי?
        </p>
        <p className="text-sm text-white/80 leading-relaxed text-center md:text-right">
          הדקות הראשונות של חקירה הן <strong>הכי קריטיות</strong>. כל מילה נכנסת לפרוטוקול ותלווה
          אותך לאורך כל התיק. לכן הסכמנו רק עם עו״ד פלילי <strong>שמתחייב להיות זמין 24/7</strong>.
          לא מענה אוטומטי, לא "תחזור אלינו מחר", לא ימי חופש. כשאתה צריך אותו, הוא בקו. נקודה.
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
        אני בפנים ב-14.90 ₪
        <ArrowLeft className="w-5 h-5" />
      </button>
      <p className="text-xs text-white/45 mt-5">
        ביטול בקליק · ללא דמי הצטרפות · ללא התחייבות
      </p>
    </div>
  </section>
);
