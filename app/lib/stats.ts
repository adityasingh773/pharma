import { ProcessesResponse } from "../hooks/use-processes";

export function totalTasksInProcess(
  processId: string,
  data: ProcessesResponse
): number {
  const process = data.processes[processId];
  if (!process) return 0;
  return process.subprocessIds.reduce(
    (total, spId) => total + (data.subprocesses[spId]?.taskIds.length || 0),
    0
  );
}

export function approvedTasksInProcess(
  processId: string,
  data: ProcessesResponse
): number {
  const process = data.processes[processId];
  if (!process) return 0;

  return process.subprocessIds.reduce((count, spId) => {
    const subprocess = data.subprocesses[spId];
    if (!subprocess) return count;
    return (
      count +
      subprocess.taskIds.filter(
        (taskId) => data.tasks[taskId]?.status === "approved"
      ).length
    );
  }, 0);
}
