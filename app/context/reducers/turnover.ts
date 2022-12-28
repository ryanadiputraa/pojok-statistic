export const turnoverReducer = (
  state: ITurnoverState,
  action: ITurnoverActions
) => {
  switch (action.type) {
    case "SET_TURNOVER_GRAPH_DATA":
      return {
        ...state,
        turnoverGraphData: action.payload,
      };

    case "SET_TURNOVER_DATA":
      return {
        ...state,
        turnoverData: action.payload,
      };

    case "SET_TURNOVER_LOADING":
      return {
        ...state,
        isLoading: action.status,
      };

    case "SET_INVALID_TURNOVER_PAYLOAD":
      return {
        ...state,
        isInvalidFormat: action.status,
      };

    case "SET_TURNOVER_ERROR_MESSAGE":
      return {
        ...state,
        errorMessage: action.message,
      };

    default:
      return state;
  }
};

export interface ITurnoverState {
  turnoverGraphData: ITurnoverGraphData[] | null;
  turnoverData: ITurnoverData | null;
  isLoading: boolean;
  isInvalidFormat: boolean;
  errorMessage: string | null;
}

export type ITurnoverActions =
  | { type: "SET_TURNOVER_GRAPH_DATA"; payload: ITurnoverGraphData[] | null }
  | { type: "SET_TURNOVER_DATA"; payload: ITurnoverData | null }
  | { type: "SET_TURNOVER_LOADING"; status: boolean }
  | { type: "SET_INVALID_TURNOVER_PAYLOAD"; status: boolean }
  | { type: "SET_TURNOVER_ERROR_MESSAGE"; message: string | null };

export interface ITurnoverData {
  [key: string]: ITurnoverGraphData[];
}

export interface ITurnoverGraphData {
  label: string;
  data: number;
}
