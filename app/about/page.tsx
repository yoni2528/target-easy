"use client";

import { ArrowRight, Crosshair, Shield, Users, Award, Heart } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen pb-8">
      <header className="sticky top-0 z-40 bg-[var(--bg-primary)]/90 backdrop-blur-xl border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-3 px-4 h-14 max-w-2xl mx-auto">
          <Link href="/" className="w-9 h-9 rounded-lg border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)]">
            <ArrowRight className="w-5 h-5" />
          </Link>
          <h1 className="font-bold text-sm">אודות EasyTarget</h1>
        </div>
      </header>

      <div className="px-4 pt-6 max-w-2xl mx-auto space-y-6">
        {/* Logo & tagline */}
        <div className="text-center">
          <Crosshair className="w-12 h-12 text-[var(--accent-green)] mx-auto mb-3" strokeWidth={1.5} />
          <h2 className="text-xl font-bold mb-1" style={{ fontFamily: "var(--font-rubik)" }}>
            <span className="text-[var(--accent-green)]">Easy</span>Target
          </h2>
          <p className="text-sm text-[var(--text-muted)]">הפלטפורמה המובילה למציאת מדריכי ירי בישראל</p>
        </div>

        {/* Mission */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4">
          <h3 className="text-sm font-bold mb-2">המשימה שלנו</h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            EasyTarget נוסדה כדי לחבר בין מתאמנים למדריכי ירי מוסמכים ומקצועיים בכל רחבי הארץ.
            אנחנו מאמינים שכל מחזיק נשק זכאי להדרכה מקצועית, בטוחה ונגישה.
            המערכת שלנו מבוססת על דירוג ELO ייחודי שמבטיח שתמצאו את המדריך המתאים ביותר עבורכם.
          </p>
        </div>

        {/* Values */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: Shield, title: "בטיחות", desc: "כל המדריכים מאומתים ומוסמכים", color: "var(--accent-green)" },
            { icon: Award, title: "מקצועיות", desc: "דירוג ELO מבוסס ביצועים", color: "var(--accent-amber)" },
            { icon: Users, title: "קהילה", desc: "אלפי מתאמנים ומדריכים", color: "var(--accent-blue)" },
            { icon: Heart, title: "אכפתיות", desc: "תמיכה ושירות אישי", color: "var(--accent-red)" },
          ].map((v) => (
            <div key={v.title} className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-3">
              <v.icon className="w-6 h-6 mb-2" style={{ color: v.color }} />
              <p className="text-sm font-bold mb-0.5">{v.title}</p>
              <p className="text-[10px] text-[var(--text-muted)]">{v.desc}</p>
            </div>
          ))}
        </div>

        {/* Organization */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4">
          <h3 className="text-sm font-bold mb-2">אחים עם נשק</h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            EasyTarget הינו פרויקט של עמותת "אחים עם נשק" - ארגון המקדם תרבות ירי בטוחה ואחראית בישראל.
            הארגון פועל למען הנגשת עולם הירי, הדרכה מקצועית ובניית קהילת יורים איכותית.
          </p>
        </div>

        {/* Version */}
        <div className="text-center text-[10px] text-[var(--text-muted)] pt-2">
          <p>EasyTarget v1.0 · כל הזכויות שמורות &copy; 2025</p>
        </div>
      </div>
    </div>
  );
}
