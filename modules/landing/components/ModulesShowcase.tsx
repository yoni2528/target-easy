"use client";

import {
  Users, BookOpen, Bell, Wallet, FileText, Package,
  BarChart3, Calendar, Megaphone, Crosshair, PieChart,
  CreditCard, PenTool, GraduationCap, UserPlus,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const modules = [
  { icon: Users, name: "ניהול לקוחות", desc: "מאגר מרכזי עם כל פרטי הלקוח" },
  { icon: BookOpen, name: "יומן יורים דיגיטלי", desc: "תיעוד ירי עם OCR לרישיון נשק" },
  { icon: Bell, name: "תזכורות אוטומטיות", desc: "SMS ו-WhatsApp לרענון ותפוגה" },
  { icon: Wallet, name: "ניהול הכנסות", desc: "מעקב תשלומים וחשבוניות" },
  { icon: FileText, name: "מסמכים ותבניות", desc: "תבניות מוכנות וייצוא PDF" },
  { icon: Package, name: "מלאי וציוד", desc: "ניהול מלאי מטווח בזמן אמת" },
  { icon: BarChart3, name: "דשבורד וניתוח", desc: "נתונים ותובנות בזמן אמת" },
  { icon: Calendar, name: "תיאום תורים", desc: "לוח שנה חכם וניהול תורים" },
  { icon: Megaphone, name: "קמפיינים", desc: "שיווק אוטומטי ללקוחות" },
  { icon: Crosshair, name: "מעקב תחמושת", desc: "מעקב צריכה ומלאי תחמושת" },
  { icon: PieChart, name: "דוחות", desc: "דוחות מפורטים לביקורת ורגולציה" },
  { icon: CreditCard, name: "תשלום על בסיס הצלחה", desc: "מודל תשלום ללא סיכון" },
  { icon: PenTool, name: "חתימות דיגיטליות", desc: "חתימות משפטיות תקפות" },
  { icon: GraduationCap, name: "ניהול מדריכים", desc: "צוות מדריכים ומשמרות" },
  { icon: UserPlus, name: "ניהול לידים", desc: "מעקב לידים והמרה ללקוחות" },
];

const ModuleCard = ({ icon: Icon, name, desc, index }: {
  icon: typeof Users; name: string; desc: string; index: number;
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
      className="group p-5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--accent-green)]/30 hover:bg-[var(--bg-elevated)] transition-all duration-300"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ease ${index * 0.05}s, transform 0.5s ease ${index * 0.05}s`,
      }}
    >
      <div className="w-10 h-10 rounded-xl bg-[var(--accent-green)]/10 flex items-center justify-center mb-3 group-hover:bg-[var(--accent-green)]/20 transition-colors">
        <Icon className="w-5 h-5 text-[var(--accent-green)]" strokeWidth={1.5} />
      </div>
      <h3 className="text-sm font-bold text-[var(--text-primary)] mb-1">{name}</h3>
      <p className="text-xs text-[var(--text-muted)] leading-relaxed">{desc}</p>
    </div>
  );
};

export const ModulesShowcase = () => (
  <section className="py-20 px-6">
    <div className="max-w-5xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-black text-center mb-3">
        כל מה שצריך <span className="text-[var(--accent-green)]">במקום אחד</span>
      </h2>
      <p className="text-[var(--text-secondary)] text-center mb-12 max-w-lg mx-auto">
        15 מודולים שמכסים כל היבט בניהול מטווח — מלקוחות ועד ביקורת
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {modules.map((m, i) => (
          <ModuleCard key={m.name} {...m} index={i} />
        ))}
      </div>
    </div>
  </section>
);
