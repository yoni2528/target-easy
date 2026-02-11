"use client";

import { Heart, ArrowRight } from "lucide-react";
import Link from "next/link";
import { BottomNav } from "@/components/BottomNav";

export default function FavoritesPage() {
  return (
    <div className="min-h-screen pb-24">
      <header className="sticky top-0 z-40 bg-[var(--bg-primary)]/90 backdrop-blur-xl border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-3 px-4 h-14 max-w-2xl mx-auto">
          <Link href="/" className="w-9 h-9 rounded-lg border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)]">
            <ArrowRight className="w-5 h-5" />
          </Link>
          <h1 className="font-bold text-sm">מועדפים</h1>
        </div>
      </header>

      <div className="px-4 pt-12 max-w-2xl mx-auto text-center">
        <Heart className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-4" strokeWidth={1} />
        <h2 className="text-base font-bold mb-2">אין מועדפים עדיין</h2>
        <p className="text-xs text-[var(--text-muted)] max-w-[250px] mx-auto">
          לחצו על הלב בכרטיס מדריך כדי להוסיף אותו למועדפים
        </p>
      </div>

      <BottomNav />
    </div>
  );
}
