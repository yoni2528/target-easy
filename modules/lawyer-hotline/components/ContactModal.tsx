"use client";

import { useEffect, useState } from "react";
import { X, Check, Loader2 } from "lucide-react";

type Status = "idle" | "submitting" | "success" | "error";

export const ContactModal = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    const onOpen = () => {
      setStatus("idle");
      setErrMsg("");
      setOpen(true);
    };
    window.addEventListener("open-contact-modal", onOpen);
    return () => window.removeEventListener("open-contact-modal", onOpen);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function close() {
    if (status === "submitting") return;
    setOpen(false);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    setStatus("submitting");
    setErrMsg("");

    try {
      const res = await fetch("/api/leads/lawyer-hotline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), phone: phone.trim() }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data?.error) {
        setStatus("error");
        setErrMsg(data?.error ?? "אירעה שגיאה. נסו שוב או חייגו 055-228-1168.");
        return;
      }
      setStatus("success");
      setName("");
      setPhone("");
      // Navigate to the dedicated thank-you page so the Facebook Pixel
      // can fire 'Lead' as a clean page-load conversion event.
      if (typeof window !== "undefined") {
        window.location.href = "/lawyer-hotline/thank-you";
      }
    } catch {
      setStatus("error");
      setErrMsg("בעיית חיבור. נסו שוב או חייגו 055-228-1168.");
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8"
      style={{ background: "rgba(10,22,40,0.65)", backdropFilter: "blur(4px)" }}
      onClick={close}
    >
      <div
        className="relative w-full max-w-md bg-white rounded-2xl p-6 md:p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={close}
          aria-label="סגור"
          className="absolute top-3 left-3 p-2 rounded-full text-[#6b6b80] hover:bg-[#fafbfe] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {status === "success" ? (
          <div className="text-center py-4">
            <div
              className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ background: "rgba(74,222,128,0.15)" }}
            >
              <Check className="w-7 h-7 text-[#22c55e]" />
            </div>
            <h3 className="text-xl md:text-2xl font-black text-[#37374e] mb-2">
              קיבלנו את הפרטים!
            </h3>
            <p className="text-sm text-[#6b6b80] leading-relaxed mb-6">
              נציג שלנו יחזור אליך תוך 60 דקות (בשעות פעילות)
              <br />
              עם פרטי ההצטרפות לקבוצת הרכישה.
            </p>
            <button
              type="button"
              onClick={close}
              className="px-6 py-2.5 rounded-full bg-[var(--accent-blue)] text-white font-bold text-sm hover:scale-105 transition-transform"
            >
              סגור
            </button>
          </div>
        ) : (
          <>
            <div className="mb-5 md:mb-6">
              <h3 className="text-xl md:text-2xl font-black text-[#37374e] mb-1.5">
                השאירו פרטים
              </h3>
              <p className="text-sm text-[#6b6b80]">
                נחזור אליכם תוך 60 דקות עם פרטי ההצטרפות לקבוצה.
              </p>
            </div>

            <form onSubmit={submit} className="space-y-3.5">
              <div>
                <label
                  htmlFor="lh-name"
                  className="block text-xs font-bold text-[#37374e] mb-1.5"
                >
                  שם מלא
                </label>
                <input
                  id="lh-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="ישראל ישראלי"
                  className="w-full px-4 py-3 rounded-xl border border-[#e8edf5] bg-[#fafbfe] focus:border-[var(--accent-blue)] focus:bg-white focus:outline-none transition-colors text-[#37374e]"
                />
              </div>
              <div>
                <label
                  htmlFor="lh-phone"
                  className="block text-xs font-bold text-[#37374e] mb-1.5"
                >
                  טלפון
                </label>
                <input
                  id="lh-phone"
                  type="tel"
                  required
                  inputMode="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="054-1234567"
                  dir="ltr"
                  className="w-full px-4 py-3 rounded-xl border border-[#e8edf5] bg-[#fafbfe] focus:border-[var(--accent-blue)] focus:bg-white focus:outline-none transition-colors text-[#37374e]"
                />
              </div>

              {status === "error" && (
                <p className="text-sm text-[#cc3333] text-center">{errMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full py-3.5 rounded-full bg-[#fbbf24] text-[#0a1628] font-black text-base disabled:opacity-70 hover:scale-[1.02] transition-transform inline-flex items-center justify-center gap-2"
                style={{
                  boxShadow: "0 12px 30px -5px rgba(251,191,36,0.45)",
                }}
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    שולח...
                  </>
                ) : (
                  "אני מצטרף ב-14.90 ₪"
                )}
              </button>

              <p className="text-[10px] text-center text-[#a0a0b0] leading-relaxed">
                בהשארת הפרטים את/ה מסכים/ה שניצור עמך קשר טלפוני להמשך תהליך
                ההצטרפות. ללא התחייבות.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
