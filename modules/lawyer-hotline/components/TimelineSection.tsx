"use client";

const events = [
  {
    time: "T+0",
    title: "המקרה קורה",
    body: "אירוע. חקירה. חיפוש. רגע אחד הופך לקריטי.",
    accent: "#cc3333",
  },
  {
    time: "T+2 דקות",
    title: "אתה מחייג",
    body: "מספר אחד שאתה מכיר. בלי לחפש איש קשר. בלי להסביר.",
    accent: "#1a6fcc",
  },
  {
    time: "T+5 דקות",
    title: "עו״ד על הקו",
    body: "מסביר לך בשקט: מה לומר, מה לא, איך לשמור על הזכויות שלך.",
    accent: "#1a6fcc",
  },
  {
    time: "T+יום ומעבר",
    title: "המוקד נשאר זמין",
    body: "כל שאלת המשך, מסמך שאתה מקבל, או התפתחות בתיק. אתה ממשיך להתקשר. ייעוץ ללא הגבלת זמן.",
    accent: "#1a6fcc",
  },
];

export const TimelineSection = () => (
  <section id="timeline" className="py-16 md:py-24 px-4 md:px-6 bg-[#fafbfe]">
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-12 md:mb-16">
        <p className="text-xs md:text-sm font-bold tracking-[0.2em] text-[var(--accent-blue)] mb-3">
          ↓ השעון שלך
        </p>
        <h2 className="text-2xl md:text-4xl font-black text-[#37374e] mb-3">
          מה <span className="text-[var(--accent-blue)]">קורה</span> כשאתה מתקשר?
        </h2>
        <p className="text-[#6b6b80]">השעון מהרגע שאירוע מתחיל ועד שאתה חוזר לישון רגוע.</p>
      </div>

      <div className="relative">
        {/* Vertical line */}
        <div
          className="absolute right-[18px] md:right-[24px] top-2 bottom-2 w-[2px]"
          style={{ background: "#cfd8e4" }}
        />

        <div className="space-y-7 md:space-y-9">
          {events.map((e) => (
            <div key={e.time} className="relative pr-12 md:pr-16">
              {/* Dot */}
              <div
                className="absolute right-0 top-1 w-9 h-9 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white text-[10px] md:text-xs font-black"
                style={{
                  background: e.accent,
                  boxShadow: `0 4px 14px -2px ${e.accent}55`,
                }}
              >
                {e.time}
              </div>

              {/* Card */}
              <div
                className="rounded-xl p-4 md:p-5 bg-white"
                style={{ border: "1px solid #e8edf5" }}
              >
                <h3 className="font-bold text-base md:text-lg text-[#37374e] mb-1">
                  {e.title}
                </h3>
                <p className="text-sm text-[#6b6b80] leading-relaxed">{e.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
