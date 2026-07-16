"use client";

import { useState, type FormEvent } from "react";
import { ArrowLeft, Check, Loader2 } from "lucide-react";

type Variant = "full" | "compact";

interface Props {
  variant?: Variant;
}

export const InsuranceContactForm = ({ variant = "full" }: Props) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [agreeContact, setAgreeContact] = useState(true);
  const [wantOtherInsurance, setWantOtherInsurance] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState("");

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (status === "loading") return;

    if (!name.trim() || !phone.trim()) {
      setErrorMsg("שם וטלפון הם שדות חובה");
      setStatus("error");
      return;
    }
    if (!agreeContact) {
      setErrorMsg("יש לאשר יצירת קשר");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/leads/insurance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          agreeContact,
          wantOtherInsurance,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setErrorMsg(body?.error ?? "שגיאה בשליחה. נסו שוב.");
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setErrorMsg("שגיאת רשת. נסו שוב.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className={
          variant === "compact"
            ? "p-6 rounded-2xl bg-white/95 backdrop-blur border border-white/40 text-center"
            : "p-8 md:p-10 rounded-3xl bg-white border border-[#e8edf5] text-center shadow-lg"
        }
      >
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
          <Check className="w-7 h-7 text-green-600" />
        </div>
        <h3 className="text-xl md:text-2xl font-black text-[#37374e] mb-2">
          תודה שהשארת פרטים!
        </h3>
        <p className="text-[#6b6b80] text-sm">
          נחזור אליך תוך 24 שעות עם הצעה מותאמת אישית.
        </p>
      </div>
    );
  }

  const wrapperClass =
    variant === "compact"
      ? "p-5 md:p-6 rounded-2xl bg-white/95 backdrop-blur border border-white/40 shadow-2xl"
      : "p-6 md:p-8 rounded-3xl bg-white border border-[#e8edf5] shadow-lg";

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-[#e8edf5] bg-white text-[#37374e] " +
    "placeholder:text-[#a0a0b0] focus:outline-none focus:border-[var(--accent-blue)] " +
    "focus:ring-2 focus:ring-[var(--accent-blue)]/20 transition-all text-base";

  const btnClass =
    "w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-base " +
    "bg-[var(--accent-blue)] text-white hover:scale-[1.02] transition-transform " +
    "disabled:opacity-70 disabled:cursor-not-allowed";

  return (
    <form onSubmit={submit} className={wrapperClass} dir="rtl">
      {variant === "compact" && (
        <div className="text-center mb-4">
          <div className="text-base font-black text-[#37374e]">השאר פרטים</div>
          <div className="text-xs text-[#6b6b80] mt-0.5">נחזור אליך תוך 24 שעות</div>
        </div>
      )}

      <div className="space-y-3">
        <input
          type="text"
          placeholder="שם מלא"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
          autoComplete="name"
          disabled={status === "loading"}
        />
        <input
          type="tel"
          placeholder="מספר טלפון"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={inputClass}
          autoComplete="tel"
          inputMode="tel"
          disabled={status === "loading"}
        />
      </div>

      <div className="space-y-2.5 mt-4">
        <label className="flex items-start gap-2.5 cursor-pointer group">
          <input
            type="checkbox"
            checked={agreeContact}
            onChange={(e) => setAgreeContact(e.target.checked)}
            className="mt-0.5 w-4 h-4 accent-[var(--accent-blue)] cursor-pointer flex-shrink-0"
            disabled={status === "loading"}
          />
          <span className="text-xs md:text-sm text-[#37374e] leading-snug">
            אני מאשר/ת שיחזרו אליי לפרטים נוספים
          </span>
        </label>
        <label className="flex items-start gap-2.5 cursor-pointer group">
          <input
            type="checkbox"
            checked={wantOtherInsurance}
            onChange={(e) => setWantOtherInsurance(e.target.checked)}
            className="mt-0.5 w-4 h-4 accent-[var(--accent-blue)] cursor-pointer flex-shrink-0"
            disabled={status === "loading"}
          />
          <span className="text-xs md:text-sm text-[#37374e] leading-snug">
            אשמח שינסו להוזיל לי ביטוחים נוספים
          </span>
        </label>
      </div>

      {status === "error" && errorMsg && (
        <div className="mt-3 text-xs text-red-600 text-center bg-red-50 rounded-lg py-2 px-3">
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className={btnClass + " mt-5"}
        style={{
          boxShadow:
            "0 8px 20px -5px color-mix(in srgb, var(--accent-blue) 35%, transparent)",
        }}
      >
        {status === "loading" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            שולח...
          </>
        ) : (
          <>
            השאר פרטים
            <ArrowLeft className="w-4 h-4" />
          </>
        )}
      </button>

      <p className="text-[11px] text-[#a0a0b0] text-center mt-3">
        ללא התחייבות · הפרטים שלך אצלנו בלבד
      </p>
    </form>
  );
};
