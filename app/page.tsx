"use client";

import { useState } from "react";
import { Status } from "./hooks/use-processes";
import { ItemType, useDataReducer } from "./hooks/use-data-reducer";
import { approvedTasksInProcess, totalTasksInProcess } from "./lib/stats";
import styles from "./page.module.css";

function constructStatusString(status: Status): string | null {
  if (status == "approved") return "Approved";
  if (status == "needs_fix") return "Need fix";
  if (status == "pending") return "Pending";
  return null;
}

export default function Home() {
  const { data, loading, error, dispatch } = useDataReducer();
  const [selectedProcess, setSelectedProcess] = useState<string | null>(null);
  const [selectedSubProcess, setSelectedSubProcess] = useState<string | null>(
    null
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data?.processes) return <div>No processes found!</div>;

  const processes = Object.values(data.processes);
  const subprocesses = selectedProcess
    ? data.processes[selectedProcess]?.subprocessIds.map(
        (id) => data.subprocesses[id]
      ) || []
    : [];
  const tasks = selectedSubProcess
    ? data?.subprocesses[selectedSubProcess]?.taskIds.map(
        (id) => data.tasks[id]
      ) || []
    : [];

  const handleUpdateClick = (itemType: ItemType, id: string, payload: any) => {
    dispatch({
      type: "UPDATE_ITEM",
      itemType,
      id,
      payload,
    });
  };

  return (
    <div className={styles.grid}>
      <div>
        <h2>Processes</h2>
        {processes.map(
          ({ id, name, description, lastUpdatedAt, lastUpdatedBy }) => (
            <div
              key={id}
              className={styles.item}
              onClick={() => setSelectedProcess(id)}
              style={
                selectedProcess === id
                  ? { border: "1px solid blue" }
                  : undefined
              }
            >
              <div className={styles.title}>{name}</div>
              <p>{description}</p>
              <p>Last updated by: {lastUpdatedBy}</p>
              <p>Last updated at: {new Date(lastUpdatedAt).toLocaleString()}</p>
              <br />
              <div>
                Progress: {approvedTasksInProcess(id, data)}/
                {totalTasksInProcess(id, data)} tasks approved
              </div>
            </div>
          )
        )}
      </div>
      <div>
        <h2>Sub Processes</h2>
        {selectedProcess ? (
          subprocesses.map(
            ({ id, name, description, lastUpdatedAt, lastUpdatedBy }) => (
              <div
                key={id}
                className={styles.item}
                onClick={() => setSelectedSubProcess(id)}
                style={
                  selectedSubProcess === id
                    ? { border: "1px solid blue" }
                    : undefined
                }
              >
                <div className={styles.title}>{name}</div>
                <p>{description}</p>
                <p>Last updated by: {lastUpdatedBy}</p>
                <p>
                  Last updated at: {new Date(lastUpdatedAt).toLocaleString()}
                </p>
              </div>
            )
          )
        ) : (
          <div className={styles.item}>Please select a process</div>
        )}
      </div>
      <div>
        <h2>Tasks</h2>
        {!selectedSubProcess ? (
          <div className={styles.item}>Please select a subprocess</div>
        ) : !data.subprocesses[selectedSubProcess]?.isReviewed ? (
          <div className={styles.item}>
            <p>
              This subprocess must be reviewed before tasks become fully
              reviewable
            </p>
            <button
              onClick={() =>
                handleUpdateClick("subprocess", selectedSubProcess, {
                  isReviewed: true,
                })
              }
            >
              Mark Reviewed
            </button>
          </div>
        ) : (
          tasks.map(
            ({
              id,
              name,
              status,
              description,
              lastUpdatedAt,
              lastUpdatedBy,
            }) => (
              <div key={id} className={styles.item}>
                <div className={styles.title}>{name}</div>
                <p>{description}</p>
                <p>Last updated by: {lastUpdatedBy}</p>
                <p>
                  Last updated at: {new Date(lastUpdatedAt).toLocaleString()}
                </p>
                <br />
                <div>Status: {constructStatusString(status)}</div>
                <br />
                <div>
                  Is reviewed: {data.tasks[id]?.isReviewed ? "Yes" : "No"}
                </div>
                <br />
                <div>
                  <button
                    onClick={() =>
                      handleUpdateClick("task", id, {
                        status: "approved",
                      })
                    }
                  >
                    Approve
                  </button>
                  &nbsp;
                  <button
                    onClick={() =>
                      handleUpdateClick("task", id, {
                        status: "needs_fix",
                      })
                    }
                  >
                    Need Fix
                  </button>
                  &nbsp;
                  <button
                    onClick={() =>
                      handleUpdateClick("task", id, {
                        status: "pending",
                      })
                    }
                  >
                    Pending
                  </button>
                  &nbsp;
                  <button
                    onClick={() =>
                      handleUpdateClick("task", id, {
                        isReviewed: true,
                      })
                    }
                  >
                    Mark reviewed
                  </button>
                </div>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
}
