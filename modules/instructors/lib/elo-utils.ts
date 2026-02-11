export const SHOOTING_LEVELS = [
  { min: 400, max: 600, label: "מתחיל", color: "#94a3b8" },
  { min: 600, max: 800, label: "בסיסי", color: "#60a5fa" },
  { min: 800, max: 1100, label: "בינוני", color: "#4ade80" },
  { min: 1100, max: 1400, label: "מתקדם", color: "#fbbf24" },
  { min: 1400, max: 1700, label: "מומחה", color: "#f97316" },
  { min: 1700, max: 2000, label: "עילית", color: "#ef4444" },
];

export const INSTRUCTION_LEVELS = [
  { min: 400, max: 700, label: "מתחיל", color: "#94a3b8" },
  { min: 700, max: 1000, label: "בסיסי", color: "#60a5fa" },
  { min: 1000, max: 1300, label: "מנוסה", color: "#4ade80" },
  { min: 1300, max: 1500, label: "מומחה", color: "#fbbf24" },
  { min: 1500, max: 1700, label: "בכיר", color: "#f97316" },
  { min: 1700, max: 2000, label: "עילית", color: "#ef4444" },
];

export function getShootingLevel(elo: number) {
  return SHOOTING_LEVELS.find((l) => elo >= l.min && elo < l.max) ?? SHOOTING_LEVELS[SHOOTING_LEVELS.length - 1];
}

export function getInstructionLevel(elo: number) {
  return INSTRUCTION_LEVELS.find((l) => elo >= l.min && elo < l.max) ?? INSTRUCTION_LEVELS[INSTRUCTION_LEVELS.length - 1];
}
