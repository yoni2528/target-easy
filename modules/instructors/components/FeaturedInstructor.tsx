"use client";

import { motion } from "framer-motion";
import { Trophy, Star, Crosshair, GraduationCap, ChevronLeft } from "lucide-react";
import Link from "next/link";
import type { Instructor } from "../types";

export function FeaturedInstructor({ instructor }: { instructor: Instructor }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Link href={`/instructor/${instructor.id}`}>
        <div className="relative overflow-hidden rounded-2xl border border-[var(--accent-amber)]/30 bg-gradient-to-l from-[var(--accent-amber)]/5 via-[var(--bg-card)] to-[var(--bg-card)]">
          {/* Badge */}
          <div className="absolute top-0 left-0 bg-[var(--accent-amber)] text-[var(--bg-primary)] px-3 py-1 rounded-br-xl flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5" />
            <span className="text-[11px] font-bold">מדריך השבוע</span>
          </div>

          <div className="flex gap-3 p-4 pt-5">
            {/* Photo */}
            <div className="relative flex-shrink-0">
              <img
                src={instructor.photo}
                alt={instructor.name}
                className="w-20 h-20 rounded-xl object-cover ring-2 ring-[var(--accent-amber)]/40"
              />
              {instructor.verified && (
                <div className="absolute -bottom-1 -left-1 bg-[var(--accent-amber)] rounded-full p-0.5">
                  <Trophy className="w-3.5 h-3.5 text-[var(--bg-primary)]" strokeWidth={3} />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-[var(--text-primary)] text-base">{instructor.name}</h3>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-[var(--accent-amber)]/10 border border-[var(--accent-amber)]/20 text-[var(--accent-amber)]" style={{ fontFamily: "var(--font-rubik)" }}>
                  <Crosshair className="w-3 h-3" />{instructor.eloShooting}
                </span>
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-[var(--accent-blue)]/10 border border-[var(--accent-blue)]/20 text-[var(--accent-blue)]" style={{ fontFamily: "var(--font-rubik)" }}>
                  <GraduationCap className="w-3 h-3" />{instructor.eloInstruction}
                </span>
                <div className="flex items-center gap-0.5">
                  <Star className="w-3.5 h-3.5 text-[var(--accent-amber)] fill-[var(--accent-amber)]" />
                  <span className="text-xs font-bold text-[var(--accent-amber)]">{instructor.stars}</span>
                </div>
              </div>
              <p className="text-[11px] text-[var(--text-muted)] mt-1.5 line-clamp-2">{instructor.bio}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-[var(--text-muted)]">{instructor.city} · {instructor.trainees.toLocaleString()} חניכים</span>
                <span className="flex items-center gap-1 text-xs font-semibold text-[var(--accent-amber)]">
                  צפה בפרופיל <ChevronLeft className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>

          {/* Glow effect */}
          <div className="absolute inset-0 pointer-events-none rounded-2xl" style={{ boxShadow: "inset 0 0 30px rgba(251,191,36,0.03)" }} />
        </div>
      </Link>
    </motion.div>
  );
}
