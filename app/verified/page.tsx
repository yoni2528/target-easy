"use client";

import { ArrowRight, ShieldCheck, CheckCircle, UserCheck, Eye, Star, Search } from "lucide-react";
import Link from "next/link";
import { BottomNav } from "@/components/BottomNav";
import { useLanguageStore } from "@/lib/language-store";
import { useT } from "@/lib/translations";

export default function VerifiedPage() {
  const lang = useLanguageStore((s) => s.lang);
  const t = useT(lang);

  const steps = [
    { icon: Search, label: t("verifiedStep1"), desc: t("verifiedStep1Desc"), color: "#4ade80" },
    { icon: UserCheck, label: t("verifiedStep2"), desc: t("verifiedStep2Desc"), color: "#60a5fa" },
    { icon: Eye, label: t("verifiedStep3"), desc: t("verifiedStep3Desc"), color: "#fbbf24" },
    { icon: Star, label: t("verifiedStep4"), desc: t("verifiedStep4Desc"), color: "#a78bfa" },
  ];

  return (
    <div className="min-h-screen pb-24">
      <header className="sticky top-0 z-40 bg-[var(--bg-primary)]/90 backdrop-blur-xl border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-3 px-4 h-14 max-w-2xl mx-auto">
          <Link href="/" className="w-9 h-9 rounded-lg border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)]">
            <ArrowRight className="w-5 h-5" />
          </Link>
          <h1 className="font-bold text-sm">{t("verifiedTitle")}</h1>
        </div>
      </header>

      <div className="px-4 pt-6 max-w-2xl mx-auto space-y-6">
        {/* Hero */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-[var(--accent-green)]/10 border border-[var(--accent-green)]/20 flex items-center justify-center mx-auto">
            <ShieldCheck className="w-8 h-8 text-[var(--accent-green)]" />
          </div>
          <h2 className="text-xl font-bold">{t("verifiedHero")}</h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-sm mx-auto">
            {t("verifiedSubtitle")}
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-3">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="flex items-start gap-3 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${step.color}15`, border: `1px solid ${step.color}30` }}>
                  <Icon className="w-5 h-5" style={{ color: step.color }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md" style={{ background: `${step.color}15`, color: step.color }}>
                      {i + 1}
                    </span>
                    <h3 className="text-sm font-bold">{step.label}</h3>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">{step.desc}</p>
                </div>
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-1" style={{ color: step.color }} />
              </div>
            );
          })}
        </div>

        {/* Bottom note */}
        <div className="bg-[var(--accent-green)]/5 border border-[var(--accent-green)]/20 rounded-2xl p-4 text-center">
          <ShieldCheck className="w-6 h-6 text-[var(--accent-green)] mx-auto mb-2" />
          <p className="text-xs text-[var(--text-secondary)]">{t("verifiedNote")}</p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
