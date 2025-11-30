import { useReducer, useEffect } from "react";
import { useProcesses, type ProcessesResponse } from "./use-processes";
import { updateItemInData } from "../lib/update-item";

export type ItemType = "task" | "subprocess" | "process";

type DataAction =
  | { type: "SET_DATA"; payload: ProcessesResponse }
  | {
      type: "UPDATE_ITEM";
      itemType: ItemType;
      id: string;
      payload: any;
    };

function dataReducer(
  state: ProcessesResponse | null,
  action: DataAction
): ProcessesResponse | null {
  switch (action.type) {
    case "SET_DATA":
      return action.payload;
    case "UPDATE_ITEM":
      if (!state) return state;
      return updateItemInData(
        state,
        action.itemType,
        action.id,
        action.payload
      );
    default:
      return state;
  }
}

export function useDataReducer() {
  const { data, loading, error } = useProcesses();
  const [state, dispatch] = useReducer(dataReducer, null);

  useEffect(() => {
    if (data) {
      dispatch({ type: "SET_DATA", payload: data });
    }
  }, [data]);

  return { data: state, loading, error, dispatch };
}
