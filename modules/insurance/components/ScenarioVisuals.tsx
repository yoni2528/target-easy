import { Crosshair, CarFront, Gavel, Building2, Heart, AlertTriangle, Search, FileWarning } from "lucide-react";

/** Scene 1: Target with bullet impact */
const ShootingScene = ({ isActive }: { isActive: boolean }) => (
  <div className="relative w-36 h-36 flex items-center justify-center">
    {/* Target rings */}
    <div className="absolute inset-0 rounded-full border-[3px] border-[var(--accent-red)]/20" />
    <div className="absolute inset-4 rounded-full border-[3px] border-[var(--accent-red)]/30" />
    <div className="absolute inset-8 rounded-full border-[3px] border-[var(--accent-red)]/40" />
    <div className="absolute inset-12 rounded-full bg-[var(--accent-red)]/15" />
    {/* Crosshair lines */}
    <div className="absolute top-0 left-1/2 -translate-x-px w-0.5 h-full bg-[var(--accent-red)]/15" />
    <div className="absolute top-1/2 left-0 -translate-y-px w-full h-0.5 bg-[var(--accent-red)]/15" />
    {/* Bullet impact */}
    <div className="absolute inset-[38%] rounded-full bg-[var(--accent-red)]/60" style={{
      animation: isActive ? "alert-ping 2s ease-out infinite" : "none",
    }} />
    <div className="absolute inset-[42%] rounded-full bg-[var(--accent-red)]" />
    {/* Icon */}
    <Crosshair className="w-6 h-6 text-white relative z-10" strokeWidth={2} />
  </div>
);

/** Scene 2: Car with broken shield */
const TheftScene = ({ isActive }: { isActive: boolean }) => (
  <div className="relative w-36 h-36 flex items-center justify-center">
    {/* Car silhouette */}
    <div className="absolute bottom-6 w-24 h-12 rounded-lg bg-[var(--accent-red)]/10 border border-[var(--accent-red)]/20" />
    <div className="absolute bottom-12 w-16 h-8 rounded-t-lg bg-[var(--accent-red)]/8 border border-b-0 border-[var(--accent-red)]/15" />
    {/* Wheels */}
    <div className="absolute bottom-4 left-7 w-5 h-5 rounded-full bg-[var(--accent-red)]/25 border border-[var(--accent-red)]/30" />
    <div className="absolute bottom-4 right-7 w-5 h-5 rounded-full bg-[var(--accent-red)]/25 border border-[var(--accent-red)]/30" />
    {/* Alert badge */}
    <div className="absolute top-3 right-3" style={{
      animation: isActive ? "float-up 2s ease-in-out infinite" : "none",
    }}>
      <div className="w-10 h-10 rounded-full bg-[var(--accent-red)]/20 flex items-center justify-center">
        <AlertTriangle className="w-5 h-5 text-[var(--accent-red)]" strokeWidth={2} />
      </div>
    </div>
    {/* Car icon */}
    <CarFront className="w-8 h-8 text-[var(--accent-red)] relative z-10 mb-2" strokeWidth={1.5} />
  </div>
);

/** Scene 3: Gavel with dramatic shadow */
const CriminalScene = ({ isActive }: { isActive: boolean }) => (
  <div className="relative w-36 h-36 flex items-center justify-center">
    {/* Dramatic radial glow */}
    <div className="absolute inset-4 rounded-full bg-gradient-radial from-[var(--accent-red)]/15 to-transparent" />
    {/* Scale/balance lines */}
    <div className="absolute top-8 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-[var(--accent-red)]/20" />
    <div className="absolute top-8 left-5 w-0.5 h-6 bg-[var(--accent-red)]/15" />
    <div className="absolute top-8 right-5 w-0.5 h-6 bg-[var(--accent-red)]/15" />
    {/* Gavel base */}
    <div className="absolute bottom-6 w-20 h-1.5 rounded-full bg-[var(--accent-red)]/25" />
    <div className="absolute bottom-7 left-1/2 -translate-x-1/2 w-1.5 h-8 bg-[var(--accent-red)]/20" />
    {/* Gavel head */}
    <div className="relative" style={{
      animation: isActive ? "shake 0.5s ease-in-out 0.5s" : "none",
    }}>
      <Gavel className="w-12 h-12 text-[var(--accent-red)]" strokeWidth={1.5} />
    </div>
    {/* Impact ripple */}
    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-8 h-2 rounded-full bg-[var(--accent-red)]/20" style={{
      animation: isActive ? "alert-ping 2s ease-out 0.8s infinite" : "none",
    }} />
  </div>
);

/** Scene 4: Building with money stack */
const LawsuitScene = ({ isActive }: { isActive: boolean }) => (
  <div className="relative w-36 h-36 flex items-center justify-center">
    {/* Building */}
    <div className="absolute bottom-5 left-6 w-10 h-16 rounded-t-md bg-[var(--accent-red)]/8 border border-[var(--accent-red)]/15">
      <div className="grid grid-cols-2 gap-0.5 p-1 mt-1">
        {[...Array(6)].map((_, j) => (
          <div key={j} className="w-full h-1.5 rounded-sm bg-[var(--accent-red)]/15" />
        ))}
      </div>
    </div>
    {/* Stacked documents */}
    <div className="absolute bottom-5 right-4" style={{
      animation: isActive ? "float-up 3s ease-in-out infinite" : "none",
    }}>
      <div className="relative">
        <FileWarning className="w-10 h-10 text-[var(--accent-red)]/70" strokeWidth={1.5} />
        <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[var(--accent-red)] text-white text-[8px] font-black flex items-center justify-center">₪</span>
      </div>
    </div>
    {/* Main icon */}
    <Building2 className="w-10 h-10 text-[var(--accent-red)] relative z-10" strokeWidth={1.5} />
  </div>
);

/** Scene 5: Heart with shield + investigation */
const HeroScene = ({ isActive }: { isActive: boolean }) => (
  <div className="relative w-36 h-36 flex items-center justify-center">
    {/* Heartbeat line */}
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 144 144">
      <polyline
        points="10,72 35,72 45,50 55,95 65,40 75,100 85,72 134,72"
        fill="none"
        stroke="var(--accent-red)"
        strokeWidth="1.5"
        strokeOpacity="0.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="200"
        strokeDashoffset={isActive ? "0" : "200"}
        style={{ transition: "stroke-dashoffset 2s ease" }}
      />
    </svg>
    {/* Shield outline */}
    <div className="absolute inset-6 rounded-b-[40%] border-2 border-[var(--accent-red)]/15 rounded-t-lg" />
    {/* Heart */}
    <Heart className="w-12 h-12 text-[var(--accent-red)] relative z-10" strokeWidth={1.5} style={{
      animation: isActive ? "pulse 1.5s ease-in-out infinite" : "none",
    }} />
    {/* Search/investigation icon */}
    <div className="absolute bottom-3 right-3" style={{
      animation: isActive ? "float-up 2.5s ease-in-out infinite" : "none",
    }}>
      <Search className="w-6 h-6 text-[var(--accent-red)]/50" strokeWidth={2} />
    </div>
  </div>
);

export const ScenarioVisual = ({ index, isActive }: { index: number; isActive: boolean }) => {
  const scenes = [ShootingScene, TheftScene, CriminalScene, LawsuitScene, HeroScene];
  const Scene = scenes[index];
  return <Scene isActive={isActive} />;
};
