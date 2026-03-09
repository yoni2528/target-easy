import type { Metadata } from "next";
import {
  InsuranceNavbar,
  InsuranceHero,
  ReturnsSection,
  ScenariosSection,
  TargetDiagram,
  SolutionSection,
  TimelineSection,
  FAQSection,
  InsuranceCTA,
} from "@/modules/insurance";
import { Phone, Mail } from "lucide-react";

const Wave = ({ from, to, flip }: { from: string; to: string; flip?: boolean }) => (
  <div className="relative -my-px" style={{ background: from }}>
    <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="block w-full h-[40px] md:h-[60px]"
      style={flip ? { transform: "scaleX(-1)" } : undefined}>
      <path d="M0,0 C360,50 720,50 1080,25 C1260,12 1380,0 1440,0 L1440,60 L0,60 Z" fill={to} />
    </svg>
  </div>
);

export const metadata: Metadata = {
  title: "מטרה | ביטוח למחזיקי נשק — כיסוי צד ג׳ מקיף | מנורה ביטוח",
  description:
    "ביטוח אחריות צד ג׳ למחזיקי רישיון נשק — כיסוי עד 3,000,000₪, הגנה פלילית, כיסוי אירועי טרור, החזרים על אימונים וקו חם 24/7. מנורה ביטוח.",
};

export default function InsurancePage() {
  return (
    <main className="min-h-screen insurance-theme overflow-x-hidden">
      <InsuranceNavbar />
      <InsuranceHero />
      <ReturnsSection />
      <ScenariosSection />
      <Wave from="white" to="#f5f5f7" />
      <TargetDiagram />
      <Wave from="#f5f5f7" to="#fafbfe" flip />
      <SolutionSection />
      <TimelineSection />
      <Wave from="#fafbfe" to="white" />
      <FAQSection />
      <Wave from="white" to="#fafbfe" flip />
      <InsuranceCTA />

      {/* WhatsApp floating button */}
      <a href="https://wa.me/972552281168" target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 w-14 h-14 flex items-center justify-center rounded-full shadow-lg hover:scale-110 transition-transform"
        style={{ background: "#25D366", boxShadow: "0 4px 20px rgba(37,211,102,0.4)" }}>
        <svg viewBox="0 0 24 24" className="w-7 h-7" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </a>

      <footer className="py-10 px-6 bg-white" style={{ borderTop: "1px solid #e8edf5" }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="text-center md:text-right">
                <h4 className="font-bold text-sm text-[#37374e]">מטרה — ביטוח נשק</h4>
                <p className="text-xs text-[#6b6b80]">הפוליסה מונפקת ע״י מנורה ביטוח</p>
              </div>
              <img src="/menora-logo.png" alt="מנורה מבטחים" className="h-8 opacity-60" />
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
          <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid #e8edf5" }}>
            <p className="text-xs text-[#a0a0b0]">© 2026 מטרה</p>
            <div className="flex gap-4">
              <a href="/terms" className="text-xs text-[#a0a0b0] hover:text-[var(--accent-blue)] transition-colors">תנאי שימוש</a>
              <a href="/privacy" className="text-xs text-[#a0a0b0] hover:text-[var(--accent-blue)] transition-colors">מדיניות פרטיות</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
