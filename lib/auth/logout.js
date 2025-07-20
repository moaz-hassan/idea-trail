"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

const logout = async () => {
  try {
    // 1. Sign out from Firebase
    await signOut(auth);

    // 2. Remove session cookie from server using fetch
    await fetch("/api/logout", {
      method: "POST",
    });

    // 3. Redirect user to homepage
    window.location.href = "/";
  } catch (error) {
    console.error("Logout error:", error);
  }
};

export default logout;
