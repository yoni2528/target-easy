"use client";

import { useEffect } from "react";
import Link from "next/link";
import Script from "next/script";
import { Check, ArrowLeft, Phone } from "lucide-react";

const FB_PIXEL_ID =
  process.env.NEXT_PUBLIC_FB_PIXEL_ID ?? "1182884463965088";

export default function ThankYouPage() {
  useEffect(() => {
    // Defensive: in case the base layout pixel was blocked, the fbq queue
    // doesn't exist. The afterInteractive Script below will fire Lead once
    // it loads; this effect is only for clients that already had fbq present
    // (returning visitors) and want an immediate fire.
    if (typeof window !== "undefined") {
      const w = window as unknown as { fbq?: (...args: unknown[]) => void };
      if (typeof w.fbq === "function") {
        w.fbq("track", "Lead");
      }
    }
  }, []);

  return (
    <main
      className="min-h-screen insurance-theme flex flex-col items-center justify-center px-6 py-12"
      style={{
        background:
          "radial-gradient(ellipse at 50% 30%, #1a2c4e 0%, #0a1628 60%), #0a1628",
      }}
    >
      {/* Fire the Lead conversion event regardless of useEffect timing */}
      {FB_PIXEL_ID ? (
        <Script id="fb-pixel-lead" strategy="afterInteractive">
          {`
            (function(){
              function fire(){ if(window.fbq){ window.fbq('track', 'Lead'); } else { setTimeout(fire, 150); } }
              fire();
            })();
          `}
        </Script>
      ) : null}

      <div className="max-w-lg w-full text-center">
        <div
          className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
          style={{ background: "rgba(74,222,128,0.15)" }}
        >
          <Check className="w-10 h-10 text-[#4ade80]" />
        </div>

        <h1 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
          קיבלנו את הפרטים שלך
        </h1>

        <p className="text-base md:text-lg text-white/75 leading-relaxed mb-8">
          נציג שלנו יחזור אליך תוך 60 דקות בשעות פעילות,
          <br />
          עם פרטי ההצטרפות לקבוצת הרכישה.
        </p>

        <div
          className="rounded-2xl p-5 md:p-6 mb-8 text-right"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.10)",
          }}
        >
          <p className="text-sm font-bold text-white mb-2 text-center">
            ✦ בזמן שאתה ממתין
          </p>
          <p className="text-sm text-white/70 leading-relaxed text-center">
            עד שנציג יחזור אליך, כדאי להעיף מבט בקהילה. שם תמצא ידע משפטי,
            קורסים חינמיים ותמיכה הדדית של מאות חמושים.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="https://bia-il.vercel.app/community"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#fbbf24] text-[#0a1628] font-bold rounded-full hover:scale-105 transition-transform"
            style={{ boxShadow: "0 12px 30px -5px rgba(251,191,36,0.40)" }}
          >
            לקהילת אחים עם נשק
            <ArrowLeft className="w-4 h-4" />
          </a>
          <Link
            href="/lawyer-hotline"
            className="inline-flex items-center gap-2 px-6 py-3 border border-white/25 text-white font-semibold rounded-full hover:bg-white/5 transition-colors"
          >
            חזרה לעמוד הראשי
          </Link>
        </div>

        <div className="mt-10 flex items-center justify-center gap-2 text-xs text-white/40">
          <Phone className="w-3.5 h-3.5" />
          <span>צריך כבר עכשיו? חייגו</span>
          <a
            href="tel:0552281168"
            className="text-white/70 font-semibold hover:text-white transition-colors"
            dir="ltr"
          >
            055-228-1168
          </a>
        </div>
      </div>
    </main>
  );
}
