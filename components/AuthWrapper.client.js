"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/ui/Loader";

export default function AuthWrapperClient({
  children,
  requireAuth = true,
  requiredRoles = [],
  redirectTo = "/",
  loading = <Loader />,
}) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(!requireAuth);

  useEffect(() => {
    if (!requireAuth) return;

    const checkAuth = () => {
      try {
        const userCookie = document.cookie
          .split("; ")
          .find((row) => row.startsWith("user="));

        // 1. Authentication Check
        if (!userCookie) {
          router.push(redirectTo);
          return false;
        }

        const user = JSON.parse(decodeURIComponent(userCookie.split("=")[1]));

        // 2. Validate user structure
        if (!user?.uid || !user?.role) {
          router.push(redirectTo);
          return false;
        }

        // 3. Authorization (Role) Check
        if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
          router.push("/unauthorized");
          return false;
        }

        return true;
      } catch {
        router.push(redirectTo);
        return false;
      }
    };

    setIsAuthorized(checkAuth());
  }, [requireAuth, requiredRoles, redirectTo, router]);

  if (requireAuth && !isAuthorized) {
    return <>{loading}</>;
  }

  return <>{children}</>;
}
