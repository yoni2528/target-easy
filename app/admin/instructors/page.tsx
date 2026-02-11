"use client";

import { AuthGuard } from "@/modules/auth";
import { MOCK_INSTRUCTORS } from "@/modules/instructors";
import Link from "next/link";
import { ArrowRight, Plus, Edit, Trash2, CheckCircle, Shield } from "lucide-react";

export default function AdminInstructorsPage() {
  return (
    <AuthGuard allowedRoles={["admin"]}>
      <div className="min-h-screen pb-8">
        <header className="sticky top-0 z-40 bg-[var(--bg-primary)]/90 backdrop-blur-xl border-b border-[var(--border-subtle)]">
          <div className="flex items-center justify-between px-4 h-14 max-w-3xl mx-auto">
            <div className="flex items-center gap-3">
              <Link href="/admin" className="w-9 h-9 rounded-lg border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)]">
                <ArrowRight className="w-5 h-5" />
              </Link>
              <h1 className="font-bold text-sm">ניהול מדריכים</h1>
            </div>
            <button className="h-8 px-3 rounded-lg bg-[var(--accent-green)] text-[var(--bg-primary)] text-xs font-semibold flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5" />
              הוסף מדריך
            </button>
          </div>
        </header>

        <div className="px-4 pt-4 max-w-3xl mx-auto space-y-2">
          <p className="text-xs text-[var(--text-muted)] mb-3">{MOCK_INSTRUCTORS.length} מדריכים רשומים</p>
          {MOCK_INSTRUCTORS.map((inst) => (
            <div key={inst.id} className="flex items-center gap-3 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-3">
              <img src={inst.photo} alt={inst.name} className="w-10 h-10 rounded-lg object-cover" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold truncate">{inst.name}</span>
                  {inst.verified && <CheckCircle className="w-3.5 h-3.5 text-[var(--accent-green)] flex-shrink-0" />}
                </div>
                <div className="text-[10px] text-[var(--text-muted)]">
                  {inst.city} · ירי {inst.eloShooting} · הדרכה {inst.eloInstruction}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Link href={`/admin/instructors/${inst.id}`} className="w-8 h-8 rounded-lg border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--accent-blue)] transition-colors">
                  <Edit className="w-3.5 h-3.5" />
                </Link>
                <button className="w-8 h-8 rounded-lg border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--accent-red)] transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AuthGuard>
  );
}
