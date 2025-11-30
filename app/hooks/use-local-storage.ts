import { useState, useEffect } from "react";
import { ProcessesResponse } from "./use-processes";
import { ItemType } from "./use-data-reducer";
import { updateItemInData } from "../lib/update-item";

const STORAGE_KEY = "processes_data";

const initialLocalData = {
  processes: {},
  subprocesses: {},
  tasks: {},
};

export function useLocalStorage() {
  const [localData, setLocalData] = useState<ProcessesResponse | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return;

    try {
      setLocalData(JSON.parse(stored));
    } catch (error) {
      console.error("Error", error);
    }
  }, []);

  const updateLocalStorage = (itemType: ItemType, id: string, payload: any) => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const localStorageData = stored ? JSON.parse(stored) : initialLocalData;

    const updatedData = updateItemInData(
      localStorageData,
      itemType,
      id,
      payload
    );

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
    setLocalData(updatedData);
  };

  return { localData, updateLocalStorage };
}
