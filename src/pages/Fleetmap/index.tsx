"use client";

import MapBoxMap from "@/components/map/MapBoxMap";
import FleetmapList from "@/components/map/FleetmapList";
import BookingDetails from "@/components/map/BookingDetails";
import { useVehicleStore } from "@/store/useVehicleDetails";

export default function FleetMapPage() {
  const { selectedVehicle } = useVehicleStore();

  return (
    <main className="flex flex-row min-h-screen bg-gray-100">
      <section className="flex-1 relative">
        <MapBoxMap />
      </section>
      <aside
        className="w-[370px] bg-white border-l border-gray-200 shadow-lg
                   flex flex-col overflow-hidden transition-all duration-300"
      >
        {selectedVehicle ? <BookingDetails /> : <FleetmapList />}
      </aside>
    </main>
  );
}
