import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import getUserById from "@/lib/db_functions/getUserByIdAdmin";

export default async function AuthWrapperServer({
  children,
  requireAuth = true,
  requiredRoles = [],
  redirectTo = "/",
}) {
  if (!requireAuth) return <>{children}</>;

  const sessionCookie = await cookies().get("session");

  if (!sessionCookie?.value) {
    // 🔁 No session – redirect (but do NOT delete the cookie here)
    return redirect(redirectTo);
  }

  try {
    const session = JSON.parse(sessionCookie.value);
    const user = await getUserById(session.uid);

    if (!user?.uid || !user?.role || !user?.status === "active") {
      return redirect(redirectTo);
    }

    // 🔁 Role mismatch – redirect only, keep session
    if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
      return redirect("/");
    }

    return <>{children}</>;
  } catch (error) {
    console.error("Auth wrapper error:", error);
    return redirect(redirectTo);
  }
}
