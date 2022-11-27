"use client";

import { useState } from "react";
import Sidebar, { NavLabel } from "./components/Sidebar/page";

export default function Home() {
  const [isSideBarOpen, setIsSidebarOpen] = useState(screen.width >= 640);

  return (
    <div className="flex">
      <Sidebar
        isOpen={isSideBarOpen}
        setIsOpen={setIsSidebarOpen}
        selected={NavLabel.Home}
      />
      <main className="bg-secondary w-screen h-screen"></main>
    </div>
  );
}
