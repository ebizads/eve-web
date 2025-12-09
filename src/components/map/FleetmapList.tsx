"use client";

import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import VehicleList from "@/components/map/VehicleList";
import { useVehicleStore } from "@/store/useVehicleDetails"; // <-- import store

export default function FleetmapList() {
  const [searchTerm, setSearchTerm] = useState("");
  const setSelectedVehicle = useVehicleStore(
    (state) => state.setSelectedVehicle
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
  };

  const handleFilterClick = () => {
    console.log("Filter clicked!");
  };

  const vehicles = [
    {
      name: "ABC-123",
      driver: "John Doe",
      plateNo: "ABC 1234",
      driverContact: "09171234567",
      passengerName: "Jane Smith",
      pickupLocation: "SM Mall, Cebu",
      dropoffLocation: "IT Park, Lahug",
      status: "Available" as const,
      speed: 45,
      battery: 80,
      rating: 2.9,
    },
    {
      name: "XYZ-789",
      driver: "Jane Smith",
      plateNo: "XYZ 7890",
      driverContact: "09179876543",
      passengerName: "Carlos Reyes",
      pickupLocation: "Ayala Center, Cebu",
      dropoffLocation: "Banilad, Cebu",
      status: "Idle" as const,
      speed: 0,
      battery: 55,
      rating: 4.9,
    },
    {
      name: "LMN-456",
      driver: "Carlos Reyes",
      plateNo: "LMN 4567",
      driverContact: "09171239876",
      passengerName: "John Doe",
      pickupLocation: "Colon St, Cebu",
      dropoffLocation: "Talamban, Cebu",
      status: "On Trip" as const,
      speed: 62,
      battery: 30,
      rating: 4.9,
    },
  ];

  return (
    <div
      className="w-[370px] h-screen flex flex-col 
                 bg-white/70 backdrop-blur-md border-l border-gray-200 
                 shadow-xl p-5"
    >
      {/* 🔍 Search and Filter */}
      <form
        onSubmit={handleSearch}
        className="mb-4 flex items-center gap-2 bg-white/80 border border-gray-200 
                   rounded-xl px-3 py-2 shadow-sm hover:shadow-md transition-all duration-200"
      >
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search vehicle..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-3 text-sm text-gray-800 bg-transparent 
                       placeholder:text-gray-400 focus:outline-none focus:ring-0"
          />
        </div>

        <button
          type="button"
          onClick={handleFilterClick}
          className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 
                     rounded-lg text-sm text-gray-700 bg-white/80 hover:bg-gray-100 
                     hover:shadow-sm transition-all duration-200"
        >
          <FilterListIcon sx={{ fontSize: 18 }} className="text-gray-600" />
          <span className="font-medium">Filter</span>
        </button>
      </form>

      {/* 🟢 Ride Status Legend */}
      <div className="rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm p-4 mb-4 shadow-sm">
        <p className="text-sm font-semibold text-gray-800 mb-3 flex items-center justify-between">
          Ride Status
          <span className="text-xs text-gray-400 font-medium">Overview</span>
        </p>

        <div className="space-y-2.5">
          {/* Available */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
              <span className="text-sm text-gray-700">Available</span>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-lg bg-green-100 text-green-700">
              12
            </span>
          </div>

          {/* Idle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
              <span className="text-sm text-gray-700">Idle</span>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-lg bg-yellow-100 text-yellow-700">
              5
            </span>
          </div>

          {/* On Trip */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500"></span>
              <span className="text-sm text-gray-700">On Trip</span>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-lg bg-red-100 text-red-700">
              8
            </span>
          </div>
        </div>
      </div>

      {/* 🚘 Vehicle List */}
      <div className="flex-1 overflow-hidden">
        <VehicleList vehicles={vehicles} />
      </div>
    </div>
  );
}
