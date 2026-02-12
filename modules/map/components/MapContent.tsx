"use client";

import { useState, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import Link from "next/link";
import { ArrowRight, MapPin, Crosshair, Star, Users, Shield } from "lucide-react";
import { MOCK_INSTRUCTORS } from "@/modules/instructors";
import { CITY_COORDS, RANGE_COORDS } from "@/modules/instructors/lib/geo-data";
import { useLanguageStore } from "@/lib/language-store";
import { useT } from "@/lib/translations";
import { BottomNav } from "@/components/BottomNav";
import "leaflet/dist/leaflet.css";

const instructorIcon = new L.DivIcon({
  html: `<div style="background:#4ade80;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:2px solid #0a0f0d;box-shadow:0 2px 8px rgba(0,0,0,0.3)"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0a0f0d" stroke-width="2.5"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 10-16 0"/></svg></div>`,
  className: "",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const rangeIcon = new L.DivIcon({
  html: `<div style="background:#fbbf24;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:2px solid #0a0f0d;box-shadow:0 2px 8px rgba(0,0,0,0.3)"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0a0f0d" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg></div>`,
  className: "",
  iconSize: [28, 28],
  iconAnchor: [14, 28],
  popupAnchor: [0, -28],
});

type ViewMode = "all" | "instructors" | "ranges";

export default function MapContent() {
  const [viewMode, setViewMode] = useState<ViewMode>("all");
  const lang = useLanguageStore((s) => s.lang);
  const t = useT(lang);

  const instructorMarkers = useMemo(() => {
    const cityGroups: Record<string, typeof MOCK_INSTRUCTORS> = {};
    MOCK_INSTRUCTORS.forEach((inst) => {
      if (!cityGroups[inst.city]) cityGroups[inst.city] = [];
      cityGroups[inst.city].push(inst);
    });
    return Object.entries(cityGroups)
      .filter(([city]) => CITY_COORDS[city])
      .map(([city, instructors]) => ({
        city,
        coords: CITY_COORDS[city],
        instructors,
      }));
  }, []);

  const rangeMarkers = useMemo(() => {
    const allRanges = new Set<string>();
    MOCK_INSTRUCTORS.forEach((inst) => inst.ranges.forEach((r) => allRanges.add(r)));
    return Array.from(allRanges)
      .filter((r) => RANGE_COORDS[r])
      .map((r) => ({ name: r, coords: RANGE_COORDS[r] }));
  }, []);

  const showInstructors = viewMode === "all" || viewMode === "instructors";
  const showRanges = viewMode === "all" || viewMode === "ranges";

  return (
    <div className="min-h-screen pb-24">
      <header className="sticky top-0 z-40 bg-[var(--bg-primary)]/90 backdrop-blur-xl border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-3 px-4 h-14 max-w-2xl mx-auto">
          <Link href="/" className="w-9 h-9 rounded-lg border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)]">
            <ArrowRight className="w-5 h-5" />
          </Link>
          <h1 className="font-bold text-sm flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[var(--accent-green)]" />
            {t("mapTitle")}
          </h1>
        </div>
      </header>

      {/* Filter chips */}
      <div className="px-4 pt-3 max-w-2xl mx-auto flex gap-2">
        {(["all", "instructors", "ranges"] as ViewMode[]).map((mode) => (
          <button
            key={mode}
            onClick={() => setViewMode(mode)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              viewMode === mode
                ? "bg-[var(--accent-green)] text-[var(--bg-primary)] border-[var(--accent-green)]"
                : "bg-[var(--bg-card)] text-[var(--text-secondary)] border-[var(--border-subtle)]"
            }`}
          >
            {mode === "all" ? t("mapAll") : mode === "instructors" ? t("mapInstructors") : t("mapRanges")}
          </button>
        ))}
      </div>

      {/* Map */}
      <div className="px-4 pt-3 max-w-2xl mx-auto">
        <div className="rounded-xl overflow-hidden border border-[var(--border-subtle)] h-[calc(100vh-220px)]">
          <MapContainer
            center={[31.5, 34.9]}
            zoom={7.5}
            style={{ height: "100%", width: "100%" }}
            zoomControl={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />

            {showInstructors && instructorMarkers.map(({ city, coords, instructors }) => (
              <Marker key={`city-${city}`} position={coords} icon={instructorIcon}>
                <Popup>
                  <div className="min-w-[200px]" dir="rtl">
                    <p className="font-bold text-sm mb-2">{city} — {instructors.length} {lang === "he" ? "מדריכים" : "instructors"}</p>
                    <div className="space-y-1.5 max-h-[200px] overflow-y-auto">
                      {instructors.slice(0, 5).map((inst) => (
                        <a key={inst.id} href={`/instructor/${inst.id}`} className="flex items-center gap-2 p-1.5 rounded hover:bg-gray-100 transition-colors">
                          <img src={inst.photo} alt={inst.name} className="w-8 h-8 rounded-full object-cover" />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold truncate flex items-center gap-1">
                              {inst.name}
                              {inst.verified && <Shield className="w-3 h-3 text-green-500 inline" />}
                            </p>
                            <p className="text-[10px] text-gray-500 flex items-center gap-1">
                              <Star className="w-2.5 h-2.5" /> {inst.stars} · <Users className="w-2.5 h-2.5" /> {inst.trainees}
                            </p>
                          </div>
                        </a>
                      ))}
                      {instructors.length > 5 && (
                        <p className="text-[10px] text-gray-400 text-center">+{instructors.length - 5} {lang === "he" ? "נוספים" : "more"}</p>
                      )}
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}

            {showRanges && rangeMarkers.map(({ name, coords }) => (
              <Marker key={`range-${name}`} position={coords} icon={rangeIcon}>
                <Popup>
                  <div dir="rtl">
                    <p className="font-bold text-sm flex items-center gap-1">
                      <Crosshair className="w-3 h-3" /> {name}
                    </p>
                    <p className="text-[10px] text-gray-500 mt-1">
                      {MOCK_INSTRUCTORS.filter((i) => i.ranges.includes(name)).length} {lang === "he" ? "מדריכים פעילים" : "active instructors"}
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>

      {/* Legend */}
      <div className="px-4 pt-3 max-w-2xl mx-auto flex gap-4">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[var(--accent-green)]" />
          <span className="text-[10px] text-[var(--text-muted)]">{t("mapInstructors")}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[var(--accent-amber)]" />
          <span className="text-[10px] text-[var(--text-muted)]">{t("mapRanges")}</span>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
