"use client";

import { Trophy } from "lucide-react";

const leaderboard = [
  { rank: 1, name: "דוד כהן", elo: 1847, isYou: true },
  { rank: 2, name: "מיכל אברהם", elo: 1765, isYou: false },
  { rank: 3, name: "אלעד שמעוני", elo: 1720, isYou: false },
  { rank: 4, name: "רון מלכה", elo: 1690, isYou: false },
  { rank: 5, name: "נועם גל", elo: 1624, isYou: false },
];

export function LeaderboardPosition() {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4">
      <h3 className="text-sm font-semibold flex items-center gap-2 mb-3">
        <Trophy className="w-4 h-4 text-[var(--accent-amber)]" />
        מיקום בדירוג
      </h3>
      <div className="space-y-2">
        {leaderboard.map((item) => (
          <div
            key={item.rank}
            className={`flex items-center justify-between py-2 px-3 rounded-lg ${
              item.isYou ? "bg-[var(--accent-green)]/5 border border-[var(--accent-green)]/20" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                item.rank <= 3 ? "bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]" : "bg-[var(--bg-elevated)] text-[var(--text-muted)]"
              }`} style={{ fontFamily: "var(--font-rubik)" }}>
                {item.rank}
              </span>
              <span className={`text-sm ${item.isYou ? "font-bold text-[var(--accent-green)]" : "text-[var(--text-secondary)]"}`}>
                {item.name} {item.isYou && "(את/ה)"}
              </span>
            </div>
            <span className="text-sm font-bold text-[var(--text-muted)]" style={{ fontFamily: "var(--font-rubik)" }}>
              {item.elo.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
