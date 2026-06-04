"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

const faqs = [
  {
    q: "מה בדיוק כלול ב-14.90 ₪?",
    a: "מענה ראשוני אנושי מעו״ד פלילי תוך דקות, 24/7. ייעוץ טלפוני בלתי מוגבל ברגעי משבר, הוראות מיידיות מה לומר ומה לא לומר. המוצר מתמקד ב-מענה הראשוני: השנייה שאתה עוצר את העולם, מתקשר, ויודע מה לעשות.",
  },
  {
    q: "מי הם עורכי הדין? אפשר לבחור?",
    a: "צוות עורכי דין פליליים שעובדים איתנו בלעדית, כולם מנוסים בתיקי נשק ובהגנה עצמית. המוקד מנתב אותך לעו״ד הזמין באותו רגע. אם אתה מעדיף עו״ד ספציפי לתיק שלך, תוכל לבקש בתחילת השיחה.",
  },
  {
    q: "מה אם אצטרך ייצוג מלא בבית משפט?",
    a: "המנוי לא כולל ייצוג מלא בכתב אישום או בתביעות אזרחיות. אבל כחבר קבוצת רכישה אתה מקבל את הצוות במחיר חבר (משמעותית פחות משוק פתוח). ביום הראשון נסגור איתך את ההסכם.",
  },
  {
    q: "האם החיוב מתחדש אוטומטית? איך מבטלים?",
    a: "כן, חודשי, באמצעות הוראת קבע. ביטול בקליק אחד דרך אזור אישי או בשיחה. בלי שאלות, בלי קנס. החודש הראשון הוא 'תקופת היכרות'. תוכל לבטל ולקבל החזר מלא ב-30 הימים הראשונים.",
  },
  {
    q: "האם זה תקף גם לבן/בת זוג?",
    a: "המנוי שייך לאדם פרטי. בן/בת זוג שגם הם בעלי רישיון נשק יכולים להצטרף בתעריף מיוחד של זוג: 24.90 ₪ לחודש לשניים.",
  },
];

export const FAQSection = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16 md:py-24 px-4 md:px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10 md:mb-14"
        >
          <p className="text-xs md:text-sm font-bold tracking-[0.2em] text-[var(--accent-blue)] mb-3">
            ↓ שאלות נפוצות
          </p>
          <h2 className="text-2xl md:text-4xl font-black text-[#37374e]">
            כל מה ש<span className="text-[var(--accent-blue)]">חשבת</span> לשאול
          </h2>
        </motion.div>

        <div className="space-y-2.5">
          {faqs.map((f, i) => {
            const open = openIdx === i;
            return (
              <motion.div
                key={f.q}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-xl bg-[#fafbfe] overflow-hidden transition-colors"
                style={{
                  border: `1px solid ${open ? "var(--accent-blue)" : "#e8edf5"}`,
                }}
              >
                <button
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-right"
                  onClick={() => setOpenIdx(open ? null : i)}
                >
                  <span className="font-bold text-[#37374e] text-sm md:text-base">
                    {f.q}
                  </span>
                  <ChevronDown
                    className="w-4 h-4 text-[var(--accent-blue)] flex-shrink-0 transition-transform"
                    style={{ transform: open ? "rotate(180deg)" : "" }}
                  />
                </button>
                {open && (
                  <div className="px-5 pb-5 text-sm text-[#6b6b80] leading-relaxed">
                    {f.a}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
