"use client";

/** SVG diagram for each pain step shown in the sticky card */
export const PainDiagram = ({ step }: { step: number }) => {
  if (step === 0) return <ShootingDiagram />;
  if (step === 1) return <PublicDefenderDiagram />;
  if (step === 2) return <DefenseBriefDiagram />;
  return <LawsuitDiagram />;
};

/** Step 1: Shooting event → immediate testimony */
const ShootingDiagram = () => (
  <svg viewBox="0 0 220 200" className="w-full max-w-[200px]" fill="none">
    {/* Person silhouette */}
    <circle cx="110" cy="40" r="18" fill="#37374e" opacity={0.15} />
    <rect x="98" y="60" width="24" height="40" rx="6" fill="#37374e" opacity={0.15} />
    {/* Arrow down */}
    <line x1="110" y1="108" x2="110" y2="140" stroke="var(--accent-red)" strokeWidth="2" strokeDasharray="4 3" />
    <polygon points="104,136 110,148 116,136" fill="var(--accent-red)" />
    {/* Document */}
    <rect x="82" y="152" width="56" height="36" rx="6" fill="var(--accent-red)" opacity={0.1} stroke="var(--accent-red)" strokeWidth="1.5" />
    <text x="110" y="173" textAnchor="middle" fontSize="11" fontWeight="bold" fill="var(--accent-red)">עדות</text>
  </svg>
);

/** Step 2: Public defender = government employee */
const PublicDefenderDiagram = () => (
  <svg viewBox="0 0 220 200" className="w-full max-w-[200px]" fill="none">
    {/* Building (government) */}
    <rect x="70" y="30" width="80" height="60" rx="4" fill="#37374e" opacity={0.08} stroke="#37374e" strokeWidth="1" />
    <rect x="95" y="40" width="30" height="20" rx="2" fill="white" stroke="#37374e" strokeWidth="1" />
    {/* Columns */}
    <rect x="80" y="30" width="6" height="60" rx="2" fill="#37374e" opacity={0.12} />
    <rect x="134" y="30" width="6" height="60" rx="2" fill="#37374e" opacity={0.12} />
    {/* Arrow down */}
    <line x1="110" y1="98" x2="110" y2="130" stroke="var(--accent-red)" strokeWidth="2" strokeDasharray="4 3" />
    <polygon points="104,126 110,138 116,126" fill="var(--accent-red)" />
    {/* X mark */}
    <circle cx="110" cy="162" r="22" fill="var(--accent-red)" opacity={0.1} stroke="var(--accent-red)" strokeWidth="1.5" />
    <line x1="100" y1="152" x2="120" y2="172" stroke="var(--accent-red)" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="120" y1="152" x2="100" y2="172" stroke="var(--accent-red)" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

/** Step 3: Defense brief = 65-100K */
const DefenseBriefDiagram = () => (
  <svg viewBox="0 0 220 200" className="w-full max-w-[200px]" fill="none">
    {/* Stack of papers */}
    <rect x="74" y="28" width="72" height="50" rx="4" fill="#e8edf5" stroke="#dde0e6" strokeWidth="1" transform="rotate(-3 110 53)" />
    <rect x="72" y="24" width="72" height="50" rx="4" fill="#f0f2f5" stroke="#dde0e6" strokeWidth="1" transform="rotate(2 110 49)" />
    <rect x="70" y="20" width="72" height="50" rx="4" fill="white" stroke="var(--accent-red)" strokeWidth="1.5" />
    {/* Lines on paper */}
    <line x1="82" y1="34" x2="130" y2="34" stroke="#dde0e6" strokeWidth="2" />
    <line x1="82" y1="42" x2="122" y2="42" stroke="#dde0e6" strokeWidth="2" />
    <line x1="82" y1="50" x2="126" y2="50" stroke="#dde0e6" strokeWidth="2" />
    <line x1="82" y1="58" x2="110" y2="58" stroke="#dde0e6" strokeWidth="2" />
    {/* Arrow */}
    <line x1="110" y1="78" x2="110" y2="110" stroke="var(--accent-red)" strokeWidth="2" strokeDasharray="4 3" />
    <polygon points="104,106 110,118 116,106" fill="var(--accent-red)" />
    {/* Price tag */}
    <rect x="58" y="124" width="104" height="44" rx="12" fill="var(--accent-red)" opacity={0.1} stroke="var(--accent-red)" strokeWidth="1.5" />
    <text x="110" y="149" textAnchor="middle" fontSize="15" fontWeight="900" fill="var(--accent-red)">65-100K₪</text>
  </svg>
);

/** Step 4: Lawsuit = up to 3M */
const LawsuitDiagram = () => (
  <svg viewBox="0 0 220 200" className="w-full max-w-[200px]" fill="none">
    {/* Gavel shape */}
    <rect x="88" y="22" width="44" height="20" rx="4" fill="#37374e" opacity={0.15} />
    <rect x="106" y="42" width="8" height="30" rx="3" fill="#37374e" opacity={0.15} />
    <rect x="90" y="72" width="40" height="8" rx="3" fill="#37374e" opacity={0.1} />
    {/* Arrow */}
    <line x1="110" y1="88" x2="110" y2="116" stroke="var(--accent-red)" strokeWidth="2" strokeDasharray="4 3" />
    <polygon points="104,112 110,124 116,112" fill="var(--accent-red)" />
    {/* Escalating bars */}
    <rect x="60" y="155" width="28" height="30" rx="4" fill="var(--accent-red)" opacity={0.15} />
    <rect x="96" y="140" width="28" height="45" rx="4" fill="var(--accent-red)" opacity={0.25} />
    <rect x="132" y="125" width="28" height="60" rx="4" fill="var(--accent-red)" opacity={0.5} />
    {/* Amount */}
    <text x="110" y="205" textAnchor="middle" fontSize="14" fontWeight="900" fill="var(--accent-red)" opacity="0">3,000,000₪</text>
  </svg>
);
