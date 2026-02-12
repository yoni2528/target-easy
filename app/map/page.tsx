"use client";

import dynamic from "next/dynamic";

const MapContent = dynamic(() => import("@/modules/map/components/MapContent"), { ssr: false });

export default function MapPage() {
  return <MapContent />;
}
