import { getFirestore, doc, updateDoc, arrayRemove } from "firebase/firestore";
import { app } from "@/lib/firebase";
import clientCheckSessionValid from "../auth/clientCheckSessionValid";

export default async function unfollowPublisher(publisherId) {
  const db = getFirestore(app);

  const res = await clientCheckSessionValid();
  if (!res.valid || !res.user) {
    return { success: false, error: "User not logged in" };
  }

  const currentUserId = res.user.uid;

  if (!publisherId || currentUserId === publisherId) {
    return { success: false, error: "Invalid operation" };
  }

  try {
    const publisherRef = doc(db, "users", publisherId);
    const userRef = doc(db, "users", currentUserId);

    // Remove from publisher's followers (you are not the publisher)
    await updateDoc(publisherRef, {
      followers: arrayRemove(currentUserId),
    });

    // Remove from your own following (you are currentUserId)
    await updateDoc(userRef, {
      following: arrayRemove(publisherId),
    });

    return { success: true };
  } catch (error) {
    console.error("Unfollow Error:", error);
    return { success: false, error: error.message || "Unknown error" };
  }
}
