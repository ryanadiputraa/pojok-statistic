"use client";

import { useContext } from "react";

import { AppContext } from "context";
import { ITurnoverGraphData } from "context/reducers/turnover";
import FileDropzone from "dashboard/components/Dropzone";
import SpinLoader from "components/SpinLoader";
import TurnoverGraph from "dashboard/components/TurnoverGraph";
import TurnoverCategories from "dashboard/components/TurnoverCategories";

export default function Dashboard() {
  const { turnover, turnoverDispatch } = useContext(AppContext);

  const onSubmit = async (file: File) => {
    turnoverDispatch({ type: "SET_TURNOVER_GRAPH_DATA", payload: null });
    turnoverDispatch({ type: "SET_TURNOVER_ERROR_MESSAGE", message: null });
    turnoverDispatch({ type: "SET_TURNOVER_LOADING", status: true });

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

      turnoverDispatch({ type: "SET_TURNOVER_DATA", payload: json.data });
      // set first entry as default data
      const [turnover] = Object.keys(json.data);
      turnoverDispatch({
        type: "SET_TURNOVER_GRAPH_DATA",
        payload: json.data[turnover] ?? null,
      });
    } catch (error) {
      console.error(error);
      turnoverDispatch({
        type: "SET_TURNOVER_ERROR_MESSAGE",
        message: "Something went wrong, please try again later",
      });
    }
    turnoverDispatch({ type: "SET_TURNOVER_LOADING", status: false });
  };

  return (
    <div className="w-full flex flex-col">
      <div className="flex justify-between items-center mb-3">
        <h4>Analyze your company turnover by using our template!</h4>
        <a className="main-btn text-xs" href="template.xlsx" download>
          Download Template
        </a>
      </div>
      <form encType="multipart/form-data" className="flex flex-col">
        <FileDropzone
          onSubmit={onSubmit}
          isLoading={turnover.isLoading}
          isInvalidFormat={turnover.isInvalidFormat}
          setIsInvalidFormat={(status: boolean) =>
            turnoverDispatch({
              type: "SET_INVALID_TURNOVER_PAYLOAD",
              status: status,
            })
          }
        />
      </form>
      {turnover.errorMessage && (
        <span className="self-center mt-2 font-montserrat-bold text-red-400">
          {turnover.errorMessage}
        </span>
      )}
      {turnover.isLoading && <SpinLoader />}
      {turnover.turnoverData && (
        <TurnoverCategories
          categories={turnover.turnoverData}
          selectedGraph={turnover.turnoverGraphData}
          selectGraph={(data: ITurnoverGraphData[]) =>
            turnoverDispatch({ type: "SET_TURNOVER_GRAPH_DATA", payload: data })
          }
        />
      )}
      {turnover.turnoverGraphData && <TurnoverGraph />}
    </div>
  );
}
