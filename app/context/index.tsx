"use client";

import React, { createContext, Dispatch, useReducer } from "react";
import { AiOutlineHome, AiOutlineSetting } from "react-icons/ai";
import { IMainActions, mainReducer, IMainState } from "./reducers/main";
import {
  ITurnoverActions,
  turnoverReducer,
  ITurnoverState,
} from "./reducers/turnover";

type InitialStateType = {
  main: IMainState;
  turnover: ITurnoverState;
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
  turnover: {
    turnoverGraphData: null,
    turnoverData: null,
    isLoading: false,
    isInvalidFormat: false,
    errorMessage: null,
  },
};

const AppContext = createContext<{
  main: IMainState;
  turnover: ITurnoverState;
  mainDispatch: Dispatch<IMainActions>;
  turnoverDispatch: Dispatch<ITurnoverActions>;
}>({
  main: initialState.main,
  turnover: initialState.turnover,
  mainDispatch: () => null,
  turnoverDispatch: () => null,
});

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mainState, mainDispatch] = useReducer(
    (main: IMainState, actions: IMainActions) => mainReducer(main, actions),
    initialState.main
  );
  const [turnoverState, turnoverDispatch] = useReducer(
    (turnover: ITurnoverState, actions: ITurnoverActions) =>
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
