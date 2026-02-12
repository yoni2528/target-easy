export interface FeedbackQuestion {
  id: number;
  textHe: string;
  textEn: string;
}

export interface FeedbackAnswer {
  questionId: number;
  value: number; // 1-5
  emoji: string;
}

export interface TrainingFeedback {
  id: string;
  trainingId: string;
  instructorId: string;
  clientName: string;
  answers: FeedbackAnswer[];
  averageScore: number;
  submittedAt: string;
}

export interface RatingUpdate {
  instructorId: string;
  oldElo: number;
  newElo: number;
  eloDelta: number;
  feedbackScore: number;
  retentionScore: number;
  totalScore: number;
  trainingId: string;
  timestamp: string;
}

export interface InstructorRatingHistory {
  instructorId: string;
  month: string; // "2026-01", "2026-02"
  elo: number;
  totalScore: number;
  retentionRate: number;
  feedbackAvg: number;
  trainingsCount: number;
}

export interface LeagueEntry {
  instructorId: string;
  name: string;
  photo: string;
  totalScore: number;
  elo: number;
  retentionRate: number;
  feedbackAvg: number;
  trend: "up" | "down" | "stable";
  rank: number;
  trainingsThisMonth: number;
}
