"use client";

import { Clock } from "lucide-react";

const mockSchedule = [
  { time: "09:00", trainee: "אבי מזרחי", type: "רענון" },
  { time: "11:00", trainee: "נועה לב", type: "מתחמש חדש" },
  { time: "14:00", trainee: "גיל עוז", type: "חידוש" },
  { time: "16:00", trainee: "תמר שמש", type: "רענון" },
];

export function ScheduleWidget() {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4">
      <h3 className="text-sm font-semibold flex items-center gap-2 mb-3">
        <Clock className="w-4 h-4 text-[var(--accent-green)]" />
        לוח הזמנים - היום
      </h3>
      <div className="space-y-2">
        {mockSchedule.map((s) => (
          <div key={s.time} className="flex items-center justify-between py-2 border-b border-[var(--border-subtle)] last:border-0">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-[var(--accent-green)]" style={{ fontFamily: "var(--font-rubik)" }}>{s.time}</span>
              <span className="text-sm">{s.trainee}</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-md bg-[var(--bg-elevated)] text-[var(--text-muted)]">{s.type}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
