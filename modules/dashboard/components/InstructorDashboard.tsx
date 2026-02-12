"use client";

import { ArrowRight, Edit, Calendar, BarChart3 } from "lucide-react";
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
        <div className="flex items-center justify-between px-4 h-14 max-w-3xl mx-auto">
          <div className="flex items-center gap-3">
            <Link href="/" className="w-9 h-9 rounded-lg border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)]">
              <ArrowRight className="w-5 h-5" />
            </Link>
            <h1 className="font-bold text-sm">לוח בקרה למדריך</h1>
          </div>
          <Link href="/dashboard/edit" className="h-8 px-3 rounded-lg bg-[var(--accent-green)] text-[var(--bg-primary)] text-xs font-semibold flex items-center gap-1.5">
            <Edit className="w-3.5 h-3.5" />
            ערוך פרופיל
          </Link>
        </div>
      </header>

      <div className="px-4 pt-6 max-w-3xl mx-auto space-y-6">
        {/* Training Calendar Link */}
        <Link href="/dashboard/trainings" className="flex items-center gap-4 bg-[var(--bg-card)] border border-[var(--accent-green)]/20 rounded-xl p-4 hover:border-[var(--accent-green)]/40 transition-colors">
          <div className="w-10 h-10 rounded-lg bg-[var(--accent-green)]/10 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-[var(--accent-green)]" />
          </div>
          <div>
            <h3 className="text-sm font-semibold">יומן אימונים</h3>
            <p className="text-[10px] text-[var(--text-muted)]">צפה באימונים מתוזמנים, רשימות לקוחות ודו״חות מקצים</p>
          </div>
        </Link>

        {/* Smart Rating System Link */}
        <Link href="/dashboard/rating" className="flex items-center gap-4 bg-[var(--bg-card)] border border-[var(--accent-amber)]/20 rounded-xl p-4 hover:border-[var(--accent-amber)]/40 transition-colors">
          <div className="w-10 h-10 rounded-lg bg-[var(--accent-amber)]/10 flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-[var(--accent-amber)]" />
          </div>
          <div>
            <h3 className="text-sm font-semibold">מערכת דירוג חכמה</h3>
            <p className="text-[10px] text-[var(--text-muted)]">טבלת ליגה, מגמות שימור, שאלוני לקוחות ונוסחת ELO</p>
          </div>
        </Link>

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
