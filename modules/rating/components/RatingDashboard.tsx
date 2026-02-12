"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, BarChart3, Target, Users, MessageSquare } from "lucide-react";
import { useLanguageStore } from "@/lib/language-store";
import { LeagueTable } from "./LeagueTable";
import { RetentionTrendChart } from "./RetentionTrendChart";
import { FeedbackQuestionnaire } from "./FeedbackQuestionnaire";
import { RatingNotification } from "./RatingNotification";
import { calculateNewElo } from "../lib/rating-engine";

type View = "dashboard" | "demo-feedback";

export function RatingDashboard() {
  const lang = useLanguageStore((s) => s.lang);
  const isHe = lang === "he";
  const [view, setView] = useState<View>("dashboard");
  const [notification, setNotification] = useState<{
    eloDelta: number;
    newElo: number;
    feedbackAvg: number;
  } | null>(null);

  const handleFeedbackComplete = (_: unknown, avg: number) => {
    const { newElo, delta } = calculateNewElo(1847, avg >= 4 ? 1 : 0.5);
    setNotification({ eloDelta: delta, newElo, feedbackAvg: avg });
    setTimeout(() => setView("dashboard"), 2000);
  };

  if (view === "demo-feedback") {
    return (
      <div className="min-h-screen pb-8">
        <header className="sticky top-0 z-40 bg-[var(--bg-primary)]/90 backdrop-blur-xl border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-3 px-4 h-14 max-w-2xl mx-auto">
            <button onClick={() => setView("dashboard")} className="w-9 h-9 rounded-lg border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)]">
              <ArrowRight className="w-5 h-5" />
            </button>
            <h1 className="font-bold text-sm">
              {isHe ? "דמו - שאלון לקוח" : "Demo - Client Feedback"}
            </h1>
          </div>
        </header>
        <div className="px-4 pt-6 max-w-2xl mx-auto">
          {notification ? (
            <RatingNotification
              instructorName="דוד כהן"
              eloDelta={notification.eloDelta}
              newElo={notification.newElo}
              feedbackAvg={notification.feedbackAvg}
              isHighScore={notification.feedbackAvg >= 4.5}
              lang={lang}
            />
          ) : (
            <FeedbackQuestionnaire
              instructorName="דוד כהן"
              trainingId="demo-1"
              lang={lang}
              onComplete={handleFeedbackComplete}
              onBack={() => setView("dashboard")}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-8">
      <header className="sticky top-0 z-40 bg-[var(--bg-primary)]/90 backdrop-blur-xl border-b border-[var(--border-subtle)]">
        <div className="flex items-center justify-between px-4 h-14 max-w-2xl mx-auto">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="w-9 h-9 rounded-lg border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)]">
              <ArrowRight className="w-5 h-5" />
            </Link>
            <h1 className="font-bold text-sm flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[var(--accent-green)]" />
              {isHe ? "מערכת דירוג חכמה" : "Smart Rating System"}
            </h1>
          </div>
        </div>
      </header>

      <div className="px-4 pt-4 max-w-2xl mx-auto space-y-4">
        {/* Formula explanation */}
        <FormulaCard lang={lang} />

        {/* Demo button */}
        <button
          onClick={() => { setNotification(null); setView("demo-feedback"); }}
          className="w-full flex items-center gap-3 bg-[var(--accent-green)]/10 border border-[var(--accent-green)]/20 rounded-xl p-4 hover:border-[var(--accent-green)]/40 transition-colors"
        >
          <MessageSquare className="w-5 h-5 text-[var(--accent-green)]" />
          <div className="text-right">
            <p className="text-sm font-semibold">{isHe ? "דמו שאלון לקוח" : "Client Feedback Demo"}</p>
            <p className="text-[10px] text-[var(--text-muted)]">
              {isHe ? "צפה בחוויית השאלון כפי שהלקוח רואה אותה" : "See the feedback experience as the client sees it"}
            </p>
          </div>
        </button>

        {/* League Table */}
        <LeagueTable lang={lang} />

        {/* Retention Trend */}
        <RetentionTrendChart lang={lang} />
      </div>
    </div>
  );
}

function FormulaCard({ lang }: { lang: "he" | "en" }) {
  const isHe = lang === "he";
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4">
      <h3 className="text-sm font-semibold flex items-center gap-2 mb-3">
        <Target className="w-4 h-4 text-[var(--accent-amber)]" />
        {isHe ? "מנגנון הדירוג" : "Rating Mechanism"}
      </h3>
      <div className="space-y-2 text-[11px]">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded bg-[var(--accent-green)]/10 flex items-center justify-center text-[10px] font-bold text-[var(--accent-green)]">50%</span>
          <div>
            <p className="font-semibold">{isHe ? "רגל מקצועית (ELO)" : "Professional Leg (ELO)"}</p>
            <p className="text-[10px] text-[var(--text-muted)]" dir="ltr">New_ELO = Old_ELO + K × (Actual - Expected)</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded bg-[var(--accent-blue)]/10 flex items-center justify-center text-[10px] font-bold text-[var(--accent-blue)]">50%</span>
          <div>
            <p className="font-semibold">{isHe ? "רגל חווייתית ושימור" : "Experience & Retention"}</p>
            <p className="text-[10px] text-[var(--text-muted)]">
              {isHe ? "70% שימור לקוחות · 30% ציון משוב" : "70% Retention · 30% Feedback"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
