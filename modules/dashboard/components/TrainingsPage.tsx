"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { TrainingCalendar } from "./TrainingCalendar";
import { TrainingDetail } from "./TrainingDetail";
import { ShooterLogForm } from "./ShooterLogForm";
import { BatchShooterLog } from "./BatchShooterLog";
import type { ScheduledTraining, TrainingClient, ShooterLogEntry } from "../types";

type View = "calendar" | "detail" | "report" | "batch-report";

export function TrainingsPage() {
  const [view, setView] = useState<View>("calendar");
  const [selectedTraining, setSelectedTraining] = useState<ScheduledTraining | null>(null);
  const [selectedClient, setSelectedClient] = useState<TrainingClient | null>(null);

  const handleSelectTraining = (training: ScheduledTraining) => {
    setSelectedTraining(training);
    setView("detail");
  };

  const handleOpenReport = (client: TrainingClient) => {
    setSelectedClient(client);
    setView("report");
  };

  const handleReportSubmit = (entry: ShooterLogEntry) => {
    if (selectedTraining && selectedClient) {
      const client = selectedTraining.clients.find((c) => c.id === selectedClient.id);
      if (client) client.reportFilled = true;
    }
  };

  const handleBatchSubmit = (entries: ShooterLogEntry[]) => {
    if (selectedTraining) {
      for (const entry of entries) {
        const client = selectedTraining.clients.find((c) => c.id === entry.clientId);
        if (client) client.reportFilled = true;
      }
    }
  };

  return (
    <div className="min-h-screen pb-8">
      <header className="sticky top-0 z-40 bg-[var(--bg-primary)]/90 backdrop-blur-xl border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-3 px-4 h-14 max-w-3xl mx-auto">
          <Link href="/dashboard" className="w-9 h-9 rounded-lg border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)]">
            <ArrowRight className="w-5 h-5" />
          </Link>
          <h1 className="font-bold text-sm flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[var(--accent-green)]" />
            יומן אימונים
          </h1>
        </div>
      </header>

      <div className="px-4 pt-4 max-w-3xl mx-auto">
        {view === "calendar" && (
          <TrainingCalendar onSelectTraining={handleSelectTraining} />
        )}
        {view === "detail" && selectedTraining && (
          <TrainingDetail
            training={selectedTraining}
            onBack={() => setView("calendar")}
            onOpenReport={handleOpenReport}
            onOpenBatchReport={() => setView("batch-report")}
          />
        )}
        {view === "report" && selectedClient && (
          <ShooterLogForm
            client={selectedClient}
            onBack={() => setView("detail")}
            onSubmit={handleReportSubmit}
          />
        )}
        {view === "batch-report" && selectedTraining && (
          <BatchShooterLog
            clients={selectedTraining.clients}
            onBack={() => setView("detail")}
            onSubmitAll={handleBatchSubmit}
          />
        )}
      </div>
    </div>
  );
}
