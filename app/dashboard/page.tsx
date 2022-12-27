"use client";

import { useState } from "react";

import FileDropzone from "dashboard/components/Dropzone";
import SpinLoader from "components/SpinLoader";
import TurnoverGraph, {
  TurnoverGraphData,
} from "dashboard/components/TurnoverGraph";
import TurnoverCategories from "./components/TurnoverCategories";

export interface TurnoverData {
  [key: string]: TurnoverGraphData[];
}

export default function Dashboard() {
  const [isInvalidFormat, setIsInvalidFormat] = useState<boolean>(false);
  const [onLoading, setOnLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [turnoverData, setTurnoverData] = useState<TurnoverData | null>(null);
  const [turnoverGraphData, setTurnoverGraphData] = useState<
    TurnoverGraphData[] | null
  >(null);

  const onAnalyze = async (file: File) => {
    setTurnoverGraphData(null);
    setError(null);
    setOnLoading(true);

    if (!file) return;
    let formData = new FormData();
    formData.append("file", file);

    try {
      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}api/turnover`,
        {
          method: "POST",
          body: formData,
        }
      );
      const json = await resp.json();

      setTurnoverData(json.data);
      // set first entry as default data
      const [turnover] = Object.keys(json.data);
      setTurnoverGraphData(json.data[turnover] ?? null);
    } catch (error) {
      console.error(error);
      setError("Something went wrong, please try again later");
    }
    setOnLoading(false);
  };

  return (
    <div className="w-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h4>Analyze your company turnover by using our template!</h4>
        <a className="main-btn" href="template.xlsx" download>
          Download Template
        </a>
      </div>
      <form encType="multipart/form-data" className="flex flex-col">
        <FileDropzone
          onAnalyze={onAnalyze}
          onLoading={onLoading}
          isInvalidFormat={isInvalidFormat}
          setIsInvalidFormat={setIsInvalidFormat}
        />
      </form>
      {error && (
        <span className="self-center mt-2 font-montserrat-bold text-red-400">
          {error}
        </span>
      )}
      {onLoading && <SpinLoader />}
      {turnoverData && (
        <TurnoverCategories
          categories={turnoverData}
          activeCategory={turnoverGraphData}
          setActiveCategories={setTurnoverGraphData}
        />
      )}
      {turnoverGraphData && <TurnoverGraph data={turnoverGraphData} />}
    </div>
  );
}
