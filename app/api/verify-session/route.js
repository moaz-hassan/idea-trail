import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import getUserById from "@/lib/db_functions/getUserByIdAdmin";

export async function GET() {
  const sessionCookie = cookies().get("session");

  if (!sessionCookie?.value) {
    return NextResponse.json(
      { valid: false, reason: "Missing session cookie" },
      { status: 200 } 
    );
  }

  try {
    const session = JSON.parse(sessionCookie.value);
    if (!session.uid || !session.role) {
      return NextResponse.json(
        { valid: false, reason: "Invalid session structure" },
        { status: 200 }
      );
    }

    const user = await getUserById(session.uid);

    if (!user || user.role !== session.role) {
      return NextResponse.json(
        { valid: false, reason: "Mismatch or user not found" },
        { status: 200 }
      );
    }

    if (!user || user.status !== session.status) {
      return NextResponse.json(
        { valid: false, reason: "Mismatch or user is blocked" },
        { status: 200 }
      );
    }

    return NextResponse.json({ valid: true, user });
  } catch {
    return NextResponse.json(
      { valid: false, reason: "Failed to validate session" },
      { status: 200 }
    );
  }
}
