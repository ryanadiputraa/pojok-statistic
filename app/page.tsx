"use client";

import { ReactElement, useState } from "react";
import { AiOutlineHome, AiOutlineSetting } from "react-icons/ai";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

export enum PageList {
  Dashboard = "Dashboard",
  Settings = "Settings",
}

export interface Page {
  label: PageList;
  ico: ReactElement;
}

const pages: Page[] = [
  { label: PageList.Dashboard, ico: <AiOutlineHome /> },
  { label: PageList.Settings, ico: <AiOutlineSetting /> },
];

export default function Home() {
  const [isSideBarOpen, setIsSidebarOpen] = useState<boolean>(
    screen.width >= 640
  );
  const [selectedPage, setSelectedPage] = useState<Page>(pages[0]);

  return (
    <div
      className={`flex ${
        isSideBarOpen ? "sm:pl-80" : "sm:pl-20"
      } transition-all duration-500`}
    >
      <Sidebar
        isOpen={isSideBarOpen}
        setIsOpen={setIsSidebarOpen}
        selected={selectedPage}
        setSelected={setSelectedPage}
        pages={pages}
      />
      <main className="bg-secondary w-screen h-screen px-4 sm:px-10">
        <Header title={selectedPage} />
      </main>
    </div>
  );
}
