import { ReactElement } from "react";

export const mainReducer = (state: IMainState, action: IMainActions) => {
  switch (action.type) {
    case "TOGGLE_SIDEBAR":
      return {
        ...state,
        isSidebarOpen: !state.isSidebarOpen,
      };

    case "SET_ACTIVE_DASHBOARD_PAGE":
      return {
        ...state,
        activeDashboardPage: action.payload,
      };

    default:
      return state;
  }
};

export interface IMainState {
  isSidebarOpen: boolean;
  dashboardPages: IPage[];
  activeDashboardPage: IPage;
}

export type IMainActions =
  | { type: "TOGGLE_SIDEBAR" }
  | { type: "SET_ACTIVE_DASHBOARD_PAGE"; payload: IPage };

export type DashboardPageList = "Dashboard" | "Settings";

export interface IPage {
  label: DashboardPageList;
  ico: ReactElement;
  link: string;
}
