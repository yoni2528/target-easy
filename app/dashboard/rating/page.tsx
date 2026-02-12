"use client";

import { AuthGuard } from "@/modules/auth";
import { RatingDashboard } from "@/modules/rating";

export default function RatingPage() {
  return (
    <AuthGuard allowedRoles={["admin"]}>
      <RatingDashboard />
    </AuthGuard>
  );
}
