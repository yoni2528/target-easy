"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "מה מכוסה?", a: "נזקי צד שלישי עד 3,000,000₪, הגנה משפטית עד 400,000₪, כיסוי טרור, גניבת נשק, וקו חם לעו״ד 24/7." },
  { q: "למה לא הסנגוריה הציבורית?", a: "עובד מדינה, לא מומחה לנשק. עם הביטוח — עו״ד מומחה, זמין 24/7, לפני העדות." },
  { q: "כמה עולה כתב הגנה בלי ביטוח?", a: "65,000–100,000₪. עוד לפני בית המשפט. עם הביטוח — מכוסה עד 400,000₪." },
  { q: "מה קורה בגניבת נשק?", a: "הגנה משפטית מכוסה + החזר על האקדח." },
  { q: "מכסה אירועי טרור?", a: "כן. שימוש בנשק באירוע טרור + הגנה משפטית אחרי." },
  { q: "מה לא מכוסה?", a: "עבירה פלילית, אלכוהול/סמים, רישיון שפג, עבודה כמאבטח." },
  { q: "איך מצטרפים?", a: "משאירים פרטים → שיחה מנציג → מוגנים. בלי ניירת." },
];

const FAQItem = ({ q, a, isOpen, onClick }: { q: string; a: string; isOpen: boolean; onClick: () => void }) => (
  <div style={{ borderBottom: "1px solid #e8edf5" }} className="last:border-b-0">
    <button onClick={onClick} className="w-full flex items-center justify-between py-4 md:py-5 px-2 text-right gap-3 group min-h-[48px]">
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
    <section ref={ref} id="faq" className="py-16 md:py-28 px-4 md:px-6 bg-white">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-black text-center text-[#37374e] mb-3"
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
