import { create } from "zustand";

interface CompareStore {
  selected: string[]; // max 2 instructor IDs
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
      if (s.selected.length >= 2) {
        // Replace the first one
        return { selected: [s.selected[1], id] };
      }
      return { selected: [...s.selected, id] };
    }),
  isSelected: (id) => get().selected.includes(id),
  clear: () => set({ selected: [] }),
}));
