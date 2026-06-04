"use client";

import { Siren, FileWarning, Users } from "lucide-react";

const scenarios = [
  {
    icon: Siren,
    title: "אחרי אירוע הגנה עצמית",
    body: "מתקשרים — מקבלים הוראות מקצועיות איך לתאר את האירוע, על מה לוותר ועל מה לעמוד.",
  },
  {
    icon: FileWarning,
    title: "בדיקת כשירות אחסון",
    body: "המשטרה הגיעה לבדיקת רישוי או אחסון? הצוות מסביר בזמן אמת איך לעבור את הבדיקה בלי בעיות.",
  },
  {
    icon: Users,
    title: "אירועים יומיומיים שמסלים",
    body: "ויכוח שכנים, תאונת דרכים, סכסוך עבודה — אם הוזכר נשק, מקבלים ליווי משפטי מקצועי.",
  },
];

export const ScenariosSection = () => (
  <section
    id="what"
    className="py-16 md:py-24 px-4 md:px-6 bg-white"
    style={{ borderTop: "1px solid #e8edf5" }}
  >
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-10 md:mb-16">
        <p className="text-xs md:text-sm font-bold tracking-[0.2em] text-[var(--accent-blue)] mb-3">
          ↓ מתי זה שימושי
        </p>
        <h2 className="text-2xl md:text-4xl font-black text-[#37374e] mb-3">
          המגן <span className="text-[var(--accent-blue)]">המשפטי</span> שלך — בכל מצב
        </h2>
        <p className="text-[#6b6b80] max-w-2xl mx-auto">
          כל אזרח חמוש פוגש מצבים שבהם ייעוץ משפטי בזמן אמת יכול לעשות את כל ההבדל.
          זה בדיוק מה שאנחנו מספקים — ייעוץ מקצועי, ברגע שצריך, ללא בירוקרטיה.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {scenarios.map((s) => (
          <div
            key={s.title}
            className="rounded-2xl p-6 md:p-7 bg-[#fafbfe] border border-[#e8edf5] hover:border-[var(--accent-blue)] transition-colors"
          >
            <div className="w-12 h-12 rounded-xl bg-[var(--accent-blue)]/10 flex items-center justify-center mb-4">
              <s.icon className="w-6 h-6 text-[var(--accent-blue)]" />
            </div>
            <h3 className="font-bold text-lg text-[#37374e] mb-2">{s.title}</h3>
            <p className="text-sm text-[#6b6b80] leading-relaxed">{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
