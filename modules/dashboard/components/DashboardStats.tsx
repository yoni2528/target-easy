"use client";

import { Eye, MousePointer, TrendingUp, Calendar } from "lucide-react";

const stats = [
  { label: "צפיות בעמוד", value: "1,247", icon: Eye, change: "+12%", color: "var(--accent-blue)" },
  { label: "הקלקות", value: "89", icon: MousePointer, change: "+5%", color: "var(--accent-green)" },
  { label: "ELO ירי", value: "1,847", icon: TrendingUp, change: "+23", color: "var(--accent-amber)" },
  { label: "אימונים החודש", value: "34", icon: Calendar, change: "+8%", color: "var(--accent-green)" },
];

export function DashboardStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {stats.map((stat) => (
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
  );
}
