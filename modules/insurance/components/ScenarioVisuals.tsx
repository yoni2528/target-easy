"use client";

type SceneProps = { isActive: boolean };

const anim = (isActive: boolean, delay: number) => ({
  opacity: isActive ? 1 : 0,
  transform: isActive ? "translateY(0) scale(1)" : "translateY(12px) scale(0.95)",
  transition: `all 0.5s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
});

/** Scene 1: פליטת כדור — target with bullet + counter to 3M */
const BulletScene = ({ isActive }: SceneProps) => (
  <div className="h-full flex flex-col items-center justify-center gap-4">
    {/* Target rings */}
    <div className="relative w-28 h-28" style={anim(isActive, 0.1)}>
      {[100, 75, 50, 25].map((size, i) => (
        <div key={size} className="absolute rounded-full border-2"
          style={{
            width: `${size}%`, height: `${size}%`,
            top: `${(100 - size) / 2}%`, left: `${(100 - size) / 2}%`,
            borderColor: i === 3 ? "var(--accent-red)" : "color-mix(in srgb, var(--accent-red) 30%, transparent)",
            background: i === 3 ? "var(--accent-red)" : "transparent",
          }} />
      ))}
      {/* Bullet hole */}
      <div className="absolute top-[35%] left-[55%] w-3 h-3 rounded-full bg-[var(--text-primary)]"
        style={{ opacity: isActive ? 1 : 0, transform: isActive ? "scale(1)" : "scale(3)", transition: "all 0.3s ease 0.6s" }} />
    </div>
    {/* Amount */}
    <div className="text-center" style={anim(isActive, 0.5)}>
      <span className="text-4xl font-black text-[var(--accent-red)]">3,000,000₪</span>
      <p className="text-xs text-[var(--text-muted)] mt-1">תביעת נזיקין</p>
    </div>
  </div>
);

/** Scene 2: עצירת פיגוע כמו שצריך — shield with V that flips to envelope */
const HeroRightScene = ({ isActive }: SceneProps) => (
  <div className="h-full flex flex-col items-center justify-center gap-4">
    <div className="relative" style={anim(isActive, 0.1)}>
      {/* Shield */}
      <div className="w-24 h-28 flex items-center justify-center rounded-t-3xl relative"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 60%, 50% 100%, 0 60%)", background: "color-mix(in srgb, var(--accent-blue) 15%, transparent)" }}>
        <span className="text-3xl" style={{ opacity: isActive ? 1 : 0, transition: "opacity 0.3s ease 0.4s" }}>✓</span>
      </div>
    </div>
    {/* Arrow down to lawsuit */}
    <div className="flex flex-col items-center gap-2" style={anim(isActive, 0.5)}>
      <span className="text-lg text-[var(--text-muted)]">↓</span>
      <div className="px-4 py-2 rounded-lg border border-[var(--accent-red)]/30 bg-[var(--accent-red)]/5">
        <span className="text-sm font-bold text-[var(--accent-red)]">תביעה אזרחית</span>
      </div>
    </div>
    <div className="text-center" style={anim(isActive, 0.7)}>
      <span className="text-3xl font-black text-[var(--accent-red)]">65,000₪+</span>
    </div>
  </div>
);

/** Scene 3: עצירת פיגוע לא כמו שצריך — shield with X, splits to two docs */
const HeroWrongScene = ({ isActive }: SceneProps) => (
  <div className="h-full flex flex-col items-center justify-center gap-4">
    <div className="relative" style={anim(isActive, 0.1)}>
      <div className="w-24 h-28 flex items-center justify-center rounded-t-3xl relative"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 60%, 50% 100%, 0 60%)", background: "color-mix(in srgb, var(--accent-red) 15%, transparent)" }}>
        <span className="text-3xl text-[var(--accent-red)]" style={{ opacity: isActive ? 1 : 0, transition: "opacity 0.3s ease 0.4s" }}>✗</span>
      </div>
    </div>
    <span className="text-lg text-[var(--text-muted)]" style={anim(isActive, 0.4)}>↓</span>
    {/* Two branches */}
    <div className="flex gap-3" style={anim(isActive, 0.55)}>
      <div className="px-3 py-2 rounded-lg border border-[var(--accent-red)]/30 bg-[var(--accent-red)]/5">
        <span className="text-xs font-bold text-[var(--accent-red)]">תביעה אזרחית</span>
      </div>
      <div className="px-3 py-2 rounded-lg border border-[var(--accent-red)]/30 bg-[var(--accent-red)]/5">
        <span className="text-xs font-bold text-[var(--accent-red)]">חקירה פלילית</span>
      </div>
    </div>
    <div className="text-center" style={anim(isActive, 0.75)}>
      <span className="text-3xl font-black text-[var(--accent-red)]">50,000₪+</span>
    </div>
  </div>
);

/** Scene 4: גניבת נשק — safe opens, empty, criminal file appears */
const TheftScene = ({ isActive }: SceneProps) => (
  <div className="h-full flex flex-col items-center justify-center gap-4">
    {/* Safe */}
    <div className="relative w-24 h-24 rounded-xl border-2 border-[var(--text-muted)]/30 flex items-center justify-center"
      style={anim(isActive, 0.1)}>
      {/* Door */}
      <div className="absolute inset-1 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center justify-center"
        style={{ transformOrigin: "right", transform: isActive ? "rotateY(-60deg)" : "rotateY(0)", transition: "transform 0.6s ease 0.3s" }}>
        <div className="w-4 h-4 rounded-full border-2 border-[var(--text-muted)]/40" />
      </div>
      {/* Empty inside */}
      <span className="text-2xl" style={{ opacity: isActive ? 1 : 0, transition: "opacity 0.3s ease 0.7s" }}>∅</span>
    </div>
    {/* Criminal file */}
    <div className="flex flex-col items-center gap-2" style={anim(isActive, 0.6)}>
      <div className="px-4 py-2 rounded-lg border border-[var(--accent-red)]/30 bg-[var(--accent-red)]/5">
        <span className="text-sm font-bold text-[var(--accent-red)]">תיק פלילי נפתח</span>
      </div>
      <span className="text-xs text-[var(--text-muted)]">+ הפסדת את האקדח</span>
    </div>
  </div>
);

/** Scene 5: תביעת נזיקין — envelope opens, letter comes out, amount grows */
const LawsuitScene = ({ isActive }: SceneProps) => (
  <div className="h-full flex flex-col items-center justify-center gap-4">
    {/* Envelope */}
    <div className="relative w-28 h-20" style={anim(isActive, 0.1)}>
      {/* Envelope body */}
      <div className="absolute bottom-0 w-full h-14 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-default)]" />
      {/* Flap */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[90%] h-8 bg-[var(--bg-elevated)] border border-[var(--border-default)]"
        style={{ clipPath: "polygon(0 100%, 50% 0, 100% 100%)", transformOrigin: "bottom", transform: isActive ? "rotateX(180deg)" : "rotateX(0)", transition: "transform 0.5s ease 0.3s" }} />
      {/* Letter coming out */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-[70%] h-10 rounded bg-white border border-[var(--border-subtle)] flex items-center justify-center"
        style={{ transform: isActive ? "translateY(-20px)" : "translateY(12px)", opacity: isActive ? 1 : 0, transition: "all 0.5s ease 0.5s" }}>
        <span className="text-[9px] font-bold text-[var(--accent-red)]">כתב תביעה</span>
      </div>
    </div>
    {/* Amount escalation */}
    <div className="flex flex-col items-center gap-1" style={anim(isActive, 0.6)}>
      <span className="text-lg text-[var(--text-muted)] line-through">15,000₪</span>
      <span className="text-3xl font-black text-[var(--accent-red)]">65,000–100,000₪</span>
      <span className="text-xs text-[var(--text-muted)]">רק כתב הגנה. לפני המשפט.</span>
    </div>
  </div>
);

const scenes = [BulletScene, HeroRightScene, HeroWrongScene, TheftScene, LawsuitScene];

export const ScenarioVisual = ({ index, isActive }: { index: number; isActive: boolean }) => {
  const Scene = scenes[index];
  return <Scene isActive={isActive} />;
};
