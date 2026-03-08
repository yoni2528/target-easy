"use client";

import { useState, useEffect } from "react";
import { X, Check, Star } from "lucide-react";

const plans = [
  { name: "בסיסי", price: "500", features: ["כיסוי צד ג׳ בסיסי", "אחריות למחזיק הנשק", "כיסוי נזקי גוף", "ליווי משפטי ראשוני"] },
  { name: "מורחב", price: "700", popular: true, features: ["כיסוי צד ג׳ מורחב", "אחריות מלאה למחזיק", "כיסוי נזקי גוף ורכוש", "ליווי משפטי מלא", "כיסוי אירועי ירי במטווח"] },
  { name: "פרימיום", price: "900", features: ["כיסוי צד ג׳ מקסימלי", "אחריות מלאה + הרחבות", "כיסוי נזקי גוף, רכוש ותוצאתי", "ליווי משפטי מלא + ייצוג", "כיסוי מטווח + נשיאה", "הגנה על בני משפחה"] },
];

type Plan = (typeof plans)[0];

const PlanCard = ({ plan, onClose }: { plan: Plan; onClose: () => void }) => (
  <div className="relative p-5 text-center"
    style={{
      borderRadius: "20px",
      background: plan.popular ? "var(--accent-blue)" : "#f8faff",
      border: plan.popular ? "none" : "1px solid #e8edf5",
      color: plan.popular ? "white" : "#37374e",
    }}>
    {plan.popular && (
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-white text-[var(--accent-blue)] text-xs font-bold rounded-full flex items-center gap-1 shadow-sm">
        <Star className="w-3 h-3" fill="currentColor" /> הכי פופולרי
      </div>
    )}
    <h3 className="text-lg font-black mb-1">{plan.name}</h3>
    <div className="flex items-baseline justify-center gap-1 mb-4">
      <span className="text-3xl font-black">{plan.price}</span>
      <span className="text-sm opacity-70">₪ לשנה</span>
    </div>
    <ul className="space-y-2 text-right mb-5">
      {plan.features.map((f) => (
        <li key={f} className="flex items-start gap-2 text-sm">
          <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: plan.popular ? "white" : "var(--accent-blue)" }} />
          <span style={{ opacity: plan.popular ? 0.95 : 0.7 }}>{f}</span>
        </li>
      ))}
    </ul>
    <a href="#contact" onClick={onClose}
      className="block py-2.5 text-sm font-bold transition-all hover:scale-105"
      style={{
        borderRadius: "14px",
        background: plan.popular ? "white" : "var(--accent-blue)",
        color: plan.popular ? "var(--accent-blue)" : "white",
      }}>
      לפרטים נוספים
    </a>
  </div>
);

export const InsuranceNavbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(255,255,255,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid #e8edf5" : "1px solid transparent",
        }}>
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="#" className="text-xl font-black transition-colors" style={{ color: scrolled ? "#37374e" : "white" }}>
            מטרה
          </a>
          <div className="flex items-center gap-5">
            <button onClick={() => setOpen(true)}
              className="text-sm font-bold cursor-pointer transition-colors"
              style={{ color: scrolled ? "#37374e" : "white" }}>
              מחירים
            </button>
            <a href="#contact"
              className="text-sm font-bold px-5 py-2 hover:scale-105 transition-transform"
              style={{ borderRadius: "20px", background: "var(--accent-blue)", color: "white" }}>
              צור קשר
            </a>
          </div>
        </div>
      </nav>

      {/* Pricing Modal */}
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" style={{ animation: "fadeIn 0.2s ease" }} />
          <div className="relative bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 md:p-10"
            onClick={(e) => e.stopPropagation()}
            style={{ borderRadius: "30px", boxShadow: "0 30px 60px -15px rgba(0,0,0,0.2)", animation: "fadeInUp 0.3s ease" }}>
            <button onClick={() => setOpen(false)}
              className="absolute top-4 left-4 w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#f0f2f5] transition-colors">
              <X className="w-5 h-5 text-[#6b6b80]" />
            </button>
            <h2 className="text-2xl md:text-3xl font-black text-[#37374e] text-center mb-2">
              בחר את <span className="text-[var(--accent-blue)]">המסלול שלך</span>
            </h2>
            <p className="text-[#6b6b80] text-center mb-8 text-sm">3 מסלולים — מנורה ביטוח</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {plans.map((plan) => (
                <PlanCard key={plan.name} plan={plan} onClose={() => setOpen(false)} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
