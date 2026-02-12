"use client";

import { useState } from "react";
import { AuthGuard } from "@/modules/auth";
import { MOCK_INSTRUCTORS } from "@/modules/instructors";
import Link from "next/link";
import { ArrowRight, Users, Settings, BarChart3, Shield, TrendingUp, Eye, Star, ChevronDown, Bell, Globe, Lock, Database } from "lucide-react";

export default function AdminPage() {
  const [statsOpen, setStatsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState<string | null>(null);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [autoApprove, setAutoApprove] = useState(false);
  const [minReviews, setMinReviews] = useState("10");

  const selectedData = selectedInstructor ? MOCK_INSTRUCTORS.find((i) => i.id === selectedInstructor) : null;

  const totalTrainees = MOCK_INSTRUCTORS.reduce((s, i) => s + i.trainees, 0);
  const avgElo = Math.round(MOCK_INSTRUCTORS.reduce((s, i) => s + i.eloShooting, 0) / MOCK_INSTRUCTORS.length);
  const verifiedCount = MOCK_INSTRUCTORS.filter((i) => i.verified).length;

  return (
    <AuthGuard allowedRoles={["admin"]}>
      <div className="min-h-screen pb-8">
        <header className="sticky top-0 z-40 bg-[var(--bg-primary)]/90 backdrop-blur-xl border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-3 px-4 h-14 max-w-3xl mx-auto">
            <Link href="/" className="w-9 h-9 rounded-lg border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)]">
              <ArrowRight className="w-5 h-5" />
            </Link>
            <h1 className="font-bold text-sm flex items-center gap-2">
              <Shield className="w-4 h-4 text-[var(--accent-red)]" />
              פאנל מנהל
            </h1>
          </div>
        </header>

        <div className="px-4 pt-6 max-w-3xl mx-auto space-y-4">
          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-3 text-center">
              <p className="text-lg font-bold text-[var(--accent-green)]" style={{ fontFamily: "var(--font-rubik)" }}>{MOCK_INSTRUCTORS.length}</p>
              <p className="text-[10px] text-[var(--text-muted)]">מדריכים</p>
            </div>
            <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-3 text-center">
              <p className="text-lg font-bold text-[var(--accent-blue)]" style={{ fontFamily: "var(--font-rubik)" }}>{totalTrainees.toLocaleString()}</p>
              <p className="text-[10px] text-[var(--text-muted)]">מתאמנים</p>
            </div>
            <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-3 text-center">
              <p className="text-lg font-bold text-[var(--accent-amber)]" style={{ fontFamily: "var(--font-rubik)" }}>{avgElo}</p>
              <p className="text-[10px] text-[var(--text-muted)]">ממוצע ELO</p>
            </div>
          </div>

          {/* Manage instructors */}
          <Link href="/admin/instructors" className="flex items-center gap-4 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4 hover:border-[var(--accent-green)]/30 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-[var(--bg-elevated)] flex items-center justify-center">
              <Users className="w-5 h-5 text-[var(--accent-blue)]" />
            </div>
            <div>
              <h3 className="text-sm font-semibold">ניהול מדריכים</h3>
              <p className="text-[10px] text-[var(--text-muted)]">הוסף, ערוך או הסר מדריכים</p>
            </div>
          </Link>

          {/* System stats link */}
          <Link href="/admin/stats" className="flex items-center gap-4 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4 hover:border-[var(--accent-green)]/30 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-[var(--bg-elevated)] flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[var(--accent-green)]" />
            </div>
            <div>
              <h3 className="text-sm font-semibold">סטטיסטיקות מערכת</h3>
              <p className="text-[10px] text-[var(--text-muted)]">נתונים כלליים, מגמות, התפלגויות</p>
            </div>
          </Link>

          {/* Statistics - expandable */}
          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl overflow-hidden">
            <button onClick={() => setStatsOpen(!statsOpen)} className="w-full flex items-center gap-4 p-4 hover:bg-[var(--bg-elevated)]/50 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[var(--bg-elevated)] flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-[var(--accent-green)]" />
              </div>
              <div className="flex-1 text-right">
                <h3 className="text-sm font-semibold">סטטיסטיקות מדריכים</h3>
                <p className="text-[10px] text-[var(--text-muted)]">צפה בנתוני כל מדריך</p>
              </div>
              <ChevronDown className={`w-4 h-4 text-[var(--text-muted)] transition-transform ${statsOpen ? "rotate-180" : ""}`} />
            </button>

            {statsOpen && (
              <div className="px-4 pb-4 space-y-3 border-t border-[var(--border-subtle)]">
                <select
                  value={selectedInstructor || ""}
                  onChange={(e) => setSelectedInstructor(e.target.value || null)}
                  className="w-full h-10 px-3 mt-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)]"
                >
                  <option value="">בחר מדריך...</option>
                  {MOCK_INSTRUCTORS.map((i) => (
                    <option key={i.id} value={i.id}>{i.name} — {i.city}</option>
                  ))}
                </select>

                {selectedData && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <img src={selectedData.photo} alt={selectedData.name} className="w-12 h-12 rounded-xl object-cover" />
                      <div>
                        <p className="text-sm font-bold">{selectedData.name}</p>
                        <p className="text-[10px] text-[var(--text-muted)]">{selectedData.city} · {selectedData.verified ? "מאומת" : "לא מאומת"}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-[var(--bg-elevated)] rounded-lg p-3">
                        <div className="flex items-center gap-1 text-[10px] text-[var(--text-muted)] mb-1"><TrendingUp className="w-3 h-3" /> ELO ירי</div>
                        <p className="text-lg font-bold text-[var(--accent-amber)]" style={{ fontFamily: "var(--font-rubik)" }}>{selectedData.eloShooting}</p>
                      </div>
                      <div className="bg-[var(--bg-elevated)] rounded-lg p-3">
                        <div className="flex items-center gap-1 text-[10px] text-[var(--text-muted)] mb-1"><TrendingUp className="w-3 h-3" /> ELO הדרכה</div>
                        <p className="text-lg font-bold text-[var(--accent-blue)]" style={{ fontFamily: "var(--font-rubik)" }}>{selectedData.eloInstruction}</p>
                      </div>
                      <div className="bg-[var(--bg-elevated)] rounded-lg p-3">
                        <div className="flex items-center gap-1 text-[10px] text-[var(--text-muted)] mb-1"><Users className="w-3 h-3" /> מתאמנים</div>
                        <p className="text-lg font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-rubik)" }}>{selectedData.trainees.toLocaleString()}</p>
                      </div>
                      <div className="bg-[var(--bg-elevated)] rounded-lg p-3">
                        <div className="flex items-center gap-1 text-[10px] text-[var(--text-muted)] mb-1"><Star className="w-3 h-3" /> דירוג</div>
                        <p className="text-lg font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-rubik)" }}>{selectedData.stars} ⭐</p>
                      </div>
                      <div className="bg-[var(--bg-elevated)] rounded-lg p-3">
                        <div className="flex items-center gap-1 text-[10px] text-[var(--text-muted)] mb-1"><Eye className="w-3 h-3" /> צפיות</div>
                        <p className="text-lg font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-rubik)" }}>{120 + parseInt(selectedData.id) * 37 + selectedData.trainees}</p>
                      </div>
                      <div className="bg-[var(--bg-elevated)] rounded-lg p-3">
                        <div className="flex items-center gap-1 text-[10px] text-[var(--text-muted)] mb-1">💰 מחיר מ-</div>
                        <p className="text-lg font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-rubik)" }}>₪{selectedData.priceFrom}</p>
                      </div>
                    </div>

                    {/* Service metrics */}
                    <div className="bg-[var(--bg-elevated)] rounded-lg p-3 space-y-2">
                      <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">מדדי שירות</p>
                      {[
                        { label: "שירות", value: selectedData.metrics.service },
                        { label: "מקצועיות", value: selectedData.metrics.professionalism },
                        { label: "איכות", value: selectedData.metrics.quality },
                      ].map((m) => (
                        <div key={m.label} className="flex items-center justify-between">
                          <span className="text-xs text-[var(--text-secondary)]">{m.label}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-1.5 rounded-full bg-[var(--bg-card)] overflow-hidden">
                              <div className="h-full rounded-full bg-[var(--accent-green)]" style={{ width: `${m.value * 20}%` }} />
                            </div>
                            <span className="text-xs font-bold" style={{ fontFamily: "var(--font-rubik)" }}>{m.value}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Training types */}
                    <div className="flex flex-wrap gap-1.5">
                      {selectedData.trainingTypes.map((t) => (
                        <span key={t} className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-subtle)]">{t}</span>
                      ))}
                    </div>

                    {/* Reviews summary */}
                    <div className="bg-[var(--bg-elevated)] rounded-lg p-3">
                      <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">ביקורות ({selectedData.reviews.length})</p>
                      {selectedData.reviews.slice(0, 3).map((r) => (
                        <div key={r.id} className="py-1.5 border-b border-[var(--border-subtle)] last:border-0">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-medium">{r.name}</span>
                            <span className="text-[10px] text-[var(--text-muted)]">{r.date}</span>
                          </div>
                          <p className="text-[10px] text-[var(--text-muted)] mt-0.5">{r.text}</p>
                        </div>
                      ))}
                    </div>

                    <Link href={`/admin/instructors/${selectedData.id}`} className="block text-center py-2 rounded-lg bg-[var(--accent-green)] text-[var(--bg-primary)] text-xs font-semibold">
                      ערוך מדריך
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* System Settings - expandable */}
          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl overflow-hidden">
            <button onClick={() => setSettingsOpen(!settingsOpen)} className="w-full flex items-center gap-4 p-4 hover:bg-[var(--bg-elevated)]/50 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[var(--bg-elevated)] flex items-center justify-center">
                <Settings className="w-5 h-5 text-[var(--accent-amber)]" />
              </div>
              <div className="flex-1 text-right">
                <h3 className="text-sm font-semibold">הגדרות מערכת</h3>
                <p className="text-[10px] text-[var(--text-muted)]">הגדרות כלליות לאפליקציה</p>
              </div>
              <ChevronDown className={`w-4 h-4 text-[var(--text-muted)] transition-transform ${settingsOpen ? "rotate-180" : ""}`} />
            </button>

            {settingsOpen && (
              <div className="px-4 pb-4 space-y-3 border-t border-[var(--border-subtle)] pt-3">
                {/* Maintenance mode */}
                <div className="flex items-center justify-between bg-[var(--bg-elevated)] rounded-xl p-3">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-[var(--accent-red)]" />
                    <div>
                      <p className="text-xs font-medium">מצב תחזוקה</p>
                      <p className="text-[10px] text-[var(--text-muted)]">חוסם גישה ללקוחות</p>
                    </div>
                  </div>
                  <button onClick={() => setMaintenanceMode(!maintenanceMode)}
                    className={`w-11 h-6 rounded-full transition-colors relative ${maintenanceMode ? "bg-[var(--accent-red)]" : "bg-[var(--border-default)]"}`}>
                    <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${maintenanceMode ? "left-5" : "left-0.5"}`} />
                  </button>
                </div>

                {/* Auto approve */}
                <div className="flex items-center justify-between bg-[var(--bg-elevated)] rounded-xl p-3">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[var(--accent-green)]" />
                    <div>
                      <p className="text-xs font-medium">אישור אוטומטי למדריכים</p>
                      <p className="text-[10px] text-[var(--text-muted)]">מאשר רישום ללא בדיקה ידנית</p>
                    </div>
                  </div>
                  <button onClick={() => setAutoApprove(!autoApprove)}
                    className={`w-11 h-6 rounded-full transition-colors relative ${autoApprove ? "bg-[var(--accent-green)]" : "bg-[var(--border-default)]"}`}>
                    <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${autoApprove ? "left-5" : "left-0.5"}`} />
                  </button>
                </div>

                {/* Min reviews for verification */}
                <div className="bg-[var(--bg-elevated)] rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-4 h-4 text-[var(--accent-amber)]" />
                    <p className="text-xs font-medium">מינימום ביקורות לאימות</p>
                  </div>
                  <select value={minReviews} onChange={(e) => setMinReviews(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)]">
                    <option value="5">5 ביקורות</option>
                    <option value="10">10 ביקורות</option>
                    <option value="15">15 ביקורות</option>
                    <option value="20">20 ביקורות</option>
                  </select>
                </div>

                {/* Notification settings */}
                <div className="bg-[var(--bg-elevated)] rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Bell className="w-4 h-4 text-[var(--accent-blue)]" />
                    <p className="text-xs font-medium">התראות מנהל</p>
                  </div>
                  <div className="space-y-2">
                    {["מדריך חדש נרשם", "ביקורת שלילית (2- כוכבים)", "דיווח על מדריך"].map((n) => (
                      <label key={n} className="flex items-center justify-between">
                        <span className="text-[11px] text-[var(--text-secondary)]">{n}</span>
                        <input type="checkbox" defaultChecked className="accent-[var(--accent-green)] w-3.5 h-3.5" />
                      </label>
                    ))}
                  </div>
                </div>

                {/* Data */}
                <div className="bg-[var(--bg-elevated)] rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Database className="w-4 h-4 text-[var(--text-muted)]" />
                    <p className="text-xs font-medium">נתוני מערכת</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[10px] text-[var(--text-muted)]">
                    <p>מדריכים פעילים: <strong className="text-[var(--text-primary)]">{MOCK_INSTRUCTORS.filter(i => i.available).length}</strong></p>
                    <p>מאומתים: <strong className="text-[var(--text-primary)]">{verifiedCount}/{MOCK_INSTRUCTORS.length}</strong></p>
                    <p>ממוצע כוכבים: <strong className="text-[var(--text-primary)]">{(MOCK_INSTRUCTORS.reduce((s, i) => s + i.stars, 0) / MOCK_INSTRUCTORS.length).toFixed(1)}</strong></p>
                    <p>ערים: <strong className="text-[var(--text-primary)]">{new Set(MOCK_INSTRUCTORS.map(i => i.city)).size}</strong></p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
