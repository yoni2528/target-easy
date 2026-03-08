import { Zap, ShieldCheck, HandCoins, Heart } from "lucide-react";

const benefits = [
  {
    icon: ShieldCheck,
    title: "מנורה ביטוח",
    desc: "פוליסה של חברת ביטוח מובילה בישראל. אמינות, יציבות ושירות שאפשר לסמוך עליו.",
    accent: "var(--accent-blue)",
  },
  {
    icon: Zap,
    title: "תהליך מהיר",
    desc: "הצטרפות פשוטה ומהירה. ללא בירוקרטיה מיותרת, ללא תקופות המתנה ארוכות.",
    accent: "var(--accent-blue)",
  },
  {
    icon: HandCoins,
    title: "הביטוח משלם על עצמו",
    desc: "עד 1,350₪ החזרים בשנה על אימונים, חידוש רישיון וציוד. ביטוח שמחזיר לך כסף.",
    accent: "var(--accent-amber)",
  },
];

export const BenefitsSection = () => (
  <section className="py-20 px-6 bg-[var(--bg-secondary)]/30">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-black text-center mb-12">
        למה <span className="text-[var(--accent-blue)]">דרכנו</span>?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {benefits.map((b) => (
          <div key={b.title} className="text-center">
            <div
              className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center"
              style={{ background: `color-mix(in srgb, ${b.accent} 12%, transparent)` }}
            >
              <b.icon className="w-7 h-7" style={{ color: b.accent }} strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">{b.title}</h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{b.desc}</p>
          </div>
        ))}
      </div>

      {/* Tagline banner */}
      <div className="relative p-8 rounded-2xl bg-gradient-to-l from-[var(--accent-blue)]/10 to-[var(--accent-blue)]/5 border border-[var(--accent-blue)]/20 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] rounded-full bg-[var(--accent-blue)]/5 blur-[60px]" />
        </div>
        <Heart className="w-8 h-8 text-[var(--accent-blue)] mx-auto mb-3" strokeWidth={1.5} />
        <p className="text-2xl md:text-3xl font-black text-[var(--text-primary)] relative z-10">
          פעלתם להצלת חיים?{" "}
          <span className="text-[var(--accent-blue)]">אנחנו איתכם.</span>
        </p>
      </div>
    </div>
  </section>
);
