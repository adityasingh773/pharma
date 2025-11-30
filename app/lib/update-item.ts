import { ItemType } from "../hooks/use-data-reducer";
import { ProcessesResponse } from "../hooks/use-processes";

export function updateItemInData(
  data: ProcessesResponse,
  itemType: ItemType,
  id: string,
  payload: any
): ProcessesResponse {
  if (itemType === "task") {
    return {
      ...data,
      tasks: {
        ...data.tasks,
        [id]: { ...data.tasks[id], ...payload },
      },
    };
  }

  if (itemType === "subprocess") {
    return {
      ...data,
      subprocesses: {
        ...data.subprocesses,
        [id]: { ...data.subprocesses[id], ...payload },
      },
    };
  }

  return {
    ...data,
    processes: {
      ...data.processes,
      [id]: { ...data.processes[id], ...payload },
    },
  };
}
