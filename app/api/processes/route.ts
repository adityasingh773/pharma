import { NextResponse } from "next/server";
import data from "@/data/data.json";

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return NextResponse.json(data);
}
