"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight, GitCompareArrows, ChevronDown, Shield, Trophy, MapPin, X } from "lucide-react";
import { MOCK_INSTRUCTORS, useCompareStore } from "@/modules/instructors";
import type { Instructor } from "@/modules/instructors";
import { useLanguageStore } from "@/lib/language-store";
import { useT, type TranslationKey } from "@/lib/translations";
import { BottomNav } from "@/components/BottomNav";

type TFunc = (key: TranslationKey) => string;

function StatBar({ value, max, color }: { value: number; max: number; color: string }) {
  return (
    <div className="w-full h-1.5 rounded-full bg-[var(--bg-primary)] overflow-hidden">
      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(value / max) * 100}%`, background: color }} />
    </div>
  );
}

const PARAM_KEYS = ["a", "b", "c", "d"];

export function CompareContent() {
  const searchParams = useSearchParams();
  const clearStore = useCompareStore((s) => s.clear);
  const lang = useLanguageStore((s) => s.lang);
  const t = useT(lang);

  const initialIds = PARAM_KEYS.map((k) => searchParams.get(k) ?? "");
  const [ids, setIds] = useState<string[]>(initialIds);

  useEffect(() => {
    const fromUrl = PARAM_KEYS.map((k) => searchParams.get(k) ?? "");
    if (fromUrl.some((v) => v)) {
      setIds(fromUrl);
      clearStore();
    }
  }, [searchParams, clearStore]);

  const updateId = (idx: number, value: string) => {
    setIds((prev) => prev.map((v, i) => (i === idx ? value : v)));
  };

  const instructors = useMemo(
    () => ids.map((id) => MOCK_INSTRUCTORS.find((i) => i.id === id) ?? null),
    [ids]
  );
  const active = instructors.filter(Boolean) as Instructor[];
  const ready = active.length >= 2;

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
        <CompareSelectors ids={ids} updateId={updateId} t={t} />

        {ready && (
          <>
            <CompareCards instructors={active} />
            <CompareRows instructors={active} t={t} />
            <SharedTypes instructors={active} t={t} />
          </>
        )}

        {!ready && (
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

/* ── Selectors ── */
function CompareSelectors({ ids, updateId, t }: { ids: string[]; updateId: (i: number, v: string) => void; t: TFunc }) {
  const labels = ["א׳", "ב׳", "ג׳", "ד׳"];
  return (
    <div className="grid grid-cols-2 gap-3">
      {ids.map((id, idx) => (
        <div key={idx}>
          <label className="text-[10px] text-[var(--text-muted)] mb-1 block">{t("compareInstructor")} {labels[idx]}</label>
          <div className="relative">
            <select
              value={id}
              onChange={(e) => updateId(idx, e.target.value)}
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
  );
}

/* ── Cards ── */
function CompareCards({ instructors }: { instructors: Instructor[] }) {
  return (
    <div className={`grid gap-3 ${instructors.length <= 2 ? "grid-cols-2" : instructors.length === 3 ? "grid-cols-3" : "grid-cols-2 sm:grid-cols-4"}`}>
      {instructors.map((inst) => (
        <Link key={inst.id} href={`/instructor/${inst.id}`} className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-3 text-center hover:border-[var(--accent-green)]/30 transition-colors">
          <img src={inst.photo} alt={inst.name} className="w-14 h-14 rounded-full object-cover mx-auto border-2 border-[var(--border-subtle)]" />
          <p className="text-xs font-bold mt-2 flex items-center justify-center gap-1">
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
  );
}

/* ── Comparison Rows ── */
interface RowDef { label: string; key: keyof Instructor | string; max: number; color: string; lowerBetter?: boolean; getter: (i: Instructor) => number }

function CompareRows({ instructors, t }: { instructors: Instructor[]; t: TFunc }) {
  const rows: RowDef[] = [
    { label: t("compareEloShooting"), key: "eloShooting", max: 2000, color: "var(--accent-amber)", getter: (i) => i.eloShooting },
    { label: t("compareEloInstruction"), key: "eloInstruction", max: 2000, color: "var(--accent-blue)", getter: (i) => i.eloInstruction },
    { label: t("compareStars"), key: "stars", max: 5, color: "var(--accent-green)", getter: (i) => i.stars },
    { label: t("compareTrainees"), key: "trainees", max: Math.max(...instructors.map((i) => i.trainees)), color: "var(--accent-green)", getter: (i) => i.trainees },
    { label: t("compareService"), key: "service", max: 5, color: "var(--accent-green)", getter: (i) => i.metrics.service },
    { label: t("compareProfessionalism"), key: "prof", max: 5, color: "var(--accent-green)", getter: (i) => i.metrics.professionalism },
    { label: t("compareQuality"), key: "quality", max: 5, color: "var(--accent-green)", getter: (i) => i.metrics.quality },
    { label: t("compareExperience"), key: "experience", max: Math.max(...instructors.map((i) => i.experience)), color: "var(--accent-green)", getter: (i) => i.experience },
    { label: t("comparePrice"), key: "price", max: Math.max(...instructors.map((i) => i.priceFrom)), color: "var(--accent-amber)", lowerBetter: true, getter: (i) => i.priceFrom },
  ];

  return (
    <div className="space-y-3">
      {rows.map((row) => {
        const values = instructors.map((inst) => row.getter(inst));
        const best = row.lowerBetter ? Math.min(...values) : Math.max(...values);
        return (
          <div key={row.label} className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-3">
            <p className="text-[10px] text-[var(--text-muted)] text-center mb-2">{row.label}</p>
            <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${instructors.length}, 1fr)` }}>
              {instructors.map((inst, idx) => {
                const val = values[idx];
                const isWinner = val === best && new Set(values).size > 1;
                return (
                  <div key={inst.id} className="text-center">
                    <p className={`text-sm font-bold ${isWinner ? "text-[var(--accent-green)]" : "text-[var(--text-primary)]"}`} style={{ fontFamily: "var(--font-rubik)" }}>
                      {row.lowerBetter ? `₪${val}` : val}
                      {isWinner && <Trophy className="w-3 h-3 inline mr-1 text-[var(--accent-amber)]" />}
                    </p>
                    <p className="text-[9px] text-[var(--text-muted)] truncate">{inst.name}</p>
                    <StatBar value={val} max={row.max} color={isWinner ? "var(--accent-green)" : "var(--border-default)"} />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ── Shared Training Types ── */
function SharedTypes({ instructors, t }: { instructors: Instructor[]; t: TFunc }) {
  const shared = instructors[0].trainingTypes.filter((tt) =>
    instructors.every((inst) => inst.trainingTypes.includes(tt))
  );
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-3">
      <p className="text-[10px] text-[var(--text-muted)] text-center mb-2">{t("compareSharedTypes")}</p>
      <div className="flex flex-wrap gap-1.5 justify-center">
        {shared.map((tt) => (
          <span key={tt} className="px-2 py-0.5 text-[10px] rounded-md bg-[var(--accent-green)]/10 text-[var(--accent-green)] border border-[var(--accent-green)]/20">{tt}</span>
        ))}
        {shared.length === 0 && (
          <span className="text-[10px] text-[var(--text-muted)]">{t("compareNoShared")}</span>
        )}
      </div>
    </div>
  );
}
