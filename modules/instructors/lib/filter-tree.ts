import type { LucideIcon } from "lucide-react";
import {
  Crosshair, RefreshCw, FileCheck, Target, Flame,
  BookOpen, Store, HelpCircle, Timer, Dumbbell, UserSearch,
  CalendarClock, FileText, AlertCircle, ClipboardList,
  Star, Wrench, ScanEye, PersonStanding, Moon,
  User, GraduationCap, Trophy, Crown, Layers, Swords, Scale
} from "lucide-react";
import type { Lang } from "@/lib/language-store";
import { t as translate } from "@/lib/translations";
import type { TranslationKey } from "@/lib/translations";

export interface FilterNode {
  id: string;
  label: string;
  labelKey?: string; // translation key
  icon: LucideIcon;
  color: string;
  children?: FilterNode[];
}

// Keep static version for backward compatibility (used in non-component contexts)
export const FILTER_TREE: FilterNode[] = [
  {
    id: "new",
    label: "למתחמשים חדשים",
    labelKey: "catNew",
    icon: Crosshair,
    color: "#4ade80",
    children: [
      { id: "new:training", label: "הכשרה ראשונית", labelKey: "catNewTraining", icon: BookOpen, color: "#4ade80" },
      { id: "new:stores", label: "לבתי סחר מומלצים", labelKey: "catNewStores", icon: Store, color: "#4ade80" },
      { id: "new:help", label: "לסיוע בהגשת בקשה", labelKey: "catNewHelp", icon: HelpCircle, color: "#4ade80" },
    ],
  },
  {
    id: "refresh",
    label: "לרענון לאקדח",
    labelKey: "catRefresh",
    icon: RefreshCw,
    color: "#60a5fa",
    children: [
      { id: "refresh:annual", label: "רענון שנתי", labelKey: "catRefreshAnnual", icon: Timer, color: "#60a5fa" },
      { id: "refresh:combo", label: "אימון + רענון", labelKey: "catRefreshCombo", icon: Dumbbell, color: "#60a5fa" },
      { id: "refresh:instructor", label: "מדריך לרענון", labelKey: "catRefreshInstructor", icon: UserSearch, color: "#60a5fa" },
    ],
  },
  {
    id: "renewal",
    label: "לחדש רישיון",
    labelKey: "catRenewal",
    icon: FileCheck,
    color: "#fbbf24",
    children: [
      { id: "renewal:schedule", label: "תיאום חידוש רישיון", labelKey: "catRenewalSchedule", icon: CalendarClock, color: "#fbbf24" },
      { id: "renewal:forms", label: "טפסים רלוונטים", labelKey: "catRenewalForms", icon: FileText, color: "#fbbf24" },
      { id: "renewal:guide", label: "מדריך לחידוש", labelKey: "catRenewalGuide", icon: ClipboardList, color: "#fbbf24" },
      { id: "renewal:missed", label: "פספסתי את המועד", labelKey: "catRenewalMissed", icon: AlertCircle, color: "#fbbf24" },
    ],
  },
  {
    id: "train",
    label: "להתאמן",
    labelKey: "catTrain",
    icon: Flame,
    color: "#f87171",
    children: [
      {
        id: "train:single",
        label: "אימון בודד",
        labelKey: "catTrainSingle",
        icon: Crosshair,
        color: "#f87171",
        children: [
          { id: "train:single:beginner", label: "מתחילים 1200+", labelKey: "levelBeginner", icon: User, color: "#4ade80" },
          { id: "train:single:advanced", label: "מתקדמים 1400+", labelKey: "levelAdvanced", icon: GraduationCap, color: "#60a5fa" },
          { id: "train:single:expert", label: "מומחים 1600+", labelKey: "levelExpert", icon: Trophy, color: "#fbbf24" },
          { id: "train:single:champion", label: "אלופים 1800+", labelKey: "levelChampion", icon: Crown, color: "#f87171" },
        ],
      },
      {
        id: "train:workshop",
        label: "סדנאות ירי",
        labelKey: "catTrainWorkshop",
        icon: Layers,
        color: "#f87171",
        children: [
          { id: "train:workshop:2", label: "סדנה 2 אימונים", labelKey: "catWorkshop2", icon: Layers, color: "#f87171" },
          { id: "train:workshop:3", label: "סדנה 3 אימונים", labelKey: "catWorkshop3", icon: Layers, color: "#f87171" },
          { id: "train:workshop:combat", label: "ירי + קרב מגע", labelKey: "catWorkshopCombat", icon: Swords, color: "#f87171" },
          { id: "train:workshop:legal", label: "ירי + משפטי", labelKey: "catWorkshopLegal", icon: Scale, color: "#f87171" },
        ],
      },
    ],
  },
  {
    id: "special",
    label: "אימונים מיוחדים",
    labelKey: "catSpecial",
    icon: Star,
    color: "#a78bfa",
    children: [
      { id: "special:conversion", label: "אימון לערכות הסבה", labelKey: "catSpecialConversion", icon: Wrench, color: "#a78bfa" },
      { id: "special:sights", label: "אימון לכוונות השלכה", labelKey: "catSpecialSights", icon: ScanEye, color: "#a78bfa" },
      { id: "special:women", label: "אימון נשים", labelKey: "catSpecialWomen", icon: PersonStanding, color: "#a78bfa" },
      { id: "special:night", label: "אימון לילה", labelKey: "catSpecialNight", icon: Moon, color: "#a78bfa" },
    ],
  },
];

function translateNode(node: FilterNode, lang: Lang): FilterNode {
  return {
    ...node,
    label: node.labelKey ? translate(node.labelKey as TranslationKey, lang) : node.label,
    children: node.children?.map((child) => translateNode(child, lang)),
  };
}

export function getFilterTree(lang: Lang): FilterNode[] {
  return FILTER_TREE.map((node) => translateNode(node, lang));
}
