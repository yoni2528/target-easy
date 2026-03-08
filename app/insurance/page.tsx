import type { Metadata } from "next";
import {
  InsuranceHero,
  ReturnsSection,
  PainSection,
  ScenariosSection,
  SolutionSection,
  TimelineSection,
  FAQSection,
  InsuranceCTA,
} from "@/modules/insurance";
import { Phone, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "מטרה | ביטוח למחזיקי נשק — כיסוי צד ג׳ מקיף | מנורה ביטוח",
  description:
    "ביטוח אחריות צד ג׳ למחזיקי רישיון נשק — כיסוי עד 3,000,000₪, הגנה פלילית, כיסוי אירועי טרור, החזרים על אימונים וקו חם 24/7. מנורה ביטוח.",
};

export default function InsurancePage() {
  return (
    <main className="min-h-screen insurance-theme">
      <InsuranceHero />
      <ReturnsSection />
      <PainSection />
      <ScenariosSection />
      <SolutionSection />
      <TimelineSection />
      <FAQSection />
      <InsuranceCTA />

      <footer className="py-10 px-6 bg-white" style={{ borderTop: "1px solid #e8edf5" }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
            <div className="text-center md:text-right">
              <h4 className="font-bold text-sm text-[#37374e]">מטרה — ביטוח נשק</h4>
              <p className="text-xs text-[#6b6b80]">הפוליסה מונפקת ע״י מנורה ביטוח</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-[#6b6b80]">
                <Phone className="w-3.5 h-3.5 text-[var(--accent-blue)]" />
                <span dir="ltr">055-228-1168</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#6b6b80]">
                <Mail className="w-3.5 h-3.5 text-[var(--accent-blue)]" />
                <span>info@matara.co.il</span>
              </div>
            </div>
          </div>
          <div className="pt-4 text-center" style={{ borderTop: "1px solid #e8edf5" }}>
            <p className="text-xs text-[#a0a0b0]">© 2026 מטרה</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
