import { adminDB } from "@/lib/firebase-admin";
import serverCheckSessionValid from "../auth/serverCheckSessionValid";

export default async function getAllUsers() {
  const session = await serverCheckSessionValid();

  if (!session.valid || session.user.role !== "admin") {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const snapshot = await adminDB.collection("users").get();
    const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return { success: true, users };
  } catch (err) {
    return { success: false, error: err.message };
  }
}
