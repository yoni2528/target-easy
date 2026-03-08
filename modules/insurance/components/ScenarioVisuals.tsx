import { PhoneFrame, BrowserFrame, ClipboardFrame } from "./ScenarioFrames";

type SceneProps = { isActive: boolean };

const anim = (isActive: boolean, delay: number) => ({
  opacity: isActive ? 1 : 0,
  transform: isActive ? "translateY(0)" : "translateY(8px)",
  transition: `opacity 0.4s ease ${delay}s, transform 0.4s ease ${delay}s`,
});

/** Scene 1: Newspaper headline — ירי באימון */
const NewspaperScene = ({ isActive }: SceneProps) => (
  <BrowserFrame url="yedioth-hamitvach.co.il/breaking">
    <div className="h-full" dir="rtl">
      <div className="bg-[var(--accent-red)] px-3 py-1.5 flex items-center justify-between"
        style={{ ...anim(isActive, 0.1), transform: isActive ? "translateY(0)" : "translateY(-10px)" }}>
        <span className="text-[10px] font-black text-white tracking-wider">מבזק חדשות</span>
        <span className="text-[9px] text-white/60">08.03.2026</span>
      </div>
      <div className="px-3 pt-2 pb-1 border-b border-[var(--border-subtle)]" style={anim(isActive, 0.2)}>
        <span className="text-[10px] text-[var(--text-muted)] font-bold">ידיעות המטווח</span>
      </div>
      <div className="px-3 py-3">
        <h4 className="text-sm font-black text-[var(--text-primary)] leading-snug mb-1.5" style={anim(isActive, 0.35)}>
          יורה פגע בצד שלישי במטווח — תביעה של 3 מיליון ש״ח
        </h4>
        <p className="text-[10px] text-[var(--text-secondary)] leading-relaxed" style={anim(isActive, 0.5)}>
          הנפגע הגיש תביעת נזיקין. ליורה אין ביטוח. הוא נושא את הכל לבד...
        </p>
      </div>
    </div>
  </BrowserFrame>
);

/** Scene 2: WhatsApp chat — גניבת נשק */
const messages = [
  { side: "end" as const, bg: "color-mix(in srgb, var(--accent-blue) 12%, transparent)", text: "שמע, פרצו לי לרכב בלילה. הנשק נגנב.", time: "21:34 ✓✓", accent: false },
  { side: "start" as const, bg: "var(--bg-elevated)", text: "תגיש תלונה עכשיו. פותחים נגדך תיק.", time: "21:35", accent: false },
  { side: "end" as const, bg: "color-mix(in srgb, var(--accent-blue) 12%, transparent)", text: "כמה זה יעלה לי?", time: "21:36 ✓✓", accent: false },
  { side: "start" as const, bg: "var(--bg-elevated)", text: "בלי ביטוח? הרבה.", time: "21:36", accent: true },
];

const WhatsAppScene = ({ isActive }: SceneProps) => (
  <PhoneFrame>
    <div className="h-full rounded-t-xl overflow-hidden bg-[var(--bg-card)] border border-[var(--border-subtle)] flex flex-col" dir="rtl">
      <div className="bg-[var(--bg-elevated)] px-3 py-1.5 flex items-center gap-2 border-b border-[var(--border-subtle)] shrink-0">
        <div className="w-5 h-5 rounded-full" style={{ background: "color-mix(in srgb, var(--accent-red) 20%, transparent)" }} />
        <span className="text-[11px] text-[var(--text-primary)] font-bold">עו״ד פלילי</span>
      </div>
      <div className="flex-1 p-2 space-y-1.5 overflow-hidden">
        {messages.map((m, i) => (
          <div key={i} className={`flex justify-${m.side}`}
            style={{ opacity: isActive ? 1 : 0, transform: isActive ? "translateX(0)" : `translateX(${m.side === "end" ? "-15px" : "15px"})`, transition: `all 0.4s cubic-bezier(0.16,1,0.3,1) ${0.15 + i * 0.25}s` }}>
            <div className={`rounded-xl ${m.side === "end" ? "rounded-tr-none" : "rounded-tl-none"} px-2.5 py-1.5 max-w-[85%] ${m.accent ? "border border-[var(--accent-red)]/30" : ""}`}
              style={{ background: m.bg }}>
              <p className={`text-[11px] ${m.accent ? "text-[var(--accent-red)] font-bold" : "text-[var(--text-primary)]"}`}>{m.text}</p>
              <span className="text-[8px] text-[var(--text-muted)] float-left mt-0.5">{m.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </PhoneFrame>
);

/** Scene 3: Legal document — חקירה פלילית */
const LegalDocScene = ({ isActive }: SceneProps) => (
  <ClipboardFrame>
    <div className="h-full p-3 relative" dir="rtl">
      <div className="text-center border-b border-[var(--border-default)] pb-2 mb-2" style={anim(isActive, 0.1)}>
        <p className="text-[9px] text-[var(--text-muted)] tracking-widest">מדינת ישראל</p>
        <p className="text-[11px] font-black text-[var(--text-primary)]">משטרת ישראל — להב</p>
      </div>
      <div className="space-y-1.5">
        <div className="flex justify-between text-[9px] text-[var(--text-muted)]" style={anim(isActive, 0.25)}>
          <span>תיק מס׳ 2026-4821</span>
          <span>סודי</span>
        </div>
        <p className="text-[11px] font-bold text-[var(--text-primary)]" style={anim(isActive, 0.35)}>זימון לחקירה תחת אזהרה</p>
        <p className="text-[10px] text-[var(--text-secondary)] leading-relaxed" style={anim(isActive, 0.45)}>
          הנך מוזמן להתייצב לחקירה בגין שימוש בנשק חם באירוע מיום...
        </p>
        <p className="text-[10px] text-[var(--text-secondary)]" style={anim(isActive, 0.55)}>
          יש לך זכות להיות מיוצג על ידי עורך דין.
        </p>
      </div>
      {/* Stamp slams in */}
      <div className="absolute bottom-3 left-3 w-12 h-12 rounded-full border-2 border-[var(--accent-red)] flex items-center justify-center"
        style={{
          opacity: isActive ? 0.6 : 0,
          transform: isActive ? "rotate(-12deg) scale(1)" : "rotate(15deg) scale(1.8)",
          transition: "all 0.35s cubic-bezier(0.16,1,0.3,1) 0.7s",
        }}>
        <span className="text-[8px] font-black text-[var(--accent-red)] text-center leading-tight">חקירה<br />פלילית</span>
      </div>
    </div>
  </ClipboardFrame>
);

/** Scene 4: Mini timeline — תביעת נזיקין */
const TimelineScene = ({ isActive }: SceneProps) => {
  const steps = [
    { time: "יום 1", text: "נזק לרכוש של שכן" },
    { time: "שבוע 2", text: "מכתב התראה מעו״ד" },
    { time: "חודש 3", text: "כתב תביעה — 400,000₪" },
    { time: "חודש 8", text: "פסק דין — אתה משלם" },
  ];
  return (
    <ClipboardFrame>
      <div className="h-full p-3" dir="rtl">
        <p className="text-[10px] font-bold text-[var(--text-muted)] mb-3 text-center tracking-wide" style={anim(isActive, 0.1)}>ציר הזמן של תביעה</p>
        <div className="space-y-0">
          {steps.map((s, i) => {
            const opacity = 0.4 + (i / (steps.length - 1)) * 0.6;
            const delay = 0.2 + i * 0.2;
            return (
              <div key={s.time} className="flex items-start gap-2"
                style={{ opacity: isActive ? 1 : 0, transform: isActive ? "translateX(0)" : "translateX(12px)", transition: `all 0.45s cubic-bezier(0.16,1,0.3,1) ${delay}s` }}>
                <div className="flex flex-col items-center">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0 bg-[var(--accent-red)] transition-transform duration-300"
                    style={{ opacity, transform: isActive ? "scale(1)" : "scale(0)" , transition: `transform 0.3s ease ${delay + 0.1}s` }} />
                  {i < steps.length - 1 && (
                    <div className="w-px bg-[var(--border-default)] transition-all"
                      style={{ height: isActive ? 24 : 0, transition: `height 0.4s ease ${delay + 0.15}s` }} />
                  )}
                </div>
                <div className="pb-2">
                  <span className="text-[9px] font-bold text-[var(--accent-red)]" style={{ opacity }}>{s.time}</span>
                  <p className="text-[11px] text-[var(--text-primary)]">{s.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ClipboardFrame>
  );
};

/** Scene 5: Phone notifications — הצלת חיים */
const notifications = [
  { icon: "112", title: "משטרת ישראל", sub: "3 שיחות שלא נענו", time: "עכשיו", urgent: false },
  { icon: "⚖", title: "הודעה מהפרקליטות", sub: "נפתחה חקירה בעקבות אירוע הירי...", time: "5 דק׳", urgent: false },
  { icon: "!", title: "זימון לחקירה", sub: "עליך להתייצב תוך 24 שעות", time: "12 דק׳", urgent: true },
];

const NotificationsScene = ({ isActive }: SceneProps) => (
  <PhoneFrame>
    <div className="h-full flex flex-col justify-center px-1 space-y-1.5" dir="rtl">
      <div className="text-center mb-1" style={anim(isActive, 0.1)}>
        <p className="text-2xl font-black text-[var(--text-primary)] leading-none">21:47</p>
        <p className="text-[9px] text-[var(--text-muted)]">שבת, 8 במרץ</p>
      </div>
      {notifications.map((n, i) => (
        <div key={n.title}
          className="rounded-xl bg-[var(--bg-elevated)]/80 backdrop-blur border px-2.5 py-1.5 flex items-center gap-2"
          style={{
            borderColor: n.urgent ? "color-mix(in srgb, var(--accent-red) 40%, transparent)" : "var(--border-subtle)",
            opacity: isActive ? 1 : 0,
            transform: isActive ? "translateX(0)" : "translateX(-20px)",
            transition: `all 0.4s cubic-bezier(0.16,1,0.3,1) ${0.3 + i * 0.2}s`,
          }}>
          <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: n.urgent ? "color-mix(in srgb, var(--accent-red) 15%, transparent)" : "color-mix(in srgb, var(--accent-red) 10%, transparent)" }}>
            <span className={`text-[9px] font-black ${n.urgent ? "text-[var(--accent-red)]" : "text-[var(--text-secondary)]"}`}>{n.icon}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className={`text-[9px] font-bold truncate ${n.urgent ? "text-[var(--accent-red)]" : "text-[var(--text-primary)]"}`}>{n.title}</p>
            <p className="text-[8px] text-[var(--text-muted)] truncate">{n.sub}</p>
          </div>
          <span className="text-[7px] text-[var(--text-muted)]">{n.time}</span>
        </div>
      ))}
    </div>
  </PhoneFrame>
);

export const ScenarioVisual = ({ index, isActive }: { index: number; isActive: boolean }) => {
  const scenes = [NewspaperScene, WhatsAppScene, LegalDocScene, TimelineScene, NotificationsScene];
  const Scene = scenes[index];
  return <Scene isActive={isActive} />;
};
