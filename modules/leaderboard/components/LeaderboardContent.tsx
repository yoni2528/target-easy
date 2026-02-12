"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Trophy, Crosshair, GraduationCap, Star, Users, Shield, Medal } from "lucide-react";
import { MOCK_INSTRUCTORS } from "@/modules/instructors";
import { useLanguageStore } from "@/lib/language-store";
import { useT } from "@/lib/translations";
import { BottomNav } from "@/components/BottomNav";

type Category = "shooting" | "instruction" | "stars" | "trainees";

const MEDAL_COLORS = ["#fbbf24", "#c0c0c0", "#cd7f32"];

export function LeaderboardContent() {
  const [category, setCategory] = useState<Category>("shooting");
  const lang = useLanguageStore((s) => s.lang);
  const t = useT(lang);

  const categories: { id: Category; label: string; icon: typeof Crosshair }[] = [
    { id: "shooting", label: t("lbShooting"), icon: Crosshair },
    { id: "instruction", label: t("lbInstruction"), icon: GraduationCap },
    { id: "stars", label: t("lbStars"), icon: Star },
    { id: "trainees", label: t("lbTrainees"), icon: Users },
  ];

  const top10 = useMemo(() => {
    const sorted = [...MOCK_INSTRUCTORS].sort((a, b) => {
      switch (category) {
        case "shooting": return b.eloShooting - a.eloShooting;
        case "instruction": return b.eloInstruction - a.eloInstruction;
        case "stars": return b.stars - a.stars;
        case "trainees": return b.trainees - a.trainees;
      }
    });
    return sorted.slice(0, 10);
  }, [category]);

  const getValue = (inst: (typeof MOCK_INSTRUCTORS)[0]) => {
    switch (category) {
      case "shooting": return inst.eloShooting;
      case "instruction": return inst.eloInstruction;
      case "stars": return inst.stars;
      case "trainees": return inst.trainees;
    }
  };

  const maxVal = top10.length > 0 ? getValue(top10[0]) : 1;

  return (
    <div className="min-h-screen pb-24">
      <header className="sticky top-0 z-40 bg-[var(--bg-primary)]/90 backdrop-blur-xl border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-3 px-4 h-14 max-w-2xl mx-auto">
          <Link href="/" className="w-9 h-9 rounded-lg border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)]">
            <ArrowRight className="w-5 h-5" />
          </Link>
          <h1 className="font-bold text-sm flex items-center gap-2">
            <Trophy className="w-4 h-4 text-[var(--accent-amber)]" />
            {t("lbTitle")}
          </h1>
        </div>
      </header>

      <div className="px-4 pt-4 max-w-2xl mx-auto space-y-4">
        {/* Category selector */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {categories.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setCategory(id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border whitespace-nowrap transition-colors ${
                category === id
                  ? "bg-[var(--accent-green)] text-[var(--bg-primary)] border-[var(--accent-green)]"
                  : "bg-[var(--bg-card)] text-[var(--text-secondary)] border-[var(--border-subtle)]"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </button>
          ))}
        </div>

        {/* Top 3 podium */}
        {top10.length >= 3 && (
          <div className="grid grid-cols-3 gap-2 items-end">
            {[1, 0, 2].map((rank) => {
              const inst = top10[rank];
              const isFirst = rank === 0;
              return (
                <Link key={inst.id} href={`/instructor/${inst.id}`} className={`text-center ${isFirst ? "order-2" : rank === 1 ? "order-1" : "order-3"}`}>
                  <div className={`relative bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-3 ${isFirst ? "pb-5 -mb-2" : ""} hover:border-[var(--accent-green)]/30 transition-colors`}>
                    <div className="relative inline-block">
                      <img src={inst.photo} alt={inst.name} className={`${isFirst ? "w-16 h-16" : "w-12 h-12"} rounded-full object-cover border-2`} style={{ borderColor: MEDAL_COLORS[rank] }} />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold" style={{ background: MEDAL_COLORS[rank], color: "#0a0f0d" }}>
                        {rank + 1}
                      </div>
                    </div>
                    <p className={`${isFirst ? "text-xs" : "text-[10px]"} font-bold mt-1.5 truncate`}>{inst.name}</p>
                    <p className={`${isFirst ? "text-sm" : "text-xs"} font-bold mt-0.5`} style={{ color: MEDAL_COLORS[rank], fontFamily: "var(--font-rubik)" }}>
                      {category === "stars" ? `${getValue(inst)} ⭐` : getValue(inst).toLocaleString()}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Rest of top 10 */}
        <div className="space-y-2">
          {top10.slice(3).map((inst, i) => {
            const rank = i + 4;
            const val = getValue(inst);
            return (
              <Link key={inst.id} href={`/instructor/${inst.id}`} className="flex items-center gap-3 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-3 hover:border-[var(--accent-green)]/30 transition-colors">
                <span className="w-6 text-center text-xs font-bold text-[var(--text-muted)]" style={{ fontFamily: "var(--font-rubik)" }}>{rank}</span>
                <img src={inst.photo} alt={inst.name} className="w-10 h-10 rounded-full object-cover border border-[var(--border-subtle)]" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate flex items-center gap-1">
                    {inst.name}
                    {inst.verified && <Shield className="w-3 h-3 text-[var(--accent-green)]" />}
                  </p>
                  <p className="text-[10px] text-[var(--text-muted)]">{inst.city}</p>
                </div>
                <div className="text-left flex items-center gap-2">
                  <div className="w-16 h-1.5 rounded-full bg-[var(--bg-primary)] overflow-hidden">
                    <div className="h-full rounded-full bg-[var(--accent-green)]" style={{ width: `${(val / maxVal) * 100}%` }} />
                  </div>
                  <span className="text-xs font-bold text-[var(--text-primary)] w-12 text-left" style={{ fontFamily: "var(--font-rubik)" }}>
                    {category === "stars" ? val : val.toLocaleString()}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
