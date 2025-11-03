"use client";

import Image from "next/image";
import BatteryFullIcon from "@mui/icons-material/BatteryFull";
import PersonIcon from "@mui/icons-material/Person";
import SpeedIcon from "@mui/icons-material/Speed";
import { useVehicleStore } from "@/store/useVehicleDetails";

interface Vehicle {
  name: string;
  driver: string;
  status: "Available" | "Idle" | "On Trip";
  speed: number;
  battery: number;
}

interface VehicleListProps {
  vehicles: Vehicle[];
}

export default function VehicleList({ vehicles }: VehicleListProps) {
  const { setSelectedVehicle } = useVehicleStore();

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 px-2">
        <span className="text-sm font-medium text-gray-700 tracking-wide">
          Total Vehicle:{" "}
          <span className="font-semibold text-gray-900">{vehicles.length}</span>
        </span>
      </div>

      {/* Scrollable Vehicle Cards */}
      <div className="space-y-4 overflow-y-auto h-[calc(100vh-320px)] pr-2">
        {vehicles.map((vehicle, index) => (
          <div
            key={index}
            onClick={() => setSelectedVehicle(vehicle)}
            className="group cursor-pointer rounded-2xl p-4 
                       bg-white/80 backdrop-blur-sm 
                       border border-gray-200 shadow-sm
                       hover:shadow-lg hover:-translate-y-1 
                       hover:bg-gradient-to-tr hover:from-gray-50 hover:to-gray-100
                       transition-all duration-300"
          >
            {/* Row 1: Vehicle Icon + Name + Status */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="relative w-[54px] h-[54px] flex items-center justify-center 
                                bg-gradient-to-tr from-gray-100 to-gray-50 rounded-xl 
                                group-hover:from-gray-200 group-hover:to-gray-100 transition-all duration-300"
                >
                  <Image
                    src="/icons/eve_car_icon.svg"
                    alt="vehicle"
                    width={36}
                    height={36}
                    className="opacity-90"
                  />
                </div>
                <div>
                  <h3 className="text-sm uppercase font-semibold text-gray-800 tracking-wide">
                    {vehicle.name}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <PersonIcon sx={{ fontSize: 13 }} />
                    <span className="font-medium">{vehicle.driver}</span>
                  </div>
                </div>
              </div>

              <span
                className={`text-xs font-semibold px-2 py-1 rounded-full shadow-sm
                  ${
                    vehicle.status === "Available"
                      ? "bg-green-50 text-green-700 border border-green-100"
                      : vehicle.status === "Idle"
                      ? "bg-yellow-50 text-yellow-700 border border-yellow-100"
                      : "bg-red-50 text-red-700 border border-red-100"
                  }`}
              >
                {vehicle.status}
              </span>
            </div>

            <div className="mt-3 flex justify-between text-xs font-medium">
              <div className="flex items-center gap-1 text-blue-600">
                <SpeedIcon sx={{ fontSize: 15 }} />
                <span>{vehicle.speed} km/h</span>
              </div>

              <div className="flex items-center gap-1 text-gray-600">
                <BatteryFullIcon
                  sx={{ fontSize: 15 }}
                  className={`${
                    vehicle.battery > 70
                      ? "text-green-600"
                      : vehicle.battery > 30
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                />
                <span>{vehicle.battery}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
