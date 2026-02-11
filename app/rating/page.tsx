"use client";

import { ArrowRight, BarChart3, Crosshair, GraduationCap, Star, TrendingUp, TrendingDown } from "lucide-react";
import Link from "next/link";
import { BottomNav } from "@/components/BottomNav";

export default function RatingPage() {
  const levels = [
    { label: "מתחילים", range: "1200+", color: "#4ade80", desc: "מדריכים בתחילת דרכם, מתאימים לאימון בסיסי" },
    { label: "מתקדמים", range: "1400+", color: "#60a5fa", desc: "מדריכים עם ניסיון, מתאימים לרמה בינונית-גבוהה" },
    { label: "מומחים", range: "1600+", color: "#fbbf24", desc: "מדריכים מקצועיים ברמה גבוהה מאוד" },
    { label: "אלופים", range: "1800+", color: "#f87171", desc: "הטובים ביותר. ברמה תחרותית ארצית" },
  ];

  return (
    <div className="min-h-screen pb-24">
      <header className="sticky top-0 z-40 bg-[var(--bg-primary)]/90 backdrop-blur-xl border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-3 px-4 h-14 max-w-2xl mx-auto">
          <Link href="/" className="w-9 h-9 rounded-lg border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)]">
            <ArrowRight className="w-5 h-5" />
          </Link>
          <h1 className="font-bold text-sm">כיצד נקבע הדירוג?</h1>
        </div>
      </header>

      <div className="px-4 pt-6 max-w-2xl mx-auto space-y-6">
        {/* Hero */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-[var(--accent-amber)]/10 border border-[var(--accent-amber)]/20 flex items-center justify-center mx-auto">
            <BarChart3 className="w-8 h-8 text-[var(--accent-amber)]" />
          </div>
          <h2 className="text-xl font-bold">שיטת דירוג ELO</h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-sm mx-auto">
            אותה שיטה שמדרגת שחמטאים ברחבי העולם. מתמטית, הוגנת, ובלתי אפשרי לזייף.
          </p>
        </div>

        {/* Two ratings */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[var(--bg-card)] border border-[var(--accent-amber)]/20 rounded-2xl p-4 text-center">
            <Crosshair className="w-6 h-6 text-[var(--accent-amber)] mx-auto mb-2" />
            <h3 className="text-sm font-bold text-[var(--accent-amber)]">דירוג ירי</h3>
            <p className="text-[10px] text-[var(--text-muted)] mt-1">מודד רמת ירי אישית. מתעדכן אחרי כל אימון מדוד במטווח מוסמך.</p>
          </div>
          <div className="bg-[var(--bg-card)] border border-[var(--accent-blue)]/20 rounded-2xl p-4 text-center">
            <GraduationCap className="w-6 h-6 text-[var(--accent-blue)] mx-auto mb-2" />
            <h3 className="text-sm font-bold text-[var(--accent-blue)]">דירוג הדרכה</h3>
            <p className="text-[10px] text-[var(--text-muted)] mt-1">מודד איכות הוראה. מבוסס על חוות דעת תלמידים ומדדי שיפור.</p>
          </div>
        </div>

        {/* Levels */}
        <div>
          <h3 className="text-sm font-bold mb-3">רמות הדירוג</h3>
          <div className="space-y-2">
            {levels.map((level) => (
              <div key={level.label} className="flex items-center gap-3 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-3">
                <div className="w-12 h-8 rounded-lg flex items-center justify-center text-xs font-bold" style={{ background: `${level.color}15`, color: level.color, fontFamily: "var(--font-rubik)" }}>
                  {level.range}
                </div>
                <div className="flex-1">
                  <span className="text-sm font-semibold" style={{ color: level.color }}>{level.label}</span>
                  <p className="text-[10px] text-[var(--text-muted)]">{level.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How it works - example */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-4 space-y-3">
          <h3 className="text-sm font-bold">איך ELO עובד — בפשטות</h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            דמיינו שני מדריכים מתחרים בתרגיל ירי מדוד:
          </p>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[var(--accent-green)]/5 border border-[var(--accent-green)]/20 rounded-xl p-3 text-center">
              <TrendingUp className="w-5 h-5 text-[var(--accent-green)] mx-auto mb-1" />
              <p className="text-[10px] text-[var(--text-secondary)]">מדריך 1600 מנצח 1800</p>
              <p className="text-xs font-bold text-[var(--accent-green)]">+32 נקודות!</p>
              <p className="text-[9px] text-[var(--text-muted)]">ניצח חזק ממנו</p>
            </div>
            <div className="bg-[var(--accent-red)]/5 border border-[var(--accent-red)]/20 rounded-xl p-3 text-center">
              <TrendingDown className="w-5 h-5 text-[var(--accent-red)] mx-auto mb-1" />
              <p className="text-[10px] text-[var(--text-secondary)]">מדריך 1800 מנצח 1600</p>
              <p className="text-xs font-bold text-[var(--text-muted)]">+8 נקודות</p>
              <p className="text-[9px] text-[var(--text-muted)]">היה צפוי</p>
            </div>
          </div>
          <p className="text-xs text-[var(--accent-amber)] font-semibold text-center">כל נקודה בדירוג הורווחה, לא ניתנה.</p>
        </div>

        {/* Stars */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-5 h-5 text-[var(--accent-amber)] fill-[var(--accent-amber)]" />
            <h3 className="text-sm font-bold">דירוג כוכבים</h3>
          </div>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            בנוסף ל-ELO, כל מדריך מקבל כוכבים מ-1 עד 5 על סמך ממוצע הביקורות של המתאמנים.
            5 כוכבים = שירות מושלם. הדירוג מתעדכן בזמן אמת עם כל ביקורת חדשה.
          </p>
          <div className="flex items-center gap-1 mt-3 justify-center">
            {[1, 2, 3, 4, 5].map((n) => (
              <Star key={n} className="w-6 h-6 text-[var(--accent-amber)] fill-[var(--accent-amber)]" />
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
