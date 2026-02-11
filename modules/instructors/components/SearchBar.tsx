"use client";

import { useState } from "react";
import { Search, ChevronRight, X } from "lucide-react";
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

  const getActiveNode = (): FilterNode | null => {
    if (activePath.length === 0) return null;
    let nodes: FilterNode[] = FILTER_TREE;
    let node: FilterNode | null = null;
    for (const pathId of activePath) {
      const found = nodes.find((n) => n.id === pathId);
      if (found) { node = found; if (found.children) nodes = found.children; }
    }
    return node;
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
  const activeNode = getActiveNode();
  const isSubLevel = activePath.length > 0;

  return (
    <div className="space-y-4">
      {/* Circular category icons - full width, evenly spaced */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activePath.join("/")}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {/* Back button when in sub-level */}
          {isSubLevel && (
            <div className="flex items-center gap-2 mb-3">
              <button
                onClick={handleBack}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors text-xs"
              >
                <ChevronRight className="w-3 h-3" />
                חזור
              </button>
              <span className="text-xs font-semibold" style={{ color: activeNode?.color }}>
                {activeNode?.label}
              </span>
              <button onClick={handleClear} className="mr-auto p-1 text-[var(--text-muted)] hover:text-[var(--accent-red)] transition-colors">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Icons grid */}
          <div className={`grid gap-2 ${currentNodes.length <= 3 ? "grid-cols-3" : "grid-cols-4"}`}>
            {currentNodes.map((node) => {
              const Icon = node.icon;
              const isSelected = selectedCategory === node.id;
              const hasChildren = node.children && node.children.length > 0;

              return (
                <button
                  key={node.id}
                  onClick={() => handleNodeClick(node)}
                  className="flex flex-col items-center gap-2 py-2 transition-all duration-200"
                >
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-200 ${
                      isSelected
                        ? "shadow-lg scale-110"
                        : "border-[var(--border-subtle)] hover:scale-105"
                    }`}
                    style={{
                      background: isSelected ? `${node.color}20` : `${node.color}08`,
                      borderColor: isSelected ? node.color : `${node.color}30`,
                      boxShadow: isSelected ? `0 0 16px ${node.color}30` : undefined,
                    }}
                  >
                    <Icon className="w-6 h-6" style={{ color: node.color }} />
                  </div>
                  <span
                    className={`text-[11px] leading-tight text-center font-medium ${
                      isSelected ? "font-bold" : "text-[var(--text-secondary)]"
                    }`}
                    style={isSelected ? { color: node.color } : undefined}
                  >
                    {node.label}
                  </span>
                  {hasChildren && !isSubLevel && (
                    <div className="w-1 h-1 rounded-full" style={{ background: node.color, opacity: 0.5 }} />
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Search bar - placeholder changes per category */}
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
        <div className="flex items-center justify-between text-xs mb-3">
          <div className="flex items-center gap-1.5">
            <div className={`w-2.5 h-2.5 rounded-full ${sortMode < 40 ? "bg-[var(--accent-amber)]" : "bg-[var(--accent-amber)]/30"}`} />
            <span className={`font-semibold ${sortMode < 40 ? "text-[var(--accent-amber)]" : "text-[var(--text-muted)]"}`}>
              לפי דירוג
            </span>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[var(--bg-elevated)] text-[var(--text-secondary)]" style={{ fontFamily: "var(--font-rubik)" }}>
            {sortMode < 40 ? "דירוג" : sortMode > 60 ? "מרחק" : "מאוזן"}
          </span>
          <div className="flex items-center gap-1.5">
            <span className={`font-semibold ${sortMode > 60 ? "text-[var(--accent-blue)]" : "text-[var(--text-muted)]"}`}>
              לפי מרחק
            </span>
            <div className={`w-2.5 h-2.5 rounded-full ${sortMode > 60 ? "bg-[var(--accent-blue)]" : "bg-[var(--accent-blue)]/30"}`} />
          </div>
        </div>
        {/* Custom slider track */}
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
