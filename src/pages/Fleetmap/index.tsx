"use client";

import MapBoxMap from "@/components/map/MapBoxMap";
import FleetmapList from "@/components/map/FleetmapList";

export default function FleetMap() {
  return (
    <main className="min-h-screen flex flex-row items-start justify-center">
      <div className="flex-1">
        <MapBoxMap />
      </div>
      <FleetmapList />
    </main>
  );
}
