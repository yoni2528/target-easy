"use client";

import { AuthGuard } from "@/modules/auth";
import { TrainingsPage } from "@/modules/dashboard/components/TrainingsPage";

export default function DashboardTrainingsPage() {
  return (
    <AuthGuard allowedRoles={["instructor", "admin"]}>
      <TrainingsPage />
    </AuthGuard>
  );
}
