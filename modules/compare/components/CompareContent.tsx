"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight, GitCompareArrows, ChevronDown, Star, Users, TrendingUp, Shield, Trophy, MapPin } from "lucide-react";
import { MOCK_INSTRUCTORS, useCompareStore } from "@/modules/instructors";
import { useLanguageStore } from "@/lib/language-store";
import { useT } from "@/lib/translations";
import { BottomNav } from "@/components/BottomNav";

function StatBar({ value, max, color }: { value: number; max: number; color: string }) {
  return (
    <div className="w-full h-1.5 rounded-full bg-[var(--bg-primary)] overflow-hidden">
      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(value / max) * 100}%`, background: color }} />
    </div>
  );
}

export function CompareContent() {
  const searchParams = useSearchParams();
  const paramA = searchParams.get("a") ?? "";
  const paramB = searchParams.get("b") ?? "";
  const [idA, setIdA] = useState<string>(paramA);
  const [idB, setIdB] = useState<string>(paramB);
  const clearStore = useCompareStore((s) => s.clear);
  const lang = useLanguageStore((s) => s.lang);

  // Sync from URL params and clear the compare store (user landed on compare page)
  useEffect(() => {
    if (paramA) setIdA(paramA);
    if (paramB) setIdB(paramB);
    if (paramA && paramB) clearStore();
  }, [paramA, paramB, clearStore]);
  const t = useT(lang);

  const instA = MOCK_INSTRUCTORS.find((i) => i.id === idA);
  const instB = MOCK_INSTRUCTORS.find((i) => i.id === idB);
  const bothSelected = instA && instB;

  const rows = bothSelected
    ? [
        { label: t("compareEloShooting"), a: instA.eloShooting, b: instB.eloShooting, max: 2000, color: "var(--accent-amber)" },
        { label: t("compareEloInstruction"), a: instA.eloInstruction, b: instB.eloInstruction, max: 2000, color: "var(--accent-blue)" },
        { label: t("compareStars"), a: instA.stars, b: instB.stars, max: 5, color: "var(--accent-green)" },
        { label: t("compareTrainees"), a: instA.trainees, b: instB.trainees, max: Math.max(instA.trainees, instB.trainees), color: "var(--accent-green)" },
        { label: t("compareService"), a: instA.metrics.service, b: instB.metrics.service, max: 5, color: "var(--accent-green)" },
        { label: t("compareProfessionalism"), a: instA.metrics.professionalism, b: instB.metrics.professionalism, max: 5, color: "var(--accent-green)" },
        { label: t("compareQuality"), a: instA.metrics.quality, b: instB.metrics.quality, max: 5, color: "var(--accent-green)" },
        { label: t("compareExperience"), a: instA.experience, b: instB.experience, max: Math.max(instA.experience, instB.experience), color: "var(--accent-green)" },
        { label: t("comparePrice"), a: instA.priceFrom, b: instB.priceFrom, max: Math.max(instA.priceFrom, instB.priceFrom), color: "var(--accent-amber)", lowerBetter: true },
      ]
    : [];

  return (
    <div className="min-h-screen pb-24">
      <header className="sticky top-0 z-40 bg-[var(--bg-primary)]/90 backdrop-blur-xl border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-3 px-4 h-14 max-w-2xl mx-auto">
          <Link href="/" className="w-9 h-9 rounded-lg border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)]">
            <ArrowRight className="w-5 h-5" />
          </Link>
          <h1 className="font-bold text-sm flex items-center gap-2">
            <GitCompareArrows className="w-4 h-4 text-[var(--accent-blue)]" />
            {t("compareTitle")}
          </h1>
        </div>
      </header>

      <div className="px-4 pt-4 max-w-2xl mx-auto space-y-4">
        {/* Selectors */}
        <div className="grid grid-cols-2 gap-3">
          {[{ id: idA, setId: setIdA, label: t("compareInstructor") + " א׳" }, { id: idB, setId: setIdB, label: t("compareInstructor") + " ב׳" }].map(({ id, setId, label }, idx) => (
            <div key={idx}>
              <label className="text-[10px] text-[var(--text-muted)] mb-1 block">{label}</label>
              <div className="relative">
                <select
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  className="w-full h-10 px-3 pr-8 rounded-xl bg-[var(--bg-card)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] appearance-none"
                >
                  <option value="">{t("compareChoose")}</option>
                  {MOCK_INSTRUCTORS.map((i) => (
                    <option key={i.id} value={i.id}>{i.name} — {i.city}</option>
                  ))}
                </select>
                <ChevronDown className="absolute left-3 top-3 w-4 h-4 text-[var(--text-muted)] pointer-events-none" />
              </div>
            </div>
          ))}
        </div>

        {/* Cards */}
        {bothSelected && (
          <>
            <div className="grid grid-cols-2 gap-3">
              {[instA, instB].map((inst) => (
                <Link key={inst.id} href={`/instructor/${inst.id}`} className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-3 text-center hover:border-[var(--accent-green)]/30 transition-colors">
                  <img src={inst.photo} alt={inst.name} className="w-16 h-16 rounded-full object-cover mx-auto border-2 border-[var(--border-subtle)]" />
                  <p className="text-sm font-bold mt-2 flex items-center justify-center gap-1">
                    {inst.name}
                    {inst.verified && <Shield className="w-3 h-3 text-[var(--accent-green)]" />}
                  </p>
                  <p className="text-[10px] text-[var(--text-muted)] flex items-center justify-center gap-1">
                    <MapPin className="w-3 h-3" /> {inst.city}
                  </p>
                  <p className="text-xs mt-1 font-semibold text-[var(--accent-green)]" style={{ fontFamily: "var(--font-rubik)" }}>
                    ₪{inst.priceFrom}+
                  </p>
                </Link>
              ))}
            </div>

            {/* Comparison rows */}
            <div className="space-y-3">
              {rows.map((row) => {
                const aWins = row.lowerBetter ? row.a < row.b : row.a > row.b;
                const bWins = row.lowerBetter ? row.b < row.a : row.b > row.a;
                return (
                  <div key={row.label} className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-3">
                    <p className="text-[10px] text-[var(--text-muted)] text-center mb-2">{row.label}</p>
                    <div className="grid grid-cols-[1fr_auto_1fr] gap-3 items-center">
                      <div className="text-left">
                        <p className={`text-sm font-bold ${aWins ? "text-[var(--accent-green)]" : "text-[var(--text-primary)]"}`} style={{ fontFamily: "var(--font-rubik)" }}>
                          {row.label.includes("₪") ? `₪${row.a}` : row.a}
                          {aWins && <Trophy className="w-3 h-3 inline mr-1 text-[var(--accent-amber)]" />}
                        </p>
                        <StatBar value={row.a} max={row.max} color={aWins ? "var(--accent-green)" : "var(--border-default)"} />
                      </div>
                      <span className="text-[10px] text-[var(--text-muted)]">VS</span>
                      <div className="text-right">
                        <p className={`text-sm font-bold ${bWins ? "text-[var(--accent-green)]" : "text-[var(--text-primary)]"}`} style={{ fontFamily: "var(--font-rubik)" }}>
                          {bWins && <Trophy className="w-3 h-3 inline ml-1 text-[var(--accent-amber)]" />}
                          {row.label.includes("₪") ? `₪${row.b}` : row.b}
                        </p>
                        <StatBar value={row.b} max={row.max} color={bWins ? "var(--accent-green)" : "var(--border-default)"} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Shared training types */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-3">
              <p className="text-[10px] text-[var(--text-muted)] text-center mb-2">{t("compareSharedTypes")}</p>
              <div className="flex flex-wrap gap-1.5 justify-center">
                {instA.trainingTypes.filter((tt) => instB.trainingTypes.includes(tt)).map((tt) => (
                  <span key={tt} className="px-2 py-0.5 text-[10px] rounded-md bg-[var(--accent-green)]/10 text-[var(--accent-green)] border border-[var(--accent-green)]/20">{tt}</span>
                ))}
                {instA.trainingTypes.filter((tt) => instB.trainingTypes.includes(tt)).length === 0 && (
                  <span className="text-[10px] text-[var(--text-muted)]">{t("compareNoShared")}</span>
                )}
              </div>
            </div>
          </>
        )}

        {!bothSelected && (
          <div className="text-center py-16">
            <GitCompareArrows className="w-12 h-12 text-[var(--text-muted)] mx-auto mb-3 opacity-30" />
            <p className="text-sm text-[var(--text-muted)]">{t("compareHint")}</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
