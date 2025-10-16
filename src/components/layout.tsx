import Sidebar from "./sidebar";
import { useRouter } from "next/router";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col w-full h-auto min-h-screen">
      <div className="top-0 sticky z-50">
        <Sidebar />
      </div>
      <div className="flex flex-1 w-full h-fit justify-center bg-[#E9EBEF]">
        {children}
      </div>
    </div>
  );
}
