import { db } from "@/lib/firebase";
import { doc, updateDoc, increment } from "firebase/firestore";

export default async function incrementArticleViews(articleId) {
  try {
    const articleRef = doc(db, "articles", articleId);
    await updateDoc(articleRef, {
      viewsNum: increment(1),
    });
  } catch (error) {
    console.error("Failed to increment viewsNum:", error.message);
  }
}
