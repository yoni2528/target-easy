import type { QuizQuestion } from "../types";
import type { Lang } from "@/lib/language-store";

interface TranslatedQuizQuestion {
  id: string;
  question: { he: string; en: string };
  options: { label: { he: string; en: string }; value: string }[];
}

const TRANSLATED_QUESTIONS: TranslatedQuizQuestion[] = [
  {
    id: "experience",
    question: { he: "מה רמת הניסיון שלך בירי?", en: "What is your shooting experience level?" },
    options: [
      { label: { he: "אין לי ניסיון בכלל", en: "No experience at all" }, value: "none" },
      { label: { he: "יריתי כמה פעמים בצבא/מטווח", en: "Shot a few times in the army/range" }, value: "basic" },
      { label: { he: "יש לי נשק ואני יורה מדי פעם", en: "I own a gun and shoot occasionally" }, value: "intermediate" },
      { label: { he: "יורה מנוסה, מחפש להשתפר", en: "Experienced shooter, looking to improve" }, value: "advanced" },
    ],
  },
  {
    id: "goal",
    question: { he: "מה המטרה העיקרית שלך?", en: "What is your main goal?" },
    options: [
      { label: { he: "הוצאת רישיון / התחמשות", en: "Getting a license / arming up" }, value: "license" },
      { label: { he: "רענון / חידוש רישיון", en: "Refresh / license renewal" }, value: "refresh" },
      { label: { he: "שיפור דיוק וטכניקה", en: "Improve accuracy and technique" }, value: "improve" },
      { label: { he: "אימון מבצעי / מתקדם", en: "Tactical / advanced training" }, value: "tactical" },
    ],
  },
  {
    id: "location",
    question: { he: "באיזה אזור אתה מחפש?", en: "What area are you looking in?" },
    options: [
      { label: { he: "מרכז (תל אביב, השרון)", en: "Center (Tel Aviv, Sharon)" }, value: "center" },
      { label: { he: "צפון (חיפה, גליל)", en: "North (Haifa, Galilee)" }, value: "north" },
      { label: { he: "דרום (באר שבע, נגב)", en: "South (Beer Sheva, Negev)" }, value: "south" },
      { label: { he: "ירושלים והסביבה", en: "Jerusalem area" }, value: "jerusalem" },
    ],
  },
  {
    id: "budget",
    question: { he: "מה התקציב שלך לאימון?", en: "What is your training budget?" },
    options: [
      { label: { he: "עד ₪200", en: "Up to ₪200" }, value: "low" },
      { label: { he: "₪200-300", en: "₪200-300" }, value: "mid" },
      { label: { he: "₪300-400", en: "₪300-400" }, value: "high" },
      { label: { he: "לא משנה, חשוב לי איכות", en: "Budget doesn't matter, quality first" }, value: "any" },
    ],
  },
];

export function getQuizQuestions(lang: Lang): QuizQuestion[] {
  return TRANSLATED_QUESTIONS.map((q) => ({
    id: q.id,
    question: q.question[lang],
    options: q.options.map((o) => ({ label: o.label[lang], value: o.value })),
  }));
}

// Keep backward compatible export
export const QUIZ_QUESTIONS: QuizQuestion[] = getQuizQuestions("he");
