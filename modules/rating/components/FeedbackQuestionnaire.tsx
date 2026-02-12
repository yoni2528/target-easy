"use client";

import { useState } from "react";
import { CheckCircle, ChevronLeft } from "lucide-react";
import { FEEDBACK_QUESTIONS, EMOJI_OPTIONS } from "../lib/feedback-questions";
import type { FeedbackAnswer } from "../types";

interface Props {
  instructorName: string;
  trainingId: string;
  lang: "he" | "en";
  onComplete: (answers: FeedbackAnswer[], avg: number) => void;
  onBack?: () => void;
}

export function FeedbackQuestionnaire({ instructorName, trainingId, lang, onComplete, onBack }: Props) {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<FeedbackAnswer[]>([]);
  const [done, setDone] = useState(false);

  const isHe = lang === "he";
  const question = FEEDBACK_QUESTIONS[currentQ];
  const totalQ = FEEDBACK_QUESTIONS.length;
  const progress = ((currentQ) / totalQ) * 100;

  const handleSelect = (value: number, emoji: string) => {
    const answer: FeedbackAnswer = { questionId: question.id, value, emoji };
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQ < totalQ - 1) {
      setTimeout(() => setCurrentQ(currentQ + 1), 300);
    } else {
      const avg = newAnswers.reduce((s, a) => s + a.value, 0) / newAnswers.length;
      setDone(true);
      setTimeout(() => onComplete(newAnswers, Math.round(avg * 10) / 10), 1500);
    }
  };

  if (done) {
    return (
      <div className="flex flex-col items-center justify-center py-16 animate-in fade-in">
        <div className="w-16 h-16 rounded-full bg-[var(--accent-green)]/10 flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-[var(--accent-green)]" />
        </div>
        <p className="text-sm font-bold">{isHe ? "תודה על המשוב!" : "Thanks for your feedback!"}</p>
        <p className="text-[11px] text-[var(--text-muted)] mt-1">
          {isHe ? "הדירוג נשמר בהצלחה" : "Rating saved successfully"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        {onBack && (
          <button onClick={onBack} className="w-8 h-8 rounded-lg border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)]">
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
        <div>
          <p className="text-xs text-[var(--text-muted)]">
            {isHe ? `משוב על אימון עם ${instructorName}` : `Feedback for training with ${instructorName}`}
          </p>
          <p className="text-[10px] text-[var(--text-muted)] mt-0.5">
            {isHe ? `שאלה ${currentQ + 1} מתוך ${totalQ}` : `Question ${currentQ + 1} of ${totalQ}`}
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-[var(--bg-elevated)] rounded-full overflow-hidden">
        <div
          className="h-full bg-[var(--accent-green)] rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Question */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5 animate-in slide-in-from-bottom-2">
        <p className="text-sm font-semibold leading-relaxed text-center">
          {isHe ? question.textHe : question.textEn}
        </p>
      </div>

      {/* Emoji options */}
      <div className="flex justify-center gap-3">
        {EMOJI_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => handleSelect(opt.value, opt.emoji)}
            className="flex flex-col items-center gap-1.5 p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--accent-green)]/50 hover:scale-110 transition-all active:scale-95"
          >
            <span className="text-2xl">{opt.emoji}</span>
            <span className="text-[9px] text-[var(--text-muted)]">
              {isHe ? opt.labelHe : opt.labelEn}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
