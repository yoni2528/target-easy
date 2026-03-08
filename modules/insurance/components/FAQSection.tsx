"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "מה בדיוק מכסה הביטוח?",
    a: "הביטוח מכסה אחריות צד ג׳ — נזקי גוף ורכוש שנגרמו לצד שלישי כתוצאה משימוש בנשק. כולל גם כיסוי לאירועי טרור, הגנה פלילית ומנהלית, וקו חם לעורך דין 24/7.",
  },
  {
    q: "מי חברת הביטוח?",
    a: "הפוליסה מונפקת על ידי מנורה ביטוח — אחת מחברות הביטוח הגדולות והוותיקות בישראל, עם יציבות פיננסית ומוניטין של עשרות שנים.",
  },
  {
    q: "מה גובה הכיסוי?",
    a: "כיסוי עד 3,000,000 ש״ח לנזקי גוף ורכוש לצד שלישי, וכיסוי עד 400,000 ש״ח להגנה פלילית ומנהלית — כולל עורך דין פלילי, ייצוג בבית משפט וערעורים.",
  },
  {
    q: "האם הביטוח מכסה גם אירועי טרור?",
    a: "כן. זהו אחד הכיסויים הייחודיים שלנו — הביטוח מכסה שימוש בנשק במהלך אירוע טרור, כולל ההגנה המשפטית שנדרשת לאחר מכן.",
  },
  {
    q: "מה לא מכוסה?",
    a: "הביטוח לא מכסה שימוש בנשק לצורכי עבירה פלילית, שימוש תחת השפעת אלכוהול או סמים, שימוש ברישיון שפג תוקפו, או שימוש במסגרת עבודה כמאבטח (נדרש ביטוח מעסיק).",
  },
  {
    q: "כמה עולה הביטוח?",
    a: "העלות תלויה בסוג הרישיון ובמאפיינים אישיים. השאירו פרטים ונחזור אליכם עם הצעת מחיר מותאמת — ללא התחייבות.",
  },
  {
    q: "איך מצטרפים?",
    a: "ב-3 שלבים פשוטים: משאירים פרטים באתר, מקבלים שיחה מנציג שמסביר הכל, ומתחילים להיות מוגנים. בלי ניירת מיותרת ובלי בירוקרטיה.",
  },
  {
    q: "האם הביטוח תקף בכל הארץ?",
    a: "כן, הביטוח תקף בכל שטח מדינת ישראל, כולל אזורי יהודה ושומרון.",
  },
];

const FAQItem = ({ q, a, isOpen, onClick }: { q: string; a: string; isOpen: boolean; onClick: () => void }) => (
  <div className="border-b border-[var(--border-subtle)] last:border-b-0">
    <button onClick={onClick} className="w-full flex items-center justify-between py-4 px-1 text-right gap-3 group">
      <span className={`text-sm md:text-base font-bold transition-colors ${isOpen ? "text-[var(--accent-blue)]" : "text-[var(--text-primary)] group-hover:text-[var(--accent-blue)]"}`}>
        {q}
      </span>
      <ChevronDown className={`w-4 h-4 shrink-0 text-[var(--text-muted)] transition-transform duration-300 ${isOpen ? "rotate-180 text-[var(--accent-blue)]" : ""}`} />
    </button>
    <div className="overflow-hidden transition-all duration-300"
      style={{ maxHeight: isOpen ? 200 : 0, opacity: isOpen ? 1 : 0 }}>
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed pb-4 px-1">{a}</p>
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
    <section ref={ref} id="faq" className="py-16 px-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-center mb-3"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease" }}>
          שאלות <span className="text-[var(--accent-blue)]">נפוצות</span>
        </h2>
        <p className="text-[var(--text-secondary)] text-center mb-12"
          style={{ opacity: visible ? 1 : 0, transition: "opacity 0.6s ease 0.2s" }}>
          כל מה שרצית לדעת על ביטוח למחזיקי נשק
        </p>

        <div className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)] shadow-sm p-4 md:p-6"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(15px)", transition: "all 0.6s ease 0.3s" }}>
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
