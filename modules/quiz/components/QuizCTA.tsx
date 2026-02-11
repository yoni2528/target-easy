"use client";

import Link from "next/link";
import { Sparkles, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export function QuizCTA() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
      <Link href="/quiz" className="block">
        <div className="relative overflow-hidden bg-gradient-to-l from-[var(--accent-green)]/10 to-[var(--accent-blue)]/10 border border-[var(--accent-green)]/20 rounded-2xl p-4 hover:border-[var(--accent-green)]/40 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent-green)]/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[var(--accent-green)]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[var(--text-primary)]">מתלבט? לשאלון התאמת אימון</h3>
                <p className="text-[10px] text-[var(--text-muted)] mt-0.5">4 שאלות קצרות → מדריך מושלם</p>
              </div>
            </div>
            <ArrowLeft className="w-5 h-5 text-[var(--accent-green)]" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
