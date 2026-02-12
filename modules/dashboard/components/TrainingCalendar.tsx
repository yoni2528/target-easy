"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Users, MapPin, Clock, ChevronDown } from "lucide-react";
import { MOCK_TRAININGS } from "../lib/mock-trainings";
import type { ScheduledTraining } from "../types";

const HEBREW_MONTHS = ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"];
const HEBREW_DAYS = ["א׳", "ב׳", "ג׳", "ד׳", "ה׳", "ו׳", "ש׳"];

interface TrainingCalendarProps {
  onSelectTraining: (training: ScheduledTraining) => void;
}

export function TrainingCalendar({ onSelectTraining }: TrainingCalendarProps) {
  const [viewMonth, setViewMonth] = useState(() => new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const trainingsByDate = useMemo(() => {
    const map: Record<string, ScheduledTraining[]> = {};
    MOCK_TRAININGS.forEach((t) => {
      if (!map[t.date]) map[t.date] = [];
      map[t.date].push(t);
    });
    return map;
  }, []);

  const daysInMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 0).getDate();
  const firstDayOfWeek = viewMonth.getDay();

  const formatDate = (day: number) => {
    const m = String(viewMonth.getMonth() + 1).padStart(2, "0");
    const d = String(day).padStart(2, "0");
    return `${viewMonth.getFullYear()}-${m}-${d}`;
  };

  const isToday = (day: number) => {
    const date = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), day);
    return date.getTime() === today.getTime();
  };

  const selectedTrainings = selectedDate ? (trainingsByDate[selectedDate] || []) : [];

  const statusColor = (s: ScheduledTraining["status"]) => {
    switch (s) {
      case "completed": return "var(--text-muted)";
      case "in-progress": return "var(--accent-amber)";
      case "upcoming": return "var(--accent-green)";
    }
  };

  const statusLabel = (s: ScheduledTraining["status"]) => {
    switch (s) {
      case "completed": return "הושלם";
      case "in-progress": return "בתהליך";
      case "upcoming": return "קרוב";
    }
  };

  return (
    <div className="space-y-4">
      {/* Calendar */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-4">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1))} className="w-8 h-8 rounded-lg border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)]">
            <ChevronRight className="w-4 h-4" />
          </button>
          <h3 className="text-sm font-bold">{HEBREW_MONTHS[viewMonth.getMonth()]} {viewMonth.getFullYear()}</h3>
          <button onClick={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1))} className="w-8 h-8 rounded-lg border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)]">
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {HEBREW_DAYS.map((d) => (
            <div key={d} className="text-center text-[10px] font-medium text-[var(--text-muted)] py-1">{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDayOfWeek }).map((_, i) => <div key={`e-${i}`} />)}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dateStr = formatDate(day);
            const dayTrainings = trainingsByDate[dateStr] || [];
            const hasTrainings = dayTrainings.length > 0;
            const selected = selectedDate === dateStr;
            const todayDay = isToday(day);
            const totalClients = dayTrainings.reduce((s, t) => s + t.clients.length, 0);

            return (
              <button
                key={day}
                onClick={() => setSelectedDate(selected ? null : dateStr)}
                className={`relative flex flex-col items-center justify-center h-14 rounded-lg transition-all text-sm ${
                  selected
                    ? "bg-[var(--accent-green)] text-[var(--bg-primary)] font-bold"
                    : todayDay
                    ? "border-2 border-[var(--accent-green)]/40 text-[var(--text-primary)] font-semibold"
                    : "text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)]"
                }`}
                style={{ fontFamily: "var(--font-rubik)" }}
              >
                <span>{day}</span>
                {hasTrainings && (
                  <div className="flex gap-0.5 mt-0.5">
                    {dayTrainings.length <= 3 ? (
                      dayTrainings.map((t, idx) => (
                        <div key={idx} className="w-1.5 h-1.5 rounded-full" style={{ background: selected ? "var(--bg-primary)" : statusColor(t.status) }} />
                      ))
                    ) : (
                      <span className={`text-[8px] font-bold ${selected ? "text-[var(--bg-primary)]" : "text-[var(--accent-green)]"}`}>
                        {dayTrainings.length}
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-center gap-4 mt-3 text-[10px] text-[var(--text-muted)]">
          <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[var(--accent-green)]" /> קרוב</span>
          <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[var(--accent-amber)]" /> בתהליך</span>
          <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[var(--text-muted)]" /> הושלם</span>
        </div>
      </div>

      {/* Day's trainings */}
      {selectedDate && (
        <div className="space-y-2">
          <p className="text-xs text-[var(--text-muted)]">
            {selectedTrainings.length > 0
              ? `${selectedTrainings.length} אימונים · ${selectedTrainings.reduce((s, t) => s + t.clients.length, 0)} לקוחות`
              : "אין אימונים ביום זה"}
          </p>
          {selectedTrainings.map((training) => (
            <button
              key={training.id}
              onClick={() => onSelectTraining(training)}
              className="w-full bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-3 hover:border-[var(--accent-green)]/30 transition-colors text-right"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[var(--accent-green)]" />
                  <span className="text-sm font-bold" style={{ fontFamily: "var(--font-rubik)" }}>{training.time}</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-md" style={{ background: `color-mix(in srgb, ${statusColor(training.status)} 15%, transparent)`, color: statusColor(training.status) }}>
                  {statusLabel(training.status)}
                </span>
              </div>
              <div className="flex items-center gap-3 mt-2 text-[11px] text-[var(--text-secondary)]">
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {training.range}</span>
                <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {training.clients.length} לקוחות</span>
              </div>
              <div className="mt-1.5">
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-[var(--bg-elevated)] text-[var(--text-muted)]">{training.trainingType}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
