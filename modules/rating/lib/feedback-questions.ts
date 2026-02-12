import type { FeedbackQuestion } from "../types";

export const FEEDBACK_QUESTIONS: FeedbackQuestion[] = [
  {
    id: 1,
    textHe: "איך היית מדרג את האנרגיה של המדריך היום?",
    textEn: "How would you rate the instructor's energy today?",
  },
  {
    id: 2,
    textHe: "האם הרגשת שהמדריך היה קשוב לצרכים שלך?",
    textEn: "Did you feel the instructor was attentive to your needs?",
  },
  {
    id: 3,
    textHe: "רמת המקצועיות והידע שהופגן באימון:",
    textEn: "Professionalism and knowledge demonstrated:",
  },
  {
    id: 4,
    textHe: "עד כמה האימון קידם אותך ואתה מרגיש יותר בטוח בנשק כרגע?",
    textEn: "How much did the training advance you and make you feel safer with a weapon?",
  },
  {
    id: 5,
    textHe: "השורה התחתונה - איך היה לך באופן כללי?",
    textEn: "Bottom line - how was your overall experience?",
  },
];

export const EMOJI_OPTIONS = [
  { value: 1, emoji: "😞", labelHe: "גרוע", labelEn: "Poor" },
  { value: 2, emoji: "😕", labelHe: "לא טוב", labelEn: "Not Good" },
  { value: 3, emoji: "😐", labelHe: "בסדר", labelEn: "OK" },
  { value: 4, emoji: "😊", labelHe: "טוב", labelEn: "Good" },
  { value: 5, emoji: "🤩", labelHe: "מעולה", labelEn: "Excellent" },
];
