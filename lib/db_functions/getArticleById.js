import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default async function getArticleById(articleId) {
  if (!articleId) return null;

  try {
    const articleRef = doc(db, "articles", articleId);
    const articleSnap = await getDoc(articleRef);

    if (articleSnap.exists()) {
      return { id: articleSnap.id, ...articleSnap.data() };
    } else {
      console.warn("Article not found:", articleId);
      return null;
    }
  } catch (error) {
    console.error("Error fetching article:", error);
    return null;
  }
}
