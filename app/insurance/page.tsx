import type { Metadata } from "next";
import {
  InsuranceHero,
  PainSection,
  ScenariosSection,
  InsuranceModules,
  ReturnsSection,
  TimelineSection,
  InsuranceCTA,
  TaglineBanner,
} from "@/modules/insurance";
import Link from "next/link";

export const metadata: Metadata = {
  title: "מטרה | ביטוח למחזיקי נשק",
  description:
    "ביטוח אחריות צד ג׳ למחזיקי רישיון נשק — מנורה ביטוח. כיסוי משפטי, הגנה פלילית, החזרים על אימונים וקו חם 24/7.",
};

export default function InsurancePage() {
  return (
    <main className="min-h-screen insurance-theme">
      <InsuranceHero />
      <PainSection />
      <ScenariosSection />
      <InsuranceModules />
      <ReturnsSection />
      <TimelineSection />
      <TaglineBanner />
      <InsuranceCTA />
      <footer className="py-8 px-6 border-t border-[var(--border-subtle)] text-center space-y-3">
        <Link
          href="/landing"
          className="text-sm text-[var(--accent-blue)] hover:underline"
        >
          מטרה — מערכת ניהול מטווח חכמה &larr;
        </Link>
        <p className="text-xs text-[var(--text-muted)]">
          © 2026 מטרה — ביטוח למחזיקי נשק
        </p>
      </footer>
    </main>
  );
}
