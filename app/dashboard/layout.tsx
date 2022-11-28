"use client";

import { ReactElement, useState } from "react";
import { AiOutlineHome, AiOutlineSetting } from "react-icons/ai";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

enum PageList {
  Dashboard = "Dashboard",
  Settings = "Settings",
}

export interface Page {
  label: PageList;
  ico: ReactElement;
  link: string;
}

const pages: Page[] = [
  { label: PageList.Dashboard, ico: <AiOutlineHome />, link: "/dashboard" },
  {
    label: PageList.Settings,
    ico: <AiOutlineSetting />,
    link: "/dashboard/settings",
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
        {children}
      </main>
    </div>
  );
}
