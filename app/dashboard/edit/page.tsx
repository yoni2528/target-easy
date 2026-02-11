"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthGuard, useAuthStore } from "@/modules/auth";
import { MOCK_INSTRUCTORS } from "@/modules/instructors";
import { ArrowRight, Save, Camera, Plus, Trash2, CheckCircle, ExternalLink, Instagram } from "lucide-react";
import Link from "next/link";

function InstructorEditContent() {
  const user = useAuthStore((s) => s.user);
  const router = useRouter();
  const instructor = MOCK_INSTRUCTORS.find((i) => i.id === user?.instructorId);

  const [name, setName] = useState(instructor?.name ?? "");
  const [city, setCity] = useState(instructor?.city ?? "");
  const [bio, setBio] = useState(instructor?.bio ?? "");
  const [price, setPrice] = useState(String(instructor?.priceFrom ?? ""));
  const [phone, setPhone] = useState("050-1234567");
  const [saved, setSaved] = useState(false);

  if (!instructor) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 text-[var(--text-muted)]">
        <p className="text-sm">לא נמצא פרופיל מדריך מקושר</p>
        <Link href="/dashboard" className="text-xs text-[var(--accent-green)]">חזור לדשבורד</Link>
      </div>
    );
  }

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen pb-8">
      <header className="sticky top-0 z-40 bg-[var(--bg-primary)]/90 backdrop-blur-xl border-b border-[var(--border-subtle)]">
        <div className="flex items-center justify-between px-4 h-14 max-w-2xl mx-auto">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="w-9 h-9 rounded-lg border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)]">
              <ArrowRight className="w-5 h-5" />
            </Link>
            <h1 className="font-bold text-sm">עריכת הפרופיל שלי</h1>
          </div>
          <button onClick={handleSave} className="h-8 px-3 rounded-lg bg-[var(--accent-green)] text-[var(--bg-primary)] text-xs font-semibold flex items-center gap-1.5">
            {saved ? <CheckCircle className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
            {saved ? "נשמר!" : "שמור"}
          </button>
        </div>
      </header>

      <div className="px-4 pt-6 max-w-2xl mx-auto space-y-5">
        {/* Profile photo */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <img src={instructor.photo} alt={name} className="w-20 h-20 rounded-2xl object-cover border-2 border-[var(--border-subtle)]" />
            <button className="absolute -bottom-1 -left-1 w-7 h-7 rounded-full bg-[var(--accent-green)] text-[var(--bg-primary)] flex items-center justify-center shadow-lg">
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>
          <div>
            <p className="text-sm font-bold">{instructor.name}</p>
            <p className="text-[10px] text-[var(--text-muted)]">לחץ על התמונה להחלפה</p>
            <Link href={`/instructor/${instructor.id}`} className="text-[10px] text-[var(--accent-green)] flex items-center gap-1 mt-1">
              <ExternalLink className="w-3 h-3" /> צפה בדף הפומבי
            </Link>
          </div>
        </div>

        {/* Basic info */}
        <section className="space-y-3">
          <h3 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">פרטים בסיסיים</h3>
          <div>
            <label className="text-xs text-[var(--text-muted)] mb-1 block">שם מלא</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)}
              className="w-full h-11 px-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-green)]/50 transition-colors" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-[var(--text-muted)] mb-1 block">עיר</label>
              <input type="text" value={city} onChange={(e) => setCity(e.target.value)}
                className="w-full h-11 px-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-green)]/50 transition-colors" />
            </div>
            <div>
              <label className="text-xs text-[var(--text-muted)] mb-1 block">טלפון</label>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                className="w-full h-11 px-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-green)]/50 transition-colors" />
            </div>
          </div>
          <div>
            <label className="text-xs text-[var(--text-muted)] mb-1 block">מחיר התחלתי (₪)</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)}
              className="w-full h-11 px-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-green)]/50 transition-colors" />
          </div>
        </section>

        {/* Bio */}
        <section className="space-y-3">
          <h3 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">אודות</h3>
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={4}
            className="w-full px-3 py-2 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-green)]/50 transition-colors resize-none" />
        </section>

        {/* Training types */}
        <section className="space-y-3">
          <h3 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">סוגי אימון</h3>
          <div className="flex flex-wrap gap-2">
            {instructor.trainingTypes.map((t) => (
              <span key={t} className="px-3 py-1.5 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)] flex items-center gap-1.5">
                {t}
                <button className="text-[var(--text-muted)] hover:text-[var(--accent-red)] transition-colors">
                  <Trash2 className="w-3 h-3" />
                </button>
              </span>
            ))}
            <button className="px-3 py-1.5 rounded-lg border border-dashed border-[var(--border-default)] text-xs text-[var(--accent-green)] flex items-center gap-1">
              <Plus className="w-3 h-3" /> הוסף
            </button>
          </div>
        </section>

        {/* Ranges */}
        <section className="space-y-3">
          <h3 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">מטווחים</h3>
          <div className="flex flex-wrap gap-2">
            {instructor.ranges.map((r) => (
              <span key={r} className="px-3 py-1.5 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)] flex items-center gap-1.5">
                {r}
                <button className="text-[var(--text-muted)] hover:text-[var(--accent-red)] transition-colors">
                  <Trash2 className="w-3 h-3" />
                </button>
              </span>
            ))}
            <button className="px-3 py-1.5 rounded-lg border border-dashed border-[var(--border-default)] text-xs text-[var(--accent-green)] flex items-center gap-1">
              <Plus className="w-3 h-3" /> הוסף
            </button>
          </div>
        </section>

        {/* Gallery */}
        <section className="space-y-3">
          <h3 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">גלריית תמונות</h3>
          <div className="grid grid-cols-3 gap-2">
            {instructor.gallery.map((img, i) => (
              <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-[var(--border-subtle)]">
                <img src={img} alt={`תמונה ${i + 1}`} className="w-full h-full object-cover" />
                <button className="absolute top-1 left-1 w-6 h-6 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-[var(--accent-red)] transition-colors">
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
            <button className="aspect-square rounded-xl border-2 border-dashed border-[var(--border-default)] flex flex-col items-center justify-center gap-1 hover:border-[var(--accent-green)]/40 transition-colors">
              <Plus className="w-5 h-5 text-[var(--accent-green)]" />
              <span className="text-[10px] text-[var(--text-muted)]">הוסף</span>
            </button>
          </div>
        </section>

        {/* Social links */}
        <section className="space-y-3">
          <h3 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">רשתות חברתיות</h3>
          <div className="space-y-2">
            {[
              { label: "Instagram", value: instructor.socialLinks?.instagram ?? "", icon: Instagram },
              { label: "Facebook", value: instructor.socialLinks?.facebook ?? "", icon: ExternalLink },
              { label: "YouTube", value: instructor.socialLinks?.youtube ?? "", icon: ExternalLink },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <s.icon className="w-4 h-4 text-[var(--text-muted)] flex-shrink-0" />
                <input type="url" defaultValue={s.value} placeholder={`קישור ל-${s.label}`}
                  className="flex-1 h-9 px-3 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-green)]/50 transition-colors" />
              </div>
            ))}
          </div>
        </section>

        {/* ELO - read only */}
        <section className="space-y-3">
          <h3 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">דירוג ELO (לקריאה בלבד)</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-3 text-center">
              <p className="text-[10px] text-[var(--text-muted)]">ירי</p>
              <p className="text-xl font-bold text-[var(--accent-amber)]" style={{ fontFamily: "var(--font-rubik)" }}>{instructor.eloShooting}</p>
            </div>
            <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-3 text-center">
              <p className="text-[10px] text-[var(--text-muted)]">הדרכה</p>
              <p className="text-xl font-bold text-[var(--accent-blue)]" style={{ fontFamily: "var(--font-rubik)" }}>{instructor.eloInstruction}</p>
            </div>
          </div>
          <p className="text-[10px] text-[var(--text-muted)] text-center">דירוג ELO מחושב אוטומטית ולא ניתן לעריכה ידנית</p>
        </section>
      </div>
    </div>
  );
}

export default function InstructorEditPage() {
  return (
    <AuthGuard allowedRoles={["instructor"]}>
      <InstructorEditContent />
    </AuthGuard>
  );
}
