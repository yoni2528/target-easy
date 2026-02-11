"use client";

import { useEffect } from "react";
import { useLanguageStore } from "@/lib/language-store";

export function LanguageWrapper({ children }: { children: React.ReactNode }) {
  const lang = useLanguageStore((s) => s.lang);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "he" ? "rtl" : "ltr";
  }, [lang]);

  return <>{children}</>;
}
