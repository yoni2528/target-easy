"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Calendar, Clock, CreditCard, Navigation, Check, ScanLine, User, FileText } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { MOCK_INSTRUCTORS, AVAILABLE_DATES } from "@/modules/instructors";
import { BottomNav } from "@/components/BottomNav";
import { BookingCalendar } from "./BookingCalendar";
import { LicenseScanner, type LicenseScanResult } from "./LicenseScanner";

const STEPS = [
  { num: 1, label: "סוג אימון", icon: FileText },
  { num: 2, label: "תאריך ושעה", icon: Calendar },
  { num: 3, label: "פרטים אישיים", icon: User },
  { num: 4, label: "נשק ורישיון", icon: ScanLine },
  { num: 5, label: "אישור ותשלום", icon: CreditCard },
];

const TRAINING_TYPES = [
  { id: "new", label: "מתחמש חדש", desc: "הכשרה ראשונית" },
  { id: "refresh", label: "רענון", desc: "רענון שנתי / תקופתי" },
  { id: "renewal", label: "חידוש רישיון", desc: "חידוש רישיון פג" },
  { id: "pro", label: "ירי מקצועי", desc: "אימון מתקדם" },
  { id: "group", label: "אימון קבוצתי", desc: "קבוצות 4+" },
];

export function BookingContent() {
  const searchParams = useSearchParams();
  const instructorId = searchParams.get("instructor") || "1";
  const instructor = MOCK_INSTRUCTORS.find((i) => i.id === instructorId) || MOCK_INSTRUCTORS[0];

  const [step, setStep] = useState(1);
  const [trainingType, setTrainingType] = useState("");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [showScanner, setShowScanner] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const [form, setForm] = useState({
    firstName: "", lastName: "", phone: "", idNumber: "",
    licenseNumber: "", licenseExpiry: "",
    weaponType: "", serialNumber: "", caliber: "",
  });

  const updateForm = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleScanResult = (result: LicenseScanResult) => {
    setShowScanner(false);
    setForm((prev) => ({
      ...prev,
      firstName: result.firstName || prev.firstName,
      lastName: result.lastName || prev.lastName,
      idNumber: result.idNumber || prev.idNumber,
      licenseNumber: result.licenseNumber || prev.licenseNumber,
      licenseExpiry: result.licenseExpiry || prev.licenseExpiry,
      weaponType: result.weaponType || prev.weaponType,
      serialNumber: result.serialNumber || prev.serialNumber,
      caliber: result.caliber || prev.caliber,
    }));
  };

  const selectedDateSlots = AVAILABLE_DATES.find((d) => d.date === selectedDate)?.slots || [];

  const mockAvailability: Record<string, number> = {};
  AVAILABLE_DATES.forEach((d) => { mockAvailability[d.date] = d.slots.length; });

  const dayNames = ["א׳", "ב׳", "ג׳", "ד׳", "ה׳", "ו׳", "ש׳"];
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return `${dayNames[d.getDay()]} ${d.getDate()}/${d.getMonth() + 1}`;
  };

  if (confirmed) {
    return (
      <div className="min-h-screen pb-20">
        <div className="flex flex-col items-center justify-center px-4 pt-24 max-w-md mx-auto text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", duration: 0.6 }} className="w-20 h-20 rounded-full bg-[var(--accent-green)] flex items-center justify-center mb-6 glow-green">
            <Check className="w-10 h-10 text-[var(--bg-primary)]" strokeWidth={3} />
          </motion.div>
          <h2 className="text-2xl font-bold">האימון נקבע!</h2>
          <p className="text-sm text-[var(--text-muted)] mt-2">
            {formatDate(selectedDate!)} בשעה {selectedSlot} עם {instructor.name}
          </p>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            {form.firstName} {form.lastName} · {trainingType && TRAINING_TYPES.find((t) => t.id === trainingType)?.label}
          </p>
          <div className="flex gap-3 mt-8 w-full">
            <button className="flex-1 h-11 rounded-xl border border-[var(--border-subtle)] text-sm font-medium text-[var(--text-secondary)] flex items-center justify-center gap-2">
              <Navigation className="w-4 h-4" /> נווט למטווח
            </button>
            <Link href="/" className="flex-1 h-11 rounded-xl bg-[var(--accent-green)] text-[var(--bg-primary)] font-bold text-sm flex items-center justify-center">
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

      <div className="px-4 max-w-2xl mx-auto pt-4 space-y-5">
        {/* Instructor summary */}
        <div className="flex items-center gap-3 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-3">
          <img src={instructor.photo} alt="" className="w-12 h-12 rounded-xl object-cover" />
          <div>
            <h3 className="font-semibold text-sm">{instructor.name}</h3>
            <p className="text-xs text-[var(--text-muted)]">{instructor.city} · החל מ-₪{instructor.priceFrom}</p>
          </div>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-1">
          {STEPS.map((s, i) => (
            <div key={s.num} className="flex items-center flex-1">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${
                step > s.num ? "bg-[var(--accent-green)] text-[var(--bg-primary)]"
                  : step === s.num ? "bg-[var(--accent-green)]/20 text-[var(--accent-green)] border-2 border-[var(--accent-green)]"
                  : "bg-[var(--bg-elevated)] text-[var(--text-muted)]"
              }`}>
                {step > s.num ? <Check className="w-3.5 h-3.5" /> : s.num}
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-0.5 mx-1 rounded ${step > s.num ? "bg-[var(--accent-green)]" : "bg-[var(--border-subtle)]"}`} />
              )}
            </div>
          ))}
        </div>
        <p className="text-center text-[10px] text-[var(--text-muted)]">{STEPS[step - 1]?.label}</p>

        {/* Steps */}
        <AnimatePresence mode="wait">
          {/* Step 1: Training Type */}
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-lg font-bold mb-3">בחר סוג אימון</h2>
              <div className="space-y-2">
                {TRAINING_TYPES.map((tt) => (
                  <button
                    key={tt.id}
                    onClick={() => { setTrainingType(tt.id); setStep(2); }}
                    className={`w-full text-right p-4 rounded-xl border transition-all ${
                      trainingType === tt.id
                        ? "bg-[var(--accent-green)]/10 border-[var(--accent-green)]/40"
                        : "bg-[var(--bg-card)] border-[var(--border-subtle)] hover:border-[var(--border-default)]"
                    }`}
                  >
                    <span className="text-sm font-semibold">{tt.label}</span>
                    <span className="text-[10px] text-[var(--text-muted)] block mt-0.5">{tt.desc}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Date & Time */}
          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-lg font-bold flex items-center gap-2 mb-3">
                <Calendar className="w-5 h-5 text-[var(--accent-green)]" />
                בחר תאריך
              </h2>

              <BookingCalendar
                selectedDate={selectedDate}
                onSelect={(date) => { setSelectedDate(date); setSelectedSlot(null); }}
                availability={mockAvailability}
              />

              {/* Time slots */}
              {selectedDate && selectedDateSlots.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
                  <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[var(--accent-amber)]" />
                    שעות פנויות - {formatDate(selectedDate)}
                  </h3>
                  <div className="grid grid-cols-4 gap-2">
                    {selectedDateSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-3 rounded-xl text-sm font-medium transition-all ${
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

              <div className="flex gap-3 mt-5">
                <button onClick={() => setStep(1)} className="w-12 h-12 rounded-xl border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)]">
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button onClick={() => setStep(3)} disabled={!selectedDate || !selectedSlot} className="flex-1 h-12 rounded-xl bg-[var(--accent-green)] text-[var(--bg-primary)] font-bold text-sm disabled:opacity-30 disabled:cursor-not-allowed">
                  המשך
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Personal Info */}
          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-lg font-bold mb-3">פרטים אישיים</h2>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <FormField label="שם פרטי" value={form.firstName} onChange={(v) => updateForm("firstName", v)} />
                  <FormField label="שם משפחה" value={form.lastName} onChange={(v) => updateForm("lastName", v)} />
                </div>
                <FormField label="טלפון" value={form.phone} onChange={(v) => updateForm("phone", v)} type="tel" dir="ltr" />
                <FormField label="תעודת זהות" value={form.idNumber} onChange={(v) => updateForm("idNumber", v)} dir="ltr" />
              </div>
              <div className="flex gap-3 mt-5">
                <button onClick={() => setStep(2)} className="w-12 h-12 rounded-xl border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)]">
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button onClick={() => setStep(trainingType === "new" ? 5 : 4)} disabled={!form.firstName || !form.lastName || !form.phone} className="flex-1 h-12 rounded-xl bg-[var(--accent-green)] text-[var(--bg-primary)] font-bold text-sm disabled:opacity-30 disabled:cursor-not-allowed">
                  המשך
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Weapon & License */}
          {step === 4 && (
            <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold">נשק ורישיון</h2>
                <button onClick={() => setShowScanner(true)} className="h-8 px-3 rounded-lg bg-[var(--accent-green)]/10 border border-[var(--accent-green)]/20 text-xs font-medium text-[var(--accent-green)] flex items-center gap-1.5">
                  <ScanLine className="w-3.5 h-3.5" />
                  סרוק רישיון
                </button>
              </div>
              <div className="space-y-3">
                <FormField label="מספר רישיון" value={form.licenseNumber} onChange={(v) => updateForm("licenseNumber", v)} dir="ltr" />
                <FormField label="תוקף רישיון" value={form.licenseExpiry} onChange={(v) => updateForm("licenseExpiry", v)} type="date" dir="ltr" />

                <div>
                  <label className="text-xs font-medium text-[var(--text-muted)] mb-1.5 block">סוג נשק</label>
                  <div className="flex gap-2">
                    {["אקדח", "רובה", "תת מקלע"].map((wt) => (
                      <button
                        key={wt}
                        onClick={() => updateForm("weaponType", wt)}
                        className={`flex-1 py-2.5 rounded-xl text-xs font-medium transition-all ${
                          form.weaponType === wt
                            ? "bg-[var(--accent-green)]/10 border-2 border-[var(--accent-green)]/40 text-[var(--accent-green)]"
                            : "bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-secondary)]"
                        }`}
                      >
                        {wt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-[var(--text-muted)] mb-1.5 block">קליבר</label>
                  <div className="grid grid-cols-4 gap-2">
                    {["9mm", "5.56mm", "7.62mm", ".22LR", ".45ACP", ".40S&W", "12GA", "אחר"].map((cal) => (
                      <button
                        key={cal}
                        onClick={() => updateForm("caliber", cal)}
                        className={`py-2 rounded-lg text-[10px] font-medium transition-all ${
                          form.caliber === cal
                            ? "bg-[var(--accent-green)]/10 border border-[var(--accent-green)]/40 text-[var(--accent-green)]"
                            : "bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-secondary)]"
                        }`}
                      >
                        {cal}
                      </button>
                    ))}
                  </div>
                </div>

                <FormField label="מספר סידורי" value={form.serialNumber} onChange={(v) => updateForm("serialNumber", v)} dir="ltr" />
              </div>
              <div className="flex gap-3 mt-5">
                <button onClick={() => setStep(3)} className="w-12 h-12 rounded-xl border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)]">
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button onClick={() => setStep(5)} className="flex-1 h-12 rounded-xl bg-[var(--accent-green)] text-[var(--bg-primary)] font-bold text-sm">
                  המשך
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 5: Confirm & Pay */}
          {step === 5 && (
            <motion.div key="s5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-lg font-bold mb-3">אישור הזמנה</h2>
              <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4 space-y-2.5">
                <SummaryRow label="מדריך" value={instructor.name} />
                <SummaryRow label="סוג אימון" value={TRAINING_TYPES.find((t) => t.id === trainingType)?.label || ""} />
                <SummaryRow label="תאריך" value={selectedDate ? formatDate(selectedDate) : ""} />
                <SummaryRow label="שעה" value={selectedSlot || ""} mono />
                <SummaryRow label="שם" value={`${form.firstName} ${form.lastName}`} />
                {form.phone && <SummaryRow label="טלפון" value={form.phone} mono />}
                {form.weaponType && <SummaryRow label="נשק" value={`${form.weaponType}${form.caliber ? ` · ${form.caliber}` : ""}`} />}
                <div className="flex justify-between text-sm pt-2.5 border-t border-[var(--border-subtle)]">
                  <span className="text-[var(--text-muted)]">מחיר</span>
                  <span className="text-lg font-bold text-[var(--accent-green)]" style={{ fontFamily: "var(--font-rubik)" }}>₪{instructor.priceFrom}</span>
                </div>
              </div>

              {/* Payment placeholder */}
              <div className="mt-4 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4">
                <h3 className="text-sm font-semibold flex items-center gap-2 mb-3">
                  <CreditCard className="w-4 h-4 text-[var(--accent-amber)]" />
                  תשלום מאובטח
                </h3>
                <div className="space-y-3 opacity-50 pointer-events-none">
                  <input type="text" placeholder="מספר כרטיס אשראי" disabled className="w-full h-10 px-3 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-sm text-[var(--text-muted)]" dir="ltr" />
                  <div className="flex gap-2">
                    <input type="text" placeholder="MM/YY" disabled className="flex-1 h-10 px-3 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-sm text-[var(--text-muted)]" dir="ltr" />
                    <input type="text" placeholder="CVV" disabled className="w-20 h-10 px-3 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-sm text-[var(--text-muted)]" dir="ltr" />
                  </div>
                </div>
                <div className="mt-3 p-2 rounded-lg bg-[var(--accent-amber)]/5 border border-[var(--accent-amber)]/20 text-center">
                  <span className="text-[10px] font-medium text-[var(--accent-amber)]">בקרוב - תשלום מאובטח באשראי</span>
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                <button onClick={() => setStep(trainingType === "new" ? 3 : 4)} className="w-12 h-12 rounded-xl border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)]">
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button onClick={() => setConfirmed(true)} className="flex-1 h-12 rounded-xl bg-[var(--accent-green)] text-[var(--bg-primary)] font-bold text-sm glow-green">
                  אשר הזמנה
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {showScanner && <LicenseScanner onResult={handleScanResult} onClose={() => setShowScanner(false)} />}
      <BottomNav />
    </div>
  );
}

function FormField({ label, value, onChange, type = "text", dir }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; dir?: string;
}) {
  return (
    <div>
      <label className="text-xs font-medium text-[var(--text-muted)] mb-1.5 block">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        dir={dir}
        className="w-full h-11 px-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-green)]/50 transition-colors"
      />
    </div>
  );
}

function SummaryRow({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-[var(--text-muted)]">{label}</span>
      <span className={`font-semibold ${mono ? "" : ""}`} style={mono ? { fontFamily: "var(--font-rubik)" } : undefined}>{value}</span>
    </div>
  );
}
