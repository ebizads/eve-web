"use client";

import React from "react";

type Vehicle = {
  name: string;
  status: "Available" | "Idle" | "On Trip";
};

type VehicleListProps = {
  vehicles: Vehicle[];
  onSelect?: (vehicle: Vehicle) => void; // optional click handler
};

export default function VehicleList({ vehicles, onSelect }: VehicleListProps) {
  return (
    <div className="flex-1 overflow-y-auto">
      {vehicles.map((vehicle, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-2 mb-2 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
          onClick={() => onSelect?.(vehicle)}
        >
          <div className="flex items-center gap-2">
            <span
              className={`w-3 h-3 rounded-full ${
                vehicle.status === "Available"
                  ? "bg-green-500"
                  : vehicle.status === "Idle"
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
            ></span>
            <span className="text-sm text-gray-700">{vehicle.name}</span>
          </div>

          <span
            className={`text-xs font-semibold px-2 py-1 rounded ${
              vehicle.status === "Available"
                ? "bg-green-100 text-green-800"
                : vehicle.status === "Idle"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-100 text-red-800"
            }`}
          >
            {vehicle.status}
          </span>
        </div>
      ))}
    </div>
  );
}
