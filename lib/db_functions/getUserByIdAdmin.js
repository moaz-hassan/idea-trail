import { adminDB } from "@/lib/firebase-admin";

export default async function getUserByIdAdmin(uid) {
  if (!uid) return null;

  try {
    const userRef = adminDB.collection("users").doc(uid);
    const userSnap = await userRef.get();

    if (!userSnap.exists) {
      console.warn("User not found in Firestore Admin:", uid);
      return null;
    }

    return userSnap.data();
  } catch (error) {
    console.error("Admin getUserById Error:", error);
    return null;
  }
}
