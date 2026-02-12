import type { TrainingFeedback, InstructorRatingHistory, LeagueEntry } from "../types";

export const MOCK_FEEDBACKS: TrainingFeedback[] = [
  {
    id: "fb-1", trainingId: "t-1", instructorId: "1", clientName: "יוסי לוי",
    answers: [
      { questionId: 1, value: 5, emoji: "🤩" },
      { questionId: 2, value: 5, emoji: "🤩" },
      { questionId: 3, value: 5, emoji: "🤩" },
      { questionId: 4, value: 4, emoji: "😊" },
      { questionId: 5, value: 5, emoji: "🤩" },
    ],
    averageScore: 4.8, submittedAt: "2026-02-10T14:30:00",
  },
  {
    id: "fb-2", trainingId: "t-2", instructorId: "1", clientName: "שרה כהן",
    answers: [
      { questionId: 1, value: 5, emoji: "🤩" },
      { questionId: 2, value: 4, emoji: "😊" },
      { questionId: 3, value: 5, emoji: "🤩" },
      { questionId: 4, value: 5, emoji: "🤩" },
      { questionId: 5, value: 5, emoji: "🤩" },
    ],
    averageScore: 4.8, submittedAt: "2026-02-08T16:00:00",
  },
  {
    id: "fb-3", trainingId: "t-3", instructorId: "2", clientName: "דוד חי",
    answers: [
      { questionId: 1, value: 4, emoji: "😊" },
      { questionId: 2, value: 4, emoji: "😊" },
      { questionId: 3, value: 4, emoji: "😊" },
      { questionId: 4, value: 3, emoji: "😐" },
      { questionId: 5, value: 4, emoji: "😊" },
    ],
    averageScore: 3.8, submittedAt: "2026-02-09T11:00:00",
  },
  {
    id: "fb-4", trainingId: "t-4", instructorId: "5", clientName: "אלי מזרחי",
    answers: [
      { questionId: 1, value: 5, emoji: "🤩" },
      { questionId: 2, value: 5, emoji: "🤩" },
      { questionId: 3, value: 4, emoji: "😊" },
      { questionId: 4, value: 5, emoji: "🤩" },
      { questionId: 5, value: 5, emoji: "🤩" },
    ],
    averageScore: 4.8, submittedAt: "2026-02-07T10:00:00",
  },
];

export const MOCK_RATING_HISTORY: InstructorRatingHistory[] = [
  // Instructor 1 (דוד כהן) - 6 months
  { instructorId: "1", month: "2025-09", elo: 1780, totalScore: 82.5, retentionRate: 0.85, feedbackAvg: 4.6, trainingsCount: 22 },
  { instructorId: "1", month: "2025-10", elo: 1795, totalScore: 84.1, retentionRate: 0.88, feedbackAvg: 4.7, trainingsCount: 25 },
  { instructorId: "1", month: "2025-11", elo: 1810, totalScore: 85.0, retentionRate: 0.87, feedbackAvg: 4.7, trainingsCount: 28 },
  { instructorId: "1", month: "2025-12", elo: 1825, totalScore: 86.3, retentionRate: 0.90, feedbackAvg: 4.8, trainingsCount: 30 },
  { instructorId: "1", month: "2026-01", elo: 1840, totalScore: 87.8, retentionRate: 0.91, feedbackAvg: 4.8, trainingsCount: 27 },
  { instructorId: "1", month: "2026-02", elo: 1847, totalScore: 88.2, retentionRate: 0.92, feedbackAvg: 4.8, trainingsCount: 14 },

  // Instructor 2 (מיכל אברהם)
  { instructorId: "2", month: "2025-09", elo: 1520, totalScore: 71.0, retentionRate: 0.72, feedbackAvg: 4.2, trainingsCount: 15 },
  { instructorId: "2", month: "2025-10", elo: 1535, totalScore: 72.5, retentionRate: 0.74, feedbackAvg: 4.3, trainingsCount: 18 },
  { instructorId: "2", month: "2025-11", elo: 1550, totalScore: 73.8, retentionRate: 0.75, feedbackAvg: 4.3, trainingsCount: 20 },
  { instructorId: "2", month: "2025-12", elo: 1560, totalScore: 74.2, retentionRate: 0.73, feedbackAvg: 4.2, trainingsCount: 17 },
  { instructorId: "2", month: "2026-01", elo: 1575, totalScore: 75.0, retentionRate: 0.76, feedbackAvg: 4.4, trainingsCount: 19 },
  { instructorId: "2", month: "2026-02", elo: 1588, totalScore: 75.8, retentionRate: 0.77, feedbackAvg: 4.4, trainingsCount: 10 },

  // Instructor 3 (אלון ברק)
  { instructorId: "3", month: "2025-09", elo: 1920, totalScore: 91.0, retentionRate: 0.95, feedbackAvg: 4.9, trainingsCount: 35 },
  { instructorId: "3", month: "2025-10", elo: 1930, totalScore: 91.5, retentionRate: 0.94, feedbackAvg: 4.9, trainingsCount: 32 },
  { instructorId: "3", month: "2025-11", elo: 1940, totalScore: 92.0, retentionRate: 0.95, feedbackAvg: 5.0, trainingsCount: 38 },
  { instructorId: "3", month: "2025-12", elo: 1945, totalScore: 92.3, retentionRate: 0.94, feedbackAvg: 4.9, trainingsCount: 33 },
  { instructorId: "3", month: "2026-01", elo: 1950, totalScore: 92.8, retentionRate: 0.96, feedbackAvg: 5.0, trainingsCount: 36 },
  { instructorId: "3", month: "2026-02", elo: 1956, totalScore: 93.2, retentionRate: 0.96, feedbackAvg: 5.0, trainingsCount: 18 },

  // Instructor 5 (יונתן שמש)
  { instructorId: "5", month: "2025-09", elo: 1600, totalScore: 76.0, retentionRate: 0.78, feedbackAvg: 4.4, trainingsCount: 20 },
  { instructorId: "5", month: "2025-10", elo: 1620, totalScore: 77.5, retentionRate: 0.80, feedbackAvg: 4.5, trainingsCount: 22 },
  { instructorId: "5", month: "2025-11", elo: 1635, totalScore: 78.2, retentionRate: 0.79, feedbackAvg: 4.5, trainingsCount: 24 },
  { instructorId: "5", month: "2025-12", elo: 1650, totalScore: 79.0, retentionRate: 0.81, feedbackAvg: 4.6, trainingsCount: 21 },
  { instructorId: "5", month: "2026-01", elo: 1668, totalScore: 80.5, retentionRate: 0.83, feedbackAvg: 4.6, trainingsCount: 23 },
  { instructorId: "5", month: "2026-02", elo: 1680, totalScore: 81.0, retentionRate: 0.84, feedbackAvg: 4.7, trainingsCount: 12 },

  // Instructor 9 (לימור דיין) - downward trend
  { instructorId: "9", month: "2025-09", elo: 1350, totalScore: 69.0, retentionRate: 0.80, feedbackAvg: 4.5, trainingsCount: 25 },
  { instructorId: "9", month: "2025-10", elo: 1340, totalScore: 67.5, retentionRate: 0.76, feedbackAvg: 4.3, trainingsCount: 22 },
  { instructorId: "9", month: "2025-11", elo: 1320, totalScore: 66.0, retentionRate: 0.72, feedbackAvg: 4.2, trainingsCount: 20 },
  { instructorId: "9", month: "2025-12", elo: 1300, totalScore: 64.5, retentionRate: 0.68, feedbackAvg: 4.1, trainingsCount: 18 },
  { instructorId: "9", month: "2026-01", elo: 1290, totalScore: 63.0, retentionRate: 0.65, feedbackAvg: 4.0, trainingsCount: 16 },
  { instructorId: "9", month: "2026-02", elo: 1280, totalScore: 62.0, retentionRate: 0.62, feedbackAvg: 3.9, trainingsCount: 8 },
];

export function getMockLeagueTable(): LeagueEntry[] {
  const latestByInstructor = new Map<string, InstructorRatingHistory>();
  const prevByInstructor = new Map<string, InstructorRatingHistory>();

  for (const entry of MOCK_RATING_HISTORY) {
    if (entry.month === "2026-02") {
      latestByInstructor.set(entry.instructorId, entry);
    } else if (entry.month === "2026-01") {
      prevByInstructor.set(entry.instructorId, entry);
    }
  }

  const instructorNames: Record<string, { name: string; photo: string }> = {
    "1": { name: "דוד כהן", photo: "https://images.pexels.com/photos/29656076/pexels-photo-29656076.jpeg?w=300&h=300&fit=crop" },
    "2": { name: "מיכל אברהם", photo: "https://images.pexels.com/photos/7191674/pexels-photo-7191674.jpeg?w=300&h=300&fit=crop" },
    "3": { name: "אלון ברק", photo: "https://images.pexels.com/photos/8059112/pexels-photo-8059112.jpeg?w=300&h=300&fit=crop" },
    "5": { name: "יונתן שמש", photo: "https://images.pexels.com/photos/7345434/pexels-photo-7345434.jpeg?w=300&h=300&fit=crop" },
    "9": { name: "לימור דיין", photo: "https://images.pexels.com/photos/6077388/pexels-photo-6077388.jpeg?w=300&h=300&fit=crop" },
  };

  const entries: LeagueEntry[] = [];
  for (const [id, latest] of latestByInstructor) {
    const prev = prevByInstructor.get(id);
    const info = instructorNames[id];
    if (!info) continue;

    let trend: "up" | "down" | "stable" = "stable";
    if (prev) {
      const diff = latest.totalScore - prev.totalScore;
      trend = diff > 1 ? "up" : diff < -1 ? "down" : "stable";
    }

    entries.push({
      instructorId: id,
      name: info.name,
      photo: info.photo,
      totalScore: latest.totalScore,
      elo: latest.elo,
      retentionRate: latest.retentionRate,
      feedbackAvg: latest.feedbackAvg,
      trend,
      rank: 0,
      trainingsThisMonth: latest.trainingsCount,
    });
  }

  entries.sort((a, b) => b.totalScore - a.totalScore);
  entries.forEach((e, i) => (e.rank = i + 1));
  return entries;
}
