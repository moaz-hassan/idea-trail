import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  // Clear the session cookie
  cookies().set("session", "", {
    maxAge: 0,
    path: "/",
  });

  return NextResponse.json({ success: true });
}
