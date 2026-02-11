"use client";

import { ArrowRight, ShieldCheck, CheckCircle, UserCheck, Eye, Star } from "lucide-react";
import Link from "next/link";
import { BottomNav } from "@/components/BottomNav";

export default function VerifiedPage() {
  const steps = [
    { icon: CheckCircle, title: "בדיקת רישיון", desc: "רישיון מדריך ירי בתוקף מאגף כלי ירייה. אנחנו מאמתים ישירות מול המאגר הממשלתי.", color: "#4ade80" },
    { icon: ShieldCheck, title: "בדיקת רקע", desc: "תעודת יושר, אישור ביטחוני ובדיקה פלילית נקייה. אנחנו לא מתפשרים על הבטיחות שלך.", color: "#60a5fa" },
    { icon: Eye, title: "מבחן שדה", desc: "צוות EasyTarget צופה באימון חי של המדריך. אנחנו בודקים מקצועיות, בטיחות, סבלנות ויחס אישי.", color: "#fbbf24" },
    { icon: Star, title: "ביקורות מתאמנים", desc: "מינימום 10 ביקורות מאומתות עם ממוצע 4.0 ומעלה. מדריך שלא עומד בסטנדרט — מאבד את האימות.", color: "#a78bfa" },
  ];

  return (
    <div className="min-h-screen pb-24">
      <header className="sticky top-0 z-40 bg-[var(--bg-primary)]/90 backdrop-blur-xl border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-3 px-4 h-14 max-w-2xl mx-auto">
          <Link href="/" className="w-9 h-9 rounded-lg border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)]">
            <ArrowRight className="w-5 h-5" />
          </Link>
          <h1 className="font-bold text-sm">מה זה מדריך מאומת?</h1>
        </div>
      </header>

      <div className="px-4 pt-6 max-w-2xl mx-auto space-y-6">
        {/* Hero */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-[var(--accent-green)]/10 border border-[var(--accent-green)]/20 flex items-center justify-center mx-auto">
            <ShieldCheck className="w-8 h-8 text-[var(--accent-green)]" />
          </div>
          <h2 className="text-xl font-bold">מדריך מאומת ב-EasyTarget</h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-sm mx-auto">
            סימן הוי הירוק אומר שהמדריך עבר תהליך אימות מחמיר בן 4 שלבים. זה אומר שאתה יכול להתאמן בראש שקט.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-3">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${step.color}15` }}>
                    <Icon className="w-5 h-5" style={{ color: step.color }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md" style={{ background: `${step.color}15`, color: step.color }}>
                        שלב {i + 1}
                      </span>
                      <h3 className="text-sm font-bold">{step.title}</h3>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] mt-1.5 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom note */}
        <div className="bg-[var(--accent-green)]/5 border border-[var(--accent-green)]/20 rounded-2xl p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <UserCheck className="w-5 h-5 text-[var(--accent-green)]" />
            <span className="text-sm font-bold text-[var(--accent-green)]">מעל 80% מהמדריכים שלנו מאומתים</span>
          </div>
          <p className="text-xs text-[var(--text-secondary)]">
            אנחנו בודקים מחדש כל 6 חודשים. מדריך שלא עומד בסטנדרט — מאבד את סימן האימות.
          </p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
