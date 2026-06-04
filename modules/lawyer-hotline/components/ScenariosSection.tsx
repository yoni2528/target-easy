"use client";

import { Siren, FileWarning, Users } from "lucide-react";

const scenarios = [
  {
    icon: Siren,
    title: "אירוע הגנה עצמית",
    body: "שלפת. הצלת. עכשיו החוקרים שואלים שאלות סבוכות שכל תשובה לא נכונה הופכת אותך מקורבן לחשוד.",
    quote: "״מה הרגשת באותו רגע?״",
  },
  {
    icon: FileWarning,
    title: "חיפוש בבית",
    body: "מגיעים אליך הביתה לבדוק כשירות אחסון. החוק מורכב, כל הצהרה לא מדויקת = עבירה פלילית.",
    quote: "״לאן אתה נוסע עם הנשק בדרך כלל?״",
  },
  {
    icon: Users,
    title: "סכסוך שהסלים",
    body: "ויכוח שכנים או תאונת דרכים שבה הזכרת שיש לך נשק. עכשיו פתאום אתה מעורב בתיק שאתה לא הבנת איך נכנסת אליו.",
    quote: "״אמרת ש'אם יצטרכו תוציא אותו'?״",
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
          ↓ הרגעים שבהם זה קורה
        </p>
        <h2 className="text-2xl md:text-4xl font-black text-[#37374e] mb-3">
          מתי <span className="text-[var(--accent-blue)]">תצטרך</span> את העו״ד שלנו?
        </h2>
        <p className="text-[#6b6b80] max-w-2xl mx-auto">
          לא כל אזרח שומר חוק מבין כמה דק קו הגבול בין "פעולה לגיטימית" ל"הפרת חוק". זה הקריטי
          באמת — להבין מתי לדבר ומתי לשתוק.
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
            <p className="text-sm text-[#6b6b80] leading-relaxed mb-4">{s.body}</p>
            <div
              className="text-sm text-[#37374e] italic px-3 py-2 rounded-lg"
              style={{
                background: "rgba(204,51,51,0.06)",
                borderRight: "3px solid #cc3333",
              }}
            >
              {s.quote}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
