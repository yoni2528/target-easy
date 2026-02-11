"use client";

import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TRAINING_CATEGORIES, SKILL_LEVELS } from "../lib/mock-data";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onCategorySelect: (id: string | null) => void;
  selectedCategory: string | null;
  sortMode: number;
  onSortChange: (value: number) => void;
}

export function SearchBar({ onSearch, onCategorySelect, selectedCategory, sortMode, onSortChange }: SearchBarProps) {
  const [showLevels, setShowLevels] = useState(false);
  const [query, setQuery] = useState("");

  const handleCategoryClick = (id: string, hasLevels?: boolean) => {
    if (id === selectedCategory) {
      onCategorySelect(null);
      setShowLevels(false);
    } else {
      onCategorySelect(id);
      if (hasLevels) setShowLevels(true);
      else setShowLevels(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Search input */}
      <div className="relative">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
        <input
          type="text"
          placeholder="חפש מדריך, עיר, או מטווח..."
          value={query}
          onChange={(e) => { setQuery(e.target.value); onSearch(e.target.value); }}
          className="w-full h-12 pr-10 pl-12 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder-[var(--text-muted)] text-sm focus:outline-none focus:border-[var(--accent-green)]/50 focus:shadow-[0_0_15px_rgba(74,222,128,0.1)] transition-all"
        />
        <button className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--accent-green)] transition-colors">
          <SlidersHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Rating vs Distance slider */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-3">
        <div className="flex items-center justify-between text-xs text-[var(--text-muted)] mb-2">
          <span className={sortMode < 40 ? "text-[var(--accent-amber)] font-semibold" : ""}>דירוג</span>
          <span className={sortMode > 60 ? "text-[var(--accent-blue)] font-semibold" : ""}>מרחק</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={sortMode}
          onChange={(e) => onSortChange(Number(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Category icons */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1" style={{ scrollbarWidth: "none" }}>
        {TRAINING_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryClick(cat.id, (cat as { hasLevels?: boolean }).hasLevels)}
            className={`flex flex-col items-center gap-1.5 min-w-[72px] py-2.5 px-2 rounded-xl border transition-all duration-200 ${
              selectedCategory === cat.id
                ? "bg-[var(--bg-elevated)] border-[var(--accent-green)]/40 shadow-[0_0_15px_rgba(74,222,128,0.1)]"
                : "bg-[var(--bg-card)] border-[var(--border-subtle)] hover:border-[var(--border-default)]"
            }`}
          >
            <span className="text-xl">{cat.icon}</span>
            <span className={`text-[10px] font-medium leading-tight text-center ${
              selectedCategory === cat.id ? "text-[var(--accent-green)]" : "text-[var(--text-secondary)]"
            }`}>
              {cat.label}
            </span>
          </button>
        ))}
      </div>

      {/* Skill levels submenu */}
      <AnimatePresence>
        {showLevels && selectedCategory === "pro" && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="flex gap-2 flex-wrap">
              {SKILL_LEVELS.map((level) => (
                <button
                  key={level.min}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--accent-red)]/40 hover:text-[var(--accent-red)] transition-colors"
                >
                  {level.label} ({level.min}-{level.max === 9999 ? "+" : level.max})
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
