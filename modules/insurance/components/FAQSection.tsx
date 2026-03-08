"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "מה בדיוק מכסה הביטוח?", a: "אחריות צד ג׳ — נזקי גוף ורכוש שנגרמו לצד שלישי כתוצאה משימוש בנשק. כולל כיסוי לאירועי טרור, הגנה פלילית ומנהלית, וקו חם לעורך דין 24/7." },
  { q: "למה לא להסתמך על הסנגוריה הציבורית?", a: "הסנגוריה הציבורית מספקת עורך דין שהוא עובד מדינה — לא בהכרח מומחה במקרי נשק. עם הביטוח מקבלים עורך דין מומחה שמכיר את התחום, זמין 24/7, ומלווה אותך לפני ואחרי העדות." },
  { q: "כמה עולה כתב הגנה בלי ביטוח?", a: "רק להעמיד כתב הגנה עולה 65,000–100,000 ש״ח — עוד לפני שמגיעים לאולם בית המשפט. עם הביטוח, הכל מכוסה עד 400,000 ש״ח." },
  { q: "מה גובה הכיסוי?", a: "עד 3,000,000 ש״ח לנזקי גוף ורכוש לצד שלישי, ועד 400,000 ש״ח להגנה פלילית ומנהלית — כולל עורך דין, ייצוג בבית משפט וערעורים." },
  { q: "מה קורה במקרה של גניבת נשק?", a: "הביטוח מכסה את ההגנה המשפטית במקרה שנפתח תיק פלילי, וגם מחזיר את עלות האקדח שנגנב." },
  { q: "האם הביטוח מכסה אירועי טרור?", a: "כן. זהו כיסוי ייחודי — הביטוח מכסה שימוש בנשק במהלך אירוע טרור, כולל ההגנה המשפטית שנדרשת לאחר מכן." },
  { q: "מה לא מכוסה?", a: "שימוש בנשק לצורכי עבירה פלילית, שימוש תחת השפעת אלכוהול או סמים, שימוש ברישיון שפג תוקפו, או שימוש במסגרת עבודה כמאבטח." },
  { q: "איך מצטרפים?", a: "ב-3 שלבים פשוטים: משאירים פרטים, מקבלים שיחה מנציג, ומתחילים להיות מוגנים. בלי ניירת ובלי בירוקרטיה." },
];

const FAQItem = ({ q, a, isOpen, onClick }: { q: string; a: string; isOpen: boolean; onClick: () => void }) => (
  <div style={{ borderBottom: "1px solid #e8edf5" }} className="last:border-b-0">
    <button onClick={onClick} className="w-full flex items-center justify-between py-5 px-2 text-right gap-3 group">
      <span className={`text-sm md:text-base font-bold transition-colors ${isOpen ? "text-[var(--accent-blue)]" : "text-[#37374e] group-hover:text-[var(--accent-blue)]"}`}>
        {q}
      </span>
      <ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-[var(--accent-blue)]" : "text-[#a0a0b0]"}`} />
    </button>
    <div className="overflow-hidden transition-all duration-300"
      style={{ maxHeight: isOpen ? 200 : 0, opacity: isOpen ? 1 : 0 }}>
      <p className="text-sm text-[#6b6b80] leading-relaxed pb-5 px-2">{a}</p>
    </div>
  </div>
);

export const FAQSection = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} id="faq" className="py-20 px-6 bg-white">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-center text-[#37374e] mb-3"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease" }}>
          שאלות <span className="text-[var(--accent-blue)]">נפוצות</span>
        </h2>
        <p className="text-[#6b6b80] text-center mb-12"
          style={{ opacity: visible ? 1 : 0, transition: "opacity 0.6s ease 0.2s" }}>
          כל מה שרצית לדעת על ביטוח למחזיקי נשק
        </p>

        <div className="p-5 md:p-8"
          style={{
            borderRadius: "30px",
            background: "#f8faff",
            border: "1px solid #e8edf5",
            boxShadow: "0 15px 35px -10px rgba(0,0,0,0.06)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(15px)",
            transition: "all 0.6s ease 0.3s",
          }}>
          {faqs.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a}
              isOpen={openIdx === i}
              onClick={() => setOpenIdx(openIdx === i ? null : i)} />
          ))}
        </div>
      </div>
    </section>
  );
};
