/**
 * Smart Rating Engine for Instructor Scoring
 *
 * Total Score = 50% Professional ELO + 50% Experience Score
 * Experience Score = 70% Retention + 30% Feedback
 *
 * ELO Formula: New_ELO = Old_ELO + K * (Actual - Expected)
 * Expected = 1 / (1 + 10^((OpponentELO - PlayerELO) / 400))
 */

const K_FACTOR = 32;
const BASELINE_ELO = 1500;

/** Calculate expected result based on ELO gap */
export function calculateExpected(playerElo: number, opponentElo: number): number {
  return 1 / (1 + Math.pow(10, (opponentElo - playerElo) / 400));
}

/** Calculate new ELO after a training session */
export function calculateNewElo(
  currentElo: number,
  actualResult: number, // 1 = success, 0 = fail
  benchmarkElo: number = BASELINE_ELO
): { newElo: number; delta: number } {
  const expected = calculateExpected(currentElo, benchmarkElo);
  const delta = Math.round(K_FACTOR * (actualResult - expected));
  const newElo = Math.max(400, Math.min(2000, currentElo + delta));
  return { newElo, delta };
}

/** Determine training success from shooter-log scores (0-1) */
export function trainingSuccessRate(scores: {
  grouping: number;
  accuracy: number;
  safetyScore: number;
  weaponHandling: number;
  pass: boolean;
}): number {
  if (!scores.pass) return 0.2;
  const avg = (scores.grouping + scores.accuracy + scores.safetyScore + scores.weaponHandling) / 4;
  return Math.min(1, avg / 10); // scores are 1-10, normalize to 0-1
}

/** Calculate feedback component (average of 5 questions, each 1-5) */
export function calculateFeedbackScore(answers: number[]): number {
  if (answers.length === 0) return 0;
  const sum = answers.reduce((a, b) => a + b, 0);
  return sum / answers.length; // Returns 1-5
}

/** Normalize feedback to 0-1 range */
export function normalizeFeedback(feedbackAvg: number): number {
  return (feedbackAvg - 1) / 4; // 1→0, 5→1
}

/**
 * Calculate total weighted score for an instructor after training
 *
 * Total = 50% * ELO_normalized + 50% * (70% * retention + 30% * feedback_normalized)
 */
export function calculateTotalScore(params: {
  eloScore: number;       // Current ELO (400-2000)
  retention: number;      // 0 or 1 (did client rebook?)
  feedbackAvg: number;    // 1-5 average
}): number {
  const { eloScore, retention, feedbackAvg } = params;

  // Normalize ELO to 0-100 scale
  const eloNormalized = ((eloScore - 400) / 1600) * 100;

  // Experience score: 70% retention + 30% feedback
  const feedbackNorm = normalizeFeedback(feedbackAvg) * 100;
  const experienceScore = 0.7 * (retention * 100) + 0.3 * feedbackNorm;

  // Total: 50% professional + 50% experience
  const total = 0.5 * eloNormalized + 0.5 * experienceScore;

  return Math.round(total * 10) / 10;
}

/** Get trend direction based on last two months */
export function getTrend(current: number, previous: number): "up" | "down" | "stable" {
  const diff = current - previous;
  if (diff > 2) return "up";
  if (diff < -2) return "down";
  return "stable";
}
