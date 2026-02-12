import { Suspense } from "react";
import { CompareContent } from "@/modules/compare/components/CompareContent";

export default function ComparePage() {
  return (
    <Suspense>
      <CompareContent />
    </Suspense>
  );
}
