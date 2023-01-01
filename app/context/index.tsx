"use client";

import React, { createContext, Dispatch, useReducer } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { IMainActions, mainReducer, IMainState } from "./reducers/main";
import {
  IPerformanceActions,
  performanceReducer,
  IPerformanceState,
} from "./reducers/performance";

type InitialStateType = {
  main: IMainState;
  performance: IPerformanceState;
};

const initialState: InitialStateType = {
  main: {
    isSidebarOpen: false,
    dashboardPages: [
      {
        label: "Dashboard",
        ico: <AiOutlineHome />,
        link: "/dashboard",
      },
    ],
    activeDashboardPage: {
      label: "Dashboard",
      ico: <AiOutlineHome />,
      link: "/dashboard",
    },
  },
  performance: {
    performanceGraphData: null,
    isUseCurrency: true,
    performanceData: null,
    isLoading: false,
    isInvalidFormat: false,
    errorMessage: null,
  },
};

const AppContext = createContext<{
  main: IMainState;
  performance: IPerformanceState;
  mainDispatch: Dispatch<IMainActions>;
  performanceDispatch: Dispatch<IPerformanceActions>;
}>({
  main: initialState.main,
  performance: initialState.performance,
  mainDispatch: () => null,
  performanceDispatch: () => null,
});

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mainState, mainDispatch] = useReducer(
    (main: IMainState, actions: IMainActions) => mainReducer(main, actions),
    initialState.main
  );
  const [performanceState, performanceDispatch] = useReducer(
    (performance: IPerformanceState, actions: IPerformanceActions) =>
      performanceReducer(performance, actions),
    initialState.performance
  );

  return (
    <AppContext.Provider
      value={{
        main: mainState,
        performance: performanceState,
        mainDispatch,
        performanceDispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
