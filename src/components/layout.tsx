import React from "react";
import Sidebar from "./sidebar";
import Header from "./header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-screen h-screen overflow-hidden">
      {/* SIDEBAR */}
      <aside className="w-60 h-full sticky top-0">
        <Sidebar />
      </aside>

      <div className="flex flex-col h-full flex-1 overflow-hidden bg-gray-100">
        <Header />
        <div className="flex-1 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
