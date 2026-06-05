"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

export const AboutSection = () => (
  <section
    id="about"
    className="py-16 md:py-24 px-4 md:px-6"
    style={{ background: "var(--bg-primary)" }}
  >
    <div className="max-w-5xl mx-auto">
      <motion.div
        {...fadeUp}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-10 md:mb-14"
      >
        <p className="text-xs md:text-sm font-bold tracking-[0.2em] text-[var(--accent-blue)] mb-3">
          ↓ מי אנחנו
        </p>
        <h2 className="text-2xl md:text-4xl font-black text-[var(--text-primary)] mb-3">
          לא מוקד טלפוני אקראי. <span className="text-[var(--accent-blue)]">קהילה</span>.
        </h2>
        <p className="text-[var(--text-muted)] max-w-2xl mx-auto leading-relaxed">
          המגן המשפטי נולד מתוך כאב שראינו שוב ושוב בקהילה, וכשהבנו שאף אחד לא פותר אותו, החלטנו
          לפתור בעצמנו.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-5">
        {/* Brothers in Arms */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl p-6 md:p-8 bg-[var(--bg-card)]"
          style={{ border: "1px solid var(--border-subtle)" }}
        >
          <div className="mb-4">
            <img
              src="/bia-logo.png"
              alt="Brothers in Arms"
              className="h-9 md:h-11 w-auto mb-3"
            />
            <h3 className="font-black text-lg text-[var(--text-primary)]">
              אחים עם נשק
            </h3>
          </div>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
            קהילת המתנדבים הגדולה בישראל לחמושים. הקמנו אותה כדי להנגיש את עולם הנשק לכולם:
            מאגר ידע, קורסים, תמיכה הדדית, ויד שנייה לציוד. הכל בהתנדבות מלאה, חינם, פתוח לכל
            אחד עם רישיון.
          </p>
          <a
            href="https://brothers-in-arms.co.il/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--accent-blue)] hover:gap-2 transition-all"
          >
            הצטרפו לקהילה
            <ArrowLeft className="w-3.5 h-3.5" />
          </a>
        </motion.div>

        {/* Matara */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl p-6 md:p-8 bg-[var(--bg-card)]"
          style={{ border: "1px solid var(--border-subtle)" }}
        >
          <div className="mb-4">
            <img
              src="/matara-logo.jpg"
              alt="מטרה"
              className="h-11 md:h-12 w-auto mb-3 rounded-md"
            />
            <h3 className="font-black text-lg text-[var(--text-primary)]">
              מטרה
            </h3>
            <p className="text-xs text-[var(--text-muted)]">
              מערכת לניהול מטווח · ופרויקטים נלווים
            </p>
          </div>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
            פרויקט שיתופי שבונה כלים מקצועיים סביב עולם הנשק: מערכת לניהול מטווחים, זירת יד2
            לציוד, מוצרי ביטוח, ועכשיו גם המגן המשפטי. כל מוצר נולד מצורך אמיתי שזיהינו אצלנו
            ואצל החברים.
          </p>
          <a
            href="https://www.yad2mtra.co.il"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--accent-blue)] hover:gap-2 transition-all"
          >
            לאתר מטרה יד 2
            <ArrowLeft className="w-3.5 h-3.5" />
          </a>
        </motion.div>
      </div>

      {/* Closing line */}
      <motion.p
        {...fadeUp}
        transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="text-center text-sm text-[var(--text-muted)] mt-8 max-w-2xl mx-auto leading-relaxed"
      >
        אנחנו לא מוכרים לך מוצר. אנחנו פותרים בעיה שגם אנחנו רצינו לפתור לעצמנו.
      </motion.p>
    </div>
  </section>
);
