"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { getQuizQuestions } from "../lib/quiz-data";
import { matchInstructors } from "../lib/matching";
import { MOCK_INSTRUCTORS, InstructorCard } from "@/modules/instructors";
import type { QuizAnswers } from "../types";
import Link from "next/link";
import { useLanguageStore } from "@/lib/language-store";
import { useT } from "@/lib/translations";

export function QuizWizard() {
  const lang = useLanguageStore((s) => s.lang);
  const t = useT(lang);
  const questions = getQuizQuestions(lang);

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [results, setResults] = useState<ReturnType<typeof matchInstructors> | null>(null);

  const currentQ = questions[step];
  const isComplete = step >= questions.length;
  const progress = ((step) / questions.length) * 100;

  const handleSelect = (value: string) => {
    const newAnswers = { ...answers, [currentQ.id]: value };
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setTimeout(() => setStep(step + 1), 300);
    } else {
      const matched = matchInstructors(MOCK_INSTRUCTORS, newAnswers as unknown as QuizAnswers);
      setResults(matched);
      setTimeout(() => setStep(questions.length), 300);
    }
  };

  if (isComplete && results) {
    return (
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <div className="w-12 h-12 rounded-full bg-[var(--accent-green)]/10 flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 className="w-6 h-6 text-[var(--accent-green)]" />
          </div>
          <h2 className="text-lg font-bold">{t("quizRecommended")}</h2>
          <p className="text-xs text-[var(--text-muted)] mt-1">{t("quizResultDesc")}</p>
        </motion.div>

        <div className="space-y-3">
          {results.map((r, i) => (
            <motion.div
              key={r.instructor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="relative">
                {i === 0 && (
                  <div className="absolute -top-2 right-3 z-10 px-2 py-0.5 rounded-md bg-[var(--accent-green)] text-[var(--bg-primary)] text-[10px] font-bold">
                    {t("quizBestMatch")}
                  </div>
                )}
                <InstructorCard instructor={r.instructor} index={i} />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => { setStep(0); setAnswers({}); setResults(null); }}
            className="flex-1 h-11 rounded-xl border border-[var(--border-subtle)] text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-card)] transition-colors"
          >
            {t("quizTryAgain")}
          </button>
          <Link href="/" className="flex-1 h-11 rounded-xl bg-[var(--accent-green)] text-[var(--bg-primary)] text-sm font-bold flex items-center justify-center">
            {t("quizAllInstructors")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-[10px] text-[var(--text-muted)]">
          <span>{t("quizQuestion")} {step + 1} {t("quizOf")} {questions.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-[var(--bg-elevated)]">
          <motion.div
            className="h-full rounded-full bg-[var(--accent-green)]"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-lg font-bold mb-4">{currentQ.question}</h2>
          <div className="space-y-2">
            {currentQ.options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleSelect(opt.value)}
                className={`w-full text-right p-4 rounded-xl border transition-all duration-200 ${
                  answers[currentQ.id] === opt.value
                    ? "bg-[var(--accent-green)]/10 border-[var(--accent-green)]/40 text-[var(--accent-green)]"
                    : "bg-[var(--bg-card)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-default)]"
                }`}
              >
                <span className="text-sm font-medium">{opt.label}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      {step > 0 && (
        <button
          onClick={() => setStep(step - 1)}
          className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
        >
          <ArrowRight className="w-3.5 h-3.5" />
          {t("quizBack")}
        </button>
      )}
    </div>
  );
}
