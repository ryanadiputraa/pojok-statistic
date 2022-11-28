"use client";

import { ReactElement, useState } from "react";
import { AiOutlineHome } from "react-icons/ai";

import Sidebar from "./components/Sidebar";

export enum Pages {
  Dashboard = "Dashboard",
}

export interface Page {
  label: Pages;
  ico: ReactElement;
}

const pages: Page[] = [{ label: Pages.Dashboard, ico: <AiOutlineHome /> }];

export default function Home() {
  const [isSideBarOpen, setIsSidebarOpen] = useState(screen.width >= 640);

  return (
    <div className="flex">
      <Sidebar
        isOpen={isSideBarOpen}
        setIsOpen={setIsSidebarOpen}
        selected={Pages.Dashboard}
        pages={pages}
      />
      <main className="bg-secondary w-screen h-screen"></main>
    </div>
  );
}
