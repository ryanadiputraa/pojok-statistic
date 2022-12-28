"use client";

import { useContext } from "react";

import { AppContext } from "context";
import Sidebar from "dashboard/components/Sidebar";
import Header from "dashboard/components/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { main } = useContext(AppContext);

  return (
    <div
      className={`flex ${
        main.isSidebarOpen ? "sm:pl-64" : "sm:pl-16"
      } transition-all duration-300`}
    >
      <Sidebar />
      <main className="w-screen h-screen px-4 sm:px-10">
        <Header title={main.activeDashboardPage} />
        {children}
      </main>
    </div>
  );
}
