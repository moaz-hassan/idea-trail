import { getFirestore, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { app } from "@/lib/firebase";
import clientCheckSessionValid from "../auth/clientCheckSessionValid";

export default async function followPublisher(publisherId, currentUserId) {
  const db = getFirestore(app);

  const res = await clientCheckSessionValid();
  if (!res.valid || !res.user) {
    return { success: false, error: "User not logged in" };
  }

  if (!publisherId || !currentUserId || publisherId === currentUserId) {
    return { success: false, error: "Invalid operation" };
  }

  try {

    const publisherRef = doc(db, "users", publisherId);
    await updateDoc(publisherRef, {
      followers: arrayUnion(currentUserId),
    });

    const userRef = doc(db, "users", currentUserId);
    await updateDoc(userRef, {
      following: arrayUnion(publisherId),
    });

    return { success: true };
  } catch (error) {
    console.error("Error following publisher:", error);
    return { success: false, error: error.message || "Failed to follow" };
  }
}
