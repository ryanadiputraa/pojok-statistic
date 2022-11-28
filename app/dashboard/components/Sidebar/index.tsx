import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import { RiArrowLeftRightLine } from "react-icons/ri";

import { Page } from "../../layout";

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  selected: Page;
  setSelected: Dispatch<SetStateAction<Page>>;
  pages: Page[];
}

export default function Sidebar({
  isOpen,
  setIsOpen,
  selected,
  setSelected,
  pages,
}: Props) {
  const [animateRotate, setAnimateRotate] = useState(false);

  return (
    <nav
      className={`transition-all duration-500 bg-primary text-secondary fixed sm:left-0 top-0 min-h-screen flex flex-col gap-6 px-4 py-6 ${
        isOpen
          ? "w-3/4 sm:w-80 left-0 items-start"
          : "w-3/4 sm:w-20 left-[-100%] sm:right-auto items-start sm:items-center"
      }`}
    >
      <div className="flex items-center gap-2">
        <Image src="/favicon.ico" width={20} height={20} alt="" />
        <h1
          className={`font-montserratBold text-lg md:text-2xl whitespace-nowrap ${
            !isOpen ? "inline sm:hidden" : ""
          }`}
        >
          Pojok Statistic
        </h1>
      </div>
      <button
        className={`bg-accent text-montserratBold text-secondary w-10 h-10 grid place-items-center p-2 rounded-full self-end relative left-10 shadow-xl hover:brightness-95 ${
          animateRotate ? "animate-rotate" : ""
        }`}
        onClick={() => {
          setIsOpen(!isOpen);
          setAnimateRotate(true);
        }}
        onAnimationEnd={() => setAnimateRotate(false)}
      >
        <RiArrowLeftRightLine className=" w-full h-full" />
      </button>
      <div
        className={`flex flex-col ${
          isOpen ? "items-start" : "items-start sm:items-center"
        } w-full text-md`}
      >
        <span className="text-grey mb-1">Menu</span>
        <ul className="w-full">
          {pages.map((item, idx) => (
            <Link href={item.link}>
              <li
                key={idx}
                className={`flex items-center ${
                  !isOpen ? "sm:justify-center sm:py-2" : ""
                } gap-2 mb-1 px-2 py-1 rounded-md cursor-pointer hover:bg-primaryLight ${
                  selected === item ? "bg-primaryLight font-montserratBold" : ""
                }`}
                onClick={() => setSelected(item)}
              >
                {item.ico}{" "}
                <span className={!isOpen ? "inline sm:hidden" : ""}>
                  {item.label}
                </span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </nav>
  );
}
