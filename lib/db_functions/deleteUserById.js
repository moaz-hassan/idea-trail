import { db } from "@/lib/firebase";
import {
  getDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import clientCheckSessionValid from "../auth/clientCheckSessionValid";
import toast from "react-hot-toast";

export default async function deleteUserById(userId) {
  const session = await clientCheckSessionValid();
  if (!session.valid || session.user.role !== "admin") {
    toast.error("Unauthorized");
    return { success: false, error: "Unauthorized" };
  }

  try {
    toast.loading("Deleting user and their articles...");

    // 1. Get the user document to access their article IDs
    const userDocRef = doc(db, "users", userId);
    const userSnap = await getDoc(userDocRef);

    if (!userSnap.exists()) {
      toast.dismiss();
      toast.error("User not found");
      return { success: false, error: "User not found" };
    }

    const userData = userSnap.data();
    const articleIds = userData.articles || [];

    // 2. Delete all articles listed in the user's `articles` array
    const deletePromises = articleIds.map((articleId) =>
      deleteDoc(doc(db, "articles", articleId))
    );
    await Promise.all(deletePromises);

    // 3. Delete the user document
    await deleteDoc(userDocRef);

    toast.dismiss();
    toast.success("User and their articles deleted successfully");
    return { success: true };
  } catch (err) {
    toast.dismiss();
    console.error("Delete Error:", err);
    toast.error("Failed to delete user");
    return { success: false, error: err.message };
  }
}
