import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import { RiArrowLeftRightLine } from "react-icons/ri";

import { AppContext } from "context";
import { IPage } from "context/reducers/main";
import { AiOutlineSetting } from "react-icons/ai";

export default function Sidebar() {
  const { main, mainDispatch } = useContext(AppContext);
  const [animateRotate, setAnimateRotate] = useState(false);

  const MenuBtn: React.FC<{ page: IPage; keyProp?: string }> = ({
    page,
    keyProp,
  }) => (
    <Link key={keyProp ?? ""} href={page.link}>
      <li
        className={`flex items-center text-xl gap-2 px-2 py-1 rounded-md cursor-pointer hover:bg-primary-light ${
          !main.isSidebarOpen ? "sm:justify-center sm:py-2" : ""
        } ${
          main.activeDashboardPage.label === page.label
            ? "bg-primary-light font-montserrat-bold"
            : ""
        }`}
        onClick={() =>
          mainDispatch({
            type: "SET_ACTIVE_DASHBOARD_PAGE",
            payload: page,
          })
        }
      >
        {page.ico}{" "}
        <span
          className={`text-sm ${!main.isSidebarOpen ? "inline sm:hidden" : ""}`}
        >
          {page.label}
        </span>
      </li>
    </Link>
  );

  return (
    <nav
      className={`z-50 transition-all duration-300 bg-primary text-secondary fixed sm:left-0 top-0 min-h-screen flex flex-col gap-6 pt-6 pb-4 ${
        main.isSidebarOpen
          ? "w-3/4 sm:w-64 px-4 left-0 items-start"
          : "w-3/4 sm:w-16 px-2 left-[-100%] sm:right-auto items-start sm:items-center"
      }`}
    >
      <Link href="/" className="self-center flex items-center cursor-pointer">
        <Image
          src="/logo.png"
          width="0"
          height="0"
          sizes="100vw"
          className="w-full h-auto px-2"
          alt=""
          priority
        />
      </Link>
      <button
        className={`bg-accent text-montserrat-bold text-secondary w-10 h-10 grid place-items-center p-2 rounded-full self-end relative ${
          main.isSidebarOpen ? "left-8" : "left-7"
        } bottom-14 sm:bottom-auto shadow-xl hover:brightness-95 ${
          animateRotate ? "animate-rotate" : ""
        }`}
        onClick={() => {
          mainDispatch({ type: "TOGGLE_SIDEBAR" });
          setAnimateRotate(true);
        }}
        onAnimationEnd={() => setAnimateRotate(false)}
      >
        <RiArrowLeftRightLine className=" w-full h-full" />
      </button>
      <div className="flex flex-col justify-between flex-grow w-full text-md">
        <div
          className={`w-full flex flex-col ${
            main.isSidebarOpen ? "items-start" : "items-center"
          }`}
        >
          <span className="text-grey mb-1">Menu</span>
          <ul className="w-full flex flex-col gap-1">
            {main.dashboardPages.map((page) => (
              <MenuBtn page={page} key={page.label} />
            ))}
          </ul>
        </div>
        <div className="w-full">
          <MenuBtn
            page={{
              label: "Settings",
              ico: <AiOutlineSetting />,
              link: "/dashboard/settings",
            }}
          />
        </div>
      </div>
    </nav>
  );
}
