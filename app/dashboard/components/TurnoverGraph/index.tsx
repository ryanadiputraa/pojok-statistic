"use client";

import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

const barPallete = ["#F8B195", "#F67280", "#C06C84", "#6C5B7B"];

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
  const value = useCurrency
    ? Number(payload?.[0].value).toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
      })
    : payload?.[0].value;

  return (
    <div
      className=" p-2 text-secondary"
      style={{ background: "rgba(80,80,80,0.8)" }}
    >
      <p className="text-secondary">{`${label} : ${value}`}</p>
    </div>
  );
};

export interface TurnoverGraphData {
  label: string;
  data: number;
}

interface Props {
  data: TurnoverGraphData[];
}

export default function TurnoverGraph({ data }: Props) {
  const [useCurrency, setUseCurrency] = useState<boolean>(false);

  const formatYLabel = (value: number) => {
    if (!useCurrency) return value.toString();
    return value.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    });
  };

  return (
    <div className="flex justify-between items-start py-4">
      <ResponsiveContainer width={"90%"} height={300}>
        <BarChart margin={{ left: 24 }} data={data}>
          <XAxis dataKey={"label"} />
          <YAxis tick={{ fontSize: 11 }} tickFormatter={formatYLabel} />
          <Tooltip content={<CustomTooltip useCurrency={useCurrency} />} />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Bar dataKey={"data"}>
            {data.map((_, idx) => (
              <Cell key={`cell-${idx}`} fill={barPallete[idx % 4]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <button
        onClick={() => setUseCurrency(!useCurrency)}
        className={`${useCurrency ? "main-btn" : "secondary-btn"} text-xs`}
      >
        Use Rupiah
      </button>
    </div>
  );
}