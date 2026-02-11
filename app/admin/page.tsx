"use client";

import { AuthGuard } from "@/modules/auth";
import Link from "next/link";
import { ArrowRight, Users, Settings, BarChart3, Shield } from "lucide-react";

export default function AdminPage() {
  return (
    <AuthGuard allowedRoles={["admin"]}>
      <div className="min-h-screen pb-8">
        <header className="sticky top-0 z-40 bg-[var(--bg-primary)]/90 backdrop-blur-xl border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-3 px-4 h-14 max-w-3xl mx-auto">
            <Link href="/" className="w-9 h-9 rounded-lg border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)]">
              <ArrowRight className="w-5 h-5" />
            </Link>
            <h1 className="font-bold text-sm flex items-center gap-2">
              <Shield className="w-4 h-4 text-[var(--accent-red)]" />
              פאנל מנהל
            </h1>
          </div>
        </header>

        <div className="px-4 pt-6 max-w-3xl mx-auto space-y-4">
          {[
            { href: "/admin/instructors", label: "ניהול מדריכים", desc: "הוסף, ערוך או הסר מדריכים", icon: Users, color: "var(--accent-blue)" },
            { href: "/admin", label: "סטטיסטיקות", desc: "נתוני שימוש ודוחות - בקרוב", icon: BarChart3, color: "var(--accent-green)" },
            { href: "/admin", label: "הגדרות מערכת", desc: "הגדרות כלליות - בקרוב", icon: Settings, color: "var(--accent-amber)" },
          ].map((item) => (
            <Link key={item.label} href={item.href} className="flex items-center gap-4 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4 hover:border-[var(--accent-green)]/30 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[var(--bg-elevated)] flex items-center justify-center">
                <item.icon className="w-5 h-5" style={{ color: item.color }} />
              </div>
              <div>
                <h3 className="text-sm font-semibold">{item.label}</h3>
                <p className="text-[10px] text-[var(--text-muted)]">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AuthGuard>
  );
}
