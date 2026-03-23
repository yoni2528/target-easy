"use client";

import { useState, useEffect } from "react";
import { X, Check, Star } from "lucide-react";

const plans = [
  { name: "רגיל", price: "42", tier: "base" as const },
  { name: "מורחב", price: "102", tier: "mid" as const, popular: true },
  { name: "פרימיום", price: "119", tier: "top" as const },
];

const features = [
  { label: "ביטוח צד ג׳ מנורה", base: "עד 1M₪", mid: "עד 1M₪", top: "עד 2M₪" },
  { label: "כיסוי נזקי גוף ורכוש", base: true, mid: true, top: true },
  { label: "כיסוי אירועי טרור", base: true, mid: true, top: true },
  { label: "קו חם לעו״ד 24/7", base: true, mid: true, top: true },
  { label: "נשק חלופי בגניבה", base: false, mid: "עד ₪3,500", top: "עד ₪3,500" },
  { label: "אימון ירי + ירי למשפחה", base: false, mid: true, top: true },
  { label: "הכנה לחידוש רישיון", base: false, mid: true, top: true },
  { label: "הנחה על מוצרי מטווח", base: false, mid: true, top: true },
];

const tierColors = {
  base: { head: "#f8faff", accent: "var(--accent-blue)" },
  mid: { head: "var(--accent-blue)", accent: "white" },
  top: { head: "#0e1828", accent: "#e8d48b" },
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
        <div className="max-w-5xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
          <a href="#" className="text-lg md:text-xl font-black transition-colors" style={{ color: scrolled ? "#37374e" : "white" }}>
            מטרה
          </a>
          <div className="flex items-center gap-3 md:gap-5">
            <button onClick={() => setOpen(true)}
              className="text-sm font-bold cursor-pointer transition-colors py-2"
              style={{ color: scrolled ? "#37374e" : "white" }}>
              מחירים
            </button>
            <a href="#contact"
              className="text-xs md:text-sm font-bold px-4 md:px-5 py-2 hover:scale-105 transition-transform"
              style={{ borderRadius: "20px", background: "var(--accent-blue)", color: "white" }}>
              צור קשר
            </a>
          </div>
        </div>
      </nav>

      {/* Pricing Modal */}
      {open && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center md:p-4" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" style={{ animation: "fadeIn 0.2s ease" }} />
          <div className="relative bg-white w-full max-w-3xl max-h-[92vh] overflow-y-auto p-5 pt-12 md:p-10 rounded-t-3xl md:rounded-[30px]"
            onClick={(e) => e.stopPropagation()}
            style={{ boxShadow: "0 30px 60px -15px rgba(0,0,0,0.2)", animation: "fadeInUp 0.3s ease" }}>
            <button onClick={() => setOpen(false)}
              className="absolute top-3 left-3 md:top-4 md:left-4 w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#f0f2f5] transition-colors">
              <X className="w-5 h-5 text-[#6b6b80]" />
            </button>
            <h2 className="text-xl md:text-3xl font-black text-[#37374e] text-center mb-2">
              בחר את <span className="text-[var(--accent-blue)]">המסלול שלך</span>
            </h2>
            <p className="text-[#6b6b80] text-center mb-6 md:mb-8 text-xs md:text-sm">ביטוח צד ג׳ מנורה + כתב שירות בריאות פלוס</p>

            {/* Plan cards */}
            <div className="grid grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8" dir="rtl">
              {plans.map((p) => {
                const c = tierColors[p.tier];
                const isMid = p.tier === "mid";
                return (
                  <div key={p.name} className="relative rounded-2xl overflow-hidden"
                    style={{
                      background: c.head,
                      border: isMid ? "2px solid var(--accent-blue)" : p.tier === "top" ? "2px solid #c9a84c" : "1px solid #e8edf5",
                      transform: isMid ? "scale(1.04)" : "none",
                      boxShadow: isMid ? "0 8px 30px -8px rgba(26,111,204,0.25)" : "none",
                    }}>
                    {isMid && (
                      <div className="text-center py-1.5" style={{ background: "var(--accent-blue)" }}>
                        <span className="text-[11px] md:text-xs font-bold text-white flex items-center justify-center gap-1">
                          <Star className="w-3 h-3" fill="currentColor" />הכי פופולרי
                        </span>
                      </div>
                    )}
                    <div className="p-4 md:p-5 text-center" style={{ color: c.accent }}>
                      <div className="font-black text-base md:text-lg mb-1">{p.name}</div>
                      <div className="flex items-baseline justify-center gap-0.5">
                        <span className="text-3xl md:text-4xl font-black">{p.price}</span>
                        <span className="text-xs opacity-70">₪/חודש</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Features table */}
            <div className="overflow-x-auto" dir="rtl">
              <table className="w-full" style={{ borderCollapse: "separate", borderSpacing: 0 }}>
                <tbody>
                  {features.map((f, i) => (
                    <tr key={f.label} style={{ background: i % 2 === 0 ? "#f8faff" : "white" }}>
                      <td className="p-3.5 md:p-4 font-semibold text-sm md:text-base text-[#37374e] w-[40%]">{f.label}</td>
                      {(["base", "mid", "top"] as const).map((tier) => {
                        const val = f[tier];
                        return (
                          <td key={tier} className="p-3.5 md:p-4 text-center" style={{ width: "20%" }}>
                            {val === true
                              ? <div className="w-7 h-7 rounded-full bg-green-50 flex items-center justify-center mx-auto"><Check className="w-4 h-4 text-green-500" /></div>
                              : val === false
                              ? <div className="w-7 h-7 rounded-full bg-gray-50 flex items-center justify-center mx-auto"><X className="w-3.5 h-3.5 text-[#ccc]" /></div>
                              : <span className="text-xs md:text-sm font-bold text-[var(--accent-blue)]">{val}</span>}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* CTA buttons */}
            <div className="grid grid-cols-3 gap-3 md:gap-4 mt-6" dir="rtl">
              {plans.map((p) => (
                <a key={p.name} href="#contact" onClick={() => setOpen(false)}
                  className="block text-center px-3 py-3 text-sm font-bold rounded-xl hover:scale-105 transition-transform"
                  style={{
                    background: p.tier === "top" ? "linear-gradient(135deg, #c9a84c, #e8d48b)" : p.tier === "mid" ? "var(--accent-blue)" : "#f0f4fa",
                    color: p.tier === "top" ? "#0e1828" : p.tier === "mid" ? "white" : "var(--accent-blue)",
                  }}>
                  לרכישה
                </a>
              ))}
            </div>

            {/* Upgrade note */}
            <div className="mt-5 mx-auto max-w-md rounded-xl px-4 py-3" style={{ background: "#f8faff", border: "1px solid #e8edf5" }}>
              <p className="text-center text-[13px] text-[#6b6b80] leading-relaxed">
                ניתן להגדיל את כיסוי הגניבה, ההוצאות המשפטיות או צד ג׳ — {" "}
                <a href="#contact" onClick={() => setOpen(false)} className="font-bold text-[var(--accent-blue)] hover:underline">לפרטים צרו קשר</a>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
