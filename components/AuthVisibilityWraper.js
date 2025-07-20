"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/ui/Loader";

export default function AuthVisibilityWrapper({
  children,
  showIfLoggedIn = false,
  loading = <Loader />,
  redirectTo = "/",
  fallback = null,
}) {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/check-loggedin");
        const data = await res.json();
        if (data.user) {
          setUser(data.user);
        }
      } catch (err) {
        console.error("Failed to load session user", err);
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (!loadingUser) {
      const isLoggedIn = Boolean(user);
      if (showIfLoggedIn && !isLoggedIn) {
        router.push(redirectTo);
      }
      if (!showIfLoggedIn && isLoggedIn) {
        router.push(redirectTo);
      }
    }
  }, [loadingUser, user, showIfLoggedIn, redirectTo, router]);

  if (loadingUser) return <>{loading}</>;

  const isVisible = showIfLoggedIn ? Boolean(user) : !user;

  return isVisible ? <>{children}</> : fallback;
}
