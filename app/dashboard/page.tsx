"use client";

import { useContext } from "react";

import { AppContext } from "context";
import FileDropzone from "dashboard/components/Dropzone";
import SpinLoader from "components/SpinLoader";
import PerformanceGraph from "dashboard/components/PerformanceGraph";

export default function Dashboard() {
  const { performance, performanceDispatch } = useContext(AppContext);

  const onSubmit = async (file: File) => {
    performanceDispatch({ type: "SET_PERFORMANCE_GRAPH_DATA", payload: null });
    performanceDispatch({
      type: "SET_PERFORMANCE_ERROR_MESSAGE",
      message: null,
    });
    performanceDispatch({ type: "SET_PERFORMANCE_LOADING", status: true });

    if (!file) return;
    let formData = new FormData();
    formData.append("file", file);

    try {
      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}api/performance`,
        {
          method: "POST",
          body: formData,
        }
      );
      const json = await resp.json();
      const dataKeys = Object.keys(json.data?.performance);
      // set first entry as default data
      const firstDataKey = dataKeys[0];

      performanceDispatch({
        type: "SET_PERFORMANCE_GRAPH_DATA",
        payload: json.data?.performance?.[firstDataKey] ?? null,
      });
      performanceDispatch({ type: "SET_PERFORMANCE_DATA", payload: json.data });
    } catch (error) {
      console.error(error);
      performanceDispatch({
        type: "SET_PERFORMANCE_ERROR_MESSAGE",
        message: "Something went wrong, please try again later",
      });
    }
    performanceDispatch({ type: "SET_PERFORMANCE_LOADING", status: false });
  };

  return (
    <div className="w-full flex flex-col pb-4">
      <div className="flex justify-between items-center mb-3">
        <h4>Analyze your company performance by using our template!</h4>
        <a className="main-btn text-xs" href="template.xlsx" download>
          Download Template
        </a>
      </div>
      <form encType="multipart/form-data" className="flex flex-col">
        <FileDropzone
          onSubmit={onSubmit}
          isLoading={performance.isLoading}
          isInvalidFormat={performance.isInvalidFormat}
          setIsInvalidFormat={(status: boolean) =>
            performanceDispatch({
              type: "SET_INVALID_PERFORMANCE_PAYLOAD",
              status: status,
            })
          }
        />
      </form>
      {performance.errorMessage && (
        <span className="self-center mt-2 font-montserrat-bold text-red-400">
          {performance.errorMessage}
        </span>
      )}
      {performance.isLoading && <SpinLoader />}
      {performance.performanceGraphData && <PerformanceGraph />}
    </div>
  );
}
