"use client";

import { useState, useEffect } from "react";
import { X, Check, Star } from "lucide-react";

const plans = [
  { name: "בסיסי", price: "500", tier: "base" as const, features: ["ביטוח צד ג׳ מנורה", "כיסוי נזקי גוף ורכוש", "כיסוי אירועי טרור", "קו חם לעו״ד 24/7"] },
  { name: "מורחב", price: "700", tier: "mid" as const, popular: true, features: ["כל מה שבבסיסי +", "נשק חלופי בגניבה (עד ₪3,500)", "אימון ירי + ירי למשפחה", "הכנה לחידוש רישיון", "הנחה על מוצרי מטווח"] },
  { name: "פרימיום", price: "900", tier: "top" as const, features: ["כל מה שבבסיסי +", "נשק חלופי בגניבה (עד ₪5,000)", "אימון ירי + ירי למשפחה", "הכנה לחידוש רישיון", "הנחה על מוצרי מטווח"] },
];

type Plan = (typeof plans)[0];

const tierStyles = {
  base: { bg: "#f8faff", color: "#37374e", border: "1px solid #e8edf5", check: "var(--accent-blue)", textOp: 0.7, btnBg: "var(--accent-blue)", btnColor: "white" },
  mid: { bg: "var(--accent-blue)", color: "white", border: "none", check: "white", textOp: 0.95, btnBg: "white", btnColor: "var(--accent-blue)" },
  top: { bg: "linear-gradient(135deg, #0e1828 0%, #1a2a44 50%, #0e1828 100%)", color: "#f0e6d0", border: "1px solid #c9a84c33", check: "#c9a84c", textOp: 0.9, btnBg: "linear-gradient(135deg, #c9a84c, #e8d48b)", btnColor: "#0e1828" },
};

const PlanCard = ({ plan, onClose }: { plan: Plan; onClose: () => void }) => {
  const s = tierStyles[plan.tier];
  const isTop = plan.tier === "top";
  return (
    <div className="relative p-5 text-center"
      style={{ borderRadius: "20px", background: s.bg, border: s.border, color: s.color,
        boxShadow: isTop ? "0 8px 32px rgba(201,168,76,0.15)" : undefined }}>
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-white text-[var(--accent-blue)] text-xs font-bold rounded-full flex items-center gap-1 shadow-sm">
          <Star className="w-3 h-3" fill="currentColor" /> הכי פופולרי
        </div>
      )}
      {isTop && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-bold rounded-full flex items-center gap-1"
          style={{ background: "linear-gradient(135deg, #c9a84c, #e8d48b)", color: "#0e1828", boxShadow: "0 2px 8px rgba(201,168,76,0.3)" }}>
          <Star className="w-3 h-3" fill="currentColor" /> כיסוי מקסימלי
        </div>
      )}
      <h3 className="text-lg font-black mb-1">{plan.name}</h3>
      <div className="flex items-baseline justify-center gap-1 mb-4">
        <span className="text-3xl font-black" style={{ color: isTop ? "#e8d48b" : undefined }}>{plan.price}</span>
        <span className="text-sm opacity-70">₪ לשנה</span>
      </div>
      <ul className="space-y-2 text-right mb-5">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm">
            <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: s.check }} />
            <span style={{ opacity: s.textOp }}>{f}</span>
          </li>
        ))}
      </ul>
      <a href="#contact" onClick={onClose}
        className="block py-2.5 text-sm font-bold transition-all hover:scale-105"
        style={{ borderRadius: "14px", background: s.btnBg, color: s.btnColor }}>
        לפרטים נוספים
      </a>
    </div>
  );
};

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
            <p className="text-[#6b6b80] text-center mb-8 text-sm">ביטוח צד ג׳ מנורה + כתב שירות בריאות פלוס</p>
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
