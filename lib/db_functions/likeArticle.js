import { db } from "@/lib/firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import clientCheckSessionValid from "@/lib/auth/clientCheckSessionValid";

export async function likeArticle(userId, articleId) {
  const user = await clientCheckSessionValid();
  if (!user) throw new Error("Invalid session");
  
  try {
    const userRef = doc(db, "users", userId);
    const articleRef = doc(db, "articles", articleId);

    // Add articleId to user's likedArticles
    await updateDoc(userRef, {
      likedArticles: arrayUnion(articleId),
    });

    // Add userId to article's likedBy
    await updateDoc(articleRef, {
      likedBy: arrayUnion(userId),
    });

    return { success: true };
  } catch (error) {
    console.error("Error liking article:", error);
    return { success: false, error: error.message };
  }
}
