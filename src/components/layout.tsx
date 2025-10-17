import React from "react";
import Sidebar from "./sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-screen h-screen">
      <div className="flex top-0 sticky w-96 h-screen">
        <Sidebar />
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto">
        {/* Header */}
        <main className="flex flex-1 bg-gray-100">{children}</main>
      </div>
    </div>
  );
}
