export const turnoverReducer = (
  state: TurnoverState,
  action: TurnoverActions
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

export interface TurnoverState {
  turnoverGraphData: TurnoverGraphData[] | null;
  turnoverData: TurnoverData | null;
  isLoading: boolean;
  isInvalidFormat: boolean;
  errorMessage: string | null;
}

export type TurnoverActions =
  | { type: "SET_TURNOVER_GRAPH_DATA"; payload: TurnoverGraphData[] | null }
  | { type: "SET_TURNOVER_DATA"; payload: TurnoverData | null }
  | { type: "SET_TURNOVER_LOADING"; status: boolean }
  | { type: "SET_INVALID_TURNOVER_PAYLOAD"; status: boolean }
  | { type: "SET_TURNOVER_ERROR_MESSAGE"; message: string | null };

export interface TurnoverData {
  [key: string]: TurnoverGraphData[];
}

export interface TurnoverGraphData {
  label: string;
  data: number;
}
