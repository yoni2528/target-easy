"use client";

import { use } from "react";
import { AuthGuard } from "@/modules/auth";
import { MOCK_INSTRUCTORS } from "@/modules/instructors";
import Link from "next/link";
import { ArrowRight, Save } from "lucide-react";

export default function AdminInstructorEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const instructor = MOCK_INSTRUCTORS.find((i) => i.id === id);

  if (!instructor) {
    return <div className="min-h-screen flex items-center justify-center text-[var(--text-muted)]">מדריך לא נמצא</div>;
  }

  return (
    <AuthGuard allowedRoles={["admin"]}>
      <div className="min-h-screen pb-8">
        <header className="sticky top-0 z-40 bg-[var(--bg-primary)]/90 backdrop-blur-xl border-b border-[var(--border-subtle)]">
          <div className="flex items-center justify-between px-4 h-14 max-w-3xl mx-auto">
            <div className="flex items-center gap-3">
              <Link href="/admin/instructors" className="w-9 h-9 rounded-lg border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)]">
                <ArrowRight className="w-5 h-5" />
              </Link>
              <h1 className="font-bold text-sm">עריכת מדריך - {instructor.name}</h1>
            </div>
            <button className="h-8 px-3 rounded-lg bg-[var(--accent-green)] text-[var(--bg-primary)] text-xs font-semibold flex items-center gap-1.5">
              <Save className="w-3.5 h-3.5" />
              שמור
            </button>
          </div>
        </header>

        <div className="px-4 pt-6 max-w-3xl mx-auto space-y-4">
          {[
            { label: "שם מלא", value: instructor.name },
            { label: "עיר", value: instructor.city },
            { label: "מחיר התחלתי (₪)", value: String(instructor.priceFrom) },
            { label: "ניסיון (שנים)", value: String(instructor.experience) },
            { label: "ELO ירי", value: String(instructor.eloShooting) },
            { label: "ELO הדרכה", value: String(instructor.eloInstruction) },
          ].map((field) => (
            <div key={field.label}>
              <label className="text-xs text-[var(--text-muted)] mb-1 block">{field.label}</label>
              <input
                type="text"
                defaultValue={field.value}
                className="w-full h-11 px-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-green)]/50 transition-colors"
              />
            </div>
          ))}

          <div>
            <label className="text-xs text-[var(--text-muted)] mb-1 block">ביוגרפיה</label>
            <textarea
              defaultValue={instructor.bio}
              rows={4}
              className="w-full px-3 py-2 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-green)]/50 transition-colors resize-none"
            />
          </div>

          <div className="p-3 rounded-xl border border-dashed border-[var(--border-default)] text-center">
            <p className="text-xs text-[var(--text-muted)]">ניהול תמונות, סרטונים ומטווחים - בקרוב</p>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
