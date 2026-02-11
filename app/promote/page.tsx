"use client";

import { ArrowRight, Megaphone, TrendingUp, Eye, Users, Zap, CheckCircle } from "lucide-react";
import Link from "next/link";

const plans = [
  { name: "בסיסי", price: 99, period: "חודש", features: ["הופעה בראש התוצאות", "תג 'מקודם'", "50 חשיפות מובטחות"], color: "var(--accent-blue)" },
  { name: "מקצועי", price: 249, period: "חודש", features: ["הכל בבסיסי", "באנר מודגש", "200 חשיפות מובטחות", "סטטיסטיקות מתקדמות"], color: "var(--accent-green)", popular: true },
  { name: "פרימיום", price: 499, period: "חודש", features: ["הכל במקצועי", "עמוד פרופיל מיוחד", "חשיפות ללא הגבלה", "תמיכה אישית"], color: "var(--accent-amber)" },
];

export default function PromotePage() {
  return (
    <div className="min-h-screen pb-8">
      <header className="sticky top-0 z-40 bg-[var(--bg-primary)]/90 backdrop-blur-xl border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-3 px-4 h-14 max-w-2xl mx-auto">
          <Link href="/" className="w-9 h-9 rounded-lg border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)]">
            <ArrowRight className="w-5 h-5" />
          </Link>
          <h1 className="font-bold text-sm">קידום ממומן ב-EasyTarget</h1>
        </div>
      </header>

      <div className="px-4 pt-6 max-w-2xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-6">
          <Megaphone className="w-10 h-10 text-[var(--accent-green)] mx-auto mb-3" />
          <h2 className="text-lg font-bold mb-1">הגדל את החשיפה שלך</h2>
          <p className="text-xs text-[var(--text-muted)]">הגע ללקוחות חדשים עם קידום ממומן ב-EasyTarget</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          {[
            { icon: Eye, value: "10K+", label: "צפיות חודשיות" },
            { icon: Users, value: "5K+", label: "משתמשים פעילים" },
            { icon: TrendingUp, value: "x3", label: "גידול בהזמנות" },
          ].map((s) => (
            <div key={s.label} className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-3 text-center">
              <s.icon className="w-5 h-5 text-[var(--accent-green)] mx-auto mb-1" />
              <p className="text-base font-bold" style={{ fontFamily: "var(--font-rubik)" }}>{s.value}</p>
              <p className="text-[10px] text-[var(--text-muted)]">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Plans */}
        <div className="space-y-3">
          {plans.map((plan) => (
            <div key={plan.name} className={`bg-[var(--bg-card)] border rounded-xl p-4 relative ${plan.popular ? "border-[var(--accent-green)]" : "border-[var(--border-subtle)]"}`}>
              {plan.popular && (
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-[var(--accent-green)] text-[var(--bg-primary)] text-[10px] font-bold rounded-full flex items-center gap-1">
                  <Zap className="w-3 h-3" /> הכי פופולרי
                </div>
              )}
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold">{plan.name}</h3>
                <div className="text-left">
                  <span className="text-lg font-bold" style={{ color: plan.color, fontFamily: "var(--font-rubik)" }}>₪{plan.price}</span>
                  <span className="text-[10px] text-[var(--text-muted)]">/{plan.period}</span>
                </div>
              </div>
              <div className="space-y-1.5 mb-3">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                    <CheckCircle className="w-3.5 h-3.5 text-[var(--accent-green)] flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
              <button className={`w-full h-10 rounded-xl text-sm font-bold ${plan.popular ? "bg-[var(--accent-green)] text-[var(--bg-primary)]" : "border border-[var(--border-default)] text-[var(--text-secondary)]"}`}>
                התחל עכשיו
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
