import { Suspense } from "react";
import { BookingContent } from "@/modules/booking";

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-[var(--text-muted)]">טוען...</div>}>
      <BookingContent />
    </Suspense>
  );
}
