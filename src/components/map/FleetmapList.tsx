import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import VehicleList from "@/components/map/VehicleList";
import { useState } from "react";

export default function FleetmapList() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
  };

  const handleFilterClick = () => {
    console.log("Filter clicked!");
    // Later: open filter modal or dropdown here
  };

  const vehicles = [
    { name: "Vehicle 1", status: "Available" },
    { name: "Vehicle 2", status: "Idle" },
    { name: "Vehicle 3", status: "On Trip" },
    { name: "Vehicle 4", status: "Available" },
    { name: "Vehicle 5", status: "Idle" },
  ];
  return (
    <main className="w-[350px] h-[100vh] bg-white shadow-md p-4 overflow-y-auto">
      {/* Right side — Container */}
      <form onSubmit={handleSearch} className="mb-4 flex items-center gap-2">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-3 text-sm text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 h-10"
          />
        </div>

        <button
          type="button"
          onClick={handleFilterClick}
          className="flex items-center gap-1.5 px-3 border border-gray-300 rounded-lg text-sm text-black hover:bg-gray-100 transition h-10"
        >
          <FilterListIcon className="text-gray-600" />
          Filters
        </button>
      </form>

      <div className="border border-[#9D9D9D] rounded-lg p-4 w-full">
        <p className="text-sm font-semibold text-[#1F2937] mb-3">
          Ride Status Legend
        </p>

        {/* Status List */}
        <div className="space-y-2">
          {/* Available */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* Colored dot */}
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
              <span className="text-sm text-[#1F2937]">Available</span>
            </div>
            {/* Number badge */}
            <span className="text-xs font-semibold px-2 py-1 rounded bg-green-100 text-green-800">
              12
            </span>
          </div>

          {/* Idle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
              <span className="text-sm text-[#1F2937]">Idle</span>
            </div>
            <span className="text-xs font-semibold px-2 py-1 rounded bg-yellow-100 text-yellow-800">
              5
            </span>
          </div>

          {/* On Trip */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500"></span>
              <span className="text-sm text-[#1F2937]">On Trip</span>
            </div>
            <span className="text-xs font-semibold px-2 py-1 rounded bg-red-100 text-red-800">
              8
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
