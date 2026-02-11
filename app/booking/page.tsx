"use client";

import { useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Calendar, Clock, CreditCard, Navigation, Check } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { MOCK_INSTRUCTORS, AVAILABLE_DATES } from "@/lib/mock-data";
import { BottomNav } from "@/components/BottomNav";

function BookingContent() {
  const searchParams = useSearchParams();
  const instructorId = searchParams.get("instructor") || "1";
  const instructor = MOCK_INSTRUCTORS.find((i) => i.id === instructorId) || MOCK_INSTRUCTORS[0];

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [weaponType, setWeaponType] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const selectedDateSlots = AVAILABLE_DATES.find((d) => d.date === selectedDate)?.slots || [];

  const dayNames = ["א׳", "ב׳", "ג׳", "ד׳", "ה׳", "ו׳", "ש׳"];

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return `${dayNames[d.getDay()]} ${d.getDate()}/${d.getMonth() + 1}`;
  };

  if (confirmed) {
    return (
      <div className="min-h-screen pb-20">
        <div className="flex flex-col items-center justify-center px-4 pt-32 max-w-md mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="w-20 h-20 rounded-full bg-[var(--accent-green)] flex items-center justify-center mb-6 glow-green"
          >
            <Check className="w-10 h-10 text-[var(--bg-primary)]" strokeWidth={3} />
          </motion.div>
          <h2 className="text-2xl font-bold">האימון נקבע!</h2>
          <p className="text-sm text-[var(--text-muted)] mt-2">
            {formatDate(selectedDate!)} בשעה {selectedSlot} עם {instructor.name}
          </p>
          <div className="flex gap-3 mt-8 w-full">
            <button className="flex-1 h-11 rounded-xl border border-[var(--border-subtle)] text-sm font-medium text-[var(--text-secondary)] flex items-center justify-center gap-2">
              <Navigation className="w-4 h-4" />
              נווט למטווח
            </button>
            <Link
              href="/"
              className="flex-1 h-11 rounded-xl bg-[var(--accent-green)] text-[var(--bg-primary)] font-bold text-sm flex items-center justify-center"
            >
              חזרה לדף הבית
            </Link>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[var(--bg-primary)]/90 backdrop-blur-xl border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-3 px-4 h-14 max-w-2xl mx-auto">
          <Link href={`/instructor/${instructor.id}`} className="w-9 h-9 rounded-lg border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)]">
            <ArrowRight className="w-5 h-5" />
          </Link>
          <h1 className="font-bold text-sm">קביעת אימון</h1>
        </div>
      </header>

      <div className="px-4 max-w-2xl mx-auto pt-6 space-y-6">
        {/* Instructor summary */}
        <div className="flex items-center gap-3 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-3">
          <img src={instructor.photo} alt="" className="w-12 h-12 rounded-xl object-cover" />
          <div>
            <h3 className="font-semibold text-sm">{instructor.name}</h3>
            <p className="text-xs text-[var(--text-muted)]">{instructor.city} · החל מ-₪{instructor.priceFrom}</p>
          </div>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                step >= s ? "bg-[var(--accent-green)] text-[var(--bg-primary)]" : "bg-[var(--bg-elevated)] text-[var(--text-muted)]"
              }`}>
                {step > s ? <Check className="w-4 h-4" /> : s}
              </div>
              {s < 3 && <div className={`flex-1 h-0.5 rounded ${step > s ? "bg-[var(--accent-green)]" : "bg-[var(--border-subtle)]"}`} />}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Date & Time */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[var(--accent-green)]" />
                בחר תאריך ושעה
              </h2>

              {/* Date selection */}
              <div className="flex gap-2 mt-4 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
                {AVAILABLE_DATES.map((d) => (
                  <button
                    key={d.date}
                    onClick={() => { setSelectedDate(d.date); setSelectedSlot(null); }}
                    className={`min-w-[70px] py-3 px-3 rounded-xl text-center transition-all ${
                      selectedDate === d.date
                        ? "bg-[var(--accent-green)] text-[var(--bg-primary)]"
                        : "bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--accent-green)]/30"
                    }`}
                  >
                    <div className="text-[10px] font-medium">{dayNames[new Date(d.date).getDay()]}</div>
                    <div className="text-lg font-bold mt-0.5" style={{ fontFamily: "var(--font-rubik)" }}>{new Date(d.date).getDate()}</div>
                    <div className="text-[10px] opacity-70">{d.slots.length} פנויים</div>
                  </button>
                ))}
              </div>

              {/* Time slots */}
              {selectedDate && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
                  <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[var(--accent-amber)]" />
                    שעות פנויות
                  </h3>
                  <div className="grid grid-cols-4 gap-2">
                    {selectedDateSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-2.5 rounded-xl text-sm font-medium transition-all ${
                          selectedSlot === slot
                            ? "bg-[var(--accent-green)] text-[var(--bg-primary)] glow-green"
                            : "bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--accent-green)]/30"
                        }`}
                        style={{ fontFamily: "var(--font-rubik)" }}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              <button
                onClick={() => setStep(2)}
                disabled={!selectedDate || !selectedSlot}
                className="w-full mt-6 h-12 rounded-xl bg-[var(--accent-green)] text-[var(--bg-primary)] font-bold text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:brightness-110 transition-all"
              >
                המשך
              </button>
            </motion.div>
          )}

          {/* Step 2: Details */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-lg font-bold">פרטי נשק ורישיון</h2>
              <div className="space-y-4 mt-4">
                <div>
                  <label className="text-xs font-medium text-[var(--text-muted)] mb-1.5 block">סוג נשק</label>
                  <select
                    value={weaponType}
                    onChange={(e) => setWeaponType(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--accent-green)]/50"
                  >
                    <option value="">בחר סוג נשק</option>
                    <option value="pistol">אקדח</option>
                    <option value="rifle">רובה</option>
                    <option value="none">אין לי נשק</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-[var(--text-muted)] mb-1.5 block">מספר רישיון</label>
                  <input
                    type="text"
                    value={licenseNumber}
                    onChange={(e) => setLicenseNumber(e.target.value)}
                    placeholder="הזן מספר רישיון (אופציונלי)"
                    className="w-full h-12 px-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder-[var(--text-muted)] text-sm focus:outline-none focus:border-[var(--accent-green)]/50"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button onClick={() => setStep(1)} className="w-12 h-12 rounded-xl border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)]">
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 h-12 rounded-xl bg-[var(--accent-green)] text-[var(--bg-primary)] font-bold text-sm hover:brightness-110 transition-all"
                >
                  המשך
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Confirm */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-lg font-bold">אישור הזמנה</h2>
              <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4 mt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--text-muted)]">מדריך</span>
                  <span className="font-semibold">{instructor.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--text-muted)]">תאריך</span>
                  <span className="font-semibold" dir="ltr">{selectedDate && formatDate(selectedDate)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--text-muted)]">שעה</span>
                  <span className="font-semibold" style={{ fontFamily: "var(--font-rubik)" }}>{selectedSlot}</span>
                </div>
                {weaponType && (
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--text-muted)]">סוג נשק</span>
                    <span className="font-semibold">{weaponType === "pistol" ? "אקדח" : weaponType === "rifle" ? "רובה" : "אין"}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm pt-3 border-t border-[var(--border-subtle)]">
                  <span className="text-[var(--text-muted)]">מחיר</span>
                  <span className="text-lg font-bold text-[var(--accent-green)]" style={{ fontFamily: "var(--font-rubik)" }}>₪{instructor.priceFrom}</span>
                </div>
              </div>

              {/* Payment placeholder */}
              <button className="w-full mt-4 h-12 rounded-xl border border-[var(--accent-amber)]/30 bg-[var(--accent-amber)]/5 text-[var(--accent-amber)] font-medium text-sm flex items-center justify-center gap-2">
                <CreditCard className="w-4 h-4" />
                תשלום דמי רצינות - ₪50
              </button>

              <div className="flex gap-3 mt-4">
                <button onClick={() => setStep(2)} className="w-12 h-12 rounded-xl border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)]">
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setConfirmed(true)}
                  className="flex-1 h-12 rounded-xl bg-[var(--accent-green)] text-[var(--bg-primary)] font-bold text-sm glow-green hover:brightness-110 transition-all"
                >
                  אשר הזמנה
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <BottomNav />
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-[var(--text-muted)]">טוען...</div>}>
      <BookingContent />
    </Suspense>
  );
}
