"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, X, Check, MapPin, Calendar, DollarSign, ShieldCheck, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FILTER_TREE, type FilterNode } from "../lib/filter-tree";
import { MOCK_INSTRUCTORS } from "../lib/mock-data";

export interface Filters {
  city: string | null;
  day: string | null;
  verifiedOnly: boolean;
  availableOnly: boolean;
  maxPrice: number | null;
}

const DAYS = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];

interface SearchBarProps {
  onSearch: (query: string) => void;
  onCategorySelect: (id: string | null) => void;
  selectedCategory: string | null;
  sortMode: number;
  onSortChange: (value: number) => void;
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

export function SearchBar({ onSearch, onCategorySelect, selectedCategory, sortMode, onSortChange, filters, onFiltersChange }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [expandedTop, setExpandedTop] = useState<string | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);

  const allCities = [...new Set(MOCK_INSTRUCTORS.map((i) => i.city))].sort((a, b) => a.localeCompare(b, "he"));

  const activeFilterCount = [
    filters.city,
    filters.day,
    filters.verifiedOnly,
    filters.availableOnly,
    filters.maxPrice,
  ].filter(Boolean).length;

  const handleTopClick = (node: FilterNode) => {
    if (expandedTop === node.id) {
      setExpandedTop(null);
      onCategorySelect(null);
    } else {
      setExpandedTop(node.id);
      onCategorySelect(node.id);
    }
  };

  const handleSubClick = (subNode: FilterNode) => {
    if (selectedCategory === subNode.id) {
      onCategorySelect(expandedTop);
    } else {
      onCategorySelect(subNode.id);
    }
  };

  const handleClear = () => {
    setExpandedTop(null);
    onCategorySelect(null);
  };

  const clearAllFilters = () => {
    onFiltersChange({ city: null, day: null, verifiedOnly: false, availableOnly: false, maxPrice: null });
  };

  const expandedNode = expandedTop ? FILTER_TREE.find((n) => n.id === expandedTop) : null;
  const subNodes = expandedNode?.children || [];

  return (
    <div className="space-y-4">
      {/* 1. Search bar + Filter button */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--accent-green)]" />
          <input
            type="text"
            placeholder="מה אתה מחפש?"
            value={query}
            onChange={(e) => { setQuery(e.target.value); onSearch(e.target.value); }}
            className="w-full h-14 pr-12 pl-4 rounded-2xl bg-[var(--bg-card)] border-2 border-[var(--border-default)] text-[var(--text-primary)] placeholder-[var(--text-muted)] text-base font-medium focus:outline-none focus:border-[var(--accent-green)] focus:shadow-[0_0_20px_rgba(74,222,128,0.15)] transition-all"
          />
        </div>
        <button
          onClick={() => setFilterOpen(!filterOpen)}
          className={`relative flex-shrink-0 w-14 h-14 rounded-2xl border-2 flex items-center justify-center transition-all ${filterOpen || activeFilterCount > 0 ? "bg-[var(--accent-green)]/10 border-[var(--accent-green)]/40 text-[var(--accent-green)]" : "bg-[var(--bg-card)] border-[var(--border-default)] text-[var(--text-muted)] hover:text-[var(--text-primary)]"}`}
        >
          <SlidersHorizontal className="w-5 h-5" />
          {activeFilterCount > 0 && (
            <div className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-[var(--accent-green)] flex items-center justify-center">
              <span className="text-[10px] font-bold text-[var(--bg-primary)]">{activeFilterCount}</span>
            </div>
          )}
        </button>
      </div>

      {/* Filter panel */}
      <AnimatePresence>
        {filterOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-4 space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[var(--text-primary)]">סינון תוצאות</h3>
                <div className="flex items-center gap-2">
                  {activeFilterCount > 0 && (
                    <button onClick={clearAllFilters} className="text-[11px] text-[var(--accent-red)] hover:underline">נקה הכל</button>
                  )}
                  <button onClick={() => setFilterOpen(false)} className="p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* City */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-[var(--text-secondary)] mb-2">
                  <MapPin className="w-3.5 h-3.5" /> עיר
                </label>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => onFiltersChange({ ...filters, city: null })}
                    className={`px-2.5 py-1.5 rounded-lg text-[11px] font-medium border transition-all ${!filters.city ? "bg-[var(--accent-green)]/15 border-[var(--accent-green)]/40 text-[var(--accent-green)]" : "bg-[var(--bg-elevated)] border-[var(--border-subtle)] text-[var(--text-muted)]"}`}
                  >
                    הכל
                  </button>
                  {allCities.map((city) => (
                    <button
                      key={city}
                      onClick={() => onFiltersChange({ ...filters, city: filters.city === city ? null : city })}
                      className={`px-2.5 py-1.5 rounded-lg text-[11px] font-medium border transition-all ${filters.city === city ? "bg-[var(--accent-green)]/15 border-[var(--accent-green)]/40 text-[var(--accent-green)]" : "bg-[var(--bg-elevated)] border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-secondary)]"}`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>

              {/* Day of week */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-[var(--text-secondary)] mb-2">
                  <Calendar className="w-3.5 h-3.5" /> יום בשבוע
                </label>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => onFiltersChange({ ...filters, day: null })}
                    className={`px-2.5 py-1.5 rounded-lg text-[11px] font-medium border transition-all ${!filters.day ? "bg-[var(--accent-blue)]/15 border-[var(--accent-blue)]/40 text-[var(--accent-blue)]" : "bg-[var(--bg-elevated)] border-[var(--border-subtle)] text-[var(--text-muted)]"}`}
                  >
                    הכל
                  </button>
                  {DAYS.map((day) => (
                    <button
                      key={day}
                      onClick={() => onFiltersChange({ ...filters, day: filters.day === day ? null : day })}
                      className={`px-2.5 py-1.5 rounded-lg text-[11px] font-medium border transition-all ${filters.day === day ? "bg-[var(--accent-blue)]/15 border-[var(--accent-blue)]/40 text-[var(--accent-blue)]" : "bg-[var(--bg-elevated)] border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-secondary)]"}`}
                    >
                      יום {day}
                    </button>
                  ))}
                </div>
              </div>

              {/* Max price */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-[var(--text-secondary)] mb-2">
                  <DollarSign className="w-3.5 h-3.5" /> מחיר מקסימלי
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {[null, 200, 250, 300, 400].map((price) => (
                    <button
                      key={price ?? "all"}
                      onClick={() => onFiltersChange({ ...filters, maxPrice: filters.maxPrice === price ? null : price })}
                      className={`px-2.5 py-1.5 rounded-lg text-[11px] font-medium border transition-all ${filters.maxPrice === price ? "bg-[var(--accent-amber)]/15 border-[var(--accent-amber)]/40 text-[var(--accent-amber)]" : "bg-[var(--bg-elevated)] border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-secondary)]"}`}
                    >
                      {price === null ? "הכל" : `עד ₪${price}`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggles row */}
              <div className="flex gap-3">
                <button
                  onClick={() => onFiltersChange({ ...filters, verifiedOnly: !filters.verifiedOnly })}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-medium transition-all ${filters.verifiedOnly ? "bg-[var(--accent-green)]/15 border-[var(--accent-green)]/40 text-[var(--accent-green)]" : "bg-[var(--bg-elevated)] border-[var(--border-subtle)] text-[var(--text-muted)]"}`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  מאומתים בלבד
                  {filters.verifiedOnly && <Check className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => onFiltersChange({ ...filters, availableOnly: !filters.availableOnly })}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-medium transition-all ${filters.availableOnly ? "bg-[var(--accent-green)]/15 border-[var(--accent-green)]/40 text-[var(--accent-green)]" : "bg-[var(--bg-elevated)] border-[var(--border-subtle)] text-[var(--text-muted)]"}`}
                >
                  <Clock className="w-4 h-4" />
                  פנויים בלבד
                  {filters.availableOnly && <Check className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Top-level category icons - always visible */}
      <div className={`grid gap-1 ${FILTER_TREE.length === 5 ? "grid-cols-5" : FILTER_TREE.length <= 3 ? "grid-cols-3" : "grid-cols-4"}`}>
        {FILTER_TREE.map((node) => {
          const Icon = node.icon;
          const isExpanded = expandedTop === node.id;
          const isActive = isExpanded || selectedCategory === node.id;

          return (
            <button key={node.id} onClick={() => handleTopClick(node)} className="flex flex-col items-center gap-2 py-2 transition-all duration-200">
              <div
                className={`${FILTER_TREE.length >= 5 ? "w-12 h-12" : "w-14 h-14"} rounded-full flex items-center justify-center border-2 transition-all duration-200 ${isActive ? "shadow-lg scale-110" : "border-[var(--border-subtle)] hover:scale-105"}`}
                style={{
                  background: isActive ? `${node.color}20` : `${node.color}08`,
                  borderColor: isActive ? node.color : `${node.color}30`,
                  boxShadow: isActive ? `0 0 16px ${node.color}30` : undefined,
                }}
              >
                <Icon className="w-6 h-6" style={{ color: node.color }} />
              </div>
              <span className={`text-[11px] leading-tight text-center font-medium ${isActive ? "font-bold" : "text-[var(--text-secondary)]"}`} style={isActive ? { color: node.color } : undefined}>
                {node.label}
              </span>
              {node.children && node.children.length > 0 && (
                <div className={`w-1 h-1 rounded-full transition-all ${isExpanded ? "scale-150" : ""}`} style={{ background: node.color, opacity: isExpanded ? 1 : 0.5 }} />
              )}
            </button>
          );
        })}
      </div>

      {/* 3. Sub-category row */}
      <AnimatePresence>
        {expandedTop && subNodes.length > 0 && (
          <motion.div
            key={expandedTop}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold" style={{ color: expandedNode?.color }}>
                  {expandedNode?.label}
                </span>
                <button onClick={handleClear} className="p-1 text-[var(--text-muted)] hover:text-[var(--accent-red)] transition-colors">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className={`grid gap-1 ${subNodes.length <= 3 ? "grid-cols-3" : "grid-cols-4"}`}>
                {subNodes.map((sub) => {
                  const SubIcon = sub.icon;
                  const isSubSelected = selectedCategory === sub.id;
                  return (
                    <button key={sub.id} onClick={() => handleSubClick(sub)} className="flex flex-col items-center gap-1.5 py-2 transition-all duration-200">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200 ${isSubSelected ? "shadow-md scale-110" : "border-[var(--border-subtle)] hover:scale-105"}`}
                        style={{
                          background: isSubSelected ? `${sub.color}20` : `${sub.color}08`,
                          borderColor: isSubSelected ? sub.color : `${sub.color}30`,
                          boxShadow: isSubSelected ? `0 0 12px ${sub.color}30` : undefined,
                        }}
                      >
                        <SubIcon className="w-4.5 h-4.5" style={{ color: sub.color }} />
                      </div>
                      <span className={`text-[10px] leading-tight text-center font-medium ${isSubSelected ? "font-bold" : "text-[var(--text-secondary)]"}`} style={isSubSelected ? { color: sub.color } : undefined}>
                        {sub.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Slider */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-3">
        <div className="flex items-center justify-between text-xs mb-3">
          <div className="flex items-center gap-1.5">
            <div className={`w-2.5 h-2.5 rounded-full ${sortMode < 40 ? "bg-[var(--accent-amber)]" : "bg-[var(--accent-amber)]/30"}`} />
            <span className={`font-semibold ${sortMode < 40 ? "text-[var(--accent-amber)]" : "text-[var(--text-muted)]"}`}>לפי דירוג</span>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[var(--bg-elevated)] text-[var(--text-secondary)]" style={{ fontFamily: "var(--font-rubik)" }}>
            {sortMode < 40 ? "דירוג" : sortMode > 60 ? "מרחק" : "מאוזן"}
          </span>
          <div className="flex items-center gap-1.5">
            <span className={`font-semibold ${sortMode > 60 ? "text-[var(--accent-blue)]" : "text-[var(--text-muted)]"}`}>לפי מרחק</span>
            <div className={`w-2.5 h-2.5 rounded-full ${sortMode > 60 ? "bg-[var(--accent-blue)]" : "bg-[var(--accent-blue)]/30"}`} />
          </div>
        </div>
        <div
          className="relative h-8 flex items-center cursor-pointer select-none"
          onPointerDown={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const update = (clientX: number) => {
              const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
              onSortChange(Math.round(pct));
            };
            update(e.clientX);
            const onMove = (ev: PointerEvent) => update(ev.clientX);
            const onUp = () => { window.removeEventListener("pointermove", onMove); window.removeEventListener("pointerup", onUp); };
            window.addEventListener("pointermove", onMove);
            window.addEventListener("pointerup", onUp);
          }}
        >
          <div className="absolute inset-x-0 h-2 rounded-full overflow-hidden" style={{ top: "calc(50% - 4px)" }}>
            <div className="w-full h-full" style={{ background: "linear-gradient(to right, #fbbf24, #4ade80 50%, #60a5fa)" }} />
          </div>
          <div
            className="absolute w-7 h-7 rounded-full bg-white shadow-lg border-[3px] transition-[left] duration-75"
            style={{
              left: `calc(${sortMode}% - 14px)`,
              borderColor: sortMode < 40 ? "#fbbf24" : sortMode > 60 ? "#60a5fa" : "#4ade80",
              boxShadow: `0 0 12px ${sortMode < 40 ? "rgba(251,191,36,0.5)" : sortMode > 60 ? "rgba(96,165,250,0.5)" : "rgba(74,222,128,0.5)"}`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
