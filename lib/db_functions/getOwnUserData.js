import { cookies } from "next/headers";
import { adminDB } from "@/lib/firebase-admin";
import serverCheckSessionValid from "../auth/serverCheckSessionValid";

export default async function getOwnUserData() {
  try {
    const res = await serverCheckSessionValid();
    if (!res?.valid) {
      throw new Error("Invalid session");
    }

    const uid = res.user?.uid;
    if (!uid) {
      throw new Error("No user UID found");
    }

    const sessionCookie = await cookies().get("session");
    if (!sessionCookie?.value) {
      throw new Error("No session cookie found");
    }

    const userRef = adminDB.collection("users").doc(uid);
    const userSnap = await userRef.get();

    if (!userSnap.exists) {
      throw new Error(`User not found: ${uid}`);
    }

    const userData = userSnap.data();
    if (!userData) {
      throw new Error("User data is empty");
    }

    return userData;
  } catch (err) {
    
    return err.message;
  }
}
