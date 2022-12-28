import { ITurnoverData, ITurnoverGraphData } from "context/reducers/turnover";

interface Props {
  categories: ITurnoverData;
  selectedGraph: ITurnoverGraphData[] | null;
  selectGraph: (data: ITurnoverGraphData[]) => void;
}

export default function TurnoverCategories({
  categories,
  selectedGraph,
  selectGraph,
}: Props) {
  return (
    <li className="grid gap-2 grid-cols-auto-fill my-6">
      {Object.keys(categories).map((category) => (
        <ul
          key={category}
          className={`${
            selectedGraph === categories[category] ? "main" : "secondary"
          }-btn capitalize text-xs rounded-3xl`}
          onClick={() => selectGraph(categories[category])}
        >
          {category.split("_").join(" ")}
        </ul>
      ))}
    </li>
  );
}
