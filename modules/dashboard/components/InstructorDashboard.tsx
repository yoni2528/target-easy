"use client";

import { ArrowRight, Eye, MousePointer, TrendingUp, Calendar, MessageSquare, Users, Clock } from "lucide-react";
import Link from "next/link";

const mockLeads = [
  { id: "1", name: "יוסי כהן", type: "רענון", date: "היום, 10:30", status: "new" },
  { id: "2", name: "שרה לוי", type: "מתחמש חדש", date: "אתמול, 14:00", status: "contacted" },
  { id: "3", name: "דני אברהם", type: "חידוש", date: "לפני יומיים", status: "new" },
];

const mockSchedule = [
  { time: "09:00", trainee: "אבי מזרחי", type: "רענון" },
  { time: "11:00", trainee: "נועה לב", type: "מתחמש חדש" },
  { time: "14:00", trainee: "גיל עוז", type: "חידוש" },
  { time: "16:00", trainee: "תמר שמש", type: "רענון" },
];

export function InstructorDashboard() {
  return (
    <div className="min-h-screen pb-8">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[var(--bg-primary)]/90 backdrop-blur-xl border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-3 px-4 h-14 max-w-3xl mx-auto">
          <Link href="/" className="w-9 h-9 rounded-lg border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)]">
            <ArrowRight className="w-5 h-5" />
          </Link>
          <h1 className="font-bold text-sm">לוח בקרה למדריך</h1>
        </div>
      </header>

      <div className="px-4 pt-6 max-w-3xl mx-auto space-y-6">
        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "צפיות בעמוד", value: "1,247", icon: Eye, change: "+12%", color: "var(--accent-blue)" },
            { label: "הקלקות", value: "89", icon: MousePointer, change: "+5%", color: "var(--accent-green)" },
            { label: "דירוג ELO", value: "1,847", icon: TrendingUp, change: "+23", color: "var(--accent-amber)" },
            { label: "אימונים החודש", value: "34", icon: Calendar, change: "+8%", color: "var(--accent-green)" },
          ].map((stat) => (
            <div key={stat.label} className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4">
              <div className="flex items-center justify-between">
                <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
                <span className="text-[10px] font-medium text-[var(--accent-green)]">{stat.change}</span>
              </div>
              <div className="text-xl font-bold mt-2" style={{ fontFamily: "var(--font-rubik)", color: stat.color }}>
                {stat.value}
              </div>
              <div className="text-[10px] text-[var(--text-muted)] mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* ELO Trend placeholder */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[var(--accent-amber)]" />
            מגמת דירוג ELO
          </h3>
          <div className="h-32 mt-3 flex items-end gap-1">
            {[1780, 1790, 1802, 1810, 1825, 1830, 1835, 1840, 1842, 1845, 1847, 1847].map((v, i) => (
              <div key={i} className="flex-1 rounded-t" style={{
                height: `${((v - 1770) / 80) * 100}%`,
                background: i === 11 ? "var(--accent-amber)" : "var(--border-default)",
              }} />
            ))}
          </div>
          <div className="flex justify-between text-[10px] text-[var(--text-muted)] mt-1">
            <span>ינואר</span>
            <span>פברואר</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Schedule */}
          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4">
            <h3 className="text-sm font-semibold flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-[var(--accent-green)]" />
              לוח הזמנים - היום
            </h3>
            <div className="space-y-2">
              {mockSchedule.map((s) => (
                <div key={s.time} className="flex items-center justify-between py-2 border-b border-[var(--border-subtle)] last:border-0">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-[var(--accent-green)]" style={{ fontFamily: "var(--font-rubik)" }}>{s.time}</span>
                    <span className="text-sm">{s.trainee}</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-[var(--bg-elevated)] text-[var(--text-muted)]">{s.type}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Leads */}
          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4">
            <h3 className="text-sm font-semibold flex items-center gap-2 mb-3">
              <Users className="w-4 h-4 text-[var(--accent-blue)]" />
              לידים ({mockLeads.length})
            </h3>
            <div className="space-y-2">
              {mockLeads.map((lead) => (
                <div key={lead.id} className="flex items-center justify-between py-2 border-b border-[var(--border-subtle)] last:border-0">
                  <div>
                    <span className="text-sm font-medium">{lead.name}</span>
                    <div className="text-[10px] text-[var(--text-muted)]">{lead.type} · {lead.date}</div>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-md ${
                    lead.status === "new"
                      ? "bg-[var(--accent-green)]/10 text-[var(--accent-green)]"
                      : "bg-[var(--accent-amber)]/10 text-[var(--accent-amber)]"
                  }`}>
                    {lead.status === "new" ? "חדש" : "בטיפול"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chat placeholder */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4">
          <h3 className="text-sm font-semibold flex items-center gap-2 mb-3">
            <MessageSquare className="w-4 h-4 text-[var(--accent-green)]" />
            הודעות
          </h3>
          <div className="flex items-center justify-center h-24 border border-dashed border-[var(--border-default)] rounded-xl">
            <p className="text-xs text-[var(--text-muted)]">ממשק צ׳אט - בקרוב</p>
          </div>
        </div>
      </div>
    </div>
  );
}
