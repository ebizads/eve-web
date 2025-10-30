import React from "react";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();
  const path = router.asPath;

  // 🔹 Map routes to titles and subtitles
  const pageInfo: Record<string, { title: string; subtitle: string }> = {
    "/Dashboard": {
      title: "Dashboard",
      subtitle: "Overview of fleet performance and system status",
    },
    "/Fleetmap": {
      title: "Fleet Map",
      subtitle: "Real-time monitoring of vehicle locations and routes",
    },
    "/finance/revenue": {
      title: "Revenue",
      subtitle: "Detailed breakdown of earnings and income sources",
    },
    "/finance/boundaries": {
      title: "Boundaries",
      subtitle: "Manage regional limits and operational areas",
    },
    "/finance/charging": {
      title: "Charging",
      subtitle: "Track EV charging sessions and power usage",
    },
    "/finance/payroll": {
      title: "Payroll",
      subtitle: "View and manage driver salary details",
    },
    "/finance/ledger": {
      title: "Ledger",
      subtitle: "Comprehensive record of all transactions",
    },
    "/drivers": {
      title: "Drivers",
      subtitle: "Overview and management of all registered drivers",
    },
    "/vehicles": {
      title: "Vehicles",
      subtitle: "Track and maintain vehicle information",
    },
    "/shift": {
      title: "Shift",
      subtitle: "Manage driver schedules and shifts",
    },
    "/alert-log": {
      title: "Alert Log",
      subtitle: "Review system alerts and notifications",
    },
    "/charging-module": {
      title: "Charging Module",
      subtitle: "Manage charging infrastructure and stations",
    },
  };

  // 🔹 Match route
  const current = pageInfo[path] || {
    title: "Dashboard",
    subtitle: "Welcome back",
  };

  return (
    <header className="sticky top-0 h-16 bg-white shadow flex flex-col justify-center p-10 z-10">
      <h1 className="text-xl text-black font-semibold">{current.title}</h1>
      <p className="text-gray-500 text-sm">{current.subtitle}</p>
    </header>
  );
}
