"use client";

import { ArrowRight, Crosshair, Shield, Users, Award, Heart } from "lucide-react";
import Link from "next/link";
import { useLanguageStore } from "@/lib/language-store";
import { useT } from "@/lib/translations";

export default function AboutPage() {
  const lang = useLanguageStore((s) => s.lang);
  const t = useT(lang);

  return (
    <div className="min-h-screen pb-8">
      <header className="sticky top-0 z-40 bg-[var(--bg-primary)]/90 backdrop-blur-xl border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-3 px-4 h-14 max-w-2xl mx-auto">
          <Link href="/" className="w-9 h-9 rounded-lg border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)]">
            <ArrowRight className="w-5 h-5" />
          </Link>
          <h1 className="font-bold text-sm">{t("aboutTitle")}</h1>
        </div>
      </header>

      <div className="px-4 pt-6 max-w-2xl mx-auto space-y-6">
        <div className="text-center">
          <Crosshair className="w-12 h-12 text-[var(--accent-green)] mx-auto mb-3" strokeWidth={1.5} />
          <h2 className="text-xl font-bold mb-1" style={{ fontFamily: "var(--font-rubik)" }}>
            <span className="text-[var(--accent-green)]">Easy</span>Target
          </h2>
          <p className="text-sm text-[var(--text-muted)]">{t("aboutTagline")}</p>
        </div>

        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4">
          <h3 className="text-sm font-bold mb-2">{t("aboutMission")}</h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{t("aboutMissionText")}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: Shield, title: t("aboutSafety"), desc: t("aboutSafetyDesc"), color: "var(--accent-green)" },
            { icon: Award, title: t("aboutProfessionalism"), desc: t("aboutProfessionalismDesc"), color: "var(--accent-amber)" },
            { icon: Users, title: t("aboutCommunity"), desc: t("aboutCommunityDesc"), color: "var(--accent-blue)" },
            { icon: Heart, title: t("aboutCare"), desc: t("aboutCareDesc"), color: "var(--accent-red)" },
          ].map((v) => (
            <div key={v.title} className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-3">
              <v.icon className="w-6 h-6 mb-2" style={{ color: v.color }} />
              <p className="text-sm font-bold mb-0.5">{v.title}</p>
              <p className="text-[10px] text-[var(--text-muted)]">{v.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4">
          <h3 className="text-sm font-bold mb-2">{t("aboutOrg")}</h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{t("aboutOrgDesc")}</p>
        </div>

        <div className="text-center text-[10px] text-[var(--text-muted)] pt-2">
          <p>EasyTarget v1.0 · {lang === "he" ? "כל הזכויות שמורות" : "All rights reserved"} &copy; 2025</p>
        </div>
      </div>
    </div>
  );
}
