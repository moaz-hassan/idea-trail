import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import clientCheckSessionValid from "@/lib/auth/clientCheckSessionValid";

export default async function addCommentToArticle(articleId, text) {
  const { user } = await clientCheckSessionValid();
  if (!user) return { success: false, error: "Please login to add comment" };

  try {
    const articleRef = doc(db, "articles", articleId);
    const articleSnap = await getDoc(articleRef);
    const articleData = articleSnap.data();

    const newComment = {
      userName: user.name || "Anonymous",
      userId: user.uid,
      text,
      createdAt: new Date().toISOString(),
    };

    const updatedComments = [...(articleData.comments || []), newComment];

    await updateDoc(articleRef, {
      comments: updatedComments,
    });

    return { success: true };
  } catch (err) {
    return { success: false, error: err };
  }
}
