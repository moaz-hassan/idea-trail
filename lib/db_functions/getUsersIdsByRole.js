import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export default async function getUsersIdsByRole(role) {
  if (!["user", "publisher"].includes(role)) {
    throw new Error("Invalid role: must be 'user' or 'publisher'");
  }

  try {
    const q = query(collection(db, "users"), where("role", "==", role));
    const snapshot = await getDocs(q);
    const ids = snapshot.docs.map(doc => doc.id);
    return ids;
  } catch (err) {
    console.error("Error fetching user IDs:", err);
    return [];
  }
}
