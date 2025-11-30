import { useEffect, useState } from "react";

export type Status = "approved" | "needs_fix" | "pending";

type Item = {
  id: string;
  name: string;
  description: string;
  status: Status;
  lastUpdatedBy: string;
  lastUpdatedAt: string;
};

type Task = Item & {
  subprocessId: string;
  isReviewed?: boolean;
};

type Subprocess = Item & {
  processId: string;
  taskIds: string[];
  isReviewed?: boolean;
};

type Process = Item & {
  subprocessIds: string[];
};

export type ProcessesResponse = {
  processes: Record<string, Process>;
  subprocesses: Record<string, Subprocess>;
  tasks: Record<string, Task>;
};

export function useProcesses() {
  const [data, setData] = useState<ProcessesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch("/api/processes")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
}
