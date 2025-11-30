import { ProcessesResponse } from "../hooks/use-processes";

export function mergeData(
  apiData: ProcessesResponse,
  localData: ProcessesResponse | null
): ProcessesResponse {
  if (!localData) return apiData;

  return {
    processes: Object.fromEntries(
      Object.entries(apiData.processes).map(([id, process]) => [
        id,
        {
          ...process,
          ...(localData.processes[id] && {
            comments: localData.processes[id].comments,
          }),
        },
      ])
    ),
    subprocesses: Object.fromEntries(
      Object.entries(apiData.subprocesses).map(([id, subprocess]) => [
        id,
        {
          ...subprocess,
          ...(localData.subprocesses[id] && {
            comments: localData.subprocesses[id].comments,
            isReviewed: localData.subprocesses[id].isReviewed,
          }),
        },
      ])
    ),
    tasks: Object.fromEntries(
      Object.entries(apiData.tasks).map(([id, task]) => [
        id,
        {
          ...task,
          ...(localData.tasks[id] && {
            status: localData.tasks[id].status,
            comments: localData.tasks[id].comments,
            isReviewed: localData.tasks[id].isReviewed,
          }),
        },
      ])
    ),
  };
}
