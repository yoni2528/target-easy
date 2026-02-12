"use client";

import { ArrowRight, Clock, MapPin, Users, Phone, FileText, CheckCircle, ChevronDown, ChevronUp, ClipboardList } from "lucide-react";
import type { ScheduledTraining, TrainingClient } from "../types";
import { useState } from "react";

interface TrainingDetailProps {
  training: ScheduledTraining;
  onBack: () => void;
  onOpenReport: (client: TrainingClient) => void;
  onOpenBatchReport: () => void;
}

export function TrainingDetail({ training, onBack, onOpenReport, onOpenBatchReport }: TrainingDetailProps) {
  const [expandedClient, setExpandedClient] = useState<string | null>(null);

  const statusColor = (s: ScheduledTraining["status"]) => {
    switch (s) {
      case "completed": return "var(--text-muted)";
      case "in-progress": return "var(--accent-amber)";
      case "upcoming": return "var(--accent-green)";
    }
  };

  const statusLabel = (s: ScheduledTraining["status"]) => {
    switch (s) {
      case "completed": return "הושלם";
      case "in-progress": return "בתהליך";
      case "upcoming": return "קרוב";
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="w-9 h-9 rounded-lg border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)]">
          <ArrowRight className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-sm font-bold">פרטי אימון</h2>
          <p className="text-[10px] text-[var(--text-muted)]">{training.date}</p>
        </div>
      </div>

      {/* Training info card */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold">{training.trainingType}</span>
          <span className="text-[10px] px-2 py-0.5 rounded-md" style={{ background: `color-mix(in srgb, ${statusColor(training.status)} 15%, transparent)`, color: statusColor(training.status) }}>
            {statusLabel(training.status)}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="flex items-center gap-1.5 text-[11px] text-[var(--text-secondary)]">
            <Clock className="w-3.5 h-3.5 text-[var(--accent-green)]" />
            {training.time}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-[var(--text-secondary)]">
            <MapPin className="w-3.5 h-3.5 text-[var(--accent-blue)]" />
            {training.range}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-[var(--text-secondary)]">
            <Users className="w-3.5 h-3.5 text-[var(--accent-amber)]" />
            {training.clients.length} לקוחות
          </div>
        </div>
      </div>

      {/* Batch report button */}
      <button
        onClick={onOpenBatchReport}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[var(--accent-green)] text-[var(--bg-primary)] text-sm font-bold"
      >
        <ClipboardList className="w-5 h-5" />
        מלא דו״ח מקצים לכל הלקוחות ({training.clients.length})
      </button>

      {/* Client list */}
      <div>
        <h3 className="text-xs font-semibold text-[var(--text-muted)] mb-2 flex items-center gap-2">
          <Users className="w-3.5 h-3.5" />
          רשימת לקוחות ({training.clients.length})
        </h3>
        <div className="space-y-2">
          {training.clients.map((client) => {
            const expanded = expandedClient === client.id;
            return (
              <div key={client.id} className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl overflow-hidden">
                <button
                  onClick={() => setExpandedClient(expanded ? null : client.id)}
                  className="w-full flex items-center justify-between p-3 hover:bg-[var(--bg-elevated)]/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[var(--bg-elevated)] flex items-center justify-center text-xs font-bold text-[var(--accent-green)]">
                      {client.name.charAt(0)}
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">{client.name}</p>
                      <p className="text-[10px] text-[var(--text-muted)]">{client.weaponType} · {client.caliber}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {client.reportFilled && (
                      <CheckCircle className="w-4 h-4 text-[var(--accent-green)]" />
                    )}
                    {expanded ? <ChevronUp className="w-4 h-4 text-[var(--text-muted)]" /> : <ChevronDown className="w-4 h-4 text-[var(--text-muted)]" />}
                  </div>
                </button>

                {expanded && (
                  <div className="px-3 pb-3 border-t border-[var(--border-subtle)] pt-3 space-y-2">
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div className="bg-[var(--bg-elevated)] rounded-lg p-2">
                        <p className="text-[9px] text-[var(--text-muted)]">טלפון</p>
                        <a href={`tel:${client.phone}`} className="font-medium text-[var(--accent-blue)] flex items-center gap-1">
                          <Phone className="w-3 h-3" /> {client.phone}
                        </a>
                      </div>
                      <div className="bg-[var(--bg-elevated)] rounded-lg p-2">
                        <p className="text-[9px] text-[var(--text-muted)]">ת.ז.</p>
                        <p className="font-medium">{client.idNumber}</p>
                      </div>
                      <div className="bg-[var(--bg-elevated)] rounded-lg p-2">
                        <p className="text-[9px] text-[var(--text-muted)]">מס׳ רישיון</p>
                        <p className="font-medium">{client.licenseNumber}</p>
                      </div>
                      <div className="bg-[var(--bg-elevated)] rounded-lg p-2">
                        <p className="text-[9px] text-[var(--text-muted)]">תוקף רישיון</p>
                        <p className="font-medium">{client.licenseExpiry}</p>
                      </div>
                      <div className="bg-[var(--bg-elevated)] rounded-lg p-2">
                        <p className="text-[9px] text-[var(--text-muted)]">סוג נשק</p>
                        <p className="font-medium">{client.weaponType}</p>
                      </div>
                      <div className="bg-[var(--bg-elevated)] rounded-lg p-2">
                        <p className="text-[9px] text-[var(--text-muted)]">מס׳ סידורי</p>
                        <p className="font-medium">{client.serialNumber}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => onOpenReport(client)}
                      className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                        client.reportFilled
                          ? "bg-[var(--bg-elevated)] text-[var(--text-secondary)]"
                          : "bg-[var(--accent-green)] text-[var(--bg-primary)]"
                      }`}
                    >
                      <FileText className="w-4 h-4" />
                      {client.reportFilled ? "צפה בדו״ח מקצים" : "מלא דו״ח מקצים"}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
