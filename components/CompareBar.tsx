"use client";

import { GitCompareArrows, X } from "lucide-react";
import Link from "next/link";
import { useCompareStore } from "@/modules/instructors/lib/compare-store";
import { MOCK_INSTRUCTORS } from "@/modules/instructors";

export function CompareBar() {
  const { selected, clear } = useCompareStore();

  if (selected.length === 0) return null;

  const instructors = selected.map((id) => MOCK_INSTRUCTORS.find((i) => i.id === id)).filter(Boolean);
  const canCompare = selected.length >= 2;
  const params = selected.map((id, i) => `${String.fromCharCode(97 + i)}=${id}`).join("&");

  return (
    <div className="fixed bottom-20 left-3 right-3 z-50 bg-[var(--bg-card)]/95 backdrop-blur-xl border border-[var(--accent-blue)]/30 rounded-xl shadow-lg shadow-black/20 p-3">
      <div className="flex items-center gap-3 max-w-lg mx-auto">
        {/* Avatars */}
        <div className="flex items-center gap-1">
          {instructors.map((inst) => (
            <img key={inst!.id} src={inst!.photo} alt={inst!.name} className="w-7 h-7 rounded-full object-cover border border-[var(--accent-blue)]/30" />
          ))}
          {selected.length < 2 && (
            <div className="w-7 h-7 rounded-full border border-dashed border-[var(--text-muted)] flex items-center justify-center">
              <span className="text-[9px] text-[var(--text-muted)]">?</span>
            </div>
          )}
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-semibold truncate">
            {instructors.map((i) => i!.name).join(" · ")}
          </p>
          <p className="text-[9px] text-[var(--text-muted)]">
            {canCompare ? `${selected.length} מדריכים · לחץ להשוואה` : `בחר עוד ${2 - selected.length === 1 ? "מדריך" : "מדריכים"}`}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5">
          {canCompare && (
            <Link href={`/compare?${params}`}
              className="h-8 px-3 rounded-lg bg-[var(--accent-blue)] text-[var(--bg-primary)] text-xs font-bold flex items-center gap-1.5">
              <GitCompareArrows className="w-3.5 h-3.5" />
              השווה
            </Link>
          )}
          <button onClick={clear} className="w-8 h-8 rounded-lg border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)]">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
