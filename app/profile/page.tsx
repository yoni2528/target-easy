"use client";

import { User, Award, Star, Settings, LogOut } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";

export default function ProfilePage() {
  return (
    <div className="min-h-screen pb-20">
      <header className="sticky top-0 z-40 bg-[var(--bg-primary)]/90 backdrop-blur-xl border-b border-[var(--border-subtle)]">
        <div className="flex items-center px-4 h-14 max-w-2xl mx-auto">
          <h1 className="font-bold">פרופיל</h1>
        </div>
      </header>

      <div className="px-4 pt-8 max-w-2xl mx-auto">
        {/* Profile header */}
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-[var(--bg-elevated)] border-2 border-[var(--border-default)] flex items-center justify-center">
            <User className="w-8 h-8 text-[var(--text-muted)]" />
          </div>
          <h2 className="text-lg font-bold mt-3">ישראל ישראלי</h2>
          <p className="text-xs text-[var(--text-muted)]">israel@example.com</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mt-6">
          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-3 text-center">
            <div className="text-xl font-bold text-[var(--accent-green)]" style={{ fontFamily: "var(--font-rubik)" }}>7</div>
            <div className="text-[10px] text-[var(--text-muted)] mt-0.5">אימונים</div>
          </div>
          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-3 text-center">
            <div className="text-xl font-bold text-[var(--accent-amber)]" style={{ fontFamily: "var(--font-rubik)" }}>1,420</div>
            <div className="text-[10px] text-[var(--text-muted)] mt-0.5">דירוג ELO</div>
          </div>
          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-3 text-center">
            <div className="flex items-center justify-center gap-0.5">
              <Star className="w-4 h-4 text-[var(--accent-amber)] fill-[var(--accent-amber)]" />
              <span className="text-xl font-bold" style={{ fontFamily: "var(--font-rubik)" }}>4.2</span>
            </div>
            <div className="text-[10px] text-[var(--text-muted)] mt-0.5">ממוצע ציונים</div>
          </div>
        </div>

        {/* Menu */}
        <div className="mt-8 space-y-1">
          {[
            { icon: Award, label: "הדירוג שלי", desc: "צפה בדירוג ובהתקדמות" },
            { icon: Settings, label: "הגדרות", desc: "שנה פרטים אישיים" },
            { icon: LogOut, label: "התנתק", desc: "" },
          ].map((item) => (
            <button key={item.label} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--bg-card)] transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[var(--bg-elevated)] flex items-center justify-center">
                <item.icon className="w-5 h-5 text-[var(--text-muted)]" />
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">{item.label}</div>
                {item.desc && <div className="text-[10px] text-[var(--text-muted)]">{item.desc}</div>}
              </div>
            </button>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
