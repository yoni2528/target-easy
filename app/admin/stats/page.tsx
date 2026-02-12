"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ArrowRight, BarChart3, Users, TrendingUp, MapPin, Shield, Calendar, Target, Star, Activity } from "lucide-react";
import { AuthGuard } from "@/modules/auth";
import { MOCK_INSTRUCTORS } from "@/modules/instructors";
import { MOCK_TRAININGS } from "@/modules/dashboard";
import { MOCK_RATING_HISTORY } from "@/modules/rating/lib/mock-ratings";

export default function SystemStatsPage() {
  const stats = useMemo(() => computeStats(), []);

  return (
    <AuthGuard allowedRoles={["admin"]}>
      <div className="min-h-screen pb-8">
        <header className="sticky top-0 z-40 bg-[var(--bg-primary)]/90 backdrop-blur-xl border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-3 px-4 h-14 max-w-3xl mx-auto">
            <Link href="/admin" className="w-9 h-9 rounded-lg border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)]">
              <ArrowRight className="w-5 h-5" />
            </Link>
            <h1 className="font-bold text-sm flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[var(--accent-green)]" />
              סטטיסטיקות מערכת
            </h1>
          </div>
        </header>

        <div className="px-4 pt-4 max-w-3xl mx-auto space-y-4">
          <OverviewCards stats={stats} />
          <TrainingBreakdown stats={stats} />
          <CityDistribution stats={stats} />
          <TopInstructors stats={stats} />
          <EloDistribution stats={stats} />
          <MonthlyTrend />
        </div>
      </div>
    </AuthGuard>
  );
}

/* ── Stats computation ── */
interface Stats {
  totalInstructors: number;
  activeInstructors: number;
  verifiedCount: number;
  totalTrainees: number;
  avgElo: number;
  avgStars: number;
  totalTrainings: number;
  completedTrainings: number;
  totalClients: number;
  cities: { name: string; count: number }[];
  trainingTypes: { name: string; count: number }[];
  topByElo: typeof MOCK_INSTRUCTORS;
  topByTrainees: typeof MOCK_INSTRUCTORS;
  eloRanges: { label: string; count: number; color: string }[];
}

function computeStats(): Stats {
  const ins = MOCK_INSTRUCTORS;
  const totalClients = MOCK_TRAININGS.reduce((s, t) => s + t.clients.length, 0);

  // City distribution
  const cityMap = new Map<string, number>();
  ins.forEach((i) => cityMap.set(i.city, (cityMap.get(i.city) ?? 0) + 1));
  const cities = [...cityMap.entries()].map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);

  // Training type frequency (from instructors' offered types)
  const typeMap = new Map<string, number>();
  ins.forEach((i) => i.trainingTypes.forEach((t) => typeMap.set(t, (typeMap.get(t) ?? 0) + 1)));
  const trainingTypes = [...typeMap.entries()].map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);

  // ELO ranges
  const eloRanges = [
    { label: "1200-1399", count: ins.filter((i) => i.eloShooting >= 1200 && i.eloShooting < 1400).length, color: "var(--text-muted)" },
    { label: "1400-1599", count: ins.filter((i) => i.eloShooting >= 1400 && i.eloShooting < 1600).length, color: "var(--accent-blue)" },
    { label: "1600-1799", count: ins.filter((i) => i.eloShooting >= 1600 && i.eloShooting < 1800).length, color: "var(--accent-amber)" },
    { label: "1800+", count: ins.filter((i) => i.eloShooting >= 1800).length, color: "var(--accent-green)" },
  ];

  return {
    totalInstructors: ins.length,
    activeInstructors: ins.filter((i) => i.available).length,
    verifiedCount: ins.filter((i) => i.verified).length,
    totalTrainees: ins.reduce((s, i) => s + i.trainees, 0),
    avgElo: Math.round(ins.reduce((s, i) => s + i.eloShooting, 0) / ins.length),
    avgStars: +(ins.reduce((s, i) => s + i.stars, 0) / ins.length).toFixed(1),
    totalTrainings: MOCK_TRAININGS.length,
    completedTrainings: MOCK_TRAININGS.filter((t) => t.status === "completed").length,
    totalClients,
    cities,
    trainingTypes,
    topByElo: [...ins].sort((a, b) => b.eloShooting - a.eloShooting).slice(0, 5),
    topByTrainees: [...ins].sort((a, b) => b.trainees - a.trainees).slice(0, 5),
    eloRanges,
  };
}

/* ── Overview Cards ── */
function OverviewCards({ stats }: { stats: Stats }) {
  const cards = [
    { label: "מדריכים", value: stats.totalInstructors, sub: `${stats.activeInstructors} פעילים`, icon: Users, color: "var(--accent-green)" },
    { label: "מתאמנים", value: stats.totalTrainees.toLocaleString(), sub: `${stats.totalClients} בשבוע`, icon: Target, color: "var(--accent-blue)" },
    { label: "ממוצע ELO", value: stats.avgElo, sub: `${stats.verifiedCount} מאומתים`, icon: TrendingUp, color: "var(--accent-amber)" },
    { label: "אימונים", value: stats.totalTrainings, sub: `${stats.completedTrainings} הושלמו`, icon: Calendar, color: "var(--accent-green)" },
    { label: "ממוצע כוכבים", value: stats.avgStars, sub: `מתוך 5`, icon: Star, color: "var(--accent-amber)" },
    { label: "ערים", value: stats.cities.length, sub: "פריסה ארצית", icon: MapPin, color: "var(--accent-blue)" },
  ];
  return (
    <div className="grid grid-cols-3 gap-2">
      {cards.map((c) => (
        <div key={c.label} className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-3 text-center">
          <c.icon className="w-4 h-4 mx-auto mb-1" style={{ color: c.color }} />
          <p className="text-lg font-bold" style={{ fontFamily: "var(--font-rubik)", color: c.color }}>{c.value}</p>
          <p className="text-[10px] font-medium text-[var(--text-secondary)]">{c.label}</p>
          <p className="text-[9px] text-[var(--text-muted)]">{c.sub}</p>
        </div>
      ))}
    </div>
  );
}

/* ── Training Type Breakdown ── */
function TrainingBreakdown({ stats }: { stats: Stats }) {
  const max = stats.trainingTypes[0]?.count ?? 1;
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4">
      <p className="text-xs font-bold mb-3 flex items-center gap-2"><Target className="w-4 h-4 text-[var(--accent-green)]" /> סוגי אימון - מדריכים מציעים</p>
      <div className="space-y-2">
        {stats.trainingTypes.map((t) => (
          <div key={t.name} className="flex items-center gap-2">
            <span className="text-[11px] text-[var(--text-secondary)] w-28 shrink-0 truncate">{t.name}</span>
            <div className="flex-1 h-2 rounded-full bg-[var(--bg-elevated)] overflow-hidden">
              <div className="h-full rounded-full bg-[var(--accent-green)]" style={{ width: `${(t.count / max) * 100}%` }} />
            </div>
            <span className="text-[10px] font-bold w-5 text-left" style={{ fontFamily: "var(--font-rubik)" }}>{t.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── City Distribution ── */
function CityDistribution({ stats }: { stats: Stats }) {
  const max = stats.cities[0]?.count ?? 1;
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4">
      <p className="text-xs font-bold mb-3 flex items-center gap-2"><MapPin className="w-4 h-4 text-[var(--accent-blue)]" /> פריסה גיאוגרפית</p>
      <div className="space-y-2">
        {stats.cities.map((c) => (
          <div key={c.name} className="flex items-center gap-2">
            <span className="text-[11px] text-[var(--text-secondary)] w-20 shrink-0 truncate">{c.name}</span>
            <div className="flex-1 h-2 rounded-full bg-[var(--bg-elevated)] overflow-hidden">
              <div className="h-full rounded-full bg-[var(--accent-blue)]" style={{ width: `${(c.count / max) * 100}%` }} />
            </div>
            <span className="text-[10px] font-bold w-5 text-left" style={{ fontFamily: "var(--font-rubik)" }}>{c.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Top Instructors ── */
function TopInstructors({ stats }: { stats: Stats }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4">
        <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">ELO גבוה ביותר</p>
        {stats.topByElo.map((i, idx) => (
          <div key={i.id} className="flex items-center gap-2 py-1.5 border-b border-[var(--border-subtle)] last:border-0">
            <span className="text-[10px] font-bold w-4 text-[var(--text-muted)]" style={{ fontFamily: "var(--font-rubik)" }}>{idx + 1}</span>
            <img src={i.photo} alt={i.name} className="w-6 h-6 rounded-full object-cover" />
            <span className="text-[11px] flex-1 truncate">{i.name}</span>
            <span className="text-[11px] font-bold text-[var(--accent-amber)]" style={{ fontFamily: "var(--font-rubik)" }}>{i.eloShooting}</span>
          </div>
        ))}
      </div>
      <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4">
        <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2">הכי הרבה מתאמנים</p>
        {stats.topByTrainees.map((i, idx) => (
          <div key={i.id} className="flex items-center gap-2 py-1.5 border-b border-[var(--border-subtle)] last:border-0">
            <span className="text-[10px] font-bold w-4 text-[var(--text-muted)]" style={{ fontFamily: "var(--font-rubik)" }}>{idx + 1}</span>
            <img src={i.photo} alt={i.name} className="w-6 h-6 rounded-full object-cover" />
            <span className="text-[11px] flex-1 truncate">{i.name}</span>
            <span className="text-[11px] font-bold text-[var(--accent-green)]" style={{ fontFamily: "var(--font-rubik)" }}>{i.trainees}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── ELO Distribution ── */
function EloDistribution({ stats }: { stats: Stats }) {
  const max = Math.max(...stats.eloRanges.map((r) => r.count), 1);
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4">
      <p className="text-xs font-bold mb-3 flex items-center gap-2"><Activity className="w-4 h-4 text-[var(--accent-amber)]" /> התפלגות ELO</p>
      <div className="flex items-end gap-2 h-20">
        {stats.eloRanges.map((r) => (
          <div key={r.label} className="flex-1 flex flex-col items-center gap-1">
            <span className="text-[10px] font-bold" style={{ fontFamily: "var(--font-rubik)", color: r.color }}>{r.count}</span>
            <div className="w-full rounded-t-md" style={{ height: `${(r.count / max) * 60}px`, background: r.color, minHeight: 4 }} />
            <span className="text-[9px] text-[var(--text-muted)]">{r.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Monthly Trend (from rating history) ── */
function MonthlyTrend() {
  const months = [...new Set(MOCK_RATING_HISTORY.map((r) => r.month))].sort();
  const monthlyAvg = months.map((m) => {
    const entries = MOCK_RATING_HISTORY.filter((r) => r.month === m);
    return {
      month: m.slice(5),
      avgElo: Math.round(entries.reduce((s, e) => s + e.elo, 0) / entries.length),
      avgRetention: +(entries.reduce((s, e) => s + e.retentionRate, 0) / entries.length * 100).toFixed(0),
      totalTrainings: entries.reduce((s, e) => s + e.trainingsCount, 0),
    };
  });
  const maxElo = Math.max(...monthlyAvg.map((m) => m.avgElo));
  const minElo = Math.min(...monthlyAvg.map((m) => m.avgElo));

  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4">
      <p className="text-xs font-bold mb-3 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-[var(--accent-green)]" /> מגמות חודשיות</p>
      <div className="overflow-x-auto">
        <table className="w-full text-[11px]" dir="rtl">
          <thead>
            <tr className="text-[var(--text-muted)]">
              <th className="text-right py-1.5 font-medium">חודש</th>
              <th className="text-center py-1.5 font-medium">ממוצע ELO</th>
              <th className="text-center py-1.5 font-medium">שימור %</th>
              <th className="text-center py-1.5 font-medium">אימונים</th>
            </tr>
          </thead>
          <tbody>
            {monthlyAvg.map((m) => (
              <tr key={m.month} className="border-t border-[var(--border-subtle)]">
                <td className="py-1.5 font-medium" style={{ fontFamily: "var(--font-rubik)" }}>{m.month}</td>
                <td className="text-center py-1.5">
                  <span className="font-bold text-[var(--accent-amber)]" style={{ fontFamily: "var(--font-rubik)" }}>{m.avgElo}</span>
                </td>
                <td className="text-center py-1.5">
                  <span className={`font-bold ${m.avgRetention >= 75 ? "text-[var(--accent-green)]" : "text-[var(--accent-amber)]"}`} style={{ fontFamily: "var(--font-rubik)" }}>{m.avgRetention}%</span>
                </td>
                <td className="text-center py-1.5 font-bold" style={{ fontFamily: "var(--font-rubik)" }}>{m.totalTrainings}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
