"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, X, Check, MapPin, Calendar, DollarSign, ShieldCheck, Clock, Star, Target, Sparkles, TreePine, Percent, ChevronDown, RefreshCw, CalendarRange, User, GraduationCap, Trophy, Crown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FILTER_TREE, type FilterNode } from "../lib/filter-tree";
import { MOCK_INSTRUCTORS } from "../lib/mock-data";

export interface Filters {
  city: string | null;
  day: string | null;
  verifiedOnly: boolean;
  availableOnly: boolean;
  maxPrice: "₪" | "₪₪" | "₪₪₪" | null;
  countsAsRefresh: boolean | null;
  minStars: number | null;
  trainingLevel: string | null;
  specialTraining: string | null;
  rangeType: string | null;
  deal: string | null;
  dateFrom: string | null;
  dateTo: string | null;
}

export const DEFAULT_FILTERS: Filters = {
  city: null, day: null, verifiedOnly: false, availableOnly: false,
  maxPrice: null, countsAsRefresh: null, minStars: null, trainingLevel: null,
  specialTraining: null, rangeType: null, deal: null,
  dateFrom: null, dateTo: null,
};

const DAYS = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];
const PRICE_TIERS = [
  { id: "₪" as const, label: "₪", max: 200 },
  { id: "₪₪" as const, label: "₪₪", max: 350 },
  { id: "₪₪₪" as const, label: "₪₪₪", max: 9999 },
];
const TRAINING_LEVELS = [
  { id: "beginner", label: "מתחילים 1200+", icon: User, color: "#4ade80" },
  { id: "advanced", label: "מתקדמים 1400+", icon: GraduationCap, color: "#60a5fa" },
  { id: "expert", label: "מומחים 1600+", icon: Trophy, color: "#fbbf24" },
  { id: "champion", label: "אלופים 1800+", icon: Crown, color: "#f87171" },
];
const SPECIAL_TRAININGS = [
  { id: "ערכות הסבה", label: "ערכות הסבה" },
  { id: "כוונות השלכה", label: "כוונות" },
  { id: "אימון נשים", label: "נשים בלבד" },
  { id: "אימון לילה", label: "לילה" },
  { id: "מטרות נעות", label: "מטרות נעות" },
];
const RANGE_TYPES = [
  { id: "מטווח סגור", label: "מטווח סגור" },
  { id: "מטווח פתוח", label: "מטווח פתוח" },
];
const DEALS = [
  { id: "כוחות ביטחון", label: "הטבה לכוחות הביטחון" },
  { id: "סטודנטים", label: "הטבה לסטודנטים" },
  { id: "גמלאים", label: "הטבת גמלאי" },
];

interface SearchBarProps {
  onSearch: (query: string) => void;
  onCategorySelect: (id: string | null) => void;
  selectedCategory: string | null;
  selectedLevel: string | null;
  onLevelChange: (level: string | null) => void;
  sortMode: number;
  onSortChange: (value: number) => void;
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

export function SearchBar({ onSearch, onCategorySelect, selectedCategory, selectedLevel, onLevelChange, sortMode, onSortChange, filters, onFiltersChange }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [expandedTop, setExpandedTop] = useState<string | null>(null);
  const [expandedSub, setExpandedSub] = useState<string | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);

  const allCities = [...new Set(MOCK_INSTRUCTORS.map((i) => i.city))].sort((a, b) => a.localeCompare(b, "he"));

  const activeFilterCount = [
    filters.city,
    filters.day,
    filters.verifiedOnly,
    filters.availableOnly,
    filters.maxPrice,
    filters.countsAsRefresh !== null,
    filters.minStars,
    filters.trainingLevel,
    filters.specialTraining,
    filters.rangeType,
    filters.deal,
    filters.dateFrom || filters.dateTo,
  ].filter(Boolean).length;

  const handleTopClick = (node: FilterNode) => {
    if (expandedTop === node.id) {
      setExpandedTop(null);
      setExpandedSub(null);
      onCategorySelect(null);
    } else {
      setExpandedTop(node.id);
      setExpandedSub(null);
      onCategorySelect(node.id);
    }
  };

  const handleSubClick = (subNode: FilterNode) => {
    if (subNode.children && subNode.children.length > 0) {
      // This sub-node has children — expand the 3rd level
      if (expandedSub === subNode.id) {
        setExpandedSub(null);
        onCategorySelect(expandedTop);
      } else {
        setExpandedSub(subNode.id);
        onCategorySelect(subNode.id);
      }
    } else {
      // Leaf node — just select/deselect
      if (selectedCategory === subNode.id) {
        onCategorySelect(expandedSub || expandedTop);
      } else {
        onCategorySelect(subNode.id);
      }
    }
  };

  const handleLeafClick = (leafNode: FilterNode) => {
    if (selectedCategory === leafNode.id) {
      onCategorySelect(expandedSub);
    } else {
      onCategorySelect(leafNode.id);
    }
  };

  const handleClear = () => {
    setExpandedTop(null);
    setExpandedSub(null);
    onCategorySelect(null);
  };

  const [expandedFilter, setExpandedFilter] = useState<string | null>(null);

  const clearAllFilters = () => {
    onFiltersChange({ ...DEFAULT_FILTERS });
    setExpandedFilter(null);
  };

  const expandedNode = expandedTop ? FILTER_TREE.find((n) => n.id === expandedTop) : null;
  const subNodes = expandedNode?.children || [];
  const expandedSubNode = expandedSub ? subNodes.find((n) => n.id === expandedSub) : null;
  const leafNodes = expandedSubNode?.children || [];

  // Single row: show leaf nodes if a sub is expanded, otherwise show sub nodes
  const currentSubNodes = expandedSub && leafNodes.length > 0 ? leafNodes : subNodes;
  const currentSubKey = expandedSub || expandedTop || "";
  const breadcrumb = expandedSub
    ? [{ id: expandedTop!, label: expandedNode?.label || "", color: expandedNode?.color || "" }, { id: expandedSub, label: expandedSubNode?.label || "", color: expandedSubNode?.color || "" }]
    : [{ id: expandedTop!, label: expandedNode?.label || "", color: expandedNode?.color || "" }];

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
            <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-4 space-y-3">
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

              {/* Category buttons */}
              <div className="space-y-1.5">
                {/* 1. City */}
                <FilterCategory
                  icon={MapPin} label="עיר" color="#4ade80"
                  active={!!filters.city} activeLabel={filters.city}
                  expanded={expandedFilter === "city"} onToggle={() => setExpandedFilter(expandedFilter === "city" ? null : "city")}
                >
                  <div className="flex flex-wrap gap-1.5">
                    {allCities.map((city) => (
                      <Chip key={city} label={city} selected={filters.city === city} color="#4ade80"
                        onClick={() => onFiltersChange({ ...filters, city: filters.city === city ? null : city })} />
                    ))}
                  </div>
                </FilterCategory>

                {/* 2. Training level */}
                <FilterCategory
                  icon={Target} label="רמת אימון" color="#f87171"
                  active={!!filters.trainingLevel} activeLabel={TRAINING_LEVELS.find(l => l.id === filters.trainingLevel)?.label}
                  expanded={expandedFilter === "level"} onToggle={() => setExpandedFilter(expandedFilter === "level" ? null : "level")}
                >
                  <div className="flex flex-wrap gap-1.5">
                    {TRAINING_LEVELS.map((level) => (
                      <Chip key={level.id} label={level.label} selected={filters.trainingLevel === level.id} color={level.color}
                        onClick={() => onFiltersChange({ ...filters, trainingLevel: filters.trainingLevel === level.id ? null : level.id })} />
                    ))}
                  </div>
                </FilterCategory>

                {/* 3. Max price */}
                <FilterCategory
                  icon={DollarSign} label="מחיר מקסימלי" color="#fbbf24"
                  active={!!filters.maxPrice} activeLabel={filters.maxPrice}
                  expanded={expandedFilter === "price"} onToggle={() => setExpandedFilter(expandedFilter === "price" ? null : "price")}
                >
                  <div className="flex flex-wrap gap-1.5">
                    {PRICE_TIERS.map((tier) => (
                      <Chip key={tier.id} label={tier.label} selected={filters.maxPrice === tier.id} color="#fbbf24"
                        onClick={() => onFiltersChange({ ...filters, maxPrice: filters.maxPrice === tier.id ? null : tier.id })} />
                    ))}
                  </div>
                </FilterCategory>

                {/* 4. Day of week */}
                <FilterCategory
                  icon={Calendar} label="יום בשבוע" color="#60a5fa"
                  active={!!filters.day} activeLabel={filters.day ? `יום ${filters.day}` : undefined}
                  expanded={expandedFilter === "day"} onToggle={() => setExpandedFilter(expandedFilter === "day" ? null : "day")}
                >
                  <div className="flex flex-wrap gap-1.5">
                    {DAYS.map((day) => (
                      <Chip key={day} label={`יום ${day}`} selected={filters.day === day} color="#60a5fa"
                        onClick={() => onFiltersChange({ ...filters, day: filters.day === day ? null : day })} />
                    ))}
                  </div>
                </FilterCategory>

                {/* 5. Special training */}
                <FilterCategory
                  icon={Sparkles} label="אימון מיוחד" color="#a78bfa"
                  active={!!filters.specialTraining} activeLabel={SPECIAL_TRAININGS.find(s => s.id === filters.specialTraining)?.label}
                  expanded={expandedFilter === "special"} onToggle={() => setExpandedFilter(expandedFilter === "special" ? null : "special")}
                >
                  <div className="flex flex-wrap gap-1.5">
                    {SPECIAL_TRAININGS.map((s) => (
                      <Chip key={s.id} label={s.label} selected={filters.specialTraining === s.id} color="#a78bfa"
                        onClick={() => onFiltersChange({ ...filters, specialTraining: filters.specialTraining === s.id ? null : s.id })} />
                    ))}
                  </div>
                </FilterCategory>

                {/* 6. Atmosphere / Range type */}
                <FilterCategory
                  icon={TreePine} label="באיזו אווירה" color="#34d399"
                  active={!!filters.rangeType} activeLabel={filters.rangeType}
                  expanded={expandedFilter === "range"} onToggle={() => setExpandedFilter(expandedFilter === "range" ? null : "range")}
                >
                  <div className="flex flex-wrap gap-1.5">
                    {RANGE_TYPES.map((r) => (
                      <Chip key={r.id} label={r.label} selected={filters.rangeType === r.id} color="#34d399"
                        onClick={() => onFiltersChange({ ...filters, rangeType: filters.rangeType === r.id ? null : r.id })} />
                    ))}
                  </div>
                </FilterCategory>

                {/* 7. Instruction rating */}
                <FilterCategory
                  icon={Star} label="דירוג הדרכה" color="#fbbf24"
                  active={!!filters.minStars} activeLabel={filters.minStars ? `${filters.minStars}+ כוכבים` : undefined}
                  expanded={expandedFilter === "stars"} onToggle={() => setExpandedFilter(expandedFilter === "stars" ? null : "stars")}
                >
                  <div className="flex gap-2">
                    {[5, 4, 3, 2, 1].map((n) => (
                      <button key={n} onClick={() => onFiltersChange({ ...filters, minStars: filters.minStars === n ? null : n })}
                        className={`flex items-center gap-1 px-3 py-2 rounded-lg border text-xs font-medium transition-all ${filters.minStars === n ? "bg-[#fbbf24]/15 border-[#fbbf24]/40 text-[#fbbf24]" : "bg-[var(--bg-elevated)] border-[var(--border-subtle)] text-[var(--text-muted)]"}`}
                      >
                        {n}<Star className="w-3 h-3 fill-current" />
                      </button>
                    ))}
                  </div>
                </FilterCategory>

                {/* 8. Counts as refresh */}
                <FilterCategory
                  icon={RefreshCw} label="יכול להחשב כרענון" color="#38bdf8"
                  active={filters.countsAsRefresh !== null} activeLabel={filters.countsAsRefresh === true ? "כן" : filters.countsAsRefresh === false ? "לא" : undefined}
                  expanded={expandedFilter === "refresh"} onToggle={() => setExpandedFilter(expandedFilter === "refresh" ? null : "refresh")}
                >
                  <div className="flex gap-2">
                    <Chip label="כן" selected={filters.countsAsRefresh === true} color="#38bdf8"
                      onClick={() => onFiltersChange({ ...filters, countsAsRefresh: filters.countsAsRefresh === true ? null : true })} />
                    <Chip label="לא" selected={filters.countsAsRefresh === false} color="#38bdf8"
                      onClick={() => onFiltersChange({ ...filters, countsAsRefresh: filters.countsAsRefresh === false ? null : false })} />
                  </div>
                </FilterCategory>

                {/* 9. Special deal */}
                <FilterCategory
                  icon={Percent} label="דיל מיוחד?" color="#fb923c"
                  active={!!filters.deal} activeLabel={DEALS.find(d => d.id === filters.deal)?.label}
                  expanded={expandedFilter === "deal"} onToggle={() => setExpandedFilter(expandedFilter === "deal" ? null : "deal")}
                >
                  <div className="flex flex-wrap gap-1.5">
                    {DEALS.map((d) => (
                      <Chip key={d.id} label={d.label} selected={filters.deal === d.id} color="#fb923c"
                        onClick={() => onFiltersChange({ ...filters, deal: filters.deal === d.id ? null : d.id })} />
                    ))}
                  </div>
                </FilterCategory>

                {/* 10. Date range */}
                <FilterCategory
                  icon={CalendarRange} label="טווח זמן" color="#f472b6"
                  active={!!(filters.dateFrom || filters.dateTo)}
                  activeLabel={filters.dateFrom && filters.dateTo ? `${filters.dateFrom} – ${filters.dateTo}` : filters.dateFrom || filters.dateTo}
                  expanded={expandedFilter === "date"} onToggle={() => setExpandedFilter(expandedFilter === "date" ? null : "date")}
                >
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="text-[10px] text-[var(--text-muted)] mb-1 block">מתאריך</label>
                      <input type="date" value={filters.dateFrom || ""}
                        onChange={(e) => onFiltersChange({ ...filters, dateFrom: e.target.value || null })}
                        className="w-full h-9 px-2 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[11px] text-[var(--text-primary)]" />
                    </div>
                    <div className="flex-1">
                      <label className="text-[10px] text-[var(--text-muted)] mb-1 block">עד תאריך</label>
                      <input type="date" value={filters.dateTo || ""}
                        onChange={(e) => onFiltersChange({ ...filters, dateTo: e.target.value || null })}
                        className="w-full h-9 px-2 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[11px] text-[var(--text-primary)]" />
                    </div>
                  </div>
                  {(filters.dateFrom || filters.dateTo) && (
                    <button onClick={() => onFiltersChange({ ...filters, dateFrom: null, dateTo: null })}
                      className="mt-2 text-[10px] text-[var(--accent-red)] hover:underline">נקה תאריכים</button>
                  )}
                </FilterCategory>
              </div>

              {/* Toggle row */}
              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => onFiltersChange({ ...filters, verifiedOnly: !filters.verifiedOnly })}
                  className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border text-xs font-medium transition-all ${filters.verifiedOnly ? "bg-[var(--accent-green)]/15 border-[var(--accent-green)]/40 text-[var(--accent-green)]" : "bg-[var(--bg-elevated)] border-[var(--border-subtle)] text-[var(--text-muted)]"}`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  מאומתים בלבד
                  {filters.verifiedOnly && <Check className="w-3 h-3" />}
                </button>
                <button
                  onClick={() => onFiltersChange({ ...filters, availableOnly: !filters.availableOnly })}
                  className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border text-xs font-medium transition-all ${filters.availableOnly ? "bg-[var(--accent-green)]/15 border-[var(--accent-green)]/40 text-[var(--accent-green)]" : "bg-[var(--bg-elevated)] border-[var(--border-subtle)] text-[var(--text-muted)]"}`}
                >
                  <Clock className="w-4 h-4" />
                  פנויים בלבד
                  {filters.availableOnly && <Check className="w-3 h-3" />}
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

      {/* 3. Single sub-category row (replaces in place — no stacking) */}
      <AnimatePresence mode="wait">
        {expandedTop && currentSubNodes.length > 0 && (
          <motion.div
            key={currentSubKey}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  {breadcrumb.map((bc, i) => (
                    <span key={bc.id} className="flex items-center gap-1">
                      {i > 0 && <span className="text-[var(--text-muted)] text-[10px]">›</span>}
                      <button onClick={() => {
                        if (i === 0) { setExpandedSub(null); onCategorySelect(expandedTop); }
                      }} className="text-[11px] font-semibold hover:underline" style={{ color: bc.color }}>
                        {bc.label}
                      </button>
                    </span>
                  ))}
                </div>
                <button onClick={handleClear} className="p-1 text-[var(--text-muted)] hover:text-[var(--accent-red)] transition-colors">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className={`grid gap-1 ${currentSubNodes.length <= 3 ? "grid-cols-3" : "grid-cols-4"}`}>
                {currentSubNodes.map((node) => {
                  const NodeIcon = node.icon;
                  const hasChildren = node.children && node.children.length > 0;
                  const isSelected = selectedCategory === node.id || expandedSub === node.id || (selectedCategory?.startsWith(node.id + ":") ?? false);
                  return (
                    <button key={node.id} onClick={() => hasChildren ? handleSubClick(node) : (expandedSub ? handleLeafClick(node) : handleSubClick(node))} className="flex flex-col items-center gap-1.5 py-2 transition-all duration-200">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200 ${isSelected ? "shadow-md scale-110" : "border-[var(--border-subtle)] hover:scale-105"}`}
                        style={{
                          background: isSelected ? `${node.color}20` : `${node.color}08`,
                          borderColor: isSelected ? node.color : `${node.color}30`,
                          boxShadow: isSelected ? `0 0 12px ${node.color}30` : undefined,
                        }}
                      >
                        <NodeIcon className="w-4.5 h-4.5" style={{ color: node.color }} />
                      </div>
                      <span className={`text-[10px] leading-tight text-center font-medium ${isSelected ? "font-bold" : "text-[var(--text-secondary)]"}`} style={isSelected ? { color: node.color } : undefined}>
                        {node.label}
                      </span>
                      {hasChildren && (
                        <div className={`w-1 h-1 rounded-full transition-all ${expandedSub === node.id ? "scale-150" : ""}`} style={{ background: node.color, opacity: expandedSub === node.id ? 1 : 0.5 }} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3c. Level picker — shown when any training-related category is selected */}
      <AnimatePresence>
        {selectedCategory && (expandedTop === "train" || expandedTop === "special") && (
          <motion.div
            key="level-picker"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="bg-[var(--bg-card)] border border-[var(--accent-amber)]/20 rounded-xl p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-[var(--accent-amber)]">בחר רמת אימון</span>
                {selectedLevel && (
                  <button onClick={() => onLevelChange(null)} className="text-[10px] text-[var(--accent-red)] hover:underline">נקה</button>
                )}
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {TRAINING_LEVELS.map((level) => {
                  const LevelIcon = level.icon;
                  const isLevelSelected = selectedLevel === level.id;
                  return (
                    <button key={level.id} onClick={() => onLevelChange(isLevelSelected ? null : level.id)} className="flex flex-col items-center gap-1 py-1.5 transition-all duration-200">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-200 ${isLevelSelected ? "shadow-md scale-110" : "border-[var(--border-subtle)] hover:scale-105"}`}
                        style={{
                          background: isLevelSelected ? `${level.color}20` : `${level.color}08`,
                          borderColor: isLevelSelected ? level.color : `${level.color}30`,
                          boxShadow: isLevelSelected ? `0 0 10px ${level.color}30` : undefined,
                        }}
                      >
                        <LevelIcon className="w-4 h-4" style={{ color: level.color }} />
                      </div>
                      <span className={`text-[9px] leading-tight text-center font-medium ${isLevelSelected ? "font-bold" : "text-[var(--text-secondary)]"}`} style={isLevelSelected ? { color: level.color } : undefined}>
                        {level.label}
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
          className="relative h-10 flex items-center cursor-pointer select-none"
          style={{ touchAction: "none" }}
          onPointerDown={(e) => {
            e.preventDefault();
            (e.target as HTMLElement).setPointerCapture(e.pointerId);
            const rect = e.currentTarget.getBoundingClientRect();
            const update = (clientX: number) => {
              const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
              onSortChange(Math.round(pct));
            };
            update(e.clientX);
            const onMove = (ev: PointerEvent) => { ev.preventDefault(); update(ev.clientX); };
            const onUp = () => { window.removeEventListener("pointermove", onMove); window.removeEventListener("pointerup", onUp); };
            window.addEventListener("pointermove", onMove);
            window.addEventListener("pointerup", onUp);
          }}
        >
          <div className="absolute inset-x-0 h-2 rounded-full overflow-hidden" style={{ top: "calc(50% - 4px)" }}>
            <div className="w-full h-full" style={{ background: "linear-gradient(to right, #fbbf24, #4ade80 50%, #60a5fa)" }} />
          </div>
          <div
            className="absolute w-7 h-7 rounded-full bg-white shadow-lg border-[3px] pointer-events-none"
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

/* ── Helper components ── */

function FilterCategory({ icon: Icon, label, color, active, activeLabel, expanded, onToggle, children }: {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  label: string; color: string; active: boolean; activeLabel?: string | null;
  expanded: boolean; onToggle: () => void; children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-[var(--border-subtle)] overflow-hidden transition-all">
      <button
        onClick={onToggle}
        className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-right transition-all ${expanded ? "bg-[var(--bg-elevated)]" : "hover:bg-[var(--bg-elevated)]/50"}`}
      >
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: active ? `${color}20` : `${color}08` }}>
          <Icon className="w-4 h-4" style={{ color }} />
        </div>
        <span className="flex-1 text-xs font-semibold text-[var(--text-primary)]">{label}</span>
        {active && activeLabel && (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md" style={{ background: `${color}15`, color }}>{activeLabel}</span>
        )}
        <ChevronDown className={`w-4 h-4 text-[var(--text-muted)] transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3 pt-1">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Chip({ label, selected, color, onClick }: { label: string; selected: boolean; color: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-2.5 py-1.5 rounded-lg text-[11px] font-medium border transition-all ${selected ? "" : "bg-[var(--bg-elevated)] border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-secondary)]"}`}
      style={selected ? { background: `${color}15`, borderColor: `${color}66`, color } : undefined}
    >
      {label}
    </button>
  );
}
