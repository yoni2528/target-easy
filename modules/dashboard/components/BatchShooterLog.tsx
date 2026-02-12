"use client";

import { useState } from "react";
import { ArrowRight, Crosshair, Shield, Target, CheckCircle, AlertTriangle, ChevronDown, ChevronUp } from "lucide-react";
import type { TrainingClient, ShooterLogEntry } from "../types";

interface Props {
  clients: TrainingClient[];
  onBack: () => void;
  onSubmitAll: (entries: ShooterLogEntry[]) => void;
}

interface ClientForm extends ShooterLogEntry {
  expanded: boolean;
}

export function BatchShooterLog({ clients, onBack, onSubmitAll }: Props) {
  const [forms, setForms] = useState<ClientForm[]>(
    clients.map((c) => ({
      clientId: c.id,
      rounds: 50,
      distance: 7,
      grouping: 7,
      accuracy: 7,
      safetyScore: 8,
      weaponHandling: 7,
      notes: "",
      pass: true,
      expanded: false,
    }))
  );
  const [submitted, setSubmitted] = useState(false);

  const updateForm = (idx: number, patch: Partial<ClientForm>) => {
    setForms((prev) => prev.map((f, i) => (i === idx ? { ...f, ...patch } : f)));
  };

  const toggleExpanded = (idx: number) => {
    updateForm(idx, { expanded: !forms[idx].expanded });
  };

  const handleSubmitAll = () => {
    setSubmitted(true);
    onSubmitAll(forms.map(({ expanded, ...entry }) => entry));
  };

  const filledCount = forms.filter((f) => f.expanded || clients.find((c) => c.id === f.clientId)?.reportFilled).length;

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
          <h3 className="text-lg font-bold mb-1">כל הדו״חות נשמרו!</h3>
          <p className="text-sm text-[var(--text-muted)]">{clients.length} דו״חות מקצים נשמרו במערכת</p>
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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="w-9 h-9 rounded-lg border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)]">
            <ArrowRight className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-sm font-bold">דו״ח מקצים - כל הלקוחות</h2>
            <p className="text-[10px] text-[var(--text-muted)]">{clients.length} לקוחות באימון</p>
          </div>
        </div>
      </div>

      {/* Client forms */}
      {clients.map((client, idx) => {
        const form = forms[idx];
        const isAlreadyFilled = client.reportFilled;
        return (
          <div key={client.id} className={`bg-[var(--bg-card)] border rounded-xl overflow-hidden ${isAlreadyFilled ? "border-[var(--accent-green)]/30" : "border-[var(--border-subtle)]"}`}>
            {/* Client header - always visible */}
            <button
              onClick={() => toggleExpanded(idx)}
              className="w-full flex items-center justify-between p-3 hover:bg-[var(--bg-elevated)]/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${isAlreadyFilled ? "bg-[var(--accent-green)]/10 text-[var(--accent-green)]" : "bg-[var(--bg-elevated)] text-[var(--text-muted)]"}`}>
                  {client.name.charAt(0)}
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold flex items-center gap-1.5">
                    {client.name}
                    {isAlreadyFilled && <CheckCircle className="w-3.5 h-3.5 text-[var(--accent-green)]" />}
                  </p>
                  <p className="text-[10px] text-[var(--text-muted)]">{client.weaponType} · {client.caliber} · {client.serialNumber}</p>
                </div>
              </div>
              {form.expanded ? <ChevronUp className="w-4 h-4 text-[var(--text-muted)]" /> : <ChevronDown className="w-4 h-4 text-[var(--text-muted)]" />}
            </button>

            {/* Expanded form */}
            {form.expanded && (
              <div className="px-3 pb-3 border-t border-[var(--border-subtle)] pt-3 space-y-3">
                {/* Rounds & Distance */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[9px] text-[var(--text-muted)] block mb-0.5">כדורים</label>
                    <input type="number" value={form.rounds} onChange={(e) => updateForm(idx, { rounds: Number(e.target.value) })}
                      className="w-full h-8 px-2 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs text-center" style={{ fontFamily: "var(--font-rubik)" }} />
                  </div>
                  <div>
                    <label className="text-[9px] text-[var(--text-muted)] block mb-0.5">מרחק</label>
                    <select value={form.distance} onChange={(e) => updateForm(idx, { distance: Number(e.target.value) })}
                      className="w-full h-8 px-2 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs">
                      {[5, 7, 10, 15, 20, 25].map((d) => <option key={d} value={d}>{d} מ׳</option>)}
                    </select>
                  </div>
                </div>

                {/* Scores in compact grid */}
                <div className="grid grid-cols-2 gap-2">
                  <ScoreInput label="ריכוז" value={form.grouping} onChange={(v) => updateForm(idx, { grouping: v })} icon={Target} color="var(--accent-amber)" />
                  <ScoreInput label="דיוק" value={form.accuracy} onChange={(v) => updateForm(idx, { accuracy: v })} icon={Crosshair} color="var(--accent-green)" />
                  <ScoreInput label="בטיחות" value={form.safetyScore} onChange={(v) => updateForm(idx, { safetyScore: v })} icon={Shield} color="var(--accent-red)" />
                  <ScoreInput label="אחזקת נשק" value={form.weaponHandling} onChange={(v) => updateForm(idx, { weaponHandling: v })} icon={Crosshair} color="var(--accent-blue)" />
                </div>

                {/* Notes */}
                <textarea value={form.notes} onChange={(e) => updateForm(idx, { notes: e.target.value })} placeholder="הערות..."
                  className="w-full h-14 px-2 py-1.5 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs resize-none placeholder:text-[var(--text-muted)]" />

                {/* Pass/Fail */}
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => updateForm(idx, { pass: true })}
                    className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-colors ${form.pass ? "bg-[var(--accent-green)] text-[var(--bg-primary)]" : "bg-[var(--bg-elevated)] text-[var(--text-muted)] border border-[var(--border-subtle)]"}`}>
                    <CheckCircle className="w-4 h-4" /> עובר
                  </button>
                  <button onClick={() => updateForm(idx, { pass: false })}
                    className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-colors ${!form.pass ? "bg-[var(--accent-red)] text-white" : "bg-[var(--bg-elevated)] text-[var(--text-muted)] border border-[var(--border-subtle)]"}`}>
                    <AlertTriangle className="w-4 h-4" /> נכשל
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Submit all */}
      <button onClick={handleSubmitAll} className="w-full py-3 rounded-xl bg-[var(--accent-green)] text-[var(--bg-primary)] text-sm font-bold">
        שמור את כל הדו״חות ({clients.length})
      </button>
    </div>
  );
}

function ScoreInput({ label, value, onChange, icon: Icon, color }: {
  label: string; value: number; onChange: (v: number) => void; icon: typeof Crosshair; color: string;
}) {
  return (
    <div className="bg-[var(--bg-elevated)] rounded-lg p-2">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[9px] text-[var(--text-muted)] flex items-center gap-1">
          <Icon className="w-3 h-3" style={{ color }} /> {label}
        </span>
        <span className="text-[10px] font-bold" style={{ fontFamily: "var(--font-rubik)", color }}>{value}</span>
      </div>
      <input type="range" min={1} max={10} value={value} onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1 rounded-full appearance-none cursor-pointer"
        style={{ background: `linear-gradient(to left, ${color} ${value * 10}%, var(--bg-card) ${value * 10}%)` }} />
    </div>
  );
}
