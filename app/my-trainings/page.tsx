"use client";

import { CalendarDays, Clock, MapPin } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";

const mockTrainings = [
  { id: "1", instructor: "דוד כהן", date: "12/02/2026", time: "14:00", range: "מטווח השרון", type: "רענון", status: "upcoming" },
  { id: "2", instructor: "מיכל אברהם", date: "05/02/2026", time: "09:00", range: "מטווח תל אביב", type: "מתחמש חדש", status: "completed" },
  { id: "3", instructor: "רון מלכה", date: "28/01/2026", time: "11:00", range: "מטווח באר שבע", type: "חידוש", status: "completed" },
];

export default function MyTrainingsPage() {
  return (
    <div className="min-h-screen pb-20">
      <header className="sticky top-0 z-40 bg-[var(--bg-primary)]/90 backdrop-blur-xl border-b border-[var(--border-subtle)]">
        <div className="flex items-center px-4 h-14 max-w-2xl mx-auto">
          <h1 className="font-bold">האימונים שלי</h1>
        </div>
      </header>

      <div className="px-4 pt-6 max-w-2xl mx-auto space-y-3">
        {mockTrainings.map((t) => (
          <div key={t.id} className={`bg-[var(--bg-card)] border rounded-xl p-4 ${
            t.status === "upcoming" ? "border-[var(--accent-green)]/30" : "border-[var(--border-subtle)]"
          }`}>
            {t.status === "upcoming" && (
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[var(--accent-green)]/10 text-[var(--accent-green)] mb-2 inline-block">
                קרוב
              </span>
            )}
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm">{t.instructor}</h3>
              <span className="text-xs text-[var(--text-muted)]">{t.type}</span>
            </div>
            <div className="flex items-center gap-4 mt-2 text-xs text-[var(--text-muted)]">
              <span className="flex items-center gap-1"><CalendarDays className="w-3.5 h-3.5" />{t.date}</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{t.time}</span>
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{t.range}</span>
            </div>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
