import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export async function getUserStatusByEmail(email) {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return { status: null, exists: false }; // User not found
    }

    const userData = snapshot.docs[0].data();
    return { status: userData.status || "active", exists: true };
  } catch (err) {
    console.error("Error fetching user status:", err);
    return { status: null, exists: false };
  }
}
