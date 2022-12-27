"use client";

import { useState } from "react";

import FileDropzone from "dashboard/components/Dropzone";
import SpinLoader from "components/SpinLoader";
import TurnoverBar, { TurnoverData } from "dashboard/components/TurnoverBar";

export default function Dashboard() {
  const [isInvalidFormat, setIsInvalidFormat] = useState<boolean>(false);
  const [onLoading, setOnLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [turnoverData, setTurnoverData] = useState<TurnoverData[] | null>(null);

  const onAnalyze = async (file: File) => {
    setTurnoverData(null);
    setError(null);
    setOnLoading(true);

    if (!file) return;
    let formData = new FormData();
    formData.append("file", file);

    try {
      const resp = await fetch("https://makudonaro.pythonanywhere.com/api/turnover", {
        method: "POST",
        body: formData,
      });
      const json = await resp.json();
      setTurnoverData(json.data?.customer_typetotal ?? null);
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
        <span className="self-center mt-2 font-montserratBold text-red-400">
          {error}
        </span>
      )}
      {onLoading && <SpinLoader />}
      {turnoverData && <TurnoverBar data={turnoverData} />}
    </div>
  );
}
