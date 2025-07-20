import { cookies } from "next/headers";
import getUserById from "@/lib/db_functions/getUserByIdAdmin";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session");

    if (!sessionCookie?.value) {
      return Response.json({ user: null });
    }

    const parsed = JSON.parse(sessionCookie.value);
    const uid = parsed?.uid;

    if (!uid) {
      return Response.json({ user: null });
    }

    const user = await getUserById(uid);

    if (!user) {
      return Response.json({ user: null });
    }

    return Response.json({ user });
  } catch (error) {
    console.error("Check LoggedIn Error:", error);
    return Response.json({ user: null });
  }
}
