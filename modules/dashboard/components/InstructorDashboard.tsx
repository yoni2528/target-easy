"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { DashboardStats } from "./DashboardStats";
import { EloTrendChart } from "./EloTrendChart";
import { ConversionFunnel } from "./ConversionFunnel";
import { LeaderboardPosition } from "./LeaderboardPosition";
import { ScheduleWidget } from "./ScheduleWidget";
import { LeadsManagement } from "./LeadsManagement";
import { BulletConnection } from "./BulletConnection";

export function InstructorDashboard() {
  return (
    <div className="min-h-screen pb-8">
      <header className="sticky top-0 z-40 bg-[var(--bg-primary)]/90 backdrop-blur-xl border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-3 px-4 h-14 max-w-3xl mx-auto">
          <Link href="/" className="w-9 h-9 rounded-lg border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)]">
            <ArrowRight className="w-5 h-5" />
          </Link>
          <h1 className="font-bold text-sm">לוח בקרה למדריך</h1>
        </div>
      </header>

      <div className="px-4 pt-6 max-w-3xl mx-auto space-y-6">
        <DashboardStats />
        <EloTrendChart />
        <ConversionFunnel />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ScheduleWidget />
          <LeadsManagement />
        </div>
        <LeaderboardPosition />
        <BulletConnection />
      </div>
    </div>
  );
}
