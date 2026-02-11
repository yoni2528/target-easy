import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserStore {
  favorites: string[];
  history: { id: string; timestamp: number }[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  addToHistory: (id: string) => void;
  clearHistory: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      history: [],
      toggleFavorite: (id) =>
        set((s) => ({
          favorites: s.favorites.includes(id)
            ? s.favorites.filter((f) => f !== id)
            : [...s.favorites, id],
        })),
      isFavorite: (id) => get().favorites.includes(id),
      addToHistory: (id) =>
        set((s) => {
          const filtered = s.history.filter((h) => h.id !== id);
          return { history: [{ id, timestamp: Date.now() }, ...filtered].slice(0, 50) };
        }),
      clearHistory: () => set({ history: [] }),
    }),
    { name: "easytarget-user" }
  )
);
