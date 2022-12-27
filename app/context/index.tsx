"use client";

import React, { createContext, Dispatch, useReducer } from "react";
import { AiOutlineHome, AiOutlineSetting } from "react-icons/ai";
import {
  DashboardPageList,
  MainActions,
  mainReducer,
  MainState,
} from "./reducers/main";
import {
  TurnoverActions,
  turnoverReducer,
  TurnoverState,
} from "./reducers/turnover";

type InitialStateType = {
  main: MainState;
  turnover: TurnoverState;
};

const initialState: InitialStateType = {
  main: {
    isSidebarOpen: false,
    dashboardPages: [
      {
        label: DashboardPageList.Dashboard,
        ico: <AiOutlineHome />,
        link: "/dashboard",
      },
      {
        label: DashboardPageList.Settings,
        ico: <AiOutlineSetting />,
        link: "/dashboard/settings",
      },
    ],
    activeDashboardPage: {
      label: DashboardPageList.Dashboard,
      ico: <AiOutlineHome />,
      link: "/dashboard",
    },
  },
  turnover: {
    turnoverGraphData: null,
    turnoverData: null,
    isLoading: false,
    isInvalidFormat: false,
    errorMessage: null,
  },
};

const AppContext = createContext<{
  main: MainState;
  turnover: TurnoverState;
  mainDispatch: Dispatch<MainActions>;
  turnoverDispatch: Dispatch<TurnoverActions>;
}>({
  main: initialState.main,
  turnover: initialState.turnover,
  mainDispatch: () => null,
  turnoverDispatch: () => null,
});

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mainState, mainDispatch] = useReducer(
    (main: MainState, actions: MainActions) => mainReducer(main, actions),
    initialState.main
  );
  const [turnoverState, turnoverDispatch] = useReducer(
    (turnover: TurnoverState, actions: TurnoverActions) =>
      turnoverReducer(turnover, actions),
    initialState.turnover
  );

  return (
    <AppContext.Provider
      value={{
        main: mainState,
        turnover: turnoverState,
        mainDispatch,
        turnoverDispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
