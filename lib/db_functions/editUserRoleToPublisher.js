import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default async function editUserRoleToPublisher(userId) {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      role: "publisher",
    });
    return { success: true };
  } catch (error) {
    console.error("Error promoting user:", error);
    return { success: false, error: error.message };
  }
}
