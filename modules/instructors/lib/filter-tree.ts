import type { LucideIcon } from "lucide-react";
import {
  Crosshair, RefreshCw, FileCheck, Target, Flame,
  BookOpen, Store, HelpCircle, Timer, Dumbbell, UserSearch,
  CalendarClock, FileText, AlertCircle, ClipboardList,
  Star, Wrench, ScanEye, PersonStanding, Moon,
  User, GraduationCap, Trophy, Crown, Layers, Swords, Scale
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
    label: "למתחמשים חדשים",
    icon: Crosshair,
    color: "#4ade80",
    children: [
      { id: "new:training", label: "הכשרה ראשונית", icon: BookOpen, color: "#4ade80" },
      { id: "new:stores", label: "לבתי סחר מומלצים", icon: Store, color: "#4ade80" },
      { id: "new:help", label: "לסיוע בהגשת בקשה", icon: HelpCircle, color: "#4ade80" },
    ],
  },
  {
    id: "refresh",
    label: "לרענון לאקדח",
    icon: RefreshCw,
    color: "#60a5fa",
    children: [
      { id: "refresh:annual", label: "רענון שנתי", icon: Timer, color: "#60a5fa" },
      { id: "refresh:combo", label: "אימון + רענון", icon: Dumbbell, color: "#60a5fa" },
      { id: "refresh:instructor", label: "מדריך לרענון", icon: UserSearch, color: "#60a5fa" },
    ],
  },
  {
    id: "renewal",
    label: "לחדש רישיון",
    icon: FileCheck,
    color: "#fbbf24",
    children: [
      { id: "renewal:schedule", label: "תיאום חידוש רישיון", icon: CalendarClock, color: "#fbbf24" },
      { id: "renewal:forms", label: "טפסים רלוונטים", icon: FileText, color: "#fbbf24" },
      { id: "renewal:guide", label: "מדריך לחידוש", icon: ClipboardList, color: "#fbbf24" },
      { id: "renewal:missed", label: "פספסתי את המועד", icon: AlertCircle, color: "#fbbf24" },
    ],
  },
  {
    id: "train",
    label: "להתאמן",
    icon: Flame,
    color: "#f87171",
    children: [
      {
        id: "train:single",
        label: "אימון בודד",
        icon: Crosshair,
        color: "#f87171",
        children: [
          { id: "train:single:beginner", label: "מתחילים 1200+", icon: User, color: "#4ade80" },
          { id: "train:single:advanced", label: "מתקדמים 1400+", icon: GraduationCap, color: "#60a5fa" },
          { id: "train:single:expert", label: "מומחים 1600+", icon: Trophy, color: "#fbbf24" },
          { id: "train:single:champion", label: "אלופים 1800+", icon: Crown, color: "#f87171" },
        ],
      },
      {
        id: "train:workshop",
        label: "סדנאות ירי",
        icon: Layers,
        color: "#f87171",
        children: [
          { id: "train:workshop:2", label: "סדנה 2 אימונים", icon: Layers, color: "#f87171" },
          { id: "train:workshop:3", label: "סדנה 3 אימונים", icon: Layers, color: "#f87171" },
          { id: "train:workshop:combat", label: "ירי + קרב מגע", icon: Swords, color: "#f87171" },
          { id: "train:workshop:legal", label: "ירי + משפטי", icon: Scale, color: "#f87171" },
        ],
      },
    ],
  },
  {
    id: "special",
    label: "אימונים מיוחדים",
    icon: Star,
    color: "#a78bfa",
    children: [
      { id: "special:conversion", label: "אימון לערכות הסבה", icon: Wrench, color: "#a78bfa" },
      { id: "special:sights", label: "אימון לכוונות השלכה", icon: ScanEye, color: "#a78bfa" },
      { id: "special:women", label: "אימון נשים", icon: PersonStanding, color: "#a78bfa" },
      { id: "special:night", label: "אימון לילה", icon: Moon, color: "#a78bfa" },
    ],
  },
];
