"use client";

import { use } from "react";
import { FeedbackPage } from "@/modules/rating/components/FeedbackPage";

export default function FeedbackRoute({ params }: { params: Promise<{ instructorId: string; trainingId: string }> }) {
  const { instructorId, trainingId } = use(params);
  return <FeedbackPage instructorId={instructorId} trainingId={trainingId} />;
}
