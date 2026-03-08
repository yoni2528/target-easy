/** Scene 1: Newspaper headline — ירי באימון */
const NewspaperScene = () => (
  <div className="w-full rounded-2xl overflow-hidden bg-[var(--bg-card)] border border-[var(--border-subtle)]" dir="rtl">
    {/* Breaking banner */}
    <div className="bg-[var(--accent-red)] px-3 py-1.5 flex items-center justify-between">
      <span className="text-[10px] font-black text-white tracking-wider">מבזק חדשות</span>
      <span className="text-[9px] text-white/60">08.03.2026</span>
    </div>
    {/* Source */}
    <div className="px-3 pt-2 pb-1 border-b border-[var(--border-subtle)]">
      <span className="text-[10px] text-[var(--text-muted)] font-bold">ידיעות המטווח</span>
    </div>
    {/* Headline */}
    <div className="px-3 py-3">
      <h4 className="text-sm font-black text-[var(--text-primary)] leading-snug mb-1.5">
        יורה פגע בצד שלישי במטווח — תביעה של 3 מיליון ש״ח
      </h4>
      <p className="text-[10px] text-[var(--text-secondary)] leading-relaxed">
        הנפגע הגיש תביעת נזיקין. ליורה אין ביטוח. הוא נושא את הכל לבד...
      </p>
    </div>
  </div>
);

/** Scene 2: WhatsApp chat — גניבת נשק */
const WhatsAppScene = () => (
  <div className="w-full rounded-2xl overflow-hidden bg-[var(--bg-card)] border border-[var(--border-subtle)]" dir="rtl">
    {/* Header */}
    <div className="bg-[var(--bg-elevated)] px-3 py-1.5 flex items-center gap-2 border-b border-[var(--border-subtle)]">
      <div className="w-5 h-5 rounded-full" style={{ background: "color-mix(in srgb, var(--accent-red) 20%, transparent)" }} />
      <span className="text-[11px] text-[var(--text-primary)] font-bold">עו״ד פלילי</span>
    </div>
    {/* Messages */}
    <div className="p-2.5 space-y-1.5">
      {/* Sent */}
      <div className="flex justify-end">
        <div className="rounded-xl rounded-tr-none px-2.5 py-1.5 max-w-[85%]" style={{ background: "color-mix(in srgb, var(--accent-blue) 12%, transparent)" }}>
          <p className="text-[11px] text-[var(--text-primary)]">שמע, פרצו לי לרכב בלילה. הנשק נגנב.</p>
          <span className="text-[8px] text-[var(--text-muted)] float-left mt-0.5">21:34 ✓✓</span>
        </div>
      </div>
      {/* Received */}
      <div className="flex justify-start">
        <div className="bg-[var(--bg-elevated)] rounded-xl rounded-tl-none px-2.5 py-1.5 max-w-[85%]">
          <p className="text-[11px] text-[var(--text-primary)]">תגיש תלונה עכשיו. פותחים נגדך תיק על רשלנות.</p>
          <span className="text-[8px] text-[var(--text-muted)] float-left mt-0.5">21:35</span>
        </div>
      </div>
      {/* Sent */}
      <div className="flex justify-end">
        <div className="rounded-xl rounded-tr-none px-2.5 py-1.5 max-w-[85%]" style={{ background: "color-mix(in srgb, var(--accent-blue) 12%, transparent)" }}>
          <p className="text-[11px] text-[var(--text-primary)]">כמה זה יעלה לי?</p>
          <span className="text-[8px] text-[var(--text-muted)] float-left mt-0.5">21:36 ✓✓</span>
        </div>
      </div>
      {/* Received — scary */}
      <div className="flex justify-start">
        <div className="bg-[var(--bg-elevated)] rounded-xl rounded-tl-none px-2.5 py-1.5 max-w-[85%] border border-[var(--accent-red)]/30">
          <p className="text-[11px] text-[var(--accent-red)] font-bold">בלי ביטוח? הרבה.</p>
          <span className="text-[8px] text-[var(--text-muted)] float-left mt-0.5">21:36</span>
        </div>
      </div>
    </div>
  </div>
);

/** Scene 3: Legal document — חקירה פלילית */
const LegalDocScene = () => (
  <div className="w-full rounded-2xl overflow-hidden bg-[var(--bg-card)] border border-[var(--border-subtle)] p-3 relative" dir="rtl">
    {/* Official header */}
    <div className="text-center border-b border-[var(--border-default)] pb-2 mb-2">
      <p className="text-[9px] text-[var(--text-muted)] tracking-widest">מדינת ישראל</p>
      <p className="text-[11px] font-black text-[var(--text-primary)]">משטרת ישראל — להב</p>
    </div>
    {/* Document */}
    <div className="space-y-1.5">
      <div className="flex justify-between text-[9px] text-[var(--text-muted)]">
        <span>תיק מס׳ 2026-4821</span>
        <span>סודי</span>
      </div>
      <p className="text-[11px] font-bold text-[var(--text-primary)]">זימון לחקירה תחת אזהרה</p>
      <p className="text-[10px] text-[var(--text-secondary)] leading-relaxed">
        הנך מוזמן להתייצב לחקירה בגין שימוש בנשק חם באירוע מיום...
      </p>
      <p className="text-[10px] text-[var(--text-secondary)]">
        יש לך זכות להיות מיוצג על ידי עורך דין.
      </p>
    </div>
    {/* Red stamp */}
    <div className="absolute bottom-3 left-3 w-12 h-12 rounded-full border-2 border-[var(--accent-red)] flex items-center justify-center rotate-[-12deg] opacity-50">
      <span className="text-[8px] font-black text-[var(--accent-red)] text-center leading-tight">חקירה<br />פלילית</span>
    </div>
  </div>
);

/** Scene 4: Mini timeline — תביעת נזיקין */
const TimelineScene = () => {
  const steps = [
    { time: "יום 1", text: "נזק לרכוש של שכן" },
    { time: "שבוע 2", text: "מכתב התראה מעו״ד" },
    { time: "חודש 3", text: "כתב תביעה — 400,000₪" },
    { time: "חודש 8", text: "פסק דין — אתה משלם" },
  ];
  return (
    <div className="w-full rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] p-3" dir="rtl">
      <p className="text-[10px] font-bold text-[var(--text-muted)] mb-2.5 text-center tracking-wide">ציר הזמן של תביעה</p>
      <div className="space-y-0">
        {steps.map((s, i) => {
          const opacity = 0.4 + (i / (steps.length - 1)) * 0.6;
          return (
            <div key={s.time} className="flex items-start gap-2">
              <div className="flex flex-col items-center">
                <div className="w-2.5 h-2.5 rounded-full shrink-0 bg-[var(--accent-red)]" style={{ opacity }} />
                {i < steps.length - 1 && <div className="w-px h-5 bg-[var(--border-default)]" />}
              </div>
              <div className="pb-1.5">
                <span className="text-[9px] font-bold text-[var(--accent-red)]" style={{ opacity }}>{s.time}</span>
                <p className="text-[11px] text-[var(--text-primary)]">{s.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/** Scene 5: Phone notifications — הצלת חיים */
const NotificationsScene = () => (
  <div className="w-full space-y-1.5" dir="rtl">
    {[
      { icon: "112", title: "משטרת ישראל", sub: "3 שיחות שלא נענו", time: "עכשיו", urgent: false },
      { icon: "⚖", title: "הודעה מהפרקליטות", sub: "נפתחה חקירה בעקבות אירוע הירי...", time: "5 דק׳", urgent: false },
      { icon: "!", title: "זימון לחקירה", sub: "עליך להתייצב בתחנת משטרה תוך 24 שעות", time: "12 דק׳", urgent: true },
    ].map((n) => (
      <div
        key={n.title}
        className="rounded-xl bg-[var(--bg-card)] border px-3 py-2 flex items-center gap-2"
        style={{ borderColor: n.urgent ? "color-mix(in srgb, var(--accent-red) 40%, transparent)" : "var(--border-subtle)" }}
      >
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: n.urgent ? "color-mix(in srgb, var(--accent-red) 15%, transparent)" : "color-mix(in srgb, var(--accent-red) 10%, transparent)" }}
        >
          <span className={`text-[10px] font-black ${n.urgent ? "text-[var(--accent-red)]" : "text-[var(--text-secondary)]"}`}>{n.icon}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className={`text-[10px] font-bold truncate ${n.urgent ? "text-[var(--accent-red)]" : "text-[var(--text-primary)]"}`}>{n.title}</p>
          <p className="text-[9px] text-[var(--text-muted)] truncate">{n.sub}</p>
        </div>
        <span className="text-[8px] text-[var(--text-muted)]">{n.time}</span>
      </div>
    ))}
  </div>
);

export const ScenarioVisual = ({ index }: { index: number }) => {
  const scenes = [NewspaperScene, WhatsAppScene, LegalDocScene, TimelineScene, NotificationsScene];
  const Scene = scenes[index];
  return <Scene />;
};
