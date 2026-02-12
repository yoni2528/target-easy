import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LocationStore {
  lat: number | null;
  lng: number | null;
  source: "gps" | "manual" | null;
  manualAddress: string;
  loading: boolean;
  error: string | null;
  setManualLocation: (lat: number, lng: number, address: string) => void;
  requestGPS: () => Promise<boolean>;
  clear: () => void;
}

export const useLocationStore = create<LocationStore>()(
  persist(
    (set) => ({
      lat: null,
      lng: null,
      source: null,
      manualAddress: "",
      loading: false,
      error: null,
      setManualLocation: (lat, lng, address) =>
        set({ lat, lng, source: "manual", manualAddress: address, error: null }),
      requestGPS: async () => {
        if (!navigator.geolocation) {
          set({ error: "no-gps" });
          return false;
        }
        set({ loading: true, error: null });
        return new Promise((resolve) => {
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              set({
                lat: pos.coords.latitude,
                lng: pos.coords.longitude,
                source: "gps",
                manualAddress: "",
                loading: false,
                error: null,
              });
              resolve(true);
            },
            () => {
              set({ loading: false, error: "denied" });
              resolve(false);
            },
            { timeout: 10000, maximumAge: 300000 }
          );
        });
      },
      clear: () =>
        set({ lat: null, lng: null, source: null, manualAddress: "", error: null }),
    }),
    { name: "easytarget-location" }
  )
);
