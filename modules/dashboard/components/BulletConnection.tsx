"use client";

import { Zap, ExternalLink } from "lucide-react";

export function BulletConnection() {
  return (
    <div className="bg-[var(--bg-card)] border border-dashed border-[var(--accent-amber)]/30 rounded-xl p-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-[var(--accent-amber)]/10 flex items-center justify-center flex-shrink-0">
          <Zap className="w-5 h-5 text-[var(--accent-amber)]" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            חיבור למערכת Bullet
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]">בקרוב</span>
          </h3>
          <p className="text-[10px] text-[var(--text-muted)] mt-0.5">
            סנכרן את דירוגי ELO, תוצאות אימונים ונתוני ביצוע ישירות ממערכת Bullet
          </p>
        </div>
        <button className="h-8 px-3 rounded-lg border border-[var(--accent-amber)]/30 text-[10px] font-medium text-[var(--accent-amber)] flex items-center gap-1 opacity-50 cursor-not-allowed">
          <ExternalLink className="w-3 h-3" />
          חבר
        </button>
      </div>
    </div>
  );
}
