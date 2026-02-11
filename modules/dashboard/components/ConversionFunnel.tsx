"use client";

import { BarChart3 } from "lucide-react";

const funnelData = [
  { label: "צפיות בעמוד", value: 1247, pct: 100, color: "var(--accent-blue)" },
  { label: "לחיצה על ׳קבע אימון׳", value: 89, pct: 7.1, color: "var(--accent-green)" },
  { label: "השלמת הזמנה", value: 34, pct: 2.7, color: "var(--accent-amber)" },
];

export function ConversionFunnel() {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4">
      <h3 className="text-sm font-semibold flex items-center gap-2 mb-3">
        <BarChart3 className="w-4 h-4 text-[var(--accent-green)]" />
        משפך המרה
      </h3>
      <div className="space-y-3">
        {funnelData.map((item, i) => (
          <div key={item.label}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[var(--text-secondary)]">{item.label}</span>
              <span className="font-bold" style={{ fontFamily: "var(--font-rubik)", color: item.color }}>
                {item.value.toLocaleString()} ({item.pct}%)
              </span>
            </div>
            <div className="h-2 rounded-full bg-[var(--bg-elevated)]">
              <div className="h-full rounded-full transition-all" style={{ width: `${item.pct}%`, background: item.color }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
