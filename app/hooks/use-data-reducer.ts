import { useReducer, useEffect } from "react";
import { useProcesses, type ProcessesResponse } from "./use-processes";
import { updateItemInData } from "../lib/update-item";
import { mergeData } from "../lib/merge-data";
import { useLocalStorage } from "./use-local-storage";

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
  const { localData } = useLocalStorage();
  const [state, dispatch] = useReducer(dataReducer, null);

  useEffect(() => {
    if (data) {
      const mergedData = mergeData(data, localData);
      dispatch({ type: "SET_DATA", payload: mergedData });
    }
  }, [data, localData]);

  return { data: state, loading, error, dispatch };
}
