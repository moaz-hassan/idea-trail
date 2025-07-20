import { doc, deleteDoc, updateDoc, arrayRemove } from "firebase/firestore";
import { db } from "@/lib/firebase";
import clientCheckSessionValid from "@/lib/auth/clientCheckSessionValid";

export async function deleteArticleById(articleId) {
  const session = await clientCheckSessionValid();
  if (!session.valid || !session.user) {
    throw new Error("Unauthorized");
  }

  try {
    // Delete article doc
    await deleteDoc(doc(db, "articles", articleId));

    // Remove article ID from user's articles array
    await updateDoc(doc(db, "users", session.user.uid), {
      articles: arrayRemove(articleId),
    });

    return { success: true };
  } catch (err) {
    console.error("Error deleting article:", err);
    return { success: false, error: err.message };
  }
}
