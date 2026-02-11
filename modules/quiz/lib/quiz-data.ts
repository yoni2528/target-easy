import type { QuizQuestion } from "../types";

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "experience",
    question: "מה רמת הניסיון שלך בירי?",
    options: [
      { label: "אין לי ניסיון בכלל", value: "none" },
      { label: "יריתי כמה פעמים בצבא/מטווח", value: "basic" },
      { label: "יש לי נשק ואני יורה מדי פעם", value: "intermediate" },
      { label: "יורה מנוסה, מחפש להשתפר", value: "advanced" },
    ],
  },
  {
    id: "goal",
    question: "מה המטרה העיקרית שלך?",
    options: [
      { label: "הוצאת רישיון / התחמשות", value: "license" },
      { label: "רענון / חידוש רישיון", value: "refresh" },
      { label: "שיפור דיוק וטכניקה", value: "improve" },
      { label: "אימון מבצעי / מתקדם", value: "tactical" },
    ],
  },
  {
    id: "location",
    question: "באיזה אזור אתה מחפש?",
    options: [
      { label: "מרכז (תל אביב, השרון)", value: "center" },
      { label: "צפון (חיפה, גליל)", value: "north" },
      { label: "דרום (באר שבע, נגב)", value: "south" },
      { label: "ירושלים והסביבה", value: "jerusalem" },
    ],
  },
  {
    id: "budget",
    question: "מה התקציב שלך לאימון?",
    options: [
      { label: "עד ₪200", value: "low" },
      { label: "₪200-300", value: "mid" },
      { label: "₪300-400", value: "high" },
      { label: "לא משנה, חשוב לי איכות", value: "any" },
    ],
  },
];
