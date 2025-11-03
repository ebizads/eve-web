"use client";

import { useVehicleStore } from "@/store/useVehicleDetails";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import PersonIcon from "@mui/icons-material/Person";
import SpeedIcon from "@mui/icons-material/Speed";
import BatteryFullIcon from "@mui/icons-material/BatteryFull";
import Image from "next/image";

export default function BookingDetails() {
  const { selectedVehicle, setSelectedVehicle } = useVehicleStore();

  if (!selectedVehicle) return null;

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-gray-100 shadow-sm">
      {/* Header with Back Button */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-4 backdrop-blur-sm shadow-sm">
        <button
          onClick={() => setSelectedVehicle(null)}
          className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 
               rounded-xl shadow hover:shadow-md hover:bg-gray-50 
               text-gray-800 font-semibold text-sm transition-all duration-200 active:scale-95"
        >
          <ArrowBackIosNewIcon sx={{ fontSize: 16 }} />
          Back
        </button>
      </div>

      {/* Vehicle Card */}
      <div className="m-4 p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
        {/* Top Row: Plate + Status */}
        <div className="flex items-center justify-between mb-4">
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

            {/* Vehicle Name */}
            <h3 className="text-lg font-semibold text-gray-800">
              {selectedVehicle.name}
            </h3>
          </div>

          {/* Vehicle Status */}
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full shadow-sm ${
              selectedVehicle.status === "Available"
                ? "text-green-700 bg-green-50 border border-green-100"
                : selectedVehicle.status === "Idle"
                ? "text-yellow-700 bg-yellow-50 border border-yellow-100"
                : "text-red-700 bg-red-50 border border-red-100"
            }`}
          >
            {selectedVehicle.status}
          </span>
        </div>

        <div className="flex justify-center mb-4">
          <div className="relative w-28 h-28 flex items-center justify-center">
            <svg className="w-28 h-28 transform -rotate-90">
              {/* Background Circle */}
              <circle
                stroke="#e5e7eb"
                strokeWidth="6"
                fill="transparent"
                r="48"
                cx="56"
                cy="56"
              />
              {/* Foreground Circle */}
              <circle
                stroke={
                  selectedVehicle.battery > 70
                    ? "#22c55e"
                    : selectedVehicle.battery > 30
                    ? "#facc15"
                    : "#ef4444"
                }
                strokeWidth="6"
                fill="transparent"
                r="48"
                cx="56"
                cy="56"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 48}
                strokeDashoffset={
                  2 * Math.PI * 48 * (1 - selectedVehicle.battery / 100)
                }
                style={{
                  transition: "stroke-dashoffset 0.8s ease, stroke 0.5s ease",
                }}
              />
            </svg>

            {/* Battery Icon + Percentage */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-700">
              <BatteryFullIcon
                sx={{ fontSize: 28 }}
                style={{
                  color:
                    selectedVehicle.battery > 70
                      ? "#16a34a"
                      : selectedVehicle.battery > 30
                      ? "#ca8a04"
                      : "#b91c1c",
                }}
              />
              <span className="mt-1 font-semibold text-base">
                {selectedVehicle.battery}%
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
            <PersonIcon sx={{ fontSize: 16 }} />
            <span>Driver: {selectedVehicle.driver}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-blue-600 font-medium">
            <SpeedIcon sx={{ fontSize: 16 }} />
            <span>{selectedVehicle.speed} km/h</span>
          </div>
        </div>
      </div>
    </div>
  );
}
