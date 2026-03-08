/** Scene 1: Newspaper headline — ירי באימון */
const NewspaperScene = () => (
  <div className="w-full rounded-lg overflow-hidden bg-[#faf8f2] border border-[#d4c9a8] text-right" dir="rtl">
    {/* Red breaking banner */}
    <div className="bg-[#cc2222] px-3 py-1 flex items-center justify-between">
      <span className="text-[10px] font-black text-white tracking-wider">מבזק חדשות</span>
      <span className="text-[9px] text-white/70">08.03.2026</span>
    </div>
    {/* Newspaper name */}
    <div className="px-3 pt-2 pb-1 border-b border-[#d4c9a8]">
      <span className="text-[10px] text-[#8a7a5a] font-bold">ידיעות המטווח</span>
    </div>
    {/* Headline */}
    <div className="px-3 py-3">
      <h4 className="text-sm font-black text-[#1a1a1a] leading-snug mb-1.5">
        יורה פגע בצד שלישי במטווח — תביעה של 3 מיליון ש״ח
      </h4>
      <p className="text-[10px] text-[#666] leading-relaxed">
        הנפגע הגיש תביעת נזיקין. ליורה אין ביטוח. הוא נושא את הכל לבד...
      </p>
    </div>
  </div>
);

/** Scene 2: WhatsApp chat — גניבת נשק */
const WhatsAppScene = () => (
  <div className="w-full rounded-lg overflow-hidden bg-[#ece5dd]" dir="rtl">
    {/* WhatsApp header */}
    <div className="bg-[#075e54] px-3 py-1.5 flex items-center gap-2">
      <div className="w-5 h-5 rounded-full bg-white/20" />
      <span className="text-[11px] text-white font-bold">עו״ד פלילי</span>
    </div>
    {/* Messages */}
    <div className="p-2 space-y-1.5">
      {/* Sent message */}
      <div className="flex justify-end">
        <div className="bg-[#dcf8c6] rounded-lg rounded-tr-none px-2.5 py-1.5 max-w-[85%] shadow-sm">
          <p className="text-[11px] text-[#111]">שמע, פרצו לי לרכב בלילה. הנשק נגנב.</p>
          <span className="text-[8px] text-[#999] float-left mt-0.5">21:34 ✓✓</span>
        </div>
      </div>
      {/* Received */}
      <div className="flex justify-start">
        <div className="bg-white rounded-lg rounded-tl-none px-2.5 py-1.5 max-w-[85%] shadow-sm">
          <p className="text-[11px] text-[#111]">תגיש תלונה עכשיו. פותחים נגדך תיק על רשלנות.</p>
          <span className="text-[8px] text-[#999] float-left mt-0.5">21:35</span>
        </div>
      </div>
      {/* Sent */}
      <div className="flex justify-end">
        <div className="bg-[#dcf8c6] rounded-lg rounded-tr-none px-2.5 py-1.5 max-w-[85%] shadow-sm">
          <p className="text-[11px] text-[#111]">כמה זה יעלה לי?</p>
          <span className="text-[8px] text-[#999] float-left mt-0.5">21:36 ✓✓</span>
        </div>
      </div>
      {/* Received - scary */}
      <div className="flex justify-start">
        <div className="bg-white rounded-lg rounded-tl-none px-2.5 py-1.5 max-w-[85%] shadow-sm">
          <p className="text-[11px] text-[#cc2222] font-bold">בלי ביטוח? הרבה.</p>
          <span className="text-[8px] text-[#999] float-left mt-0.5">21:36</span>
        </div>
      </div>
    </div>
  </div>
);

/** Scene 3: Legal document — חקירה פלילית */
const LegalDocScene = () => (
  <div className="w-full rounded-lg overflow-hidden bg-white border border-[#ccc] p-3 relative" dir="rtl">
    {/* Official header */}
    <div className="text-center border-b border-[#333] pb-2 mb-2">
      <p className="text-[9px] text-[#666] tracking-widest">מדינת ישראל</p>
      <p className="text-[11px] font-black text-[#1a1a1a]">משטרת ישראל — להב</p>
    </div>
    {/* Document content */}
    <div className="space-y-1.5">
      <div className="flex justify-between text-[9px] text-[#888]">
        <span>תיק מס׳ 2026-4821</span>
        <span>סודי</span>
      </div>
      <p className="text-[11px] font-bold text-[#1a1a1a]">זימון לחקירה תחת אזהרה</p>
      <p className="text-[10px] text-[#444] leading-relaxed">
        הנך מוזמן להתייצב לחקירה בגין שימוש בנשק חם באירוע מיום...
      </p>
      <p className="text-[10px] text-[#444]">
        יש לך זכות להיות מיוצג על ידי עורך דין.
      </p>
    </div>
    {/* Red stamp */}
    <div className="absolute bottom-3 left-3 w-12 h-12 rounded-full border-2 border-[#cc2222] flex items-center justify-center rotate-[-12deg] opacity-60">
      <span className="text-[8px] font-black text-[#cc2222] text-center leading-tight">חקירה<br />פלילית</span>
    </div>
  </div>
);

/** Scene 4: Mini timeline — תביעת נזיקין */
const TimelineScene = () => {
  const steps = [
    { time: "יום 1", text: "נזק לרכוש של שכן", color: "#f59e0b" },
    { time: "שבוע 2", text: "מכתב התראה מעו״ד", color: "#f97316" },
    { time: "חודש 3", text: "כתב תביעה — 400,000₪", color: "#ef4444" },
    { time: "חודש 8", text: "פסק דין — אתה משלם", color: "#cc2222" },
  ];
  return (
    <div className="w-full rounded-lg bg-white border border-[#e5e5e5] p-3" dir="rtl">
      <p className="text-[10px] font-bold text-[#999] mb-2 text-center">ציר הזמן של תביעה</p>
      <div className="space-y-0">
        {steps.map((s, i) => (
          <div key={s.time} className="flex items-start gap-2">
            {/* Timeline line + dot */}
            <div className="flex flex-col items-center">
              <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: s.color }} />
              {i < steps.length - 1 && <div className="w-px h-5 bg-[#ddd]" />}
            </div>
            {/* Content */}
            <div className="pb-1.5">
              <span className="text-[9px] font-bold" style={{ color: s.color }}>{s.time}</span>
              <p className="text-[11px] text-[#333]">{s.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/** Scene 5: Phone notifications — הצלת חיים */
const NotificationsScene = () => (
  <div className="w-full space-y-1.5" dir="rtl">
    {/* Notification 1 */}
    <div className="rounded-xl bg-white/90 backdrop-blur border border-[#e5e5e5] px-3 py-2 flex items-center gap-2 shadow-sm">
      <div className="w-7 h-7 rounded-lg bg-[#cc2222] flex items-center justify-center shrink-0">
        <span className="text-white text-[10px] font-black">112</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-bold text-[#1a1a1a] truncate">משטרת ישראל</p>
        <p className="text-[9px] text-[#666] truncate">3 שיחות שלא נענו</p>
      </div>
      <span className="text-[8px] text-[#999]">עכשיו</span>
    </div>
    {/* Notification 2 */}
    <div className="rounded-xl bg-white/90 backdrop-blur border border-[#e5e5e5] px-3 py-2 flex items-center gap-2 shadow-sm">
      <div className="w-7 h-7 rounded-lg bg-[#333] flex items-center justify-center shrink-0">
        <span className="text-white text-[12px]">⚖️</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-bold text-[#1a1a1a] truncate">הודעה מהפרקליטות</p>
        <p className="text-[9px] text-[#666] truncate">נפתחה חקירה בעקבות אירוע הירי...</p>
      </div>
      <span className="text-[8px] text-[#999]">5 דק׳</span>
    </div>
    {/* Notification 3 */}
    <div className="rounded-xl bg-white/90 backdrop-blur border border-[#cc2222]/20 px-3 py-2 flex items-center gap-2 shadow-sm">
      <div className="w-7 h-7 rounded-lg bg-[#cc2222]/10 flex items-center justify-center shrink-0">
        <span className="text-[12px]">🔴</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-bold text-[#cc2222] truncate">זימון לחקירה</p>
        <p className="text-[9px] text-[#666] truncate">עליך להתייצב בתחנת משטרה תוך 24 שעות</p>
      </div>
      <span className="text-[8px] text-[#999]">12 דק׳</span>
    </div>
  </div>
);

export const ScenarioVisual = ({ index }: { index: number }) => {
  const scenes = [NewspaperScene, WhatsAppScene, LegalDocScene, TimelineScene, NotificationsScene];
  const Scene = scenes[index];
  return <Scene />;
};
