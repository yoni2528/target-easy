"use client";

import { useState, useMemo } from "react";
import { TrendingUp, TrendingDown, Users } from "lucide-react";
import { MOCK_RATING_HISTORY } from "../lib/mock-ratings";

const MONTHS_HE = ["ינו", "פבר", "מרץ", "אפר", "מאי", "יונ", "יול", "אוג", "ספט", "אוק", "נוב", "דצמ"];
const MONTHS_EN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const INSTRUCTOR_COLORS: Record<string, string> = {
  "1": "#4ade80",
  "2": "#60a5fa",
  "3": "#fbbf24",
  "5": "#a78bfa",
  "9": "#f87171",
};

const INSTRUCTOR_NAMES: Record<string, string> = {
  "1": "דוד כהן",
  "2": "מיכל אברהם",
  "3": "אלון ברק",
  "5": "יונתן שמש",
  "9": "לימור דיין",
};

interface Props {
  lang: "he" | "en";
}

export function RetentionTrendChart({ lang }: Props) {
  const isHe = lang === "he";
  const [selected, setSelected] = useState<string | null>(null);

  const instructorIds = useMemo(() => {
    const ids = new Set<string>();
    MOCK_RATING_HISTORY.forEach((h) => ids.add(h.instructorId));
    return Array.from(ids);
  }, []);

  const months = useMemo(() => {
    const all = new Set<string>();
    MOCK_RATING_HISTORY.forEach((h) => all.add(h.month));
    return Array.from(all).sort();
  }, []);

  const getMonthLabel = (m: string) => {
    const [, month] = m.split("-");
    const idx = parseInt(month) - 1;
    return isHe ? MONTHS_HE[idx] : MONTHS_EN[idx];
  };

  const getRetention = (instructorId: string, month: string) => {
    return MOCK_RATING_HISTORY.find((h) => h.instructorId === instructorId && h.month === month)?.retentionRate ?? null;
  };

  const visibleIds = selected ? [selected] : instructorIds;

  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4">
      <h3 className="text-sm font-semibold flex items-center gap-2 mb-3">
        <Users className="w-4 h-4 text-[var(--accent-blue)]" />
        {isHe ? "מגמת שימור לקוחות" : "Client Retention Trend"}
      </h3>

      {/* Legend / filter */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {instructorIds.map((id) => (
          <button
            key={id}
            onClick={() => setSelected(selected === id ? null : id)}
            className={`text-[9px] font-medium px-2 py-0.5 rounded-full border transition-colors ${
              !selected || selected === id
                ? "border-transparent"
                : "border-[var(--border-subtle)] opacity-40"
            }`}
            style={{ background: `${INSTRUCTOR_COLORS[id]}20`, color: INSTRUCTOR_COLORS[id] }}
          >
            {INSTRUCTOR_NAMES[id]}
          </button>
        ))}
      </div>

      {/* Chart area */}
      <div className="relative h-32">
        {/* Y-axis labels */}
        <div className="absolute top-0 left-0 h-full flex flex-col justify-between text-[8px] text-[var(--text-muted)]" style={{ fontFamily: "var(--font-rubik)" }}>
          <span>100%</span>
          <span>75%</span>
          <span>50%</span>
        </div>

        {/* Chart */}
        <div className="mr-0 ml-7 h-full relative">
          {/* Grid lines */}
          {[100, 75, 50].map((v) => (
            <div key={v} className="absolute w-full border-t border-[var(--border-subtle)]/30" style={{ top: `${100 - v}%` }} />
          ))}

          {/* Lines */}
          <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 ${(months.length - 1) * 100} 100`} preserveAspectRatio="none">
            {visibleIds.map((id) => {
              const points = months.map((m, i) => {
                const ret = getRetention(id, m);
                if (ret === null) return null;
                return { x: i * 100, y: 100 - ret * 100 };
              }).filter(Boolean) as { x: number; y: number }[];

              const d = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
              return (
                <path key={id} d={d} fill="none" stroke={INSTRUCTOR_COLORS[id]} strokeWidth="2" vectorEffect="non-scaling-stroke" />
              );
            })}
          </svg>
        </div>
      </div>

      {/* X-axis */}
      <div className="flex justify-between mr-0 ml-7 mt-1">
        {months.map((m) => (
          <span key={m} className="text-[8px] text-[var(--text-muted)]">{getMonthLabel(m)}</span>
        ))}
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 gap-2 mt-4">
        <div className="bg-[var(--bg-elevated)] rounded-lg p-2 flex items-center gap-2">
          <TrendingUp className="w-3.5 h-3.5 text-[var(--accent-green)]" />
          <div>
            <p className="text-[10px] text-[var(--text-muted)]">{isHe ? "שיפור מרבי" : "Most Improved"}</p>
            <p className="text-[11px] font-bold">אלון ברק (96%)</p>
          </div>
        </div>
        <div className="bg-[var(--bg-elevated)] rounded-lg p-2 flex items-center gap-2">
          <TrendingDown className="w-3.5 h-3.5 text-[var(--accent-red)]" />
          <div>
            <p className="text-[10px] text-[var(--text-muted)]">{isHe ? "ירידה מרבית" : "Most Declined"}</p>
            <p className="text-[11px] font-bold">לימור דיין (62%)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
