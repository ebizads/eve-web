import React from "react";
import Sidebar from "./sidebar";
import Header from "./header";

export default function Layout({ children }: { children: React.ReactNode }) 
 {
  return (
    <div className="flex w-screen h-screen overflow-hidden">
      {/* SIDEBAR */}
      <aside className="w-60 h-full sticky top-0">
        <Sidebar />
      </aside>

      <div className="flex flex-col flex-1 overflow-y-auto bg-gray-100">
        <Header />
        <main className="flex-1 pt-12 px-6">{children}</main>
      </div>
    </div>
  );
}
