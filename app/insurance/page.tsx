import type { Metadata } from "next";
import {
  InsuranceHero,
  PainSection,
  ScenariosSection,
  InsuranceModules,
  ReturnsSection,
  TimelineSection,
  FAQSection,
  InsuranceCTA,
} from "@/modules/insurance";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "מטרה | ביטוח למחזיקי נשק — כיסוי צד ג׳ מקיף | מנורה ביטוח",
  description:
    "ביטוח אחריות צד ג׳ למחזיקי רישיון נשק — כיסוי עד 3,000,000₪, הגנה פלילית, כיסוי אירועי טרור, החזרים על אימונים וקו חם 24/7. מנורה ביטוח.",
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
      <FAQSection />
      <InsuranceCTA />

      <footer className="py-8 px-6 border-t border-[var(--border-subtle)]">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center md:text-right">
              <h4 className="font-bold text-sm text-[var(--text-primary)] mb-1">מטרה — ביטוח נשק</h4>
              <p className="text-xs text-[var(--text-secondary)]">
                ביטוח אחריות צד ג׳ מקיף באמצעות מנורה ביטוח.
              </p>
            </div>
            <div className="text-center space-y-1">
              <div className="flex items-center justify-center gap-2 text-sm text-[var(--text-secondary)]">
                <Phone className="w-3.5 h-3.5 text-[var(--accent-blue)]" />
                <span dir="ltr">055-228-1168</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-[var(--text-secondary)]">
                <Mail className="w-3.5 h-3.5 text-[var(--accent-blue)]" />
                <span>info@matara.co.il</span>
              </div>
            </div>
            <div className="text-center md:text-left space-y-1">
              <Link href="/landing" className="text-sm text-[var(--accent-blue)] hover:underline block">
                מטרה — מערכת ניהול מטווח &larr;
              </Link>
              <a href="#faq" className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-blue)] block">
                שאלות נפוצות
              </a>
            </div>
          </div>
          <div className="border-t border-[var(--border-subtle)] pt-4 text-center">
            <p className="text-xs text-[var(--text-muted)]">
              © 2026 מטרה · הפוליסה מונפקת ע״י מנורה ביטוח
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
