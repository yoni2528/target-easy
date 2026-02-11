import type { Lang } from "@/lib/language-store";

interface EloLevel {
  min: number;
  max: number;
  label: string;
  labelEn: string;
  color: string;
}

export const SHOOTING_LEVELS: EloLevel[] = [
  { min: 400, max: 600, label: "מתחיל", labelEn: "Beginner", color: "#94a3b8" },
  { min: 600, max: 800, label: "בסיסי", labelEn: "Basic", color: "#60a5fa" },
  { min: 800, max: 1100, label: "בינוני", labelEn: "Intermediate", color: "#4ade80" },
  { min: 1100, max: 1400, label: "מתקדם", labelEn: "Advanced", color: "#fbbf24" },
  { min: 1400, max: 1700, label: "מומחה", labelEn: "Expert", color: "#f97316" },
  { min: 1700, max: 2000, label: "עילית", labelEn: "Elite", color: "#ef4444" },
];

export const INSTRUCTION_LEVELS: EloLevel[] = [
  { min: 400, max: 700, label: "מתחיל", labelEn: "Beginner", color: "#94a3b8" },
  { min: 700, max: 1000, label: "בסיסי", labelEn: "Basic", color: "#60a5fa" },
  { min: 1000, max: 1300, label: "מנוסה", labelEn: "Experienced", color: "#4ade80" },
  { min: 1300, max: 1500, label: "מומחה", labelEn: "Expert", color: "#fbbf24" },
  { min: 1500, max: 1700, label: "בכיר", labelEn: "Senior", color: "#f97316" },
  { min: 1700, max: 2000, label: "עילית", labelEn: "Elite", color: "#ef4444" },
];

export function getShootingLevel(elo: number) {
  return SHOOTING_LEVELS.find((l) => elo >= l.min && elo < l.max) ?? SHOOTING_LEVELS[SHOOTING_LEVELS.length - 1];
}

export function getInstructionLevel(elo: number) {
  return INSTRUCTION_LEVELS.find((l) => elo >= l.min && elo < l.max) ?? INSTRUCTION_LEVELS[INSTRUCTION_LEVELS.length - 1];
}

export function getShootingLevelLabel(elo: number, lang: Lang): string {
  const level = getShootingLevel(elo);
  return lang === "en" ? level.labelEn : level.label;
}

export function getInstructionLevelLabel(elo: number, lang: Lang): string {
  const level = getInstructionLevel(elo);
  return lang === "en" ? level.labelEn : level.label;
}
