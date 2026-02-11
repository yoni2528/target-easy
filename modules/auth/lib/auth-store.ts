"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthUser } from "../types";
import { MOCK_USERS } from "./mock-users";

interface AuthState {
  user: AuthUser | null;
  login: (nameOrId: string, password: string) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (nameOrId: string, password: string) => {
        const found = MOCK_USERS.find(
          (u) => (u.name === nameOrId || u.id === nameOrId) && u.password === password
        );
        if (found) {
          const { password: _, ...user } = found;
          set({ user });
          return true;
        }
        return false;
      },
      logout: () => set({ user: null }),
    }),
    { name: "target-easy-auth" }
  )
);
