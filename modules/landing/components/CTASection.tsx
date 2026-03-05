import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const CTASection = () => (
  <section className="py-24 px-6 text-center">
    <div className="max-w-lg mx-auto">
      <h2 className="text-3xl md:text-4xl font-black mb-4">
        מוכן להפסיק עם <span className="text-[var(--accent-amber)]">הניירת</span>?
      </h2>
      <p className="text-[var(--text-secondary)] mb-8">
        הצטרף למטווחים שכבר עברו לדיגיטל. התחל בחינם, שלם רק כשאתה מרוויח.
      </p>
      <Link
        href="/contact"
        className="inline-flex items-center gap-2 px-10 py-4 bg-[var(--accent-green)] text-[var(--bg-primary)] font-bold text-lg rounded-2xl hover:brightness-110 transition-all shadow-xl shadow-[var(--accent-green)]/20"
      >
        בואו נדבר
        <ArrowLeft className="w-5 h-5" />
      </Link>
      <p className="text-xs text-[var(--text-muted)] mt-4">ללא התחייבות · הדגמה חינם</p>
    </div>
  </section>
);
