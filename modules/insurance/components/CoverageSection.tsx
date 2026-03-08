"use client";

import {
  Shield, UserCheck, Scale, Crosshair, Home, Heart,
  FileCheck, Phone, Clock, AlertTriangle, Gavel, Users,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const coverageItems = [
  { icon: Shield, name: "צד ג׳ — נזקי גוף", desc: "כיסוי נזקי גוף שנגרמו לצד שלישי" },
  { icon: Scale, name: "צד ג׳ — נזקי רכוש", desc: "כיסוי נזקי רכוש שנגרמו לאחרים" },
  { icon: Gavel, name: "הגנה משפטית", desc: "ליווי וייצוג משפטי במקרה של תביעה" },
  { icon: Crosshair, name: "אירועי מטווח", desc: "כיסוי מלא לאירועים במטווח ירי" },
  { icon: UserCheck, name: "אחריות מחזיק", desc: "אחריות אישית של בעל הנשק" },
  { icon: AlertTriangle, name: "אירועי חירום", desc: "כיסוי לשימוש בנשק במצב חירום" },
  { icon: Home, name: "כיסוי ביתי", desc: "כיסוי לאירועים הקשורים לנשק בבית" },
  { icon: Heart, name: "בני משפחה", desc: "הרחבה להגנה על בני המשפחה" },
  { icon: FileCheck, name: "מסמכים ותיעוד", desc: "ניהול פוליסות ומסמכים דיגיטלי" },
  { icon: Phone, name: "קו חם 24/7", desc: "שירות חירום זמין מסביב לשעון" },
  { icon: Clock, name: "טיפול מהיר בתביעות", desc: "תהליך תביעות יעיל ומהיר" },
  { icon: Users, name: "שירות אישי", desc: "נציג ביטוח אישי לכל מבוטח" },
];

const CoverageCard = ({ icon: Icon, name, desc, index }: {
  icon: typeof Shield; name: string; desc: string; index: number;
}) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="group p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--accent-blue)]/30 hover:bg-[var(--bg-elevated)] transition-all duration-300"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ease ${index * 0.05}s, transform 0.5s ease ${index * 0.05}s`,
      }}
    >
      <div className="w-10 h-10 rounded-xl bg-[var(--accent-blue)]/10 flex items-center justify-center mb-3 group-hover:bg-[var(--accent-blue)]/20 transition-colors">
        <Icon className="w-5 h-5 text-[var(--accent-blue)]" strokeWidth={1.5} />
      </div>
      <h3 className="text-sm font-bold text-[var(--text-primary)] mb-1">{name}</h3>
      <p className="text-xs text-[var(--text-muted)] leading-relaxed">{desc}</p>
    </div>
  );
};

export const CoverageSection = () => (
  <section className="py-20 px-6">
    <div className="max-w-5xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-black text-center mb-3">
        מה <span className="text-[var(--accent-blue)]">מכוסה</span>?
      </h2>
      <p className="text-[var(--text-secondary)] text-center mb-12 max-w-lg mx-auto">
        כיסוי ביטוחי מקיף שמגן עליך ועל הסביבה — ביטוח שנבנה למחזיקי נשק
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {coverageItems.map((item, i) => (
          <CoverageCard key={item.name} {...item} index={i} />
        ))}
      </div>
    </div>
  </section>
);
