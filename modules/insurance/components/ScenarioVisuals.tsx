"use client";

type P = { isActive: boolean };
const f = (a: boolean, d: number) => ({
  opacity: a ? 1 : 0, transform: a ? "translateY(0)" : "translateY(8px)", transition: `all 0.5s ease ${d}s`,
});

/** 1: פליטת כדור */
const BulletScene = ({ isActive: a }: P) => (
  <svg viewBox="0 0 320 280" className="w-full max-w-[280px]" fill="none">
    <g style={f(a, 0.1)}>
      <circle cx="40" cy="60" r="8" fill="var(--accent-red)" opacity={0.8} />
      <line x1="52" y1="60" x2="140" y2="60" stroke="var(--accent-red)" strokeWidth="2" strokeDasharray="6 4" />
    </g>
    <g style={f(a, 0.3)}>
      <circle cx="170" cy="50" r="14" fill="#37374e" opacity={0.12} />
      <rect x="160" y="66" width="20" height="30" rx="5" fill="#37374e" opacity={0.12} />
      <text x="170" y="115" textAnchor="middle" fontSize="10" fill="#6b6b80">צד שלישי נפגע</text>
    </g>
    <g style={f(a, 0.5)}>
      <line x1="170" y1="128" x2="170" y2="158" stroke="var(--accent-red)" strokeWidth="1.5" strokeDasharray="4 3" />
      <polygon points="165,155 170,165 175,155" fill="var(--accent-red)" />
    </g>
    <g style={f(a, 0.7)}>
      <rect x="100" y="172" width="140" height="44" rx="12" fill="var(--accent-red)" opacity={0.08} stroke="var(--accent-red)" strokeWidth="1.5" />
      <text x="170" y="190" textAnchor="middle" fontSize="10" fill="#6b6b80">תביעת נזיקין</text>
      <text x="170" y="207" textAnchor="middle" fontSize="16" fontWeight="900" fill="var(--accent-red)">₪3,000,000</text>
    </g>
    <g style={f(a, 0.2)}>
      <rect x="16" y="78" width="48" height="22" rx="8" fill="#37374e" opacity={0.06} />
      <text x="40" y="93" textAnchor="middle" fontSize="10" fill="#6b6b80">אתה</text>
    </g>
  </svg>
);

/** 2: הסנגוריה הציבורית */
const DefenderScene = ({ isActive: a }: P) => (
  <svg viewBox="0 0 320 280" className="w-full max-w-[280px]" fill="none">
    <g style={f(a, 0.1)}>
      <rect x="110" y="25" width="100" height="60" rx="4" fill="#37374e" opacity={0.08} stroke="#37374e" strokeWidth="1" />
      <rect x="140" y="35" width="40" height="25" rx="2" fill="white" stroke="#37374e" strokeWidth="1" />
      <rect x="120" y="25" width="8" height="60" rx="2" fill="#37374e" opacity={0.12} />
      <rect x="192" y="25" width="8" height="60" rx="2" fill="#37374e" opacity={0.12} />
      <text x="160" y="105" textAnchor="middle" fontSize="10" fill="#6b6b80">סנגור ציבורי</text>
    </g>
    <g style={f(a, 0.35)}>
      <line x1="160" y1="115" x2="160" y2="145" stroke="var(--accent-red)" strokeWidth="1.5" strokeDasharray="4 3" />
      <polygon points="155,142 160,152 165,142" fill="var(--accent-red)" />
    </g>
    <g style={f(a, 0.55)}>
      <circle cx="160" cy="185" r="28" fill="var(--accent-red)" opacity={0.08} stroke="var(--accent-red)" strokeWidth="1.5" />
      <line x1="148" y1="173" x2="172" y2="197" stroke="var(--accent-red)" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="172" y1="173" x2="148" y2="197" stroke="var(--accent-red)" strokeWidth="2.5" strokeLinecap="round" />
    </g>
    <g style={f(a, 0.7)}>
      <text x="160" y="232" textAnchor="middle" fontSize="10" fill="#6b6b80">לא מומחה לנשק</text>
      <text x="160" y="248" textAnchor="middle" fontSize="10" fill="#a0a0b0">לא זמין 24/7</text>
    </g>
  </svg>
);

/** 3: עצירת פיגוע נכונה */
const HeroRightScene = ({ isActive: a }: P) => (
  <svg viewBox="0 0 320 280" className="w-full max-w-[280px]" fill="none">
    <g style={f(a, 0.1)}>
      <path d="M160 30 L200 50 L200 90 Q200 120 160 140 Q120 120 120 90 L120 50 Z"
        fill="var(--accent-blue)" opacity={0.08} stroke="var(--accent-blue)" strokeWidth="1.5" />
      <text x="160" y="95" textAnchor="middle" fontSize="28" fill="#22c55e">✓</text>
      <text x="160" y="160" textAnchor="middle" fontSize="10" fill="#6b6b80">פעלת נכון</text>
    </g>
    <g style={f(a, 0.4)}>
      <line x1="160" y1="168" x2="160" y2="190" stroke="var(--accent-red)" strokeWidth="1.5" strokeDasharray="4 3" />
      <polygon points="155,187 160,197 165,187" fill="var(--accent-red)" />
    </g>
    <g style={f(a, 0.6)}>
      <rect x="90" y="200" width="140" height="50" rx="12" fill="var(--accent-red)" opacity={0.08} stroke="var(--accent-red)" strokeWidth="1.5" />
      <text x="160" y="220" textAnchor="middle" fontSize="10" fill="#6b6b80">עדיין חשוף לתביעה אזרחית</text>
      <text x="160" y="240" textAnchor="middle" fontSize="15" fontWeight="900" fill="var(--accent-red)">₪65,000+</text>
    </g>
  </svg>
);

/** 4: עצירת פיגוע שגויה */
const HeroWrongScene = ({ isActive: a }: P) => (
  <svg viewBox="0 0 320 280" className="w-full max-w-[280px]" fill="none">
    <g style={f(a, 0.1)}>
      <path d="M160 25 L200 45 L200 85 Q200 115 160 135 Q120 115 120 85 L120 45 Z"
        fill="var(--accent-red)" opacity={0.08} stroke="var(--accent-red)" strokeWidth="1.5" />
      <text x="160" y="90" textAnchor="middle" fontSize="28" fill="var(--accent-red)">✗</text>
    </g>
    <g style={f(a, 0.4)}>
      <line x1="160" y1="140" x2="100" y2="175" stroke="var(--accent-red)" strokeWidth="1.5" strokeDasharray="4 3" />
      <line x1="160" y1="140" x2="220" y2="175" stroke="var(--accent-red)" strokeWidth="1.5" strokeDasharray="4 3" />
    </g>
    <g style={f(a, 0.6)}>
      <rect x="45" y="180" width="110" height="32" rx="10" fill="var(--accent-red)" opacity={0.08} stroke="var(--accent-red)" strokeWidth="1.2" />
      <text x="100" y="200" textAnchor="middle" fontSize="10" fontWeight="bold" fill="var(--accent-red)">תביעה אזרחית</text>
    </g>
    <g style={f(a, 0.7)}>
      <rect x="165" y="180" width="110" height="32" rx="10" fill="var(--accent-red)" opacity={0.08} stroke="var(--accent-red)" strokeWidth="1.2" />
      <text x="220" y="200" textAnchor="middle" fontSize="10" fontWeight="bold" fill="var(--accent-red)">חקירה פלילית</text>
    </g>
    <g style={f(a, 0.85)}>
      <text x="160" y="245" textAnchor="middle" fontSize="15" fontWeight="900" fill="var(--accent-red)">₪50,000+</text>
      <text x="160" y="262" textAnchor="middle" fontSize="10" fill="#a0a0b0">ועד מיליונים</text>
    </g>
  </svg>
);

/** 5: גניבת נשק */
const TheftScene = ({ isActive: a }: P) => (
  <svg viewBox="0 0 320 280" className="w-full max-w-[280px]" fill="none">
    <g style={f(a, 0.1)}>
      <rect x="120" y="20" width="80" height="70" rx="8" fill="#f0f2f5" stroke="#dde0e6" strokeWidth="2" />
      <circle cx="160" cy="55" r="10" fill="none" stroke="#c0c4cc" strokeWidth="2" />
      <rect x="140" y="50" width="12" height="4" rx="2" fill="#c0c4cc" />
      <text x="160" y="108" textAnchor="middle" fontSize="10" fill="#6b6b80">הנשק נגנב</text>
    </g>
    <g style={f(a, 0.35)}>
      <line x1="160" y1="115" x2="160" y2="140" stroke="var(--accent-red)" strokeWidth="1.5" strokeDasharray="4 3" />
      <polygon points="155,137 160,147 165,137" fill="var(--accent-red)" />
    </g>
    <g style={f(a, 0.5)}>
      <rect x="100" y="150" width="120" height="32" rx="10" fill="#37374e" opacity={0.06} stroke="#37374e" strokeWidth="1" />
      <text x="160" y="170" textAnchor="middle" fontSize="10" fill="#6b6b80">שוטר מגיע לחקירה</text>
    </g>
    <g style={f(a, 0.65)}>
      <line x1="160" y1="186" x2="160" y2="210" stroke="var(--accent-red)" strokeWidth="1.5" strokeDasharray="4 3" />
      <polygon points="155,207 160,217 165,207" fill="var(--accent-red)" />
    </g>
    <g style={f(a, 0.8)}>
      <rect x="85" y="220" width="150" height="40" rx="12" fill="var(--accent-red)" opacity={0.08} stroke="var(--accent-red)" strokeWidth="1.5" />
      <text x="160" y="237" textAnchor="middle" fontSize="10" fill="#6b6b80">תיק פלילי נפתח</text>
      <text x="160" y="254" textAnchor="middle" fontSize="10" fontWeight="bold" fill="var(--accent-red)">+ הפסדת את האקדח</text>
    </g>
  </svg>
);

/** 6: תביעת נזיקין */
const LawsuitScene = ({ isActive: a }: P) => (
  <svg viewBox="0 0 320 280" className="w-full max-w-[280px]" fill="none">
    <g style={f(a, 0.1)}>
      <rect x="110" y="20" width="100" height="50" rx="6" fill="#37374e" opacity={0.06} stroke="#37374e" strokeWidth="1" />
      <text x="160" y="50" textAnchor="middle" fontSize="10" fill="#6b6b80">נזק לרכוש צד ג׳</text>
    </g>
    <g style={f(a, 0.3)}>
      <line x1="160" y1="74" x2="160" y2="100" stroke="var(--accent-red)" strokeWidth="1.5" strokeDasharray="4 3" />
      <polygon points="155,97 160,107 165,97" fill="var(--accent-red)" />
    </g>
    <g style={f(a, 0.45)}>
      <rect x="115" y="110" width="90" height="50" rx="6" fill="white" stroke="var(--accent-red)" strokeWidth="1.5" />
      <line x1="128" y1="124" x2="192" y2="124" stroke="#e8edf5" strokeWidth="2" />
      <line x1="128" y1="133" x2="180" y2="133" stroke="#e8edf5" strokeWidth="2" />
      <line x1="128" y1="142" x2="186" y2="142" stroke="#e8edf5" strokeWidth="2" />
      <text x="160" y="170" textAnchor="middle" fontSize="9" fill="#a0a0b0">כתב תביעה</text>
    </g>
    <g style={f(a, 0.65)}>
      <line x1="160" y1="175" x2="160" y2="198" stroke="var(--accent-red)" strokeWidth="1.5" strokeDasharray="4 3" />
      <polygon points="155,195 160,205 165,195" fill="var(--accent-red)" />
    </g>
    <g style={f(a, 0.8)}>
      <rect x="70" y="208" width="180" height="50" rx="12" fill="var(--accent-red)" opacity={0.08} stroke="var(--accent-red)" strokeWidth="1.5" />
      <text x="160" y="228" textAnchor="middle" fontSize="10" fill="#6b6b80">רק כתב הגנה</text>
      <text x="160" y="248" textAnchor="middle" fontSize="16" fontWeight="900" fill="var(--accent-red)">₪65,000–100,000</text>
    </g>
  </svg>
);

const scenes = [BulletScene, DefenderScene, HeroRightScene, HeroWrongScene, TheftScene, LawsuitScene];

export const ScenarioVisual = ({ index, isActive }: { index: number; isActive: boolean }) => {
  const Scene = scenes[index];
  return (
    <div className="h-full flex items-center justify-center p-4">
      <Scene isActive={isActive} />
    </div>
  );
};
