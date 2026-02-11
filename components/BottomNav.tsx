"use client";

import { Search, Sparkles, Heart, Clock } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguageStore } from "@/lib/language-store";
import { useT } from "@/lib/translations";

export function BottomNav() {
  const pathname = usePathname();
  const lang = useLanguageStore((s) => s.lang);
  const t = useT(lang);

  const tabs = [
    { href: "/", label: t("navSearch"), icon: Search },
    { href: "/quiz", label: t("navQuiz"), icon: Sparkles },
    { href: "/favorites", label: t("navFavorites"), icon: Heart },
    { href: "/history", label: t("navHistory"), icon: Clock },
  ];

  return (
    <nav className="fixed bottom-3 left-3 right-3 z-50 bg-[var(--bg-card)]/95 backdrop-blur-xl border border-[var(--border-subtle)] rounded-2xl shadow-lg shadow-black/20">
      <div className="flex items-center justify-around h-14 max-w-lg mx-auto px-2">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          const Icon = tab.icon;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-xl transition-all duration-200 relative ${
                isActive
                  ? "text-[var(--accent-green)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
              }`}
            >
              <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 1.5} />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
