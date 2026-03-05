import { Monitor, Layers, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: Monitor,
    title: "הכל דיגיטלי",
    desc: "שכח מתיקיות ודפים. כל טופס, יומן ומסמך — דיגיטלי, מאובטח, נגיש מכל מקום.",
    accent: "var(--accent-green)",
  },
  {
    icon: Layers,
    title: "מערכת אחת",
    desc: "לקוחות, תורים, מלאי, הכנסות, דוחות — הכל במערכת אחת במקום עשר.",
    accent: "var(--accent-blue)",
  },
  {
    icon: ShieldCheck,
    title: "מוכן לביקורת",
    desc: "דוחות מפורטים, תיעוד מלא ומעקב רגולטורי — תמיד מוכן לביקורת.",
    accent: "var(--accent-amber)",
  },
];

export const FeaturesSection = () => (
  <section className="py-20 px-6 bg-[var(--bg-secondary)]/30">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-black text-center mb-12">
        למה <span className="text-[var(--accent-green)]">מטרה</span>?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((f) => (
          <div key={f.title} className="text-center">
            <div
              className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center"
              style={{ background: `color-mix(in srgb, ${f.accent} 12%, transparent)` }}
            >
              <f.icon className="w-7 h-7" style={{ color: f.accent }} strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">{f.title}</h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
