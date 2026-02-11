"use client";

import { useState } from "react";
import { AuthGuard } from "@/modules/auth";
import { MOCK_INSTRUCTORS } from "@/modules/instructors";
import Link from "next/link";
import { ArrowRight, Plus, Edit, Trash2, CheckCircle, X, AlertTriangle, Search } from "lucide-react";

export default function AdminInstructorsPage() {
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const filtered = search
    ? MOCK_INSTRUCTORS.filter((i) => i.name.includes(search) || i.city.includes(search))
    : MOCK_INSTRUCTORS;

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
            <button onClick={() => setShowAdd(true)} className="h-8 px-3 rounded-lg bg-[var(--accent-green)] text-[var(--bg-primary)] text-xs font-semibold flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5" /> הוסף מדריך
            </button>
          </div>
        </header>

        <div className="px-4 pt-4 max-w-3xl mx-auto space-y-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="חפש מדריך..."
              className="w-full h-10 pr-9 pl-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-green)]/50 transition-colors" />
          </div>

          <p className="text-xs text-[var(--text-muted)]">{filtered.length} מדריכים</p>

          {filtered.map((inst) => (
            <div key={inst.id} className="flex items-center gap-3 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-3">
              <img src={inst.photo} alt={inst.name} className="w-10 h-10 rounded-lg object-cover" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold truncate">{inst.name}</span>
                  {inst.verified && <CheckCircle className="w-3.5 h-3.5 text-[var(--accent-green)] flex-shrink-0" />}
                </div>
                <div className="text-[10px] text-[var(--text-muted)]">
                  {inst.city} · ירי {inst.eloShooting} · הדרכה {inst.eloInstruction} · ₪{inst.priceFrom}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Link href={`/admin/instructors/${inst.id}`} className="w-8 h-8 rounded-lg border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--accent-blue)] transition-colors">
                  <Edit className="w-3.5 h-3.5" />
                </Link>
                <button onClick={() => setDeleteTarget(inst.id)} className="w-8 h-8 rounded-lg border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--accent-red)] transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Delete confirmation modal */}
        {deleteTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <div className="w-full max-w-sm bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-5 text-center">
              <AlertTriangle className="w-10 h-10 text-[var(--accent-amber)] mx-auto mb-3" />
              <h3 className="text-sm font-bold mb-1">מחיקת מדריך</h3>
              <p className="text-xs text-[var(--text-muted)] mb-4">
                האם אתה בטוח שברצונך למחוק את {MOCK_INSTRUCTORS.find((i) => i.id === deleteTarget)?.name}?<br />
                פעולה זו לא ניתנת לביטול.
              </p>
              <div className="flex gap-2">
                <button onClick={() => setDeleteTarget(null)} className="flex-1 h-10 rounded-xl border border-[var(--border-default)] text-sm text-[var(--text-secondary)] font-medium">
                  ביטול
                </button>
                <button onClick={() => setDeleteTarget(null)} className="flex-1 h-10 rounded-xl bg-[var(--accent-red)] text-white text-sm font-bold flex items-center justify-center gap-1.5">
                  <Trash2 className="w-3.5 h-3.5" /> מחק
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add instructor modal */}
        {showAdd && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <div className="w-full max-w-md bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-5 max-h-[85vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold">הוספת מדריך חדש</h3>
                <button onClick={() => setShowAdd(false)} className="w-8 h-8 rounded-lg border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)]">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                {[
                  { label: "שם מלא", placeholder: "שם המדריך" },
                  { label: "עיר", placeholder: "עיר מגורים" },
                  { label: "טלפון", placeholder: "050-1234567" },
                  { label: "מחיר התחלתי (₪)", placeholder: "200" },
                  { label: "ניסיון (שנים)", placeholder: "5" },
                ].map((f) => (
                  <div key={f.label}>
                    <label className="text-xs text-[var(--text-muted)] mb-1 block">{f.label}</label>
                    <input type="text" placeholder={f.placeholder}
                      className="w-full h-10 px-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-green)]/50 transition-colors" />
                  </div>
                ))}
                <div>
                  <label className="text-xs text-[var(--text-muted)] mb-1 block">ביוגרפיה</label>
                  <textarea rows={3} placeholder="תיאור קצר"
                    className="w-full px-3 py-2 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-green)]/50 transition-colors resize-none" />
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <input type="checkbox" id="create-login" className="accent-[var(--accent-green)]" />
                  <label htmlFor="create-login" className="text-xs text-[var(--text-secondary)]">צור משתמש כניסה למדריך</label>
                </div>
                <button onClick={() => setShowAdd(false)} className="w-full h-10 rounded-xl bg-[var(--accent-green)] text-[var(--bg-primary)] font-bold text-sm flex items-center justify-center gap-1.5 mt-2">
                  <Plus className="w-4 h-4" /> הוסף מדריך
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AuthGuard>
  );
}
