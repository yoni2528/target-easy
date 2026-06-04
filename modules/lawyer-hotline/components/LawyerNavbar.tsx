"use client";

import { Phone, Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { href: "#what", label: "מה זה" },
  { href: "#price", label: "המחיר" },
  { href: "#timeline", label: "איך זה עובד" },
  { href: "#faq", label: "שאלות נפוצות" },
];

export const LawyerNavbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="fixed top-0 inset-x-0 z-40 backdrop-blur-sm"
      style={{
        background: "rgba(234, 241, 251, 0.85)",
        borderBottom: "1px solid var(--border-subtle)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6 h-14 md:h-16 flex items-center justify-between">
        <a href="#hero" className="font-black text-base md:text-lg text-[var(--text-primary)]">
          המגן <span className="text-[var(--accent-blue)]">המשפטי</span>
        </a>

        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-[var(--text-muted)] hover:text-[var(--accent-blue)] transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#price"
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-blue)] text-white text-sm font-bold hover:scale-105 transition-transform"
          >
            הצטרפו ל-14.90
          </a>
          <a
            href="tel:0552281168"
            className="md:hidden p-2 rounded-full bg-[var(--accent-blue)] text-white"
            aria-label="חיוג"
          >
            <Phone className="w-4 h-4" />
          </a>
          <button
            className="md:hidden p-2 text-[var(--text-primary)]"
            onClick={() => setOpen((v) => !v)}
            aria-label="תפריט"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-[var(--border-subtle)] bg-[var(--bg-primary)]">
          <div className="px-4 py-3 flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-3 py-2 rounded-lg text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)]"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
