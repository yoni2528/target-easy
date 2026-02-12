"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Trophy, TrendingUp, TrendingDown, Minus, Shield } from "lucide-react";
import { getMockLeagueTable } from "../lib/mock-ratings";

const MEDAL_COLORS = ["#fbbf24", "#c0c0c0", "#cd7f32"];

interface Props {
  lang: "he" | "en";
}

export function LeagueTable({ lang }: Props) {
  const isHe = lang === "he";
  const league = useMemo(() => getMockLeagueTable(), []);

  const TrendIcon = ({ trend }: { trend: "up" | "down" | "stable" }) => {
    if (trend === "up") return <TrendingUp className="w-3 h-3 text-[var(--accent-green)]" />;
    if (trend === "down") return <TrendingDown className="w-3 h-3 text-[var(--accent-red)]" />;
    return <Minus className="w-3 h-3 text-[var(--text-muted)]" />;
  };

  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4">
      <h3 className="text-sm font-semibold flex items-center gap-2 mb-4">
        <Trophy className="w-4 h-4 text-[var(--accent-amber)]" />
        {isHe ? "טבלת ליגה - ציון כולל" : "League Table - Total Score"}
      </h3>

      {/* Header row */}
      <div className="grid grid-cols-[2rem_1fr_3.5rem_3rem_3rem_1.5rem] gap-2 text-[9px] text-[var(--text-muted)] font-medium mb-2 px-1">
        <span>#</span>
        <span>{isHe ? "מדריך" : "Instructor"}</span>
        <span className="text-center">{isHe ? "ציון" : "Score"}</span>
        <span className="text-center">ELO</span>
        <span className="text-center">{isHe ? "שימור" : "Ret."}</span>
        <span />
      </div>

      <div className="space-y-1.5">
        {league.map((entry) => (
          <Link
            key={entry.instructorId}
            href={`/instructor/${entry.instructorId}`}
            className="grid grid-cols-[2rem_1fr_3.5rem_3rem_3rem_1.5rem] gap-2 items-center bg-[var(--bg-elevated)] rounded-lg p-2 hover:border-[var(--accent-green)]/30 transition-colors"
          >
            {/* Rank */}
            <span className="text-xs font-bold text-center" style={{
              fontFamily: "var(--font-rubik)",
              color: entry.rank <= 3 ? MEDAL_COLORS[entry.rank - 1] : "var(--text-muted)",
            }}>
              {entry.rank}
            </span>

            {/* Name + photo */}
            <div className="flex items-center gap-2 min-w-0">
              <img
                src={entry.photo}
                alt={entry.name}
                className="w-7 h-7 rounded-full object-cover border"
                style={{ borderColor: entry.rank <= 3 ? MEDAL_COLORS[entry.rank - 1] : "var(--border-subtle)" }}
              />
              <span className="text-[11px] font-semibold truncate">{entry.name}</span>
            </div>

            {/* Total Score */}
            <span className="text-xs font-bold text-center text-[var(--accent-green)]" style={{ fontFamily: "var(--font-rubik)" }}>
              {entry.totalScore}
            </span>

            {/* ELO */}
            <span className="text-[10px] font-medium text-center" style={{ fontFamily: "var(--font-rubik)" }}>
              {entry.elo.toLocaleString()}
            </span>

            {/* Retention */}
            <span className="text-[10px] font-medium text-center" style={{ fontFamily: "var(--font-rubik)" }}>
              {Math.round(entry.retentionRate * 100)}%
            </span>

            {/* Trend */}
            <TrendIcon trend={entry.trend} />
          </Link>
        ))}
      </div>
    </div>
  );
}
