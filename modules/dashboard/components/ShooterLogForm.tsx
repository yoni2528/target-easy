"use client";

import { useState } from "react";
import { ArrowRight, Crosshair, Shield, Target, CheckCircle, AlertTriangle } from "lucide-react";
import type { TrainingClient, ShooterLogEntry } from "../types";

interface ShooterLogFormProps {
  client: TrainingClient;
  onBack: () => void;
  onSubmit: (entry: ShooterLogEntry) => void;
}

function ScoreSlider({ label, value, onChange, icon: Icon, color }: {
  label: string; value: number; onChange: (v: number) => void; icon: typeof Crosshair; color: string;
}) {
  return (
    <div className="bg-[var(--bg-elevated)] rounded-xl p-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium flex items-center gap-1.5">
          <Icon className="w-3.5 h-3.5" style={{ color }} />
          {label}
        </span>
        <span className="text-sm font-bold" style={{ fontFamily: "var(--font-rubik)", color }}>{value}/10</span>
      </div>
      <input
        type="range"
        min={1}
        max={10}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to left, ${color} ${value * 10}%, var(--bg-card) ${value * 10}%)`,
        }}
      />
      <div className="flex justify-between text-[8px] text-[var(--text-muted)] mt-1">
        <span>חלש</span>
        <span>מצוין</span>
      </div>
    </div>
  );
}

export function ShooterLogForm({ client, onBack, onSubmit }: ShooterLogFormProps) {
  const [form, setForm] = useState<ShooterLogEntry>({
    clientId: client.id,
    rounds: 50,
    distance: 7,
    grouping: 7,
    accuracy: 7,
    safetyScore: 8,
    weaponHandling: 7,
    notes: "",
    pass: true,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    onSubmit(form);
  };

  if (submitted) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="w-9 h-9 rounded-lg border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)]">
            <ArrowRight className="w-5 h-5" />
          </button>
          <h2 className="text-sm font-bold">דו״ח מקצים</h2>
        </div>
        <div className="text-center py-12">
          <CheckCircle className="w-16 h-16 text-[var(--accent-green)] mx-auto mb-4" />
          <h3 className="text-lg font-bold mb-1">הדו״ח נשמר בהצלחה!</h3>
          <p className="text-sm text-[var(--text-muted)]">דו״ח המקצים של {client.name} נשמר במערכת</p>
          <button onClick={onBack} className="mt-6 px-6 py-2.5 rounded-lg bg-[var(--accent-green)] text-[var(--bg-primary)] text-sm font-semibold">
            חזרה לאימון
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="w-9 h-9 rounded-lg border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)]">
          <ArrowRight className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-sm font-bold">דו״ח מקצים</h2>
          <p className="text-[10px] text-[var(--text-muted)]">{client.name}</p>
        </div>
      </div>

      {/* Client info */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-3">
        <div className="grid grid-cols-3 gap-2 text-[10px]">
          <div><span className="text-[var(--text-muted)]">נשק:</span> <span className="font-medium">{client.weaponType}</span></div>
          <div><span className="text-[var(--text-muted)]">קליבר:</span> <span className="font-medium">{client.caliber}</span></div>
          <div><span className="text-[var(--text-muted)]">סידורי:</span> <span className="font-medium">{client.serialNumber}</span></div>
        </div>
      </div>

      {/* Rounds & Distance */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-3">
          <label className="text-[10px] text-[var(--text-muted)] block mb-1">כמות כדורים</label>
          <input
            type="number"
            value={form.rounds}
            onChange={(e) => setForm({ ...form, rounds: Number(e.target.value) })}
            className="w-full h-9 px-3 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] text-center"
            style={{ fontFamily: "var(--font-rubik)" }}
          />
        </div>
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-3">
          <label className="text-[10px] text-[var(--text-muted)] block mb-1">מרחק (מטרים)</label>
          <select
            value={form.distance}
            onChange={(e) => setForm({ ...form, distance: Number(e.target.value) })}
            className="w-full h-9 px-3 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)]"
          >
            {[5, 7, 10, 15, 20, 25, 50, 100].map((d) => (
              <option key={d} value={d}>{d} מ׳</option>
            ))}
          </select>
        </div>
      </div>

      {/* Score sliders */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4 space-y-3">
        <h3 className="text-xs font-semibold flex items-center gap-2 mb-1">
          <Crosshair className="w-3.5 h-3.5 text-[var(--accent-amber)]" />
          ציוני ביצוע
        </h3>
        <ScoreSlider label="ריכוז קבוצה (Grouping)" value={form.grouping} onChange={(v) => setForm({ ...form, grouping: v })} icon={Target} color="var(--accent-amber)" />
        <ScoreSlider label="דיוק (Accuracy)" value={form.accuracy} onChange={(v) => setForm({ ...form, accuracy: v })} icon={Crosshair} color="var(--accent-green)" />
        <ScoreSlider label="בטיחות" value={form.safetyScore} onChange={(v) => setForm({ ...form, safetyScore: v })} icon={Shield} color="var(--accent-red)" />
        <ScoreSlider label="אחזקת נשק" value={form.weaponHandling} onChange={(v) => setForm({ ...form, weaponHandling: v })} icon={Crosshair} color="var(--accent-blue)" />
      </div>

      {/* Notes */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4">
        <label className="text-xs font-semibold block mb-2">הערות</label>
        <textarea
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          placeholder="הערות נוספות על הביצוע..."
          className="w-full h-20 px-3 py-2 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] resize-none placeholder:text-[var(--text-muted)]"
        />
      </div>

      {/* Pass/Fail */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4">
        <h3 className="text-xs font-semibold mb-3">תוצאה סופית</h3>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setForm({ ...form, pass: true })}
            className={`flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-colors ${
              form.pass
                ? "bg-[var(--accent-green)] text-[var(--bg-primary)]"
                : "bg-[var(--bg-elevated)] text-[var(--text-muted)] border border-[var(--border-subtle)]"
            }`}
          >
            <CheckCircle className="w-5 h-5" />
            עובר ✓
          </button>
          <button
            onClick={() => setForm({ ...form, pass: false })}
            className={`flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-colors ${
              !form.pass
                ? "bg-[var(--accent-red)] text-white"
                : "bg-[var(--bg-elevated)] text-[var(--text-muted)] border border-[var(--border-subtle)]"
            }`}
          >
            <AlertTriangle className="w-5 h-5" />
            נכשל ✗
          </button>
        </div>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        className="w-full py-3 rounded-xl bg-[var(--accent-green)] text-[var(--bg-primary)] text-sm font-bold"
      >
        שמור דו״ח מקצים
      </button>
    </div>
  );
}
