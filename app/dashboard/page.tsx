"use client";

import { AuthGuard } from "@/modules/auth";
import { InstructorDashboard } from "@/modules/dashboard";

export default function DashboardPage() {
  return (
    <AuthGuard allowedRoles={["instructor", "admin"]}>
      <InstructorDashboard />
    </AuthGuard>
  );
}
