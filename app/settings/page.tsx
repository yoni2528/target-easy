"use client";

import { useState } from "react";
import { ArrowRight, Bell, MapPin, Shield, Smartphone, Globe } from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [location, setLocation] = useState(false);
  const [radius, setRadius] = useState("30");

  return (
    <div className="min-h-screen pb-8">
      <header className="sticky top-0 z-40 bg-[var(--bg-primary)]/90 backdrop-blur-xl border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-3 px-4 h-14 max-w-2xl mx-auto">
          <Link href="/" className="w-9 h-9 rounded-lg border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)]">
            <ArrowRight className="w-5 h-5" />
          </Link>
          <h1 className="font-bold text-sm">הגדרות</h1>
        </div>
      </header>

      <div className="px-4 pt-6 max-w-2xl mx-auto space-y-4">
        {/* Notifications */}
        <section className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl overflow-hidden">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-[var(--accent-amber)]" />
              <div>
                <p className="text-sm font-medium">התראות</p>
                <p className="text-[10px] text-[var(--text-muted)]">קבל עדכונים על מדריכים חדשים</p>
              </div>
            </div>
            <button onClick={() => setNotifications(!notifications)}
              className={`w-11 h-6 rounded-full transition-colors relative ${notifications ? "bg-[var(--accent-green)]" : "bg-[var(--border-default)]"}`}>
              <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${notifications ? "left-5" : "left-0.5"}`} />
            </button>
          </div>
        </section>

        {/* Location */}
        <section className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl overflow-hidden">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-[var(--accent-blue)]" />
              <div>
                <p className="text-sm font-medium">שירותי מיקום</p>
                <p className="text-[10px] text-[var(--text-muted)]">מצא מדריכים קרובים אליך</p>
              </div>
            </div>
            <button onClick={() => setLocation(!location)}
              className={`w-11 h-6 rounded-full transition-colors relative ${location ? "bg-[var(--accent-green)]" : "bg-[var(--border-default)]"}`}>
              <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${location ? "left-5" : "left-0.5"}`} />
            </button>
          </div>
          {location && (
            <div className="px-4 pb-4 pt-0">
              <label className="text-xs text-[var(--text-muted)] mb-1 block">רדיוס חיפוש (ק"מ)</label>
              <select value={radius} onChange={(e) => setRadius(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)]">
                <option value="10">10 ק"מ</option>
                <option value="30">30 ק"מ</option>
                <option value="50">50 ק"מ</option>
                <option value="100">100 ק"מ</option>
                <option value="0">כל הארץ</option>
              </select>
            </div>
          )}
        </section>

        {/* Privacy */}
        <section className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <Shield className="w-5 h-5 text-[var(--accent-green)]" />
            <p className="text-sm font-medium">פרטיות</p>
          </div>
          <div className="space-y-2 text-xs text-[var(--text-muted)]">
            <p>המידע שלך מאובטח ולא משותף עם צד שלישי.</p>
            <p>היסטוריית חיפוש נשמרת מקומית על המכשיר בלבד.</p>
          </div>
        </section>

        {/* App info */}
        <section className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <Smartphone className="w-5 h-5 text-[var(--text-muted)]" />
            <p className="text-sm font-medium">אודות האפליקציה</p>
          </div>
          <div className="space-y-1 text-xs text-[var(--text-muted)]">
            <p>EasyTarget v1.0</p>
            <p>פותח ע"י אחים עם נשק</p>
          </div>
        </section>

        {/* Language */}
        <section className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <Globe className="w-5 h-5 text-[var(--text-muted)]" />
            <p className="text-sm font-medium">שפה</p>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 h-10 rounded-xl bg-[var(--accent-green)] text-[var(--bg-primary)] text-sm font-bold">עברית</button>
            <button className="flex-1 h-10 rounded-xl border border-[var(--border-default)] text-sm text-[var(--text-secondary)]">English</button>
          </div>
        </section>
      </div>
    </div>
  );
}
