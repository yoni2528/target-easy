"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Star, CheckCircle, MapPin, Users, Clock, Award, Shield, Calendar, Navigation, Phone, Crosshair, GraduationCap, Send, MessageSquarePlus } from "lucide-react";
import Link from "next/link";
import { MOCK_INSTRUCTORS } from "../lib/mock-data";
import { getShootingLevel, getInstructionLevel } from "../lib/elo-utils";
import { useUserStore } from "../lib/user-store";
import { VideoSection } from "./VideoSection";
import { BottomNav } from "@/components/BottomNav";

export default function InstructorPageContent({ id }: { id: string }) {
  const instructor = MOCK_INSTRUCTORS.find((i) => i.id === id);
  const addToHistory = useUserStore((s) => s.addToHistory);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewName, setReviewName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  useEffect(() => {
    if (instructor) {
      addToHistory(instructor.id);
    }
  }, [instructor, addToHistory]);

  if (!instructor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[var(--text-muted)]">מדריך לא נמצא</p>
      </div>
    );
  }

  const metrics = [
    { label: "שירות", value: instructor.metrics.service },
    { label: "מקצועיות", value: instructor.metrics.professionalism },
    { label: "איכות הדרכה", value: instructor.metrics.quality },
  ];

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[var(--bg-primary)]/90 backdrop-blur-xl border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-3 px-4 h-14 max-w-2xl mx-auto">
          <Link href="/" className="w-9 h-9 rounded-lg border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
            <ArrowRight className="w-5 h-5" />
          </Link>
          <h1 className="font-bold text-sm truncate">{instructor.name}</h1>
        </div>
      </header>

      <div className="max-w-2xl mx-auto">
        {/* Profile hero */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 pt-6"
        >
          <div className="flex gap-4 items-start">
            <div className="relative">
              <img
                src={instructor.photo}
                alt={instructor.name}
                className="w-24 h-24 rounded-2xl object-cover ring-2 ring-[var(--border-default)]"
              />
              {instructor.verified && (
                <div className="absolute -bottom-1 -left-1 bg-[var(--accent-green)] rounded-full p-1">
                  <CheckCircle className="w-4 h-4 text-[var(--bg-primary)]" strokeWidth={3} />
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold">{instructor.name}</h2>
                {instructor.verified && (
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[var(--accent-green)]/10 text-[var(--accent-green)] border border-[var(--accent-green)]/20">
                    מאומת
                  </span>
                )}
              </div>

              {/* Dual ELO */}
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[var(--accent-amber)]/10 border border-[var(--accent-amber)]/20">
                  <Crosshair className="w-3.5 h-3.5 text-[var(--accent-amber)]" />
                  <span className="text-base font-bold text-[var(--accent-amber)]" style={{ fontFamily: "var(--font-rubik)" }}>
                    {instructor.eloShooting}
                  </span>
                  <span className="text-[10px] text-[var(--accent-amber)]/70">{getShootingLevel(instructor.eloShooting).label}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[var(--accent-blue)]/10 border border-[var(--accent-blue)]/20">
                  <GraduationCap className="w-3.5 h-3.5 text-[var(--accent-blue)]" />
                  <span className="text-base font-bold text-[var(--accent-blue)]" style={{ fontFamily: "var(--font-rubik)" }}>
                    {instructor.eloInstruction}
                  </span>
                  <span className="text-[10px] text-[var(--accent-blue)]/70">{getInstructionLevel(instructor.eloInstruction).label}</span>
                </div>
              </div>
              <div className="flex items-center gap-0.5 mt-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(instructor.stars) ? "text-[var(--accent-amber)] fill-[var(--accent-amber)]" : "text-[var(--border-default)]"}`} />
                ))}
                <span className="text-sm text-[var(--text-secondary)] mr-1">{instructor.stars}</span>
              </div>

              {/* Quick stats */}
              <div className="flex items-center gap-4 mt-2 text-xs text-[var(--text-muted)]">
                <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{instructor.trainees.toLocaleString()} חניכים</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{instructor.experience} שנות ניסיון</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Metrics */}
        <div className="px-4 mt-5">
          <div className="grid grid-cols-3 gap-2">
            {metrics.map((m) => (
              <div key={m.label} className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-3 text-center">
                <div className="text-lg font-bold text-[var(--accent-green)]" style={{ fontFamily: "var(--font-rubik)" }}>{m.value}</div>
                <div className="text-[10px] text-[var(--text-muted)] mt-0.5">{m.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bio */}
        <div className="px-4 mt-5">
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{instructor.bio}</p>
        </div>

        {/* Training types */}
        <div className="px-4 mt-5">
          <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
            <Award className="w-4 h-4 text-[var(--accent-green)]" />
            סוגי אימונים
          </h3>
          <div className="flex flex-wrap gap-2">
            {instructor.trainingTypes.map((type) => (
              <span key={type} className="px-3 py-1.5 text-xs font-medium rounded-lg bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-subtle)]">
                {type}
              </span>
            ))}
          </div>
        </div>

        {/* Ranges */}
        <div className="px-4 mt-5">
          <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[var(--accent-blue)]" />
            מטווחים
          </h3>
          <div className="space-y-2">
            {instructor.ranges.map((range) => (
              <div key={range} className="flex items-center justify-between bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-3">
                <span className="text-sm text-[var(--text-secondary)]">{range}</span>
                <button className="text-xs text-[var(--accent-blue)] flex items-center gap-1">
                  <Navigation className="w-3.5 h-3.5" />
                  נווט
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery */}
        {instructor.gallery.length > 0 && (
          <div className="px-4 mt-5">
            <h3 className="text-sm font-semibold mb-2">גלריה</h3>
            <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
              {instructor.gallery.map((img, i) => (
                <img key={i} src={img} alt="" className="w-48 h-32 rounded-xl object-cover flex-shrink-0 border border-[var(--border-subtle)]" />
              ))}
            </div>
          </div>
        )}

        {/* Videos + Social */}
        <VideoSection instructor={instructor} />

        {/* Reviews */}
        <div className="px-4 mt-5">
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Shield className="w-4 h-4 text-[var(--accent-amber)]" />
            ביקורות מאומתות ({instructor.reviews.length})
          </h3>
          <div className="space-y-3">
            {instructor.reviews.map((review) => (
              <div key={review.id} className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-[var(--text-primary)]">{review.name}</span>
                    {review.verified && (
                      <CheckCircle className="w-3.5 h-3.5 text-[var(--accent-green)]" />
                    )}
                  </div>
                  <span className="text-[10px] text-[var(--text-muted)]">{review.date}</span>
                </div>
                <div className="flex items-center gap-0.5 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3 h-3 ${i < review.rating ? "text-[var(--accent-amber)] fill-[var(--accent-amber)]" : "text-[var(--border-default)]"}`} />
                  ))}
                </div>
                <p className="text-sm text-[var(--text-secondary)] mt-2 leading-relaxed">{review.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Add Review */}
        <div className="px-4 mt-5">
          {reviewSubmitted ? (
            <div className="bg-[var(--accent-green)]/5 border border-[var(--accent-green)]/20 rounded-2xl p-4 text-center">
              <CheckCircle className="w-8 h-8 text-[var(--accent-green)] mx-auto mb-2" />
              <p className="text-sm font-bold text-[var(--accent-green)]">התגובה נשלחה בהצלחה!</p>
              <p className="text-xs text-[var(--text-muted)] mt-1">התגובה תופיע לאחר אישור המערכת</p>
            </div>
          ) : !showReviewForm ? (
            <button
              onClick={() => setShowReviewForm(true)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-[var(--border-default)] text-sm font-semibold text-[var(--text-secondary)] hover:border-[var(--accent-green)]/40 hover:text-[var(--accent-green)] transition-all"
            >
              <MessageSquarePlus className="w-5 h-5" />
              הוסף תגובה ודירוג
            </button>
          ) : (
            <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-4 space-y-3">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <MessageSquarePlus className="w-4 h-4 text-[var(--accent-green)]" />
                הוסף תגובה
              </h3>
              {/* Star rating */}
              <div>
                <label className="text-xs text-[var(--text-muted)] mb-1.5 block">דירוג</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button key={n} onClick={() => setReviewRating(n)} className="p-0.5 transition-transform hover:scale-110">
                      <Star className={`w-7 h-7 ${n <= reviewRating ? "text-[var(--accent-amber)] fill-[var(--accent-amber)]" : "text-[var(--border-default)]"}`} />
                    </button>
                  ))}
                </div>
              </div>
              {/* Name */}
              <div>
                <label className="text-xs text-[var(--text-muted)] mb-1.5 block">שם</label>
                <input
                  type="text"
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  placeholder="השם שלך"
                  className="w-full h-10 px-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-green)]"
                />
              </div>
              {/* Text */}
              <div>
                <label className="text-xs text-[var(--text-muted)] mb-1.5 block">תגובה</label>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="ספר על החוויה שלך..."
                  rows={3}
                  className="w-full px-3 py-2.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-green)] resize-none"
                />
              </div>
              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => setShowReviewForm(false)}
                  className="flex-1 h-10 rounded-xl border border-[var(--border-subtle)] text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                >
                  ביטול
                </button>
                <button
                  onClick={() => {
                    if (reviewRating > 0 && reviewName.trim() && reviewText.trim()) {
                      setReviewSubmitted(true);
                      setShowReviewForm(false);
                    }
                  }}
                  disabled={reviewRating === 0 || !reviewName.trim() || !reviewText.trim()}
                  className="flex-1 h-10 rounded-xl bg-[var(--accent-green)] text-[var(--bg-primary)] text-xs font-bold flex items-center justify-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110 transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  שלח תגובה
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Pricing */}
        <div className="px-4 mt-5">
          <h3 className="text-sm font-semibold mb-2">מחירים</h3>
          <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--text-secondary)]">אימון בסיסי</span>
              <span className="font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-rubik)" }}>₪{instructor.priceFrom}</span>
            </div>
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-[var(--border-subtle)]">
              <span className="text-sm text-[var(--text-secondary)]">אימון מקצועי</span>
              <span className="font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-rubik)" }}>₪{instructor.priceFrom + 100}</span>
            </div>
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-[var(--border-subtle)]">
              <span className="text-sm text-[var(--text-secondary)]">חבילת 5 אימונים</span>
              <span className="font-bold text-[var(--accent-green)]" style={{ fontFamily: "var(--font-rubik)" }}>₪{Math.round(instructor.priceFrom * 4.5)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky bottom CTA */}
      <div className="fixed bottom-16 left-0 right-0 z-40 bg-[var(--bg-primary)]/95 backdrop-blur-lg border-t border-[var(--border-subtle)] p-4">
        <div className="flex gap-3 max-w-2xl mx-auto">
          <a
            href={`tel:+972501234567`}
            className="w-12 h-12 rounded-xl border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--accent-green)] transition-colors"
          >
            <Phone className="w-5 h-5" />
          </a>
          <Link
            href={`/booking?instructor=${instructor.id}`}
            className="flex-1 h-12 rounded-xl bg-[var(--accent-green)] text-[var(--bg-primary)] font-bold text-sm flex items-center justify-center gap-2 glow-green hover:brightness-110 transition-all"
          >
            <Calendar className="w-4 h-4" />
            קבע אימון
          </Link>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
