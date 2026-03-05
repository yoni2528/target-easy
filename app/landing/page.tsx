import type { Metadata } from "next";
import {
  HeroSection,
  StatsBar,
  ModulesShowcase,
  FeaturesSection,
  CTASection,
} from "@/modules/landing";

export const metadata: Metadata = {
  title: "מטרה | מערכת ניהול מטווח חכמה",
  description: "מערכת ניהול מטווח דיגיטלית — לקוחות, יומן ירי, תזכורות, הכנסות ועוד. תנהל מטווח, לא ניירת.",
};

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <StatsBar />
      <ModulesShowcase />
      <FeaturesSection />
      <CTASection />
      {/* Footer */}
      <footer className="py-8 px-6 border-t border-[var(--border-subtle)] text-center">
        <p className="text-xs text-[var(--text-muted)]">
          © 2026 מטרה — מערכת ניהול מטווח חכמה
        </p>
      </footer>
    </main>
  );
}
