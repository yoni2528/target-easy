"use client";

import { useState } from "react";
import { Search, ChevronLeft, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FILTER_TREE, type FilterNode } from "../lib/filter-tree";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onCategorySelect: (id: string | null) => void;
  selectedCategory: string | null;
  sortMode: number;
  onSortChange: (value: number) => void;
}

export function SearchBar({ onSearch, onCategorySelect, selectedCategory, sortMode, onSortChange }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [activePath, setActivePath] = useState<string[]>([]);

  const getCurrentNodes = (): FilterNode[] => {
    if (activePath.length === 0) return FILTER_TREE;
    let nodes: FilterNode[] = FILTER_TREE;
    for (const pathId of activePath) {
      const found = nodes.find((n) => n.id === pathId);
      if (found?.children) nodes = found.children;
      else return [];
    }
    return nodes;
  };

  const getActiveLabel = (): string | null => {
    if (activePath.length === 0) return null;
    let nodes: FilterNode[] = FILTER_TREE;
    let label = "";
    for (const pathId of activePath) {
      const found = nodes.find((n) => n.id === pathId);
      if (found) {
        label = found.label;
        if (found.children) nodes = found.children;
      }
    }
    return label;
  };

  const handleNodeClick = (node: FilterNode) => {
    if (node.children && node.children.length > 0) {
      setActivePath([...activePath, node.id]);
      onCategorySelect(node.id);
    } else {
      onCategorySelect(node.id);
    }
  };

  const handleBack = () => {
    const newPath = activePath.slice(0, -1);
    setActivePath(newPath);
    onCategorySelect(newPath.length > 0 ? newPath[newPath.length - 1] : null);
  };

  const handleClear = () => {
    setActivePath([]);
    onCategorySelect(null);
  };

  const currentNodes = getCurrentNodes();
  const activeLabel = getActiveLabel();

  return (
    <div className="space-y-3">
      {/* Easy.co.il style search bar */}
      <div className="relative">
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--accent-green)]" />
        <input
          type="text"
          placeholder="מה אתה מחפש?"
          value={query}
          onChange={(e) => { setQuery(e.target.value); onSearch(e.target.value); }}
          className="w-full h-14 pr-12 pl-4 rounded-2xl bg-[var(--bg-card)] border-2 border-[var(--border-default)] text-[var(--text-primary)] placeholder-[var(--text-muted)] text-base font-medium focus:outline-none focus:border-[var(--accent-green)] focus:shadow-[0_0_20px_rgba(74,222,128,0.15)] transition-all"
        />
      </div>

      {/* Rating vs Distance slider */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-3">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className={`font-medium ${sortMode < 40 ? "text-[var(--accent-amber)]" : "text-[var(--text-muted)]"}`}>
            דירוג
          </span>
          <span className={`font-medium ${sortMode > 60 ? "text-[var(--accent-blue)]" : "text-[var(--text-muted)]"}`}>
            מרחק
          </span>
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

      {/* Breadcrumb trail */}
      <AnimatePresence>
        {activePath.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={handleBack}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              >
                <ChevronLeft className="w-3 h-3 rotate-180" />
                חזור
              </button>
              <span className="text-[var(--accent-green)] font-semibold">{activeLabel}</span>
              <button onClick={handleClear} className="mr-auto p-1 text-[var(--text-muted)] hover:text-[var(--accent-red)] transition-colors">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Category icons / sub-filter grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activePath.join("/")}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1" style={{ scrollbarWidth: "none" }}>
            {currentNodes.map((node) => {
              const Icon = node.icon;
              const isSelected = selectedCategory === node.id;
              const hasChildren = node.children && node.children.length > 0;

              return (
                <button
                  key={node.id}
                  onClick={() => handleNodeClick(node)}
                  className={`flex flex-col items-center gap-1.5 min-w-[76px] py-3 px-2 rounded-xl border transition-all duration-200 relative ${
                    isSelected
                      ? "border-[var(--accent-green)]/40 shadow-[0_0_15px_rgba(74,222,128,0.1)]"
                      : "bg-[var(--bg-card)] border-[var(--border-subtle)] hover:border-[var(--border-default)]"
                  }`}
                  style={isSelected ? { background: `${node.color}10`, borderColor: `${node.color}40` } : undefined}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: `${node.color}15` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: node.color }} />
                  </div>
                  <span className={`text-[10px] font-medium leading-tight text-center ${
                    isSelected ? "font-semibold" : "text-[var(--text-secondary)]"
                  }`} style={isSelected ? { color: node.color } : undefined}>
                    {node.label}
                  </span>
                  {hasChildren && (
                    <ChevronLeft className="absolute top-1.5 left-1.5 w-3 h-3 text-[var(--text-muted)] rotate-180" />
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
