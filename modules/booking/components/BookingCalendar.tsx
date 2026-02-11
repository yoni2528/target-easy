"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HEBREW_MONTHS = ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"];
const HEBREW_DAYS = ["א׳", "ב׳", "ג׳", "ד׳", "ה׳", "ו׳", "ש׳"];

interface BookingCalendarProps {
  selectedDate: string | null;
  onSelect: (date: string) => void;
  availability?: Record<string, number>;
}

export function BookingCalendar({ selectedDate, onSelect, availability = {} }: BookingCalendarProps) {
  const [viewMonth, setViewMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const daysInMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 0).getDate();
  const firstDayOfWeek = viewMonth.getDay();

  const prevMonth = () => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1));
  const nextMonth = () => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1));

  const formatDate = (day: number) => {
    const m = String(viewMonth.getMonth() + 1).padStart(2, "0");
    const d = String(day).padStart(2, "0");
    return `${viewMonth.getFullYear()}-${m}-${d}`;
  };

  const isToday = (day: number) => {
    const date = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), day);
    return date.getTime() === today.getTime();
  };

  const isPast = (day: number) => {
    const date = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), day);
    return date < today;
  };

  const getAvailability = (day: number): number => {
    return availability[formatDate(day)] ?? 0;
  };

  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-4">
      {/* Month navigation */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={nextMonth} className="w-8 h-8 rounded-lg border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
          <ChevronRight className="w-4 h-4" />
        </button>
        <h3 className="text-sm font-bold">
          {HEBREW_MONTHS[viewMonth.getMonth()]} {viewMonth.getFullYear()}
        </h3>
        <button onClick={prevMonth} className="w-8 h-8 rounded-lg border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {HEBREW_DAYS.map((day) => (
          <div key={day} className="text-center text-[10px] font-medium text-[var(--text-muted)] py-1">{day}</div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-1">
        {/* Empty cells for offset */}
        {Array.from({ length: firstDayOfWeek }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {/* Day cells */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const dateStr = formatDate(day);
          const past = isPast(day);
          const todayDay = isToday(day);
          const selected = selectedDate === dateStr;
          const avail = getAvailability(day);
          const isFriday = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), day).getDay() === 5;
          const isSaturday = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), day).getDay() === 6;
          const disabled = past || isSaturday;

          return (
            <button
              key={day}
              disabled={disabled}
              onClick={() => onSelect(dateStr)}
              className={`relative flex flex-col items-center justify-center h-12 rounded-lg transition-all text-sm ${
                selected
                  ? "bg-[var(--accent-green)] text-[var(--bg-primary)] font-bold shadow-[0_0_15px_rgba(74,222,128,0.2)]"
                  : disabled
                  ? "text-[var(--text-muted)]/30 cursor-not-allowed"
                  : todayDay
                  ? "border-2 border-[var(--accent-green)]/40 text-[var(--text-primary)] font-semibold"
                  : "text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)]"
              }`}
              style={{ fontFamily: "var(--font-rubik)" }}
            >
              <span>{day}</span>
              {!disabled && avail > 0 && !selected && (
                <span className="text-[8px] text-[var(--accent-green)]">{avail} פנויים</span>
              )}
              {!disabled && avail === 0 && !past && !selected && (
                <span className="text-[8px] text-[var(--accent-red)]/60">מלא</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-3 text-[10px] text-[var(--text-muted)]">
        <span className="flex items-center gap-1">
          <div className="w-3 h-3 rounded border-2 border-[var(--accent-green)]/40" /> היום
        </span>
        <span className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-[var(--accent-green)]" /> נבחר
        </span>
        <span className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-[var(--accent-red)]/10" /> מלא
        </span>
      </div>
    </div>
  );
}
