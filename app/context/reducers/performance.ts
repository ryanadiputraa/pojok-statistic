export const performanceReducer = (
  state: IPerformanceState,
  action: IPerformanceActions
) => {
  switch (action.type) {
    case "SET_PERFORMANCE_GRAPH_DATA":
      return {
        ...state,
        performanceGraphData: action.payload,
      };

    case "TOGGLE_USE_CURRENCY":
      return {
        ...state,
        isUseCurrency: !state.isUseCurrency,
      };

    case "SET_PERFORMANCE_DATA":
      return {
        ...state,
        performanceData: action.payload,
      };

    case "SET_PERFORMANCE_LOADING":
      return {
        ...state,
        isLoading: action.status,
      };

    case "SET_INVALID_PERFORMANCE_PAYLOAD":
      return {
        ...state,
        isInvalidFormat: action.status,
      };

    case "SET_PERFORMANCE_ERROR_MESSAGE":
      return {
        ...state,
        errorMessage: action.message,
      };

    default:
      return state;
  }
};

export interface IPerformanceState {
  performanceGraphData: IPerformanceGraphData[] | null;
  isUseCurrency: boolean;
  performanceData: IPerformanceData | null;
  isLoading: boolean;
  isInvalidFormat: boolean;
  errorMessage: string | null;
}

export type IPerformanceActions =
  | {
      type: "SET_PERFORMANCE_GRAPH_DATA";
      payload: IPerformanceGraphData[] | null;
    }
  | { type: "TOGGLE_USE_CURRENCY" }
  | { type: "SET_PERFORMANCE_DATA"; payload: IPerformanceData | null }
  | { type: "SET_PERFORMANCE_LOADING"; status: boolean }
  | { type: "SET_INVALID_PERFORMANCE_PAYLOAD"; status: boolean }
  | { type: "SET_PERFORMANCE_ERROR_MESSAGE"; message: string | null };

export interface IPerformanceData {
  summary: IPerformanceSummary;
  performance: {
    [key: string]: IPerformanceGraphData[];
  };
}

export interface IPerformanceSummary {
  total: number;
  average: number;
}

export interface IPerformanceGraphData {
  label: string;
  current: number;
  average?: number;
}
