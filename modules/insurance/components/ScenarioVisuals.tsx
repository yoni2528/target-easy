"use client";

import { BulletTargetVisual, DualGaugeVisual, CostBarsVisual } from "./ScenarioVisualsSvg";
import { DefenderCardVisual } from "./ScenarioVisuals3D";
import { BrokenSafeVisual } from "./ScenarioSafeVisual";
import { CrackingMedalVisual } from "./ScenarioMedalVisual";

const scenes = [
  BulletTargetVisual,   // 1: פליטת כדור
  DefenderCardVisual,   // 2: הסנגוריה הציבורית
  CrackingMedalVisual,  // 3: עצירת פיגוע נכונה
  DualGaugeVisual,      // 4: עצירת פיגוע שגויה
  BrokenSafeVisual,     // 5: גניבת נשק
  CostBarsVisual,       // 6: תביעת נזיקין
];

export const ScenarioVisual = ({ index, isActive }: { index: number; isActive: boolean }) => {
  const Scene = scenes[index];
  return (
    <div className="h-full flex items-center justify-center">
      <Scene isActive={isActive} />
    </div>
  );
};
