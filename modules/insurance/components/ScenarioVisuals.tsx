import { PhoneFrame, BrowserFrame, ClipboardFrame } from "./ScenarioFrames";

type SceneProps = { isActive: boolean };

const anim = (isActive: boolean, delay: number) => ({
  opacity: isActive ? 1 : 0,
  transform: isActive ? "translateY(0)" : "translateY(8px)",
  transition: `opacity 0.4s ease ${delay}s, transform 0.4s ease ${delay}s`,
});

/** Scene 1: Breaking news — ירי באימון */
const NewspaperScene = ({ isActive }: SceneProps) => (
  <BrowserFrame url="yedioth-hamitvach.co.il/breaking">
    <div className="h-full flex flex-col" dir="rtl">
      <div className="bg-[var(--accent-red)] px-3 py-1.5 flex items-center justify-between shrink-0"
        style={{ ...anim(isActive, 0.1), transform: isActive ? "translateY(0)" : "translateY(-10px)" }}>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-white animate-[pulse_1.5s_ease-in-out_infinite]" />
          <span className="text-[10px] font-black text-white tracking-wider">מבזק</span>
        </div>
        <span className="text-[9px] text-white/70">08.03.2026 | 14:22</span>
      </div>
      <div className="flex-1 px-3 pt-3 pb-2 flex flex-col">
        <h4 className="text-[13px] font-black text-[var(--text-primary)] leading-snug mb-2"
          style={anim(isActive, 0.3)}>
          יורה פגע בצד שלישי במטווח — תביעה של 3 מיליון ש״ח
        </h4>
        <div className="w-10 h-0.5 bg-[var(--accent-red)] rounded mb-2"
          style={{ ...anim(isActive, 0.4), transform: isActive ? "scaleX(1)" : "scaleX(0)", transformOrigin: "right" }} />
        <p className="text-[10px] text-[var(--text-secondary)] leading-relaxed flex-1" style={anim(isActive, 0.5)}>
          הנפגע הגיש תביעת נזיקין כבדה. ליורה אין ביטוח אחריות מקצועי. הוא נושא את מלוא העלויות לבד — עורכי דין, פיצויים ונזקים.
        </p>
        <div className="flex items-center justify-between pt-2 border-t border-[var(--border-subtle)] mt-auto"
          style={anim(isActive, 0.6)}>
          <span className="text-[8px] text-[var(--text-muted)]">ידיעות המטווח</span>
          <span className="text-[8px] text-[var(--accent-red)] font-bold">חדשות דחופות</span>
        </div>
      </div>
    </div>
  </BrowserFrame>
);

/** Scene 2: WhatsApp chat — גניבת נשק (LTR flex for correct sides) */
const messages = [
  { sent: true, text: "שמע, פרצו לי לרכב בלילה. הנשק נגנב.", time: "21:34 ✓✓" },
  { sent: false, text: "תגיש תלונה עכשיו. פותחים נגדך תיק.", time: "21:35" },
  { sent: true, text: "כמה זה יעלה לי?", time: "21:36 ✓✓" },
  { sent: false, text: "בלי ביטוח? הרבה.", time: "21:36", urgent: true },
];

const WhatsAppScene = ({ isActive }: SceneProps) => (
  <PhoneFrame>
    <div className="h-full overflow-hidden flex flex-col" dir="rtl">
      <div className="bg-[var(--bg-elevated)] px-2 py-1 flex items-center gap-1.5 border-b border-[var(--border-subtle)] shrink-0">
        <div className="w-4 h-4 rounded-full" style={{ background: "color-mix(in srgb, var(--accent-red) 20%, transparent)" }} />
        <span className="text-[9px] text-[var(--text-primary)] font-bold">עו״ד פלילי</span>
      </div>
      {/* Use LTR direction for flex so justify-end=RIGHT (sent) justify-start=LEFT (received) */}
      <div className="flex-1 p-1.5 space-y-1 overflow-hidden" style={{ direction: "ltr" }}>
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.sent ? "justify-end" : "justify-start"}`}
            style={{ opacity: isActive ? 1 : 0, transform: isActive ? "translateX(0)" : `translateX(${m.sent ? "10px" : "-10px"})`, transition: `all 0.4s cubic-bezier(0.16,1,0.3,1) ${0.15 + i * 0.25}s` }}>
            <div className={`rounded-lg ${m.sent ? "rounded-tr-none" : "rounded-tl-none"} px-1.5 py-1 max-w-[88%] ${m.urgent ? "border border-[var(--accent-red)]/30" : ""}`}
              style={{ background: m.sent ? "color-mix(in srgb, var(--accent-blue) 12%, transparent)" : "var(--bg-elevated)", direction: "rtl" }}>
              <p className={`text-[8px] leading-snug ${m.urgent ? "text-[var(--accent-red)] font-bold" : "text-[var(--text-primary)]"}`}>{m.text}</p>
              <span className="text-[6px] text-[var(--text-muted)] float-left mt-0.5">{m.time}</span>
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

/** Scene 4: Escalation bars — תביעת נזיקין */
const TimelineScene = ({ isActive }: SceneProps) => {
  const steps = [
    { label: "נזק לרכוש של שכן", amount: "—", pct: 15, color: "var(--accent-amber)" },
    { label: "מכתב התראה מעו״ד", amount: "15,000₪", pct: 35, color: "var(--accent-amber)" },
    { label: "כתב תביעה", amount: "400,000₪", pct: 70, color: "var(--accent-red)" },
    { label: "פסק דין — אתה משלם", amount: "400,000₪", pct: 100, color: "var(--accent-red)" },
  ];
  return (
    <ClipboardFrame>
      <div className="h-full p-3 flex flex-col" dir="rtl">
        <p className="text-[10px] font-bold text-[var(--text-muted)] mb-1 text-center tracking-wide" style={anim(isActive, 0.1)}>
          תביעת נזיקין — כך זה מתגלגל
        </p>
        <div className="flex-1 flex flex-col justify-center space-y-2.5">
          {steps.map((s, i) => (
            <div key={s.label} style={{ opacity: isActive ? 1 : 0, transform: isActive ? "translateX(0)" : "translateX(12px)", transition: `all 0.45s cubic-bezier(0.16,1,0.3,1) ${0.2 + i * 0.18}s` }}>
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-[9px] text-[var(--text-secondary)] font-medium">{s.label}</span>
                <span className="text-[9px] font-bold" style={{ color: s.color }}>{s.amount}</span>
              </div>
              <div className="h-[6px] rounded-full" style={{ background: "color-mix(in srgb, var(--border-default) 50%, transparent)" }}>
                <div className="h-full rounded-full" style={{
                  width: isActive ? `${s.pct}%` : "0%",
                  background: `linear-gradient(90deg, color-mix(in srgb, ${s.color} 50%, transparent), ${s.color})`,
                  transition: `width 0.8s cubic-bezier(0.16,1,0.3,1) ${0.35 + i * 0.18}s`,
                  boxShadow: isActive ? `0 0 8px color-mix(in srgb, ${s.color} 25%, transparent)` : "none",
                }} />
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-1 pt-1.5 border-t border-[var(--border-subtle)]" style={anim(isActive, 0.9)}>
          <span className="text-[9px] text-[var(--accent-red)] font-bold">בלי ביטוח — הכל מהכיס שלך</span>
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
    <div className="h-full flex flex-col justify-center px-1 space-y-1" dir="rtl">
      <div className="text-center mb-1" style={anim(isActive, 0.1)}>
        <p className="text-lg font-black text-[var(--text-primary)] leading-none">21:47</p>
        <p className="text-[7px] text-[var(--text-muted)]">שבת, 8 במרץ</p>
      </div>
      {notifications.map((n, i) => (
        <div key={n.title}
          className="rounded-lg bg-[var(--bg-elevated)]/80 backdrop-blur border px-1.5 py-1 flex items-center gap-1.5"
          style={{
            borderColor: n.urgent ? "color-mix(in srgb, var(--accent-red) 40%, transparent)" : "var(--border-subtle)",
            opacity: isActive ? 1 : 0,
            transform: isActive ? "translateX(0)" : "translateX(-15px)",
            transition: `all 0.4s cubic-bezier(0.16,1,0.3,1) ${0.3 + i * 0.2}s`,
          }}>
          <div className="w-5 h-5 rounded flex items-center justify-center shrink-0"
            style={{ background: n.urgent ? "color-mix(in srgb, var(--accent-red) 15%, transparent)" : "color-mix(in srgb, var(--accent-red) 10%, transparent)" }}>
            <span className={`text-[7px] font-black ${n.urgent ? "text-[var(--accent-red)]" : "text-[var(--text-secondary)]"}`}>{n.icon}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className={`text-[7px] font-bold truncate ${n.urgent ? "text-[var(--accent-red)]" : "text-[var(--text-primary)]"}`}>{n.title}</p>
            <p className="text-[6px] text-[var(--text-muted)] truncate">{n.sub}</p>
          </div>
          <span className="text-[6px] text-[var(--text-muted)]">{n.time}</span>
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
