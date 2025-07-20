import { cookies } from "next/headers";

export default async function serverCheckSessionValid() {
  try {
    const sessionCookie = cookies().get("session")?.value;

    if (!sessionCookie) {
      return { valid: false, user: null };
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const res = await fetch(`${baseUrl}/api/verify-session`, {
      method: "GET",
      headers: {
        Cookie: `session=${sessionCookie}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return { valid: false, user: null };
    }

    const data = await res.json();

    if (!data?.valid || !data?.user) {
      return { valid: false, user: null };
    }

    return {
      valid: true,
      user: data.user,
    };
  } catch (err) {
    return { valid: false, user: null };
  }
}
