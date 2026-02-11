"use client";

import { motion } from "framer-motion";
import { Star, CheckCircle, MapPin, Users, Crosshair, GraduationCap } from "lucide-react";
import Link from "next/link";
import type { Instructor } from "../types";
import { getShootingLevel, getInstructionLevel } from "../lib/elo-utils";

export function InstructorCard({ instructor, index }: { instructor: Instructor; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
    >
      <Link href={`/instructor/${instructor.id}`}>
        <div className="group relative bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-4 transition-all duration-300 hover:border-[var(--accent-green)]/30 hover:shadow-[0_0_30px_rgba(74,222,128,0.08)]">
          {/* Top row: photo + info */}
          <div className="flex gap-3">
            {/* Photo */}
            <div className="relative flex-shrink-0">
              <img
                src={instructor.photo}
                alt={instructor.name}
                className="w-16 h-16 rounded-xl object-cover ring-2 ring-[var(--border-subtle)] group-hover:ring-[var(--accent-green)]/30 transition-all"
              />
              {instructor.verified && (
                <div className="absolute -bottom-1 -left-1 bg-[var(--accent-green)] rounded-full p-0.5">
                  <CheckCircle className="w-3.5 h-3.5 text-[var(--bg-primary)]" strokeWidth={3} />
                </div>
              )}
              {/* Availability dot */}
              <div className={`absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-[var(--bg-card)] ${
                instructor.available ? "bg-[var(--accent-green)] pulse-dot" : "bg-[var(--accent-red)]"
              }`} />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-[var(--text-primary)] truncate">{instructor.name}</h3>
              </div>

              {/* Dual ELO Badges + Stars */}
              <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-[var(--accent-amber)]/10 border border-[var(--accent-amber)]/20 text-[var(--accent-amber)]" style={{ fontFamily: "var(--font-rubik)" }}>
                  <Crosshair className="w-3 h-3" />
                  {instructor.eloShooting}
                </span>
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-[var(--accent-blue)]/10 border border-[var(--accent-blue)]/20 text-[var(--accent-blue)]" style={{ fontFamily: "var(--font-rubik)" }}>
                  <GraduationCap className="w-3 h-3" />
                  {instructor.eloInstruction}
                </span>
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < Math.floor(instructor.stars)
                          ? "text-[var(--accent-amber)] fill-[var(--accent-amber)]"
                          : i < instructor.stars
                          ? "text-[var(--accent-amber)] fill-[var(--accent-amber)]/50"
                          : "text-[var(--border-default)]"
                      }`}
                    />
                  ))}
                  <span className="text-xs text-[var(--text-muted)] mr-1">{instructor.stars}</span>
                </div>
              </div>

              {/* Location + Trainees */}
              <div className="flex items-center gap-3 mt-1.5 text-xs text-[var(--text-muted)]">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {instructor.city}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {instructor.trainees.toLocaleString()} חניכים
                </span>
              </div>
            </div>

            {/* Price + CTA */}
            <div className="flex flex-col items-end justify-between">
              <div className="text-left">
                <span className="text-xs text-[var(--text-muted)]">החל מ-</span>
                <div className="text-lg font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-rubik)" }}>
                  ₪{instructor.priceFrom}
                </div>
              </div>
            </div>
          </div>

          {/* Training type chips */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {instructor.trainingTypes.slice(0, 3).map((type) => (
              <span
                key={type}
                className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-subtle)]"
              >
                {type}
              </span>
            ))}
            {instructor.trainingTypes.length > 3 && (
              <span className="px-2 py-0.5 text-[10px] text-[var(--text-muted)]">
                +{instructor.trainingTypes.length - 3}
              </span>
            )}
          </div>

          {/* Ranges */}
          <div className="flex items-center gap-1 mt-2 text-[10px] text-[var(--text-muted)]">
            <MapPin className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">{instructor.ranges.join(" · ")}</span>
          </div>

          {/* Bottom: availability + book button */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-[var(--border-subtle)]">
            <div className="flex items-center gap-1.5">
              <div className={`w-2 h-2 rounded-full ${instructor.available ? "bg-[var(--accent-green)] pulse-dot" : "bg-[var(--accent-red)]"}`} />
              <span className="text-xs text-[var(--text-secondary)]">
                {instructor.available ? `פנוי - ${instructor.nextSlot}` : `תפוס - הבא: ${instructor.nextSlot}`}
              </span>
            </div>
            <span className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-[var(--accent-green)] text-[var(--bg-primary)] group-hover:shadow-[0_0_15px_rgba(74,222,128,0.3)] transition-shadow">
              קבע אימון
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
