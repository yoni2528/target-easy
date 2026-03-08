"use client";

type SceneProps = { isActive: boolean };

const anim = (isActive: boolean, delay: number) => ({
  opacity: isActive ? 1 : 0,
  transform: isActive ? "translateY(0) scale(1)" : "translateY(12px) scale(0.95)",
  transition: `all 0.5s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
});

const anim3d = (isActive: boolean, delay: number) => ({
  opacity: isActive ? 1 : 0,
  transform: isActive ? "translateZ(0) rotateX(0)" : "translateZ(-30px) rotateX(8deg)",
  transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
});

/** Scene 1: פליטת כדור — 3D target + 3M amount */
const BulletScene = ({ isActive }: SceneProps) => (
  <div className="h-full flex flex-col items-center justify-center gap-5 p-6" style={{ perspective: "600px" }}>
    <div className="relative w-32 h-32" style={anim3d(isActive, 0.1)}>
      {[100, 72, 48, 24].map((size, i) => (
        <div key={size} className="absolute rounded-full"
          style={{
            width: `${size}%`, height: `${size}%`,
            top: `${(100 - size) / 2}%`, left: `${(100 - size) / 2}%`,
            border: `2px solid ${i === 3 ? "var(--accent-red)" : `color-mix(in srgb, var(--accent-red) ${30 + i * 10}%, transparent)`}`,
            background: i === 3 ? "var(--accent-red)" : "transparent",
            boxShadow: i === 0 ? "0 8px 20px -5px rgba(0,0,0,0.08)" : "none",
          }} />
      ))}
      <div className="absolute top-[32%] left-[55%] w-3.5 h-3.5 rounded-full bg-[#37374e]"
        style={{ opacity: isActive ? 1 : 0, transform: isActive ? "scale(1)" : "scale(3)", transition: "all 0.3s ease 0.6s",
          boxShadow: "0 0 12px 4px rgba(0,0,0,0.15)" }} />
    </div>
    <div className="text-center" style={anim3d(isActive, 0.5)}>
      <span className="text-4xl font-black text-[var(--accent-red)]">3,000,000₪</span>
      <p className="text-xs text-[#a0a0b0] mt-1">תביעת נזיקין</p>
    </div>
  </div>
);

/** Scene 2: עצירת פיגוע כמו שצריך — 3D shield → lawsuit */
const HeroRightScene = ({ isActive }: SceneProps) => (
  <div className="h-full flex flex-col items-center justify-center gap-4 p-6" style={{ perspective: "600px" }}>
    <div style={anim3d(isActive, 0.1)}>
      <div className="w-24 h-28 flex items-center justify-center rounded-t-3xl"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 60%, 50% 100%, 0 60%)", background: "color-mix(in srgb, var(--accent-blue) 12%, white)",
          boxShadow: "0 10px 25px -5px rgba(0,0,0,0.08)" }}>
        <span className="text-3xl text-green-500" style={{ opacity: isActive ? 1 : 0, transition: "opacity 0.3s ease 0.4s" }}>✓</span>
      </div>
    </div>
    <div className="flex flex-col items-center gap-2" style={anim3d(isActive, 0.5)}>
      <span className="text-lg text-[#a0a0b0]">↓</span>
      <div className="px-5 py-2.5" style={{ borderRadius: "16px", background: "color-mix(in srgb, var(--accent-red) 6%, white)", border: "1px solid color-mix(in srgb, var(--accent-red) 20%, transparent)" }}>
        <span className="text-sm font-bold text-[var(--accent-red)]">תביעה אזרחית</span>
      </div>
    </div>
    <div className="text-center" style={anim3d(isActive, 0.7)}>
      <span className="text-3xl font-black text-[var(--accent-red)]">65,000₪+</span>
    </div>
  </div>
);

/** Scene 3: עצירת פיגוע לא כמו שצריך — 3D shield X → two branches */
const HeroWrongScene = ({ isActive }: SceneProps) => (
  <div className="h-full flex flex-col items-center justify-center gap-3 p-6" style={{ perspective: "600px" }}>
    <div style={anim3d(isActive, 0.1)}>
      <div className="w-24 h-28 flex items-center justify-center rounded-t-3xl"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 60%, 50% 100%, 0 60%)", background: "color-mix(in srgb, var(--accent-red) 10%, white)",
          boxShadow: "0 10px 25px -5px rgba(0,0,0,0.08)" }}>
        <span className="text-3xl text-[var(--accent-red)]" style={{ opacity: isActive ? 1 : 0, transition: "opacity 0.3s ease 0.4s" }}>✗</span>
      </div>
    </div>
    <span className="text-lg text-[#a0a0b0]" style={anim(isActive, 0.4)}>↓</span>
    <div className="flex gap-3" style={anim3d(isActive, 0.55)}>
      {["תביעה אזרחית", "חקירה פלילית"].map((t) => (
        <div key={t} className="px-3 py-2" style={{ borderRadius: "14px", background: "color-mix(in srgb, var(--accent-red) 6%, white)", border: "1px solid color-mix(in srgb, var(--accent-red) 20%, transparent)" }}>
          <span className="text-xs font-bold text-[var(--accent-red)]">{t}</span>
        </div>
      ))}
    </div>
    <div className="text-center" style={anim3d(isActive, 0.75)}>
      <span className="text-3xl font-black text-[var(--accent-red)]">50,000₪+</span>
    </div>
  </div>
);

/** Scene 4: גניבת נשק — 3D safe opens */
const TheftScene = ({ isActive }: SceneProps) => (
  <div className="h-full flex flex-col items-center justify-center gap-4 p-6" style={{ perspective: "600px" }}>
    <div className="relative w-28 h-28 flex items-center justify-center"
      style={{ ...anim3d(isActive, 0.1), borderRadius: "20px", background: "#f0f2f5", border: "2px solid #dde0e6",
        boxShadow: "0 15px 30px -8px rgba(0,0,0,0.1)" }}>
      <div className="absolute inset-2 flex items-center justify-center"
        style={{ borderRadius: "14px", background: "white", border: "1px solid #e8edf5",
          transformOrigin: "right", transform: isActive ? "rotateY(-70deg)" : "rotateY(0)", transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s" }}>
        <div className="w-5 h-5 rounded-full border-2 border-[#c0c4cc]" />
      </div>
      <span className="text-2xl text-[#a0a0b0]" style={{ opacity: isActive ? 1 : 0, transition: "opacity 0.3s ease 0.8s" }}>∅</span>
    </div>
    <div className="flex flex-col items-center gap-2" style={anim3d(isActive, 0.6)}>
      <div className="px-5 py-2.5" style={{ borderRadius: "16px", background: "color-mix(in srgb, var(--accent-red) 6%, white)", border: "1px solid color-mix(in srgb, var(--accent-red) 20%, transparent)" }}>
        <span className="text-sm font-bold text-[var(--accent-red)]">תיק פלילי נפתח</span>
      </div>
      <span className="text-xs text-[#a0a0b0]">+ הפסדת את האקדח</span>
    </div>
  </div>
);

/** Scene 5: תביעת נזיקין — 3D envelope + escalation */
const LawsuitScene = ({ isActive }: SceneProps) => (
  <div className="h-full flex flex-col items-center justify-center gap-4 p-6" style={{ perspective: "600px" }}>
    <div className="relative w-32 h-24" style={anim3d(isActive, 0.1)}>
      <div className="absolute bottom-0 w-full h-16"
        style={{ borderRadius: "12px", background: "white", border: "1px solid #dde0e6", boxShadow: "0 8px 20px -5px rgba(0,0,0,0.08)" }} />
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[88%] h-9"
        style={{ background: "white", border: "1px solid #dde0e6", clipPath: "polygon(0 100%, 50% 0, 100% 100%)",
          transformOrigin: "bottom", transform: isActive ? "rotateX(180deg)" : "rotateX(0)", transition: "transform 0.5s ease 0.3s" }} />
      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-[68%] h-11 flex items-center justify-center"
        style={{ borderRadius: "8px", background: "white", border: "1px solid #e8edf5",
          transform: isActive ? "translateY(-22px)" : "translateY(14px)", opacity: isActive ? 1 : 0, transition: "all 0.5s ease 0.5s",
          boxShadow: "0 4px 12px -3px rgba(0,0,0,0.06)" }}>
        <span className="text-[9px] font-bold text-[var(--accent-red)]">כתב תביעה</span>
      </div>
    </div>
    <div className="flex flex-col items-center gap-1" style={anim3d(isActive, 0.6)}>
      <span className="text-lg text-[#c0c4cc] line-through">15,000₪</span>
      <span className="text-3xl font-black text-[var(--accent-red)]">65,000–100,000₪</span>
      <span className="text-xs text-[#a0a0b0]">רק כתב הגנה. לפני המשפט.</span>
    </div>
  </div>
);

const scenes = [BulletScene, HeroRightScene, HeroWrongScene, TheftScene, LawsuitScene];

export const ScenarioVisual = ({ index, isActive }: { index: number; isActive: boolean }) => {
  const Scene = scenes[index];
  return <Scene isActive={isActive} />;
};
