"use client";

import { AppContext } from "context";
import { useContext, useEffect, useRef } from "react";
import {
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Scatter,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

const BAR_PALLET = [
  "#576F72",
  "#E4DCCF",
  "#7D9D9C",
  "#C4DFAA",
  "#FD8A8A",
  "#65647C",
  "#F1F7B5",
  "#9EA1D4",
];
const CURRENCY_OPTION: Intl.NumberFormatOptions = {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
};

declare type CustomTooltipProps<
  MyValue extends ValueType,
  MyName extends NameType
> = TooltipProps<MyValue, MyName> & {
  useCurrency: boolean;
};

const CustomTooltip = ({
  active,
  payload,
  label,
  useCurrency,
}: CustomTooltipProps<ValueType, NameType>) => {
  if (!active) return null;

  let data = payload?.[0]?.value ?? 0;
  let average = payload?.[0]?.payload?.["average"] ?? 0;

  if (useCurrency) {
    data = data && Number(data).toLocaleString("id-ID", CURRENCY_OPTION);
    average =
      average && Number(average).toLocaleString("id-ID", CURRENCY_OPTION);
  }

  return (
    <div
      className=" p-2 text-secondary"
      style={{ background: "rgba(80,80,80,0.7)" }}
    >
      <p className="text-secondary flex flex-col">
        <span className="font-montserrat-bold text-lime-400">
          {label ?? payload?.[0]?.name}
        </span>
        <span>Current: {data}</span>
        <span className=" text-orange-200">
          {average ? `Average: ${average}` : ""}
        </span>
      </p>
    </div>
  );
};

export default function PerformanceGraph() {
  const { performance } = useContext(AppContext);
  const ref = useRef<HTMLDivElement>(null);

  const formatYLabel = (value: number) => {
    if (!performance.isUseCurrency) return value.toString();
    return value.toLocaleString("id-ID", CURRENCY_OPTION);
  };

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [performance.performanceGraphData]);

  return (
    <div ref={ref}>
      <ResponsiveContainer width={"100%"} height={300}>
        <ComposedChart
          margin={{ left: 24 }}
          data={performance.performanceGraphData ?? []}
        >
          <XAxis dataKey={"label"} />
          <YAxis tick={{ fontSize: 10 }} tickFormatter={formatYLabel} />
          <Tooltip
            content={<CustomTooltip useCurrency={performance.isUseCurrency} />}
          />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Bar dataKey={"current"}>
            {performance.performanceGraphData?.map((_, idx) => (
              <Cell
                key={`cell-${idx}`}
                fill={BAR_PALLET[idx % BAR_PALLET.length]}
              />
            ))}
          </Bar>
          <Scatter
            dataKey={"average"}
            data={performance.performanceGraphData ?? []}
            fill="#F29393"
          />
        </ComposedChart>
      </ResponsiveContainer>
      <div className="mt-20 flex justify-start items-start">
        <div>
          <h4 className="font-montserrat-bold text-lg mb-2 border-b-grey-light border-b-2">
            Summary
          </h4>
          <p>
            Total:{" "}
            <span className="text-accent font-montserrat-bold">
              {performance.isUseCurrency
                ? Number(performance.performanceSummary?.total).toLocaleString(
                    "id-ID",
                    CURRENCY_OPTION
                  )
                : performance.performanceSummary?.total}
            </span>
          </p>
        </div>
        <ResponsiveContainer width={"60%"} height={300}>
          <PieChart>
            <Pie
              data={performance.performanceGraphData ?? []}
              dataKey={"current"}
              nameKey={"label"}
              cx="50%"
              cy="50%"
              outerRadius={150}
              // innerRadius={75}
            >
              {performance.performanceGraphData?.map((_, idx) => (
                <Cell
                  key={`cell-${idx}`}
                  fill={BAR_PALLET[idx % BAR_PALLET.length]}
                />
              ))}
            </Pie>
            <Tooltip
              content={
                <CustomTooltip useCurrency={performance.isUseCurrency} />
              }
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex-grow">
          <h4 className="font-montserrat-bold text-lg mb-2 border-b-grey-light border-b-2">
            Legends
          </h4>
          <ul>
            {performance.performanceGraphData?.map((data, idx) => (
              <li
                key={idx}
                className="flex justify-between w-full items-center"
              >
                {data.label}
                <div
                  className="h-2 w-4"
                  style={{
                    backgroundColor: BAR_PALLET[idx % BAR_PALLET.length],
                  }}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
