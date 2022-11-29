"use client";

import { useState } from "react";

import FileDropzone from "dashboard/components/Dropzone";

export default function Dashboard() {
  const [file, setFile] = useState<File | null>(null);
  const [isInvalidFormat, setIsInvalidFormat] = useState<boolean>(false);

  const onAnalyze = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    try {
      const resp = await fetch("http://localhost:8080/api/turnover", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });
      console.log(resp);
    } catch (error) {
      console.error(error);
      // REMOVE LATER
      alert("API BELUM JALAN PAK");
    }
  };

  return (
    <div className="w-full flex flex-col">
      <div className="flex justify-between items-center">
        <h4>Analyze your company turnover by using our template!</h4>
        <a className="main-btn" href="template.xlsx" download>
          Download Template
        </a>
      </div>
      <FileDropzone
        setFile={setFile}
        isInvalidFormat={isInvalidFormat}
        setIsInvalidFormat={setIsInvalidFormat}
      />
      <button
        disabled={!file || isInvalidFormat}
        className={`main-btn self-center mt-2 ${
          !file || isInvalidFormat ? "grayscale" : ""
        }`}
        onClick={onAnalyze}
      >
        Analyze
      </button>
    </div>
  );
}
