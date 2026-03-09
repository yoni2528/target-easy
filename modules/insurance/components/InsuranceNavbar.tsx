"use client";

import { useState, useEffect } from "react";
import { X, Check, Star } from "lucide-react";

const plans = [
  { name: "בסיסי", price: "42", tier: "base" as const },
  { name: "מורחב", price: "58", tier: "mid" as const, popular: true },
  { name: "פרימיום", price: "75", tier: "top" as const },
];

const features = [
  { label: "ביטוח צד ג׳ מנורה", base: true, mid: true, top: true },
  { label: "כיסוי נזקי גוף ורכוש", base: true, mid: true, top: true },
  { label: "כיסוי אירועי טרור", base: true, mid: true, top: true },
  { label: "קו חם לעו״ד 24/7", base: true, mid: true, top: true },
  { label: "נשק חלופי בגניבה", base: false, mid: "עד ₪3,500", top: "עד ₪5,000" },
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

            {/* Comparison table */}
            <div className="overflow-x-auto" dir="rtl">
              <table className="w-full text-sm" style={{ borderCollapse: "separate", borderSpacing: 0 }}>
                <thead>
                  <tr>
                    <th className="text-right p-3 font-normal text-[#86868b] w-[40%]" />
                    {plans.map((p) => {
                      const c = tierColors[p.tier];
                      return (
                        <th key={p.name} className="p-3 relative" style={{ width: "20%" }}>
                          <div className="rounded-2xl p-3 md:p-4" style={{ background: c.head, color: c.accent }}>
                            {p.popular && <span className="text-[10px] font-bold bg-white text-[var(--accent-blue)] px-2 py-0.5 rounded-full absolute -top-2 left-1/2 -translate-x-1/2 flex items-center gap-0.5 whitespace-nowrap"><Star className="w-2.5 h-2.5" fill="currentColor" />הכי פופולרי</span>}
                            <div className="font-black text-base">{p.name}</div>
                            <div className="flex items-baseline justify-center gap-0.5 mt-1">
                              <span className="text-2xl md:text-3xl font-black">{p.price}</span>
                              <span className="text-xs opacity-70">₪/חודש</span>
                            </div>
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {features.map((f, i) => (
                    <tr key={f.label} style={{ background: i % 2 === 0 ? "#fafbfe" : "white" }}>
                      <td className="p-3 font-medium text-[#37374e]">{f.label}</td>
                      {(["base", "mid", "top"] as const).map((tier) => {
                        const val = f[tier];
                        return (
                          <td key={tier} className="p-3 text-center">
                            {val === true ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : val === false ? <X className="w-4 h-4 text-[#d2d2d7] mx-auto" /> : <span className="text-xs font-bold text-[var(--accent-blue)]">{val}</span>}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td className="p-3" />
                    {plans.map((p) => (
                      <td key={p.name} className="p-3 text-center">
                        <a href="#contact" onClick={() => setOpen(false)}
                          className="inline-block px-5 py-2.5 text-sm font-bold rounded-xl hover:scale-105 transition-transform"
                          style={{ background: p.tier === "top" ? "linear-gradient(135deg, #c9a84c, #e8d48b)" : "var(--accent-blue)", color: p.tier === "top" ? "#0e1828" : "white" }}>
                          לפרטים
                        </a>
                      </td>
                    ))}
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
