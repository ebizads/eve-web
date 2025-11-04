"use client";

import { useVehicleStore } from "@/store/useVehicleDetails";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import SpeedIcon from "@mui/icons-material/Speed";
import Image from "next/image";
import PhoneIcon from "@mui/icons-material/Phone";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FlagIcon from "@mui/icons-material/Flag";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

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

        <div className="flex justify-center mb-6">
          {/* Main Gauge Cluster */}
          <div className="relative w-32 h-32 mx-auto">
            {/* Outer Ring */}
            <div className="absolute inset-0 rounded-full border-2 border-gray-200"></div>
            <div
              className="absolute inset-1 rounded-full border shadow-sm"
              style={{
                borderColor:
                  selectedVehicle.battery > 70
                    ? "rgba(16, 185, 129, 0.3)"
                    : selectedVehicle.battery > 30
                    ? "rgba(234, 179, 8, 0.3)"
                    : "rgba(239, 68, 68, 0.3)",
              }}
            ></div>
            <svg
              className="w-32 h-32 transform -rotate-90"
              viewBox="0 0 120 120"
            >
              {/* Background Track */}
              <circle
                stroke="#f3f4f6"
                strokeWidth="8"
                fill="transparent"
                r="45"
                cx="60"
                cy="60"
              />

              {/* Progress Arc - Dynamic Color */}
              <circle
                stroke={
                  selectedVehicle.battery > 70
                    ? "#10b981"
                    : selectedVehicle.battery > 30
                    ? "#eab308"
                    : "#ef4444"
                }
                strokeWidth="8"
                fill="transparent"
                r="45"
                cx="60"
                cy="60"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 45}
                strokeDashoffset={
                  2 * Math.PI * 45 * (1 - selectedVehicle.battery / 100)
                }
                className="transition-all duration-1200 ease-out"
                style={{
                  filter: `drop-shadow(0 0 6px ${
                    selectedVehicle.battery > 70
                      ? "rgba(16, 185, 129, 0.3)"
                      : selectedVehicle.battery > 30
                      ? "rgba(234, 179, 8, 0.3)"
                      : "rgba(239, 68, 68, 0.3)"
                  })`,
                }}
              />
            </svg>

            {/* Digital Center Display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-center">
                <div
                  className="text-xl font-bold font-mono mb-1"
                  style={{
                    color:
                      selectedVehicle.battery > 70
                        ? "#10b981"
                        : selectedVehicle.battery > 30
                        ? "#eab308"
                        : "#ef4444",
                  }}
                >
                  {selectedVehicle.battery}%
                </div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest">
                  Battery
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3 text-sm font-medium mt-4">
            <div className="flex flex-col items-start bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-xl px-4 py-2.5 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-gray-500 font-semibold">
                <LocalOfferIcon sx={{ fontSize: 14, color: "#2563eb" }} />
                <span>Plate No</span>
              </div>
              <span className="font-semibold text-gray-800 px-2 py-0.5 mt-1">
                {selectedVehicle.plateNo}
              </span>
            </div>

            <div className="flex flex-col items-end bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl px-4 py-2.5 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-blue-600 font-semibold">
                <SpeedIcon sx={{ fontSize: 14, color: "#2563eb" }} />
                <span>Speed</span>
              </div>
              <span className="text-blue-700 font-semibold py-0.5 mt-1">
                {selectedVehicle.speed} km/h
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3 ">
            <div className="flex items-center justify-between text-sm text-gray-700 font-medium">
              <div className="flex items-center gap-3">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Driver"
                  className="w-10 h-10 rounded-full object-cover shadow-md border border-gray-200"
                />

                <div className="flex flex-col">
                  <span className="text-[11px] uppercase tracking-wide text-gray-400 font-semibold">
                    Driver
                  </span>
                  <span className="font-semibold text-gray-800">
                    {selectedVehicle.driver}
                  </span>

                  <div className="flex items-center gap-1 text-gray-500 text-xs mt-0.5">
                    <PhoneIcon
                      sx={{ fontSize: 14 }}
                      className="text-blue-500"
                    />
                    <span>{selectedVehicle.driverContact}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div
                  className={`flex items-center gap-1 px-2 py-1 rounded-lg shadow-sm text-xs font-semibold
          ${
            (selectedVehicle.rating ?? 0) >= 4.5
              ? "bg-green-50 text-green-600"
              : (selectedVehicle.rating ?? 0) >= 3.0
              ? "bg-yellow-50 text-yellow-600"
              : "bg-red-50 text-red-600"
          }`}
                >
                  <StarIcon sx={{ fontSize: 16 }} />
                  <span>{(selectedVehicle.rating ?? 0).toFixed(1)}</span>
                </div>

                <button
                  className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 shadow-md transition"
                  onClick={() =>
                    window.open(`tel:${selectedVehicle.driverContact}`)
                  }
                >
                  <PhoneIcon sx={{ fontSize: 18 }} />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-700 font-medium">
              <div className="flex items-center gap-3">
                <img
                  src="https://randomuser.me/api/portraits/women/32.jpg"
                  alt="Passenger"
                  className="w-10 h-10 rounded-full object-cover shadow-md border border-gray-200"
                />

                <div className="flex flex-col">
                  <span className="text-[11px] uppercase tracking-wide text-gray-400 font-semibold">
                    Passenger
                  </span>
                  <span className="font-semibold text-gray-800">
                    {selectedVehicle.passengerName}
                  </span>
                </div>
              </div>
            </div>
            <hr className="my-4 border-gray-200 shadow-sm" />

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <LocationOnIcon
                  sx={{ fontSize: 18 }}
                  className="text-green-600"
                />
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400 uppercase font-semibold leading-none">
                    Pickup Location
                  </span>
                  <span className="text-sm text-gray-800 font-medium leading-snug">
                    {selectedVehicle.pickupLocation}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FlagIcon sx={{ fontSize: 18 }} className="text-red-500" />
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400 uppercase font-semibold leading-none">
                    Drop-off Location
                  </span>
                  <span className="text-sm text-gray-800 font-medium leading-snug">
                    {selectedVehicle.dropoffLocation}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
