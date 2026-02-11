import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Lang = "he" | "en";

interface LanguageState {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set, get) => ({
      lang: "he",
      setLang: (lang) => set({ lang }),
      toggleLang: () => set({ lang: get().lang === "he" ? "en" : "he" }),
    }),
    { name: "easytarget-lang" }
  )
);
