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

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/"); // Redirect to login
  };

  const [expandedMenu, setExpandedMenu] = React.useState<string | null>(null);

  // const subtitles: Record<string, string> = {
  //   "Fleet Map": "Real-time monitoring of vehicle locations and routes",
  //   Dashboard: "Overview of fleet performance and system status",
  //   Finance: "Manage revenue, payroll, and expenses efficiently",
  //   Revenue: "Detailed breakdown of earnings and income sources",
  //   Boundaries: "Manage regional limits and operational areas",
  //   Charging: "Track EV charging sessions and power usage",
  //   Payroll: "View and manage driver salary details",
  //   Ledger: "Comprehensive record of all transactions",
  //   Drivers: "Overview and management of all registered drivers",
  //   Vehicles: "Track and maintain vehicle information",
  //   Shift: "Manage driver schedules and shifts",
  //   "Alert Log": "Review system alerts and notifications",
  //   "Charging Module": "Manage charging infrastructure and stations",
  // };

  const mainMenu = [
    { text: "Fleet Map", icon: <MapTwoTone />, path: "/Fleetmap" },
    { text: "Dashboard", icon: <GridViewRounded />, path: "/Dashboard" },
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

  // ✅ Determine active page from current route
  const currentPath = router.asPath;

  const isActive = (path?: string) => {
    if (!path) return false;
    // Match both exact and nested routes
    return currentPath === path || currentPath.startsWith(`${path}/`);
  };

  const handleNavigation = (
    path?: string,
    hasSubmenu?: boolean,
    text?: string
  ) => {
    if (hasSubmenu) {
      toggleMenu(text!);
    }
    if (path) router.push(path);
  };

  return (
    <div className="flex flex-col w-full h-full px-3.5 bg-[#121212] font-light text-white/40 shadow-lg">
      {/* LOGO */}
      <div className="flex justify-center items-center mt-7 mb-6 cursor-pointer">
        <Image src="/eve-icon.svg" alt="Logo" width={150} height={150} />
      </div>

      <hr className="border-[#ffffff2d] mb-4" />

      {/* MENU ITEMS */}
      <nav className="flex-1">
        {mainMenu.map(({ text, icon, path, submenu }) => {
          const activeMain =
            isActive(path) ||
            (submenu && submenu.some((item) => isActive(item.path)));
          const isExpanded = expandedMenu === text;

          return (
            <div key={text}>
              <button
                onClick={() => handleNavigation(path, !!submenu, text)}
                className={`flex items-center justify-between w-full px-4 py-3 mb-1 text-left rounded-2xl transition-colors duration-200
                    ${
                      activeMain
                        ? "bg-[#222222] border font-medium border-[#2E2E2E] text-[#D6B600]"
                        : "hover:bg-white/10"
                    }`}
              >
                <div className="flex items-center">
                  <span
                    className={`mr-3 ${
                      activeMain ? "text-[#D6B600]" : "text-white"
                    }`}
                  >
                    {icon}
                  </span>
                  <span
                    className={`${
                      activeMain ? "text-[#D6B600]" : "text-white"
                    }`}
                  >
                    {text}
                  </span>
                </div>
                {submenu && (
                  <span className="ml-2 text-white text-sm">
                    {isExpanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                  </span>
                )}
              </button>

              {submenu && isExpanded && (
                <div className="ml-8 flex flex-col border-l border-[#2E2E2E] pl-4">
                  {submenu.map(({ text: subText, path: subPath }) => {
                    const activeSub = isActive(subPath);
                    return (
                      <button
                        key={subText}
                        onClick={() => handleNavigation(subPath)}
                        className={`flex items-center text-sm px-3 py-2 mb-1 rounded-lg text-left transition-colors duration-200
                          ${
                            activeSub
                              ? "bg-[#222222] text-[#D6B600] font-medium"
                              : "hover:bg-white/10 text-white font-normal"
                          }`}
                      >
                        {subText}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <hr className="border-[#ffffff2d] mb-4" />

      {/* PROFILE BUTTON */}
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
  );
}
