import { Dispatch, SetStateAction } from "react";

import { TurnoverData } from "dashboard/page";
import { TurnoverGraphData } from "dashboard/components/TurnoverGraph";

interface Props {
  categories: TurnoverData;
  activeCategory: TurnoverGraphData[] | null;
  setActiveCategories: Dispatch<SetStateAction<TurnoverGraphData[] | null>>;
}

export default function TurnoverCategories({
  categories,
  activeCategory,
  setActiveCategories,
}: Props) {
  return (
    <li className="grid gap-2 grid-cols-auto-fill my-6">
      {Object.keys(categories).map((category) => (
        <ul
          key={category}
          className={`${
            activeCategory === categories[category] ? "main" : "secondary"
          }-btn capitalize text-xs`}
          onClick={() => setActiveCategories(categories[category])}
        >
          {category.split("_").join(" ")}
        </ul>
      ))}
    </li>
  );
}
