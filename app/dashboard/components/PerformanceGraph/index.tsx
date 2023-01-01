"use client";

import { AppContext } from "context";
import { useContext, useState } from "react";
import {
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
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

const barPallete = ["#576F72", "#E4DCCF", "#7D9D9C", "#C4DFAA"];
const currencyOption: Intl.NumberFormatOptions = {
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

  let data = payload?.[0].value ?? 0;
  let average = payload?.[0].payload?.["average"] ?? 0;

  if (useCurrency) {
    data = data && Number(data).toLocaleString("id-ID", currencyOption);
    average =
      average && Number(average).toLocaleString("id-ID", currencyOption);
  }

  return (
    <div
      className=" p-2 text-secondary"
      style={{ background: "rgba(80,80,80,0.7)" }}
    >
      <p className="text-secondary flex flex-col">
        <span className="font-montserrat-bold text-lime-400">{label}</span>
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

  const formatYLabel = (value: number) => {
    if (!performance.isUseCurrency) return value.toString();
    return value.toLocaleString("id-ID", currencyOption);
  };

  return (
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
            <Cell key={`cell-${idx}`} fill={barPallete[idx % 4]} />
          ))}
        </Bar>
        <Scatter
          dataKey={"average"}
          data={performance.performanceGraphData ?? []}
          fill="#F29393"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
