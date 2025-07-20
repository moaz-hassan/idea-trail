import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import toast from "react-hot-toast";

export default async function updateArticleStatus(articleId, newStatus) {
  try {
    const articleRef = doc(db, "articles", articleId);
    await updateDoc(articleRef, {
      status: newStatus,
    });
    toast.success(`Article ${newStatus} successfully`);
  } catch (error) {
    console.error("Failed to update article status:", error);
    toast.error(`Failed to update article status: ${error.message}`);
    return false;
  }
}
