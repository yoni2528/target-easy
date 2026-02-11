"use client";

import { QuizWizard } from "@/modules/quiz";
import { BottomNav } from "@/components/BottomNav";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { useLanguageStore } from "@/lib/language-store";
import { useT } from "@/lib/translations";

export default function QuizPage() {
  const lang = useLanguageStore((s) => s.lang);
  const t = useT(lang);

  return (
    <div className="min-h-screen pb-20">
      <header className="sticky top-0 z-40 bg-[var(--bg-primary)]/90 backdrop-blur-xl border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-3 px-4 h-14 max-w-2xl mx-auto">
          <Link href="/" className="w-9 h-9 rounded-lg border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)]">
            <ArrowRight className="w-5 h-5" />
          </Link>
          <h1 className="font-bold text-sm flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[var(--accent-green)]" />
            {t("quizTitle")}
          </h1>
        </div>
      </header>

      <div className="px-4 pt-6 max-w-2xl mx-auto">
        <QuizWizard />
      </div>

      <BottomNav />
    </div>
  );
}
