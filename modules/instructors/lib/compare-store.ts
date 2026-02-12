import { create } from "zustand";

interface CompareStore {
  selected: string[]; // max 4 instructor IDs
  toggle: (id: string) => void;
  isSelected: (id: string) => boolean;
  clear: () => void;
}

export const useCompareStore = create<CompareStore>()((set, get) => ({
  selected: [],
  toggle: (id) =>
    set((s) => {
      if (s.selected.includes(id)) {
        return { selected: s.selected.filter((x) => x !== id) };
      }
      if (s.selected.length >= 4) {
        return { selected: [...s.selected.slice(1), id] };
      }
      return { selected: [...s.selected, id] };
    }),
  isSelected: (id) => get().selected.includes(id),
  clear: () => set({ selected: [] }),
}));
