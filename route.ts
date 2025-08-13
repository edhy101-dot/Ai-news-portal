import { NextResponse } from "next/server";

export const revalidate = 0;

export async function GET() {
  // Placeholder: normally you'd read from DB here.
  // This endpoint intentionally returns empty to keep server stateless.
  return NextResponse.json({ items: [] });
}
