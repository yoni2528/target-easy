"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { useLanguageStore } from "@/lib/language-store";
import { FeedbackQuestionnaire } from "./FeedbackQuestionnaire";
import { calculateNewElo } from "../lib/rating-engine";
import { MOCK_INSTRUCTORS } from "@/modules/instructors";

interface Props {
  instructorId: string;
  trainingId: string;
}

export function FeedbackPage({ instructorId, trainingId }: Props) {
  const lang = useLanguageStore((s) => s.lang);
  const isHe = lang === "he";
  const [completed, setCompleted] = useState(false);

  const instructor = MOCK_INSTRUCTORS.find((i) => i.id === instructorId);
  const name = instructor?.name ?? "מדריך";

  const handleComplete = () => {
    setCompleted(true);
  };

  if (completed) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="w-20 h-20 rounded-full bg-[var(--accent-green)]/10 flex items-center justify-center mb-4">
          <Star className="w-10 h-10 text-[var(--accent-amber)]" />
        </div>
        <h2 className="text-lg font-bold mb-1">{isHe ? "תודה רבה!" : "Thank you!"}</h2>
        <p className="text-sm text-[var(--text-muted)] text-center mb-6">
          {isHe ? "המשוב שלך עוזר לנו לשפר את חוויית האימון" : "Your feedback helps improve the training experience"}
        </p>
        <Link href="/" className="px-6 py-2 rounded-lg bg-[var(--accent-green)] text-[var(--bg-primary)] text-sm font-semibold">
          {isHe ? "חזרה לדף הבית" : "Back to Home"}
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-8">
      <header className="sticky top-0 z-40 bg-[var(--bg-primary)]/90 backdrop-blur-xl border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-3 px-4 h-14 max-w-2xl mx-auto">
          <Link href="/" className="w-9 h-9 rounded-lg border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)]">
            <ArrowRight className="w-5 h-5" />
          </Link>
          <h1 className="font-bold text-sm">{isHe ? "דרג את האימון" : "Rate Training"}</h1>
        </div>
      </header>

      {instructor && (
        <div className="px-4 pt-4 max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-6 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-3">
            <img src={instructor.photo} alt={name} className="w-12 h-12 rounded-full object-cover border border-[var(--border-subtle)]" />
            <div>
              <p className="text-sm font-bold">{name}</p>
              <p className="text-[10px] text-[var(--text-muted)]">{instructor.city}</p>
            </div>
          </div>
          <FeedbackQuestionnaire
            instructorName={name}
            trainingId={trainingId}
            lang={lang}
            onComplete={handleComplete}
          />
        </div>
      )}
    </div>
  );
}
