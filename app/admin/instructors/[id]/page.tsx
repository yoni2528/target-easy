"use client";

import { use, useState } from "react";
import { AuthGuard } from "@/modules/auth";
import { MOCK_INSTRUCTORS } from "@/modules/instructors";
import Link from "next/link";
import { ArrowRight, Save, CheckCircle, Trash2, Plus, Camera } from "lucide-react";

export default function AdminInstructorEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const instructor = MOCK_INSTRUCTORS.find((i) => i.id === id);
  const [saved, setSaved] = useState(false);

  if (!instructor) {
    return <div className="min-h-screen flex items-center justify-center text-[var(--text-muted)]">מדריך לא נמצא</div>;
  }

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

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
            <button onClick={handleSave} className="h-8 px-3 rounded-lg bg-[var(--accent-green)] text-[var(--bg-primary)] text-xs font-semibold flex items-center gap-1.5">
              {saved ? <CheckCircle className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
              {saved ? "נשמר!" : "שמור"}
            </button>
          </div>
        </header>

        <div className="px-4 pt-6 max-w-3xl mx-auto space-y-5">
          {/* Profile photo */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <img src={instructor.photo} alt={instructor.name} className="w-16 h-16 rounded-xl object-cover border-2 border-[var(--border-subtle)]" />
              <button className="absolute -bottom-1 -left-1 w-6 h-6 rounded-full bg-[var(--accent-green)] text-[var(--bg-primary)] flex items-center justify-center">
                <Camera className="w-3 h-3" />
              </button>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold">{instructor.name}</span>
                {instructor.verified && <CheckCircle className="w-3.5 h-3.5 text-[var(--accent-green)]" />}
              </div>
              <p className="text-[10px] text-[var(--text-muted)]">ID: {instructor.id}</p>
            </div>
          </div>

          {/* Basic info */}
          <section className="space-y-3">
            <h3 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">פרטים בסיסיים</h3>
            {[
              { label: "שם מלא", value: instructor.name },
              { label: "עיר", value: instructor.city },
              { label: "מחיר התחלתי (₪)", value: String(instructor.priceFrom) },
              { label: "ניסיון (שנים)", value: String(instructor.experience) },
            ].map((field) => (
              <div key={field.label}>
                <label className="text-xs text-[var(--text-muted)] mb-1 block">{field.label}</label>
                <input type="text" defaultValue={field.value}
                  className="w-full h-11 px-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-green)]/50 transition-colors" />
              </div>
            ))}
          </section>

          {/* ELO - admin can edit */}
          <section className="space-y-3">
            <h3 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">דירוג ELO</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-[var(--accent-amber)] mb-1 block">ELO ירי</label>
                <input type="number" defaultValue={instructor.eloShooting}
                  className="w-full h-11 px-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--accent-amber)]/30 text-sm text-[var(--accent-amber)] font-bold focus:outline-none focus:border-[var(--accent-amber)]/60 transition-colors" style={{ fontFamily: "var(--font-rubik)" }} />
              </div>
              <div>
                <label className="text-xs text-[var(--accent-blue)] mb-1 block">ELO הדרכה</label>
                <input type="number" defaultValue={instructor.eloInstruction}
                  className="w-full h-11 px-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--accent-blue)]/30 text-sm text-[var(--accent-blue)] font-bold focus:outline-none focus:border-[var(--accent-blue)]/60 transition-colors" style={{ fontFamily: "var(--font-rubik)" }} />
              </div>
            </div>
          </section>

          {/* Bio */}
          <section className="space-y-3">
            <h3 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">ביוגרפיה</h3>
            <textarea defaultValue={instructor.bio} rows={4}
              className="w-full px-3 py-2 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-green)]/50 transition-colors resize-none" />
          </section>

          {/* Training types */}
          <section className="space-y-3">
            <h3 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">סוגי אימון</h3>
            <div className="flex flex-wrap gap-2">
              {instructor.trainingTypes.map((t) => (
                <span key={t} className="px-3 py-1.5 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)] flex items-center gap-1.5">
                  {t}
                  <button className="text-[var(--text-muted)] hover:text-[var(--accent-red)]"><Trash2 className="w-3 h-3" /></button>
                </span>
              ))}
              <button className="px-3 py-1.5 rounded-lg border border-dashed border-[var(--border-default)] text-xs text-[var(--accent-green)] flex items-center gap-1">
                <Plus className="w-3 h-3" /> הוסף
              </button>
            </div>
          </section>

          {/* Gallery */}
          <section className="space-y-3">
            <h3 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">גלריה</h3>
            <div className="grid grid-cols-4 gap-2">
              {instructor.gallery.map((img, i) => (
                <div key={i} className="relative aspect-square rounded-lg overflow-hidden border border-[var(--border-subtle)]">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                  <button className="absolute top-1 left-1 w-5 h-5 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-[var(--accent-red)]">
                    <Trash2 className="w-2.5 h-2.5" />
                  </button>
                </div>
              ))}
              <button className="aspect-square rounded-lg border-2 border-dashed border-[var(--border-default)] flex items-center justify-center hover:border-[var(--accent-green)]/40 transition-colors">
                <Plus className="w-5 h-5 text-[var(--accent-green)]" />
              </button>
            </div>
          </section>

          {/* Verified toggle */}
          <section className="space-y-3">
            <h3 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">הגדרות</h3>
            <div className="flex items-center justify-between bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[var(--accent-green)]" />
                <span className="text-sm">מדריך מאומת</span>
              </div>
              <input type="checkbox" defaultChecked={instructor.verified} className="accent-[var(--accent-green)] w-4 h-4" />
            </div>
            <div className="flex items-center justify-between bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-3">
              <div>
                <span className="text-sm">זמין להזמנות</span>
                <p className="text-[10px] text-[var(--text-muted)]">האם המדריך מופיע בחיפוש</p>
              </div>
              <input type="checkbox" defaultChecked={instructor.available} className="accent-[var(--accent-green)] w-4 h-4" />
            </div>
          </section>
        </div>
      </div>
    </AuthGuard>
  );
}
