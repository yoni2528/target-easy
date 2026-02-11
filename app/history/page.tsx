"use client";

import { Clock, ArrowRight, Trash2 } from "lucide-react";
import Link from "next/link";
import { BottomNav } from "@/components/BottomNav";
import { useUserStore, MOCK_INSTRUCTORS, InstructorCard } from "@/modules/instructors";

export default function HistoryPage() {
  const history = useUserStore((s) => s.history);
  const clearHistory = useUserStore((s) => s.clearHistory);

  // Map history entries to instructors, preserving history order (most recent first)
  const historyInstructors = history
    .map((h) => MOCK_INSTRUCTORS.find((i) => i.id === h.id))
    .filter(Boolean) as typeof MOCK_INSTRUCTORS;

  return (
    <div className="min-h-screen pb-24">
      <header className="sticky top-0 z-40 bg-[var(--bg-primary)]/90 backdrop-blur-xl border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-3 px-4 h-14 max-w-2xl mx-auto">
          <Link href="/" className="w-9 h-9 rounded-lg border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)]">
            <ArrowRight className="w-5 h-5" />
          </Link>
          <h1 className="font-bold text-sm flex-1">היסטוריה</h1>
          {historyInstructors.length > 0 && (
            <button
              onClick={clearHistory}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-[var(--accent-red)]/20 text-[var(--accent-red)] hover:bg-[var(--accent-red)]/10 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              נקה היסטוריה
            </button>
          )}
        </div>
      </header>

      {historyInstructors.length === 0 ? (
        <div className="px-4 pt-12 max-w-2xl mx-auto text-center">
          <Clock className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-4" strokeWidth={1} />
          <h2 className="text-base font-bold mb-2">אין היסטוריה עדיין</h2>
          <p className="text-xs text-[var(--text-muted)] max-w-[250px] mx-auto">
            מדריכים שתצפו בהם יופיעו כאן
          </p>
        </div>
      ) : (
        <div className="px-4 pt-4 max-w-2xl mx-auto space-y-3">
          {historyInstructors.map((instructor, index) => (
            <InstructorCard key={instructor.id} instructor={instructor} index={index} />
          ))}
        </div>
      )}

      <BottomNav />
    </div>
  );
}
