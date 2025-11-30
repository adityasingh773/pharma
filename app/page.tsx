"use client";

import { useProcesses } from "./hooks/use-processes";

export default function Home() {
  const { data, loading, error } = useProcesses();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log(data);

  return <div>home</div>;
}
