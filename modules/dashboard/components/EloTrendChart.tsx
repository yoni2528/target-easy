"use client";

import { Crosshair, GraduationCap, TrendingUp } from "lucide-react";

const shootingData = [1780, 1790, 1802, 1810, 1825, 1830, 1835, 1840, 1842, 1845, 1847, 1847];
const instructionData = [1710, 1720, 1725, 1730, 1740, 1745, 1750, 1758, 1765, 1770, 1775, 1780];

export function EloTrendChart() {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4">
      <h3 className="text-sm font-semibold flex items-center gap-2">
        <TrendingUp className="w-4 h-4 text-[var(--accent-amber)]" />
        מגמת דירוג ELO
      </h3>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-2 text-[10px]">
        <span className="flex items-center gap-1 text-[var(--accent-amber)]">
          <Crosshair className="w-3 h-3" /> ירי (1,847)
        </span>
        <span className="flex items-center gap-1 text-[var(--accent-blue)]">
          <GraduationCap className="w-3 h-3" /> הדרכה (1,780)
        </span>
      </div>

      {/* Shooting chart */}
      <div className="h-20 mt-3 flex items-end gap-1">
        {shootingData.map((v, i) => (
          <div key={`s-${i}`} className="flex-1 rounded-t transition-all" style={{
            height: `${((v - 1770) / 80) * 100}%`,
            background: i === shootingData.length - 1 ? "var(--accent-amber)" : "var(--accent-amber)",
            opacity: i === shootingData.length - 1 ? 1 : 0.3,
          }} />
        ))}
      </div>

      {/* Instruction chart */}
      <div className="h-20 mt-2 flex items-end gap-1">
        {instructionData.map((v, i) => (
          <div key={`i-${i}`} className="flex-1 rounded-t transition-all" style={{
            height: `${((v - 1700) / 90) * 100}%`,
            background: i === instructionData.length - 1 ? "var(--accent-blue)" : "var(--accent-blue)",
            opacity: i === instructionData.length - 1 ? 1 : 0.3,
          }} />
        ))}
      </div>

      <div className="flex justify-between text-[10px] text-[var(--text-muted)] mt-1">
        <span>ינואר</span>
        <span>פברואר</span>
      </div>
    </div>
  );
}
