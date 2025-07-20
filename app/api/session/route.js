import getUserByIdAdmin from "@/lib/db_functions/getUserByIdAdmin";
import { adminAuth } from "@/lib/firebase-admin";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { token } = body;
    if (!token) throw new Error("No token provided");

    // 1. Verify Firebase token
    const decodedToken = await adminAuth.verifyIdToken(token);
    const uid = decodedToken.uid;

    // 2. Get user data from Firestore
    const userData = await getUserByIdAdmin(uid);
    if (!userData) throw new Error("User not found in Firestore");

    // 3. Build session payload with actual role
    const userSession = {
      uid: userData.uid,
      role: userData.role || "user", 
      status: userData.status || "active",
    };

    // 4. Set secure session cookie
    cookies().set("session", JSON.stringify(userSession), {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
      sameSite: "lax",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("SESSION ERROR:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
