import logout from "./logout";

export default async function clientCheckSessionValid() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const res = await fetch(`${baseUrl}/api/verify-session`, {
      method: "GET",
      credentials: "include",
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      return { valid: false, user: null };
    }

    if (!data.valid) {
      return { valid: false, user: null };
    }

    if (data.user.status === "blocked") {
      await logout();
      return { valid: false, user: null };
    }

    return {
      valid: data.valid,
      user: data.user || null,
    };
  } catch {
    return { valid: false, user: null };
  }
}
