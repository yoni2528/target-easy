import type { Instructor } from "@/modules/instructors/types";
import type { QuizAnswers } from "../types";

const LOCATION_CITIES: Record<string, string[]> = {
  center: ["תל אביב", "נתניה", "רמת גן", "פתח תקווה", "ראשון לציון", "הרצליה", "כפר סבא", "רעננה"],
  north: ["חיפה", "עכו", "נהריה", "כרמיאל", "טבריה", "עפולה", "קריית שמונה"],
  south: ["באר שבע", "אשדוד", "אשקלון", "אילת", "דימונה"],
  jerusalem: ["ירושלים", "בית שמש", "מעלה אדומים", "מודיעין"],
};

export function scoreInstructor(instructor: Instructor, answers: QuizAnswers): number {
  let score = 0;

  // Experience → ELO match
  switch (answers.experience) {
    case "none":
    case "basic":
      score += instructor.eloInstruction >= 1200 ? 30 : 10;
      if (instructor.trainingTypes.some((t) => t.includes("מתחמש"))) score += 20;
      break;
    case "intermediate":
      score += instructor.eloShooting >= 1200 ? 20 : 5;
      break;
    case "advanced":
      score += instructor.eloShooting >= 1500 ? 30 : 10;
      if (instructor.trainingTypes.some((t) => t.includes("מקצועי"))) score += 20;
      break;
  }

  // Goal match
  switch (answers.goal) {
    case "license":
      if (instructor.trainingTypes.some((t) => t.includes("מתחמש") || t.includes("רישיון"))) score += 25;
      break;
    case "refresh":
      if (instructor.trainingTypes.some((t) => t.includes("רענון") || t.includes("חידוש"))) score += 25;
      break;
    case "improve":
      score += Math.min(25, Math.floor((instructor.eloShooting - 800) / 40));
      break;
    case "tactical":
      if (instructor.eloShooting >= 1400) score += 25;
      if (instructor.trainingTypes.some((t) => t.includes("מקצועי") || t.includes("מבצעי"))) score += 10;
      break;
  }

  // Location match
  const cities = LOCATION_CITIES[answers.location] ?? [];
  if (cities.some((c) => instructor.city.includes(c))) score += 20;

  // Budget match
  switch (answers.budget) {
    case "low":
      if (instructor.priceFrom <= 200) score += 15;
      break;
    case "mid":
      if (instructor.priceFrom <= 300) score += 15;
      break;
    case "high":
    case "any":
      score += 10;
      break;
  }

  // Bonuses
  if (instructor.verified) score += 5;
  if (instructor.available) score += 5;
  score += Math.min(10, Math.floor(instructor.stars * 2));

  return score;
}

export function matchInstructors(instructors: Instructor[], answers: QuizAnswers, limit = 5) {
  return instructors
    .map((inst) => ({ instructor: inst, score: scoreInstructor(inst, answers) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
