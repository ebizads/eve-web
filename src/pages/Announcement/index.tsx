"use client";

import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useState } from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { AddCircleOutline, AddBoxOutlined } from "@mui/icons-material";
import AnnouncementList from "@/components/announcements/AnnouncementList";
import CreateAnnouncementModal from "@/components/announcements/CreateAnnouncementModal";

interface Announcement {
  id: string;
  priority: "High" | "Medium" | "Low";
  category: string;
  title: string;
  description: string;
  postedDate: string;
  author: string;
  audience: "drivers" | "passengers" | "both";
}



export default function AnnouncementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
  };

  const handleFilterClick = () => {
    console.log("Filter clicked!");
  };

  // Modal handlers
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateAnnouncement = (announcementData: Omit<Announcement, 'id' | 'postedDate' | 'author'>) => {
    // Create new announcement
    const newAnnouncement: Announcement = {
      id: Date.now().toString(),
      ...announcementData,
      postedDate: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      author: "Current User" // In a real app, this would come from auth
    };

    // Close the modal
    setIsModalOpen(false);
  };

  return (
    <main className="flex flex-col min-h-screen bg-gray-100 p-6">
      <div className="mx-auto w-full">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* 🔍 Search and Filter */}
          <div className="mb-4 flex items-center gap-2">
            <form
              onSubmit={handleSearch}
              className="flex-1 flex items-center gap-2 bg-white/80 border border-gray-200 
                         rounded-xl px-3 py-2 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search announcement..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 text-sm text-gray-800 bg-transparent 
                             placeholder:text-gray-400 focus:outline-none focus:ring-0"
                />
              </div>
            </form>

            <button
              type="button"
              onClick={handleFilterClick}
              className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 
                         rounded-lg text-sm text-gray-700 bg-white/80 hover:bg-gray-100 
                         hover:shadow-sm transition-all duration-200"
            >
              <FilterListIcon sx={{ fontSize: 18 }} className="text-gray-600" />
              <span className="font-medium">All Types</span>
            </button>

             <button
              type="button"
              onClick={handleFilterClick}
              className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 
                         rounded-lg text-sm text-gray-700 bg-white/80 hover:bg-gray-100 
                         hover:shadow-sm transition-all duration-200"
            >
              <FilterListIcon sx={{ fontSize: 18 }} className="text-gray-600" />
              <span className="font-medium">All Priority Level</span>
            </button>

            <button
              type="button"
              onClick={handleFilterClick}
              className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 
                         rounded-lg text-sm text-gray-700 bg-white/80 hover:bg-gray-100 
                         hover:shadow-sm transition-all duration-200"
            >
              <CalendarMonthIcon sx={{ fontSize: 18 }} className="text-gray-600" />
              <span className="font-medium">All Time</span>
            </button>

            <button
              type="button"
              onClick={handleOpenModal}
              className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 
                         rounded-lg text-sm text-gray-700 bg-[#FFC300] hover:bg-[#FFC300]/70
                         hover:shadow-sm transition-all duration-200"
            >
              <AddBoxOutlined sx={{ fontSize: 18 }} className="text-gray-600" />
              <span className="font-medium">Create New</span>
            </button>
          </div>

          {/* 📋 Announcements List */}
          <AnnouncementList />
        </div>
      </div>

      {/* Create Announcement Modal */}
      <CreateAnnouncementModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleCreateAnnouncement}
      />
    </main>
  );
}
