import { db } from "@/lib/firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
// import checkSessionValid from "@/lib/auth/checkSessionValid";

export async function saveArticle(userId, articleId) {
  // const user = await checkSessionValid();
  // if (!user) throw new Error("Invalid session");
  
  try {
    const userRef = doc(db, "users", userId);
    const articleRef = doc(db, "articles", articleId);

    // Add articleId to user's savedArticles
    await updateDoc(userRef, {
      savedArticles: arrayUnion(articleId),
    });

    // Add userId to article's savedBy
    await updateDoc(articleRef, {
      savedBy: arrayUnion(userId),
    });

    return { success: true };
  } catch (error) {
    console.error("Error saving article:", error);
    return { success: false, error: error.message };
  }
}
