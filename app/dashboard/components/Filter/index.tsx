import { useContext } from "react";

import { AppContext } from "context";

export default function Filter() {
  const { performance, performanceDispatch } = useContext(AppContext);

  if (!performance.performanceData) return null;
  return (
    <div className="flex flex-wrap text-sm gap-4 my-4">
      <select
        className="secondary-btn"
        onChange={(e) =>
          performanceDispatch({
            type: "SET_PERFORMANCE_GRAPH_DATA",
            payload:
              performance.performanceData?.performance?.[e.target.value] ??
              null,
          })
        }
      >
        {Object.keys(performance.performanceData.performance).map((key) => (
          <option key={key} value={key}>
            {key.replace("-", " - ")}
          </option>
        ))}
      </select>
      <button
        onClick={() => performanceDispatch({ type: "TOGGLE_USE_CURRENCY" })}
        className={`${
          performance.isUseCurrency ? "main-btn" : "secondary-btn"
        } text-xs`}
      >
        Currency
      </button>
    </div>
  );
}
