"use client";

import { PhoneCall, MessageSquare, UserCheck } from "lucide-react";

const steps = [
  {
    n: "01",
    icon: PhoneCall,
    title: "מתקשרים — שניות",
    body: "אירוע. אתה מוציא את הטלפון, מחייג למספר אחד. עו״ד פלילי על הקו תוך פחות מ-3 דקות.",
  },
  {
    n: "02",
    icon: MessageSquare,
    title: "מקבלים הוראות בטלפון",
    body: "עו״ד מסביר לך בדיוק מה לעשות עכשיו: מה מותר להגיד למשטרה, מה אסור, ואיך לשמר את זכויותיך.",
  },
  {
    n: "03",
    icon: UserCheck,
    title: "ליווי פיזי במחיר חבר",
    body: "אם תרצה נציג פיזי במקום או ליווי לחקירה — תוספת מסובסדת רק לחברי הקבוצה, באישור מראש.",
  },
];

export const SolutionSection = () => (
  <section
    className="py-16 md:py-24 px-4 md:px-6"
    style={{ background: "var(--bg-primary)" }}
  >
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12 md:mb-16">
        <p className="text-xs md:text-sm font-bold tracking-[0.2em] text-[var(--accent-blue)] mb-3">
          ↓ הפתרון
        </p>
        <h2 className="text-2xl md:text-4xl font-black text-[var(--text-primary)] mb-3">
          3 שלבים. עד הסוף.
        </h2>
        <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
          אנחנו מטפלים בכל הצד המשפטי. אתה מתרכז במה שחשוב — להישאר רגוע ולשמור על המשפחה.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {steps.map((s) => (
          <div
            key={s.n}
            className="rounded-2xl p-6 md:p-7 relative"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-subtle)",
            }}
          >
            <div
              className="absolute top-4 left-4 text-4xl md:text-5xl font-black opacity-10"
              style={{ color: "var(--accent-blue)" }}
            >
              {s.n}
            </div>
            <div className="relative">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ background: "rgba(26,111,204,0.10)" }}
              >
                <s.icon className="w-6 h-6 text-[var(--accent-blue)]" />
              </div>
              <h3 className="font-bold text-lg text-[var(--text-primary)] mb-2">{s.title}</h3>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">{s.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
