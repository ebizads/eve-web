"use client";

import React, { useState } from "react";
import { DirectionsCar, People, Groups, Edit, Delete, ChevronLeft, ChevronRight } from "@mui/icons-material";

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

const sampleAnnouncements: Announcement[] = [
  {
    id: "1",
    priority: "High",
    category: "System Alert",
    title: "Emergency System Maintenance",
    description: "Due to an unexpected system failure, all fleet operations will be temporarily suspended for 2 hours starting at 3:00 PM today. Drivers will be notified via SMS.",
    postedDate: "Jan 22, 2026",
    author: "System Admin",
    audience: "drivers"
  },

  {
    id: "2",
    priority: "Low",
    category: "Service Update",
    title: "New Luxury Vehicle Class Available",
    description: "We're excited to introduce our premium luxury vehicle service! Passengers can now request high-end vehicles with premium amenities including leather seating, WiFi, and refreshments.",
    postedDate: "Jan 21, 2026",
    author: "Customer Service",
    audience: "passengers"
  },
  {
    id: "3",
    priority: "Medium",
    category: "Weather Alert",
    title: "Severe Weather Conditions Expected",
    description: "Heavy snowfall expected tomorrow. All rides may experience delays. Passengers are advised to allow extra travel time. Drivers should follow winter driving protocols.",
    postedDate: "Jan 20, 2026",
    author: "Operations Center",
    audience: "both"
  },

];

const getPriorityStyles = (priority: string) => {
  switch (priority) {
    case "High":
      return {
        borderColor: "border-red-500",
        bgColor: "bg-white",
        badgeColor: "bg-red-100 text-red-800"
      };
    case "Medium":
      return {
        borderColor: "border-yellow-500",
        bgColor: "bg-white",
        badgeColor: "bg-yellow-100 text-yellow-800"
      };

    case "Low":
      return {
        borderColor: "border-green-500",
        bgColor: "bg-white",
        badgeColor: "bg-green-100 text-green-800"
      };
    default:
      return {
        borderColor: "border-gray-500",
        bgColor: "bg-white",
        badgeColor: "bg-gray-100 text-gray-800"
      };
  }
};

const getAudienceInfo = (audience: string) => {
  switch (audience) {
    case "drivers":
      return {
        icon: <DirectionsCar className="w-4 h-4" />,
        text: "Drivers",
        color: "text-gray-600"
      };
    case "passengers":
      return {
        icon: <People className="w-4 h-4" />,
        text: "Passengers",
        color: "text-gray-600"
      };
    case "both":
      return {
        icon: <Groups className="w-4 h-4" />,
        text: "All Users",
        color: "text-gray-600"
      };
    default:
      return {
        icon: <Groups className="w-4 h-4" />,
        text: "All Users",
        color: "text-gray-600"
      };
  }
};

export default function AnnouncementList({ showActions = true, showMeta = true }: { showActions?: boolean; showMeta?: boolean }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (id: string) => {
    console.log("Edit announcement:", id);
  };

  const handleDelete = (id: string) => {
    console.log("Delete announcement:", id);
  };

  // Pagination logic
  const totalPages = Math.ceil(sampleAnnouncements.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAnnouncements = sampleAnnouncements.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };


 

  return (
    <>
      <div className="space-y-4">
        {currentAnnouncements.map((announcement) => {
          if (!showMeta) {
            return (
              <div key={announcement.id} className="p-4 rounded-lg border border-gray-200 bg-white">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{announcement.title}</h3>
                <p className="text-gray-700 text-sm">{announcement.description}</p>
              </div>
            );
          }

          const styles = getPriorityStyles(announcement.priority);
          const audienceInfo = getAudienceInfo(announcement.audience);

          return (
            <div key={announcement.id} className={`border ${styles.borderColor} p-4 ${styles.bgColor} rounded-lg`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="text-lg font-semibold text-gray-900 mb-2">{announcement.title}</div>
                    <span className={`px-2 py-1 ${styles.badgeColor} text-sm font-semibold rounded-md`}>
                      {announcement.priority}
                    </span>
                    <span className="text-sm text-gray-500 border px-2 py-1 rounded-md">{announcement.category}</span>
                    <div className={`flex items-center gap-1 px-2 py-1  ${audienceInfo.color}`}>
                      {audienceInfo.icon}
                      <span className="text-sm font-medium">{audienceInfo.text}</span>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-3">{announcement.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>Posted: {announcement.postedDate}</span>
                    <span>By: {announcement.author}</span>
                  </div>
                </div>
                {showActions && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(announcement.id)}
                      className="text-blue-600 hover:text-blue-800 border px-2 py-1 rounded-md text-sm font-medium flex items-center gap-1"
                    >
                      <Edit sx={{ fontSize: 16 }} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(announcement.id)}
                      className="text-red-600 hover:text-red-800 border px-2 py-1 rounded-md text-sm font-medium flex items-center gap-1"
                    >
                      <Delete sx={{ fontSize: 16 }} />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}


        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              Showing {startIndex + 1}-{Math.min(endIndex, sampleAnnouncements.length)} of {sampleAnnouncements.length} announcements
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft sx={{ fontSize: 16 }} />
                Previous
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-2 text-sm font-medium rounded-md ${
                      currentPage === page
                        ? "bg-blue-600 text-white"
                        : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight sx={{ fontSize: 16 }} />
              </button>
            </div>
          </div>
        )}
      </div>

    
    </>
  );
}