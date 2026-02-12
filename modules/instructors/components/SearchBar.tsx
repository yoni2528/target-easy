"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, X, MapPin, Calendar, DollarSign, ShieldCheck, Clock, Star, Target, Sparkles, TreePine, Percent, RefreshCw, CalendarRange, User, GraduationCap, Trophy, Crown, Navigation, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguageStore } from "@/lib/language-store";
import { useT, getDays, getDayValues } from "@/lib/translations";
import { getFilterTree, type FilterNode } from "../lib/filter-tree";
import { MOCK_INSTRUCTORS } from "../lib/mock-data";
import { useLocationStore } from "@/lib/location-store";
import { CITY_COORDS } from "../lib/geo-data";

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

const PRICE_TIERS = [
  { id: "₪" as const, label: "₪", max: 200 },
  { id: "₪₪" as const, label: "₪₪", max: 350 },
  { id: "₪₪₪" as const, label: "₪₪₪", max: 9999 },
];

type IconComp = typeof MapPin;

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
  const lang = useLanguageStore((s) => s.lang);
  const t = useT(lang);
  const FILTER_TREE = getFilterTree(lang);

  const [query, setQuery] = useState("");
  const [expandedTop, setExpandedTop] = useState<string | null>(null);
  const [expandedSub, setExpandedSub] = useState<string | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);

  const TRAINING_LEVELS = [
    { id: "beginner", label: t("levelBeginner"), shortLabel: t("levelBeginnerShort"), icon: User, color: "#4ade80" },
    { id: "advanced", label: t("levelAdvanced"), shortLabel: t("levelAdvancedShort"), icon: GraduationCap, color: "#60a5fa" },
    { id: "expert", label: t("levelExpert"), shortLabel: t("levelExpertShort"), icon: Trophy, color: "#fbbf24" },
    { id: "champion", label: t("levelChampion"), shortLabel: t("levelChampionShort"), icon: Crown, color: "#f87171" },
  ];
  const SPECIAL_TRAININGS = [
    { id: "ערכות הסבה", label: t("specialConversion") },
    { id: "כוונות השלכה", label: t("specialSights") },
    { id: "אימון נשים", label: t("specialWomen") },
    { id: "אימון לילה", label: t("specialNight") },
    { id: "מטרות נעות", label: t("specialMoving") },
  ];
  const RANGE_TYPES = [
    { id: "מטווח סגור", label: t("rangeIndoor") },
    { id: "מטווח פתוח", label: t("rangeOutdoor") },
  ];
  const DEALS = [
    { id: "כוחות ביטחון", label: t("dealMilitary") },
    { id: "סטודנטים", label: t("dealStudent") },
    { id: "גמלאים", label: t("dealSenior") },
  ];
  const FILTER_BUTTONS: { id: string; label: string; icon: IconComp; color: string; isActive: (f: Filters) => boolean }[] = [
    { id: "city", label: t("filterCity"), icon: MapPin, color: "#4ade80", isActive: (f) => !!f.city },
    { id: "day", label: t("filterDay"), icon: Calendar, color: "#60a5fa", isActive: (f) => !!f.day },
    { id: "price", label: t("filterPrice"), icon: DollarSign, color: "#fbbf24", isActive: (f) => !!f.maxPrice },
    { id: "level", label: t("filterLevel"), icon: Target, color: "#f87171", isActive: (f) => !!f.trainingLevel },
    { id: "special", label: t("filterSpecial"), icon: Sparkles, color: "#a78bfa", isActive: (f) => !!f.specialTraining },
    { id: "range", label: t("filterRange"), icon: TreePine, color: "#34d399", isActive: (f) => !!f.rangeType },
    { id: "stars", label: t("filterStars"), icon: Star, color: "#fbbf24", isActive: (f) => !!f.minStars },
    { id: "refresh", label: t("filterRefresh"), icon: RefreshCw, color: "#38bdf8", isActive: (f) => f.countsAsRefresh !== null },
    { id: "deal", label: t("filterDeal"), icon: Percent, color: "#fb923c", isActive: (f) => !!f.deal },
    { id: "verified", label: t("filterVerified"), icon: ShieldCheck, color: "#4ade80", isActive: (f) => f.verifiedOnly },
    { id: "available", label: t("filterAvailable"), icon: Clock, color: "#22d3ee", isActive: (f) => f.availableOnly },
    { id: "date", label: t("filterDate"), icon: CalendarRange, color: "#f472b6", isActive: (f) => !!(f.dateFrom || f.dateTo) },
  ];

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

  const dayDisplayLabels = getDays(lang);
  const dayValues = getDayValues();

  return (
    <div className="space-y-4">
      {/* 1. Search bar + Filter button */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--accent-green)]" />
          <input
            type="text"
            placeholder={t("searchPlaceholder")}
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
            <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl p-3 space-y-2">
              {/* Header */}
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-bold text-[var(--text-primary)]">{t("filterResults")}</h3>
                <div className="flex items-center gap-2">
                  {activeFilterCount > 0 && (
                    <button onClick={clearAllFilters} className="text-[11px] text-[var(--accent-red)] hover:underline">{t("clearAll")}</button>
                  )}
                  <button onClick={() => setFilterOpen(false)} className="p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Compact filter chips grid */}
              <div className="flex flex-wrap gap-1.5">
                {FILTER_BUTTONS.map((fb) => {
                  const Icon = fb.icon;
                  const isExpanded = expandedFilter === fb.id;
                  const isActive = fb.isActive(filters);
                  return (
                    <button
                      key={fb.id}
                      onClick={() => setExpandedFilter(isExpanded ? null : fb.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border text-[11px] font-semibold transition-all whitespace-nowrap ${isExpanded ? "ring-1" : ""} ${isActive ? "" : "bg-[var(--bg-elevated)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-default)]"}`}
                      style={isActive ? { background: `${fb.color}15`, borderColor: `${fb.color}55`, color: fb.color, ...(isExpanded ? { boxShadow: `0 0 8px ${fb.color}25`, ringColor: fb.color } : {}) } : isExpanded ? { borderColor: `${fb.color}55`, boxShadow: `0 0 8px ${fb.color}15` } : {}}
                    >
                      <Icon className="w-3.5 h-3.5" style={isActive ? { color: fb.color } : {}} />
                      {fb.label}
                      {isActive && <span className="w-1.5 h-1.5 rounded-full" style={{ background: fb.color }} />}
                    </button>
                  );
                })}
              </div>

              {/* Expanded sub-options area */}
              <AnimatePresence mode="wait">
                {expandedFilter && (
                  <motion.div
                    key={expandedFilter}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.15 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-[var(--bg-elevated)] rounded-xl p-3 border border-[var(--border-subtle)]">
                      {/* City */}
                      {expandedFilter === "city" && (
                        <div className="flex flex-wrap gap-1.5">
                          {allCities.map((city) => (
                            <Chip key={city} label={city} selected={filters.city === city} color="#4ade80"
                              onClick={() => onFiltersChange({ ...filters, city: filters.city === city ? null : city })} />
                          ))}
                        </div>
                      )}
                      {/* Training level */}
                      {expandedFilter === "level" && (
                        <div className="flex flex-wrap gap-1.5">
                          {TRAINING_LEVELS.map((level) => (
                            <Chip key={level.id} label={level.label} selected={filters.trainingLevel === level.id} color={level.color}
                              onClick={() => onFiltersChange({ ...filters, trainingLevel: filters.trainingLevel === level.id ? null : level.id })} />
                          ))}
                        </div>
                      )}
                      {/* Max price */}
                      {expandedFilter === "price" && (
                        <div className="flex flex-wrap gap-1.5">
                          {PRICE_TIERS.map((tier) => (
                            <Chip key={tier.id} label={tier.label} selected={filters.maxPrice === tier.id} color="#fbbf24"
                              onClick={() => onFiltersChange({ ...filters, maxPrice: filters.maxPrice === tier.id ? null : tier.id })} />
                          ))}
                        </div>
                      )}
                      {/* Day of week */}
                      {expandedFilter === "day" && (
                        <div className="flex flex-wrap gap-1.5">
                          {dayValues.map((dayValue, idx) => {
                            const displayDay = dayDisplayLabels[idx];
                            const dayLabel = lang === "he" ? `${t("dayPrefix")}${displayDay}` : `${displayDay}`;
                            return (
                              <Chip key={dayValue} label={dayLabel} selected={filters.day === dayValue} color="#60a5fa"
                                onClick={() => onFiltersChange({ ...filters, day: filters.day === dayValue ? null : dayValue })} />
                            );
                          })}
                        </div>
                      )}
                      {/* Special training */}
                      {expandedFilter === "special" && (
                        <div className="flex flex-wrap gap-1.5">
                          {SPECIAL_TRAININGS.map((s) => (
                            <Chip key={s.id} label={s.label} selected={filters.specialTraining === s.id} color="#a78bfa"
                              onClick={() => onFiltersChange({ ...filters, specialTraining: filters.specialTraining === s.id ? null : s.id })} />
                          ))}
                        </div>
                      )}
                      {/* Range type */}
                      {expandedFilter === "range" && (
                        <div className="flex flex-wrap gap-1.5">
                          {RANGE_TYPES.map((r) => (
                            <Chip key={r.id} label={r.label} selected={filters.rangeType === r.id} color="#34d399"
                              onClick={() => onFiltersChange({ ...filters, rangeType: filters.rangeType === r.id ? null : r.id })} />
                          ))}
                        </div>
                      )}
                      {/* Stars */}
                      {expandedFilter === "stars" && (
                        <div className="flex flex-wrap gap-1.5">
                          {[5, 4, 3, 2, 1].map((n) => (
                            <button key={n} onClick={() => onFiltersChange({ ...filters, minStars: filters.minStars === n ? null : n })}
                              className={`flex items-center gap-1 px-3 py-2 rounded-lg border text-xs font-medium transition-all ${filters.minStars === n ? "bg-[#fbbf24]/15 border-[#fbbf24]/40 text-[#fbbf24]" : "bg-[var(--bg-card)] border-[var(--border-subtle)] text-[var(--text-muted)]"}`}
                            >
                              {n}<Star className="w-3 h-3 fill-current" />
                            </button>
                          ))}
                        </div>
                      )}
                      {/* Refresh */}
                      {expandedFilter === "refresh" && (
                        <div className="flex gap-2">
                          <Chip label={t("yes")} selected={filters.countsAsRefresh === true} color="#38bdf8"
                            onClick={() => onFiltersChange({ ...filters, countsAsRefresh: filters.countsAsRefresh === true ? null : true })} />
                          <Chip label={t("no")} selected={filters.countsAsRefresh === false} color="#38bdf8"
                            onClick={() => onFiltersChange({ ...filters, countsAsRefresh: filters.countsAsRefresh === false ? null : false })} />
                        </div>
                      )}
                      {/* Deal */}
                      {expandedFilter === "deal" && (
                        <div className="flex flex-wrap gap-1.5">
                          {DEALS.map((d) => (
                            <Chip key={d.id} label={d.label} selected={filters.deal === d.id} color="#fb923c"
                              onClick={() => onFiltersChange({ ...filters, deal: filters.deal === d.id ? null : d.id })} />
                          ))}
                        </div>
                      )}
                      {/* Date range */}
                      {expandedFilter === "date" && (
                        <>
                          <div className="flex gap-2">
                            <div className="flex-1">
                              <label className="text-[10px] text-[var(--text-muted)] mb-1 block">{t("dateFrom")}</label>
                              <input type="date" value={filters.dateFrom || ""}
                                onChange={(e) => onFiltersChange({ ...filters, dateFrom: e.target.value || null })}
                                className="w-full h-9 px-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[11px] text-[var(--text-primary)]" />
                            </div>
                            <div className="flex-1">
                              <label className="text-[10px] text-[var(--text-muted)] mb-1 block">{t("dateTo")}</label>
                              <input type="date" value={filters.dateTo || ""}
                                onChange={(e) => onFiltersChange({ ...filters, dateTo: e.target.value || null })}
                                className="w-full h-9 px-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[11px] text-[var(--text-primary)]" />
                            </div>
                          </div>
                          {(filters.dateFrom || filters.dateTo) && (
                            <button onClick={() => onFiltersChange({ ...filters, dateFrom: null, dateTo: null })}
                              className="mt-2 text-[10px] text-[var(--accent-red)] hover:underline">{t("clearDates")}</button>
                          )}
                        </>
                      )}
                      {/* Verified */}
                      {expandedFilter === "verified" && (
                        <div className="flex gap-2">
                          <Chip label={t("verifiedOnly")} selected={filters.verifiedOnly} color="#4ade80"
                            onClick={() => onFiltersChange({ ...filters, verifiedOnly: !filters.verifiedOnly })} />
                        </div>
                      )}
                      {/* Available */}
                      {expandedFilter === "available" && (
                        <div className="flex gap-2">
                          <Chip label={t("availableOnly")} selected={filters.availableOnly} color="#22d3ee"
                            onClick={() => onFiltersChange({ ...filters, availableOnly: !filters.availableOnly })} />
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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

              {/* Level picker with icons — shows only after selecting a sub-category (workshop type) */}
              {(expandedTop === "train" || expandedTop === "special") && expandedSub && (
                <div className="mt-2 pt-2 border-t border-[var(--accent-amber)]/15">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-semibold text-[var(--accent-amber)]">{t("trainingLevel")}</span>
                    {selectedLevel && (
                      <button onClick={() => onLevelChange(null)} className="text-[9px] text-[var(--accent-red)] hover:underline">{t("clear")}</button>
                    )}
                  </div>
                  <div className="grid grid-cols-4 gap-1.5">
                    {TRAINING_LEVELS.map((level) => {
                      const isLevelSelected = selectedLevel === level.id;
                      const LevelIcon = level.icon;
                      return (
                        <button key={level.id} onClick={() => onLevelChange(isLevelSelected ? null : level.id)}
                          className="flex flex-col items-center gap-1 py-1.5 transition-all duration-200"
                        >
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
                          <span className={`text-[9px] leading-tight text-center font-medium ${isLevelSelected ? "font-bold" : "text-[var(--text-muted)]"}`} style={isLevelSelected ? { color: level.color } : undefined}>
                            {level.shortLabel}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Slider */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-3">
        <div className="flex items-center justify-between text-xs mb-3">
          <div className="flex items-center gap-1.5">
            <div className={`w-2.5 h-2.5 rounded-full ${sortMode < 40 ? "bg-[var(--accent-amber)]" : "bg-[var(--accent-amber)]/30"}`} />
            <span className={`font-semibold ${sortMode < 40 ? "text-[var(--accent-amber)]" : "text-[var(--text-muted)]"}`}>{t("byRating")}</span>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[var(--bg-elevated)] text-[var(--text-secondary)]" style={{ fontFamily: "var(--font-rubik)" }}>
            {sortMode < 40 ? t("sortRating") : sortMode > 60 ? t("sortDistance") : t("sortBalanced")}
          </span>
          <div className="flex items-center gap-1.5">
            <span className={`font-semibold ${sortMode > 60 ? "text-[var(--accent-blue)]" : "text-[var(--text-muted)]"}`}>{t("byDistance")}</span>
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

      {/* Location prompt when distance sort selected */}
      {sortMode > 60 && <LocationPrompt t={t} />}
    </div>
  );
}

/* ── Location prompt ── */
function LocationPrompt({ t }: { t: ReturnType<typeof useT> }) {
  const { lat, lng, source, manualAddress, loading, error, requestGPS, setManualLocation, clear } = useLocationStore();
  const hasLocation = lat !== null && lng !== null;
  const cities = Object.keys(CITY_COORDS).sort();

  if (hasLocation) {
    return (
      <div className="bg-[var(--accent-blue)]/5 border border-[var(--accent-blue)]/20 rounded-xl p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Navigation className="w-4 h-4 text-[var(--accent-blue)]" />
          <span className="text-xs font-medium text-[var(--accent-blue)]">
            {t("locationActive")}{source === "manual" && manualAddress ? ` — ${manualAddress}` : ""}
          </span>
        </div>
        <button onClick={clear} className="text-[10px] text-[var(--text-muted)] hover:text-[var(--text-primary)] underline">
          {t("locationChange")}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-3 space-y-2.5">
      <p className="text-xs text-[var(--text-secondary)] flex items-center gap-1.5">
        <MapPin className="w-3.5 h-3.5 text-[var(--accent-blue)]" />
        {t("locationNeeded")}
      </p>
      <button
        onClick={requestGPS}
        disabled={loading}
        className="w-full h-9 rounded-lg bg-[var(--accent-blue)] text-white text-xs font-bold flex items-center justify-center gap-2 hover:brightness-110 transition-all disabled:opacity-50"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Navigation className="w-4 h-4" />}
        {loading ? t("locationLoading") : t("locationGPS")}
      </button>
      {error && (
        <p className="text-[10px] text-red-400">{t(error === "denied" ? "locationDenied" : "locationNoGPS")}</p>
      )}
      <div>
        <p className="text-[10px] text-[var(--text-muted)] mb-1.5">{t("locationManual")}</p>
        <select
          onChange={(e) => {
            const city = e.target.value;
            if (city && CITY_COORDS[city]) {
              const [cLat, cLng] = CITY_COORDS[city];
              setManualLocation(cLat, cLng, city);
            }
          }}
          defaultValue=""
          className="w-full h-9 px-3 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] appearance-none"
        >
          <option value="">{t("locationSelectCity")}</option>
          {cities.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
    </div>
  );
}

/* ── Helper components ── */

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
