"use client";

import { ArrowRight, BarChart3, Crosshair, GraduationCap, Star, TrendingUp, TrendingDown, Calculator, Scale, Zap } from "lucide-react";
import Link from "next/link";
import { BottomNav } from "@/components/BottomNav";
import { useLanguageStore } from "@/lib/language-store";
import { useT } from "@/lib/translations";

export default function RatingPage() {
  const lang = useLanguageStore((s) => s.lang);
  const t = useT(lang);

  const levels = [
    { label: t("ratingLevelBeginner"), range: "1200+", color: "#4ade80", desc: t("ratingLevelBeginnerDesc") },
    { label: t("ratingLevelAdvanced"), range: "1400+", color: "#60a5fa", desc: t("ratingLevelAdvancedDesc") },
    { label: t("ratingLevelExpert"), range: "1600+", color: "#fbbf24", desc: t("ratingLevelExpertDesc") },
    { label: t("ratingLevelChampion"), range: "1800+", color: "#f87171", desc: t("ratingLevelChampionDesc") },
  ];

  return (
    <div className="min-h-screen pb-24">
      <header className="sticky top-0 z-40 bg-[var(--bg-primary)]/90 backdrop-blur-xl border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-3 px-4 h-14 max-w-2xl mx-auto">
          <Link href="/" className="w-9 h-9 rounded-lg border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)]">
            <ArrowRight className="w-5 h-5" />
          </Link>
          <h1 className="font-bold text-sm">{t("ratingTitle")}</h1>
        </div>
      </header>

      <div className="px-4 pt-6 max-w-2xl mx-auto space-y-6">
        {/* Hero */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-[var(--accent-amber)]/10 border border-[var(--accent-amber)]/20 flex items-center justify-center mx-auto">
            <BarChart3 className="w-8 h-8 text-[var(--accent-amber)]" />
          </div>
          <h2 className="text-xl font-bold">{t("ratingSystem")}</h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-sm mx-auto">
            {t("ratingDesc")}
          </p>
        </div>

        {/* Two ratings */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[var(--bg-card)] border border-[var(--accent-amber)]/20 rounded-2xl p-4 text-center">
            <Crosshair className="w-6 h-6 text-[var(--accent-amber)] mx-auto mb-2" />
            <h3 className="text-sm font-bold text-[var(--accent-amber)]">{t("ratingShooting")}</h3>
            <p className="text-[10px] text-[var(--text-muted)] mt-1">{t("ratingShootingDesc")}</p>
          </div>
          <div className="bg-[var(--bg-card)] border border-[var(--accent-blue)]/20 rounded-2xl p-4 text-center">
            <GraduationCap className="w-6 h-6 text-[var(--accent-blue)] mx-auto mb-2" />
            <h3 className="text-sm font-bold text-[var(--accent-blue)]">{t("ratingInstruction")}</h3>
            <p className="text-[10px] text-[var(--text-muted)] mt-1">{t("ratingInstructionDesc")}</p>
          </div>
        </div>

        {/* Levels */}
        <div>
          <h3 className="text-sm font-bold mb-3">{t("ratingLevels")}</h3>
          <div className="space-y-2">
            {levels.map((level) => (
              <div key={level.label} className="flex items-center gap-3 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-3">
                <div className="w-12 h-8 rounded-lg flex items-center justify-center text-xs font-bold" style={{ background: `${level.color}15`, color: level.color, fontFamily: "var(--font-rubik)" }}>
                  {level.range}
                </div>
                <div className="flex-1">
                  <span className="text-sm font-semibold" style={{ color: level.color }}>{level.label}</span>
                  <p className="text-[10px] text-[var(--text-muted)]">{level.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-4 space-y-3">
          <h3 className="text-sm font-bold">{t("ratingHow")}</h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            {t("ratingHowDesc")}
          </p>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[var(--accent-green)]/5 border border-[var(--accent-green)]/20 rounded-xl p-3 text-center">
              <TrendingUp className="w-5 h-5 text-[var(--accent-green)] mx-auto mb-1" />
              <p className="text-[10px] text-[var(--text-secondary)]">{t("ratingWinUp")}</p>
              <p className="text-xs font-bold text-[var(--accent-green)]">{t("ratingWinUpPts")}</p>
              <p className="text-[9px] text-[var(--text-muted)]">{t("ratingWinUpNote")}</p>
            </div>
            <div className="bg-[var(--accent-red)]/5 border border-[var(--accent-red)]/20 rounded-xl p-3 text-center">
              <TrendingDown className="w-5 h-5 text-[var(--accent-red)] mx-auto mb-1" />
              <p className="text-[10px] text-[var(--text-secondary)]">{t("ratingWinDown")}</p>
              <p className="text-xs font-bold text-[var(--text-muted)]">{t("ratingWinDownPts")}</p>
              <p className="text-[9px] text-[var(--text-muted)]">{t("ratingWinDownNote")}</p>
            </div>
          </div>
          <p className="text-xs text-[var(--accent-amber)] font-semibold text-center">{t("ratingEarned")}</p>
        </div>

        {/* Mathematical Formula */}
        <div className="bg-[var(--bg-card)] border border-[var(--accent-amber)]/20 rounded-2xl p-4 space-y-4">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-[var(--accent-amber)]" />
            <h3 className="text-sm font-bold">{t("eloFormulaTitle")}</h3>
          </div>
          <p className="text-xs text-[var(--text-secondary)]">{t("eloFormulaIntro")}</p>

          {/* Formula display */}
          <div className="bg-[var(--bg-elevated)] rounded-xl p-4 text-center space-y-2">
            <p className="text-base font-mono font-bold text-[var(--accent-amber)]" style={{ fontFamily: "var(--font-rubik)" }}>
              {t("eloFormulaExplain")}
            </p>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[10px] text-[var(--text-muted)]">
              <span><strong className="text-[var(--text-primary)]">R&apos;</strong> = {t("eloNewRating")}</span>
              <span><strong className="text-[var(--text-primary)]">R</strong> = {t("eloOldRating")}</span>
              <span><strong className="text-[var(--text-primary)]">K</strong> = {t("eloKFactor")}</span>
              <span><strong className="text-[var(--text-primary)]">S</strong> = {t("eloActualScore")}</span>
              <span><strong className="text-[var(--text-primary)]">E</strong> = {t("eloExpectedScore")}</span>
            </div>
            <div className="pt-2 border-t border-[var(--border-subtle)]">
              <p className="text-[10px] text-[var(--text-muted)] mb-1">{t("eloExpectedScore")}:</p>
              <p className="text-sm font-mono font-bold text-[var(--accent-blue)]" style={{ fontFamily: "var(--font-rubik)" }}>
                {t("eloExpectedFormula")}
              </p>
            </div>
          </div>
        </div>

        {/* Step by step example */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-[var(--accent-blue)]" />
            <h3 className="text-sm font-bold">{t("eloStepByStep")}</h3>
          </div>

          {/* Step 1 */}
          <div className="space-y-1">
            <p className="text-xs font-bold text-[var(--text-primary)]">1. {t("eloStep1Title")}</p>
            <div className="flex gap-2">
              <div className="flex-1 bg-[var(--accent-green)]/5 border border-[var(--accent-green)]/20 rounded-lg p-2 text-center">
                <p className="text-[10px] font-bold text-[var(--accent-green)]">{t("eloStep1A")}</p>
              </div>
              <div className="flex-1 bg-[var(--accent-red)]/5 border border-[var(--accent-red)]/20 rounded-lg p-2 text-center">
                <p className="text-[10px] font-bold text-[var(--accent-red)]">{t("eloStep1B")}</p>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="space-y-1">
            <p className="text-xs font-bold text-[var(--text-primary)]">2. {t("eloStep2Title")}</p>
            <div className="bg-[var(--bg-elevated)] rounded-lg p-2">
              <p className="text-[10px] font-mono text-[var(--accent-amber)]" style={{ fontFamily: "var(--font-rubik)" }}>{t("eloStep2Calc")}</p>
            </div>
            <p className="text-[10px] text-[var(--text-muted)]">{t("eloStep2Meaning")}</p>
          </div>

          {/* Step 3 */}
          <div className="space-y-1">
            <p className="text-xs font-bold text-[var(--accent-green)]">3. {t("eloStep3Title")}</p>
            <div className="bg-[var(--bg-elevated)] rounded-lg p-2">
              <p className="text-[10px] font-mono text-[var(--accent-green)]" style={{ fontFamily: "var(--font-rubik)" }}>{t("eloStep3Calc")}</p>
            </div>
            <p className="text-[10px] font-semibold text-[var(--accent-green)]">{t("eloStep3Result")}</p>
          </div>

          {/* Step 4 */}
          <div className="space-y-1">
            <p className="text-xs font-bold text-[var(--accent-red)]">4. {t("eloStep4Title")}</p>
            <div className="bg-[var(--bg-elevated)] rounded-lg p-2">
              <p className="text-[10px] font-mono text-[var(--accent-red)]" style={{ fontFamily: "var(--font-rubik)" }}>{t("eloStep4Calc")}</p>
            </div>
            <p className="text-[10px] font-semibold text-[var(--accent-red)]">{t("eloStep4Result")}</p>
          </div>
        </div>

        {/* K-Factor explanation */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-4 space-y-2">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-[var(--accent-green)]" />
            <h3 className="text-sm font-bold">{t("eloKExplain")}</h3>
          </div>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{t("eloKDesc")}</p>
          <div className="flex gap-2 mt-2">
            <div className="flex-1 bg-[var(--accent-amber)]/5 border border-[var(--accent-amber)]/20 rounded-lg p-2 text-center">
              <p className="text-lg font-bold text-[var(--accent-amber)]" style={{ fontFamily: "var(--font-rubik)" }}>K=32</p>
              <p className="text-[9px] text-[var(--text-muted)]">{lang === "he" ? "מדריכים חדשים" : "New instructors"}</p>
            </div>
            <div className="flex-1 bg-[var(--accent-blue)]/5 border border-[var(--accent-blue)]/20 rounded-lg p-2 text-center">
              <p className="text-lg font-bold text-[var(--accent-blue)]" style={{ fontFamily: "var(--font-rubik)" }}>K=16</p>
              <p className="text-[9px] text-[var(--text-muted)]">{lang === "he" ? "מדריכים ותיקים" : "Veteran instructors"}</p>
            </div>
          </div>
        </div>

        {/* Why is it fair */}
        <div className="bg-[var(--bg-card)] border border-[var(--accent-green)]/20 rounded-2xl p-4 space-y-2">
          <h3 className="text-sm font-bold text-[var(--accent-green)]">{t("eloWhyFair")}</h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{t("eloWhyFairDesc")}</p>
        </div>

        {/* Stars */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-5 h-5 text-[var(--accent-amber)] fill-[var(--accent-amber)]" />
            <h3 className="text-sm font-bold">{t("ratingStars")}</h3>
          </div>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            {t("ratingStarsDesc")}
          </p>
          <div className="flex items-center gap-1 mt-3 justify-center">
            {[1, 2, 3, 4, 5].map((n) => (
              <Star key={n} className="w-6 h-6 text-[var(--accent-amber)] fill-[var(--accent-amber)]" />
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
