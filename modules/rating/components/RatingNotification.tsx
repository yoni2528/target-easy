"use client";

import { Trophy, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";

interface Props {
  instructorName: string;
  eloDelta: number;
  newElo: number;
  feedbackAvg: number;
  isHighScore: boolean;
  lang: "he" | "en";
}

export function RatingNotification({ instructorName, eloDelta, newElo, feedbackAvg, isHighScore, lang }: Props) {
  const isHe = lang === "he";
  const isPositive = eloDelta >= 0;

  return (
    <div className={`bg-[var(--bg-card)] border rounded-xl p-4 ${isPositive ? "border-[var(--accent-green)]/30" : "border-[var(--accent-red)]/30"}`}>
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isPositive ? "bg-[var(--accent-green)]/10" : "bg-[var(--accent-red)]/10"}`}>
          {isHighScore ? (
            <Trophy className="w-5 h-5 text-[var(--accent-amber)]" />
          ) : isPositive ? (
            <TrendingUp className="w-5 h-5 text-[var(--accent-green)]" />
          ) : (
            <TrendingDown className="w-5 h-5 text-[var(--accent-red)]" />
          )}
        </div>
        <div className="flex-1">
          {isHighScore ? (
            <>
              <p className="text-sm font-bold">
                {isHe ? "כל הכבוד!" : "Great job!"} 🏆
              </p>
              <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">
                {isHe
                  ? `סיימת אימון עם דירוג גבוה. מדד ה-ELO שלך עלה ב-${Math.abs(eloDelta)} נקודות. המשך כך!`
                  : `You completed a training with a high rating. Your ELO increased by ${Math.abs(eloDelta)} points. Keep it up!`}
              </p>
            </>
          ) : isPositive ? (
            <>
              <p className="text-sm font-bold">
                {isHe ? "אימון הושלם" : "Training Completed"}
              </p>
              <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">
                {isHe
                  ? `ה-ELO שלך עלה ב-${eloDelta} נקודות (${newElo.toLocaleString()}). ציון משוב: ${feedbackAvg}/5`
                  : `Your ELO increased by ${eloDelta} points (${newElo.toLocaleString()}). Feedback: ${feedbackAvg}/5`}
              </p>
            </>
          ) : (
            <>
              <p className="text-sm font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-[var(--accent-red)]" />
                {isHe ? "התראת חריגה" : "Alert: Low Score"}
              </p>
              <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">
                {isHe
                  ? `ה-ELO ירד ב-${Math.abs(eloDelta)} נקודות (${newElo.toLocaleString()}). ציון משוב: ${feedbackAvg}/5. נשלחה התראה להנהלה.`
                  : `ELO decreased by ${Math.abs(eloDelta)} points (${newElo.toLocaleString()}). Feedback: ${feedbackAvg}/5. Management notified.`}
              </p>
            </>
          )}
        </div>
      </div>

      {/* ELO badge */}
      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[var(--border-subtle)]">
        <span className="text-[10px] text-[var(--text-muted)]">ELO</span>
        <span className="text-xs font-bold" style={{ fontFamily: "var(--font-rubik)" }}>
          {newElo.toLocaleString()}
        </span>
        <span className={`text-[10px] font-bold ${isPositive ? "text-[var(--accent-green)]" : "text-[var(--accent-red)]"}`}>
          {isPositive ? "+" : ""}{eloDelta}
        </span>
      </div>
    </div>
  );
}
