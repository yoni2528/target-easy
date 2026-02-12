"use client";

import { useState, useMemo } from "react";
import { ArrowRight, CheckCircle, Target } from "lucide-react";
import type { TrainingClient, ShooterLogEntry } from "../types";

interface Props {
  clients: TrainingClient[];
  onBack: () => void;
  onSubmitAll: (entries: ShooterLogEntry[]) => void;
}

interface Exercise {
  key: string;
  name: string;
  maxScore: number;
  isTotal?: boolean;
  includeInTotal?: string[];
}

const EXERCISES: Exercise[] = [
  { key: "static_15", name: "ירי סטטי", maxScore: 15 },
  { key: "static_improve_20", name: "ירי סטטי שיפור", maxScore: 20 },
  { key: "positions_30", name: "ירי מצבים + מחסנית", maxScore: 30 },
  { key: "cover_15", name: "ירי מחסה", maxScore: 15 },
  {
    key: "total_hits",
    name: "סה״כ פגיעות",
    maxScore: 80,
    isTotal: true,
    includeInTotal: ["static_15", "static_improve_20", "positions_30", "cover_15"],
  },
  { key: "shooting_test", name: "מבחן ירי", maxScore: 20 },
];

type ScoreMap = Record<string, number | null>;

function calcTotal(scores: ScoreMap, keys: string[]): number {
  return keys.reduce((sum, k) => sum + (scores[k] ?? 0), 0);
}

function scoreColor(score: number, max: number): string {
  const pct = score / max;
  if (pct >= 0.8) return "var(--accent-green)";
  if (pct >= 0.6) return "var(--accent-amber)";
  return "var(--text-muted)";
}

export function BatchShooterLog({ clients, onBack, onSubmitAll }: Props) {
  const [allScores, setAllScores] = useState<ScoreMap[]>(
    clients.map(() => {
      const scores: ScoreMap = {};
      EXERCISES.forEach((ex) => { scores[ex.key] = null; });
      return scores;
    })
  );
  const [notes, setNotes] = useState<string[]>(clients.map(() => ""));
  const [submitted, setSubmitted] = useState(false);

  const exerciseCols = EXERCISES.filter((e) => !e.isTotal);
  const totalExercise = EXERCISES.find((e) => e.isTotal)!;
  const testExercise = EXERCISES.find((e) => e.key === "shooting_test")!;

  const updateScore = (clientIdx: number, key: string, value: string) => {
    const exercise = EXERCISES.find((e) => e.key === key);
    if (!exercise) return;
    const num = value === "" ? null : Math.max(0, Math.min(exercise.maxScore, Number(value)));
    setAllScores((prev) => prev.map((s, i) => (i === clientIdx ? { ...s, [key]: num } : s)));
  };

  const handleSubmitAll = () => {
    const entries: ShooterLogEntry[] = clients.map((c, i) => {
      const scores = allScores[i];
      const total = calcTotal(scores, totalExercise.includeInTotal!);
      return {
        clientId: c.id,
        rounds: 50,
        distance: 7,
        grouping: scores["static_15"] ?? 0,
        accuracy: scores["static_improve_20"] ?? 0,
        safetyScore: scores["positions_30"] ?? 0,
        weaponHandling: scores["cover_15"] ?? 0,
        notes: notes[i],
        pass: total >= totalExercise.maxScore * 0.6,
      };
    });
    setSubmitted(true);
    onSubmitAll(entries);
  };

  if (submitted) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="w-9 h-9 rounded-lg border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)]">
            <ArrowRight className="w-5 h-5" />
          </button>
          <h2 className="text-sm font-bold">דו״ח מקצים</h2>
        </div>
        <div className="text-center py-12">
          <CheckCircle className="w-16 h-16 text-[var(--accent-green)] mx-auto mb-4" />
          <h3 className="text-lg font-bold mb-1">כל הדו״חות נשמרו!</h3>
          <p className="text-sm text-[var(--text-muted)]">{clients.length} דו״חות מקצים נשמרו במערכת</p>
          <button onClick={onBack} className="mt-6 px-6 py-2.5 rounded-lg bg-[var(--accent-green)] text-[var(--bg-primary)] text-sm font-semibold">
            חזרה לאימון
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="w-9 h-9 rounded-lg border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)]">
          <ArrowRight className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-sm font-bold flex items-center gap-2">
            <Target className="w-4 h-4 text-[var(--accent-amber)]" />
            דו״ח מקצים
          </h2>
          <p className="text-[10px] text-[var(--text-muted)]">{clients.length} יורים · סמן כמות פגיעות לכל מקצה</p>
        </div>
      </div>

      {/* Scrollable table */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[11px]" dir="rtl">
            {/* Header */}
            <thead>
              <tr className="bg-[var(--bg-elevated)]">
                <th className="sticky right-0 z-10 bg-[var(--bg-elevated)] px-3 py-2 text-right font-semibold whitespace-nowrap border-l border-[var(--border-subtle)]">
                  שם מלא
                </th>
                {EXERCISES.filter((e) => !e.isTotal && e.key !== "shooting_test").map((ex) => (
                  <th key={ex.key} className="px-2 py-2 text-center font-medium whitespace-nowrap">
                    <div>{ex.name}</div>
                    <div className="text-[9px] text-[var(--text-muted)] font-normal">({ex.maxScore} כדורים)</div>
                  </th>
                ))}
                <th className="px-2 py-2 text-center font-bold whitespace-nowrap bg-[var(--accent-green)]/5">
                  <div>{totalExercise.name}</div>
                  <div className="text-[9px] text-[var(--text-muted)] font-normal">מתוך {totalExercise.maxScore}</div>
                </th>
                <th className="px-2 py-2 text-center font-medium whitespace-nowrap">
                  <div>{testExercise.name}</div>
                  <div className="text-[9px] text-[var(--text-muted)] font-normal">({testExercise.maxScore} כדורים)</div>
                </th>
                <th className="px-2 py-2 text-center font-medium whitespace-nowrap">הערות</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {clients.map((client, idx) => {
                const scores = allScores[idx];
                const total = calcTotal(scores, totalExercise.includeInTotal!);
                const totalColor = total > 0 ? scoreColor(total, totalExercise.maxScore) : "var(--text-muted)";

                return (
                  <tr key={client.id} className="border-t border-[var(--border-subtle)] hover:bg-[var(--bg-elevated)]/30">
                    {/* Name - sticky */}
                    <td className="sticky right-0 z-10 bg-[var(--bg-card)] px-3 py-2 border-l border-[var(--border-subtle)]">
                      <p className="font-semibold whitespace-nowrap">{client.name}</p>
                      <p className="text-[9px] text-[var(--text-muted)]">{client.weaponType}</p>
                    </td>

                    {/* Exercise scores */}
                    {EXERCISES.filter((e) => !e.isTotal && e.key !== "shooting_test").map((ex) => (
                      <td key={ex.key} className="px-1 py-1.5 text-center">
                        <input
                          type="number"
                          min={0}
                          max={ex.maxScore}
                          value={scores[ex.key] ?? ""}
                          onChange={(e) => updateScore(idx, ex.key, e.target.value)}
                          placeholder="—"
                          className="w-12 h-8 text-center rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs font-medium placeholder:text-[var(--text-muted)]"
                          style={{ fontFamily: "var(--font-rubik)" }}
                        />
                      </td>
                    ))}

                    {/* Total */}
                    <td className="px-2 py-1.5 text-center bg-[var(--accent-green)]/5">
                      <span className="text-sm font-bold" style={{ fontFamily: "var(--font-rubik)", color: totalColor }}>
                        {total > 0 ? total : "—"}
                      </span>
                      <span className="text-[9px] text-[var(--text-muted)]">/{totalExercise.maxScore}</span>
                    </td>

                    {/* Shooting test */}
                    <td className="px-1 py-1.5 text-center">
                      <input
                        type="number"
                        min={0}
                        max={testExercise.maxScore}
                        value={scores["shooting_test"] ?? ""}
                        onChange={(e) => updateScore(idx, "shooting_test", e.target.value)}
                        placeholder="—"
                        className="w-12 h-8 text-center rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs font-medium placeholder:text-[var(--text-muted)]"
                        style={{ fontFamily: "var(--font-rubik)" }}
                      />
                    </td>

                    {/* Notes */}
                    <td className="px-1 py-1.5">
                      <input
                        type="text"
                        value={notes[idx]}
                        onChange={(e) => setNotes((prev) => prev.map((n, i) => (i === idx ? e.target.value : n)))}
                        placeholder="—"
                        className="w-20 h-8 px-2 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[10px] placeholder:text-[var(--text-muted)]"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 text-[9px] text-[var(--text-muted)]">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[var(--accent-green)]" /> ≥80% פגיעות</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[var(--accent-amber)]" /> ≥60% פגיעות</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{ background: "var(--text-muted)" }} /> &lt;60% פגיעות</span>
      </div>

      {/* Submit */}
      <button onClick={handleSubmitAll} className="w-full py-3 rounded-xl bg-[var(--accent-green)] text-[var(--bg-primary)] text-sm font-bold">
        שמור דו״חות מקצים ({clients.length})
      </button>
    </div>
  );
}
