import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default async function getArticleComments(articleId) {
  try {
    const articleRef = doc(db, "articles", articleId);
    const articleSnap = await getDoc(articleRef);

    if (!articleSnap.exists()) {
      return { success: false, error: "Article not found" };
    }

    const data = articleSnap.data();
    const comments = data.comments || [];

    return { success: true, comments };
  } catch (err) {
    console.error("Error getting article comments:", err);
    return { success: false, error: err.message };
  }
}
