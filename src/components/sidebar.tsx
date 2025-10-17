import * as React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  MapTwoTone,
  GridViewRounded,
  PaymentsRounded,
  PeopleAltRounded,
  DirectionsCarFilledRounded,
  EventRounded,
  ReportRounded,
  EvStationRounded,
  KeyboardArrowDown,
  KeyboardArrowUp,
  LogoutRounded,
} from "@mui/icons-material";

const drawerWidth = 240;

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/"); // Redirect to login
  };

  const [selectedPage, setSelectedPage] = React.useState("Dashboard");
  const [expandedMenu, setExpandedMenu] = React.useState<string | null>(null);

  // Page subtitles
  const subtitles: Record<string, string> = {
    "Fleet Map": "Real-time monitoring of vehicle locations and routes",
    Dashboard: "Overview of fleet performance and system status",
    Finance: "Manage revenue, payroll, and expenses efficiently",
    Revenue: "Detailed breakdown of earnings and income sources",
    Boundaries: "Manage regional limits and operational areas",
    Charging: "Track EV charging sessions and power usage",
    Payroll: "View and manage driver salary details",
    Ledger: "Comprehensive record of all transactions",
    Drivers: "Overview and management of all registered drivers",
    Vehicles: "Track and maintain vehicle information",
    Shift: "Manage driver schedules and shifts",
    "Alert Log": "Review system alerts and notifications",
    "Charging Module": "Manage charging infrastructure and stations",
  };

  const mainMenu = [
    { text: "Fleet Map", icon: <MapTwoTone />, path: "/fleet-map" },
    { text: "Dashboard", icon: <GridViewRounded />, path: "/dashboard" },
    {
      text: "Finance",
      icon: <PaymentsRounded />,
      submenu: [
        { text: "Revenue", path: "/finance/revenue" },
        { text: "Boundaries", path: "/finance/boundaries" },
        { text: "Charging", path: "/finance/charging" },
        { text: "Payroll", path: "/finance/payroll" },
        { text: "Ledger", path: "/finance/ledger" },
      ],
    },
    { text: "Drivers", icon: <PeopleAltRounded />, path: "/drivers" },
    {
      text: "Vehicles",
      icon: <DirectionsCarFilledRounded />,
      path: "/vehicles",
    },
    { text: "Shift", icon: <EventRounded />, path: "/shift" },
    { text: "Alert Log", icon: <ReportRounded />, path: "/alert-log" },
    {
      text: "Charging Module",
      icon: <EvStationRounded />,
      path: "/charging-module",
    },
  ];

  const toggleMenu = (menuText: string) => {
    setExpandedMenu(expandedMenu === menuText ? null : menuText);
  };

  const handleNavigation = (text: string, path?: string) => {
    setSelectedPage(text);
    if (path) router.push(path);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className="flex flex-col w-60 h-screen px-3.5 bg-[#121212] font-light text-white/40 shadow-lg"
        style={{ width: drawerWidth }}
      >
        {/* LOGO */}
        <div className="flex justify-center items-center mt-7 mb-6 cursor-pointer">
          <Image src="/eve-icon.svg" alt="Logo" width={150} height={150} />
        </div>

        <hr className="border-[#ffffff2d] mb-4" />

        {/* MENU ITEMS */}
        <nav className="flex-1">
          {mainMenu.map(({ text, icon, path, submenu }) => {
            const isSelected = selectedPage === text;
            const isExpanded = expandedMenu === text;
            const hasSubmenu = !!submenu;

            return (
              <div key={text}>
                <button
                  onClick={() => {
                    handleNavigation(text, path);
                    if (hasSubmenu) toggleMenu(text);
                  }}
                  className={`flex items-center justify-between w-full px-4 py-3 mb-1 text-left rounded-2xl transition-colors duration-200
                    ${
                      isSelected
                        ? "bg-[#222222] border font-medium border-[#2E2E2E] text-[#D6B600]"
                        : "hover:bg-white/10"
                    }`}
                >
                  <div className="flex items-center">
                    <span
                      className={`mr-3 ${
                        isSelected ? "text-[#D6B600]" : "text-white"
                      }`}
                    >
                      {icon}
                    </span>
                    <span
                      className={`${
                        isSelected ? "text-[#D6B600]" : "text-white"
                      }`}
                    >
                      {text}
                    </span>
                  </div>
                  {hasSubmenu && (
                    <span className="ml-2 text-white text-sm">
                      {isExpanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </span>
                  )}
                </button>

                {/* Submenu */}
                {hasSubmenu && isExpanded && (
                  <div className="ml-8 flex flex-col border-l border-[#2E2E2E] pl-4">
                    {submenu!.map(({ text: subText, path: subPath }) => (
                      <button
                        key={subText}
                        onClick={() => handleNavigation(subText, subPath)}
                        className={`flex items-center text-sm px-3 py-2 mb-1 rounded-lg text-left transition-colors duration-200
                          ${
                            selectedPage === subText
                              ? "bg-[#222222] text-[#D6B600] font-medium"
                              : "hover:bg-white/10 text-white font-normal"
                          }`}
                      >
                        {subText}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <hr className="border-[#ffffff2d] mb-4" />

        {/* PROFILE BUTTON AT BOTTOM */}
        <div className="mt-auto mb-4">
          <button
            className="flex items-center justify-between w-full px-4 py-3 text-left rounded-2xl bg-[#FFFFFF]/4 border border-[#ffffff]/4 shadow-inner"
            style={{ boxShadow: "inset 0 1px 0 #ffffff40" }}
            onClick={handleLogout}
          >
            <div className="flex items-center">
              <span className="mr-3 border-4 border-[#ffffff] rounded-2xl overflow-hidden">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Profile"
                  className="w-8 h-8 object-cover"
                />
              </span>
              <span className="text-white font-medium">Admin User</span>
            </div>
            <LogoutRounded className="text-white cursor-pointer hover:text-[#D6B600] transition-colors duration-200" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top AppBar */}
        <header className="fixed top-0 left-60 right-0 h-20 bg-white shadow flex flex-col justify-center px-6 z-10">
          <h1 className="text-xl text-black font-semibold">{selectedPage}</h1>
          <p className="text-gray-500 text-sm mt-1">
            {subtitles[selectedPage] || "Page description goes here."}
          </p>
        </header>

        {/* Page Content */}
        {/* <main className="mt-20 p-6 flex-1 bg-gray-100 overflow-auto">
          {children}
        </main> */}
      </div>
    </div>
  );
}
