import type { LucideIcon } from "lucide-react";
import {
  Crosshair, RefreshCw, FileCheck, Users, Flame,
  Target, Award, Shield, Swords, Zap,
  Baby, TrendingUp, Crown, UserPlus, GraduationCap,
  Star, BarChart3, Timer, BookOpen
} from "lucide-react";

export interface FilterNode {
  id: string;
  label: string;
  icon: LucideIcon;
  color: string;
  children?: FilterNode[];
}

export const FILTER_TREE: FilterNode[] = [
  {
    id: "new",
    label: "מתחמש חדש",
    icon: Crosshair,
    color: "#4ade80",
    children: [
      { id: "new:intro", label: "הכרת הנשק", icon: BookOpen, color: "#4ade80" },
      { id: "new:first", label: "אימון ראשון", icon: Target, color: "#4ade80" },
      { id: "new:license", label: "הכנה לרישיון", icon: FileCheck, color: "#4ade80" },
      { id: "new:safety", label: "בטיחות ונהלים", icon: Shield, color: "#4ade80" },
    ],
  },
  {
    id: "refresh",
    label: "רענון אקדח",
    icon: RefreshCw,
    color: "#60a5fa",
    children: [
      { id: "refresh:basic", label: "רענון בסיסי", icon: RefreshCw, color: "#60a5fa" },
      { id: "refresh:advanced", label: "רענון מתקדם", icon: TrendingUp, color: "#60a5fa" },
      { id: "refresh:annual", label: "רענון שנתי", icon: Timer, color: "#60a5fa" },
    ],
  },
  {
    id: "renewal",
    label: "חידוש רישיון",
    icon: FileCheck,
    color: "#fbbf24",
    children: [
      { id: "renewal:pistol", label: "חידוש אקדח", icon: Crosshair, color: "#fbbf24" },
      { id: "renewal:rifle", label: "חידוש רובה", icon: Target, color: "#fbbf24" },
      { id: "renewal:expired", label: "רישיון פג תוקף", icon: Timer, color: "#fbbf24" },
    ],
  },
  {
    id: "group",
    label: "אימוני קבוצות",
    icon: Users,
    color: "#a78bfa",
    children: [
      { id: "group:team", label: "קבוצות קטנות", icon: Users, color: "#a78bfa" },
      { id: "group:corporate", label: "ימי כיף / גיבוש", icon: Star, color: "#a78bfa" },
      { id: "group:security", label: "צוותי ביטחון", icon: Shield, color: "#a78bfa" },
      { id: "group:family", label: "אימון משפחתי", icon: UserPlus, color: "#a78bfa" },
    ],
  },
  {
    id: "pro",
    label: "ירי מקצועי",
    icon: Flame,
    color: "#f87171",
    children: [
      {
        id: "pro:beginner",
        label: "אימון למתחילים",
        icon: Baby,
        color: "#f87171",
        children: [
          { id: "pro:beginner:pistol", label: "ירי אקדח בסיסי", icon: Crosshair, color: "#f87171" },
          { id: "pro:beginner:stance", label: "עמידות ירי", icon: Target, color: "#f87171" },
        ],
      },
      {
        id: "pro:advanced",
        label: "אימון למתקדמים",
        icon: TrendingUp,
        color: "#f87171",
        children: [
          { id: "pro:advanced:dynamic", label: "ירי דינמי", icon: Zap, color: "#f87171" },
          { id: "pro:advanced:precision", label: "ירי דיוק", icon: Target, color: "#f87171" },
          { id: "pro:advanced:tactical", label: "ירי טקטי", icon: Shield, color: "#f87171" },
        ],
      },
      {
        id: "pro:expert",
        label: "אימון למקצוענים",
        icon: Crown,
        color: "#f87171",
        children: [
          { id: "pro:expert:competition", label: "ירי תחרותי", icon: Award, color: "#f87171" },
          { id: "pro:expert:longrange", label: "ירי למרחקים", icon: Target, color: "#f87171" },
        ],
      },
      {
        id: "pro:workshops",
        label: "סדנאות ירי",
        icon: GraduationCap,
        color: "#f87171",
        children: [
          { id: "pro:workshops:2", label: "סדנה 2 אימונים", icon: BarChart3, color: "#f87171" },
          { id: "pro:workshops:3", label: "סדנה 3 אימונים", icon: BarChart3, color: "#f87171" },
          { id: "pro:workshops:combat", label: "סדנת ירי + קרב מגע", icon: Swords, color: "#f87171" },
          { id: "pro:workshops:legal", label: "סדנת ירי + משפטי", icon: FileCheck, color: "#f87171" },
        ],
      },
      {
        id: "pro:groups",
        label: "אימונים לקבוצות",
        icon: Users,
        color: "#f87171",
      },
    ],
  },
];
